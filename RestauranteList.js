import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ListView,
} from 'react-native';
import RestauranteBox from './RestauranteBox';

export default class RestauranteList extends Component {

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource:ds.cloneWithRows(props.items)
    };
  }
  render() {
    return (
      <Text>{this.state.dataSource}</Text>
    );
  }
}