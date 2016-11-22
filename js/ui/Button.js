
import React, { Component } from 'react';
import {
     Text, TouchableOpacity, StyleSheet
    } from 'react-native';

export default class Button extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity style={[styles.button, this.props.setStyle]}
                                onPress={this.props.onPress}>
                <Text style={this.props.setTextStyle}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        justifyContent: 'center',
        alignItems: 'center',
    },
});