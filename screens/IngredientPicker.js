import React from 'react';
import { StackNavigator} from 'react-navigation';
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Image,
  FlatList,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import { IngredientButton } from '../components/IngredientButton';
import { TopBar } from '../components/TopBar';
var {width, height} = Dimensions.get('window');
var numSelected = 0; //number of ingredients the user selected

export default class IngredientPicker extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      loaded: false,
      textSearchHeight: 0,
      showPopup: 'none',
      data: [
        {key: 'elbow macaroni'},
        {key: 'butter'},
        {key: 'dijon mustard'},
        {key: 'cayenne pepper'},
        {key: 'shredded sharp cheddar'},
        {key: 'flour'},
        {key: 'tomatoes'},
        {key: 'dry yeast'},
        {key: 'mozarella'},
        {key: 'basil'},
        {key: 'oregano'},
        {key: 'white onions'},
        {key: 'garlic'},
        {key: 'pepperoni'},
        {key: 'mushrooms'},
        {key: 'tomato sauce'},
        {key: 'mango'},
        {key: 'apples'},
        {key: 'rice'},
        {key: 'sausages'},
        {key: 'bell peppers'},
        {key: 'arugala'},
        {key: 'bamboo shoots'},
        {key: 'cauliflower'},
        {key: 'camerbert'},
        {key: 'bacon'},
        {key: 'ricotta'},
      ]
    }
  }
  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    this._loadAssetsAsync();
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  animate (easing) {
    this.setState({showPopup: 'flex'});
    this.animatedValue.setValue(0)
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 400,
          easing
        }
    ).start()
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      multicolore: require('../assets/fonts/Multicolore.otf'),
    });
    this.setState({ loaded: true });
  };

  _keyboardDidHide = () => {
    this.setState({
      textSearchHeight: 0,
    })
  }

  _getNumButtonsPressed = (numButtonsPressed) => {
    numSelected = numButtonsPressed; //this takes the numPressed from IngredientButton and passes it to the global variable here
    if(numSelected >= 4 && this.state.showPopup != 'flex'){
      this.setState({showPopup: 'flex'});
      this.animate(Easing.ease);
    }
  }

  _renderItem = ({item}) => (
    <IngredientButton
      title={item.key}
      callbackFromParent={this._getNumButtonsPressed}
    />
  );

  _leftAction = () => {
    console.log("left button pressed");
  }

  _rightAction = () => {
    this.refs.searchBar.focus();
    this.setState({
      textSearchHeight: 50,
    })
  }


  render() {
    const { navigate } = this.props.navigation;
    const spin = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-width, 0]
    })
    if(!this.state.loaded){
      return <Image source={require('../assets/images/splash_screen.png')} style={{resizeMode:'cover', position:'absolute', top:0, left:0}} />
    }
    return (
      <View style={styles.main}>
        <StatusBar
          barStyle="light-content"
          translucent={false}
        />
        <Image source={require('../assets/images/banner.png')} style={styles.backgroundImage} />
        <TopBar title="select ingredients"
          leftIcon="ios-menu"
          leftAction={this._leftAction}
          rightIcon="ios-search"
          rightAction={this._rightAction} />
        <FlatList
          data={this.state.data}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          renderItem={this._renderItem}
        />
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={[styles.textInput, {height: this.state.textSearchHeight}]}
            onSubmitEditing={this._keyboardDidHide}
            ref='searchBar' />
        </KeyboardAvoidingView>
        <Animated.View style={[styles.popup, {display: this.state.showPopup, marginLeft: spin}]}>
          <Text style={styles.popupText}>Find recipes!</Text>
          <TouchableOpacity onPress={() => navigate('RecipePicker')}>
            <Ionicons style={styles.popIcons} name="ios-arrow-dropright" size={40} />
          </TouchableOpacity>
        </Animated.View>
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
  listContainer: {
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontFamily: 'multicolore',
    justifyContent: 'center',
    paddingLeft: width/20,
    fontSize: 16,
  },
  popup: {
    height: 70,
    backgroundColor: '#d03d67',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  popupText: {
    fontFamily: 'multicolore',
    fontSize: 18,
    color: 'white',
  },
  popIcons: {
    color: 'white',
    marginLeft: 20,
  }
});
