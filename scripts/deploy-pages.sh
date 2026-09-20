#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"
if [[ "${1:-}" != "--publish-built" ]]; then
  "$repo_root/scripts/build-pages.sh"
fi
test -f "$repo_root/dist-pages/index.html"
test -f "$repo_root/dist-pages/v1/index.html"

tmp_root="$(mktemp -d /tmp/biotext-pages-publish.XXXXXXXX)"
cleanup() {
  case "$tmp_root" in /tmp/biotext-pages-publish.*) rm -rf -- "$tmp_root" ;; esac
}
trap cleanup EXIT
pages_remote="${PAGES_REMOTE:-$(git remote get-url origin)}"
git clone --quiet --branch gh-pages "$pages_remote" "$tmp_root/site"
rsync -a --delete --exclude='.git' --exclude='CNAME' "$repo_root/dist-pages/" "$tmp_root/site/"
git -C "$tmp_root/site" add -A
if git -C "$tmp_root/site" diff --cached --quiet; then
  echo "Pages already matches dist-pages/"
  exit 0
fi
git -C "$tmp_root/site" commit -m "Publish v1 and v2 textbook sites"
git -C "$tmp_root/site" push origin gh-pages
