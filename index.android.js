/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  BackAndroid,
  Platform
} from 'react-native';

import GameList from  './js/component/GameList';
import GameDetail from  './js/component/GameDetail'

var nav;

BackAndroid.addEventListener('hardwareBackPress', ()=> {
    if (!nav) {
        // _navigator未初始化
        return true;
    }
    if (nav.getCurrentRoutes().length === 1) {
        return false;
    } else {
        nav.pop();
        return true;
    }
});

export default class Nba extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    onBackAndroid() {
        if(!nav){
            return false;
        }
        let routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
            nav.pop();
            return true;
        }
        return false;
    };

    render() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{id: 'GameList'}}
                renderScene={this.navigatorRenderScene.bind(this)}
            />
        )
    }

    navigatorRenderScene(route, navigator){
        nav = navigator;
        switch(route.id){
            case 'GameList':
                return (<GameList
                    navigator={navigator}
                    onBack={() => {BackAndroid.exitApp();}}
                />);
            case 'GameDetail':
                console.log("go GameDetail");
                return (<GameDetail
                    player1={route.player1}
                    player2={route.player2}
                    url={route.url}
                    />);
        }
    }
}


const styles = StyleSheet.create({

   container: {
       flex: 1,
       flexDirection : 'column',
   }
});

AppRegistry.registerComponent('Nba', () => Nba);
