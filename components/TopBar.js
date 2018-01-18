import React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, Image, FlatList, TouchableHighlight, StatusBar } from 'react-native';

export class TopBar extends React. Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity>
          <Ionicons style={styles.iconStyle} name="md-search" size={height/12 - 10} />
        </TouchableOpacity>
        <Text>{this.props.title}</Text>
        <TouchableOpacity>
          <Ionicons style={styles.iconStyle} name="md-search" size={height/12 - 10} />
        </TouchableOpacity>
      </View>
    )
  }
}
