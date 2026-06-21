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

Create a realm named:

```text
company-realm
```

---

## Create User

Create a test user:

Username:

```text
user1
```

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

# Security Design

This solution uses:

* OAuth2 Authorization Code Flow
* PKCE (Proof Key for Code Exchange)
* OpenID Connect (OIDC)

Authentication is handled by Keycloak instead of a custom-built authentication system.

Benefits include:

* Centralized user management
* Reduced security risk
* Built-in SSO support
* Industry-standard authentication protocols
* Easier maintenance and scalability
