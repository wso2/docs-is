#!/bin/bash

function convert_links_in_file() {
  input_file=$1

  # Replace Format 1 links with Format 2
  sed -i 's#<img :src="\$withBase(\x27\([^)]*\)\x27)" alt="\([^"]*\)">#![\2](../..\1)#g' "$input_file"
}

function convert_links_in_directory() {
  input_dir=$1

  for entry in "$input_dir"/*; do
    if [ -d "$entry" ]; then
      convert_links_in_directory "$entry"
    elif [ -f "$entry" ]; then
      convert_links_in_file "$entry"
    fi
  done
}

input_directory=$1

if [ -z "$input_directory" ]; then
  echo "Usage: ./convert_links.sh input_directory_path"
  exit 1
fi

convert_links_in_directory "$input_directory"

echo "Conversion successful!"