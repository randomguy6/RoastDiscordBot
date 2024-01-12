#!/bin/bash
echo 'Enter version number'

read version

docker build --platform=linux/amd64 .
docker tag roastisaiahdiscordbot sadonepu/roastisaiahdiscordbot:$version
docker push sadonepu/roastisaiahdiscordbot:$version