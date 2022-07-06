#!/bin/bash

# Print a usage message
usage (){
  echo "Usage: ./$(basename $0) package name description1 description2 description3 icon fg bg"
  exit 1
}

# User must specify exactly eight positional arguments
[ "$#" -eq "8" ] || usage

# Assign names to positional arguments
package=$1
name=$2
description1=$3
description2=$4
description3=$5
icon=$6
foreground=$7
background=$8

# Create the relevant static route
mkdir -p public/$package

# Download the icon from Google Fonts if necessary
[ -e icons/$icon ] || curl "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/$icon/default/48px.svg" > icons/$icon

# Create the "banner" file
cat templates/banner.svg | \
  sed "s/COLORFG/$foreground/g" | \
  sed "s/COLORBG/$background/g" | \
  sed "s/REPONAME/$name/g" | \
  sed "s/REPODESCRIPTION1/$description1/g" | \
  sed "s/REPODESCRIPTION2/$description2/g" | \
  sed "s/REPODESCRIPTION3/$description3/g" | \
  cat > public/$package/banner.svg
sed 's/^.......................................//g' icons/$icon >> public/$package/banner.svg
echo "</g></g></svg>" >> public/$package/banner.svg

# Create a slim version of the "banner"
cat templates/banner-slim.svg | \
  sed "s/COLORFG/$foreground/g" | \
  sed "s/COLORBG/$background/g" | \
  sed "s/REPONAME/$name/g" | \
  sed "s/REPODESCRIPTION1/$description1/g" | \
  sed "s/REPODESCRIPTION2/$description2/g" | \
  sed "s/REPODESCRIPTION3/$description3/g" | \
  cat > public/$package/banner-slim.svg
sed 's/^.......................................//g' icons/$icon >> public/$package/banner-slim.svg
echo "</g></g></svg>" >> public/$package/banner-slim.svg
