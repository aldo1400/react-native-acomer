import React, { Component } from 'react';
import {
  ListView,
  Text,
  View,
  StyleSheet
} from 'react-native';

import Comment from './comments';

export default class CoomentList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
    };
  }

  componentDidMount() {
    this.updateDatSource(this.props.comments);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.comments !== this.props.comments) {
      this.updateDatSource(newProps.comments);
    }
  }

  updateDatSource = (data) => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  };

  render() {
    const comment = this.props.comment
    return (
      // <View style={{height: 600}}>
      <ListView
      style={styles.lista}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(comment) => {
          return (
              <Comment text={comment.text} email={comment.email} fecha={comment.fecha_comentario} avatar={comment.userPhoto} />
          )
        }}
      />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
    // height:800,
    backgroundColor: 'white'
  }
})