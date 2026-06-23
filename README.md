# Img2LaTeX

Convert images of mathematical equations into clean, editable LaTeX code.

Drop a screenshot, photo, or scan of an equation — or paste from your clipboard — and get accurate LaTeX in seconds. Powered by an OpenAI vision model. Free and open source.

🔗 Live at **[img2latex.xyz](https://img2latex.xyz)**

## Features

- **Image → LaTeX** via drag & drop, click-to-upload, or clipboard paste (Ctrl/Cmd+V)
- Handles screenshots, photos of handwritten notes, and scans
- Server-side API key handling — the key is never exposed to the browser
- Light/dark mode, responsive, no account required

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) and [MUI](https://mui.com/) for UI
- [KaTeX](https://katex.org/) / [react-latex-next](https://github.com/harunjonuzi/React-Latex-Next) for rendering
- [OpenAI API](https://platform.openai.com/) for image-to-LaTeX conversion

## Getting started

### Prerequisites

- Node.js 18.17+ (or 20+)
- An [OpenAI API key](https://platform.openai.com/api-keys) with the **Chat completions** (`model.request`) scope

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure your environment
cp .env.example .env.local
# then edit .env.local and set OPENAI_API_KEY

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Configuration

| Variable         | Required | Description                                                                 |
| ---------------- | -------- | --------------------------------------------------------------------------- |
| `OPENAI_API_KEY` | Yes      | Server-side OpenAI key. Used only by `app/api/convert-image/route.ts`.       |

The model used for conversion is hardcoded in `app/api/convert-image/route.ts`.

## Project structure

```
app/
  api/convert-image/   # Server route that calls OpenAI (holds the API key)
  convert/             # The converter page (upload/paste → LaTeX)
  components/          # Dropzone, LaTeX preview, code snippet, structured data
  utils/               # Image helpers and the client-side API wrapper
  page.tsx             # Landing page
  about/               # About page
```

## Deployment

Deploys cleanly to [Vercel](https://vercel.com/). Set `OPENAI_API_KEY` as an
environment variable in the project settings, then deploy. Any Node.js host that
supports Next.js works too.

## Contributing

Issues and pull requests are welcome. Please run `npm run lint` and
`npm run build` before submitting.

## License

[MIT](./LICENSE) © Rafael Haenel
