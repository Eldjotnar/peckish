import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import IngredientPicker from './screens/IngredientPicker';
import Test from './screens/Test';
import RecipePicker from './screens/RecipePicker';

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
    screen: RecipePicker,
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
  Profile: {
    screen: Test,
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
  animationEnabled: false,
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
});

export default class App extends React.Component {
  render() {
    return <Tabs/>;
  }
}
