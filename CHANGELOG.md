# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## 2026-01-30

### Changed
- Repository moved to official valantic organization: valantic-CEC-Deutschland-GmbH
- Added proprietary license — usage requires a valid commercial license from valantic CEC Deutschland GmbH

## [2025-12-01]

### Added
- Rate limiting configuration in promptfoo.config.js (maxConcurrency: 2, delay: 5s)
- Retry configuration for HTTP provider (3 retries, 10s delay)

### Changed
- Simplified gitlab-test-002 assertions for more flexible pipeline status responses
- Simplified sap-c4c-test-001 assertions using case-insensitive matching

## [2025-11-26]

### Added
- Workoflow branding with logo in README.md
- ESLint 9 configuration with security plugin (`eslint.config.js`)
- `.dockerignore` for optimized Docker builds
- Linting npm scripts (`lint`, `lint:fix`)

### Changed
- Complete README.md rewrite with comprehensive documentation
- Updated CLAUDE.md with linting requirements
- Upgraded promptfoo from 0.114.7 to 0.119.5
- Upgraded dotenv from 16.3.1 to 17.2.3
- Package.json now uses ES modules (`"type": "module"`)
- Converted all test files and config from CommonJS to ES modules syntax
- Fixed unused imports in sap-c4c.tests.js and trello.tests.js

## [2025-11-25]

### Added
- Modular test structure with separate test files per agent
  - `configs/tests/common.js` - Shared helper functions
  - `configs/tests/main-agent.tests.js` - Main agent test cases
  - `configs/tests/system-tools.tests.js` - System tools tests
  - `configs/tests/jira.tests.js` - Jira integration tests
  - `configs/tests/sharepoint.tests.js` - SharePoint tests
  - `configs/tests/confluence.tests.js` - Confluence tests
  - `configs/tests/gitlab.tests.js` - GitLab tests
  - `configs/tests/trello.tests.js` - Trello tests
  - `configs/tests/sap-c4c.tests.js` - SAP C4C tests
- CHANGELOG.md to document project changes

### Changed
- Upgraded Node.js base image from 18-alpine to 20-alpine in Dockerfile.test
- Refactored `configs/promptfoo.config.js` to use modular test imports
- Updated test user identifiers to use proper AAD Object IDs and Tenant IDs
