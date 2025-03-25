# Online Appointment Booking System

A modern, scalable appointment booking system built with Node.js, featuring a microservice architecture for notifications. The system provides a robust platform for managing appointments efficiently with real-time notifications.

##  Features

- RESTful API for appointment management
- Real-time notifications through a dedicated microservice
- SQLite database for data persistence
- Docker containerization
- Kubernetes deployment support
- Comprehensive CI/CD pipeline with GitHub Actions and Jenkins
- Automated testing and security scanning

## Architecture

The system consists of two main components:

1. **Main Application (Port 3000)**
   - Handles core appointment booking functionality
   - Manages user data and appointments
   - Provides RESTful API endpoints

2. **Notification Service (Port 3001)**
   - Microservice for handling notifications
   - Processes and sends real-time updates
   - Operates independently for better scalability

##  Quick Start

### Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- (Optional) Kubernetes cluster for production deployment

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd online-appointment-booking-system
   ```

2. Install dependencies:
   ```bash
   npm ci
   cd microservice && npm ci
   cd ..
   ```

3. Start the development environment:
   ```bash
   docker-compose up -d
   ```

   This will start:
   - Main application on port 3000
   - Notification service on port 3001
   - SQLite database

##  Docker Deployment

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build -d
   ```

2. Access the services:
   - Main API: http://localhost:3000
   - Notification Service: http://localhost:3001

##  Kubernetes Deployment

1. Apply Kubernetes configurations:
   ```bash
   kubectl apply -f k8s/backend-deployment.yaml
   kubectl apply -f k8s/microservice-deployment.yaml
   kubectl apply -f k8s/nginx-ingress.yaml
   ```

2. Verify deployments:
   ```bash
   kubectl get deployments
   kubectl get services
   kubectl get pods
   ```

##  CI/CD Pipeline

### GitHub Actions

The project includes a GitHub Actions workflow (`ci-cd-pipeline.yml`) that:

1. Builds and tests the application
2. Runs security scans
3. Builds Docker images
4. Pushes images to Docker Hub
5. Deploys to production

### Jenkins Pipeline

Alternatively, a Jenkins pipeline (`Jenkinsfile`) is configured for:

1. Dependency installation
2. Test execution
3. Security scanning
4. Docker image building and pushing
5. Kubernetes deployment

##  Testing

Run the test suite:
```bash
npm test
```

Tests are automatically run in the CI/CD pipeline before deployment.

##  Project Structure

```
├── .github/workflows    # GitHub Actions workflow
├── config/             # Configuration files
├── data/               # SQLite database
├── jenkins/            # Jenkins pipeline
├── k8s/                # Kubernetes manifests
├── microservice/       # Notification service
├── scripts/            # Utility scripts
├── tests/              # Test files
├── Dockerfile          # Main app Dockerfile
├── docker-compose.yml  # Docker Compose config
└── server.js          # Main application entry
```

##  Security

- Regular security audits via `npm audit`
- Secure environment variable handling
- Docker security best practices
- Kubernetes RBAC configuration

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

##  License

This project is licensed under the MIT License - see the LICENSE file for details.