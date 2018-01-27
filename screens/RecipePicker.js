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

  _getUpdatedState = () => {
    this.props.fetchData();
  }

  _keyExtractor = (item, index) => item.rid;

  getNavigationParams() {
    return this.props.navigation.state.params || {}
  }

  _imageSelector = (Uimage) => {
    let imagePath = `../assets/images/${Uimage}.jpg`
    return String(imagePath);
  }

  _renderItem = ({item}) => (
    <RecipeCard
      title={item.rname}
      imagePath={{uri: item.imageurl}}
      source={item.url}
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
        {
          this.props.recipesIsFetching && <Text style={{backgroundColor:'transparent', color:'white', fontFamily:'comfortaaBold'}}>Loading...</Text>
        }
        <FlatList
          data={this.props.recipes[0]}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
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
});

function mapStateToProps (state) {
  return {
    recipes: state.recipes,
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
