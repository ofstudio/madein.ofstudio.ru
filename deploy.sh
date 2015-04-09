#!/bin/sh
cd "$(dirname "$0")"

# Create .deploy-access file
# Setup your $HOST, $USER, $DIST in .deploy-access: 
# USER=username
# HOST=domain.com
# DIST=/srv/www/domain.com
# Note: remove .deploy-access from source control!

source .deploy-access

rsync -vaz  --include-from=deploy.lst  --delete -e ssh . $USER@$HOST:$DIST
