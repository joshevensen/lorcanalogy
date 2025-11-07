# Lorcanalogy

A Nuxt 3 application for tracking and analyzing Disney Lorcana trading card game data.

## Tech Stack

- **Framework**: Nuxt 3
- **Database**: Prisma with SQLite (better-sqlite3)
- **UI**: PrimeVue with TailwindCSS
- **Charts**: Chart.js

## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Database

This project uses Prisma ORM with SQLite. Key database operations:

### Generate Prisma Client

After schema changes:

```bash
npm run dbGenerate
```

### Database Migrations

Create and apply migrations:

```bash
npm run dbMigrate
```

### Open Prisma Studio

View and edit database content:

```bash
npm run studio
```

## Importing Card Data

### Prerequisites

Before importing cards, ensure reference data is populated:

#### 1. Add Inks

```bash
npm run add:ink "Amber"
```

#### 2. Add Rarities

```bash
npm run add:rarity "Common"
```

#### 3. Add Types

```bash
npm run add:type "Character"
```

### Importing a Set

To import a full set with all its cards:

```bash
npm run add:set set1
```

The script will:

1. Import or update the Set record
2. Extract and import unique Keywords
3. Extract and import unique Classifications
4. Import all cards with relationships (Inks, Types, Keywords, Classifications)

**Supported path formats:**

- `set1` - resolves to `data/set1.ts`
- `data/set1` - relative path
- `../../data/set1` - relative path from prisma/scripts/

### Creating New Set Files

Use the template file `data/set-template.ts` as a starting point:

1. Copy the template:

   ```bash
   cp data/set-template.ts data/setN.ts
   ```

2. Replace `N` with your set number (e.g., `set11.ts`)

3. Fill in the file:

```typescript
import type { CARD, SET } from "~/app.types";

export const set: SET = {
  id: "",
  name: "",
  code: "",
  released_at: "",
  prereleased_at: "",
};

export const cards: CARD[] = [];
```

4. Populate the cards array with all cards in the set

5. Import the set:

```bash
npm run add:set set11
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Available Scripts

| Script               | Description                 |
| -------------------- | --------------------------- |
| `npm run dev`        | Start development server    |
| `npm run build`      | Build for production        |
| `npm run generate`   | Generate static site        |
| `npm run preview`    | Preview production build    |
| `npm run studio`     | Open Prisma Studio          |
| `npm run dbGenerate` | Generate Prisma client      |
| `npm run dbMigrate`  | Run database migrations     |
| `npm run add:ink`    | Add ink(s) to database      |
| `npm run add:rarity` | Add rarity(ies) to database |
| `npm run add:type`   | Add type(s) to database     |
| `npm run add:set`    | Import full set with cards  |

## Data Structure

Sets are stored in the `data/` directory as TypeScript files:

- Each file exports a `set` constant (SET type)
- Each file exports a `cards` constant (CARD[] type)
- All types are defined in `app.types.ts`

## Check out the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
