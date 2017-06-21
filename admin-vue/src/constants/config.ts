declare let process: any;

const env = process.env;
let host: String

if(env !== 'production') {
  host = 'http://localhost:3000/admin-api/v1/'
} else {
  /**@todo Should be domain name or ip address of the server */
  host = 'http://localhost:3000/admin-api/v1/'
}

export default { 
  host
}
