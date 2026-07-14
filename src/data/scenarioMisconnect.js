// Signal 7 — Passenger Misconnect Exposure
// Dedicated 7-screen deep-dive: an ATL-heavy connection-bank compression
// spilling downstream into JFK and BOS. Proactive pre-bank optimization +
// real-time connection protection, passenger segmentation enabled, balanced
// network-stability + CX decision bias.
// Exports follow the shared workflow-panel contract (SMX_ prefix); all values
// are illustrative UI mock data, not actual Delta operational data.

export const SMX_ACCENT = 'orange'

// ── Screen 1 — Signal Deep Dive ─────────────────────────────────────────────
export const SMX_SIGNAL = {
  sentinel: 'Connection Sentinel',
  bannerText: 'Passenger Misconnect Exposure — ATL bank compression is spilling into the JFK late bank and BOS next-day first wave.',
  card: [
    { label: 'Signal class', value: 'Passenger-impact / connection cascade' },
    { label: 'Severity', value: 'HIGH · Critical if critical misconnects breach threshold' },
    { label: 'Detection', value: '15:35 ET' },
    { label: 'Misconnects at risk', value: '1,460' },
    { label: 'Confidence', value: '87%' },
    { label: 'Cascade path', value: 'ATL → JFK → BOS' },
    { label: 'Cascade state', value: 'L0 active ATL · L1 watch JFK · L2 watch BOS' },
    { label: 'Response window', value: 'Proactive T-3h to bank · real-time T-45m to T+20m' },
  ],
  sourceChips: ['PASSENGER', 'NETWORK', 'CREW', 'AIRCRAFT', 'GATE', 'EXTERNAL', 'COST/POLICY', 'DERIVED'],
  detail: 'Inbound and crew-reserve delays are compressing the ATL 17:30–20:30 connection bank. Late ATL arrivals miss the JFK 21:00–23:30 outbound bank, and JFK spillover threatens the BOS next-day first wave. Passenger-driven holds must not break crew legality, tail rotation, or network stability.',
  conditions: [
    'Critical, premium, international, and low-reaccommodation journeys are concentrated in the compressed bank,',
    'Reaccommodation shortfall is 550 seats within 12h,',
    'Holding connection-critical flights risks crew legality (7 flights) and tail rotation (9 tails),',
    'JFK spillover (380) and BOS backlog (160) are forming downstream.',
  ],
  conditionsNote: 'Passenger, Network, Crew, and Aircraft Twins use connection buffer, segment value, reaccommodation availability, and bank dependency as state variables, with hold legality and next-day rest cutoffs as critical events.',
}

export const SMX_DISRUPTION = {
  detected: '15:35 ET',
  source: 'ATL 17:30–20:30 bank compressed by inbound + crew-reserve delay, gate congestion, and an ATC flow constraint into JFK',
  cascade: 'ATL bank compression (L0 active) → JFK late-bank spillover (L1 watch) → BOS next-day backlog (L2 watch)',
}

export const SMX_IMPACT = [
  { label: 'Misconnects at risk', value: '1,460', color: 'orange' },
  { label: 'Critical connections', value: '386', color: 'red' },
  { label: 'Premium exposed', value: '214', color: 'violet' },
  { label: 'International exposed', value: '132', color: 'blue' },
  { label: 'Reaccom shortfall', value: '550 seats', color: 'red' },
]

// Optional Screen-1 blocks (render only when present)
export const SMX_METRICS = [
  { label: 'Connection-critical flights', value: '18', note: 'a hold/delay could protect many passengers' },
  { label: 'Reaccommodation capacity', value: '910 seats / 12h', note: 'alternate itineraries available' },
  { label: 'Crew legality risk from holds', value: '7 flights', note: 'holds may break duty / rest' },
  { label: 'Tail rotation risk from holds', value: '9 tails', note: 'holds may break downstream rotation' },
  { label: 'Tight domestic (<35 min buffer)', value: '612 pax', note: 'most likely to miss even on small delay' },
  { label: 'Estimated recovery cost', value: '$520K–$980K', note: 'hotels + vouchers + rebooking + compensation' },
]

export const SMX_HUB_IMPACT = [
  { hub: 'ATL 17:30–20:30', state: 'Bank compression', crew: '245 critical', flights: '920 misconnects at risk', pax: 'Crew + gate + ATC', level: 'L0 active' },
  { hub: 'JFK 21:00–23:30', state: 'Late-bank spillover', crew: '96 critical', flights: '380 misconnects at risk', pax: 'Delayed ATL feed + tail readiness', level: 'L1 watch' },
  { hub: 'BOS next-bank', state: 'Next-day backlog', crew: '45 critical', flights: '160 misconnects at risk', pax: 'Seat scarcity + next-day coupling', level: 'L2 watch' },
]

export const SMX_ROOT_CAUSE = [
  { domain: 'Network', pct: 28, note: 'ATL bank compression fails many inbound-to-outbound dependencies' },
  { domain: 'Crew', pct: 22, note: 'Crew swaps and reserve delays force selected holds and reassignments' },
  { domain: 'Aircraft', pct: 17, note: 'Tail readiness delays reduce ability to protect connection-heavy departures' },
  { domain: 'Gate / airport', pct: 14, note: 'Gate congestion increases deplaning and connection-walk time' },
  { domain: 'External / ATC', pct: 11, note: 'Flow constraints into JFK reduce recovery slack' },
  { domain: 'Passenger', pct: 8, note: 'High premium / international / tight-connection concentration' },
]

export const SMX_CASCADE = [
  { level: 'Level 0 — Local bank compression (ATL)', status: 'Active', color: 'red', trigger: 'Inbound delays, gate congestion, and crew swaps compress ATL connections', action: 'Run connection protection simulation' },
  { level: 'Level 1 — Downstream bank spillover (JFK)', status: 'Watch', color: 'orange', trigger: 'ATL arrivals miss the JFK outbound bank (380 pax)', action: 'Evaluate hold vs proactive reaccommodation' },
  { level: 'Level 2 — Backlog contamination (BOS)', status: 'Watch', color: 'yellow', trigger: 'JFK backlog pushes into BOS next-bank / next-day (160 pax, limited seats)', action: 'Activate restart-aware passenger backlog plan' },
]

export const SMX_PRECEDENTS = [
  { episode: 'ATL tight-bank replay', similarity: 84, pattern: 'Gate congestion + crew-driven holds', outcome: 'High misconnect spike', lesson: 'Hold only high-leverage flights' },
  { episode: 'JFK late-bank spillover', similarity: 76, pattern: 'ATL feed missed JFK departures', outcome: 'Overnight passenger backlog', lesson: 'Reaccommodate before JFK bank closes' },
  { episode: 'BOS first-bank backlog', similarity: 68, pattern: 'Seat scarcity after late arrivals', outcome: 'Next-day service recovery cost', lesson: 'Protect international + low-seat segments earlier' },
]

export const SMX_HYPOTHESIS = 'If Delta protects the ATL connection bank early — holding only high-leverage flights within legality, reaccommodating premium / international / tight / low-seat passengers first, and validating crew, tail, and gate constraints — then it can cut critical misconnects and prevent JFK spillover and BOS backlog while holding recovery cost within cap and preserving network stability.'

// ── Screen 2 — Objectives & KPIs ────────────────────────────────────────────
export const SMX_PRIMARY_OBJECTIVES = [
  { value: 'Protect connections while preserving network stability', desc: 'Cut misconnects without triggering crew, tail, or bank cascade' },
  { value: 'Protect premium / high-value passengers', desc: 'Shield the 214 exposed premium journeys' },
  { value: 'Protect international connections', desc: 'Shield the 132 harder-to-reaccommodate journeys' },
  { value: 'Reduce reaccommodation backlog', desc: 'Close the 550-seat shortfall via operational protection' },
  { value: 'Avoid legality-breaking holds', desc: '7 flights carry crew legality watch' },
  { value: 'Preserve ATL / JFK bank stability', desc: 'Over-holding could destabilize the network' },
]
export const SMX_PRIMARY_DEFAULT = 'Protect connections while preserving network stability'

export const SMX_SECONDARY_OBJECTIVES = [
  { value: 'Avoid aircraft rotation damage', desc: '9 tails carry downstream rotation risk' },
  { value: 'Keep recovery cost within tolerance', desc: 'Passenger recovery cost is material ($750K cap)' },
  { value: 'Protect families / assisted travel', desc: 'Higher service burden; seat-contiguity needed' },
  { value: 'Prevent JFK late-bank spillover', desc: 'Reaccommodate before the JFK bank closes' },
  { value: 'Prevent BOS next-day backlog', desc: 'Seat scarcity compounds overnight' },
  { value: 'Preserve gate feasibility', desc: 'Holds must not worsen ATL / JFK congestion' },
]
export const SMX_SECONDARY_DEFAULT = ['Avoid aircraft rotation damage', 'Keep recovery cost within tolerance']

export const SMX_KPI_OPTIONS = [
  { value: 'Misconnects avoided', type: 'CX', rec: true },
  { value: 'Premium passengers protected', type: 'CX', rec: true },
  { value: 'International connections protected', type: 'CX', rec: true },
  { value: 'Bank stability', type: 'Operational', rec: true },
  { value: 'Crew legality preserved', type: 'Compliance', rec: true },
  { value: 'Backlog clearance', type: 'Resilience', rec: true },
  { value: 'Passenger recovery cost', type: 'Financial', rec: true },
  { value: 'Cost per misconnect avoided', type: 'Financial', rec: false },
  { value: 'Hold minutes used', type: 'Resource', rec: false },
  { value: 'Reaccommodation lead time', type: 'CX', rec: false },
  { value: 'Prediction accuracy', type: 'Governance', rec: false },
]
export const SMX_KPI_DEFAULT = SMX_KPI_OPTIONS.filter(k => k.rec).map(k => k.value)

// ── Screen 3 — Simulation Levers ────────────────────────────────────────────
export const SMX_LEVER_GROUPS = [
  {
    group: 'A', title: 'Passenger protection levers', color: 'blue',
    levers: [
      { id: 'reaccomPriority', label: 'Reaccommodation priority', control: 'select', options: ['Premium + intl + tight + low-seat first', 'Premium first', 'Cost-min'], recommended: 'Premium + intl + tight + low-seat first', why: 'Must follow passenger priority policy' },
      { id: 'earlyReaccom', label: 'Early reaccommodation', control: 'select', options: ['0 pax', '720 pax', '1,050 pax', '1,460 pax'], recommended: '720 pax', why: 'Limited by seat inventory and connection feasibility' },
      { id: 'protectedList', label: 'Protected passenger list', control: 'select', options: ['0 pax', '386 critical', '600 pax'], recommended: '386 critical', why: 'Critical-segment override allowed' },
      { id: 'voucherTrigger', label: 'Compensation / voucher trigger', control: 'select', options: ['Off', 'Selective', 'Broad'], recommended: 'Selective', why: 'Policy and cost threshold required' },
      { id: 'backlogHorizon', label: 'Backlog clearance horizon', control: 'select', options: ['6h', '12h', '24h'], recommended: '12h', why: 'Shorter horizon may increase cost' },
    ],
  },
  {
    group: 'B', title: 'Network protection levers', color: 'grape',
    levers: [
      { id: 'holdCount', label: 'Hold selected departures', control: 'select', options: ['0 flights', '8 flights', '12 flights', '18 flights'], recommended: '8 flights', why: 'Block if legality or tail impact exceeds threshold' },
      { id: 'maxHold', label: 'Max hold duration', control: 'select', options: ['0 min', '22 min', '45 min'], recommended: '22 min', why: 'Cannot break duty / rest or airport slot' },
      { id: 'bankProtect', label: 'Bank protection', control: 'select', options: ['Off', 'ATL / JFK connection-critical', 'All'], recommended: 'ATL / JFK connection-critical', why: 'Protect only high-leverage bank flows' },
      { id: 'thinCandidates', label: 'Cancel / thin candidates', control: 'select', options: ['0 flights', '2 flights', '6 flights'], recommended: '2 flights', why: 'OCC approval required' },
      { id: 'altRoute', label: 'Reroute via alternate hubs', control: 'select', options: ['Off', 'DTW / MSP selected', 'Broad'], recommended: 'DTW / MSP selected', why: 'Avoid new passenger / capacity bottlenecks' },
    ],
  },
  {
    group: 'C', title: 'Crew & aircraft levers', color: 'red',
    levers: [
      { id: 'legalityCheck', label: 'Crew legality check on holds', control: 'switch', recommended: true, onLabel: 'Mandatory (non-adjustable)', why: 'Hard feasibility gate' },
      { id: 'crewSwap', label: 'Crew swap validation', control: 'select', options: ['Off', 'Network-safe only', 'Aggressive'], recommended: 'Network-safe only', why: 'Aggressive mode requires approval' },
      { id: 'reserves', label: 'Reserve support for held flights', control: 'select', options: ['0 reserves', '5 reserves', '12 reserves'], recommended: '5 reserves', why: 'Legal, qualified, report-time feasible' },
      { id: 'tailFilter', label: 'Tail readiness filter', control: 'switch', recommended: true, onLabel: 'Ready + turn-feasible only', why: 'Maintenance-ready aircraft only' },
      { id: 'rotationCap', label: 'Rotation impact cap', control: 'select', options: ['0 min', '30 min', '90 min'], recommended: '30 min', why: 'Higher cap increases network risk' },
    ],
  },
  {
    group: 'D', title: 'Gate · cost · recovery levers', color: 'orange',
    levers: [
      { id: 'gateTolerance', label: 'Gate conflict tolerance', control: 'select', options: ['0 conflicts', '3 conflicts', '8 conflicts'], recommended: '3 conflicts', why: 'Must not worsen ATL / JFK congestion' },
      { id: 'costCap', label: 'Passenger recovery cost cap', control: 'select', options: ['$300K', '$750K', '$1.5M'], recommended: '$750K', why: 'Leadership approval if exceeded' },
      { id: 'costPosture', label: 'Cost-vs-CX posture', control: 'select', options: ['CX-first', 'Balanced', 'Cost-min'], recommended: 'Balanced', why: 'Current selection: balanced' },
      { id: 'backlogPlan', label: 'Next-bank backlog plan', control: 'select', options: ['Off', 'Watch', 'Active'], recommended: 'Watch', why: 'Activate if BOS backlog exceeds threshold' },
    ],
  },
]
export const SMX_ALL_LEVERS = SMX_LEVER_GROUPS.flatMap(g => g.levers)
export const SMX_LEVER_DEFAULTS = Object.fromEntries(SMX_ALL_LEVERS.map(l => [l.id, l.recommended]))

// ── Screen 4 — Simulation Summary ───────────────────────────────────────────
export const SMX_SCENARIO = {
  name: 'ATL → JFK → BOS Connection Protection Run',
  signal: 'Passenger Misconnect Exposure',
  objective: 'Protect passenger connections while preserving ATL / JFK / BOS network stability, weighting CX 35% / network stability 35% / cost 15% / resource feasibility 15%.',
  method: 'Pre-bank optimization + real-time connection protection; passenger connection model + crew legality, tail readiness, gate feasibility, and seat-inventory checks across all twins vs a do-nothing baseline.',
}
export const SMX_SCOPE = [
  { item: 'Passengers at risk', value: '1,460 across ATL / JFK / BOS' },
  { item: 'Connection-critical flights', value: '18 candidate hold / delay flights' },
  { item: 'Hubs', value: 'ATL primary · JFK downstream · BOS next-day' },
  { item: 'Cascade state', value: 'L0 active ATL · L1 watch JFK · L2 watch BOS' },
  { item: 'Decision deadline', value: 'Before the ATL connection bank closes; real-time updates every 10 min' },
  { item: 'Horizon', value: 'Pre-bank + real-time + 24h backlog watch' },
]
export const SMX_VALIDATION = [
  'Crew duty / rest legality checked on all holds',
  'Crew swap validated network-safe only',
  'Aircraft maintenance readiness + turn feasibility checked',
  'Tail rotation impact within 30 delay-min cap',
  'Gate conflict tolerance (≤3) applied',
  'Passenger seat inventory checked (720 reaccommodation feasible)',
  'Passenger priority policy applied',
  'Cost cap ($750K) watch armed · human approval required',
]

// ── Screen 5 — Optimization Results ─────────────────────────────────────────
export const SMX_BASELINE = [
  { kpi: 'Misconnects at risk', value: '1,460' },
  { kpi: 'Critical misconnects', value: '386' },
  { kpi: 'Premium disrupted', value: '214' },
  { kpi: 'International misses', value: '132' },
  { kpi: 'Reaccommodation shortfall', value: '550 seats' },
  { kpi: 'Passenger recovery cost', value: '$980K' },
  { kpi: 'Network stability risk', value: 'Medium-high' },
  { kpi: 'BOS backlog risk', value: 'High watch' },
]

export const SMX_RECOMMENDATIONS = [
  {
    id: 'balanced', rank: 1, tone: 'green', recommended: true,
    cardTitle: 'Option 1: Balanced connection protection + targeted reaccommodation',
    trigger: 'ATL bank compression is active with JFK spillover and BOS backlog forming.',
    leversUsed: 'Hold 8 high-leverage flights ≤22 min · reaccommodate 720 · protect 386 critical · validate crew / tail / gate',
    impacted: '18 connection-critical flights · 3 hubs · 720 reaccommodated · 1,460 pax',
    assignments: [
      { kind: 'Flight', kindColor: 'grape', resource: '8 high-leverage flights', to: '≤22 min hold', action: 'Hold to protect the most connections per minute; protect ATL/JFK banks' },
      { kind: 'Passenger', kindColor: 'blue', resource: '386 critical journeys', to: 'protected list', action: 'Lock premium / international / tight / low-seat first' },
      { kind: 'Passenger', kindColor: 'blue', resource: '720 pax', to: 'earliest onward itinerary', action: 'Targeted reaccommodation by segment priority' },
      { kind: 'Crew', kindColor: 'red', resource: 'Held-flight crews', to: 'legality-checked', action: 'Confirm holds stay within duty / rest' },
      { kind: 'Gate', kindColor: 'orange', resource: 'Gates for critical flows', to: 'reserved', action: 'Hold gate feasibility ≤3 conflicts for connection banks' },
    ],
    confidence: '86% · best CX + network balance',
    whyNot: 'Moderate hold minutes on selected flights.',
    recommends: [
      'Hold 8 high-leverage flights up to 22 min; protect ATL / JFK banks.',
      'Reaccommodate 720 passengers by segment priority; protect 386 critical journeys.',
      'Validate crew legality, tail rotation cap, and gate feasibility before release.',
    ],
    kpi: [
      { k: 'Misconnects remaining', b: '1,460', a: '690', d: '−770' },
      { k: 'Critical misconnects', b: '386', a: '122', d: '−264' },
      { k: 'Premium disrupted', b: '214', a: '58', d: '−156' },
      { k: 'International misses', b: '132', a: '36', d: '−96' },
      { k: 'Avg hold minutes', b: '0', a: '18', d: '+18 (controlled)', neg: true },
      { k: 'Passenger recovery cost', b: '$980K', a: '$710K', d: '−$270K' },
      { k: 'Network stability score', b: '61', a: '78', d: '+17' },
    ],
    why: 'Passes all hard gates, best reduces critical / premium / international misconnects, uses only high-leverage holds, and lands lower cost than reaccommodation-first — highest execution confidence.',
    bestWhen: 'Use when the priority is a balanced CX + network outcome.',
    risk: 'Moderate delay minutes; watch cost cap if reaccommodation demand rises.',
    plan: {
      title: 'Connection Protection — Balanced CX + Network',
      objective: 'Cut critical misconnects while preserving ATL / JFK / BOS network stability via high-leverage holds and targeted reaccommodation.',
      phases: [
        { name: 'Phase 1 — Select & validate (T-60 to T-45m)', actions: ['Rank 18 connection-critical flights by leverage', 'Validate crew legality, tail rotation cap, and gate feasibility on 8 holds'] },
        { name: 'Phase 2 — Hold & protect (T-45 to T-20m)', actions: ['Hold 8 high-leverage flights ≤22 min; protect ATL / JFK banks', 'Lock 386 critical passengers on protected list'] },
        { name: 'Phase 3 — Reaccommodate (T-20m to T+20m)', actions: ['Reaccommodate 720 by premium / intl / tight / low-seat priority', 'Push updated connection, gate, and reaccom notifications'] },
        { name: 'Phase 4 — Downstream watch (evening → next day)', actions: ['Checkpoint JFK spillover at 20:45 ET', 'Arm BOS backlog plan; checkpoint 23:30 ET'] },
      ],
      changes: [
        { area: 'Passenger', change: 'Reaccommodate 720; protect 386 critical; selective voucher trigger' },
        { area: 'Network', change: 'Hold 8 high-leverage flights ≤22 min; protect ATL / JFK banks' },
        { area: 'Crew / Aircraft', change: 'Mandatory legality check; 5 reserves; tail readiness filter; rotation cap 30 min' },
        { area: 'Gate', change: 'Gate conflict tolerance ≤3; reserve gates for critical flows' },
      ],
      guardrails: ['Crew legality / rest', 'Tail rotation cap ≤30 delay-min', 'Gate conflict ≤3', 'Passenger priority policy', 'Cost cap $750K (watch)', 'Human approval'],
      expected: 'Misconnects 1,460→690; critical 386→122; cost $980K→$710K; network stability 61→78.',
    },
  },
  {
    id: 'reaccomfirst', rank: 2, tone: 'blue', recommended: false,
    cardTitle: 'Option 2: Proactive reaccommodation-first',
    trigger: 'Holding is constrained by crew legality or tail readiness; minimize network disruption.',
    leversUsed: 'Reaccommodate 1,050 early · hold only 3 flights · prioritize premium / intl · selective vouchers',
    impacted: '18 connection-critical flights · 1,050 reaccommodated · 1,460 pax',
    assignments: [
      { kind: 'Passenger', kindColor: 'blue', resource: '1,050 pax', to: 'earlier alternate itineraries', action: 'Front-load reaccommodation, premium / international first' },
      { kind: 'Flight', kindColor: 'grape', resource: '3 highest-leverage flights', to: '≤ short hold', action: 'Minimal holds to limit network disruption' },
      { kind: 'Passenger', kindColor: 'blue', resource: 'Displaced pax', to: 'selective vouchers', action: 'Trigger vouchers where reaccommodation is tight' },
      { kind: 'Crew', kindColor: 'red', resource: 'Held-flight crews', to: 'legality-checked', action: 'Confirm the few holds remain legal' },
    ],
    confidence: '78% · lowest network disruption',
    whyNot: 'Higher passenger recovery cost from broader reaccommodation.',
    recommends: [
      'Reaccommodate 1,050 passengers early; prioritize premium / international.',
      'Hold only 3 flights; use vouchers selectively.',
    ],
    kpi: [
      { k: 'Misconnects remaining', b: '1,460', a: '760', d: '−700' },
      { k: 'Critical misconnects', b: '386', a: '150', d: '−236' },
      { k: 'Premium disrupted', b: '214', a: '64', d: '−150' },
      { k: 'International misses', b: '132', a: '42', d: '−90' },
      { k: 'Avg hold minutes', b: '0', a: '7', d: '+7' },
      { k: 'Passenger recovery cost', b: '$980K', a: '$890K', d: '−$90K' },
      { k: 'Network stability score', b: '61', a: '74', d: '+13' },
    ],
    why: 'Lowest network disruption by leaning on early reaccommodation, but weaker on critical misconnects and higher cost.',
    bestWhen: 'Use when holding becomes infeasible due to crew legality or tail constraints.',
    risk: 'Higher passenger recovery cost; leans on seat inventory that can shift.',
    plan: {
      title: 'Connection Protection — Reaccommodation-First',
      objective: 'Minimize network disruption by front-loading reaccommodation with minimal holds.',
      phases: [
        { name: 'Phase 1 — Reaccommodate (T-45m onward)', actions: ['Reaccommodate 1,050 by premium / intl priority', 'Confirm seat inventory by cabin / route'] },
        { name: 'Phase 2 — Minimal holds (T-30m)', actions: ['Hold only 3 highest-leverage flights', 'Selective voucher trigger for displaced passengers'] },
        { name: 'Phase 3 — Downstream watch (evening)', actions: ['Watch JFK spillover; escalate to balanced if backlog rises'] },
      ],
      changes: [
        { area: 'Passenger', change: 'Reaccommodate 1,050 early; premium / intl priority; selective vouchers' },
        { area: 'Network', change: 'Hold only 3 flights; minimal bank disruption' },
        { area: 'Crew / Aircraft', change: 'Mandatory legality check; minimal tail action' },
        { area: 'Gate', change: 'Standard gate plan' },
      ],
      guardrails: ['Crew legality / rest', 'Passenger seat inventory', 'Passenger priority policy', 'Cost cap watch', 'Human approval'],
      expected: 'Misconnects 1,460→760; hold minutes held to 7; cost $980K→$890K; network stability 61→74.',
    },
  },
  {
    id: 'networkfirst', rank: 3, tone: 'orange', recommended: false,
    cardTitle: 'Option 3: Network stability-first',
    trigger: 'ATL / JFK network stability is deteriorating; protect the operation over passenger continuity.',
    leversUsed: 'Hold only 2 flights · thin 2 low-connection legs · reaccommodate remaining · protect crew / tail rotations',
    impacted: '18 connection-critical flights · 2 thinned legs · 1,460 pax',
    assignments: [
      { kind: 'Flight', kindColor: 'grape', resource: '2 highest-leverage flights', to: 'held', action: 'Minimal holds to protect network stability' },
      { kind: 'Flight', kindColor: 'yellow', resource: '2 low-connection legs', to: 'thinned', action: 'Free crew + tails; protect rotations' },
      { kind: 'Passenger', kindColor: 'blue', resource: 'Remaining at-risk pax', to: 'alternate itineraries', action: 'Reaccommodate; premium + international protection on' },
      { kind: 'Tail', kindColor: 'orange', resource: 'Coupled rotations', to: 'protected', action: 'Preserve tail/crew continuity over passenger holds' },
    ],
    confidence: '82% · best operational stability',
    whyNot: 'More passenger misconnects than the balanced option.',
    recommends: [
      'Hold only 2 flights; thin 2 low-connection legs.',
      'Reaccommodate remaining passengers; protect aircraft / crew rotations.',
    ],
    kpi: [
      { k: 'Misconnects remaining', b: '1,460', a: '980', d: '−480' },
      { k: 'Critical misconnects', b: '386', a: '240', d: '−146' },
      { k: 'Premium disrupted', b: '214', a: '126', d: '−88' },
      { k: 'International misses', b: '132', a: '78', d: '−54' },
      { k: 'Avg hold minutes', b: '0', a: '4', d: '+4' },
      { k: 'Passenger recovery cost', b: '$980K', a: '$760K', d: '−$220K' },
      { k: 'Network stability score', b: '61', a: '84', d: '+23' },
    ],
    why: 'Best operational stability by minimizing holds and protecting rotations, at the cost of the most passenger misconnects.',
    bestWhen: 'Use when ATL / JFK network stability deteriorates and the tower must protect the operation over passenger continuity.',
    risk: 'Highest passenger misconnect count and CX impact.',
    plan: {
      title: 'Connection Protection — Network Stability-First',
      objective: 'Protect ATL / JFK network stability by minimizing holds and thinning low-connection legs.',
      phases: [
        { name: 'Phase 1 — Protect rotations (T-45m)', actions: ['Hold only 2 highest-leverage flights', 'Thin 2 low-connection legs to free crew / tails'] },
        { name: 'Phase 2 — Reaccommodate (T-30m onward)', actions: ['Reaccommodate remaining passengers by priority', 'Protect crew / aircraft rotations'] },
        { name: 'Phase 3 — Backlog watch (evening → next day)', actions: ['Arm BOS backlog plan; protect international + low-seat segments'] },
      ],
      changes: [
        { area: 'Network', change: 'Hold only 2 flights; thin 2 low-connection legs' },
        { area: 'Passenger', change: 'Reaccommodate remaining; premium / intl protection on' },
        { area: 'Crew / Aircraft', change: 'Protect rotations; legality reset' },
        { area: 'Gate', change: 'Standard gate plan' },
      ],
      guardrails: ['Crew legality / rest', 'Tail rotation cap', 'Passenger priority policy', 'Human approval'],
      expected: 'Network stability 61→84; misconnects 1,460→980; cost $980K→$760K; more passenger misconnects.',
    },
  },
]

export const SMX_RANKING = [
  { rank: 1, reco: 'Balanced connection protection + targeted reaccommodation', service: 'Highest', cost: 'Medium', speed: 'High', feasibility: 'High', select: 'Selected' },
  { rank: 2, reco: 'Proactive reaccommodation-first', service: 'Medium-high', cost: 'Medium-high', speed: 'Medium', feasibility: 'Medium', select: 'Alternative' },
  { rank: 3, reco: 'Network stability-first', service: 'Medium', cost: 'Medium', speed: 'High', feasibility: 'Highest', select: 'Alternative' },
]

export const SMX_FRONTIER = {
  xLabel: 'Passenger recovery cost ($K)', yLabel: 'Misconnects remaining', zLabel: 'Execution confidence (%)',
  points: [
    { x: 980, y: 1460, z: 0, label: 'Do nothing', tone: 'gray' },
    { x: 710, y: 690, z: 86, label: 'Balanced', tone: 'green', recommended: true },
    { x: 890, y: 760, z: 78, label: 'Reaccom-first', tone: 'blue' },
    { x: 760, y: 980, z: 82, label: 'Network-first', tone: 'orange' },
  ],
}

// ── Screen 6 — Approval & Execution ─────────────────────────────────────────
export const SMX_APPROVAL = {
  selected: 'Balanced connection protection + targeted reaccommodation',
  action: 'Hold 8 high-leverage flights ≤22 min + reaccommodate 720 + protect 386 critical + validate crew / tail / gate',
  summary: [
    { field: 'Decision owner', value: 'OCC duty manager' },
    { field: 'Approval type', value: 'Human, multi-role (pax ops · network · crew · aircraft · gate)' },
    { field: 'Auto-execution', value: 'Disabled' },
    { field: 'Decision deadline', value: 'Before the ATL connection bank closes' },
    { field: 'Audit status', value: 'Decision log will be created' },
  ],
  execItems: [
    { item: 'Hold instruction', target: 'OCC / network operations', action: 'Hold 8 connection-critical departures up to 22 min' },
    { item: 'Passenger protection list', target: 'Passenger operations / customer recovery', action: 'Protect 386 critical passengers first' },
    { item: 'Reaccommodation queue', target: 'Passenger reaccommodation workflow', action: 'Rebook 720 passengers by segment priority' },
    { item: 'Crew legality validation', target: 'Crew scheduling / crew ops', action: 'Confirm held flights remain legal' },
    { item: 'Tail readiness validation', target: 'Aircraft / tail planning', action: 'Confirm 9 monitored tails stay within rotation cap' },
    { item: 'Gate coordination', target: 'Gate / station workflow', action: 'Reserve gates for critical connection flows' },
    { item: 'Passenger communications', target: 'Customer messaging / app / airport ops', action: 'Push updated connection, gate, and reaccom notifications' },
    { item: 'Audit trail', target: 'Decision log', action: 'Store selected option, assumptions, rejected alternatives, approvals' },
  ],
  rationale: 'Best CX + network balance. Uses only high-leverage holds within legality, protects premium / international / tight journeys, and lands lower cost than reaccommodation-first. Cuts critical misconnects 386 → 122 and cost $980K → $710K.',
  constraints: ['Crew legality / duty-rest', 'Aircraft readiness / rotation cap', 'Gate conflict cap (≤3)', 'Passenger priority policy', 'Cost cap $750K (watch)', 'Network stability preserved', 'Human approval'],
}

// ── Screen 7 — Test & Learn ─────────────────────────────────────────────────
export const SMX_OUTCOMES = [
  { metric: 'Misconnects remaining', pred: '690', actual: '735', learn: 'Gate transfer friction slightly underestimated' },
  { metric: 'Critical misconnects', pred: '122', actual: '134', learn: 'International and tight connections need higher weight' },
  { metric: 'Premium disrupted', pred: '58', actual: '52', learn: 'Premium protection performed better than expected' },
  { metric: 'International misses', pred: '36', actual: '41', learn: 'International rebooking seat availability was optimistic' },
  { metric: 'Passenger recovery cost', pred: '$710K', actual: '$760K', learn: 'Voucher / hotel cost above model' },
  { metric: 'Average hold minutes', pred: '18', actual: '21', learn: 'ATC release timing delayed some protected flights' },
  { metric: 'Network stability score', pred: '78', actual: '76', learn: 'Minimal network degradation; acceptable' },
  { metric: 'BOS backlog', pred: '160', actual: '185', learn: 'Downstream backlog model needs adjustment' },
]

export const SMX_INSIGHTS = [
  'Gate congestion materially changed connection feasibility — add dynamic gate-walk and deplaning-time adjustment to the misconnect model.',
  'Premium protection logic worked — keep the premium / high-value segment priority on by default.',
  'International reaccommodation was harder than expected — raise international segment weight and seat-inventory uncertainty band.',
  'The balanced option avoided network instability — keep CX + network scoring balanced for ATL-heavy bank scenarios.',
  'BOS spillover was slightly underestimated — arm the BOS backlog watch earlier when JFK spillover exceeds threshold.',
]

export const SMX_LEARN = {
  accuracy: [
    { label: 'Overall prediction accuracy', value: '87%' },
    { label: 'Premium protection', value: 'Better than modeled' },
    { label: 'Passenger recovery cost', value: '±$50K' },
    { label: 'Misconnects remaining', value: '±45' },
  ],
  recalibration: [
    { label: 'Misconnect model', before: 'w=0.58', after: 'w=0.69', delta: '+gate congestion', note: 'Increase weight for gate congestion and transfer-time variance' },
    { label: 'Passenger priority model', before: '0.60', after: '0.72', delta: '+intl / low-seat', note: 'Increase weighting for international + low-seat-availability passengers' },
    { label: 'Network model', before: 'w=0.55', after: 'w=0.64', delta: '+hold penalty', note: 'Penalize hold strategies when crew legality or tail rotation risk rises' },
  ],
  patterns: [
    'ATL bank compression spills into the JFK late bank within one bank — reaccommodate before JFK closes.',
    'Gate congestion changes connection feasibility more than delay minutes alone capture.',
    'BOS next-day backlog forms when JFK spillover exceeds threshold — arm the watch earlier.',
  ],
  twin: { nodesEnriched: 18, lanesEnriched: 6, before: '74%', after: '87%', summary: '18 connection-critical flight twins · 6 hub-bank lanes enriched — passenger / network / crew / aircraft twins updated with realized connection-protection outcomes' },
}

export const SMX_SAVE = {
  name: 'ATL → JFK → BOS Connection Protection — Balanced CX + Network',
  tags: ['PASSENGER MISCONNECT EXPOSURE', 'CONNECTION PROTECTION', 'ATL/JFK/BOS', 'BALANCED CX + NETWORK', 'PREMIUM + INTL PROTECTION', 'L0/L1/L2 CASCADE'],
  reusableFor: [
    'tight-bank compression',
    'downstream bank spillover',
    'gate-congestion misconnects',
    'premium / international protection',
    'next-day passenger backlog',
  ],
}

// ── Per-screen loading transition lines ─────────────────────────────────────
export const SMX_LOADING_LINES = {
  1: ['Ingesting passenger · network · crew · aircraft · gate feeds…', 'Scoring misconnect exposure across ATL / JFK / BOS banks…', 'Segmenting premium / international / tight / low-seat passengers…', 'Signal deep-dive ready.'],
  2: ['Loading objective framework…', 'Weighting CX / network stability / cost / feasibility…', 'Objectives ready.'],
  3: ['Loading protection levers…', 'Applying balanced hold + reaccommodation configuration…', 'Levers ready.'],
  4: ['Assembling scenario setup…', 'Running legality + tail + gate + seat-inventory checks…', 'Summary ready.'],
  5: ['Running pre-bank optimization + real-time protection sim…', 'Comparing balanced / reaccom-first / network-first strategies…', 'Ranking recommendations…'],
  6: ['Assembling execution package…', 'Validating legality + rotation + gate guardrails…', 'Ready for OCC approval.'],
  7: ['Capturing realized passenger outcomes…', 'Comparing predicted vs actual…', 'Updating priors + connection-protection playbook…'],
}
