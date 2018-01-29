import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator, TabNavigator } from 'react-navigation';
import {
  Image,
  Text,
  StyleSheet,
  Button,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';

var {width, height} = Dimensions.get('window');

export default class Settings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      register: false,
    }
  }

  // removes the navigation header
  static navigationOptions = {
    header: null
  }

  _openModal = () => {
    console.log("pressed");
    this.setState({register: true});
  }

  _closeModal = () => {
    this.setState({register: false});
  }

  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main}>
        <Modal
          visible={this.state.register}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}>
          <Text>Inside the modal</Text>
        </Modal>
        <StatusBar
          barStyle="light-content"
          translucent={false}
        />
        <Image source={require('../assets/images/banner.png')} style={styles.backgroundImage} />
        <KeyboardAvoidingView style={{alignItems: 'center',justifyContent: 'center'}}>
          <Image style={styles.logo} source={require('../assets/images/peckish_logo.png')} />
          <View>
            <Text style={styles.texter}>Please log in</Text>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons style={styles.iconStyle} name="ios-mail-outline" size={30}/>
            <TextInput style={styles.input} keyboardType='email-address'/>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons style={styles.iconStyle} name="ios-lock-outline" size={30}/>
            <TextInput style={styles.input} secureTextEntry={true} />
          </View>
          <TouchableWithoutFeedback>
            <View style={[styles.inputContainer, styles.loginButton]}>
              <Text style={styles.normalText}>Log in</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.subText}>Don't have an account?</Text>
            <Text onPress={this._openModal} style={[styles.subText, {textDecorationLine:'underline', marginTop:10}]}> Create one!</Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#191e45',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '60%',
  },
  logo: {
    height: height/5,
    resizeMode: 'contain',
  },
  texter: {
    fontFamily: 'multicolore',
    color: 'white',
    backgroundColor:'transparent',
    fontSize: 18,
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'comfortaa',
  },
  iconStyle: {
    paddingHorizontal: 8,
    color: '#191e45',
  },
  loginButton: {
    backgroundColor: '#d03d67',
    justifyContent: 'center',
    alignItems: 'center',
    width: width-40,
  },
  normalText: {
    color: 'white',
    fontFamily: 'multicolore',
    fontSize: 18,
  },
  subText: {
    fontFamily:'comfortaa',
    color: '#636e8e',
    marginTop: 20,
  }
});
