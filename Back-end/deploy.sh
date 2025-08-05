#!/bin/bash

# Personal Blog Backend - Docker Deployment Script
# Simplifies Docker build, test, and deployment workflow

set -e  # Exit immediately on error

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    log_info "Checking Docker environment..."
    if ! docker info >/dev/null 2>&1; then
        log_error "Docker daemon is not running, please start Docker Desktop"
        exit 1
    fi
    log_success "Docker environment is ready"
}

# Check environment variables file
check_env_file() {
    if [ ! -f ".env.docker" ]; then
        log_warning ".env.docker file does not exist"
        if [ -f "env.example" ]; then
            log_info "Copying example environment file..."
            cp env.example .env.docker
            log_warning "Please edit .env.docker file and fill in actual environment variable values"
            echo "Press Enter to continue after editing..."
            read -r
        else
            log_error "Environment file not found, please create .env.docker"
            exit 1
        fi
    fi
    log_success "Environment file exists"
}

# Build image
build_image() {
    log_info "Building Docker image..."
    docker build -t blog-backend:latest .
    log_success "Image build completed"
    
    # Show image information
    log_info "Image information:"
    docker images blog-backend:latest
}

# Test image
test_image() {
    log_info "Testing Docker image..."
    
    # Stop and remove existing test container
    docker stop blog-backend-test 2>/dev/null || true
    docker rm blog-backend-test 2>/dev/null || true
    
    # Run test container
    log_info "Starting test container..."
    docker run -d \
        --name blog-backend-test \
        -p 3002:3002 \
        --env-file .env.docker \
        blog-backend:latest
    
    # Wait for container to start
    log_info "Waiting for container to start..."
    sleep 10
    
    # Health check
    log_info "Performing health check..."
    if curl -f http://localhost:3002/api/v1/health >/dev/null 2>&1; then
        log_success "Health check passed"
    else
        log_error "Health check failed"
        log_info "Container logs:"
        docker logs blog-backend-test
        cleanup_test
        exit 1
    fi
    
    log_success "Image test passed"
}

# Clean up test container
cleanup_test() {
    log_info "Cleaning up test container..."
    docker stop blog-backend-test 2>/dev/null || true
    docker rm blog-backend-test 2>/dev/null || true
}

# Push to Docker Hub
push_to_hub() {
    if [ -z "$1" ]; then
        log_error "Please provide Docker Hub username: ./deploy.sh push <username>"
        exit 1
    fi
    
    local username=$1
    log_info "Pushing image to Docker Hub..."
    
    # Check if logged in
    if ! docker info | grep -q "Username"; then
        log_info "Please login to Docker Hub:"
        docker login
    fi
    
    # Tag images
    docker tag blog-backend:latest $username/blog-backend:latest
    docker tag blog-backend:latest $username/blog-backend:v$(date +%Y%m%d-%H%M%S)
    
    # Push images
    docker push $username/blog-backend:latest
    docker push $username/blog-backend:v$(date +%Y%m%d-%H%M%S)
    
    log_success "Image push completed"
}

# Deploy using docker-compose
deploy_compose() {
    log_info "Deploying using docker-compose..."
    check_env_file
    
    # Build and start
    docker-compose up -d --build
    
    # Show status
    log_info "Container status:"
    docker-compose ps
    
    log_success "Deployment completed"
    log_info "API endpoint: http://localhost:3002"
    log_info "Health check: http://localhost:3002/api/v1/health"
}

# Show help information
show_help() {
    echo "Personal Blog Backend - Docker Deployment Script"
    echo ""
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  build                Build Docker image"
    echo "  test                 Test Docker image"
    echo "  push <username>      Push image to Docker Hub"
    echo "  deploy               Deploy using docker-compose"
    echo "  cleanup              Clean up test containers"
    echo "  logs                 Show container logs"
    echo "  stop                 Stop containers"
    echo "  restart              Restart containers"
    echo "  help                 Show help information"
    echo ""
    echo "Examples:"
    echo "  $0 build"
    echo "  $0 test"
    echo "  $0 push myusername"
    echo "  $0 deploy"
}

# Show logs
show_logs() {
    if docker ps | grep -q blog-backend; then
        docker-compose logs -f
    else
        log_warning "Container is not running"
    fi
}

# Stop containers
stop_containers() {
    log_info "Stopping containers..."
    docker-compose down
    cleanup_test
    log_success "Containers stopped"
}

# Restart containers
restart_containers() {
    log_info "Restarting containers..."
    docker-compose restart
    log_success "Containers restarted"
}

# 主函数
main() {
    case "${1:-help}" in
        "build")
            check_docker
            check_env_file
            build_image
            ;;
        "test")
            check_docker
            check_env_file
            build_image
            test_image
            cleanup_test
            ;;
        "push")
            check_docker
            push_to_hub "$2"
            ;;
        "deploy")
            check_docker
            deploy_compose
            ;;
        "cleanup")
            cleanup_test
            ;;
        "logs")
            show_logs
            ;;
        "stop")
            stop_containers
            ;;
        "restart")
            restart_containers
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# 执行主函数
main "$@"