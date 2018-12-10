import React, { Component } from 'react'
import { Text, View, TouchableOpacity,Image,StyleSheet } from 'react-native'

export default class FavoritosBox extends Component {
  render() {
    return (

      <View style={styles.containerCategory}>
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={()=>{this.props.enviar(this.props.item)}}>
          <Image source={{uri:this.props.item.imagen_fondo}} style={{height:150,opacity:0.9}} />
          <Image source={{uri:this.props.item.imagen}} style={styles.icono} />
              <Text style={styles.textoverlay}>{this.props.item.nombre}</Text>
      </TouchableOpacity>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  containerCategory:{
      // elevation:5,
      marginBottom:5,
      marginTop:3,
      // height:150,
      // borderColor:'red'
  },
  textoverlay:{
      position:'absolute',
      left:15,
      top:115,
      fontSize:20,
      fontWeight:'100',
      color:'white'
    },
    button:{
      //   opacity:0.9
    },
    icono:{
      height:50,
      width:50,
      position:'absolute',
      left:15,
      bottom:35
    }

})