# Gas optimization ideas for OnchainMonitor

This document outlines small, incremental changes to improve gas efficiency in the OnchainMonitor project without altering external behavior.

Summary of suggested changes (low-risk, small scope):

- Use events to batch-describe state changes instead of repeated reads by off-chain clients where possible.
- Prefer immutable or constant values where appropriate to reduce storage reads.
- Minimize storage writes by coalescing updates and validating input before state mutation.
- Add a lightweight owner-controlled parameter setter to allow tuning thresholds without redeploying.

Proposed concrete, implementable steps (in priority order):

1) Add a small owner-only setter for a tunable parameter (e.g., a gas threshold or monitoring window).
- Rationale: Allows tuning without redeploying and can be gated behind existing Ownable, avoiding further contract logic changes.
- Validation: If the parameter is not critical to public behavior, make the setter onlyOwner and emit an event with old/new values.

2) Emit concise events for major state changes instead of multiple storage reads for off-chain consumers.
- Rationale: Events are cheaper for clients to index and reduce on-chain gas used by read-heavy operations.
- Validation: Ensure existing logic still emits the same essential events; add new event(s) for newly exposed state changes.

3) Review and minimize storage writes in critical paths.
- Rationale: Gas cost heavily depends on storage writes. Where possible, batch updates or compute derived values off-chain.
- Validation: Careful to preserve on-chain semantics and security guarantees.

4) Document usage patterns for gas-aware operations.
- Rationale: Clear guidance helps developers build gas-efficient integrations and avoids anti-patterns.

Notes and caveats:
- Changes should be incremental and backward compatible where possible.
- Any new storage variables should be initialized with sensible defaults to avoid unexpected behavior.
- Prefer read-only (view/pure) functions where possible to enable cheap off-chain checks.

If you’d like, I can implement the first concrete change (a gas-threshold setter) directly in Solidity and add a matching event, along with a small test and deployment note.