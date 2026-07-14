// Signal 3 — Uncovered Trip Detected — Time-to-Departure Critical
// Dedicated 7-screen deep-dive: multiple concurrent uncovered trips at ATL after
// crew sick calls + ~2% voluntary acceptance, coupled to JFK/LGA/MCO/DTW under
// T-5h departure pressure. Speed-first, legality-gated, network-aware recovery —
// reserve-first coverage that blocks harmful donor swaps to prevent Level 1.
// Exports follow the shared workflow-panel contract (SUT_ prefix); all values
// are illustrative UI mock data, not actual Delta operational data.

export const SUT_ACCENT = 'red'

// ── Screen 1 — Signal Deep Dive ─────────────────────────────────────────────
export const SUT_SIGNAL = {
  sentinel: 'Crew Coverage Sentinel',
  bannerText: 'Uncovered Trip Detected — 9 open trips at ATL after sick calls, ~2% voluntary acceptance, first critical departure at T-4h 58m.',
  card: [
    { label: 'Signal class', value: 'Crew coverage / open-trip cascade' },
    { label: 'Severity', value: 'CRITICAL · open trips inside T-6h, acceptance ~2%' },
    { label: 'Detection', value: '13:40 ET' },
    { label: 'Open trips', value: '9 · 6 inside T-5h' },
    { label: 'First critical departure', value: 'DL1842 ATL–JFK · T-4h 58m' },
    { label: 'Acceptance probability', value: '2.1% (voluntary pickup ineffective)' },
    { label: 'Coverage probability', value: '46% no action → 78% with plan' },
    { label: 'Cascade state', value: 'L0 active · L1 trigger risk in 90–120 min' },
  ],
  sourceChips: ['CREW', 'NETWORK', 'AIRCRAFT', 'PASSENGER', 'POLICY', 'DERIVED'],
  detail: 'Nine concurrent trips are uncovered after sick calls and low voluntary pickup. At ~2% acceptance, waiting is ineffective — the tower must shift from monitoring to immediate recovery. Recovery must be solved with aircraft, passenger, and cost impacts, not crew in isolation: 4 tails are coupled to exposed flights and 540 connections are exposed.',
  conditions: [
    'Open trips are inside T-6h with acceptance probability near 2%,',
    'Reserve coverage (46% without action) is below projected demand,',
    'Only 7 of 14 qualified reserves are legal + location-feasible in time,',
    '11 swap candidates exist but 4 create donor-flight risk.',
  ],
  conditionsNote: 'Crew, Network, Aircraft, Passenger, and Cost Twins use coverage probability, reserve depletion, propagation likelihood, passenger-impact score, and cost-to-recover as state variables, with crew legality and report-time feasibility as critical events.',
}

export const SUT_DISRUPTION = {
  detected: '13:40 ET',
  source: 'Crew sick calls + low voluntary pickup left 9 open trips at ATL; only 7 of 14 reserves are legal/location-feasible, and 4 tails are coupled to exposed flights',
  cascade: 'ATL open trips (L0 active) → zero-sum crew swaps (L1 trigger risk 90–120 min) → JFK/DTW next-day cross-hub contamination (L2 not active)',
}

export const SUT_IMPACT = [
  { label: 'Open trips', value: '9', color: 'red' },
  { label: 'Critical inside T-5h', value: '6', color: 'red' },
  { label: 'Acceptance probability', value: '2.1%', color: 'orange' },
  { label: 'At-risk passengers', value: '1,860', color: 'violet' },
  { label: 'Misconnects at risk', value: '540', color: 'blue' },
]

// Optional Screen-1 blocks (render only when present)
export const SUT_METRICS = [
  { label: 'Coverage probability (no action)', value: '46%', note: 'high cancellation exposure without intervention' },
  { label: 'Legal + location-feasible reserves', value: '7 of 14', note: 'only these can report in time' },
  { label: 'Crew swap candidates', value: '11', note: '4 create donor-flight risk' },
  { label: 'Deadhead candidates', value: '6', note: 'depend on seat inventory + arrival timing' },
  { label: 'Aircraft / tail coupling', value: '4 tails', note: 'crew action impacts tail rotations' },
  { label: 'Estimated cost exposure', value: '$650K–$1.4M', note: 'recovery + compensation + delay + reaccom' },
]

export const SUT_HUB_IMPACT = [
  { hub: 'ATL evening bank', state: 'Open trips active', crew: '5 pilots · 4 cabin', flights: '9 open · 6 inside T-5h', pax: 'Sick calls + ~2% pickup', level: 'L0 active' },
  { hub: 'JFK / LGA / MCO / DTW', state: 'Coupled exposure', crew: 'Donor-swap risk', flights: '4 tails linked', pax: 'Connection + rotation coupling', level: 'L1 trigger risk' },
  { hub: 'JFK / DTW next-day', state: 'Contamination watch', crew: 'Rest-window risk', flights: 'ATL-P771 pairing', level: 'L2 not active' },
]

export const SUT_ROOT_CAUSE = [
  { domain: 'Crew', pct: 52, note: 'Sick calls, ~2% acceptance, legality limits, reserves not all location-feasible' },
  { domain: 'Network', pct: 18, note: 'ATL evening bank dependency, JFK connection exposure, downstream rotations' },
  { domain: 'Passenger', pct: 13, note: '540 projected misconnects; premium exposure on ATL–LAX' },
  { domain: 'Aircraft', pct: 11, note: '4 tails tied to exposed crew; 1 tail has readiness delay' },
  { domain: 'External / ATC', pct: 6, note: 'Minor JFK flow delay compressing connections' },
]

export const SUT_CASCADE = [
  { level: 'Level 0 — Open trips', status: 'Active', color: 'red', trigger: '9 open trips, 6 inside T-5h, acceptance ~2%', action: 'Run live open-trip recovery simulation now' },
  { level: 'Level 1 — Zero-sum crew swaps', status: 'Watch', color: 'orange', trigger: 'Swaps create >3 donor-flight risks or coverage falls below 0.8x', action: 'Block harmful swaps; require network planner review' },
  { level: 'Level 2 — Cross-hub contamination', status: 'Not active', color: 'yellow', trigger: 'JFK/DTW next-day pairings lose crew or crewless aircraft block stations', action: 'Start 24–72h reset simulation' },
]

export const SUT_PRECEDENTS = [
  { episode: 'ATL evening bank crew gap replay', similarity: 84, pattern: 'Multiple open trips, low reserve flexibility', outcome: '3 cancellations, 11 delays', lesson: 'Escalate before T-4h' },
  { episode: 'JFK inbound crew shortage', similarity: 76, pattern: 'Captain shortage + connection risk', outcome: 'Crew swap caused donor delay', lesson: 'Avoid unscored donor pulls' },
  { episode: 'Holiday peak acceptance gap', similarity: 72, pattern: 'Low voluntary pickup, high pax load', outcome: 'High incentive cost', lesson: 'Trigger incentive early only for critical flights' },
]

export const SUT_HYPOTHESIS = 'If Delta simulates immediately instead of waiting on ~2% voluntary pickup — assigning the 7 legal/location-feasible reserves to critical trips first, allowing only network-safe swaps, and applying controlled delays within legality — then it can legally cover the critical open trips before the T-2h execution lock, prevent the Level 1 zero-sum cascade, and hold recovery cost and misconnects within tolerance.'

// ── Screen 2 — Objectives & KPIs ────────────────────────────────────────────
export const SUT_PRIMARY_OBJECTIVES = [
  { value: 'Legally cover critical open trips before T-2h lock', desc: 'Acceptance is too low for passive waiting; act now while avoiding Level 1' },
  { value: 'Avoid cancellations on connection-critical flights', desc: 'DL1842 and DL501 carry high connection / premium exposure' },
  { value: 'Prevent Level 1 zero-sum cascade', desc: 'Swaps that create donor open trips must be blocked' },
  { value: 'Protect aircraft-tail continuity', desc: '4 tails are coupled to exposed flights' },
  { value: 'Reduce passenger misconnects', desc: '540 misconnects projected' },
]
export const SUT_PRIMARY_DEFAULT = 'Legally cover critical open trips before T-2h lock'

export const SUT_SECONDARY_OBJECTIVES = [
  { value: 'Use reserves before harmful swaps', desc: 'Swaps may create new open trips' },
  { value: 'Minimize donor-flight disruption', desc: 'Prevent zero-sum cascade into other banks' },
  { value: 'Keep recovery cost within tolerance', desc: 'Incentive / deadhead options carry cost trade-offs' },
  { value: 'Preserve next-day launch', desc: 'Pairing ATL-P771 creates next-day exposure' },
  { value: 'Protect premium / high-value passengers', desc: 'Premium exposure concentrated on ATL–LAX' },
]
export const SUT_SECONDARY_DEFAULT = ['Use reserves before harmful swaps', 'Minimize donor-flight disruption']

export const SUT_KPI_OPTIONS = [
  { value: 'Open trips resolved', type: 'Operational', rec: true },
  { value: 'Crew-related cancellations avoided', type: 'Operational', rec: true },
  { value: 'Legality breaches avoided', type: 'Compliance', rec: true },
  { value: 'Donor-flight risk count', type: 'Operational', rec: true },
  { value: 'Passenger misconnects avoided', type: 'CX', rec: true },
  { value: 'Reserve-hour utilization', type: 'Resource', rec: true },
  { value: 'Cost-to-recover', type: 'Financial', rec: true },
  { value: 'Recovery time', type: 'Operational', rec: false },
  { value: 'Deadhead usage', type: 'Resource', rec: false },
  { value: 'Premium customers protected', type: 'CX', rec: false },
  { value: 'Recommendation acceptance', type: 'Governance', rec: false },
]
export const SUT_KPI_DEFAULT = SUT_KPI_OPTIONS.filter(k => k.rec).map(k => k.value)

// ── Screen 3 — Simulation Levers ────────────────────────────────────────────
export const SUT_LEVER_GROUPS = [
  {
    group: 'A', title: 'Crew recovery levers', color: 'red',
    levers: [
      { id: 'reserveActivation', label: 'Reserve activation', control: 'select', options: ['0 reserves', '7 legal/feasible', '14 reserves'], recommended: '7 legal/feasible', why: 'Legal + qualified + report-time feasible only' },
      { id: 'reservePriority', label: 'Reserve prioritization', control: 'select', options: ['Criticality first', 'FIFO', 'Cost-min'], recommended: 'Criticality first', why: 'Must preserve report-time feasibility' },
      { id: 'crewSwap', label: 'Crew swap', control: 'select', options: ['Off', 'Network-safe only', 'Aggressive'], recommended: 'Network-safe only', why: 'Aggressive creates donor-flight risk' },
      { id: 'reassign', label: 'Reassign within pairing', control: 'select', options: ['Off', '3 pairings', 'Broad'], recommended: '3 pairings', why: 'Pairing validity required' },
      { id: 'deadhead', label: 'Deadhead', control: 'select', options: ['0', '4 crew', '6 crew'], recommended: '4 crew', why: 'Seat availability + arrival timing' },
      { id: 'incentive', label: 'Incentive outreach', control: 'select', options: ['Off', '3 critical trips', 'Broad'], recommended: '3 critical trips', why: 'Policy + cost guardrails; treat as upside' },
    ],
  },
  {
    group: 'B', title: 'Network levers', color: 'grape',
    levers: [
      { id: 'controlledDelay', label: 'Controlled delay', control: 'select', options: ['0 min', '35 min', '90 min'], recommended: '35 min', why: 'Cannot trigger legality breach' },
      { id: 'cancelPool', label: 'Cancellation candidate pool', control: 'select', options: ['0 flights', '2 low-criticality', '5 flights'], recommended: '2 low-criticality', why: 'OCC approval required' },
      { id: 'bankProtect', label: 'Bank protection', control: 'switch', recommended: true, onLabel: 'ATL 18:00–21:00 on', why: 'Protect connection-heavy bank' },
    ],
  },
  {
    group: 'C', title: 'Aircraft levers', color: 'orange',
    levers: [
      { id: 'tailSwap', label: 'Tail swap', control: 'select', options: ['0', '2 ready tails', '3 tails'], recommended: '2 ready tails', why: 'Maintenance readiness required' },
      { id: 'resequence', label: 'Rotation resequencing', control: 'select', options: ['Off', 'DL501 + DL742', 'Broad'], recommended: 'DL501 + DL742', why: 'Avoid downstream aircraft breakage' },
    ],
  },
  {
    group: 'D', title: 'Passenger · cost · recovery levers', color: 'blue',
    levers: [
      { id: 'earlyReaccom', label: 'Early reaccommodation', control: 'select', options: ['0 pax', '420 high-risk', '1,000 pax'], recommended: '420 high-risk', why: 'Capacity-dependent' },
      { id: 'premiumProtect', label: 'Premium protection (DL501)', control: 'switch', recommended: true, onLabel: 'On', why: 'Protect premium / high-priority segments' },
      { id: 'costPosture', label: 'Cost posture', control: 'select', options: ['Cost-min', 'Balanced', 'Reliability-first'], recommended: 'Balanced', why: 'Within cost tolerance; reliability override for top 3' },
      { id: 'nextDayWatch', label: 'Next-day restart watch (ATL-P771)', control: 'select', options: ['Off', 'Watch', 'Active'], recommended: 'Watch', why: 'Escalate if Level 1 appears' },
    ],
  },
]
export const SUT_ALL_LEVERS = SUT_LEVER_GROUPS.flatMap(g => g.levers)
export const SUT_LEVER_DEFAULTS = Object.fromEntries(SUT_ALL_LEVERS.map(l => [l.id, l.recommended]))

// ── Screen 4 — Simulation Summary ───────────────────────────────────────────
export const SUT_SCENARIO = {
  name: 'ATL Multi-Open Trip Recovery — T-5h',
  signal: 'Uncovered Trip Detected — Time-to-Departure Critical',
  objective: 'Cover critical open trips legally before the T-2h execution lock and prevent Level 1 cascade, weighting reliability 40% / legality 25% / CX 15% / resource efficiency 10% / cost 10%.',
  method: 'Event-triggered live simulation (speed-first, legality-gated, network-aware); reserve, swap, deadhead, delay, tail, passenger, and incentive levers checked across all twins vs a do-nothing baseline.',
}
export const SUT_SCOPE = [
  { item: 'Open trips', value: '9 · 6 critical inside T-5h' },
  { item: 'Open crew roles', value: '5 pilots · 4 cabin positions' },
  { item: 'Hubs', value: 'ATL primary · JFK / LGA / MCO / DTW coupled' },
  { item: 'Cascade state', value: 'L0 active · L1 prevention · L2 not active' },
  { item: 'Decision deadline', value: 'T-3h approval · T-2h execution lock' },
  { item: 'Horizon', value: 'Live recovery + next-day restart watch' },
]
export const SUT_VALIDATION = [
  '7 reserves remain legal and report-feasible at run time',
  '4 deadhead seats remain available until dispatch decision',
  'Controlled delays under 35 min do not break duty / rest legality',
  'No illegal crew assignment allowed (hard gate)',
  'Swaps that create higher-risk donor flights are blocked (hard gate)',
  'Tail swaps require aircraft readiness + maintenance feasibility',
  'If unresolved open trips remain >3 after reserve allocation, escalate to Level 1 containment',
  'Human approval required before execution',
]

// ── Screen 5 — Optimization Results ─────────────────────────────────────────
export const SUT_BASELINE = [
  { kpi: 'Open trips unresolved', value: '9' },
  { kpi: 'Cancellations likely', value: '5' },
  { kpi: 'Average recovery time', value: '4.8h' },
  { kpi: 'Misconnects at risk', value: '540' },
  { kpi: 'Donor-flight risk count', value: '4' },
  { kpi: 'Cost-to-recover', value: '$1.4M' },
  { kpi: 'Level 1 escalation probability', value: '48%' },
]

export const SUT_RECOMMENDATIONS = [
  {
    id: 'reservefirst', rank: 1, tone: 'green', recommended: true,
    cardTitle: 'Option 1: Reserve-first critical coverage + targeted delay',
    trigger: '9 open trips active at ATL with ~2% acceptance and 6 critical inside T-5h.',
    leversUsed: 'Assign 7 reserves · delay DL1842/DL501 25–35 min · 2 tail swaps · reaccommodate 420',
    impacted: '9 open trips · 4 coupled hubs · 420 reaccommodated · 1,860 pax',
    confidence: '88% · best legality + speed + CX balance',
    whyNot: 'Uses most of the reserve pool.',
    recommends: [
      'Assign 7 legal/location-feasible reserves to critical flights first.',
      'Delay DL1842 25 min and DL501 30 min within legality; protect the ATL bank.',
      'Use 2 ready-tail swaps and reaccommodate 420 high-risk passengers.',
    ],
    kpi: [
      { k: 'Open trips resolved', b: '0 / 9', a: '7 / 9', d: '+7' },
      { k: 'Cancellations', b: '5', a: '1', d: '−4' },
      { k: 'Misconnects at risk', b: '540', a: '230', d: '−310' },
      { k: 'Donor-flight risks', b: '4', a: '1', d: '−3' },
      { k: 'Reserve hours used', b: '0', a: '112', d: '+112 (controlled)', neg: true },
      { k: 'Cost-to-recover', b: '$1.4M', a: '$920K', d: '−$480K' },
      { k: 'Level 1 probability', b: '48%', a: '21%', d: '−27 pts' },
    ],
    why: 'Passes all hard gates, resolves the most critical trips inside T-5h, avoids risky donor pulls, and cuts Level 1 risk from 48% to 21% with the lowest misconnect exposure — highest execution confidence.',
    bestWhen: 'Use when reliability and passenger protection outweigh reserve conservation.',
    risk: 'Consumes most of the reserve pool; watch cost cap if incentive demand rises.',
    plan: {
      title: 'Open Trip Recovery — Reserve-First Critical Coverage',
      objective: 'Legally cover critical open trips before the T-2h lock and prevent Level 1 via reserve-first assignment and controlled delays.',
      phases: [
        { name: 'Phase 1 — Validate & assign (T-4h 30m to T-4h 20m)', actions: ['Filter reserves to 7 legal/location-feasible', 'Assign to critical flights by criticality; confirm report feasibility'] },
        { name: 'Phase 2 — Protect banks (T-4h 20m to T-4h)', actions: ['Delay DL1842 25 min, DL501 30 min within legality', 'Swap 2 ready tails into protected flights'] },
        { name: 'Phase 3 — Reaccommodate (T-4h to T-3h 40m)', actions: ['Pre-protect 420 high-risk connections', 'Enable premium protection on DL501'] },
        { name: 'Phase 4 — Watch (T-3h onward)', actions: ['Arm next-day restart watch for ATL-P771', 'Escalate to Level 1 containment if >3 trips remain'] },
      ],
      changes: [
        { area: 'Crew', change: 'Assign 7 reserves; network-safe swaps only; 4 deadheads; selective incentive on 3 critical trips' },
        { area: 'Network', change: 'Controlled delay ≤35 min on DL1842/DL501; cancel pool of 2 low-criticality flights' },
        { area: 'Aircraft', change: '2 tail swaps; resequence DL501 + DL742' },
        { area: 'Passenger', change: 'Reaccommodate 420 high-risk; premium protection on DL501' },
      ],
      guardrails: ['Crew duty / rest legality', 'Crew qualification / pairing validity', 'Aircraft readiness', 'No harmful donor swaps', 'Cost tolerance (balanced)', 'Human approval'],
      expected: 'Open trips 0/9→7/9; cancellations 5→1; misconnects 540→230; Level 1 48%→21%; cost $1.4M→$920K.',
    },
  },
  {
    id: 'swapconserve', rank: 2, tone: 'blue', recommended: false,
    cardTitle: 'Option 2: Crew swap + selective reserve conservation',
    trigger: 'Preserving the reserve pool for later banks is the priority.',
    leversUsed: '5 reserves · 3 safe swaps · 3 deadheads · delay 4 flights',
    impacted: '9 open trips · 4 coupled hubs · 1,860 pax',
    confidence: '73% · preserves reserve pool',
    whyNot: 'Higher donor-flight risk than the reserve-first option.',
    recommends: [
      'Use 5 reserves and 3 network-safe swaps; add 3 deadheads.',
      'Delay 4 flights within legality to buy report time.',
    ],
    kpi: [
      { k: 'Open trips resolved', b: '0 / 9', a: '7 / 9', d: '+7' },
      { k: 'Cancellations', b: '5', a: '2', d: '−3' },
      { k: 'Misconnects at risk', b: '540', a: '280', d: '−260' },
      { k: 'Donor-flight risks', b: '4', a: '3', d: '−1' },
      { k: 'Reserve hours used', b: '0', a: '82', d: '+82' },
      { k: 'Cost-to-recover', b: '$1.4M', a: '$840K', d: '−$560K' },
      { k: 'Level 1 probability', b: '48%', a: '34%', d: '−14 pts' },
    ],
    why: 'Preserves reserves and lands the lowest cost, but leans on swaps that raise donor-flight risk and Level 1 probability.',
    bestWhen: 'Use when the reserve pool must be conserved for later banks and donor risk is acceptable.',
    risk: 'Higher donor-flight risk; weaker Level 1 prevention.',
    plan: {
      title: 'Open Trip Recovery — Swap + Reserve Conservation',
      objective: 'Cover critical trips while conserving reserves via network-safe swaps and deadheads.',
      phases: [
        { name: 'Phase 1 — Swap & conserve (T-4h 30m)', actions: ['Apply 3 network-safe swaps', 'Assign 5 reserves to highest-criticality trips'] },
        { name: 'Phase 2 — Deadhead & delay (T-4h 10m)', actions: ['Position 3 deadhead crews', 'Delay 4 flights within legality'] },
        { name: 'Phase 3 — Watch (T-3h onward)', actions: ['Monitor donor-flight risk; escalate if >3 trips remain'] },
      ],
      changes: [
        { area: 'Crew', change: '5 reserves; 3 network-safe swaps; 3 deadheads' },
        { area: 'Network', change: 'Controlled delay on 4 flights' },
        { area: 'Aircraft', change: 'Minimal tail action' },
        { area: 'Passenger', change: 'Standard reaccommodation' },
      ],
      guardrails: ['Crew legality / rest', 'No harmful donor swaps', 'Pairing validity', 'Cost tolerance', 'Human approval'],
      expected: 'Open trips 0/9→7/9; cost $1.4M→$840K; donor risk 4→3; Level 1 48%→34%.',
    },
  },
  {
    id: 'protectbank', rank: 3, tone: 'orange', recommended: false,
    cardTitle: 'Option 3: Cancel low-criticality flights to protect the core bank',
    trigger: 'Unresolved open trips remain after T-3h and the core bank must be protected.',
    leversUsed: 'Cancel DL3108 + 1 low-load ATL turn · reassign crew to DL1842/DL501 · reaccommodate 310',
    impacted: '9 open trips · 2 planned cancellations · 1,860 pax',
    confidence: '81% · lowest unresolved open trips',
    whyNot: 'Visible cancellations affect CX.',
    recommends: [
      'Cancel DL3108 and one low-load ATL turn; reassign crew to DL1842/DL501.',
      'Reaccommodate 310 passengers by priority.',
    ],
    kpi: [
      { k: 'Open trips resolved', b: '0 / 9', a: '8 / 9', d: '+8' },
      { k: 'Cancellations', b: '5', a: '2', d: '−3 (planned)' },
      { k: 'Misconnects at risk', b: '540', a: '310', d: '−230' },
      { k: 'Donor-flight risks', b: '4', a: '1', d: '−3' },
      { k: 'Reserve hours used', b: '0', a: '96', d: '+96' },
      { k: 'Cost-to-recover', b: '$1.4M', a: '$980K', d: '−$420K' },
      { k: 'Level 1 probability', b: '48%', a: '24%', d: '−24 pts' },
    ],
    why: 'Resolves the most open trips and protects the core bank through controlled cancellation, at the cost of visible cancellations and CX impact.',
    bestWhen: 'Use when open trips remain after T-3h and the system must protect the core bank.',
    risk: 'Visible cancellations; higher CX and rebooking burden.',
    plan: {
      title: 'Open Trip Recovery — Protect the Core Bank',
      objective: 'Minimize unresolved open trips by controlled cancellation of low-criticality flights.',
      phases: [
        { name: 'Phase 1 — Select cancellations (T-3h)', actions: ['Confirm DL3108 + 1 low-load ATL turn with OCC', 'Reassign freed crew to DL1842/DL501'] },
        { name: 'Phase 2 — Reaccommodate (T-3h onward)', actions: ['Reaccommodate 310 passengers by priority', 'Protect premium segments'] },
        { name: 'Phase 3 — Watch (evening)', actions: ['Arm next-day restart watch for ATL-P771'] },
      ],
      changes: [
        { area: 'Network', change: 'Cancel DL3108 + 1 low-load ATL turn (OCC approval)' },
        { area: 'Crew', change: 'Reassign freed crew to critical flights' },
        { area: 'Passenger', change: 'Reaccommodate 310; premium protection on' },
        { area: 'Aircraft', change: 'Free tails from cancelled turns' },
      ],
      guardrails: ['Crew legality / rest', 'OCC cancellation approval', 'Passenger priority policy', 'Human approval'],
      expected: 'Open trips 0/9→8/9; cancellations 2 planned; misconnects 540→310; Level 1 48%→24%.',
    },
  },
]

export const SUT_RANKING = [
  { rank: 1, reco: 'Reserve-first critical coverage + targeted delay', service: 'Highest', cost: 'Medium', speed: 'High', feasibility: 'High', select: 'Selected' },
  { rank: 2, reco: 'Crew swap + selective reserve conservation', service: 'Medium', cost: 'Lowest', speed: 'Medium', feasibility: 'Medium', select: 'Alternative' },
  { rank: 3, reco: 'Cancel low-criticality flights to protect core bank', service: 'Medium', cost: 'Medium', speed: 'High', feasibility: 'Highest', select: 'Alternative' },
]

export const SUT_FRONTIER = {
  xLabel: 'Cost-to-recover ($K)', yLabel: 'Open trips unresolved', zLabel: 'Execution confidence (%)',
  points: [
    { x: 1400, y: 9, z: 0, label: 'Do nothing', tone: 'gray' },
    { x: 920, y: 2, z: 88, label: 'Reserve-first', tone: 'green', recommended: true },
    { x: 840, y: 2, z: 73, label: 'Swap-conserve', tone: 'blue' },
    { x: 980, y: 1, z: 81, label: 'Protect-bank', tone: 'orange' },
  ],
}

// ── Screen 6 — Approval & Execution ─────────────────────────────────────────
export const SUT_APPROVAL = {
  selected: 'Reserve-first critical coverage + targeted delay',
  action: 'Assign 7 reserves + delay DL1842/DL501 25–35 min + 2 tail swaps + reaccommodate 420 + validate crew / tail / gate',
  summary: [
    { field: 'Decision owner', value: 'OCC duty manager' },
    { field: 'Approval type', value: 'Human, multi-role (crew · aircraft · network · pax ops)' },
    { field: 'Auto-execution', value: 'Disabled' },
    { field: 'Decision deadline', value: 'T-3h approval · T-2h execution lock' },
    { field: 'Audit status', value: 'Decision log will be created' },
  ],
  execItems: [
    { item: 'Assign reserves', target: 'Crew scheduling / crew ops', action: 'Assign 7 legal/location-feasible reserves to priority flights (SLA T-4h 20m)' },
    { item: 'Notify crew', target: 'Crew communications', action: 'Push report instructions and acknowledgment request' },
    { item: 'Confirm tail swaps', target: 'Aircraft / tail planning', action: 'Confirm 2 ready-tail swaps and readiness (SLA T-4h 05m)' },
    { item: 'Apply controlled delay', target: 'OCC / flight operations', action: 'Delay DL1842 by 25 min, DL501 by 30 min (SLA T-3h 50m)' },
    { item: 'Release reaccommodation', target: 'Passenger reaccommodation workflow', action: 'Pre-protect 420 high-risk connections (SLA T-3h 40m)' },
    { item: 'Final approval', target: 'OCC duty manager', action: 'Final approval and execution lock (SLA T-3h 30m)' },
    { item: 'Audit trail', target: 'Control tower decision log', action: 'Store selected option, constraints, rationale, approvals' },
  ],
  rationale: 'Best legality + speed + CX balance. Assigns only legal/location-feasible reserves, avoids harmful donor pulls, and protects premium / connection-critical journeys. Resolves 7 of 9 open trips, cuts Level 1 risk 48% → 21%, and lands cost $1.4M → $920K.',
  constraints: ['Crew duty / rest legality', 'Crew qualification / type rating', 'Pairing validity', 'Aircraft readiness', 'No harmful donor swaps', 'Passenger priority rules', 'Cost tolerance', 'Human approval'],
}

// ── Screen 7 — Test & Learn ─────────────────────────────────────────────────
export const SUT_OUTCOMES = [
  { metric: 'Open trips resolved', pred: '7 / 9', actual: '8 / 9', learn: 'One incentive pickup occurred after the reserve plan' },
  { metric: 'Cancellations', pred: '1', actual: '1', learn: 'Option performed as expected' },
  { metric: 'Average recovery time', pred: '1.9h', actual: '2.3h', learn: 'Crew notification response slower than modeled' },
  { metric: 'Misconnects at risk', pred: '230', actual: '260', learn: 'Gate delay added passenger exposure' },
  { metric: 'Cost-to-recover', pred: '$920K', actual: '$980K', learn: 'Extra deadhead + passenger handling cost' },
  { metric: 'Level 1 escalation', pred: '21%', actual: 'Not triggered', learn: 'Donor-swap blocking worked' },
  { metric: 'Execution confidence', pred: '88%', actual: '84%', learn: 'Aircraft approval took longer than assumed' },
]

export const SUT_INSIGHTS = [
  'Passive acceptance stayed too low to rely on — keep the default as "simulate immediately," not "wait for pickup."',
  'The reserve-first plan avoided Level 1 — preserve the donor-risk blocker in future T-5h uncovered-trip runs.',
  'Tail readiness approval added friction — add an aircraft-planner pre-check earlier in the lever screen.',
  'Early passenger reaccommodation cut CX exposure — promote it when misconnects exceed threshold.',
  'Incentive pickup helped but was not predictable — treat incentive as upside, not the primary recovery path.',
]

export const SUT_LEARN = {
  accuracy: [
    { label: 'Overall prediction accuracy', value: '86%' },
    { label: 'Donor-swap blocking', value: 'Held (Level 1 not triggered)' },
    { label: 'Cost-to-recover', value: '±$60K' },
    { label: 'Open trips resolved', value: '+1 vs predicted' },
  ],
  recalibration: [
    { label: 'Coverage probability model', before: 'w=0.40', after: 'w=0.28', delta: '−voluntary acceptance', note: 'Reduce weight of voluntary acceptance inside T-6h' },
    { label: 'Acceptance model', before: '2.0%', after: 'sick-call adj', delta: '+recalibrate', note: 'Recalibrate acceptance for sick-call-triggered open trips' },
    { label: 'Recommendation logic', before: 'w=0.55', after: 'w=0.66', delta: '+donor penalty', note: 'Penalize options with high donor-flight dependency' },
  ],
  patterns: [
    'Voluntary acceptance inside T-6h is too low to rely on — simulate immediately.',
    'Reserve-first plans avoid Level 1 when donor swaps are blocked.',
    'Crew acknowledgment lag stretches execution confidence — add it to the timing model.',
  ],
  twin: { nodesEnriched: 9, lanesEnriched: 4, before: '74%', after: '86%', summary: '9 open-trip flight twins · 4 coupled-hub lanes enriched — crew / network / aircraft / passenger twins updated with realized reserve-first recovery outcomes' },
}

export const SUT_SAVE = {
  name: 'T-5h Multi-Open Trip Recovery — ATL Bank (Reserve-First)',
  tags: ['UNCOVERED TRIP DETECTED', 'EVENT-TRIGGERED LIVE SIM', 'SICK CALL · LOW ACCEPTANCE', 'T-5h · T-2h LOCK', 'RESERVE-FIRST COVERAGE', 'L0 ACTIVE · L1 PREVENTION'],
  reusableFor: [
    'ATL evening bank open trips',
    'sick-call-driven low-acceptance events',
    'JFK connection exposure',
    'donor-swap Level 1 prevention',
    'next-day launch protection',
  ],
}

// ── Per-screen loading transition lines ─────────────────────────────────────
export const SUT_LOADING_LINES = {
  1: ['Ingesting crew · network · aircraft · passenger · policy feeds…', 'Scoring open-trip coverage across ATL and coupled hubs…', 'Filtering reserves to legal + location-feasible…', 'Signal deep-dive ready.'],
  2: ['Loading objective framework…', 'Weighting reliability / legality / CX / resource / cost…', 'Objectives ready.'],
  3: ['Loading recovery levers…', 'Applying reserve-first + safe-swap configuration…', 'Levers ready.'],
  4: ['Assembling scenario setup…', 'Running legality + reserve + tail + seat checks…', 'Summary ready.'],
  5: ['Running event-triggered live simulation…', 'Comparing reserve-first / swap-conserve / protect-bank strategies…', 'Ranking recommendations…'],
  6: ['Assembling execution package…', 'Validating legality + readiness + donor-swap guardrails…', 'Ready for OCC approval.'],
  7: ['Capturing realized recovery outcomes…', 'Comparing predicted vs actual…', 'Updating priors + T-5h open-trip playbook…'],
}
