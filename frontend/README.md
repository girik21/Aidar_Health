# Healthcare Monitoring System Frontend

A modern, responsive frontend for the Healthcare Monitoring System built with React, TypeScript, and Apollo Client.

## 🚀 Tech Stack

- **React** - UI Library
- **TypeScript** - Type Safety
- **Apollo Client** - GraphQL Client
- **Vite** - Build Tool
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **GraphQL Code Generator** - Type-safe GraphQL operations

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── AuthScreen/       # Authentication components
│   │   ├── Layout/          # Layout components
│   │   ├── PatientAlert/    # Alert components
│   │   ├── PatientCarousel/ # Patient overview
│   │   ├── PatientThresholdPopup/ # Threshold management
│   │   ├── Sidebar/        # Navigation sidebar
│   │   ├── Spinner/        # Loading indicators
│   │   └── mainLayout/     # Main application layout
│   │
│   ├── pages/               # Application pages
│   │   ├── Alerts.tsx      # Alert management
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── Landing.tsx     # Landing page
│   │   ├── Patients.tsx    # Patient management
│   │   ├── Records.tsx     # Health records
│   │   └── Thresholds.tsx  # Threshold settings
│   │
│   ├── lib/                 # Utility functions
│   │   ├── apollo.ts       # Apollo client setup
│   │   └── types.ts        # TypeScript definitions
│   │
│   ├── graphql/            # GraphQL operations
│   ├── assets/             # Static assets
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
│
├── codegen.yml             # GraphQL codegen config
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
├── vite.config.ts         # Vite config
└── package.json           # Project dependencies
```

## 🛠️ Setup & Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file
touch .env

# Add required variables
VITE_API_URL=your_backend_url
VITE_WS_URL=your_websocket_url
```

4. Generate GraphQL types:
```bash
npm run codegen
```

5. Start development server:
```bash
npm run dev
```

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Generate GraphQL types
npm run codegen

# Preview production build
npm run preview
```

## 🔧 Configuration Files

- **codegen.yml**: GraphQL code generation setup
- **tailwind.config.js**: TailwindCSS configuration
- **tsconfig.json**: TypeScript compiler options
- **vite.config.ts**: Vite bundler configuration
- **eslint.config.js**: ESLint rules and settings

## 📱 Features

- **Authentication**
  - User login/registration
  - Role-based access control
  - Secure session management

- **Dashboard**
  - Real-time health metrics
  - Patient overview
  - Alert notifications

- **Patient Management**
  - Patient profiles
  - Health record tracking
  - Custom threshold settings

- **Alert System**
  - Real-time notifications
  - Alert history
  - Severity indicators

- **Health Records**
  - Vital signs monitoring
  - Historical data visualization
  - Trend analysis

## 🔐 Authentication

The application uses JWT-based authentication with Apollo Client:
- Token storage in local storage
- Automatic token refresh
- Protected routes with React Router

## 📊 GraphQL Integration

- Type-safe operations using GraphQL Code Generator
- Real-time updates with WebSocket subscriptions
- Efficient caching with Apollo Client

## 🎨 Styling

- Responsive design with TailwindCSS
- Custom component library
- Consistent theming

## 🧪 Type Safety

- Full TypeScript support
- Generated types for GraphQL operations
- Strict type checking

## 📦 Dependencies

```json
{
  "@apollo/client": "^3.11.8",
  "react": "^18.3.1",
  "react-router-dom": "^6.27.0",
  "graphql": "^16.9.0",
  "typescript": "^5.5.3"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📚 Documentation

For detailed API documentation and component usage, see the `/docs` directory.
