# Changelog

All notable changes to this project will be documented in this file.

## [1.0.3] - 2026-02-05

## Fixed

- Fixed bundling Shiki worker (#190 by @lindsayzhng)

## [1.0.2] - 2026-01-30

### Added

- Added anchor link support to Steps component with `id` and `noAnchor` props (#187)
- Added `side` and `align` props to Tooltip component for positioning control (#181 by @shadabiiitnr20)

### Fixed

- Fixed `isMounted` check for View component (#186)
- Fixed Mermaid duplicated IDs and gantt chart default sizing (#183)

### Changed

- Updated internal props for Accordion and Card components (#185)
- Prefer canonical Tailwind classes (#178 by @0xa3k5)

## [1.0.1] - 2025-01-26

### Fixed

- Fixed CSS bundling by adding `@tailwindcss/cli` dependency (#174)
- Fixed code block header truncation (#173)
- Fixed type exports and disabled default `rollupTypes` (#176)

### Changed

- Updated README with style override instructions (#175)
- Updated `lodash` from 4.17.21 to 4.17.23 (#171)

## [1.0.0] - 2025-01-23

### Initialized components library

| Component | Description |
|-----------|-------------|
| `Accordion` | Expandable content sections |
| `Badge` | Status and label badges |
| `Callout` | Highlighted information boxes |
| `Card` | Content cards |
| `CodeBlock` | Syntax-highlighted code with copy button |
| `CodeGroup` | Code blocks container with tabs or dropdown selection |
| `Columns` | Multi-column layouts |
| `Expandable` | Collapsible sections |
| `Frame` | Image and content frames |
| `Icon` | Icon rendering |
| `Mermaid` | Diagram rendering |
| `Panel` | Panel layouts |
| `Property` | API property display |
| `Steps` | Step-by-step instructions |
| `Tabs` | Tabbed interfaces |
| `Tile` | Tile grids |
| `Tooltip` | Hover tooltips |
| `Tree` | Hierarchical tree views |
| `Update` | Changelog entries |

