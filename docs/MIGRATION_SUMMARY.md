# SQLite Migration Summary

## Quick Answers to Your Questions

### ✅ Can you convert to SQLite?

**Yes!** Your project already has `better-sqlite3` installed. The migration is straightforward:

1. Change `datasource` in `schema.prisma` from `postgresql` to `sqlite`
2. Create migration
3. Re-seed data
4. Update queries if needed (mainly for Ink relationship changes)

### ✅ Does SQLite improve performance?

**It depends**, but generally **YES** for your use case:

**Current Problem** (Bigger than database choice):

- You're loading ALL 10k+ cards client-side
- Filtering happens in JavaScript (`useCards.ts`)
- This is slow regardless of database

**SQLite Benefits**:

- ✅ Faster for simple reads (no network latency)
- ✅ Lower memory footprint
- ✅ Single file (easier backups)
- ✅ Good enough for read-heavy workloads

**But the REAL performance win** comes from:

- Moving filtering to database level (SQLite or PostgreSQL)
- Only loading cards that match filters
- Adding pagination

### ✅ Ink Table Instead of Enum

**Great idea!** This solves the dual-ink limitation and makes queries cleaner.

**Current**: `ink1: Ink, ink2: Ink?` (max 2 inks, awkward queries)
**Proposed**: `CardsInk` junction table (unlimited inks, clean queries)

See `SCHEMA_COMPARISON.md` for visual comparison.

### ✅ Adding New Cards, Sets, Roles

**Planned!** The migration includes a complete import workflow:

**New Workflow**:

```bash
# Add new set
npm run db:import:set -- data/set11.json 11

# Add single card
npm run db:import:card -- data/card.json 11

# Add franchise
npm run db:import:franchise -- "Princess and the Frog"

# Add role
npm run db:import:role -- "Princess"
```

All importers will:

- Validate data
- Handle relationships (inks, keywords, etc.)
- Use transactions (rollback on error)
- Support upserts (create or update)

See `SQLITE_MIGRATION_PLAN.md` for full details.

---

## What You Need to Decide

### 1. Type Field: Single or Multiple?

**Current State**:

- JSON data: `type: string[]` (array)
- Schema: `type: Type` (single enum)

**Question**: Can cards ever have multiple types? (e.g., "Character" + "Hero")

**Recommendation**: Create `CardType` junction table for flexibility (similar to Ink)

### 2. Illustrators: JSON or Junction Table?

**Current**: Array in JSON, not in schema

**Options**:

- **JSON** (simpler): Store as `illustrators: Json?`
- **Junction Table** (if you need to filter): `CardIllustrator` table

**Recommendation**: JSON unless you need to filter/search by illustrator

### 3. Missing Fields

Your JSON has fields not in schema:

- `flavor_text`
- `prices` (usd, usd_foil)
- `legalities` (core)

**Question**: Do you need these in the database?

**Recommendation**: Add `flavorText`, store `prices` and `legalities` as JSON

---

## Migration Plan Overview

### Phase 1: Schema Refactoring ⏱️ ~4-6 hours

- Create Ink table
- Create CardInk junction table
- Create CardKeyword junction table
- Create CardClassification junction table
- Update Card model
- Convert to SQLite datasource

### Phase 2: Data Migration ⏱️ ~4-8 hours

- Write migration script (PostgreSQL → SQLite)
- Transform data (ink1/ink2 → CardInk records)
- Transform arrays → junction tables
- Test and verify

### Phase 3: Import System ⏱️ ~6-10 hours

- Create import functions
- Create CLI scripts
- Add data validation
- Write tests

### Phase 4: Code Updates ⏱️ ~2-4 hours

- Update queries (ink1/ink2 → CardsInk)
- Update filtering logic
- Test all endpoints

### Phase 5: Testing & Documentation ⏱️ ~4-6 hours

- Full test suite
- Performance comparison
- Documentation

**Total Estimated Time**: ~20-35 hours

---

## Key Files Created

1. **`docs/SQLITE_MIGRATION_PLAN.md`** - Complete migration plan
2. **`docs/SCHEMA_COMPARISON.md`** - Visual schema comparison
3. **`docs/PROPOSED_SCHEMA.prisma`** - Reference schema file

---

## Next Steps

1. **Review the plans** in the docs folder
2. **Answer the questions** above (Type field, Illustrators, Missing fields)
3. **Decide on timeline** - when to execute migration
4. **Test on dev branch** - create feature branch, test migration
5. **Implement** - follow the phase-by-phase plan

---

## Important Notes

### SQLite Limitations to Consider

1. **Concurrent Writes**: Only one writer at a time
   - ✅ Fine for your app (read-heavy, writes during imports only)

2. **No Native Arrays**: Must use junction tables or JSON
   - ✅ Already planned in schema refactoring

3. **File-based**: Database is a single `.db` file
   - ✅ Easy to backup (just copy file)
   - ⚠️ Include in backup strategy

### Biggest Performance Win

**NOT** switching databases, but **moving filtering to database level**:

```typescript
// Current (SLOW): Load all, filter client-side
const allCards = await $fetch("/api/cards")  // 10k cards
const filtered = allCards.filter(...)         // Client-side

// Better (FAST): Filter in database
const filtered = await $fetch("/api/cards?ink=amber&type=character")  // ~100 cards
```

This optimization should be done **regardless** of SQLite vs PostgreSQL.

---

## Questions or Concerns?

Review the detailed plans and let me know:

- Any concerns about the migration?
- Answers to the decision questions?
- Timeline preferences?
- Need clarification on any part?

Ready to proceed when you are! 🚀
