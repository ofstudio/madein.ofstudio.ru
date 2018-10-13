// # Ghost Configuration
// Documentation can be found at http://support.ghost.org/config/

const path = require('path')
require('./helpers')()

const config = {

  // ### Production
  production: {
    url: process.env.URL || 'https://madein.ofstudio.ru',
    mail: {
      transport: 'SMTP',
      options: {
        service: 'Mailgun',
        auth: {
          "user": process.env.MAILGUN_USER,
          "pass": process.env.MAILGUN_PASS
        }
      }
    },
    database: {
      client: 'mysql',
      connection: {
        "host": process.env.MYSQL_HOST,
        "database": process.env.MYSQL_DATABASE,
        "user": process.env.MYSQL_USER,
        "password": process.env.MYSQL_PASSWORD,
        // "charset": "utf8"
      },
      pool: {
        min: 5,
        max: 20
      },
      debug: false
    },
    server: {
      host: '0.0.0.0',
      port: 2368
    },
    paths: {
      contentPath: process.env.CONTENT_PATH
    },
    compress: false,
    privacy: {
      useUpdateCheck: false,
      useGoogleFonts: true,
      useGravatar: false,
      useRpcPing: false,
      useStructuredData: true
    }
  },



  // ### Development **(default)**
  development: {
    url: 'http://localhost:2368',
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/content/data/ghost-dev.db')
      },
      debug: false
    },
    server: {
      host: '0.0.0.0',
      port: '2368'
    },
    paths: {
      contentPath: path.join(__dirname, '/content/')
    }
  }
};

module.exports = config;
