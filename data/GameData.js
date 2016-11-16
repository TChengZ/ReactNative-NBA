/**
 * Created by Administrator on 2016/11/9.
 */

/** 比赛还没开始**/
const GAME_NOT_START = 0;
/** 比赛正在直播**/
const GAME_LIVE = 1;
/** 比赛已经结束**/
const GAME_FINISH = 2;

class GameData{

    isTitle = false;
    title = '';
    player1 = '';
    player2 = '';
    player1logo = '';
    player2logo = '';
    status = '';
    time = '';
    score = '';
    link1text = '';
    link1url = '';
    link2text = '';
    link2url = '';

    constructor(){

    }

}

exports.GAME_NOT_START = GAME_NOT_START;
exports.GAME_LIVE = GAME_LIVE;
exports.GAME_FINISH = GAME_FINISH;
module.exports = GameData;