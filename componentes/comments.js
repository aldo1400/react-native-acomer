import React,{Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import firebase from 'react-native-firebase';

const DEFAULT_AVATAR = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg';
const AVATAR_SIZE = 32;

const Comment = (props) =>
  <View style={styles.comment}>
    { props.avatar ?
        <Image style={styles.avatar} source={{ uri: props.avatar }} /> :
        <Image style={styles.avatar} source={{ uri: DEFAULT_AVATAR }} />
    }
    <View style={{flexDirection:'column'}}>
    <Text style={styles.text}>{props.text}</Text>
    <Text style={styles.text}>{props.email}</Text>
    <Text style={styles.text}>{props.fecha}</Text>
    </View>
  </View>

const styles = StyleSheet.create({
  comment: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Comment
