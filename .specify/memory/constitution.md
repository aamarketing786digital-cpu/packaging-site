<!--
SYNC IMPACT REPORT
==================
Version change: Initial → 1.0.0
Rationale: MAJOR version - Initial constitution establishing core architectural principles, mandatory skill integrations, and execution mandate for packaging.nextlevelmarketerz.com

Modified principles: N/A (Initial version)
Added sections:
  - Core Architectural Principles (DRY, SOLID, Subagent Collaboration)
  - Mandatory Skill Integrations (vercel-react-best-practices, frontend-designer, web-design-guidelines)
  - Execution Mandate
  - Governance

Removed sections: N/A (Initial version)

Templates requiring updates:
  ✅ .specify/memory/constitution.md (This file - updated)
  ✅ module_prompts/constitution.md (Source content - verified)
  ⚠ .specify/templates/plan-template.md (To be verified - if exists)
  ⚠ .specify/templates/spec-template.md (To be verified - if exists)
  ⚠ .specify/templates/tasks-template.md (To be verified - if exists)

Follow-up TODOs: None
-->

# Packaging Website Constitution

This constitution serves as the absolute source of truth for all AI agents, subagents, and developers working on `packaging.nextlevelmarketerz.com`. It enforces strict architectural, design, and performance guidelines to ensure a pristine, maintainable, and high-converting codebase.

## 1. Core Architectural Principles

### DRY (Don't Repeat Yourself)
Eliminate duplicated logic. Consolidate shared utilities (e.g., WhatsApp link generation, Sanity fetching wrappers) into the `lib/` directory.

**Rationale**: Duplicated code increases maintenance burden and creates inconsistencies. Centralized utilities ensure single source of truth for cross-cutting concerns.

### SOLID Principles
- **Single Responsibility**: Components should do one thing (e.g., `ProductCard` handles display, `WhatsAppCTA` handles the action).
- **Open/Closed**: Design UI components to be extensible without modifying their core logic.
- **Dependency Inversion**: Abstract CMS data fetching so UI components rely on standardized interfaces, not raw CMS structures.

**Rationale**: SOLID principles create maintainable, testable, and flexible code that can evolve without breaking existing functionality.

### Subagent Collaboration
Break down complex tasks. If a feature requires deep UI work and backend data structuring, delegate explicit scopes to specialized subagents to ensure focus and quality.

**Rationale**: Specialized subagents with clear scopes produce higher quality outcomes than generalists attempting to master every domain.

## 2. Mandatory Skill Integrations

You MUST actively utilize and adhere to the following project skills for every PR and feature:

### `@vercel-react-best-practices` (Performance & SSR)
- **Zero Waterfalls**: Enforce `async-defer-await` and `<Suspense>` boundaries (`async-suspense-boundaries`).
- **Optimal Bundling**: Never use barrel imports for heavy libraries (`bundle-barrel-imports`). Always `next/dynamic` import heavy client-side interactive components.
- **SSR-Safe State**: Never access `window` or `localStorage` during initial render. Use strict hydration-safe patterns.
- **Server Caching**: Utilize `React.cache()` and `next/cache` to deduplicate Sanity requests.

**Rationale**: Next.js 15 requires specific patterns to achieve optimal performance. Violating these patterns creates slow, waterfalled pages that damage user experience and SEO.

### `@frontend-designer` (Premium UI/UX & Motion)
- **Banned Typography**: Do not use Inter, Roboto, or Arial. Use **Clash Display/Outfit** (Headings) and **Plus Jakarta Sans** (Body).
- **Semantic Design Tokens**: Never hardcode hex values. Use the defined CSS variables (`--bg-base`, `--surface-glass`, `--brand-primary`, `--accent-whatsapp`).
- **Strategic Motion**:
  - Use **Motion.dev** (Framer Motion) layout transitions and micro-interactions (`whileHover`, `whileTap`) for tactile feedback.
  - Use **GSAP + ScrollTrigger** for premium scroll-storytelling on landing pages.
- **Aesthetic Direction**: High-end industrial, utilizing glassmorphism, noise textures, and clean negative space.

**Rationale**: Generic design systems create forgettable experiences. Premium typography, semantic tokens, and strategic motion create distinctive brand identity and higher conversion.

### `@web-design-guidelines` (Accessibility & Auditing)
- Before finalizing any UI component, cross-reference it against the Vercel Web Interface Guidelines.
- Ensure all interactive elements have sufficient hit areas (touch targets).
- Ensure high contrast ratios (matching WCAG 2.1 AA) for text on industrial backgrounds.

**Rationale**: Accessibility is not optional. Inaccessible designs exclude users and create legal liability. Cross-referencing established guidelines prevents reinventing the wheel.

## 3. Execution Mandate

Before writing code, verify that your proposed solution adheres to *all* of the above principles. If a quick fix violates DRY or introduces a client-side waterfall, you must reject it and engineer the proper architectural solution.

**Non-negotiable**: Any PR that violates core architectural principles or ignores mandatory skill integrations MUST be rejected and revised before merge.

## 4. Governance

### Amendment Procedure
1. Propose amendment with clear rationale
2. Update version according to semantic versioning:
   - MAJOR: Backward incompatible governance/principle removals or redefinitions
   - MINOR: New principle/section added or materially expanded guidance
   - PATCH: Clarifications, wording, typo fixes, non-semantic refinements
3. Document changes in Sync Impact Report at top of constitution
4. Update dependent templates and documentation

### Versioning Policy
- MAJOR version indicates breaking changes to core principles
- MINOR version indicates additions or expansions
- PATCH version indicates clarifications or corrections

### Compliance Review
- All PRs MUST verify compliance with this constitution
- Agents MUST reference constitution when making architectural decisions
- Violations MUST be flagged during review and corrected before merge

### Constitution Authority
This constitution supersedes all other project documentation. In case of conflict between this constitution and other documents, this constitution takes precedence.

---

**Version**: 1.0.0 | **Ratified**: 2026-03-04 | **Last Amended**: 2026-03-04
