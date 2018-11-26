import React from 'react'
import { StyleSheet, Platform, Image, Text,
  View ,ListView,FlatList,TouchableOpacity,TextInput} from 'react-native'
import firebase from 'react-native-firebase';
import Search from './componentes/Search';
import Header from './componentes/Header';
import Restaurante from './Restaurante';
import SliderRestaurante from './componentes/Slider';
import {createDrawerNavigator} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';


const database = firebase.database();

const AppDrawerNavigator=createDrawerNavigator({
  Home:HomeScreen
})

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.itemsRef = database.ref('/restaurante');
    this.state = { description: '', todos: [], date: '', currentUser: null ,items: [],email:'',horario:'',imagen:'',horario:'',nombre:'',likes:'',searchText:''};
    this.cambiartexto=this.cambiartexto.bind(this);
    this.searchDirectory=this.searchDirectory.bind(this);
  }




  keyExtractor = (item) => item.id;

handlePress(item){
  this.props.navigation.navigate('RestaurantBox',{nombre:item.nombre,horario:item.horario,email:item.email,imagen:item.imagen});
}

handleLogout(){
  firebase
  .auth()
  .signOut()
  .then(() => this.props.navigation.navigate('SignUp'))
}

 // List todos
 listenForItems(itemsRef) {
  database.ref().child('restaurante').orderByChild('likeCount').on('value', (snap) => {
    var items = [];
    snap.forEach((child) => {
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
    });
    items.reverse();
    this.setState({
      todos: items
    });
  });
}

cambiartexto(texto){
 this.setState({
   searchText:texto
 })
}

searchDirectory() {

  if (this.state.searchText == ""){
    this.listenForItems(this.state.itemsRef);
  }
  else{
      database.ref().child('restaurante').orderByChild('nombre').equalTo(this.state.searchText).on('value', (snap) => {
      items = [];
      snap.forEach((child) => {
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
      });
  
      this.setState({todos: items});
    });
  }
  
  }

componentDidMount() {
  const { currentUser } = firebase.auth()
  this.setState({ currentUser })
  this.listenForItems(this.itemsRef);
}
render() {
    const { currentUser } = this.state

      return (
              <View style={styles.container}>
                  <AppDrawerNavigator/>
                  <Header 
                    currentUser={currentUser}
                    handleLogout={this.handleLogout}
                  />
                  
                   <SliderRestaurante/>
                  <Search 
                    searchDirectory={this.searchDirectory}
                    cambiartexto={this.cambiartexto}
                  />
                 
                  <FlatList
                    data = {this.state.todos}
                    keyExtractor = {this.keyExtractor}
                    renderItem={({item})=> <Restaurante item={item} editar={()=>{this.handlePress(item)}}/>}
                  />
              </View>
          )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:0,
    backgroundColor: 'white',
  },
  inputContainer: {
    height: 30,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  input: {
    height: 50,
    flex: 1,
  }
});
