import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,Image,StyleSheet} from 'react-native'


export default class RestauranteCategoria extends Component {
  render() {
    
    return (
        <View>
            {/* <Text>Holaa</Text> */}
        
       < View style={styles.containerCategory}>
        {/* <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={()=>{this.props.editar2(this.props.item)}}> */}
          <Image source={{uri:this.props.item.imagen_fondo}} style={{height:150}} />
              <Text style={styles.textoverlay}>{this.props.item.nombre}</Text>
      {/* </TouchableOpacity> */}
        </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    containerCategory:{
        elevation:5,
        marginBottom:5,
        marginTop:3
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