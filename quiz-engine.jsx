// Quiz Engine — scoring + helpers

function calculateResults(answers, data) {
  const { QUESTIONS, PROFILES, COMBINED } = data;

  // 1) Means per dimension
  const sums = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  const counts = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  QUESTIONS.forEach(q => {
    const v = answers[q.id];
    if (v) { sums[q.dim] += v; counts[q.dim] += 1; }
  });
  const scores = {};
  Object.keys(sums).forEach(d => { scores[d] = counts[d] ? sums[d] / counts[d] : 0; });

  // 2) Euclidean distance to each profile
  const ranked = PROFILES.map(p => ({
    ...p,
    dist: Math.sqrt(
      (scores.O - p.O) ** 2 +
      (scores.C - p.C) ** 2 +
      (scores.E - p.E) ** 2 +
      (scores.A - p.A) ** 2 +
      (scores.N - p.N) ** 2
    )
  })).sort((a, b) => a.dist - b.dist);

  const dominant = ranked[0];
  const secondary = ranked[1];

  // 3) Combined key — try dom__sec first, fallback to dom__ (single)
  const combinedKey = `${dominant.key}__${secondary.key}`;
  const fallbackKey = `${dominant.key}__`;
  const combo = COMBINED[combinedKey] || COMBINED[fallbackKey];

  // 4) Confidence: how dominant is the dominant?
  const confidence = Math.max(0, Math.min(100, Math.round(100 * (1 - dominant.dist / (dominant.dist + secondary.dist + 0.0001)))));

  return { scores, dominant, secondary, ranked, combo, combinedKey };
}

// Profile emoji/glyph (used in result heading)
const PROFILE_GLYPH = {
  visionnaire:  '◆',
  speculateur:  '▲',
  analyste:     '■',
  conservateur: '●',
  enthousiaste: '✦',
};

window.QUIZ_ENGINE = { calculateResults, PROFILE_GLYPH };
