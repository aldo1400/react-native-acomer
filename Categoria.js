import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet,TouchableOpacity} from 'react-native'
import firebase from 'react-native-firebase';


export default class Categoria extends Component {

  render() {
    return (
      <View style={styles.containerCategory}>
      <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={()=>{this.props.editar2(this.props.item)}}>
        <Image source={{uri:this.props.item.imagen}} style={{height:150}}/>
            <Text style={styles.textoverlay}>{this.props.item.nombre}</Text>
    </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    containerCategory:{

    },
    textoverlay:{
        position:'absolute',
        left:0,
        top:115,
        fontSize:25,
        fontWeight:'bold',
        color:'white'
      },
      button:{
        //   opacity:0.9
      }

})