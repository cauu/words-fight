import Counter from '../models/counter';

function getNextSeqOf(name) {
  return Counter.findAndUpdate({
    query: { name },
    update: { $inc: { seq: 1}},
    new: true
  });
}

export {
  getNextSeqOf
};