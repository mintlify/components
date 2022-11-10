# Mintlify Components

Open-source library of UI components made with React and TailwindCSS. Checkout [Mintlify.com](https://mintlify.com/) to see the components in action.

Mintlify uses Mintlify Components in customers' docs. We encourage you to use them elsewhere on your site!

## Designed for Next.js

The project is designed for use with static side rendering where we don't have access to `document` or `window`. Thus, our webpack config has to use `mini-css-extract-plugin` instead of `style-loader`.

## Installation

`npm install @mintlify/components`

Add the following at the start of your `main.css` file:

`@import '@mintlify/components';`

## Usage

Import components like so:

`import { Accordion, Card } from "@mintlify/components`

# Documentation

[Storybook](https://main--63134bd5ae01f2a7717a0e47.chromatic.com/) has interactive demos.

The [repo wiki](https://github.com/mintlify/components/wiki) explains how to use the components and contribute to the repo.

Go to [Mintlify.com](https://www.mintlify.com/components/overview) for how to use the components in Mintlify's documentation platform.

# Long Term Vision

The first version of this library only included documentation components. In the long run, Mintlify will include layout components you could use to build an entire site.

## Community

Join our Discord community if you have questions or just want to chat:

[![](https://dcbadge.vercel.app/api/server/ACREKdwjG5)](https://discord.gg/ACREKdwjG5)

# License

[MIT](https://tldrlegal.com/license/mit-license)

_Built with 💚 by the Mintlify team._
