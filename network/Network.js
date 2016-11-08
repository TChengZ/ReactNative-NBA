/**
 * Created by Administrator on 2016/11/4.
 */

const appKey = '509cd72cad5eb759f1ee85ae213bade4';
const gameListUrl = 'http://op.juhe.cn/onebox/basketball/nba?key=' + appKey + "&dtype=&=";

module.exports = {
    getGameList: function(getGameListCallback) {
        fetch('http://op.juhe.cn/onebox/basketball/nba?dtype=&=&key=509cd72cad5eb759f1ee85ae213bade4')
         .then((response) => response.json())
         .then((responseJson) => {
            getGameListCallback(true, responseJson);
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
