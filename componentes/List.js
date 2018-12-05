import React, { Component } from 'react'
import { Text, View,StyleSheet,Flatlist } from 'react-native'

export default class List extends Component {
  render() {
    return (
      <View>
        <Flatlist 
        renderItem({(item)}=>this._renderItem)
            data={[{key:1,text:'test'}]}
        />
      </View>
    )
  }
}