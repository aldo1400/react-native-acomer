// Main.js

import React from 'react'
import { StyleSheet, Platform, Image, Text, View ,Button,ListView,FlatList,TouchableOpacity} from 'react-native'
import firebase from 'react-native-firebase'
// import ItemComponent from './ItemComponent'
// import RestauranteList from './RestauranteList'

const database = firebase.database();
// let itemsRef = database.ref('/restaurante');


export default class Main extends React.Component {
 
  state = { }
  constructor(props) {
    super(props);
    //realtime listener for firebase db

    this.itemsRef = database.ref('/restaurante');
    this.state = { description: '', todos: [], date: '', currentUser: null ,items: [],email:'',horario:'',imagen:'',horario:'',nombre:'',likes:''};
  }
  

  keyExtractor = (item) => item.id;

handlePress(item){
  this.props.navigation.navigate('RestaurantBox',{nombre:item.nombre});
}
  renderItem = ({item}) => (
    <TouchableOpacity onPress={()=>this.handlePress(item)}>
    <View style={styles.artistBox}>
     {/* <Text style={styles.name}>{item.nombre}</Text> */}
          <Image style={styles.image} source={{uri:item.imagen}}/>
          
          <View style={styles.info}>

          <Text style={styles.name}>{item.nombre}</Text>
          
          <View style={styles.row}>
          

          <View style={styles.iconContainer}>
          {/* <Icon name="ios-heart" size={30} color="black" /> */}
          <Text style={styles.count}>{item.date}</Text>
         </View>

         <View style={styles.iconContainer}>
          {/* <Icon name="ios-heart" size={30} color="black" /> */}
          <Text style={styles.count}>{item.date}</Text>
         </View>

        <View >
          {/* <Icon name="ios-heart" size={30} color="black" /> */}
          <Text style={styles.count}>{item.email}</Text>
         </View>
         <Text style={styles.count}>{item.date}</Text>
         <Text style={styles.count}>{item.likes}</Text>
         {/* <View style={styles.iconContainer}>
          <Icon name="ios-chatbubbles" size={30} color="black" />
          <Text>{comments}</Text>
          </View> */}

          </View>
          </View>
        </View>
        </TouchableOpacity>
  )

  

  // <View >
  //   <Text style={{fontSize: 20}}>{item.description}, {item.date}</Text>   
  // </View>;


handleLogout(){
  firebase
  .auth()
  .signOut()
  .then(() => this.props.navigation.navigate('SignUp'))
}

 // List todos
 listenForItems(itemsRef) {
  itemsRef.on('value', (snap) => {
    var items = [];
    snap.forEach((child) => {
      items.push({
        id: child.key,
        description: child.val().description,
        email: child.val().email,
        imagen:child.val().imagen,
        likes:child.val().likes,
        horario:child.val().horario,
        nombre:child.val().nombre,
        date:child.val().date,
      });
    });

    this.setState({todos: items});
  });
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
      
                    
                   
                    <FlatList
            data = {this.state.todos}
            keyExtractor = {this.keyExtractor}
            renderItem = {this.renderItem}
            
            // style={{marginTop: 20}}
            />
                
                    

        <Text>
          Hi   {currentUser && currentUser.email}!
        </Text>
        <Button title="Logout" onPress={this.handleLogout} />
      </View>
    )

  }

}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  image:{
    width:100,
    height:100
  },
  artistBox:{
    margin:5,
    backgroundColor:'white',
    flexDirection:'row',
    elevation:2
  },
  info:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  name:{
    fontSize:20,
    marginTop:10,
    color:'#333'
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:40,
    marginTop:15
  },
  iconContainer:{
    flex:1,
    alignItems:'center'
  },
  count:{
    color:'gray'
  }

})