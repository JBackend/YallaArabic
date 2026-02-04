import { LinearClient } from "@linear/sdk";

const client = new LinearClient({ apiKey: process.env.LINEAR_API_KEY! });

const PROJECT_ID = "34935539-fb15-4114-97b1-db5b64c7a6ea";
const TEAM_ID = "06c08cd1-e05c-4c21-a4a0-e6a69051edef";
const BACKLOG_STATE_ID = "62838cb4-3960-4460-a732-1d5e17ee5ce4";

// Issue definitions from implementation plan
const issues = [
  // Phase 0
  { title: "0.1: Spawn Agent Team", phase: 0, estimate: 1, labels: ["chore"], desc: `**Phase:** 0 - Project Initialization\n**Complexity:** XS (~500 tokens)\n**Agent:** Project Lead\n\nSpawn the claude-flow agent team:\n- Project Lead (coordinator)\n- System Architect (architect)\n- Frontend Dev 1 & 2 (coder)\n- Content Integrator (coder)\n- QA Engineer (tester)\n- Code Reviewer (reviewer)\n- Performance Eng (optimizer)` },
  { title: "0.2: Create Next.js Project", phase: 0, estimate: 2, labels: ["feature", "frontend"], desc: `**Phase:** 0 - Project Initialization\n**Complexity:** S (~1.5K tokens)\n**Agent:** Frontend Dev 1\n\nInitialize Next.js 14 with App Router:\n- TypeScript, Tailwind, ESLint\n- Install: zustand, next-pwa\n- Create folder structure per architecture.md` },
  // Phase 1
  { title: "1.1: TypeScript Types", phase: 1, estimate: 2, labels: ["feature", "frontend"], desc: `**Phase:** 1 - Core Infrastructure\n**Complexity:** S (~1.5K tokens)\n**Agent:** Frontend Dev 1\n**Deps:** 0.2\n\nCreate src/types/index.ts:\n- Phrase, DialogueStep, Scenario, UserProgress, UserSettings` },
  { title: "1.2: Zustand Stores", phase: 1, estimate: 3, labels: ["feature", "frontend"], desc: `**Phase:** 1 - Core Infrastructure\n**Complexity:** M (~3K tokens)\n**Agent:** Frontend Dev 1\n**Deps:** 1.1\n\nCreate stores with localStorage persist:\n- useProgressStore (completedScenarios, currentScenario)\n- useSettingsStore (theme)` },
  { title: "1.3: Tailwind Configuration", phase: 1, estimate: 3, labels: ["feature", "frontend"], desc: `**Phase:** 1 - Core Infrastructure\n**Complexity:** M (~3K tokens)\n**Agent:** Frontend Dev 2\n**Deps:** 0.2\n\nDesign tokens from PRD:\n- Warm sand/terracotta palette (light/dark)\n- Nunito + Noto Sans Arabic fonts\n- Custom border-radius, transitions` },
  { title: "1.4: Global Styles & Animations", phase: 1, estimate: 3, labels: ["feature", "frontend"], desc: `**Phase:** 1 - Core Infrastructure\n**Complexity:** M (~2.5K tokens)\n**Agent:** Frontend Dev 2\n**Deps:** 1.3\n\nCSS animations:\n- animate-fade-in, animate-card-reveal\n- animate-pulse-gentle, animate-progress-fill` },
  { title: "1.5: Audio Hook", phase: 1, estimate: 3, labels: ["feature", "frontend"], desc: `**Phase:** 1 - Core Infrastructure\n**Complexity:** M (~3K tokens)\n**Agent:** Frontend Dev 1\n**Deps:** 1.1\n\nCreate useAudio.ts:\n- isPlaying, isLoading, error states\n- play(), stop() methods\n- Error handling for missing audio` },
  // Phase 2
  { title: "2.1: Scenario Data Structure", phase: 2, estimate: 5, labels: ["feature", "content"], desc: `**Phase:** 2 - Content Integration\n**Complexity:** L (~8K tokens)\n**Agent:** Content Integrator\n**Deps:** 1.1\n\nCreate scenarios.ts with 60 phrases:\n- Greetings (15), Workplace (15)\n- Coffee Shop (10), Common (20)\n\nEach phrase: id, arabic, transliteration, meaning, audioFile` },
  { title: "2.2: Dialogue Flows", phase: 2, estimate: 3, labels: ["feature", "content"], desc: `**Phase:** 2 - Content Integration\n**Complexity:** M (~4K tokens)\n**Agent:** Content Integrator\n**Deps:** 2.1\n\nAdd dialogue arrays to each scenario:\n- 5-8 DialogueSteps per scenario\n- Realistic conversation flows` },
  { title: "2.3: useScenario Hook", phase: 2, estimate: 2, labels: ["feature", "frontend"], desc: `**Phase:** 2 - Content Integration\n**Complexity:** S (~1.5K tokens)\n**Agent:** Frontend Dev 1\n**Deps:** 2.1\n\nCreate useScenario.ts:\n- getScenarios(), getScenarioById()\n- getPhraseById(), getDialogueSteps()` },
  { title: "2.4: Audio Placeholder Files", phase: 2, estimate: 1, labels: ["chore", "content"], desc: `**Phase:** 2 - Content Integration\n**Complexity:** XS (~500 tokens)\n**Agent:** Content Integrator\n**Deps:** 2.1\n\nCreate placeholders in public/audio/:\n- 60 placeholder MP3s or manifest.json\n- Kebab-case naming matching phrase IDs` },
  // Phase 3
  { title: "3.1: Base UI Components", phase: 3, estimate: 5, labels: ["feature", "frontend"], desc: `**Phase:** 3 - UI Components\n**Complexity:** L (~7K tokens)\n**Agent:** Frontend Dev 2\n**Deps:** 1.3, 1.4\n\nCreate in src/components/ui/:\n- Button (primary/secondary/ghost)\n- Card (sand bg, rounded, shadow)\n- ProgressDots\n- ThemeToggle` },
  { title: "3.2: AudioButton Component", phase: 3, estimate: 3, labels: ["feature", "frontend"], desc: `**Phase:** 3 - UI Components\n**Complexity:** M (~3K tokens)\n**Agent:** Frontend Dev 2\n**Deps:** 1.5, 3.1\n\nCreate AudioButton.tsx:\n- Uses useAudio hook\n- States: idle, loading, playing, error\n- Pulse animation, 48px tap target` },
  { title: "3.3: PhraseCard Component", phase: 3, estimate: 3, labels: ["feature", "frontend"], desc: `**Phase:** 3 - UI Components\n**Complexity:** M (~2.5K tokens)\n**Agent:** Frontend Dev 2\n**Deps:** 3.1, 3.2\n\nCreate PhraseCard.tsx:\n- Transliteration (large), Arabic (small), Meaning\n- AudioButton centered below\n- Fade-in animation` },
  { title: "3.4: ScenarioCard Component", phase: 3, estimate: 2, labels: ["feature", "frontend"], desc: `**Phase:** 3 - UI Components\n**Complexity:** S (~2K tokens)\n**Agent:** Frontend Dev 2\n**Deps:** 3.1\n\nCreate ScenarioCard.tsx:\n- Icon, title, description\n- Completed checkmark state\n- Hover scale animation` },
  { title: "3.5: DialogueStep Component", phase: 3, estimate: 3, labels: ["feature", "frontend"], desc: `**Phase:** 3 - UI Components\n**Complexity:** M (~3K tokens)\n**Agent:** Frontend Dev 2\n**Deps:** 3.1, 3.2, 3.3\n\nCreate DialogueStep.tsx:\n- Hidden/revealed states\n- User (right) vs local (left) alignment\n- Tap to reveal interaction` },
  { title: "3.6: CompletionScreen Component", phase: 3, estimate: 2, labels: ["feature", "frontend"], desc: `**Phase:** 3 - UI Components\n**Complexity:** S (~1.5K tokens)\n**Agent:** Frontend Dev 2\n**Deps:** 3.1\n\nCreate CompletionScreen.tsx:\n- Success icon, completion message\n- Phrase count, Continue button\n- Celebration animation` },
  // Phase 4
  { title: "4.1: Root Layout", phase: 4, estimate: 3, labels: ["feature", "frontend"], desc: `**Phase:** 4 - Pages & Routing\n**Complexity:** M (~3K tokens)\n**Agent:** Frontend Dev 1\n**Deps:** 1.3, 1.4, 1.2\n\nUpdate layout.tsx:\n- Import Nunito + Noto Sans Arabic fonts\n- Theme detection (light/dark/system)\n- Metadata: title, description` },
  { title: "4.2: Home Page", phase: 4, estimate: 3, labels: ["feature", "frontend"], desc: `**Phase:** 4 - Pages & Routing\n**Complexity:** M (~3.5K tokens)\n**Agent:** Frontend Dev 1\n**Deps:** 3.4, 1.2, 2.1\n\nCreate page.tsx:\n- Header: "Yalla, let's learn!" + ThemeToggle\n- 4 ScenarioCards with completion status\n- Navigate to /learn/[scenarioId]` },
  { title: "4.3: Learn Page", phase: 4, estimate: 5, labels: ["feature", "frontend"], desc: `**Phase:** 4 - Pages & Routing\n**Complexity:** L (~6K tokens)\n**Agent:** Frontend Dev 1\n**Deps:** 3.3, 3.1, 1.2\n\nCreate /learn/[scenarioId]/page.tsx:\n- PhraseCard with navigation\n- ProgressDots\n- Continue to practice on last phrase` },
  { title: "4.4: Practice Page", phase: 4, estimate: 5, labels: ["feature", "frontend"], desc: `**Phase:** 4 - Pages & Routing\n**Complexity:** L (~7K tokens)\n**Agent:** Frontend Dev 1\n**Deps:** 3.5, 3.6, 1.2\n\nCreate /practice/[scenarioId]/page.tsx:\n- DialogueStep tap-to-reveal flow\n- CompletionScreen on finish\n- Mark scenario complete in store` },
  // Phase 5
  { title: "5.1: PWA Setup", phase: 5, estimate: 3, labels: ["feature", "frontend"], desc: `**Phase:** 5 - PWA Configuration\n**Complexity:** M (~3K tokens)\n**Agent:** Frontend Dev 1\n**Deps:** 4.2\n\nConfigure next-pwa:\n- Manifest with Gulf Arabic Basics branding\n- Service worker for offline support\n- Static export config` },
  { title: "5.2: PWA Icons", phase: 5, estimate: 1, labels: ["chore", "content"], desc: `**Phase:** 5 - PWA Configuration\n**Complexity:** S (~1K tokens)\n**Agent:** Content Integrator\n**Deps:** 5.1\n\nCreate PWA icons:\n- icon-192.png, icon-512.png\n- Terracotta color, Arabic-inspired design` },
  // Phase 6
  { title: "6.1: Dockerfile", phase: 6, estimate: 3, labels: ["feature", "devops"], desc: `**Phase:** 6 - Docker Configuration\n**Complexity:** M (~2.5K tokens)\n**Agent:** System Architect\n**Deps:** 5.1\n\nMulti-stage Dockerfile:\n- deps, builder, runner stages\n- node:20-alpine base\n- Optimized for static export` },
  { title: "6.2: Docker Compose", phase: 6, estimate: 2, labels: ["feature", "devops"], desc: `**Phase:** 6 - Docker Configuration\n**Complexity:** S (~1.5K tokens)\n**Agent:** System Architect\n**Deps:** 6.1\n\nCreate docker-compose.yml:\n- Production and dev profiles\n- Audio volume mount\n- Hot reload for dev` },
  { title: "6.3: Docker Scripts", phase: 6, estimate: 1, labels: ["chore", "devops"], desc: `**Phase:** 6 - Docker Configuration\n**Complexity:** XS (~500 tokens)\n**Agent:** System Architect\n**Deps:** 6.2\n\nAdd npm scripts:\n- docker:build, docker:run\n- docker:dev, docker:prod\n- Create .dockerignore` },
  // Phase 7
  { title: "7.1: Manual Testing Checklist", phase: 7, estimate: 5, labels: ["chore", "qa"], desc: `**Phase:** 7 - Quality Assurance\n**Complexity:** L (~5K tokens)\n**Agent:** QA Engineer\n**Deps:** 4.4, 5.1\n\nTest all flows:\n- First-time & returning user\n- Light/dark theme\n- PWA installation & offline\n- Edge cases & error states` },
  { title: "7.2: Accessibility Check", phase: 7, estimate: 3, labels: ["chore", "qa"], desc: `**Phase:** 7 - Quality Assurance\n**Complexity:** M (~2.5K tokens)\n**Agent:** QA Engineer\n**Deps:** 7.1\n\nWCAG compliance:\n- Color contrast AA\n- 44px tap targets\n- Screen reader navigation\n- RTL Arabic text` },
  { title: "7.3: Performance Validation", phase: 7, estimate: 3, labels: ["chore", "qa"], desc: `**Phase:** 7 - Quality Assurance\n**Complexity:** M (~2.5K tokens)\n**Agent:** Performance Eng\n**Deps:** 7.1\n\nLighthouse audit:\n- FCP < 1.5s, TTI < 2s\n- Performance > 90\n- Bundle < 100kb gzipped` },
  // Phase 8
  { title: "8.1: Architecture Review", phase: 8, estimate: 3, labels: ["chore", "qa"], desc: `**Phase:** 8 - Code Review\n**Complexity:** M (~3K tokens)\n**Agent:** Code Reviewer\n**Deps:** 7.1\n\nVerify against architecture.md:\n- Folder structure, naming conventions\n- TypeScript interfaces, Zustand stores\n- No backend code (static only)` },
  { title: "8.2: Code Quality Review", phase: 8, estimate: 3, labels: ["chore", "qa"], desc: `**Phase:** 8 - Code Review\n**Complexity:** M (~2.5K tokens)\n**Agent:** Code Reviewer\n**Deps:** 8.1\n\nCode standards:\n- No TS errors, ESLint passes\n- No console.log in production\n- Proper typing, no unused code` },
  // Phase 9
  { title: "9.1: Local Docker Verification", phase: 9, estimate: 3, labels: ["chore", "devops"], desc: `**Phase:** 9 - Deployment\n**Complexity:** M (~2K tokens)\n**Agent:** System Architect\n**Deps:** 7.3, 8.2\n\nFull Docker test:\n- Build and run container\n- Test all user flows\n- Verify PWA and audio` },
  { title: "9.2: Vercel Deployment", phase: 9, estimate: 3, labels: ["feature", "devops"], desc: `**Phase:** 9 - Deployment\n**Complexity:** M (~2.5K tokens)\n**Agent:** System Architect\n**Deps:** 9.1\n\nDeploy to Vercel:\n- Connect GitHub repo\n- Configure static export\n- Test production URL` },
  { title: "9.3: Post-Deployment Verification", phase: 9, estimate: 2, labels: ["chore", "qa"], desc: `**Phase:** 9 - Deployment\n**Complexity:** S (~1.5K tokens)\n**Agent:** QA Engineer\n**Deps:** 9.2\n\nProduction tests:\n- All scenarios work\n- PWA installable\n- Offline mode\n- Share with test group` },
];

async function main() {
  console.log("Setting up Gulf Arabic Basics project in Linear...\n");

  // 1. Get the project and update it
  console.log("1. Updating project...");
  const project = await client.project(PROJECT_ID);
  await project.update({
    description: `# Gulf Arabic Basics

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
- [Implementation Plan](docs/execution/implementation-plan.md)
- [GitHub: JBackend/YallaArabic](https://github.com/JBackend/YallaArabic)`,
    state: "planned",
  });
  console.log("   ✓ Project updated\n");

  // 2. Get/create labels
  console.log("2. Setting up labels...");
  const labelMap: Record<string, string> = {};
  const existingLabels = await client.issueLabels();
  for (const label of existingLabels.nodes) {
    labelMap[label.name.toLowerCase()] = label.id;
  }

  const labelsToCreate = [
    { name: "frontend", color: "#6366f1" },
    { name: "content", color: "#f59e0b" },
    { name: "devops", color: "#10b981" },
    { name: "qa", color: "#8b5cf6" },
    { name: "chore", color: "#6b7280" },
  ];

  for (const label of labelsToCreate) {
    if (!labelMap[label.name]) {
      try {
        const payload = await client.createIssueLabel({
          name: label.name,
          color: label.color,
          teamId: TEAM_ID,
        });
        const newLabel = await payload.issueLabel;
        if (newLabel) {
          labelMap[label.name] = newLabel.id;
          console.log(`   ✓ Created: ${label.name}`);
        }
      } catch (e) {
        console.log(`   - ${label.name} exists`);
      }
    }
  }
  console.log();

  // 3. Create issues
  console.log("3. Creating 34 issues...");
  let created = 0;

  for (const issue of issues) {
    try {
      const labelIds = issue.labels
        .map((l) => labelMap[l] || labelMap[l.toLowerCase()])
        .filter(Boolean);

      const payload = await client.createIssue({
        teamId: TEAM_ID,
        title: issue.title,
        description: issue.desc,
        estimate: issue.estimate,
        labelIds,
        projectId: PROJECT_ID,
        stateId: BACKLOG_STATE_ID,
      });

      const newIssue = await payload.issue;
      if (newIssue) {
        created++;
        console.log(`   ✓ ${newIssue.identifier}: ${issue.title}`);
      }
    } catch (e: any) {
      console.log(`   ✗ ${issue.title}: ${e.message?.slice(0, 50)}`);
    }
  }
  console.log();

  // 4. Create project update
  console.log("4. Creating project update...");
  try {
    await client.createProjectUpdate({
      projectId: PROJECT_ID,
      body: `## Project Kickoff 🚀

**Gulf Arabic Basics** has been planned with **34 issues** across 9 phases.

### Summary
| Metric | Value |
|--------|-------|
| Total Issues | 34 |
| Estimated Tokens | ~102K |
| Phases | 9 |

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

### Ready to Start
All issues sized for <150K token execution. Begin with Phase 0! 🏗️`,
      health: "onTrack",
    });
    console.log("   ✓ Project update created\n");
  } catch (e: any) {
    console.log(`   ✗ ${e.message?.slice(0, 80)}\n`);
  }

  console.log(`✅ Complete! Created ${created}/34 issues`);
}

main().catch(console.error);
