/**
 * Created by Administrator on 2016/11/17.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';

import PlayerTeam from  './../ui/PlayerTeam';
import Network from  './../network/Network';
import Button from  './../ui/Button';
import Titlebar from  './../ui/Titlebar';
import PopupWindow from  './../nativeModule/PopupWindow';

var moreLinks = [];

export default class GameList extends Component{
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            firstLoadEnd: false,
            dataSource: ds.cloneWithRows([])
        };
    }

    getGameListCallback(flag, datas, links){
        moreLinks = links;
        this.setState({
            firstLoadEnd: flag,
            dataSource : flag?this.state.dataSource.cloneWithRows(datas): [],
        });
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
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <PlayerTeam style={{flex:1}} name={rowData.player1} uri={rowData.player1logo} />
                        <View style={{flex:1.2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                            <Text style={{color: '#32393c', fontSize: 20, marginBottom: 20}}>{rowData.score}</Text>
                            <Button text={gameState} setStyle={gameButtonStyle} setTextStyle={gameStateTextStyle}
                                    onPress={this.onGameBtnClick.bind(this, rowData)}
                            />
                        </View>
                        <PlayerTeam style={{flex:1}} name={rowData.player2} uri={rowData.player2logo} />
                    </View>
                    <View style={{height: 1, backgroundColor: '#eaf1f4', marginTop: 25}}/>
                </View>
            );
        }
    }
    
    onGameBtnClick(rowData){
        this.props.navigator.push({
            id: 'GameDetail',
            player1: rowData.player1,
            player2: rowData.player2,
            url: rowData.link1url
        });
    }

    render() {
        Network.getGameList(this.getGameListCallback.bind(this));
        var listView = <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            enableEmptySections={true}
                        />;
        if(this.state.dataSource.length == 0){
            listView = <View  style={{justifyContent: 'center',alignItems: 'center', flex: 1}}>
                            <Text style={styles.dateTitle}>暂时没有比赛数据</Text>
                        </View>;
        }
        var progress = <View  style={{justifyContent: 'center',alignItems: 'center', flex: 1}}>
                            <ActivityIndicator size="large"/>
                        </View>;
        let content = this.state.firstLoadEnd? listView: progress;
        return (
            <View style={styles.container}>
                <Titlebar  isNeedBack={false}
                           title="NBA"
                           onBack={this.props.onBack}
                           rightText="更多"
                           onRightPress={this.onTitleRightPress.bind(this)}
                />
                {content}
            </View>
        );
    }

    onTitleRightPress(){
        if(null == moreLinks){
            ToastAndroid.show('数据还在请求', ToastAndroid.SHORT);
            return;
        }
        PopupWindow.showPopup(moreLinks);
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
    dateContainer:{
        justifyContent: 'center',
        backgroundColor: '#eaf1f4',
        alignItems: 'center',
        height: 50
    },
    dateTitle:{
        fontSize: 18,
        color: '#363d40',
    },
    gameTimeStyle:{
        color: "#787d7c",
        fontSize: 16,
        marginTop: 10,
        marginLeft: 15
    },
    buttonGameFinishStyle:{
        height: 30,
        width: 100,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: '#2762fd'
    },
    buttonGameLiveStyle:{
        height: 30,
        width: 100,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: 'red'
    },
    buttonGameNotStartStyle:{
        height: 30,
        width: 100,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white'
    },
    gameStateText:{
        color: 'white',
        fontSize: 16
    },
    gameStateNotStartText:{
        color: '#32393c',
        fontSize: 16
    },
});