#!/bin/bash

find "./" -type f -name 'schema_*.bpmn' | while read -r file; do
  new_filename="schema_$(date +'%d%m%Y_%H%M%S').bpmn"
  mv "$file" "$new_filename"
done
