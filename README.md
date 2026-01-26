# Mintlify Components

Open source React UI components for documentation sites, built with Tailwind CSS.

[![npm version](https://img.shields.io/npm/v/@mintlify/components.svg)](https://www.npmjs.com/package/@mintlify/components)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @mintlify/components
# or
pnpm add @mintlify/components
# or
yarn add @mintlify/components
```

## Requirements

- Node.js >= 20.0.0
- React ^18.0.0 or ^19.0.0
- Tailwind CSS v3 or v4

## Setup

### Tailwind v4

Import the styles at the **top** of your main CSS file, **before** `@import "tailwindcss"`:

```css
@import "@mintlify/components/styles.css";
@import "tailwindcss";

@theme {
  --color-primary: #your-color;
}
```

### Tailwind v3

Import the styles at the **top** of your main CSS file:

```css
@import "@mintlify/components/styles.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Override theme values in `tailwind.config.js`.

> **Note:** Importing styles before Tailwind ensures your custom theme values take precedence over the component defaults.

## Usage

Import components in your React files:

```tsx
import { Accordion, Callout, CodeBlock, Tabs } from '@mintlify/components';
```

### Example

```tsx
import { Callout } from '@mintlify/components';

const App = () => {
  return (
    <Callout type="info" title="Note">
      This is an informational callout.
    </Callout>
  );
}
```

## Components


## Documentation

- [Component Documentation](https://www.mintlify.com/docs/components)
- [Storybook Examples](https://storybook.mintlify.com)

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

For local development setup, see [Development](./DEVELOPMENT.md).

## License

MIT License - see [LICENSE](./LICENSE) for details.
