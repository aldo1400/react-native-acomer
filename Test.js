import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {createBottomTabNavigator,createAppContainer} from 'react-navigation';
// import HomeScreen from './screens/HomeScreen';
import RestaurantBox from './RestaurantBox';
import Platos from './Platos';
import Icon from 'react-native-vector-icons/Ionicons'

class HomeScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',color:'black' }}>
          <Text>Home!zdfdsfd</Text>
          <Text>Home!zdfdsfd</Text>
          <Text>Home!zdfdsfd</Text>
        </View>
      );
    }
  }
  
  class SettingsScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
        </View>
      );
    }
  }
    
  


  
export default createBottomTabNavigator({
    Home: {
        screen:RestaurantBox,
        navigationOptions: {
            tabBarLabel: 'Detalle',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="ios-home" color={tintColor} size={24} />
            )
          }
    },
    Platos: {
        screen:Platos,
        navigationOptions: {
            tabBarLabel: 'Platos',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="ios-pizza" color={tintColor} size={24} />
            )
          }
    },
    // Ubicacion: Ubicacion,
    // Promo:Promocion
  });


// export default class Test extends Component {
//   render() {
//     return (
//        <TabNavigator/>
//     )
//   }
// }

// export default TabNavigator;