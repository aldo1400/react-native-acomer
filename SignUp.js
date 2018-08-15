// SignUp.js

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native'
import firebase from 'react-native-firebase'

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }

handleSignUp = () => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.navigation.navigate('Main'))
    .catch(error => this.setState({ errorMessage: error.message }))
  console.log('handleSignUp')
}

render() {
    return (

      <View style={styles.container}>
      <Image style={styles.image} source={require('./logo3.png')} />
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Registrarse" onPress={this.handleSignUp} />
        <Button
          title="Ya tienes una cuenta? Ingresa"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BE3A1D',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 20
  },
  image:{
    width:150,
    height:150,
    borderRadius: 20,
  }
})
