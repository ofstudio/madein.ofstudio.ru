#!/usr/bin/env sh

DOCKER_MACHINE=roofbeam.scaleway
export COMPOSE_PROJECT_NAME=madein

echo "Connecting to ${DOCKER_MACHINE}..."
eval $(docker-machine env ${DOCKER_MACHINE})
if [[ $? -ne 0 ]] ; then
    echo "Connection error."
    eval $(docker-machine env -u)
    exit 1
fi
echo "Connected"

if [[ $1 = "up" ]] ; then
  docker-compose \
    -f docker-compose.yaml \
    -f docker-compose.production.yaml \
    up --build -d
fi

if [[ $1 = "down" ]] ; then
  docker-compose \
    -f docker-compose.yaml \
    -f docker-compose.production.yaml \
    down --rmi local
fi

echo "Disconnecting from ${DOCKER_MACHINE}..."
eval $(docker-machine env -u)
echo "Done!"
