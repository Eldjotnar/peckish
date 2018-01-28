import React from 'react';
import { StackNavigator} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
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
  Button,
} from 'react-native';

import { IngredientButton } from '../components/IngredientButton';
import { TopBar } from '../components/TopBar';
import { fetchData, fetchIngredients } from '../actions/Actions';
import {
  sortIngredientsByName,
  sortIngredientsByCategory,
  sortIngredientsByFrequency,
  searchForIngredient,
} from '../actions/sortActions';

var {width, height} = Dimensions.get('window');
var numSelected = 0; //number of ingredients the user selected
var selectedIngredients = {};

class IngredientPicker extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      textSearchHeight: 0,
      keyboardShowing: false,
      reRenderList: false,
      showPopup: 'none',
      data: []
    }
  }

  // removes the default navigation header
  static navigationOptions = {
    header: null
  }

  // loads the font on initial load and creates a listener for the keyboard
  componentWillMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.props.fetchIngredients();
  }

  // displays the popup and animates it in
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

  // automatically hides the search bar if the user closes the keyboard
  // without clicking the search button
  _keyboardDidHide = () => {
    this.setState({
      textSearchHeight: 0,
    })
  }

  // monitors the number of buttons pressed from the IngredientButtons and displays
  // the popup if the user has selected more than 4
  _getNumButtonsPressed = (numButtonsPressed) => {
    numSelected = numButtonsPressed;
    if(numSelected >= 4 && this.state.showPopup != 'flex'){
      this.setState({showPopup: 'flex'});
      this.animate(Easing.ease);
    }
  }

  // gets a JSON of which ingredients the user currently has selected
  _getSelectedIngredients = (mySelected) => {
    selectedIngredients = mySelected;
  }

  // the button that is rendered by the flatlist, which also
  // returns the buttons pressed and their respective ingredients
  _renderItem = ({item}) => (
    <IngredientButton
      title={item.key}
      callbackFromParent={this._getNumButtonsPressed}
      ingredientsFromParent={this._getSelectedIngredients}
    />
  );

  _getRecipes = () => {
    const { navigate } = this.props.navigation;
    this.props.fetchData(selectedIngredients);
    navigate(
      'RecipePicker', {
        numIngredients: numSelected,
      }
    );
  }

  // opens the drawer for sorting ingredients
  _leftAction = () => {
    this._drawer.open();
  }

  // opens the keyboard and displays the search bar
  // hides the keyboard and search bar on second click
  _rightAction = () => {
    if(!this.state.keyboardShowing){
      this.refs.searchBar.focus();
      this.setState({
        textSearchHeight: 50,
        keyboardShowing: true,
      })
    } else {
      Keyboard.dismiss();
      this.setState({keyboardShowing: false, textSearchHeight: 0})
    }
  }

  // sorts the ingredients alphabetically and refreshes the
  // displayed buttons
  _sortAlphabetically = () => {
    this.props.sortIngredientsByName();
    this.setState({reRenderList:true});
    this._drawer.close();
  }

  // sorts the ingredients by frequency in each recipe
  // and refreshes the displayed buttons
  _sortByFrequency = () => {
    this.props.sortIngredientsByFrequency();
    this.setState({reRenderList:true});
    this._drawer.close();
  }

  // sorts the ingredients by category and
  // refreshes the displayed buttons
  _sortByCategory = () => {
    this.props.sortIngredientsByCategory();
    this.setState({reRenderList:true});
    this._drawer.close();
  }

  // searches the data for ingredients that contain that specific string
  _searchForIngredient = (input) => {
    this.props.searchForIngredient(input);
  }

  render() {
    const { navigate } = this.props.navigation;
    const spin = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-width, 0]
    })
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        tapToClose={true}
        openDrawerOffset={width/2}
        content={
          <View style={styles.sideDrawerMain}>
            <Text style={[styles.drawerText,{marginTop: height/50, fontSize:16}]}>Sort Ingredients By</Text>
              <Text style={styles.drawerText} onPress={this._sortAlphabetically}>Name</Text>
              <Text style={styles.drawerText} onPress={() => console.log("hi")}>Category</Text>
              <Text style={styles.drawerText} onPress={this._testServer}>Frequency</Text>
          </View>
        }>
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
            data={this.props.ingredients[0]}
            numColumns={2}
            keyboardShouldPersistTaps={"always"}
            extraData={this.state.reRenderList}
            contentContainerStyle={styles.listContainer}
            renderItem={this._renderItem}
          />
          <KeyboardAvoidingView behavior="padding">
            <Animated.View style={[styles.popup, {display: this.state.showPopup, marginLeft: spin}]}>
              <Text style={styles.popupText}>Find recipes!</Text>
              <TouchableOpacity onPress={this._getRecipes}>
                <Ionicons style={styles.popIcons} name="ios-arrow-dropright" size={40} />
              </TouchableOpacity>
            </Animated.View>
            <TextInput
              style={[styles.textInput, {height: this.state.textSearchHeight}]}
              onSubmitEditing={this._keyboardDidHide}
              autoCapitalize={'none'}
              onChangeText={(text) => this._searchForIngredient(text)}
              ref='searchBar' />
          </KeyboardAvoidingView>
        </View>
      </Drawer>
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
  },
  sideDrawerMain: {
    flex: 1,
    paddingTop: height/50 + 15,
    alignItems: 'center',
  },
  drawerText: {
    fontFamily: 'multicolore',
    color:'black',
    marginTop: 20,
  }
});

function mapStateToProps (state) {
  return {
    ingredients: state.ingredients,
    ingredientsIsFetching: state.ingredientsIsFetching
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchIngredients: () => dispatch(fetchIngredients()),
    fetchData: (selectedIngredients) => dispatch(fetchData(selectedIngredients)),
    sortIngredientsByName: () => dispatch(sortIngredientsByName()),
    sortIngredientsByCategory: () => dispatch(sortIngredientsByCategory()),
    sortIngredientsByFrequency: () => dispatch(sortIngredientsByFrequency()),
    searchForIngredient: (input) => dispatch(searchForIngredient(input)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientPicker);
