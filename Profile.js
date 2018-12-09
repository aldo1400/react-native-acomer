import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebase from 'react-native-firebase'



export default class Profile extends Component {
    
  render() {
      const { uid,email} = firebase.auth().currentUser;
    return (
      <View>
        <Text> {email}a</Text>
        <Text> {uid}</Text>
      </View>
    )
  }
}