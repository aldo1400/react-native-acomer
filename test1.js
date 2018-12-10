import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebase from 'react-native-firebase';
import { SwitchNavigator } from 'react-navigation';

import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Main from './Main'
import RestaurantBox from './RestaurantBox'
import Platos from './Platos';
import Test from './Test';
import CategoryBox from './CategoryBox';
import Categoria from './Categoria';
import RestauranteCategoria from './RestauranteCategoria'
import Favorite from './Favorite'

const App = SwitchNavigator(
    {
      Loading,
      SignUp,
      Login,
      RestaurantBox,
      Main,
      Test,
      Platos,
      CategoryBox,
      Categoria,
      RestauranteCategoria,
      // Favorite
    },
    {
      initialRouteName: 'Loading'
    }
  )

export default App;