#!/usr/bin/env bash
FILE=${PWD}/package.json

if [ -f "$FILE" ]; then
    echo "$FILE exists."
    rm -rf .git .gitignore Gruntfile.js dev-server.sh package.json README.md
else 
    echo "$FILE does not exist."
    git clone https://github.com/Cu7ious/cu7io.us.git && cd cu7io.us && mv * .. && cd .. && rm -rf cu7io.us
    chmod 700 temp_dep.sh
    chmod -R 650 assets
    chmod 440 index.html resume.html
fi