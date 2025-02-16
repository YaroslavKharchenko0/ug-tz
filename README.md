# Microservices Test Assignment

This project consists of two microservices: **Products** and **Notifications**.

---

## Overview

### Products Service
- **Endpoints:**  
  - Create Product  
  - Delete Product  
  - List Products (with pagination)
- **Functionality:**  
  - Sends notification messages to the Notifications service for create/delete operations.
  - Maintains counter metrics for created and deleted products.
- **Technologies:**  
  - TypeScript, NestJS, PostgreSQL (raw SQL with migrations), Prometheus for metrics, Drizzle orm for migrations, RabbitMQ for messaging, Swagger for documentation.

### Notifications Service
- **Functionality:**  
  - Listens for messages from the Products service and logs them.
- **Technologies:**  
  - TypeScript, NestJS

---

## Getting Started

### Running with Docker
Ensure you have Docker and Docker Compose installed.  
From the project root, run:
```bash
docker compose up -d
```

### Running Locally
You can also run each service locally using the Nx CLI:

- **Products Service:**
  ```bash
  nx serve products --configuration=development
  ```
- **Notifications Service:**
  ```bash
  nx serve notifications --configuration=development
  ```

### Running Tests
To run tests for the Products service:
```bash
nx test products
```

---

## Available Commands

### Products Service
- **Build:**
  - Production: `nx build products`
  - Development: `nx build products --configuration=development`
- **Serve:**
  - Production: `nx serve products --configuration=production`
  - Development: `nx serve products --configuration=development`
- **Docker Build:**
  - `nx docker-build products`
- **Database Migrations & Management:**
  - Generate: `nx run products:drizzle:generate`
  - Push: `nx run products:drizzle:push`
  - Drop: `nx run products:drizzle:drop`
  - Check: `nx run products:drizzle:check`
  - Studio: `nx run products:drizzle:studio`

### Notifications Service
- **Build:**
  - Production: `nx build notifications`
  - Development: `nx build notifications --configuration=development`
- **Serve:**
  - Production: `nx serve notifications --configuration=production`
  - Development: `nx serve notifications --configuration=development`
- **Tests:**
  - `nx test notifications`

---

## Technologies Used
- **Programming Language:** TypeScript
- **Framework:** NestJS
- **Database:** PostgreSQL (raw SQL queries with migrations)
- **Metrics:** Prometheus
- **Messaging Broker:** RabbitMQ
- **Containerization:** Docker, Docker Compose
- **Workspace:** Nx

---

