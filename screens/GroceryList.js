import React, { Component } from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
  Image,
  Text,
  StyleSheet,
  Button,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';

import { TopBar } from '../components/TopBar';
import { GroceryListItem } from '../components/GroceryListItem';
import { addCustomToGroceryList } from '../actions/GroceryActions';
var {width, height} = Dimensions.get('window');

class GroceryList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openModal: false,
      customItem: "",
      customAmount: "",
    }
  }

  static navigationOptions = {
    header: null
  }

  _renderItem = ({item}) => (
    <GroceryListItem
      text={item.key}
      amount={item.amount} />
  );

  _leftAction = () => {
    this.setState({openModal: true})
  }

  _submitItem = () => {
    this.setState({openModal: false})
    this.props.addCustomToGroceryList({key: this.state.customItem, amount: this.state.customAmount});
  }

  _addCustomItem = (input) => {
    this.setState({customItem: input})
  }

  _addCustomAmount = (input) => {
    this.setState({customAmount: input})
  }

  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main}>
        <StatusBar
          barStyle="light-content"
          translucent={false}
        />
        <Modal
          visible={this.state.openModal}
          animationType={'slide'}
          onShow={() => this.refs.searchBar.focus()} >
          <View style={styles.modalStyle}>
            <TopBar title="Add item to grocery list"/>
            <View>
              <TextInput style={styles.textInput}
                placeholder="item"
                ref='searchBar'
                onChangeText={(text) => this._addCustomItem(text)}
                onSubmitEditing={()=> this.refs.amountBar.focus()} />
              <TextInput style={styles.textInput}
                placeholder="amount"
                ref='amountBar'
                onChangeText={(text) => this._addCustomAmount(text)}
                onSubmitEditing={this._submitItem} />
              <TouchableWithoutFeedback onPress={this._submitItem}>
                <View style={styles.loginButton}>
                  <Text style={[styles.titleText, {color:'white'}]}>Submit</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>
        <Image source={require('../assets/images/banner.png')} style={styles.backgroundImage} />
        <TopBar title="your grocery list"
          leftIcon="ios-add-circle-outline"
          leftAction={this._leftAction}
          rightIcon="ios-search"
          rightAction={() => console.log(this.state.data)} />
        <FlatList
          data={this.props.groceries.groceryList}
          renderItem={this._renderItem}
        />
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
  groceryItem: {
    height: 60,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row'
  },
  iconContainer: {
    width: '20%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '80%',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'multicolore',
    fontSize: 20,
  },
  modalStyle: {
    backgroundColor: '#191e45',
    flex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontFamily: 'multicolore',
    justifyContent: 'center',
    paddingLeft: width/20,
    fontSize: 16,
    height: 50,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#d03d67',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    marginHorizontal: 20,
  }
});

function mapStateToProps (state) {
  return {
    groceries: state.groceries
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCustomToGroceryList: (data) => dispatch(addCustomToGroceryList(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroceryList);
