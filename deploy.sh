#!/bin/bash
# Mirror of production deploy entrypoint (real file lives in candyRose /opt/shop).
# Kept here only as documentation for CI operators.
echo "Production deploy scripts live in the candyRose repo on the VPS (/opt/shop)."
echo "Use: ./deploy.sh {frontend|backend|all} <git-sha>"
echo "     ./deploy.sh rollback {frontend|backend|all}"
exit 1
