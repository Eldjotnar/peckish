import React, { Component } from 'react';
import { AppLoading, Font } from 'expo';
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
} from 'react-native';

export default class Recipe extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }
  static navigationOptions = {
    header: null
  }
  componentWillMount() {
    this._loadAssetsAsync();
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      comfortaa: require('../assets/fonts/Comfortaa.ttf'),
      comfortaaBold: require('../assets/fonts/Comfortaa-Bold.ttf'),
    });
    this.setState({ loaded: true });
  }
  render(){
    const { goBack } = this.props.navigation;
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
          translucent={false}
        />
        <Image source={require('../assets/images/banner.png')} style={styles.backgroundImage} />
        <View style={styles.recipeImageContainer}>
          <Image source={require('../assets/images/macandcheese.jpg')} style={styles.recipeImage} />
            <TouchableOpacity onPress={() => goBack()} style={styles.backArrow}>
              <Ionicons name="ios-arrow-back" style={{color: 'white'}} size={30}/>
            </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>Macaroni and Cheese</Text>
          <View style={styles.infoHeader}>
            <Text style={styles.regularText}>BudgetBytes</Text>
            <Text style={styles.regularText}>Yield: 4</Text>
            <Text style={styles.regularText}>Time: 60 minutes</Text>
          </View>
          <Text style={styles.subText}>Ingredients</Text>
          <View>

          </View>
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
  subText: {
    fontFamily: 'comfortaaBold',
    fontSize: 14,
  }
});
