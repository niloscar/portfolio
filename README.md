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

```bash
npm install
npm run dev
```

Create environment files from the provided examples:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Live

[oscarnilsson.dev](https://oscarnilsson.dev/?ref=github)
