import React, { Component } from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  Text,
  StyleSheet,
  Button,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

let recipeIngredients = {}

export default class Recipe extends React.Component {
  constructor(props){
    super(props);
  }

  static navigationOptions = {
    header: null
  }

  getNavigationParams() {
    return this.props.navigation.state.params || {}
  }

  formatIngredients() {
    formattedIngredients = []
    arrSize = this.getNavigationParams().ingredients.ingredientnames.length
    for(var i=0; i < arrSize; i++){
      tmp = {}
      tmp['key'] = this.getNavigationParams().ingredients.ingredientnames[i]
      tmp['amount'] = this.getNavigationParams().ingredients.amounts[i]
      formattedIngredients.push(tmp)
    }
    return formattedIngredients
  }

  formatRecipe() {
    let steps = this.getNavigationParams().steps
    if(steps.substring(0,12) === "Directions: ") {
      steps = steps.slice(12)
    }
    return steps
  }

  render(){
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.main}>
        <StatusBar
          barStyle="light-content"
          translucent={false}
        />
        <Image source={require('../assets/images/banner.png')} style={styles.backgroundImage} />
        <View style={styles.recipeImageContainer}>
          <Image source={{uri: this.getNavigationParams().imageurl}} style={styles.recipeImage} />
            <TouchableOpacity onPress={() => goBack()} style={styles.backArrow}>
              <Ionicons name="ios-arrow-back" style={{color: 'white'}} size={30}/>
            </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>{this.getNavigationParams().name}</Text>
          <View style={styles.infoHeader}>
            <Text style={styles.regularText}>{this.getNavigationParams().source}</Text>
            <Text style={styles.regularText}>
            </Text>
            <Text style={styles.regularText}>Yield: {this.getNavigationParams().yield}</Text>
            <Text style={styles.regularText}>Time: {this.getNavigationParams().cooktime}</Text>
          </View>
          <ScrollView>
            <Text style={styles.subText}>Ingredients</Text>
            <FlatList
              data={this.formatIngredients()}
              renderItem={({item}) => <Text style={styles.listText}>{item.amount} {item.key}</Text>}
              scrollEnabled={false}
            />
          <Text style={[styles.subText, {marginTop: 10}]}>Instructions</Text>
          <Text style={[styles.regularText, {marginTop: 10}]}>{this.formatRecipe()}</Text>
          <View style={{height:20}}></View>
          <Text style={styles.regularText}>{this.getNavigationParams().url}</Text>
        </ScrollView>
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
  recipeImageContainer: {
    justifyContent: 'center',
    height: '40%',
  },
  recipeImage: {
    height: null,
    width: null,
    resizeMode: 'cover',
    flex: 1,
  },
  backArrow: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: '#191e4580',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingBottom: 0,
  },
  titleText: {
    fontFamily: 'comfortaaBold',
    fontSize: 18
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginBottom: 15,
  },
  regularText: {
    fontFamily: 'comfortaa',
  },
  listText: {
    fontFamily: 'comfortaa',
    marginBottom: 2,
    marginLeft: 6,
  },
  subText: {
    fontFamily: 'comfortaaBold',
    fontSize: 14,
    marginBottom: 5,
  }
});
