import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View } from 'react-native';
import { AppLoading, Font } from 'expo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import IngredientPicker from './screens/IngredientPicker';
import Test from './screens/Test';
import RecipePicker from './screens/RecipePicker';
import Recipe from './screens/Recipe';
import Settings from './screens/Settings';
import GroceryList from './screens/GroceryList';

import Reducer from './reducers/RootReducer';

// create a stack navigator for the individual recipes
const stackNavi = StackNavigator({
  RecipePicker: { screen: RecipePicker },
  Recipe: { screen: Recipe },
})

// create a tab navigator as the primary navigation
const Tabs = TabNavigator({
  IngredientPicker: {
    screen: IngredientPicker,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name='ios-basket-outline'
          size={Platform.OS === 'ios' ? 40 : 26}
          style={{ color: tintColor, }}
        />
      ),
    },
  },
  RecipePicker: {
    screen: stackNavi,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name='ios-archive-outline'
          style={{ color: tintColor }}
          size={Platform.OS === 'ios' ? 40 : 26}
        />
      ),
    },
  },
  BarcodeScanner: {
    screen: Test,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name='ios-barcode-outline'
          style={{ color: tintColor }}
          size={Platform.OS === 'ios' ? 40 : 26}
        />
      ),
    },
  },
  GroceryList: {
    screen: GroceryList,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name='ios-cart-outline'
          style={{ color: tintColor }}
          size={Platform.OS === 'ios' ? 40 : 26}
        />
      ),
    },
  },
  Profile: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name='ios-contact-outline'
          style={{ color: tintColor }}
          size={Platform.OS === 'ios' ? 40 : 26}
        />
      ),
    },
  },
},
{
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    activeTintColor: '#d03d67',
    inactiveTintColor: '#636e8e',
    allowFontScaling: false,
    style: {
      backgroundColor: '#191e45',
    },
    indicatorStyle: {
      borderBottomWidth:1,
      backgroundColor: '#d03d67'
    },
  },
  backBehavior: 'none',
});

export default class App extends React.Component {
  store = createStore(Reducer, applyMiddleware(thunk));

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  // load the fonts required by the app
  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      multicolore: require('./assets/fonts/Multicolore.otf'),
      comfortaa: require('./assets/fonts/Comfortaa.ttf'),
      comfortaaBold: require('./assets/fonts/Comfortaa-Bold.ttf'),
    });
    this.setState({ loaded: true });
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  render() {
    if(!this.state.loaded){
      return <View style={{backgroundColor: '#191e45', flex:1}}></View>
    }
    return (
      <Provider store={this.store}>
        <Tabs/>
      </Provider>
    );
  }
}
