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
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator
} from 'react-native';

import { fetchRecipes } from '../actions/RecipeActions';
import {
  searchForRecipe,
  sortRecipesByName,
  sortRecipesByRating,
  sortRecipesBySource,
  sortRecipesByMissing,
} from '../actions/RecipeActions';

import { TopBar } from '../components/TopBar';
import { RecipeCard } from '../components/RecipeCard';
var {width, height} = Dimensions.get('window');

class RecipePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      textSearchHeight: 0,
      keyboardShowing: false,
      reRenderList: false,
    }
  }

  // adds a listener for the keyboard to close the
  // search bar when the user doesn't hit return
  componentWillMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  // opens the drawer when the user selects the menu
  _leftAction = () => {
    this._drawer.open();
  }

  // automatically hides the search bar if the user closes the keyboard
  // without clicking the search button
  _keyboardDidHide = () => {
    this.setState({
      textSearchHeight: 0,
    })
  }

  // tells the flatlist to index by recipe id
  _keyExtractor = (item, index) => item.rid;

  // renders a recipe card in the FlatList for each recipe
  // found by the server
  _renderItem = ({item}) => (
    <RecipeCard
      title={item.rname}
      imagePath={{uri: item.imageurl}}
      source={item.source}
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
        source: item.source,
        ingredients: item.ingredients,
        steps: item.steps,
        imageurl: item.imageurl,
        yield: item.serving,
        cooktime: item.cooktime,
        url: item.url,
      },
    );
  }

  // opens the keyboard and displays the search bar
  // hides the keyboard and search bar on second click
  _rightAction = () => {
    if(!this.state.keyboardShowing){
      this.refs.searchBar.focus();
      this.setState({
        textSearchHeight: 50,
        keyboardShowing: true,
      })
    } else {
      Keyboard.dismiss();
      this.setState({keyboardShowing: false, textSearchHeight: 0})
    }
  }

  // searches the recipes for something matching
  // the user input
  _searchForRecipe = (input) => {
    this.props.searchForRecipe(input)
  }

  // sorts the found recipes according to
  // number of missing ingredients
  _sortByMissing = () => {
    this.props.sortRecipesByMissing();
    this.state.reRenderList == false ? this.setState({reRenderList:true}): this.setState({reRenderList:false});
    this._drawer.close();
  }

  // sorts the found recipes by name
  _sortAlphabetically = () => {
    this.props.sortRecipesByName();
    this.state.reRenderList == false ? this.setState({reRenderList:true}): this.setState({reRenderList:false});
    this._drawer.close();
  }

  // sorts the recipes by rating
  _sortByRating = () => {
    this.props.sortRecipesByRating();
    this.state.reRenderList == false ? this.setState({reRenderList:true}): this.setState({reRenderList:false});
    this._drawer.close();
  }

  // sorts the recipes by source
  _sortBySource = () => {
    this.props.sortRecipesBySource();
    this.state.reRenderList == false ? this.setState({reRenderList:true}): this.setState({reRenderList:false});
    this._drawer.close();
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
            <Text style={styles.drawerText} onPress={this._sortByMissing}>Ingredients Missing</Text>
            <Text style={styles.drawerText} onPress={this._sortAlphabetically}>Name</Text>
            <Text style={styles.drawerText} onPress={this._sortByRating}>Rating</Text>
            <Text style={styles.drawerText} onPress={this._sortBySource}>Source</Text>
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
            this.props.recipesIsFetching &&
              <View style={styles.textContainer}>
                <ActivityIndicator size="large" color="#d03d67" />
              </View>
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
            extraData={this.state.reRenderList}
            keyExtractor={this._keyExtractor}
          />
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              style={[styles.textInput, {height: this.state.textSearchHeight}]}
              onSubmitEditing={this._keyboardDidHide}
              autoCapitalize={'none'}
              onChangeText={(text) => this._searchForRecipe(text)}
              ref='searchBar' />
          </KeyboardAvoidingView>
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
  textInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontFamily: 'multicolore',
    justifyContent: 'center',
    paddingLeft: width/20,
    fontSize: 16,
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
    fetchData: () => dispatch(fetchData()),
    searchForRecipe: (input) => dispatch(searchForRecipe(input)),
    sortRecipesByName: () => dispatch(sortRecipesByName()),
    sortRecipesBySource: () => dispatch(sortRecipesBySource()),
    sortRecipesByMissing: () => dispatch(sortRecipesByMissing()),
    sortRecipesByRating: () => dispatch(sortRecipesByRating()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipePicker);
