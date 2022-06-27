#!/bin/bash

# Run ./scripts/generate_banner.sh for every repository in the manifest
for key in $(jq 'keys' manifest.json | sed '$d;1d' | tr -d '" ,'); do
  package="$key"
  name="$(jq -r ".\"$key\".\"name\"" manifest.json)"
  description1="$(jq -r ".\"$key\".\"description1\"" manifest.json)"
  description2="$(jq -r ".\"$key\".\"description2\"" manifest.json)"
  description3="$(jq -r ".\"$key\".\"description3\"" manifest.json)"
  symbol="$(jq -r ".\"$key\".\"symbol\"" manifest.json)"
  foreground="$(jq -r ".\"$key\".\"color-fg\"" manifest.json)"
  background="$(jq -r ".\"$key\".\"color-bg\"" manifest.json)"
  ./scripts/generate_banner.sh "$package" "$name" "$description1" "$description2" "$description3" "$symbol" "$foreground" "$background"
done
