// Localhost
module.exports = {
 appTitle: 'Mart Saarman',
 titleTemplate: 'Mart Saarman | %s',
 path: {
  absolute: "http://saarman.net",
  relative: '',
  api: "http://api.saarman.net"
 },
 isBrowser: typeof window !== 'undefined'
};

// Saarman.net
//module.exports = {
// appTitle: 'Mart Saarman',
// titleTemplate: 'Mart Saarman | %s',
// path: {
//  absolute: "http://saarman.net",
//  relative: '',
//  api: "http://saarman.net" + '/api',
//  server: {
//   absolute: "127.0.0.1:3000",
//   api: "127.0.0.1:3000/api"
//  }
// },
// isBrowser: typeof window !== 'undefined'
//};