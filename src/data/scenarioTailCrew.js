// Signal 8 — Tail-Crew Synchronization Gap
// Dedicated 7-screen deep-dive: a multi-hub aircraft/crew readiness mismatch
// across ATL → JFK → BOS (with MCO donor exposure). Crew ready without a ready
// tail, or a ready tail without positioned crew — a local tail fix or crew fix
// can still fail if the other side is not synchronized. Event-triggered live
// simulation + 24–72h restart watch.
// Exports follow the shared workflow-panel contract (STC_ prefix); all values
// are illustrative UI mock data, not actual Delta operational data.

export const STC_ACCENT = 'yellow'

// ── Screen 1 — Signal Deep Dive ─────────────────────────────────────────────
export const STC_SIGNAL = {
  sentinel: 'Sync Sentinel',
  bannerText: 'Tail-Crew Synchronization Gap — crew and aircraft readiness are out of phase across ATL/JFK/BOS; a tail-only or crew-only fix will still fail.',
  card: [
    { label: 'Signal class', value: 'Cross-domain constraint / crew-aircraft sync' },
    { label: 'Severity', value: 'MEDIUM-HIGH · Critical if departure inside T-90m or downstream bank breaks' },
    { label: 'Detection', value: '16:25 ET' },
    { label: 'Readiness gap', value: '+68 min (crew ready, tail not)' },
    { label: 'Confidence', value: '81%' },
    { label: 'Cascade path', value: 'ATL → JFK → BOS (MCO donor)' },
    { label: 'Cascade state', value: 'L0 active · L1 watch · L2 next-day watch' },
    { label: 'Response window', value: 'T-4h to first departure · live refresh every 10 min' },
  ],
  sourceChips: ['AIRCRAFT', 'CREW', 'NETWORK', 'PASSENGER', 'MAINTENANCE', 'COST/POLICY', 'DERIVED'],
  detail: 'Crew is ready but tail N312DL is not released for DL2381 ATL–JFK; separately, a ready tail sits without positioned crew for DL1842 ATL–MCO. Nine crew-tail split pairs are active. Solving crew without aircraft feasibility — or the reverse — leaves the operation exposed, so recovery must synchronize both sides.',
  conditions: [
    'Crew ready but assigned tail not ready, or tail ready but crew mispositioned (9 split pairs),',
    'Maintenance release, MEL review, and a parts hold gate aircraft options (3 constraints),',
    'Crew waiting on tails is eroding legality (74 crew idle-hours at risk),',
    'Aircraft/crew splits threaten the BOS next-day first bank (6 departures exposed).',
  ],
  conditionsNote: 'Crew and Aircraft Twins use readiness, legality, qualification, maintenance status, and rotation continuity as state variables, with tail-release slippage and next-day rest cutoffs as critical events.',
}

export const STC_DISRUPTION = {
  detected: '16:25 ET',
  source: 'ATL tail N312DL held on maintenance release while crew is ready; a ready tail at ATL lacks positioned crew after a reserve reassignment; gate congestion extends turns',
  cascade: 'ATL local mismatch (L0 active) → donor tail/crew reassignment risk (L1 watch) → BOS next-day first-bank restart (L2 watch)',
}

export const STC_IMPACT = [
  { label: 'Readiness gap', value: '+68 min', color: 'yellow' },
  { label: 'Affected legs', value: '18', color: 'orange' },
  { label: 'Crew-tail split pairs', value: '9', color: 'red' },
  { label: 'Passenger exposure', value: '2,740', color: 'blue' },
  { label: 'Next-day exposed', value: '6', color: 'red' },
]

// Optional Screen-1 blocks (render only when present)
export const STC_METRICS = [
  { label: 'Impacted tails', value: '7', note: 'aircraft rotations at risk' },
  { label: 'Crew assignments exposed', value: '11 pairings', note: 'may become idle, illegal, or mispositioned' },
  { label: 'Feasible tail swap options', value: '4', note: 'ready tails, no maintenance conflict' },
  { label: 'Maintenance constraints', value: '3', note: 'A-check timing · MEL review · parts hold' },
  { label: 'Misconnects at risk', value: '410 pax', note: 'connection risk if protected flights delayed' },
  { label: 'Cost exposure', value: '$740K–$1.6M', note: 'delay + reaccom + crew idle + swap + maintenance' },
]

export const STC_HUB_IMPACT = [
  { hub: 'ATL', state: 'Tail N312DL held on maintenance release', crew: 'Crew C-ATL-442 ready now', flights: 'ATL–JFK departure at risk', pax: '620 pax · 140 connections', level: 'L0 active' },
  { hub: 'JFK', state: 'Tail N557DL ready', crew: 'Inbound crew delayed from ATL', flights: 'JFK–BOS late bank at risk', pax: '480 pax', level: 'L1 watch' },
  { hub: 'BOS', state: 'Tail arrives late from JFK', crew: 'Crew legal window tight next morning', flights: 'BOS first-bank restart exposure', pax: '310 pax next-day', level: 'L2 watch' },
  { hub: 'MCO', state: 'Ready tail available', crew: 'Crew mispositioned after ATL swap', flights: 'Candidate donor station', pax: 'Low-moderate CX impact', level: 'L1 watch' },
]

export const STC_ROOT_CAUSE = [
  { domain: 'Aircraft / maintenance', pct: 34, note: 'Tail readiness and maintenance release are behind crew readiness' },
  { domain: 'Crew', pct: 25, note: 'Reassignment and reserve movement create location/readiness mismatch' },
  { domain: 'Network', pct: 18, note: 'ATL/JFK bank dependencies amplify the aircraft-crew mismatch' },
  { domain: 'Gate / airport', pct: 10, note: 'Gate congestion extends turn time and worsens tail readiness' },
  { domain: 'Passenger', pct: 8, note: 'Connection-heavy flights raise recovery priority' },
  { domain: 'External / ATC', pct: 5, note: 'Minor ATC flow compression into JFK reduces slack' },
]

export const STC_CASCADE = [
  { level: 'Level 0 — Local mismatch', status: 'Active', color: 'red', trigger: 'Crew ready but tail not ready, or tail ready but crew missing', action: 'Run Tail-Crew Sync Optimizer' },
  { level: 'Level 1 — Donor disruption', status: 'Watch', color: 'orange', trigger: 'A tail swap or crew reassignment creates a new mismatch elsewhere', action: 'Score donor-tail and donor-crew impact' },
  { level: 'Level 2 — Restart contamination', status: 'Watch', color: 'yellow', trigger: 'An aircraft/crew split carries into the next-day first bank (6 departures)', action: 'Activate 24–72h reset watch' },
]

export const STC_PRECEDENTS = [
  { episode: 'ATL tail release delay replay', similarity: 82, pattern: 'Crew ready, aircraft not ready', outcome: 'Crew became illegal after long delay', lesson: 'Trigger tail swap earlier' },
  { episode: 'JFK aircraft ready / crew late replay', similarity: 76, pattern: 'Tail sat ready, crew mispositioned', outcome: 'Late BOS bank spillover', lesson: 'Pair crew and tail recovery together' },
  { episode: 'BOS morning restart miss', similarity: 70, pattern: 'Same-day mismatch carried overnight', outcome: 'First-bank delay next day', lesson: 'Activate reset watch before midnight' },
]

export const STC_HYPOTHESIS = 'If Delta synchronizes crew and aircraft readiness together — swapping maintenance-ready tails into protected ATL/JFK flights while preserving the original legal crews, resequencing downstream rotations, and reaccommodating at-risk passengers — then it can close the readiness gap, cut split pairs, and protect the BOS next-day restart without creating a worse donor mismatch or breaking legality.'

// ── Screen 2 — Objectives & KPIs ────────────────────────────────────────────
export const STC_PRIMARY_OBJECTIVES = [
  { value: 'Synchronize crew + aircraft readiness without downstream instability', desc: 'Couple crew and tail recovery across ATL → JFK → BOS' },
  { value: 'Reduce aircraft/crew split pairs', desc: '9 split pairs are active' },
  { value: 'Avoid crew legality erosion', desc: 'Crew waiting on tails may time out' },
  { value: 'Protect critical ATL/JFK bank flights', desc: '7 critical-bank flights exposed' },
  { value: 'Avoid maintenance-infeasible swaps', desc: 'Aircraft/maintenance feasibility is a hard gate' },
  { value: 'Preserve next-day restart', desc: '6 next-day departures exposed' },
]
export const STC_PRIMARY_DEFAULT = 'Synchronize crew + aircraft readiness without downstream instability'

export const STC_SECONDARY_OBJECTIVES = [
  { value: 'Reduce passenger misconnects', desc: '410 misconnects at risk' },
  { value: 'Limit cost-to-recover', desc: '$740K–$1.6M exposure' },
  { value: 'Reduce crew idle-hours', desc: '74 crew idle-hours at risk of becoming unusable' },
  { value: 'Reduce tail idle-hours', desc: '38 tail idle-hours; ready aircraft sitting without crew' },
  { value: 'Preserve gate feasibility', desc: '5 gate conflicts can worsen tail turnaround' },
  { value: 'Protect premium journeys', desc: 'Shield high-value passengers in the exposure set' },
]
export const STC_SECONDARY_DEFAULT = ['Reduce passenger misconnects', 'Limit cost-to-recover']

export const STC_KPI_OPTIONS = [
  { value: 'Aircraft/crew split pairs resolved', type: 'Operational', rec: true },
  { value: 'Readiness gap closed', type: 'Operational', rec: true },
  { value: 'Crew legality preserved', type: 'Compliance', rec: true },
  { value: 'Aircraft utilization', type: 'Resource', rec: true },
  { value: 'Crew + tail idle-hours', type: 'Resource', rec: true },
  { value: 'Misconnects avoided', type: 'CX', rec: true },
  { value: 'Cost-to-recover', type: 'Financial', rec: true },
  { value: 'Next-day restart readiness', type: 'Resilience', rec: true },
  { value: 'Recovery time', type: 'Resilience', rec: false },
  { value: 'Tail-readiness forecast accuracy', type: 'Governance', rec: false },
  { value: 'Recommendation acceptance', type: 'Governance', rec: false },
]
export const STC_KPI_DEFAULT = STC_KPI_OPTIONS.filter(k => k.rec).map(k => k.value)

// ── Screen 3 — Simulation Levers ────────────────────────────────────────────
export const STC_LEVER_GROUPS = [
  {
    group: 'A', title: 'Aircraft levers', color: 'orange',
    levers: [
      { id: 'tailSwap', label: 'Tail swap', control: 'select', options: ['0 tails', '3 tails', '4 tails', '7 tails'], recommended: '3 tails', why: 'Must be maintenance-ready' },
      { id: 'rotationReseq', label: 'Rotation resequencing', control: 'select', options: ['Off', 'Selected ATL/JFK', 'Broad'], recommended: 'Selected ATL/JFK', why: 'Cannot create a worse downstream tail break' },
      { id: 'ferrySpare', label: 'Ferry / spare usage', control: 'select', options: ['0 spare', '1 spare', '2 spare'], recommended: '1 spare', why: 'Requires maintenance and ops approval' },
      { id: 'maintPriority', label: 'Maintenance release priority', control: 'select', options: ['0 tails', '2 critical tails', '5 tails'], recommended: '2 critical tails', why: 'Must respect safety / maintenance gates' },
    ],
  },
  {
    group: 'B', title: 'Crew levers', color: 'red',
    levers: [
      { id: 'crewReassign', label: 'Crew reassignment', control: 'select', options: ['0 pairings', '5 pairings', '11 pairings'], recommended: '5 pairings', why: 'Legal, qualified, rested only' },
      { id: 'reserves', label: 'Reserve activation', control: 'select', options: ['0 reserves', '6 reserves', '14 reserves'], recommended: '6 reserves', why: 'Must be location-feasible' },
      { id: 'deadhead', label: 'Deadhead', control: 'select', options: ['0 crew', '4 crew', '8 crew'], recommended: '4 crew', why: 'Seat and timing feasible' },
      { id: 'swapMode', label: 'Crew swap mode', control: 'select', options: ['Off', 'Safe swaps only', 'Aggressive'], recommended: 'Safe swaps only', why: 'Aggressive requires OCC approval' },
    ],
  },
  {
    group: 'C', title: 'Network levers', color: 'grape',
    levers: [
      { id: 'delay', label: 'Controlled delay', control: 'select', options: ['0 min', '35 min', '90 min'], recommended: '35 min', why: 'Cannot create a legality breach' },
      { id: 'bankProtect', label: 'Bank protection', control: 'switch', recommended: true, onLabel: 'ATL evening + JFK late bank', why: 'Protect high-dependency banks' },
      { id: 'thinCandidates', label: 'Cancel / thin candidates', control: 'select', options: ['0 legs', '2 legs', '6 legs'], recommended: '2 legs', why: 'OCC approval required' },
    ],
  },
  {
    group: 'D', title: 'Passenger · cost · recovery levers', color: 'blue',
    levers: [
      { id: 'reaccom', label: 'Early reaccommodation', control: 'select', options: ['0 pax', '260 pax', '700 pax'], recommended: '260 pax', why: 'Seat inventory dependent' },
      { id: 'premiumProtect', label: 'Premium protection', control: 'switch', recommended: true, onLabel: 'Enabled', why: 'Protect priority journeys' },
      { id: 'costCap', label: 'Cost cap', control: 'select', options: ['$500K', '$1.1M', '$2.0M'], recommended: '$1.1M', why: 'Leadership approval if exceeded' },
      { id: 'restart', label: 'Next-day restart watch', control: 'select', options: ['Off', 'Watch', 'Active'], recommended: 'Active', why: 'Required if next-day risk persists (BOS)' },
    ],
  },
]
export const STC_ALL_LEVERS = STC_LEVER_GROUPS.flatMap(g => g.levers)
export const STC_LEVER_DEFAULTS = Object.fromEntries(STC_ALL_LEVERS.map(l => [l.id, l.recommended]))

// ── Screen 4 — Simulation Summary ───────────────────────────────────────────
export const STC_SCENARIO = {
  name: 'ATL Tail-Crew Synchronization Run — JFK/BOS Spillover',
  signal: 'Tail-Crew Synchronization Gap',
  objective: 'Synchronize crew and tail readiness and prevent the ATL → JFK → BOS cascade, weighting operational reliability 35% / resource efficiency 25% / CX 20% / cost 10% / restart readiness 10%.',
  method: 'Event-triggered live simulation + 24–72h restart watch; crew legality, aircraft/maintenance readiness, tail-crew co-location, gate feasibility, and passenger connection modeled together across all twins vs a do-nothing baseline.',
}
export const STC_SCOPE = [
  { item: 'Directly impacted flights', value: '18 across ATL/JFK/BOS/MCO' },
  { item: 'Critical-bank flights', value: '7 (protect before low-connectivity turns)' },
  { item: 'Aircraft/crew split pairs', value: '9 (core signal objects)' },
  { item: 'Hubs', value: 'ATL primary · JFK/BOS downstream · MCO donor' },
  { item: 'Cascade state', value: 'L0 active · L1 watch · L2 next-day watch' },
  { item: 'Decision deadline', value: 'T-2h before the ATL protected bank' },
]
export const STC_VALIDATION = [
  'Crew duty / rest legality checked',
  'Crew qualification / type rating checked',
  'Aircraft maintenance readiness checked',
  'No tail swap that creates a worse downstream rotation break',
  'Tail + crew co-location feasibility checked',
  'Gate feasibility checked (watch, within threshold)',
  'Passenger seat inventory checked (260 reaccommodation feasible)',
  'Cost cap ($1.1M) watch armed · 24–72h restart active · human approval required',
]

// ── Screen 5 — Optimization Results ─────────────────────────────────────────
export const STC_BASELINE = [
  { kpi: 'Aircraft/crew split pairs', value: '9' },
  { kpi: 'Affected legs', value: '18' },
  { kpi: 'Average readiness gap', value: '68 min' },
  { kpi: 'Crew idle-hours', value: '74' },
  { kpi: 'Tail idle-hours', value: '38' },
  { kpi: 'Misconnects at risk', value: '410' },
  { kpi: 'Cost-to-recover', value: '$1.6M' },
  { kpi: 'Next-day exposed departures', value: '6' },
]

export const STC_RECOMMENDATIONS = [
  {
    id: 'tailswap', rank: 1, tone: 'green', recommended: true,
    cardTitle: 'Option 1: Tail swap + protected crew preservation',
    trigger: 'Ready-tail candidates are maintenance-feasible and the priority is protecting the ATL/JFK bank.',
    leversUsed: 'Swap 3 ready tails · keep original legal crews · resequence 2 rotations · reaccommodate 260 pax',
    impacted: '18 legs · 7 tails · 9 split pairs · 2,740 pax',
    assignments: [
      { kind: 'Tail', kindColor: 'orange', resource: 'N557DL (ready)', from: 'ATL spare', to: 'protected rotation', flight: 'DL2381 ATL–JFK 18:30', action: 'Swap in for held N312DL; keep the ready crew on it' },
      { kind: 'Tail', kindColor: 'orange', resource: 'N621DL, N709DL (ready)', from: 'early ATL rotations', to: '2 protected JFK-bank legs', flight: 'DL1705 ATL–JFK, DL1992 JFK–BOS', action: 'Maintenance-ready swaps to close the readiness gap' },
      { kind: 'Crew', kindColor: 'red', resource: 'Original legal crews (P-ATL-118, P-ATL-124)', to: 'stay on swapped tails', flight: 'DL2381, DL1705', action: 'Preserve legal crews — "tail swap with same crew"' },
      { kind: 'Tail', kindColor: 'yellow', resource: '2 downstream rotations', to: 'resequenced', action: 'Protect the BOS next-day restart from a rotation break' },
      { kind: 'Flight', kindColor: 'grape', resource: '4 protected flights', to: '≤25 min hold', action: 'Delay to align tail readiness with crew' },
      { kind: 'Passenger', kindColor: 'blue', resource: '260 high-risk pax', to: 'protected connections', action: 'Early reaccommodation, premium first' },
    ],
    confidence: '86% · best reliability + CX balance',
    whyNot: 'Moderate aircraft coordination overhead.',
    recommends: [
      'Swap 3 maintenance-ready tails into protected ATL/JFK flights; keep the original legal crews.',
      'Resequence 2 downstream rotations to protect the BOS restart.',
      'Reaccommodate 260 high-risk passengers; premium protection on.',
    ],
    kpi: [
      { k: 'Aircraft/crew split pairs', b: '9', a: '3', d: '−6' },
      { k: 'Affected legs', b: '18', a: '8', d: '−10' },
      { k: 'Average readiness gap', b: '68 min', a: '24 min', d: '−44 min' },
      { k: 'Crew legality watch flights', b: '7', a: '2', d: '−5' },
      { k: 'Misconnects at risk', b: '410', a: '175', d: '−235' },
      { k: 'Cost-to-recover', b: '$1.6M', a: '$1.02M', d: '−$0.58M' },
      { k: 'Next-day exposed departures', b: '6', a: '2', d: '−4' },
    ],
    why: 'Passes all hard gates, best reduces affected legs and next-day exposure, cuts both crew and tail idle-hours, and lands the lowest feasible misconnect exposure — highest execution confidence because it uses ready tails and preserves legal crews.',
    bestWhen: 'Use when ready-tail candidates are maintenance-feasible and the priority is protecting the ATL/JFK bank.',
    risk: 'Moderate aircraft coordination; watch gate feasibility on swapped tails.',
    plan: {
      title: 'Tail-Crew Sync — Tail Swap + Crew Preservation',
      objective: 'Close the readiness gap by swapping ready tails into protected flights while preserving legal crews and protecting the BOS restart.',
      phases: [
        { name: 'Phase 1 — Confirm feasibility (0–15 min)', actions: ['Confirm 3 tail swaps maintenance-ready and gate-feasible', 'Prioritize 2 critical maintenance releases'] },
        { name: 'Phase 2 — Swap & preserve (15–35 min)', actions: ['Swap N557DL / N621DL / N709DL into protected ATL/JFK rotations', 'Keep current legal crews on swapped aircraft'] },
        { name: 'Phase 3 — Resequence & protect (35–90 min)', actions: ['Resequence 2 downstream rotations; hold protected flights ≤25 min', 'Reaccommodate 260 high-risk passengers'] },
        { name: 'Phase 4 — Restart watch (evening → next day)', actions: ['Keep BOS 24–72h restart watch active', 'Checkpoint BOS first bank at 22:45 ET'] },
      ],
      changes: [
        { area: 'Aircraft', change: 'Swap 3 ready tails; prioritize 2 maintenance releases; resequence 2 rotations' },
        { area: 'Crew', change: 'Preserve original legal crews on swapped tails; safe swaps only' },
        { area: 'Network', change: 'Protect ATL/JFK banks; controlled delay ≤25 min' },
        { area: 'Passenger', change: 'Reaccommodate 260; premium protection on' },
      ],
      guardrails: ['Crew legality / rest', 'Aircraft maintenance readiness', 'No worse downstream rotation break', 'Gate feasibility (watch)', 'Cost cap $1.1M', 'Human approval'],
      expected: 'Split pairs 9→3; readiness gap 68→24 min; misconnects 410→175; next-day exposed 6→2.',
    },
  },
  {
    id: 'crewreassign', rank: 2, tone: 'blue', recommended: false,
    cardTitle: 'Option 2: Crew reassignment to ready tails',
    trigger: 'Tail swaps become infeasible; move crew to the aircraft that is ready.',
    leversUsed: 'Move 5 legal crews to ready aircraft · activate 6 reserves · deadhead 4 to cover donor gaps',
    impacted: '18 legs · ready tails · 2,740 pax',
    assignments: [
      { kind: 'Crew', kindColor: 'red', resource: '5 legal crews (P-ATL-118, P-ATL-124, P-ATL-131, +2)', from: 'held tails', to: 'ready aircraft', flight: 'DL1842 ATL–MCO, DL1705 ATL–JFK', action: 'Move crew to the tail that is ready instead of waiting' },
      { kind: 'Reserve', kindColor: 'orange', resource: '6 reserves (R-ATL-04…09)', to: 'coverage gaps', action: 'Activate location-feasible reserves' },
      { kind: 'Crew', kindColor: 'orange', resource: '4 deadhead crew', to: 'donor gaps', action: 'Backfill the gaps the reassignments open' },
      { kind: 'Passenger', kindColor: 'blue', resource: 'At-risk pax', to: 'protected connections', action: 'Reaccommodate where reassignment shifts timing' },
    ],
    confidence: '79% · fastest crew-side recovery',
    whyNot: 'Higher reserve / deadhead use and donor-gap risk.',
    recommends: [
      'Move 5 legal crews onto ready aircraft; activate 6 reserves.',
      'Deadhead 4 crew to cover the donor gaps created by the moves.',
    ],
    kpi: [
      { k: 'Aircraft/crew split pairs', b: '9', a: '4', d: '−5' },
      { k: 'Affected legs', b: '18', a: '9', d: '−9' },
      { k: 'Average readiness gap', b: '68 min', a: '31 min', d: '−37 min' },
      { k: 'Crew legality watch flights', b: '7', a: '3', d: '−4' },
      { k: 'Misconnects at risk', b: '410', a: '220', d: '−190' },
      { k: 'Cost-to-recover', b: '$1.6M', a: '$980K', d: '−$0.62M' },
      { k: 'Next-day exposed departures', b: '6', a: '3', d: '−3' },
    ],
    why: 'Fastest crew-side recovery and lowest cost, but leans on reserve/deadhead capacity and leaves more residual split pairs and next-day exposure.',
    bestWhen: 'Use when tail swaps are infeasible due to maintenance or gate constraints.',
    risk: 'Higher reserve / deadhead use; donor gaps can create new mismatches.',
    plan: {
      title: 'Tail-Crew Sync — Crew Reassignment',
      objective: 'Close the gap from the crew side by moving legal crews to ready aircraft with reserve + deadhead backfill.',
      phases: [
        { name: 'Phase 1 — Reassign (0–20 min)', actions: ['Move 5 legal crews onto ready tails', 'Activate 6 location-feasible reserves'] },
        { name: 'Phase 2 — Backfill (20–60 min)', actions: ['Deadhead 4 crew to cover donor gaps', 'Confirm legality after controlled delays'] },
        { name: 'Phase 3 — Monitor (evening)', actions: ['Watch residual split pairs; escalate to tail swap if a release completes'] },
      ],
      changes: [
        { area: 'Crew', change: 'Reassign 5; activate 6 reserves; deadhead 4; safe swaps only' },
        { area: 'Aircraft', change: 'Use ready tails; minimal swap action' },
        { area: 'Network', change: 'Protect ATL/JFK; controlled delay' },
        { area: 'Passenger', change: 'Reaccommodate as capacity allows' },
      ],
      guardrails: ['Crew legality / rest', 'Reserve location feasibility', 'Deadhead seat/timing feasibility', 'Human approval'],
      expected: 'Split pairs 9→4; readiness gap 68→31 min; cost $1.6M→$980K; next-day exposed 6→3.',
    },
  },
  {
    id: 'delaywait', rank: 3, tone: 'orange', recommended: false,
    cardTitle: 'Option 3: Controlled delay + maintenance release wait',
    trigger: 'Maintenance release confidence is high and legality buffers remain safe.',
    leversUsed: 'Delay 6 flights ≤35 min · wait for 2 tail releases · protect premium / critical connections',
    impacted: '18 legs · 6 delayed flights · 2,740 pax',
    assignments: [
      { kind: 'Flight', kindColor: 'grape', resource: '6 flights', to: '≤35 min hold', flight: 'DL2381 ATL–JFK, DL1842 ATL–MCO, +4', action: 'Delay to await tail releases while protecting connections' },
      { kind: 'Tail', kindColor: 'orange', resource: 'N312DL + 1 (in work)', to: 'awaited releases', action: 'Hold for 2 maintenance releases; escalate if a release slips' },
      { kind: 'Crew', kindColor: 'red', resource: 'Ready crews (P-ATL-118, P-ATL-124)', to: 'held on assigned tails', action: 'Watch legality buffers through the delay' },
      { kind: 'Passenger', kindColor: 'blue', resource: 'Premium / critical connections', to: 'protected', action: 'Shield priority journeys during the wait' },
    ],
    confidence: '72% · lowest swap disruption',
    whyNot: 'Higher legality and passenger risk if a release slips.',
    recommends: [
      'Delay 6 flights up to 35 min; wait for 2 tail releases.',
      'Protect premium and critical connections through the wait.',
    ],
    kpi: [
      { k: 'Aircraft/crew split pairs', b: '9', a: '5', d: '−4' },
      { k: 'Affected legs', b: '18', a: '11', d: '−7' },
      { k: 'Average readiness gap', b: '68 min', a: '42 min', d: '−26 min' },
      { k: 'Crew legality watch flights', b: '7', a: '5', d: '−2' },
      { k: 'Misconnects at risk', b: '410', a: '260', d: '−150' },
      { k: 'Cost-to-recover', b: '$1.6M', a: '$1.10M', d: '−$0.50M' },
      { k: 'Next-day exposed departures', b: '6', a: '4', d: '−2' },
    ],
    why: 'Lowest swap disruption, but weakest on readiness gap and legality because it depends on maintenance release timing that can slip.',
    bestWhen: 'Use only when maintenance release confidence is high and legality buffers remain safe.',
    risk: 'Higher legality and passenger risk if a tail release slips past the delay window.',
    plan: {
      title: 'Tail-Crew Sync — Controlled Delay + Release Wait',
      objective: 'Hold protected flights for maintenance releases while shielding premium/critical connections.',
      phases: [
        { name: 'Phase 1 — Hold (0–35 min)', actions: ['Delay 6 flights up to 35 min', 'Protect premium and critical connections'] },
        { name: 'Phase 2 — Await release (35–90 min)', actions: ['Track 2 tail maintenance releases', 'Escalate to tail swap or crew reassignment if a release slips'] },
        { name: 'Phase 3 — Restart watch (evening)', actions: ['Watch BOS next-day exposure; arm reset if buffers erode'] },
      ],
      changes: [
        { area: 'Network', change: 'Controlled delay on 6 flights ≤35 min' },
        { area: 'Aircraft', change: 'Await 2 maintenance releases; no swaps' },
        { area: 'Crew', change: 'Hold legal crews; watch legality buffers' },
        { area: 'Passenger', change: 'Protect premium/critical connections' },
      ],
      guardrails: ['Crew legality / rest (tight)', 'Maintenance release confidence', 'Passenger priority rules', 'Human approval'],
      expected: 'Split pairs 9→5; readiness gap 68→42 min; cost $1.6M→$1.10M; next-day exposed 6→4.',
    },
  },
]

export const STC_RANKING = [
  { rank: 1, reco: 'Tail swap + protected crew preservation', service: 'Highest', cost: 'Medium', speed: 'High', feasibility: 'High', select: 'Selected' },
  { rank: 2, reco: 'Crew reassignment to ready tails', service: 'Medium-high', cost: 'Lowest', speed: 'Highest', feasibility: 'Medium', select: 'Alternative' },
  { rank: 3, reco: 'Controlled delay + maintenance release wait', service: 'Medium', cost: 'Medium', speed: 'Medium', feasibility: 'Medium', select: 'Alternative' },
]

export const STC_FRONTIER = {
  xLabel: 'Cost-to-recover ($M)', yLabel: 'Aircraft/crew split pairs', zLabel: 'Execution confidence (%)',
  points: [
    { x: 1.6, y: 9, z: 0, label: 'Do nothing', tone: 'gray' },
    { x: 1.02, y: 3, z: 86, label: 'Tail swap', tone: 'green', recommended: true },
    { x: 0.98, y: 4, z: 79, label: 'Crew reassignment', tone: 'blue' },
    { x: 1.10, y: 5, z: 72, label: 'Delay + wait', tone: 'orange' },
  ],
}

// ── Screen 6 — Approval & Execution ─────────────────────────────────────────
export const STC_APPROVAL = {
  selected: 'Tail swap + protected crew preservation',
  action: 'Swap 3 ready tails + preserve legal crews + resequence 2 rotations + delay protected flights ≤25 min + reaccommodate 260 pax',
  summary: [
    { field: 'Decision owner', value: 'OCC duty manager' },
    { field: 'Approval type', value: 'Human, multi-role (aircraft/maint · crew · network · pax)' },
    { field: 'Auto-execution', value: 'Disabled' },
    { field: 'Decision deadline', value: 'T-2h before the ATL protected bank' },
    { field: 'Audit status', value: 'Decision log will be created' },
  ],
  execItems: [
    { item: 'Tail swap request', target: 'Aircraft planning / maintenance workflow', action: 'Swap N557DL, N621DL, N709DL into protected ATL/JFK rotations' },
    { item: 'Crew preservation', target: 'Crew scheduling / crew ops', action: 'Keep current legal crews on swapped aircraft where possible' },
    { item: 'Rotation resequencing', target: 'Aircraft rotation planning', action: 'Resequence 2 downstream rotations to avoid BOS restart failure' },
    { item: 'Controlled delay', target: 'OCC / network operations', action: 'Hold 4 protected flights up to 25 min' },
    { item: 'Passenger protection', target: 'Passenger reaccommodation workflow', action: 'Rebook/protect 260 high-risk passengers' },
    { item: 'Gate coordination', target: 'Gate / station workflow', action: 'Confirm gates for swapped tails' },
    { item: 'Audit trail', target: 'Decision log', action: 'Store rationale, constraints, approvals, rejected options' },
  ],
  rationale: 'Best reliability + CX balance. Uses ready tails and preserves legal crews, cutting split pairs 9 → 3 and the readiness gap 68 → 24 min while protecting the BOS restart. Cost $1.6M → $1.02M, within cap.',
  constraints: ['Crew duty / rest legality', 'Crew qualification / type rating', 'Aircraft readiness / maintenance', 'Tail rotation continuity', 'Gate feasibility (watch)', 'Passenger priority rules', 'Cost cap $1.1M', 'Human approval'],
}

// ── Screen 7 — Test & Learn ─────────────────────────────────────────────────
export const STC_OUTCOMES = [
  { metric: 'Aircraft/crew split pairs', pred: '3', actual: '4', learn: 'One gate conflict delayed a swapped tail' },
  { metric: 'Affected legs', pred: '8', actual: '9', learn: 'Downstream rotation impact slightly underestimated' },
  { metric: 'Avg readiness gap', pred: '24 min', actual: '29 min', learn: 'Maintenance release time optimistic' },
  { metric: 'Crew idle-hours', pred: '30', actual: '34', learn: 'Crew notification lag added idle time' },
  { metric: 'Tail idle-hours', pred: '15', actual: '17', learn: 'Gate availability impacted turn' },
  { metric: 'Misconnects at risk', pred: '175', actual: '205', learn: 'Passenger connection impact slightly underestimated' },
  { metric: 'Cost-to-recover', pred: '$1.02M', actual: '$1.09M', learn: 'Reaccommodation and gate delay cost higher' },
  { metric: 'Next-day exposed departures', pred: '2', actual: '1', learn: 'Restart watch worked better than expected' },
]

export const STC_INSIGHTS = [
  'Maintenance release timing was the most volatile assumption — add a wider confidence band to tail-readiness ETA.',
  'Gate constraints affected tail-swap success — bring the Gate Twin into Screen 3 feasibility earlier.',
  'Preserving legal crews reduced complexity — keep "tail swap with same crew" as the preferred first play.',
  'Passenger exposure rose when a gate conflict occurred — link gate-delay sensitivity to the misconnect model.',
  'The BOS next-day restart improved — keep the restart watch active for aircraft/crew split events.',
]

export const STC_LEARN = {
  accuracy: [
    { label: 'Overall prediction accuracy', value: '84%' },
    { label: 'Next-day exposure', value: 'Better than modeled' },
    { label: 'Cost-to-recover', value: '±$70K' },
    { label: 'Readiness gap', value: '±5 min' },
  ],
  recalibration: [
    { label: 'Tail readiness model', before: 'w=0.55', after: 'w=0.67', delta: '+release ETA band', note: 'Recalibrate maintenance release ETA uncertainty' },
    { label: 'Crew synchronization model', before: '0.60', after: '0.71', delta: '+notification lag', note: 'Add crew notification lag and legality-buffer erosion' },
    { label: 'Gate model', before: 'excluded', after: 'included', delta: '+gate conflict prob', note: 'Add gate conflict probability to tail-swap feasibility' },
  ],
  patterns: [
    'Crew ready but tail not released erodes legality fast — trigger tail swap earlier.',
    'Ready tails without positioned crew drive idle-hours — couple tail + crew before approval.',
    'Same-day aircraft/crew splits carry into next-day first banks — keep the restart watch active.',
  ],
  twin: { nodesEnriched: 18, lanesEnriched: 9, before: '71%', after: '84%', summary: '18 flight twins · 9 aircraft/crew split lanes enriched — crew / aircraft / gate twins updated with realized tail-crew synchronization outcomes' },
}

export const STC_SAVE = {
  name: 'ATL Tail-Crew Sync — JFK/BOS Spillover Containment',
  tags: ['TAIL-CREW SYNC GAP', 'TAIL SWAP + CREW PRESERVATION', 'ATL/JFK/BOS/MCO', 'MAINTENANCE READINESS', 'NEXT-DAY RESTART WATCH', 'L0/L1/L2 CASCADE'],
  reusableFor: [
    'tail release delay',
    'aircraft ready / crew mispositioned',
    'broken aircraft rotation',
    'gate-driven turn compression',
    'next-day restart risk',
  ],
}

// ── Per-screen loading transition lines ─────────────────────────────────────
export const STC_LOADING_LINES = {
  1: ['Ingesting aircraft · crew · maintenance · gate · passenger feeds…', 'Detecting crew-tail readiness mismatches across ATL/JFK/BOS/MCO…', 'Scoring split pairs + next-day restart exposure…', 'Signal deep-dive ready.'],
  2: ['Loading objective framework…', 'Weighting reliability / resource / CX / cost / restart…', 'Objectives ready.'],
  3: ['Loading synchronization levers…', 'Applying tail-swap + crew-preservation configuration…', 'Levers ready.'],
  4: ['Assembling scenario setup…', 'Running legality + maintenance + gate + seat checks…', 'Summary ready.'],
  5: ['Running event-triggered sync sim + restart watch…', 'Comparing tail-swap / crew-reassign / delay strategies…', 'Ranking recommendations…'],
  6: ['Assembling execution package…', 'Validating legality + maintenance + rotation guardrails…', 'Ready for OCC approval.'],
  7: ['Capturing realized outcomes…', 'Comparing predicted vs actual…', 'Updating priors + tail-crew sync playbook…'],
}
