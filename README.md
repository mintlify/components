<div align="center">
  <a href="https://mintlify.com">
    <img
      src="https://res.cloudinary.com/mintlify/image/upload/v1665385627/logo-rounded_zuk7q1.svg"
      alt="Mintlify Logo"
      height="64"
    />
  </a>
  <br />
  <p>
    <h3>
      <b>
        Mintlify Components
      </b>
    </h3>
  </p>
  <p>
    <b>
      Open-source library of UI components made with React and TailwindCSS.
    </b>
  </p>
  <p>

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen?logo=github)](/) [![Website](https://img.shields.io/website?url=https%3A%2F%2Fmintlify.com&logo=mintlify)](https://mintlify.com)

  </p>
  <p>
    <sub>
      Built with 💚 by
      <a href="https://mintlify.com">
        Mintlify
      </a>
    </sub>
  </p>
  <br />
  <p>
    <a href="https://mintlify.com" target="_blank">
      <img
        src="https://mintlify-assets.b-cdn.net/website/mintlify-preview.png"
        alt="Mintlify"
        width="100%"
      />
    </a>
  </p>
</div>

This repo contains the components Mintlify uses in our open-source documentation framework: [mint](https://github.com/mintlify/mint). Checkout [mintlify.com/docs](https://mintlify.com/docs) to see the components in action. Feel free to use the components on your own websites!

## Installation

## Add Dependencies

Install this package and peerDependencies of this package,
using [install-peerdeps](https://github.com/nathanhleung/install-peerdeps).

```sh
npx install-peerdeps @mintlify/components
```

### React is already installed

You already have `react` installed or are using `preact` and just need `@headlessui/react` and `@mintlify/components`.

```sh
# yarn
yarn add @headlessui/react @mintlify/components

# npm
npm i @headlessui/react @mintlify/components

# pnpm
pnpm add @headlessui/react @mintlify/components
```

### React and headlessui are already installed

You already have `react` and `@headlessui/react` installed and just need `@mintlify/components`.

```sh
# yarn
yarn add @mintlify/components

# npm
npm i @mintlify/components

# pnpm
pnpm add @mintlify/components
```

## CSS import

Add the following at the start of your `main.css` file:

`@import '@mintlify/components';`

## Usage

Import components like so:

`import { Accordion, Card } from "@mintlify/components"`

## Designed for Next.js

The project is designed for use with static side rendering where we don't have access to `document` or `window`. Thus, our webpack config has to use `mini-css-extract-plugin` instead of `style-loader`.

# Documentation

Go to [mintlify.com/docs/components](https://mintlify.com/docs/components) to see how to use the components in Mintlify's documentation platform.

[Storybook](https://main--63134bd5ae01f2a7717a0e47.chromatic.com/) has interactive demos.

## Contributing

Read the [Contributing guide](https://mintlify.com/docs/contributing) to learn about our development process, the standards and tools used, and how to propose fixes, bugs or open issues.

The [repo wiki](https://github.com/mintlify/components/wiki) explains how to contribute to this repo.

### Code Quality

Check out the [Contribution Tools](https://mintlify.com/docs/contributing#contribution-tools) section in our [Contributing guide](https://mintlify.com/docs/contributing).

#### Formatting

This project uses [prettier](https://prettier.io/) for code formatting. You can auto-format across the codebase by running `yarn format`.

#### Linting

This project uses [eslint](https://eslint.org/) for code linting. You can check linter warnings and errors by running `yarn lint`.

# Long Term Vision

The first version of this library only includes documentation components. In the long run, Mintlify will include layout components you could use to build an entire site.

## Community

Join our Discord community if you have questions or just want to chat:

[![](https://dcbadge.vercel.app/api/server/ACREKdwjG5)](https://discord.gg/ACREKdwjG5)

# License

[MIT](https://tldrlegal.com/license/mit-license)
