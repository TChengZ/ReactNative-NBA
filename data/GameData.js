/**
 * Created by Administrator on 2016/11/9.
 */

/** 比赛还没开始
GameData.prototype.GAME_NOT_START = 0;**/
/** 比赛正在直播
GameData.prototype.GAME_LIVE = 1;**/
/** 比赛已经结束
GameData.prototype.GAME_FINISH = 2;**/

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
module.exports = GameData;