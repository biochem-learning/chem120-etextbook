#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"
tmp_root="$(mktemp -d /tmp/biotext-pages-build.XXXXXXXX)"
cleanup() {
  case "$tmp_root" in /tmp/biotext-pages-build.*) rm -rf -- "$tmp_root" ;; esac
}
trap cleanup EXIT

npm run build

mkdir -p "$tmp_root/v1"
git archive v1.0.0 | tar -x -C "$tmp_root/v1"
python3 - "$tmp_root/v1" <<'PY'
from pathlib import Path
import sys
root = Path(sys.argv[1])
config = root / "vue.config.js"
source = config.read_text()
old = "publicPath: '/chem120-etextbook/'"
assert old in source, "v1 publicPath changed; review the deployment build"
config.write_text(source.replace(old, "publicPath: '/chem120-etextbook/v1/'"))
old_ref = "biochem-learning/chem120-etextbook/refs/heads/main/"
new_ref = "biochem-learning/chem120-etextbook/refs/tags/v1.0.0/"
for folder in (root / "src", root / "public"):
    for path in folder.rglob("*"):
        if path.suffix not in {".vue", ".js", ".json", ".html"}:
            continue
        text = path.read_text()
        if old_ref in text:
            path.write_text(text.replace(old_ref, new_ref))
PY
(cd "$tmp_root/v1" && npm ci --no-audit --no-fund && npm run build)

mkdir -p "$repo_root/dist-pages"
rsync -a --delete "$repo_root/dist/" "$repo_root/dist-pages/"
mkdir -p "$repo_root/dist-pages/v1"
rsync -a "$tmp_root/v1/dist/" "$repo_root/dist-pages/v1/"
touch "$repo_root/dist-pages/.nojekyll"
test -f "$repo_root/dist-pages/index.html"
test -f "$repo_root/dist-pages/v1/index.html"
echo "Built v2 at /chem120-etextbook/ and v1 at /chem120-etextbook/v1/ in dist-pages/"
