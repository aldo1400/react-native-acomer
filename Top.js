import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet,TouchableOpacity} from 'react-native'

export default class Categoria extends Component {
  render() {
    return (
      <View style={styles.containerCategory}>
      <TouchableOpacity onPress={()=>{this.props.editar(this.props.item)}}>
            <Image source={{uri:this.props.item.imagen}} style={{height:100,width:100}}/>
            </TouchableOpacity>
            {/* <Text style={styles.textoverlay}>{this.props.item.nombre}</Text> */}
            {/* <Text>Holaasdadasdasdasdasdasdadadadsasd</Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    containerCategory:{
        flex:1,
        margin: 5,
  backgroundColor: 'white',
  flexDirection: 'row',
  shadowColor: 'black',
  elevation:5,
  height:100
    },
    textoverlay:{
        position:'absolute',
        left:0,
        top:115,
        fontSize:25,
        fontWeight:'bold',
        color:'white'
      }
})