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
import Button from './ui/Button';

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
          let gameButtonStyle = styles.buttonGameNotStartStyle;
          let gameState = rowData.link1text;
          let gameStateTextStyle = styles.gameStateText;
          if(rowData.status == 0){
              gameButtonStyle = styles.buttonGameNotStartStyle;
              gameState = '未开始';
              gameStateTextStyle = styles.gameStateNotStartText;
          }
          else if(rowData.status == 1){
              gameButtonStyle = styles.buttonGameLiveStyle;
          }
          else if(rowData.status == 2){
              gameButtonStyle = styles.buttonGameFinishStyle;
          }
          return (
              <View style={{backgroundColor: '#fff', flexDirection: 'column'}}>
                    <Text style={styles.gameTimeStyle}>{rowData.time}</Text>
                    <View style={{flexDirection: 'row', marginTop: 25}}>
                        <PlayerTeam style={{flex:1}} name={rowData.player1} uri={rowData.player1logo} />
                        <View style={{flex:1.2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                            <Text style={{color: '#32393c', fontSize: 30, marginBottom: 25}}>{rowData.score}</Text>
                            <Button text={gameState} setStyle={gameButtonStyle} setTextStyle={gameStateTextStyle}/>
                        </View>
                        <PlayerTeam style={{flex:1}} name={rowData.player2} uri={rowData.player2logo} />
                    </View>
                    <View style={{height: 1, backgroundColor: '#eaf1f4', marginTop: 25}}/>
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
        marginTop: 20,
        marginLeft: 29
    },
    buttonGameFinishStyle:{
        height: 64,
        width: 220,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: 'blue'
    },
    buttonGameLiveStyle:{
        height: 64,
        width: 220,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: 'blue'
    },
    buttonGameNotStartStyle:{
        height: 64,
        width: 220,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white'
    },
    gameStateText:{
        color: 'white',
        fontSize: 22
    },
    gameStateNotStartText:{
        color: '#32393c',
        fontSize: 22
    },
});

AppRegistry.registerComponent('Nba', () => Nba);
