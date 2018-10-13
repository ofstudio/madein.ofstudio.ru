# madein.ofstudio.ru

Portfolio website.

## Install
```bash
cd theme
npm install
bower install
grunt bower-install
cd ../app
npm install
```
## Build Theme and Run
```bash
cd theme
grunt build
cd ../app
npm start
```

## Docker `.env` File
```
MYSQL_HOST=...
MYSQL_DATABASE=...
MYSQL_USER=...
MYSQL_PASSWORD=...

MAILGUN_USER=...
MAILGUN_PASS=...

INSTALL_PATH=/usr/local/src/app
THEME_PATH=/var/lib/theme
CONTENT_PATH=/var/lib/content
```

## License

MIT

© 2015 Oleg Fomin <ofstudio@gmail.com>
