# Contributing to Mintlify Components

Thank you for your interest in contributing to Mintlify Components! This document provides guidelines and information for contributors.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Follow the setup instructions in [DEVELOPMENT.md](./DEVELOPMENT.md)

## Issue Labels

We use three labels to categorize issues:

- **bug** - Something isn't working as expected
- **improvement** - Enhancement to an existing component
- **feature request** - Request for a new component or capability

## How to Contribute

### Reporting Bugs

Before submitting a bug report:

- Check the [existing issues](https://github.com/mintlify/components/issues) to avoid duplicates
- Create an issue and add the `bug` label
- Include reproduction steps, expected behavior, and actual behavior
- Add screenshots or code snippets if helpful

### Requesting Features or Improvements

- Check existing issues first to avoid duplicates
- Create an issue with the `feature request` or `improvement` label
- Describe the use case and why it would be valuable

### Submitting Changes

1. Create a new branch from `main`
2. Make your changes following our code style guidelines
3. Add or update tests and Storybook stories as needed
4. Run `pnpm lint:check` to ensure code quality
5. Run `pnpm build` to verify the build succeeds
6. Submit a pull request

### Pull Request Guidelines

- Keep PRs focused on a single change
- Write clear commit messages
- Update documentation if needed
- Add a changeset for user-facing changes
- Ensure all CI checks pass

## Code Style

- Use TypeScript for all code
- Follow existing patterns in the codebase
- Use Tailwind CSS for styling
- Run `pnpm lint:fix` to auto-format code

## Component Guidelines

When adding or modifying components:

- Ensure compatibility with React 18 and 19
- Support both light and dark themes
- Make components accessible (ARIA attributes, keyboard navigation)
- Add Storybook stories documenting usage
- Export types for TypeScript users

## Questions?

If you have questions, feel free to:

- Open a [GitHub Discussion](https://github.com/mintlify/components/discussions)
- Check our [documentation](https://www.mintlify.com/docs/components)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
