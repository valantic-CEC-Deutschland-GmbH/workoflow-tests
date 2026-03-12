import { createTestCase, createTestCaseWithAsserts } from './common.js';

const peopleFinderTests = [
  createTestCaseWithAsserts({
    description: "People Finder: Project search (ESA)",
    query: "Welche Kollegen haben im Projekt ESA gearbeitet?",
    messageId: "people-finder-001",
    requirements: `The response should:
      1. List employees who worked on the ESA project
      2. Mention at least 2 specific employee names
      3. Be in German language
      4. Be helpful and professional`,
    additionalAsserts: [
      { type: 'contains', value: 'Patrick Schönfeld' },
      { type: 'contains', value: 'Dominik Bähr' },
    ]
  }),

  createTestCase({
    description: "People Finder: Skill search (Python)",
    query: "Wer hat Python Skills?",
    messageId: "people-finder-002",
    requirements: `The response should:
      1. List employees with Python skills
      2. Include specific employee names
      3. Be in German language`
  }),

  createTestCase({
    description: "People Finder: Project + role combination",
    query: "Wer war Solution Architect im Daimler Truck Projekt?",
    messageId: "people-finder-003",
    requirements: `The response should:
      1. Return employees who had a Solution Architect role in the Daimler Truck project
      2. Include specific employee names
      3. Be in German language`
  }),

  createTestCase({
    description: "People Finder: Profile lookup",
    query: "Zeig mir das Profil von Patrick Schönfeld",
    messageId: "people-finder-004",
    requirements: `The response should:
      1. Show a detailed profile for Patrick Schönfeld
      2. Include skills, projects, or other professional details
      3. Be in German language`
  }),

  createTestCase({
    description: "People Finder: Skill + availability",
    query: "Welche PHP Entwickler sind verfügbar?",
    messageId: "people-finder-005",
    requirements: `The response should:
      1. List PHP developers
      2. Gracefully handle if availability data is empty
      3. Be in German language`
  }),

  createTestCase({
    description: "People Finder: Location search",
    query: "Gibt es Entwickler in Langenfeld?",
    messageId: "people-finder-006",
    requirements: `The response should:
      1. Return developers located in or near Langenfeld
      2. Include specific employee names
      3. Be in German language`
  }),

  createTestCaseWithAsserts({
    description: "People Finder: Short project abbreviation (GHS)",
    query: "Wer hat am GHS Projekt gearbeitet?",
    messageId: "people-finder-007",
    requirements: `The response should:
      1. List employees who worked on a project called GHS
      2. Mention at least 1 specific employee name
      3. Be in German language`,
    additionalAsserts: []
  }),

  createTestCase({
    description: "People Finder: Language search (French)",
    query: "Wer spricht Französisch?",
    messageId: "people-finder-008",
    requirements: `The response should:
      1. List employees who speak French
      2. Include specific employee names
      3. Be in German language`
  }),

  createTestCase({
    description: "People Finder: Certificate search (AWS)",
    query: "Welche Kollegen haben AWS Zertifizierungen?",
    messageId: "people-finder-009",
    requirements: `The response should:
      1. List employees with AWS certifications
      2. Include specific employee names or certificate details
      3. Be in German language`
  }),

  createTestCase({
    description: "People Finder: Company search",
    query: "Wer arbeitet bei valantic CEC Deutschland GmbH?",
    messageId: "people-finder-010",
    requirements: `The response should:
      1. List employees at valantic CEC Deutschland GmbH
      2. Include specific employee names
      3. Be in German language`
  }),

  createTestCase({
    description: "People Finder: Industry search (Automotive)",
    query: "Berater mit Automotive Erfahrung",
    messageId: "people-finder-011",
    requirements: `The response should:
      1. List consultants with automotive industry experience
      2. Include specific employee names
      3. Be in German language`
  }),

  createTestCaseWithAsserts({
    description: "People Finder: Multi-word project name (Lekkerland Kundenportal)",
    query: "Wer hat am Lekkerland Kundenportal gearbeitet?",
    messageId: "people-finder-012",
    requirements: `The response should:
      1. List employees who worked on the Lekkerland Kundenportal project
      2. Mention at least 1 specific employee name
      3. Be in German language`,
    additionalAsserts: []
  }),
];

export default peopleFinderTests;
