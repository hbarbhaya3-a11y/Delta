// Network Risk Signals — Airline Operations
// Nine critical signals for crew scheduling, network disruption, and hub management
// All signals flow to UC1 (Network Risk Operations)

// ── Signal Definitions ──────────────────────────────────────────────────────────

// Signal 1: Network Risk Radar — Ranked Flights, Pairings & Hubs at Risk
export const SIGNAL_NETWORK_RISK_RADAR = {
  id: 'nrs-1-network-risk-radar',
  title: 'Network Risk Radar — Ranked Flights, Pairings & Hubs at Risk',
  severity: '🔴 Critical',
  signal_class: 'Primary Sense + Analyze',
  description: 'Top-of-tower signal ranking flights, pairings, hubs, and stations most likely to fail. Aggregates crew, aircraft, network, passenger, and external signals into a unified risk score. Scenario: ATL evening bank, T-16h→T-4h.',
  metrics: [
    { label: 'Network Risk Score', value: '87 / 100', description: 'Unified cross-domain risk' },
    { label: 'Impacted Flights', value: '126', description: 'Flights with elevated delay/cancel/crew risk' },
    { label: 'Impacted Pairings', value: '34', description: 'Rotations with legality/positioning risk' },
    { label: 'Confidence', value: '91%', description: 'Model certainty' },
  ],
  response_window: 'T-16h to T-4h (ATL evening bank)',
  likely_root_causes: [
    'Crew: legality stress, reserve depletion',
    'Network: bank dependency, delay propagation',
    'Aircraft: tail readiness gaps',
    'External: weather / ATC',
  ],
  recommended_actions: [
    'Prioritize top-risk flights',
    'Pre-position reserves',
    'Simulate delay vs cancel vs reroute',
  ],
  ready_scenario: 'Network Vulnerability Scan',
}

// Signal 2: Hub Closure Likelihood — Weather Window Emerging
export const SIGNAL_HUB_CLOSURE = {
  id: 'nrs-2-hub-closure-likelihood',
  title: 'Hub Closure Likelihood — Weather Window Emerging',
  severity: '🔴 Critical',
  signal_class: 'Forecast-driven',
  description: 'Forecast-driven signal translating weather risk into operational exposure. Converts raw weather inputs into network impact—which flights, banks, and crew rotations will be affected if a hub shuts down. Earliest trigger for pre-disruption simulation.',
  metrics: [
    { label: 'Closure Probability', value: '%', description: 'Likelihood of hub closure' },
    { label: 'Exposed Flights/Banks', value: '#', description: 'Number of flights or banking events exposed' },
    { label: 'Exposed Pairings', value: '#', description: 'Crew pairings affected by closure' },
    { label: 'Forecast Confidence', value: '%', description: 'Weather forecast certainty' },
  ],
  response_window: '24–48 hrs',
  likely_root_causes: [
    'Weather forecast (storms, visibility)',
    'ATC ground stop risk',
    'Airport capacity constraints',
  ],
  recommended_actions: [
    'Schedule thinning',
    'Pre-cancel low-priority flights',
    'Reserve pre-positioning',
    'Alternate hub routing',
  ],
  ready_scenario: 'Forecast-Led Hub Closure Simulation',
}

// Signal 3: Uncovered Trip Detected — Time-to-Departure Critical
export const SIGNAL_UNCOVERED_TRIP = {
  id: 'nrs-3-uncovered-trip-detected',
  title: 'Uncovered Trip Detected — Time-to-Departure Critical',
  severity: '🔴 Critical',
  signal_class: 'Execution-critical',
  description: 'Flags flights without assigned crew within the critical execution window. Triggered when a trip becomes uncovered. With ~2% acceptance rates, waiting for voluntary pickup is ineffective. Forces immediate simulation instead of reactive waiting.',
  metrics: [
    { label: 'Open Trips', value: '#', description: 'Number of uncovered trips' },
    { label: 'Time to Departure', value: 'hrs', description: 'Hours until flight departure' },
    { label: 'Coverage Probability', value: '%', description: 'Likelihood of crew pickup' },
    { label: 'Acceptance Probability', value: '%', description: 'Voluntary acceptance rate' },
  ],
  response_window: 'Immediate / T-18 hrs',
  likely_root_causes: [
    'Crew sick call / no-show',
    'Low acceptance rates',
    'Legality breach',
    'Mispositioned crew',
  ],
  recommended_actions: [
    'Reserve activation',
    'Crew swap / reassign',
    'Incentive trigger',
    'Delay or cancel decision',
  ],
  ready_scenario: 'Live Open Trip Recovery',
}

// Signal 4: Reserve Burn Rate Acceleration
export const SIGNAL_RESERVE_BURN = {
  id: 'nrs-4-reserve-burn-rate',
  title: 'Reserve Burn Rate Acceleration',
  severity: '🟠 High',
  signal_class: 'Capacity-monitoring',
  description: 'Tracks how quickly reserve crew capacity is being consumed. Early warning for Level 0 → Level 1 cascade. If burn continues, recovery becomes zero-sum (pulling crew from other flights).',
  metrics: [
    { label: 'Burn Rate', value: 'reserves/hour', description: 'Rate of reserve consumption' },
    { label: 'Remaining Reserves', value: '#', description: 'Available reserve crew count' },
    { label: 'Open Trip Inflow', value: '#/hour', description: 'Rate of new uncovered trips' },
    { label: 'Exhaustion ETA', value: 'hrs', description: 'Hours until reserve depletion' },
  ],
  response_window: 'Rolling (real-time across banks)',
  likely_root_causes: [
    'Surge in open trips',
    'Weather disruption',
    'Late callouts',
    'Hub congestion',
  ],
  recommended_actions: [
    'Pre-cancel low-value flights',
    'Rebalance reserves across hubs',
    'Trigger incentive policy',
  ],
  ready_scenario: 'Reserve Burn Containment Simulation',
}

// Signal 5: Mid-Rotation Hub Stranding Detected
export const SIGNAL_MID_ROTATION_STRANDING = {
  id: 'nrs-5-mid-rotation-stranding',
  title: 'Mid-Rotation Hub Stranding Detected',
  severity: '🟠 High',
  signal_class: 'Scenario-onset',
  description: 'Detects crews stranded mid-rotation due to hub cancellation. Starting point of the stranding cascade (Level 0). Remaining legs become open, and repositioning needs create downstream risk.',
  metrics: [
    { label: 'Stranded Crews', value: '#', description: 'Number of crews stranded' },
    { label: 'Stranded Crew-Hours', value: '#', description: 'Total duty hours at risk' },
    { label: 'Remaining Legs Affected', value: '#', description: 'Flights without crew' },
    { label: 'Domicile Distance', value: 'km / hrs', description: 'Distance/time to home base' },
  ],
  response_window: 'Immediate',
  likely_root_causes: [
    'Hub cancellation',
    'Weather / ATC',
    'Aircraft delay',
  ],
  recommended_actions: [
    'Deadhead repositioning',
    'Reserve assignment',
    'Crew reassignment',
  ],
  ready_scenario: 'Stranded Hub Recovery',
}

// Signal 6: Cross-Hub Propagation Probability
export const SIGNAL_CROSS_HUB_PROPAGATION = {
  id: 'nrs-6-cross-hub-propagation',
  title: 'Cross-Hub Propagation Probability',
  severity: '🔴 Critical',
  signal_class: 'Cascade-detection',
  description: 'Measures risk of disruption spreading beyond the original hub. Level 2 cascade detection. Indicates disruption is no longer local and is contaminating other hubs and next-day operations.',
  metrics: [
    { label: 'Propagation Probability', value: '%', description: 'Risk of spread to other hubs' },
    { label: 'Affected Hubs', value: '#', description: 'Number of hubs at risk' },
    { label: 'New Open Trips (outside source hub)', value: '#', description: 'Downstream trips exposed' },
    { label: 'Confidence', value: '%', description: 'Cascade model confidence' },
  ],
  response_window: '6–24 hrs',
  likely_root_causes: [
    'Zero-sum crew shifts',
    'Reserve exhaustion',
    'Mispositioned crew',
  ],
  recommended_actions: [
    'Stop crew cannibalization',
    'Contain source hub',
    'Cross-hub rebalancing',
  ],
  ready_scenario: 'Cross-Hub Contamination Simulation',
}

// Signal 7: Passenger Misconnect Exposure
export const SIGNAL_MISCONNECT_EXPOSURE = {
  id: 'nrs-7-misconnect-exposure',
  title: 'Passenger Misconnect Exposure',
  severity: '🟠 High',
  signal_class: 'Customer-impact',
  description: 'Identifies passengers likely to miss connections due to disruption. Ensures crew recovery decisions incorporate CX impact, not just legality or cost. Critical for protecting network value and brand.',
  metrics: [
    { label: 'Misconnects at Risk', value: '#', description: 'Passengers at risk of missing connection' },
    { label: 'Critical Connections', value: '#', description: 'High-value connection pairs' },
    { label: 'Bank Exposure', value: '#', description: 'Banking events affected' },
    { label: 'Confidence', value: '%', description: 'Misconnection probability' },
  ],
  response_window: 'Next bank / live',
  likely_root_causes: [
    'Delays',
    'Crew swaps',
    'Gate constraints',
    'Aircraft mismatch',
  ],
  recommended_actions: [
    'Hold/delay critical flights',
    'Prioritize connection-heavy routes',
    'Reaccommodate early',
  ],
  ready_scenario: 'Connection Protection Simulation',
}

// Signal 8: Tail-Crew Synchronization Gap
export const SIGNAL_TAIL_CREW_SYNC = {
  id: 'nrs-8-tail-crew-sync',
  title: 'Tail-Crew Synchronization Gap',
  severity: '🟡 Medium-High',
  signal_class: 'Cross-domain constraint',
  description: 'Detects mismatch between crew readiness and aircraft readiness. Prevents solving crew problems without aircraft feasibility. Highlights cross-domain misalignment between Crew and Aircraft Twins.',
  metrics: [
    { label: 'Crew Ready vs Tail Ready Gap', value: 'mins', description: 'Time delta between readiness' },
    { label: 'Affected Legs', value: '#', description: 'Flights with sync gaps' },
    { label: 'Swap Options', value: '#', description: 'Available recovery levers' },
    { label: 'Maintenance Constraints', value: '#', description: 'Hard maintenance limits' },
  ],
  response_window: 'Live',
  likely_root_causes: [
    'Aircraft delay',
    'Maintenance',
    'Tail reassignment',
    'Crew misposition',
  ],
  recommended_actions: [
    'Tail swap',
    'Rotation resequencing',
    'Crew reassignment',
  ],
  ready_scenario: 'Tail-Crew Sync Optimizer',
}

// Signal 9: Binding Policy / Contract Constraint Flag
export const SIGNAL_POLICY_CONSTRAINT = {
  id: 'nrs-9-policy-constraint',
  title: 'Binding Policy / Contract Constraint Flag',
  severity: '🔴 Critical',
  signal_class: 'Feasibility-gate',
  description: 'Flags when recommended recovery actions violate legality, contract, or policy constraints. Hard feasibility gate. Prevents invalid decisions from entering execution. Directly tied to recommendation engine\'s Stage 1 filtering.',
  metrics: [
    { label: 'Binding Constraints', value: '#', description: 'Number of active constraints' },
    { label: 'Infeasible Options', value: '#', description: 'Ruled-out recovery options' },
    { label: 'Exception Required', value: 'Yes/No', description: 'If exception approval needed' },
    { label: 'Approval Level', value: 'Tier', description: 'Escalation tier for exceptions' },
  ],
  response_window: 'Before decision approval',
  likely_root_causes: [
    'Duty/rest violations',
    'Qualification mismatch',
    'Union rules',
    'Policy constraints',
  ],
  recommended_actions: [
    'Eliminate infeasible options',
    'Adjust scenario objectives',
    'Escalate for exception approval',
  ],
  ready_scenario: 'Policy Feasibility Gate',
}

// ── Signal Registry (all 9 signals ordered by severity and priority) ─────────────
export const NETWORK_RISK_SIGNALS = [
  SIGNAL_NETWORK_RISK_RADAR,
  SIGNAL_HUB_CLOSURE,
  SIGNAL_UNCOVERED_TRIP,
  SIGNAL_CROSS_HUB_PROPAGATION,
  SIGNAL_POLICY_CONSTRAINT,
  SIGNAL_RESERVE_BURN,
  SIGNAL_MID_ROTATION_STRANDING,
  SIGNAL_MISCONNECT_EXPOSURE,
  SIGNAL_TAIL_CREW_SYNC,
]

// ── Display Data — used by StoreServiceRiskPanel when network_risk_operations is active ─
export const NRS_DISRUPTION = {
  detected: 'T-16h (forecast-to-live transition)',
  source: 'ATL evening departure bank under converging pressure: crew legality buffers thinning, reserve coverage at 0.82x, weather/ATC uncertainty, and inbound crew mispositioning from JFK.',
  cascade: 'ATL evening bank → reserve depletion → 126 flights / 34 pairings at risk → donor-hub pressure at DTW/MSP → Level 1 escalation likely without action',
}

export const NRS_IMPACT = [
  { label: 'Network Risk Score', value: '87', color: 'red' },
  { label: 'Impacted Flights', value: '126', color: 'orange' },
  { label: 'Impacted Pairings', value: '34', color: 'yellow' },
  { label: 'At-Risk Passengers', value: '18,420', color: 'blue' },
  { label: 'Reserve Coverage', value: '0.82x', color: 'violet' },
]

// Extended signal metrics — Screen 1 "Signal metrics" block
export const NRS_METRICS = [
  { label: 'Estimated cost exposure', value: '$2.8M–$4.1M', note: 'recovery + reaccom + reserve/OT' },
  { label: 'Propagation probability', value: '42%', note: 'risk of spread beyond ATL' },
  { label: 'Reserve coverage ratio', value: '0.82x', note: 'legal reserves vs projected demand' },
  { label: 'First critical departure', value: 'DL1423 ATL–MCO', note: 'T-4h 35m' },
]

// Multi-hub cascading view — Screen 1 "Multi-hub" table
export const NRS_HUB_IMPACT = [
  { hub: 'ATL', state: 'Score 92', crew: '22 pairings', flights: '78 flights', pax: '11,200', level: 'L0→L1 · crew legality + reserve depletion' },
  { hub: 'JFK', state: 'Score 77', crew: '6 pairings', flights: '21 flights', pax: '3,400', level: 'L0 · inbound delay + crew positioning' },
  { hub: 'DTW', state: 'Score 69', crew: '4 pairings', flights: '15 flights', pax: '2,100', level: 'L1 watch · donor-hub reserve pressure' },
  { hub: 'MSP', state: 'Score 61', crew: '2 pairings', flights: '12 flights', pax: '1,720', level: 'L0 · aircraft/crew rotation coupling' },
]

// Cascade logic — Screen 1 "Cascade logic" block
export const NRS_CASCADE = [
  { level: 'Level 0 — Mass open trips & reserve draw', color: 'red', status: 'ACTIVE', trigger: 'Reserve coverage falls below projected bank demand (0.82x)', action: 'Activate + pre-position reserves before report time' },
  { level: 'Level 1 — Zero-sum crew shifting', color: 'orange', status: 'WATCH', trigger: 'Solving one flight opens another; donor-hub open trips rising', action: 'Contain source hub; block donor-hub cannibalization' },
  { level: 'Level 2 — Cross-hub contamination', color: 'yellow', status: 'PREVENT', trigger: 'Next-day trips fail at hubs not originally disrupted', action: 'Protect donor hubs; enable 24–72h restart plan' },
]

// Root-cause breakdown — Screen 1 "Root-cause" block
export const NRS_ROOT_CAUSE = [
  { domain: 'Crew', pct: 38, note: 'Legality stress, reserve shortage, open trips, mispositioning' },
  { domain: 'Network', pct: 24, note: 'Bank dependency, route criticality, delay propagation' },
  { domain: 'Aircraft', pct: 14, note: 'Tail readiness, broken rotation, maintenance-blocked swap' },
  { domain: 'External', pct: 14, note: 'Weather forecast, ATC constraints, airport capacity' },
  { domain: 'Passenger', pct: 10, note: 'Connection load, premium exposure, reaccom burden' },
]

// Network map for visualization
export const NRS_NETWORK = {
  nodes: [
    { id: 'atl', type: 'hub', label: 'ATL', x: 50, y: 30, status: 'at-risk', crew: 78, aircraft: 34 },
    { id: 'jfk', type: 'hub', label: 'JFK', x: 30, y: 60, status: 'at-risk', crew: 21, aircraft: 12 },
    { id: 'dtw', type: 'hub', label: 'DTW', x: 70, y: 50, status: 'warning', crew: 15, aircraft: 10 },
    { id: 'msp', type: 'hub', label: 'MSP', x: 70, y: 20, status: 'normal', crew: 12, aircraft: 8 },
    { id: 'crew-pool-atl', type: 'resource', label: 'Reserve Pool (ATL)', x: 50, y: 10, status: 'warning', count: 18 },
    { id: 'crew-pool-donor', type: 'resource', label: 'Donor Pool (DTW/MSP)', x: 30, y: 80, status: 'warning', count: 8 },
  ],
  before: [
    { from: 'crew-pool-atl', to: 'atl', flights: 78, status: 'at-risk' },
    { from: 'jfk', to: 'atl', flights: 21, status: 'at-risk' },
    { from: 'atl', to: 'dtw', flights: 15, status: 'warning' },
    { from: 'atl', to: 'msp', flights: 12, status: 'normal' },
  ],
  afterById: {
    combined: [
      { from: 'crew-pool-atl', to: 'atl', flights: 78, status: 'protected' },
      { from: 'crew-pool-donor', to: 'atl', flights: 8, status: 'protected' },
      { from: 'jfk', to: 'atl', flights: 21, status: 'protected' },
    ],
  },
}

export const NRS_ACCENT = 'red'

export const NRS_LOADING_LINES = {
  1: ['Ingesting crew · aircraft · weather · passenger feeds…', 'Scoring network risk across flights / pairings / hubs…', 'Matching disruption precedents…', 'Signal analysis ready.'],
  2: ['Loading objective framework…', 'Weighting crew protection / cancellation / CX…', 'Objectives ready.'],
  3: ['Loading recovery levers…', 'Applying recommended configuration…', 'Levers ready.'],
  4: ['Assembling scenario setup…', 'Running crew legality + readiness checks…', 'Summary ready.'],
  5: ['Running Monte Carlo simulation (1,000 iterations)…', 'Comparing recovery scenarios vs baseline…', 'Ranking recommendations…'],
  6: ['Assembling execution package…', 'Validating legality + guardrails…', 'Ready for OCC approval.'],
  7: ['Capturing realized outcomes…', 'Comparing predicted vs actual…', 'Updating priors + scenario library…'],
}

export const NRS_VARIANTS = [
  { scenario: 'Baseline / Do Nothing', desc: 'Current schedule continues — Level 1 escalation likely at ATL evening bank' },
  { scenario: 'Option 1 — Critical Bank Stabilization', desc: 'Activate + pre-position reserves, selective delay, tail swaps, early reaccom' },
  { scenario: 'Option 2 — Selective Schedule Thinning', desc: 'Pre-cancel low-connectivity flights; reassign crew to protect higher-impact flights' },
  { scenario: 'Option 3 — Alternate Hub / Overnight Reset', desc: 'Reroute via DTW/MSP; redeploy crew overnight; protect next-day ATL launch' },
]

export const NRS_VALIDATION = [
  'Crew legality constraints verified (rest, duty, qualification)',
  'Aircraft maintenance eligibility checked',
  'Hub closure forecast confidence validated',
  'Reserve pool capacity constraints checked',
  'Passenger misconnection impact assessed',
  'Cross-hub domicile and pairing feasibility checked',
  'Policy exception approvals required for deviations',
  'Crew notification and scheduling system integration verified',
]

export const NRS_BASELINE = [
  { kpi: 'At-risk flights', value: '126' },
  { kpi: 'Open trips projected', value: '17 flights' },
  { kpi: 'Propagation probability', value: '42%' },
  { kpi: 'Misconnects at risk', value: '2,480' },
  { kpi: 'Reserve exhaustion ETA', value: 'T+7h' },
  { kpi: 'Cost-to-recover', value: '$4.1M' },
  { kpi: 'Completion factor risk', value: 'High' },
  { kpi: 'Cascade state', value: 'Level 0 → Level 1' },
]

export const NRS_RECOMMENDATIONS = [
  {
    id: 'stabilize',
    rank: 1,
    tone: 'green',
    recommended: true,
    cardTitle: 'Option 1: Critical Bank Stabilization',
    trigger: 'ATL evening bank at risk; reserve coverage 0.82x; Level 1 escalation likely without action.',
    leversUsed: 'Reserve activation + pre-positioning · selective delay · tail swap · early reaccom',
    impacted: '18 reserves · 8 pre-positioned crew · 4 delayed flights · 3 tail swaps · 620 pax',
    confidence: '88% execution confidence · best network stability',
    whyNot: 'Uses more reserve hours than thinning; moderate reserve cost.',
    recommends: [
      'Activate 18 ATL reserves and pre-position 8 crew from DTW/MSP/JFK.',
      'Delay 4 connection-critical flights up to 35 min.',
      'Tail-swap 3 ready aircraft into the protected bank.',
      'Reaccommodate 620 high-risk passengers early.',
    ],
    kpi: [
      { k: 'Cancellations avoided', b: '—', a: '18', d: '+18' },
      { k: 'Completion factor protected', b: '—', a: '+1.1 pts', d: 'Improved' },
      { k: 'Open trips unresolved', b: '17', a: '7', d: '-10 trips' },
      { k: 'Misconnects at risk', b: '2,480', a: '1,320', d: '-1,160' },
      { k: 'Cost-to-recover', b: '$4.1M', a: '$3.0M', d: '-$1.1M' },
      { k: 'Propagation probability', b: '42%', a: '22%', d: '-20 pts' },
    ],
    why: 'Passes all hard gates, avoids donor-hub cannibalization, and protects the bank without visible cancellations — highest execution confidence.',
    bestWhen: 'Use when the priority is protecting the ATL bank without triggering visible cancellation pressure.',
    risk: 'Do not approve if reserve arrival feasibility from DTW/MSP cannot be confirmed before report time.',
    plan: {
      title: 'Network Protection Plan — Critical Bank Stabilization',
      objective: 'Protect ATL evening-bank stability and completion factor without visible cancellations, containing Level 1 escalation.',
      phases: [
        { name: 'Phase 1 — Activate & pre-position (0–2 hr)', actions: ['Activate 18 legal ATL reserves', 'Pre-position 8 crew from DTW/MSP/JFK before report time', 'Confirm legality and rest'] },
        { name: 'Phase 2 — Delay & swap (1–3 hr)', actions: ['Apply controlled delay (≤35 min) to 4 connection-critical flights', 'Tail-swap 3 maintenance-ready aircraft into the bank'] },
        { name: 'Phase 3 — Protect passengers (2–4 hr)', actions: ['Reaccommodate 620 high-risk passengers early', 'Track connection-critical flows until bank stabilizes'] },
      ],
      changes: [
        { area: 'Crew Positioning', change: 'Activate 18 reserves + pre-position 8; no donor-hub Level 1 risk' },
        { area: 'Schedule', change: 'Controlled delay on 4 connection-critical flights; no cancellations' },
        { area: 'Aircraft', change: 'Tail-swap 3 ready tails; maintenance-ready only' },
        { area: 'Passengers', change: 'Early reaccom for 620 connection-critical passengers' },
      ],
      guardrails: ['Crew legality / rest hard constraint', 'Tail swaps require maintenance readiness', 'No new donor-hub Level 1 risk', 'Human-in-the-loop approval before execution'],
      expected: 'At-risk flights 126 → ~78; open trips 17 → 7; propagation 42% → 22%; cost $4.1M → $3.0M.',
    },
  },
  {
    id: 'thin',
    rank: 2,
    tone: 'blue',
    recommended: false,
    cardTitle: 'Option 2: Selective Schedule Thinning',
    trigger: 'Reserve coverage deteriorating further; containment prioritized over customer-visible continuity.',
    leversUsed: 'Flight priority ranking · selective pre-cancellation · crew reassignment · proactive reaccom',
    impacted: '5 low-connectivity flights pre-cancelled · 20 higher-impact flights protected',
    confidence: '74% execution confidence · lowest propagation risk',
    whyNot: 'Higher visible cancellations; use only when reserve capacity deteriorates further.',
    recommends: [
      'Pre-cancel 5 low-connectivity flights.',
      'Reassign released crews to protect 20 higher-impact flights.',
      'Run proactive passenger reaccommodation.',
    ],
    kpi: [
      { k: 'Cancellations avoided', b: '—', a: '20', d: '+20' },
      { k: 'Completion factor protected', b: '—', a: '+1.2 pts', d: 'Improved' },
      { k: 'Open trips unresolved', b: '17', a: '5', d: '-12 trips' },
      { k: 'Misconnects at risk', b: '2,480', a: '1,610', d: '-870' },
      { k: 'Cost-to-recover', b: '$4.1M', a: '$2.7M', d: '-$1.4M' },
      { k: 'Propagation probability', b: '42%', a: '19%', d: '-23 pts' },
    ],
    why: 'Pre-cancelling low-connectivity flights releases crew to protect higher-impact flights — lowest propagation and lowest cost.',
    bestWhen: 'Use when reserve capacity deteriorates further and containment must beat customer-visible continuity.',
    risk: 'Higher visible cancellations and passenger rebooking; requires ops-leadership approval.',
    plan: {
      title: 'Network Protection Plan — Selective Schedule Thinning',
      objective: 'Contain propagation at lowest cost by pre-cancelling low-connectivity flights and reallocating crew to higher-impact flights.',
      phases: [
        { name: 'Phase 1 — Rank & select (0–1 hr)', actions: ['Rank flights by connectivity and connection load', 'Select 5 low-connectivity pre-cancel candidates'] },
        { name: 'Phase 2 — Pre-cancel & reassign (1–4 hr)', actions: ['Issue pre-cancellation notices', 'Reassign released crews to protect 20 higher-impact flights', 'Initiate proactive reaccommodation'] },
        { name: 'Phase 3 — Confirm & monitor (2–6 hr)', actions: ['Confirm legality for all reassignments', 'Monitor propagation and reserve coverage'] },
      ],
      changes: [
        { area: 'Schedule', change: 'Pre-cancel 5 low-connectivity flights; protect 20 higher-impact flights' },
        { area: 'Crew', change: 'Reassign released crews to higher-impact rotations' },
        { area: 'Passengers', change: 'Proactive reaccommodation for cancelled-flight passengers' },
        { area: 'Aircraft', change: 'No swaps; use scheduled fleet' },
      ],
      guardrails: ['Ops-leadership approval required', 'Passenger rebooking confirmed before execution', 'Crew legality maintained for all reassignments', 'Donor-hub stability preserved'],
      expected: 'Open trips 17 → 5; propagation 42% → 19%; cost $4.1M → $2.7M; 20 higher-impact flights protected.',
    },
  },
  {
    id: 'reset',
    rank: 3,
    tone: 'orange',
    recommended: false,
    cardTitle: 'Option 3: Alternate Hub / Overnight Reset',
    trigger: 'Level 1 appears; next-day ATL restart readiness at risk.',
    leversUsed: 'Alternate hub routing · overnight crew redeploy · 24–72h restart plan',
    impacted: 'Selected flows via DTW/MSP · 12 crew redeployed overnight · next-day ATL launch',
    confidence: '69% execution confidence · best next-day readiness',
    whyNot: 'Highest execution complexity and coordination overhead.',
    recommends: [
      'Reroute selected flows via DTW/MSP.',
      'Redeploy 12 crew overnight.',
      'Protect the next-day ATL launch with a 24–72h restart plan.',
    ],
    kpi: [
      { k: 'Cancellations avoided', b: '—', a: '13', d: '+13' },
      { k: 'Completion factor protected', b: '—', a: '+0.7 pts', d: 'Improved' },
      { k: 'Open trips unresolved', b: '17', a: '10', d: '-7 trips' },
      { k: 'Misconnects at risk', b: '2,480', a: '1,480', d: '-1,000' },
      { k: 'Cost-to-recover', b: '$4.1M', a: '$3.4M', d: '-$0.7M' },
      { k: 'Propagation probability', b: '42%', a: '27%', d: '-15 pts' },
    ],
    why: 'Best protects next-day ATL restart readiness by routing around the at-risk bank and redeploying crew overnight.',
    bestWhen: 'Use when Level 1 has appeared and next-day restart readiness is the dominant priority.',
    risk: 'Highest coordination complexity across ground ops and crew logistics; longest execution window.',
    plan: {
      title: 'Network Protection Plan — Alternate Hub / Overnight Reset',
      objective: 'Protect next-day ATL launch by rerouting selected flows via DTW/MSP and redeploying crew overnight.',
      phases: [
        { name: 'Phase 1 — Route selection (0–2 hr)', actions: ['Identify connection-heavy flows to reroute via DTW/MSP', 'Confirm alternate-hub feasibility'] },
        { name: 'Phase 2 — Overnight redeploy (2–8 hr)', actions: ['Redeploy 12 crew overnight', 'Coordinate ground ops for gate/crew logistics'] },
        { name: 'Phase 3 — Next-day restart (8–24 hr)', actions: ['Execute 24–72h restart plan', 'Protect next-day ATL launch banks'] },
      ],
      changes: [
        { area: 'Network', change: 'Reroute selected flows via DTW/MSP; avoid cross-hub contamination' },
        { area: 'Crew Positioning', change: 'Redeploy 12 crew overnight for next-day readiness' },
        { area: 'Recovery', change: '24–72h restart plan protecting next-day ATL launch' },
        { area: 'Passengers', change: 'Reroute connection-heavy flows; protect connections' },
      ],
      guardrails: ['Alternate routing must not create cross-hub contamination', 'Crew legality / rest hard constraint', 'Donor-hub stability preserved', 'Human-in-the-loop approval before execution'],
      expected: 'Open trips 17 → 10; propagation 42% → 27%; cost $4.1M → $3.4M; next-day ATL restart protected.',
    },
  },
]

export const NRS_RANKING = [
  { rank: 1, reco: 'Critical Bank Stabilization', service: 'Highest', cost: 'Medium', speed: 'High', feasibility: 'High', select: 'Selected' },
  { rank: 2, reco: 'Selective Schedule Thinning', service: 'Medium-high', cost: 'Lowest', speed: 'Medium', feasibility: 'Medium-high', select: 'Alternative' },
  { rank: 3, reco: 'Alternate Hub / Overnight Reset', service: 'Medium', cost: 'Medium-high', speed: 'Low', feasibility: 'Medium', select: 'Alternative' },
]

export const NRS_FRONTIER = {
  xLabel: 'Cost-to-recover ($M)', yLabel: 'Propagation probability (%)', zLabel: 'Execution confidence (%)',
  points: [
    { x: 4.1, y: 42, z: 0, label: 'Do nothing', tone: 'gray' },
    { x: 3.0, y: 22, z: 88, label: 'Bank stabilization', tone: 'green', recommended: true },
    { x: 2.7, y: 19, z: 74, label: 'Schedule thinning', tone: 'blue' },
    { x: 3.4, y: 27, z: 69, label: 'Alternate hub reset', tone: 'orange' },
  ],
}

export const NRS_APPROVAL = {
  selected: 'Critical Bank Stabilization',
  action: 'Activate 18 reserves + pre-position 8 crew + selective delay + 3 tail swaps + early reaccom',
  summary: [
    { field: 'Decision owner', value: 'OCC duty manager' },
    { field: 'Approval type', value: 'Human approval required' },
    { field: 'Auto-execution', value: 'Disabled' },
    { field: 'Audit status', value: 'Decision log will be created' },
  ],
  execItems: [
    { item: 'Reserve activation', target: 'Crew scheduling / crew ops', action: 'Assign 18 legal ATL reserves' },
    { item: 'Reserve movement', target: 'Crew scheduling + deadhead flow', action: 'Pre-position 8 crew from DTW/MSP/JFK' },
    { item: 'Flight delay plan', target: 'Network operations', action: 'Controlled delay on 4 connection-critical flights (≤35 min)' },
    { item: 'Tail swaps', target: 'Aircraft / maintenance planning', action: 'Swap 3 ready tails into the protected bank' },
    { item: 'Passenger protection', target: 'Reaccommodation', action: 'Reaccommodate 620 high-risk passengers early' },
    { item: 'Audit trail', target: 'Decision log', action: 'Store rationale, constraints, approvals, and selected option' },
  ],
  rationale: 'Passes all hard gates, avoids donor-hub cannibalization, and protects the ATL bank without visible cancellations — highest execution confidence. Cuts propagation 42% → 22% and cost $4.1M → $3.0M.',
  constraints: ['Crew legality / rest', 'Crew qualification', 'Pairing validity', 'Aircraft maintenance readiness', 'Donor-hub stability', 'Passenger priority rules', 'Human approval'],
}

export const NRS_SAVE = {
  name: 'ATL Evening Bank Stabilization — Network Vulnerability Scan',
  tags: ['NETWORK RISK RADAR', 'ATL EVENING BANK', 'JFK DEPENDENCY', 'LEVEL 0 CONTAINMENT', 'LEVEL 1 PREVENTION'],
  reusableFor: [
    'weather disruption',
    'crew shortage',
    'reserve depletion',
    'cross-hub propagation',
    'forecast-led pre-disruption planning',
  ],
}

export const NRS_OUTCOMES = [
  { metric: 'Cancellations avoided', pred: '18', actual: '16', learn: 'Reserve arrival feasibility was optimistic' },
  { metric: 'Open trips unresolved', pred: '7', actual: '9', learn: 'Coverage probability overestimated for two pairings' },
  { metric: 'Misconnects at risk', pred: '1,320', actual: '1,410', learn: 'Gate delay added exposure despite connection protection' },
  { metric: 'Cost-to-recover', pred: '$3.0M', actual: '$3.2M', learn: 'Deadhead + passenger cost slightly above forecast' },
  { metric: 'Propagation', pred: '22%', actual: 'L1 contained', learn: 'Cross-hub containment succeeded; no Level 2' },
  { metric: 'Time to stabilize', pred: '4.5h', actual: '5.1h', learn: 'Aircraft readiness introduced delay' },
]

export const NRS_INSIGHTS = [
  'ATL reserve burn ran higher than expected — weight reserve depletion risk more in high-bank-density windows.',
  'JFK inbound dependency was underestimated — raise bank-dependency weight for inbound crew flows.',
  'Tail swaps reduced delay but added coordination time — penalize aircraft-coupled options for execution complexity.',
  'Early passenger reaccommodation cut misconnect exposure — promote it earlier in Level 0 workflows.',
  'No Level 2 contamination occurred — keep donor-hub protection as the default rule.',
]

export const NRS_LEARN = {
  accuracy: [
    { label: 'Overall prediction accuracy', value: '89%' },
    { label: 'Cancellations avoided', value: '±2' },
    { label: 'Time to stabilize', value: '±0.6 hr' },
    { label: 'Cost-to-recover', value: '±$0.2M' },
  ],
  recalibration: [
    { label: 'Crew legality + reserve weight (ATL evening banks)', before: 'w=0.55', after: 'w=0.66', delta: '+0.11', note: 'Reserve burn ran hotter than simulated' },
    { label: 'Donor-hub propagation penalty (reserves < 1.0x)', before: '0.20', after: '0.35', delta: '+0.15', note: 'Strengthen when coverage below 1.0x' },
    { label: 'Passenger reaccom value (connection-heavy banks)', before: 'w=0.55', after: 'w=0.64', delta: '+early reaccom', note: 'Early reaccom reduced misconnects' },
  ],
  patterns: [
    'ATL evening banks with reserve coverage below 1.0x precede open-trip surges by roughly one bank.',
    'Early passenger reaccommodation in connection-heavy banks outperforms delay-only protection.',
    'Aircraft-coupled recommendations reduce delay but add coordination time not captured by delay alone.',
  ],
  twin: { nodesEnriched: 126, lanesEnriched: 34, before: '78%', after: '89%', summary: '126 flight twins · 34 pairing twins enriched — crew + network twins updated with realized ATL evening-bank recovery outcomes' },
}

// ── Primary Signal for Screen 1: Network Risk Radar ────────────────────────────
export const NRS_SIGNAL = {
  sentinel: 'Network Risk Radar',
  bannerText: 'Network Risk Radar — ATL evening bank flights, pairings, and hubs ranked by failure probability.',
  card: [
    { label: 'Signal class', value: 'Primary Sense + Analyze (Crew-Aircraft-Network-Passenger aggregate)' },
    { label: 'Severity', value: 'CRITICAL' },
    { label: 'Network Risk Score', value: '87 / 100' },
    { label: 'Confidence', value: '91%' },
    { label: 'Impacted scope', value: '126 flights / 34 pairings / 4 hubs' },
    { label: 'Cascade state', value: 'Level 0 → Level 1 watch' },
    { label: 'Response window', value: 'T-16h to T-4h' },
  ],
  sourceChips: ['CREW', 'NETWORK', 'AIRCRAFT', 'PASSENGER', 'EXTERNAL', 'DERIVED'],
  detail: 'TwinX ranks ATL evening-bank flights, pairings, and hubs most likely to fail. Reserve coverage at 0.82x, thinning crew legality buffers, weather/ATC uncertainty, and JFK inbound mispositioning indicate the bank may deteriorate into open trips or cancellations without action.',
  conditions: [
    'Reserve coverage is below projected bank demand (0.82x),',
    'Impacted pairings are rising faster than reserve availability,',
    'Aircraft readiness gaps exist for priority rotations,',
    'Propagation probability to DTW/MSP is rising (42%).',
  ],
  conditionsNote: 'Crew, Aircraft, Network, and Passenger Twins use legality, qualification, readiness, and bank dependency as state variables, and reserve depletion / donor-hub pressure / aircraft unavailability as critical events.',
}

export const NRS_PRECEDENTS = [
  { episode: 'ATL evening bank storm replay', similarity: 83, pattern: 'ATL bank + reserve drawdown + inbound delays', outcome: 'High cancellation pressure', lesson: 'Pre-position reserves earlier' },
  { episode: 'JFK inbound crew compression', similarity: 71, pattern: 'Crew mispositioning + tight connections', outcome: 'Several downstream delays', lesson: 'Avoid donor crew pull from protected flights' },
  { episode: 'Holiday peak reserve stress', similarity: 68, pattern: 'High load + low reserve elasticity', outcome: 'Reserve exhaustion', lesson: 'Add schedule-thinning option earlier' },
]

export const NRS_HYPOTHESIS = 'If OCC stabilizes the ATL evening bank early — activating and pre-positioning reserves, applying selective delay, tail-swapping ready aircraft, and reaccommodating at-risk passengers — then the network can contain Level 1 propagation while avoiding visible cancellations and limiting recovery cost.'
export const NRS_INIT_RECO = {
  nextStep: 'Run Network Vulnerability Scan simulation.',
  path: 'Ranked flights/pairings/hubs → crew + aircraft readiness check → reserve positioning → scenario comparison → OCC approval',
}

// ── Screen 2 — Objectives & KPIs ────────────────────────────────────────────────
export const NRS_PRIMARY_OBJECTIVES = [
  { value: 'Protect crew legality', desc: 'Maintain all crew within duty, rest, and qualification limits' },
  { value: 'Prevent open trips', desc: 'Ensure all scheduled flights remain crewed' },
  { value: 'Minimize cancellations', desc: 'Protect revenue and customer commitments' },
  { value: 'Protect hub stability', desc: 'Prevent hub closure cascades to other bases' },
  { value: 'Optimize reserve utilization', desc: 'Use reserves efficiently without exhaustion' },
  { value: 'Minimize passenger misconnects', desc: 'Protect customer experience and network value' },
]
export const NRS_PRIMARY_DEFAULT = 'Prevent open trips'

export const NRS_SECONDARY_OBJECTIVES = [
  { value: 'Reduce reserve burn rate', desc: 'Avoid rapid reserve depletion' },
  { value: 'Prevent crew stranding', desc: 'Minimize mid-rotation crew repositioning need' },
  { value: 'Reduce schedule disruption', desc: 'Minimize delay and cancellation count' },
  { value: 'Contain hub closure impact', desc: 'Prevent multi-hub contamination' },
  { value: 'Reduce crew fatigue cost', desc: 'Avoid expensive incentive activation' },
  { value: 'Minimize schedule recovery time', desc: 'Restore normal ops quickly' },
]
export const NRS_SECONDARY_DEFAULT = ['Reduce reserve burn rate', 'Prevent crew stranding']

export const NRS_KPI_OPTIONS = [
  { value: 'Flights protected / crewed', type: 'Primary ops', rec: true },
  { value: 'Open trips prevented', type: 'Primary crew', rec: true },
  { value: 'Crew legality maintained', type: 'Compliance', rec: true },
  { value: 'Cancellations avoided', type: 'Revenue', rec: true },
  { value: 'Reserve utilization rate', type: 'Capacity', rec: true },
  { value: 'Hub closure containment', type: 'Network', rec: true },
  { value: 'Passenger misconnects avoided', type: 'Customer', rec: true },
  { value: 'Crew fatigue cost', type: 'Operations', rec: false },
  { value: 'Schedule recovery time', type: 'Resilience', rec: false },
  { value: 'Cross-hub contamination prevented', type: 'Network', rec: false },
  { value: 'Policy exceptions required', type: 'Risk', rec: false },
]
export const NRS_KPI_DEFAULT = NRS_KPI_OPTIONS.filter(k => k.rec).map(k => k.value)

// ── Screen 3 — Simulation Levers (recommended = default) ───────────────────────
export const NRS_LEVER_GROUPS = [
  {
    group: 'A', title: 'Crew protection & recovery levers', color: 'red',
    levers: [
      { id: 'priorityFlightThreshold', label: 'Priority flight threshold', control: 'select', options: ['Top 30% risk flights', 'Top 25% risk flights', 'Top 20% risk flights', 'Top 15% risk flights'], recommended: 'Top 20% risk flights', why: 'Focuses crew assignment on highest-impact flights' },
      { id: 'reservePreposition', label: 'Reserve pre-positioning', control: 'switch', recommended: true, onLabel: 'On', why: 'Tests early reserve movement to high-risk hubs' },
      { id: 'crewLegalityThreshold', label: 'Crew legality buffer', control: 'select', options: ['Current regulation', '30 mins below limit', '1 hr below limit', '2 hrs below limit'], recommended: '1 hr below limit', why: 'Adds safety margin to legality constraints' },
      { id: 'swapEligibility', label: 'Crew swap eligibility', control: 'select', options: ['Same-base only', 'Same-base + one-leg reposition', 'Same-base + multi-leg flexibility'], recommended: 'Same-base + one-leg reposition', why: 'Expands feasible crew assignment without excessive positioning' },
      { id: 'incentiveThreshold', label: 'Crew incentive trigger', control: 'select', options: ['Reserve > 20% depletion', 'Reserve > 30% depletion', 'Open trips > 5'], recommended: 'Reserve > 20% depletion', why: 'Uses incentives early to avoid cascade' },
    ],
  },
  {
    group: 'B', title: 'Aircraft & readiness levers', color: 'orange',
    levers: [
      { id: 'tailSwap', label: 'Tail swap eligibility', control: 'switch', recommended: true, onLabel: 'On for at-risk flights', why: 'Tests aircraft substitution for priority flights' },
      { id: 'maintenancePostpone', label: 'Maintenance deferral', control: 'select', options: ['No deferral', 'Defer non-critical maint for priority flights'], recommended: 'Defer non-critical maint for priority flights', why: 'Maximizes aircraft availability without safety impact' },
      { id: 'aircraftReadinessTarget', label: 'Aircraft readiness target', control: 'select', options: ['Current plan', '95% readiness', '98% readiness'], recommended: '95% readiness', why: 'Ensures sufficient fleet availability' },
      { id: 'tailPositioning', label: 'Tail positioning flexibility', control: 'select', options: ['Current positioning', 'Allow one-leg early positioning'], recommended: 'Allow one-leg early positioning', why: 'Positions aircraft for high-risk rotations' },
    ],
  },
  {
    group: 'C', title: 'Network & hub levers', color: 'purple',
    levers: [
      { id: 'weatherThreshold', label: 'Hub closure forecast threshold', control: 'select', options: ['60% closure prob', '50% closure prob', '40% closure prob'], recommended: '50% closure prob', why: 'Triggers pre-disruption action at early warning' },
      { id: 'preCancel', label: 'Low-priority flight pre-cancel', control: 'switch', recommended: true, onLabel: 'On', why: 'Tests selective cancellation to protect reserve capacity' },
      { id: 'crossHubRebalance', label: 'Cross-hub reserve rebalance', control: 'switch', recommended: true, onLabel: 'On', why: 'Redistributes reserves across hubs proactively' },
      { id: 'routeAlternate', label: 'Alternate hub routing', control: 'select', options: ['Current routing', 'Allow one-hub alternate', 'Allow multi-hub alternate'], recommended: 'Allow one-hub alternate', why: 'Routes flights around at-risk hubs' },
      { id: 'bankDependency', label: 'Bank dependency breakage', control: 'select', options: ['Maintain bank structure', 'Allow bank shifts for priority flights'], recommended: 'Allow bank shifts for priority flights', why: 'Protects critical flight connections' },
    ],
  },
  {
    group: 'D', title: 'Cost / customer impact levers', color: 'blue',
    levers: [
      { id: 'cancellationCost', label: 'Cancellation cost proxy', control: 'select', options: ['Current proxy', 'Increase for high-value routes'], recommended: 'Increase for high-value routes', why: 'Prioritizes protecting revenue-generating flights' },
      { id: 'misconnectProxy', label: 'Passenger misconnect cost', control: 'select', options: ['Current proxy', 'Increase for connection-heavy routes'], recommended: 'Increase for connection-heavy routes', why: 'Protects customer experience and brand' },
      { id: 'fatigueCost', label: 'Crew fatigue cost', control: 'select', options: ['Current cost', 'Include long-term health cost'], recommended: 'Current cost', why: 'Balances short-term ops with crew wellbeing' },
      { id: 'ttrTarget', label: 'TTR (recovery time) target', control: 'select', options: ['6 hours', '4 hours', '2 hours'], recommended: '4 hours', why: 'Prioritizes faster network recovery' },
    ],
  },
]

export const NRS_ALL_LEVERS = NRS_LEVER_GROUPS.flatMap(g => g.levers)
export const NRS_LEVER_DEFAULTS = Object.fromEntries(NRS_ALL_LEVERS.map(l => [l.id, l.recommended]))

export const NRS_LEVER_SUMMARY = [
  'Prioritize top 20% risk flights for crew assignment',
  'Pre-position reserves to high-risk hubs',
  'Add 1-hour safety margin to crew legality limits',
  'Enable crew swap with one-leg repositioning flexibility',
  'Enable tail swap for at-risk flights',
  'Defer non-critical maintenance for priority aircraft',
  'Trigger hub closure pre-action at 50% forecast probability',
  'Enable selective pre-cancellation of low-priority flights',
  'Enable cross-hub reserve rebalancing',
  'Allow alternate hub routing for critical flights',
  'Increase cancellation cost for high-value routes',
  'Increase misconnection cost for connection-heavy routes',
]

// ── Screen 4 — Simulation Summary ──────────────────────────────────────────────
export const NRS_SCENARIO = {
  name: 'ATL Network Vulnerability Scan — Evening Bank',
  signal: 'Network Risk Radar — Ranked Flights, Pairings & Hubs at Risk',
  objective: 'Protect network stability and completion factor for the ATL evening bank while containing Level 1 propagation, with CX and cost guardrails.',
  method: 'Crew Twin legality model + Aircraft Twin readiness model + Weather/External Twin forecast + passenger flow model + forecast-led pre-disruption + network stress test vs do-nothing baseline.',
}

export const NRS_SCOPE = [
  { item: 'Flights in scope', value: '126 flights across ATL/JFK/DTW/MSP' },
  { item: 'Crew pairings', value: '34 rotation pairings at risk' },
  { item: 'Hubs involved', value: 'ATL (primary) + JFK/DTW/MSP exposure' },
  { item: 'Time horizon', value: 'T-16h to T-4h (forecast-to-live transition)' },
  { item: 'Reserve coverage', value: '0.82x — below projected demand' },
  { item: 'First critical departure', value: 'DL1423 ATL–MCO · T-4h 35m' },
]

// ── Live Signal Cards — rendered on the Use Case Catalog / Signals page ─────────
// All 9 signals route to UC1 (uc-network-risk-operations) per current scope.
const UC1 = 'uc-network-risk-operations'
export const NRS_LIVE_SIGNALS = [
  {
    ucId: 'nrs-network-risk-radar',
    linkedUseCaseId: UC1,
    severity: 'CRITICAL', severityColor: 'red', stage: 'SENSE',
    title: 'Network Risk Radar — Ranked Flights, Pairings & Hubs at Risk',
    description: 'Top-of-tower signal ranking flights, pairings, hubs, and stations most likely to fail.',
    detail: 'Primary Sense + Analyze signal. Aggregates crew, aircraft, network, passenger, and external signals into a unified risk score, highlighting where disruption is most likely to convert into open trips or cancellations — enabling early prioritization. Scenario: ATL evening bank (T-16h→T-4h), reserve coverage 0.82x, Level 0 → Level 1 watch. Likely root causes: crew legality/reserve depletion, bank dependency and delay propagation, aircraft readiness gaps, weather/ATC.',
    sourceChip: 'CREW · AIRCRAFT · NETWORK · PAX · WX/ATC',
    agent: 'Network Risk Radar', date: '7/13/2026',
    metricValue: '126', metricUnit: 'flights at risk',
    metricStripLabel: 'Impacted flights', metricSub: 'Network Risk Score 87 · 34 pairings',
    tags: ['RISK SCORE 87', 'IMPACTED PAIRINGS', 'CREW LEGALITY', 'RESERVE 0.82x', 'ATL EVENING BANK'],
    precedents: 3, precedentNote: null, confidence: 91,
    window: 'T-16h to T-4h',
    trendLabel: 'NETWORK RISK TREND — Ranked Flights at Risk',
    trendData: [
      { x: 'T-24', v: 42 }, { x: 'T-18', v: 71 }, { x: 'T-12', v: 104 },
      { x: 'T-8', v: 119 }, { x: 'Now', v: 126 },
    ],
    scenario: 'ATL Network Vulnerability Scan',
    scenarioSub: 'Aggregate risk → rank flights/pairings/hubs → prioritize → delay vs cancel vs reroute',
  },
  {
    ucId: 'nrs-hub-closure',
    linkedUseCaseId: UC1,
    severity: 'CRITICAL', severityColor: 'red', stage: 'SENSE',
    title: 'Hub Closure Likelihood — Weather Window Emerging',
    description: 'Forecast-driven signal translating weather risk into operational exposure.',
    detail: 'Converts raw weather inputs into network impact — which flights, banks, and crew rotations will be affected if a hub shuts down. Earliest trigger for pre-disruption simulation. Likely root causes: weather forecast (storms, visibility), ATC ground-stop risk, airport capacity constraints.',
    sourceChip: 'WEATHER API · ATC · AIRPORT OPS',
    agent: 'Hub Weather Sentinel', date: '7/13/2026',
    metricValue: '67%', metricUnit: 'closure probability',
    metricStripLabel: 'Closure probability', metricSub: 'exposed flights/banks',
    tags: ['CLOSURE PROBABILITY', 'EXPOSED BANKS', 'EXPOSED PAIRINGS', 'ATC GROUND STOP', 'WX WINDOW'],
    precedents: 6, precedentNote: null, confidence: 84,
    window: '24–48 hrs',
    trendLabel: 'HUB CLOSURE PROBABILITY TREND — Forecast Window',
    trendData: [
      { x: 'T-48', v: 12 }, { x: 'T-42', v: 20 }, { x: 'T-36', v: 31 },
      { x: 'T-30', v: 44 }, { x: 'T-24', v: 55 }, { x: 'T-18', v: 62 }, { x: 'Now', v: 67 },
    ],
    scenario: 'Forecast-Led Hub Closure Simulation',
    scenarioSub: 'Weather forecast → hub/bank exposure → schedule thinning / pre-cancel / reserve pre-position',
  },
  {
    ucId: 'nrs-uncovered-trip',
    linkedUseCaseId: UC1,
    severity: 'CRITICAL', severityColor: 'red', stage: 'SENSE',
    title: 'Uncovered Trip Detected — Time-to-Departure Critical',
    description: 'Flags flights without assigned crew within the critical execution window.',
    detail: 'Triggered when a trip becomes uncovered. With ~2% voluntary acceptance rates, waiting for pickup is ineffective — this signal forces immediate simulation instead of reactive waiting. Likely root causes: crew sick call/no-show, low acceptance rates, legality breach, mispositioned crew.',
    sourceChip: 'CREW SCHEDULING · LEGALITY FEED',
    agent: 'Crew Coverage Sentinel', date: '7/13/2026',
    metricValue: '19', metricUnit: 'open trips',
    metricStripLabel: 'Open trips', metricSub: 'acceptance prob ~2%',
    tags: ['OPEN TRIPS', 'TIME TO DEPARTURE', 'COVERAGE PROBABILITY', 'ACCEPTANCE RATE', 'LEGALITY BREACH'],
    precedents: 7, precedentNote: null, confidence: 92,
    window: 'Immediate / T-18 hrs',
    trendLabel: 'UNCOVERED TRIP TREND — Open Trips in Execution Window',
    trendData: [
      { x: 'T-18', v: 3 }, { x: 'T-15', v: 6 }, { x: 'T-12', v: 9 },
      { x: 'T-9', v: 12 }, { x: 'T-6', v: 15 }, { x: 'T-3', v: 17 }, { x: 'Now', v: 19 },
    ],
    scenario: 'Live Open Trip Recovery',
    scenarioSub: 'Uncovered trip → reserve activation / crew swap / incentive → delay or cancel decision',
  },
  {
    ucId: 'nrs-reserve-burn',
    linkedUseCaseId: UC1,
    severity: 'HIGH', severityColor: 'orange', stage: 'SENSE',
    title: 'Reserve Burn Rate Acceleration',
    description: 'Tracks how quickly reserve crew capacity is being consumed.',
    detail: 'Early warning for Level 0 → Level 1 cascade. If burn continues, recovery becomes zero-sum — pulling crew from other flights. Likely root causes: surge in open trips, weather disruption, late callouts, hub congestion.',
    sourceChip: 'RESERVE POOL · OPEN-TRIP INFLOW',
    agent: 'Reserve Sentinel', date: '7/13/2026',
    metricValue: '8', metricUnit: 'hrs to exhaustion',
    metricStripLabel: 'Exhaustion ETA', metricSub: 'burn 9 reserves/hr',
    tags: ['BURN RATE', 'REMAINING RESERVES', 'OPEN TRIP INFLOW', 'EXHAUSTION ETA', 'ZERO-SUM RISK'],
    precedents: 5, precedentNote: null, confidence: 86,
    window: 'Rolling (real-time across banks)',
    trendLabel: 'RESERVE BURN TREND — Remaining Reserves',
    trendData: [
      { x: 'T-6', v: 120 }, { x: 'T-5', v: 108 }, { x: 'T-4', v: 94 },
      { x: 'T-3', v: 86 }, { x: 'T-2', v: 74 }, { x: 'T-1', v: 68 }, { x: 'Now', v: 62 },
    ],
    scenario: 'Reserve Burn Containment Simulation',
    scenarioSub: 'Burn acceleration → pre-cancel low-value / rebalance reserves / incentive policy',
  },
  {
    ucId: 'nrs-mid-rotation-stranding',
    linkedUseCaseId: 'uc-mid-rotation-stranding',
    severity: 'CRITICAL', severityColor: 'red', stage: 'SENSE',
    title: 'Mid-Rotation Hub Stranding Detected',
    description: 'Crews stranded mid-rotation at ORD by weather/ATC; remaining legs open, ATL/JFK exposed.',
    detail: 'Level 0 onset, upgraded to Critical as Level 1 activates: ORD outbound cancels, crew is stuck out of domicile needing deadhead, and remaining legs go open. Recovery can create donor-flight risk (Level 1) and next-day cross-hub contamination (Level 2). Likely root causes: hub cancellation, weather/ATC, aircraft delay.',
    sourceChip: 'CREW · NETWORK · AIRCRAFT · PASSENGER',
    agent: 'Mid-Rotation Stranding Sentinel', date: '7/13/2026',
    metricValue: '14', metricUnit: 'stranded crews',
    metricStripLabel: 'Stranded crews', metricSub: '62 crew · 31 legs open',
    tags: ['STRANDED CREWS', '486 CREW-HOURS', '31 OPEN LEGS', 'DEADHEAD DEPENDENCY', 'L0/L1/L2 CASCADE'],
    precedents: 3, precedentNote: null, confidence: 84,
    window: 'Immediate · first replacement report in 2h 40m',
    trendLabel: 'MID-ROTATION STRANDING TREND — Stranded Crews',
    trendData: [
      { x: 'T-6', v: 0 }, { x: 'T-5', v: 2 }, { x: 'T-4', v: 5 },
      { x: 'T-3', v: 8 }, { x: 'T-2', v: 11 }, { x: 'T-1', v: 13 }, { x: 'Now', v: 14 },
    ],
    scenario: 'Stranded Hub Recovery',
    scenarioSub: 'ORD stranding → ATL displacement → JFK next-day → deadhead-first + reserve bridge + containment',
  },
  {
    ucId: 'nrs-cross-hub-propagation',
    linkedUseCaseId: UC1,
    severity: 'CRITICAL', severityColor: 'red', stage: 'SENSE',
    title: 'Cross-Hub Propagation Probability',
    description: 'Measures risk of disruption spreading beyond the original hub.',
    detail: 'Level 2 cascade detection. Indicates disruption is no longer local and is contaminating other hubs and next-day operations. Likely root causes: zero-sum crew shifts, reserve exhaustion, mispositioned crew.',
    sourceChip: 'MULTI-HUB · NEXT-DAY OPS',
    agent: 'Cascade Sentinel', date: '7/13/2026',
    metricValue: '54%', metricUnit: 'propagation prob',
    metricStripLabel: 'Propagation probability', metricSub: 'affected hubs',
    tags: ['PROPAGATION PROBABILITY', 'AFFECTED HUBS', 'NEW OPEN TRIPS', 'NEXT-DAY CONTAMINATION', 'LEVEL 2 CASCADE'],
    precedents: 5, precedentNote: null, confidence: 83,
    window: '6–24 hrs',
    trendLabel: 'CROSS-HUB PROPAGATION TREND — Contamination Probability',
    trendData: [
      { x: 'T-24', v: 8 }, { x: 'T-20', v: 16 }, { x: 'T-16', v: 25 },
      { x: 'T-12', v: 34 }, { x: 'T-9', v: 44 }, { x: 'T-6', v: 50 }, { x: 'Now', v: 54 },
    ],
    scenario: 'Cross-Hub Contamination Simulation',
    scenarioSub: 'Local disruption → cross-hub spread → stop cannibalization / contain source / rebalance',
  },
  {
    ucId: 'nrs-misconnect-exposure',
    linkedUseCaseId: UC1,
    severity: 'HIGH', severityColor: 'orange', stage: 'SENSE',
    title: 'Passenger Misconnect Exposure',
    description: 'Identifies passengers likely to miss connections due to disruption.',
    detail: 'Ensures crew recovery decisions incorporate CX impact, not just legality or cost — critical for protecting network value and brand. Likely root causes: delays, crew swaps, gate constraints, aircraft mismatch.',
    sourceChip: 'PASSENGER FEED · CONNECTION GRAPH',
    agent: 'Connection Sentinel', date: '7/13/2026',
    metricValue: '2,400', metricUnit: 'misconnects at risk',
    metricStripLabel: 'Misconnects at risk', metricSub: 'critical connections',
    tags: ['MISCONNECTS AT RISK', 'CRITICAL CONNECTIONS', 'BANK EXPOSURE', 'CX IMPACT', 'BRAND RISK'],
    precedents: 4, precedentNote: null, confidence: 87,
    window: 'Next bank / live',
    trendLabel: 'MISCONNECT EXPOSURE TREND — Passengers at Risk',
    trendData: [
      { x: 'T-6', v: 300 }, { x: 'T-5', v: 640 }, { x: 'T-4', v: 1050 },
      { x: 'T-3', v: 1480 }, { x: 'T-2', v: 1900 }, { x: 'T-1', v: 2200 }, { x: 'Now', v: 2400 },
    ],
    scenario: 'Connection Protection Simulation',
    scenarioSub: 'Misconnect risk → hold/delay critical flights / prioritize connection-heavy routes / reaccommodate',
  },
  {
    ucId: 'nrs-tail-crew-sync',
    linkedUseCaseId: UC1,
    severity: 'MEDIUM-HIGH', severityColor: 'yellow', stage: 'SENSE',
    title: 'Tail-Crew Synchronization Gap',
    description: 'Detects mismatch between crew readiness and aircraft readiness.',
    detail: 'Prevents solving crew problems without aircraft feasibility. Highlights cross-domain misalignment between Crew and Aircraft Twins. Likely root causes: aircraft delay, maintenance, tail reassignment, crew misposition.',
    sourceChip: 'AIRCRAFT STATUS · MAINTENANCE',
    agent: 'Sync Sentinel', date: '7/13/2026',
    metricValue: '14', metricUnit: 'affected legs',
    metricStripLabel: 'Affected legs', metricSub: 'crew↔tail gap 45 min',
    tags: ['CREW↔TAIL GAP', 'AFFECTED LEGS', 'SWAP OPTIONS', 'MAINTENANCE CONSTRAINTS', 'CROSS-DOMAIN'],
    precedents: 3, precedentNote: 'Limited history', confidence: 81,
    window: 'Live',
    trendLabel: 'TAIL-CREW SYNC TREND — Affected Legs',
    trendData: [
      { x: 'T-6', v: 2 }, { x: 'T-5', v: 4 }, { x: 'T-4', v: 6 },
      { x: 'T-3', v: 8 }, { x: 'T-2', v: 11 }, { x: 'T-1', v: 13 }, { x: 'Now', v: 14 },
    ],
    scenario: 'Tail-Crew Sync Optimizer',
    scenarioSub: 'Crew↔tail mismatch → tail swap / rotation resequencing / crew reassignment',
  },
  {
    ucId: 'nrs-policy-constraint',
    linkedUseCaseId: UC1,
    severity: 'CRITICAL', severityColor: 'red', stage: 'SENSE',
    title: 'Binding Policy / Contract Constraint Flag',
    description: 'Flags when recommended recovery actions violate legality, contract, or policy constraints.',
    detail: 'Hard feasibility gate. Prevents invalid decisions from entering execution — directly tied to the recommendation engine\'s Stage 1 filtering. Likely root causes: duty/rest violations, qualification mismatch, union rules, policy constraints.',
    sourceChip: 'LEGALITY · CONTRACT · POLICY',
    agent: 'Policy Sentinel', date: '7/13/2026',
    metricValue: '5', metricUnit: 'binding constraints',
    metricStripLabel: 'Binding constraints', metricSub: 'exception required',
    tags: ['BINDING CONSTRAINTS', 'INFEASIBLE OPTIONS', 'EXCEPTION REQUIRED', 'APPROVAL TIER', 'FEASIBILITY GATE'],
    precedents: 6, precedentNote: null, confidence: 90,
    window: 'Before decision approval',
    trendLabel: 'POLICY CONSTRAINT TREND — Binding Constraints Flagged',
    trendData: [
      { x: 'T-6', v: 1 }, { x: 'T-5', v: 1 }, { x: 'T-4', v: 2 },
      { x: 'T-3', v: 3 }, { x: 'T-2', v: 4 }, { x: 'T-1', v: 4 }, { x: 'Now', v: 5 },
    ],
    scenario: 'Policy Feasibility Gate',
    scenarioSub: 'Constraint violation → eliminate infeasible options / adjust objectives / escalate exception',
  },
]

// ── Signal Priority & Routing ──────────────────────────────────────────────────
export const NRS_SIGNAL_PRIORITY = [
  { rank: 1, signal: 'Network Risk Radar', flow: 'UC1', reason: 'Aggregated top-level risk assessment' },
  { rank: 2, signal: 'Hub Closure Likelihood', flow: 'UC1', reason: 'Forecast-driven precursor to network collapse' },
  { rank: 3, signal: 'Uncovered Trip Detected', flow: 'UC1', reason: 'Execution-critical operational gap' },
  { rank: 4, signal: 'Cross-Hub Propagation Probability', flow: 'UC1', reason: 'Cascade risk indicator' },
  { rank: 5, signal: 'Binding Policy / Contract Constraint', flow: 'UC1', reason: 'Feasibility gate for all scenarios' },
  { rank: 6, signal: 'Reserve Burn Rate Acceleration', flow: 'UC1', reason: 'Capacity depletion indicator' },
  { rank: 7, signal: 'Mid-Rotation Hub Stranding', flow: 'UC1', reason: 'Mid-rotation stranding onset condition' },
  { rank: 8, signal: 'Passenger Misconnect Exposure', flow: 'UC1', reason: 'Customer impact assessment' },
  { rank: 9, signal: 'Tail-Crew Synchronization Gap', flow: 'UC1', reason: 'Cross-domain constraint detection' },
]
