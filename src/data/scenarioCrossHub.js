// Signal 6 — Cross-Hub Propagation Probability
// Dedicated 7-screen deep-dive: a multi-hub cascade ORD → ATL → JFK → BOS
// already in Level 1 zero-sum crew-swap mode and rising toward Level 2
// cross-hub contamination. Same-day containment + 24–72h restart protection.
// Exports follow the shared workflow-panel contract (SCP_ prefix); all values
// are illustrative UI mock data, not actual Delta operational data.

export const SCP_ACCENT = 'red'

// ── Screen 1 — Signal Deep Dive ─────────────────────────────────────────────
export const SCP_SIGNAL = {
  sentinel: 'Cascade Sentinel',
  bannerText: 'Cross-Hub Propagation — ORD disruption is spreading through ATL/JFK donor pulls toward a BOS next-day failure.',
  card: [
    { label: 'Signal class', value: 'Cross-hub cascade / Level 2 prevention' },
    { label: 'Severity', value: 'CRITICAL' },
    { label: 'Detection', value: '16:05 ET' },
    { label: 'Propagation probability', value: '68%' },
    { label: 'Confidence', value: '89%' },
    { label: 'Cascade path', value: 'ORD → ATL → JFK → BOS' },
    { label: 'Cascade state', value: 'L1 active · L2 watch (rising)' },
    { label: 'Response window', value: '6–24h containment · 24–72h restart' },
  ],
  sourceChips: ['CREW', 'NETWORK', 'AIRCRAFT', 'PASSENGER', 'COST/POLICY', 'DERIVED'],
  detail: 'Crew recovery is no longer local. ORD donor pulls into ATL, then ATL pulls break JFK inbound positioning, and JFK aircraft/crew splits now threaten the BOS next-day first bank. Reserves sit below demand at more than one hub — a local crew fix can worsen the whole network.',
  conditions: [
    'Donor-hub swaps are creating new open trips outside ORD (23),',
    'Reserve coverage is below demand at ATL (0.69x) and JFK (0.81x),',
    'Aircraft/crew splits are blocking JFK/BOS station flows,',
    'BOS first-bank departures (17) are exposed to next-day failure.',
  ],
  conditionsNote: 'Cross-hub nodes use propagation likelihood, donor-flight risk, reserve coverage, and tail-crew co-location as state variables, with donor pulls and next-day rest cutoffs as critical events.',
}

export const SCP_DISRUPTION = {
  detected: '16:05 ET',
  source: 'ORD weather/ATC cancellation wave; recovery swaps pull crew into ATL, then ATL donor pulls expose JFK and BOS',
  cascade: 'ORD source (L0) → ATL donor pulls (L1 active) → JFK crew positioning break (L1→L2 watch) → BOS next-day first bank (L2 watch)',
}

export const SCP_IMPACT = [
  { label: 'Propagation probability', value: '68%', color: 'red' },
  { label: 'Affected hubs', value: '4', color: 'orange' },
  { label: 'New open trips (non-ORD)', value: '23', color: 'violet' },
  { label: 'Passenger backlog', value: '3,420', color: 'blue' },
  { label: 'Next-day launch risk', value: '17', color: 'red' },
]

// Optional Screen-1 blocks (render only when present)
export const SCP_METRICS = [
  { label: 'Donor-flight risks', value: '14', note: 'flights losing crew to recovery swaps' },
  { label: 'Reserve coverage', value: 'ATL 0.69x · JFK 0.81x · BOS 0.92x', note: 'ATL/JFK cannot absorb open trips' },
  { label: 'Crew mispositioning', value: '37 crew', note: 'not aligned to next origin' },
  { label: 'Aircraft blocking risk', value: '11 tails', note: 'crew/tail separated across hubs' },
  { label: 'Level 2 probability', value: '52%', note: 'next-day restart risk forming' },
  { label: 'Cost-to-recover', value: '$3.8M–$6.1M', note: 'recovery + deadhead + reaccom + OT' },
]

export const SCP_HUB_IMPACT = [
  { hub: 'ORD', state: 'Source hub', crew: '18 crews displaced', flights: '6 tails out of sequence', pax: '920', level: 'L0 source' },
  { hub: 'ATL', state: 'First donor hub', crew: '11 new open trips', flights: '4 tails waiting on crew', pax: '1,380', level: 'L1 active' },
  { hub: 'JFK', state: 'Secondary exposure', crew: '8 open trips', flights: '5 aircraft/crew splits', pax: '780', level: 'L1 → L2 watch' },
  { hub: 'BOS', state: 'Next-day contamination', crew: '4 next-day trips exposed', flights: '2 blocked tails', pax: '340', level: 'L2 watch' },
]

export const SCP_ROOT_CAUSE = [
  { domain: 'Crew', pct: 42, note: 'Zero-sum swaps and mispositioned crews create new open trips' },
  { domain: 'Network', pct: 24, note: 'ATL/JFK/BOS bank dependencies amplify the source disruption' },
  { domain: 'Aircraft', pct: 13, note: 'Tails and crews separating across hubs' },
  { domain: 'Passenger', pct: 12, note: 'Connection backlog and reaccommodation pressure now material' },
  { domain: 'External / Cost', pct: 9, note: 'ORD weather/ATC source; incentive/overtime/exception limits' },
]

export const SCP_CASCADE = [
  { level: 'Level 0 — Local open-trip surge (ORD)', status: 'Active', color: 'red', trigger: 'Source disruption opens trips and consumes reserves', action: 'Keep source visible; do not optimize ORD-only' },
  { level: 'Level 1 — Zero-sum crew shifts', status: 'Active', color: 'orange', trigger: 'ORD/ATL fixes pull crew, creating donor-flight risks (23 non-ORD open trips)', action: 'Block harmful swaps; require network-scored approval' },
  { level: 'Level 2 — Cross-hub contamination', status: 'Watch (rising)', color: 'yellow', trigger: 'Crewless tails block stations; BOS first bank (17) at risk next day', action: 'Enable 24–72h restart simulation' },
]

export const SCP_PRECEDENTS = [
  { episode: 'ORD storm → ATL crew pull replay', similarity: 87, pattern: 'Source closure + ATL donor swaps', outcome: 'Level 1 spread to JFK', lesson: 'Block donor swaps earlier' },
  { episode: 'ATL evening bank reserve collapse', similarity: 80, pattern: 'Low reserve coverage + open-trip inflow', outcome: 'Multiple next-day crew gaps', lesson: 'Trigger 24–72h reset earlier' },
  { episode: 'JFK aircraft/crew split replay', similarity: 73, pattern: 'Aircraft ready, crew mispositioned', outcome: 'BOS first bank delayed', lesson: 'Couple tail and crew before final approval' },
]

export const SCP_HYPOTHESIS = 'If Delta contains the cascade at the source — blocking harmful donor pulls, holding ATL/JFK reserve guardrails, deadheading crews back into position, and resequencing tails to unblock stations — then it can stop Level 1 spread and prevent Level 2 contamination of the BOS/JFK next-day banks while holding recovery cost within cap.'

// ── Screen 2 — Objectives & KPIs ────────────────────────────────────────────
export const SCP_PRIMARY_OBJECTIVES = [
  { value: 'Contain contamination, prevent Level 2 next-day failure', desc: 'Stop the cascade before it reaches BOS/JFK next-day banks' },
  { value: 'Stop harmful crew cannibalization', desc: 'Block Level 1 zero-sum donor pulls' },
  { value: 'Preserve donor-hub stability', desc: 'Hold ATL/JFK above the reserve guardrail' },
  { value: 'Reduce station blockage', desc: 'Unblock JFK/BOS aircraft/crew split flows' },
  { value: 'Protect next-day launch', desc: 'Shield the 17 exposed first-bank departures' },
  { value: 'Minimize passenger backlog', desc: 'Clear the 3,420-pax backlog by priority' },
]
export const SCP_PRIMARY_DEFAULT = 'Contain contamination, prevent Level 2 next-day failure'

export const SCP_SECONDARY_OBJECTIVES = [
  { value: 'Limit cost-to-recover', desc: 'Cost exposure is already high ($6.1M baseline)' },
  { value: 'Maintain policy / legal compliance', desc: 'Hard feasibility gate before any recommendation' },
  { value: 'Protect premium journeys', desc: 'Shield high-value passengers in the backlog' },
  { value: 'Maintain tail-crew synchronization', desc: '11 aircraft/crew splits to reconcile' },
  { value: 'Minimize deadhead burden', desc: 'Deadhead is necessary but seat-constrained' },
  { value: 'Preserve overnight restart readiness', desc: 'BOS/JFK next-day launch is exposed' },
]
export const SCP_SECONDARY_DEFAULT = ['Limit cost-to-recover', 'Maintain policy / legal compliance']

export const SCP_KPI_OPTIONS = [
  { value: 'Propagation spread', type: 'Operational', rec: true },
  { value: 'Open trips resolved', type: 'Operational', rec: true },
  { value: 'Level 2 probability', type: 'Network', rec: true },
  { value: 'Donor-hub impact', type: 'Resource', rec: true },
  { value: 'Passenger backlog clearance', type: 'CX', rec: true },
  { value: 'Misconnects avoided', type: 'CX', rec: true },
  { value: 'Cost-to-recover', type: 'Financial', rec: true },
  { value: 'Restart time', type: 'Resilience', rec: false },
  { value: 'Deadhead usage', type: 'Resource', rec: false },
  { value: 'Recommendation acceptance', type: 'Governance', rec: false },
  { value: 'Replay accuracy', type: 'Governance', rec: false },
]
export const SCP_KPI_DEFAULT = SCP_KPI_OPTIONS.filter(k => k.rec).map(k => k.value)

// ── Screen 3 — Simulation Levers ────────────────────────────────────────────
export const SCP_LEVER_GROUPS = [
  {
    group: 'A', title: 'Crew containment levers', color: 'red',
    levers: [
      { id: 'blockPulls', label: 'Block harmful crew pulls', control: 'select', options: ['Off', 'Exception-only', 'On'], recommended: 'On', why: 'Off requires OCC leadership approval' },
      { id: 'donorGuardrail', label: 'Donor-hub reserve guardrail', control: 'select', options: ['0.85x', '0.95x', '1.05x', '1.20x'], recommended: '0.95x', why: 'Donor hub cannot drop below guardrail' },
      { id: 'reserveRebalance', label: 'Reserve rebalancing (ATL→JFK/BOS)', control: 'select', options: ['0 crews', '8 crews', '14 crews', '20 crews'], recommended: '8 crews', why: 'Legal, qualified, report-time feasible' },
      { id: 'deadhead', label: 'Deadhead repositioning', control: 'select', options: ['0 crew', '14 crew', '22 crew', '30 crew'], recommended: '14 crew', why: 'Seat + arrival feasibility required' },
      { id: 'swapMode', label: 'Crew swap mode', control: 'select', options: ['Off', 'Safe swaps only', 'Aggressive'], recommended: 'Safe swaps only', why: 'Aggressive escalates approval' },
    ],
  },
  {
    group: 'B', title: 'Network protection levers', color: 'grape',
    levers: [
      { id: 'bankProtect', label: 'Bank protection', control: 'switch', recommended: true, onLabel: 'ATL / JFK / BOS banks', why: 'Protect high-dependency banks' },
      { id: 'scheduleThin', label: 'Schedule thinning', control: 'select', options: ['0 flights', '7 flights', '12 flights', '18 flights'], recommended: '7 flights', why: 'Minimize connection + premium exposure' },
      { id: 'altRoute', label: 'Reroute / alternate hub', control: 'select', options: ['Off', 'DTW/MSP selected', 'Broad'], recommended: 'DTW/MSP selected', why: 'Must not create new contamination' },
      { id: 'delay', label: 'Controlled delay', control: 'select', options: ['0 min', '45 min', '90 min'], recommended: '45 min', why: 'Cannot trigger legality breach' },
    ],
  },
  {
    group: 'C', title: 'Aircraft levers', color: 'orange',
    levers: [
      { id: 'tailReseq', label: 'Tail resequencing', control: 'select', options: ['0 tails', '6 tails', '12 tails'], recommended: '6 tails', why: 'Maintenance-ready only' },
      { id: 'stationUnblock', label: 'Station unblock plan (JFK/BOS)', control: 'switch', recommended: true, onLabel: 'JFK/BOS enabled', why: 'Requires tail + crew co-location' },
    ],
  },
  {
    group: 'D', title: 'Passenger · cost · recovery levers', color: 'blue',
    levers: [
      { id: 'reaccom', label: 'Early reaccommodation', control: 'select', options: ['0 pax', '1,100 pax', '2,200 pax', '3,500 pax'], recommended: '1,100 pax', why: 'Seat inventory dependent' },
      { id: 'backlogPriority', label: 'Backlog clearance priority', control: 'select', options: ['Connection-critical', 'Premium', 'Cost-min'], recommended: 'Connection-critical', why: 'Must preserve operational feasibility' },
      { id: 'costCap', label: 'Recovery cost tolerance', control: 'select', options: ['$3.0M', '$4.5M', '$6.0M'], recommended: '$4.5M', why: 'Leadership approval if exceeded' },
      { id: 'restart', label: '24–72h restart plan', control: 'select', options: ['Off', 'Watch', 'Active'], recommended: 'Active', why: 'Mandatory when Level 2 probability is high' },
    ],
  },
]
export const SCP_ALL_LEVERS = SCP_LEVER_GROUPS.flatMap(g => g.levers)
export const SCP_LEVER_DEFAULTS = Object.fromEntries(SCP_ALL_LEVERS.map(l => [l.id, l.recommended]))

// ── Screen 4 — Simulation Summary ───────────────────────────────────────────
export const SCP_SCENARIO = {
  name: 'ORD → ATL → JFK → BOS Cross-Hub Contamination Run',
  signal: 'Cross-Hub Propagation Probability',
  objective: 'Contain cross-hub contamination and prevent Level 2 next-day failure, weighting network stability 35% / restart 25% / CX 20% / resource 10% / cost 10%.',
  method: 'Network stress test + event-triggered live simulation + 24–72h reset; crew legality, donor-risk scoring, tail-crew co-location, and passenger backlog across all twins.',
}
export const SCP_SCOPE = [
  { item: 'Same-day flights exposed', value: '64 across ORD/ATL/JFK/BOS' },
  { item: 'New non-source open trips', value: '23 (confirms spread beyond ORD)' },
  { item: 'Hubs', value: 'ORD source · ATL/JFK donor/exposure · BOS next-day' },
  { item: 'Cascade state', value: 'Level 1 active · Level 2 watch (rising)' },
  { item: 'Decision deadline', value: 'Before JFK/BOS next-day legality cutoff' },
  { item: 'Horizon', value: 'Same-day + 24–72h restart' },
]
export const SCP_VALIDATION = [
  'Crew duty / rest legality checked',
  'Crew qualification / type rating checked',
  'Donor-hub reserve guardrail (≥0.95x) applied',
  'Aircraft maintenance readiness checked',
  'Tail + crew co-location feasibility checked',
  'Passenger seat inventory checked',
  'Cost cap watch armed',
  '24–72h restart plan active · human approval required',
]

// ── Screen 5 — Optimization Results ─────────────────────────────────────────
export const SCP_BASELINE = [
  { kpi: 'Propagation probability', value: '68%' },
  { kpi: 'New open trips (non-ORD)', value: '23' },
  { kpi: 'Affected hubs', value: '4' },
  { kpi: 'Level 2 probability', value: '52%' },
  { kpi: 'Passenger backlog', value: '3,420' },
  { kpi: 'Next-day exposed departures', value: '17' },
  { kpi: 'Cost-to-recover', value: '$6.1M' },
  { kpi: 'Donor-hub stability', value: 'Weak' },
]

export const SCP_RECOMMENDATIONS = [
  {
    id: 'containsource', rank: 1, tone: 'green', recommended: true,
    cardTitle: 'Option 1: Contain at source + block donor cannibalization',
    trigger: 'Level 1 is active and donor pulls are creating non-source open trips.',
    leversUsed: 'Freeze harmful ATL/JFK swaps · thin 7 legs · protect JFK/BOS banks · deadhead 14 · resequence 6 tails',
    impacted: '64 same-day flights · 4 hubs · 11 tail/crew splits · 3,420 pax',
    confidence: '87% · best Level 2 prevention',
    whyNot: 'Moderate planned cancellations vs the controlled-support option.',
    recommends: [
      'Freeze harmful crew swaps from ATL/JFK; hold donor guardrail 0.95x.',
      'Thin 7 low-criticality ORD/ATL legs; protect JFK/BOS banks.',
      'Deadhead 14 crews back into position; resequence 6 tails to unblock stations.',
    ],
    kpi: [
      { k: 'Propagation probability', b: '68%', a: '31%', d: '−37 pts' },
      { k: 'New open trips (non-ORD)', b: '23', a: '9', d: '−14' },
      { k: 'Level 2 probability', b: '52%', a: '21%', d: '−31 pts' },
      { k: 'Same-day cancellations', b: '18', a: '8', d: '−10 (planned)', neg: true },
      { k: 'Next-day exposed departures', b: '17', a: '6', d: '−11' },
      { k: 'Passenger backlog', b: '3,420', a: '1,580', d: '−1,840' },
      { k: 'Cost-to-recover', b: '$6.1M', a: '$4.3M', d: '−$1.8M' },
    ],
    why: 'Passes all hard gates, best reduces propagation and non-source open trips, lowest feasible backlog, and highest execution confidence — least dependent on volatile donor capacity.',
    bestWhen: 'Use when the priority is stopping the cascade before it contaminates BOS/JFK next-day banks.',
    risk: 'Moderate planned cancellations; watch cost cap as deadhead volume rises.',
    plan: {
      title: 'Cross-Hub Containment — Contain at Source',
      objective: 'Stop Level 1 spread and prevent Level 2 by blocking donor pulls, holding guardrails, and repositioning crew/tails.',
      phases: [
        { name: 'Phase 1 — Freeze & guard (0–20 min)', actions: ['Freeze harmful ATL/JFK crew pulls', 'Hold donor-hub reserve guardrail at 0.95x'] },
        { name: 'Phase 2 — Reposition (20–60 min)', actions: ['Deadhead 14 crews to restore next-origin alignment', 'Rebalance 8 crews ATL→JFK/BOS coverage gaps'] },
        { name: 'Phase 3 — Protect & unblock (1–3 hr)', actions: ['Thin 7 low-criticality legs; protect ATL/JFK/BOS banks', 'Resequence 6 tails; unblock JFK/BOS stations; reaccommodate 1,100 pax'] },
        { name: 'Phase 4 — Restart watch (evening → next day)', actions: ['Keep 24–72h restart plan active', 'Checkpoint BOS first bank before legality cutoff'] },
      ],
      changes: [
        { area: 'Crew', change: 'Block harmful pulls; guardrail 0.95x; deadhead 14 + rebalance 8; safe swaps only' },
        { area: 'Network', change: 'Thin 7 legs; protect ATL/JFK/BOS banks; DTW/MSP relief as needed' },
        { area: 'Aircraft', change: 'Resequence 6 tails; unblock JFK/BOS stations' },
        { area: 'Passenger', change: 'Reaccommodate 1,100 connection-critical pax' },
      ],
      guardrails: ['Crew legality / rest', 'Donor-hub guardrail ≥0.95x', 'Tail maintenance readiness', 'Seat inventory', 'Cost cap watch', '24–72h restart active', 'Human approval'],
      expected: 'Propagation 68%→31%; non-source open trips 23→9; Level 2 52%→21%; cost $6.1M→$4.3M.',
    },
  },
  {
    id: 'controlledsupport', rank: 2, tone: 'orange', recommended: false,
    cardTitle: 'Option 2: Controlled cross-hub support',
    trigger: 'Reserve relief is available from DTW/MSP and visible cancellations must stay low.',
    leversUsed: 'Limited DTW/MSP reserve support · rebalance 12 crews · protect ATL/JFK · defer BOS restart',
    impacted: '64 same-day flights · ATL/JFK banks · 3,420 pax',
    confidence: '72% · lower visible cancellations',
    whyNot: 'Higher propagation uncertainty; leans on volatile donor/relief capacity.',
    recommends: [
      'Allow limited DTW/MSP reserve support; rebalance 12 crews.',
      'Protect ATL/JFK and defer BOS restart decisions until later.',
    ],
    kpi: [
      { k: 'Propagation probability', b: '68%', a: '39%', d: '−29 pts' },
      { k: 'New open trips (non-ORD)', b: '23', a: '13', d: '−10' },
      { k: 'Level 2 probability', b: '52%', a: '32%', d: '−20 pts' },
      { k: 'Same-day cancellations', b: '18', a: '6', d: '−12' },
      { k: 'Next-day exposed departures', b: '17', a: '9', d: '−8' },
      { k: 'Passenger backlog', b: '3,420', a: '1,920', d: '−1,500' },
      { k: 'Cost-to-recover', b: '$6.1M', a: '$4.8M', d: '−$1.3M' },
    ],
    why: 'Fewest visible cancellations, but weaker on propagation and next-day risk because it depends on relief capacity that can shift.',
    bestWhen: 'Use when DTW/MSP relief is stable and avoiding visible cancellations is the priority.',
    risk: 'Higher propagation uncertainty; BOS restart risk deferred rather than resolved.',
    plan: {
      title: 'Cross-Hub Containment — Controlled Support',
      objective: 'Keep cancellations low using limited cross-hub relief while protecting ATL/JFK.',
      phases: [
        { name: 'Phase 1 — Relief setup (0–30 min)', actions: ['Confirm DTW/MSP reserve relief capacity', 'Rebalance 12 crews toward coverage gaps'] },
        { name: 'Phase 2 — Protect ATL/JFK (30–90 min)', actions: ['Protect ATL/JFK banks; apply controlled delay', 'Hold donor guardrail'] },
        { name: 'Phase 3 — Monitor Level 2 (evening)', actions: ['Defer BOS restart decision; watch next-day exposure', 'Escalate to contain-source if propagation rises'] },
      ],
      changes: [
        { area: 'Crew', change: 'Rebalance 12; limited DTW/MSP relief; safe swaps only' },
        { area: 'Network', change: 'Protect ATL/JFK; controlled delay' },
        { area: 'Aircraft', change: 'Minimal tail action' },
        { area: 'Passenger', change: 'Reaccommodate as capacity allows' },
      ],
      guardrails: ['Crew legality / rest', 'Donor-hub guardrail', 'Relief must not create new contamination', 'Human approval'],
      expected: 'Propagation 68%→39%; Level 2 52%→32%; cost $6.1M→$4.8M; cancellations held to 6.',
    },
  },
  {
    id: 'networkreset', rank: 3, tone: 'blue', recommended: false,
    cardTitle: 'Option 3: Network reset + overnight redeployment',
    trigger: 'Same-day operation is already unstable; restart protection beats same-day continuity.',
    leversUsed: 'Accept same-day thinning · overnight crew/aircraft redeploy · rebuild BOS/JFK first bank',
    impacted: '64 same-day flights · BOS/JFK first banks · 3,420 pax',
    confidence: '79% · best restart readiness',
    whyNot: 'Highest short-term CX disruption from same-day thinning.',
    recommends: [
      'Accept same-day thinning; prioritize overnight crew/aircraft redeployment.',
      'Rebuild the BOS/JFK first bank for the next day.',
    ],
    kpi: [
      { k: 'Propagation probability', b: '68%', a: '34%', d: '−34 pts' },
      { k: 'New open trips (non-ORD)', b: '23', a: '10', d: '−13' },
      { k: 'Level 2 probability', b: '52%', a: '24%', d: '−28 pts' },
      { k: 'Same-day cancellations', b: '18', a: '11', d: '−7 (planned)', neg: true },
      { k: 'Next-day exposed departures', b: '17', a: '4', d: '−13' },
      { k: 'Passenger backlog', b: '3,420', a: '2,150', d: '−1,270' },
      { k: 'Cost-to-recover', b: '$6.1M', a: '$5.0M', d: '−$1.1M' },
    ],
    why: 'Best next-day restart readiness by front-loading overnight redeployment, at the cost of the most same-day CX disruption.',
    bestWhen: 'Use only when the same-day operation is already unstable and restart protection is chosen over continuity.',
    risk: 'Highest short-term CX disruption and largest same-day thinning.',
    plan: {
      title: 'Cross-Hub Containment — Network Reset',
      objective: 'Protect next-day BOS/JFK launch via overnight crew/aircraft redeployment.',
      phases: [
        { name: 'Phase 1 — Accept thinning (0–60 min)', actions: ['Thin same-day low-criticality legs', 'Free crew/aircraft for redeployment'] },
        { name: 'Phase 2 — Overnight redeploy (evening)', actions: ['Redeploy crew/aircraft overnight', 'Rebuild BOS/JFK first bank'] },
        { name: 'Phase 3 — Restart confirm (overnight → morning)', actions: ['Confirm legal crew for first bank', 'Checkpoint BOS restart before cutoff'] },
      ],
      changes: [
        { area: 'Network', change: 'Accept same-day thinning; rebuild first banks' },
        { area: 'Crew', change: 'Overnight redeployment; legality reset' },
        { area: 'Aircraft', change: 'Overnight tail redeployment' },
        { area: 'Passenger', change: 'Reaccommodate same-day backlog; premium protection on' },
      ],
      guardrails: ['Crew legality / rest', 'Overnight rest cutoffs honored', 'Aircraft maintenance readiness', 'Human approval'],
      expected: 'Next-day exposed departures 17→4; Level 2 52%→24%; cost $6.1M→$5.0M; higher same-day thinning.',
    },
  },
]

export const SCP_RANKING = [
  { rank: 1, reco: 'Contain at source + block donor cannibalization', service: 'Highest', cost: 'Medium', speed: 'High', feasibility: 'High', select: 'Selected' },
  { rank: 2, reco: 'Controlled cross-hub support', service: 'Medium-high', cost: 'Medium-high', speed: 'Medium', feasibility: 'Medium', select: 'Alternative' },
  { rank: 3, reco: 'Network reset + overnight redeployment', service: 'Medium', cost: 'Medium-high', speed: 'Low', feasibility: 'High', select: 'Alternative' },
]

export const SCP_FRONTIER = {
  xLabel: 'Cost-to-recover ($M)', yLabel: 'Level 2 probability (%)', zLabel: 'Execution confidence (%)',
  points: [
    { x: 6.1, y: 52, z: 0, label: 'Do nothing', tone: 'gray' },
    { x: 4.3, y: 21, z: 87, label: 'Contain source', tone: 'green', recommended: true },
    { x: 4.8, y: 32, z: 72, label: 'Controlled support', tone: 'orange' },
    { x: 5.0, y: 24, z: 79, label: 'Network reset', tone: 'blue' },
  ],
}

// ── Screen 6 — Approval & Execution ─────────────────────────────────────────
export const SCP_APPROVAL = {
  selected: 'Contain at source + block donor cannibalization',
  action: 'Freeze harmful ATL/JFK swaps + rebalance 8 + deadhead 14 + thin 7 legs + protect banks + resequence 6 tails + reaccommodate 1,100 pax',
  summary: [
    { field: 'Decision owner', value: 'OCC duty manager' },
    { field: 'Approval type', value: 'Human, multi-role (crew · network · aircraft · pax)' },
    { field: 'Auto-execution', value: 'Disabled' },
    { field: 'Decision deadline', value: 'Before JFK/BOS next-day legality cutoff' },
    { field: 'Audit status', value: 'Decision log will be created' },
  ],
  execItems: [
    { item: 'Donor-block list', target: 'Crew scheduling / crew ops', action: 'Freeze harmful crew pulls from ATL/JFK' },
    { item: 'Crew rebalancing', target: 'Crew scheduling + travel', action: 'Move 8 legal crews toward JFK/BOS gaps' },
    { item: 'Deadhead plan', target: 'Crew travel workflow', action: 'Book 14 deadheads to restore next-origin alignment' },
    { item: 'Schedule thinning', target: 'Network operations', action: 'Thin 7 low-criticality flights' },
    { item: 'Bank protection', target: 'OCC network plan', action: 'Protect ATL/JFK/BOS high-dependency banks' },
    { item: 'Tail resequencing', target: 'Aircraft planning / maintenance', action: 'Resequence 6 tails to unblock stations' },
    { item: 'Passenger recovery', target: 'Reaccommodation', action: 'Rebook/protect 1,100 connection-critical pax' },
    { item: 'Audit trail', target: 'Decision log', action: 'Store rationale, constraints, rejected options, approvals' },
  ],
  rationale: 'Best Level 2 prevention. Blocks donor cannibalization, holds the 0.95x guardrail, and repositions crew/tails within the window — least dependent on volatile donor capacity. Cuts propagation 68% → 31% and cost $6.1M → $4.3M.',
  constraints: ['Crew legality / rest', 'Crew qualification / type rating', 'Donor-hub reserve guardrail (≥0.95x)', 'Aircraft maintenance readiness', 'Passenger seat inventory', 'Cost cap (watch)', '24–72h restart active', 'Human approval'],
}

// ── Screen 7 — Test & Learn ─────────────────────────────────────────────────
export const SCP_OUTCOMES = [
  { metric: 'Propagation probability', pred: '31%', actual: '34%', learn: 'Containment worked but donor pressure remained' },
  { metric: 'New open trips (non-ORD)', pred: '9', actual: '11', learn: 'Two ATL swaps still created secondary gaps' },
  { metric: 'Level 2 outcome', pred: 'Avoided', actual: 'Avoided', learn: 'Restart plan prevented BOS contamination' },
  { metric: 'Passenger backlog', pred: '1,580', actual: '1,710', learn: 'Reaccommodation capacity slightly overestimated' },
  { metric: 'Next-day exposed departures', pred: '6', actual: '5', learn: 'Overnight redeployment helped more than predicted' },
  { metric: 'Cost-to-recover', pred: '$4.3M', actual: '$4.55M', learn: 'Deadhead + passenger recovery costs higher' },
  { metric: 'Execution confidence', pred: '87%', actual: '82%', learn: 'Cross-team coordination took longer than modeled' },
]

export const SCP_INSIGHTS = [
  'Donor-blocking reduced Level 2 risk — keep the harmful-swap blocker on by default for this signal.',
  'The 0.95x donor-hub reserve guardrail was effective — preserve it as the default starting point.',
  'Reaccommodation capacity was optimistic — add a stronger passenger-inventory confidence band.',
  'Tail resequencing reduced station blockage — pull the aircraft planner into Screen 3 earlier.',
  'Overnight redeployment helped the BOS launch — trigger the 24–72h restart earlier on BOS/JFK exposure.',
]

export const SCP_LEARN = {
  accuracy: [
    { label: 'Overall prediction accuracy', value: '88%' },
    { label: 'Level 2 avoidance', value: 'Correct' },
    { label: 'Cost-to-recover', value: '±$250K' },
    { label: 'Propagation probability', value: '±3 pts' },
  ],
  recalibration: [
    { label: 'Propagation model', before: 'w=0.62', after: 'w=0.74', delta: '+non-source penalty', note: 'Penalize swaps that create non-source open trips' },
    { label: 'Donor-risk model', before: '0.71', after: '0.82', delta: '+guardrail weight', note: 'Higher weight on donor coverage below 0.95x' },
    { label: 'Aircraft model', before: 'excluded', after: 'included', delta: '+tail blocking', note: 'Add tail blocking risk into Level 2 probability' },
  ],
  patterns: [
    'Donor pulls from ATL/JFK banks create secondary open trips — block by default.',
    'Aircraft ready but crew mispositioned drives station blockage — couple tail + crew before approval.',
    'BOS/JFK next-day banks fail when crews miss legal rest — trigger overnight reset earlier.',
  ],
  twin: { nodesEnriched: 64, lanesEnriched: 23, before: '66%', after: '88%', summary: '64 flight twins · 23 cross-hub open-trip lanes enriched — crew/network/aircraft twins updated with realized cross-hub containment outcomes' },
}

export const SCP_SAVE = {
  name: 'ORD → ATL → JFK → BOS Cross-Hub Containment',
  tags: ['CROSS-HUB PROPAGATION', 'CROSS-HUB CONTAMINATION', 'DONOR-BLOCK', 'RESERVE GUARDRAIL', 'LEVEL 2 PREVENTION', 'ORD/ATL/JFK/BOS'],
  reusableFor: [
    'weather hub closure',
    'reserve depletion',
    'crew mispositioning',
    'next-day restart risk',
    'multi-hub cascade containment',
  ],
}

// ── Per-screen loading transition lines ─────────────────────────────────────
export const SCP_LOADING_LINES = {
  1: ['Ingesting crew · network · aircraft · passenger feeds…', 'Tracing donor pulls across ORD/ATL/JFK/BOS…', 'Scoring propagation + Level 2 probability…', 'Signal deep-dive ready.'],
  2: ['Loading objective framework…', 'Weighting network stability / restart / CX…', 'Objectives ready.'],
  3: ['Loading containment levers…', 'Applying donor-block + guardrail configuration…', 'Levers ready.'],
  4: ['Assembling scenario setup…', 'Running legality + donor-risk checks…', 'Summary ready.'],
  5: ['Running network stress test + restart sim…', 'Comparing contain / support / reset strategies…', 'Ranking recommendations…'],
  6: ['Assembling execution package…', 'Validating legality + donor guardrails…', 'Ready for OCC approval.'],
  7: ['Capturing realized outcomes…', 'Comparing predicted vs actual…', 'Updating priors + cross-hub containment playbook…'],
}
