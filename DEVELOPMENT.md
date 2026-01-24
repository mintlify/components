# Development Guide

This guide covers how to set up and work on Mintlify Components locally.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20.0.0
- [pnpm](https://pnpm.io/) >= 10.0.0

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/mintlify/components.git
cd components
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up pre-commit hooks:

```bash
pnpm exec husky install
```

## Development Workflow

### Building

Build the component library:

```bash
pnpm build
```

For development with watch mode:

```bash
pnpm dev
```

### Storybook

Run Storybook to develop and preview components:

```bash
pnpm storybook
```

This starts a local server at `http://localhost:6006` where you can view and interact with all components.

Build Storybook for production:

```bash
pnpm build-storybook
```

### Linting

Check code style:

```bash
pnpm lint:check
```

Fix linting issues automatically:

```bash
pnpm lint:fix
```

We use [Biome](https://biomejs.dev/) for linting and formatting. The pre-commit hooks will run linting automatically before each commit.

## Project Structure

```
packages/
└── components/          # Main component package
    ├── src/
    │   ├── components/  # React components
    │   ├── hooks/       # Custom React hooks
    │   ├── utils/       # Utility functions
    │   └── index.ts     # Package entry point
    ├── .storybook/      # Storybook configuration
    └── dist/            # Build output
```

## Adding a New Component

1. Create a new directory under `packages/components/src/components/`
2. Implement the component with TypeScript
3. Export it from `packages/components/src/components/index.ts`
4. Add a Storybook story for documentation
5. Run `pnpm build` to verify the build succeeds

## Code Style

- Use TypeScript for all new code
- Follow existing patterns in the codebase
- Components should be compatible with React 18 and 19
- Use Tailwind CSS for styling
