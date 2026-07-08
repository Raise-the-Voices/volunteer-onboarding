#!/usr/bin/env bash
set -euo pipefail

# Deploy the guide to the dev/demo location on VM 200.
# Static site — deploy is a straight file copy, no build.

SRC="$(cd "$(dirname "$0")" && pwd)"
DEST=/var/www/demos/rtv-onboarding

mkdir -p "$DEST"
rsync -a --delete \
  --exclude .git \
  --exclude .gitignore \
  --exclude .claude \
  --exclude sources \
  --exclude deploy.sh \
  --exclude README.md \
  "$SRC"/ "$DEST"/

echo "Deployed to https://demos.linkedtrust.us/rtv-onboarding/"
