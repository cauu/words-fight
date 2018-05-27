import Counter from '../models/counter';

function getNextSeqOf(name) {
  return Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1}},
    { new: true, upsert: true }
  );
}

export {
  getNextSeqOf
};