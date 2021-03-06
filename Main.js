import React from 'react'
import { StyleSheet, Platform, Image, Text,
  View ,ListView,FlatList,TouchableOpacity,TextInput,ScrollView,AsyncStorage,Alert} from 'react-native'
import firebase from 'react-native-firebase';
import Search from './componentes/Search';
import Header from './componentes/Header';
import Restaurante from './Restaurante';
import SliderRestaurante from './componentes/Slider';
import Categoria from './Categoria';
import Top from './Top';
import ListaCategorias from './componentes/ListaCategorias';
import Test from './Test';
import Platos from './Platos';

const database = firebase.database();

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.itemsRef = database.ref('/restaurante');
    this.itemsRef2 = database.ref('/tipoRestaurante');
    this.state = { description: '', todos: [],tipos:[], date: '', currentUser: null ,items: [],email:'',horario:'',imagen:'',horario:'',nombre:'',likes:'',searchText:'',pagina_web:''};
    this.cambiartexto=this.cambiartexto.bind(this);
    this.searchDirectory=this.searchDirectory.bind(this);
  }




  keyExtractor = (item) => item.id;

handlePress(item){
  this.props.navigation.navigate('RestaurantBox',{nombre:item.nombre,horario:item.horario,email:item.email,imagen:item.imagen,id:item.id,pagina_web:item.pagina_web});
}

handlePressCategory(item){
  this.props.navigation.navigate('CategoryBox',{nombre:item.nombre});
}

verPlatos(item){
  this.props.navigation.navigate('Platos',{nombre:item.id});
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
        pagina_web:child.val().pagina_web
      });
    });
    items.reverse();
    this.setState({
      todos: items
    });
  });
}

listenForItems2(itemsRef2) {
  database.ref().child('tipoRestaurante').orderByChild('nombre').on('value', (snap) => {
    var items = [];
    snap.forEach((child) => {
      items.push({
        id: child.key,
        nombre: child.val().nombre,
        imagen:child.val().imagen,
      });
    });
    items.reverse();
    this.setState({
      tipos: items
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

async componentDidMount() {
  const { currentUser } = firebase.auth()
  this.setState({ currentUser })
  this.listenForItems(this.itemsRef);
  this.listenForItems2(this.itemsRef2);
  this.checkPermission();
  this.createNotificationListeners();
}

 //1
 async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken', value);
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}

async createNotificationListeners() {
  /*
  * Triggered when a particular notification has been received in foreground
  * */
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
  });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  }
  /*
  * Triggered for data only payload in foreground
  * */
  this.messageListener = firebase.messaging().onMessage((message) => {
    //process data message
    console.log(JSON.stringify(message));
  });
}

showAlert(title, body) {
  Alert.alert(
    title, body,
    [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}
  // console.log(this.state.tipos)

render() {
    const { currentUser } = this.state

      return (
              <View style={styles.container}>
                 
                  <Header 
                    currentUser={currentUser}
                    handleLogout={this.handleLogout}
                  />
                  {/* <Text>hOLAAAAAAAAAA</Text> */}
                   {/* <SliderRestaurante/> */}
                  <Search 
                    searchDirectory={this.searchDirectory}
                    cambiartexto={this.cambiartexto}
                  />
                  
                 <ScrollView
        style={{height:350}}
        showsVerticalScrollIndicator={false}
        >
<View>
  <Text style={{marginLeft:10}}>Los más buscados!</Text>
<FlatList
horizontal
 style={styles.lista}
//  horizontal
 data = {this.state.todos}
 showsHorizontalScrollIndicator={false}
 keyExtractor = {this.keyExtractor}
 renderItem={({item})=> <Top item={item} editar={()=>{this.handlePress(item)}}/>}
      />
</View>
<View>
  <Text style={{marginLeft:10}}>Los más buscados!</Text>
      <FlatList
 style={styles.lista}
 showsHorizontalScrollIndicator={false}
 data = {this.state.tipos}
 keyExtractor = {this.keyExtractor}
 renderItem={({item})=> <Categoria item={item} editar2={()=>{this.handlePressCategory(item)}}  revisar={()=>{this.handlePress(item)}}/>}
      />
</View>
<View>
  <Text style={{marginLeft:10}}>Los más buscados!</Text>
                  <FlatList
                  style={styles.lista}
                    data = {this.state.todos}
                    keyExtractor = {this.keyExtractor}
                    renderItem={({item})=> <Restaurante item={item} editar={()=>{this.handlePress(item)}} verPlatos={()=>{this.verPlatos(item)}}/>}
                  />
</View>
    </ScrollView>
    
                   {/* <AppDrawerNavigator/> */}
                   {/* <Test></Test> */}
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
  lista:{
    marginTop:5,
    marginBottom:5

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
  
});
