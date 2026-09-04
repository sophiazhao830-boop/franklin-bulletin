#!/bin/zsh

set -eu

dashboard_dir="${0:A:h}"
dashboard_port="${FRANKLIN_DASHBOARD_PORT:-8765}"
dashboard_chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
dashboard_chrome_profile="${TMPDIR:-/tmp}/franklin_dashboard_chrome_profile"
dashboard_browser_pid=""

while /usr/sbin/lsof -nP -iTCP:"$dashboard_port" -sTCP:LISTEN >/dev/null 2>&1; do
  dashboard_port=$((dashboard_port + 1))
done

dashboard_url="http://127.0.0.1:${dashboard_port}/"

cd "$dashboard_dir"

python3 -m http.server "$dashboard_port" --bind 127.0.0.1 &
dashboard_server_pid=$!

cleanup_dashboard_server() {
  if [[ -n "$dashboard_browser_pid" ]]; then
    kill "$dashboard_browser_pid" 2>/dev/null || true
  fi
  kill "$dashboard_server_pid" 2>/dev/null || true
}

trap cleanup_dashboard_server EXIT INT TERM
sleep 1

if [[ -x "$dashboard_chrome" ]]; then
  mkdir -p "$dashboard_chrome_profile"
  "$dashboard_chrome" \
    --user-data-dir="$dashboard_chrome_profile" \
    --autoplay-policy=no-user-gesture-required \
    --no-first-run \
    --no-default-browser-check \
    --app="$dashboard_url" >/dev/null 2>&1 &
  dashboard_browser_pid=$!
else
  open "$dashboard_url"
fi

echo "Franklin Academy dashboard is running at $dashboard_url"
echo "Chrome signage mode enables automatic video sound without a click."
echo "Keep this window open while previewing. Press Control-C to stop."

wait "$dashboard_server_pid"
