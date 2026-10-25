# Portfolio

Personal portfolio for presenting my projects, technical skills, education and work experience.

Built as a full-stack application with a React frontend, Node.js backend and shared TypeScript types and validation schemas. Includes visitor analytics, an application form for prospective internship hosts and an admin dashboard.

## Tech stack

- React
- TypeScript
- Vite
- React Router
- Node.js
- Express
- PostgreSQL
- CSS Modules

## Structure

```text
.
├── frontend/   # React application
├── backend/    # API, authentication, analytics, and applications
├── shared/     # Shared types and validation
└── scripts/    # Development and build utilities
```

The repository uses npm workspaces to manage the applications and shared package.

## Development

Install dependencies:

```bash
npm install
```

Create environment files from the provided examples and configure them for your local environment:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Initialize an empty PostgreSQL database using [`backend/sql/schema.sql`](backend/sql/schema.sql). The script creates the required tables, indexes and initial analytics settings.

Start the development servers:

```bash
npm run dev
```

## Live

[oscarnilsson.dev](https://oscarnilsson.dev/?ref=github)
