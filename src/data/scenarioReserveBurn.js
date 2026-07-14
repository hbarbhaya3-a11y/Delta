// Signal 4 — Reserve Burn Rate Acceleration
// Dedicated 7-screen deep-dive: a multi-hub reserve-depletion event across
// ATL/JFK/DTW/MSP driven by ATL weather, an open-trip inflow spike, and crew
// sick calls. Level 0 prevention + Level 1 zero-sum containment, network
// resource-control posture. Network stress test + event-triggered live sim.
// Exports follow the shared workflow-panel contract (SRB_ prefix); all values
// are illustrative UI mock data, not actual Delta operational data.

export const SRB_ACCENT = 'orange'

// ── Screen 1 — Signal Deep Dive ─────────────────────────────────────────────
export const SRB_SIGNAL = {
  sentinel: 'Reserve Sentinel',
  bannerText: 'Reserve Burn Rate Acceleration — reserves are being consumed faster than open trips close; ATL is nearest exhaustion and Level 1 is already active.',
  card: [
    { label: 'Signal class', value: 'Capacity depletion / Level 0→1 early warning' },
    { label: 'Severity', value: 'HIGH · Critical this run (Level 1 risk active)' },
    { label: 'Detection', value: '14:10 ET' },
    { label: 'Network burn rate', value: '11.8 reserve-equiv / hr' },
    { label: 'Reserve coverage', value: '0.72x' },
    { label: 'Cascade path', value: 'ATL → JFK · DTW/MSP donor' },
    { label: 'Cascade state', value: 'L0 active · L1 partially active · L2 watch' },
    { label: 'Response window', value: 'First ATL exhaustion threshold in 3h 10m' },
  ],
  sourceChips: ['CREW', 'NETWORK', 'AIRCRAFT', 'PASSENGER', 'EXTERNAL', 'DERIVED'],
  detail: 'Open-trip inflow (8.4/hr) is outpacing closure (5.1/hr), so the backlog grows +3.3/hr while reserves burn at 11.8/hr. Coverage sits at 0.72x network-wide and 0.47x at ATL. Reserve burn is no longer local — using donor crews from DTW/MSP without network scoring can open new trips elsewhere.',
  conditions: [
    'Reserve burn rate is rising faster than open-trip closure,',
    'ATL coverage (0.47x) is below the safe threshold with the earliest exhaustion ETA (3h 10m),',
    'Proposed crew swaps are beginning to create donor-flight risk (9 new risks),',
    'Level 1 zero-sum probability is already material (57%).',
  ],
  conditionsNote: 'Crew, Network, Aircraft, and Passenger Twins use reserve level, open-trip inflow, coverage ratio, and bank dependency as state variables, with reserve depletion and donor-hub coverage cutoffs as critical events.',
}

export const SRB_DISRUPTION = {
  detected: '14:10 ET',
  source: 'ATL weather + open-trip inflow spike + crew sick calls draw reserves faster than trips close; donor pressure builds on DTW/MSP',
  cascade: 'ATL reserve drawdown (L0 active) → zero-sum crew shifting to JFK (L1 active) → cross-hub contamination / next-day launch (L2 watch)',
}

export const SRB_IMPACT = [
  { label: 'Burn rate', value: '11.8 / hr', color: 'orange' },
  { label: 'Reserve coverage', value: '0.72x', color: 'red' },
  { label: 'Net open-trip growth', value: '+3.3 / hr', color: 'red' },
  { label: 'At-risk passengers', value: '7,850', color: 'blue' },
  { label: 'Level 1 probability', value: '57%', color: 'violet' },
]

// Optional Screen-1 blocks (render only when present)
export const SRB_METRICS = [
  { label: 'Open-trip inflow vs closure', value: '8.4 / 5.1 per hr', note: 'coverage not keeping pace with inflow' },
  { label: 'Legal feasible reserves', value: '61', note: 'after legality, qualification, location filters' },
  { label: 'Reserve demand next 6h', value: '85 crew-equiv', note: 'open trips + projected callouts' },
  { label: 'Earliest hub exhaustion', value: 'ATL 3h 10m', note: 'source hub, coverage 0.47x' },
  { label: 'New donor-flight risks', value: '9', note: 'Level 1 risk if swaps approved unscored' },
  { label: 'Cost exposure', value: '$1.9M–$3.4M', note: 'delay + cancel + deadhead + incentive + reaccom' },
]

export const SRB_HUB_IMPACT = [
  { hub: 'ATL', state: 'Weather + sick calls', crew: '18 reserves · 38 demand', flights: 'Coverage 0.47x · burn 6.4/hr', pax: 'Exhaustion 3h 10m', level: 'L0 active → L1 active' },
  { hub: 'JFK', state: 'Inbound compression', crew: '15 reserves · 18 demand', flights: 'Coverage 0.83x · burn 2.1/hr', pax: 'Exhaustion 7h 20m', level: 'L1 watch' },
  { hub: 'DTW', state: 'Donor hub candidate', crew: '16 reserves · 14 demand', flights: 'Coverage 1.14x · burn 1.4/hr', pax: 'Stable', level: 'Donor-risk watch' },
  { hub: 'MSP', state: 'Donor hub candidate', crew: '12 reserves · 15 demand', flights: 'Coverage 0.80x · burn 1.9/hr', pax: 'Exhaustion 6h 40m', level: 'L0 watch' },
]

export const SRB_ROOT_CAUSE = [
  { domain: 'Crew', pct: 46, note: 'Sick calls, reserves consumed, legal-feasibility filters shrinking the usable pool' },
  { domain: 'External / ATC', pct: 21, note: 'ATL weather and ATC compression driving disruption' },
  { domain: 'Network', pct: 17, note: 'Bank dependency and open-trip inflow rising faster than coverage' },
  { domain: 'Aircraft', pct: 8, note: 'Tail rotations coupled to reserve-dependent flights' },
  { domain: 'Passenger', pct: 8, note: 'Connection-heavy flights increasing prioritization pressure' },
]

export const SRB_CASCADE = [
  { level: 'Level 0 — Local reserve drawdown', status: 'Active', color: 'red', trigger: 'Open trips consume reserve pools faster than closure', action: 'Run Reserve Burn Containment simulation' },
  { level: 'Level 1 — Zero-sum crew shifting', status: 'Active (partial)', color: 'orange', trigger: 'Coverage <0.85x, net open-trip growth >+2/hr, swaps create donor-flight risk', action: 'Rebalance with donor guardrail; block harmful swaps' },
  { level: 'Level 2 — Cross-hub contamination', status: 'Watch', color: 'yellow', trigger: 'Crewless flights block stations; next-day trips fail at unaffected hubs (11 pairings)', action: 'Enable 24–72h restart watch' },
]

export const SRB_PRECEDENTS = [
  { episode: 'ATL evening storm reserve drawdown', similarity: 88, pattern: 'Weather + open-trip surge + reserve depletion', outcome: 'Level 1 spread to JFK', lesson: 'Block harmful donor swaps earlier' },
  { episode: 'JFK inbound compression day', similarity: 74, pattern: 'Inbound crew delay + reserve burn', outcome: 'Multiple downstream delays', lesson: 'Trigger reserve rebalance before coverage <0.85x' },
  { episode: 'Holiday peak sick-call surge', similarity: 69, pattern: 'Sick calls + low acceptance + high load', outcome: 'High incentive cost', lesson: 'Incentive works best selective, not broad' },
]

export const SRB_HYPOTHESIS = 'If Delta contains reserve exhaustion early — activating ATL/JFK reserves, rebalancing limited donor crews from DTW/MSP under a coverage guardrail, thinning low-criticality flights to cut demand, and protecting the ATL/JFK banks — then it can push exhaustion past the disruption window and hold Level 1 zero-sum propagation without destabilizing donor hubs or breaking legality.'

// ── Screen 2 — Objectives & KPIs ────────────────────────────────────────────
export const SRB_PRIMARY_OBJECTIVES = [
  { value: 'Contain reserve exhaustion and prevent Level 1 spread', desc: 'Reserve burn is no longer local; donor crews without scoring open new trips' },
  { value: 'Protect the ATL critical departure bank', desc: 'ATL has the earliest exhaustion ETA (3h 10m)' },
  { value: 'Avoid zero-sum donor swaps', desc: 'Level 1 is already partially active' },
  { value: 'Preserve DTW/MSP donor-hub stability', desc: 'Donor moves must not create new at-risk hubs' },
  { value: 'Protect passenger connections', desc: '1,120 misconnects at risk' },
  { value: 'Preserve next-day launch', desc: '11 pairings exposed' },
]
export const SRB_PRIMARY_DEFAULT = 'Contain reserve exhaustion and prevent Level 1 spread'

export const SRB_SECONDARY_OBJECTIVES = [
  { value: 'Limit incentive and deadhead cost', desc: 'Cost exposure is elevated ($3.4M baseline)' },
  { value: 'Maintain aircraft-tail continuity', desc: 'Some flights have crew-aircraft coupling' },
  { value: 'Reduce open-trip backlog', desc: 'Net growth is +3.3/hr and worsening' },
  { value: 'Protect premium journeys', desc: 'Shield high-priority passengers in the exposure set' },
  { value: 'Preserve reserve-hour efficiency', desc: 'Use reserves aggressively but avoid uncontrolled burn' },
  { value: 'Enable next-day restart readiness', desc: 'Arm the 24–72h reset if Level 2 probability rises' },
]
export const SRB_SECONDARY_DEFAULT = ['Limit incentive and deadhead cost', 'Reduce open-trip backlog']

export const SRB_KPI_OPTIONS = [
  { value: 'Open trips resolved', type: 'Operational', rec: true },
  { value: 'Level 1 probability', type: 'Network', rec: true },
  { value: 'Reserve coverage / exhaustion ETA', type: 'Resource', rec: true },
  { value: 'Reserve-hour efficiency', type: 'Resource', rec: true },
  { value: 'Donor-hub impact', type: 'Resource', rec: true },
  { value: 'Misconnects avoided', type: 'CX', rec: true },
  { value: 'Cost-to-recover', type: 'Financial', rec: true },
  { value: 'Cancellations avoided', type: 'Operational', rec: true },
  { value: 'Deadhead usage', type: 'Resource', rec: false },
  { value: 'Burn forecast accuracy', type: 'Governance', rec: false },
  { value: 'Restart readiness', type: 'Resilience', rec: false },
]
export const SRB_KPI_DEFAULT = SRB_KPI_OPTIONS.filter(k => k.rec).map(k => k.value)

// ── Screen 3 — Simulation Levers ────────────────────────────────────────────
export const SRB_LEVER_GROUPS = [
  {
    group: 'A', title: 'Crew supply levers', color: 'red',
    levers: [
      { id: 'reserveActivation', label: 'Reserve activation', control: 'select', options: ['0', '18 ATL', '26 ATL+JFK', '40'], recommended: '26 ATL+JFK', why: 'Legal, qualified, location-feasible only' },
      { id: 'reserveRebalance', label: 'Reserve rebalancing (DTW/MSP)', control: 'select', options: ['0 crew', '10 crew', '14 crew', '18 crew'], recommended: '10 crew', why: 'Block if donor coverage falls below 0.95x' },
      { id: 'preposition', label: 'Pre-position reserve', control: 'select', options: ['0 crew', '10 crew near ATL/JFK', '20 crew'], recommended: '10 crew near ATL/JFK', why: 'Must arrive before report time' },
      { id: 'swapMode', label: 'Crew swap mode', control: 'select', options: ['Off', 'Safe swaps only', 'Aggressive'], recommended: 'Safe swaps only', why: 'Aggressive mode requires Level 1 approval' },
      { id: 'deadhead', label: 'Deadhead', control: 'select', options: ['0 crew', '8 crew', '15 crew'], recommended: '8 crew', why: 'Seat availability and arrival feasibility' },
      { id: 'incentive', label: 'Incentive trigger', control: 'select', options: ['Off', 'Selective', 'Broad'], recommended: 'Selective', why: 'Policy-configured; cost cap applies' },
    ],
  },
  {
    group: 'B', title: 'Network demand levers', color: 'grape',
    levers: [
      { id: 'bankProtect', label: 'Bank protection', control: 'switch', recommended: true, onLabel: 'ATL 17–21 · JFK 19–22', why: 'Prioritize high-criticality flights' },
      { id: 'scheduleThin', label: 'Schedule thinning', control: 'select', options: ['0 flights', '6 flights', '12 flights', '18 flights'], recommended: '6 flights', why: 'Avoid high-connection / premium flights' },
      { id: 'delay', label: 'Delay tolerance', control: 'select', options: ['0 min', '45 min', '90 min'], recommended: '45 min', why: 'Cannot create a legality breach' },
      { id: 'cancelPriority', label: 'Cancel prioritization', control: 'select', options: ['0 flights', 'Candidates only', '10 flights'], recommended: 'Candidates only', why: 'OCC approval required' },
    ],
  },
  {
    group: 'C', title: 'Aircraft levers', color: 'orange',
    levers: [
      { id: 'tailSwap', label: 'Tail swap', control: 'select', options: ['0 tails', '3 tails', '5 tails'], recommended: '3 tails', why: 'Maintenance readiness required' },
      { id: 'rotationReseq', label: 'Rotation resequencing', control: 'select', options: ['Off', 'Selected tails', 'Broad'], recommended: 'Selected tails', why: 'Avoid downstream aircraft breakage' },
    ],
  },
  {
    group: 'D', title: 'Passenger · cost · recovery levers', color: 'blue',
    levers: [
      { id: 'reaccom', label: 'Reaccommodation', control: 'select', options: ['0 pax', '900 pax', '2,000 pax'], recommended: '900 pax', why: 'Capacity-dependent' },
      { id: 'premiumProtect', label: 'Premium protection', control: 'switch', recommended: true, onLabel: 'Enabled', why: 'Protect premium / high-priority segments' },
      { id: 'reserveBudget', label: 'Reserve-hour budget', control: 'select', options: ['500 hrs', '850 hrs', '1,200 hrs'], recommended: '850 hrs', why: 'Governance threshold' },
      { id: 'incentiveCap', label: 'Incentive cost cap', control: 'select', options: ['$0', '$450K', '$900K'], recommended: '$450K', why: 'Policy / approval dependent' },
      { id: 'restart', label: 'Next-day restart plan', control: 'select', options: ['Off', 'Watch', 'Active'], recommended: 'Watch', why: 'Escalate if Level 2 probability rises' },
    ],
  },
]
export const SRB_ALL_LEVERS = SRB_LEVER_GROUPS.flatMap(g => g.levers)
export const SRB_LEVER_DEFAULTS = Object.fromEntries(SRB_ALL_LEVERS.map(l => [l.id, l.recommended]))

// ── Screen 4 — Simulation Summary ───────────────────────────────────────────
export const SRB_SCENARIO = {
  name: 'Multi-Hub Reserve Burn Containment — ATL/JFK/DTW/MSP',
  signal: 'Reserve Burn Rate Acceleration',
  objective: 'Prevent reserve exhaustion and Level 1 spread across ATL/JFK/DTW/MSP, weighting network stability 35% / reserve efficiency 25% / CX 20% / cost 10% / restart readiness 10%.',
  method: 'Network stress test + event-triggered live simulation; crew legality, reserve feasibility, donor-hub coverage guardrail, aircraft readiness, and passenger connection modeled together vs a do-nothing baseline.',
}
export const SRB_SCOPE = [
  { item: 'Directly exposed flights', value: '42 dependent on reserve / donor-crew decisions' },
  { item: 'High-priority bank flights', value: '18 (reserve priority)' },
  { item: 'New donor-flight risks', value: '9 (Level 1 risk without scoring)' },
  { item: 'Hubs', value: 'ATL source · JFK propagation-sensitive · DTW/MSP donor' },
  { item: 'Cascade state', value: 'L0 active · L1 partially active · L2 watch' },
  { item: 'Decision deadline', value: 'First ATL exhaustion threshold in 3h 10m' },
]
export const SRB_VALIDATION = [
  'Crew duty / rest legality checked',
  'Crew qualification / type rating checked',
  'Donor-hub reserve coverage held above 0.95x',
  'Safe swaps only — no new open trips at donor hubs',
  'Aircraft maintenance readiness checked',
  'Passenger seat inventory checked (900 reaccommodation feasible)',
  'Reserve-hour budget + incentive cost cap applied',
  'Next-day restart watch armed · human approval required',
]

// ── Screen 5 — Optimization Results ─────────────────────────────────────────
export const SRB_BASELINE = [
  { kpi: 'Open trips unresolved', value: '31' },
  { kpi: 'ATL exhaustion ETA', value: '3h 10m' },
  { kpi: 'Network reserve coverage', value: '0.72x' },
  { kpi: 'Level 1 probability', value: '57%' },
  { kpi: 'Cancellations likely', value: '14' },
  { kpi: 'Misconnects at risk', value: '1,120' },
  { kpi: 'Cost-to-recover', value: '$3.4M' },
  { kpi: 'Next-day launch exposure', value: '11 pairings' },
]

export const SRB_RECOMMENDATIONS = [
  {
    id: 'hybrid', rank: 1, tone: 'green', recommended: true,
    cardTitle: 'Option 1: Hybrid reserve rebalance + selective schedule thinning',
    trigger: 'Burn acceleration has already entered Level 1 risk (57%).',
    leversUsed: 'Rebalance 10 from DTW/MSP · activate 26 ATL/JFK reserves · thin 6 low-criticality flights · protect ATL/JFK banks',
    impacted: '42 exposed flights · 4 hubs · 9 donor risks · 7,850 pax',
    assignments: [
      { kind: 'Reserve', kindColor: 'red', resource: '26 ATL/JFK reserves', from: 'ATL + JFK pools', to: 'open trips in the burning banks', action: 'Activate legal + qualified reserves' },
      { kind: 'Crew', kindColor: 'orange', resource: '10 crew', from: 'DTW / MSP donor pools', to: 'ATL / JFK gaps', action: 'Rebalance only while donor coverage stays ≥0.95x' },
      { kind: 'Flight', kindColor: 'grape', resource: '6 low-criticality flights', to: 'thinned', action: 'Cut reserve demand at the source' },
      { kind: 'Tail', kindColor: 'yellow', resource: '3 ready tails', to: 'protected ATL/JFK banks', action: 'Maintenance-ready swap for coupled flights' },
      { kind: 'Passenger', kindColor: 'blue', resource: '900 at-risk pax', to: 'protected itineraries', action: 'Reaccommodation, premium first' },
    ],
    confidence: '86% · best overall containment',
    whyNot: 'Moderate customer-visible cancellations from thinning.',
    recommends: [
      'Rebalance 10 crew from DTW/MSP under the 0.95x donor guardrail; activate 26 ATL/JFK reserves.',
      'Thin 6 low-criticality flights to cut reserve demand; protect ATL/JFK banks.',
      'Reaccommodate 900 at-risk passengers; premium protection on.',
    ],
    kpi: [
      { k: 'Open trips unresolved', b: '31', a: '12', d: '−19' },
      { k: 'Level 1 probability', b: '57%', a: '26%', d: '−31 pts' },
      { k: 'ATL exhaustion ETA', b: '3h 10m', a: '7h 45m', d: '+4h 35m' },
      { k: 'Cancellations', b: '14', a: '6', d: '−8 (planned)', neg: true },
      { k: 'Misconnects at risk', b: '1,120', a: '520', d: '−600' },
      { k: 'Reserve hours used', b: '—', a: '835', d: 'controlled', neg: true },
      { k: 'Cost-to-recover', b: '$3.4M', a: '$2.4M', d: '−$1.0M' },
    ],
    why: 'Passes all hard gates, best reduces Level 1 probability and open-trip backlog, and combines direct crew action with controllable demand reduction — highest execution confidence and lowest donor-hub risk.',
    bestWhen: 'Use when burn acceleration has entered Level 1 risk and containment must beat customer-visible continuity.',
    risk: 'Moderate planned cancellations; watch reserve-hour budget as rebalance volume rises.',
    plan: {
      title: 'Reserve Burn Containment — Hybrid Rebalance + Thinning',
      objective: 'Contain reserve exhaustion and prevent Level 1 spread by combining supply-side rebalance with demand-side thinning under a donor guardrail.',
      phases: [
        { name: 'Phase 1 — Activate & guard (0–30 min)', actions: ['Activate 26 ATL/JFK legal reserves', 'Hold DTW/MSP donor coverage above 0.95x'] },
        { name: 'Phase 2 — Rebalance & thin (30–90 min)', actions: ['Rebalance 10 crew from DTW/MSP; pre-position 10 near ATL/JFK', 'Thin 6 low-criticality flights; protect ATL/JFK banks'] },
        { name: 'Phase 3 — Protect passengers (1–3 hr)', actions: ['Reaccommodate 900 at-risk passengers; premium protection on', 'Apply controlled delay ≤45 min on protected flights'] },
        { name: 'Phase 4 — Restart watch (evening → next day)', actions: ['Keep 24–72h restart watch armed', 'Checkpoint JFK donor risk and next-day launch exposure'] },
      ],
      changes: [
        { area: 'Crew', change: 'Activate 26; rebalance 10 under 0.95x guardrail; safe swaps only; 8 deadheads' },
        { area: 'Network', change: 'Thin 6 low-criticality flights; protect ATL/JFK banks; delay ≤45 min' },
        { area: 'Aircraft', change: 'Swap 3 ready tails; selected resequencing' },
        { area: 'Passenger', change: 'Reaccommodate 900; premium protection on' },
      ],
      guardrails: ['Crew legality / rest', 'Donor-hub coverage ≥0.95x', 'Aircraft maintenance readiness', 'Reserve-hour budget 850', 'Incentive cap $450K', 'Human approval'],
      expected: 'Open trips 31→12; Level 1 57%→26%; ATL exhaustion 3h 10m→7h 45m; cost $3.4M→$2.4M.',
    },
  },
  {
    id: 'rebalance', rank: 2, tone: 'blue', recommended: false,
    cardTitle: 'Option 2: Pure reserve rebalance',
    trigger: 'Donor-hub coverage is stable and avoiding visible cancellations is the priority.',
    leversUsed: 'Move 14 crew-equiv from DTW/MSP · no proactive cancellations · allow 8 deadheads',
    impacted: '42 exposed flights · 4 hubs · 7,850 pax',
    assignments: [
      { kind: 'Crew', kindColor: 'orange', resource: '14 crew-equiv', from: 'DTW / MSP donor pools', to: 'ATL / JFK open trips', action: 'Pure rebalance while donor coverage stays ≥0.95x' },
      { kind: 'Crew', kindColor: 'orange', resource: '8 deadhead crew', to: 'coverage gaps', action: 'Reposition to backfill without cancellations' },
      { kind: 'Reserve', kindColor: 'red', resource: 'ATL/JFK reserves', to: 'open trips as needed', action: 'Activate to hold continuity, no proactive cancels' },
      { kind: 'Passenger', kindColor: 'blue', resource: 'Backlog pax', to: 'as-capacity itineraries', action: 'Reaccommodate where timing shifts' },
    ],
    confidence: '72% · better CX continuity',
    whyNot: 'Higher donor-hub and execution risk; leans on volatile donor capacity.',
    recommends: [
      'Move 14 crew-equivalents from DTW/MSP; no proactive cancellations.',
      'Allow 8 deadheads to reposition coverage.',
    ],
    kpi: [
      { k: 'Open trips unresolved', b: '31', a: '16', d: '−15' },
      { k: 'Level 1 probability', b: '57%', a: '38%', d: '−19 pts' },
      { k: 'ATL exhaustion ETA', b: '3h 10m', a: '6h 15m', d: '+3h 05m' },
      { k: 'Cancellations', b: '14', a: '8', d: '−6' },
      { k: 'Misconnects at risk', b: '1,120', a: '610', d: '−510' },
      { k: 'Reserve hours used', b: '—', a: '790', d: 'controlled', neg: true },
      { k: 'Cost-to-recover', b: '$3.4M', a: '$2.7M', d: '−$0.7M' },
    ],
    why: 'Best CX continuity by avoiding planned cancellations, but weaker on Level 1 probability and more dependent on donor-hub capacity that can shift.',
    bestWhen: 'Use only when avoiding visible cancellations is the priority and donor-hub coverage stays stable.',
    risk: 'Higher donor-hub coverage risk and lower execution confidence.',
    plan: {
      title: 'Reserve Burn Containment — Pure Rebalance',
      objective: 'Hold continuity by rebalancing donor reserves without proactive cancellations.',
      phases: [
        { name: 'Phase 1 — Rebalance (0–45 min)', actions: ['Move 14 crew-equivalents from DTW/MSP', 'Confirm donor coverage stays above 0.95x'] },
        { name: 'Phase 2 — Reposition (45–90 min)', actions: ['Allow 8 deadheads to cover gaps', 'Activate ATL/JFK reserves as needed'] },
        { name: 'Phase 3 — Monitor (evening)', actions: ['Watch donor-hub coverage; escalate to hybrid if Level 1 rises'] },
      ],
      changes: [
        { area: 'Crew', change: 'Rebalance 14; 8 deadheads; safe swaps only' },
        { area: 'Network', change: 'No proactive cancellations; protect banks' },
        { area: 'Aircraft', change: 'Minimal tail action' },
        { area: 'Passenger', change: 'Reaccommodate as capacity allows' },
      ],
      guardrails: ['Crew legality / rest', 'Donor-hub coverage ≥0.95x', 'Deadhead seat/timing feasibility', 'Human approval'],
      expected: 'Open trips 31→16; Level 1 57%→38%; ATL exhaustion 3h 10m→6h 15m; cost $3.4M→$2.7M.',
    },
  },
  {
    id: 'incentive', rank: 3, tone: 'orange', recommended: false,
    cardTitle: 'Option 3: Incentive + aggressive coverage',
    trigger: 'Policy leaders prefer minimizing planned cancellations despite higher cost.',
    leversUsed: 'Broad incentive trigger · safe + conditional swaps · minimal schedule thinning',
    impacted: '42 exposed flights · 4 hubs · 7,850 pax',
    assignments: [
      { kind: 'Crew', kindColor: 'red', resource: 'Broad incentive pickups', to: 'critical open trips', action: 'Trigger incentives within the cost cap to draw voluntary coverage' },
      { kind: 'Crew', kindColor: 'orange', resource: 'Safe + conditional swaps', to: 'open trips', action: 'Cover with on-duty crew before spending reserves' },
      { kind: 'Flight', kindColor: 'grape', resource: 'Minimal thinning', to: 'protected banks', action: 'Keep planned cancellations to a minimum' },
      { kind: 'Passenger', kindColor: 'blue', resource: 'At-risk pax', to: 'protected connections', action: 'Reaccommodate where coverage slips' },
    ],
    confidence: '68% · fewest planned cancels',
    whyNot: 'Higher cost and Level 1 risk.',
    recommends: [
      'Trigger broad incentives; allow safe + conditional swaps.',
      'Keep schedule thinning minimal.',
    ],
    kpi: [
      { k: 'Open trips unresolved', b: '31', a: '18', d: '−13' },
      { k: 'Level 1 probability', b: '57%', a: '44%', d: '−13 pts' },
      { k: 'ATL exhaustion ETA', b: '3h 10m', a: '5h 20m', d: '+2h 10m' },
      { k: 'Cancellations', b: '14', a: '7', d: '−7' },
      { k: 'Misconnects at risk', b: '1,120', a: '680', d: '−440' },
      { k: 'Reserve hours used', b: '—', a: '870', d: 'high', neg: true },
      { k: 'Cost-to-recover', b: '$3.4M', a: '$3.1M', d: '−$0.3M' },
    ],
    why: 'Fewest planned cancellations, but the weakest Level 1 containment and highest cost because it leans on incentive uptake and conditional swaps.',
    bestWhen: 'Use only when policy leaders prioritize minimizing planned cancels over cost and certainty.',
    risk: 'Higher cost and Level 1 risk; incentive uptake is uncertain.',
    plan: {
      title: 'Reserve Burn Containment — Incentive + Aggressive Coverage',
      objective: 'Minimize planned cancellations using broad incentives and conditional swaps.',
      phases: [
        { name: 'Phase 1 — Incentive (0–30 min)', actions: ['Trigger broad incentives for critical open trips', 'Confirm cost cap headroom'] },
        { name: 'Phase 2 — Cover (30–90 min)', actions: ['Allow safe + conditional swaps', 'Keep schedule thinning minimal'] },
        { name: 'Phase 3 — Monitor (evening)', actions: ['Watch Level 1 probability; escalate to hybrid if it rises'] },
      ],
      changes: [
        { area: 'Crew', change: 'Broad incentive; safe + conditional swaps' },
        { area: 'Network', change: 'Minimal thinning; protect banks' },
        { area: 'Aircraft', change: 'Minimal tail action' },
        { area: 'Passenger', change: 'Reaccommodate as capacity allows' },
      ],
      guardrails: ['Crew legality / rest', 'Incentive cost cap', 'Donor-hub coverage ≥0.95x', 'Human approval'],
      expected: 'Open trips 31→18; Level 1 57%→44%; ATL exhaustion 3h 10m→5h 20m; cost $3.4M→$3.1M.',
    },
  },
]

export const SRB_RANKING = [
  { rank: 1, reco: 'Hybrid reserve rebalance + selective schedule thinning', service: 'Highest', cost: 'Medium', speed: 'High', feasibility: 'High', select: 'Selected' },
  { rank: 2, reco: 'Pure reserve rebalance', service: 'Medium-high', cost: 'Medium-high', speed: 'Medium', feasibility: 'Medium', select: 'Alternative' },
  { rank: 3, reco: 'Incentive + aggressive coverage', service: 'Medium', cost: 'Highest', speed: 'Medium', feasibility: 'Medium', select: 'Alternative' },
]

export const SRB_FRONTIER = {
  xLabel: 'Cost-to-recover ($M)', yLabel: 'Level 1 probability (%)', zLabel: 'Execution confidence (%)',
  points: [
    { x: 3.4, y: 57, z: 0, label: 'Do nothing', tone: 'gray' },
    { x: 2.4, y: 26, z: 86, label: 'Hybrid', tone: 'green', recommended: true },
    { x: 2.7, y: 38, z: 72, label: 'Pure rebalance', tone: 'blue' },
    { x: 3.1, y: 44, z: 68, label: 'Incentive-heavy', tone: 'orange' },
  ],
}

// ── Screen 6 — Approval & Execution ─────────────────────────────────────────
export const SRB_APPROVAL = {
  selected: 'Hybrid reserve rebalance + selective schedule thinning',
  action: 'Activate 26 ATL/JFK reserves + rebalance 10 from DTW/MSP + thin 6 flights + protect banks + 3 tail swaps + reaccommodate 900 pax',
  summary: [
    { field: 'Decision owner', value: 'OCC duty manager' },
    { field: 'Approval type', value: 'Human, multi-role (crew · network · aircraft · pax)' },
    { field: 'Auto-execution', value: 'Disabled' },
    { field: 'Decision deadline', value: 'First ATL exhaustion threshold in 3h 10m' },
    { field: 'Audit status', value: 'Decision log will be created' },
  ],
  execItems: [
    { item: 'Activate reserves', target: 'Crew scheduling / crew ops', action: 'Activate 26 ATL/JFK legal reserves' },
    { item: 'Rebalance reserves', target: 'Crew scheduling + travel / deadhead', action: 'Move 10 crew-equivalents from DTW/MSP' },
    { item: 'Schedule thinning', target: 'Network operations', action: 'Thin 6 low-criticality flights' },
    { item: 'Bank protection', target: 'OCC network plan', action: 'Protect ATL 17:00–21:00 and JFK 19:00–22:00' },
    { item: 'Tail swap / resequence', target: 'Aircraft planning / maintenance', action: 'Execute 3 feasible tail swaps' },
    { item: 'Passenger protection', target: 'Passenger reaccommodation workflow', action: 'Protect 900 at-risk passengers' },
    { item: 'Audit trail', target: 'Decision log', action: 'Store rationale, constraints, approvals, rejected options' },
  ],
  rationale: 'Best overall containment. Combines direct crew action with controllable demand reduction under a donor guardrail, cutting Level 1 probability 57% → 26% and pushing ATL exhaustion 3h 10m → 7h 45m. Cost $3.4M → $2.4M.',
  constraints: ['Crew legality / duty-rest', 'Crew qualification / type rating', 'Donor-hub coverage ≥0.95x', 'Aircraft readiness', 'Passenger priority rules', 'Cost tolerance', 'Human approval'],
}

// ── Screen 7 — Test & Learn ─────────────────────────────────────────────────
export const SRB_OUTCOMES = [
  { metric: 'Open trips unresolved', pred: '12', actual: '14', learn: 'Open-trip inflow slightly underestimated' },
  { metric: 'ATL exhaustion avoided', pred: 'Yes', actual: 'Yes', learn: 'Reserve rebalance worked' },
  { metric: 'Cancellations', pred: '6', actual: '7', learn: 'One flight became aircraft-constrained' },
  { metric: 'Level 1 outcome', pred: '26%', actual: 'Contained', learn: 'Donor-hub guardrail worked' },
  { metric: 'Misconnects at risk', pred: '520', actual: '580', learn: 'Passenger impact slightly underestimated' },
  { metric: 'Cost-to-recover', pred: '$2.4M', actual: '$2.55M', learn: 'Deadhead cost above forecast' },
  { metric: 'Execution confidence', pred: '86%', actual: '81%', learn: 'Cross-team approval took longer than modeled' },
]

export const SRB_INSIGHTS = [
  'Burn rate rose faster after the second sick-call wave — add sick-call clustering to the burn forecast model.',
  'The donor-hub guardrail prevented wider spread — keep the 0.95x donor coverage threshold as the default.',
  'Schedule thinning reduced reserve demand quickly — promote thinning earlier when coverage <0.80x.',
  'Passenger exposure rose from an aircraft constraint — couple aircraft readiness earlier in Screen 3.',
  'Incentive uptake did not materially change the outcome — keep incentive selective, not broad, for this pattern.',
]

export const SRB_LEARN = {
  accuracy: [
    { label: 'Overall prediction accuracy', value: '85%' },
    { label: 'Level 1 containment', value: 'Correct' },
    { label: 'Cost-to-recover', value: '±$150K' },
    { label: 'Open trips unresolved', value: '±2' },
  ],
  recalibration: [
    { label: 'Burn-rate model', before: 'w=0.58', after: 'w=0.70', delta: '+inflow / sick-call', note: 'Increase weight for open-trip inflow acceleration and sick-call clustering' },
    { label: 'Reserve forecast', before: 'point', after: 'banded', delta: '+confidence bands', note: 'Add bands for legal/location-feasible reserves' },
    { label: 'Propagation model', before: '0.72', after: '0.84', delta: '+donor penalty', note: 'Higher penalty for donor-hub coverage below 0.95x' },
  ],
  patterns: [
    'Reserve coverage below 0.85x with net open-trip growth precedes Level 1 zero-sum swaps.',
    'Demand-side thinning contains burn faster than adding supply alone.',
    'Donor pulls without a coverage guardrail create new open trips at donor hubs — guard by default.',
  ],
  twin: { nodesEnriched: 42, lanesEnriched: 9, before: '73%', after: '85%', summary: '42 flight twins · 9 donor-flight lanes enriched — crew / network / aircraft twins updated with realized reserve-burn containment outcomes' },
}

export const SRB_SAVE = {
  name: 'Multi-Hub Reserve Burn Containment — ATL/JFK/DTW/MSP',
  tags: ['RESERVE BURN ACCELERATION', 'HYBRID REBALANCE + THINNING', 'DONOR GUARDRAIL 0.95x', 'ATL/JFK/DTW/MSP', 'L0 PREVENTION · L1 CONTAINMENT'],
  reusableFor: [
    'hub weather disruption',
    'reserve depletion',
    'open-trip inflow surge',
    'crew sick-call surge',
    'holiday peak capacity stress',
  ],
}

// ── Per-screen loading transition lines ─────────────────────────────────────
export const SRB_LOADING_LINES = {
  1: ['Ingesting crew · reserve · open-trip · weather feeds…', 'Scoring burn rate + coverage across ATL/JFK/DTW/MSP…', 'Estimating Level 1 propagation probability…', 'Signal deep-dive ready.'],
  2: ['Loading objective framework…', 'Weighting network stability / reserve efficiency / CX / cost / restart…', 'Objectives ready.'],
  3: ['Loading supply + demand levers…', 'Applying hybrid rebalance + thinning configuration…', 'Levers ready.'],
  4: ['Assembling scenario setup…', 'Running legality + donor-guardrail + readiness checks…', 'Summary ready.'],
  5: ['Running network stress test + live sim…', 'Comparing hybrid / rebalance / incentive strategies…', 'Ranking recommendations…'],
  6: ['Assembling execution package…', 'Validating legality + donor coverage guardrails…', 'Ready for OCC approval.'],
  7: ['Capturing realized outcomes…', 'Comparing predicted vs actual…', 'Updating priors + reserve-burn containment playbook…'],
}
