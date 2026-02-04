# Agent Execution Plan

**Project:** Gulf Arabic Basics (Yalla Arabic)
**Linear Project:** https://linear.app/jaskaranbedi/project/yalla-arabic
**Execution Model:** Specialist agent waves with parallel execution

---

## Specialist Agents

| Agent | Specialization | Linear Issues |
|-------|----------------|---------------|
| **Frontend Dev 1** | Core architecture, routing, state | JAS-6, JAS-7, JAS-8, JAS-11, JAS-14, JAS-22, JAS-23, JAS-24, JAS-25, JAS-26 |
| **Frontend Dev 2** | UI components, styling, animations | JAS-9, JAS-10, JAS-16, JAS-17, JAS-18, JAS-19, JAS-20, JAS-21 |
| **Content Integrator** | Data files, audio, assets | JAS-12, JAS-13, JAS-15, JAS-27 |
| **System Architect** | Docker, deployment, infrastructure | JAS-28, JAS-29, JAS-30, JAS-36, JAS-37 |
| **QA Engineer** | Testing, accessibility, verification | JAS-31, JAS-32, JAS-38 |
| **Performance Eng** | Optimization, benchmarking | JAS-33 |
| **Code Reviewer** | Quality, architecture compliance | JAS-34, JAS-35 |
| **Coordinator** | Orchestration, agent spawning | JAS-5 |

---

## Token Budget

| Category | Tokens | Issues |
|----------|--------|--------|
| Infrastructure | ~14K | JAS-5 to JAS-11 |
| Content | ~13K | JAS-12 to JAS-15 |
| UI Components | ~21K | JAS-16 to JAS-21 |
| Pages & Routing | ~16.5K | JAS-22 to JAS-25 |
| PWA | ~4K | JAS-26, JAS-27 |
| Docker | ~4.5K | JAS-28 to JAS-30 |
| QA | ~10.5K | JAS-31 to JAS-33 |
| Review | ~5.5K | JAS-34, JAS-35 |
| Deployment | ~6.5K | JAS-36 to JAS-38 |
| **Total** | **~95.5K** | 34 issues |

---

## Execution Waves

### Wave 0: Initialization
**Parallel Capacity:** 1 agent
**Total Tokens:** ~500

```
┌─────────────────────────────────────────┐
│  Coordinator                            │
│  └─ JAS-5: Spawn Agent Team (~500)      │
└─────────────────────────────────────────┘
```

| Issue | Agent | Tokens | Dependencies |
|-------|-------|--------|--------------|
| JAS-5 | Coordinator | ~500 | None |

**Output:** 8 agents spawned and ready

---

### Wave 1: Project Bootstrap
**Parallel Capacity:** 1 agent
**Total Tokens:** ~1.5K

```
┌─────────────────────────────────────────┐
│  Frontend Dev 1                         │
│  └─ JAS-6: Create Next.js Project       │
└─────────────────────────────────────────┘
```

| Issue | Agent | Tokens | Dependencies |
|-------|-------|--------|--------------|
| JAS-6 | Frontend Dev 1 | ~1.5K | JAS-5 |

**Output:** Next.js 14 project with folder structure

---

### Wave 2: Core Infrastructure
**Parallel Capacity:** 2 agents
**Total Tokens:** ~12K

```
┌─────────────────────────────────────────┐
│  Frontend Dev 1          Frontend Dev 2 │
│  ├─ JAS-7: Types         ├─ JAS-9: Tailwind │
│  ├─ JAS-8: Stores        └─ JAS-10: Animations │
│  └─ JAS-11: Audio Hook                  │
└─────────────────────────────────────────┘
```

| Issue | Agent | Tokens | Dependencies | Parallel Group |
|-------|-------|--------|--------------|----------------|
| JAS-7 | Frontend Dev 1 | ~1.5K | JAS-6 | A |
| JAS-9 | Frontend Dev 2 | ~3K | JAS-6 | A |
| JAS-8 | Frontend Dev 1 | ~3K | JAS-7 | B |
| JAS-10 | Frontend Dev 2 | ~2.5K | JAS-9 | B |
| JAS-11 | Frontend Dev 1 | ~3K | JAS-7 | B |

**Execution Order:**
1. Group A: JAS-7 ∥ JAS-9 (~4.5K parallel)
2. Group B: JAS-8 ∥ JAS-10 ∥ JAS-11 (~8.5K parallel)

---

### Wave 3: Content + UI Foundation
**Parallel Capacity:** 2 agents
**Total Tokens:** ~21K

```
┌─────────────────────────────────────────┐
│  Content Integrator      Frontend Dev 2 │
│  ├─ JAS-12: Scenarios    ├─ JAS-16: Base UI │
│  ├─ JAS-13: Dialogues    ├─ JAS-17: AudioButton │
│  └─ JAS-15: Audio Files  ├─ JAS-18: PhraseCard │
│                          ├─ JAS-19: ScenarioCard │
│  Frontend Dev 1          ├─ JAS-20: DialogueStep │
│  └─ JAS-14: useScenario  └─ JAS-21: Completion │
└─────────────────────────────────────────┘
```

| Issue | Agent | Tokens | Dependencies | Parallel Group |
|-------|-------|--------|--------------|----------------|
| JAS-12 | Content Integrator | ~8K | JAS-7 | A |
| JAS-16 | Frontend Dev 2 | ~7K | JAS-9, JAS-10 | A |
| JAS-13 | Content Integrator | ~4K | JAS-12 | B |
| JAS-17 | Frontend Dev 2 | ~3K | JAS-11, JAS-16 | B |
| JAS-14 | Frontend Dev 1 | ~1.5K | JAS-12 | B |
| JAS-15 | Content Integrator | ~500 | JAS-12 | B |
| JAS-18 | Frontend Dev 2 | ~2.5K | JAS-16, JAS-17 | C |
| JAS-19 | Frontend Dev 2 | ~2K | JAS-16 | C |
| JAS-20 | Frontend Dev 2 | ~3K | JAS-16, JAS-17, JAS-18 | D |
| JAS-21 | Frontend Dev 2 | ~1.5K | JAS-16 | C |

**Execution Order:**
1. Group A: JAS-12 ∥ JAS-16 (~15K parallel)
2. Group B: JAS-13 ∥ JAS-14 ∥ JAS-15 ∥ JAS-17 (~9K parallel)
3. Group C: JAS-18 ∥ JAS-19 ∥ JAS-21 (~6K parallel)
4. Group D: JAS-20 (~3K)

---

### Wave 4: Pages & Routing
**Parallel Capacity:** 1 agent (sequential dependencies)
**Total Tokens:** ~16.5K

```
┌─────────────────────────────────────────┐
│  Frontend Dev 1                         │
│  ├─ JAS-22: Root Layout (~3K)           │
│  ├─ JAS-23: Home Page (~3.5K)           │
│  ├─ JAS-24: Learn Page (~6K)            │
│  └─ JAS-25: Practice Page (~7K)         │
└─────────────────────────────────────────┘
```

| Issue | Agent | Tokens | Dependencies |
|-------|-------|--------|--------------|
| JAS-22 | Frontend Dev 1 | ~3K | JAS-8, JAS-9, JAS-10 |
| JAS-23 | Frontend Dev 1 | ~3.5K | JAS-8, JAS-12, JAS-19 |
| JAS-24 | Frontend Dev 1 | ~6K | JAS-8, JAS-16, JAS-18 |
| JAS-25 | Frontend Dev 1 | ~7K | JAS-8, JAS-20, JAS-21 |

**Note:** JAS-22 can run parallel with JAS-23/24/25 if dependencies met. Recommend sequential for coherent routing architecture.

---

### Wave 5: PWA + Docker
**Parallel Capacity:** 2 agents
**Total Tokens:** ~8.5K

```
┌─────────────────────────────────────────┐
│  Frontend Dev 1          System Architect │
│  └─ JAS-26: PWA Setup    ├─ JAS-28: Dockerfile │
│                          ├─ JAS-29: Compose │
│  Content Integrator      └─ JAS-30: Scripts │
│  └─ JAS-27: PWA Icons                   │
└─────────────────────────────────────────┘
```

| Issue | Agent | Tokens | Dependencies | Parallel Group |
|-------|-------|--------|--------------|----------------|
| JAS-26 | Frontend Dev 1 | ~3K | JAS-23 | A |
| JAS-28 | System Architect | ~2.5K | JAS-26 | B |
| JAS-27 | Content Integrator | ~1K | JAS-26 | B |
| JAS-29 | System Architect | ~1.5K | JAS-28 | C |
| JAS-30 | System Architect | ~500 | JAS-29 | C |

**Execution Order:**
1. Group A: JAS-26 (~3K)
2. Group B: JAS-27 ∥ JAS-28 (~3.5K parallel)
3. Group C: JAS-29 → JAS-30 (~2K sequential)

---

### Wave 6: Quality Assurance
**Parallel Capacity:** 3 agents
**Total Tokens:** ~10.5K

```
┌─────────────────────────────────────────┐
│  QA Engineer       Performance Eng      │
│  ├─ JAS-31: Testing  └─ JAS-33: Perf    │
│  └─ JAS-32: A11y                        │
└─────────────────────────────────────────┘
```

| Issue | Agent | Tokens | Dependencies | Parallel Group |
|-------|-------|--------|--------------|----------------|
| JAS-31 | QA Engineer | ~5K | JAS-25, JAS-26 | A |
| JAS-32 | QA Engineer | ~2.5K | JAS-31 | B |
| JAS-33 | Performance Eng | ~2.5K | JAS-31 | B |

**Execution Order:**
1. Group A: JAS-31 (~5K)
2. Group B: JAS-32 ∥ JAS-33 (~5K parallel)

---

### Wave 7: Code Review
**Parallel Capacity:** 1 agent
**Total Tokens:** ~5.5K

```
┌─────────────────────────────────────────┐
│  Code Reviewer                          │
│  ├─ JAS-34: Architecture Review (~3K)   │
│  └─ JAS-35: Code Quality Review (~2.5K) │
└─────────────────────────────────────────┘
```

| Issue | Agent | Tokens | Dependencies |
|-------|-------|--------|--------------|
| JAS-34 | Code Reviewer | ~3K | JAS-31 |
| JAS-35 | Code Reviewer | ~2.5K | JAS-34 |

---

### Wave 8: Deployment
**Parallel Capacity:** 2 agents
**Total Tokens:** ~6.5K

```
┌─────────────────────────────────────────┐
│  System Architect        QA Engineer    │
│  ├─ JAS-36: Docker Test  └─ JAS-38: Prod Test │
│  └─ JAS-37: Vercel Deploy               │
└─────────────────────────────────────────┘
```

| Issue | Agent | Tokens | Dependencies |
|-------|-------|--------|--------------|
| JAS-36 | System Architect | ~2K | JAS-33, JAS-35 |
| JAS-37 | System Architect | ~2.5K | JAS-36 |
| JAS-38 | QA Engineer | ~1.5K | JAS-37 |

---

## Execution Summary

```
Wave 0 ─────► Wave 1 ─────► Wave 2 ─────► Wave 3 ─────► Wave 4
 ~500        ~1.5K         ~12K          ~21K         ~16.5K
  │            │             │             │             │
  ▼            ▼             ▼             ▼             ▼
┌────┐      ┌────┐      ┌────────┐    ┌────────┐    ┌────────┐
│ 1  │      │ 1  │      │ 2 ∥    │    │ 3 ∥    │    │ 1      │
└────┘      └────┘      └────────┘    └────────┘    └────────┘

Wave 5 ─────► Wave 6 ─────► Wave 7 ─────► Wave 8
 ~8.5K        ~10.5K        ~5.5K         ~6.5K
   │             │             │             │
   ▼             ▼             ▼             ▼
┌────────┐   ┌────────┐    ┌────┐      ┌────────┐
│ 2 ∥    │   │ 3 ∥    │    │ 1  │      │ 2 seq  │
└────────┘   └────────┘    └────┘      └────────┘
```

| Wave | Tokens | Max Parallel | Primary Agents |
|------|--------|--------------|----------------|
| 0 | ~500 | 1 | Coordinator |
| 1 | ~1.5K | 1 | Frontend Dev 1 |
| 2 | ~12K | 2 | Frontend Dev 1, Frontend Dev 2 |
| 3 | ~21K | 3 | Content Integrator, Frontend Dev 1 & 2 |
| 4 | ~16.5K | 1 | Frontend Dev 1 |
| 5 | ~8.5K | 2 | Frontend Dev 1, System Architect, Content |
| 6 | ~10.5K | 2 | QA Engineer, Performance Eng |
| 7 | ~5.5K | 1 | Code Reviewer |
| 8 | ~6.5K | 2 | System Architect, QA Engineer |
| **Total** | **~82K** | **3 max** | **8 agents** |

---

## Claude-Flow Commands

### Initialize Swarm
```bash
claude-flow swarm init --topology hierarchical --max-agents 8 --strategy specialized
```

### Wave Execution Pattern
```bash
# Wave N execution
claude-flow wave start --wave N --parallel

# Monitor progress
claude-flow wave status --wave N

# Proceed to next wave
claude-flow wave complete --wave N
```

### Agent Assignment
```bash
# Assign issue to agent
claude-flow task assign JAS-XX --agent "Agent Name"

# Execute with token budget
claude-flow task execute JAS-XX --max-tokens 10000
```

---

## Linear Integration

### Update Issue Status
```bash
# Mark in progress
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts status "In Progress" JAS-XX

# Mark complete
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts status Done JAS-XX

# Bulk update for wave completion
npx tsx ~/.claude/skills/linear/scripts/linear-ops.ts status Done JAS-5 JAS-6 JAS-7
```

### Wave Completion Checklist
- [ ] All issues in wave marked Done
- [ ] No blockers for next wave
- [ ] Code committed and pushed
- [ ] Dependencies verified

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Token overflow | Each issue sized <10K, largest is JAS-12 at ~8K |
| Dependency deadlock | Waves designed with clear sequential gates |
| Agent bottleneck | Frontend Dev 2 has most UI work; can parallelize within wave |
| Content delay | Audio placeholders allow UI development to proceed |

---

## Success Criteria

- [ ] All 34 issues completed (JAS-5 to JAS-38)
- [ ] Total tokens consumed: ~82K-102K
- [ ] App deployed to Vercel
- [ ] PWA installable on mobile
- [ ] All 60 phrases accessible
- [ ] Offline mode functional
