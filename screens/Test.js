import React, { Component } from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {
  Image,
  Text,
  StyleSheet,
  Button,
  View,
  StatusBar,
  Modal,
  TouchableOpacity
} from 'react-native';

import {BarCodeScanner, Permissions} from 'expo'
import { Ionicons } from '@expo/vector-icons';

let barcodeInProcess = false

export default class Test extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cameraPermission: null,
      modalVisible: false,
      productName:"",
      lookupMessage: "",
    }
  }
  static navigationOptions = {
    header: null
  }

  async componentWillMount(){
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({cameraPermission: status === 'granted'})
  }

  _helperForHandleBarCode(){
    barcodeInProcess = false
  }

  _handleBarCode = ({type, data}) => {
    this._openModal()
    if(barcodeInProcess === false){
      barcodeInProcess = true
      console.log(`Barcode read of type ${type} and data content: ${data} scanned.`)
      if(type === "EAN_13" || type === 'org.gs1.EAN-13' || type === "CODE_128" || type === 'org.gs1.CODE_128'){
        fetch(`https://pod.opendatasoft.com/api/records/1.0/search/?dataset=pod_gtin&q=${data}&facet=gpc_s_nm&facet=brand_nm&facet=owner_nm`)
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          try{
            let undefDummy;
            productName = data.records[0].fields.gtin_nm
            brandName = data.records[0].fields.brand_nm
            this.setState({productName: `${productName}`})
            if(brandName == undefDummy){
              this.setState({lookupMessage: `Is ${productName}\nthe product you scanned?`})
            }
            else if(productName == undefDummy){
              this.setState({lookupMessage: `Is ${brandName}\nthe product brand\n you scanned?`})
            }
            else if(productName == undefDummy && brandName == undefDummy) {
              throw err;
            }
            else{
              this.setState({lookupMessage: `Is ${brandName}:${productName}\nthe product you scanned?`})
            }
          }
          catch(err){
            this.setState({lookupMessage: "No record found\nfor this product"})
            console.log("Item not found in pod.opendatasoft.com database. Otherwise an unexpected error occured.")
        }
        })
      }
      else {
        console.log("Not an EAN_13 barcode. However, the barcode reading was succesful.")
      }
      setTimeout(this._helperForHandleBarCode, 5000) //enforces 5 second breaks between repeated requests
    }
    else {
      console.log("Please wait. Only one scan every 5 seconds allowed.")
    }
  }

  _openModal() {
    this.setState({modalVisible: true})
  }

  _closeModal() {
    this.setState({modalVisible: false})
  }

  _handleYesToProduct(){
    //Match up with known ingredients
    this._closeModal()
    fetch("http://rns203-8.cs.stolaf.edu:28488/lookupproduct", {
      method: "POST",
      body: JSON.stringify({type:"lookupproduct", "lookupproduct": `${this.state.productName}`}),
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
    })
  }

  _handleNoToProduct(){
    //Scan again or manually input product
    this._closeModal()
  }

  render(){
    const { navigate } = this.props.navigation;
    const { cameraPermission } = this.state;

    if(cameraPermission === null) {
      return <Text>Requesting permission for camera</Text>
    }
    else if (cameraPermission == false) {
      return <Text>Lack permission for camera</Text>
    }
    else{
      return (
        <View style={styles.main}>
          <StatusBar
            barStyle="light-content"
            translucent={false}
          />
          <Modal
            visible={this.state.modalVisible}
            animationType ={'slide'}
            onRequestClose={() => this._closeModal()}
          >
            <View style={styles.modalContainer}>
            <View>
            </View>
              <View style={styles.innerContainer}>
                <Text style={styles.popupText}>{this.state.lookupMessage}</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => this._handleYesToProduct()}
                  >
                  <Ionicons name="ios-checkmark-circle-outline" size={50} color="white" padding={20}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this._handleNoToProduct()}
                  >
                  <Ionicons name="ios-close-circle-outline" size={50} color="#FF00F7"/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={{ flex: 1}}>
              <BarCodeScanner
                onBarCodeRead = {this._handleBarCode}
                style={StyleSheet.absoluteFill}
              />
          </View>
        </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#191e45',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '60%',
  },
  modalImage: {
    position: 'absolute',
    top: 10,
    left: 150,
    width: '20%',
    height: '10%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#191e45',
    justifyContent: 'center',
  },
  modalButtons: {
    width:160,
    flexDirection: 'row',
    padding:20,
    justifyContent: 'space-between',
  },
  innerContainer: {
    backgroundColor: '#191e45',
    alignItems: 'center',
  },
  popupText: {
    fontFamily: 'multicolore',
    fontSize: 18,
    color: 'white',
  },
  confirmationButtons: {
    alignItems: 'center',
    margin: 20,
  },
});
