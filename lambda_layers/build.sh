#!/bin/bash
DOCKER_IMAGE_NAME="dummy123"
DOCKER_CONTAINER_NAME="dummy123img"
no_dockerfile_msg="[-] Must run this script using as arg the Dockerfile to use
    example bash build.sh pandas/Dockerfile"
if [ -z "$1" ];
then echo "$no_dockerfile_msg" && exit 1; fi

echo -------------------------------
echo processing "$1"
echo -------------------------------

BUILD_DIRECTORY="$(dirname "$1")"/lib/python

# clean up old libraries and containers
rm -rf "${BUILD_DIRECTORY}" &> /dev/null
mkdir -p "${BUILD_DIRECTORY}" &> /dev/null

docker rm -f ${DOCKER_IMAGE_NAME} &> /dev/null
docker rmi -f ${DOCKER_CONTAINER_NAME} &> /dev/null

# build the docker image
docker build -t ${DOCKER_CONTAINER_NAME} "$(dirname "$1")"
docker create -ti --name ${DOCKER_IMAGE_NAME} ${DOCKER_CONTAINER_NAME} bash

# extract libraries from docker image
docker cp ${DOCKER_IMAGE_NAME}:/home/build/python "$(dirname "$BUILD_DIRECTORY")"

# clean
docker rm -f ${DOCKER_IMAGE_NAME}
docker rmi -f ${DOCKER_CONTAINER_NAME}