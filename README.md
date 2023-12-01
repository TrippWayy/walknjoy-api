# Walknjoy API Documentation

## Introduction

The Walknjoy API allows you to manage products in a simple and efficient manner.

## Getting Started

To get started, obtain an API key by signing up on our [developer portal](https://developer.example.com). Include the API key in the header of your requests.

Base URL: `https://walknjoy.com/api`

### Authentication

**Endpoint:** `/auth`

To authenticate with the Walknjoy API, send a `POST` request to the `/auth/register` endpoint with your credentials.

**Request:**
```http
POST https://walknjoy.com/api/auth/register
Content-Type: application/form-data
```

To login Walknjoy API, send a `POST` request to the `/auth/login` endpoint with your credentials.

**Request:**
```http
POST https://walknjoy.com/api/auth/login
Content-Type: application/json

{
    "username": "your-username",
    "password": "your-password"
}
```

To logout Walknjoy API, send a `POST` request to the `/auth/logout` endpoint.

**Request:**
```http
POST https://walknjoy.com/api/auth/logout
```
