# TwinX for Vanguard — CHANGELOG

**Maintained by**: `qa-tester` agent. Updated at the end of every implementation session.
**Location**: `docs/product-context/CHANGELOG.md`

---

## Session 17 — Remove Historical Precedents + Signal 5 Production Polish — 2026-07-14

### Build Status
- `npm run build` — **PASSED** — 0 errors, built in 11.70s

### Changed
- **Removed the "Historical similar episodes" (precedents) section** from Screen 1 of the shared `StoreServiceRiskPanel` — it no longer renders for any signal. The `PRECEDENTS` data resolver remains a harmless passthrough; per-scenario `*_PRECEDENTS` exports are now unused (removed for Signal 5).
- **Signal 5 (Mid-Rotation Hub Stranding) made production-grade end-to-end**:
  - Dropped the "illustrative UI mock data" disclaimer from the module header; rewrote it as a real operating scenario.
  - Named the source event (`DL1476 ORD–DEN 16:10` ground-stop cancellation) consistently across disruption, signal detail, and scope.
  - Rewrote the signal `detail` and `hypothesis` in confident operational language (why deadhead + legal rest reset is required, how reserve-only recovery forces Level 1 pulls, how late rest breaks the JFK first bank).
  - Aligned the Screen 6 execution package with the concrete IDs already in the assignments — deadhead flights (`DHD DL2214`, `DHD DL1885`), reserve→leg mapping (`R-ATL-08/12 → DL2537`, `R-JFK-03/05 → DL1729`), pairing reassignment (`FO C-ATL-2246 within P4462 → DL2611`), tail swap (`N823DN`).
  - Quantified vague cells (`≈1,180 ATL-bank pax`, flight numbers on held legs) and added reserve-pool depth to scope (`ATL 0.76x / 12 legal · JFK 0.88x / 9 legal`).
  - Removed `SCB_PRECEDENTS`.

## Session 16 — Assignment Tables Across All 9 Signals + Modal Cleanup — 2026-07-14

### Build Status
- `npm run build` — **PASSED** — 0 errors, built in 20.91s

### Added
- **`assignments` now populated for all 9 signals** (3 recommendations each) so every "view strategy details" reads like a production-grade recovery plan. Extended the four that were missing: Signal 3 (`SUT`), Signal 4 (`SRB`), Signal 7 (`SMX`), Signal 8 (`STC`).
- **`AssignmentTable` gained an optional "On flight / pairing" column** (renders only when a row carries a `flight` value) for production-grade, ID-level detail.
- **Signal 5 (Mid-Rotation Stranding) assignments made production-grade**: concrete cockpit/FA pairing IDs (P4471, P4488, P4462), crew IDs (Capt C-ATL-2210, FO C-ATL-2214, lead F-JFK-3391), reserve IDs (R-ATL-08/12, R-JFK-03/05), deadhead flights showing how stranded crew returns to domicile (DHD DL2214 ORD–ATL, DHD DL1885 ORD–JFK), which reserve bridges which open leg (DL2537 ATL–MCO, DL1729 JFK–BOS), tail swap (N823DN → DL2611 ATL–BOS), and cancel/thin flight numbers. Signal 8 also carries tail IDs (N557DL/N621DL/N709DL/N312DL) mapped to specific flights.

### Changed
- **Removed the "KPIs — before vs after" section from the strategy modal** (and its `BeforeAfterKpis`/`parseNum` helpers) per feedback — KPI before/after already lives in the Screen 5 comparison table.
- **Removed the "Illustrative values calibrated to the source-defined KPIs and levers…" disclaimer** from the optimization-results screen across all signals (shared `StoreServiceRiskPanel`).
- Modal section order is now: Objective → Phased actions → What changes → **Assignments** → Network flows before/after (Signal 1) → Trade-off frontier → Guardrails → Expected impact.

## Session 15 — Holistic Strategy-Detail Modal for Signals 1, 2, 5, 6, 9 — 2026-07-14

### Build Status
- `npm run build` — **PASSED** — 0 errors, built in 18.67s

### Added
- **Strategy-detail modal (`StrategyModal`) enriched with two holistic, per-recommendation sections** so "view strategy details" reads like a full recovery plan, not just prose:
  - **Assignments — who / what moves where**: new `AssignmentTable` component renders a `Resource → From→To → Action` table from a new optional `reco.assignments` field. Shows concrete crew/reserve moves, deadhead repositioning, tail/aircraft swaps, flights held/thinned/cancelled, and passenger reaccommodation — each tagged by kind (Crew/Reserve/Tail/Flight/Gate/Passenger).
  - **KPIs — before vs after**: new `BeforeAfterKpis` component renders paired baseline/after bars per KPI, parsed from each recommendation's existing `kpi` rows (handles mixed $/%/count units; rows without a numeric baseline degrade to a value chip). Direction-colored teal (improved) vs the option tone.
- Populated `assignments` for all 3 recommendations in each of the 5 signals: Signal 1 (`NRS_RECOMMENDATIONS`), Signal 2 (`SHC`), Signal 5 (`SCB`), Signal 6 (`SCP`), Signal 9 (`SPG`).

### Changed
- Modal section order is now: Objective → Phased actions → What changes → **Assignments** → Network flows before/after (Signal 1) → **KPIs before/after** → Trade-off frontier → Guardrails → Expected impact. All new sections are gated on data presence, so other use cases are unaffected.

### Watch List
- `assignments` is currently populated for Signals 1, 2, 5, 6, 9. Signals 3, 4, 7, 8 still show the KPI before/after bars (from existing `kpi` data) but no assignment table until `assignments` is added to their recommendations.

## Session 14 — Signal 4 (Reserve Burn Rate Acceleration) Dedicated Deep Dive — 2026-07-14

### Build Status
- `npm run build` — **PASSED** — 0 errors, built in 11.91s

### Added
- **Signal 4 — Reserve Burn Rate Acceleration** now has its own dedicated 7-screen deep-dive use case `uc-reserve-burn` (`src/data/scenarioReserveBurn.js`, `SRB_*`), following the shared scenario pattern. Scenario: multi-hub reserve-depletion event across ATL/JFK/DTW/MSP driven by ATL weather, an open-trip inflow spike (8.4/hr vs 5.1/hr closure), and crew sick calls. Network burn 11.8/hr, coverage 0.72x (0.47x ATL), net open-trip growth +3.3/hr, 61 feasible reserves, Level 1 probability 57%, ATL exhaustion ETA 3h 10m, 7,850 pax exposed, L0 active / L1 partially active / L2 watch. Network resource-control posture with a supply + demand lever split.
  - Screen 1 populates all optional deep-dive blocks — signal metrics (inflow/closure, feasible reserves, 6h demand, donor risks, cost), multi-hub reserve table (ATL source / JFK propagation / DTW·MSP donor with coverage + burn + ETA), cascade logic (L0 active / L1 active-partial / L2 watch), root-cause breakdown (crew 46 / external 21 / network 17 / aircraft 8 / pax 8), historical episodes.
  - Screens 2–7: objectives/KPIs (network stability 35 / reserve efficiency 25 / CX 20 / cost 10 / restart 10), 17 levers across 4 groups (crew supply / network demand / aircraft / pax+cost+recovery), summary + assumptions with a 0.95x donor guardrail, 3 ranked recommendations (Hybrid rebalance + thinning / Pure rebalance / Incentive-heavy), OCC multi-role SLA-tracked approval, and test & learn producing the "Multi-Hub Reserve Burn Containment — ATL/JFK/DTW/MSP" playbook.
- Wired into `StoreServiceRiskPanel` `MODULES` (`uc-reserve-burn` → `SRB`), added `UC_RESERVE_BURN` to `usecases.js` and the `useCases` array.

### Changed
- **Signal 4 card re-scenarioed and routed to the bespoke flow** (`NRS_LIVE_SIGNALS`): `linkedUseCaseId` now `uc-reserve-burn`; primary metric switched to the 0.72x reserve coverage ratio (burn 11.8/hr · ATL exhaustion 3h 10m), 86% confidence, ATL/JFK/DTW/MSP, refreshed trend and tags. Catalog def `SIGNAL_RESERVE_BURN` given concrete multi-hub containment values.

### Watch List
- **All 9 network-risk signals now have dedicated 7-screen deep-dive flows.** UC1 (`uc-network-risk-operations`) remains the aggregate radar entry point; no signal falls back to the generic flow.

## Session 13 — Signal 3 (Uncovered Trip Detected) Dedicated Deep Dive — 2026-07-14

### Build Status
- `npm run build` — **PASSED** — 7,694 modules, 0 errors, built in 18.49s

### Added
- **Signal 3 — Uncovered Trip Detected — Time-to-Departure Critical** now has its own dedicated 7-screen deep-dive use case `uc-uncovered-trip` (`src/data/scenarioUncoveredTrip.js`, `SUT_*`), following the Misconnect / Cross-Hub pattern. Scenario: 9 concurrent uncovered trips at ATL after crew sick calls + ~2% voluntary acceptance, coupled to JFK/LGA/MCO/DTW under T-5h pressure. Event-triggered live simulation, speed-first / legality-gated / network-aware, reserve-first coverage that blocks harmful donor swaps to prevent Level 1. Coverage 46% no action → 78% with plan, 6 trips inside T-5h, 1,860 pax at risk, 540 misconnects, 4 coupled tails, L0 active → L1 trigger risk 90–120 min.
  - Screen 1 populates all optional deep-dive blocks — signal metrics (7-of-14 feasible reserves, 11 swap candidates, 6 deadhead candidates, cost $650K–$1.4M), coupled-hub table, cascade logic (L0 active / L1 watch / L2 not active), root-cause breakdown (crew 52 / network 18 / pax 13 / aircraft 11 / ATC 6), historical episodes.
  - Screens 2–7: objectives/KPIs (reliability 40 / legality 25 / CX 15 / resource 10 / cost 10), 15 recovery levers across 4 groups (crew / network / aircraft / passenger+cost+recovery), summary + assumptions, 3 ranked recommendations (Reserve-first / Swap-conserve / Protect-bank), OCC multi-role SLA-tracked approval, and test & learn producing the "T-5h Multi-Open Trip Recovery — ATL Bank (Reserve-First)" playbook.
- Wired into `StoreServiceRiskPanel` `MODULES` (`uc-uncovered-trip` → `SUT`), added `UC_UNCOVERED_TRIP` to `usecases.js` and the `useCases` array.

### Changed
- **Signal 3 card re-scenarioed and routed to the bespoke flow** (`NRS_LIVE_SIGNALS`): `linkedUseCaseId` now `uc-uncovered-trip`; 9 open trips (6 inside T-5h), coverage 46%→78%, acceptance ~2%, T-5h / T-2h execution-lock window, refreshed trend and tags.

### Watch List
- Dedicated flows now exist for Signals 1, 2, 3, 5, 6, 7, 8, and 9; only Signal 4 (Reserve Burn Rate) still routes to UC1. Follow the same pattern to add it.

## Session 12 — Signal 9 (Binding Policy / Contract Constraint) Dedicated Deep Dive — 2026-07-14

### Build Status
- `npm run build` — **PASSED** — 0 errors, built in 9.15s

### Added
- **Signal 9 — Binding Policy / Contract Constraint Flag** now has its own dedicated 7-screen deep-dive use case `uc-policy-feasibility-gate` (`src/data/scenarioPolicyGate.js`, `SPG_*`), following the Scenario B pattern. Scenario: ATL multi-option recovery (JFK/BOS/MCO downstream) blocked by hard gates — 16 binding constraints removed 23 of 64 options before ranking, 2 need a Tier 2 exception, 11 flights still exposed, 89% confidence.
  - Screen 1 populates all optional deep-dive blocks — signal metrics (legality/qualification/maintenance/policy/cost failure counts), multi-hub constraint table (blocked/conditional actions per hub), cascade logic (L0 active / L1 active / L2 watch), root-cause breakdown, historical episodes.
  - Screens 2–7: objectives/KPIs (compliance 40 / stability 25 / CX 15 / resource 10 / cost 10), 16 policy-aware levers across 4 groups (some hard gates, non-adjustable), summary + hard constraints, 3 ranked recommendations (Fully compliant / High-cost continuity / Exception-required), OCC + policy multi-role approval, and test & learn producing the "ATL Policy Feasibility Gate — Compliant Recovery First" playbook.
- Wired into `StoreServiceRiskPanel` `MODULES` (`uc-policy-feasibility-gate` → `SPG`), added `UC_POLICY_GATE` to `usecases.js` and the `useCases` array.

### Changed
- **Signal 9 card re-scenarioed and routed to the bespoke flow** (`NRS_LIVE_SIGNALS`): `linkedUseCaseId` now `uc-policy-feasibility-gate`; 16 binding constraints, 23 of 64 options removed, Tier 2, 89% confidence, refreshed trend. Catalog def `SIGNAL_POLICY_CONSTRAINT` given concrete values.

### Watch List
- Dedicated flows now exist for Signals 1, 2, 5, 6, 7, 8, and 9; the remaining two signals (3, 4) still route to UC1. Follow the same Scenario B pattern to add more.

## Session 11 — Signal 8 (Tail-Crew Synchronization Gap) Dedicated Deep Dive — 2026-07-14

### Build Status
- `npm run build` — **PASSED** — 0 errors, built in 12.39s

### Added
- **Signal 8 — Tail-Crew Synchronization Gap** now has its own dedicated 7-screen deep-dive use case `uc-tail-crew-sync` (`src/data/scenarioTailCrew.js`, `STC_*`), following the Scenario B / Cross-Hub pattern. Scenario: multi-hub aircraft/crew readiness mismatch ATL → JFK → BOS (MCO donor) — crew ready without a released tail (DL2381 ATL–JFK) and a ready tail without positioned crew (DL1842 ATL–MCO). +68 min readiness gap, 18 affected legs, 9 aircraft/crew split pairs, 7 impacted tails, 4 feasible swaps, 3 maintenance gates, 410 misconnects, 6 next-day departures exposed, 81% confidence, L0 active / L1 watch / L2 next-day watch.
  - Screen 1 populates all optional deep-dive blocks — signal metrics, multi-hub tail-crew coupling table (ATL/JFK/BOS/MCO), cascade logic (L0 mismatch / L1 donor risk / L2 restart watch), root-cause breakdown (aircraft 34 / crew 25 / network 18 / gate 10 / pax 8 / ATC 5), historical episodes.
  - Screens 2–7: objectives/KPIs (reliability 35 / resource 25 / CX 20 / cost 10 / restart 10), 15 synchronization levers across 4 groups (aircraft / crew / network / pax+cost+recovery), summary + assumptions, 3 ranked recommendations (Tail swap + crew preservation / Crew reassignment / Controlled delay + release wait), OCC multi-role approval, and test & learn producing the "ATL Tail-Crew Sync — JFK/BOS Spillover Containment" playbook.
- Wired into `StoreServiceRiskPanel` `MODULES` (`uc-tail-crew-sync` → `STC`), added `UC_TAIL_CREW` to `usecases.js` and the `useCases` array.

### Changed
- **Signal 8 card re-scenarioed and routed to the bespoke flow** (`NRS_LIVE_SIGNALS`): `linkedUseCaseId` now `uc-tail-crew-sync`; primary metric switched to the +68 min readiness gap (18 legs · 9 split pairs · 7 tails), 81% confidence, ATL/JFK/BOS/MCO, T-4h + 10-min live-refresh window, refreshed trend. Catalog def `SIGNAL_TAIL_CREW_SYNC` given concrete crew-aircraft-sync values.

### Watch List
- Dedicated flows now exist for Signals 1, 2, 5, 6, 7, and 8; the remaining three signals (3, 4, 9) still route to UC1. Follow the same pattern to add more.

## Session 10 — Signal 7 (Passenger Misconnect Exposure) Dedicated Deep Dive — 2026-07-14

### Build Status
- `npm run build` — **PASSED** — 7,693 modules, 0 errors, built in 14.38s

### Added
- **Signal 7 — Passenger Misconnect Exposure** now has its own dedicated 7-screen deep-dive use case `uc-misconnect-exposure` (`src/data/scenarioMisconnect.js`, `SMX_*`), following the Scenario B / Cross-Hub pattern. Scenario: multi-hub connection cascade ATL → JFK → BOS — ATL 17:30–20:30 bank compression spilling into the JFK 21:00–23:30 late bank and the BOS next-day first wave. Proactive pre-bank optimization + real-time connection protection, passenger segmentation, balanced CX + network bias. 1,460 misconnects at risk, 386 critical, 214 premium, 132 international, 87% confidence, 550-seat reaccommodation shortfall, L0 active ATL / L1 watch JFK / L2 watch BOS.
  - Screen 1 populates all optional deep-dive blocks — signal metrics, multi-hub propagation table (ATL/JFK/BOS banks), cascade logic (L0 active / L1 watch / L2 watch), root-cause breakdown (network 28 / crew 22 / aircraft 17 / gate 14 / ATC 11 / pax 8), historical episodes.
  - Screens 2–7: objectives/KPIs (CX 35 / network stability 35 / cost 15 / feasibility 15), 19 protection levers across 4 groups (passenger / network / crew+aircraft / gate+cost+recovery), summary + assumptions, 3 ranked recommendations (Balanced / Reaccommodation-first / Network stability-first), OCC multi-role approval, and test & learn producing the "ATL → JFK → BOS Connection Protection — Balanced CX + Network" playbook.
- Wired into `StoreServiceRiskPanel` `MODULES` (`uc-misconnect-exposure` → `SMX`), added `UC_MISCONNECT` to `usecases.js` and the `useCases` array.

### Changed
- **Signal 7 card re-scenarioed and routed to the bespoke flow** (`NRS_LIVE_SIGNALS`): `linkedUseCaseId` now `uc-misconnect-exposure`; 1,460 misconnects (386 critical · 214 premium · 132 intl), 87% confidence, ATL/JFK/BOS banks, proactive T-3h + real-time T-45m→T+20m window, refreshed trend. Catalog def `SIGNAL_MISCONNECT_EXPOSURE` given concrete ATL→JFK→BOS values.

### Watch List
- Dedicated flows now exist for Signals 1, 2, 5, 6, and 7; the remaining four signals (3, 4, 8, 9) still route to UC1. Follow the same pattern to add more.

## Session 9 — Signal 6 (Cross-Hub Propagation) Dedicated Deep Dive — 2026-07-14

### Build Status
- `npm run build` — **PASSED** — 0 errors, built in 8.77s

### Added
- **Signal 6 — Cross-Hub Propagation Probability** now has its own dedicated 7-screen deep-dive use case `uc-cross-hub-propagation` (`src/data/scenarioCrossHub.js`, `SCP_*`), following the Scenario B pattern. Scenario: multi-hub cascade ORD → ATL → JFK → BOS, already in Level 1 zero-sum crew swaps with Level 2 rising — 68% propagation, 89% confidence, 4 affected hubs, 23 non-source open trips, reserve coverage ATL 0.69x / JFK 0.81x / BOS 0.92x, 17 next-day departures exposed.
  - Screen 1 populates all optional deep-dive blocks — signal metrics, multi-hub propagation table (ORD/ATL/JFK/BOS roles), cascade logic (L0 active / L1 active / L2 watch-rising), root-cause breakdown, historical episodes.
  - Screens 2–7: objectives/KPIs (network stability 35 / restart 25 / CX 20 / resource 10 / cost 10), 16 containment levers across 4 groups, summary + assumptions, 3 ranked recommendations (Contain at source / Controlled support / Network reset), OCC multi-role approval, and test & learn producing the "ORD → ATL → JFK → BOS Cross-Hub Containment" playbook.
- Wired into `StoreServiceRiskPanel` `MODULES` (`uc-cross-hub-propagation` → `SCP`), added `UC_CROSS_HUB` to `usecases.js` and the `useCases` array.

### Changed
- **Signal 6 card re-scenarioed and routed to the bespoke flow** (`NRS_LIVE_SIGNALS`): `linkedUseCaseId` now `uc-cross-hub-propagation`; 68% propagation, 89% confidence, 4 hubs / 23 non-source open trips, 6–24h + 24–72h window, refreshed trend. Catalog def `SIGNAL_CROSS_HUB_PROPAGATION` given concrete values.

### Watch List
- Dedicated flows now exist for Signals 1, 2, 5, and 6; the remaining five signals still route to UC1. Follow the same Scenario B pattern to add more.

## Session 8 — Signal 2 (Hub Closure Likelihood) Dedicated Deep Dive — 2026-07-14

### Build Status
- `npm run build` — **PASSED** — 0 errors, built in 10.34s

### Added
- **Signal 2 — Hub Closure Likelihood** now has its own dedicated 7-screen deep-dive use case `uc-hub-closure` (`src/data/scenarioHubClosure.js`, `SHC_*`), following the Scenario B pattern. Scenario: severe thunderstorms + active ATC ground delay program at ATL (T-30h→T-6h), 72% closure likelihood, 88% forecast confidence, 184 exposed flights / 52 pairings, -38% departure throughput, 26,300 pax exposed, Pre-Level 0 → Level 0 forming.
  - Screen 1 populates all optional deep-dive blocks — signal metrics, weather/external breakdown (via the multi-hub table), cascade logic (L0 likely / L1 possible / L2 not yet), root-cause breakdown, historical episodes.
  - Screens 2–7: objectives/KPIs (stability 40 / CX 30 / cost 15 / resource 15), 9 preventive levers across 4 groups, summary + assumptions, 3 ranked recommendations (Pre-cancel + Reserve / Delay + Full Coverage / Alternate Hub), OCC multi-role approval, and test & learn producing the "ATL Weather Hub Closure Stabilization" playbook.
- Wired into `StoreServiceRiskPanel` `MODULES` (`uc-hub-closure` → `SHC`), added `UC_HUB_CLOSURE` to `usecases.js` and the `useCases` array.

### Changed
- **Signal 2 card re-scenarioed and routed to the bespoke flow** (`NRS_LIVE_SIGNALS[1]`): `linkedUseCaseId` now `uc-hub-closure`; 72% closure likelihood, 88% confidence, 184 flights / 52 pairings, T-30h→T-6h window, refreshed trend. Catalog def `SIGNAL_HUB_CLOSURE` given concrete values.

### Watch List
- Signals 1 and 5 (shared UC1 + bespoke) and now Signal 2 have dedicated flows; the remaining six signals still route to UC1. Follow the same Scenario B pattern to add more.

## Session 7 — Signal 1 (Network Risk Radar) ATL Evening-Bank Deep Dive — 2026-07-14

### Build Status
- `npm run build` — **PASSED** — 7,690 modules, 0 errors, built in 11.60s

### Changed
- **Signal 1 — Network Risk Radar re-scenarioed to the ATL evening bank (T-16h→T-4h)** across the shared UC1 dataset (`src/data/networkRiskSignals.js`), aligned to the 7-screen deep-dive design. Score 87/100, confidence 91%, 126 flights / 34 pairings / 4 hubs (ATL/JFK/DTW/MSP), reserve coverage 0.82x, Level 0 → Level 1 watch, propagation 42%.
  - Catalog def `SIGNAL_NETWORK_RISK_RADAR` and live card `NRS_LIVE_SIGNALS[0]` given concrete values, tightened copy, and a T-24h→Now trend.
  - Screen 1: updated `NRS_DISRUPTION` / `NRS_IMPACT` / `NRS_SIGNAL` / `NRS_NETWORK` (hubs ATL/JFK/DTW/MSP); precedents now carry `pattern` + `lesson`; hypothesis retargeted.
  - Recommendations rebuilt as the deep-dive's 3 ranked options — Critical Bank Stabilization (recommended), Selective Schedule Thinning, Alternate Hub / Overnight Reset — with new KPI/plan data; `NRS_RANKING`, `NRS_FRONTIER`, `NRS_APPROVAL`, `NRS_BASELINE`, `NRS_VARIANTS`, `NRS_SCENARIO`, `NRS_SCOPE`, `NRS_OUTCOMES`, `NRS_INSIGHTS`, `NRS_LEARN`, `NRS_SAVE` re-aligned to the scenario.

### Added
- **Screen-1 rich blocks now populated for Signal 1** (already supported by `StoreServiceRiskPanel`): `NRS_METRICS` (signal metrics), `NRS_HUB_IMPACT` (multi-hub cascading table), `NRS_CASCADE` (L0/L1/L2 logic), `NRS_ROOT_CAUSE` (domain contribution breakdown).

### Watch List
- UC1-level metadata in `usecases.js` (`duration`, `variants`) stays general across all 9 signals — not narrowed to the ATL evening-bank window.

## Session 6 — Airline Network Risk Signals + Signal 5 Deep Dive + Delta Rebrand — 2026-07-14

### Build Status
- `npm run build` — **PASSED** — 7,690 modules, 0 errors
- End-to-end verified in-browser: Signal 5 (Mid-Rotation Hub Stranding) and Signal 1 (Network Risk Radar) both walk all 7 guided screens with 0 page errors.

### Added
- **9 airline Network Risk signals** on the Sense/catalog page (`src/data/networkRiskSignals.js` → `NRS_LIVE_SIGNALS`, wired into `src/pages/UseCaseCatalog.jsx`): Network Risk Radar, Hub Closure Likelihood, Uncovered Trip Detected, Reserve Burn Rate, Mid-Rotation Hub Stranding, Cross-Hub Propagation, Passenger Misconnect Exposure, Tail-Crew Sync Gap, Binding Policy/Contract Constraint. Severity filter gained `CRITICAL`.
- **Signal 5 — Mid-Rotation Hub Stranding** now has its own dedicated 7-screen deep-dive use case `uc-mid-rotation-stranding` (`src/data/scenarioBStranding.js`, `SCB_*`): ORD→ATL→JFK cascade. Screen 1 adds optional deep-dive blocks — signal metrics, multi-hub cascading table, cascade logic (L0/L1/L2), root-cause breakdown, historical episodes. Screens 2–7 cover objectives/KPIs, 16 levers across 4 groups, summary, 3 ranked recommendations (deadhead-heavy / reserve-first / cancel-thin), OCC approval, and test & learn. Signal 5 card upgraded HIGH → CRITICAL and routed to the new use case.

### Fixed
- **Shared workflow panel data contract** (`src/components/workflow/panels/StoreServiceRiskPanel.jsx`): Screens 4–7, the strategy modal, and the dispatcher referenced a removed global `D.SSR_*`, so any UC1 run crashed past Screen 3. Rewrote the panel to resolve the data module per active use case via `useData()` and normalize to neutral keys. Also repaired mismatched `NRS_*` shapes (`NRS_LOADING_LINES` object-by-screen, `NRS_OUTCOMES`, `NRS_APPROVAL`, `NRS_SAVE`, `NRS_LEARN`, added `NRS_RANKING`/`NRS_FRONTIER` points/`NRS_ACCENT`) so UC1's flow runs end-to-end. KPI delta coloring is now driven by an explicit `neg` flag instead of keyword sniffing.

### Changed
- **Home header rebranded Kroger → Delta**: `src/App.jsx` title "Network OS for Delta Operations Resilience" + subtitle; `index.html` tab title + OG/Twitter meta.

### Watch List
- The other 8 network signals still route to UC1 (`uc-network-risk-operations`) — only Signal 5 has a bespoke flow so far. If more signals need dedicated deep-dives, follow the Scenario B pattern (new `*_` data module implementing the panel contract + a use case in `MODULES`).
- `WorkflowActions` viz is still supply-chain-specific (WMS/OMS/TMS/APS); airline modules omit `*_WORKFLOW_ACTIONS`, so the "exact actions by workflow" modal block is skipped for them.
- Legacy Kroger copy remains in deeper content (Store Service / Inventory Imbalance workflow data, Content Engine "Kroger Recovery Playbook" label) — not on the home screen; left untouched by scope.

## Session 5 — Rebrand to Supply OS for Kroger + Supply-Chain Signals — 2026-07-08

### Build Status
- `npm run build` — **PASSED** — 7,683 modules, 0 errors, built in 14.78s

### Added
- **Live Signals rebuilt for Kroger Supply Chain Resilience** (`src/pages/UseCaseCatalog.jsx`)
  - Replaced the five Personal Wealth signals with five Network Flow & Resilience + MEIO signals sourced from the `01_Signal_Cards` brief:
    1. **Supplier Delay Surge** — High-Volume DC Flow at Risk (HIGH · 42 delayed POs · SUPPLIER / ASN FEED · 24–48 hr recovery window)
    2. **DC Capacity Stress** — Throughput Below Required Flow (HIGH · 18% capacity variance · WMS / DC OPS FEED · 12–24 hr response window)
    3. **Premium Freight Risk Rising** — ETA Breach & Time-to-Need Compression (MEDIUM-HIGH · 27 at-risk loads · TMS / CARRIER FEED · 24 hr cost-control window)
    4. **Store Service Risk** — At-Risk Replenishment Orders (HIGH · 126 stores at risk · OMS / INVENTORY FEED · 24–72 hr service window)
    5. **Inventory Imbalance** — Excess Upstream, Shortage Downstream (MEDIUM · 8 SKU families · ERP / APS / INVENTORY LEDGER · 48–72 hr rebalance window)
  - Each signal now carries `detail` (expanded right-block copy), `tags` (sentinel tag chips), `metricValue`/`metricUnit`/`metricStripLabel`/`metricSub`, per-signal confidence, source chip, sensing agent (Network/Flow/Cost/Service/MEIO Sentinel), trend series, and a ready-to-run scenario name.
  - Right-block detail now renders the sentinel tag chips and the fuller `detail` narrative; trend tooltip and metric labels are supply-chain aware (no longer "Investors").
  - Severity filter updated to `All / HIGH / MEDIUM-HIGH / MEDIUM`.

### Changed
- **Application rebranded "Marketing OS for Vanguard Personal Wealth" → "Supply OS for Kroger Supply Chain Resilience"**
  - `src/App.jsx` — top-header title + subtitle ("From static supply plans to adaptive network decision intelligence · Powered by TwinX™"); avatar monogram V → K.
  - `index.html` — `<title>` + description/OG/Twitter meta.
  - `package.json` — `name` → `supply-os-for-kroger`, description updated.
  - `src/pages/UseCaseCatalog.jsx` — banner heading → "Supply Chain Resilience Signals for Kroger's Network" and subtitle → "Network Flow & Resilience · MEIO optimization · reroute, rebalance & premium-freight avoidance".

### Added
- **UC1 & UC2 redesign — rich SCM visualizations** (new `src/components/viz/ScmViz.jsx`: NetworkMap, BeforeAfterFlow, EfficientFrontier, InventoryHeatmap, InventoryLocation, WorkflowActions, StrategyCompare, ModelUpdateGrid).
  - **UC1 Network Resilience (Store Service Risk)** — Signal screen now shows disruption source, impact tiles (stores impacted, revenue at risk, service degradation, inventory at risk, affected lanes), and a supplier→DC→store network map with impacted nodes + at-risk lanes. Strategy-details modal adds network flows before-vs-after, a Service/Cost/Recovery-time efficient frontier, and exact actions by WMS/OMS/TMS/APS. Learn screen adds prediction accuracy, model recalibration, discovered risk patterns, and digital-twin evolution.
  - **UC2 MEIO (Inventory Imbalance)** — Signal screen adds an inventory-imbalance heatmap (echelon × SKU family), inventory-by-location bars, and trapped-capital / excess / service-risk / stockout-exposure tiles. Strategy-details modal adds safety-stock/reorder/transfer/placement optimization, inventory movement before-vs-after, a Service/Inventory/Working-capital efficient frontier, and a Safety-Stock/Rebalance/Capital/Balanced strategy comparison (service, inventory, capital release, feasibility, effort, confidence). Learn screen adds demand-model, lead-time-model, safety-stock-policy, transfer-rule, and optimization-parameter updates.
  - Verified end-to-end in a headless browser for both flows (all visuals render, 13 network nodes, heatmap, frontiers, workflow actions, model updates) — 0 page errors.
- **Inventory Imbalance (MEIO) — 7-screen guided flow** (Signal 2). New `src/data/inventoryImbalance.js` + `src/components/workflow/panels/InventoryImbalancePanel.jsx`, registered as panelType `inventory_imbalance`, use case `UC_INVENTORY_IMBALANCE` added to `useCases`, and the Inventory Imbalance signal re-linked to it. Full MEIO storyline: Signal Analysis (MEIO Sentinel banner, signal indicators + historical-precedent tables, hypothesis + initial recommendation), Objectives & KPIs (dropdown + multi-selects defaulting to recommended), 25 MEIO levers across 5 groups (Safety-stock / Cross-echelon / Reorder / Uncertainty / Financial-guardrail) all defaulting to recommended, Simulation Summary, three ranked policy bundles with KPI-impact tables + downloadable strategy plans (View strategy details → modal with Download/Close), planner+finance Approval & Execution, and predicted-vs-actual Learn & Save (with Efficient-Frontier exit option). Verified end-to-end in a headless browser: all 7 screens render/advance, strategy download works, exit routes home, 0 page errors.
- **Store Service Risk — 7-screen guided flow, full-fidelity build-out** (Signal 1). Rebuilt all 7 screens to the detailed spec: expanded per-screen content, 22 simulation levers across 4 groups (Service / MEIO / Transportation / Cost-resilience) all defaulting to their recommended values, dropdown-driven objectives + KPIs, three ranked optimization recommendations with KPI-impact tables, an execution/approval package, and a predicted-vs-actual learning screen with scenario save. Verified end-to-end in a headless browser (all 7 screens render + advance, 0 page errors).
- **Store Service Risk — 7-screen guided flow** (initial). Clicking Run scenario on the "Store Service Risk — At-Risk Replenishment Orders" alert (guided mode) now runs a purpose-built 7-step workflow: Signal Analysis → Objectives & KPIs → Simulation Levers → Simulation Summary → Optimization Results → Approval & Execution → Learn & Save Scenario.
  - `src/data/storeServiceRisk.js` — new. 7 simulation levers (MEIO rebalance, allocation resequencing, transportation reroute, selective expedited logistics, safety-stock uplift, service target, recovery window), each with a `recommended` value; `SSR_RECOMMENDED_DEFAULTS` seeds the page defaults so **every lever defaults to its recommended value**. Plus KPIs (baseline vs target), objectives, ranked plans, execution checklist, and per-screen loading lines.
  - `src/components/workflow/panels/StoreServiceRiskPanel.jsx` — new. Single panel rendering all 7 screens via `panelData.screen`, each with its own supply-chain-context loading transition. Levers read/write `workflowState.ssrLevers` (defaulted to recommended) with a "Reset to recommended" control; deterministic projection vs a do-nothing baseline on the summary screen; recommended plan pre-selected; human approval gate on screen 6.
  - `src/components/workflow/WorkflowRunner.jsx` — registered `store_service_risk` panelType.
  - `src/data/usecases.js` — added `UC_STORE_SERVICE_RISK` (7 steps) to `useCases`.
  - `src/pages/UseCaseCatalog.jsx` — Store Service Risk signal now links to `uc-store-service-risk`.
- **CI build automation** (`.github/workflows/ci.yml`) — runs `npm install --legacy-peer-deps` + `npm run build` on every `pull_request` to `main` and every push to `main` / `claude/**`, plus manual dispatch. Gives every PR a visible build check without a manual local build.

### Fixed
- **Build/deploy never ran on feature branches or PRs** (`.github/workflows/deploy-pages.yml`) — the deploy workflow only triggered on `main` and a stale branch (`claude/blissful-shannon-2d5q9b`), so nothing showed on PRs. Dropped the dead branch, kept `main`, and added `workflow_dispatch` for manual deploys. Branch/PR builds are now covered by `ci.yml`.
- **Conflicting Jekyll Pages workflow** (`.github/workflows/jekyll-gh-pages.yml`) — this Vite SPA was also being built as a Jekyll site and deployed to the same `pages` concurrency group on every `main` push, racing/clobbering the real Vite deploy. Switched to `workflow_dispatch`-only (manual) instead of deleting it.
- **"Run scenario" was a no-op on the new supply-chain signals** (`src/pages/UseCaseCatalog.jsx`) — the five new scenario names don't exist in `usecases.js`, so `handleRunByTitle` matched nothing and the button did nothing (no Guided/Autopilot prompt). Added a `linkedUseCaseId` on each signal that points at an existing workflow, and replaced `handleRunByTitle` with `handleRunSignalScenario`, which resolves the linked use case (falling back to scenario-title match) and hands it to `onRunScenario` → the `ModeChoiceModal` (Guided vs Autopilot) opens exactly as before. Temporary 1:1 mapping until the target pages are re-skinned: Supplier Delay Surge→uc-advisory-readiness, DC Capacity Stress→uc-idle-cash, Premium Freight Risk→uc-diversification, Store Service Risk→uc-volatility-reassurance, Inventory Imbalance→uc-rollover-ira.
- **Application URL not loading (blank page when served at domain root)** — `vite.config.js` had `base: '/md/'` (a leftover from the "Sync KCC branch from md repository" import). Both deploy configs serve the SPA at the domain root (`firebase.json` → `public: dist` with rewrite to `/index.html`; `nginx.conf` → `location /`), so the built `index.html` requested its assets from `/md/assets/…`, which 404'd and fell through the SPA rewrite to `index.html` (HTML served for `.js` requests) → browser refused to execute → blank page. Changed `base` to `'./'` (relative). Verified: serving `dist/` at root now returns the app HTML and loads `./assets/*.js` with `text/javascript`. Navigation is state-based (no URL routing), so a relative base is safe at root or under any path prefix.

### Watch List
- **Run-scenario wiring** — the five new scenario names (Supplier Delay Recovery, DC Capacity Shift Simulation, Premium Freight Avoidance, Service Protection Simulation, MEIO Rebalance Simulation) do not yet exist in `src/data/usecases.js`, so the "Run scenario" button is currently a no-op. Downstream workflow panels still carry Vanguard copy. Per user direction these page-level changes are deferred to follow-up prompts.
- TwinX engine branding retained intentionally ("Powered by TwinX™").

---

## Session 4 — Plan Design Optimizer (UC-E v0.2.0-vanguard) — 2026-04-30

### Build Status
- `npm run build` — **PASSED** — 7,601 modules, 0 errors, built in 4.56s
- Dev server starts cleanly. Pre-existing Mantine `"use client"` directive warnings are library-level (unchanged from prior sessions)

### Added

**Plan Design Pareto — UC-E rebuilt around TCS US (50,000 employees)**
The PRD specified five new panels (`PlanDiagnosticsPanel`, `BenchmarkPanel`, `LeverConfigPanel`, `PlanSimResultPanel`, `PlanRecommendationPanel`). Per user direction, these are folded into the existing UC-E 8-step chain rather than added as net-new panels. The audience flips from participant-marketing to sponsor-strategist + benefits committee.

- **Data layer**
  - `src/data/sponsors.js` — added `sponsor-009` (TCS USA 401(k) Plan, 50,000 employees, technology, ADP at-risk) with new optional `planDesignId` field
  - `src/data/planDesign.js` — **NEW**. TCS US baseline parameters + current KPIs (61% participation, 5.1% deferral, $14.2M annual cost, ADP at-risk, Q3 competitive, 38/100 fiduciary risk). Exports `planDesigns`, `getPlanDesign()`, `EXPENSE_TIER_AVG_ER`, label maps
  - `src/data/benchmarks.js` — **NEW**. Tech-sector medians + 4 illustrative peers (Accenture, Cognizant, Infosys, Wipro)
  - `src/data/signals.js` — added 4 `plan_health` signals scoped to TCS US: `sig-ph-001` (participation gap), `sig-ph-002` (ADP risk · `fiduciarySensitive: true`), `sig-ph-003` (competitive match gap), `sig-ph-004` (SECURE 2.0 student-loan match opportunity). All carry `scenarioIds: ['uc-e']`
  - `src/data/episodes.js` — added `ep-006` (auto-enrollment uplift) and `ep-007` (match formula stretch)
  - `src/data/agents.js` — extended Market Sentinel and Quant Bridge `recentDecisions[]` with TCS US plan-health detection and Pareto-search entries

- **Simulation logic**
  - `src/simulation/planDesign.js` — **NEW**. Deterministic parameter-effect model (PRD §11). Exports `computeOutcomes()`, `gridCardinality()`, `findParetoFrontier()`. 500-config cap with `capped` flag; empty-frontier returns `{ frontier: [], top3: [] }`
  - `src/utils/planNarrative.js` — **NEW**. Static template generator. `buildPlanRecommendation()` returns summary + parameter from→to diff + Rail-6 next-steps + 14-week timeline. **No LLM**, per `app/CLAUDE.md` anti-pattern
  - `src/utils/dataSourceManifest.js` — **NEW**. Static manifest definitions for the data-source pills
  - `src/utils/tooltips.js` — **NEW**. Glossary map for parameter tooltips + vesting-curve preview data

- **UI components**
  - `src/components/ui/DataSourceStrip.jsx` — **NEW** shared component. File pills with type-coded icons (xlsx/csv/pdf/json) + Internal/External grouping
  - `src/components/workflow/panels/PlanDesignParetoPanel.jsx` — **major rewrite** (~1,000 lines). Four-section panel: (0) Data Source Manifest, (1) Plan Diagnostics scorecard with lever-link badges, (2) Benchmark Comparison vs 4 peers + sector P50, (3) Configure & Simulate with What-If / If-What modes. Rich Mantine controls per parameter (Switch · Slider · SegmentedControl · Radio.Group · Select · NumberInput · Chip.Group), live computed previews (effective match, avg ER, fee savings), vesting-curve mini-chart, Plan A/B/C variant tabs, "Apply this configuration" buttons on variants and Top-3 Pareto cards, 500-config grid guardrail, empty-frontier alert
  - `src/components/workflow/panels/SignalDetectionPanel.jsx` — added optional `DataSourceStrip` rendering (backward-compatible)
  - `src/components/workflow/panels/OutcomeCohortPanel.jsx` — added `PlanRecommendationBlock` sub-component. Renders when `workflowState.selectedConfig` (live) or `panelData.recommendation` (canonical) is present. Shows parameter from→to diff, projected vs observed KPI table, static narrative, Rail-6 next-steps, timeline
  - `src/components/workflow/ModeChoiceModal.jsx` — fiduciary-sensitive autopilot disable. When launching signal carries `fiduciarySensitive: true`, Autopilot card renders disabled with shield-lock icon, red badge, and tooltip; an Alert at top of modal explains the constraint

- **Standalone PlanOptimizer page**
  - `src/pages/PlanOptimizer.jsx` — **NEW**. Power-user sandbox under SIMULATE rail. Reuses `PlanDesignParetoPanel` directly. Three exits prevent dead-ends: Reset · Export simulation (JSON download) · Open in UC-E (calls `launch(uc, { seedState, jumpToStep: 2 })`)
  - `src/pages/SimulateDashboard.jsx` — third tab "Plan Optimizer" added; SimulateDashboard now wired as the simulate-bucket landing
  - `src/contexts/UseCaseContext.jsx` — `launch()` accepts `{ seedState, jumpToStep }`; new `consumeSeedState()` returns and clears the pending seed exactly once on workflow mount
  - `src/components/workflow/WorkflowRunner.jsx` — initial `workflowState` extended with `selectedConfig`, `rail6Output`, `package` keys; `useEffect` consumes any pending seed on activeUseCase change

- **TrustCompliance · Rail 6**
  - `src/pages/TrustCompliance.jsx` — appended Rail 6 "Plan Design Fiduciary Review" with the 5 PRD-specified ERISA sub-checks. Page now lists 6 rails

- **UC-E re-skinned in `src/data/usecases.js`** (full block rewrite, lines 1183–1477):
  - Step 1 (signal_detection): TCS US framing (61% vs 83% tech P50, ADP at-risk), `dataSources` array passed to panel, precedents linked to `ep-006`/`ep-007`
  - Step 2 (plan_design_pareto): `panelData.planDesignId: 'sp-tcs-us'`; framed as "the only place a simulation runs"
  - Step 3 (workforce_stress): re-framed as "Sponsor ROI / Business Case — derived from selected config"
  - Step 4 (content_generation): **re-framed as Quote Package / Board Deck**. Drops 4,800 participant variants. Asset list: 1 board deck + 1 CFO ROI sheet + 1 mandatory 30-day notice + 1 sponsor portal card
  - Step 5 (compliance): added Rail 6 with 5 sub-checks
  - Step 6 (cohort_decision): TCS US plan-design KPI deltas (61%→84%, ADP at-risk→PASS, Q3→Q2)
  - Step 7 (deployment): **re-framed as Activation / Implementation Handoff** — amendment filing, Workday HRIS sync, single mandatory 30-day notice. No 50K-employee blast
  - Step 8 (cohort_outcome): TCS US plan-level KPIs ($2.84B AUM retained); new `panelData.recommendation` block feeding `PlanRecommendationBlock`
  - Top of `usecases.js`: imports `UC_E_PLAN_DESIGN_SOURCES`

### Routing wiring

- `src/App.jsx` — registered `'plan-optimizer': PlanOptimizer` and `'simulate-dashboard': SimulateDashboard` in `PAGE_COMPONENTS`. Changed `BUCKET_DEFAULT_PAGE.simulate` from `'episode-simulator'` to `'simulate-dashboard'`. Workflow steps that reference `episode-simulator` directly via `step.page` continue to work
- `src/theme.js` — added `'plan-optimizer'` and `'simulate-dashboard'` to `PAGE_TO_BUCKET → 'simulate'`

### Watch List

- `bundle size`: build emits a 1.6MB JS chunk (445KB gzipped) — pre-existing; the new module set adds ~80KB pre-min. Code-splitting `PlanDesignParetoPanel` is a follow-up if it matters
- `vite duplicate-import warnings`: SimulateDashboard lazy-loads PlanOptimizer/QuantBridge while App.jsx imports them statically; harmless but worth resolving in a future refactor
- `Northstar Retail` references remain in older docs (`docs/vanguard-pov/`); this session only modifies the v0.2.0 codebase. POV doc refresh is OQ
- Static narrative templates have NO LLM wiring; Claude API + compliance-scoped prompt library deferred per user direction
- `bundle splitting`: SimulateDashboard's lazy imports collide with App.jsx's static imports — harmless but the lazy directive is being ignored. Future cleanup: pick one strategy

### Anti-Pattern Registry — entries reinforced this session

| Anti-pattern | Where it would have appeared | Mitigation applied |
|---|---|---|
| LLM free-form for advice-adjacent copy | Plan recommendation narrative | Static deterministic templates in `utils/planNarrative.js`; no LLM call |
| Predictive intent signals at participant level | Plan-health signals could imply individual targeting | All `plan_health` signals carry plan-level `affectedPlanIds` only; cohort counts are aggregate |
| Autopilot on fiduciary-sensitive hypotheses | ADP-risk-launched UC-E flows | `sig-ph-002` carries `fiduciarySensitive: true`; ModeChoiceModal renders Autopilot disabled with red lock icon |
| Missing do-nothing baseline | Step 6 cohort_decision | `decision.doNothingBaseline` retained; Pareto panel always plots the current-plan dot |
| Solicitation language in sponsor-facing copy | Quote Package narrative | Sponsor-facing fiduciary content; describes the redesign factually, no "upgrade your plan" framing |

---

## Session 3 — UC-B Full Implementation & Panel Data-Driving (v0.1.2-vanguard) — 2026-04-15

### Build Status
- `npm run build` — **PASSED** — 7,581 modules, 0 errors, built in 2.37s
- All 8 UC-B steps visually verified end-to-end — no crashes, no UC-A content leaking

### Added

**UseCaseCatalog page (Decide rail)**
- `src/pages/UseCaseCatalog.jsx` — new page rendered when Decide rail is selected; displays all 5 Vanguard use cases grouped by Route with journey steps, fiduciary discipline banner, outcome KPIs, and "Launch Demo" CTA; Coming Soon badge for UC-C/D/E
- `src/App.jsx` — Decide nav bucket now routes to `<UseCaseCatalog>` instead of placeholder; `onLaunchUseCase` prop wires catalog launch buttons into the WorkflowRunner

**UC-B full step data (Roth Adoption Nudge)**
- `src/data/usecases.js` — UC-B expanded from 8 placeholder steps to 8 fully-populated panelData steps:
  - Step 0 (signal_detection): `seeds: { signalId: 'sig-013' }` added; new fields `primaryMetric`, `primaryMetricLabel`, `sourceLabel: 'Behavior Radar'`, `episodeNote` (SECURE 2.0 Roth catch-up context)
  - Step 1 (advisor_targeting): `cohortDescription: 'participants identified — Roth adoption gap cohort (280 plans)'` added to panelData
  - Step 7 (attribution): `episodeTitle: 'Workflow Complete — Roth Adoption Nudge Episode #6'` added; `modelUpdate.priorLabel` and `modelUpdate.episodeContext` added with Roth-specific text

### Fixed

**Panel hardcoded UC-A strings — all panels now data-driven**

- `src/components/workflow/panels/SignalDetectionPanel.jsx`
  - Was: hardcoded "VIX +36% Intraday — Broad Equity Volatility", "Bloomberg MCP" badge, VIX stat blocks (VIX spike / 2σ deviation / urgency window), hardcoded episode note
  - Now: headline reads `step.headline`; source badge reads `pd.sourceLabel`; stat block section is conditional on `pd.vixChange !== null` — VIX path for UC-A, behavioral path for UC-B (`primaryMetricLabel`, `primaryMetric`, `sigmaDeviation`, `detectionLag`, `urgencyWindow`, `episodeClass`); episode note reads `pd.episodeNote`
  - Fix: `urgencyWindow.split(' ')[0]` (was `.split('-')[0]`, gave "60" instead of "60-day")

- `src/components/workflow/panels/AdvisorTargetingPanel.jsx`
  - Was: hardcoded "advisors identified — elevated large-cap exposure"
  - Now: reads `pd.cohortDescription || 'advisors identified — elevated large-cap exposure'`

- `src/components/workflow/panels/AttributionPanel.jsx`
  - Was: hardcoded "Workflow Complete — VIX Spike Response Episode #19" title; `ca.briefsOpened + ca.articlesRead + ...` summing undefined fields → crash; `engagement.redistributionEndClients.toLocaleString()` → crash; `action.portfolioToolOpens` (undefined) in badge and funnel
  - Now: title reads `pd.episodeTitle || '...'`; all `ca.*` fields use `?? 0` fallback (`briefsOpened`, `articlesRead`, `toolInteractions`, `wholesalerCalls`, `pdfsRedistributed`); `engagement.redistributionEndClients ?? 0` and `engagement.redistributionAdvisors ?? 0`; `action.portfolioToolOpens ?? 0`, `action.wholesalerFollowUps ?? 0`, `action.rebalancingTransactions ?? 0`; same `?? 0` in `actionFunnelData` array and action outcomes grid
  - Prior-label and episode context now read `modelUpdate.priorLabel` / `modelUpdate.episodeContext`

- `src/components/workflow/panels/DeploymentPanel.jsx`
  - `PreviewModalContent` rewritten to be fully data-driven: renders `advisor.content[]` as ordered list; `advisor.talkingPoints[]` if present; no hardcoded content strings

### Regressed
- [none detected — full UC-B end-to-end visual pass confirmed all 8 steps clean]

### Watch List
- AttributionPanel action accordion still shows UC-A field labels ("Portfolio tool opens", "Wholesaler follow-ups", "Rebalancing transactions") for UC-B where those fields are 0 — cosmetically correct but could show UC-B-specific labels in a future pass
- `modelUpdate.episodeContext` text for UC-B references Roth adoption but panel layout is shared with UC-A; if a third use case is added, consider extracting this section to data

### Newly Found Anti-Patterns
- **Hardcoded use-case strings in panel components** — panels had UC-A strings (VIX, Bloomberg MCP, Episode #19) baked in. Pattern: all display strings in WorkflowRunner panels must come from `step.panelData` or `step.headline`. Never hardcode event-specific copy in a panel component.
- **Unsafe `.toLocaleString()` on possibly-undefined field** — `engagement.redistributionEndClients.toLocaleString()` crashes if the field is absent. Pattern: always use `(field ?? 0).toLocaleString()` for numeric fields from `panelData` that may vary by use case.
- **Button index instability in multi-button panels** — AdvisorTargetingPanel renders an "Edit configuration" toggle that shifts button DOM indices; selecting action buttons by index breaks. Pattern: always find action buttons by `textContent` match, never by DOM index.

### Anti-Pattern Scan
- Background color washes (`-0` / `-1`): **CLEAN**
- Hardcoded hex colors: **CLEAN**
- `toast.show()` / `notifications.show()`: **CLEAN**
- UC-A hardcoded strings in panels: **CLEAN** — all four panels now data-driven
- `undefined.toLocaleString()` crash paths: **CLEAN** — all `?? 0` guards in place
- Individual participant PII: **CLEAN** — all deployment/attribution data uses cohort IDs only

---

## Session 2 — Vanguard Brand Polish & Visual Inspection (v0.1.1-vanguard) — 2026-04-15

### Build Status
- `npm run build` — **PASSED** — 7,580 modules, 0 errors, built in 2.60s
- Bundle: 1,239 kB main chunk (gzip 350 kB) + 7 lazy-loaded page chunks (acceptable for demo SPA)

### Added
- Nothing new — polish/bug-fix session only

### Fixed

**Capital Group / KKR fund code purge**
- `src/pages/ContentEngine.jsx` — SYSTEM_PROMPT fund codes (CGDV/CGGR/CGCP/KKR) → Vanguard fund references (VTSAX/VTI/VTIVX/VBTLX/VWENX); "THE CAPITAL GROUP ANGLE" → "THE VANGUARD ANGLE"; CONTENT_ARTICLES entry 'KKR Alternatives: Portfolio Diversification Strategies' → 'Staying the Course: Target-Date Funds in Volatile Markets'; KKR channel reach / AUM attribution → Vanguard equivalents; model reference `gpt-4o` → `claude-sonnet-4-6`; dead code block `_FALLBACK_LEGACY` (21,298 chars / ~141 lines) deleted
- `src/pages/TrustCompliance.jsx` — CONTENT_CREDENTIALS: 'KKR Alternatives Brief' → 'SECURE 2.0 Roth Adoption — Advisor Brief'
- `src/pages/OutcomeAttribution.jsx` — TREATMENT_HOLDOUT episode 'KKR Launch' → 'Roth Adoption'; SHAPLEY_DATA 'Wholesaler Call' → 'Advisor Brief'; SectionHeader updated to leakage-reduction/rollover-retention framing
- `src/pages/QuantBridge.jsx` — PRIOR_HISTORY 'ep-003 (KKR Launch)' → 'ep-003 (Annual Contribution Limit)'; episodeNames updated; response curve chart fixed (field names were wrong: `advisorCount`/`portalEng`/`wholesalerEng` → `cohortSize`/`digitalEng`/`inAppEng`/`advisorEng` per Vanguard episodes.js schema)
- `src/pages/TwinEnrichment.jsx` — DECISION_LOG: 'Tag Michael Davidson as KKR prospect' → cohort-level Roth recommendation; 'Route Robert Chen to wholesaler channel' → 'Upgrade Marcus Ellison to Advisor Brief channel for SECURE 2.0 outreach'
- `src/pages/Operations.jsx` — APPROVAL_QUEUE: 'KKR Alternatives — Optimizer segment (212 advisors)' → 'Roth Adoption Nudge — Mid-Career Cohort (47,200 participants)'; 'Wholesaler' → 'Advisor Brief'; predicted outcomes → leakage-prevented framing
- `src/data/agents.js` — KKR references in recentDecisions replaced with Vanguard episode context; '847 advisors' → '284,000 participant cohort'; wholesaler → advisor-brief channel references
- `src/data/ontologyEntities.js` — `capitalGroupHoldings: ['CGDV','CGGR']` → `vanguardFunds: ['VTSAX','VBTLX']`; fund entity ticker/name/ER updated to VTSAX; episode entity fields updated to participantsTargeted/participantsEngaged/assetsRetained
- `src/components/workflow/AgentChatPanel.jsx` — all 8 agent system prompts: "Capital Group's Marketing OS" → "Vanguard's Fiduciary Intelligence Platform"
- `src/components/ui/PovCallout.jsx` — "Capital Group Today:" → "Vanguard Today:"
- `src/components/ui/UseCaseLauncher.jsx` — "Capital Group POV" badge → "Vanguard POV" with color "vanguardRed"
- `src/components/workflow/panels/DeploymentPanel.jsx` — CGDV reference → VTSAX/Vanguard Total Market; email from-address → vanguard.com domain

**Channel taxonomy migration (Capital Group wholesaler → Vanguard Advisor Brief)**
- `src/pages/EpisodeSimulator.jsx` — CHANNEL_DISPLAY_NAMES added (`{ email: 'Email', portal: 'Digital Journey', push: 'In-App', wholesaler: 'Advisor Brief' }`); responseCurveData mapping updated; SEGMENTS → Vanguard cohort names; OBJECTIVES → Vanguard outcomes (Maximise Leakage Reduction / Deferral Increase / Engagement Rate); sensitivityData 'Advisor Count' → 'Cohort Size', 'Avg AUM' → 'Avg Balance'; `avgAdvisorAUM: 45000000` → `avgAdvisorAUM: 9500`; `participantsTargeted` field used
- `src/pages/CampaignOrchestration.jsx` — Campaign 2 'KKR Alternatives Awareness' → 'Roth Adoption Nudge — Mid-Career Cohort'; CHANNEL_ICONS 'Wholesaler' → 'Advisor Brief'; DEPLOYMENT_SAMPLE 'Wholesaler' → 'Advisor Brief'; SectionHeader updated to ERISA channel framing
- `src/pages/AdvisorTwinRegistry.jsx` — `selectedAdvisor.aum` → `selectedAdvisor.totalPlanAUM`; label "AUM" → "Plan AUM"

**Runtime bug fixes (discovered during visual inspection)**
- `src/components/ui/SignalCard.jsx` — `signal.affectedAdvisorCount` → `signal.affectedCohortCount ?? signal.affectedAdvisorCount ?? 0`; "advisors" label → "participants" (was showing "undefined advisors" on all signal cards)
- `src/pages/EpisodeSimulator.jsx` — stale `useState('All Active RIAs')` → `useState(SEGMENTS[0])`; stale `useState('Maximise AUM Lift')` → `useState(OBJECTIVES[0])` (Select was showing empty value)

### Regressed
- [none detected]

### Watch List
- `interventions.js` exporting `leakageReduction`/`sponsorImpact` — verify all consuming display components handle both fields
- `funds.js` new field shape (qdiaEligible, targetDateSeries, useIn401k) — fund display components may need updates if funds are ever displayed outside of data files

### Newly Found Anti-Patterns
- **Wrong field name after data file swap** — after `signals.js` was re-skinned to use `affectedCohortCount`, `SignalCard.jsx` was still reading `affectedAdvisorCount` (undefined). Pattern: after any data file field rename, grep all consuming UI components for old field names before QA.
- **Stale `useState` initializer** — after constants (SEGMENTS, OBJECTIVES) are renamed, `useState('old-value')` becomes invalid and Select shows empty. Always use `useState(CONSTANT[0])` pattern for array-backed selects.

### Anti-Pattern Scan
- Background color washes (`-0` / `-1`): **CLEAN**
- Hardcoded hex colors: **CLEAN** (Vanguard brand red `#96151D` accepted)
- `toast.show()` / `notifications.show()`: **CLEAN**
- Capital Group / KKR fund codes: **CLEAN** — all purged
- Wholesaler channel label: **CLEAN** — all UI-facing labels read "Advisor Brief"
- Individual participant PII: **CLEAN** — all participant references are cohort-level
- `affectedAdvisorCount` (wrong field): **CLEAN** — fixed in SignalCard

---

## Session 1 — Vanguard Scaffold (v0.1.0-vanguard) — 2026-04-15

### Build Status
- `npm run build` — **PASSED** in Session 2 — 7,580 modules, 0 errors

### Added

**Theme & Brand (Task A + B)**
- `src/theme.js` — Vanguard red primary color `#96151D`, 10-shade `vanguardRed` Mantine color array, Vanguard gradient (`linear-gradient(90deg, #96151D, #D92B36, #bc2028)`), updated SECTION_COLORS for 8-rail nav spine
- `src/App.jsx` — Header: `TwinX_Black.svg` + "TwinX for Vanguard" (#96151D) + "Fiduciary Intelligence Platform" subtitle; Avatar: vanguardRed/V; navbar collapse bar Vanguard gradient

**Navigation (Task C)**
- `src/components/nav/WorkflowNav.jsx` — 8-rail Vanguard spine: SENSE / DECIDE / SIMULATE / GOVERN / DEPLOY / MEASURE / LEARN / OPERATE (replaces Capital Group 6-rail)
- `src/hooks/useWorkflowNav.js` — fallback bucket changed from `'deploy-learn'` to `'deploy'`
- `src/theme.js` — STAGE_TO_BUCKET now maps all 8 rails; WORKFLOW_BUCKET_ORDER updated to 7-bucket ordered list (OPERATE excluded — always-on separate)
- `src/App.jsx` — new routing cases for `decide`, `deploy`, `deploy-learn`, `measure`, `learn`, `operate`/`agents`

**Vanguard-Specific Agent Definitions (Task D)**
- `agents/erisa-fiduciary-auditor.md` — ERISA §404(a) prudent investor standard, QDIA, prohibited transaction gating; 12-item review checklist
- `agents/rollover-moment-validator.md` — validates rollover signals as reaction-based (plan events only), blocks predictive intent inference; 12-item checklist
- `agents/advice-education-boundary-auditor.md` — ensures no advice/education boundary leakage; compliance-scoped prompt library enforcement; 12-item checklist

**Vanguard Data Files (Task E)**
- `src/data/signals.js` — 15 Vanguard signals: VIX spike (sig-001), IG credit spreads (sig-002), yield curve inversion (sig-003), SECURE 2.0 catch-up age 60–63 (sig-004), auto-enrollment mandate (sig-005), DOL fiduciary rule (sig-006), IRS 2026 contribution limits (sig-007), Roth catch-up requirement (sig-008), plan termination batch (sig-009, `triggerType:'plan_event'`), age-59½ window (sig-010), force-out eligible (sig-011), leakage spike (sig-012), Roth adoption gap (sig-013), sponsor renewal risk (sig-014), digital engagement drop (sig-015)
- `src/data/episodes.js` — 5 Vanguard analog episodes: COVID Market Crash Mar-2020 (ep-001, $2.8B leakage prevented), SECURE 2.0 Catch-Up 2024 (ep-002, $280M deferral increase), Annual Contribution Limit Campaign Nov-2025 (ep-003, $620M), Plan Termination Rollover Q1-2026 (ep-004, $380M), Hardship Leakage Reduction COVID Analog (ep-005, $420M). Each episode includes doNothingBaseline (required), response curves per channel (digitalJourney/email/inApp/advisorBrief), P5/P50/P95, keyLearnings
- `src/data/participants.js` — 8 Participant Twin cohort objects (NOT individual records): Near-Retirement High-Saver, Mid-Career Reactive Trader, Early Career Low-Saver, Roth Adoption Gap, Hardship-Risk Mid-Income, Plan Termination Rollover-Eligible, Age-59½ In-Service Window, Auto-Enrolled Passive Participant. Each has needStateVector (summing to 1.0), behaviorSignals, leakageRisk, adviceEligible, rolloverMomentActive
- `src/data/sponsors.js` — 8 Sponsor Twin objects: Midwest Manufacturing (Large, plan-001), SciTech Solutions (Large, plan-002), Community Health (Large/healthcare, plan-003), Clearwater Financial (Mid-Market, plan-004), Regional Retail Holdings (Mid-Market, plan-005, High churnRisk), Pacific Logistics (Small, plan-006), University Medical (Large/education-healthcare, plan-007), First National Properties (Small/SIMPLE IRA, plan-008)
- `src/data/advisors.js` — 5 Route 1 external advisor twins (sponsor-level only, no individual participant data): Jennifer Marchetti CFP CIMA (Advisor Alpha, 14 sponsors, $142M AUM), Marcus Ellison ERPA QPA (Advisor Alpha, 28 sponsors, ERISA specialist), Sarah Chen CFP CFA (Advisor Alpha, 19 sponsors, large plans), Robert Hendricks CFP AIF (Advisor Alpha, 31 sponsors, healthcare), Angela Torres CPFA QKA (Institutional, 42 sponsors, small business). Each has needStateVector, interventionHistory at plan/sponsor level
- `src/data/usecases.js` — 5 Vanguard seed use cases: UC-A (Volatility Response, full WorkflowRunner panelData — signal_detection → advisor_targeting → content_channel_config → content_generation → compliance → simulation → human_approval → deployment → attribution), UC-B (Roth Adoption Nudge, placeholder steps), UC-C (Hardship Leakage Reduction, placeholder steps), UC-D (Rollover Moment Response, placeholder steps with ERISA Fiduciary Auditor gate), UC-E (Sponsor Renewal Enablement, placeholder steps)
- `src/data/interventions.js` — 30 cohort-level intervention records across all 5 episodes. Channels: digitalJourney/email/inApp/advisorBrief. ~5% holdout rate. Outcome metrics: actualLeakageReduction, sponsorImpact. No individual participant data
- `src/data/funds.js` — 17 Vanguard funds: Target Retirement 2045/2030/2060/Income (QDIA-eligible, 0.08% ER), VTSAX/VFIAX/VOO/VTI (US equity index), VTIAX/VXUS (international), VBTLX/VBILX/VFIJX (fixed income), VASIX (stable value proxy), VWENX/VHCAX/VPMCX (active). Each has expenseRatio, performance, qdiaEligible, planAdoptionPct, useIn401k, managerType
- `src/components/workflow/panels/ContentGenerationPanel.jsx` — complete Capital Group → Vanguard re-skin: VanguardHeader replaces CapitalGroupHeader, all #018AC0 → #96151D, Capital Group/Capital Ideas → Vanguard/Vanguard Insights, PM attributions → Fran Kinniry CFA / Vanguard ISG, fund reference → VTSAX/VTI, email domains capitalgroup.com → vanguard.com

**Product Context Docs (Tasks F + G)**
- `docs/product-context/data-contracts.md` — Vanguard entity shapes: Participant Twin (cohort-level, ERISA constraints), Sponsor Twin, Plan, Signal, Episode (doNothingBaseline required), Rollover Moment Signal (triggerType:'plan_event' required), Hypothesis/Use Case, Intervention Record; fiduciary field-level constraints documented per entity
- `docs/product-context/platform-overview.md` — Rewritten for Vanguard identity: three Routes, 8-rail nav, 8-agent system, fiduciary discipline constraints table, key file locations
- `docs/product-context/module-capabilities.md` — Updated to Vanguard 8-rail module registry: SENSE/DECIDE/SIMULATE/GOVERN/DEPLOY/MEASURE/LEARN/OPERATE, WorkflowRunner panel types table, data files registry

### Fixed
- Capital Group identity removed from all re-skinned files
- `useWorkflowNav.js` fallback bucket corrected from `'deploy-learn'` to `'deploy'`
- Advisor twin `interventionHistory` updated to sponsor/plan-level impact (removed Capital Group-era individual advisor records)

### Regressed
- [none detected — build verification pending Task I]

### Watch List
- Import compatibility: `usecases.js` changed export shape significantly — components referencing Capital Group-specific fields (advisorId in panelData, AUM metrics) may need adapter updates during Task J visual inspection
- `interventions.js` now exports `leakageReduction`/`sponsorImpact` instead of `actualAUMImpact` — verify all consuming components handle both field names or are updated
- `funds.js` field shape changed from Capital Group ETF structure to Vanguard fund shape — verify fund display components handle `qdiaEligible`, `targetDateSeries`, `useIn401k` fields

### Newly Found Anti-Patterns
- **Fiduciary anti-pattern: advice-adjacent language in education content** — two email variants in UC-A content_generation auto-corrected for near-advice phrasing ("consider increasing your deferral rate to capture the full employer match before markets recover" → education-classified equivalent). CLAUDE.md updated.
- **Rollover signal without `triggerType`** — all three rollover signals (sig-009, sig-010, sig-011) explicitly include `triggerType: 'plan_event'`. Any signal of `type: 'rollover'` without this field must be blocked.

### Anti-Pattern Scan
- Background color washes (`-0` / `-1`): **CLEAN** (data files only, no UI changes this session)
- Hardcoded hex colors: **CLEAN** (VanguardHeader uses `#96151D` — accepted for brand enforcement)
- `toast.show()` / `notifications.show()`: **N/A** (no UI changes this session)
- Placeholder copy: **CLEAN** (all data files contain realistic Vanguard content)
- Capital Group references: **CLEAN** in all modified files
- Individual participant PII: **CLEAN** — all participant data uses cohortId/cohortSize only

---

## Session 2 — TwinX Capital Group POV Demo Build (v0.2.0) — 2026-04-05

### Build Status
- `npm run build` — PASSED — 7556 modules, 0 errors, 0 warnings (except benign Mantine `use client` directives and expected bundle-size advisory for demo SPA)
- Bundle delta: +966.87 kB main chunk (gzip: 275.24 kB) + 7 lazy-loaded page chunks

### Added
- `docs/UX_UI_STANDARDS.md` — canonical prescriptive Mantine 8 + React UI/UX reference (572 lines)
- `src/utils/format.js` — fmtPct, fmtM, fmtB, fmtK, fmtConf, fmtRelTime, fmtDate formatting utilities
- `src/data/` — 7 mock data files: advisors (20), funds (35), signals (15), episodes (5), agents (8), interventions (30), ontologyEntities
- `src/simulation/` — monteCarlo.js (Box-Muller, 1000-iteration), responseCurves.js (S-curve per channel), needState.js (5-job scoring)
- `src/theme.js` — expanded with SECTION_COLORS, TWINX_GRADIENT, MOD_COLORS
- `src/components/ui/` — 9 shared UI components: KpiCard, SectionHeader, PovCallout, SignalCard, AdvisorTwinCard, AgentStatusCard, InterventionCard, TrustRailBadge, SimResultPanel
- `src/App.jsx` — complete redesign: AppShell + collapsible Navbar (70px/240px) + 11-item nav (6 sections: SENSE, SIMULATE, RESPOND, LEARN, GOVERN, AGENTS) + page routing via useState + cross-module selectedEpisode/selectedAdvisor state
- `src/pages/MarketSignals.jsx` — signal feed with type filter/search, episode detail stepper + response curve preview, intervention queue panel, PovCallout
- `src/pages/AdvisorTwinRegistry.jsx` — 4-filter panel, SimpleGrid card layout, 480px right Drawer with need-state vectors, engagement sparkline, intervention history, recommended action card, ontology accordion
- `src/pages/EpisodeSimulator.jsx` — config panel with channel mix sliders (sum validation), Monte Carlo runner, Transition-faded results with distribution AreaChart, ranked scenarios Table, sensitivity BarChart, PovCallout
- `src/pages/AgentConsole.jsx` — 8-agent grid, click-to-filter activity feed, MCP connectors Table, five-rail trust pipeline, agent identity management
- `src/pages/QuantBridge.jsx` — realistic placeholder with Bayesian params table, response curve tabs, prior borrowing history
- `src/pages/ContentEngine.jsx` — realistic placeholder with 5-stage stepper, 6 Capital Ideas articles with compliance scores, AI generation log
- `src/pages/CampaignOrchestration.jsx` — realistic placeholder with 2 active campaigns, multi-touch timelines, RL badge, deployment table
- `src/pages/OutcomeAttribution.jsx` — realistic placeholder with Shapley BarChart, treatment vs holdout chart, always-on holdout Alert
- `src/pages/TwinEnrichment.jsx` — realistic placeholder with model accuracy LineChart, twin dimension completeness, decision capture log
- `src/pages/TrustCompliance.jsx` — realistic placeholder with 5 trust rail Cards, content credentials table, SEC/FINRA export button
- `src/pages/Operations.jsx` — realistic placeholder with 5 LangGraph pattern cards, approval queue, system health KPIs

### Fixed
- All placeholder panels replaced with content-rich implementations
- App.jsx redesigned from Tabs layout to AppShell + collapsible Navbar

### Regressed
- [none]

### Watch List
- Main JS bundle (966 kB / 275 kB gzip) — acceptable for demo SPA, no lazy split needed within timeline
- Five-rail trust pipeline Rail 4 shows `warn` status (intentional — demonstrates real monitoring)

### Newly Found
- [none]

### Anti-Pattern Scan
- Background color washes (`-0` / `-1`): **CLEAN**
- Hardcoded hex colors: **CLEAN**
- `toast.show()` / `notifications.show()`: **CLEAN** (ToastContext internal use only — not a violation)
- Placeholder copy ("This module will be built"): **CLEAN**
- `sx` prop: **CLEAN**
- `module.css` files: **CLEAN**

---

## Session 1 — Project Scaffolding (v0.1.0) — 2026-04-06

### Build Status
- Initial scaffolding — build verification pending `npm install`

### Added
- Project scaffolding with React 18 + Mantine 8 + Vite tech stack
- 20 specialist agent definitions in `agents/`
- Knowledge docs: traceability matrix, trust regression checklist, explainability spec, analytics metric contract, UX dead-end prevention, optimization objectives spec, product context
- Product context docs: CHANGELOG, platform overview, data contracts, module capabilities
- Root config files: package.json, vite.config.js, Dockerfile, nginx.conf, firebase.json
- Minimal src/ scaffold: App.jsx, main.jsx, theme.js, ToastContext, AuthContext
- CLAUDE.md with full agent invocation trigger table and anti-pattern registry

### Fixed
- [none — initial scaffolding]

### Regressed
- [none — initial scaffolding]

### Watch List
- [none — initial scaffolding]

### Newly Found
- [none — initial scaffolding]

### Anti-Pattern Scan
- Background color washes (`-0` / `-1`): **CLEAN**
- `toast.show()`: **CLEAN** — toast helper pattern used
- Hardcoded currency symbols: **CLEAN**

---

## Anti-Pattern Registry

| Pattern | Wrong | Correct | First found |
|---|---|---|---|
| Background color washes | `var(--mantine-color-X-0)` or `-1` | `var(--mantine-color-X-light)` | S1 (inherited) |
| Neutral hover bg | `transparent` / hardcoded hex | `var(--mantine-color-default-hover)` | S1 (inherited) |
| Toast notifications | `toast.show({...})` | `toast(msg, color, title)` | S1 (inherited) |
<!-- Add new anti-patterns as discovered -->
