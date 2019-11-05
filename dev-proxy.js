/*

npm i crypto-random-string
npm i http-proxy

*/

const { execSync } = require('child_process');
const fs = require('fs');

const cryptoRandomString = require('crypto-random-string');
const httpProxy = require('http-proxy');

const command = 'dotnet dev-certs https';

execSync(`${command} -t`);

// Cf. https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
const path = 'dev-cert.pfx';
const passphrase = cryptoRandomString({length: 16});
execSync(`${command} -ep ${path} -p ${passphrase}`);
const pfx = fs.readFileSync(path);
fs.unlinkSync(path);

httpProxy.createProxyServer({
  target: 'http://localhost:80',
  ssl: {
    pfx,
    passphrase
  },
  xfwd: true
}).listen(443);

// TODO:

// Listener with console.log/JSON.stringify
// https://github.com/http-party/node-http-proxy#listening-for-proxy-events

// What about
// changeOrigin: true
// Default: false - changes the origin of the host header to the target URL
// Probably not...
