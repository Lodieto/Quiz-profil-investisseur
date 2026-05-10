// Quiz Screen — questions one by one with scale 1..5
const { useState: useStateQ, useEffect: useEffectQ, useRef: useRefQ } = React;

const SCALE = [
  { v: 1, label: "Pas du tout d'accord", short: "Pas du tout" },
  { v: 2, label: "Plutôt pas d'accord",   short: "Plutôt pas" },
  { v: 3, label: "Neutre",                short: "Neutre" },
  { v: 4, label: "Plutôt d'accord",        short: "Plutôt" },
  { v: 5, label: "Tout à fait d'accord",   short: "Tout à fait" },
];

const DIM_ACCENT = { O: 'turquoise', C: 'turquoise', E: 'orange', A: 'green', N: 'orange' };
const DIM_LABEL  = { O: 'Ouverture', C: 'Conscienciosité', E: 'Extraversion', A: 'Agréabilité', N: 'Névrosisme' };

function Quiz({ data, answers, setAnswers, onDone, onBack }) {
  const { QUESTIONS } = data;
  const [idx, setIdx] = useStateQ(() => {
    // resume at first unanswered, or 0
    const firstUnanswered = QUESTIONS.findIndex(q => !answers[q.id]);
    return firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered;
  });

  const q = QUESTIONS[idx];
  const total = QUESTIONS.length;
  const answered = Object.keys(answers).filter(k => answers[k]).length;
  const allAnswered = answered === total;
  const pct = Math.round((answered / total) * 100);
  const accent = DIM_ACCENT[q.dim];

  const select = (val) => {
    setAnswers(prev => ({ ...prev, [q.id]: val }));
    // auto-advance after a short beat
    setTimeout(() => {
      if (idx < total - 1) setIdx(idx + 1);
    }, 220);
  };

  const goPrev = () => { if (idx > 0) setIdx(idx - 1); else onBack(); };
  const goNext = () => { if (idx < total - 1) setIdx(idx + 1); };

  // Keyboard
  useEffectQ(() => {
    const handler = (e) => {
      if (e.key >= '1' && e.key <= '5') select(parseInt(e.key, 10));
      else if (e.key === 'ArrowRight' || e.key === 'Enter') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [idx, q.id]);

  return (
    <div className="quiz-wrap">
      <div className="quiz-topbar">
        <button className="topbar-back" onClick={goPrev} aria-label="Précédent">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          {idx === 0 ? "Accueil" : "Précédent"}
        </button>

        <div className="topbar-progress">
          <div className="tp-meta">
            <span className="tp-num">{idx + 1}</span>
            <span className="tp-of">/ {total}</span>
            <span className="tp-dim" data-accent={accent}>· {DIM_LABEL[q.dim]}</span>
          </div>
          <div className="tp-bar">
            <div className="tp-bar-fill" data-accent={accent} style={{ width: `${pct}%` }} />
          </div>
        </div>

        <button
          className="topbar-finish"
          disabled={!allAnswered}
          onClick={onDone}
          title={allAnswered ? "Voir vos résultats" : "Répondez aux 25 questions"}
        >
          Voir le profil <span className="arr">→</span>
        </button>
      </div>

      <div className="quiz-card-wrap" key={q.id}>
        <div className="quiz-card">
          <div className="qc-eyebrow">
            <span className="qc-dim-pill" data-accent={accent}>{q.dim} · {DIM_LABEL[q.dim]}</span>
            <span className="qc-counter">Question {idx + 1} sur {total}</span>
          </div>

          <h2 className="qc-question">{q.text}</h2>

          <div className="qc-scale-hint">
            <span>Pas du tout d'accord</span>
            <span className="qc-scale-line" />
            <span>Tout à fait d'accord</span>
          </div>

          <div className="qc-scale" role="radiogroup" aria-label="Échelle de réponse">
            {SCALE.map(s => {
              const selected = answers[q.id] === s.v;
              return (
                <button
                  key={s.v}
                  className={`scale-btn${selected ? ' selected' : ''}`}
                  data-accent={accent}
                  data-val={s.v}
                  onClick={() => select(s.v)}
                  role="radio"
                  aria-checked={selected}
                >
                  <span className="sb-num">{s.v}</span>
                  <span className="sb-label">{s.short}</span>
                </button>
              );
            })}
          </div>

          <div className="qc-foot">
            <span className="kbd-hint">Astuce : tapez <kbd>1</kbd> à <kbd>5</kbd> au clavier · <kbd>←</kbd> <kbd>→</kbd> pour naviguer</span>
          </div>
        </div>
      </div>

      <div className="quiz-dots" aria-label="Navigation entre questions">
        {QUESTIONS.map((qq, i) => (
          <button
            key={qq.id}
            className={`qd${answers[qq.id] ? ' done' : ''}${i === idx ? ' active' : ''}`}
            data-accent={DIM_ACCENT[qq.dim]}
            onClick={() => setIdx(i)}
            title={`Question ${i + 1} (${DIM_LABEL[qq.dim]})${answers[qq.id] ? ' — répondue' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

window.Quiz = Quiz;
