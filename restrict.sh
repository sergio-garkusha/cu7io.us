#!/usr/bin/env bash

if [ -z "$1" ]; then
    chmod 600 action_man.sh dev-server.sh .gitignore Gruntfile.js package.json README.md temp_dep.sh restrict.sh
    chmod 600 -R .git .github
    chmod 645 -R assets
    chmod 644 index.html resume.html
else
    sudo chmod -R 777 .
fi