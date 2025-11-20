# Git Hooks

This directory contains Git hooks that automatically run during various Git operations.

## Pre-commit Hook

The `pre-commit` hook automatically:

1. Regenerates `theme.css` from `design-tokens.ts`
2. Stages the updated `theme.css` file
3. Ensures `theme.css` is always in sync with design tokens

### Why?

The `theme.css` file is **auto-generated** and should never be edited manually. The pre-commit hook ensures that:

- Any changes to `design-tokens.ts` are automatically reflected in `theme.css`
- The `theme.css` file is always up-to-date before committing
- Developers don't accidentally commit manual edits to `theme.css`

### Setup

The hooks are automatically configured when you run `pnpm install` in the root directory.

To manually configure the hooks, run:

```bash
git config core.hooksPath .husky
```

### Readonly Protection

The `theme.css` file is set to readonly permissions (`-r--r--r--`) to prevent accidental manual edits. If you need to update it:

1. Edit `packages/react/src/styles/design-tokens.ts`
2. Run `pnpm --filter @mintlify-components/react generate:theme`
3. The file will be regenerated with the warning comment and readonly permissions
