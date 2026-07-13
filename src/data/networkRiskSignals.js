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
  description: 'Top-of-tower signal ranking flights, pairings, hubs, and stations most likely to fail. Aggregates crew, aircraft, network, passenger, and external signals into a unified risk score.',
  metrics: [
    { label: 'Network Risk Score', value: 'Dynamic %', description: 'Derived risk metric' },
    { label: 'Impacted Flights', value: '#', description: 'Number of flights at risk' },
    { label: 'Impacted Pairings', value: '#', description: 'Number of crew pairings affected' },
    { label: 'Confidence', value: '%', description: 'Model certainty' },
  ],
  response_window: '24–48 hrs (forecast) / T-18 hrs (live ops)',
  likely_root_causes: [
    'Crew: legality risk, reserve shortage',
    'Network: delay propagation, bank dependency',
    'Aircraft: readiness gaps',
    'External: weather / ATC',
  ],
  recommended_actions: [
    'Prioritize top-risk flights',
    'Pre-position reserves',
    'Run delay vs cancel vs reroute scenarios',
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

// Signal 5: Mid-Rotation Hub Stranding Detected (Scenario B)
export const SIGNAL_MID_ROTATION_STRANDING = {
  id: 'nrs-5-mid-rotation-stranding',
  title: 'Mid-Rotation Hub Stranding Detected (Scenario B)',
  severity: '🟠 High',
  signal_class: 'Scenario-onset',
  description: 'Detects crews stranded mid-rotation due to hub cancellation. Starting point of Scenario B (Level 0). Remaining legs become open, and repositioning needs create downstream risk.',
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
  ready_scenario: 'Scenario B — Stranded Hub Recovery',
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
  detected: 'T-6:42 UTC (48 min ago)',
  source: 'Weather forecast: thunderstorm + low visibility at ATL hub (closure probability 67%) + concurrent crew legality constraint at ORD.',
  cascade: 'ATL/ORD network disruption → reserve burn acceleration → 18 flights at risk (T-18 hrs) → cross-hub propagation risk',
}

export const NRS_IMPACT = [
  { label: 'Flights at Risk', value: '47', color: 'red' },
  { label: 'Crew Pairings Affected', value: '12', color: 'orange' },
  { label: 'Hubs Exposed', value: '3', color: 'yellow' },
  { label: 'Passengers Misconnect Risk', value: '2,400', color: 'blue' },
  { label: 'Reserve Depletion', value: '32%', color: 'violet' },
]

// Network map for visualization
export const NRS_NETWORK = {
  nodes: [
    { id: 'atl', type: 'hub', label: 'ATL', x: 50, y: 30, status: 'at-risk', crew: 89, aircraft: 34 },
    { id: 'ord', type: 'hub', label: 'ORD', x: 30, y: 60, status: 'at-risk', crew: 71, aircraft: 28 },
    { id: 'den', type: 'hub', label: 'DEN', x: 70, y: 50, status: 'normal', crew: 62, aircraft: 24 },
    { id: 'crew-pool-atl', type: 'resource', label: 'Reserve Pool (ATL)', x: 50, y: 10, status: 'warning', count: 34 },
    { id: 'crew-pool-ord', type: 'resource', label: 'Reserve Pool (ORD)', x: 30, y: 80, status: 'warning', count: 28 },
  ],
  before: [
    { from: 'crew-pool-atl', to: 'atl', flights: 89, status: 'at-risk' },
    { from: 'crew-pool-ord', to: 'ord', flights: 71, status: 'at-risk' },
    { from: 'atl', to: 'den', flights: 34, status: 'normal' },
    { from: 'ord', to: 'den', flights: 28, status: 'normal' },
  ],
  afterById: {
    combined: [
      { from: 'crew-pool-atl', to: 'den', flights: 45, status: 'protected' },
      { from: 'crew-pool-ord', to: 'den', flights: 26, status: 'protected' },
      { from: 'atl', to: 'den', flights: 18, status: 'protected' },
    ],
  },
}

export const NRS_LOADING_LINES = [
  'Ingesting crew legality data from scheduling system…',
  'Fetching aircraft readiness and maintenance constraints…',
  'Pulling weather forecast and hub closure probabilities…',
  'Merging passenger connection data for misconnect exposure…',
  'Running Network Risk Radar aggregation model…',
  'TwinX crew + aircraft + network Twin models synchronized.',
  'Monte Carlo scenario generation (1,000 iterations) complete.',
  'Optimization against crew protection + cancellation-avoidance objectives…',
  'Simulation results ready for review.',
]

export const NRS_VARIANTS = [
  { scenario: 'Baseline / Do Nothing', desc: 'Current schedule continues — likely cascade into Level 1-2 disruption' },
  { scenario: 'Scenario 1 — Pre-Positioning Only', desc: 'Move reserves to high-risk hubs proactively' },
  { scenario: 'Scenario 2 — Selective Pre-Cancellation', desc: 'Cancel low-priority flights; reallocate crew' },
  { scenario: 'Scenario 3 — Cross-Hub Rebalancing', desc: 'Rebalance reserves + redistribute crew assignments across hubs' },
  { scenario: 'Scenario 4 — Combined Protection', desc: 'Pre-position + pre-cancel + rebalance + alternate routing' },
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
  { kpi: 'Flights protected (crew assigned)', value: '28/47' },
  { kpi: 'Open trips risk', value: '19 flights' },
  { kpi: 'Reserve depletion rate', value: '+42%/hr' },
  { kpi: 'Crew legality violations', value: '3 potential' },
  { kpi: 'Passenger misconnects at risk', value: '2,400' },
  { kpi: 'Hub closure cascade risk', value: '67%' },
  { kpi: 'Cross-hub contamination', value: 'High' },
  { kpi: 'Cancellation necessity', value: '12–18 flights' },
]

export const NRS_RECOMMENDATIONS = [
  {
    id: 'preposition',
    rank: 2,
    tone: 'orange',
    recommended: false,
    cardTitle: 'Recommendation 1: Pre-Position Reserves to High-Risk Hubs',
    trigger: 'Reserve pool depletion rate exceeds capacity; weather window emerging at ATL/ORD.',
    leversUsed: 'Reserve pre-positioning · hub selection · crew dispatch',
    impacted: '~34 reserve crew · 2 high-risk hubs · 12 pairings',
    confidence: '82% · ±4.1 pts flight protection',
    whyNot: 'Alone, it reduces but does not eliminate open-trip risk if weather escalates further.',
    recommends: [
      'Move 34 reserve crew from balanced pool to ATL and ORD ahead of weather.',
      'Prioritize pairings that best cover top-20% risk flights.',
    ],
    kpi: [
      { k: 'Flights protected', b: '28/47', a: '35/47', d: '+7 flights' },
      { k: 'Open trips risk', b: '19', a: '12', d: '-7 trips' },
      { k: 'Reserve exhaustion ETA', b: '8 hrs', a: '12 hrs', d: '+4 hrs' },
      { k: 'Crew legality violations', b: '3', a: '0', d: '-3' },
      { k: 'Misconnects avoided', b: '0', a: '480', d: '+480' },
      { k: 'Hub contamination risk', b: 'High', a: 'Medium', d: 'Reduced' },
    ],
    why: 'Pre-positioning is the lowest-disruption intervention and directly addresses reserve depletion.',
    bestWhen: 'Use when weather risk is forecast but hub closure is not yet certain (50–70% probability).',
    risk: 'Do not approve if reserve deployment creates downstream legality issues at origin hubs.',
    plan: {
      title: 'Network Protection Plan — Reserve Pre-Positioning',
      objective: 'Protect top-priority flights by pre-positioning reserves to high-risk hubs before weather escalation.',
      phases: [
        { name: 'Phase 1 — Detect & rank (0–1 hr)', actions: ['Rank 47 flights by Network Risk Score', 'Identify top-20% risk flights most exposed to ATL/ORD disruption'] },
        { name: 'Phase 2 — Pre-position (1–6 hr)', actions: ['Dispatch 34 reserve crew to ATL (18) and ORD (16)', 'Match pairings to highest-impact flights', 'Coordinate with crew scheduling system'] },
        { name: 'Phase 3 — Confirm & monitor (6–12 hr)', actions: ['Confirm crew arrival and legality', 'Track flight assignments in real-time', 'Escalate any legality gaps to ops'] },
      ],
      changes: [
        { area: 'Crew Positioning', change: 'Pre-deploy 34 reserves to ATL/ORD; standard pool redistribution' },
        { area: 'Pairing Assignment', change: 'Match pre-positioned crew to top-20% risk pairings' },
        { area: 'Weather Monitoring', change: 'Continuous hub closure probability tracking' },
        { area: 'Aircraft', change: 'No changes; use scheduled fleet' },
      ],
      guardrails: ['Crew legality hard constraint', 'Reserve pool rebalancing required', 'Pre-positioning must complete within 6 hours', 'Crew notification via scheduling system before dispatch'],
      expected: 'Flights protected 28/47 → 35/47; open trips reduced 19 → 12; misconnects avoided 480.',
    },
  },
  {
    id: 'cancel',
    rank: 3,
    tone: 'blue',
    recommended: false,
    cardTitle: 'Recommendation 2: Selective Pre-Cancellation of Low-Priority Flights',
    trigger: 'Hub closure probability exceeds 65%; reserve exhaustion imminent within 6 hours.',
    leversUsed: 'Flight priority ranking · selective cancellation · crew reallocation',
    impacted: '~8 low-priority flights · 140+ passengers · 6 pairings',
    confidence: '89% · ±3.2 pts network stability',
    whyNot: 'Direct revenue impact and passenger disruption; use only when pre-positioning is insufficient.',
    recommends: [
      'Cancel 6–8 lowest-priority flights (e.g., long-haul, low-load factor, late evening).',
      'Redeploy 18–24 crew to higher-priority rotations.',
    ],
    kpi: [
      { k: 'Flights protected', b: '28/47', a: '39/47', d: '+11 flights' },
      { k: 'Open trips risk', b: '19', a: '8', d: '-11 trips' },
      { k: 'Reserve exhaustion ETA', b: '8 hrs', a: '20+ hrs', d: '+12 hrs' },
      { k: 'Cancellations', b: '0–6', a: '6–8', d: 'Controlled pre-cancels' },
      { k: 'Revenue impact', b: '$0', a: '−$240–$320K', d: 'Known cost' },
      { k: 'Hub cascade risk', b: 'High', a: 'Low', d: 'Contained' },
    ],
    why: 'Selective cancellation of low-value flights releases crew for high-priority protection.',
    bestWhen: 'Use when hub closure probability > 65% and reserve exhaustion is imminent.',
    risk: 'Passenger rebooking, crew notification, and revenue loss; requires exec approval.',
    plan: {
      title: 'Network Protection Plan — Selective Pre-Cancellation',
      objective: 'Protect core network by cancelling low-priority flights and reallocating crew to high-value rotations.',
      phases: [
        { name: 'Phase 1 — Prioritize (0–1 hr)', actions: ['Rank all 47 flights by revenue, load factor, and passenger connection risk', 'Identify 6–8 lowest-priority candidates for cancellation'] },
        { name: 'Phase 2 — Execute cancellations (1–4 hr)', actions: ['Issue pre-cancellation notice to affected passengers', 'Initiate rebooking onto next-available flights', 'Release 18–24 crew to higher-priority pairings'] },
        { name: 'Phase 3 — Redeploy crew (2–8 hr)', actions: ['Assign released crew to top-20% risk flights', 'Confirm legality for all new assignments', 'Monitor hub closure probability in real-time'] },
      ],
      changes: [
        { area: 'Schedule', change: 'Pre-cancel 6–8 flights; maintain core network coverage' },
        { area: 'Crew', change: 'Redeploy 18–24 crew from cancelled to protected flights' },
        { area: 'Revenue', change: 'Known revenue loss offset by operational stability' },
        { area: 'Passengers', change: 'Auto-rebooking to next-available; customer care outreach' },
      ],
      guardrails: ['Executive approval required', 'Passenger rebooking confirmed before execution', 'Crew legality maintained for all reassignments', 'Hub closure probability > 65% threshold confirmed'],
      expected: 'Flights protected 28/47 → 39/47; open trips 19 → 8; revenue cost $240–320K; cascade risk contained.',
    },
  },
  {
    id: 'combined',
    rank: 1,
    tone: 'green',
    recommended: true,
    cardTitle: 'Recommendation 3: Combined Network Protection — Pre-Position + Selective Cancel + Rebalance',
    trigger: 'Hub closure probability > 50%; reserve burn rate accelerating; cross-hub contamination risk emerging.',
    leversUsed: 'Reserve pre-positioning + selective pre-cancellation + cross-hub rebalancing + alternate routing',
    impacted: '47 flights · 12 pairings · 3 hubs · 2,400 passengers at risk',
    confidence: '91% · ±2.1 pts network stability',
    whyNot: 'Highest coordination complexity; requires multi-department approval and tight timing.',
    recommends: [
      'Pre-position reserves to high-risk hubs first.',
      'Execute selective pre-cancellations to release additional crew.',
      'Rebalance remaining reserves across all three hubs.',
      'Reroute connection-heavy flights through alternate hubs if needed.',
    ],
    kpi: [
      { k: 'Flights protected', b: '28/47', a: '43/47', d: '+15 flights' },
      { k: 'Open trips prevented', b: '19', a: '4', d: '-15 trips' },
      { k: 'Reserve exhaustion', b: '8 hrs', a: '24+ hrs', d: 'Resolved' },
      { k: 'Crew legality maintained', b: '3 violations', a: '0', d: 'Compliant' },
      { k: 'Misconnects at risk', b: '2,400', a: '200', d: '−91%' },
      { k: 'Hub cascade risk', b: 'High', a: 'Low', d: 'Contained' },
      { k: 'Cancellations', b: 'Uncontrolled', a: '6–8 (controlled)', d: 'Managed pre-cancels' },
    ],
    why: 'Combined approach uses reserves first, pre-cancels second, and rebalancing third — lowest disruption cascade.',
    bestWhen: 'Use when hub closure probability > 50% and network disruption is imminent without intervention.',
    risk: 'Requires tight coordination; execution window is 4–6 hours; delays cascade impact.',
    plan: {
      title: 'Network Protection Plan — Combined Network Resilience',
      objective: 'Protect crew legality, prevent open trips, and minimize controlled cancellations using all available recovery levers.',
      phases: [
        { name: 'Phase 1 — Pre-position reserves (0–6 hr)', actions: ['Deploy 34 reserves to ATL/ORD ahead of weather', 'Assign to top-20% risk pairings', 'Confirm legality and crew readiness'] },
        { name: 'Phase 2 — Selective pre-cancel (1–4 hr)', actions: ['Cancel 6–8 lowest-priority flights', 'Release 18–24 crew for high-priority assignments', 'Initiate passenger rebooking'] },
        { name: 'Phase 3 — Cross-hub rebalancing (2–8 hr)', actions: ['Redistribute remaining reserves across ATL/ORD/DEN', 'Identify and fill last open trips', 'Monitor legality compliance continuously'] },
        { name: 'Phase 4 — Alternate routing (2–12 hr)', actions: ['Reroute connection-heavy flights through DEN if ATL/ORD close', 'Coordinate with ground ops for gate/crew logistics', 'Track in real-time until hub status stabilizes'] },
      ],
      changes: [
        { area: 'Crew Positioning', change: 'Pre-position + rebalance across 3 hubs; crew dispatch notifications' },
        { area: 'Schedule', change: 'Selective pre-cancellation + alternate routing for connection-heavy flights' },
        { area: 'Pairing Assignment', change: 'Dynamic assignment based on hub risk + crew legality + flight priority' },
        { area: 'Passengers', change: 'Auto-rebooking for cancelled flights; proactive rerouting for delayed connection risk' },
      ],
      guardrails: ['All crew legality constraints maintained', 'Hub closure probability > 50% threshold', 'Pre-cancellation count capped at 6–8 flights', 'Executive approval required for all phases', 'Decision window must close within 6 hours'],
      expected: 'Flights protected 28/47 → 43/47; open trips 19 → 4; crew legality violations 3 → 0; misconnects 2,400 → 200 (-91%); controlled pre-cancellations 6–8.',
    },
  },
]

export const NRS_OUTCOMES = [
  { label: 'Baseline (do nothing)', value: 'Cascade', detail: 'Level 0 → Level 1 → Level 2; ~18 cancellations; crew legality breaches; 2,000+ misconnects' },
  { label: 'Recommendation 1 (pre-position)', value: 'Mitigated', detail: '12 open trips prevented; 480 misconnects avoided; no cancellations required' },
  { label: 'Recommendation 2 (pre-cancel)', value: 'Controlled', detail: '8 pre-cancelled flights; 6–8 flights protected by crew redeploy; revenue cost $240K' },
  { label: 'Recommendation 3 (combined)', value: 'Protected', detail: 'All 47 flights protected except 4; cascade risk contained; no uncontrolled cancellations' },
]

export const NRS_INSIGHTS = [
  { label: 'Crew legality as a guardrail', value: 'Duty/rest violations prevent 3+ recovery actions; all recommendations comply with crew regulations.' },
  { label: 'Reserve pre-positioning ROI', value: 'First-mover advantage: 6 additional flights protected per hour of crew pre-positioning lead time.' },
  { label: 'Hub closure forecast confidence', value: 'At 50% probability, intervention begins; at 75%+, aggressive pre-cancellation justified.' },
  { label: 'Passenger misconnect cascade', value: 'Single 2-hour delay → 200+ misconnects; connection-heavy routes require priority protection.' },
  { label: 'Cross-hub rebalancing urgency', value: 'Reserve redistribution after hub closure becomes zero-sum; pre-positioning before closure is 3× more effective.' },
]

export const NRS_WORKFLOW_ACTIONS = {
  preposition: {
    description: 'Pre-positioning workflow',
    systems: ['Crew Scheduling', 'Resource Planning', 'Flight Operations'],
    actions: [
      { system: 'Crew Scheduling', action: 'Issue dispatch orders for 34 reserves → ATL (18), ORD (16)' },
      { system: 'Crew Scheduling', action: 'Assign pre-positioned crew to priority pairings' },
      { system: 'Resource Planning', action: 'Track reserve pool balance across all hubs' },
      { system: 'Flight Operations', action: 'Monitor crew arrival and readiness status' },
      { system: 'Flight Operations', action: 'Execute flight assignments as crew becomes available' },
    ],
  },
  cancel: {
    description: 'Pre-cancellation workflow',
    systems: ['Revenue Management', 'Passenger Services', 'Crew Scheduling'],
    actions: [
      { system: 'Revenue Management', action: 'Identify 6–8 lowest-priority flights for pre-cancellation' },
      { system: 'Passenger Services', action: 'Initiate auto-rebooking for affected passengers' },
      { system: 'Passenger Services', action: 'Issue customer care outreach for major revenue impact' },
      { system: 'Crew Scheduling', action: 'Release crew from cancelled flights' },
      { system: 'Crew Scheduling', action: 'Assign released crew to high-priority flights' },
    ],
  },
  combined: {
    description: 'Combined network protection workflow',
    systems: ['Crew Scheduling', 'Resource Planning', 'Flight Operations', 'Revenue Management', 'Passenger Services'],
    actions: [
      { system: 'Crew Scheduling', action: 'Phase 1: Dispatch 34 reserves to ATL/ORD (parallel to other actions)' },
      { system: 'Revenue Management', action: 'Phase 1: Identify pre-cancel candidates (parallel)' },
      { system: 'Crew Scheduling', action: 'Phase 2: Assign pre-positioned crew to priority flights' },
      { system: 'Passenger Services', action: 'Phase 2: Initiate rebooking for pre-cancelled flights' },
      { system: 'Crew Scheduling', action: 'Phase 3: Rebalance reserves across hubs' },
      { system: 'Flight Operations', action: 'Phase 4: Reroute connection-heavy flights via alternate hubs if needed' },
      { system: 'Flight Operations', action: 'Monitor: Track all flights, crew legality, reserve balance in real-time' },
    ],
  },
}

export const NRS_FRONTIER = {
  title: 'Scenario Trade-offs — Flights Protected vs Cancellations vs Recovery Time',
  axes: { x: 'Controlled Cancellations', y: 'Flights Protected', size: 'Recovery Time (hrs)' },
  scenarios: [
    { id: 'baseline', label: 'Do Nothing (Baseline)', x: 18, y: 28, size: 48, color: 'red', tone: 'red' },
    { id: 'preposition', label: 'Pre-Position Only', x: 0, y: 35, size: 6, color: 'orange', tone: 'orange' },
    { id: 'cancel', label: 'Pre-Cancel Only', x: 8, y: 39, size: 4, color: 'blue', tone: 'blue' },
    { id: 'combined', label: 'Combined (Recommended)', x: 6, y: 43, size: 4, color: 'green', tone: 'green' },
  ],
}

export const NRS_APPROVAL = {
  approver: 'Director of Flight Operations',
  defaultOverride: 'Approved — Scenario 3 (Combined). Crew legality compliance enforced; no override of policy constraints.',
  approvalItems: [
    'Scenario 3: combined network protection (pre-position + pre-cancel + rebalance)',
    '47 flights prioritized · 12 pairings · 3 hubs',
    'Crew legality constraints: maintained across all recovery actions',
    'Passenger misconnect risk: 2,400 → 200 (−91%)',
    'Controlled pre-cancellations: 6–8 flights',
  ],
  doNothing: { engagement: 0.0, flights_protected: 28, cancellations: '18+ (uncontrolled)', aum: 0 },
  scenarioRationale: {
    preposition: 'Conservative; pre-position only. Effective if hub closure probability remains <60%.',
    cancel: 'Aggressive; pre-cancel without reserving crew. Risk: forced cancellations escalate cascade.',
    combined: 'Recommended. Balances crew legality, passenger experience, and operational stability using all levers in sequence.',
  },
}

export const NRS_SAVE = {
  title: 'Network Vulnerability Scenario',
  description: 'Crew scheduling + hub closure forecast + reserve protection + selective pre-cancellation response',
  tags: ['network-risk', 'crew-protection', 'hub-closure', 'weather-response', 'cascade-prevention'],
}

// ── Primary Signal for Screen 1: Network Risk Radar ────────────────────────────
export const NRS_SIGNAL = {
  sentinel: 'Network Risk Radar',
  bannerText: 'Network Risk Radar — Critical flights, pairings, and hubs ranked by failure probability.',
  card: [
    { label: 'Signal class', value: 'Network Risk / Crew-Aircraft-Passenger Aggregate' },
    { label: 'Severity', value: 'CRITICAL' },
    { label: 'Confidence', value: '89%' },
    { label: 'Impacted scope', value: '47 flights / 12 crew pairings / 3 hubs' },
    { label: 'Historical precedents', value: '8 matched episodes' },
    { label: 'Response window', value: '24–48 hr forecast / T-18 hrs live ops' },
  ],
  sourceChips: ['CREW LEGALITY FEED', 'AIRCRAFT STATUS', 'WEATHER API', 'ATC DATA', 'PASSENGER FEED', 'RESERVE CAPACITY'],
  detail: 'TwinX has detected elevated risk across priority flight operations. Reserve shortages, crew legality constraints, weather-driven hub exposure, and mispositioned aircraft indicate that current operations may deteriorate into open trips or cancellations if no intervention is taken.',
  conditions: [
    'Crew reserve buffer is below operational threshold,',
    'Hub closure probability exceeds 35% in next 24–48 hrs,',
    'Aircraft readiness gaps exist for priority rotation,',
    'One or more flights lack assigned crew within T-18 hrs.',
  ],
  conditionsNote: 'Network nodes in the Crew + Aircraft Twin model use legality, qualification, readiness, and weather exposure as state variables, and reserve depletion / hub closure / aircraft unavailability as critical events.',
}

export const NRS_PRECEDENTS = [
  { episode: 'Weather-driven hub closure', similarity: 92, action: 'Pre-cancel low-priority + reposition reserves', outcome: 'Hub protected; 2-hub contamination prevented' },
  { episode: 'Reserve burn surge', similarity: 87, action: 'Pre-cancel + cross-hub rebalance + incentive trigger', outcome: 'Reserve exhaustion avoided; 5 open trips resolved' },
  { episode: 'Crew legality + misposition', similarity: 84, action: 'Deadhead + reserve assignment + rotation swap', outcome: 'All flights crewed; zero cancel cascades' },
]

export const NRS_HYPOTHESIS = 'If airline prioritizes top-risk flight protection using a combined recovery plan — reserve pre-positioning, selective pre-cancellations, route swaps, and cross-hub rebalancing — then the airline can prevent cascade disruption while limiting revenue impact and crew fatigue.'
export const NRS_INIT_RECO = {
  nextStep: 'Run Network Vulnerability Scan simulation.',
  path: 'Top-risk flights → crew + aircraft readiness check → hub closure forecast → reserve positioning → scenario comparison → ops approval',
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
  name: 'Network Vulnerability Scan',
  signal: 'Network Risk Radar — Ranked Flights, Pairings & Hubs at Risk',
  objective: 'Protect crew legality, prevent open trips, and minimize cancellations while reducing reserve burn and hub contamination risk.',
  method: 'Crew Twin legality model + Aircraft Twin readiness model + Weather Twin forecast + passenger flow model + stochastic Monte Carlo scenarios vs optimization baseline.',
}

export const NRS_SCOPE = [
  { item: 'Flights in scope', value: '47 priority flights across 3 hubs' },
  { item: 'Crew pairings', value: '12 active rotation pairings' },
  { item: 'Hubs involved', value: '3 primary hubs + 2 alternate routing targets' },
  { item: 'Time horizon', value: '24–48 hours (forecast) + T-18 hrs (live ops)' },
  { item: 'Reserve pool', value: '~180 reserve crew available' },
  { item: 'Aircraft involved', value: '~60 aircraft fleet subset in rotation' },
]

// ── Signal Priority & Routing ──────────────────────────────────────────────────
export const NRS_SIGNAL_PRIORITY = [
  { rank: 1, signal: 'Network Risk Radar', flow: 'UC1', reason: 'Aggregated top-level risk assessment' },
  { rank: 2, signal: 'Hub Closure Likelihood', flow: 'UC1', reason: 'Forecast-driven precursor to network collapse' },
  { rank: 3, signal: 'Uncovered Trip Detected', flow: 'UC1', reason: 'Execution-critical operational gap' },
  { rank: 4, signal: 'Cross-Hub Propagation Probability', flow: 'UC1', reason: 'Cascade risk indicator' },
  { rank: 5, signal: 'Binding Policy / Contract Constraint', flow: 'UC1', reason: 'Feasibility gate for all scenarios' },
  { rank: 6, signal: 'Reserve Burn Rate Acceleration', flow: 'UC1', reason: 'Capacity depletion indicator' },
  { rank: 7, signal: 'Mid-Rotation Hub Stranding', flow: 'UC1', reason: 'Scenario B onset condition' },
  { rank: 8, signal: 'Passenger Misconnect Exposure', flow: 'UC1', reason: 'Customer impact assessment' },
  { rank: 9, signal: 'Tail-Crew Synchronization Gap', flow: 'UC1', reason: 'Cross-domain constraint detection' },
]
