
import React, { Component } from 'react';
import {
  Platform,
  Button,
  StyleSheet,
  Text,
  Alert,
  Image,
  View
} from 'react-native';

// import Icon from 'react-native-vector-icons/Ionicons';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class RestauranteBox extends Component{

  render() {
    const {name, age}=this.props.restaurante;

    return (
      
        <View style={styles.artistBox}>
          {/* <Image  style={styles.image} source={{uri:image}}/> */}
          <View style={styles.info}>
          
          <Text style={styles.name}>{name}dsfsd</Text>
          <View style={styles.row}>
          
          <View style={styles.iconContainer}>
          {/* <Icon name="ios-heart" size={30} color="black" /> */}
          <Text style={styles.count}>{age}</Text>
         </View>
         
         {/* <View style={styles.iconContainer}>
          <Icon name="ios-chatbubbles" size={30} color="black" />
          <Text>{comments}</Text>
          </View> */}

          </View>
          </View>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  image:{
    width:150,
    height:150
  },
  artistBox:{
    margin:5,
    backgroundColor:'white',
    flexDirection:'row',
    elevation:2
  },
  info:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  name:{
    fontSize:20,
    marginTop:10,
    color:'#333'
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:40,
    marginTop:15
  },
  iconContainer:{
    flex:1,
    alignItems:'center'
  },
  count:{
    color:'gray'
  }

});
