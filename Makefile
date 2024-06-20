# Define variables
IMAGE_NAME := awtsyde-user-v2
CONTAINER_NAME := awtsyde-user-v2
PORT := 5001

# Build Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Run Docker container in detached mode
run:
	docker run -d -p $(PORT):$(PORT) --env-file=./.env --name $(CONTAINER_NAME) $(IMAGE_NAME)

# Stop Docker container
stop:
	docker stop $(CONTAINER_NAME)

# Remove Docker container
remove:
	docker rm $(CONTAINER_NAME)

# Remove Docker image
remove-image:
	docker rmi $(IMAGE_NAME)

# View running containers
ps:
	docker ps

# View all containers (including stopped ones)
ps-all:
	docker ps -a

# View Docker images
images:
	docker images

# Execute a command inside the running container (e.g., bash shell)
exec:
	docker exec -it $(CONTAINER_NAME) bash

# Clean up (stop and remove) all containers and images
clean:
	docker stop $(shell docker ps -aq) || true
	docker rm $(shell docker ps -aq) || true
	docker rmi $(shell docker images -aq) || true

# Help target to display available targets and their descriptions
help:
	@echo "Available targets:"
	@echo "  build           Build Docker image"
	@echo "  run             Run Docker container in detached mode"
	@echo "  stop            Stop Docker container"
	@echo "  remove          Remove Docker container"
	@echo "  remove-image    Remove Docker image"
	@echo "  ps              View running containers"
	@echo "  ps-all          View all containers (including stopped ones)"
	@echo "  images          View Docker images"
	@echo "  exec            Execute a command inside the running container"
	@echo "  clean           Clean up (stop and remove) all containers and images"
	@echo "  help            Display this help message"

# Make the 'build' target the default target when 'make' is run without arguments
.DEFAULT_GOAL := build