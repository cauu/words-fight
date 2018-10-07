/*
 * 简单的mmseg实现
 * @Copyright: Martin
 */
var DEBUG_DIC = [
  '泰国',
  '清迈',
  '华欣',
  '日本',
  '美国',
  '新加坡',
  '马达加斯加'
];

// var DEBUG_TEXT = '2016-01-21自驾泰国，南宁开车出发，如果清迈，清莱，普吉岛，华欣，曼谷，目前3个男生，再来点妹子吧，车型：宝马X3';
var DEBUG_TEXT = '日本和东南亚,西班牙,日本';

function _getMaxLength(dic) {
  var max_length = 0;
  for(var i in dic) {
    if(dic[i].length > max_length) {
      max_length = dic[i].length;
    }
  }
  return max_length;
}

function _arrContains(arr, str) {
  if(!arr) {
    return false;
  }
  for(var i in arr) {
    if(arr[i] === str) {
      return true;
    }
  }
  return false;
}

function mmseg(text, dic) {
  if(!text || text === '') {
    return [];
  }
  text = text.toLowerCase();
  var maxLen = _getMaxLength(dic);
  var result = [];
  for(var i=0; i<text.length;) {
    var currLen = maxLen;

    for(;currLen > 0; currLen--) {
      var tmpText = text.substring(i, i+currLen);
      var found = false;

      for(var j in dic) {
        if(dic[j] !== tmpText) {
          continue;
        }
        else {
          if(!_arrContains(result, dic[j])) {
            result.push(dic[j]);
          }
          found = true;
          break;
        }
      }
      if(!!found) {
        break;
      }
    }
    i += currLen <= 0? 1: currLen;
  }
  console.log('[mmreg]', result);
  return result;
}

// mmseg(DEBUG_TEXT, DEBUG_DIC);

export default mmseg;
