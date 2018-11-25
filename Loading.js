// Loading.js

import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet,ImageBackground,Image } from 'react-native'
import firebase from 'react-native-firebase'

// const remote = 'https://www.abc.es/media/sociedad/2016/11/09/prioridades-kfLC-U201260767731SE-620x500@abc.jpg';

export default class Loading extends React.Component { 
  state = { animating: true }
   
   closeActivityIndicator =  () =>{
    setTimeout(() => this.setState({
      animating: false }), 15000);
    setTimeout(() => this.waitTime(), 15000);
   }
  
   waitTime(){
    setTimeout(firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'SignUp')
    }),6000)
  }

   
   componentDidMount = () => this.closeActivityIndicator()

   
      
  render() {
    const animating = this.state.animating
    const resizeMode = 'center';
    const text = 'This is some text inlaid in an <Image />';


    return (
      
      <ImageBackground
      style={{
                 backgroundColor: '#ccc',
                   flex: 1,
                   resizeMode,
                   position: 'absolute',
                   width: '100%',
                   height: '100%',
                   justifyContent: 'center',
                   zIndex:1
                 }}
                 source={require('./fondo_final.png')}
      >
<View style={styles.overlay}>

<ActivityIndicator
                animating = {animating}
                color = '#bc2b78'
               size = "large"
                             style = {styles.activityIndicator}
               
/>
{/* <Text>Cargando ... </Text> */}
<Text
          style={{
             backgroundColor: 'white',
             textAlign: 'center',
             fontSize: 50,
             top: 150,
             justifyContent:'flex-end',
             fontWeight: 'bold',
             color:'black',
             alignItems: 'center',
           }}
         >
          Cargando ...
        </Text> 
</View>
        </ImageBackground>

      // <View style={s.overlay}>

//       <View style={styles.container}>
      
//       <Image style={styles.image} source={require('./logo3.png')} />
     
// <ActivityIndicator
//                animating = {animating}
//                color = '#bc2b78'
//                size = "large"
//                style = {styles.activityIndicator}
               
//                />
    
        
//         <Text>Cargando ... </Text>
//         {/* <ActivityIndicator size="large" /> */}
//         {/* <Image source={require('./fondo.jpg')} style={styles.image} /> */}
        
//         {/* <ActivityIndicator size="large" /> */}
//         {/* <ImageBackground source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg'}} style={{width: '100%', height: '100%'}}>
//     <Text>Inside</Text>
//   </ImageBackground> */}

// <ImageBackground
//         style={{
//           backgroundColor: '#ccc',
//           flex: 1,
//           resizeMode,
//           position: 'absolute',
//           width: '100%',
//           height: '100%',
//           justifyContent: 'center',
//           zIndex:1
//         }}
//         source={{ uri: remote }}
//       >
//         <Text
//           style={{
//             backgroundColor: 'transparent',
//             textAlign: 'center',
//             fontSize: 30,
//             padding: 40,
//           }}
//         >
//           {/* {text} */}
//         </Text>
// </ImageBackground>

//       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width:150,
    height:150,
    borderRadius: 20,
  },
  activityIndicator:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 150,
    bottom: 0,
    alignItems: 'center',
    // justifyContent: 'flex-end',
    // backgroundColor:'white'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    opacity: 0.7
  }
})