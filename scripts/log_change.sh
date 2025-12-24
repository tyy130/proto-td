#!/usr/bin/env bash
set -euo pipefail
if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <message>"
  exit 1
fi
msg="$*"
ts=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
logfile="$(dirname "$0")/../ASSISTANT_CHANGES.md"
# Append a single line entry using echo for portability
echo "- [$ts] $msg" >> "$logfile"
