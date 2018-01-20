import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import {StackNavigator} from 'react-navigation'

var {width, height} = Dimensions.get('window');

class IconButton extends React.PureComponent {
  constructor(props){
    super(props);//whatever is passed
    this.state = {
      active: false,
    };
  }

  static navigationOptions = {
    header: null
  }

  _onPress = () => {
    if(!this.state.active){
      //navigate(this.props.page, {})
    }
  }
      //navigate to different page

  render() {
    return (
      <View style={styles.test}>
        <TouchableOpacity>
          <Ionicons style={styles.iconStyle} name="md-search" size={height/12 - 10} />
        </TouchableOpacity>
      </View>
    )
  }
}

export class BottomBar extends React.PureComponent {
  render(){
    return (
      <View style={styles.main}>
        <IconButton page="TS"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    height: height/12,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconStyle: {
    color:'#ffffff75',
  },
  test: {
    borderBottomColor: '#d03d67',
    borderBottomWidth: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  }
});
