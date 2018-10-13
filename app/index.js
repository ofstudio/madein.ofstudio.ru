// Ghost starter script
// Based on https://github.com/TryGhost/Ghost/wiki/Using-Ghost-as-an-NPM-module

var path = require('path');
var ghost = require('ghost');

ghost({
    config: path.join(__dirname, 'config.js')
}).then(function (ghostServer) {
    ghostServer.start();
});
