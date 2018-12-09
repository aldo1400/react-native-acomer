import React, { Component } from 'react'
import { Text, View ,FlatList,StyleSheet,TouchableOpacity} from 'react-native'
import firebase from 'react-native-firebase'
import Restaurante from './Restaurante'
import RestauranteCategoria from './RestauranteCategoria'
import Header from './componentes/Header';
import Icon from 'react-native-vector-icons/Ionicons'

const database = firebase.database();

export default class CategoryBox extends Component {

    state={
        todos:[]
    }
    keyExtractor = (item) => item.id;
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
                            imagen_fondo:child.val().imagen_fondo
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
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')}>
           <View style={styles.backButton}>
             <Icon name="ios-arrow-round-back" size={32} />
           </View>
         </TouchableOpacity>
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


const styles = StyleSheet.create({
    container: {
      // flex: 1,
      // paddingTop:20,
      // backgroundColor: '#EFF4F7',
    }
  })