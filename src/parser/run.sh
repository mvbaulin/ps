#!/bin/bash

# docker build . -t parser

readonly PROJECT=parser

docker run -it --name $PROJECT --rm --cap-add=NET_ADMIN -v "$(pwd)":/app -w /app parser zsh
