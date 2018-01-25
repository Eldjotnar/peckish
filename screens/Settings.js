import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import {
  Image,
  Text,
  StyleSheet,
  Button,
  View,
  StatusBar
} from 'react-native';

export default class Settings extends React.Component {
  constructor(props){
    super(props);
  }

  // removes the navigation header
  static navigationOptions = {
    header: null
  }

  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main}>
        <StatusBar
          barStyle="light-content"
          translucent={false}
        />
        <Image source={require('../assets/images/banner.png')} style={styles.backgroundImage} />
        <View>
          <Text style={styles.texter}>You are not logged in.</Text>
        </View>
      </View>
    );
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
  texter: {
    fontFamily: 'multicolore',
  }
});
