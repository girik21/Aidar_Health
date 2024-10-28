# Aidar Health Live Monitoring App

- This app is intended to alert and notify the physicians when a patient’s health data goes out of predefined safe ranges.
- Please find set up instructions for frontend system and backend system inside their respective folders

   ## Users can Sign In and Sign Up
   ![Screenshot 2024-10-25 at 5 43 21 PM](https://github.com/user-attachments/assets/cbfca8d4-a575-43f7-8783-5408fa0245a0)

   ## Physicians can see alerts and access their patients health records. They are alerted if the threshold of the patient is not matched
   ![Screenshot 2024-10-25 at 5 42 40 PM](https://github.com/user-attachments/assets/8f2ef828-cda4-4152-99f6-7d54f3279513)

   ## Physicians can resolve the alerts by checking up on their patients
   ![Screenshot 2024-10-25 at 5 45 42 PM](https://github.com/user-attachments/assets/06b03e77-e9f1-4aa3-b32b-009b4dd8f594)

   ## Physicians can access the health records of their assigned patients
   ![Screenshot 2024-10-25 at 5 44 47 PM](https://github.com/user-attachments/assets/a22852d7-904e-4170-9e62-63dbbba2ee5e)

   ## Physicians can set up thresholds for the patient that 
   ![Screenshot 2024-10-25 at 5 46 53 PM](https://github.com/user-attachments/assets/5fa05a64-868c-44b0-ad98-9837d47d3939)

  # Technology Stack Summary

## Frontend Stack
- **React (v18.3.1)**: Modern JavaScript library for building user interfaces with its virtual DOM and component-based architecture.

- **TypeScript (v5.5.3)**: Adds static typing to JavaScript, providing better developer experience and code reliability.

- **Vite (v5.4.8)**: Next-generation frontend build tool offering faster development server and optimized builds.

- **Apollo Client (v3.11.8)**
  - GraphQL client for React
  - Handles data fetching, caching, and state management
  - Integrates with WebSocket for real-time updates

- **TailwindCSS (v3.4.14)**: Utility-first CSS framework for rapid UI development.

- **GraphQL CodeGen**: Automated type generation for GraphQL operations.
  - `@graphql-codegen/typescript`: TypeScript types generation
  - `@graphql-codegen/typescript-operations`: Operation-specific types
  - `@graphql-codegen/typescript-react-apollo`: React hooks generation

## Backend Stack
- **Node.js**: JavaScript runtime for server-side development.

- **Express (v4.21.1)**: Web framework for Node.js.

- **Prisma (v5.21.1)**
  - Modern database ORM
  - Type-safe database access
  - Database migration tools

- **PostgreSQL**: Robust relational database system.

- **GraphQL (v15.9.0)**
  - Query language for APIs
  - Apollo Server for GraphQL implementation
  - GraphQL subscriptions for real-time features

## Development Tools
- **ESLint (v9.11.1)**: JavaScript/TypeScript linting tool.

- **nodemon**: Development server with auto-reload capability.

- **bcrypt**: Password hashing library.

- **JWT**: Authentication token management.

## Database Design
- Normalized schema with clear relationships
- Role-based access control
- Real-time health metrics monitoring
- Alert system with customizable thresholds

## Key Features Implementation
1. **Authentication**
   - JWT-based auth flow
   - Role-based access control
   - Secure password handling

2. **Real-time Monitoring**
   - WebSocket connections
   - GraphQL subscriptions
   - Live data updates

3. **Data Management**
   - Type-safe database operations
   - Efficient data fetching
   - Optimized caching

4. **Security**
   - Input validation
   - Data encryption
   - Secure session handling

## Development Environment
- **VSCode** recommended IDE
- **Git** for version control
- **npm** for package management
- Environment variables for configuration

## Testing & Quality
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Development/Production environments

## Architecture Highlights
- Clean separation of concerns
- Modular component structure
- Type-safe data flow
- Scalable database design
