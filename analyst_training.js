'use strict';
/* ════════════════════════════════════════════════
   IB Prep · Analyst Training Lab
   Static, local-first modules built on top of flashcards
════════════════════════════════════════════════ */

const TRAINING_STORE_KEY = 'ibprep_analyst_training_v1';

const trainingUiState = {
  tab: 'case-lab',
  caseId: 'case-orsted-rights',
  toolId: 'terp',
  mapId: 'rights-issue',
  actorId: null,
};

const TRAINING_CASES = [
  {
    id: 'case-fundamentals',
    title: 'Nordic IB Fundamentals',
    type: 'Foundations',
    focus: 'Terminologi, processer og analyst judgement',
    asset: 'Assets/Case_0_Nordic_IB_Fundamentals_Opgavesaet.docx',
    summary: 'Træn det brede fundament: hvordan ECM, M&A, valuation, process partners og interne roller hænger sammen i nordisk investment banking.',
    task: 'Lav en analyst-style briefing, der forklarer hvilke workstreams der typisk driver en transaktion, og hvor junior judgement skaber reel værdi.',
    skills: ['process', 'terminology', 'stakeholders'],
    prompts: [
      'Hvilke tre workstreams ville du prioritere først, hvis du blev staffed på en ny dansk IB-case?',
      'Hvor opstår de typiske fejl for en ny analyst: tal, process, kommunikation eller kontekst?',
      'Hvordan ved du, om en analyse er “decision-useful” og ikke bare korrekt?'
    ],
    keywords: ['workstream', 'valuation', 'process', 'stakeholder', 'execution', 'qc', 'timeline', 'deliverable'],
  },
  {
    id: 'case-orsted-rights',
    title: 'Ørsted Rights Issue 2025',
    type: 'ECM',
    focus: 'Rights issue, TERP, dilution og underwriting',
    asset: 'Assets/Case_1_Orsted_Rights_Issue_2025_Opgavesaet_final.docx',
    summary: 'Fortegningsemission med stor balance sheet- og markedsdimension. Brug casen til at forstå TERP, tegningsretter, dilution, investor messaging og execution risk.',
    task: 'Forklar om emissionen er attraktiv for eksisterende aktionærer, og hvilke markeds- og execution-risici banken skal styre.',
    skills: ['ecm', 'valuation', 'process', 'stakeholders'],
    prompts: [
      'Hvordan forklarer du TERP og dilution til en ikke-teknisk stakeholder?',
      'Hvilke signaler sender størrelsen, rabatten og underwritingen til markedet?',
      'Hvor kan execution risk opstå før launch, under tegningsperioden og efter closing?'
    ],
    keywords: ['terp', 'dilution', 'rights', 'discount', 'underwriting', 'proceeds', 'shareholder', 'market risk'],
  },
  {
    id: 'case-dsv-abb',
    title: 'DSV ABB 2024',
    type: 'ECM',
    focus: 'Accelerated bookbuild, demand og allocation',
    asset: 'Assets/Case_2_DSV_ABB_2024_Opgavesaet.docx',
    summary: 'Overnight equity placement med fokus på wall-crossing, investor demand, price discovery, allocation quality og aftermarket.',
    task: 'Vurder hvordan banken bør styre bogen fra launch til pricing og allocation.',
    skills: ['ecm', 'process', 'stakeholders'],
    prompts: [
      'Hvilke investorer er vigtigst at have i bogen, og hvorfor?',
      'Hvordan balancerer man pris, execution certainty og aftermarket performance?',
      'Hvilke datapunkter i shadow booken ville du eskalere til deal captain?'
    ],
    keywords: ['abb', 'bookbuild', 'wall-cross', 'allocation', 'oversubscription', 'discount', 'long-only', 'aftermarket'],
  },
  {
    id: 'case-nykredit-spar',
    title: 'Nykredit / Spar Nord Public M&A',
    type: 'M&A',
    focus: 'Public takeover, premium og deal certainty',
    asset: 'Assets/Case_3_Nykredit_Spar_Nord_Public_MA_Opgavesaet.docx',
    summary: 'Public M&A-case med fokus på offer premium, bestyrelsesproces, regulatoriske approvals, aktionæraccept og certainty.',
    task: 'Vurder buddet fra både køber, target-board og minoritetsaktionærernes perspektiv.',
    skills: ['ma', 'valuation', 'stakeholders', 'process'],
    prompts: [
      'Er præmien nok til at sikre anbefaling og accept?',
      'Hvilke conditions kan true deal certainty?',
      'Hvordan adskiller public M&A judgement sig fra en privat sell-side proces?'
    ],
    keywords: ['premium', 'offer', 'acceptance', 'board', 'minority', 'regulatory', 'certainty', 'fairness'],
  },
  {
    id: 'case-verisure-ipo',
    title: 'Verisure IPO 2025',
    type: 'IPO',
    focus: 'Equity story, valuation range og investor education',
    asset: 'Assets/Case_4_Verisure_IPO_2025_Opgavesaet.docx',
    summary: 'IPO-case med fokus på equity story, peer selection, valuation range, cornerstone demand, governance og market window.',
    task: 'Byg en kort IPO-readiness vurdering og forklar hvilke investor concerns der skal håndteres før launch.',
    skills: ['ecm', 'valuation', 'process', 'communication'],
    prompts: [
      'Hvad skal equity storyen bevise for at retfærdiggøre multiplen?',
      'Hvilke peers er mest relevante, og hvor kan comps blive misvisende?',
      'Hvad kan lukke IPO-vinduet, selv hvis selskabet er stærkt?'
    ],
    keywords: ['ipo', 'equity story', 'valuation range', 'peers', 'cornerstone', 'governance', 'market window', 'prospectus'],
  },
  {
    id: 'case-adevinta-lbo',
    title: 'Adevinta Take-Private LBO',
    type: 'LBO',
    focus: 'Sponsor economics, leverage og exit case',
    asset: 'Assets/Case_5_Adevinta_Take_Private_LBO_Opgavesaet.docx',
    summary: 'Take-private / LBO-case med fokus på entry multiple, leverage capacity, operational value creation, exit multiple og IRR.',
    task: 'Vurder om sponsor-casen hænger sammen, og hvilke antagelser der er mest skrøbelige.',
    skills: ['ma', 'valuation', 'modelling', 'stakeholders'],
    prompts: [
      'Hvilke value creation levers driver sponsorens underwriting?',
      'Hvor følsom er IRR over for entry multiple, leverage og exit multiple?',
      'Hvilke stakeholder-konflikter opstår mellem sponsor, lenders, board og minoriteter?'
    ],
    keywords: ['lbo', 'irr', 'moic', 'leverage', 'exit multiple', 'entry multiple', 'cash flow', 'sponsor'],
  },
  {
    id: 'case-penneo-visma',
    title: 'Penneo / Visma Public Takeover',
    type: 'M&A',
    focus: 'SaaS valuation, takeover offer og fairness',
    asset: 'Assets/Case_6_Penneo_Visma_Public_Takeover_SaaS_MA_Opgavesaet.docx',
    summary: 'Public takeover af SaaS-selskab med fokus på offer premium, trading comps, strategic rationale, board duties og shareholder dynamics.',
    task: 'Forklar om offeret virker fair, og hvilke argumenter der er stærkest for henholdsvis board, bidder og minoriteter.',
    skills: ['ma', 'valuation', 'stakeholders', 'communication'],
    prompts: [
      'Hvordan vurderer du fairness, når historisk trading, premium og strategic value peger i forskellige retninger?',
      'Hvad vil minoritetsaktionærer typisk være skeptiske overfor?',
      'Hvordan bør en analyst strukturere en fairness-support slide?'
    ],
    keywords: ['saas', 'premium', 'fairness', 'trading comps', 'strategic buyer', 'minority', 'board', 'takeover'],
  },
];

const TRAINING_TABS = [
  { id: 'case-lab', label: 'Case Lab', icon: 'briefcase' },
  { id: 'workbench', label: 'Workbench', icon: 'calculator' },
  { id: 'stakeholders', label: 'Stakeholders', icon: 'network' },
  { id: 'feedback', label: 'Feedback', icon: 'clipboard-check' },
  { id: 'prompt-helper', label: 'LLM Prompt', icon: 'copy' },
  { id: 'adaptive-dashboard', label: 'Adaptive', icon: 'radar' },
];

const RUBRIC_DIMENSIONS = [
  { id: 'market', label: 'Market mechanics', skill: 'ecm', hint: 'Forstår pris, demand, window, liquidity og investor behaviour.' },
  { id: 'valuation', label: 'Valuation judgement', skill: 'valuation', hint: 'Bruger multiples, premiums, DCF/LBO logic og sensitivities rigtigt.' },
  { id: 'process', label: 'Process control', skill: 'process', hint: 'Ser timeline, deliverables, approvals, dependencies og execution risk.' },
  { id: 'stakeholders', label: 'Stakeholder logic', skill: 'stakeholders', hint: 'Forklarer incitamenter, konflikter og hvem der skal overbevises.' },
  { id: 'modelling', label: 'Model discipline', skill: 'modelling', hint: 'Tænker i drivers, checks, bridges, sensitivities og QC.' },
  { id: 'communication', label: 'Analyst communication', skill: 'communication', hint: 'Svar er struktureret, kort, beslutningsorienteret og escalation-ready.' },
];

const WORKBENCH_TOOLS = {
  terp: {
    id: 'terp',
    title: 'Rights Issue TERP & Dilution',
    icon: 'percent',
    skill: 'ecm',
    description: 'Beregn TERP, tegningsrabat og ownership dilution for en fortegningsemission.',
    inputs: [
      { key: 'oldPrice', label: 'Aktiekurs før emission', suffix: 'DKK', value: 380 },
      { key: 'oldShares', label: 'Eksisterende aktier', suffix: 'm', value: 420 },
      { key: 'newShares', label: 'Nye aktier', suffix: 'm', value: 170 },
      { key: 'issuePrice', label: 'Tegningskurs', suffix: 'DKK', value: 220 },
    ],
  },
  abb: {
    id: 'abb',
    title: 'ABB Pricing & Proceeds',
    icon: 'trending-up',
    skill: 'ecm',
    description: 'Tjek discount, gross proceeds og stake sold i en accelerated bookbuild.',
    inputs: [
      { key: 'closePrice', label: 'Lukkekurs', suffix: 'DKK', value: 1520 },
      { key: 'offerPrice', label: 'Placeringskurs', suffix: 'DKK', value: 1450 },
      { key: 'sharesSold', label: 'Aktier solgt', suffix: 'm', value: 25.7 },
      { key: 'totalShares', label: 'Aktier udestående', suffix: 'm', value: 220 },
      { key: 'sellerBefore', label: 'Sælgers aktier før ABB', suffix: 'm', value: 60 },
    ],
  },
  offer: {
    id: 'offer',
    title: 'Offer Premium & Equity Value',
    icon: 'badge-percent',
    skill: 'valuation',
    description: 'Beregn offer premium, equity value og enterprise value i public M&A.',
    inputs: [
      { key: 'unaffectedPrice', label: 'Uforstyrret aktiekurs', suffix: 'DKK', value: 94 },
      { key: 'offerPrice', label: 'Budpris', suffix: 'DKK', value: 118 },
      { key: 'shares', label: 'Aktier udestående', suffix: 'm', value: 128 },
      { key: 'netDebt', label: 'Net debt', suffix: 'DKKm', value: 1850 },
    ],
  },
  evbridge: {
    id: 'evbridge',
    title: 'EV to Equity Bridge',
    icon: 'scale',
    skill: 'valuation',
    description: 'Byg den simple bro fra enterprise value til equity value.',
    inputs: [
      { key: 'enterpriseValue', label: 'Enterprise value', suffix: 'DKKm', value: 15000 },
      { key: 'netDebt', label: 'Net debt', suffix: 'DKKm', value: 2600 },
      { key: 'minorities', label: 'Minorities', suffix: 'DKKm', value: 150 },
      { key: 'associates', label: 'Associates / investments', suffix: 'DKKm', value: 400 },
      { key: 'options', label: 'Option proceeds / adjustments', suffix: 'DKKm', value: 0 },
    ],
  },
  lbo: {
    id: 'lbo',
    title: 'LBO Quick Check',
    icon: 'line-chart',
    skill: 'modelling',
    description: 'Hurtig sponsor sanity-check på entry EV, leverage, exit equity, MOIC og IRR.',
    inputs: [
      { key: 'entryEbitda', label: 'Entry EBITDA', suffix: 'DKKm', value: 950 },
      { key: 'entryMultiple', label: 'Entry multiple', suffix: 'x', value: 12.0 },
      { key: 'debtMultiple', label: 'Debt / EBITDA', suffix: 'x', value: 5.0 },
      { key: 'exitEbitda', label: 'Exit EBITDA', suffix: 'DKKm', value: 1250 },
      { key: 'exitMultiple', label: 'Exit multiple', suffix: 'x', value: 11.0 },
      { key: 'debtRepaid', label: 'Debt repaid by exit', suffix: 'DKKm', value: 1800 },
      { key: 'holdYears', label: 'Holding period', suffix: 'år', value: 5 },
    ],
  },
};

const STAKEHOLDER_MAPS = [
  {
    id: 'rights-issue',
    title: 'Rights Issue',
    context: 'Kapitalrejsning hvor eksisterende aktionærer får tegningsretter. Judgement handler om need, discount, dilution, underwriting og shareholder support.',
    actors: [
      { id: 'issuer', name: 'Issuer', role: 'Skal rejse kapital med troværdig equity story.', wants: 'Lav execution risk, acceptable dilution, stabil kurs efter deal.', risk: 'For lav tillid til plan eller for stor rabat.', check: 'Use of proceeds, leverage target, underwriting, investor education.' },
      { id: 'board', name: 'Board', role: 'Skal kunne forsvare timing, struktur og fairness.', wants: 'Fiduciary defensibility og lige behandling.', risk: 'Kritik fra eksisterende aktionærer eller proxy/advisers.', check: 'Alternativer, size vs. need, governance og disclosure.' },
      { id: 'shareholders', name: 'Shareholders', role: 'Skal vælge om de tegner, sælger retter eller udvandes.', wants: 'Bevare ownership og undgå værditab.', risk: 'Economic dilution hvis de ikke deltager.', check: 'TERP, value of rights, subscription ratio og rationale.' },
      { id: 'underwriters', name: 'Banks', role: 'Strukturerer, underwriter og distribuerer risiko.', wants: 'Certainty, fee, league-table credit og no failed deal.', risk: 'Large residual position eller weak aftermarket.', check: 'Sub-underwriting, wall-crossing, shadow demand og timetable.' },
      { id: 'regulator', name: 'Regulator / Exchange', role: 'Sikrer prospekt, disclosure og markedsintegritet.', wants: 'Korrekt information og fair process.', risk: 'Timing delays, supplement krav eller disclosure issues.', check: 'Prospectus status, MAR, announcements, approvals.' },
    ],
    frictions: ['Discount vs. signalværdi', 'Speed vs. dokumentationskrav', 'Underwriting certainty vs. fee/risk', 'Existing holders vs. new capital need'],
  },
  {
    id: 'abb',
    title: 'Accelerated Bookbuild',
    context: 'Overnight placement hvor pris og allokering fastsættes gennem hurtig investor demand. Judgement handler om speed, quality of book og aftermarket.',
    actors: [
      { id: 'seller', name: 'Seller', role: 'Vil sælge aktier hurtigt og diskret.', wants: 'Høj pris, lav market impact, clean exit eller deleksit.', risk: 'For stor rabat eller negativt signal.', check: 'Lock-up, stake sold, residual ownership, wall-cross list.' },
      { id: 'issuer', name: 'Issuer', role: 'Påvirkes af shareholder base og kursreaktion.', wants: 'Stabilt aftermarket og kvalitet i ejerbasen.', risk: 'Fast-money dominerer bogen.', check: 'Investor quality, allocation, communication with issuer.' },
      { id: 'investors', name: 'Investors', role: 'Byder baseret på discount, liquidity og conviction.', wants: 'At få size på attraktiv pris.', risk: 'Winner’s curse eller svag aftermarket.', check: 'Demand depth, price limits, long-only vs. hedge fund.' },
      { id: 'bank', name: 'Bookrunner', role: 'Driver price discovery, book updates og allocation.', wants: 'Covered book, credible clearing price, no settlement issues.', risk: 'Leaking, crossed wall, allocation errors.', check: 'Shadow book, coverage ratio, order quality, allocations.' },
    ],
    frictions: ['Pris vs. execution certainty', 'Long-only priority vs. max proceeds', 'Speed vs. compliance', 'Seller liquidity vs. issuer aftermarket'],
  },
  {
    id: 'sell-side',
    title: 'Sell-Side M&A',
    context: 'Struktureret salgsproces hvor bankens judgement er at maksimere pris uden at miste momentum eller deal certainty.',
    actors: [
      { id: 'seller', name: 'Seller', role: 'Vil maksimere pris og certainty.', wants: 'Competitive tension og få leakage.', risk: 'Proces fatigue eller lav troværdighed.', check: 'Buyer universe, timetable, bid instructions.' },
      { id: 'buyer', name: 'Strategic Buyer', role: 'Køber synergier og strategisk kontrol.', wants: 'Eksklusivitet, realistiske synergies og defensible price.', risk: 'Overpaying eller integration risk.', check: 'Synergy bridge, antitrust, SPA asks.' },
      { id: 'sponsor', name: 'PE Fund', role: 'Byder på basis af leverage og exit upside.', wants: 'DD access, financing, clear value creation case.', risk: 'Debt market, exit multiple, management alignment.', check: 'LBO returns, financing proof, DD request list.' },
      { id: 'management', name: 'Management', role: 'Skal præsentere casen og drive driften samtidigt.', wants: 'Troværdig plan og god future role.', risk: 'Distraction eller weak Q&A.', check: 'Management presentation, Q&A log, forecast support.' },
      { id: 'bank', name: 'Sell-side Bank', role: 'Designer process og holder tension.', wants: 'High price, clean process, strong client trust.', risk: 'Information leaks, late DD issues, bid drop-outs.', check: 'Bid comparison, VDR activity, SPA mark-ups.' },
    ],
    frictions: ['Pris vs. certainty', 'Bred auktion vs. confidentiality', 'Management access vs. disruption', 'Fast timetable vs. buyer DD depth'],
  },
  {
    id: 'public-ma',
    title: 'Public M&A / Takeover',
    context: 'Offentligt bud hvor board recommendation, premium, acceptgrad, regulatoriske vilkår og fairness er centrale.',
    actors: [
      { id: 'bidder', name: 'Bidder', role: 'Vil opnå kontrol på acceptable vilkår.', wants: 'Recommendation, high accept, limited topping risk.', risk: 'Regulatorisk stop eller competing bid.', check: 'Conditions, financing, offer premium, strategic rationale.' },
      { id: 'target-board', name: 'Target Board', role: 'Skal vurdere fairness og stakeholder impact.', wants: 'Defensible recommendation og korrekt process.', risk: 'Minority criticism eller fiduciary challenge.', check: 'Fairness support, premium analysis, alternatives.' },
      { id: 'minorities', name: 'Minorities', role: 'Skal acceptere, afvente eller modsætte sig buddet.', wants: 'Full value og eventuel squeeze-out upside.', risk: 'Illiquidity eller underpriced takeout.', check: 'Premium, historical trading, comps, acceptance threshold.' },
      { id: 'regulators', name: 'Regulators', role: 'Vurderer takeover rules, competition og disclosure.', wants: 'Fair market, equal information, competition compliance.', risk: 'Approval delays eller remedies.', check: 'Offer document, competition filing, timetable.' },
    ],
    frictions: ['Premium vs. true strategic value', 'Board certainty vs. topping optionality', 'Acceptance threshold vs. holdouts', 'Regulatory timeline vs. financing certainty'],
  },
];

const SKILL_AREAS = [
  { id: 'ecm', label: 'ECM', icon: 'trending-up' },
  { id: 'ma', label: 'M&A', icon: 'git-pull-request' },
  { id: 'valuation', label: 'Valuation', icon: 'bar-chart-2' },
  { id: 'modelling', label: 'Modelling', icon: 'calculator' },
  { id: 'process', label: 'Process', icon: 'git-branch' },
  { id: 'stakeholders', label: 'Stakeholders', icon: 'network' },
  { id: 'terminology', label: 'Terminology', icon: 'book-open' },
  { id: 'communication', label: 'Communication', icon: 'message-square' },
];

const DECK_SKILL_MAP = {
  people: ['stakeholders'],
  multiples: ['valuation', 'terminology'],
  c25: ['valuation', 'ecm'],
  db: ['terminology', 'stakeholders'],
  stakeholders: ['stakeholders'],
  field_dynamics: ['stakeholders', 'process'],
  ma_process: ['ma', 'process'],
  ecm_abb: ['ecm', 'process'],
  dcm_financing: ['valuation', 'modelling'],
  pe_bnb: ['ma', 'valuation'],
  cases: ['ma', 'ecm', 'process'],
  toolkit: ['modelling', 'communication'],
  deals: ['ma', 'ecm', 'stakeholders'],
};

const TRAINING_KEYWORD_ALIASES = {
  abb: ['accelerated bookbuild', 'bookbuild'],
  acceptance: ['acceptgrad', 'aktionæraccept'],
  allocation: ['allokering'],
  aftermarket: ['kursreaktion', 'eftermarked'],
  board: ['bestyrelse'],
  bookbuild: ['bookbuilding', 'bogen'],
  certainty: ['deal certainty', 'transaktionssikkerhed', 'lukningssikkerhed'],
  conditions: ['vilkår', 'betingelser'],
  discount: ['rabat', 'tegningsrabat'],
  dilution: ['udvanding'],
  execution: ['eksekvering'],
  fairness: ['fairness opinion', 'rimelighed'],
  leverage: ['gæld', 'gearing'],
  minority: ['minoriteter', 'minoritetsaktionærer'],
  offer: ['bud', 'tilbud', 'budpris'],
  premium: ['præmie', 'budpræmie'],
  proceeds: ['provenu', 'kapitalprovenu'],
  regulatory: ['regulatorisk', 'myndighed'],
  rights: ['fortegningsretter', 'tegningsretter', 'fortegningsemission'],
  shareholder: ['aktionær', 'aktionærer', 'ejer'],
  stakeholder: ['aktør', 'interessent'],
  terp: ['theoretical ex-rights price'],
  underwriting: ['garanti', 'underwriting certainty'],
  valuation: ['værdiansættelse'],
  'market risk': ['markedsrisiko', 'market window'],
  'wall-cross': ['wall crossing', 'wall-crossing'],
};

function defaultTrainingStore() {
  return {
    answers: {},
    feedbackScores: {},
    assessments: [],
    workbench: { inputs: {}, runs: [] },
    mapVisits: {},
    events: [],
  };
}

function loadTrainingStore() {
  let parsed = {};
  try { parsed = JSON.parse(localStorage.getItem(TRAINING_STORE_KEY)) || {}; }
  catch { parsed = {}; }
  const base = defaultTrainingStore();
  return {
    ...base,
    ...parsed,
    answers: parsed.answers || base.answers,
    feedbackScores: parsed.feedbackScores || base.feedbackScores,
    assessments: parsed.assessments || base.assessments,
    workbench: {
      inputs: parsed.workbench?.inputs || {},
      runs: parsed.workbench?.runs || [],
    },
    mapVisits: parsed.mapVisits || base.mapVisits,
    events: parsed.events || base.events,
  };
}

function saveTrainingStore(store) {
  localStorage.setItem(TRAINING_STORE_KEY, JSON.stringify(store));
}

function trainingEscape(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function trainingCaseById(id) {
  return TRAINING_CASES.find(c => c.id === id) || TRAINING_CASES[0];
}

function trainingMapById(id) {
  return STAKEHOLDER_MAPS.find(m => m.id === id) || STAKEHOLDER_MAPS[0];
}

function trainingToolById(id) {
  return WORKBENCH_TOOLS[id] || WORKBENCH_TOOLS.terp;
}

function trainingToast(message) {
  if (typeof toast === 'function') toast(message);
}

function recordTrainingEvent(type, label, meta = {}) {
  const store = loadTrainingStore();
  store.events.unshift({ type, label, meta, ts: Date.now() });
  store.events = store.events.slice(0, 30);
  saveTrainingStore(store);
}

function renderAnalystTraining(tab) {
  if (tab) trainingUiState.tab = tab;
  const main = document.getElementById('analyst-main');
  if (!main) return;

  const store = loadTrainingStore();
  const attempts = Object.values(store.answers).filter(a => a.savedAt).length;
  const feedbackCount = store.assessments.length;
  const workbenchRuns = store.workbench.runs.length;

  main.innerHTML = `
    <div class="analyst-shell">
      <section class="analyst-hero">
        <div>
          <div class="analyst-eyebrow">Danske Bank IB · ECM & M&A</div>
          <h1>Personal Analyst Training Lab</h1>
          <p>Bygger ovenpå flashcards med cases, mini-modeller, stakeholder judgement, rubric-feedback og adaptive næste skridt.</p>
        </div>
        <div class="analyst-hero-stats">
          <div><strong>${attempts}</strong><span>case saves</span></div>
          <div><strong>${feedbackCount}</strong><span>feedback runs</span></div>
          <div><strong>${workbenchRuns}</strong><span>model checks</span></div>
        </div>
      </section>

      <nav class="analyst-tabs" aria-label="Analyst training modules">
        ${TRAINING_TABS.map(item => `
          <button class="analyst-tab ${trainingUiState.tab === item.id ? 'active' : ''}" onclick="setAnalystTrainingTab('${item.id}')">
            <i data-lucide="${item.icon}" width="15" height="15"></i>
            <span>${item.label}</span>
          </button>
        `).join('')}
      </nav>

      <section class="analyst-panel">
        ${renderTrainingTab()}
      </section>
    </div>
  `;

  if (trainingUiState.tab === 'workbench') updateWorkbenchResult();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderTrainingTab() {
  switch (trainingUiState.tab) {
    case 'workbench': return renderWorkbench();
    case 'stakeholders': return renderStakeholderMaps();
    case 'feedback': return renderFeedbackEngine();
    case 'prompt-helper': return renderPromptHelper();
    case 'adaptive-dashboard': return renderAdaptiveTrainingDashboard();
    case 'case-lab':
    default:
      return renderCaseLab();
  }
}

function setAnalystTrainingTab(tab) {
  trainingUiState.tab = tab;
  renderAnalystTraining();
}

function setTrainingCase(caseId, tab) {
  trainingUiState.caseId = caseId;
  if (tab) trainingUiState.tab = tab;
  renderAnalystTraining();
}

function renderCaseLab() {
  const store = loadTrainingStore();
  const active = trainingCaseById(trainingUiState.caseId);
  const answer = store.answers[active.id]?.answer || '';
  const savedAt = store.answers[active.id]?.savedAt;

  return `
    <div class="training-layout">
      <aside class="training-rail">
        ${TRAINING_CASES.map(c => {
          const saved = !!store.answers[c.id]?.savedAt;
          return `
            <button class="case-pick ${active.id === c.id ? 'active' : ''}" onclick="setTrainingCase('${c.id}')">
              <span class="case-type">${c.type}</span>
              <strong>${trainingEscape(c.title)}</strong>
              <small>${trainingEscape(c.focus)}</small>
              ${saved ? '<em>Saved</em>' : ''}
            </button>
          `;
        }).join('')}
      </aside>

      <div class="training-detail">
        <div class="detail-header">
          <div>
            <span class="module-kicker">${active.type}</span>
            <h2>${trainingEscape(active.title)}</h2>
            <p>${trainingEscape(active.summary)}</p>
          </div>
          <a class="asset-link" href="${trainingEscape(active.asset)}" target="_blank" rel="noopener">
            <i data-lucide="file-text" width="15" height="15"></i> Opgavesæt
          </a>
        </div>

        <div class="case-focus-grid">
          <section class="micro-card">
            <h3>Analyst Task</h3>
            <p>${trainingEscape(active.task)}</p>
          </section>
          <section class="micro-card">
            <h3>Focus Skills</h3>
            <div class="chip-row">${active.skills.map(s => `<span class="soft-chip">${skillLabel(s)}</span>`).join('')}</div>
          </section>
        </div>

        <section class="prompt-stack">
          <h3>Judgement Prompts</h3>
          ${active.prompts.map((prompt, index) => `
            <div class="prompt-card">
              <span>Q${index + 1}</span>
              <p>${trainingEscape(prompt)}</p>
            </div>
          `).join('')}
        </section>

        <section class="answer-box">
          <div class="answer-box-top">
            <h3>Dit case-svar</h3>
            <span>${savedAt ? `Sidst gemt ${formatTrainingDate(savedAt)}` : 'Ikke gemt endnu'}</span>
          </div>
          <textarea id="case-answer" rows="9" placeholder="Skriv dit analyst-svar: start med konklusion, forklar drivers, risici og hvad du ville eskalere." oninput="updateTrainingCaseDraft(this.value)">${trainingEscape(answer)}</textarea>
          <div class="action-row">
            <button class="btn-primary" onclick="saveTrainingCaseAnswer()">
              <i data-lucide="save" width="14" height="14"></i> Gem svar
            </button>
            <button class="btn-outline" onclick="setTrainingCase('${active.id}', 'feedback')">
              Feedback Engine <i data-lucide="arrow-right" width="14" height="14"></i>
            </button>
            <button class="btn-outline" onclick="setTrainingCase('${active.id}', 'prompt-helper')">
              LLM prompt <i data-lucide="copy" width="14" height="14"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  `;
}

function updateTrainingCaseDraft(value) {
  const active = trainingCaseById(trainingUiState.caseId);
  const store = loadTrainingStore();
  store.answers[active.id] = {
    ...(store.answers[active.id] || {}),
    answer: value,
    updatedAt: Date.now(),
  };
  saveTrainingStore(store);
}

function saveTrainingCaseAnswer() {
  const textarea = document.getElementById('case-answer');
  if (textarea) updateTrainingCaseDraft(textarea.value);
  const active = trainingCaseById(trainingUiState.caseId);
  const store = loadTrainingStore();
  store.answers[active.id] = {
    ...(store.answers[active.id] || {}),
    savedAt: Date.now(),
    saves: (store.answers[active.id]?.saves || 0) + 1,
  };
  store.events.unshift({ type: 'case', label: `Case svar gemt: ${active.title}`, meta: { caseId: active.id }, ts: Date.now() });
  store.events = store.events.slice(0, 30);
  saveTrainingStore(store);
  trainingToast('Case-svar gemt lokalt');
  renderAnalystTraining();
}

function renderWorkbench() {
  const active = trainingToolById(trainingUiState.toolId);
  const inputs = getWorkbenchInputs(active.id);

  return `
    <div class="workbench-layout">
      <aside class="tool-list">
        ${Object.values(WORKBENCH_TOOLS).map(tool => `
          <button class="tool-pick ${tool.id === active.id ? 'active' : ''}" onclick="setWorkbenchTool('${tool.id}')">
            <i data-lucide="${tool.icon}" width="16" height="16"></i>
            <span>${tool.title}</span>
          </button>
        `).join('')}
      </aside>

      <div class="workbench-card">
        <div class="detail-header compact">
          <div>
            <span class="module-kicker">Analyst Workbench</span>
            <h2>${active.title}</h2>
            <p>${active.description}</p>
          </div>
          <span class="skill-pill">${skillLabel(active.skill)}</span>
        </div>

        <div class="wb-grid">
          <section class="wb-inputs">
            ${active.inputs.map(input => `
              <label class="wb-input-row">
                <span>${input.label}</span>
                <div>
                  <input type="number" step="0.01" value="${trainingEscape(inputs[input.key])}" oninput="updateWorkbenchInput('${input.key}', this.value)">
                  <em>${input.suffix}</em>
                </div>
              </label>
            `).join('')}
            <button class="btn-primary full" onclick="recordWorkbenchRun()">
              <i data-lucide="check" width="14" height="14"></i> Gem model-check
            </button>
          </section>
          <section id="workbench-result" class="wb-result"></section>
        </div>
      </div>
    </div>
  `;
}

function setWorkbenchTool(toolId) {
  trainingUiState.toolId = toolId;
  renderAnalystTraining();
}

function getWorkbenchInputs(toolId) {
  const store = loadTrainingStore();
  const tool = trainingToolById(toolId);
  const defaults = Object.fromEntries(tool.inputs.map(input => [input.key, input.value]));
  return { ...defaults, ...(store.workbench.inputs[toolId] || {}) };
}

function updateWorkbenchInput(key, rawValue) {
  const toolId = trainingUiState.toolId;
  const store = loadTrainingStore();
  const value = Number(rawValue);
  store.workbench.inputs[toolId] = {
    ...(store.workbench.inputs[toolId] || {}),
    [key]: Number.isFinite(value) ? value : 0,
  };
  saveTrainingStore(store);
  updateWorkbenchResult();
}

function updateWorkbenchResult() {
  const el = document.getElementById('workbench-result');
  if (!el) return;
  const output = calculateWorkbench(trainingUiState.toolId, getWorkbenchInputs(trainingUiState.toolId));
  el.innerHTML = output.html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function recordWorkbenchRun() {
  const tool = trainingToolById(trainingUiState.toolId);
  const inputs = getWorkbenchInputs(tool.id);
  const output = calculateWorkbench(tool.id, inputs);
  const store = loadTrainingStore();
  store.workbench.runs.unshift({
    id: `run-${Date.now()}`,
    toolId: tool.id,
    title: tool.title,
    skill: tool.skill,
    inputs,
    summary: output.summary,
    ts: Date.now(),
  });
  store.workbench.runs = store.workbench.runs.slice(0, 40);
  store.events.unshift({ type: 'workbench', label: `Model-check: ${tool.title}`, meta: { toolId: tool.id, skill: tool.skill }, ts: Date.now() });
  store.events = store.events.slice(0, 30);
  saveTrainingStore(store);
  trainingToast('Model-check gemt lokalt');
  renderAnalystTraining();
}

function calculateWorkbench(toolId, input) {
  if (toolId === 'terp') {
    const terp = safeDiv((input.oldPrice * input.oldShares) + (input.issuePrice * input.newShares), input.oldShares + input.newShares);
    const discountToTerp = safeDiv(terp - input.issuePrice, terp);
    const economicDilution = safeDiv(input.oldPrice - terp, input.oldPrice);
    const ownershipDilution = safeDiv(input.newShares, input.oldShares + input.newShares);
    const proceeds = input.issuePrice * input.newShares;
    return workbenchOutput([
      ['TERP', fmtMoney(terp), 'Theoretical ex-rights price efter emission.'],
      ['Discount to TERP', fmtPct(discountToTerp), 'Større discount øger take-up certainty, men kan signalere stress.'],
      ['Economic dilution', fmtPct(economicDilution), 'Værditab pr. eksisterende aktie før værdien af tegningsretten.'],
      ['Gross proceeds', fmtMoney(proceeds, 'DKKm'), 'Kapital ind før fees og expenses.'],
      ['Ownership dilution', fmtPct(ownershipDilution), 'Ejerandel tabt for en investor, der ikke tegner.'],
    ], `TERP ${fmtMoney(terp)}; discount to TERP ${fmtPct(discountToTerp)}; proceeds ${fmtMoney(proceeds, 'DKKm')}.`);
  }

  if (toolId === 'abb') {
    const discount = safeDiv(input.closePrice - input.offerPrice, input.closePrice);
    const proceeds = input.offerPrice * input.sharesSold;
    const stakeSold = safeDiv(input.sharesSold, input.totalShares);
    const sellerRemaining = Math.max(0, input.sellerBefore - input.sharesSold);
    const sellerRemainingPct = safeDiv(sellerRemaining, input.totalShares);
    return workbenchOutput([
      ['Discount to close', fmtPct(discount), 'ABB discount skal balancere speed og seller proceeds.'],
      ['Gross proceeds', fmtMoney(proceeds, 'DKKm'), 'Headline placement size.'],
      ['Stake sold', fmtPct(stakeSold), 'Likviditetsimpact relativt til aktiekapital.'],
      ['Seller remaining', `${fmtNumber(sellerRemaining)}m aktier`, 'Residual stake kan kræve lock-up og påvirke overhang.'],
      ['Remaining ownership', fmtPct(sellerRemainingPct), 'Viser om sælger stadig er betydelig ejer.'],
    ], `ABB discount ${fmtPct(discount)}; gross proceeds ${fmtMoney(proceeds, 'DKKm')}; stake sold ${fmtPct(stakeSold)}.`);
  }

  if (toolId === 'offer') {
    const premium = safeDiv(input.offerPrice - input.unaffectedPrice, input.unaffectedPrice);
    const equityValue = input.offerPrice * input.shares;
    const ev = equityValue + input.netDebt;
    return workbenchOutput([
      ['Offer premium', fmtPct(premium), 'Sammenlign med 1D, 1M og 3M unaffected trading.'],
      ['Equity value', fmtMoney(equityValue, 'DKKm'), 'Budpris gange diluted shares.'],
      ['Enterprise value', fmtMoney(ev, 'DKKm'), 'Equity value plus net debt.'],
      ['Premium value', fmtMoney((input.offerPrice - input.unaffectedPrice) * input.shares, 'DKKm'), 'Den ekstra værdi bidder betaler over unaffected market value.'],
    ], `Offer premium ${fmtPct(premium)}; equity value ${fmtMoney(equityValue, 'DKKm')}; EV ${fmtMoney(ev, 'DKKm')}.`);
  }

  if (toolId === 'evbridge') {
    const equityValue = input.enterpriseValue - input.netDebt - input.minorities + input.associates + input.options;
    const bridgeDrag = input.netDebt + input.minorities - input.associates - input.options;
    return workbenchOutput([
      ['Enterprise value', fmtMoney(input.enterpriseValue, 'DKKm'), 'Værdi af operations før capital structure.'],
      ['Bridge drag', fmtMoney(bridgeDrag, 'DKKm'), 'Net debt og minorities reducerer equity value; associates øger.'],
      ['Equity value', fmtMoney(equityValue, 'DKKm'), 'Værdi til aktionærerne efter bridge.'],
      ['Equity / EV', fmtPct(safeDiv(equityValue, input.enterpriseValue)), 'Lav ratio viser høj gæld eller store non-equity claims.'],
    ], `EV-to-equity bridge giver equity value ${fmtMoney(equityValue, 'DKKm')}.`);
  }

  const entryEv = input.entryEbitda * input.entryMultiple;
  const entryDebt = input.entryEbitda * input.debtMultiple;
  const entryEquity = entryEv - entryDebt;
  const exitEv = input.exitEbitda * input.exitMultiple;
  const exitDebt = Math.max(0, entryDebt - input.debtRepaid);
  const exitEquity = exitEv - exitDebt;
  const moic = safeDiv(exitEquity, entryEquity);
  const irr = input.holdYears > 0 && moic > 0 ? Math.pow(moic, 1 / input.holdYears) - 1 : 0;
  return workbenchOutput([
    ['Entry EV', fmtMoney(entryEv, 'DKKm'), 'Entry EBITDA gange entry multiple.'],
    ['Sponsor equity', fmtMoney(entryEquity, 'DKKm'), 'Entry EV minus initial debt.'],
    ['Exit equity', fmtMoney(exitEquity, 'DKKm'), 'Exit EV minus remaining debt.'],
    ['MOIC', `${fmtNumber(moic)}x`, 'Cash-on-cash multiple til sponsor.'],
    ['IRR', fmtPct(irr), 'Annualiseret afkast over holding period.'],
  ], `LBO quick check: MOIC ${fmtNumber(moic)}x og IRR ${fmtPct(irr)}.`);
}

function workbenchOutput(rows, summary) {
  return {
    summary,
    html: `
      <div class="wb-result-head">
        <i data-lucide="sparkles" width="17" height="17"></i>
        <strong>Output & judgement</strong>
      </div>
      <div class="metric-list">
        ${rows.map(([label, value, note]) => `
          <div class="metric-row">
            <div>
              <span>${label}</span>
              <small>${note}</small>
            </div>
            <strong>${value}</strong>
          </div>
        `).join('')}
      </div>
      <div class="analyst-note">
        <strong>Analyst read:</strong> ${trainingEscape(summary)}
      </div>
    `,
  };
}

function renderStakeholderMaps() {
  const active = trainingMapById(trainingUiState.mapId);
  const selectedActor = active.actors.find(a => a.id === trainingUiState.actorId) || active.actors[0];
  trainingUiState.actorId = selectedActor.id;

  return `
    <div class="stakeholder-layout">
      <div class="stakeholder-sidebar">
        ${STAKEHOLDER_MAPS.map(map => `
          <button class="map-pick ${map.id === active.id ? 'active' : ''}" onclick="setStakeholderMap('${map.id}')">
            <strong>${map.title}</strong>
            <small>${map.context}</small>
          </button>
        `).join('')}
      </div>

      <div class="stakeholder-stage">
        <div class="detail-header compact">
          <div>
            <span class="module-kicker">Stakeholder Map</span>
            <h2>${active.title}</h2>
            <p>${active.context}</p>
          </div>
          <button class="btn-outline" onclick="recordStakeholderMapVisit()">
            <i data-lucide="check" width="14" height="14"></i> Markér trænet
          </button>
        </div>

        <div class="actor-map">
          ${active.actors.map(actor => `
            <button class="actor-node ${actor.id === selectedActor.id ? 'active' : ''}" onclick="selectStakeholderActor('${actor.id}')">
              <span>${actor.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
              <strong>${actor.name}</strong>
            </button>
          `).join('')}
        </div>

        <div class="stakeholder-detail-grid">
          <section class="actor-detail">
            <span class="module-kicker">Selected Actor</span>
            <h3>${selectedActor.name}</h3>
            <p>${selectedActor.role}</p>
            <dl>
              <div><dt>Wants</dt><dd>${selectedActor.wants}</dd></div>
              <div><dt>Risk</dt><dd>${selectedActor.risk}</dd></div>
              <div><dt>Analyst check</dt><dd>${selectedActor.check}</dd></div>
            </dl>
          </section>
          <section class="friction-card">
            <h3>Deal Dynamics</h3>
            ${active.frictions.map(item => `
              <div class="friction-row">
                <i data-lucide="alert-triangle" width="14" height="14"></i>
                <span>${trainingEscape(item)}</span>
              </div>
            `).join('')}
          </section>
        </div>
      </div>
    </div>
  `;
}

function setStakeholderMap(mapId) {
  trainingUiState.mapId = mapId;
  trainingUiState.actorId = null;
  renderAnalystTraining();
}

function selectStakeholderActor(actorId) {
  trainingUiState.actorId = actorId;
  renderAnalystTraining();
}

function recordStakeholderMapVisit() {
  const map = trainingMapById(trainingUiState.mapId);
  const store = loadTrainingStore();
  store.mapVisits[map.id] = (store.mapVisits[map.id] || 0) + 1;
  store.events.unshift({ type: 'stakeholder', label: `Stakeholder map trænet: ${map.title}`, meta: { mapId: map.id }, ts: Date.now() });
  store.events = store.events.slice(0, 30);
  saveTrainingStore(store);
  trainingToast('Stakeholder map markeret som trænet');
  renderAnalystTraining();
}

function renderFeedbackEngine() {
  const store = loadTrainingStore();
  const active = trainingCaseById(trainingUiState.caseId);
  const answer = store.answers[active.id]?.answer || '';
  const last = store.assessments.find(a => a.caseId === active.id);

  return `
    <div class="feedback-layout">
      <section class="feedback-compose">
        <div class="detail-header compact">
          <div>
            <span class="module-kicker">Rubric Feedback</span>
            <h2>Feedback Engine</h2>
            <p>Statisk feedback baseret på rubric, struktur, længde og keyword-coverage. Ingen AI eller backend.</p>
          </div>
        </div>

        <label class="field-label">
          Case
          <select onchange="setTrainingCase(this.value, 'feedback')">
            ${TRAINING_CASES.map(c => `<option value="${c.id}" ${c.id === active.id ? 'selected' : ''}>${c.title}</option>`).join('')}
          </select>
        </label>

        <label class="field-label">
          Svar til feedback
          <textarea id="feedback-answer" rows="8" oninput="updateTrainingCaseDraft(this.value)">${trainingEscape(answer)}</textarea>
        </label>

        <div class="rubric-grid">
          ${RUBRIC_DIMENSIONS.map(dim => `
            <div class="rubric-card">
              <strong>${dim.label}</strong>
              <p>${dim.hint}</p>
              <div class="score-buttons">
                ${[1, 2, 3, 4, 5].map(score => `
                  <button class="${store.feedbackScores[dim.id] === score ? 'active' : ''}" onclick="setFeedbackScore('${dim.id}', ${score})">${score}</button>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="action-row">
          <button class="btn-primary" onclick="analyzeTrainingAnswer()">
            <i data-lucide="clipboard-check" width="14" height="14"></i> Kør feedback
          </button>
          <button class="btn-outline" onclick="setAnalystTrainingTab('prompt-helper')">Send til prompt helper</button>
        </div>
      </section>

      <section class="feedback-result">
        ${last ? renderFeedbackResult(last) : `
          <div class="empty-state">
            <i data-lucide="clipboard-list" width="28" height="28"></i>
            <strong>Ingen feedback på denne case endnu</strong>
            <span>Kør feedback for at gemme en lokal rubric-vurdering.</span>
          </div>
        `}
      </section>
    </div>
  `;
}

function setFeedbackScore(dimId, score) {
  const store = loadTrainingStore();
  store.feedbackScores[dimId] = score;
  saveTrainingStore(store);
  renderAnalystTraining();
}

function analyzeTrainingAnswer() {
  const active = trainingCaseById(trainingUiState.caseId);
  const textarea = document.getElementById('feedback-answer');
  const answer = textarea ? textarea.value : (loadTrainingStore().answers[active.id]?.answer || '');
  updateTrainingCaseDraft(answer);

  const store = loadTrainingStore();
  const analysis = scoreTrainingAnswer(answer, active, store.feedbackScores);
  const assessment = {
    id: `assessment-${Date.now()}`,
    caseId: active.id,
    caseTitle: active.title,
    ...analysis,
    scores: { ...store.feedbackScores },
    ts: Date.now(),
  };
  store.assessments.unshift(assessment);
  store.assessments = store.assessments.slice(0, 50);
  store.events.unshift({ type: 'feedback', label: `Feedback kørt: ${active.title}`, meta: { caseId: active.id, score: analysis.overall }, ts: Date.now() });
  store.events = store.events.slice(0, 30);
  saveTrainingStore(store);
  trainingToast('Feedback gemt lokalt');
  renderAnalystTraining();
}

function scoreTrainingAnswer(answer, activeCase, scores) {
  const text = answer.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const matched = activeCase.keywords.filter(keyword => trainingKeywordMatches(keyword, text));
  const missing = activeCase.keywords.filter(keyword => !matched.includes(keyword));
  const structureMarkers = ['konklusion', 'først', 'risiko', 'fordi', 'dog', 'men', 'therefore', 'recommend', 'jeg ville', 'escalate', 'eskalere'];
  const structureHits = structureMarkers.filter(marker => text.includes(marker)).length;
  const selfScores = Object.values(scores).filter(Number.isFinite);
  const selfScorePct = selfScores.length ? (selfScores.reduce((a, b) => a + b, 0) / selfScores.length) / 5 * 100 : 50;
  const coveragePct = activeCase.keywords.length ? matched.length / activeCase.keywords.length * 100 : 0;
  const wordScore = Math.min(100, words.length / 220 * 100);
  const structurePct = Math.min(100, structureHits / 5 * 100);
  const overall = Math.round((coveragePct * 0.35) + (wordScore * 0.2) + (structurePct * 0.2) + (selfScorePct * 0.25));

  const strengths = [];
  if (coveragePct >= 50) strengths.push('Du rammer flere af casens centrale tekniske begreber.');
  if (structureHits >= 3) strengths.push('Svaret har tegn på struktur og judgement-sprog.');
  if (words.length >= 140) strengths.push('Svaret har nok længde til at udvikle en egentlig argumentation.');
  if (!strengths.length) strengths.push('Du har et første udkast, som nu kan gøres mere beslutningsorienteret.');

  const nextSteps = [
    'Start med én klar konklusion før du forklarer mechanics.',
    `Tilføj de manglende vinkler: ${missing.slice(0, 5).join(', ') || 'ingen oplagte keyword gaps'}.`,
    'Slut med hvad du som analyst ville tjekke, modellere eller eskalere.',
  ];

  return { overall, wordCount: words.length, coveragePct, structureHits, matched, missing, strengths, nextSteps };
}

function trainingKeywordMatches(keyword, text) {
  return [keyword, ...(TRAINING_KEYWORD_ALIASES[keyword] || [])]
    .some(term => text.includes(term.toLowerCase()));
}

function renderFeedbackResult(result) {
  return `
    <div class="feedback-score-card">
      <span>Overall rubric signal</span>
      <strong>${result.overall}/100</strong>
      <div class="score-track"><div style="width:${Math.max(4, result.overall)}%"></div></div>
      <small>${result.wordCount} ord · ${Math.round(result.coveragePct)}% keyword coverage · ${result.structureHits} struktur-signaler</small>
    </div>

    <div class="feedback-section">
      <h3>Styrker</h3>
      ${result.strengths.map(item => `<p>${trainingEscape(item)}</p>`).join('')}
    </div>

    <div class="feedback-section">
      <h3>Mangler / næste iteration</h3>
      ${result.nextSteps.map(item => `<p>${trainingEscape(item)}</p>`).join('')}
    </div>

    <div class="keyword-cloud">
      <strong>Matched</strong>
      <div>${result.matched.map(k => `<span>${trainingEscape(k)}</span>`).join('') || '<em>Ingen endnu</em>'}</div>
      <strong>Missing</strong>
      <div>${result.missing.map(k => `<span class="missing">${trainingEscape(k)}</span>`).join('') || '<em>Ingen</em>'}</div>
    </div>
  `;
}

function renderPromptHelper() {
  const store = loadTrainingStore();
  const active = trainingCaseById(trainingUiState.caseId);
  const answer = store.answers[active.id]?.answer || '';
  const prompt = buildExternalPrompt(active, answer);

  return `
    <div class="prompt-helper-layout">
      <section class="prompt-control">
        <div class="detail-header compact">
          <div>
            <span class="module-kicker">External LLM Prompt Helper</span>
            <h2>Copy-paste coach prompt</h2>
            <p>Samler casekontekst, dit svar og en konkret feedback-instruks. Der kaldes ingen API fra appen.</p>
          </div>
        </div>
        <label class="field-label">
          Case
          <select onchange="setTrainingCase(this.value, 'prompt-helper')">
            ${TRAINING_CASES.map(c => `<option value="${c.id}" ${c.id === active.id ? 'selected' : ''}>${c.title}</option>`).join('')}
          </select>
        </label>
        <div class="prompt-context">
          <strong>${trainingEscape(active.title)}</strong>
          <span>${trainingEscape(active.task)}</span>
        </div>
        <button class="btn-primary full" onclick="copyTrainingPrompt()">
          <i data-lucide="copy" width="14" height="14"></i> Kopiér prompt
        </button>
      </section>

      <section class="prompt-output-card">
        <textarea id="training-prompt-output" readonly rows="20">${trainingEscape(prompt)}</textarea>
      </section>
    </div>
  `;
}

function buildExternalPrompt(activeCase, answer) {
  return `Du er min senior investment banking coach i Danske Bank Investment Banking med fokus på dansk/nordisk ECM og M&A.

Case:
${activeCase.title}

Kontekst:
${activeCase.summary}

Min opgave:
${activeCase.task}

Mine judgement prompts:
${activeCase.prompts.map((prompt, index) => `${index + 1}. ${prompt}`).join('\n')}

Mit svar:
${answer || '[Jeg har endnu ikke skrevet et svar i appen.]'}

Giv mig feedback som en krævende Associate/VP:
1. Start med den vigtigste judgement-fejl eller mangel.
2. Vurder market mechanics, valuation, process risk, stakeholder incentives og analyst communication.
3. Peg på konkrete formuleringer jeg kan forbedre.
4. Giv et bedre answer outline på 8-12 bullets.
5. Slut med 3 drill-spørgsmål jeg skal kunne svare på uden noter.

Svar på dansk, men brug korrekt engelsk IB-terminologi hvor det er naturligt.`;
}

async function copyTrainingPrompt() {
  const el = document.getElementById('training-prompt-output');
  if (!el) return;
  try {
    await navigator.clipboard.writeText(el.value);
    trainingToast('Prompt kopieret');
  } catch {
    el.select();
    document.execCommand('copy');
    trainingToast('Prompt kopieret');
  }
  recordTrainingEvent('prompt', 'LLM prompt kopieret', { caseId: trainingUiState.caseId });
}

function renderAdaptiveTrainingDashboard() {
  const metrics = computeAdaptiveMetrics();
  const weakest = [...metrics.skills].sort((a, b) => a.score - b.score).slice(0, 3);
  const store = loadTrainingStore();

  return `
    <div class="adaptive-layout">
      <section class="adaptive-top">
        <div class="detail-header compact">
          <div>
            <span class="module-kicker">Adaptive Dashboard</span>
            <h2>Styrker, svagheder og næste bedste træning</h2>
            <p>Kombinerer flashcard-SM2, case-feedback, workbench runs og stakeholder-map træning lokalt i browseren.</p>
          </div>
        </div>
        <div class="adaptive-summary">
          <div><strong>${metrics.studiedCards}</strong><span>flashcards studied</span></div>
          <div><strong>${store.assessments.length}</strong><span>rubric assessments</span></div>
          <div><strong>${store.workbench.runs.length}</strong><span>workbench runs</span></div>
        </div>
      </section>

      <section class="skill-radar">
        ${metrics.skills.map(skill => `
          <div class="skill-row">
            <div class="skill-name">
              <i data-lucide="${skill.icon}" width="15" height="15"></i>
              <strong>${skill.label}</strong>
            </div>
            <div class="skill-bar"><div style="width:${skill.score}%"></div></div>
            <span>${skill.score}</span>
          </div>
        `).join('')}
      </section>

      <section class="next-actions">
        <h3>Næste bedste øvelser</h3>
        ${weakest.map(item => `
          <div class="next-action-card">
            <div>
              <strong>${item.label}</strong>
              <p>${trainingEscape(recommendationForSkill(item.id))}</p>
            </div>
            <button class="btn-outline" onclick="${actionForSkill(item.id)}">Start</button>
          </div>
        `).join('')}
      </section>

      <section class="activity-feed">
        <h3>Seneste aktivitet</h3>
        ${store.events.length ? store.events.slice(0, 8).map(event => `
          <div class="activity-row">
            <span>${event.type}</span>
            <strong>${trainingEscape(event.label)}</strong>
            <small>${formatTrainingDate(event.ts)}</small>
          </div>
        `).join('') : `<div class="dash-empty">Ingen analyst-lab aktivitet endnu.</div>`}
      </section>
    </div>
  `;
}

function computeAdaptiveMetrics() {
  const store = loadTrainingStore();
  const buckets = Object.fromEntries(SKILL_AREAS.map(skill => [skill.id, { total: 0, score: 0, feedback: [], boost: 0 }]));
  const srData = typeof load === 'function' ? load() : {};
  const all = typeof ALL_CARDS !== 'undefined' ? ALL_CARDS : [];
  let studiedCards = 0;

  all.forEach(card => {
    const skills = DECK_SKILL_MAP[card.deckId] || ['terminology'];
    const sr = typeof getSR === 'function' ? getSR(srData, card.id) : srData[card.id];
    const reps = sr?.reps || 0;
    if (reps > 0) studiedCards++;
    const duePenalty = typeof isDue === 'function' && sr && isDue(sr) ? 12 : 0;
    const cardScore = reps
      ? Math.max(15, Math.min(100, 25 + reps * 10 + (sr.lastRating || 0) * 12 + ((sr.ef || 2.5) - 2.0) * 10 - duePenalty))
      : 0;
    skills.forEach(skill => {
      if (!buckets[skill]) return;
      buckets[skill].total += 1;
      buckets[skill].score += cardScore;
    });
  });

  store.assessments.forEach(assessment => {
    RUBRIC_DIMENSIONS.forEach(dim => {
      const score = assessment.scores?.[dim.id];
      if (Number.isFinite(score) && buckets[dim.skill]) buckets[dim.skill].feedback.push(score * 20);
    });
    const activeCase = trainingCaseById(assessment.caseId);
    activeCase.skills.forEach(skill => {
      if (buckets[skill]) buckets[skill].boost += Math.min(8, assessment.overall / 20);
    });
  });

  store.workbench.runs.forEach(run => {
    if (buckets[run.skill]) buckets[run.skill].boost += 5;
    if (run.toolId === 'terp' || run.toolId === 'abb') buckets.ecm.boost += 3;
    if (run.toolId === 'lbo') buckets.ma.boost += 3;
    buckets.modelling.boost += 2;
  });

  Object.entries(store.mapVisits).forEach(([, count]) => {
    buckets.stakeholders.boost += Math.min(15, count * 5);
    buckets.process.boost += Math.min(8, count * 2);
  });

  const skills = SKILL_AREAS.map(skill => {
    const bucket = buckets[skill.id];
    const flashScore = bucket.total ? bucket.score / bucket.total : 0;
    const feedbackScore = bucket.feedback.length
      ? bucket.feedback.reduce((a, b) => a + b, 0) / bucket.feedback.length
      : 0;
    const hasFeedback = bucket.feedback.length > 0;
    const combined = hasFeedback ? flashScore * 0.55 + feedbackScore * 0.35 : flashScore * 0.75;
    const score = Math.round(Math.max(0, Math.min(100, combined + Math.min(25, bucket.boost))));
    return { ...skill, score };
  });

  return { skills, studiedCards };
}

function recommendationForSkill(skillId) {
  const recs = {
    ecm: 'Kør Ørsted Rights Issue eller DSV ABB og brug TERP/ABB workbench bagefter.',
    ma: 'Kør Nykredit/Spar Nord eller Penneo/Visma med fokus på premium, conditions og board logic.',
    valuation: 'Lav Offer Premium og EV Bridge i Workbench, og forklar konklusionen i 5 bullets.',
    modelling: 'Kør LBO Quick Check og skriv hvilke assumptions IRR er mest følsom overfor.',
    process: 'Åbn Process Flows og sammenlign faserne med en konkret case fra Case Lab.',
    stakeholders: 'Træn Stakeholder Maps og skriv wants/risks/checks for hver aktør uden noter.',
    terminology: 'Gå tilbage til flashcards og træn Multiples, M&A Process og ECM & ABB.',
    communication: 'Kør Feedback Engine på dit seneste svar og omskriv det med konklusion først.',
  };
  return recs[skillId] || 'Start med den case, hvor du har lavest confidence.';
}

function actionForSkill(skillId) {
  if (skillId === 'ecm') return "setTrainingCase('case-orsted-rights', 'case-lab')";
  if (skillId === 'ma') return "setTrainingCase('case-nykredit-spar', 'case-lab')";
  if (skillId === 'valuation') return "setWorkbenchTool('offer'); setAnalystTrainingTab('workbench')";
  if (skillId === 'modelling') return "setWorkbenchTool('lbo'); setAnalystTrainingTab('workbench')";
  if (skillId === 'stakeholders') return "setAnalystTrainingTab('stakeholders')";
  if (skillId === 'process') return "showView('v-flows')";
  if (skillId === 'communication') return "setAnalystTrainingTab('feedback')";
  return "startStudy(null)";
}

function skillLabel(skillId) {
  return SKILL_AREAS.find(skill => skill.id === skillId)?.label || skillId;
}

function safeDiv(a, b) {
  return b ? a / b : 0;
}

function fmtNumber(value) {
  return new Intl.NumberFormat('da-DK', { maximumFractionDigits: 1 }).format(Number.isFinite(value) ? value : 0);
}

function fmtPct(value) {
  return new Intl.NumberFormat('da-DK', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(Number.isFinite(value) ? value : 0);
}

function fmtMoney(value, suffix = 'DKK') {
  return `${fmtNumber(value)} ${suffix}`;
}

function formatTrainingDate(ts) {
  return new Intl.DateTimeFormat('da-DK', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(ts));
}
