// npm i http-proxy

const httpProxy = require('http-proxy');
const fs = require('fs');
const { execSync } = require('child_process');

execSync('dotnet dev-certs https -t');
execSync('dotnet dev-certs https -ep "dev-cert.p12" -p "password"');

httpProxy.createProxyServer({
  target: 'http://localhost:80',
  ssl: {
    pfx: fs.readFileSync('dev-cert.p12'),
    passphrase: 'password'
  },
  xfwd: true
}).listen(443);
