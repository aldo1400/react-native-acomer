import React, { Component } from 'react'
import { Text, View ,FlatList} from 'react-native'
import firebase from 'react-native-firebase'
import Restaurante from './Restaurante'
import RestauranteCategoria from './RestauranteCategoria'
import Header from './componentes/Header';

const database = firebase.database();

export default class CategoryBox extends Component {

    state={
        todos:[]
    }
    
    componentDidMount(){
        const { navigation } = this.props;
    const Name = navigation.getParam('nombre', '');
    console.log(Name)
     
            database.ref().child('restaurante').orderByChild('likeCount').on('value', (snap) => {
                var items = [];
                snap.forEach((child) => {
                        // const tipo=snap.child('tipo_restaurante');
                        // console.log()
                    // database.ref().child('restaurante').child('tipo_restaurante').equalTo('Criollos y parrillas').on('value', (snap) => {
                    if(child.val().tipo_restaurante.nombre===Name){
                        items.push({
                            id: child.key,
                            description: child.val().description,
                            email: child.val().email,
                            imagen:child.val().imagen,
                            likeCount:child.val().likeCount,
                            horario:child.val().horario,
                            nombre:child.val().nombre,
                            date:child.val().date,
                          });
                    }
                  
                });
                items.reverse();
                this.setState({
                  todos: items
                });
              });

            
            // items = [];


        //     snap.forEach((child) => {
        //       items.push({
        //         id: child.key,
        // // description: child('restaurante').val().description,
        // email: child.val().email,
        // imagen:child.val().imagen,
        // likeCount:child.val().likeCount,
        // horario:child.val().horario,
        // nombre:child.val().nombre,
        // date:child.val().date,
              
        //       });
        //     });
        //     this.setState({
        //         todos:items
        //     })
            // console.log(todo);
        // })


        
    }


  render() {
    const { navigation } = this.props;
    const Name = navigation.getParam('nombre', '');
    console.log(Name);
    const currentUser=firebase.auth().currentUser;
    return (
      <View>
        
        <Header 
                    currentUser={currentUser}
                    handleLogout={this.handleLogout}
                  />
                  <Text> {Name} </Text>
     <FlatList
                //   style={styles.lista}
                    data = {this.state.todos}
                    keyExtractor = {this.keyExtractor}
                    renderItem={({item})=> <RestauranteCategoria item={item} editar={()=>{this.handlePress(item)}}/>}
                  /> 
      </View>
    )
  }
}