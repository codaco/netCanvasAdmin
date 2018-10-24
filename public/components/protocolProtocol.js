const electron = require('electron');
const fs = require('fs');
const log = require('./log');

const registerProtocolProtocol = () =>
  electron.protocol.registerFileProtocol('protocol', (request, callback) => {
    const filePath = request.url.substr(10);

    // eslint-disable-next-line
    fs.access(filePath, fs.constants.R_OK, (error) => {
      if (error) { console.log(error); }
      log.info('open protocol://', filePath);
      callback({ path: filePath });
    });
  }, (error) => {
    if (error) {
      log.error('Failed to register protocol');
    }
  });

exports.registerProtocolProtocol = registerProtocolProtocol;
