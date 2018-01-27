import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {StackNavigator} from 'react-navigation';
import { connect } from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
  Modal,
} from 'react-native';

import { recipeAdded } from '../actions/Actions';

import { TopBar } from '../components/TopBar';
import { RecipeCard } from '../components/RecipeCard';
var {width, height} = Dimensions.get('window');

class RecipePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalDisplay: true,
      data: [
         {
            "imagePath":"../components/macandcheese.jpg",
            "title":"Pizza I promise",
            "source":"Food Network",
            "missing":"1",
            "id":"000",
         },
         {
            "imagePath":"require('../components/macandcheese.jpg')",
            "title":"Macaroni and Cheese",
            "source":"BudgetBytes",
            "missing":"0",
            "id":"001",
         }
      ],
    };
  }

  componentWillMount() {
    this.props.recipeAdded({ key:"hello there" });
    this.props.recipeAdded({ key:"hello there2" });
    this.props.recipeAdded({ key:"hello there3" });
    //console.log("ha " + this.props.);
  }

  _getUpdatedState = () => {
    this.props.recipeAdded({ key:"hello there"});
    console.log(this.props.recipes);
  }

  _keyExtractor = (item, index) => item.id;

  getNavigationParams() {
    return this.props.navigation.state.params || {}
  }

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
      recipeAction={() => this._generateRecipePage({item})}
    />
  );

  _generateRecipePage = ({item}) => {
    const { navigate } = this.props.navigation;
    navigate(
      'Recipe', {
        name: item.title,
        source: item.source,
      },
    );
  }

  _obtainRecipes() {
  fetch("http://rns203-8.cs.stolaf.edu:28488")
  .then((res) => {
    console.log(res)
    return res.json()
  })
  .then((data) => {
  console.log(data)
  console.log(data.I_id)
  console.log(data.amount)
  console.log(data.name)
    })
  }

  _getRecipes() {
    fetch("http://rns203-8.cs.stolaf.edu:28488", {
      method: "POST",
      body: JSON.stringify({
                  type:"ingredients",
                  ingredients:["elbow macaroni","Cheese"],
               }),
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
    })
    .then((res) => {
      console.log(res)
      return res.json()
    })
    .then((data) => {
    console.log(data)
    console.log(data.I_id)
    console.log(data.amount)
    console.log(data.name)
      })
  }

  static navigationOptions = {
    header: null
  }
  render(){
    const { navigate } = this.props.navigation;
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
            title = "Try Obtaining Recipes"
            color = "blue"
            onPress = {this._obtainRecipes}
          />
        </View>
        <View>
          <Button
            title = "Try getting state"
            color = "blue"
            onPress = {this._getUpdatedState}
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
});

const mapStateToProps = (state) => ({
  recipes: state.recipes
})

export default connect(mapStateToProps, {
  recipeAdded,
})(RecipePicker);
