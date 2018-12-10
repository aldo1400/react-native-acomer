import React, { Component } from 'react'
import { Text, View,FlatList } from 'react-native'
import firebase from 'react-native-firebase'
import FavoritosBox from './FavoritosBox'
import RestaurantBox from './RestaurantBox'

const database = firebase.database();

export default class Favorite extends Component {

    state={
        favoritos:[]
    }

    keyExtractor = (item) => item.id;

    handlePress(item){
      // const {navigation}=this.props;-
      const { navigation } = this.props;
  navigation.navigate('RestaurantBox',{nombre:item.nombre,horario:item.horario,email:item.email,imagen:item.imagen,id:item.id,pagina_web:item.pagina_web});
    }
  
componentDidMount(){
    const { uid,email} = firebase.auth().currentUser;    
    database.ref().child('restaurante').orderByChild('likeCount').on('value', (snap) => {
        var items = [];
        snap.forEach((child) => {
                // const tipo=snap.child('tipo_restaurante');
                
                // console.log(child.val().likes);
                const auxiliar=child.val().likes;   
                // console.log(auxiliar)
                var result = Object.keys(auxiliar).map(function(key) {
                    return [key, auxiliar[key]];
                  });

                  console.log(result);
                  result.map((plato,key)=> {
                        console.log(plato[0]);
                    if(plato[0]===uid&&plato[1]===true){
                        console.log(child.key)

                           items.push({
                        id: child.key,
                        nombre:child.val().nombre,
                        calificacion: child.val().calificacion,
                        descuento:child.val().descuento,
                        oferta:child.val().oferta,
                        precio:child.val().precio,
                        imagen:child.val().imagen,
                        likeCount:child.val().likeCount,
                        imagen_fondo:child.val().imagen_fondo
                      });
                    }
                    else{
                        
                    }
                    
                  
                  })

          
        });
        // items.reverse();
        // console.log(items)
        this.setState({
          favoritos: items
        });
        
      });
      console.log(this.state.favoritos);
}


  render() {
    // const { uid,email} = firebase.auth().currentUser;
    console.log(this.state.favoritos)
    return (
      <View>
        <FlatList
         data = {this.state.favoritos}
         showsHorizontalScrollIndicator={false}
         keyExtractor = {this.keyExtractor}
         renderItem={({item})=> <FavoritosBox item={item} enviar={()=>{this.handlePress(item)}} />}
        />
      </View>
    )
  }
}