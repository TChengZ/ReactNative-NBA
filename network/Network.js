/**
 * Created by Administrator on 2016/11/4.
 */
import GameData from './../data/GameData.js';

const appKey = '509cd72cad5eb759f1ee85ae213bade4';
const gameListUrl = 'http://op.juhe.cn/onebox/basketball/nba?dtype=&=&key=' + appKey;
module.exports = {
    getGameList: function(getGameListCallback) {
        fetch(gameListUrl)
            .then((response) => response.json())
         .then((responseJson) => {
             if(responseJson.error_code == 0){
                 var datas = [];
                 for(let i = 0; i < responseJson.result.list.length; i++){
                     let gameDataDate = new GameData();
                     let listItem = responseJson.result.list[i];
                     gameDataDate.isTitle = true;
                     gameDataDate.title = listItem.title;
                     datas.push(gameDataDate);
                     if(null != listItem.live){
                         for(let j = 0; j < listItem.live.length; j++){
                             let gameData = new GameData();
                             let liveItem = listItem.live[j];
                             gameData.isTitle = false;
                             gameData.player1 = liveItem.player1;
                             gameData.player2 = liveItem.player2;
                             gameData.player1logo = liveItem.player1logobig;
                             gameData.player2logo = liveItem.player2logobig;
                             gameData.time = liveItem.time;
                             gameData.status = liveItem.status;
                             gameData.score = liveItem.score;
                             gameData.link1text = liveItem.link1text;
                             gameData.link1url = liveItem.link1url;
                             gameData.link2text = liveItem.link2text;
                             gameData.link2url = liveItem.link2url;
                             datas.push(gameData);
                         }
                     }
                     if(null != listItem.tr){
                         for(let j = 0; j < listItem.tr.length; j++){
                             let gameData = new GameData();
                             let trItem = listItem.tr[j];
                             gameData.isTitle = false;
                             gameData.player1 = trItem.player1;
                             gameData.player2 = trItem.player2;
                             gameData.player1logo = trItem.player1logobig;
                             gameData.player2logo = trItem.player2logobig;
                             gameData.time = trItem.time;
                             console.log(gameData.time);
                             gameData.status = trItem.status;
                             gameData.score = trItem.score;
                             gameData.link1text = trItem.link1text;
                             gameData.link1url = trItem.link1url;
                             gameData.link2text = trItem.link2text;
                             gameData.link2url = trItem.link2url;
                             datas.push(gameData);
                         }
                     }
                 }
                 getGameListCallback(true, datas);
             }
             else{
                 getGameListCallback(false, null);
             }
         })
         .catch((error) => {
            console.error(error);
            getGameListCallback(false, null);
         });
        // return fetch('http://facebook.github.io/react-native/movies.json')
        //         .then((response) => response.json())
        //         .then((responseJson) => {
        //             console.log(responseJson.movies);
        //             return responseJson.movies;
        //         })
        //             .catch((error) => {
        //                 console.error(error);
        //         });
    }
};
