import React from 'react';
import { Ionicons } from '@expo/vector-icons';

var {width, height} = Dimensions.get('window');
import { StyleSheet, Text, View, Dimensions, Platform, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';

export class TopBar extends React. Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.topBarContainer}>
        <View style={styles.centerTest}>
          <TouchableOpacity onPress={this.props.leftAction}>
            <Ionicons style={styles.iconStyle} name={this.props.leftIcon} size={30} />
          </TouchableOpacity>
          <Text style={styles.titleText}>{this.props.title}</Text>
          <TouchableOpacity onPress={this.props.rightAction}>
            <Ionicons style={styles.iconStyle} name={this.props.rightIcon} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topBarContainer: {
    marginTop: height/50,
    height: height/10,
    backgroundColor: 'transparent',
  },
  centerTest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  titleText: {
    fontFamily: 'multicolore',
    color: 'white',
    fontSize: 18,
  },
  iconStyle: {
    color:'#636e8e',
    paddingHorizontal: 10,
    marginHorizontal: 10,
  }
})
