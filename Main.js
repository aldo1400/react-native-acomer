//https://ionicframework.com/docs/ionicons/
import React from 'react'
import { StyleSheet, Platform, Image, Text,
  View ,ListView,FlatList,TouchableOpacity,TextInput} from 'react-native'
  import { SearchBar,Button } from 'react-native-elements'
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import Restaurante from './restaurante'
const database = firebase.database();


export default class Main extends React.Component {

  state = {

  }
  constructor(props) {
    super(props);
    //realtime listener for firebase db

    this.itemsRef = database.ref('/restaurante');
    this.state = { description: '', todos: [], date: '', currentUser: null ,items: [],email:'',horario:'',imagen:'',horario:'',nombre:'',likes:'',searchText:''};
  }


  keyExtractor = (item) => item.id;

handlePress(item){
  this.props.navigation.navigate('RestaurantBox',{nombre:item.nombre,horario:item.horario,email:item.email,imagen:item.imagen});
}



  renderItem = ({item}) => (

    //aqui trabajamos
    <View style={styles.artistBox}>
        <Image style={styles.image} source={{uri:item.imagen}}/>
        <View style={styles.info}>
        <TouchableOpacity onPress={()=>this.handlePress(item)}>
        <Text style={styles.name}>{item.nombre}</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <View style={styles.iconcontenedor}>
          <TouchableOpacity onPress={this.handlePressLike(likeIcon)}>
          <Icon name="md-heart-outline" size={30} color="#e74c3c"/>
          </TouchableOpacity>
          <Text style={styles.count}>{item.likes}</Text>
          </View>
          <View style={styles.iconcontenedor}>
          <Icon name="ios-chatboxes-outline" size={30} color="gray"/>
          <Text style={styles.count}>comment</Text>
          </View>
        </View>
        </View>
    </View>

  )
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

    this.setState({todos: items});
  });
}

firstSearch() {
  this.searchDirectory(this.itemsRef);
}

searchDirectory(itemsRef) {

  var searchText = this.state.searchText.toString();
  
  if (searchText == ""){
    this.listenForItems(itemsRef);
  }else{
    // this.itemsRef.orderByChild("searchable").startAt(searchText).on('value', (snap) => {
      database.ref().child('restaurante').orderByChild('nombre').equalTo(searchText).on('value', (snap) => {
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
      // this.listenForItems(this.itemsRef);
  
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
        <View style={styles.header}>
          <Image style={styles.logo} source={require('./logo3.png')} />
          <Text style={styles.usuario}>
            Hi   {currentUser && currentUser.email}
          </Text>

          <TouchableOpacity onPress={this.handleLogout}>
            <Icon name="md-power" size={30} color="white"/>
            <Text style={styles.salir}>Salir</Text>
          </TouchableOpacity>
          </View>
          <SearchBar
          showLoading
          platform="android"
          returnKeyType='search'
          onChangeText={(text)=>this.setState({searchText:text})}
          onSubmitEditing={()=>this.firstSearch()}
          cancelButtonTitle="Cancel"
          placeholder='Busca tu Restaurante favorito' />
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
    paddingTop:20,
    backgroundColor: 'white',
  },
  header: {
    height: 70,
    backgroundColor: '#BE3A1D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 2,
    paddingHorizontal: 5,
    marginBottom: 10,
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
  },
  logo:{
    width:65,
    height:65,
    borderRadius:30,
  },
  usuario:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  salir:{
    color: 'white',
    fontSize: 10,
  }
});
