import React, { Component } from 'react';
import {
    Image,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Text,
} from 'react-native';

export default class Titlebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    _newBackIcon(isNeedBack) {
        if (!isNeedBack) {
            return null;
        } else {
            return (
                <TouchableWithoutFeedback onPress={this.props.onBack}>
                    <Image source={require('./../image/title_bar_back.png')}
                           style={{width: 22, height: 22, position: 'absolute', left: 5, top: 13}}
                    ></Image>
                </TouchableWithoutFeedback>
            );
        }
    }

    _newRightText(text) {
        if (!text) {
            return null;
        }
        if (text == '') {
            return null;
        }

        var left = Dimensions.get('window').width - 5 - 50;

        return (
            <TouchableHighlight onPress={this.props.onRightPress}
                                underlayColor="rgb(210, 230, 255)"
                                style={{borderRadius: 5, alignItems: 'center',
                                        position : 'absolute', left : left, top : 15}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color : '#171717'}}>{text}</Text>
            </TouchableHighlight>
        );
    }

    _newRightIcon(icon) {
        var left = Dimensions.get('window').width - 10 - 35;

        return (
            <TouchableHighlight onPress={this.props.onRightPress}
                                underlayColor="rgb(210, 230, 255)"
                                style={{borderRadius: 5, alignItems: 'center',
                                    position : 'absolute', left : left, top : 10}}>
                <Image source={icon} style={{width : 35, height : 35}}/>
            </TouchableHighlight>
        );
    }

    _newRight() {
        if (this.props.rightIcon) {
            return this._newRightIcon(this.props.rightIcon);
        } else {
            return this._newRightText(this.props.rightText);
        }
    }

    render() {
        var right = this._newRight();
        return (
            <View style={{height : 48, flexDirection : 'row', backgroundColor : '#fafafa', alignItems : 'center', justifyContent:'space-around'}}>
                {this._newBackIcon(this.props.isNeedBack)}
                <Text style={{fontSize: 22, color : '#171717'}}>{this.props.title}</Text>
                {right}
            </View>
        );
    }
}