# Supply OS for Kroger — UC1 & UC2 Demo Script

**Duration:** 12–15 minutes  
**Audience:** Supply chain stakeholders, planners, DC/store operations  
**Platform:** Supply OS for Kroger (TwinX)

---

## Opening (1 min)

> "Today I'm showing you two core scenarios that Supply OS handles: **Store Service Risk** and **Inventory Imbalance**. These are the kinds of decisions that currently take planners hours to work through manually. TwinX does it in minutes—sensing the problem, simulating recovery options, and showing you the tradeoffs so you can decide with confidence."

*[Point to the home screen with Live Signals]*

> "You can see we have five live signals running across Kroger's network right now. Today we're focusing on the first two: Store Service Risk and Inventory Imbalance."

---

## **UC1: Store Service Risk — At-Risk Replenishment Orders** (6 min)

### **Setup (30 sec)**

> "Let's start with UC1: Store Service Risk. This happens when we have replenishment orders at risk of missing service windows. Maybe a supplier is delayed, a DC is constrained, or demand spiked unexpectedly. We need to act fast—within 24 to 72 hours—or stores go out of stock."

*[Click on "Store Service Risk — At-Risk Replenishment Orders" in the signals list]*

---

### **Screen 1: Signal Analysis (1 min)**

*[Navigate to signal analysis screen]*

> "**Screen 1: Signal Analysis.** Market Sentinel has already ingested data from our OMS, POS, WMS, and inventory ledger. Here's what it detected:"

*[Point to the key metrics]*

- **126 stores/SKU-location combinations** are at risk
- **Severity: HIGH** — 87% confidence
- **Response window: 24–72 hours** — tight but doable
- **5 historical precedents matched** — so we've seen similar situations before

> "Notice the **precedents panel**: previous episodes like supplier delays, DC capacity constraints, and promo spikes. These give us a playbook. In March, we faced a promo-driven spike and recovered with MEIO rebalance + selective expedite. That's our baseline."

*[Point to conditions list]*

> "The core issue: store inventory cover is below threshold, replenishment ETAs are outside the service window, but we do have inventory elsewhere in the network that could help if we move it."

---

### **Screen 2: Objectives & KPIs (1 min)**

*[Advance to objectives screen]*

> "**Screen 2: Objectives & KPIs.** The planner confirms: what matters most? We see six levers:"
> 1. **Protect store service** — in-stock is paramount
> 2. **Minimize premium freight** — avoid expensive expedite
> 3. **Minimize total cost-to-serve** — efficiency matters
> 4. **Maximize inventory efficiency** — don't hoard stock
> 5. **Minimize waste/markdown** — especially for fresh
> 6. **Improve recovery time** — get back to normal fast

> "For this scenario, the planner weights them equally and hits 'Recommended'—meaning TwinX will simulate recovery actions optimized across all six."

---

### **Screen 3: Simulation Levers (1 min)**

*[Advance to simulation levers screen]*

> "**Screen 3: Simulation Levers.** Now we define what recovery actions we're willing to take. TwinX gives us seven knobs:"

*[Point to each lever]*

- **MEIO Rebalance** — move inventory from DC to at-risk stores (capital-efficient, slowest)
- **Priority Allocation** — boost inventory assigned to at-risk stores from supplier replenishment
- **Reroute** — send in-transit inventory to different destinations
- **Allocation Resequencing** — reorder replenishment schedule to hit service windows first
- **Premium Freight / Expedite** — air ship or overnight (fast, expensive)
- **Demand Smoothing** — negotiate with stores to defer non-urgent orders
- **Reserve Commitment** — tap Kroger's strategic inventory reserves

> "The planner says: 'We want to try MEIO first, then priority allocation, then selective expedite only if we have to. We're holding back on demand smoothing—stores won't like that.' TwinX records these preferences."

---

### **Screen 4: Simulation Summary (1 min)**

*[Advance to simulation summary]*

> "**Screen 4: Simulation Summary.** TwinX ran 1,000 Monte Carlo iterations with these lever settings. Here's what the simulation tells us:"

*[Point to scenario table]*

**Scenario A: MEIO + Priority Allocation (Recommended)**
- Service attainment: 98.2%
- Premium freight: $140K
- Recovery time: 48 hours
- Confidence: 89%

**Scenario B: MEIO + Priority + Selective Expedite**
- Service attainment: 99.7%
- Premium freight: $420K (3× cost)
- Recovery time: 28 hours
- Confidence: 92%

**Scenario C: Expedite Everything**
- Service attainment: 99.9%
- Premium freight: $890K (6× cost)
- Recovery time: 12 hours
- Confidence: 88%

> "Notice the tradeoff: Scenario A gets us to 98% service with moderate cost. Scenario B buys us 1.5% more service for $280K extra. Scenario C is the nuclear option—overkill for this scenario."

> "TwinX recommends A because it hits the 98% service floor with the best cost efficiency."

---

### **Screen 5: Optimization Results (1 min)**

*[Advance to optimization results]*

> "**Screen 5: Optimization Results.** TwinX shows the specific actions: which stores get priority, which SKUs, which DCs send inventory, which routes, and when."

*[Point to the action table]*

- **Denver DC** → 8 at-risk stores (MEIO + priority allocation)
- **Atlanta DC** → reroute 3 in-transit orders from secondary stores
- **Chicago DC** → increase replenishment frequency for 12 SKUs
- **Premium freight:** Only 2 SKUs air-shipped (high-value, high-margin items)

> "This is the actual execution plan. Planners can copy this into their systems or adjust if they see something we missed."

---

### **Screen 6 & 7: Approval, Execution, Learning (transition)**

> "Screens 6 and 7 are approval and outcome tracking. Once approved, these actions go into the activation layer—DCs see the new allocation, TMS sees the reroute, stores see the updated ETA. Then we measure: did we hit 98% service? How much premium freight did we actually spend? What happened to inventory levels? That feeds back into our model for next time."

---

## **UC2: Inventory Imbalance — Excess Upstream, Shortage Downstream** (5 min)

### **Setup (30 sec)**

> "UC2 is different from UC1. Instead of an emergency service risk, we're looking at a structural problem: **excess inventory sitting upstream** (DCs or regional hubs) while **stores downstream are under-stocked**. This ties up capital, creates waste risk for aging inventory, and misses sales opportunities."

*[Click on "Inventory Imbalance — Excess Upstream, Shortage Downstream"]*

---

### **Screen 1: Signal Analysis (45 sec)**

*[Navigate to signal analysis screen]*

> "**Screen 1: Signal Analysis.** Market Sentinel analyzed our network inventory state across 200+ stores and 5 DCs. The findings:"

*[Point to key metrics]*

- **$28M excess inventory upstream** (DCs, regional hubs, too much safety stock)
- **$12M shortage exposure downstream** (stores under minimum stock levels)
- **Severity: MEDIUM-HIGH** — 84% confidence
- **Response window: 48–72 hours rebalance** — we have breathing room
- **3 MEIO precedents matched** — these worked well before

> "The signal: demand has shifted. We over-forecasted cold-weather inventory, now we're under-positioned for spring items. Instead of waiting for natural depletion, we can rebalance proactively."

---

### **Screen 2: Objectives & KPIs (45 sec)**

*[Advance to objectives screen]*

> "**Screen 2: Objectives & KPIs.** The supply chain lead confirms priorities:"
> - **Reduce excess upstream** — free up capital and reduce waste risk
> - **Protect store service** — don't create shortages by moving too fast
> - **Minimize rebalance cost** — transportation is expensive
> - **Maximize inventory turns** — get products flowing through the network
> - **Release working capital** — this ties up $28M we could use elsewhere

> "This is a capital efficiency play as much as a service play."

---

### **Screen 3: Simulation Levers (1 min)**

*[Advance to simulation levers screen]*

> "**Screen 3: Simulation Levers.** MEIO rebalancing gives us **25 levers**—much more granular than emergency service recovery. We can:"

*[Point to key levers]*

- **Set rebalance velocity** — how fast do we move inventory? (conservative to aggressive)
- **Define surplus thresholds** — what's "excess"? (tie to safety stock levels)
- **Set shortage criteria** — when is a store under-stocked? (hard limits vs. demand forecast)
- **DC-to-store routing rules** — which DCs supply which stores?
- **SKU-level policies** — fresh vs. dry, high-velocity vs. slow-movers treated differently
- **Cost constraints** — cap the transportation spend
- **Holdback policies** — reserve inventory for known upcoming demand

> "The supply chain lead says: 'Move aggressively on excess inventory—we need that $28M freed up. But protect all store minimums—we're not going below a 5-day supply. Use a mixed transportation policy: consolidate shipments where we can, but expedite for critical SKUs.'"

---

### **Screen 4: Simulation Summary (1 min)**

*[Advance to simulation summary]*

> "**Screen 4: Simulation Summary.** TwinX simulated three MEIO strategies:"

*[Point to scenario comparison]*

**Scenario A: Conservative Rebalance (Recommended)**
- Excess upstream released: $18M (64%)
- Rebalance cost: $240K
- Store service floor maintained: ✓ (all stores ≥5-day supply)
- Days inventory reduction: 3.2 days
- Confidence: 88%

**Scenario B: Aggressive Rebalance**
- Excess upstream released: $26M (93%)
- Rebalance cost: $580K
- Store service floor: some stores drop to 4-day supply
- Days inventory reduction: 5.8 days
- Confidence: 81%

**Scenario C: Targeted Rebalance**
- Excess upstream released: $22M (79%)
- Rebalance cost: $310K
- Store service floor maintained: ✓
- Days inventory reduction: 4.1 days
- Confidence: 85%

> "Scenario A is recommended because it releases capital safely without creating new risks. Scenario B is tempting—93% excess released!—but four days of inventory is too thin for supply volatility. Scenario C is a middle ground."

---

### **Screen 5: Optimization Results (1 min)**

*[Advance to optimization results]*

> "**Screen 5: Optimization Results.** Here's the specific rebalancing plan:"

*[Point to rebalance table]*

- **Dallas DC** → move $5.2M cold-weather excess to regional hubs and 24 stores
- **Memphis DC** → move $3.8M to 31 stores across Southeast
- **LA DC** → shift $4.1M from slow-moving seasonal SKUs to fast-movers for West Coast stores
- **Chicago Regional Hub** → consolidate $2.8M from three DCs, redistribute to Midwest stores
- **NYC Regional Hub** → reduce holding by $2.1M, trigger vendor return for 8 slow-moving SKUs

> "And the transportation plan: consolidate truckloads where possible (cost savings), LTL for urgent shortage zones, 2–3 week rollout so DCs don't get overloaded."

---

### **Screen 6 & 7: Approval, Execution, Learning (transition)**

> "Once approved, these rebalance orders feed into the TMS and WMS. DCs prioritize these shipments, stores receive the extra stock, and the excess in DCs drops. We then measure: did we actually release $18M? Did any stores dip below the 5-day minimum? How accurate was the forecast? That outcome data improves our rebalancing model for next time."

---

## **Closing (1 min)**

> "These two scenarios show TwinX's core strength: **sense-simulate-select-execute-learn**."
>
> **UC1 (Service Risk)** is about **speed** — sense the emergency, simulate recovery in minutes, execute before stores stockout.
>
> **UC2 (Inventory Imbalance)** is about **efficiency** — sense the structural imbalance, simulate rebalancing scenarios with detailed cost/service tradeoffs, execute the best one, and measure the outcome.
>
> "In both cases, TwinX removes the manual guesswork. Planners used to spend 4–8 hours per scenario, building spreadsheets, calling DCs, negotiating. Now it's 20 minutes from signal to approved action plan. And the confidence intervals mean you know the risks upfront."

> "Questions?"

---

## Key Talking Points (for Q&A)

**Q: How often do these signals fire?**  
A: Daily. Store Service Risk fires when replenishment orders are at risk (maybe 2–3 times a week at scale). Inventory Imbalance is checked weekly or triggered by demand shifts.

**Q: What if the simulation is wrong?**  
A: Confidence intervals tell you the range. If we say 98% service ±2%, that's our P5-to-P95 range from 1,000 iterations. And we measure actual outcomes vs. forecast—that feedback loop tightens the model over time.

**Q: Can planners override the recommendation?**  
A: Absolutely. They approve before execution. If they think Scenario B is better for business reasons we didn't capture, they choose B. TwinX learns from that too.

**Q: What data feeds TwinX?**  
A: OMS, POS, WMS, inventory ledger, inbound shipment ETA, demand forecast, transport cost tables, and historical rebalance outcomes. All live feeds.

**Q: How do you handle supplier constraints or carrier availability?**  
A: Those are constraints in the simulation. If a supplier can only provide 50 units/week, that's a hard limit. If TMS has capacity constraints, those are baked in. We're not recommending impossible actions.

---

## Screen Navigation Cheat Sheet

| Use Case | Screens | Key Metrics |
|----------|---------|-------------|
| **UC1: Service Risk** | 7 screens: Signal → Objectives → Levers → Summary → Results → Approval → Learn | Service %, premium freight $, TTR hours |
| **UC2: Inventory Imbalance** | 7 screens: Signal → Objectives → Levers → Summary → Results → Approval → Learn | Excess released $, rebalance cost $, days inventory, store service floor |

---

## Timing Guide

| Segment | Time |
|---------|------|
| Opening | 1 min |
| UC1: Setup + Screens 1–5 | 6 min |
| UC2: Setup + Screens 1–5 | 5 min |
| Closing + Buffer for Questions | 2–3 min |
| **Total** | **14–15 min** |

*Adjust by skipping deep dives into specific screens if time is short.*

---

## Visual Aids (if presenting on screen)

1. **Home dashboard** — show live signals, explain UC1 & UC2 as the first two
2. **UC1 Signal Analysis** — highlight 126 stores at risk, 87% confidence
3. **UC1 Simulation Summary** — emphasize the cost vs. service tradeoff
4. **UC2 Signal Analysis** — show $28M excess upstream, $12M shortage downstream
5. **UC2 Optimization Results** — drill into specific DC-to-store moves
6. **Closing slide** — "Sense-Simulate-Select-Execute-Learn" cycle diagram

---

## Post-Demo Actions

- Provide stakeholders with a **video recording** of this walkthrough
- Share the **demo data values** (126 stores, $28M excess, etc.) so they can reference them
- Offer a **hands-on trial** where planners run their own scenarios
- Set up a **feedback session** to gather requirements for UC3–UC5 and custom MEIO policies
