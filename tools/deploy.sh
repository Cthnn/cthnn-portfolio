#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

build_frontend() {
	docker build -t cthnn-portfolio-frontend:latest "$REPO_ROOT"
	docker save cthnn-portfolio-frontend:latest | sudo k3s ctr images import -
	kubectl rollout restart deployment/frontend-frontend
}

build_backend() {
	docker build -t cthnn-portfolio-backend:latest "$REPO_ROOT/backend"
	docker save cthnn-portfolio-backend:latest | sudo k3s ctr images import -
	kubectl rollout restart deployment/backend-backend
}

if [ "$#" -eq 0 ]; then
	set -- frontend backend
fi

do_frontend=false
do_backend=false

for target in "$@"; do
	case "$target" in
		frontend)
			do_frontend=true
			;;
		backend)
			do_backend=true
			;;
		*)
			echo "Usage: $0 [frontend] [backend]" >&2
			exit 1
			;;
	esac
done

$do_frontend && build_frontend
$do_backend && build_backend
