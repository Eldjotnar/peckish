import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import {StackNavigator} from 'react-navigation'

var {width, height} = Dimensions.get('window');

export class IconButton extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      borderColor: 'transparent',
    }
  }

  componentWillMount() {
    if(this.props.active){
      this.setState({ borderColor: '#d03d67'})
    }
  }

  render() {
    return (
      <View style={[styles.iconContainer, {borderBottomColor: this.state.borderColor}]}>
        <TouchableOpacity onPress={this.props.action}>
          <Ionicons style={styles.iconStyle} name={this.props.icon} />
        </TouchableOpacity>
      </View>
    )
  }
}

export class BottomBar extends React.PureComponent {
  render(){
    return (
      <View style={styles.main}>
        <IconButton icon={this.props.icon1} action={this.props.action1} active={this.props.active1}/>
        <IconButton icon={this.props.icon2} action={this.props.action2} active={this.props.active2}/>
        <IconButton icon={this.props.icon3} action={this.props.action3} active={this.props.active3}/>
        <IconButton icon={this.props.icon4} action={this.props.action4} active={this.props.active4}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    height: 50,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconStyle: {
    color:'#ffffff75',
    fontSize: 40,
  },
  iconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#d03d67',
    borderBottomWidth: 1,
    marginHorizontal: 20,
  }
});
