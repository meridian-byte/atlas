# Atlas Monorepo

A modular, full-stack productivity system designed to unify everyday tools into a single, cohesive ecosystem.

This repository contains a single integrated application surface (`atlas`) and a web entry layer (`web`), backed by shared infrastructure and domain packages.

---

## Vision

Most productivity tools are fragmented. This project aims to:

- Consolidate core personal workflows into one system
- Enable seamless data flow across domains (tasks, time, notes, health, finance)
- Provide a consistent UX and shared system design
- Maintain modular architecture without fragmenting the product experience

---

## Applications

All user-facing functionality is consolidated into two apps:

### 🌐 `/apps/web`

- Entry point / marketing layer
- Handles landing pages, onboarding, and public-facing content
- Can evolve independently from the core product

### 🧠 `/apps/atlas`

- Core authenticated application
- Houses all productivity domains:

  - Notes
  - Tasks & Time
  - Calendar
  - Fitness & Diet
  - Finance

This replaces the previous multi-app structure with a unified product surface.

---

## Monorepo Structure

```
/apps
  /web        # Public-facing site
  /atlas      # Core product (all tools integrated)

/packages
  /ui         # Design system (components, tokens, theming)
  /config     # Shared configs (eslint, tsconfig, etc.)
  /db         # Database schema, migrations, seeds
  /auth       # Authentication logic and guards
  /api        # Shared API layer (contracts, handlers)
  /utils      # Pure utility functions
  /types      # Shared types and validation schemas
  /store      # Shared state logic (optional)

/services
  /sync
  /search
  /notifications

/tooling
  /scripts
  /ci
```

---

## Architectural Principles

### 1. Thin Applications

Apps are responsible for:

- Routing
- UI composition

They do **not** contain core business logic.

---

### 2. Shared Core via Packages

All reusable logic lives in `/packages`, including:

- Business rules
- Data access
- Validation
- Shared state

This ensures consistency and eliminates duplication.

---

### 3. Unified Domain Model

A single database schema in `/packages/db` models all domains:

- Notes, tasks, events, health, finance

This enables:

- Cross-domain relationships
- Rich insights
- System-wide features

---

### 4. Integrated Product Surface

Instead of separate apps, Atlas is a single system with multiple domains.

Benefits:

- No context switching
- Shared navigation and state
- Easier cross-feature interactions

---

### 5. Design System as Infrastructure

The `/packages/ui` package defines:

- Components
- Tokens
- Theming

Consistency is enforced across the entire system.

---

### 6. Event-Driven Evolution (Future)

Cross-domain interactions will be handled via events.

Example:

- Completing a task updates analytics or scheduling

This avoids tight coupling while enabling system-wide behavior.

---

## Routing Strategy

Atlas is served under a unified structure:

```
atlas.mbyte.app        → main app
atlas.mbyte.app/*      → all features (notes, tasks, etc.)
```

---

## Philosophy

Atlas is not a collection of tools.

It is a unified system for understanding and navigating life through connected data and workflows.

---

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

- **Modularity** — logic is decoupled at the package level
- **Reusability** — shared infrastructure across domains
- **Consistency** — unified UX and system design
- **Scalability** — built for feature and user growth
- **Performance-first** — minimal duplication and overhead

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
pnpm --filter web dev
pnpm --filter atlas dev
```

---

## Environment Setup

Create a `.env` file at the root:

```
DATABASE_URL=
REDIS_URL=
NEXT_PUBLIC_*
```

---

## Roadmap

- [x] Shared authentication system
- [x] Cross-domain data linking
- [ ] Offline-first support (PWA)
- [x] Mobile optimization
- [ ] Analytics and insights layer

---

## Status

Early-stage. Core architecture and unified app are under active development.

---

## License

MIT
