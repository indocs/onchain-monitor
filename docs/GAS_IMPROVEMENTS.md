# Gas Improvements (Incremental)

This document captures small, safe changes that reduce gas usage without altering contract behavior.

- Prefer view/pure helpers to avoid unnecessary state reads.
- Cache frequently used calculations in local variables to minimize repeated calculations within a transaction.
- Use calldata for function parameters when possible in external/public entry points to save gas on parameter handling.
- Minimize storage reads by aggregating data into memory when computed values are derived from multiple reads.

Note: All changes are designed to be backward compatible and non-breaking for existing deployments.
