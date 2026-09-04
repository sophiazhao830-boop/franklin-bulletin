#!/bin/zsh

set -eu

dashboard_dir="${0:A:h}"
dashboard_port="${FRANKLIN_DASHBOARD_PORT:-8765}"

while /usr/sbin/lsof -nP -iTCP:"$dashboard_port" -sTCP:LISTEN >/dev/null 2>&1; do
  dashboard_port=$((dashboard_port + 1))
done

dashboard_url="http://127.0.0.1:${dashboard_port}/"

cd "$dashboard_dir"

python3 -m http.server "$dashboard_port" --bind 127.0.0.1 &
dashboard_server_pid=$!

cleanup_dashboard_server() {
  kill "$dashboard_server_pid" 2>/dev/null || true
}

trap cleanup_dashboard_server EXIT INT TERM
sleep 1
open "$dashboard_url"

echo "Franklin Academy dashboard is running at $dashboard_url"
echo "Keep this window open while previewing. Press Control-C to stop."

wait "$dashboard_server_pid"
