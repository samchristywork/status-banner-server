#!/bin/bash

awk '/Place all banners here/{ system("find public/ | grep slim | grep svg$"); next };//' public/index_template.html | \
  sed 's/^public/<img width=400 src=".\//g' | \
  sed 's/\.svg$/.svg"><\/img>/g' > public/index.html
