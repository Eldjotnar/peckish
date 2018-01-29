import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform
} from 'react-native';

var {width, height} = Dimensions.get('window');

export class RecipeCard extends React.PureComponent {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.recipeCard}>
        <View style={styles.recipeImageContainer}>
          <Image source={this.props.imagePath} style={styles.recipeImage}/>
        </View>
        <View style={styles.recipeTextContainer}>
          <Text numberOfLines={2} style={styles.recipeTitle}>{this.props.title}</Text>
          <Text numberOfLines={1} style={styles.recipeDescription}>{this.props.source}</Text>
          <Text style={styles.recipeIngredientsMissing}>Ingredients missing: {this.props.missing}</Text>
        </View>
        <TouchableOpacity style={styles.arrowContainer} onPress={this.props.recipeAction}>
          <Ionicons name="ios-arrow-forward" size={30}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  recipeCard: {
    height: height/6,
    minHeight: 120,
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 30
  },
  recipeImageContainer: {
    height: '100%',
    width: '35%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    overflow: 'hidden',
  },
  recipeImage: {
    resizeMode: 'cover',
    width: null,
    height: null,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flex: 1,
  },
  recipeTextContainer: {
    width: '50%',
    padding: 5,
  },
  recipeTitle: {
    fontFamily: 'comfortaaBold',
    paddingBottom: 2,
    fontSize: 14,
  },
  recipeDescription: {
    fontFamily: 'comfortaa',
    color: '#636e8e',
    fontSize: 12,
  },
  recipeIngredientsMissing: {
    fontFamily: 'comfortaa',
    position:'absolute',
    fontSize: 12,
    bottom: 5,
    left: 5,
  },
  arrowContainer: {
    width: '15%',
    height: '100%',
    backgroundColor: '#fff',
    marginLeft: 'auto',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  }
});
