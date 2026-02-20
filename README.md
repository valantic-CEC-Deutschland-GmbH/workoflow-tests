<p align="center">
  <img src="assets/logo_orig_large.png" alt="Workoflow Logo" width="360px">
</p>

# Workoflow Agent E2E Testing Suite

> Semantic response validation framework for AI agents using promptfoo and Azure OpenAI

## Overview

This testing suite provides end-to-end validation for Workoflow n8n webhook agents. It ensures AI responses remain consistent and accurate even after RAG (Retrieval-Augmented Generation) vector store updates by using semantic similarity testing rather than exact string matching.

The framework solves a critical challenge in AI agent development: **validating that AI responses maintain their semantic meaning** when underlying knowledge bases change. Traditional exact-match testing fails because AI responses vary in wording while conveying the same information.

### Key Capabilities

- **Semantic Validation** - Uses Azure OpenAI to compare response meaning, not just text
- **Multi-Language Support** - Tests German and English responses with appropriate rubrics
- **Performance Monitoring** - Latency assertions ensure response time SLAs
- **Containerized Execution** - Docker ensures consistent test environments
- **CI/CD Ready** - GitHub Actions and Jenkins integration included

## Technology Stack

| Component | Technology |
|-----------|------------|
| Testing Framework | [Promptfoo](https://www.promptfoo.dev/) |
| Semantic Validation | Azure OpenAI (gpt-4o-mini) |
| Container Runtime | Docker & Docker Compose |
| Target System | n8n Webhook Agents |
| Code Quality | ESLint 9 (flat config) |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Test Execution Pipeline                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│   │  Test Cases  │───▶│ n8n Webhook  │───▶│  Assertions  │      │
│   │  (YAML/JS)   │    │    Agent     │    │  (Semantic)  │      │
│   └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                   │              │
│                                                   ▼              │
│                              ┌─────────────────────────────┐    │
│                              │      Azure OpenAI           │    │
│                              │   (Semantic Comparison)     │    │
│                              └─────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- Azure OpenAI API access
- n8n webhook endpoint

### Setup

```bash
# 1. Clone and configure
git clone <repository-url>
cd workoflow-tests
cp .env.example .env

# 2. Edit .env with your credentials
# - N8N_WEBHOOK_URL: Your n8n webhook endpoint
# - AZURE_API_KEY: Azure OpenAI API key
# - SEMANTIC_THRESHOLD: Similarity threshold (default: 0.85)

# 3. Build and run
npm run docker:build
npm run test:e2e
```

### View Results

```bash
npm run test:view
# Opens http://localhost:8080 with interactive results viewer
```

## Project Structure

```
workoflow-tests/
├── assets/                  # Static assets (logo, images)
├── configs/                 # Test configuration
│   ├── promptfoo.config.js  # Main configuration
│   └── tests/               # Per-agent test definitions
│       ├── common.js         # Shared test helpers
│       ├── main-agent.tests.js
│       ├── system-tools.tests.js
│       ├── jira.tests.js
│       ├── sharepoint.tests.js
│       ├── confluence.tests.js
│       ├── gitlab.tests.js
│       ├── trello.tests.js
│       └── sap-c4c.tests.js
├── scripts/                 # Shell utilities
├── test-results/            # Generated reports
├── .github/workflows/       # CI/CD pipelines
├── docker-compose.yml       # Container orchestration
├── Dockerfile.test          # Test container definition
└── eslint.config.js         # ESLint 9 flat config
```

## Configuration

### Test Structure

Tests are organized in modular JavaScript files under `configs/tests/`:

```javascript
// configs/tests/example.tests.js
module.exports = {
  tests: [
    {
      vars: {
        user_input: "What is the project status?"
      },
      assert: [
        {
          type: "llm-rubric",
          value: "Response should contain project status information"
        },
        {
          type: "latency",
          threshold: 5000
        }
      ]
    }
  ]
};
```

### Environment Variables

#### n8n Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `N8N_WEBHOOK_URL` | Target n8n webhook endpoint | Required |
| `N8N_BASIC_AUTH_ENCODED` | Base64-encoded Basic Auth credentials for webhook | Optional |
| `N8N_AAD_OBJECT_ID` | Azure AD object ID for user identity (used by sub-workflows: SharePoint, Jira, etc.) | `45908692-...` |
| `N8N_TENANT_ID` | Microsoft tenant ID for user identity | `ae6f26a3-...` |

#### Azure OpenAI Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `AZURE_API_KEY` | Azure OpenAI API key | Required |
| `OPENAI_API_KEY` | OpenAI API key (alias, set to same value as `AZURE_API_KEY`) | Required |
| `AZURE_API_HOST` | Azure OpenAI endpoint | `oai-cec-de-germany-west-central.openai.azure.com` |
| `AZURE_DEPLOYMENT_NAME` | Azure OpenAI model deployment name | `gpt-4o-mini` |
| `AZURE_API_VERSION` | Azure OpenAI API version | `2025-01-01-preview` |

#### Test Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `TEST_ENVIRONMENT` | Environment mode (`development`, `staging`, `production`) | `development` |
| `SEMANTIC_THRESHOLD` | Similarity threshold (0-1) | `0.85` |
| `MAX_RETRIES` | Retry attempts for rate-limited requests | `3` |
| `TEST_TIMEOUT` | Request timeout in ms | `30000` |

## Commands Reference

### Testing

| Command | Description |
|---------|-------------|
| `npm run test:e2e` | Run full test suite |
| `npm run test:sharepoint` | Run SharePoint tests only |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:filter "name"` | Run specific tests by name |
| `npm run test:verbose` | Run with detailed output |
| `npm run test:dry-run` | Validate config without execution |
| `npm run test:repeat N` | Run tests N times |
| `npm run test:export` | Export results to HTML |
| `npm run test:view` | Open results viewer (port 8080) |

### Docker

| Command | Description |
|---------|-------------|
| `npm run docker:build` | Build test containers |
| `npm run docker:up` | Start containers (detached) |
| `npm run docker:shell` | Access container shell |
| `npm run docker:logs` | View container logs |
| `npm run docker:down` | Stop containers |
| `npm run docker:clean` | Remove containers and results |

### Code Quality

| Command | Description |
|---------|-------------|
| `npm run lint` | Check for linting errors |
| `npm run lint:fix` | Auto-fix linting issues |

## Assertion Types

The framework supports multiple assertion strategies:

### Semantic (LLM Rubric)

```javascript
{
  type: "llm-rubric",
  value: "Response explains the project timeline with specific dates"
}
```

### Latency

```javascript
{
  type: "latency",
  threshold: 5000  // milliseconds
}
```

### Contains

```javascript
{
  type: "contains",
  value: "expected substring"
}
```

### JavaScript Function

```javascript
{
  type: "javascript",
  value: "output.includes('success') && output.length > 100"
}
```

## CI/CD Integration

### GitHub Actions

The included workflow (`.github/workflows/e2e-tests.yml`) runs tests automatically on:
- Push to main branch
- Pull request creation
- Manual trigger

### Jenkins

A `Jenkinsfile` is provided for Jenkins pipeline integration with:
- Docker-based test execution
- HTML and JUnit report generation
- Artifact archival

## Troubleshooting

### Common Issues

**Docker build fails**
```bash
npm run docker:clean
docker system prune -a
npm run docker:build
```

**Tests timeout**
- Increase `TEST_TIMEOUT` in `.env`
- Verify n8n webhook connectivity:
```bash
curl -X POST $N8N_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"text":"test"}'
```

**Semantic validation fails unexpectedly**
- Lower `SEMANTIC_THRESHOLD` temporarily
- Review the LLM rubric criteria for specificity
- Check Azure API key validity

**Permission errors**
```bash
chmod -R 777 test-results/
```

### Debug Mode

```bash
# Run single test with verbose output
npm run docker:shell
> promptfoo eval -c configs/promptfoo.config.js --filter "test name" -v
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-test`)
3. Run linting (`npm run lint:fix`)
4. Commit changes (`git commit -m 'Add new test suite'`)
5. Push to branch (`git push origin feature/new-test`)
6. Open a Pull Request

## Related Projects

- [Workoflow Integration Platform](../workoflow-promopage-v2) - The main integration platform
- [Promptfoo Documentation](https://www.promptfoo.dev/docs/) - Testing framework docs

## License

Proprietary - All rights reserved.

---

<p align="center">
  Built with Promptfoo and Azure OpenAI
</p>
