import React, { Component } from 'react'
import { Text, View ,FlatList,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
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
      handlePress12(item){
    // const {navigation}=this.props;-
    const { navigation } = this.props;
navigation.navigate('RestaurantBox',{nombre:item.nombre,horario:item.horario,email:item.email,imagen:item.imagen,id:item.id,pagina_web:item.pagina_web});
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
        
    }


  render() {
    const { navigation } = this.props;
    const Name = navigation.getParam('nombre', '');
    console.log(Name);
    const currentUser=firebase.auth().currentUser;
    return (
      
      <View>
         <View style={styles.header}>
         <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')}>
           <View style={styles.backButton}>
             <Icon name="ios-arrow-dropleft-circle" size={32} color='white' />
           </View>
         </TouchableOpacity>
         <Text style={styles.title}>{Name}</Text>
        
         <View style={styles.backButton} style={{height:0}} />
         </View>

        {/* <Header 
                    currentUser={currentUser}
                    handleLogout={this.handleLogout}
                  /> */}
                
                  

     <FlatList
                  // style={styles.lista}
                    data = {this.state.todos}
                    keyExtractor = {this.keyExtractor}
                    renderItem={({item})=> <RestauranteCategoria item={item} editar={()=>{this.handlePress(item)}} enviar={()=>{this.handlePress12(item)}}/>}
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
    },
    nombre:{
      backgroundColor:'white',
      height:23,

    },
    texto:{
      fontSize:20
    },
    titulo:{
      position:'absolute',
      // textTransform:'uppercase',
      fontSize:23,
      left:30
    },
    header: {
      height: 50,
      backgroundColor: '#fa063a',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom:5,
      // marginLeft: -10,
      elevation:5
      // marginBottom: 10,
      
    },
    title: {
      fontSize: 25,
      textAlign: 'center',
      color: 'white',
    },
    backButton: {
      padding: 5,
      paddingTop: 10,
      width: 60,
      paddingLeft:15
      // marginRight: 25,
    },
  })