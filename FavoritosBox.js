import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class FavoritosBox extends Component {
  render() {
    return (
      <View>
        <Text> {this.props.item.nombre} </Text>
      </View>
    )
  }
}