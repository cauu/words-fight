import storeDev from './configureStore.dev';
import storeProd from './configureStore.prod';

if(process.env.NODE_ENV === 'production') {
  module.exports = storeDev;
} else {
  module.exports = storeProd;
}