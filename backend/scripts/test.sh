#!/bin/bash

CONTAINER_NAME="zenn-backend"

# Get the container ID by name
CONTAINER_ID=$(docker ps -qf "name=$CONTAINER_NAME")

# Check if container exists and is running
if [ -z "$CONTAINER_ID" ]; then
    echo "Container '$CONTAINER_NAME' is not running."
    exit 1
fi

# Execute bash inside the container
docker exec -it $CONTAINER_ID bun test