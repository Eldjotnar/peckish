import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback
} from 'react-native';

export class GroceryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: '#191e45',
      buttonName: 'ios-checkmark-circle-outline'
    }
  }

  _selectItem = () => {
    if (this.state.buttonColor == '#191e45')
      this.setState({buttonColor: '#d03d67', buttonName: 'ios-checkmark-circle'})
    else
      this.setState({buttonColor: '#191e45', buttonName: 'ios-checkmark-circle-outline'});
  }

  render () {
    return (
      <View style={styles.groceryItem}>
        <View style={styles.iconContainer}>
          <TouchableWithoutFeedback onPress={this._selectItem} style={styles.iconContainer}>
            <Ionicons style={{color: this.state.buttonColor}} name={this.state.buttonName} size={40} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{this.props.text}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  groceryItem: {
    height: 60,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 10,
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
  }
});
