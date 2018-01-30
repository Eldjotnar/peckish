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

import Expo from 'expo';

var {width, height} = Dimensions.get('window');
let userAccessToken;

export default class Settings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      register: false,
      userAccessToken: "",
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

  async getUserInfo(){
    let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', { headers: {Authorization: `Bearer ${userAccessToken}`}})
    console.log(userInfoResponse)
    return userInfoResponse
  }

  async signInWithGoogle() {
    try{
      const result = await Expo.Google.logInAsync({
        androidClientId: "943728664102-9kprt8e9sikpbda08rkhb2argqifufkj.apps.googleusercontent.com",
        iosClientId: "943728664102-mjjul8u0nakm61bdj7e8gjbtoojk9ldq.apps.googleusercontent.com",
        scopes:['profile']
      })

      if(result.type === 'success'){
        this.setState({userAccessToken: result.accessToken})
        this._openModal()
        return result.accessToken
      } else{
        return {cancelled: true}
      }
    } catch(err) {
      return {error: true}
    }
  }

  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main}>
        <Modal
          visible={this.state.register}
          animationType={'slide'}
          onRequestClose={() => this._closeModal()}>
          <Text>Your full name from Google is: </Text>
          <Text>{this.getUserInfo().name}</Text>
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
          <TouchableWithoutFeedback
            onPress={() => this.signInWithGoogle()}
          >
            <View style={[styles.inputContainer, styles.loginButton]}>
              <Text style={styles.normalText}>Google Log in</Text>
            </View>
          </TouchableWithoutFeedback>
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
