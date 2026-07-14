// Signal 2 — Hub Closure Likelihood (Weather Window Emerging)
// Dedicated 7-screen deep-dive: severe thunderstorms + ATC ground delay program
// threaten the ATL evening/overnight bank (T-30h → T-6h). Forecast-led,
// pre-disruption: shift the decision from reactive (T-18h) to predictive.
// Exports follow the shared workflow-panel contract (SHC_ prefix); all values
// are illustrative UI mock data, not actual Delta operational data.

export const SHC_ACCENT = 'red'

// ── Screen 1 — Signal Deep Dive ─────────────────────────────────────────────
export const SHC_SIGNAL = {
  sentinel: 'Hub Weather Sentinel',
  bannerText: 'Hub Closure Likelihood — severe storms + ATC ground delay threaten the ATL evening/overnight bank.',
  card: [
    { label: 'Signal class', value: 'Forecast-driven weather exposure' },
    { label: 'Severity', value: 'CRITICAL' },
    { label: 'Closure likelihood', value: '72%', note: '(6–10 hr disruption window)' },
    { label: 'Forecast confidence', value: '88%' },
    { label: 'Impact window', value: '16:00–23:00 ATL' },
    { label: 'Cascade state', value: 'Pre-Level 0 → Level 0 forming' },
    { label: 'Response window', value: 'T-30h → T-6h' },
  ],
  sourceChips: ['WEATHER API', 'ATC', 'AIRPORT OPS', 'CREW', 'NETWORK', 'PASSENGER'],
  detail: 'Severe thunderstorms plus an active ATC ground delay program cut ATL departure throughput by 38% across the evening/overnight bank. Left unmanaged, bank compression converts into mass open trips and reserve depletion — the earliest point to act predictively instead of reactively.',
  conditions: [
    'Closure likelihood exceeds 70% for the 16:00–23:00 bank,',
    'ATC ground delay program cuts departure rate by 38%,',
    'Reserve buffer sits at 0.95x — slightly below safe threshold,',
    'Peak 18:00–21:00 bank carries the highest disruption risk (92).',
  ],
  conditionsNote: 'Weather/External and Network twins use storm severity, ATC capacity, and bank criticality as state variables, with hub closure and departure-rate compression as critical events.',
}

export const SHC_DISRUPTION = {
  detected: 'T-30h (forecast window opens)',
  source: 'Severe thunderstorms + active ATC ground delay program at ATL; -38% departure throughput 16:00–23:00',
  cascade: 'ATL evening/overnight bank compression → mass open trips (Level 0) → reserve depletion risk (Level 1) → cross-hub spread if mispositioning grows',
}

export const SHC_IMPACT = [
  { label: 'Closure likelihood', value: '72%', color: 'red' },
  { label: 'Exposed flights', value: '184', color: 'orange' },
  { label: 'Exposed pairings', value: '52', color: 'violet' },
  { label: 'Passenger exposure', value: '26,300', color: 'blue' },
  { label: 'Reserve buffer', value: '0.95x', color: 'red' },
]

// Optional Screen-1 blocks (render only when present)
export const SHC_METRICS = [
  { label: 'ATC capacity reduction', value: '-38%', note: 'severe throughput compression' },
  { label: 'Cost exposure', value: '$5.2M–$7.8M', note: 'if unmanaged' },
  { label: 'Peak disruption bank', value: '18:00–21:00', note: '91 flights · risk 92' },
  { label: 'Forecast confidence', value: '88%', note: '6–10 hr disruption window' },
]

// Weather + external breakdown (reuses the multi-hub table shape)
export const SHC_HUB_IMPACT = [
  { hub: 'Thunderstorm severity', state: 'High', crew: 'Runway/gate disruption', flights: '184 exposed', pax: '26,300', level: 'L0 driver' },
  { hub: 'ATC ground delay', state: 'Active', crew: 'Departure rate cut -38%', flights: 'Bank compression', pax: '—', level: 'L0 driver' },
  { hub: 'Airport capacity', state: 'Constrained', crew: 'Gate turn delays', flights: 'Slower turns', pax: '—', level: 'L1 watch' },
  { hub: 'Visibility / wind', state: 'Moderate risk', crew: 'Arrival delays', flights: 'Inbound exposure', pax: '—', level: 'L0 watch' },
]

export const SHC_ROOT_CAUSE = [
  { domain: 'External (weather/ATC)', pct: 46, note: 'Storms + ground delay program drive the closure risk' },
  { domain: 'Network', pct: 26, note: 'Evening/overnight bank criticality and connection density' },
  { domain: 'Crew', pct: 16, note: 'Reserve buffer at 0.95x; open-trip risk forming' },
  { domain: 'Passenger', pct: 12, note: '26,300 exposed journeys across the bank' },
]

export const SHC_CASCADE = [
  { level: 'Level 0 — Mass open trips', status: 'Likely', color: 'red', trigger: 'Bank disruption converts compressed flights into open trips', action: 'Forecast-led pre-cancel + reserve pre-position before storm' },
  { level: 'Level 1 — Reserve depletion', status: 'Possible', color: 'orange', trigger: 'Reserve buffer (0.95x) drawn below coverage', action: 'Activate + pre-position reserves; block donor pulls' },
  { level: 'Level 2 — Cross-hub spread', status: 'Not yet', color: 'yellow', trigger: 'Crew mispositioning spreads beyond ATL', action: 'Protect donor hubs (watch DTW); arm restart plan' },
]

export const SHC_PRECEDENTS = [
  { episode: 'ATL storm (Aug)', similarity: 86, pattern: 'Evening-bank storm + ground delay', outcome: 'Mass cancellations', lesson: 'Pre-cancel earlier' },
  { episode: 'JFK weather ripple', similarity: 72, pattern: 'Weather spread across hubs', outcome: 'Cross-hub spread', lesson: 'Protect donor hubs' },
  { episode: 'Holiday peak storm', similarity: 68, pattern: 'High load + low reserve elasticity', outcome: 'Reserve exhaustion', lesson: 'Pre-position reserves' },
]

export const SHC_HYPOTHESIS = 'If Delta acts predictively on the ATL weather window — pre-cancelling a few low-value flights, pre-positioning and activating reserves, and protecting the high-value banks before the storm hits — then it can contain the disruption at Level 0, prevent reserve depletion, and cut cost and misconnects versus reacting at T-18h.'

// ── Screen 2 — Objectives & KPIs ────────────────────────────────────────────
export const SHC_PRIMARY_OBJECTIVES = [
  { value: 'Contain hub disruption, prevent cascade beyond ATL', desc: 'Stop the weather window from escalating past Level 0' },
  { value: 'Protect critical departure banks', desc: 'Preserve the high-value evening/overnight banks' },
  { value: 'Minimize crew mispositioning', desc: 'Keep crews legal and in-position through the storm' },
  { value: 'Reduce cancellations', desc: 'Hold controlled pre-cancels to a minimum' },
  { value: 'Protect passenger connections', desc: 'Limit misconnects across a 26,300-pax bank' },
  { value: 'Preserve next-day restart', desc: 'Protect overnight recovery and morning launch' },
]
export const SHC_PRIMARY_DEFAULT = 'Contain hub disruption, prevent cascade beyond ATL'

export const SHC_SECONDARY_OBJECTIVES = [
  { value: 'Pre-position reserves before storm', desc: 'Reserves must arrive pre-disruption to help' },
  { value: 'Limit cost-to-recover', desc: 'Hold recovery and compensation cost down' },
  { value: 'Avoid donor-hub bottlenecks', desc: 'Watch DTW when routing alternates' },
  { value: 'Protect premium journeys', desc: 'Shield high-value passengers first' },
  { value: 'Maintain aircraft-tail continuity', desc: 'Keep tail resequencing maintenance-feasible' },
  { value: 'Preserve overnight restart', desc: 'Protect the 21:00–23:00 recovery bank' },
]
export const SHC_SECONDARY_DEFAULT = ['Pre-position reserves before storm', 'Limit cost-to-recover']

export const SHC_KPI_OPTIONS = [
  { value: 'Completion factor', type: 'Operational', rec: true },
  { value: 'Propagation spread', type: 'Operational', rec: true },
  { value: 'Cancellations avoided', type: 'Reliability', rec: true },
  { value: 'Reserve utilization', type: 'Resource', rec: true },
  { value: 'Misconnects avoided', type: 'CX', rec: true },
  { value: 'Premium protected', type: 'CX', rec: true },
  { value: 'Cost-to-recover', type: 'Financial', rec: true },
  { value: 'On-time performance', type: 'Operational', rec: false },
  { value: 'Compensation cost', type: 'Financial', rec: false },
  { value: 'Crew utilization', type: 'Resource', rec: false },
  { value: 'Next-day restart readiness', type: 'Resilience', rec: false },
]
export const SHC_KPI_DEFAULT = SHC_KPI_OPTIONS.filter(k => k.rec).map(k => k.value)

// ── Screen 3 — Simulation Levers ────────────────────────────────────────────
export const SHC_LEVER_GROUPS = [
  {
    group: 'A', title: 'Network & schedule levers', color: 'grape',
    levers: [
      { id: 'scheduleThin', label: 'Schedule thinning', control: 'select', options: ['0 flights', '8 flights', '15 flights', '25 flights'], recommended: '8 flights', why: 'Low-criticality flights only' },
      { id: 'preCancel', label: 'Pre-cancel flights', control: 'select', options: ['0 flights', '5 flights', '10 flights', '15 flights'], recommended: '5 flights', why: 'Must protect high-value banks' },
      { id: 'delayTolerance', label: 'Delay tolerance', control: 'select', options: ['0 min', '45 min', '90 min', '120 min'], recommended: '45 min', why: 'Cannot break crew legality' },
      { id: 'altRoute', label: 'Alternate hub routing', control: 'select', options: ['Off', 'DTW/MSP selected', 'Broad'], recommended: 'DTW/MSP selected', why: 'Avoid creating new bottlenecks' },
    ],
  },
  {
    group: 'B', title: 'Crew protection levers', color: 'red',
    levers: [
      { id: 'reservePreposition', label: 'Reserve pre-positioning', control: 'select', options: ['0 crew', '12 crew', '20 crew', '30 crew'], recommended: '12 crew', why: 'Must arrive before the storm' },
      { id: 'reserveActivation', label: 'Reserve activation', control: 'select', options: ['0 crew', '25 crew', '40 crew', '50 crew'], recommended: '25 crew', why: 'Legal + qualified reserves only' },
    ],
  },
  {
    group: 'C', title: 'Aircraft levers', color: 'orange',
    levers: [
      { id: 'tailReseq', label: 'Tail resequencing', control: 'switch', recommended: true, onLabel: 'Selected rotations', why: 'Maintenance-feasible tails only' },
    ],
  },
  {
    group: 'D', title: 'Passenger & cost levers', color: 'blue',
    levers: [
      { id: 'reaccom', label: 'Passenger reaccommodation', control: 'select', options: ['0 pax', '2,000 pax', '3,500 pax', '5,000 pax'], recommended: '2,000 pax', why: 'Capacity-dependent' },
      { id: 'premiumProtect', label: 'Premium protection', control: 'switch', recommended: true, onLabel: 'On', why: 'Protect priority journeys' },
    ],
  },
]
export const SHC_ALL_LEVERS = SHC_LEVER_GROUPS.flatMap(g => g.levers)
export const SHC_LEVER_DEFAULTS = Object.fromEntries(SHC_ALL_LEVERS.map(l => [l.id, l.recommended]))

// ── Screen 4 — Simulation Summary ───────────────────────────────────────────
export const SHC_SCENARIO = {
  name: 'ATL Hub Closure — Weather Window',
  signal: 'Hub Closure Likelihood — Weather Window Emerging',
  objective: 'Contain the ATL weather disruption at Level 0 and protect critical banks with pre-cancellation and reserve pre-positioning, weighting stability 40% / CX 30% / cost 15% / resource 15%.',
  method: 'Forecast-led pre-disruption simulation: Weather/External Twin severity model + ATC capacity model + Crew legality + reserve feasibility + passenger flow, run against a do-nothing baseline.',
}
export const SHC_SCOPE = [
  { item: 'Flights in scope', value: '184 exposed across the 16:00–23:00 bank' },
  { item: 'Crew pairings', value: '52 rotations starting/connecting via ATL' },
  { item: 'Hubs', value: 'ATL primary · DTW/MSP alternates' },
  { item: 'Cascade state', value: 'Pre-Level 0 → Level 0 forming (goal: stop at L0)' },
  { item: 'Decision window', value: 'T-30h forecast → T-6h execution' },
  { item: 'Reserve buffer', value: '0.95x — slightly below safe threshold' },
]
export const SHC_VALIDATION = [
  'Crew duty / rest legality checked',
  'Reserve arrival feasibility (pre-storm) checked',
  'Aircraft maintenance readiness checked',
  'Policy / contract constraints within limits',
  'Donor-hub bottleneck guardrail (watch DTW)',
  'Passenger reaccommodation capacity checked',
  'Level 0 containment target armed',
  'Human approval required before execution',
]

// ── Screen 5 — Optimization Results ─────────────────────────────────────────
export const SHC_BASELINE = [
  { kpi: 'At-risk flights', value: '184' },
  { kpi: 'Open trips', value: '32' },
  { kpi: 'Misconnects at risk', value: '4,200' },
  { kpi: 'Propagation probability', value: '48%' },
  { kpi: 'Cost-to-recover', value: '$7.8M' },
  { kpi: 'Reserve buffer', value: '0.95x' },
  { kpi: 'ATC capacity', value: '-38%' },
  { kpi: 'Cascade state', value: 'Pre-L0 → L0' },
]

export const SHC_RECOMMENDATIONS = [
  {
    id: 'precancelreserve', rank: 1, tone: 'green', recommended: true,
    cardTitle: 'Option 1: Pre-cancel + Reserve Strategy',
    trigger: 'Closure likelihood > 70% and reserve buffer near threshold; act before the storm.',
    leversUsed: 'Pre-cancel 5 low-value flights · pre-position 12 + activate 25 reserves · protect banks · delay ≤45 min',
    impacted: '184 flights · 52 pairings · ATL banks · 26,300 pax',
    assignments: [
      { kind: 'Flight', kindColor: 'grape', resource: '5 low-value flights', to: 'pre-cancelled', action: 'Cancel ahead of the storm to protect banks' },
      { kind: 'Reserve', kindColor: 'red', resource: '12 crew', from: 'DTW / MSP / off-peak bases', to: 'ATL', action: 'Pre-position before the closure window' },
      { kind: 'Reserve', kindColor: 'red', resource: '25 ATL reserves', to: 'protected evening/overnight banks', action: 'Activate legal + qualified reserves' },
      { kind: 'Tail', kindColor: 'orange', resource: 'Selected rotations', to: 'resequenced', action: 'Maintenance-feasible tail resequencing' },
      { kind: 'Passenger', kindColor: 'blue', resource: '2,000 at-risk pax', to: 'pre-storm itineraries', action: 'Early reaccommodation, premium first' },
    ],
    confidence: '90% · best stability/CX/cost balance',
    whyNot: 'Small visible pre-cancellations vs zero-cancel delay strategy.',
    recommends: [
      'Pre-cancel 5 low-value flights before the storm window.',
      'Pre-position 12 and activate 25 legal reserves; protect the high-value banks.',
      'Apply ≤45 min delay within legality and reaccommodate 2,000 pax.',
    ],
    kpi: [
      { k: 'At-risk flights', b: '184', a: '~100', d: '−22 saved' },
      { k: 'Open trips', b: '32', a: '14', d: '−18' },
      { k: 'Cancellations', b: '0', a: '5', d: '+5 (planned)', neg: true },
      { k: 'Misconnects at risk', b: '4,200', a: '2,100', d: '−2,100' },
      { k: 'Propagation probability', b: '48%', a: '24%', d: '−24 pts' },
      { k: 'Cost-to-recover', b: '$7.8M', a: '$5.1M', d: '−$2.7M' },
    ],
    why: 'Passes all feasibility gates, prevents Level 1 escalation, and best balances stability, CX, and cost — matching the Delta pattern of a small pre-cancel that saves the larger network.',
    bestWhen: 'Use when closure likelihood is high and reserves are near threshold — act predictively before disruption.',
    risk: 'Small visible pre-cancellations; requires ops-leadership sign-off if the count grows.',
    plan: {
      title: 'ATL Weather Hub Closure — Pre-cancel + Reserve',
      objective: 'Contain the ATL weather window at Level 0 with a small pre-cancel and reserve pre-positioning before the storm.',
      phases: [
        { name: 'Phase 1 — Rank & pre-cancel (T-30h → T-8h)', actions: ['Rank 184 flights by criticality and connection load', 'Pre-cancel 5 low-value flights; initiate passenger rebooking'] },
        { name: 'Phase 2 — Reserve pre-position (T-12h → T-6h)', actions: ['Pre-position 12 reserves to arrive before the storm', 'Activate 25 legal reserves for the peak bank'] },
        { name: 'Phase 3 — Protect banks (T-6h → T+3h)', actions: ['Delay ≤45 min within legality; protect high-value banks', 'Reaccommodate 2,000 pax; tail-resequence selected rotations'] },
      ],
      changes: [
        { area: 'Schedule', change: 'Pre-cancel 5 low-value flights; protect high-value banks' },
        { area: 'Crew', change: 'Pre-position 12 + activate 25 reserves; keep crews legal' },
        { area: 'Aircraft', change: 'Tail-resequence selected rotations; maintenance-feasible only' },
        { area: 'Passenger', change: 'Reaccommodate 2,000 pax; premium protection on' },
      ],
      guardrails: ['Crew legality / rest', 'Reserves arrive pre-storm', 'Protect high-value banks', 'Watch DTW donor bottleneck', 'Human approval'],
      expected: 'At-risk flights 184 → ~100; open trips 32 → 14; propagation 48% → 24%; cost $7.8M → $5.1M.',
    },
  },
  {
    id: 'delaycoverage', rank: 2, tone: 'orange', recommended: false,
    cardTitle: 'Option 2: Delay + Full Coverage',
    trigger: 'Cancellation avoidance prioritized; storm forecast may ease.',
    leversUsed: 'No pre-cancels · heavy delay · full reserve activation · protect all banks',
    impacted: '184 flights · 52 pairings · 26,300 pax',
    assignments: [
      { kind: 'Flight', kindColor: 'grape', resource: 'All banks', to: 'held ≤90 min', action: 'Heavy controlled delay, no pre-cancels' },
      { kind: 'Reserve', kindColor: 'red', resource: '40+ crew', from: 'ATL + donor bases', to: 'full bank coverage', action: 'Full reserve activation to cover delayed flights' },
      { kind: 'Crew', kindColor: 'red', resource: 'Held-flight crews', to: 'legality-checked', action: 'Validate duty/rest after long delays' },
      { kind: 'Passenger', kindColor: 'blue', resource: '3,500 at-risk pax', to: 'protected connections', action: 'Reaccommodate as delays cascade' },
    ],
    confidence: '76% · lowest visible cancellations',
    whyNot: 'Higher cost and misconnects; heavy reserve burn leaves less for later banks.',
    recommends: [
      'Avoid pre-cancellations; absorb the window with heavy delay.',
      'Activate full reserves and protect every bank.',
    ],
    kpi: [
      { k: 'At-risk flights', b: '184', a: '~110', d: '−18 saved' },
      { k: 'Open trips', b: '32', a: '18', d: '−14' },
      { k: 'Cancellations', b: '0', a: '2', d: '+2 (planned)', neg: true },
      { k: 'Misconnects at risk', b: '4,200', a: '2,900', d: '−1,300' },
      { k: 'Propagation probability', b: '48%', a: '32%', d: '−16 pts' },
      { k: 'Cost-to-recover', b: '$7.8M', a: '$6.3M', d: '−$1.5M' },
    ],
    why: 'Keeps the schedule intact with the fewest cancellations, but heavy delay raises misconnects and cost and burns reserves.',
    bestWhen: 'Use when avoiding visible cancellations is paramount and the storm forecast may weaken.',
    risk: 'Reserve depletion and higher misconnect/cost exposure if the storm holds.',
    plan: {
      title: 'ATL Weather Hub Closure — Delay + Full Coverage',
      objective: 'Absorb the weather window without cancellations using heavy delay and full reserve coverage.',
      phases: [
        { name: 'Phase 1 — Reserve activation (T-12h → T-6h)', actions: ['Activate full reserve pool', 'Pre-position reserves to arrive before the storm'] },
        { name: 'Phase 2 — Delay management (T-6h → T+3h)', actions: ['Apply heavy delay within legality', 'Protect all banks; monitor reserve burn'] },
        { name: 'Phase 3 — Recovery (T+3h → T+6h)', actions: ['Reaccommodate misconnected passengers', 'Escalate to pre-cancel if reserves deplete'] },
      ],
      changes: [
        { area: 'Schedule', change: 'No pre-cancels; heavy delay across the bank' },
        { area: 'Crew', change: 'Full reserve activation; watch depletion' },
        { area: 'Passenger', change: 'Larger reaccommodation load; premium protection on' },
        { area: 'Aircraft', change: 'Tail resequencing as needed' },
      ],
      guardrails: ['Crew legality / rest', 'Reserve depletion watch', 'Protect all banks', 'Human approval'],
      expected: 'Open trips 32 → 18; propagation 48% → 32%; cost $7.8M → $6.3M; cancellations held to 2.',
    },
  },
  {
    id: 'althub', rank: 3, tone: 'blue', recommended: false,
    cardTitle: 'Option 3: Alternate Hub Strategy',
    trigger: 'ATL throughput collapses; reroute connection-heavy flows via DTW/MSP.',
    leversUsed: 'Reroute via DTW/MSP · redeploy crew · protect next-day ATL launch',
    impacted: 'Selected flows via DTW/MSP · 52 pairings · 26,300 pax',
    assignments: [
      { kind: 'Flight', kindColor: 'grape', resource: 'Selected ATL flows', from: 'ATL', to: 'DTW / MSP', action: 'Reroute around the closing hub' },
      { kind: 'Crew', kindColor: 'red', resource: 'ATL-based crew', to: 'overnight redeploy', action: 'Reposition to protect next-day ATL launch' },
      { kind: 'Reserve', kindColor: 'red', resource: 'Next-day reserves', to: 'ATL morning banks', action: 'Protect the post-storm restart' },
      { kind: 'Passenger', kindColor: 'blue', resource: 'Rerouted-flow pax', to: 'DTW / MSP itineraries', action: 'Protect connections on alternate hubs' },
    ],
    confidence: '72% · best next-day readiness',
    whyNot: 'Highest coordination complexity and donor-bottleneck risk at DTW.',
    recommends: [
      'Reroute connection-heavy flows via DTW/MSP.',
      'Redeploy crew and protect the next-day ATL launch.',
    ],
    kpi: [
      { k: 'At-risk flights', b: '184', a: '~115', d: '−15 saved' },
      { k: 'Open trips', b: '32', a: '20', d: '−12' },
      { k: 'Cancellations', b: '0', a: '7', d: '+7 (planned)', neg: true },
      { k: 'Misconnects at risk', b: '4,200', a: '2,400', d: '−1,800' },
      { k: 'Propagation probability', b: '48%', a: '28%', d: '−20 pts' },
      { k: 'Cost-to-recover', b: '$7.8M', a: '$5.8M', d: '−$2.0M' },
    ],
    why: 'Best protects next-day ATL readiness by routing around the closed bank, but adds coordination overhead and donor-bottleneck risk.',
    bestWhen: 'Use when ATL throughput collapses and rerouting via DTW/MSP is feasible.',
    risk: 'Coordination complexity and new bottlenecks at DTW; more visible cancellations.',
    plan: {
      title: 'ATL Weather Hub Closure — Alternate Hub Strategy',
      objective: 'Protect next-day ATL launch by rerouting connection-heavy flows via DTW/MSP.',
      phases: [
        { name: 'Phase 1 — Route selection (T-24h → T-8h)', actions: ['Identify connection-heavy flows to reroute via DTW/MSP', 'Confirm alternate-hub feasibility; watch DTW bottleneck'] },
        { name: 'Phase 2 — Crew redeploy (T-8h → T-3h)', actions: ['Redeploy crew for rerouted flows', 'Coordinate ground ops for gate/crew logistics'] },
        { name: 'Phase 3 — Next-day protect (overnight)', actions: ['Protect next-day ATL launch banks', 'Reaccommodate affected passengers'] },
      ],
      changes: [
        { area: 'Network', change: 'Reroute selected flows via DTW/MSP; avoid new bottlenecks' },
        { area: 'Crew', change: 'Redeploy crew for alternate routing' },
        { area: 'Passenger', change: 'Reaccommodate rerouted/cancelled-flow pax; premium protection on' },
        { area: 'Aircraft', change: 'Tail resequencing for rerouted rotations' },
      ],
      guardrails: ['Alternate routing must not create new bottlenecks (watch DTW)', 'Crew legality / rest', 'Protect next-day ATL launch', 'Human approval'],
      expected: 'Open trips 32 → 20; propagation 48% → 28%; cost $7.8M → $5.8M; next-day ATL launch protected.',
    },
  },
]

export const SHC_RANKING = [
  { rank: 1, reco: 'Pre-cancel + Reserve Strategy', service: 'Highest', cost: 'Medium', speed: 'High', feasibility: 'High', select: 'Selected' },
  { rank: 2, reco: 'Delay + Full Coverage', service: 'Medium-high', cost: 'High', speed: 'Medium', feasibility: 'Medium-high', select: 'Alternative' },
  { rank: 3, reco: 'Alternate Hub Strategy', service: 'Medium', cost: 'Medium-high', speed: 'Low', feasibility: 'Medium', select: 'Alternative' },
]

export const SHC_FRONTIER = {
  xLabel: 'Cost-to-recover ($M)', yLabel: 'Propagation probability (%)', zLabel: 'Execution confidence (%)',
  points: [
    { x: 7.8, y: 48, z: 0, label: 'Do nothing', tone: 'gray' },
    { x: 5.1, y: 24, z: 90, label: 'Pre-cancel + reserve', tone: 'green', recommended: true },
    { x: 6.3, y: 32, z: 76, label: 'Delay + full coverage', tone: 'orange' },
    { x: 5.8, y: 28, z: 72, label: 'Alternate hub', tone: 'blue' },
  ],
}

// ── Screen 6 — Approval & Execution ─────────────────────────────────────────
export const SHC_APPROVAL = {
  selected: 'Pre-cancel + Reserve Strategy',
  action: 'Pre-cancel 5 low-value flights + pre-position 12 & activate 25 reserves + protect banks + delay ≤45 min + reaccommodate 2,000 pax',
  summary: [
    { field: 'Decision owner', value: 'OCC duty manager' },
    { field: 'Approval type', value: 'Human, multi-role (crew · network · aircraft · pax)' },
    { field: 'Auto-execution', value: 'Disabled' },
    { field: 'Decision deadline', value: 'Plan approval by T-4h; execution by T-3h' },
    { field: 'Audit status', value: 'Decision log will be created' },
  ],
  execItems: [
    { item: 'Pre-cancel list', target: 'Network ops', action: 'Cancel 5 low-value flights before the storm' },
    { item: 'Reserve deployment', target: 'Crew scheduling', action: 'Pre-position 12 + activate 25 legal reserves' },
    { item: 'Crew reassignment', target: 'Crew ops', action: 'Reassign crews to protect high-value banks' },
    { item: 'Schedule adjustment', target: 'OCC system', action: 'Apply ≤45 min delay within legality' },
    { item: 'Passenger recovery', target: 'CX systems', action: 'Reaccommodate 2,000 pax; protect premium journeys' },
    { item: 'Audit trail', target: 'Decision log', action: 'Store rationale, constraints, rejected options, approvals' },
  ],
  rationale: 'Best stability/CX/cost balance. A small pre-cancel plus reserve pre-positioning acts before the storm, prevents Level 1 escalation, and cuts propagation 48% → 24% and cost $7.8M → $5.1M — the control-tower shift from reactive to predictive.',
  constraints: ['Crew legality / rest', 'Reserves arrive pre-storm', 'Protect high-value banks', 'Aircraft maintenance readiness', 'Donor-hub bottleneck watch (DTW)', 'Passenger priority rules', 'Human approval'],
}

// ── Screen 7 — Test & Learn ─────────────────────────────────────────────────
export const SHC_OUTCOMES = [
  { metric: 'Flights saved', pred: '22', actual: '20', learn: 'Pre-cancel timing slightly late' },
  { metric: 'Misconnects at risk', pred: '2,100', actual: '2,250', learn: 'Gate congestion added exposure' },
  { metric: 'Cost-to-recover', pred: '$5.1M', actual: '$5.4M', learn: 'Reaccommodation cost above forecast' },
  { metric: 'Propagation probability', pred: '24%', actual: '26%', learn: 'Storm held slightly longer than modeled' },
  { metric: 'Cascade state', pred: 'Stop at L0', actual: 'Contained at L0', learn: 'Level 1 escalation prevented' },
  { metric: 'Execution confidence', pred: '90%', actual: '86%', learn: 'Cross-functional approval slightly slower' },
]

export const SHC_INSIGHTS = [
  'Pre-cancel timing was slightly late — increase forecast lead time and act earlier in the window.',
  'Reserve pre-positioning was effective — scale it earlier and larger for high-closure windows.',
  'Passenger reaccommodation cut CX impact significantly — keep it front-loaded.',
  'Predictive action (T-30h) beat reactive action (T-18h) on every KPI — the core control-tower value.',
  'Donor-bottleneck watch on DTW held — keep it armed whenever alternate routing is enabled.',
]

export const SHC_LEARN = {
  accuracy: [
    { label: 'Overall prediction accuracy', value: '88%' },
    { label: 'Flights saved', value: '±2 flights' },
    { label: 'Cost-to-recover', value: '±$0.3M' },
    { label: 'Propagation probability', value: '±2 pts' },
  ],
  recalibration: [
    { label: 'Weather severity model', before: 'w=0.55', after: 'w=0.68', delta: '+severity weight', note: 'Increase storm severity weighting for evening banks' },
    { label: 'Reserve arrival model', before: 'point ETA', after: '+feasibility band', delta: '+accuracy', note: 'Improve pre-storm arrival feasibility accuracy' },
    { label: 'Network criticality model', before: 'w=0.60', after: 'w=0.70', delta: '+bank weight', note: 'Increase bank criticality weight for peak windows' },
  ],
  patterns: [
    'Evening/overnight banks under ground-delay programs convert to open trips within one bank.',
    'A small early pre-cancel protects a much larger connection-heavy network.',
    'Gate congestion during recovery adds misconnects not captured by delay alone.',
  ],
  twin: { nodesEnriched: 184, lanesEnriched: 52, before: '74%', after: '88%', summary: '184 flight twins · 52 pairing twins enriched — weather/network twins updated with realized hub-closure recovery outcomes' },
}

export const SHC_SAVE = {
  name: 'ATL Weather Hub Closure Stabilization',
  tags: ['HUB CLOSURE LIKELIHOOD', 'WEATHER WINDOW', 'FORECAST-LED PRE-DISRUPTION', 'ATL EVENING BANK', 'LEVEL 0 CONTAINMENT', 'ATC GROUND DELAY'],
  reusableFor: [
    'weather-driven hub closure',
    'ATC ground delay program',
    'forecast-led pre-disruption planning',
    'reserve pre-positioning',
    'evening-bank storm response',
  ],
}

// ── Per-screen loading transition lines ─────────────────────────────────────
export const SHC_LOADING_LINES = {
  1: ['Ingesting weather · ATC · airport · crew feeds…', 'Translating storm severity into bank exposure…', 'Scoring closure likelihood + cascade risk…', 'Signal deep-dive ready.'],
  2: ['Loading objective framework…', 'Weighting stability / CX / cost / resource…', 'Objectives ready.'],
  3: ['Loading preventive levers…', 'Applying pre-cancel + reserve configuration…', 'Levers ready.'],
  4: ['Assembling scenario setup…', 'Running legality + reserve feasibility checks…', 'Summary ready.'],
  5: ['Running forecast-led simulation…', 'Comparing pre-cancel / delay / alternate-hub strategies…', 'Ranking recommendations…'],
  6: ['Assembling execution package…', 'Validating legality + donor guardrails…', 'Ready for OCC approval.'],
  7: ['Capturing realized outcomes…', 'Comparing predicted vs actual…', 'Updating priors + weather hub-closure playbook…'],
}
