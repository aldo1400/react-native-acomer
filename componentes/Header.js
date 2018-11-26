import React, { Component } from 'react'
import { StyleSheet,Image, Text,
    View,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default class Header extends Component {
  render() {
    return (
     <View style={styles.header}>
          <Image style={styles.logo} source={require('../logo3.png')} />
          <Text style={styles.usuario}>
            Hi   {this.props.currentUser && this.props.currentUser.email}
          </Text>

          <TouchableOpacity onPress={this.props.handleLogout}>
            <Icon name="md-power" size={30} color="white"/>
            <Text style={styles.salir}>Salir</Text>
          </TouchableOpacity>
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
    header: {
      height: 70,
      backgroundColor: '#BE3A1D',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 2,
      paddingHorizontal: 5,
      marginBottom: 0,
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
  
