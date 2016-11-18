/**
 * Created by Administrator on 2016/11/18.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    WebView
} from 'react-native';


export default class GameDetail extends Component{


    render(){
        return (
            <WebView
                style={styles.container}
                automaticallyAdjustContentInsets={false}
                source={{uri: this.props.url}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                startInLoadingState={true}
                scalesPageToFit={true}
            />
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection : 'column',
    }
});