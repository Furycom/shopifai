# Blocker Consolidation

## Purpose

This document consolidates the current import blockers and points to canonical reports without deleting or rewriting historical records.

## Canonical Reports (Preserved)

1. Dawn import blocker report:
   - `docs/dawn-import-blocker-report.md`
2. Motion baseline blocker report:
   - `MOTION_BLOCKER_REPORT.md`

## Current Effective Blocker

- **Primary blocker:** environment-level outbound proxy/network restrictions (HTTP 403 via CONNECT tunnel) on common Dawn acquisition routes.
- **Result:** official Dawn source cannot be fetched from public network endpoints in this environment.

## Local Source Audit Outcome (Current)

No usable Dawn/theme source was found in accessible local locations after scanning:

- `/workspace/shopifai` (current repository)
- parent paths under `/workspace`
- `/opt`
- `/tmp`
- additional reachable roots (`/home`, `/mnt`, `/srv`, and shallow `/` checks)
- local archives (`.zip`, `.tar`, `.tar.gz`, `.tgz`) within practical depth
- candidate git repositories/mirrors with Dawn/Shopify naming

## Unblock Requirement

At least one of the following must be made available:

1. Approved network access to official Dawn source endpoints; or
2. Official Dawn archive placed locally in this environment; or
3. Reachable internal mirror containing official Dawn source.

Once one source becomes accessible, import can proceed immediately.
