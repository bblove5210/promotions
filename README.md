# NYU DevOps Promotions Service

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Python](https://img.shields.io/badge/Language-Python-blue.svg)](https://python.org/)
[![CI](https://github.com/CSCI-GA-2820-SP25-003/promotions/actions/workflows/ci.yml/badge.svg)](https://github.com/CSCI-GA-2820-SP25-003/promotions/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/CSCI-GA-2820-SP25-003/promotions/graph/badge.svg?token=59HKL5TX2J)](https://codecov.io/gh/CSCI-GA-2820-SP25-003/promotions)

## Overview

**The Promotions Squad handles deals on products (E.g.: 20% discount, buy 1 get 1 etc.)**
**This project was developed as part of the NYU DevOps and Agile Methodologies course, implementing a complete DevOps pipeline, including Continuous Integration, Kubernetes deployment, BDD testing, and Continuous Delivery.**

The service is currently deployed at the following URL: [https://promotion-qihangzhou-dev.apps.rm1.0a51.p1.openshiftapps.com/](https://promotion-qihangzhou-dev.apps.rm1.0a51.p1.openshiftapps.com/)

## Supported Promotion Categories

The system supports the following types of promotion categories:

| Category             | Description                                                |
|----------------------|------------------------------------------------------------|
| `PERCENTAGE_DISCOUNT_X` | Apply a percentage-based discount (e.g. 20% off)            |
| `BUY_X_GET_Y_FREE`      | Buy X items and get Y items free (e.g. buy 2 get 1 free)   |
| `SPEND_X_SAVE_Y`        | Save Y dollars when spending at least X (e.g. spend $100 save $20) |
| `UNKNOWN`               | Default value; used when category is not specified         |

Each promotion includes fields to define the `discount_x` and `discount_y` parameters, start and end dates, validity status, and audit timestamps.

## Features Implemented

- Create new promotions
- Retrieve existing promotions
- Update promotion details
- Delete promotions
- Query promotions by attributes
- Perform custom actions on promotions
- Swagger API documentation via Flask-RESTX
- Service health check endpoint
- UI for administration with BDD testing
- Kubernetes deployment (local and OpenShift)
- Continuous Integration with GitHub Actions
- Continuous Delivery with Tekton Pipeline

## Project Structure
```
/promotions-service
├── .github/workflows/        # GitHub Actions workflows
│   └── ci.yml                # CI workflow definition
├── .tekton/                  # Tekton pipeline configuration
│   ├── pipeline.yaml         # Pipeline definition
│   ├── tasks.yaml            # Task definitions
│   ├── triggers.yaml         # Pipeline triggers
│   └── workspace.yaml        # Workspace configuration
├── features/                 # BDD testing
│   ├── promotions.feature    # Feature specifications
│   ├── environment.py        # Test environment setup
│   └── steps/                # Step definitions
│       └── web_steps.py      # Web testing steps
├── frontend/                 # User interface
│   ├── src/                  # React components
│   └── public/               # Static assets
├── k8s/                      # Kubernetes manifests
│   ├── deployment.yaml       # App deployment
│   ├── service.yaml          # Service definition
│   ├── ingress.yaml          # Ingress configuration
│   └── postgres/             # Database deployment
│       ├── deployment.yaml   # StatefulSet configuration
│       └── service.yaml      # DB service configuration
├── service/                  # Service Python package
│   ├── __init__.py           # Package initializer
│   ├── config.py             # Configuration parameters
│   ├── models.py             # Business models for promotions
│   ├── routes.py             # Service API endpoints
│   ├── common/               # Common utilities
│   │   ├── cli_commands.py   # Flask CLI commands
│   │   ├── error_handlers.py # HTTP error handling
│   │   ├── log_handlers.py   # Logging setup
│   │   └── status.py         # HTTP status constants
│   └── static/               # Static assets (if needed)
├── tests/                    # Test cases package
│   ├── __init__.py           # Package initializer
│   ├── factories.py          # Factory for fake test objects
│   ├── test_models.py        # Unit tests for models
│   ├── test_routes.py        # Unit tests for API endpoints
│   └── test_cli_commands.py  # Tests for CLI commands
├── Dockerfile                # Container definition
├── .dockerignore             # Docker ignore file
├── .flaskenv                 # Flask environment variables
├── .gitignore                # Git ignore settings
├── .gitattributes            # Git attributes settings
├── k3d-config.yaml           # Local k3d configuration
├── Makefile                  # Development and build commands
├── Procfile                  # Deployment process file
├── LICENSE                   # License file
└── README.md                 # Project documentation
```


## API Documentation

The service provides the following RESTful endpoints:

- `GET /api/promotions` - List all promotions (supports query parameters)
- `POST /api/promotions` - Create a new promotion
- `GET /api/promotions/{id}` - Get a specific promotion
- `PUT /api/promotions/{id}` - Update a promotion
- `DELETE /api/promotions/{id}` - Delete a promotion
- `POST /api/promotions/{id}/action` - Perform an action on a promotion
- `GET /health` - Health check endpoint for Kubernetes
- `GET /apidocs/` - Swagger documentation

For detailed API documentation, visit the Swagger UI at `/apidocs/` when the application is running.

## Running the Service

### Local Development

```
make run
```

### Kubernetes Deployment

To run using local Kubernetes:
```
make cluster
make build
make push
make postgres
make deploy
```
(If `Get "https://cluster-registry:5000/v2/": dial tcp: lookup cluster-registry on 127.0.0.11:53: no such host` is shown after `make push`, run `sudo bash -c "echo '127.0.0.1    cluster-registry' >> /etc/hosts"`)

## Running Tests

### Unit Tests

To run unit tests and check code coverage:
make test

### BDD Tests

To run behavior-driven tests:
```
behave
```

## CI/CD Pipeline

### Continuous Integration

This project uses GitHub Actions for continuous integration. On every pull request and push to the master branch, the following checks are automatically run:

- Code quality checks (flake8, pylint)
- Unit tests (95%+ code coverage requirement)
- Code coverage reporting to Codecov

### Continuous Delivery

A complete Tekton pipeline has been implemented for automated continuous delivery to OpenShift. The pipeline consists of the following tasks:

1. Clone the git repository
2. Run linting and code quality checks
3. Run unit tests
4. Build and push Docker image
5. Deploy to Kubernetes
6. Run BDD tests on the deployed application

The pipeline is triggered automatically on pushes to the master branch via a webhook.

## License

Copyright (c) 2016, 2025 [John Rofrano](https://www.linkedin.com/in/JohnRofrano/). All rights reserved.

Licensed under the Apache License. See [LICENSE](LICENSE)

This repository is part of the New York University (NYU) masters class: **CSCI-GA.2820-001 DevOps and Agile Methodologies** created and taught by [John Rofrano](https://cs.nyu.edu/~rofrano/), Adjunct Instructor, NYU Courant Institute, Graduate Division, Computer Science, and NYU Stern School of Business.







