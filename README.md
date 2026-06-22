# Centralized Authentication & Single Sign-On (SSO)

## Overview

This project demonstrates a centralized authentication solution using Keycloak as the Identity Provider (IdP).

The solution provides:

* Single Sign-On (SSO)
* Centralized user management
* Secure authentication using OAuth2 and OpenID Connect (OIDC)
* Support for multiple frontend applications

Applications included:

* React Application (App 1)
* SvelteKit Application (App 2)
* Keycloak Identity Provider

Once a user logs in through one application, they can access other applications without logging in again.

---

# System Architecture

```
                +----------------------+
                |      Keycloak        |
                |   Identity Provider  |
                +----------+-----------+
                           |
        +------------------+------------------+
        |                                     |
+-------v--------+                  +---------v--------+
| React App      |                  | SvelteKit App    |
| (App 1)        |                  | (App 2)          |
+----------------+                  +------------------+
```

---

# Why Keycloak Instead of Building a Custom User Management Application?

This project uses Keycloak as the centralized Identity Provider (IdP) instead of developing a custom authentication and user management application.

While it is technically possible to build a custom authentication system, doing so would require implementing and maintaining many security-critical features such as password management, session handling, authorization, Single Sign-On (SSO), and security monitoring.

Keycloak provides these capabilities out of the box and follows industry-standard authentication protocols including OAuth2 and OpenID Connect (OIDC).

# Comparison

| Criteria | Keycloak | Custom User Management Application |
|----------|-----------|-----------------------------------|
| Initial Development Time | Low | High |
| Security Features | Extensive built-in security controls | Must be developed and tested |
| SSO Support | Native support | Complex custom implementation |
| User Management | Built-in admin console | Requires custom admin portal |
| Standards Compliance | OAuth2, OpenID Connect, SAML | Must be implemented manually |
| Future Application Integration | Easy | Additional development required |
| Maintenance Overhead | Low | High |
| Cost Effectiveness | High | Lower due to ongoing development effort |

---

# Prerequisites

Install the following software:

* Docker Desktop
* Node.js
* npm

Verify installation:

```bash
docker --version
node -v
npm -v
```

---

# Docker Desktop

This project uses Docker to run Keycloak.

Before starting the system, ensure Docker Desktop is installed and running.

## Verify Docker Installation

Open Terminal and run:

```bash
docker --version
docker compose version
```

# Starting Keycloak

Navigate to the Keycloak folder:

```bash
cd keycloak
```

Start Keycloak:

```bash
docker compose up -d
```

Verify the container is running:

```bash
docker ps
```

Open:

http://localhost:8080

Default administrator account:

Username:

```text
admin
```

Password:

```text
admin123
```

---

# Keycloak Initial Configuration

## Create Realm
In navigation, Go to Manage Realms

Create a realm named:

```text
company-realm
```

---

## Create User
In navigation, Go to Users

Create a test user:

Username:

```text
user1
```

Email:

```text
user1@gmail.com
```

First name:

```text
Seanghai
```

Last name:

```text
Heng
```

=> click Create, then go to Credentials tab, click Set Password

Password:

```text
user123
```

Disable:

```text
Temporary Password
```

---

## Create React Client
In navigation, Go to Clients
Create a client:

Client ID:

```text
react-app
```

Settings:

```text
Client Authentication = OFF
Standard Flow = ON
```

Valid Redirect URI:

```text
http://localhost:5173/*
```

Web Origin:

```text
http://localhost:5173
```

---

## Create Svelte Client

Client ID:

```text
svelte-app
```

Settings:

```text
Client Authentication = OFF
Standard Flow = ON
```

Valid Redirect URI:

```text
http://localhost:5174/*
```

Web Origin:

```text
http://localhost:5174
```

---

# Running React Application

Navigate to the React application:

```bash
cd react-app
```

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm run dev
```

Application URL:

```text
http://localhost:5173
```

---

# Running SvelteKit Application

Navigate to the SvelteKit application:

```bash
cd svelte-app
```

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm run dev
```

Application URL:

```text
http://localhost:5174
```

---

# Demonstrating SSO

## Scenario 1

1. Open React App
2. Click Login
3. Authenticate with Keycloak
4. Open SvelteKit App

Expected Result:

User is already authenticated.

---

## Scenario 2

1. Open SvelteKit App
2. Click Login
3. Authenticate with Keycloak
4. Open React App

Expected Result:

User is already authenticated.

---

# Logout Behaviour

Logging out from either application will:

* Terminate the Keycloak session
* Remove the SSO session
* Require login again in all connected applications

---
