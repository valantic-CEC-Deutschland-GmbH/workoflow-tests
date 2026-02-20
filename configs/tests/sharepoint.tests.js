import { createTestCase, createTestCaseWithAsserts } from './common.js';

const sharepointTests = [
  // --- Document Search Tests ---

  createTestCaseWithAsserts({
    description: "SharePoint: Search documents with KQL",
    query: "Suche im SharePoint nach 'town hall' Meeting Aufnahmen",
    messageId: "sharepoint-test-001",
    requirements: `Response should:
      1. Search SharePoint for meeting recordings
      2. Present results with file names and/or links
      3. Be in German language
      4. Be helpful and informative`,
    additionalAsserts: [
      { type: 'not-contains', value: 'Fehler' },
      { type: 'not-contains', value: 'nicht verfügbar' }
    ]
  }),

  createTestCase({
    description: "SharePoint: Search for documentation",
    query: "Finde API Dokumentation im SharePoint",
    messageId: "sharepoint-test-002",
    requirements: `Response should:
      1. Search for API documentation files
      2. List found documents with clickable links
      3. Preserve markdown link formatting [text](url)
      4. Be in German language`
  }),

  // --- New tests: Policy/Process Intent (POLICY_PROCESS_LOOKUP) ---

  createTestCaseWithAsserts({
    description: "SharePoint: Travel policy with city name (boilerplate trap)",
    query: "schaue bitte im sharepoint was ich für meine Reise in Mannheim brauche",
    messageId: "sharepoint-test-003",
    requirements: `The response should return travel expense policy or travel guidelines content.

    Required elements:
    1. References travel expense policy, Reisekostenrichtlinie, or travel guidelines
    2. Provides actionable information about travel expense procedures or rules
    3. Does NOT primarily show business contracts, framework agreements, or offers
    4. The city name "Mannheim" should be treated as travel destination context, not as a document search keyword
    5. Response is in German language
    6. Professional and helpful tone`,
    additionalAsserts: [
      { type: 'not-contains', value: 'Rahmenvertrag' },
      { type: 'not-contains', value: 'Framework Agreement' },
      { type: 'not-contains', value: 'Angebot' }
    ]
  }),

  createTestCase({
    description: "SharePoint: Travel expense submission process",
    query: "Wie reiche ich meine Reisekosten ein?",
    messageId: "sharepoint-test-004",
    requirements: `The response should explain how to submit travel expenses.

    Required elements:
    1. References travel expense submission process, forms, or guidelines
    2. Provides actionable steps or points the user to the right document/process
    3. Based on SharePoint search results for travel expense policies
    4. Response is in German language
    5. Helpful and professional tone`
  }),

  createTestCase({
    description: "SharePoint: Vacation policy lookup",
    query: "Wo finde ich unsere Urlaubsregelung?",
    messageId: "sharepoint-test-005",
    requirements: `The response should help find the vacation/leave policy.

    Required elements:
    1. References vacation policy, Urlaubsregelung, or leave guidelines
    2. Points to specific documents or SharePoint locations
    3. Based on SharePoint search results for vacation/HR policies
    4. Response is in German language
    5. Helpful and professional tone`
  }),

  createTestCase({
    description: "SharePoint: Home office policy",
    query: "Wie funktioniert Home Office bei uns?",
    messageId: "sharepoint-test-006",
    requirements: `The response should explain the home office / remote work policy.

    Required elements:
    1. References home office rules, remote work policy, or Homeoffice-Regelung
    2. Provides information about how remote work is organized at the company
    3. Based on SharePoint search results for home office/remote work policies
    4. Response is in German language
    5. Helpful and professional tone`
  }),

  // --- New tests: Location Boilerplate Avoidance ---

  createTestCaseWithAsserts({
    description: "SharePoint: Business trip to München (location boilerplate avoidance)",
    query: "Was muss ich bei einer Dienstreise nach München beachten?",
    messageId: "sharepoint-test-007",
    requirements: `The response should return travel policy information, not contracts mentioning München.

    Required elements:
    1. References travel policy, Dienstreise guidelines, or Reisekostenrichtlinie
    2. Provides actionable travel guidance or rules
    3. Does NOT primarily return business contracts, offers, or framework agreements that happen to mention München in their address
    4. Response is in German language
    5. Professional and helpful tone`,
    additionalAsserts: [
      { type: 'not-contains', value: 'Rahmenvertrag' },
      { type: 'not-contains', value: 'Framework Agreement' },
      { type: 'not-contains', value: 'Angebot' }
    ]
  }),

  // --- New tests: Other Intent Categories ---

  createTestCase({
    description: "SharePoint: Specific document search by name",
    query: "Finde das Dokument Reisekostenrichtlinie im SharePoint",
    messageId: "sharepoint-test-008",
    requirements: `The response should find the specific Reisekostenrichtlinie document.

    Required elements:
    1. Finds and presents the Reisekostenrichtlinie document (or closest match)
    2. Includes document name and a link if available
    3. The result should be the actual policy document, not contracts that mention travel costs
    4. Response is in German language
    5. Helpful and professional tone`
  }),

  createTestCase({
    description: "SharePoint: HR document topic exploration",
    query: "Welche HR Dokumente gibt es im SharePoint?",
    messageId: "sharepoint-test-009",
    requirements: `The response should explore and list HR documents from SharePoint.

    Required elements:
    1. Lists multiple HR-related documents found in SharePoint
    2. Categorizes or groups results if possible (policies, guidelines, forms)
    3. Includes document names and links where available
    4. Response is in German language
    5. Helpful and professional tone`
  })
];

export default sharepointTests;
