import React, { Component } from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {
  Image,
  Text,
  StyleSheet,
  Button,
  View,
  StatusBar
} from 'react-native';

import {BarCodeScanner, Permissions} from 'expo'

export default class Test extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cameraPermission: null,
    }
  }
  static navigationOptions = {
    header: null
  }

  async componentWillMount(){
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({cameraPermission: status === 'granted'})
  }

  _handleBarCode = ({type, data}) => {
    console.log(`Barcode read of type ${type} and data content: ${data} scanned.`)
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
          <Image source={require('../assets/images/banner.png')} style={styles.backgroundImage} />
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
});
