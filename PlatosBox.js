import React, { Component } from 'react'
import { Text, View,StyleSheet,Image } from 'react-native'

export default class PlatosBox extends Component {
  render() {
    return (
      <View style={styles.ContainerBox}>
        <Image source={{uri:this.props.item.imagen}} style={{height:null,width:null}} />
        <Image source={{uri:this.props.item.imagen}} style={{height:150}} />
        <View style={styles.nombre}>
        <Text> {this.props.item.nombre}</Text> 
        
        </View>
        <Text style={styles.precio}>Precio : {this.props.item.precio}</Text>
      </View>
    )
  }
}

const styles=StyleSheet.create({
    ContainerBox:{
        flex:1,
        elevation:5,
        margin: 5,
  backgroundColor: 'white',
  flexDirection: 'row',
  
  elevation:5,
  height:350
    },
    nombre:{
        position:'absolute',
        left:15,
        top:250
    },
    precio:{
        color:'red',
        fontSize:20,
        position:'absolute',
        left:15,
        top:300
    }
})