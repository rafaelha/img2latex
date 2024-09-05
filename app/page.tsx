import LatexRenderer from './components/LatexRenderer';
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  return (
    <div style={{ height: '100vh', margin: 0, padding: 0 }}>
      <LatexRenderer />
      <Analytics />
    </div>
  );
}
