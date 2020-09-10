#!/usr/bin/env bash
FILE=${PWD}/package.json

if [ -f "$FILE" ]; then
    echo "$FILE exists."
    rm -rf .git .gitignore Gruntfile.js dev-server.sh package.json README.md
else 
    echo "$FILE does not exist."
    git clone https://github.com/Cu7ious/cu7io.us.git
fi