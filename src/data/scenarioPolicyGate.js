// Signal 9 — Binding Policy / Contract Constraint Flag
// Dedicated 7-screen deep-dive: a multi-hub ATL recovery plan (JFK/BOS/MCO
// downstream) blocked by legality, qualification, aircraft/maintenance, and
// policy gates. A feasibility-gate signal — compliant recovery first.
// Exports follow the shared workflow-panel contract (SPG_ prefix); all values
// are illustrative UI mock data, not actual Delta operational data.

export const SPG_ACCENT = 'red'

// ── Screen 1 — Signal Deep Dive ─────────────────────────────────────────────
export const SPG_SIGNAL = {
  sentinel: 'Policy Sentinel',
  bannerText: 'Binding Policy / Contract Constraint Flag — 23 of 64 recovery options fail hard gates; compliant alternatives required before execution.',
  card: [
    { label: 'Signal class', value: 'Feasibility gate / compliance-first' },
    { label: 'Severity', value: 'CRITICAL' },
    { label: 'Detection', value: '17:10 ET' },
    { label: 'Binding constraints', value: '16' },
    { label: 'Infeasible options removed', value: '23 of 64' },
    { label: 'Exception required', value: 'Yes — 2 conditional options' },
    { label: 'Approval tier', value: 'Tier 2 · OCC + Policy leadership' },
    { label: 'Decision deadline', value: 'T-2h 25m before ATL protected bank' },
  ],
  sourceChips: ['POLICY', 'CREW', 'AIRCRAFT', 'NETWORK', 'PASSENGER', 'COST', 'DERIVED'],
  detail: 'Triggered during ATL multi-option recovery simulation: legality, qualification, aircraft/maintenance, and policy gates block or narrow recovery actions across ATL/JFK/BOS/MCO. The gate removes invalid plans before optimization ranking — no illegal, unqualified, or maintenance-infeasible action reaches execution.',
  conditions: [
    'Crew legality gates fail 7 duty/rest or report-time options,',
    'Crew qualification/pairing gates fail 4 swap options,',
    'Aircraft/maintenance gates block 5 tail actions,',
    'Policy/contract rules block 3 actions; 2 breach cost cap (need approval).',
  ],
  conditionsNote: 'Regulatory/Policy twin nodes use duty/rest rules, qualification, maintenance readiness, and contract/cost limits as hard-gate state variables, with legality breach and policy exception as gating events.',
}

export const SPG_DISRUPTION = {
  detected: '17:10 ET',
  source: 'ATL multi-option recovery simulation generated 64 options; hard feasibility gates flagged 16 binding constraints across crew, aircraft, network, policy, and cost',
  cascade: 'Level 0 infeasible local fixes (23 removed) → Level 1 zero-sum workaround risk (MCO donor action blocked) → Level 2 watch if no compliant alternative preserves JFK/BOS next-day bank',
}

export const SPG_IMPACT = [
  { label: 'Binding constraints', value: '16', color: 'red' },
  { label: 'Infeasible options', value: '23', color: 'orange' },
  { label: 'Exception-required', value: '2', color: 'violet' },
  { label: 'Flights still exposed', value: '11', color: 'blue' },
  { label: 'Passenger exposure', value: '2,260', color: 'red' },
]

// Optional Screen-1 blocks (render only when present)
export const SPG_METRICS = [
  { label: 'Crew legality failures', value: '7', note: 'duty/rest or report-time' },
  { label: 'Qualification / pairing failures', value: '4', note: 'crew not valid for pairing/type' },
  { label: 'Aircraft / maintenance blocks', value: '5', note: 'tail readiness/maintenance fail' },
  { label: 'Policy / contractual blocks', value: '3', note: 'rule prevents auto-execution' },
  { label: 'Cost threshold breaches', value: '2', note: 'exceed recovery-cost tolerance' },
  { label: 'Cost exposure', value: '$1.2M–$2.4M', note: 'compliant recovery alternatives' },
]

// Multi-hub constraint view (reuses the multi-hub table shape)
export const SPG_HUB_IMPACT = [
  { hub: 'ATL', state: 'Reserve → DL2381 ATL–JFK', crew: 'Legal buffer insufficient', flights: 'Delay/cancel risk', pax: '—', level: 'Blocked' },
  { hub: 'ATL', state: 'Hold DL501 ATL–LAX 55 min', crew: 'Duty legality breached at 45 min', flights: 'Pax + crew conflict', pax: '—', level: 'Blocked' },
  { hub: 'JFK', state: 'Tail swap DL742 JFK–ATL', crew: 'Tail under maintenance review', flights: 'Aircraft/crew mismatch', pax: '—', level: 'Blocked' },
  { hub: 'BOS', state: 'Deadhead JFK→BOS first bank', crew: 'Arrival after report-time cutoff', flights: 'Next-day launch risk', pax: '—', level: 'Conditional' },
  { hub: 'MCO', state: 'Reassign donor crew to ATL', crew: 'Donor flight becomes open trip', flights: 'Level 1 propagation', pax: '—', level: 'Blocked' },
]

export const SPG_ROOT_CAUSE = [
  { domain: 'Crew / legality', pct: 38, note: 'Duty/rest and qualification gates remove many crew-swap options' },
  { domain: 'Aircraft / maintenance', pct: 22, note: 'Tail recovery options fail maintenance/readiness checks' },
  { domain: 'Network', pct: 16, note: 'Delay and bank protection interact with slots, gates, downstream legs' },
  { domain: 'Cost / policy', pct: 14, note: 'Some actions require cost or exception approval before execution' },
  { domain: 'Passenger', pct: 10, note: 'Protection rules change option priority and reaccom sequencing' },
]

export const SPG_CASCADE = [
  { level: 'Level 0 — Local infeasible fixes', status: 'Active', color: 'red', trigger: 'ATL flight options fail hard gates', action: 'Show failed gates + compliant alternatives' },
  { level: 'Level 1 — Zero-sum workaround risk', status: 'Active', color: 'orange', trigger: 'Swaps that solve ATL create donor-flight risk (MCO blocked)', action: 'Prevent harmful workaround' },
  { level: 'Level 2 — Cross-hub contamination', status: 'Watch', color: 'yellow', trigger: 'No compliant alternative preserves JFK/BOS next-day bank', action: 'Trigger reset-aware compliant plan' },
]

export const SPG_PRECEDENTS = [
  { episode: 'ATL legality breach replay', similarity: 84, pattern: 'Hold decision broke crew legality', outcome: 'Flight protected, next leg failed', lesson: 'Show legality countdown before hold approval' },
  { episode: 'JFK maintenance-gated tail swap', similarity: 78, pattern: 'Optimal tail swap failed maintenance gate', outcome: 'Delay propagated to BOS', lesson: 'Apply aircraft gate before ranking' },
  { episode: 'BOS next-day exception request', similarity: 71, pattern: 'Late deadhead needed policy review', outcome: 'Approval delay hurt restart', lesson: 'Prebuild exception evidence pack' },
]

export const SPG_HYPOTHESIS = 'If Delta enforces hard feasibility gates before ranking — filtering out illegal, unqualified, and maintenance-infeasible options and reserving exceptions for policy-permissible cases — then it can execute a compliant, auditable recovery fast, avoid harmful workarounds, and keep the JFK/BOS next-day banks protected within cost cap.'

// ── Screen 2 — Objectives & KPIs ────────────────────────────────────────────
export const SPG_PRIMARY_OBJECTIVES = [
  { value: 'Keep recovery legally, contractually, and operationally feasible', desc: 'Prevent invalid recovery plans from entering execution' },
  { value: 'Eliminate infeasible options before ranking', desc: 'Filter hard-gate failures out of the option set' },
  { value: 'Reduce exception dependency', desc: 'Exceptions add approval delay and audit burden' },
  { value: 'Preserve protected ATL/JFK/BOS banks', desc: 'Feasible options still need network scoring' },
  { value: 'Protect passenger commitments', desc: 'Passenger harm is part of multi-objective scoring' },
  { value: 'Maintain auditability', desc: 'Action Tracker and replay require traceable decisions' },
]
export const SPG_PRIMARY_DEFAULT = 'Keep recovery legally, contractually, and operationally feasible'

export const SPG_SECONDARY_OBJECTIVES = [
  { value: 'Protect crew legality and qualification', desc: 'Crew constraints are hard feasibility gates' },
  { value: 'Avoid maintenance-infeasible aircraft actions', desc: 'Aircraft feasibility is a hard gate' },
  { value: 'Prevent Level 1 harmful workarounds', desc: 'Donor pulls create secondary open trips' },
  { value: 'Protect JFK/BOS next-day launch', desc: 'Level 2 watch is active' },
  { value: 'Hold within recovery cost cap', desc: 'Exceeding cap raises the approval tier' },
  { value: 'Keep audit evidence complete', desc: 'Governance requires 100% audit before release' },
]
export const SPG_SECONDARY_DEFAULT = ['Protect crew legality and qualification', 'Avoid maintenance-infeasible aircraft actions']

export const SPG_KPI_OPTIONS = [
  { value: 'Feasible options retained', type: 'Operational', rec: true },
  { value: 'Infeasible options removed', type: 'Governance', rec: true },
  { value: 'Exception frequency', type: 'Governance', rec: true },
  { value: 'Audit completeness', type: 'Governance', rec: true },
  { value: 'Flights protected', type: 'Operational', rec: true },
  { value: 'Misconnects avoided', type: 'CX', rec: true },
  { value: 'Cost-to-recover', type: 'Financial', rec: true },
  { value: 'Legal crew utilization', type: 'Resource', rec: false },
  { value: 'Exception cost', type: 'Financial', rec: false },
  { value: 'Recovery time', type: 'Resilience', rec: false },
  { value: 'Replay accuracy', type: 'Governance', rec: false },
]
export const SPG_KPI_DEFAULT = SPG_KPI_OPTIONS.filter(k => k.rec).map(k => k.value)

// ── Screen 3 — Simulation Levers ────────────────────────────────────────────
// Some levers are hard gates (non-adjustable) — enforced before ranking.
export const SPG_LEVER_GROUPS = [
  {
    group: 'A', title: 'Policy / governance gates', color: 'red',
    levers: [
      { id: 'hardGate', label: 'Hard gate enforcement', control: 'select', options: ['On (required)'], recommended: 'On (required)', why: 'Non-adjustable — required before recommendations' },
      { id: 'exceptionWorkflow', label: 'Exception workflow', control: 'select', options: ['Off', 'Enabled', 'Leadership-only'], recommended: 'Enabled', why: 'Only for policy-allowed exceptions' },
      { id: 'approvalTier', label: 'Approval tier', control: 'select', options: ['Tier 1', 'Tier 2', 'Tier 3'], recommended: 'Tier 2', why: 'Based on severity, cost, exception type' },
      { id: 'auditPack', label: 'Audit evidence pack', control: 'select', options: ['Required', 'Enhanced'], recommended: 'Required', why: 'Stores constraints and rationale' },
    ],
  },
  {
    group: 'B', title: 'Crew feasibility levers', color: 'grape',
    levers: [
      { id: 'legalFilter', label: 'Legal candidate filter', control: 'select', options: ['Strict', 'Policy minimum'], recommended: 'Strict', why: 'Cannot assign illegal crew' },
      { id: 'restBuffer', label: 'Rest buffer minimum', control: 'select', options: ['30 min', '45 min', '60 min', '90 min'], recommended: '45 min', why: 'Below minimum requires policy review' },
      { id: 'swapMode', label: 'Swap mode', control: 'select', options: ['Off', 'Safe swaps only', 'Aggressive'], recommended: 'Safe swaps only', why: 'Aggressive requires OCC approval' },
      { id: 'deadheadCutoff', label: 'Deadhead cutoff', control: 'select', options: ['30 min', '60 min', '90 min', '120 min'], recommended: '60 min', why: 'Arrival must beat report-time feasibility' },
    ],
  },
  {
    group: 'C', title: 'Aircraft & network levers', color: 'orange',
    levers: [
      { id: 'maintGate', label: 'Maintenance feasibility gate', control: 'select', options: ['Required'], recommended: 'Required', why: 'Non-adjustable — blocks unready tails' },
      { id: 'tailSwap', label: 'Tail swap eligibility', control: 'select', options: ['Ready + compatible only', 'Broad'], recommended: 'Ready + compatible only', why: 'Broad still requires maintenance pass' },
      { id: 'delayCap', label: 'Controlled delay cap', control: 'select', options: ['0 min', '40 min', '90 min'], recommended: '40 min', why: 'Cannot break legality or slot constraints' },
      { id: 'thinPool', label: 'Schedule thinning pool', control: 'select', options: ['0 flights', '4 flights', '10 flights'], recommended: '4 flights', why: 'OCC approval required' },
    ],
  },
  {
    group: 'D', title: 'Passenger · cost · recovery levers', color: 'blue',
    levers: [
      { id: 'premiumProtect', label: 'Premium protection', control: 'switch', recommended: true, onLabel: 'On', why: 'Must follow passenger priority policy' },
      { id: 'reaccomPriority', label: 'Reaccommodation priority', control: 'select', options: ['Critical + premium first', 'Premium first', 'Cost-min'], recommended: 'Critical + premium first', why: 'Seat inventory dependent' },
      { id: 'costCap', label: 'Recovery cost cap', control: 'select', options: ['$800K', '$1.6M', '$3.0M'], recommended: '$1.6M', why: 'Exceeding cap raises approval tier' },
      { id: 'resetWatch', label: '24–72h reset watch', control: 'select', options: ['Off', 'Watch', 'Active'], recommended: 'Active', why: 'Active while Level 2 risk remains' },
    ],
  },
]
export const SPG_ALL_LEVERS = SPG_LEVER_GROUPS.flatMap(g => g.levers)
export const SPG_LEVER_DEFAULTS = Object.fromEntries(SPG_ALL_LEVERS.map(l => [l.id, l.recommended]))

// ── Screen 4 — Simulation Summary ───────────────────────────────────────────
export const SPG_SCENARIO = {
  name: 'ATL Policy Feasibility Gate — JFK/BOS Spillover',
  signal: 'Binding Policy / Contract Constraint Flag',
  objective: 'Preserve compliant recovery while minimizing cascade, weighting compliance 40% / network stability 25% / CX 15% / resource 10% / cost 10%.',
  method: 'Event-triggered live simulation + policy sandbox + 24–72h reset watch; Stage 1 hard gates (legality, qualification, maintenance, policy) then multi-objective scoring and execution-confidence ranking.',
}
export const SPG_SCOPE = [
  { item: 'Generated options', value: '64 → 41 compliant/conditional after gates' },
  { item: 'Binding constraints', value: '16 across 6 domains' },
  { item: 'Hubs', value: 'ATL primary · JFK/BOS/MCO downstream' },
  { item: 'Cascade state', value: 'Level 1 active · Level 2 watch' },
  { item: 'Decision deadline', value: 'T-2h 25m before ATL protected bank' },
  { item: 'Approval tier', value: 'Tier 2 · OCC + Policy leadership' },
]
export const SPG_VALIDATION = [
  'Regulatory / legality compliance checked',
  'Crew qualification / pairing validity checked',
  'Aircraft maintenance readiness checked',
  'Policy / contractual compliance checked',
  'Passenger priority rules checked',
  'Recovery cost cap checked',
  'Audit evidence pack complete',
  'Human approval required before execution',
]

// ── Screen 5 — Optimization Results ─────────────────────────────────────────
export const SPG_BASELINE = [
  { kpi: 'Generated options', value: '64' },
  { kpi: 'Infeasible options', value: '23' },
  { kpi: 'Exception-required options', value: '2' },
  { kpi: 'Flights still exposed', value: '18' },
  { kpi: 'Passenger exposure', value: '2,260' },
  { kpi: 'Cost-to-recover', value: '$2.4M' },
  { kpi: 'Level 2 probability', value: '34%' },
  { kpi: 'Audit completeness', value: '62%' },
]

export const SPG_RECOMMENDATIONS = [
  {
    id: 'compliant', rank: 1, tone: 'green', recommended: true,
    cardTitle: 'Option 1: Fully compliant recovery plan',
    trigger: 'A compliant path exists that clears all hard gates with no exception.',
    leversUsed: 'Remove 23 infeasible options · 6 legal reserves · delay 3 flights ≤35 min · thin 2 turns · reaccom 520 pax',
    impacted: '11 exposed flights · ATL/JFK/BOS banks · 2,260 pax',
    confidence: '88% · best compliance + execution confidence',
    whyNot: 'Moderate planned disruption (2 thins) vs the high-cost continuity plan.',
    recommends: [
      'Remove 23 infeasible options; use 6 legal reserves.',
      'Delay 3 protected flights ≤35 min; thin 2 low-criticality turns.',
      'Reaccommodate 520 high-risk passengers.',
    ],
    kpi: [
      { k: 'Hard gate status', b: 'Fails', a: 'Pass', d: 'Compliant' },
      { k: 'Flights protected', b: '—', a: '11', d: '+11' },
      { k: 'Planned cancellations/thins', b: '—', a: '2', d: '2 (planned)', neg: true },
      { k: 'Passenger exposure', b: '2,260', a: '980', d: '−1,280' },
      { k: 'Cost-to-recover', b: '$2.4M', a: '$1.55M', d: '−$0.85M' },
      { k: 'Execution confidence', b: '—', a: '88%', d: 'Highest' },
      { k: 'Audit readiness', b: '62%', a: '100%', d: 'Complete' },
    ],
    why: 'Passes every hard gate with no exception, protects critical ATL/JFK flights, materially cuts passenger exposure, and has the highest execution confidence and fewest cross-team dependencies.',
    bestWhen: 'Use when the priority is compliant, fast, auditable execution.',
    risk: 'Moderate planned disruption; refresh maintenance status before final approval.',
    plan: {
      title: 'Policy Feasibility Gate — Compliant Recovery First',
      objective: 'Execute a fully compliant recovery that clears all hard gates without any exception.',
      phases: [
        { name: 'Phase 1 — Gate filter (0–10 min)', actions: ['Remove 23 infeasible options; log failed + passed gates', 'Retain 41 compliant/conditional options'] },
        { name: 'Phase 2 — Compliant assignment (10–40 min)', actions: ['Assign 6 legal reserves; block illegal swaps', 'Delay 3 protected flights ≤35 min; thin 2 low-criticality turns'] },
        { name: 'Phase 3 — Passenger + audit (40–90 min)', actions: ['Reaccommodate 520 connection-critical pax', 'Complete audit evidence pack to 100% before release'] },
      ],
      changes: [
        { area: 'Crew', change: 'Assign 6 legal reserves; strict legal filter; safe swaps only' },
        { area: 'Network', change: 'Delay 3 protected flights ≤35 min; thin 2 low-criticality turns' },
        { area: 'Aircraft', change: 'Ready tails only; maintenance feasibility required' },
        { area: 'Passenger', change: 'Reaccommodate 520 pax; premium protection on' },
      ],
      guardrails: ['Regulatory / legality compliance', 'Crew qualification / pairing validity', 'Aircraft maintenance readiness', 'Policy / contractual compliance', 'Cost within cap', 'Audit complete before execution', 'Human approval'],
      expected: 'Hard gates pass; flights protected 11; passenger exposure 2,260 → 980; cost $2.4M → $1.55M; audit 62% → 100%.',
    },
  },
  {
    id: 'highcost', rank: 2, tone: 'orange', recommended: false,
    cardTitle: 'Option 2: Compliant high-cost continuity plan',
    trigger: 'Customer continuity outweighs cost; avoid cancellations.',
    leversUsed: 'Legal deadheads + incentive trigger · no cancellations · tail-resequence 2 ready aircraft · reaccom 380 pax',
    impacted: '12 protected flights · ATL/JFK banks · 2,260 pax',
    confidence: '76% · best passenger continuity',
    whyNot: 'Higher cost and coordination; leans on incentive and deadhead availability.',
    recommends: [
      'Use legal deadheads + incentive trigger; avoid cancellations.',
      'Tail-resequence 2 ready aircraft; reaccommodate 380 pax.',
    ],
    kpi: [
      { k: 'Hard gate status', b: 'Fails', a: 'Pass', d: 'Compliant' },
      { k: 'Flights protected', b: '—', a: '12', d: '+12' },
      { k: 'Planned cancellations/thins', b: '—', a: '0', d: 'None' },
      { k: 'Passenger exposure', b: '2,260', a: '1,050', d: '−1,210' },
      { k: 'Cost-to-recover', b: '$2.4M', a: '$1.95M', d: '−$0.45M' },
      { k: 'Execution confidence', b: '—', a: '76%', d: 'Medium' },
      { k: 'Audit readiness', b: '62%', a: '100%', d: 'Complete' },
    ],
    why: 'Protects the most flights with no cancellations, but costs more and depends on incentive/deadhead availability.',
    bestWhen: 'Use when customer continuity outweighs cost.',
    risk: 'Higher cost and cross-team coordination; incentive/deadhead dependency.',
    plan: {
      title: 'Policy Feasibility Gate — High-cost Continuity',
      objective: 'Preserve continuity with zero cancellations using legal deadheads and incentives, all gates passed.',
      phases: [
        { name: 'Phase 1 — Gate filter (0–10 min)', actions: ['Remove infeasible options', 'Confirm incentive/deadhead legality'] },
        { name: 'Phase 2 — Continuity build (10–45 min)', actions: ['Deploy legal deadheads + incentive trigger', 'Tail-resequence 2 ready aircraft'] },
        { name: 'Phase 3 — Passenger + audit (45–90 min)', actions: ['Reaccommodate 380 pax', 'Complete audit pack to 100%'] },
      ],
      changes: [
        { area: 'Crew', change: 'Legal deadheads + incentive trigger; no illegal swaps' },
        { area: 'Aircraft', change: 'Tail-resequence 2 ready aircraft' },
        { area: 'Network', change: 'No cancellations; controlled delay within cap' },
        { area: 'Passenger', change: 'Reaccommodate 380 pax; premium protection on' },
      ],
      guardrails: ['Regulatory / legality compliance', 'Crew qualification / pairing validity', 'Aircraft maintenance readiness', 'Cost cap (watch — higher)', 'Audit complete', 'Human approval'],
      expected: 'Flights protected 12; zero cancellations; passenger exposure 2,260 → 1,050; cost $2.4M → $1.95M.',
    },
  },
  {
    id: 'exception', rank: 3, tone: 'blue', recommended: false,
    cardTitle: 'Option 3: Exception-required containment plan',
    trigger: 'Best network outcome needs one policy exception; not executable until approved.',
    leversUsed: 'Request 1 policy exception · hold 1 flight beyond cap · protect ATL/JFK bank',
    impacted: '13 protected flights · ATL/JFK bank · 2,260 pax',
    confidence: '61% · potentially best network outcome',
    whyNot: 'Requires leadership approval + evidence pack; not executable until approved.',
    recommends: [
      'Request one policy exception; hold 1 flight beyond normal cap.',
      'Protect the ATL/JFK bank pending approval.',
    ],
    kpi: [
      { k: 'Hard gate status', b: 'Fails', a: 'Conditional', d: 'If approved' },
      { k: 'Flights protected', b: '—', a: '13', d: '+13' },
      { k: 'Planned cancellations/thins', b: '—', a: '0', d: 'None' },
      { k: 'Passenger exposure', b: '2,260', a: '860', d: '−1,400' },
      { k: 'Cost-to-recover', b: '$2.4M', a: '$1.75M', d: '−$0.65M' },
      { k: 'Execution confidence', b: '—', a: '61%', d: 'Lowest' },
      { k: 'Audit readiness', b: '62%', a: '100%', d: 'After exception pack', neg: true },
    ],
    why: 'Potentially the best network and CX outcome, but conditional on a policy exception and a leadership-approved evidence pack.',
    bestWhen: 'Use only if leadership approves the exception and the evidence pack proves it is policy-permissible.',
    risk: 'Very high approval complexity; not executable until the exception is approved.',
    plan: {
      title: 'Policy Feasibility Gate — Exception-required Containment',
      objective: 'Achieve the best network outcome via one policy exception, gated on leadership approval.',
      phases: [
        { name: 'Phase 1 — Build exception pack (0–20 min)', actions: ['Assemble evidence pack for the single exception', 'Prove policy-permissibility'] },
        { name: 'Phase 2 — Leadership review (20–60 min)', actions: ['Route to policy/governance + ops leadership', 'Hold 1 flight pending decision'] },
        { name: 'Phase 3 — Execute if approved (60–120 min)', actions: ['On approval, protect ATL/JFK bank', 'Complete audit pack; fall back to Option 1 if denied'] },
      ],
      changes: [
        { area: 'Policy', change: 'One exception requested; leadership approval required' },
        { area: 'Network', change: 'Hold 1 flight beyond cap; protect ATL/JFK bank' },
        { area: 'Crew', change: 'Legal assignments only pending exception' },
        { area: 'Passenger', change: 'Protect connection-critical pax; premium protection on' },
      ],
      guardrails: ['Exception must be policy-permissible', 'Leadership approval required', 'Evidence pack complete before execution', 'Fallback to compliant Option 1 if denied', 'Human approval'],
      expected: 'If approved: flights protected 13; passenger exposure 2,260 → 860; cost $2.4M → $1.75M; else fall back to Option 1.',
    },
  },
]

export const SPG_RANKING = [
  { rank: 1, reco: 'Fully compliant recovery plan', service: 'High', cost: 'Medium', speed: 'High', feasibility: 'Highest', select: 'Selected' },
  { rank: 2, reco: 'Compliant high-cost continuity plan', service: 'Highest', cost: 'Medium-high', speed: 'Medium', feasibility: 'High', select: 'Alternative' },
  { rank: 3, reco: 'Exception-required containment plan', service: 'Highest', cost: 'Medium', speed: 'Low', feasibility: 'Conditional', select: 'Alternative' },
]

export const SPG_FRONTIER = {
  xLabel: 'Cost-to-recover ($M)', yLabel: 'Passenger exposure (pax)', zLabel: 'Execution confidence (%)',
  points: [
    { x: 2.4, y: 2260, z: 0, label: 'Do nothing (fails gates)', tone: 'gray' },
    { x: 1.55, y: 980, z: 88, label: 'Fully compliant', tone: 'green', recommended: true },
    { x: 1.95, y: 1050, z: 76, label: 'High-cost continuity', tone: 'orange' },
    { x: 1.75, y: 860, z: 61, label: 'Exception-required', tone: 'blue' },
  ],
}

// ── Screen 6 — Approval & Execution ─────────────────────────────────────────
export const SPG_APPROVAL = {
  selected: 'Fully compliant recovery plan',
  action: 'Remove 23 infeasible options + assign 6 legal reserves + delay 3 flights ≤35 min + thin 2 turns + reaccommodate 520 pax',
  summary: [
    { field: 'Decision owner', value: 'OCC duty manager' },
    { field: 'Approval type', value: 'Human, multi-role (crew · aircraft · network · pax · policy)' },
    { field: 'Exception required', value: 'No (Option 1 is fully compliant)' },
    { field: 'Decision deadline', value: 'First protected departure 19:35 ET' },
    { field: 'Audit status', value: '100% complete before execution' },
  ],
  execItems: [
    { item: 'Feasibility gate log', target: 'Control tower decision log', action: 'Store all failed and passed constraints' },
    { item: 'Crew assignments', target: 'Crew scheduling / crew ops', action: 'Assign 6 legal reserves; block illegal swaps' },
    { item: 'Flight delay plan', target: 'OCC / network operations', action: 'Delay 3 protected flights within legality cap' },
    { item: 'Schedule thinning', target: 'Network operations', action: 'Thin 2 low-criticality turns' },
    { item: 'Aircraft validation', target: 'Aircraft / maintenance workflow', action: 'Confirm only ready tails are used' },
    { item: 'Passenger recovery', target: 'Reaccommodation', action: 'Rebook/protect 520 high-risk passengers' },
    { item: 'Audit pack', target: 'Governance / approval record', action: 'Store rationale, alternatives, binding constraints, approvals' },
  ],
  rationale: 'Fully compliant with no exception. Passes every hard gate, protects critical ATL/JFK flights, cuts passenger exposure 2,260 → 980, holds within the $1.6M cap, and has the highest execution confidence — the fastest auditable path to execution.',
  constraints: ['Regulatory / legality compliance', 'Crew qualification / pairing validity', 'Aircraft maintenance readiness', 'Policy / contractual compliance', 'Passenger priority rules', 'Cost within cap', 'Audit trail complete', 'Human approval'],
}

// ── Screen 7 — Test & Learn ─────────────────────────────────────────────────
export const SPG_OUTCOMES = [
  { metric: 'Infeasible options removed', pred: '23', actual: '25', learn: 'Two maintenance statuses changed after simulation' },
  { metric: 'Exceptions required', pred: '0', actual: '0', learn: 'Fully compliant path worked' },
  { metric: 'Flights protected', pred: '11', actual: '10', learn: 'One flight became gate-constrained' },
  { metric: 'Passenger exposure', pred: '980', actual: '1,080', learn: 'Reaccommodation capacity was optimistic' },
  { metric: 'Cost-to-recover', pred: '$1.55M', actual: '$1.68M', learn: 'Passenger recovery cost above forecast' },
  { metric: 'Execution confidence', pred: '88%', actual: '83%', learn: 'Approval coordination took longer' },
  { metric: 'Audit completeness', pred: '100%', actual: '100%', learn: 'Evidence pack satisfied governance' },
]

export const SPG_INSIGHTS = [
  'Maintenance status volatility created late infeasibility — refresh aircraft readiness before final approval.',
  'The fully compliant path was operationally safer than the exception path — keep exception options below compliant unless business value is overwhelming.',
  'Passenger capacity was overestimated — add a confidence band to reaccommodation availability.',
  'Approval routing took longer than modeled — pre-route the policy evidence pack earlier (Screen 4).',
  'A gate constraint appeared after feasibility approval — formalize it as a hard/conditional gate.',
]

export const SPG_LEARN = {
  accuracy: [
    { label: 'Overall prediction accuracy', value: '89%' },
    { label: 'Exceptions required', value: 'Correct (0)' },
    { label: 'Cost-to-recover', value: '±$130K' },
    { label: 'Audit completeness', value: '100%' },
  ],
  recalibration: [
    { label: 'Policy gate model', before: '2 states', after: '3 states', delta: '+conditional', note: 'Distinguish hard fail / conditional / leadership-exception' },
    { label: 'Aircraft feasibility model', before: 'sim-time', after: 'approval-handoff', delta: '+refresh', note: 'Refresh maintenance readiness at approval handoff' },
    { label: 'Recommendation logic', before: 'w=0.50', after: 'w=0.65', delta: '+exception penalty', note: 'Penalize exception options when compliant alternatives exist' },
  ],
  patterns: [
    'Maintenance status changes after simulation create late infeasibility — refresh before approval.',
    'Compliant paths beat exception paths on execution confidence and audit speed.',
    'Legality erodes under delay holds — show a countdown before approving a hold.',
  ],
  twin: { nodesEnriched: 64, lanesEnriched: 16, before: '62%', after: '100%', summary: '64 option twins · 16 binding constraints enriched — policy/crew/aircraft twins updated with realized gate outcomes and audit evidence' },
}

export const SPG_SAVE = {
  name: 'ATL Policy Feasibility Gate — Compliant Recovery First',
  tags: ['BINDING POLICY CONSTRAINT', 'POLICY FEASIBILITY GATE', 'COMPLIANT RECOVERY', 'HARD GATES', 'AUDIT-READY', 'ATL/JFK/BOS/MCO'],
  reusableFor: [
    'legal recovery filtering',
    'exception approval',
    'policy sandbox',
    'audit-ready decisioning',
    'contract/constraint gating',
  ],
}

// ── Per-screen loading transition lines ─────────────────────────────────────
export const SPG_LOADING_LINES = {
  1: ['Ingesting policy · crew · aircraft · cost feeds…', 'Applying hard feasibility gates to 64 options…', 'Flagging binding constraints + exceptions…', 'Signal deep-dive ready.'],
  2: ['Loading objective framework…', 'Weighting compliance / stability / CX / cost…', 'Objectives ready.'],
  3: ['Loading policy-aware levers…', 'Locking hard gates; applying compliant configuration…', 'Levers ready.'],
  4: ['Assembling scenario setup…', 'Running legality + maintenance + policy checks…', 'Summary ready.'],
  5: ['Running feasibility gate + scoring…', 'Comparing compliant / high-cost / exception options…', 'Ranking recommendations…'],
  6: ['Assembling execution package…', 'Completing audit evidence pack…', 'Ready for OCC + policy approval.'],
  7: ['Capturing realized outcomes…', 'Comparing predicted vs actual…', 'Updating gate model + compliant-recovery playbook…'],
}
