// Main.js

import React from 'react'
import { StyleSheet, Platform, Image, Text, View ,Button,ListView,FlatList} from 'react-native'
import firebase from 'react-native-firebase'
import ItemComponent from './ItemComponent'
import RestauranteList from './RestauranteList'

const database = firebase.database();
let itemsRef = database.ref('/restaurante');

export default class Main extends React.Component {
  state = { currentUser: null ,items: []}


  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })

    itemsRef.on('value', (snapshot) => {
      let data = snapshot.val();
      let prueba=[]
      prueba.push(data);
      let items = Object.values(data);
      
      // var final = array.map( employee => 
      //   employee.reduce( (obj, data) => { 
      //     obj[data[0]] = data[1]; return obj; 
      //   }, {}) 
      // });
     
      this.setState({items:prueba});
   });
}

handleLogout(){
  firebase
  .auth()
  .signOut()
  .then(() => this.props.navigation.navigate('SignUp'))
}

render() {
    
    // const nombre=database.ref('juan/002').set(
    //   {
    //     name:'Aldo Choque ortigozo',
    //     age:25
    //   }
    // ).then(()=>{
    //   console.log('INSERTED !');
    // }).catch((error)=>{
    //   console.log(error);
    // });
    // firebase.database().ref('juan').once('value',(data)=>{
    //   console.log(data.toJSON());
    // })
   
    // firebase.database().ref('juan/001').update({
    //   name:'Joel Vilca'
    // })

    const { currentUser } = this.state

return (
      <View style={styles.container}>
      {    
                    this.state.items.length > 0
                    ? 
                    // <Text>{this.state.items.restaurante3[1]}</Text>//
                    <FlatList 
                    data={this.state.items}
                    renderItem={({item})=><Text>{item}123</Text>}/>
                    // <RestauranteList items={this.state.items} />
                    : <Text>No items</Text>
                }
        <Text>
          Hi   {currentUser && currentUser.email}!
        </Text>
        <Button title="Logout" onPress={this.handleLogout} />
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})