import React from 'react';
import { StackNavigator } from 'react-navigation';

import { AppLoading, Font } from 'expo';
import { StyleSheet, Text, View, Dimensions, Platform, Image, FlatList, TouchableHighlight, StatusBar } from 'react-native';

var {width, height} = Dimensions.get('window');

import { IngredientButton } from '../components/IngredientButton';
import { BottomBar } from '../components/BottomBar';
import { TopBar } from '../components/TopBar';

export default class IngredientPicker extends React.Component {
  constructor(props) {
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
      multicolore: require('../assets/fonts/Multicolore.otf'),
    });
    this.setState({ loaded: true });
  };

  _renderItem = ({item}) => (
    <IngredientButton
      title={item.key}
    />
  );

  _leftAction = () => {
    console.log("left button pressed");
  }

  _rightAction = () => {
    console.log("right button pressed");
  }

  render() {
    const { navigate } = this.props.navigation;
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
        <TopBar title="select ingredients"
          leftIcon="ios-menu"
          leftAction={this._leftAction}
          rightIcon="ios-search"
          rightAction={this._rightAction} />
        <FlatList
          data={[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'a nice handlebar mustache'}, {key: 'pickles'}, {key: 'toast'}]}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          renderItem={this._renderItem}
        />
        <BottomBar/>
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
  }
});
