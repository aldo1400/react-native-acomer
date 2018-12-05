// SignUp.js

import React from 'react'
import { StyleSheet, Text, TextInput, View, 
  Button, Image,
  ImageBackground,
  Dimensions,TouchableOpacity
} from 'react-native'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/Ionicons';
import bgImage from './images/background.jpg';
import logo from './images/logo3.png';

const {width:WIDTH}=Dimensions.get('window')

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null,
  showPass:true,
  press:false
 }

handleSignUp = () => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.navigation.navigate('Main'))
    .catch(error => this.setState({ errorMessage: error.message }))
  console.log('handleSignUp')
}

showPass=()=>{
  if(this.state.press==false){
    this.setState({
      showPass:false,
      press:true
    })
  }
  else{
    this.setState({
      showPass:true,
      press:false
    })
  }

}


render() {
    return (

      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
       <View style={styles.logoContainer}>
         <Image source={logo} style={styles.logo}/>
         <Text style={styles.logoText}>A Comer Tacna</Text>
         
        {this.state.errorMessage &&
           <Text style={{ color: 'red' }}>
             {this.state.errorMessage}
           </Text>}

       </View>

       <View style={styles.inputContainer}>
         <Icon name={'ios-person'} size={28} color={'rgba(255,25,255,0.7)'} style={styles.inputIcon}/>
         <TextInput 
         placeholder="Email"
             autoCapitalize="none"
             style={styles.input}
             onChangeText={email => this.setState({ email })}
             value={this.state.email}
          placeholderTextColor={'rgba(255,255,255,0.7)'}
          // underlineColorAndroid='transparent'
         />
       </View>
       <View style={styles.inputContainer}>
         <Icon name={'ios-lock'} size={28} color={'rgba(255,25,255,0.7)'} style={styles.inputIcon}/>
         <TextInput 

     secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholderTextColor={'rgba(255,255,255,0.7)'}
          underlineColorAndroid='transparent'
         />
         
         <TouchableOpacity style={styles.btnEye}
          onPress={this.showPass.bind(this)}
         >
           <Icon  name={this.state.press==false ? 'ios-eye':'ios-eye-off'} size={26} color={'rgba(255,255,255,0.7)'}/>
       
         </TouchableOpacity>
       </View>


       <TouchableOpacity style={styles.btnLogin} onPress={this.handleSignUp} >
          <Text style={styles.text}>Registrarse</Text>
         </TouchableOpacity>

           <Button
           title="Ya tienes una cuenta? Ingresa"
         onPress={() => this.props.navigation.navigate('Login')}
         />

      </ImageBackground> 

      // <View style={styles.container}>
      // <Image style={styles.image} source={require('./logo3.png')} />
      //   {this.state.errorMessage &&
      //     <Text style={{ color: 'red' }}>
      //       {this.state.errorMessage}
      //     </Text>}
      //   <TextInput
      //     placeholder="Email"
      //     autoCapitalize="none"
      //     style={styles.textInput}
      //     onChangeText={email => this.setState({ email })}
      //     value={this.state.email}
      //   />
      //   <TextInput
      //     secureTextEntry
      //     placeholder="Password"
      //     autoCapitalize="none"
      //     style={styles.textInput}
      //     onChangeText={password => this.setState({ password })}
      //     value={this.state.password}
      //   />
      //   <Button title="Registrarse" onPress={this.handleSignUp} />
      //   <Button
      //     title="Ya tienes una cuenta? Ingresa"
      //     onPress={() => this.props.navigation.navigate('Login')}
      //   />
      // </View>

    )
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width:null,
    height:null,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer:{
    alignItems:'center',
    marginBottom:50
  },

  logo:{
    width:120,
    height:120
  },
  logoText:{
    color:'white',
    fontSize:50,
    fontWeight:'500',
    marginTop:10,
    opacity:0.9
  },
  input:{
    width:WIDTH-55,
    height:45,
    borderRadius:25,
    fontSize:16,
    paddingLeft:45,
    backgroundColor:'rgba(0,0,0,0.35)',
    color:'rgba(255,255,255,0.7)',
    marginHorizontal:25
  },
  inputIcon:{
    position:'absolute',
    top:8,
    left:37
  },
  inputContainer:{
    marginTop:10
  },
  btnEye:{
    position:'absolute',
    top:8,
    right:37
  },
  btnLogin:{
    width:WIDTH-55,
    height:45,
    borderRadius:25,
    backgroundColor:'#432577',
    justifyContent:'center',
    marginTop:20
  },
  text:{
    color:'rgba(255,255,255,0.7)',
    fontSize:16,
    textAlign:'center'
  }
})
