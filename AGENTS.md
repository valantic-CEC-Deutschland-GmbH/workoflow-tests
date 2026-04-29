# Workoflow Tests

E2E semantic testing for Workoflow agents using Promptfoo + Azure OpenAI.

## Quick Reference

- **Tech**: Promptfoo, Docker, ESLint 9, Azure OpenAI (gpt-4o-mini)
- **Config**: `configs/promptfoo.config.js`

```bash
npm run test:e2e        # Full test suite
npm run test:filter "X" # Filter by name
npm run test:view       # Results UI (port 8080)
npm run test:dry-run    # Validate config
npm run docker:build    # Build container
npm run docker:shell    # Shell access
npm run lint            # ESLint (REQUIRED before commits)
npm run lint:fix        # Auto-fix
```

## Test Files

- `configs/tests/main-agent.tests.js` — Main agent tests
- `configs/tests/jira.tests.js` — Jira integration tests
- `configs/tests/confluence.tests.js` — Confluence tests
- `configs/tests/gitlab.tests.js` — GitLab tests
- `configs/tests/sharepoint.tests.js` — SharePoint tests
- `configs/tests/people-finder.tests.js` — People Finder tests
- `configs/tests/sap-c4c.tests.js` — SAP C4C tests
- `configs/tests/trello.tests.js` — Trello tests
- `configs/tests/system-tools.tests.js` — System tools tests

## Development Rules

- **ALWAYS** run `npm run lint` before committing
- Tests support both German and English
- Include semantic + exact validations

## Skills

Use `workoflow-skills` (`/add-dir ../workoflow-skills`) for: `architecture`, `e2e-test`, `dev-setup`
