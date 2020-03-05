#!/bin/bash
cd ~/public_html/aa-client/

npm run build

pm2 delete aa 

pm2 start npm --name aa -- start
