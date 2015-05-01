#!/bin/bash

sudo docker info
sudo docker pull wallpulse/website
sudo docker stop wallpulse-website || true
sudo docker rm wallpulse-website || true
sudo docker run -d --name wallpulse-website --restart=on-failure:3 -e CERT_NAME=wallpulse -e VIRTUAL_HOST=wallpul.se,www.wallpul.se wallpulse/website
sudo docker rmi $(sudo docker images -q -f dangling=true) || true
