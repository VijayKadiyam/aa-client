#!/bin/bash
cd ~/public_html/aa-client/

npm run build

pm2 delete npm 

pm2 start npm -- start
