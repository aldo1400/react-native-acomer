import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

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
import Favorite from './Favorite';
import test1 from './test1';
import Profile from './Profile';
// import React from 'react';


// import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import MemoryScreen from './Memory';
// import CPUScreen from './CPU';


// const CPUScreen=

const SettingsTabs = createBottomTabNavigator({
    CPU: {
        screen: test1,
        navigationOptions: {
            title: "Inicio",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="home"
                    size={17}
                    color={tintColor} />
            )
        }
    },
    Favorite: {
        screen: Favorite,
        navigationOptions: {
            tabBarLabel: "Favoritos",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="heart"
                    size={17}
                    color={tintColor} />
            )
        }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
          tabBarLabel: "Perfil",
          tabBarIcon: ({ tintColor }) => (
              <Icon
                  name="user-circle"
                  size={17}
                  color={tintColor} />
          )
      }
  }

});

//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default createStackNavigator({ SettingsTabs }, { headerMode: "none" });


// const App = SwitchNavigator(
//   {
//     Loading,
//     SignUp,
//     Login,
//     RestaurantBox,
//     Main,
//     Test,
//     Platos,
//     CategoryBox,
//     Categoria
//   },
//   {
//     initialRouteName: 'Loading'
//   }
// )



// export default App


// export default class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       // firebase things?
//     };
//   }

//   componentDidMount() {
//     // firebase things?
//   }

//   render() {
//     return (
//       <ScrollView>
//         <View style={styles.container}>
//         <Image source={require('./assets/RNFirebase.png')} style={[styles.logo]} />
//         <Text style={styles.welcome}>
//           Wasuap to the React Native{'\n'}Firebase starter project!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         {Platform.OS === 'ios' ? (
//           <Text style={styles.instructions}>
//             Press Cmd+R to reload,{'\n'}
//             Cmd+D or shake for dev menu
//           </Text>
//         ) : (
//           <Text style={styles.instructions}>
//             Double tap R on your keyboard to reload,{'\n'}
//             Cmd+M or shake for dev menu
//           </Text>
//         )}
//         <View style={styles.modules}>
//           <Text style={styles.modulesHeader}>The following Firebase modules are enabled:</Text>
//           {firebase.admob.nativeModuleExists && <Text style={styles.module}>Admob</Text>}
//           {firebase.analytics.nativeModuleExists && <Text style={styles.module}>Analytics</Text>}
//           {firebase.auth.nativeModuleExists && <Text style={styles.module}>Authentication</Text>}
//           {firebase.crashlytics.nativeModuleExists && <Text style={styles.module}>Crashlytics</Text>}
//           {firebase.firestore.nativeModuleExists && <Text style={styles.module}>Cloud Firestore</Text>}
//           {firebase.messaging.nativeModuleExists && <Text style={styles.module}>Cloud Messaging</Text>}
//           {firebase.links.nativeModuleExists && <Text style={styles.module}>Dynamic Links</Text>}
//           {firebase.iid.nativeModuleExists && <Text style={styles.module}>Instance ID</Text>}
//           {firebase.notifications.nativeModuleExists && <Text style={styles.module}>Notifications</Text>}
//           {firebase.perf.nativeModuleExists && <Text style={styles.module}>Performance Monitoring</Text>}
//           {firebase.database.nativeModuleExists && <Text style={styles.module}>Realtime Database</Text>}
//           {firebase.config.nativeModuleExists && <Text style={styles.module}>Remote Config</Text>}
//           {firebase.storage.nativeModuleExists && <Text style={styles.module}>Storage</Text>}
//         </View>
//         </View>    
//       </ScrollView>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    marginTop: 32,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
