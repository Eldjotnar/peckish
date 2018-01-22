import React, { Component } from 'react';
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {Image, StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, FlatList} from 'react-native';
import {StackNavigator} from 'react-navigation'
import { Button } from 'react-native';

import { TopBar } from '../components/TopBar';
import { RecipeCard } from '../components/RecipeCard';
var {width, height} = Dimensions.get('window');

export default class RecipePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      data: [
         {
            "imagePath":"../components/macandcheese.jpg",
            "title":"Macaroni and Cheese",
            "source":"BudgetBytes",
            "missing":"0",
            "id":"000"
         },
         {
            "imagePath":"require('../components/macandcheese.jpg')",
            "title":"Macaroni and Cheese",
            "source":"BudgetBytes",
            "missing":"0",
            "id":"001"
         }
      ],
    };
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      multicolore: require('../assets/fonts/Multicolore.otf'),
      comfortaa: require('../assets/fonts/Comfortaa.ttf'),
      comfortaaBold: require('../assets/fonts/Comfortaa-Bold.ttf'),
    });
    this.setState({ loaded: true });
  }
  _keyExtractor = (item, index) => item.id;

  _imageSelector = (Uimage) => {
    let imagePath = `../assets/images/${Uimage}.jpg`
    return String(imagePath);
  }

  _renderItem = ({item}) => (
    <RecipeCard
      title={item.title}
      imagePath={require("../assets/images/pizza.jpg")}
      source={item.source}
      missing={item.missing}
    />
  );

  _getRecipes() {
    fetch("http://rns203-8.cs.stolaf.edu:28488", {
      method: "POST",
      body: JSON.stringify({
                  "imagePath":"../components/macandcheese.jpg",
                  "title":"Macaroni and Cheese",
                  "source":"BudgetBytes",
                  "missing":"0",
                  "id":"000"
               }),
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
    })
    .then(
      console.log("Talked to server")
    )
  }

  static navigationOptions = {
    header: null
  }
  render(){
    const { navigate } = this.props.navigation;
    if(!this.state.loaded){
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <View style={styles.main}>
        <StatusBar
          barStyle="light-content"
          translucent={false} />
        <Image source={require('../assets/images/banner.png')} style={styles.backgroundImage} />
        <TopBar title="browse recipes"
          leftIcon="ios-menu"
          leftAction={this._leftAction}
          rightIcon="ios-search"
          rightAction={this._rightAction} />
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
        <View>
          <Button
            title = "Try Getting Recipes"
            color = "gray"
            onPress = {this._getRecipes}
          />
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
})
