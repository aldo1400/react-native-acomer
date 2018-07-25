import React from 'react'
import { StyleSheet, Platform, Image, Text, View ,Button,ListView,FlatList} from 'react-native';
import firebase from 'react-native-firebase'

export default class RestaurantBox extends React.Component {
    
    render() {
        
       
        const { navigation } = this.props;
        const itemId = navigation.getParam('nombre', '');

        return (
        
            <View>
              <Text>itemId: {JSON.stringify(itemId)}</Text>
            </View>
        )
}
}