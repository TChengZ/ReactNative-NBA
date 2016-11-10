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
  ListView
} from 'react-native';

import PlayerTeam from './ui/PlayerTeam'
import Network from './network/Network.js';

export default class Nba extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        };
    }

    getGameListCallback(flag, datas){
        if(flag){
            this.setState({
                dataSource : this.state.dataSource.cloneWithRows(datas),
            });
        }

  }

  renderRow(rowData){
      if(rowData.isTitle){
          return (
              <View style={styles.dateContainer}>
                  <Text style={styles.dateTitle}>{rowData.title}</Text>
              </View>
          );
      }
      else{
          return (
              <View style={{backgroundColor: '#fff', flexDirection: 'column', height: 256}}>
                    <Text style={styles.gameTimeStyle}>{rowData.time}</Text>
              </View>
          );
      }
     
  }

  render() {
    Network.getGameList(this.getGameListCallback.bind(this));
    return (
      <View style={styles.container}>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              enableEmptySections={true}
              />
      </View>
    );
  }
}


const styles = StyleSheet.create({

   container: {
       flex: 1,
       flexDirection : 'column',
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
    listStyle:{

    },
    dateContainer:{
        justifyContent: 'center',
        backgroundColor: '#eaf1f4',
        alignItems: 'center',
        height: 74
    },
    dateTitle:{
        fontSize: 26,
        color: '#363d40',
    },
    gameTimeStyle:{
        color: "#787d7c",
        fontSize: 20,
        marginTop: 32,
        marginLeft: 29
    }
});

AppRegistry.registerComponent('Nba', () => Nba);
