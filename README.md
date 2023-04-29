This is a [Next.js](https://nextjs.org/) project designed to show SVG rendering in a serverless function using @resvg/resvg-js

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Things to draw you attention to:

### Folders
Fonts are stored in the root fonts folder which doesn't show up in the Vercel build but is there.

### Loading fonts

The `fonts` section of the options object is as follows. You can find it in src/pages/api/svgpng.ts

```js
  font: {
    fontFiles: [
      join(process.cwd(), 'fonts', 'OpenSans-Medium.ttf'),
      join(process.cwd(), 'fonts', 'RobotoMono-Regular.ttf')
    ], // Load custom fonts.
    loadSystemFonts: false, // It will be faster to disable loading system fonts.
    defaultFontFamily: 'Roboto Mono' // Set default font family.
  }
```

### next.config.js
We've added experimental nftTracing and outputFileTracing.

```js
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    nftTracing: true
  },
  outputFileTracing: true
}
```