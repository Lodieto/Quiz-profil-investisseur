// Quiz Lleco — Data
// 25 questions, 5 dimensions OCEAN, 5 base profiles, combined matrix

const QUESTIONS = [
  // O — Ouverture
  { id: 1,  dim: 'O', text: "Je suis attiré(e) par les secteurs d'investissement émergents et volatils (crypto, tech de pointe)." },
  { id: 2,  dim: 'O', text: "Je suis prêt(e) à explorer de nouveaux narratifs de marché en dehors de mon domaine d'expertise." },
  { id: 3,  dim: 'O', text: "Avant d'investir, j'analyse en profondeur pour comprendre les nouveaux projets ou technologies." },
  { id: 4,  dim: 'O', text: "Je continue à suivre des projets intéressants même en l'absence d'opportunités à court terme." },
  { id: 5,  dim: 'O', text: "Je suis capable de m'engager dans des projets innovants en acceptant une réalisation potentielle sur plusieurs années." },
  // C — Conscienciosité
  { id: 6,  dim: 'C', text: "Avant de prendre des positions, je fixe des objectifs clairs et un horizon temporel précis." },
  { id: 7,  dim: 'C', text: "J'analyse les fondamentaux et l'historique de l'actif avant de prendre des positions." },
  { id: 8,  dim: 'C', text: "J'ajuste régulièrement mon portefeuille en fonction de l'évolution du marché et de mes objectifs." },
  { id: 9,  dim: 'C', text: "Je tiens un journal de mes décisions d'investissement (raisons d'achat/vente, raisonnement)." },
  { id: 10, dim: 'C', text: "Avant chaque décision, je suis un processus prédéfini (checklist, critères, cadre d'analyse)." },
  // E — Extraversion
  { id: 11, dim: 'E', text: "Je participe activement à des communautés ou groupes de discussion liés à l'investissement." },
  { id: 12, dim: 'E', text: "J'apprécie les échanges avec d'autres investisseurs lors de la construction de ma stratégie." },
  { id: 13, dim: 'E', text: "Les opinions de mon entourage ou de ma communauté influencent mes décisions d'investissement." },
  { id: 14, dim: 'E', text: "J'ai besoin de partager mes trades ou découvertes avec mon entourage ou sur les réseaux sociaux." },
  { id: 15, dim: 'E', text: "L'énergie collective lors des phases de marché à forte activité me stimule." },
  // A — Agréabilité
  { id: 16, dim: 'A', text: "Avant mes décisions, je tiens compte des conseils de mon entourage (amis, famille, communauté)." },
  { id: 17, dim: 'A', text: "Je tends à investir dans des projets à impact positif (social, environnemental, tech) au-delà du seul rendement." },
  { id: 18, dim: 'A', text: "Je préfère les projets avec collaboration ou partage des résultats avec d'autres investisseurs." },
  { id: 19, dim: 'A', text: "Lors de désaccords avec d'autres investisseurs, je cherche à comprendre leurs points de vue divergents." },
  { id: 20, dim: 'A', text: "La dimension communautaire (qualité, engagement des membres) influence ma décision d'investissement." },
  // N — Névrosisme
  { id: 21, dim: 'N', text: "Je ressens de l'anxiété quand la valeur de mon portefeuille fluctue fortement." },
  { id: 22, dim: 'N', text: "Je suis mal à l'aise avec des positions à risque élevé, même si le potentiel de rendement est important." },
  { id: 23, dim: 'N', text: "Mes émotions me poussent à modifier mes décisions d'investissement (vente prématurée, réduction d'exposition)." },
  { id: 24, dim: 'N', text: "La performance de mon portefeuille affecte mon sommeil, mon humeur ou mon bien-être quotidien." },
  { id: 25, dim: 'N', text: "Je ressens de l'anxiété ou le besoin de vérifier mes positions quand je suis éloigné(e) du marché plusieurs jours." },
];

const DIMENSIONS = {
  O: { label: 'Ouverture',       hint: 'Curiosité, exploration de nouveaux narratifs' },
  C: { label: 'Conscienciosité', hint: 'Méthode, rigueur, processus' },
  E: { label: 'Extraversion',    hint: 'Énergie sociale, communautés' },
  A: { label: 'Agréabilité',     hint: 'Coopération, écoute, sens collectif' },
  N: { label: 'Névrosisme',      hint: 'Sensibilité émotionnelle face aux marchés' },
};

const PROFILES = [
  { key: 'visionnaire',  label: 'Le Visionnaire',  short: 'Visionnaire',  accent: 'turquoise',
    O: 5, C: 1.5, E: 3, A: 3, N: 3,
    tagline: 'Pionnier des marchés de demain',
    description: "Tu perçois les opportunités avant les autres. Ta capacité à anticiper les mégatendances et à t'engager sur le long terme est ton atout majeur. Tu investis avec conviction dans ce que le marché n'a pas encore compris.",
    forces: ['Vision long terme', 'Tolérance à la volatilité', 'Pensée contrariante'] },
  { key: 'speculateur',  label: 'Le Spéculateur',  short: 'Spéculateur',  accent: 'orange',
    O: 4, C: 2, E: 4, A: 2, N: 4,
    tagline: "Chasseur d'opportunités à fort impact",
    description: "Tu vis au rythme des marchés. Réactif et agile, tu sais saisir les opportunités quand elles se présentent. Le momentum est ta langue natale et tu prospères dans les phases d'accélération.",
    forces: ['Réactivité', 'Agilité tactique', 'Lecture du momentum'] },
  { key: 'analyste',     label: "L'Analyste",      short: 'Analyste',     accent: 'turquoise',
    O: 3, C: 5, E: 3, A: 3, N: 2,
    tagline: 'La rigueur comme avantage compétitif',
    description: "Tu ne laisses rien au hasard. Méthodique et discipliné, tu construis tes positions sur des bases solides. Là où les autres voient du bruit, tu identifies du signal. Ta force : la constance.",
    forces: ['Rigueur analytique', 'Discipline émotionnelle', 'Processus décisionnel structuré'] },
  { key: 'conservateur', label: 'Le Conservateur', short: 'Conservateur', accent: 'green',
    O: 1, C: 4, E: 2, A: 3, N: 3.5,
    tagline: 'La préservation du capital avant tout',
    description: "Ta priorité absolue : ne pas perdre. Tu construis sur des bases sûres, préfères la régularité à la performance spectaculaire, et dors bien la nuit. Dans les marchés baissiers, tu es celui qui survit.",
    forces: ['Gestion du risque', 'Sérénité dans la volatilité', 'Capital préservé pour les opportunités'] },
  { key: 'enthousiaste', label: "L'Enthousiaste",  short: 'Enthousiaste', accent: 'orange',
    O: 4, C: 2, E: 5, A: 3, N: 3,
    tagline: "Le moteur social de l'investissement",
    description: "Tu es branché(e) sur le pouls de la communauté. Tu détectes les narratifs émergents tôt, tu fédères autour de tes convictions et tu sais quand l'énergie collective tourne. Ton réseau est ton actif le plus précieux.",
    forces: ['Détection précoce des narratifs', 'Intelligence collective', 'Énergie et leadership'] },
];

const BIASES = [
  { key: 'fomo',         label: 'FOMO',                 short: 'FOMO',
    def: "Peur de manquer une opportunité. Pousse à entrer trop tard sur un mouvement déjà avancé, souvent au plus haut.",
    cue: "« Tout le monde en parle, je dois rentrer maintenant. »" },
  { key: 'disponibilite', label: 'Disponibilité',       short: 'Dispo.',
    def: "Surévaluer ce qu'on a vu récemment. Les news fraîches, les anecdotes virales pèsent plus que les données froides.",
    cue: "« J'ai vu trois posts là-dessus aujourd'hui, c'est forcément le bon moment. »" },
  { key: 'aversion',      label: 'Aversion à la perte', short: 'Aversion',
    def: "La douleur de perdre 100€ est ~2× supérieure au plaisir d'en gagner 100. Conduit à l'inaction ou à couper les gagnants.",
    cue: "« Je préfère ne rien faire pour ne pas me tromper. »" },
  { key: 'confiance',     label: 'Excès de confiance',  short: 'Confiance',
    def: "Surestimer sa capacité à prévoir. Un bon trade nourrit l'illusion de compétence là où il n'y avait que de la chance.",
    cue: "« J'ai eu raison la dernière fois, je vais doubler la mise. »" },
  { key: 'ancrage',       label: 'Ancrage',             short: 'Ancrage',
    def: "S'attacher au prix d'achat ou à un seuil mental. La décision se fait par rapport à ce point, pas par rapport au présent.",
    cue: "« Je revendrai quand ça reviendra à mon prix d'entrée. »" },
  { key: 'confirmation',  label: 'Confirmation',        short: 'Confirm.',
    def: "Chercher uniquement les infos qui confortent sa thèse. Filtre actif contre tout ce qui pourrait l'invalider.",
    cue: "« Cet analyste pense pareil que moi, donc j'ai raison. »" },
  { key: 'couts',         label: 'Coûts irrécupérables', short: 'Coûts',
    def: "Continuer parce qu'on a déjà investi (temps, argent, ego). Le passé ne devrait jamais commander la décision présente.",
    cue: "« J'ai trop perdu pour vendre maintenant. »" },
];

// Combined profiles matrix.
// Key format: dominantKey + '__' + secondaryKey OR dominantKey + '__' (single profile = exact match dominante seule)
// Bias scores order: [FOMO, Disponibilité, Aversion, Confiance, Ancrage, Confirmation, Coûts]
const COMBINED = {
  'visionnaire__':              { biases: [7,7,5,4,3,2,2], vigilance: "Particulièrement exposé au biais de confirmation et aux coûts irrécupérables. Sa conviction — force à l'entrée — devient un piège quand les fondamentaux se dégradent.", garde: ["Définir des critères d'invalidation à froid, avant l'entrée", "Identifier 2 sources qui challengent activement la thèse", "Audit trimestriel : la thèse tient-elle toujours ?"] },
  'analyste__':                 { biases: [7,6,6,3,3,3,5], vigilance: "Particulièrement exposé à l'excès de confiance, à l'ancrage technique et au biais de confirmation. Sa maîtrise méthodologique filtre les signaux fondamentaux.", garde: ["Contrôle fondamental systématique avant chaque décision", "Intégrer une marge d'erreur explicite à chaque projection", "Confronter une thèse contraire avant validation"] },
  'conservateur__':             { biases: [8,3,3,7,5,5,7], vigilance: "Particulièrement exposé au biais de disponibilité et à l'aversion à la perte. Sa prudence produit de l'inaction.", garde: ["Routine de suivi régulière (hebdomadaire ou bimensuelle)", "Règles d'ajustement d'exposition prédéfinies", "Tester l'inaction : « est-ce une décision ou une fuite ? »"] },
  'enthousiaste__':             { biases: [2,2,3,2,4,3,4], vigilance: "Exposé à l'ensemble des biais — FOMO, excès de confiance, biais de disponibilité. Son ouverture d'esprit opère sans cadre analytique.", garde: ["Exposition conservatrice par défaut", "Sizing minimal sur toute nouvelle position", "Journalisation systématique avant chaque entrée"] },
  'speculateur__':              { biases: [2,3,4,3,5,5,6], vigilance: "Particulièrement exposé au FOMO et à l'excès de confiance. Sa réactivité court-circuite l'analyse.", garde: ["Nombre maximal de positions ouvertes défini à l'avance", "Règle de prise de profits systématique (paliers)", "Délai de réflexion obligatoire avant chaque entrée"] },

  'visionnaire__speculateur':   { biases: [5,5,4,3,4,3,4], vigilance: "Conviction + réactivité amplifient l'excès de confiance et le biais de confirmation.", garde: ["Sizing strict, jamais d'exposition « par envie »", "Règle de prise de profits systématique", "Critères d'invalidation définis à froid"] },
  'speculateur__visionnaire':   { biases: [4,5,5,4,4,4,4], vigilance: "Profil équilibré mais sans point fort marqué. Le FOMO reste le point faible.", garde: ["Plafonner le nombre de positions ouvertes", "Délai de réflexion avant chaque entrée", "Revue mensuelle des thèses long terme"] },
  'visionnaire__analyste':      { biases: [7,6,6,3,2,2,3], vigilance: "Double rigidité — vulnérabilité critique au biais de confirmation et à l'ancrage.", garde: ["Sources contradictoires systématiques (au moins 2)", "Marges d'erreur explicites dans chaque projection", "Réviser la thèse à intervalle fixe, pas selon le marché"] },
  'analyste__visionnaire':      { biases: [7,7,5,4,2,1,4], vigilance: "Biais de confirmation au plancher (1/10). Combinaison la plus imperméable à la remise en question.", garde: ["Protocole de remise en question périodique (mensuel)", "Critères d'invalidation non négociables, écrits", "Lecture obligatoire d'une analyse contraire / mois"] },
  'visionnaire__conservateur':  { biases: [8,5,4,5,4,3,4], vigilance: "Forte résistance au FOMO. Le biais de confirmation reste le point faible.", garde: ["Critères d'invalidation écrits avant l'entrée", "Routine de suivi régulière", "Définir un seuil de sortie max et min"] },
  'conservateur__visionnaire':  { biases: [8,5,4,6,4,4,5], vigilance: "Bien protégé contre FOMO et excès de confiance. L'aversion à la perte et l'ancrage peuvent produire de l'inaction prolongée.", garde: ["Règles d'ajustement d'exposition prédéfinies", "Calendrier de re-balancing fixe", "Identifier une « inaction = décision » claire"] },
  'visionnaire__enthousiaste':  { biases: [5,5,4,3,4,2,3], vigilance: "Très exposé au biais de confirmation. Attachement émotionnel fort aux thèses.", garde: ["Sizing conservateur sur toute nouvelle conviction", "Journalisation systématique", "Une voix dissidente identifiée pour chaque thèse"] },
  'enthousiaste__visionnaire':  { biases: [4,4,4,3,3,1,3], vigilance: "Biais de confirmation au plancher (1/10). Verrouillage total sur les thèses adoptées.", garde: ["Exposition minimale par position", "Sources contradictoires obligatoires", "Journalisation des raisons d'achat ET des raisons de doute"] },
  'speculateur__analyste':      { biases: [4,4,5,2,4,4,5], vigilance: "Très exposé à l'excès de confiance — illusion de compétence.", garde: ["Sizing strict, indépendant du « feeling »", "Marges d'erreur systématiques sur les targets", "Tracker le hit-rate réel, pas le ressenti"] },
  'analyste__speculateur':      { biases: [5,5,5,2,4,4,6], vigilance: "Excès de confiance au plancher. Décisions rapides avec certitude injustifiée.", garde: ["Marges d'erreur dans chaque projection", "Règle de prise de profits systématique", "Délai obligatoire entre signal et exécution"] },
  'speculateur__conservateur':  { biases: [4,2,3,5,5,5,7], vigilance: "Vulnérabilité marquée au biais de disponibilité et à l'aversion à la perte.", garde: ["Délai de réflexion avant chaque décision", "Routine de suivi régulière", "Limiter les sources d'information à 3 max"] },
  'conservateur__speculateur':  { biases: [6,2,4,5,5,5,6], vigilance: "Vulnérable au biais de disponibilité. Prudence + réactivité amplifient l'impact émotionnel.", garde: ["Protocole de risque externe (revue par tiers)", "Limitation stricte des sources d'information", "Délai 24h entre news et décision"] },
  'speculateur__enthousiaste':  { biases: [1,1,3,1,4,4,5], vigilance: "COMBINAISON LA PLUS EXPOSÉE. Plancher sur 3 biais : FOMO, disponibilité, excès de confiance (1/10).", garde: ["Exposition minimale, plafond strict du portefeuille à risque", "Sizing plancher sur toute nouvelle entrée", "Nombre de positions limité, journalisation obligatoire"] },
  'enthousiaste__speculateur':  { biases: [1,2,4,2,5,4,5], vigilance: "FOMO au plancher (1/10). Excès de confiance et disponibilité très faibles.", garde: ["Cadre analytique strict avant toute entrée", "Sizing minimal", "Délai obligatoire de 24h avant chaque décision"] },
  'analyste__conservateur':     { biases: [8,5,5,5,4,4,6], vigilance: "COMBINAISON LA PLUS ROBUSTE. Jamais en dessous de 4/10. FOMO fort (8/10).", garde: ["Garder de la flexibilité : tester plusieurs scénarios", "Contrôle fondamental régulier", "Forcer une décision active par mois (anti-paralysie)"] },
  'conservateur__analyste':     { biases: [8,4,4,5,4,4,6], vigilance: "Bien protégé contre le FOMO (8/10). Profil équilibré.", garde: ["Routine de suivi mensuelle", "Règles d'ajustement d'exposition prédéfinies", "Identifier les signaux d'opportunité ratés a posteriori"] },
  'analyste__enthousiaste':     { biases: [5,4,5,1,4,2,4], vigilance: "Excès de confiance au plancher (1/10). Certitude maximale sans fondement solide.", garde: ["Marges d'erreur larges et explicites", "Remise en question systématique avant validation", "Confronter chaque thèse à un pair externe"] },
  'enthousiaste__analyste':     { biases: [4,4,4,2,3,2,5], vigilance: "Très exposé à l'excès de confiance et au biais de confirmation. L'Enthousiaste adopte les outils sans en mesurer les limites.", garde: ["Sizing conservateur sur toute nouvelle position", "Validation fondamentale systématique", "Identifier l'angle mort de chaque outil utilisé"] },
  'conservateur__enthousiaste': { biases: [6,1,2,5,4,4,6], vigilance: "Biais de disponibilité au plancher (1/10). Aversion à la perte critique (2/10). Prudence + inexpérience = paralysie.", garde: ["Exposition progressive par paliers", "Routine de suivi obligatoire", "Forcer une mise en action mensuelle minimale"] },
  'enthousiaste__conservateur': { biases: [4,2,2,4,5,4,5], vigilance: "Vulnérable au biais de disponibilité et à l'aversion à la perte (2/10). Cycle d'inaction puis rupture impulsive.", garde: ["Exposition conservatrice", "Sizing minimal", "Journalisation systématique pour identifier les cycles"] },
};

// Portrait robot — generated per dominant profile, hint of secondary
const PORTRAIT_ROBOT = {
  visionnaire: "Tu commences ta journée par un long format — un essai, un papier, un thread. Le screen reste fermé jusqu'à 11h. Quand une news casse l'ambiance, tu attends 24h avant de réagir : tu veux voir si ça change ta thèse à 3 ans. Ton portefeuille bouge peu, mais chaque ligne pèse une conviction écrite.",
  speculateur:  "Tu ouvres TradingView avant ton café. Trois écrans, un Discord en sourdine, deux alertes prix qui tournent. Tu lis vite, tu agis vite, tu sors vite. La news du jour, tu la traites en 20 minutes — entrée, stop, take profit. Le soir, tu fais le bilan : combien de trades, combien de gagnants, qu'est-ce qui a fonctionné.",
  analyste:     "Ta journée commence par ta checklist. Tu ouvres ton spreadsheet, tu mets à jour les ratios, tu vérifies si un seuil est touché. Tu ne regardes le marché qu'à des moments fixes — 9h, 14h, 18h. Avant chaque décision, tu remplis ton modèle. Si la conclusion ne sort pas claire, tu attends. La discipline est ta principale source d'alpha.",
  conservateur: "Tu jettes un œil à ton portefeuille en buvant ton café — pas plus de 2 minutes. Pas d'alertes, pas de Twitter, pas de Discord. Tu fais un point complet une fois par semaine, sur un format papier. Une news anxiogène ? Tu attends le week-end pour décider. Ton sommeil compte plus que tout signal court terme.",
  enthousiaste: "Twitter ouvert dès le réveil, Discord allumé, deux groupes Telegram qui pingent. Tu sens le vent tourner avant les autres parce que tu écoutes la communauté. Tu partages, tu discutes, tu confrontes. Le risque : agir sur l'énergie du chat sans vérifier. Tu construis ta vision en marchant — il te faut un rituel pour t'arrêter et écrire."
};

window.QUIZ_DATA = { QUESTIONS, DIMENSIONS, PROFILES, BIASES, COMBINED, PORTRAIT_ROBOT };
