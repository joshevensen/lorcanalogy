# SQLite Migration & Schema Refactoring Plan

## Overview

This plan covers:

1. **Converting from PostgreSQL to SQLite**
2. **Refactoring Ink from enum to table** (many-to-many for dual ink cards)
3. **Creating a workflow for adding new cards, sets, roles, etc.**

---

## Phase 1: Schema Refactoring (Ink Table & Relationships)

### Current Issues

1. **Ink Enum Limitation**: Currently using `ink1` and `ink2` fields, which:
   - Limits cards to exactly 2 inks maximum
   - Makes queries awkward (`ink1 OR ink2`)
   - Doesn't scale if cards ever need 3+ inks

2. **Type Field Mismatch**: JSON data has `type: string[]` (array), but schema has `type: Type` (single enum)
   - Need to decide: single type or multiple types per card?

3. **SQLite Array Handling**: PostgreSQL supports native arrays (`String[]`), SQLite doesn't
   - Need to convert `classifications`, `keywords`, `illustrators` to junction tables or JSON strings

### Proposed Schema Changes

#### 1. Ink Table (Many-to-Many)

```prisma
model Ink {
  id    Int    @id @default(autoincrement())
  name  String @unique  // "amber", "amethyst", "emerald", "ruby", "sapphire", "steel"
  code  String @unique  // "amber", "amethyst", etc. (for API consistency)

  Cards CardInk[]

  @@index([name])
  @@index([code])
}
```

#### 2. Card-Ink Junction Table

```prisma
model CardInk {
  id     Int  @id @default(autoincrement())
  cardId Int
  inkId  Int
  order  Int  @default(0)  // For primary/secondary ordering if needed

  Card Card @relation(fields: [cardId], references: [id], onDelete: Cascade)
  Ink  Ink  @relation(fields: [inkId], references: [id])

  @@unique([cardId, inkId])
  @@index([cardId])
  @@index([inkId])
}
```

#### 3. Updated Card Model

Remove:

- `ink1: Ink`
- `ink2: Ink?`
- Index on `ink1`

Add:

- `CardsInk CardInk[]` relation

#### 4. Array Fields Handling (SQLite Limitation)

**Option A: Junction Tables** (Recommended for querying)

```prisma
model CardKeyword {
  id     Int  @id @default(autoincrement())
  cardId Int
  value  String

  Card Card @relation(fields: [cardId], references: [id], onDelete: Cascade)

  @@unique([cardId, value])
  @@index([cardId])
  @@index([value])
}

model CardClassification {
  id     Int  @id @default(autoincrement())
  cardId Int
  value  String

  Card Card @relation(fields: [cardId], references: [id], onDelete: Cascade)

  @@unique([cardId, value])
  @@index([cardId])
  @@index([value])
}
```

**Option B: JSON Strings** (Simpler, but harder to query)

```prisma
// In Card model:
keywords        Json?  // Stored as JSON array: ["Rush", "Evasive"]
classifications Json?  // Stored as JSON array: ["Storyborn", "Villain"]
illustrators    Json?  // Stored as JSON array: ["Artist Name"]
```

**Recommendation**: Use **Option A (Junction Tables)** for:

- `keywords` (you filter by these)
- `classifications` (you filter by these)
- Use **Option B (JSON)** for:
- `illustrators` (rarely filtered, just displayed)

#### 5. Type Field Decision

**Current State**: JSON has `type: string[]`, but Prisma schema has single `Type` enum.

**Decision Needed**:

- Are cards ever multi-type? (e.g., "Character" + "Hero")
- If yes → Create `CardType` junction table
- If no → Keep single `Type` enum, take first from array during import

**Recommendation**: Create `CardType` junction table for flexibility (similar to Ink)

---

## Phase 2: SQLite Migration Steps

### Step 1: Update Schema File

1. Change datasource:

   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

2. Remove Ink enum, add Ink model + CardInk junction table
3. Convert array fields to junction tables or JSON
4. Update Card model relationships

### Step 2: Data Migration Strategy

**Option A: Fresh Migration** (Recommended if data loss is acceptable)

1. Export current data to JSON backup
2. Create new SQLite database
3. Run seed script with new schema

**Option B: Data Transfer** (Keep existing data)

1. Export PostgreSQL data to JSON/CSV
2. Create new SQLite database with new schema
3. Write migration script to transform and import data:
   - Convert `ink1`/`ink2` → `CardInk` records
   - Convert `keywords` array → `CardKeyword` records
   - Convert `classifications` array → `CardClassification` records

### Step 3: Migration Script Location

Create: `prisma/migrations/postgres-to-sqlite.ts`

This script will:

1. Connect to PostgreSQL
2. Read all cards, sets, franchises, roles
3. Transform data:
   - Split ink fields into CardInk records
   - Split array fields into junction table records
4. Write to SQLite database

### Step 4: Update Environment

- Remove PostgreSQL `DATABASE_URL` (or keep for reference)
- SQLite file path: `prisma/dev.db` (already in schema)

### Step 5: Update Code Dependencies

No code changes needed! Prisma Client handles database abstraction.

**But**: Need to update queries that access `ink1`/`ink2` to use `CardsInk` relation.

---

## Phase 3: Data Import Workflow

### Current Workflow Issues

- Manual seed script updates required
- No way to import single sets
- No validation or error handling
- No rollback capability

### Proposed Workflow Structure

```
prisma/
├── schema.prisma
├── seed.ts                    # Main seed (calls importers)
├── importers/
│   ├── index.ts              # Export all importers
│   ├── import-set.ts         # Import single set from JSON
│   ├── import-card.ts        # Import single card
│   ├── import-franchise.ts   # Import franchise
│   └── import-role.ts        # Import role
├── seeders/
│   ├── set.seeder.ts         # Creates/updates Set records
│   ├── card.seeder.ts        # Creates/updates Card records (with relations)
│   ├── franchise.seeder.ts   # Creates/updates Franchise records
│   └── role.seeder.ts        # Creates/updates Role records
└── utils/
    ├── data-validator.ts     # Validates JSON data structure
    └── transform-data.ts     # Transforms JSON → Prisma format
```

### New Import Functions

#### 1. `importSet(setData: SET, cards: CARD[])`

**Location**: `prisma/importers/import-set.ts`

**Purpose**: Import a complete set with all its cards

**Features**:

- Validates set data structure
- Creates/updates Set record
- Imports all cards with relationships
- Transaction-based (rollback on error)
- Progress reporting
- Returns summary (created/updated/counts)

**Usage**:

```typescript
import { importSet } from "~/prisma/importers/import-set";
import { Sets } from "~/data/sets";
import { set11Cards } from "~/data/set11";

await importSet(Sets[10], set11Cards); // Import set 11
```

#### 2. `importCard(cardData: CARD, setId: number)`

**Location**: `prisma/importers/import-card.ts`

**Purpose**: Import a single card

**Features**:

- Validates card data
- Creates/updates Card record
- Creates CardInk relationships
- Creates CardKeyword relationships
- Creates CardClassification relationships
- Handles franchise/role lookups

#### 3. `importFranchise(name: string)`

**Location**: `prisma/importers/import-franchise.ts`

**Purpose**: Create/update franchise

**Usage**:

```typescript
const franchise = await importFranchise("The Little Mermaid");
```

#### 4. `importRole(name: string)`

**Location**: `prisma/importers/import-role.ts`

**Purpose**: Create/update role

**Usage**:

```typescript
const role = await importRole("Hero");
```

### CLI Scripts for Package.json

```json
{
  "scripts": {
    "db:import:set": "tsx prisma/scripts/import-set-cli.ts",
    "db:import:card": "tsx prisma/scripts/import-card-cli.ts",
    "db:import:franchise": "tsx prisma/scripts/import-franchise-cli.ts",
    "db:import:role": "tsx prisma/scripts/import-role-cli.ts",
    "db:validate": "tsx prisma/scripts/validate-data.ts"
  }
}
```

**Usage Examples**:

```bash
# Import set 11 from JSON file
npm run db:import:set -- data/set11.json 11

# Import single card
npm run db:import:card -- data/card.json 11

# Add new franchise
npm run db:import:franchise -- "Princess and the Frog"

# Add new role
npm run db:import:role -- "Princess"
```

### Data Validation

**Location**: `prisma/utils/data-validator.ts`

**Purpose**: Validate JSON data before import

**Validations**:

- Required fields present
- Field types correct
- Enum values valid
- Relationships resolvable (set exists, franchise/role exist or will be created)
- Unique constraints (card number per set)

**Usage**:

```typescript
import { validateCard, validateSet } from "~/prisma/utils/data-validator";

const errors = validateCard(cardData);
if (errors.length > 0) {
  throw new Error(`Validation failed: ${errors.join(", ")}`);
}
```

---

## Phase 4: Implementation Checklist

### Pre-Migration

- [ ] **Backup current PostgreSQL database**

  ```bash
  pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
  ```

- [ ] **Document current data counts**
  - Total cards: ~10,000+
  - Total sets: 10
  - Total franchises: ?
  - Total roles: ?

### Schema Refactoring

- [ ] Create Ink model
- [ ] Create CardInk junction table
- [ ] Remove ink1/ink2 from Card model
- [ ] Create CardKeyword junction table
- [ ] Create CardClassification junction table
- [ ] Decide on illustrators (JSON vs junction)
- [ ] Decide on Type field (single vs multi)
- [ ] Update all indexes
- [ ] Update Card model relationships

### Migration Scripts

- [ ] Write PostgreSQL → SQLite migration script
- [ ] Test migration on sample data
- [ ] Verify data integrity after migration
- [ ] Performance test queries

### Import System

- [ ] Create `importSet()` function
- [ ] Create `importCard()` function
- [ ] Create `importFranchise()` function
- [ ] Create `importRole()` function
- [ ] Create data validator
- [ ] Create CLI scripts
- [ ] Add npm scripts
- [ ] Write unit tests for importers

### Code Updates

- [ ] Update queries that use `ink1`/`ink2` to use `CardsInk` relation
- [ ] Update `useCards.ts` filtering logic for new schema
- [ ] Update API endpoints if needed
- [ ] Update any TypeScript types

### Testing

- [ ] Test import of existing sets (1-10)
- [ ] Test import of new set (11)
- [ ] Test filtering queries
- [ ] Test relationships (Card → Inks, Keywords, etc.)
- [ ] Performance comparison (PostgreSQL vs SQLite)

### Documentation

- [ ] Update README with new workflow
- [ ] Document import commands
- [ ] Document schema changes
- [ ] Create troubleshooting guide

---

## Phase 5: Rollout Strategy

### Development Environment

1. **Create feature branch**: `feature/sqlite-migration`
2. **Update schema**: New SQLite schema with Ink table
3. **Write migration script**: Export from PostgreSQL, import to SQLite
4. **Test locally**: Verify all queries work
5. **Update seed script**: Use new importers

### Migration Process

1. **Backup**: Export PostgreSQL data
2. **Run migration script**: PostgreSQL → SQLite
3. **Verify**: Spot check records, run validation
4. **Update code**: Remove PostgreSQL references
5. **Test**: Run full test suite
6. **Deploy**: Update production database

### Rollback Plan

If issues arise:

1. Keep PostgreSQL connection string in `.env.backup`
2. Can switch back by changing `schema.prisma` datasource
3. Re-run migrations on PostgreSQL if needed

---

## Phase 6: Future Data Management

### Adding New Sets

**Process**:

1. Get JSON data for new set
2. Save to `data/set11.json` (or `set11.ts`)
3. Run: `npm run db:import:set -- data/set11.json 11`
4. Verify in Prisma Studio: `npm run dbStudio`

**Automation** (Future):

- Watch for new JSON files in `/data`
- Auto-import on file change (development only)

### Adding New Cards

**Process**:

1. Get card JSON
2. Run: `npm run db:import:card -- data/card.json 11`
3. Card automatically linked to set, inks, keywords, etc.

### Adding Franchises/Roles

**Process**:

1. Run: `npm run db:import:franchise -- "New Franchise"`
2. Future cards can reference this franchise

### Data Updates

**Process**:

- Import functions use `upsert` (create or update)
- Re-running import updates existing records
- Safe to re-import same data

---

## Questions to Answer

1. **Type Field**: Are cards ever multi-type? (affects schema design)
2. **Illustrators**: Do we need to filter/search by illustrator? (affects junction vs JSON)
3. **Backup Strategy**: How often to backup SQLite file?
4. **Production Database**: Use SQLite or PostgreSQL in production?
5. **Concurrent Access**: SQLite handles single-writer. Is this acceptable?
6. **Migration Timing**: When is good time to do this? (dev vs production)

---

## Estimated Timeline

- **Schema Design**: 2-4 hours
- **Migration Script**: 4-8 hours
- **Import System**: 6-10 hours
- **Testing & Validation**: 4-6 hours
- **Code Updates**: 2-4 hours
- **Documentation**: 2-3 hours

**Total**: ~20-35 hours

---

## Risks & Considerations

### SQLite Limitations

1. **Concurrent Writes**: Single writer at a time
   - **Mitigation**: Your app appears read-heavy, writes only during imports

2. **No Native Arrays**: Need junction tables or JSON
   - **Mitigation**: Junction tables better for querying (already planned)

3. **File-based**: Database is a single file
   - **Backup**: Copy `.db` file
   - **Deployment**: Include in repo or separate backup strategy

4. **Size Limits**: SQLite handles up to ~140TB, you're fine

### Migration Risks

1. **Data Loss**: During migration
   - **Mitigation**: Full backup before migration, test on copy first

2. **Breaking Changes**: Queries need updates
   - **Mitigation**: Update all queries in one PR, thorough testing

3. **Performance Regression**: SQLite might be slower for complex queries
   - **Mitigation**: Benchmark before/after, optimize indexes

---

## Success Criteria

✅ All existing data migrated successfully  
✅ All queries work with new schema  
✅ Import system allows easy addition of new data  
✅ Performance equal or better than PostgreSQL  
✅ Zero data loss  
✅ Rollback plan tested and documented
