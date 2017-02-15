/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  ScrollView,
  Image
} from 'react-native';

let baseURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=fun&maxResults=50&key=AIzaSyCq5G9bfwWAetKR0Q_SONjp46vFuV0DGmA"


export default class testProject extends Component {
  constructor(){
    super()
    const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows([

      ]),
      searchText:""
    }
  }
  handleText() {
    let url =baseURL.replace("fun",this.state.serchText)
    fetch(url,{method:'GET'}).then((response) => response.json())
    .then((responseJson) => this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson["items"])}))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:60}}>
          <TextInput
            style={{flex:1,margin:8}}
            placeholder="Search Youtube"
            onChangeText={(text) => this.setState({searchText:text})}
            onSubmitEditing={(text) => this.handleText()}
            />
        </View>

        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          contentContainerStyle={{left:0,right:0}}
          renderRow={(rowData) =>
            <View style = {{height:110,flexDirection:"row",alignItems:'center',padding:8}}>
              <Image saurce={{uri:rowData.snippet.thumbnails.default.url}} style={{width:120,height:90,margin:2}}/>
              <ScrollView bounces={false} style ={{margin:2}}>
                <Text style={{flex:1,textAlign:"left",fontSize:17,left:6}}>{rowData.snippet.title}</Text>
              </ScrollView>
            </View>
          }
       />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow:{
    height:3,
    left:0,
    right:0,

  },
});

AppRegistry.registerComponent('testProject', () => testProject);
