var rootPath = require('app-root-path');
module.exports.requestloggerfile = {
 //see: https://github.com/expressjs/morgan#predefined-formats for more formats
  format: ':remote-addr - [:date[clf]] ":method :url" :status (:response-time ms) ":user-agent"',
  logLocation: 'file',
  fileLocation: rootPath+'/storage/log/access.log',
  inDevelopment: true,
  inProduction: true
};
