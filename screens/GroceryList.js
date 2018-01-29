import React, { Component } from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
  Image,
  Text,
  StyleSheet,
  Button,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';

import { TopBar } from '../components/TopBar';
import { GroceryListItem } from '../components/GroceryListItem';

export default class GroceryList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [
        {key: 'pants'},
        {key: 'eggs'},
        {key: 'nerds'},
      ]
    }
  }

  static navigationOptions = {
    header: null
  }

  _renderItem = ({item}) => (
    <GroceryListItem
      text={item.key} />
  );

  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main}>
        <StatusBar
          barStyle="light-content"
          translucent={false}
        />
        <Image source={require('../assets/images/banner.png')} style={styles.backgroundImage} />
        <TopBar title="your grocery list"
          leftIcon="ios-add-circle-outline"
          leftAction={this._leftAction}
          rightIcon="ios-search"
          rightAction={() => console.log(this.state.data)} />
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
        />
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
  groceryItem: {
    height: 60,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row'
  },
  iconContainer: {
    width: '20%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '80%',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'multicolore',
    fontSize: 20,
  }
});
