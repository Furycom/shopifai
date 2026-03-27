# Dawn-Based Implementation Prep Plan

Date (UTC): 2026-03-27
Status: Ready for execution once official Dawn source is locally available.

## 1) Intended Project Architecture (Post-Import)

After Dawn is present at repository root, keep Dawn's standard Shopify theme structure and layer customization in a maintainable way:

- `layout/`
  - preserve `theme.liquid` as global shell and script/style entrypoint.
- `templates/`
  - JSON templates remain modular and section-driven.
- `sections/`
  - primary location for premium UI composition and merchant-configurable layout options.
- `snippets/`
  - shared micro-components (badges, cards, icon wrappers, motion helpers).
- `assets/`
  - non-blocking CSS/JS for premium visuals, interactions, and performance-safe animation utilities.
- `config/`
  - Theme Editor schema and settings metadata.
- `locales/`
  - all customer-facing strings localized; avoid hardcoded text in Liquid when translatable.

## 2) Dawn Files Likely Targeted First

Initial pass should focus on highest leverage Dawn surfaces (exact filenames to confirm against imported Dawn version):

1. Global shell and assets:
   - `layout/theme.liquid`
   - core CSS/JS entry assets in `assets/`
2. Homepage/collection PDP building blocks:
   - hero/banner section(s)
   - featured collection/product card sections/snippets
3. Conversion-critical sections:
   - announcement bar, header, cart drawer/cart notification, product form/add-to-cart areas
4. Theme settings:
   - `config/settings_schema.json`
   - `config/settings_data.json` handling strategy (merchant-owned values remain data-driven)

## 3) Premium Customization Priorities

Priority order once Dawn exists:

1. **Brand system foundation**
   - typography scale, color tokens, spacing rhythm, radii/shadows, button/input states.
2. **High-ROI commerce surfaces**
   - product cards, PDP media/info hierarchy, trust and urgency UI patterns.
3. **Homepage storytelling**
   - richer hero/media modules, editorial blocks, curated collection narratives.
4. **Cart and conversion flow polish**
   - clearer feedback states, improved drawer ergonomics, confidence messaging.

## 4) Advanced Visual + Motion Priorities

Implement tasteful, performance-aware motion:

- section reveal transitions with reduced-motion fallbacks.
- hover/press micro-interactions for product cards and CTAs.
- media transitions (fade/scale/parallax-lite only when GPU-friendly).
- cart and notification state transitions with strict duration/easing standards.
- no animation that blocks interaction or degrades Core Web Vitals.

## 5) Theme Editor Configurability (Must Remain Configurable)

Keep merchant control in schema/settings for:

- color themes and contrast-safe variants.
- typography choices where Dawn already allows flexible control.
- section spacing/density and content alignment.
- hero/collection content ordering and visibility toggles.
- promotional text, badges, and trust copy.
- motion intensity toggle (including reduced/no-motion option).

## 6) What Must Not Be Hardcoded

Avoid hardcoding:

- brand copy that should be locale-driven.
- merchandising content (product IDs/collection handles) unless explicitly intentional.
- visual tokens that belong in shared CSS variables/settings.
- section behaviors that should be merchant-toggleable.
- region/language-specific strings outside locale files.

## 7) Proposed Phased Execution Order (When Dawn Is Available)

### Phase 0 — Baseline import and validation
- Import official Dawn into repository root.
- Validate canonical folder structure and theme check baseline.
- Confirm no fake/partial scaffolding is mixed in.

### Phase 1 — Foundation
- Establish design tokens and global style foundations.
- Implement base component polish (buttons, forms, cards, badges).

### Phase 2 — Core commerce templates and sections
- Upgrade homepage sections and collection/product card UX.
- Refine PDP structure and conversion signals.

### Phase 3 — Cart, navigation, and micro-interactions
- Improve header/nav/cart flows.
- Add accessible, performance-safe motion.

### Phase 4 — Merchant controls and hardening
- Expand schema settings for key customizations.
- QA across template permutations and locale/settings combinations.

### Phase 5 — Performance/accessibility release gate
- Validate Lighthouse/theme-check/accessibility basics.
- Finalize regression checklist before deployment.

## 8) Execution Readiness Checklist

Before coding starts, require:

- official Dawn source available locally in this environment.
- explicit confirmation of desired visual direction (luxury/minimal/editorial, etc.).
- prioritized page/section list from business goals.
- acceptance criteria for performance and accessibility thresholds.
