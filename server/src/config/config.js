const env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let config = {
  app: {
    port: process.env.PORT || 3000
  },

  jwt: {
    secret: 'wordsfighting1!@#$',
    enable: true,
    cookie: 'Authorization',
    expiresIn: 60 * 60
  }
};

if(env === 'dev') {
  config = {
    ...config,
    mongodb: {
      dbUrl: 'mongodb://localhost:27017/wordsfight',
      dbOpt: {},
      dbPort: 27017
    }
  };
} else if(env === 'product') {
  config = {
    ...config,
    mongodb: {
      dbUrl: 'mongodb://10.4.8.232:2017/wordsfight',
      dbOpt: {
        user: '',
        pass: ''
      },
      dbPort: 27017
    }
  }
}

export default config;