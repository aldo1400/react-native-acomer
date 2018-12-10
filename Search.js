import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SearchBar,Button } from 'react-native-elements'

export default class Search extends Component {

    cambiartexto=(text)=>{
        this.props.cambiartexto(text);
    }
  render() {
    return (
      <View>
        <SearchBar
            showLoading={false}
            platform="android"
            returnKeyType='search'
            onChangeText={(text)=>this.cambiartexto(text)}
            onSubmitEditing={()=>this.props.searchDirectory()}
            cancelButtonTitle="Cancel"
            placeholder='Busca tu Restaurante favorito ' 
        /> 
      </View>
    )
  }
}

