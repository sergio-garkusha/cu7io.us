#!/usr/bin/env bash

if [ -z "$1" ]; then
    chmod 600 action_man.sh dev-server.sh .gitignore Gruntfile.js package.json README.md temp_dep.sh
    chmod 644 -R assets .git .github
    chmod 644 index.html resume.html
else
    sudo chmod -R 744 .
fi
