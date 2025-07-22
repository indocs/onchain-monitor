# Security Notes (Incremental Update)

- Ensure that any new admin-only actions use the existing Ownable/onlyOwner pattern to avoid privilege escalation.
- Avoid adding funds-receiving fallback logic unless strictly required; if added, implement access controls and explicit withdrawal paths.
- When introducing new events, index addresses where appropriate to facilitate off-chain monitoring without leaking sensitive data.

This document intentionally avoids changing runtime behavior and focuses on best practices for future enhancements.