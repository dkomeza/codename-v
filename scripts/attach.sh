#!/bin/bash

# Check if argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <container_name>"
    echo ""
    echo "Possible containers:"
    docker ps --format "table {{.Names}}" | tail -n +2
    exit 1
fi

# Get the container ID by name
CONTAINER_ID=$(docker ps -qf "name=$1")

# Check if container exists and is running
if [ -z "$CONTAINER_ID" ]; then
    echo "Container '$1' is not running."
    exit 1
fi

# Execute bash inside the container
docker exec -it $CONTAINER_ID bash