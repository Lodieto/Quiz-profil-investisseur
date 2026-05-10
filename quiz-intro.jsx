// Intro Screen
const { useState, useEffect, useMemo, useRef } = React;

function Intro({ onStart }) {
  return (
    <div className="intro-wrap">
      <div className="intro-orb orb-t" />
      <div className="intro-orb orb-g" />
      <div className="intro-orb orb-o" />

      <div className="intro-inner">
        <div className="intro-eyebrow">
          <span className="dot" /> Quiz Profil Investisseur · Méthode Lleco
        </div>

        <h1 className="intro-title">
          Découvrez votre <span className="kw">psychologie</span> face aux marchés.
        </h1>

        <p className="intro-lead">
          Un test de profilage basé sur le modèle Big Five (OCEAN), conçu par une psychologue agréée.
          On ne juge pas votre stratégie : on révèle vos angles morts pour que vos décisions vous appartiennent vraiment.
        </p>

        <div className="intro-meta">
          <div className="meta-item"><div className="meta-num">25</div><div className="meta-lbl">questions</div></div>
          <div className="meta-sep" />
          <div className="meta-item"><div className="meta-num">5</div><div className="meta-lbl">dimensions</div></div>
          <div className="meta-sep" />
          <div className="meta-item"><div className="meta-num">~12</div><div className="meta-lbl">minutes</div></div>
        </div>

        <div className="intro-actions">
          <button className="btn btn-primary intro-cta" onClick={onStart}>
            Commencer le quiz <span className="arr">→</span>
          </button>
          <span className="intro-note">Aucune inscription · vos réponses restent locales</span>
        </div>

        <div className="intro-cards">
          <div className="ic-card">
            <div className="ic-mark turquoise">◆</div>
            <div className="ic-h">Votre profil combiné</div>
            <div className="ic-p">Dominant + secondaire, parmi 5 archétypes (Visionnaire, Spéculateur, Analyste, Conservateur, Enthousiaste).</div>
          </div>
          <div className="ic-card">
            <div className="ic-mark green">▲</div>
            <div className="ic-h">Radar de résistance</div>
            <div className="ic-p">7 biais cognitifs scorés de 0 à 10. On voit où vous tenez et où vous flanchez.</div>
          </div>
          <div className="ic-card">
            <div className="ic-mark orange">●</div>
            <div className="ic-h">Checklist de survie</div>
            <div className="ic-p">Vos garde-fous transformés en actions à copier dans votre journal d'investissement.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Intro = Intro;
