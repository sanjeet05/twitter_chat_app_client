let baseURL = '';
let socketURL = '';

if (process.env.NODE_ENV === 'production' ) {
  // console.log('Production...');
  baseURL = 'http://localhost:3100/api';
  socketURL = 'http://localhost:3100';
  // baseURL = 'https://nodeapp-v3.herokuapp.com/api';
  // socketURL = 'https://nodeapp-v3.herokuapp.com';
} else {
  // console.log('Devlopment...');
  baseURL = 'http://localhost:3100/api';
  socketURL = 'http://localhost:3100';

}

export const BASE_URL = baseURL;
export const SOCKET_URL = socketURL;

