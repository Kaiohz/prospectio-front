# Prospectio Frontend

## 🚀 Features

- **Job Opportunities**: Track and manage job postings with compatibility scoring
- **Company Profiles**: Detailed company information and relationship management  
- **Contact Management**: Centralized contact database with relationship mapping
- **Dark/Light Theme**: Seamless theme switching with system preference detection


## 🏗️ Architecture

This project follows **Clean Architecture** and **Hexagonal Architecture** principles:

```
src/
├── application/           # Application Layer - UI & Use Cases
│   ├── components/       # Reusable UI components
│   │   ├── layout/      # Layout components (header, sidebar, layout)
│   │   └── ui/          # Base UI components (shadcn/ui primitives)
│   └── pages/           # Application pages & views
├── domain/              # Domain Layer - Business Logic
│   ├── types.ts         # Core business entities & types
│   └── hooks/           # Custom business logic hooks
├── infrastructure/      # Infrastructure Layer - External Systems
│   └── mockData.ts      # Mock API & data adapters
└── lib/                 # Shared Utilities
    └── utils.ts         # Common utility functions
```
## 🚦 Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **Bun** (recommended) or npm/yarn
- **Git** for version control

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Kaiohz/prospectio-front.git
cd prospectio-front
```

2. **Install dependencies**:
```bash
bun install
# or with npm
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start development server**:
```bash
bun dev
# or with npm
npm run dev
```

The application will be available at `http://localhost:8080`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server with hot reload |
| `bun build` | Build optimized production bundle |
| `bun build:dev` | Build in development mode |
| `bun lint` | Run ESLint for code quality |
| `bun preview` | Preview production build locally |

## 🌍 Environment Configuration

Create a `.env` file in the root directory:

```env
# Backend API Configuration
VITE_APP_BACKEND_API_URL=http://localhost:3000/api
```

## 🐳 Docker Support

### Development with Docker Compose

```bash
# Build and start the application
docker-compose up -d --build

# View logs
docker-compose logs -f prospectio-front

# Stop the application
docker-compose down
```

The application will be available at `http://localhost:5173`

**Built with ❤️ by the Prospectio Team**
