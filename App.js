import React from 'react';
import { StackNavigator } from 'react-navigation';

import IngredientPicker from './screens/IngredientPicker'
import Test from './screens/Test'

const Navi = StackNavigator({
  IP: {screen: IngredientPicker},
  TS: {screen: Test},
});

export default class App extends React.Component {
  render() {
    return <Navi/>;
  }
}
