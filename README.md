# MeridianByte Monorepo

A modular technology ecosystem powering connected digital solutions through shared infrastructure, reusable systems, and unified product experiences.

This repository contains the core MeridianByte platform and its products, including **Atlas**, a unified productivity system designed to bring everyday workflows into one connected ecosystem.

---

## Vision

MeridianByte exists to build software systems that reduce fragmentation and help people interact with technology more naturally.

Our goal is to:

- Build connected digital products instead of isolated tools
- Create reusable foundations shared across solutions
- Enable seamless data flow between domains and services
- Maintain consistent user experiences across the ecosystem
- Scale products without duplicating infrastructure

---

## Repository Structure

```
/apps
  /web        # MeridianByte public website and marketing layer
  /atlas      # Atlas productivity platform
  /api        # Shared backend/API application layer

/packages
  /ui        # Shared design system, components, tokens, theming
  /config    # Shared configurations (eslint, tsconfig, tooling)
  /db        # Database schemas, migrations, seeds
  /auth      # Authentication systems and guards
  /api       # Shared API contracts and handlers
  /utils     # Shared utility functions
  /types     # Shared types and validation schemas
  /store     # Shared state management logic

/services
  /sync
  /search
  /notifications

/tooling
  /scripts
  /ci
```

---

## Architecture Principles

### 1. Product-Based Architecture

MeridianByte is structured around independent solutions that share common foundations.

Each product:

- Has its own user experience
- Can evolve independently
- Uses shared infrastructure where appropriate
- Remains part of the wider MeridianByte ecosystem

---

### 2. Shared Infrastructure

Reusable capabilities live in shared packages.

These include:

- Authentication
- Database access
- API patterns
- UI components
- Validation
- Configuration
- Common utilities

This reduces duplication and keeps products consistent.

---

### 3. Unified Design Language

The MeridianByte design system provides:

- Shared components
- Design tokens
- Themes
- Interaction patterns

Every product benefits from a consistent experience while maintaining its own identity.

---

### 4. Scalable Domain Architecture

Products are built around modular domains that can grow independently while still communicating through shared systems and future event-driven infrastructure.

---

## Products

### 🧠 Atlas

Atlas is MeridianByte's unified productivity platform.

It combines:

- Notes
- Tasks
- Time management
- Calendar
- Fitness and diet tracking
- Finance management

Atlas represents the vision of connected personal workflows inside one system.

---

## Tech Stack

- Frontend: React / Next.js
- Backend: Node.js / API services
- Database: PostgreSQL
- ORM: Prisma
- State Management: Zustand / Redux where needed
- Styling: Tailwind / Mantine
- Tooling: pnpm, Turborepo

---

## Core Principles

- **Modularity** — systems are separated by responsibility
- **Reusability** — infrastructure is shared across products
- **Consistency** — products follow unified design principles
- **Scalability** — architecture supports future growth
- **Performance-first** — minimize unnecessary duplication and overhead

---

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run all applications

```bash
pnpm dev
```

### Run a specific application

```bash
pnpm --filter web dev
pnpm --filter atlas dev
```

---

## Environment Setup

Create a `.env` file at the repository root:

```
DATABASE_URL=
REDIS_URL=
NEXT_PUBLIC_*
```

---

## Roadmap

- [x] Shared authentication system
- [x] Unified monorepo architecture
- [x] Shared design system
- [ ] Event-driven communication layer
- [ ] Offline-first capabilities
- [ ] Analytics and insights platform

---

## Status

Early-stage. MeridianByte's core architecture and product ecosystem are under active development.

---

## License

MIT
