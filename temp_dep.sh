#!/usr/bin/env bash
FILE=${PWD}/package.json

if [ -f "$FILE" ]; then
    echo "Cleaning up the mess"
    rm -rf .git .gitignore Gruntfile.js dev-server.sh package.json README.md
    echo "Folder is in production-ready state"
else 
    echo "Pulling remote updates"
    rm -rf assets
    git clone https://github.com/Cu7ious/cu7io.us.git && cd cu7io.us && mv * .. && cd .. && rm -rf cu7io.us
    chmod 700 temp_dep.sh
    chmod -R 650 assets
    chmod 440 index.html resume.html
    echo "Updates are pulled. Run me one more time to clean the mess :)"
fi