#!/usr/bin/env npx tsx
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://api.linear.app/graphql", {
  headers: { Authorization: process.env.LINEAR_API_KEY! },
});

const PROJECT_ID = "34935539-fb15-4114-97b1-db5b64c7a6ea";
const TEAM_ID = "06c08cd1-e05c-4c21-a4a0-e6a69051edef";
const BACKLOG_STATE = "62838cb4-3960-4460-a732-1d5e17ee5ce4";

const issues = [
  // Phase 0
  { title: "0.1: Spawn Agent Team", estimate: 1, labels: ["chore"], desc: "**Phase 0** | XS (~500 tokens) | Agent: Project Lead\n\nSpawn claude-flow agent team (8 agents): Project Lead, System Architect, Frontend Dev 1 & 2, Content Integrator, QA Engineer, Code Reviewer, Performance Eng" },
  { title: "0.2: Create Next.js Project", estimate: 2, labels: ["feature", "frontend"], desc: "**Phase 0** | S (~1.5K tokens) | Agent: Frontend Dev 1\n\nInitialize Next.js 14 with App Router, TypeScript, Tailwind, ESLint. Install zustand, next-pwa. Create folder structure per architecture.md" },
  // Phase 1
  { title: "1.1: TypeScript Types", estimate: 2, labels: ["feature", "frontend"], desc: "**Phase 1** | S (~1.5K tokens) | Agent: Frontend Dev 1 | Deps: 0.2\n\nCreate src/types/index.ts with interfaces: Phrase, DialogueStep, Scenario, UserProgress, UserSettings" },
  { title: "1.2: Zustand Stores", estimate: 3, labels: ["feature", "frontend"], desc: "**Phase 1** | M (~3K tokens) | Agent: Frontend Dev 1 | Deps: 1.1\n\nCreate useProgressStore and useSettingsStore with localStorage persistence" },
  { title: "1.3: Tailwind Configuration", estimate: 3, labels: ["feature", "frontend"], desc: "**Phase 1** | M (~3K tokens) | Agent: Frontend Dev 2 | Deps: 0.2\n\nAdd design tokens: warm sand/terracotta palette, Nunito + Noto Sans Arabic fonts, custom transitions" },
  { title: "1.4: Global Styles & Animations", estimate: 3, labels: ["feature", "frontend"], desc: "**Phase 1** | M (~2.5K tokens) | Agent: Frontend Dev 2 | Deps: 1.3\n\nCSS animations: fade-in, card-reveal, pulse-gentle, progress-fill" },
  { title: "1.5: Audio Hook", estimate: 3, labels: ["feature", "frontend"], desc: "**Phase 1** | M (~3K tokens) | Agent: Frontend Dev 1 | Deps: 1.1\n\nCreate useAudio.ts with isPlaying, isLoading, error states and play/stop methods" },
  // Phase 2
  { title: "2.1: Scenario Data Structure", estimate: 5, labels: ["feature", "content"], desc: "**Phase 2** | L (~8K tokens) | Agent: Content Integrator | Deps: 1.1\n\nCreate scenarios.ts with 60 phrases across 4 scenarios: Greetings (15), Workplace (15), Coffee Shop (10), Common (20)" },
  { title: "2.2: Dialogue Flows", estimate: 3, labels: ["feature", "content"], desc: "**Phase 2** | M (~4K tokens) | Agent: Content Integrator | Deps: 2.1\n\nAdd 5-8 DialogueSteps per scenario with realistic conversation flows" },
  { title: "2.3: useScenario Hook", estimate: 2, labels: ["feature", "frontend"], desc: "**Phase 2** | S (~1.5K tokens) | Agent: Frontend Dev 1 | Deps: 2.1\n\nCreate useScenario.ts: getScenarios, getScenarioById, getPhraseById, getDialogueSteps" },
  { title: "2.4: Audio Placeholder Files", estimate: 1, labels: ["chore", "content"], desc: "**Phase 2** | XS (~500 tokens) | Agent: Content Integrator | Deps: 2.1\n\nCreate 60 placeholder MP3s or manifest.json in public/audio/" },
  // Phase 3
  { title: "3.1: Base UI Components", estimate: 5, labels: ["feature", "frontend"], desc: "**Phase 3** | L (~7K tokens) | Agent: Frontend Dev 2 | Deps: 1.3, 1.4\n\nCreate Button, Card, ProgressDots, ThemeToggle in src/components/ui/" },
  { title: "3.2: AudioButton Component", estimate: 3, labels: ["feature", "frontend"], desc: "**Phase 3** | M (~3K tokens) | Agent: Frontend Dev 2 | Deps: 1.5, 3.1\n\nCreate AudioButton with idle/loading/playing/error states, pulse animation, 48px tap target" },
  { title: "3.3: PhraseCard Component", estimate: 3, labels: ["feature", "frontend"], desc: "**Phase 3** | M (~2.5K tokens) | Agent: Frontend Dev 2 | Deps: 3.1, 3.2\n\nDisplay transliteration (large), Arabic (small), meaning, and AudioButton" },
  { title: "3.4: ScenarioCard Component", estimate: 2, labels: ["feature", "frontend"], desc: "**Phase 3** | S (~2K tokens) | Agent: Frontend Dev 2 | Deps: 3.1\n\nShow icon, title, description, completion checkmark, hover animation" },
  { title: "3.5: DialogueStep Component", estimate: 3, labels: ["feature", "frontend"], desc: "**Phase 3** | M (~3K tokens) | Agent: Frontend Dev 2 | Deps: 3.1, 3.2, 3.3\n\nTap-to-reveal with user (right) vs local (left) alignment" },
  { title: "3.6: CompletionScreen Component", estimate: 2, labels: ["feature", "frontend"], desc: "**Phase 3** | S (~1.5K tokens) | Agent: Frontend Dev 2 | Deps: 3.1\n\nSuccess icon, completion message, phrase count, Continue button" },
  // Phase 4
  { title: "4.1: Root Layout", estimate: 3, labels: ["feature", "frontend"], desc: "**Phase 4** | M (~3K tokens) | Agent: Frontend Dev 1 | Deps: 1.2, 1.3, 1.4\n\nImport fonts, theme detection, metadata" },
  { title: "4.2: Home Page", estimate: 3, labels: ["feature", "frontend"], desc: "**Phase 4** | M (~3.5K tokens) | Agent: Frontend Dev 1 | Deps: 1.2, 2.1, 3.4\n\nHeader with ThemeToggle, 4 ScenarioCards with completion status" },
  { title: "4.3: Learn Page", estimate: 5, labels: ["feature", "frontend"], desc: "**Phase 4** | L (~6K tokens) | Agent: Frontend Dev 1 | Deps: 1.2, 3.1, 3.3\n\nPhraseCard navigation with ProgressDots, continue to practice" },
  { title: "4.4: Practice Page", estimate: 5, labels: ["feature", "frontend"], desc: "**Phase 4** | L (~7K tokens) | Agent: Frontend Dev 1 | Deps: 1.2, 3.5, 3.6\n\nDialogueStep tap-to-reveal, CompletionScreen, mark complete in store" },
  // Phase 5
  { title: "5.1: PWA Setup", estimate: 3, labels: ["feature", "frontend"], desc: "**Phase 5** | M (~3K tokens) | Agent: Frontend Dev 1 | Deps: 4.2\n\nConfigure next-pwa, manifest.json, service worker, static export" },
  { title: "5.2: PWA Icons", estimate: 1, labels: ["chore", "content"], desc: "**Phase 5** | S (~1K tokens) | Agent: Content Integrator | Deps: 5.1\n\nCreate icon-192.png and icon-512.png with terracotta branding" },
  // Phase 6
  { title: "6.1: Dockerfile", estimate: 3, labels: ["feature", "devops"], desc: "**Phase 6** | M (~2.5K tokens) | Agent: System Architect | Deps: 5.1\n\nMulti-stage build: deps, builder, runner with node:20-alpine" },
  { title: "6.2: Docker Compose", estimate: 2, labels: ["feature", "devops"], desc: "**Phase 6** | S (~1.5K tokens) | Agent: System Architect | Deps: 6.1\n\nProduction and dev profiles, audio volume mount" },
  { title: "6.3: Docker Scripts", estimate: 1, labels: ["chore", "devops"], desc: "**Phase 6** | XS (~500 tokens) | Agent: System Architect | Deps: 6.2\n\nAdd npm scripts and .dockerignore" },
  // Phase 7
  { title: "7.1: Manual Testing Checklist", estimate: 5, labels: ["chore", "qa"], desc: "**Phase 7** | L (~5K tokens) | Agent: QA Engineer | Deps: 4.4, 5.1\n\nTest first-time/returning user, theme, PWA, edge cases" },
  { title: "7.2: Accessibility Check", estimate: 3, labels: ["chore", "qa"], desc: "**Phase 7** | M (~2.5K tokens) | Agent: QA Engineer | Deps: 7.1\n\nWCAG AA contrast, 44px targets, screen reader, RTL Arabic" },
  { title: "7.3: Performance Validation", estimate: 3, labels: ["chore", "qa"], desc: "**Phase 7** | M (~2.5K tokens) | Agent: Performance Eng | Deps: 7.1\n\nLighthouse: FCP <1.5s, TTI <2s, score >90, bundle <100kb" },
  // Phase 8
  { title: "8.1: Architecture Review", estimate: 3, labels: ["chore", "qa"], desc: "**Phase 8** | M (~3K tokens) | Agent: Code Reviewer | Deps: 7.1\n\nVerify folder structure, naming, interfaces, no backend code" },
  { title: "8.2: Code Quality Review", estimate: 3, labels: ["chore", "qa"], desc: "**Phase 8** | M (~2.5K tokens) | Agent: Code Reviewer | Deps: 8.1\n\nNo TS errors, ESLint passes, no console.log, proper typing" },
  // Phase 9
  { title: "9.1: Local Docker Verification", estimate: 3, labels: ["chore", "devops"], desc: "**Phase 9** | M (~2K tokens) | Agent: System Architect | Deps: 7.3, 8.2\n\nBuild and test container, verify all flows" },
  { title: "9.2: Vercel Deployment", estimate: 3, labels: ["feature", "devops"], desc: "**Phase 9** | M (~2.5K tokens) | Agent: System Architect | Deps: 9.1\n\nConnect GitHub, configure static export, test production" },
  { title: "9.3: Post-Deployment Verification", estimate: 2, labels: ["chore", "qa"], desc: "**Phase 9** | S (~1.5K tokens) | Agent: QA Engineer | Deps: 9.2\n\nTest production: scenarios, PWA, offline, share with test group" },
];

async function query(q: string, vars?: any) {
  return client.request(q, vars);
}

async function main() {
  console.log("Setting up Yalla Arabic project in Linear...\n");

  // 1. Update project description (255 char limit) and content (longer docs)
  console.log("1. Updating project...");
  await query(`
    mutation($id: String!, $input: ProjectUpdateInput!) {
      projectUpdate(id: $id, input: $input) { success }
    }
  `, {
    id: PROJECT_ID,
    input: {
      description: "Static PWA for learning Gulf Arabic phrases. 60 phrases across 4 scenarios. Next.js 14, TypeScript, Tailwind, Zustand, next-pwa.",
      content: `# Gulf Arabic Basics

**"Yalla, let's learn!"** — A static PWA for learning practical Gulf Arabic phrases for expats in Dubai/UAE.

## Overview
- **60 phrases** across 4 scenarios
- **Static PWA** with Next.js 14 (App Router)
- **Offline support** via service worker
- **No backend** — all content bundled at build time

## Scenarios
1. Greetings & Small Talk (15 phrases)
2. Workplace (15 phrases)
3. Coffee Shop (10 phrases)
4. Common Expressions (20 phrases)

## Tech Stack
Next.js 14 • TypeScript • Tailwind CSS • Zustand • next-pwa

## Resources
- [PRD](docs/product/prd.md)
- [Architecture](docs/architecture/architecture-plan.md)
- [Implementation](docs/execution/implementation-plan.md)
- [GitHub](https://github.com/JBackend/YallaArabic)`,
      state: "planned"
    }
  });
  console.log("   ✓ Project updated\n");

  // 2. Get/create labels
  console.log("2. Setting up labels...");
  const labelRes: any = await query(`query { issueLabels { nodes { id name } } }`);
  const labelMap: Record<string, string> = {};
  for (const l of labelRes.issueLabels.nodes) {
    labelMap[l.name.toLowerCase()] = l.id;
  }

  const newLabels = [
    { name: "frontend", color: "#6366f1" },
    { name: "content", color: "#f59e0b" },
    { name: "devops", color: "#10b981" },
    { name: "qa", color: "#8b5cf6" },
    { name: "chore", color: "#6b7280" },
  ];

  for (const label of newLabels) {
    if (!labelMap[label.name]) {
      try {
        const res: any = await query(`
          mutation($input: IssueLabelCreateInput!) {
            issueLabelCreate(input: $input) { issueLabel { id name } }
          }
        `, { input: { name: label.name, color: label.color, teamId: TEAM_ID } });
        labelMap[label.name] = res.issueLabelCreate.issueLabel.id;
        console.log(`   ✓ Created: ${label.name}`);
      } catch { console.log(`   - ${label.name} exists`); }
    }
  }
  console.log();

  // 3. Create issues
  console.log("3. Creating 34 issues...");
  let count = 0;
  for (const issue of issues) {
    try {
      const labelIds = issue.labels.map(l => labelMap[l] || labelMap[l.toLowerCase()]).filter(Boolean);
      const res: any = await query(`
        mutation($input: IssueCreateInput!) {
          issueCreate(input: $input) { issue { identifier title } }
        }
      `, {
        input: {
          teamId: TEAM_ID,
          projectId: PROJECT_ID,
          stateId: BACKLOG_STATE,
          title: issue.title,
          description: issue.desc,
          estimate: issue.estimate,
          labelIds
        }
      });
      count++;
      console.log(`   ✓ ${res.issueCreate.issue.identifier}: ${issue.title}`);
    } catch (e: any) {
      console.log(`   ✗ ${issue.title}`);
    }
  }
  console.log();

  // 4. Create project update
  console.log("4. Creating project update...");
  try {
    await query(`
      mutation($input: ProjectUpdateCreateInput!) {
        projectUpdateCreate(input: $input) { success }
      }
    `, {
      input: {
        projectId: PROJECT_ID,
        body: `## Project Kickoff 🚀

**Gulf Arabic Basics** has been planned with **34 issues** across 9 phases.

| Metric | Value |
|--------|-------|
| Total Issues | 34 |
| Estimated Tokens | ~102K |
| All issues | <150K tokens each |

### Phases
0. Project Initialization
1. Core Infrastructure
2. Content Integration
3. UI Components
4. Pages & Routing
5. PWA Configuration
6. Docker Configuration
7. Quality Assurance
8. Code Review
9. Deployment

Ready to begin implementation! 🏗️`,
        health: "onTrack"
      }
    });
    console.log("   ✓ Project update created\n");
  } catch (e) {
    console.log("   ✗ Could not create project update\n");
  }

  console.log(`✅ Complete! Created ${count}/34 issues`);
  console.log(`   View: https://linear.app/jaskaranbedi/project/yalla-arabic`);
}

main().catch(console.error);
