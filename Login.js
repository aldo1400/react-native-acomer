// Login.js

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image} from 'react-native'
import firebase from 'react-native-firebase'

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
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
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Ingresar" onPress={this.handleLogin} />
        <Button
          title="No tienes una cuenta? Registrate"
          onPress={() => this.props.navigation.navigate('SignUp')}
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
    marginTop:20
  },
  image:{
    width:150,
    height:150,
    borderRadius: 20,
  }
})
