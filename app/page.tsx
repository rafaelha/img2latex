import Link from "next/link";
import { EB_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import HeroDropzone from "./components/HeroDropzone";
import StructuredData from "./components/StructuredData";
import { faqs } from "./utils/faqs";
import styles from "./landing.module.css";

const serif = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--landing-serif",
});

const steps = [
  { title: "Capture the equation.", text: "A screenshot from a paper. A photo of your notes. A scan of the whiteboard. Start with a clear image of the math." },
  { title: "Let us do the typing.", text: "AI-powered recognition turns mathematical notation into editable LaTeX. Fractions, integrals, matrices and all." },
  { title: "Make it yours.", text: "Check the result, edit what you need, and copy the code into Overleaf, your paper or your notes." },
];

export default function LandingPage() {
  return (
    <div className={`${styles.landing} ${serif.variable}`}>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark} aria-label="Img2LaTeX home">img<span>2</span>latex<span className={styles.wordmarkDot}>.</span></Link>
        <nav aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <Link href="/about">About</Link>
          <a href="https://github.com/rafaelha/img2latex" className={styles.sourceLink}>Open source <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span aria-hidden="true">[ 01 — ∞ ]</span> A small tool for big ideas</p>
          <h1 id="hero-title">Your math.<br /><em>Beautifully</em><br />translated<span className={styles.period}>.</span></h1>
          <p className={styles.intro}>From image to LaTeX, without the retyping. Turn screenshots, scans and handwritten equations into code you can work with.</p>
          <div className={styles.heroFootnote}><span className={styles.asterisk} aria-hidden="true">∗</span><p>Made by researchers.<br />Free for everyone. No account needed.</p></div>
        </div>
        <div className={styles.workspace}>
          <div className={styles.workspaceHeading}><span>IMAGE → LaTeX</span><span>Less typing. More thinking.</span></div>
          <HeroDropzone />
          <Link href="/convert" className={styles.converterLink}>Open the equation editor <span aria-hidden="true">↗</span></Link>
          <div className={styles.specimen}>
            <div className={styles.specimenHeading}><span>A little example</span><span aria-hidden="true">↙</span></div>
            <div className={styles.equation} aria-label="Euler's identity: e to the i pi plus one equals zero">e<sup>iπ</sup> + 1 = 0</div>
            <div className={styles.codeExample}><span>LaTeX</span><code>{"e^{i\\pi} + 1 = 0"}</code></div>
          </div>
          <p className={styles.caption}>The same idea. A more useful form.</p>
        </div>
      </section>

      <section className={styles.process} id="how-it-works" aria-labelledby="process-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>01 / The process</p><h2 id="process-title">From a quick capture<br />to a <em>clean equation.</em></h2><p>Three small steps between<br />“I need this” and “it’s in my paper.”</p></div>
        <ol className={styles.steps}>{steps.map((step, i) => <li key={step.title}><span className={styles.stepNumber}>0{i + 1}<span aria-hidden="true">{["↗", "∑", "✓"][i]}</span></span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      </section>

      <section className={styles.questions} aria-labelledby="faq-title">
        <div><p className={styles.eyebrow}>02 / A few answers</p><h2 id="faq-title">Glad you<br /><em>asked.</em><span className={styles.questionMark} aria-hidden="true">?</span></h2><p className={styles.faqIntro}>A little more about the tool,<br />before you put it to work.</p></div>
        <dl className={styles.faqList}>{faqs.map((faq, i) => <div key={faq.q}><dt><span>0{i + 1}</span>{faq.q}</dt><dd>{faq.a}</dd></div>)}</dl>
      </section>

      <section className={styles.closing}>
        <p className={styles.eyebrow}>Keep your train of thought.</p>
        <h2>You bring the ideas.<br />We’ll bring the <em>LaTeX.</em></h2>
        <Link href="/convert">Convert an equation <span aria-hidden="true">↗</span></Link>
        <p>Free. Open source. Made for curious minds.</p>
      </section>
      <StructuredData />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
