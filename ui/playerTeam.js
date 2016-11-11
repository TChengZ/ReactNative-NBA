import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class PlayerTeam extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.teamContainer}>
                <Image style={{width: 78, height: 78}} source={{uri: this.props.uri}}/>
                <Text style={styles.teamName}>{this.props.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    teamContainer:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    teamName:{
        fontSize: 26,
        color: '#363d40',
        marginTop: 18
    }
});