// Results Screen — profile combiné + radar + portrait robot + checklist + glossary
const { useState: useStateR, useEffect: useEffectR, useMemo: useMemoR } = React;

const ACCENT_HEX = {
  turquoise: '#a8e2d2',
  green: '#bfdf95',
  orange: '#f4be8e',
};

// SVG Radar Chart for the 7 biases (scores 0-10)
function BiasRadar({ biases, scores, accent }) {
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const r = 150;
  const n = biases.length;

  const angleFor = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;

  const point = (i, value) => {
    const a = angleFor(i);
    const rr = (value / 10) * r;
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  };

  // Concentric grid (rings 2,4,6,8,10)
  const rings = [2, 4, 6, 8, 10];

  const polyPts = scores.map((v, i) => point(i, v).join(',')).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="radar-svg" role="img" aria-label="Radar de résistance aux biais">
      <defs>
        <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ACCENT_HEX[accent]} stopOpacity="0.35" />
          <stop offset="100%" stopColor={ACCENT_HEX[accent]} stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* rings */}
      {rings.map(v => (
        <polygon key={v}
          points={biases.map((_, i) => point(i, v).join(',')).join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
      ))}
      {/* axes */}
      {biases.map((b, i) => {
        const [x, y] = point(i, 10);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
      })}

      {/* data polygon */}
      <polygon
        points={polyPts}
        fill="url(#radarFill)"
        stroke={ACCENT_HEX[accent]}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* dots */}
      {scores.map((v, i) => {
        const [x, y] = point(i, v);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill={ACCENT_HEX[accent]} />
            <circle cx={x} cy={y} r="8" fill={ACCENT_HEX[accent]} fillOpacity="0.18" />
          </g>
        );
      })}

      {/* labels */}
      {biases.map((b, i) => {
        const a = angleFor(i);
        const lx = cx + Math.cos(a) * (r + 32);
        const ly = cy + Math.sin(a) * (r + 32);
        const sx = cx + Math.cos(a) * (r + 14);
        const sy = cy + Math.sin(a) * (r + 14);
        const score = scores[i];
        const anchor = Math.cos(a) > 0.3 ? 'start' : Math.cos(a) < -0.3 ? 'end' : 'middle';
        return (
          <g key={i}>
            <text x={lx} y={ly - 4} textAnchor={anchor} className="radar-label">{b.label}</text>
            <text x={lx} y={ly + 14} textAnchor={anchor} className="radar-score">{score}/10</text>
          </g>
        );
      })}

      {/* center mark */}
      <circle cx={cx} cy={cy} r="2" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}

// Mini bar visualisation for OCEAN scores
function OceanBars({ scores, dimensions }) {
  return (
    <div className="ocean-bars">
      {Object.keys(dimensions).map(k => {
        const v = scores[k] || 0;
        const pct = (v / 5) * 100;
        return (
          <div className="ob-row" key={k}>
            <div className="ob-letter">{k}</div>
            <div className="ob-meta">
              <div className="ob-name">{dimensions[k].label}</div>
              <div className="ob-hint">{dimensions[k].hint}</div>
            </div>
            <div className="ob-bar">
              <div className="ob-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="ob-val">{v.toFixed(1)}<span>/5</span></div>
          </div>
        );
      })}
    </div>
  );
}

function Results({ data, result, onRestart }) {
  const { dominant, secondary, scores, combo, ranked } = result;
  const { BIASES, DIMENSIONS, PORTRAIT_ROBOT } = data;
  const { PROFILE_GLYPH } = window.QUIZ_ENGINE;

  const accent = dominant.accent;
  const [checked, setChecked] = useStateR({});

  const portrait = PORTRAIT_ROBOT[dominant.key];

  // top 2 strongest & weakest biases
  const biasWithScore = combo.biases.map((s, i) => ({ ...BIASES[i], score: s, idx: i }));
  const strongest = [...biasWithScore].sort((a, b) => b.score - a.score)[0];
  const weakest   = [...biasWithScore].sort((a, b) => a.score - b.score)[0];

  const [openBias, setOpenBias] = useStateR(null); // glossary

  const copyChecklist = () => {
    const lines = combo.garde.map(g => `[ ] ${g}`).join('\n');
    const txt = `Checklist de survie — ${dominant.short} · ${secondary.short}\n\n${lines}\n\n— Méthode Lleco`;
    navigator.clipboard?.writeText(txt);
  };

  return (
    <div className="results-wrap">
      <div className="res-orb" data-accent={accent} />

      {/* Hero result */}
      <section className="res-hero">
        <div className="res-eyebrow">
          <span className="dot" data-accent={accent} />
          Votre profil combiné · Méthode Lleco
        </div>

        <div className="res-title-row">
          <div className="res-glyph" data-accent={accent}>{PROFILE_GLYPH[dominant.key]}</div>
          <h1 className="res-title">
            <span className="rt-dom" data-accent={dominant.accent}>{dominant.short}</span>
            <span className="rt-sep">·</span>
            <span className="rt-sec" data-accent={secondary.accent}>{secondary.short}</span>
          </h1>
        </div>

        <p className="res-tagline">{dominant.tagline} <span className="rt-dim">— teinté de {secondary.short}.</span></p>

        <p className="res-desc">{dominant.description}</p>

        <div className="res-forces">
          {dominant.forces.map(f => (
            <span key={f} className="force-pill" data-accent="green">{f}</span>
          ))}
        </div>

        {/* Distance ranking — show how close other profiles are */}
        <div className="ranking">
          <div className="ranking-label">Proximité aux 5 archétypes</div>
          <div className="ranking-bars">
            {ranked.map((p, i) => {
              const barWidth = Math.max(2, (1 - p.dist / 5) * 100);
              return (
                <div key={p.key} className={`rk-row${i === 0 ? ' rk-dom' : ''}${i === 1 ? ' rk-sec' : ''}`}>
                  <span className="rk-name">{p.short}</span>
                  <div className="rk-track"><div className="rk-fill" data-accent={p.accent} style={{ width: `${barWidth}%` }} /></div>
                  <span className="rk-dist">{p.dist.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OCEAN scores */}
      <section className="res-section">
        <div className="rs-header">
          <div className="rs-eyebrow">Vos 5 dimensions</div>
          <h2 className="rs-title">Scores OCEAN</h2>
          <p className="rs-lead">La moyenne de vos réponses sur chaque dimension du modèle Big Five.</p>
        </div>
        <OceanBars scores={scores} dimensions={DIMENSIONS} />
      </section>

      {/* Portrait Robot */}
      <section className="res-section portrait-section">
        <div className="rs-header">
          <div className="rs-eyebrow">Nouveau · Portrait robot</div>
          <h2 className="rs-title">Votre journée type d'investisseur</h2>
          <p className="rs-lead">Ce à quoi ressemble probablement vos rituels, votre rapport aux écrans, votre gestion des news.</p>
        </div>
        <div className="portrait-card glass-card" data-accent={accent}>
          <div className="portrait-quote">"</div>
          <p className="portrait-text">{portrait}</p>
          <div className="portrait-foot">
            <span className="caption">Profil dominant : {dominant.short} · secondaire : {secondary.short}</span>
          </div>
        </div>
      </section>

      {/* Bias radar */}
      <section className="res-section">
        <div className="rs-header">
          <div className="rs-eyebrow">Radar de résistance</div>
          <h2 className="rs-title">Vos 7 biais cognitifs</h2>
          <p className="rs-lead">Score de 0 à 10 — plus vous êtes proche du bord, plus vous tenez bon. Plus vous êtes au centre, plus le biais peut prendre la main.</p>
        </div>

        <div className="radar-grid">
          <div className="radar-box glass-card" data-accent={accent}>
            <BiasRadar biases={BIASES} scores={combo.biases} accent={accent} />
          </div>

          <div className="bias-list">
            <div className="bias-summary">
              <div className="bs-block">
                <div className="bs-lbl bs-strong">Point fort</div>
                <div className="bs-name">{strongest.label}</div>
                <div className="bs-score" data-accent="green">{strongest.score}<span>/10</span></div>
              </div>
              <div className="bs-block">
                <div className="bs-lbl bs-weak">Point de vigilance</div>
                <div className="bs-name">{weakest.label}</div>
                <div className="bs-score" data-accent="orange">{weakest.score}<span>/10</span></div>
              </div>
            </div>

            <div className="bias-rows">
              {biasWithScore.map(b => {
                const tone = b.score >= 6 ? 'green' : b.score >= 4 ? 'turquoise' : 'orange';
                return (
                  <button
                    key={b.key}
                    className={`bias-row${openBias === b.key ? ' open' : ''}`}
                    onClick={() => setOpenBias(openBias === b.key ? null : b.key)}
                  >
                    <div className="br-head">
                      <span className="br-name">{b.label}</span>
                      <div className="br-track"><div className="br-fill" data-accent={tone} style={{ width: `${b.score * 10}%` }} /></div>
                      <span className="br-val" data-accent={tone}>{b.score}<span className="br-of">/10</span></span>
                      <span className="br-chev">{openBias === b.key ? '−' : '+'}</span>
                    </div>
                    {openBias === b.key && (
                      <div className="br-body">
                        <div className="br-def">{b.def}</div>
                        <div className="br-cue">Voix intérieure typique : <em>{b.cue}</em></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vigilance */}
      <section className="res-section">
        <div className="rs-header">
          <div className="rs-eyebrow">Diagnostic</div>
          <h2 className="rs-title">Vos points de vigilance</h2>
        </div>
        <div className="vigilance-card glass-card" data-accent="orange">
          <div className="vc-mark">!</div>
          <p className="vc-text">{combo.vigilance}</p>
        </div>
      </section>

      {/* Checklist de survie */}
      <section className="res-section">
        <div className="rs-header">
          <div className="rs-eyebrow">Nouveau · Checklist de survie</div>
          <h2 className="rs-title">À copier dans votre journal d'investissement</h2>
          <p className="rs-lead">Vos garde-fous transformés en actions concrètes. Cochez-les ici pour tester, ou copiez-les pour de bon.</p>
        </div>
        <div className="checklist-card glass-card" data-accent="green">
          <div className="cl-head">
            <div className="cl-title">Checklist · {dominant.short} · {secondary.short}</div>
            <button className="cl-copy" onClick={copyChecklist}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copier
            </button>
          </div>
          <ul className="checklist">
            {combo.garde.map((g, i) => (
              <li key={i}>
                <label>
                  <input type="checkbox" checked={!!checked[i]} onChange={e => setChecked({ ...checked, [i]: e.target.checked })} />
                  <span className="cl-box"><svg viewBox="0 0 14 14" width="10" height="10"><path d="M2 7l3 3 7-7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  <span className="cl-txt">{g}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Glossary CTA */}
      <section className="res-section">
        <div className="rs-header">
          <div className="rs-eyebrow">Glossaire</div>
          <h2 className="rs-title">Envie d'aller plus loin ?</h2>
          <p className="rs-lead">Cliquez sur un biais ci-dessous pour comprendre ce qu'il fait dans votre tête, et comment il vous piège.</p>
        </div>

        <div className="glossary-grid">
          {BIASES.map(b => (
            <button key={b.key}
              className={`gloss-card glass-card${openBias === b.key ? ' open' : ''}`}
              onClick={() => setOpenBias(openBias === b.key ? null : b.key)}>
              <div className="gc-head">
                <span className="gc-name">{b.label}</span>
                <span className="gc-chev">{openBias === b.key ? '−' : '→'}</span>
              </div>
              {openBias === b.key && (
                <div className="gc-body">
                  <p>{b.def}</p>
                  <p className="gc-cue"><span className="caption">Voix intérieure :</span> <em>"{b.cue}"</em></p>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Footer actions */}
      <section className="res-actions">
        <button className="btn btn-secondary" onClick={onRestart}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
          Refaire le quiz
        </button>
        <button className="btn btn-primary" onClick={() => window.print()}>
          Télécharger le PDF <span className="arr">→</span>
        </button>
      </section>
    </div>
  );
}

window.Results = Results;
