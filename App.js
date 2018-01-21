import React from 'react';
import { StackNavigator } from 'react-navigation';

import IngredientPicker from './screens/IngredientPicker';
import Test from './screens/Test';
import RecipePicker from './screens/RecipePicker';

const Navi = StackNavigator({
  IP: {screen: IngredientPicker},
  RP: {screen: RecipePicker},
  TS: {screen: Test},
});

export default class App extends React.Component {
  render() {
    return <Navi/>;
  }
}
