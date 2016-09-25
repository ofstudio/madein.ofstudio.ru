// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

// Include theme helpers
require('./helpers')();

var path = require('path'),
    serviceConfiguration = require('./service-configuration.json'),
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: 'https://madein.ofstudio.ru',
        mail: {
            // Visit http://support.ghost.org/mail for instructions
            transport: 'SMTP',
            options: {
                service: 'Mailgun',
                auth: serviceConfiguration.production.Mailgun.auth
            }
        },
        database: {
            client: 'mysql',
            connection: serviceConfiguration.production.mysql.connection,
            pool: {
                min: 5,
                max: 20
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '8368'
        },
        paths: {
            contentPath: path.join(__dirname, '/content/')
        },
        compress: false
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blogs published URL.
        url: 'http://localhost:2368',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    }
};

// Export config
module.exports = config;
