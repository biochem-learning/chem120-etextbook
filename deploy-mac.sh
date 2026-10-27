#!/usr/bin/env sh
set -eu
repo_root="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
exec bash "$repo_root/scripts/deploy-pages.sh"
