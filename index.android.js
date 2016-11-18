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

var nav;

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
                initialRoute={{id: 'gameList'}}
                renderScene={this.navigatorRenderScene.bind(this)}
            />
        )
    }

    navigatorRenderScene(route, navigator){
        nav = navigator;
        return (<GameList
            onBack={() => {BackAndroid.exitApp();}}
        />);
    }
}


const styles = StyleSheet.create({

   container: {
       flex: 1,
       flexDirection : 'column',
   }
});

AppRegistry.registerComponent('Nba', () => Nba);
