#!/bin/bash
 set -e
echo "Current directory:"
pwd

echo "Files:"
ls -la 
SERVICE=$1

cd /opt/shop

echo "Pull latest images..."

case "$SERVICE" in

frontend)
    docker compose -f docker-compose.prod.yml pull frontend
    docker compose -f docker-compose.prod.yml up -d --no-deps frontend
    ;;

backend)
    docker compose -f docker-compose.prod.yml pull backend
    docker compose -f docker-compose.prod.yml up -d --no-deps backend
    ;;

all)
    docker compose -f docker-compose.prod.yml pull frontend backend
    docker compose -f docker-compose.prod.yml up -d --no-deps frontend backend
    ;;

*)
    echo "Unknown service"
    exit 1
    ;;
esac

docker image prune -f