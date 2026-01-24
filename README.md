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

## Usage

Import components and styles in your project:

```tsx
import { Accordion, Callout, CodeBlock, Tabs } from '@mintlify/components';
import '@mintlify/components/styles.css';
```

### Example

```tsx
import { Callout } from '@mintlify/components';
import '@mintlify/components/styles.css';

function App() {
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
