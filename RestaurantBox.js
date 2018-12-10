import React from 'react'
import { StyleSheet, Platform, Image, Text, View ,Button,
  TextInput,
  TouchableOpacity ,ScrollView,Dimensions,
Linking
} from 'react-native';
// import {TabNavigator} from 'react-navigation';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import CommentList from './componentes/commentlist';

import SliderRestaurante from './componentes/Slider';
// import TabNavigator from './Test';

const database = firebase.database();
const {width,height}=Dimensions.get('window');

class RestaurantBox extends React.Component {
  state = {
    comments: [],
    item:{}
  }

  componentDidMount() {
    this.search();
    this.getArtistCommentsRef().on('value', this.addComment);
    
  }

  componentWillUnmount(){
    this.getArtistCommentsRef().off('value', this.addComment);
  }

  addComment = (data) => {
    const comment = data.val()
    this.setState({
      comments: comment || []
    })
  }
  handleClick = () => {
    const { navigation } = this.props;
    const web = navigation.getParam('pagina_web', '');
    // Linking.openURL('');
    Linking.canOpenURL(`whatsapp://send?text=hello&phone=+51931245655`).then(supported => {
      if (supported) {
        Linking.openURL(`whatsapp://send?text=hellofromacomertacna&phone=+51929112431`);
      } else {
        console.log("Don't know how to open URI: " + web);
      }
    });
  };

  // const url = 

  handleSend = () => {
    const { text } = this.state
    const { uid ,email} = firebase.auth().currentUser
    const fecha_actual=new Date;
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
    const numberMonth=monthNames[fecha_actual.getMonth()];
    const fecha_comentario=`${fecha_actual.getDate()} ${numberMonth}`;
    // `Quince es ${a + b} y\nno ${2 * a + b}.`
    const artistCommentsRef = this.getArtistCommentsRef();
    const newCommentRef = artistCommentsRef.push();
    newCommentRef.set({
      text,
      uid,
      email,
      fecha_comentario
    })
    this.setState({ text: '' })
  };

  getArtistCommentsRef = () => {
    const { navigation } = this.props;
    // console.log(navigation);
    const id = navigation.getParam('id','');
    console.log(id);
    return database.ref(`comments/${id}`)
  }


  // handleClick = () => {
  //   const { navigation } = this.props;
  //   const Id = navigation.getParam('pagina_web','');
  //   Linking.canOpenURL(this.props.url).then(supported => {
  //     if (supported) {
  //       Linking.openURL(this.props.url);
  //     } else {
  //       console.log("Don't know how to open URI: " + this.props.url);
  //     }
  //   });
  // };
  search(){
    const { navigation } = this.props;
    const Id = navigation.getParam('id','');
        const Name = navigation.getParam('nombre', '');
var restaurante_detalle;
    database.ref().child('restaurante').orderByChild('nombre').equalTo(Name).on('value', (snap) => {
      // items = [];
      
      snap.forEach((child) => {
        
        restaurante_detalle={
          id: child.key,
          // description: child.val().description,
        email: child.val().email,
        imagen:child.val().imagen,
        likeCount:child.val().likeCount,
        horario:child.val().horario,
        nombre:child.val().nombre,
        date:child.val().date,
        telefono:child.val().telefono,
        imagen_fondo:child.val().imagen_fondo,
        direccion:child.val().Direccion,
        nombre_tipo:child.val().tipo_restaurante.nombre,
        descripcion:child.val().descripcion
        }
        console.log(restaurante_detalle)
        
      });
      this.setState({
        item:restaurante_detalle
      })
    });
    
    console.log(this.state.item.nombre)
    // console.log(restaurante_detalle);
  }

  handleChangeText = (text) => this.setState({ text })

render() {
        const { navigation } = this.props;
        const web = navigation.getParam('pagina_web', '');
        const { comments } = this.state;

        
        return (
     //a partir de aqui
     <View style={styles.container}>
       <View style={styles.header}>
         <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')}>
           <View style={styles.backButton}>
             <Icon name="ios-arrow-dropleft-circle" size={32} color='white' />
           </View>
         </TouchableOpacity>
         <Text style={styles.title}>{this.state.item.nombre}
         </Text>
         
         <View style={styles.backButton} />
         </View>

        
        {/* <SliderRestaurante/> */}
         
          <Image source={{uri:this.state.item.imagen_fondo}} style={styles.fondo}  />

          <ScrollView
        style={{height:350}}
        showsVerticalScrollIndicator={false}
        >
         <View style={styles.horarioContainer2}>
         
         <Text style={styles.texto2}>{this.state.item.descripcion}</Text>
        </View>

        <Text>Detalles</Text>
        {/* <View style={{marginTop:5,flexDirection:'row',width:300}}> */}
       <View style={styles.horarioContainer}>
       <Icon name="ios-timer" size={30} color="gray" />
       <Text style={styles.texto} >{this.state.item.horario}</Text>
       </View>
       <View style={styles.horarioContainer}>
       <Icon name="ios-mail" size={30} color="gray" />
       <Text style={styles.texto} >{this.state.item.email}</Text>
       </View>
       
       {/* </View> */}

       <View style={styles.horarioContainer}>
         <Icon name="ios-call" size={30} color="green" />
         <Text style={styles.texto} >{this.state.item.telefono}</Text>
        </View>
        <View style={styles.horarioContainer}>
         <Icon name="ios-pin" size={30} color="gray" />
         <Text style={styles.texto}>{this.state.item.direccion}</Text>
        </View>
        <View style={styles.horarioContainer}>
         
         <Icon name="ios-restaurant" size={30} color="red" />
         <Text style={styles.texto}>{this.state.item.nombre_tipo}</Text>
        </View>
       
        

        <TouchableOpacity onPress={this.handleClick}>
     
        <View style={styles.button}>
          <Text style={styles.text}>{web}</Text>
          
        </View>
        
      </TouchableOpacity>
       <View style={styles.inputContainer}>
          <TextInput
             style={styles.input}
             placeholder="Opina sobre este restaurante"
             onChangeText={this.handleChangeText}
            value={this.state.text}
           />
         <TouchableOpacity onPress={this.handleSend}>
           <Icon name="ios-send" size={30} color="gray" />
         </TouchableOpacity>
       </View>
       
       <CommentList comments={comments} />
       </ScrollView>
     </View>
        )
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop:20,
    backgroundColor: '#EFF4F7',
  },
  fondo:{
    height:180,
    opacity:0.8
    // position:'absolute',
    // width:null
  },
  restaurantBox:{
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height: 1,
      width: -2,

    }
  },
  header: {
    height: 50,
    backgroundColor: 'transparent',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 5,
    // opacity:0.9,
    position:'absolute',
    width:width,
    zIndex:99
    // marginBottom: 10,
    
  },
  inputContainer: {
    marginTop:10,
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  horarioContainer:{
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  horarioContainer2:{
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    position:'absolute',
    left:width/2-50,
    top:10,
    color: 'white'
  },
  backButton: {
    padding: 5,
    paddingTop: 5,
    width: 40,
    // marginRight: 25,
  },
  input: {
    height: 50,
    flex: 1,
  },
  texto:{
    height: 20,
    flex:1,
    paddingHorizontal: 40,
    fontSize: 15,
  },
  texto2:{
    height: 50,
    flex:1,
    paddingHorizontal: 40,
    fontSize: 15,
  },
  image:{
    width:361,
    height:150,
  },
  comentario:{
    height:350
  }
});
export default RestaurantBox;
