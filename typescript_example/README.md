# README

## Requirements

Node.js (LTS)

npm (Package manager)

Typescript

PostgreSQL

Docker Desktop

## SETUP

### Get Started

This entire application is containerized and you can use the below command in your root directory to start everything.

```
docker compose -f docker-compose.yml up --build -d
```

After you spin up the container you can visit `http://localhost:3000/` to see that no users have been created.


## Teardown

To tear everything that was built above down use the below

```
docker compose -f docker-compose.yml down --volumes --remove-orphans
```