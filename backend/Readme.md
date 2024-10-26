# AIDAR Healthcare Monitoring System Backend

A real-time healthcare monitoring backend system built with Node.js, GraphQL, Express, and Prisma.

ERD for the app:


## Features

- **Authentication & Authorization**
  - Role-based access (Admin/Doctor/Patient)
  - JWT token-based authentication
  - Secure password hashing

- **Health Monitoring**
  - Track vital signs (Heart Rate, Blood Pressure, Temperature, Oxygen)
  - Historical health data storage
  - Real-time metric updates

- **Alert System**
  - Customizable health metric thresholds 
  - Automated alert generation
  - Real-time notifications via WebSocket

## Tech Stack

- Node.js
- Express
- GraphQL + Apollo Server
- Prisma ORM
- PostgreSQL
- WebSocket

## Prerequisites

- Node.js (v14+)
- PostgreSQL
- npm/yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/girik21/Aidar_Health
cd aidar_backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
# Create .env file
touch .env

# Add required variables
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
JWT_SECRET="your-secret-key"
```

4. Initialize database
```bash
npx prisma migrate dev
```

5. Start server
```bash
npm start
```

## Database Schema

The system includes the following models:

- **User**
  - Base model for all users
  - Attributes: id, username, email, password, roles

- **Doctor**
  - Extended user profile for medical professionals
  - Manages patients and thresholds

- **Patient**
  - Patient profile with medical history
  - Linked to health records and custom thresholds

- **HealthRecord**
  - Stores vital sign measurements
  - Tracks multiple health metrics

- **Threshold & PatientThreshold**
  - Defines normal ranges for health metrics
  - Supports both global and patient-specific thresholds

- **Alert**
  - Tracks health metric violations
  - Includes severity levels and status

## API Endpoints

### GraphQL Queries
```graphql
# Authentication
query Login($email: String!, $password: String!)
query GetUserProfile($userId: Int!)

# Health Records
query GetPatientHealthRecords($patientId: Int!)
query GetAlerts($doctorId: Int!)
```

### GraphQL Mutations
```graphql
# User Management
mutation CreateUser($input: UserInput!)
mutation UpdateUser($id: Int!, $input: UserInput!)

# Health Records
mutation AddHealthRecord($input: HealthRecordInput!)
mutation UpdateThresholds($input: ThresholdInput!)
```

### GraphQL Subscriptions
```graphql
# Real-time Updates
subscription OnNewHealthRecord($patientId: Int!)
subscription OnNewAlert($doctorId: Int!)
```

## Scripts

```json
{
  "start": "nodemon index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## Dependencies

```json
{
  "@prisma/client": "^5.21.1",
  "apollo-server-express": "^3.13.0",
  "bcrypt": "^5.1.1",
  "express": "^4.21.1",
  "graphql": "^15.9.0",
  "jsonwebtoken": "^9.0.2",
  "prisma": "^5.21.1"
}
```

## Project Structure

```
aidar_backend/
├── prisma/
│   └── schema.prisma    # Database schema
├── resolvers/       # GraphQL resolvers
├── schemas/         # GraphQL type definitions
├── .env                 # Environment variables
├── index.js            # Entry point
└── package.json        # Project configuration
```

## Error Handling

The system implements standardized error handling for:
- Authentication failures
- Invalid data input
- Database errors
- Threshold violations

## Security Measures

- Password hashing using bcrypt
- JWT token validation
- Role-based access control
- Input validation and sanitization

## Author
Kaustuv

## License
ISC

## Version
1.0.0

![Uploading Aidar_ERD.svg…]()
