#!/usr/bin/env bash
IP=`ipconfig getifaddr en0`
python3 -m http.server --bind "$IP" 8000
