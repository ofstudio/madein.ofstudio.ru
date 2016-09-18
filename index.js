// Ghost starter script
// Based on https://github.com/TryGhost/Ghost/wiki/Using-Ghost-as-an-NPM-module

// Keymetrics.io enable HTTP analysis
var pmx = require('pmx').init({
    http          : true, // HTTP routes logging (default: false)
    //http_latency  : 200,  // Limit of acceptable latency
    http_code     : 500,  // Error code to track'
    alert_enabled : true,  // Enable alerts (If you add alert subfield in custom it's going to be enabled)
    ignore_routes : [/ghost/], // Ignore http routes with this pattern (default: [])
    errors        : true, // Exceptions loggin (default: true)
    custom_probes : true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics (default: true)
    network       : true, // Network monitoring at the application level (default: false)
    ports         : true  // Shows which ports your app is listening on (default: false)
});

var path = require('path');
var ghost = require('ghost');

ghost({
    config: path.join(__dirname, 'config.js')
}).then(function (ghostServer) {
    ghostServer.start();
});
