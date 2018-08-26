let baseURL = '';
let socketURL = '';

if (process.env.NODE_ENV === 'production' ) {
  // console.log('Production...');  
  baseURL = 'https://twitter-chat-app-server.herokuapp.com/api';
  socketURL = 'https://twitter-chat-app-server.herokuapp.com';
} else {
  // console.log('Devlopment...');
  baseURL = 'http://localhost:3100/api';
  socketURL = 'http://localhost:3100';

}

export const BASE_URL = baseURL;
export const SOCKET_URL = socketURL;

