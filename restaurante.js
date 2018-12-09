import React, { Component } from 'react'
import { StyleSheet, Platform, Image, Text, View ,Button,ListView,FlatList,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
const database = firebase.database();
class Restaurante extends Component {

  state = {
    liked: false,
    likeCount: null,
    commentCount: 0,
  }

  componentWillMount() {
    this.getArtistRef().on('value', this.handleArtistOnValue)
  }

  componentWillUnmount() {
    this.getArtistRef().off('value', this.handleArtistOnValue)
  }

  handleArtistOnValue = snapshot => {
    const userId = firebase.auth().currentUser.uid
    const artist = snapshot.val()

    if (!artist) {
      return this.getArtistRef().set({ likeCount: 0 })
    }

    const likeCount = artist.likeCount
    const liked = artist.likes && artist.likes[userId]

    this.setState({ liked, likeCount })
  }

  handlePressLike = () => {
    // console.log('Llamado');
    const { likeCount, liked } = this.state

    if (this.busy || likeCount === null || liked === null) {
      return 
    }
    // console.log('aaaaaaaaaaaaaah');
    this.busy = true

    const userId = firebase.auth().currentUser.uid

    this.getArtistRef().transaction(artist => {
      if (artist) {
        if (artist.likes && artist.likes[userId]) {
          artist.likeCount--
          console.log(artist.likeCount)
          artist.likes[userId] = null
        } else {
          artist.likeCount++
          if (!artist.likes) {
            artist.likes = {}
          }
          artist.likes[userId] = true
        }
      }

      return artist
    })
    .then(() => this.busy = false)
  }


  getArtistRef() {
    const Id = this.props.item.id
    return database.ref(`restaurante/${Id}`)
  }


  render() {
    console.log(this.state.liked)
    const likeIcon  = this.state.liked ?
   <Icon name="ios-heart" size={30} color="#e74c3c"/> :
   <Icon name="ios-heart-empty" size={30} color="gray"/>
    return (
        <View style={styles.artistBox}>
            <Image style={styles.image} source={{uri:this.props.item.imagen}}/>
            <View style={styles.info}>
            <TouchableOpacity onPress={()=>{this.props.editar(this.props.item)}}>
            <Text style={styles.name}>{this.props.item.nombre}</Text>
            </TouchableOpacity>
            <View style={styles.row}>
              <View style={styles.iconcontenedor}>
              <TouchableOpacity onPress={this.handlePressLike}>
              {likeIcon}
              </TouchableOpacity>
              <Text style={styles.count}>{this.props.item.likeCount}Me gusta</Text>
              </View>
              <View style={styles.iconcontenedor}>
              <TouchableOpacity onPress={()=>{this.props.editar(this.props.item)}}>
              <Icon name="ios-chatboxes" size={30} color="gray"/>
              <Text style={styles.count}>Comentarios</Text>
              </TouchableOpacity>
              </View>
            </View>
            </View>
            <TouchableOpacity style={{position:'absolute',left:310,top:70}} onPress={()=>{this.props.verPlatos(this.props.item)}}>
              <Icon name="ios-pizza" size={30} color="gray"/>
              <Text style={styles.count}>Platos</Text>
              </TouchableOpacity>
        </View>

    )
  }
}

const styles=StyleSheet.create({
artistBox:{
  margin: 5,
  backgroundColor: 'white',
  flexDirection: 'row',
  shadowColor: 'black',
  shadowOpacity: .2,
  shadowOffset: {
    height: 1,
    width: -2,

  },
  elevation:5
},
image: {
  width: 150,
  height: 150,
  // borderRadius:20
},
info: {
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
},
name: {
  fontSize:20,
  marginTop: 10,
},
row:{
  flexDirection:'row',
  justifyContent: 'space-between',
  marginHorizontal:40,
  marginTop: 15,
},
iconcontenedor:{
  flex: 1,
  alignItems: 'center',
},
count:{
  color: 'gray',
}
});
export default Restaurante;
