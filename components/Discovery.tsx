"use client";

import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  ExternalLink,
  Headphones,
  Languages,
  Mountain,
  Share2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

type Language = "original" | "simple" | "english";

const chapters = ["Welcome", "Thinai", "The poem", "The meaning", "Today"];

const readings: Record<Language, { label: string; text: string }> = {
  original: {
    label: "குறுந்தொகை 40 · மூலம்",
    text: "யாயும் ஞாயும் யாராகியரோ?\nஎந்தையும் நுந்தையும் எம்முறைக் கேளிர்?\nயானும் நீயும் எவ்வழி அறிதும்?\nசெம்புலப் பெயல்நீர் போல\nஅன்புடை நெஞ்சம் தாம்கலந் தனவே.",
  },
  simple: {
    label: "எளிய தமிழில்",
    text: "என் தாயும் உன் தாயும் ஒருவருக்கொருவர் யார்? நம் தந்தையருக்கும் என்ன உறவு? முன்பு நாம் ஒருவரை ஒருவர் அறிந்ததே இல்லை. ஆனால் செம்மண்ணில் கலந்த மழைநீர் போல, நம் அன்பான நெஞ்சங்கள் பிரிக்க முடியாதபடி கலந்துவிட்டன.",
  },
  english: {
    label: "In English",
    text: "What kin is my mother to yours? What bond joins our fathers? You and I had never known one another. Yet, like rain sinking into red earth, our loving hearts have mingled beyond separation.",
  },
};

export default function Discovery() {
  const [chapter, setChapter] = useState(0);
  const [language, setLanguage] = useState<Language>("original");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  async function share() {
    const data = {
      title: "Living Tamil: Kurinji",
      text: "Why did Sangam poets connect mountains with secret love?",
      url: window.location.href,
    };
    if (navigator.share) return navigator.share(data);
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">ழ</span>
          <span><strong>Living Tamil</strong><small>தமிழை தினமும் கண்டறியுங்கள்</small></span>
        </div>
        <div className="top-actions">
          <button aria-label="Bookmark" aria-pressed={saved} onClick={() => setSaved(!saved)}>
            <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
          </button>
          <button aria-label="Share" onClick={share}>{copied ? <Check size={18} /> : <Share2 size={18} />}</button>
        </div>
      </header>

      <div className="progress"><span style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }} /></div>

      <main className="workspace">
        <aside className="journey">
          <p className="eyebrow">Journey 01</p>
          <h2>The Five Landscapes</h2>
          <div className="chapter-list">
            {chapters.map((item, index) => (
              <button className={chapter === index ? "active" : ""} onClick={() => setChapter(index)} key={item}>
                <span>{index < chapter ? <Check size={13} /> : index + 1}</span>
                <strong>{item}</strong>
              </button>
            ))}
          </div>
          <small>5 minutes · Discovery 1 of 7</small>
        </aside>

        <section className="stage" aria-live="polite">
          {chapter === 0 && <Welcome onStart={() => setChapter(1)} />}
          {chapter === 1 && <Thinai />}
          {chapter === 2 && <Poem language={language} setLanguage={setLanguage} />}
          {chapter === 3 && <Meaning />}
          {chapter === 4 && <Finish />}

          {chapter > 0 && (
            <nav className="navigation">
              <button onClick={() => setChapter(Math.max(0, chapter - 1))}><ArrowLeft size={17} /> Previous</button>
              <span>{chapter + 1} / {chapters.length}</span>
              <button className="continue" onClick={() => setChapter(chapter === chapters.length - 1 ? 0 : chapter + 1)}>
                {chapter === chapters.length - 1 ? "Complete" : "Continue"}
                {chapter === chapters.length - 1 ? <Check size={17} /> : <ArrowRight size={17} />}
              </button>
            </nav>
          )}
        </section>
      </main>
    </div>
  );
}

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <article className="card welcome-card">
      <div className="mountain-art" aria-label="Kurinji mountain landscape at dusk">
        <i className="sun" /><i className="peak peak-one" /><i className="peak peak-two" /><i className="peak peak-three" />
        <div className="flowers">{Array.from({ length: 16 }, (_, i) => <b key={i}>✦</b>)}</div>
        <span className="landscape-label"><Mountain size={16} /> குறிஞ்சி · Kurinji</span>
      </div>
      <div className="welcome-copy">
        <p className="eyebrow"><Sparkles size={13} /> Today’s discovery · 5 min</p>
        <h1>Why did Sangam poets connect mountains with secret love?</h1>
        <p>Two thousand years ago, a mountain was not merely scenery. It could tell a Tamil listener who was in love, when they met, and what the moment felt like.</p>
        <button className="primary" onClick={onStart}>Begin discovery <ArrowRight size={18} /></button>
        <div className="features"><span><Languages size={14} /> 3 reading layers</span><span><Headphones size={14} /> Listen along</span><span><BookOpen size={14} /> Sources</span></div>
      </div>
    </article>
  );
}

function Thinai() {
  return (
    <article className="card content-card">
      <p className="eyebrow">First, understand திணை</p>
      <h1>A landscape was a complete emotional world.</h1>
      <p className="lede">In classical Tamil poetics, <strong>thinai</strong> connected a natural setting with human experience. Landscape, season, time, plants, livelihood and emotion worked together.</p>
      <div className="thinai-map">
        <span className="center">திணை<small>thinai</small></span>
        <span>place</span><span>emotion</span><span>season</span><span>people</span><span>time</span>
      </div>
      <div className="insight"><Sparkles size={18} /><p><strong>The surprising idea:</strong> nature did not decorate the poem. Nature helped encode its meaning.</p></div>
    </article>
  );
}

function Poem({ language, setLanguage }: { language: Language; setLanguage: (value: Language) => void }) {
  return (
    <article className="card content-card poem-card">
      <p className="eyebrow">A poem you can feel</p>
      <h1>Like rain on red earth</h1>
      <div className="tabs" role="tablist" aria-label="Reading language">
        {(["original", "simple", "english"] as Language[]).map((mode) => (
          <button role="tab" aria-selected={language === mode} className={language === mode ? "selected" : ""} onClick={() => setLanguage(mode)} key={mode}>
            {mode === "original" ? "மூலம்" : mode === "simple" ? "எளிய தமிழ்" : "English"}
          </button>
        ))}
      </div>
      <div className="poem-paper">
        <small>{readings[language].label}</small>
        <blockquote lang={language === "english" ? "en" : "ta"}>{readings[language].text}</blockquote>
        <p>செம்புலப்பெயனீரார் · Kuruntokai 40</p>
      </div>
      <p className="hint">Move between layers without losing the voice of the original poem.</p>
    </article>
  );
}

function Meaning() {
  return (
    <article className="card content-card">
      <p className="eyebrow">So why the mountains?</p>
      <h1>Kurinji gave secret love its natural setting.</h1>
      <p className="lede">Within the poetic convention, Kurinji is associated with lovers meeting in union. Remote mountain paths, cool nights and hidden spaces formed a natural world for a private meeting.</p>
      <div className="meaning-grid">
        <div><Mountain /><small>Landscape</small><strong>Mountains</strong></div>
        <div><b>☾</b><small>Time</small><strong>Night</strong></div>
        <div><b>♥</b><small>Emotion</small><strong>Union</strong></div>
        <div><b>✿</b><small>Symbol</small><strong>Kurinji flower</strong></div>
      </div>
      <div className="dark-quote"><p>“The place tells you what kind of love is unfolding before the poem explains it.”</p><small>A reading aid, not a quotation from the classical text</small></div>
    </article>
  );
}

function Finish() {
  return (
    <article className="card content-card finish-card">
      <div className="done"><Check /></div>
      <p className="eyebrow">You discovered Kurinji</p>
      <h1>A landscape can carry a whole human feeling.</h1>
      <p className="lede">Today we tag stories by genre. Sangam poetry used a richer system: place, time, nature and emotion formed one recognizable pattern.</p>
      <div className="reflection"><small>Your turn</small><h2>Which landscape feels closest to your life?</h2><div><button>குறிஞ்சி <span>Mountains</span></button><button>முல்லை <span>Forest</span></button><button>நெய்தல் <span>Sea</span></button></div></div>
      <div className="sources">
        <h2><BookOpen size={17} /> Sources to explore</h2>
        <a href="https://www.tamilvu.org/en/library-content" target="_blank" rel="noreferrer">Tamil Virtual Academy <ExternalLink size={14} /></a>
        <a href="https://www.projectmadurai.org/" target="_blank" rel="noreferrer">Project Madurai <ExternalLink size={14} /></a>
        <p>Prototype copy requires scholarly review before public editorial publication.</p>
      </div>
    </article>
  );
}
