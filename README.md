# Productivity Suite Monorepo

A modular, full-stack productivity suite designed to unify everyday tools into a single, cohesive ecosystem.

This repository contains multiple applications (and shared infrastructure) for managing notes, tasks, time, health, and finances — built to work independently and together.

---

## Vision

Most productivity tools are fragmented. This project aims to:

- Consolidate core personal workflows into one ecosystem
- Enable seamless data flow between apps (e.g. tasks ↔ time tracking ↔ habits)
- Provide a consistent UX and shared system design across all tools
- Stay modular so each app remains independently usable

---

## Apps

Each app lives in `/apps` and can run independently.

### 📝 Notes

- Rich text / markdown note-taking
- Tagging and search
- Knowledge base / second brain use cases

### ⏱ Time & Task Manager

- Task management (projects, priorities, deadlines)
- Time tracking
- Scheduling and planning

### 🥗 Diet & Fitness Tracker

- Meal tracking
- Workout logging
- Progress monitoring

### 💰 Budget Manager

- Income & expense tracking
- Budget planning
- Financial insights

---

## Monorepo Structure

```
/apps
  /pave     # Calendar
  /jot      # Notes
  /stride   # Tasks & Time
  /prime    # Fitness & Diet
  /tally    # Finance

/packages
  /ui           # Design system (components, tokens, theming)
  /config       # Shared configs (eslint, tsconfig, etc.)
  /db           # Database schema, migrations, seeds
  /auth         # Authentication logic and guards
  /api          # Shared API layer (contracts, handlers)
  /utils        # Pure utility functions
  /types        # Shared types and validation schemas
  /store        # Shared state logic (optional)

/services
  /sync         # Cross-app synchronization
  /search       # Global search indexing
  /notifications

/tooling
  /scripts
  /ci

```

---

## Architectural Principles

### 1. Thin Applications

Applications are responsible for:

- Routing
- UI composition

They do **not** contain core business logic.

---

### 2. Shared Core via Packages

All reusable logic lives in `/packages`.

This includes:

- Business rules
- Data access
- Validation
- Shared state

This ensures consistency and eliminates duplication across apps.

---

### 3. Centralized Data Layer

A single database schema is maintained in `/packages/db`.

All domains (tasks, notes, events, etc.) are modeled in a way that allows relationships across apps.

---

### 4. First-Class Design System

The `/packages/ui` package defines the visual and interaction layer across all apps.

Consistency in UI is treated as a core system requirement, not an afterthought.

---

### 5. Event-Driven Evolution (Future)

As the system grows, cross-app interactions will be handled via events.

Example:

- Completing a task may update calendar data or analytics.

This avoids tight coupling between apps.

---

## Routing Strategy

Atlas is served under a single domain:

```
atlas.mbyte.app/pave
atlas.mbyte.app/jot
atlas.mbyte.app/stride
...
```

### Why this approach

- Unified user experience
- Simplified authentication/session handling
- Easier cross-app navigation
- Reduced infrastructure complexity

---

## Future Flexibility

The system is designed to support subdomains if needed:

```
pave.mbyte.app → proxied to /pave
jot.mbyte.app  → proxied to /jot
```

This allows:

- Independent scaling
- External product exposure
- Service isolation

Without requiring structural changes to the codebase.

---

## Philosophy

Atlas is not a collection of tools.

It is a unified system designed to help users understand and navigate their lives through interconnected data and workflows.

## Tech Stack

- Frontend: React / Next.js
- Backend: Node.js / API routes / services
- Database: PostgreSQL
- ORM: Prisma
- State: Zustand / Redux (where needed)
- Styling: Tailwind / Mantine
- Tooling: pnpm, Turborepo

---

## Core Principles

- **Modularity** — apps should not tightly depend on each other
- **Reusability** — shared logic lives in `/packages`
- **Consistency** — unified design system and patterns
- **Scalability** — built to handle growth in features and users
- **Performance-first** — avoid unnecessary coupling and overhead

---

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run all apps (dev)

```bash
pnpm dev
```

### 3. Run a specific app

```bash
pnpm --filter <app-name> dev
```

---

## Environment Setup

Create a `.env` file at the root (or per app if required):

```
DATABASE_URL=
REDIS_URL=
NEXT_PUBLIC_*
```

---

## Roadmap

- [x] Shared authentication system
- [x] Cross-app data linking
- [ ] Offline-first support (PWA)
- [x] Mobile optimization
- [ ] Analytics and insights layer

---

## Status

Early-stage. Core architecture and individual apps are under active development.

---

## License

MIT
