import React, { Component } from 'react'
import { Text, View ,FlatList,StyleSheet,TouchableOpacity} from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/Ionicons'
import PlatosBox from './PlatosBox'
const database = firebase.database();

export default class Platos extends Component {
  
  state={
    platos:[]
  }

  keyExtractor = (item) => item.id;

  componentDidMount(){
    const { navigation } = this.props;
const Id_restaurante = navigation.getParam('nombre', '');
console.log(Id_restaurante);
 
        database.ref().child('restaurante').orderByChild('likeCount').on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                    // const tipo=snap.child('tipo_restaurante');
                    console.log(child.key)
                // database.ref().child('restaurante').child('tipo_restaurante').equalTo('Criollos y parrillas').on('value', (snap) => {
                if(child.key===Id_restaurante){
                  console.log(child.val().platos)
                  child.val().platos.map((plato,key)=> {
                    if(!plato){

                    }
                    else{
                      items.push({
                        
                        id: key,
                        nombre:plato.nombre,
                        calificacion: plato.calificacion,
                        descuento:plato.descuento,
                        oferta:plato.oferta,
                        precio:plato.precio,
                        imagen:plato.imagen
                        // likeCount:child.val().likeCount,
                      });
                      

                      return true;
                    }
                    
                  
                  })
                    
                }
              
            });
            // items.reverse();
            console.log(items);
            this.setState({
              platos: items
            });
          });
          console.log(this.state.platos);
  }

  render() {
    const { navigation } = this.props;
    const Name = navigation.getParam('nombre', '');
    console.log(this.state.platos);
    return (
      <View>
        {/* <Text>{this.state.platos.nombre}</Text> */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')}>
           <View style={styles.backButton}>
             <Icon name="ios-arrow-round-back" size={32} />
           </View>
         </TouchableOpacity>

        <FlatList
// horizontal
//  style={styles.lista}
//  horizontal
 data = {this.state.platos}
 showsHorizontalScrollIndicator={false}
 keyExtractor = {this.keyExtractor}
 renderItem={({item})=> <PlatosBox item={item} editar={()=>{this.handlePress(item)}}/>}
      />

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop:20,
    // backgroundColor: '#EFF4F7',
  }
})