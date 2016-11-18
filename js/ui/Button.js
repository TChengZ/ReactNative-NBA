
import React, { Component } from 'react';
import {
     Text, TouchableHighlight, StyleSheet
    } from 'react-native';

export default class Button extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableHighlight style={[styles.button, this.props.setStyle]}
                                onPress={this.onPressClick}>
                <Text style={this.props.setTextStyle}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        justifyContent: 'center',
        alignItems: 'center',
    },
});