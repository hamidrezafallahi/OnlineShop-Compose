#!/bin/bash

set -e

SERVICE=$1

cd /opt/shop

case "$SERVICE" in

frontend)

    echo "Deploy Frontend"

    docker compose -f docker-compose.prod.yml pull frontend

    docker compose -f docker-compose.prod.yml up -d frontend

;;

backend)

    echo "Deploy Backend"

    docker compose -f docker-compose.prod.yml pull backend

    docker compose -f docker-compose.prod.yml up -d backend

;;

all)

    echo "Deploy All"
    docker compose -f docker-compose.prod.yml pull frontend backend
    docker compose -f docker-compose.prod.yml up -d frontend backend
;;

*)

    echo "Unknown argument"

    exit 1

;;

esac

docker image prune -f