# Level Chart Backend

This is the backend for the Level Chart application, which provides the core logic for the platform. It includes functionalities such as integration with Shopify, scheduling tasks using cron jobs, logging with Winston, and more.

---

## Features

- Shopify API integration
- Auth0 authentication with `express-openid-connect`
- Task scheduling with cron jobs (`node-cron`)
- Logging with Winston
- Express-based API server
- MongoDB integration via Mongoose
- Session management with `express-session`
- EJS templating for views

---

## Getting Started

### Prerequisites

- Node.js (version >= 14.x)
- npm (or yarn)
- MongoDB instance
- Auth0 account for authentication setup

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jchandan001/level-chart-backend.git
   ```

2. Navigate to the project directory:

    ```bash
    cd level-chart-backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

# Configuration

Create a .env file at the root of the project and add the necessary environment variables, such as:

- PORT=app-running-port
- DATABASE_URL=your-mongo-db-connection-string
- ENCRYPTION_KEY=your-session-secret
- AUTH0_SECRET=your-auth0-session-secret
- AUTH0_BASE_URL=http://localhost:{{app_port}}
- AUTH0_CLIENT_ID=your-auth0-client-id
- AUTH0_ISSUER_BASE_URL=https://your-auth0-domain.auth0.com

# Running the Application

To run the development server, use the following command:

    ```bash
    npm run dev
    ```

This will start the application using ts-node and your TypeScript files.

# Build the Application

To build the project and generate the JavaScript files in the dist directory, run:

    ```bash
    npm run build
    ```

After building, you can start the application in production mode:

    ```bash
    npm start
    ```

# Running Tests

Currently, there are no tests defined. You can add your tests and run them using:
 
    ```bash
    npm run test
    ```

# Dependencies

axios: For making HTTP requests.
cors: Cross-origin resource sharing middleware.
dotenv: Loads environment variables from .env file.
express: Web framework for building the API.
mongoose: MongoDB object modeling for Node.js.
node-cron: Cron job scheduler.
winston: Logging library.

# Development Dependencies

@types/cors: TypeScript definitions for CORS.
@types/express: TypeScript definitions for Express.
@types/node: TypeScript definitions for Node.js.
@types/node-cron: TypeScript definitions for node-cron.
ts-node: TypeScript execution environment for Node.js.
typescript: TypeScript language support.

# License

This project is licensed under the ISC License - see the LICENSE file for details.

    ```csharp
    This README provides a basic setup guide, explains the scripts available in `package.json`, and lists dependencies along with their usage. You can expand it further as needed based on your project requirements.
    ```



