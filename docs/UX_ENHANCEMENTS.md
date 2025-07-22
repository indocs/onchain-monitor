# Onchain Monitor UX Enhancements

This document outlines small, non-breaking enhancements and recommended follow-ups for the Onchain Monitor project.

- Add lightweight owner-only audit hooks in future iterations (no contract changes needed for now).
- Consider exposing a read-only status endpoint for off-chain tooling via a dedicated script or CLI utility.
- Keep tests green by avoiding changes to public interfaces; any new features should be opt-in via new functions.

Note: This file is strictly informational and does not affect contract behavior or deployment.
