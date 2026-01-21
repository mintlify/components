# Docs Components rules & audit

<aside>
💡

the goal is better UX/DX and consistency across all components

</aside>

## General rules:

- all components must support `className` on the root element
- add `data-component-part` attributes on internal sub-elements to allow deep targeting for custom CSS
- use a single, descriptive word for the root component (`Card, Steps, Property`)
- sub-components: use dot notation for nested elements (`Steps.Item, Tabs.Item, Colors.Item`) to define scope and avoid global naming conflicts
- support sub-components outside the parent where it makes sense (if possible and make sense)
- unify `title, description, cta, href` naming across all components
- use `icon` for single markers. use `leadIcon` and `tailIcon` for multiple markers

---

## What can we add?

- a dedicated section for “Blocks” - copy-pasteable, pre-configured layouts using our components

---

## Components refactoring:

<aside>
✔️

if empty - nothing to change

</aside>

- ~~Accordions~~
    - ~~Rename `<AccordionGroup>` to `<Accordion.Group>`~~
    - ~~Add `data-component-part` **for:~~
        - ~~`<details>`~~
- ~~Badge~~
    - ~~add `tailIcon` + `leadIcon` , current `icon` prop should be `tailIcon`~~
    - ~~rename `stroke` to `variant="outline"`~~
    - ~~add support for the props `onClick` and `href`~~
- ~~Banner~~
- ~~Callouts~~
    - ~~update to `variant="note"` instead of 7 different components. add `variant="custom"`, set it by default~~
- ~~Cards~~
- Code groups
- ~~Color~~
    - nits https://mintlify.slack.com/archives/C09QQDHD7PG/p1764635576242229?thread_ts=1763963569.715779&cid=C09QQDHD7PG
- Columns
    - i think we should build something more flexible like `Grid, Grid.Row, Grid.Col`
- Examples
    - we can remove this and just use `Panel` + `CodeGroup`
- Expandables
    - new name: `Collapsible` or `Accordion`?
- Fields
    - rename to `Property`
        - `Property.Param`
        - `Property.Response`
- ~~Frames~~
    - ~~`caption` → `description`~~
    - ~~`hint` → `title`~~
- ~~Icons~~
- ~~Mermaid~~
- Panel
- ~~Steps~~
    - ~~`Step` → `Steps.Item`~~
- ~~Tabs~~
    - ~~`Tab` → `Tabs.Item`~~
- Tiles
- ~~Tooltips~~
    - ~~`headline` → `title`~~
    - ~~`tip` → `description`~~
    - ~~add trigger identification  (Classes)~~
~~- Tree~~
- Update
- View

---
