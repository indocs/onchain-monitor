# Security Notes (Incremental)

- Gas-focused optimizations should not alter access control or permission checks.
- Any added helpers or utilities should be marked as view/pure where possible to avoid side effects.
- Ensure that new code paths cannot enable reentrancy or leverage subtle state changes under different conditions.
- When introducing new public/external functions (even read-only), consider audit implications and keep interfaces minimal.
