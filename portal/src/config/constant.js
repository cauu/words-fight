export default {
  HIERARCHY: {
    Book: { child: 'Level' },
    Level: { child: 'Scene', parent: 'Book' },
    Scene: { child: 'Question', parent: 'Level' },
    Question: { parent: 'Scene' }
  }
};