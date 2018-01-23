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
  FlatList,
  ScrollView,
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
  getNavigationParams() {
    return this.props.navigation.state.params || {}
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
          <Text style={styles.titleText}>{this.getNavigationParams().name}</Text>
          <View style={styles.infoHeader}>
            <Text style={styles.regularText}>{this.getNavigationParams().source}</Text>
            <Text style={styles.regularText}>Yield: 4</Text>
            <Text style={styles.regularText}>Time: 60 minutes</Text>
          </View>
          <ScrollView>
            <Text style={styles.subText}>Ingredients</Text>
            <FlatList
              data={[{'amount':'1/2 tsp', key: 'salt'}, {'amount':'2 cups', key: 'elbow macaroni'}, {'amount':'2 Tbsp',key: 'butter'}, {'amount':'1/2 tsp',key:'dijon mustard'}, {'amount':'1 pinch of',key:'cayenne pepper'}, {'amount':'1.5 cups', key:'shredded sharp cheddar'}]}
              renderItem={({item}) => <Text style={styles.listText}>{item.amount} {item.key}</Text>}
              scrollEnabled={false}
            />
          <Text style={[styles.subText, {marginTop: 10}]}>Instructions</Text>
          <Text style={[styles.regularText, {marginTop: 10}]}>Fill the skillet two-thirds full of water, add the salt, and bring to a boil over medium-high heat.</Text>
          <Text style={[styles.regularText, {marginTop: 10}]}>Add the macaroni, turn the heat to medium, and cook, stirring occasionally, until just shy of al dente. This should take about 10 minutes, but check the pasta package for recommended cooking times and aim for the lower end if a range is given. (The macaroni will continue to cook a bit in the sauce.) When the macaroni is ready, biting into a piece should reveal a very thin core of uncooked pasta.</Text>
          <Text style={[styles.regularText, {marginTop: 10}]}>Drain the macaroni and return it to the skillet. Turn the heat to low. Add the butter and stir until it melts.</Text>
          <Text style={[styles.regularText, {marginTop: 10}]}>Add the evaporated milk, mustard, and cayenne and stir well to combine. Add the cheese in three batches, stirring frequently as each batch is added and waiting until the cheese has melted before adding the next batch. After about 5 minutes total, the sauce will be smooth and noticeably thicker.</Text>
          <Text style={[styles.regularText, {marginTop: 10}]}>Serve hot. Leftovers can be refrigerated in a covered container for up to 2 days.</Text>
          <View style={{height:20}}></View>
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
