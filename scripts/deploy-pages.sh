#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"
npm run build
test -f "$repo_root/dist/index.html"

tmp_root="$(mktemp -d /tmp/biotext-v1-publish.XXXXXXXX)"
cleanup() {
  case "$tmp_root" in
    /tmp/biotext-v1-publish.*) rm -rf -- "$tmp_root" ;;
  esac
}
trap cleanup EXIT

pages_remote="${PAGES_REMOTE:-$(git remote get-url origin)}"
git clone --quiet --branch gh-pages "$pages_remote" "$tmp_root/site"
rsync -a --delete --exclude='.git' --exclude='CNAME' "$repo_root/dist/" "$tmp_root/site/"
git -C "$tmp_root/site" add -A

if git -C "$tmp_root/site" diff --cached --quiet; then
  echo "GitHub Pages already matches the v1 build."
  exit 0
fi

git -C "$tmp_root/site" commit -m "Publish v1 textbook site"
git -C "$tmp_root/site" push origin gh-pages
