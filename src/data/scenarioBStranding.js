// Signal 5 — Mid-Rotation Hub Stranding (Scenario B)
// Dedicated 7-screen deep-dive: ORD weather/ATC strands crews mid-rotation,
// cascading ORD → ATL → JFK. Crew-position recovery + cascade containment.
// Exports follow the shared workflow-panel contract (SCB_ prefix); all values
// are illustrative UI mock data, not actual Delta operational data.

export const SCB_ACCENT = 'red'

// ── Screen 1 — Signal Deep Dive ─────────────────────────────────────────────
export const SCB_SIGNAL = {
  sentinel: 'Scenario B Stranding Sentinel',
  bannerText: 'Mid-Rotation Hub Stranding — crews stranded at ORD by weather/ATC; remaining legs open, ATL/JFK exposed.',
  card: [
    { label: 'Signal class', value: 'Crew displacement / cascade containment' },
    { label: 'Severity', value: 'CRITICAL', note: '(upgraded from High — Level 1 active)' },
    { label: 'Detection', value: '15:20 ET' },
    { label: 'Source disruption', value: 'ORD weather + ATC ground stop' },
    { label: 'Stranded location', value: 'ORD' },
    { label: 'Stranded domicile', value: 'ATL / JFK mix' },
    { label: 'Cascade state', value: 'L0 active · L1 active · L2 watch' },
    { label: 'Response window', value: 'First replacement report in 2h 40m' },
  ],
  sourceChips: ['CREW', 'NETWORK', 'AIRCRAFT', 'PASSENGER', 'EXTERNAL', 'DERIVED'],
  detail: 'Scenario B: crew mid-rotation at ORD, next outbound cancels, remaining legs go open and crew is stuck out of domicile needing deadhead. Recovery choices can create donor-flight risk (Level 1) and next-day cross-hub contamination (Level 2).',
  conditions: [
    'ORD outbound cancellation opens remaining rotation legs,',
    'Stranded crews are out of domicile and need deadhead + legal reset,',
    'Reserves alone cannot absorb the open chain (0.76x ATL / 0.88x JFK),',
    'JFK next-day starts risk missing legal crew or aircraft block.',
  ],
  conditionsNote: 'Scenario B nodes use crew position, legality, deadhead feasibility, and reserve coverage as state variables, with hub cancellation and open-leg creation as events.',
}

export const SCB_DISRUPTION = {
  detected: '15:20 ET',
  source: 'ORD weather + ATC ground stop cancels outbound ORD–DEN leg',
  cascade: 'ORD source event → ATL crew displacement → JFK next-day exposure',
}

export const SCB_IMPACT = [
  { label: 'Stranded crews', value: '14', color: 'red' },
  { label: 'Stranded crew-hours', value: '486', color: 'orange' },
  { label: 'Remaining legs affected', value: '31', color: 'violet' },
  { label: 'Misconnects at risk', value: '780', color: 'blue' },
  { label: 'Cost exposure', value: '$1.6–2.9M', color: 'red' },
]

// Optional Screen-1 blocks (render only when present)
export const SCB_METRICS = [
  { label: 'Crew members', value: '62', note: 'across 14 crews' },
  { label: 'Crew groups', value: '8 pilot · 6 FA pairings' },
  { label: 'Domicile distance', value: 'ORD→ATL 606 mi · ORD→JFK 740 mi' },
  { label: 'Deadhead seats', value: '43 across 9 flights' },
  { label: 'Legal arrival feasibility', value: '61%' },
  { label: 'Reserve coverage', value: '0.76x ATL / 0.88x JFK' },
  { label: 'Aircraft-tail coupling', value: '9 tails' },
  { label: 'Passenger exposure', value: '4,980 pax' },
]

export const SCB_HUB_IMPACT = [
  { hub: 'ORD', state: 'Source cancellation', crew: '14 crews stranded', flights: '9 cancelled / delayed', pax: '1,420', level: 'L0 active' },
  { hub: 'ATL', state: 'Downstream crew origin', crew: '7 pairings missing crew', flights: '14 exposed legs', pax: '2,180', level: 'L1 active' },
  { hub: 'JFK', state: 'Next-day exposure', crew: '4 pairings exposed', flights: '8 next-day legs', pax: '1,020', level: 'L2 watch' },
  { hub: 'DEN', state: 'Intermediate station', crew: '3 legs crewless', flights: '5 exposed legs', pax: '360', level: 'L1 watch' },
]

export const SCB_ROOT_CAUSE = [
  { domain: 'External', pct: 31, note: 'ORD weather/ATC cancellation triggered stranding' },
  { domain: 'Crew', pct: 30, note: 'Out of domicile; cannot operate without deadhead / legal reset' },
  { domain: 'Network', pct: 18, note: 'Remaining legs feed ATL/JFK banks' },
  { domain: 'Aircraft', pct: 11, note: '9 tails coupled to affected rotations' },
  { domain: 'Passenger', pct: 10, note: 'Connection-heavy ATL/JFK banks raise CX severity' },
]

export const SCB_CASCADE = [
  { level: 'Level 0 — Open-chain creation', status: 'Active', color: 'red', trigger: 'ORD outbound cancellation opens remaining Scenario B legs', action: 'Launch Scenario B recovery' },
  { level: 'Level 1 — Zero-sum recovery', status: 'Active', color: 'orange', trigger: 'Reserve shortage forces swaps / pulls from ATL/JFK pairings', action: 'Block harmful donor pulls; score donor-flight risk' },
  { level: 'Level 2 — Cross-hub contamination', status: 'Watch', color: 'yellow', trigger: 'JFK next-day starts lack legal crew or aircraft block', action: 'Activate 24–72h restart simulation' },
]

export const SCB_PRECEDENTS = [
  { episode: 'ORD winter hub closure replay', similarity: 86, pattern: 'Stranded crews + deadhead dependency', outcome: 'Level 1 spread to ATL', lesson: 'Start deadhead earlier; protect donor hubs' },
  { episode: 'ATL bank crew displacement', similarity: 78, pattern: 'Crew pull created secondary open trips', outcome: '6 additional delays', lesson: 'Block donor swaps unless net-positive' },
  { episode: 'JFK next-day restart miss', similarity: 71, pattern: 'Crew arrived after legal rest cutoff', outcome: 'Morning bank delay', lesson: 'Trigger overnight reset before midnight' },
]

export const SCB_HYPOTHESIS = 'If Delta repositions stranded ORD crews with deadhead-first moves plus a reserve bridge, protects the ATL/JFK connection banks, and blocks harmful donor pulls, then it can contain Level 1 and prevent Level 2 next-day contamination while limiting deadhead and cancellation cost.'

// ── Screen 2 — Objectives & KPIs ────────────────────────────────────────────
export const SCB_PRIMARY_OBJECTIVES = [
  { value: 'Restore crew position, prevent Level 2 contamination', desc: 'Rebuild stranded rotations while stopping next-day cross-hub failure' },
  { value: 'Protect remaining rotation legs', desc: 'Cover the open chain created by the ORD cancellation' },
  { value: 'Preserve ATL evening + JFK morning banks', desc: 'Protect the connection-heavy banks with largest exposure' },
  { value: 'Minimize cancellations', desc: 'Keep controlled pre-cancels to a minimum' },
  { value: 'Contain Level 1 zero-sum recovery', desc: 'Avoid harmful crew pulls from donor hubs' },
  { value: 'Limit cost-to-recover', desc: 'Hold deadhead, hotel, and cancellation cost down' },
]
export const SCB_PRIMARY_DEFAULT = 'Restore crew position, prevent Level 2 contamination'

export const SCB_SECONDARY_OBJECTIVES = [
  { value: 'Minimize deadhead burden', desc: 'Deadhead is necessary but costly and seat-constrained' },
  { value: 'Avoid harmful crew swaps', desc: 'Level 1 zero-sum risk is active' },
  { value: 'Protect passenger connections', desc: '780 projected misconnects' },
  { value: 'Maintain aircraft-tail continuity', desc: '9 tails coupled to affected rotations' },
  { value: 'Preserve JFK next-day launch', desc: 'Level 2 watch is active' },
  { value: 'Limit hotel / rest cost', desc: 'Overnight reset adds accommodation cost' },
]
export const SCB_SECONDARY_DEFAULT = ['Minimize deadhead burden', 'Avoid harmful crew swaps']

export const SCB_KPI_OPTIONS = [
  { value: 'Open legs covered', type: 'Reliability', rec: true },
  { value: 'Cancellations avoided', type: 'Reliability', rec: true },
  { value: 'Stranded crew-hours', type: 'Resource', rec: true },
  { value: 'Level 2 probability', type: 'Network', rec: true },
  { value: 'Misconnects avoided', type: 'CX', rec: true },
  { value: 'Deadhead usage', type: 'Resource', rec: true },
  { value: 'Cost-to-recover', type: 'Financial', rec: true },
  { value: 'Next-day JFK legs at risk', type: 'Restart', rec: false },
  { value: 'Reserve-hour utilization', type: 'Resource', rec: false },
  { value: 'Recovery time', type: 'Resilience', rec: false },
  { value: 'Donor-flight risk count', type: 'Governance', rec: false },
]
export const SCB_KPI_DEFAULT = SCB_KPI_OPTIONS.filter(k => k.rec).map(k => k.value)

// ── Screen 3 — Simulation Levers ────────────────────────────────────────────
export const SCB_LEVER_GROUPS = [
  {
    group: 'A', title: 'Crew recovery levers', color: 'red',
    levers: [
      { id: 'deadheadCrew', label: 'Deadhead stranded crews', control: 'select', options: ['10 crew', '14 crew', '18 crew', '22 crew'], recommended: '18 crew', why: 'Reposition crew before report time, preserving legality' },
      { id: 'deadheadPriority', label: 'Deadhead priority', control: 'select', options: ['Critical pairing first', 'FIFO', 'Cost-min'], recommended: 'Critical pairing first', why: 'Critical-bank legs first' },
      { id: 'reserveAssign', label: 'Local reserve assignment', control: 'select', options: ['0 reserves', '9 ATL + 5 JFK', '15 reserves', '20 reserves'], recommended: '9 ATL + 5 JFK', why: 'Legal, qualified, rested reserves only' },
      { id: 'crewSwap', label: 'Crew swap', control: 'select', options: ['Off', 'Safe swaps only', 'Aggressive'], recommended: 'Safe swaps only', why: 'Aggressive requires Level 1 approval' },
      { id: 'reassignPairing', label: 'Reassign within pairing', control: 'switch', recommended: true, onLabel: 'On (6 pairings)', why: 'Rebuild remaining rotation legs' },
      { id: 'overnightRedeploy', label: 'Overnight redeployment', control: 'select', options: ['Off', 'Watch', 'Active'], recommended: 'Watch', why: 'Activate if Level 2 risk passes threshold' },
    ],
  },
  {
    group: 'B', title: 'Network protection levers', color: 'grape',
    levers: [
      { id: 'delayLegs', label: 'Delay remaining legs', control: 'select', options: ['0 min', '30 min', '45 min', '60 min'], recommended: '45 min', why: 'Delay without triggering a legality breach' },
      { id: 'thinCancel', label: 'Cancel / thin candidates', control: 'select', options: ['0 legs', '4 low-criticality', '8 legs'], recommended: '4 low-criticality', why: 'OCC approval required' },
      { id: 'bankProtect', label: 'Bank protection', control: 'switch', recommended: true, onLabel: 'ATL evening + JFK morning', why: 'Protect connection-heavy banks' },
      { id: 'altRoute', label: 'Alternate routing', control: 'select', options: ['Off', 'DTW/MSP optional', 'Broad'], recommended: 'DTW/MSP optional', why: 'Avoid creating new bottlenecks' },
    ],
  },
  {
    group: 'C', title: 'Aircraft levers', color: 'orange',
    levers: [
      { id: 'tailSwap', label: 'Tail swap', control: 'select', options: ['0 tails', '3 tails', '6 tails'], recommended: '3 tails', why: 'Maintenance-ready tails only' },
      { id: 'rotationReseq', label: 'Rotation resequencing', control: 'switch', recommended: true, onLabel: 'Selected rotations', why: 'Avoid aircraft-only fixes that worsen the crew gap' },
    ],
  },
  {
    group: 'D', title: 'Passenger · cost · recovery levers', color: 'blue',
    levers: [
      { id: 'reaccom', label: 'Early reaccommodation', control: 'select', options: ['0 pax', '520 pax', '1,000 pax'], recommended: '520 pax', why: 'Capacity-dependent' },
      { id: 'premiumProtect', label: 'Premium protection', control: 'switch', recommended: true, onLabel: 'On', why: 'Protect priority journeys' },
      { id: 'deadheadCap', label: 'Deadhead cost cap', control: 'select', options: ['$300K', '$420K', '$600K'], recommended: '$420K', why: 'Escalate if exceeded' },
      { id: 'restartWatch', label: '24–72h restart watch', control: 'select', options: ['Off', 'Watch', 'Active'], recommended: 'Watch', why: 'Active if JFK launch risk persists' },
    ],
  },
]
export const SCB_ALL_LEVERS = SCB_LEVER_GROUPS.flatMap(g => g.levers)
export const SCB_LEVER_DEFAULTS = Object.fromEntries(SCB_ALL_LEVERS.map(l => [l.id, l.recommended]))

// ── Screen 4 — Simulation Summary ───────────────────────────────────────────
export const SCB_SCENARIO = {
  name: 'Scenario B — Stranded Hub Recovery',
  signal: 'Mid-Rotation Hub Stranding Detected',
  objective: 'Restore stranded crew position and protect downstream pairings without triggering Level 2 cross-hub failure.',
  method: 'Event-triggered live simulation + 24–72h restart watch; crew legality, deadhead feasibility, reserve bridge, and donor-risk scoring across Crew / Network / Aircraft / Passenger twins.',
}
export const SCB_SCOPE = [
  { item: 'Stranded crews', value: '14 crews / 62 crew members' },
  { item: 'Remaining legs', value: '31 legs across ORD / ATL / JFK / DEN' },
  { item: 'Hubs', value: 'ORD source · ATL/JFK downstream · DEN intermediate' },
  { item: 'Cascade state', value: 'Level 0 + Level 1 active · Level 2 watch' },
  { item: 'Decision deadline', value: 'First ATL departure in 2h 40m' },
  { item: 'Horizon', value: 'Live + 24–72h restart watch' },
]
export const SCB_VALIDATION = [
  'Crew duty / rest legality checked',
  'Crew qualification / type rating checked',
  'Deadhead arrival feasibility checked',
  'Donor-flight risk guardrail applied',
  'Aircraft maintenance readiness checked',
  'Passenger connection feasibility checked',
  'Level 2 restart watch armed',
  'Human approval required before execution',
]

// ── Screen 5 — Optimization Results ─────────────────────────────────────────
export const SCB_BASELINE = [
  { kpi: 'Open legs unresolved', value: '31' },
  { kpi: 'Cancellations likely', value: '13' },
  { kpi: 'Stranded crew-hours', value: '486' },
  { kpi: 'Misconnects at risk', value: '780' },
  { kpi: 'Level 2 probability', value: '41%' },
  { kpi: 'Cost-to-recover', value: '$2.9M' },
  { kpi: 'Reserve coverage (ATL)', value: '0.76x' },
  { kpi: 'Deadhead crew used', value: '0' },
]

export const SCB_RECOMMENDATIONS = [
  {
    id: 'deadhead', rank: 1, tone: 'green', recommended: true,
    cardTitle: 'Recommendation 1: Deadhead-heavy containment + reserve bridge',
    trigger: 'Level 2 risk is active and reserves alone cannot cover the open chain.',
    leversUsed: 'Deadhead 20 crew · 12 reserve bridge · delay 5 protected banks · tail-swap 3 · reaccom 520 pax',
    impacted: '31 legs · ATL/JFK banks · 9 tails · 4,980 pax',
    confidence: '84% · best Level 2 prevention',
    whyNot: 'Higher deadhead cost than reserve-first.',
    recommends: [
      'Deadhead 20 crew ORD→ATL/JFK and bridge with 12 legal reserves.',
      'Delay 5 protected-bank flights ≤45 min; tail-swap 3 aircraft; reaccommodate 520 pax.',
    ],
    kpi: [
      { k: 'Open legs unresolved', b: '31', a: '9', d: '−22' },
      { k: 'Cancellations', b: '13', a: '4', d: '−9' },
      { k: 'Stranded crew-hours', b: '486', a: '190', d: '−296' },
      { k: 'Deadhead crew used', b: '0', a: '20', d: '+20', neg: true },
      { k: 'Misconnects at risk', b: '780', a: '340', d: '−440' },
      { k: 'Level 2 probability', b: '41%', a: '19%', d: '−22 pts' },
      { k: 'Cost-to-recover', b: '$2.9M', a: '$2.05M', d: '−$0.85M' },
    ],
    why: 'Uses more deadhead but preserves reserves for later banks and best reduces next-day contamination.',
    bestWhen: 'Preventing next-day cross-hub contamination is the priority.',
    risk: 'Deadhead cost near cap; watch seat availability until execution lock.',
    plan: {
      title: 'Scenario B — Deadhead-heavy Containment',
      objective: 'Restore crew position and prevent Level 2 contamination using deadhead-first moves plus a reserve bridge.',
      phases: [
        { name: 'Phase 1 — Deadhead wave (0–90 min)', actions: ['Book ORD→ATL/JFK deadhead for 20 crew, critical pairing first', 'Confirm legal arrival before report time'] },
        { name: 'Phase 2 — Reserve bridge (0–2 hr)', actions: ['Assign 9 ATL + 5 JFK legal reserves as bridge coverage', 'Rebuild 6 remaining Scenario B pairings'] },
        { name: 'Phase 3 — Protect banks (1–4 hr)', actions: ['Delay 5 protected-bank flights ≤45 min', 'Tail-swap 3 ready aircraft; reaccommodate 520 pax'] },
        { name: 'Phase 4 — Restart watch (evening → next day)', actions: ['Arm 24–72h restart watch for JFK morning bank', 'Trigger overnight reset before legal cutoff'] },
      ],
      changes: [
        { area: 'Crew', change: 'Deadhead 20 + 12 reserve bridge; reassign 6 pairings; safe swaps only' },
        { area: 'Network', change: 'Delay 5 protected flights ≤45 min; protect ATL/JFK banks' },
        { area: 'Aircraft', change: 'Tail-swap 3 ready aircraft; selected rotation resequencing' },
        { area: 'Passenger', change: 'Reaccommodate 520 pax; premium protection on' },
      ],
      guardrails: ['Crew legality / rest', 'Donor-risk safe swaps only', 'Tail maintenance readiness', 'Deadhead cost cap', 'Human approval'],
      expected: 'Open legs 31→9; cancellations 13→4; Level 2 41%→19%; misconnects 780→340; cost $2.9M→$2.05M.',
    },
  },
  {
    id: 'reserve', rank: 2, tone: 'orange', recommended: false,
    cardTitle: 'Recommendation 2: Reserve-first local stabilization',
    trigger: 'Deadhead seats are tight; local reserves can stabilize same-day.',
    leversUsed: '18 ATL/JFK reserves · deadhead only 10 · protect ATL bank · delay 7 flights',
    impacted: '31 legs · ATL bank · 4,980 pax',
    confidence: '78% · faster same-day action',
    whyNot: 'Higher reserve depletion leaves less cover for later banks.',
    recommends: [
      'Use 18 ATL/JFK reserves and deadhead only 10 crew.',
      'Protect the ATL bank and delay 7 flights within legality.',
    ],
    kpi: [
      { k: 'Open legs unresolved', b: '31', a: '11', d: '−20' },
      { k: 'Cancellations', b: '13', a: '5', d: '−8' },
      { k: 'Stranded crew-hours', b: '486', a: '280', d: '−206' },
      { k: 'Deadhead crew used', b: '0', a: '10', d: '+10', neg: true },
      { k: 'Reserve hours used', b: '—', a: '410', d: 'high', neg: true },
      { k: 'Misconnects at risk', b: '780', a: '410', d: '−370' },
      { k: 'Level 2 probability', b: '41%', a: '28%', d: '−13 pts' },
      { k: 'Cost-to-recover', b: '$2.9M', a: '$1.95M', d: '−$0.95M' },
    ],
    why: 'Fastest same-day stabilization at lowest cost, but weaker on next-day contamination.',
    bestWhen: 'Deadhead seats disappear or ORD reopens quickly.',
    risk: 'Reserve depletion exposes later banks; Level 2 less contained.',
    plan: {
      title: 'Scenario B — Reserve-first Stabilization',
      objective: 'Stabilize same-day operations using local reserves with minimal deadhead.',
      phases: [
        { name: 'Phase 1 — Reserve assignment (0–90 min)', actions: ['Assign 18 ATL/JFK legal reserves', 'Deadhead 10 crew for gaps reserves cannot fill'] },
        { name: 'Phase 2 — Protect ATL bank (1–3 hr)', actions: ['Delay 7 flights within legality', 'Rebuild affected pairings'] },
        { name: 'Phase 3 — Monitor Level 2 (evening)', actions: ['Watch JFK next-day cover', 'Escalate to deadhead-heavy if reserve cover drops'] },
      ],
      changes: [
        { area: 'Crew', change: '18 reserves + deadhead 10; safe swaps only' },
        { area: 'Network', change: 'Delay 7 flights; protect ATL bank' },
        { area: 'Aircraft', change: 'Minimal tail action' },
        { area: 'Passenger', change: 'Reaccommodate as capacity allows' },
      ],
      guardrails: ['Crew legality / rest', 'Reserve legality', 'Donor-risk safe swaps only', 'Human approval'],
      expected: 'Open legs 31→11; cancellations 13→5; Level 2 41→28%; cost $2.9M→$1.95M.',
    },
  },
  {
    id: 'cancelthin', rank: 3, tone: 'blue', recommended: false,
    cardTitle: 'Recommendation 3: Cancel / thin to protect core banks',
    trigger: 'ORD stays closed beyond forecast and crew movement becomes infeasible.',
    leversUsed: 'Cancel/thin 6 low-criticality legs · reassign to ATL/JFK critical bank · reaccom 740 pax',
    impacted: '6 cancelled legs · ATL/JFK critical banks · 4,980 pax',
    confidence: '81% · lowest crew complexity',
    whyNot: 'More visible cancellations and higher passenger reaccommodation.',
    recommends: [
      'Cancel or thin 6 low-criticality legs and reassign crews to critical banks.',
      'Reaccommodate 740 pax off cancelled legs.',
    ],
    kpi: [
      { k: 'Open legs unresolved', b: '31', a: '8', d: '−23' },
      { k: 'Cancellations', b: '13', a: '6', d: '−7 (planned)' },
      { k: 'Stranded crew-hours', b: '486', a: '310', d: '−176' },
      { k: 'Deadhead crew used', b: '0', a: '8', d: '+8', neg: true },
      { k: 'Misconnects at risk', b: '780', a: '470', d: '−310' },
      { k: 'Level 2 probability', b: '41%', a: '24%', d: '−17 pts' },
      { k: 'Cost-to-recover', b: '$2.9M', a: '$2.15M', d: '−$0.75M' },
    ],
    why: 'Simplest crew execution when movement is infeasible, at the cost of visible cancellations.',
    bestWhen: 'ORD remains closed beyond forecast and deadhead becomes infeasible.',
    risk: 'Visible cancellations and larger passenger reaccommodation load.',
    plan: {
      title: 'Scenario B — Cancel / Thin Core-bank Protection',
      objective: 'Protect core ATL/JFK banks by cancelling low-criticality legs and reassigning crew.',
      phases: [
        { name: 'Phase 1 — Rank legs (0–60 min)', actions: ['Rank 31 legs by criticality and connection load', 'Select 6 low-criticality cancel/thin candidates'] },
        { name: 'Phase 2 — Cancel + reassign (1–3 hr)', actions: ['Cancel/thin 6 legs; reassign crews to critical banks', 'Reaccommodate 740 pax'] },
        { name: 'Phase 3 — Confirm (3–6 hr)', actions: ['Confirm critical-bank cover', 'Arm restart watch for JFK'] },
      ],
      changes: [
        { area: 'Network', change: 'Cancel/thin 6 low-criticality legs' },
        { area: 'Crew', change: 'Reassign released crews to ATL/JFK critical banks' },
        { area: 'Passenger', change: 'Reaccommodate 740 pax; premium protection on' },
        { area: 'Aircraft', change: 'Rotation resequencing for cancelled legs' },
      ],
      guardrails: ['Crew legality / rest', 'OCC cancellation approval', 'Passenger priority rules', 'Human approval'],
      expected: 'Open legs 31→8; cancellations 13→6 planned; Level 2 41→24%; cost $2.9M→$2.15M.',
    },
  },
]

export const SCB_RANKING = [
  { rank: 1, reco: 'Deadhead-heavy containment + reserve bridge', service: 'Highest', cost: 'High', speed: 'High', feasibility: 'High', select: 'Selected' },
  { rank: 2, reco: 'Reserve-first stabilization', service: 'High', cost: 'Medium', speed: 'Highest', feasibility: 'Medium-high', select: 'Alternative' },
  { rank: 3, reco: 'Cancel / thin core-bank protection', service: 'Medium-high', cost: 'Medium-high', speed: 'Medium', feasibility: 'High', select: 'Alternative' },
]

export const SCB_FRONTIER = {
  xLabel: 'Deadhead cost ($K)', yLabel: 'Open legs resolved', zLabel: 'Recovery time (hr)',
  points: [
    { x: 0, y: 0, z: 12, label: 'Do nothing', tone: 'gray' },
    { x: 210, y: 20, z: 7, label: 'Reserve-first', tone: 'orange' },
    { x: 260, y: 23, z: 9, label: 'Cancel / thin', tone: 'blue' },
    { x: 420, y: 22, z: 8, label: 'Deadhead-heavy', tone: 'green', recommended: true },
  ],
}

// ── Screen 6 — Approval & Execution ─────────────────────────────────────────
export const SCB_APPROVAL = {
  selected: 'Deadhead-heavy containment + reserve bridge',
  action: 'Deadhead 20 crew ORD→ATL/JFK + 12 reserve bridge + delay 5 protected banks + 3 tail swaps + reaccommodate 520 pax',
  summary: [
    { field: 'Decision owner', value: 'OCC duty manager' },
    { field: 'Approval type', value: 'Human, multi-role (crew · network · aircraft · pax)' },
    { field: 'Auto-execution', value: 'Disabled' },
    { field: 'Decision deadline', value: 'First ATL departure T+2h 40m' },
    { field: 'Audit status', value: 'Decision log will be created' },
  ],
  execItems: [
    { item: 'Deadhead booking', target: 'Crew travel / scheduling', action: 'Book ORD→ATL/JFK deadhead for 20 crew' },
    { item: 'Reserve assignment', target: 'Crew scheduling', action: 'Assign 12 legal reserves as bridge coverage' },
    { item: 'Pairing update', target: 'Crew ops', action: 'Rebuild remaining Scenario B rotation legs' },
    { item: 'Flight delay plan', target: 'OCC / network ops', action: 'Delay 5 protected-bank flights ≤45 min' },
    { item: 'Tail swap', target: 'Aircraft planning / maintenance', action: 'Swap 3 ready tails into protected rotations' },
    { item: 'Passenger recovery', target: 'Reaccommodation', action: 'Protect 520 pax + priority connections' },
    { item: 'Audit trail', target: 'Decision log', action: 'Store rationale, constraints, rejected options, approvals' },
  ],
  rationale: 'Best Level 2 prevention. Uses deadhead + reserve bridge within the window, keeps reserves for later banks, and protects the ATL/JFK connection banks. Higher deadhead cost is offset by avoided next-day contamination.',
  constraints: ['Crew legality / rest', 'Crew qualification / type rating', 'Deadhead arrival feasibility', 'Donor-flight risk guardrail (safe swaps only)', 'Aircraft maintenance readiness', 'Passenger priority rules', 'Deadhead cost cap', 'Human approval'],
}

// ── Screen 7 — Test & Learn ─────────────────────────────────────────────────
export const SCB_OUTCOMES = [
  { metric: 'Open legs unresolved', pred: '9', actual: '10', learn: 'One deadhead missed a connection' },
  { metric: 'Cancellations', pred: '4', actual: '5', learn: 'ORD closure lasted longer than assumed' },
  { metric: 'Stranded crew-hours', pred: '190', actual: '215', learn: 'Hotel / rest reset added time' },
  { metric: 'Deadhead crew used', pred: '20', actual: '19', learn: 'One crew became legality-infeasible' },
  { metric: 'Misconnects at risk', pred: '340', actual: '380', learn: 'ATL gate congestion added exposure' },
  { metric: 'Level 2 probability', pred: '19%', actual: 'Avoided', learn: 'Restart watch worked' },
  { metric: 'Cost-to-recover', pred: '$2.05M', actual: '$2.18M', learn: 'Deadhead / hotel above forecast' },
  { metric: 'Execution confidence', pred: '84%', actual: '79%', learn: 'Cross-functional approval slightly slower' },
]

export const SCB_INSIGHTS = [
  'Deadhead feasibility was the most sensitive variable — needs tighter seat and arrival confidence bands.',
  'Safe-swap guardrail prevented donor-hub escalation — keep it on by default.',
  'Reserve-first stays valuable as a fallback, not primary, when Level 2 risk exists.',
  'Passenger misconnects rose from gate compression — couple gate/airport congestion earlier.',
  'Next-day restart was protected — promote the 24–72h restart watch for all Scenario B runs.',
]

export const SCB_LEARN = {
  accuracy: [
    { label: 'Overall prediction accuracy', value: '89%' },
    { label: 'Level 2 avoidance', value: 'Correct' },
    { label: 'Cost-to-recover', value: '±$130K' },
    { label: 'Stranded crew-hours', value: '±25 hr' },
  ],
  recalibration: [
    { label: 'Stranding prediction', before: 'w=0.58', after: 'w=0.69', delta: '+mid-rotation', note: 'Higher weight for crew at weather-exposed hubs' },
    { label: 'Deadhead model', before: 'seats only', after: '+missed-conn', delta: '+volatility', note: 'Add missed-connection probability + seat inventory volatility' },
    { label: 'Propagation model', before: '0.71', after: '0.79', delta: '+donor penalty', note: 'Penalize donor pulls on ATL/JFK bank pairings' },
  ],
  patterns: [
    'Mid-rotation crew at weather-exposed hubs precede Level 1 spread by roughly one bank.',
    'Donor pulls from ATL/JFK banks create secondary open trips — block by default.',
    'JFK morning bank fails if crew arrives after the legal rest cutoff — reset before midnight.',
  ],
  twin: { nodesEnriched: 14, lanesEnriched: 31, before: '62%', after: '81%', summary: '14 crew twins · 31 rotation legs enriched — crew + rotation twins updated with realized recovery outcomes' },
}

export const SCB_SAVE = {
  name: 'Scenario B — ORD Mid-Rotation Stranding to ATL/JFK Containment',
  tags: ['MID-ROTATION STRANDING', 'SCENARIO B', 'DEADHEAD CONTAINMENT', 'RESERVE BRIDGE', 'LEVEL 2 WATCH', 'ORD/ATL/JFK'],
  reusableFor: [
    'hub closure recovery',
    'storm / weather recovery',
    'crew mispositioning',
    'next-day restart risk',
    'weather / ATC ground stop',
  ],
}

// ── Per-screen loading transition lines ─────────────────────────────────────
export const SCB_LOADING_LINES = {
  1: ['Ingesting crew · network · aircraft · passenger feeds…', 'Locating stranded crews and open legs…', 'Scoring cascade level + donor risk…', 'Signal deep-dive ready.'],
  2: ['Loading objective framework…', 'Weighting network stability / legality / CX…', 'Objectives ready.'],
  3: ['Loading recovery levers…', 'Applying deadhead-first configuration…', 'Levers ready.'],
  4: ['Assembling scenario setup…', 'Running legality + deadhead feasibility checks…', 'Summary ready.'],
  5: ['Running live simulation + restart watch…', 'Comparing deadhead / reserve / cancel strategies…', 'Ranking recommendations…'],
  6: ['Assembling execution package…', 'Validating legality + donor guardrails…', 'Ready for OCC approval.'],
  7: ['Capturing realized outcomes…', 'Comparing predicted vs actual…', 'Updating priors + Scenario B playbook…'],
}
