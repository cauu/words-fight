import API from '../Constant/Api';

/**
 * 创建房间
 * @param uid 当前用户的ID
 */
export function initBattle(uid) {
  return JSON.stringify({
    BattleInit: {
      Uid: uid
    }
  });
}

/**
 * 加入房间
 * @param user
 * 用户信息: {id, username, nickname}
 * @param bid 希望加入的battle对应的id
 */
export function joinBattle(user, bid) {
  return JSON.stringify({
    JoinBattle: {
      User: user,
      Bid: bid
    }
  });
}

/**
 * 发送准备完毕的消息
 * @param bid battle的id
 * @param uid 用户的id
 */
export function readyForBattle(bid, uid) {
  return JSON.stringify({
    ReadyForBattle: {
      Bid: bid,
      Uid: uid
    }
  });
}

export function userOperate(bid, uid) {
  return function(selection) {
    return {
      UserOperate: {
        Bid: bid,
        Uid: uid,
        Selection: selection
      }
    };
  };
}