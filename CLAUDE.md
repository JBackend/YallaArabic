# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Gulf Arabic Basics** ("Yalla, let's learn!") — A static PWA for learning practical Gulf Arabic phrases. Teaches spoken dialect (not MSA) for expats in Dubai/UAE.

**Architecture:** Static-first PWA with Next.js 14 (App Router), Zustand for client state, no backend. All content bundled at build time, deployed to Vercel.

## Build & Development Commands

```bash
# Development
npm run dev              # Start dev server at localhost:3000

# Build
npm run build            # Build for production (static export to /out)

# Production preview
npm run start            # Serve production build locally

# Linting
npm run lint             # Run ESLint

# Docker (local testing)
npm run docker:build     # Build Docker image
npm run docker:run       # Run containerized app
npm run docker:dev       # Development with Docker
```

## Architecture

### Static-First PWA Pattern
- **No backend** — All data bundled in `src/data/scenarios.ts`
- **No database** — User progress stored in localStorage via Zustand persist
- **Offline support** — Service worker (next-pwa) precaches all assets including audio
- **Static export** — `output: 'export'` generates static HTML to `/out`

### Data Flow
```
scenarios.ts → useScenario hook → Components → UI
                                      ↓
                              useProgressStore → localStorage
```

### Key Entities
- **Scenario**: Learning module (Greetings, Workplace, Coffee Shop, Common Expressions)
- **Phrase**: Arabic script + transliteration + meaning + audio file reference
- **DialogueStep**: Conversation practice step referencing a phrase
- **UserProgress**: Completed scenarios, current position (persisted to localStorage)

### Routes
| Route | Purpose |
|-------|---------|
| `/` | Home — scenario list with completion status |
| `/learn/[scenarioId]` | Phrase learning flow |
| `/practice/[scenarioId]` | Tap-to-reveal conversation practice |

### State Management
Two Zustand stores with localStorage persistence:
- `useProgressStore` — completedScenarios, currentScenario, currentPhraseIndex
- `useSettingsStore` — theme (light/dark/system)

## File Conventions

| Type | Convention |
|------|------------|
| Components | PascalCase (`PhraseCard.tsx`) |
| Hooks | camelCase with `use` prefix (`useAudio.ts`) |
| Pages | lowercase `page.tsx` in App Router folders |
| Audio files | kebab-case matching phrase ID (`shlonak-zain.mp3`) |

## Content Structure

60 phrases across 4 scenarios defined in `src/data/scenarios.ts`:
- Greetings & Small Talk (15 phrases)
- Workplace (15 phrases)
- Coffee Shop (10 phrases)
- Common Expressions (20 phrases)

Audio files live in `public/audio/` with filenames matching phrase IDs.

## Design System

Tailwind config includes custom design tokens:
- **Colors**: Warm sand/terracotta palette (light) and deep brown (dark)
- **Fonts**: Nunito (UI), Noto Sans Arabic (script)
- **Animations**: Subtle fades and scales via CSS transitions

## Claude-Flow Integration

This project uses claude-flow for agent orchestration. See `docs/execution/implementation-plan.md` for the full task breakdown.

### Swarm Configuration
```bash
claude-flow swarm init --topology hierarchical --max-agents 8 --strategy specialized
```

### Key Agents
- `coder` — Implementation
- `architect` — Technical decisions
- `tester` — QA and validation
- `reviewer` — Code quality

### Execution Rules
- Use `run_in_background: true` for parallel agent tasks
- Batch all related operations in single messages
- Never poll status — trust agents to return results

## Environment Security (Varlock)

Sensitive environment variables are managed with Varlock.

### Files
- `.env.schema` — Defines expected variables with validation rules (safe to commit)
- `.env` — Contains actual secrets (NEVER commit)

### Commands
```bash
# Validate configuration (masks sensitive values)
varlock load

# Run commands with secrets injected
varlock run -- <command>
```

### Safe Practices
- **NEVER** run `echo $LINEAR_API_KEY` or `printenv | grep LINEAR`
- **ALWAYS** use `varlock load` to check if keys are set
- Schema uses `@sensitive` annotation to mark secrets

## Linear Integration

Project management via Linear. Use `/linear` skill for issue tracking.

### Quick Commands
```bash
# Check connection
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts whoami

# Create issue in project
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts create-issue "Project Name" "Title" "Description"

# Update issue status (bulk)
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts status Done ENG-123 ENG-124

# Create sub-issue
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts create-sub-issue ENG-100 "Sub-task" "Details"

# Update project status
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts project-status "Project Name" in-progress
```

### Project Status Values
| State | Description |
|-------|-------------|
| `backlog` | Not yet started |
| `planned` | Scheduled for future |
| `in-progress` | Currently active |
| `paused` | Temporarily on hold |
| `completed` | Successfully finished |
| `canceled` | Will not be done |

### Issue Labels
- **Type** (one required): `feature`, `bug`, `refactor`, `chore`, `spike`
- **Domain** (1-2): `security`, `backend`, `frontend`, etc.
- **Scope**: `blocked`, `breaking-change`, `tech-debt`

### Workflow
1. Create project linked to initiative
2. Set project state to `planned`
3. Create issues directly in the project
4. Update to `in-progress` when work begins
5. Mark issues `Done` as completed
6. Set project to `completed` when finished

## Docker Development

All npm/node commands run inside Docker containers to keep the host clean.

### Container Commands
```bash
# Start development container
docker compose --profile dev up -d

# Check container status
docker ps --filter "name=arabic"

# Execute commands in container
docker exec arabic-dev-1 npm install
docker exec arabic-dev-1 npm test
docker exec arabic-dev-1 npm run build
docker exec arabic-dev-1 npm run lint

# Stop container
docker compose --profile dev down
```

### Enforcement Rules
- **BLOCKED on host**: `npm install`, `npx`, `yarn`, `node`, `tsx`
- **REQUIRED**: Use `docker exec <container> <command>` for all Node.js operations
- **Git/file operations**: Run directly on host (volume mount syncs automatically)

### Pre-Flight Check
Before running any npm command, verify container is running:
```bash
docker ps --filter "name=arabic" --format "table {{.Names}}\t{{.Status}}"
```
