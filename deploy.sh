#!/bin/bash
# Mirror docs for CI operators.
# Real production script lives in candyRose and on the VPS at /opt/shop/deploy.sh
#
# Usage:
#   ./deploy.sh {frontend|backend|all} <git-sha>
#   ./deploy.sh nginx
#   ./deploy.sh rollback {frontend|backend|all}
#
# GitHub Actions passes github.sha so compose pulls:
#   hamidrezafalahi/shop-frontend:<sha>
#   hamidrezafalahi/shop-backend:<sha>
echo "Production deploy scripts live in the candyRose repo on the VPS (/opt/shop)."
echo "Use: ./deploy.sh {frontend|backend|all} <git-sha>"
echo "     ./deploy.sh nginx"
echo "     ./deploy.sh rollback {frontend|backend|all}"
exit 1
