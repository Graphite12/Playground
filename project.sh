#!/bin/bash

function generate_project_tree() {
  # Original from https://stackoverflow.com/a/35889620/11929317
  # Reference From https://blog.potados.com/dev/directory-listing-in-readme/
  # This is a ported version for mac
 

  IGNORED="venv|node_modules|update-readme|README.md"
  SED_FOR_MAC="gsed"

  if [[ "$OSTYPE" == "darwin"* ]]; then
    if command -v $SED_FOR_MAC >/dev/null; then
      SED=$SED_FOR_MAC
    else
      echo "$SED_FOR_MAC not installed!" && exit 1
    fi
  else
    SED="sed"
  fi

  tree -tf --noreport -I $IGNORED --charset ascii "$1" |
    $SED -e '1d' |                                        # Cut first line
    $SED -e 's/| \+/  /g' |                               # Remove duplicated '|'
    $SED -e 's/[|`]-\+/ */g' |                            # Replace '|--' with '*'
    $SED -e 's:\(* \)\(\(.*/\)\([^/]\+\)\):\1[\4](\2):g'  # Add link for contents
}

function generate_readme() {
  readme="$1/README.md"
  readme_template="$1/.readme_template.md"

  perl -p0e 's/_PROJECT_TREE_/`cat`/se' "$readme_template" > "$readme"
}

cd "$(dirname "$1")" || exit 1
generate_project_tree . | generate_readme .