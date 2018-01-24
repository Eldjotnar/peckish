import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AppLoading, Font } from 'expo';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

var {width, height} = Dimensions.get('window');
var numSelected = 0;
var selectedIngredients = {type:"ingredients", ingredients:[]};

export class IngredientButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      buttonColor: '#36363660',
    }
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      multicolore: require('../assets/fonts/Multicolore.otf'),
    });
    this.setState({ loaded: true });
  };

  _onPress = () => {
    if(this.state.buttonColor == '#36363660'){
      this.setState({ buttonColor: '#d03d67' });
      selectedIngredients.ingredients.push(this.props.title);
      numSelected++;
    } else {
      this.setState({ buttonColor: '#36363660' });
      var index = selectedIngredients.ingredients.indexOf(this.props.title);
      if (index > -1) {
        selectedIngredients.ingredients.splice(index, 1);
      }
      numSelected--;
    }
    this.props.callbackFromParent(numSelected);
    this.props.ingredientsFromParent(selectedIngredients);
    //console.log(selectedIngredients.ingredients);
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={[styles.buttonStyle, {backgroundColor: this.state.buttonColor}]}>
          <Text style={styles.buttonText}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#36363660',
    justifyContent: 'center',
    margin: 10,
    width: ((width - 20) - 40)/2, /*this is a function of the margins of the container and button*/
    borderRadius: 4,
  },
  buttonText: {
    fontFamily: 'multicolore',
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    padding: 10,
    backgroundColor: 'transparent',
  }
});
