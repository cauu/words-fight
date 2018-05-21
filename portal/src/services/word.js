import Word from '../models/word';
import { getNextSeqOf } from './counter';

/**
 * @param {query} {
 *  key: 自增主键,
 *  text: 单词文本,
 *  phonetic: 单词音标,
 *  translation: 单词的中文翻译,
 *  tags: [单词的tag，如名词，大学英语词汇等  ]
 * }
 */
function getWords(query) {
  return Word
    .find(query)
    .exec()
  ;
}

async function addWord(word) {
  const nextSeq = await getNextSeqOf('word');

  return Word.create({
    ...word,
    key: nextSeq
  });
}

function delWord(id) {
  return Word.findOneAndRemove({ _id: id }).exec();
}

function updateWord(id, word) {
  return Word
    .findOneAndUpdate({ _id: id }, { $set: level }, { new: true, upsert: false })
  ;
}

export {
  getWords,
  addWord,
  delWord,
  updateWord
};