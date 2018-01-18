import React, { Component } from 'react';
import {Image, Text, StyleSheet, Button, View, Dimensions, Vibration} from 'react-native';
import {StackNavigator} from 'react-navigation'

export default class Test extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      backgroundColor: 'blanchedalmond'
    };
  }
  static navigationOptions = {
    header: null
  }
  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={{backgroundColor: 'rebeccapurple', flex: 1}}>
        <View style={{justifyContent: 'center', margin: 100}}>
          <Button
            title="HOME"
            color="red"
            onPress={() => navigate('HM', {})}
          />
        </View>
      </View>
    );
  }
}
