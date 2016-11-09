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
                     for(let j = 0; j < listItem.tr.length; j++){
                         let gameData = new GameData();
                         let trItem = listItem.tr[j];
                         gameData.isTitle = false;
                         gameData.player1 = trItem.player1;
                         gameData.player2 = trItem.player2;
                         gameData.player1logo = trItem.player1logo;
                         gameData.player2logo = trItem.player2logo;
                         gameData.time = trItem.time;
                         gameData.status = trItem.status;
                         datas.push(gameData);
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
