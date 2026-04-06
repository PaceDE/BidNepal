# BidNepal

A full-stack bidding platform built with Next.js (frontend) and Node.js/Express (backend).

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Package Manager**: pnpm for frontend, npm for backend and root

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (for frontend)
- npm (for backend)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PaceDE/BidNepal.git
   cd BidNepal
   ```

2. Install all dependencies:
   ```bash
   npm run install-all
   ```

### Running the Application

To run both frontend and backend concurrently:
```bash
npm run dev-all
```

This will start:
- Backend server (check backend configuration for port)
- Frontend on http://localhost:3000

### Individual Services

#### Backend
```bash
cd backend
npm run dev  # Development with nodemon
npm start    # Production
```

#### Frontend
```bash
cd bidnepal-frontend
pnpm dev     # Development
pnpm build   # Build for production
pnpm start   # Start production server
```

## Project Structure

```
BidNepal/
├── backend/          # Express.js API server
├── bidnepal-frontend/ # Next.js frontend application
├── package.json      # Root scripts for managing both services
└── README.md
```

## License

ISC
