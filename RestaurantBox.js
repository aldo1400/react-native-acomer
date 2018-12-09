import React from 'react'
import { StyleSheet, Platform, Image, Text, View ,Button,
  TextInput,
  TouchableOpacity ,
Linking
} from 'react-native';
// import {TabNavigator} from 'react-navigation';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import CommentList from './componentes/commentlist';

import SliderRestaurante from './componentes/Slider';
// import TabNavigator from './Test';

const database = firebase.database();
class RestaurantBox extends React.Component {
  state = {
    comments: []
  }

  componentDidMount() {
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


  handleChangeText = (text) => this.setState({ text })

render() {
        const { navigation } = this.props;
        console.log(navigation);
        const Id = navigation.getParam('id','');
        const Name = navigation.getParam('nombre', '');
        const Horario = navigation.getParam('horario', '');
        const Email = navigation.getParam('email', '');
        const Imagen = navigation.getParam('imagen', '');
        const web = navigation.getParam('pagina_web', '');
        const Names = JSON.stringify(Name);
        const Namese = Names.replace(/["']/g, "");

        const { comments } = this.state;
        return (
     //a partir de aqui
     <View style={styles.container}>
       <View style={styles.header}>
         <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')}>
           <View style={styles.backButton}>
             <Icon name="ios-arrow-round-back" size={32} />
           </View>
         </TouchableOpacity>
         <Text style={styles.title}>{Namese}</Text>
         
         <View style={styles.backButton} />
         </View>

        
        {/* <SliderRestaurante/> */}
         
      
       <View style={styles.horarioContainer}>
       <Icon name="ios-timer" size={30} color="gray" />
       <Text style={styles.texto} >{JSON.stringify(Horario)}</Text>
       </View>
       <View style={styles.horarioContainer}>
       <Icon name="ios-mail" size={30} color="gray" />
       <Text style={styles.texto} >{JSON.stringify(Email)}</Text>
       </View>
       <View style={styles.horarioContainer}>
         <Icon name="ios-call" size={30} color="green" />
         <Text style={styles.texto} >953553629</Text>
        </View>
        <View style={styles.horarioContainer}>
         <Icon name="ios-pin" size={30} color="gray" />
         <Text style={styles.texto}>AV. Bolognesi Nº 345</Text>
        </View>

        <TouchableOpacity onPress={this.handleClick}>
     
        <View style={styles.button}>
          <Text style={styles.text}>Open {web}</Text>
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
       {/* <View style={styles.comentario}> */}
       <CommentList comments={comments} />
       {/* </View> */}
     </View>
        )
      }
}

// class Carta extends React.Component {
//   render(){
//     return(
//       <View>
//         <Text>aqui estaria la carta</Text>
//       </View>
//     )
//   }
// }
// export default TabNavigator({
//   home:{screen:RestaurantBox},
//   setting:{screen:Carta},
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop:20,
    backgroundColor: '#EFF4F7',
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
    height: 70,
    backgroundColor: '#BE3A1D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 5,
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
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
  },
  backButton: {
    padding: 5,
    paddingTop: 10,
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
  image:{
    width:361,
    height:150,
  },
  comentario:{
    height:350
  }
});
export default RestaurantBox;
