import React from 'react';
import { StackNavigator } from 'react-navigation';

import IngredientPicker from './screens/IngredientPicker';
import Test from './screens/Test';
import RecipePicker from './screens/RecipePicker';

const Navi = StackNavigator({
  IP: {screen: IngredientPicker},
  TS: {screen: Test},
  RP: {screen: RecipePicker},
});

export default class App extends React.Component {
  render() {
    return <Navi/>;
  }
}
