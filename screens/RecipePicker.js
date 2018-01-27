import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer';
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
} from 'react-native';

import { fetchData } from '../actions/Actions';

import { TopBar } from '../components/TopBar';
import { RecipeCard } from '../components/RecipeCard';
var {width, height} = Dimensions.get('window');

class RecipePicker extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
  }

  // opens the drawer when the user selects the menu
  _leftAction = () => {
    this._drawer.open();
  }

  // tells the flatlist to index by recipe id
  _keyExtractor = (item, index) => item.rid;

  // renders a recipe card in the FlatList for each recipe
  // found by the server
  _renderItem = ({item}) => (
    <RecipeCard
      title={item.rname}
      imagePath={{uri: item.imageurl}}
      source={item.url}
      missing={item.missing}
      recipeAction={() => this._generateRecipePage({item})}
    />
  );

  // creates the recipe page that displays the
  // recipe the user selected
  _generateRecipePage = ({item}) => {
    const { navigate } = this.props.navigation;
    navigate(
      'Recipe', {
        name: item.rname,
        source: item.url,
      },
    );
  }

  // removes header formed by navigation
  static navigationOptions = {
    header: null
  }

  render(){
    const { navigate } = this.props.navigation;
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        tapToClose={true}
        openDrawerOffset={width/2}
        content={
          <View style={styles.sideDrawerMain}>
            <Text style={[styles.drawerText,{marginTop: height/50, fontSize:16}]}>Sort Ingredients By</Text>
            <Text style={styles.drawerText} onPress={() => console.log(this._searchForIngredient('t'))}>Ingredients Missing</Text>
            <Text style={styles.drawerText} onPress={() => console.log("hi")}>Name</Text>
            <Text style={styles.drawerText} onPress={() => console.log("hi")}>Rating</Text>
            <Text style={styles.drawerText} onPress={() => console.log("hi")}>Source</Text>
          </View>
        }>
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
          {
            this.props.recipesIsFetching && <Text style={{backgroundColor:'transparent', color:'white', fontFamily:'comfortaaBold'}}>Loading...</Text>
          }
          {
            !this.props.recipesFetched &&
             <View style={styles.textContainer}>
               <Text style={styles.normalText}>It looks like you haven't selected any ingredients yet!</Text>
               <Text style={[styles.normalText, {fontSize: 14}]}>Please select at least 4 ingredients to generate recipes</Text>
             </View>
          }
          <FlatList
            data={this.props.recipes[0]}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </Drawer>
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
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  normalText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'multicolore',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 20,
  },
  sideDrawerMain: {
    flex: 1,
    paddingTop: height/50 + 15,
    alignItems: 'center'
  },
  drawerText: {
    fontFamily: 'multicolore',
    color:'black',
    marginTop: 20,
  }
});

function mapStateToProps (state) {
  return {
    recipes: state.recipes,
    recipesFetched: state.recipesFetched,
    recipesIsFetching: state.recipesIsFetching
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipePicker);
