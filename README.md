# Img2LaTeX

Convert images of math equations into editable LaTeX code. Drop a screenshot, photo, or scan — or paste from your clipboard — and get LaTeX in seconds. Free and open source.

🔗 **[img2latex.xyz](https://img2latex.xyz)**

## Quick start

```bash
npm install
cp .env.example .env.local   # then set OPENAI_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

You'll need an [OpenAI API key](https://platform.openai.com/api-keys) with the **Chat completions** (`model.request`) scope. It's used server-side only — never exposed to the browser.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Tech stack

Next.js 14 (App Router) · React · TypeScript · Tailwind CSS · MUI · KaTeX · OpenAI API

## Project structure

```
app/
  api/convert-image/   # Server route that calls OpenAI (holds the API key)
  convert/             # Converter page (upload/paste → LaTeX)
  components/          # Dropzone, LaTeX preview, code snippet
  utils/               # Image helpers + client-side API wrapper
  page.tsx             # Landing page
  about/               # About page
```

## Deployment

Deploys to [Vercel](https://vercel.com/) (or any Next.js host). Set `OPENAI_API_KEY` in the project's environment variables.

## Contributing

Issues and PRs welcome. Please run `npm run lint` and `npm run build` before submitting.

## License

[MIT](./LICENSE) © Rafael Haenel
