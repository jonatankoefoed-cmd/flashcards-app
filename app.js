'use strict';
/* ════════════════════════════════════════════════
   IB Prep Flashcards · app.js
   Decks: People | Multiples | Danske Bank | Stakeholders
   Learning: SM-2 spaced repetition
════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────
   DECK CONFIG
────────────────────────────────────────────── */
const DECK_META = {
  people: {
    id:'people', name:'Mennesker – DB IB', nameShort:'People',
    icon:'users', desc:'Lær navne og stillingsbetegnelser',
    color:'#0057B8', colorLt:'#EEF4FF',
  },
  multiples: {
    id:'multiples', name:'Valuation Multiples', nameShort:'Multiples',
    icon:'bar-chart-2', desc:'Sektorispecifikke multipler og drivers',
    color:'#059669', colorLt:'#ECFDF5',
  },
  db: {
    id:'db', name:'Danske Bank', nameShort:'Danske Bank',
    icon:'landmark', desc:'Historie, struktur og strategi',
    color:'#7C3AED', colorLt:'#F5F3FF',
  },
  stakeholders: {
    id:'stakeholders', name:'Stakeholders & Incentives', nameShort:'Stakeholders',
    icon:'git-merge', desc:'Incitamenter og interessekonflikter',
    color:'#D97706', colorLt:'#FFFBEB',
  },
  c25: {
    id:'c25', name:'Top 50 Selskaber (C25/Large)', nameShort:'Top 50',
    icon:'briefcase', desc:'Store danske børsnavne, industrier, valuation og aktuelle fokusområder',
    color:'#E11D48', colorLt:'#FFE4E6',
  },
  ma_process: {
    id:'ma_process', name:'M&A Process', nameShort:'M&A Process',
    icon:'git-pull-request', desc:'Sell-side & buy-side faser, terminologi og dokumenter',
    color:'#0891B2', colorLt:'#ECFEFF',
  },
  ecm_abb: {
    id:'ecm_abb', name:'ECM & ABB', nameShort:'ECM & ABB',
    icon:'trending-up', desc:'IPO-proces, ABB overnight, Main Market vs First North',
    color:'#6366F1', colorLt:'#EEF2FF',
  },
  dcm_financing: {
    id:'dcm_financing', name:'DCM & Financing', nameShort:'DCM & Fin.',
    icon:'banknote', desc:'LBO-kapitalstruktur, stapled financing, covenants',
    color:'#DC2626', colorLt:'#FEF2F2',
  },
  pe_bnb: {
    id:'pe_bnb', name:'PE & Buy-and-Build', nameShort:'PE & B&B',
    icon:'layers', desc:'Nøglefonde, B&B-strategi, multiple arbitrage, exits',
    color:'#16A34A', colorLt:'#F0FDF4',
  },
  cases: {
    id:'cases', name:'Case Studies', nameShort:'Cases',
    icon:'file-text', desc:'Reverse-engineer virkelige nordiske transaktioner',
    color:'#9333EA', colorLt:'#FAF5FF',
  },
  toolkit: {
    id:'toolkit', name:'Analyst Toolkit', nameShort:'Toolkit',
    icon:'wrench', desc:'Excel, kommunikation, kvalitetskontrol, staffing',
    color:'#EA580C', colorLt:'#FFF7ED',
  },
  deals: {
    id:'deals', name:'Danske Bank Deals', nameShort:'Deals',
    icon:'trophy', desc:'Nøgletransaktioner 2020-2025 med DB involvering',
    color:'#0D9488', colorLt:'#CCFBF1',
  },
};
const DECK_ORDER = ['people','multiples','c25','db','stakeholders','ma_process','ecm_abb','dcm_financing','pe_bnb','cases','toolkit','deals'];

// --- Global State & Firebase ---
let user = null;
let cardData = {}; 
let sessionCards = [];
let currentIndex = 0;
let isFlipped = false;
let currentDeckTitle = "";
let stats = { new:0, due:0, done:0 };
let currentSessionWeak = false;

// Helper: Get stable unique ID for a card
function personCardKey(person = {}) {
  return String(person.personId || person.name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getCardId(card) {
  if (card.type === 'person' || card.type === 'people') return card.id || `p-${personCardKey(card)}`;
  if (card.deckId === 'c25') return `c-${card.name}`;
  if (card.id) return `k-${card.id}`;
  return `k-${card.q ? card.q.substring(0, 20) : (card.question ? card.question.substring(0,20) : Math.random())}`;
}

async function rateCard(rating) {
  const c = sessionCards[currentIndex];
  if (!c) return;
  const id = getCardId(c);
  
  await syncCard(id, rating);
  
  // Update stats
  if (rating >= 4) stats.done++;
  else stats.due++;
  
  nextCard();
  renderWeakCardsUI(); 
}

async function syncCard(cardId, rating) {
  if (!user) {
    // Fallback: local storage
    const local = JSON.parse(localStorage.getItem('ib_cards') || '{}');
    if (!local[cardId]) local[cardId] = { ratings: [] };
    local[cardId].ratings.push(rating);
    localStorage.setItem('ib_cards', JSON.stringify(local));
    cardData = local;
    return;
  }
  
  if (!cardData[cardId]) cardData[cardId] = { ratings: [] };
  cardData[cardId].ratings.push(rating);
  cardData[cardId].lastSeen = Date.now();
  
  const docRef = window.doc(window.db, "users", user.uid);
  await window.updateDoc(docRef, {
    [`cards.${cardId}`]: cardData[cardId]
  }).catch(async (e) => {
    await window.setDoc(docRef, { cards: { [cardId]: cardData[cardId] } });
  });
}

function getCardScore(cardId) {
  const data = cardData[cardId];
  if (!data || !data.ratings || data.ratings.length === 0) return 5; 
  const last3 = data.ratings.slice(-3);
  return last3.reduce((a, b) => a + b, 0) / last3.length;
}

const LOGO_DEV_PUBLISHABLE_KEY = 'pk_aX_jJ9JBRlmP4UGkAhnIEQ';
// Merge COMPANY_CARDS with COMPANY_CARDS_2 and COMPANY_CARDS_3
COMPANY_CARDS.push(...COMPANY_CARDS_2, ...COMPANY_CARDS_3);
const MARKET_DATA_AS_OF = '2026-03-30';
function logoUrl(domain, size = 96) {
  if (!domain) return '';
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_PUBLISHABLE_KEY}&size=${size}&format=png&retina=true`;
}
function fmtDkkBn(v) {
  return new Intl.NumberFormat('da-DK', { minimumFractionDigits:1, maximumFractionDigits:1 }).format(v) + ' mia. DKK';
}

/* ──────────────────────────────────────────────
   PEOPLE DATA
   type:'people' — front=avatar, back=name+grade
────────────────────────────────────────────── */
const PEOPLE = [
  // Leadership
  {
    name:'Atilla Olesen',
    niveau:'Leadership',
    titel:'Head of Investment Banking',
    seniorityLabel:'Head of IB siden feb. 2021',
    tenureLabel:'Danske Bank siden feb. 2017 · ca. 9 år 3 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Overordnet leder af Investment Banking på tværs af Norden og drivkraft bag Forward \'28-ambitionen om en mere fuldt dækkende investeringsbank.',
    experience:[
      'Head of Investment Banking / Group CLT, Danske Bank (feb. 2021-nu; ca. 5 år 3 mdr. pr. maj 2026).',
      'EVP Global Head of Asset Management, Danske Bank (feb. 2020-feb. 2021; ca. 1 år).',
      'Global Head of Distribution, Asset Management, Danske Bank (feb. 2017-feb. 2020; ca. 3 år).',
      'Associate, Corporate Finance, Danske Bank (aug. 2000-jun. 2005; ca. 4 år 11 mdr.).',
      'Tidligere SEB (2007-2017), Gudme Raaschou Asset Management (2005-2007) og Nordea Markets ECM (2005).'
    ],
    deals:[],
    education:[
      'Master of Law / LL.M. Securities Law, Københavns Universitet (1994-2000).',
      'High Performance Leadership Program, IMD Business School (2014).'
    ],
    personalPoints:[
      'Sidder tæt på kapitalfondsøkosystemet via Aktive Ejere og fungerer som bankens bro ind mod PE-miljøet.',
      'Har arbejdet eksplicit med impact/ESG-vinkler i investeringsmiljøet, hvilket gør ham mere policy- og markedsarkitektur-orienteret end klassisk deal-eksekverende.',
      'Stod bag den strategiske beslutning om at samle ECM-platformen i København og Stockholm i 2025.',
      'Hans tydeligste personlige interesse i kilderne er selve udviklingen af investeringsøkosystemet, ikke bare enkeltdeals.'
    ],
    photo:'Pictures/Atilla Olesen (implementeret).jpeg'
  },
  {
    name:'Christian Lindholm',
    niveau:'Leadership',
    titel:'Co-Head Corporate Finance DK',
    seniorityLabel:'Co-Head',
    tenureLabel:'Danske Bank CF siden 1998 · ca. 28 år pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Co-head for dansk Corporate Finance og en nøglefigur på flere af afdelingens største offentlige mandater inden for både ECM og M&A.',
    experience:[
      'Director / Co-Head i Danske Bank Corporate Finance (1998-nu; ca. 28 år pr. maj 2026).',
      'Arbejder i spændingsfeltet mellem execution, regulatoriske krav og board-level rådgivning.',
      'Bruges aktivt i rekruttering og synlighed omkring teamet.'
    ],
    deals:[
      'Penneo / Visma, inkl. fairness opinion.',
      'A.P. Moller Holding / Svitzer take-private (DKK 9 mia.).',
      'DSV accelerated bookbuild (DKK 37,3 mia.).',
      'Ørsted fortegningsemission (DKK 60 mia.).',
      'A.P. Moller Holding / Concentric (SEK 8,6 mia.).'
    ],
    education:[
      'Uddannelsesbaggrund fra Københavns Universitet og Copenhagen Business School.'
    ],
    personalPoints:[
      'Er en af de tydeligste regulatoriske specialister i teamet på IPO-prospekter, guidance og comfort-letter-problemer.',
      'Bruges aktivt i CBS-rekruttering og har derfor også en intern kultur- og talentrolle.',
      'Har en dokumenteret marathon-/halvmaraton-interesse, som er et af de klareste personlige holdepunkter i kilderne.',
      'Den sportslige endurance-profil matcher hans ry for høj arbejdskapacitet og stringens.'
    ],
    photo:'Pictures/Christian Lindholm (nyt foto).png',
    photoCrop:'center top',
    photoFit:'contain'
  },
  {
    name:'Thomas Knaack',
    niveau:'Leadership',
    titel:'Co-Head Corporate Finance DK',
    seniorityLabel:'Managing Director / Co-Head',
    tenureLabel:'Danske Bank CF siden okt. 2014 · ca. 11 år 7 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Co-head for dansk Corporate Finance med kommercielt og relationsdrevet fokus, især på origination, bestyrelsesdialog og større danske M&A-mandater.',
    experience:[
      'Managing Director og Co-Head of Corporate Finance, Danske Bank (okt. 2014-nu; ca. 11 år 7 mdr. pr. maj 2026).',
      'Director, SEB Enskilda (nov. 1999-maj 2011; ca. 11 år 7 mdr.) med fokus på M&A og ECM.',
      'Co-owner & CEO, emmerys (maj 2011-okt. 2014; ca. 3 år 6 mdr.) med turnaround efter konkurs.',
      'Associate / attorney-at-law, Lett, Vilstrup & Partnere (feb. 1997-nov. 1999; ca. 2 år 10 mdr.).'
    ],
    deals:[
      'SKAKO Vibration / FCDE (EUR 37,5 mio.).',
      'Forenede Holding / FSAB.'
    ],
    education:[
      'MBA, London Business School (2005-2007).',
      'Cand.jur., Københavns Universitet (1991-1997).'
    ],
    personalPoints:[
      'Skiller sig ud med reel founder/CEO-turnaround-erfaring fra emmerys, ikke kun ren advisory-baggrund.',
      'Kilderne peger på, at han i co-head-konstellationen hælder mere mod origination, relationsarbejde og board-facing dialog end mod regulatorisk detaljeniveau.',
      'Det mest menneskelige hook i profilen er entreprenørsporet og arbejdet med et consumer brand som emmerys.'
    ],
    photo:'Pictures/Thomas Knaack (implementeret).jpeg'
  },
  // Managing Directors
  {
    name:'Henrik Ljungstrom',
    niveau:'Managing Director',
    titel:'Managing Director (London)',
    seniorityLabel:'Managing Director siden sep. 2024',
    tenureLabel:'Danske Bank siden okt. 2017 · ca. 8 år 7 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'London-baseret MD med fokus på loan syndications og leveraged finance, hvor han forbinder nordisk dealflow med internationale gældsmarkeder.',
    experience:[
      'Managing Director, Danske Bank Loan Syndications / Investment Banking (sep. 2024-nu; ca. 1 år 8 mdr. pr. maj 2026).',
      'Director, Danske Bank Loan Syndications / Capital Markets (okt. 2017-sep. 2024; ca. 7 år).',
      'Vice President, ING Loan Syndication Sales (nov. 2014-sep. 2017; ca. 2 år 11 mdr.).',
      'Associate Director, Mizuho Corporate Bank (jan. 2013-okt. 2014; ca. 1 år 10 mdr.).',
      'Tidligere Lloyds Banking Group, Bank of Scotland, KBC Financial Products og Accenture (2005-2012).'
    ],
    deals:[],
    education:[
      'MSc Banking & International Finance, Cass Business School (2004-2005).',
      'BSc Economics, University of Kent (2000-2004).'
    ],
    personalPoints:[
      'Hans edge er kombinationen af nordisk sponsorforståelse og reel The City-distributionserfaring.',
      'Er relevant, når en nordisk M&A-case skal oversættes til noget internationale kreditinvestorer faktisk vil købe.',
      'Profilen peger på en person, der sandsynligvis er mere hjemme i globale markedsmiljøer end i lokal dansk netværkskultur.'
    ],
    photo:'Pictures/Henrik Ljungstrom (implementeret).jpeg'
  },
  {
    name:'Bjarke Skovgaard',
    niveau:'Managing Director',
    titel:'Managing Director',
    seniorityLabel:'Managing Director siden nov. 2024',
    tenureLabel:'Danske Bank LC&I siden nov. 2024 · ca. 1 år 6 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Senior MD med baggrund i både advisory og corporate M&A; offentlig profil er relativt diskret sammenlignet med flere peers.',
    experience:[
      'Managing Director, Danske Bank Corporate Finance (nov. 2024-nu; ca. 1 år 6 mdr. pr. maj 2026).',
      'Director / family office, M&A, ECM og ownership advisory, SEB (jul. 2021-nov. 2024; ca. 3 år 5 mdr.).',
      'Vice President / Associate / Analyst, SEB Investment Banking (jan. 2012-jul. 2021; ca. 9 år 7 mdr.).',
      'Senior M&A Specialist, DONG Energy / Ørsted (aug. 2015-aug. 2017; ca. 2 år).'
    ],
    deals:[],
    education:[
      'MSc Finance & Strategic Management, Copenhagen Business School (2009-2011).',
      'BSc Economics and Business Administration, Copenhagen Business School (2006-2009).',
      'Wallenberg Institute / SEB leadership program (aug. 2021-aug. 2022).'
    ],
    personalPoints:[],
    teamContext:'I Danske Banks kompakte seniorlag er denne type profil typisk tæt på board-rådgivning og lavprofileret eksekvering på krævende situationer.',
    photo:'Pictures/Bjarke Skovgaard (implementeret).jpeg'
  },
  {
    name:'Christian Blinkenberg',
    niveau:'Managing Director',
    titel:'Co-Head Corporate Finance DK (London)',
    seniorityLabel:'Co-Head',
    tenureLabel:'Danske Bank CF siden sep. 2013 · ca. 12 år 8 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Senior cross-border M&A-profil med kombination af top-tier bank- og advokatbaggrund, særligt relevant på juridisk og internationalt komplekse mandater.',
    experience:[
      'Co-Head Corporate Finance Denmark, Danske Bank (sep. 2013-nu; ca. 12 år 8 mdr. pr. maj 2026).',
      'Executive Director, Goldman Sachs International (jul. 2007-sep. 2013; ca. 6 år 3 mdr.).',
      'M&A-advokat, Kromann Reumert (jun. 2000-jul. 2005; ca. 5 år 2 mdr.).',
      'Indgår i seniorgruppen omkring komplekse, grænseoverskridende transaktioner.'
    ],
    deals:[],
    education:[
      'MBA Finance (2005-2007).',
      'Law / Cand.jur.-baggrund (1994-2000).'
    ],
    personalPoints:[
      'Kombinerer M&A-jura og Goldman Sachs-eksekvering, hvilket er særligt relevant på dokumenttunge cross-border processer.'
    ],
    teamContext:'I kombination med profiler som Jesper Buchardt og Ulrik Rasmussen peger kildematerialet på en rolle tæt på de mest komplekse M&A-forløb.',
    photo:'Pictures/Christian Blinkenberg (nyt foto).jpeg',
    photoCrop:'center top',
    photoFit:'contain'
  },
  {
    name:'Jesper Buchardt',
    niveau:'Managing Director',
    titel:'Managing Director',
    seniorityLabel:'Managing Director siden apr. 2024',
    tenureLabel:'Danske Bank CF siden sep. 2016 · ca. 9 år 8 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Langvarig Danske Bank-profil i dansk M&A, som rykkede op til MD i 2024 efter mange år i Corporate Finance-teamet.',
    experience:[
      'Managing Director, Danske Bank Corporate Finance (apr. 2024-nu; ca. 2 år 1 mdr. pr. maj 2026).',
      'Director, Danske Bank Corporate Finance (sep. 2016-jun. 2024; ca. 7 år 10 mdr.).',
      'Mangeårig erfaring med dansk M&A-eksekvering.'
    ],
    deals:[
      'SKAKO Vibration / FCDE.',
      'MML Keystone / Coptersafety.'
    ],
    education:[],
    personalPoints:[
      'Hans profil er mindre mediedrevet og mere ren execution-senioritet, hvilket gør ham relevant som intern reference på dansk M&A-håndværk.'
    ],
    photo:'Pictures/Jesper Buchardt (implementeret).jpeg',
    photoCrop:'center 35%'
  },
  {
    name:'Ulrik Rasmussen',
    niveau:'Managing Director',
    titel:'Managing Director',
    seniorityLabel:'Managing Director',
    tenureLabel:'Danske Bank CF siden jun. 2016 · ca. 9 år 11 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Erfaren senior MD med lang SEB-baggrund og profil til større, internationale M&A-processer.',
    experience:[
      'Managing Director, Danske Bank Corporate Finance (jun. 2016-nu; ca. 9 år 11 mdr. pr. maj 2026).',
      'Managing Director, SEB (feb. 2001-maj 2016; ca. 15 år 4 mdr.).',
      'Indgår i Danske Banks seniorgruppe omkring større og mere komplekse mandater.'
    ],
    deals:[],
    education:[
      'MSc Accounting & Finance, Copenhagen Business School (1995-2000).'
    ],
    personalPoints:[],
    teamContext:'Kildematerialet placerer ham sammen med Christian Blinkenberg og Jesper Buchardt omkring kompleks, ofte grænseoverskridende M&A-eksekvering.',
    photo:'Pictures/Ulrik Rasmussen.jpeg'
  },
  {
    name:'Christian Hansen',
    niveau:'Managing Director',
    titel:'MD, Global Co-Head ECM',
    seniorityLabel:'Global Co-Head ECM',
    tenureLabel:'Danske Bank ECM siden ca. 2017 · ca. 9 år pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Global Co-Head ECM og en af de mest centrale profiler i nordisk equity capital markets med ledende roller på rekordstore danske emissioner.',
    experience:[
      'Global Co-Head of ECM sammen med Fredrik Segenmark i Stockholm.',
      'Hentet fra Nordea omkring 2017, hvor han var Head of ECM Denmark / Senior Manager.',
      'Offentlig stemme for Danske Banks ECM-franchise og equity story-disciplin.'
    ],
    deals:[
      'Ørsted fortegningsemission (DKK 60 mia.).',
      'Tryg fortegningsemission (DKK 37 mia.).',
      'DSV accelerated bookbuild (DKK 37,3 mia.).'
    ],
    education:[
      'MSc (Econ) i Finance & Accounting, Københavns Universitet.',
      'Stabskursus, Forsvarsakademiet.'
    ],
    personalPoints:[
      'Har offentligt formuleret ECM-disciplinen som et spørgsmål om timing, forberedelse og et robust use-of-proceeds-narrativ.',
      'Er en af de få i teamet med tydelig offentlig markedskommentator-profil omkring equity windows og investoradfærd.',
      'Hvis man skal huske ham som person, er det som den meget udadvendte ECM-stemme snarere end som lavprofil-eksekverende banker.'
    ],
    photo:'Pictures/Christian Hansen.jpeg'
  },
  // Directors
  {
    name:'Filip R. Monefeldt',
    niveau:'Director',
    titel:'Head of Corporate Advisory / Director',
    seniorityLabel:'Director / Head of Corporate Advisory',
    tenureLabel:'Danske Bank CF siden sep. 2017 · ca. 8 år 8 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Head of Corporate Advisory med fokus på det strategiske arbejde før den formelle M&A- eller ECM-proces starter.',
    experience:[
      'Corporate Finance (M&A og ECM), Danske Bank (sep. 2017-nu; ca. 8 år 8 mdr. pr. maj 2026).',
      'Investment Banking, Carnegie Investment Bank (mar. 2011-aug. 2017; ca. 6 år 6 mdr.).',
      'Assistant Analyst, Handelsbanken Equity Research (jul. 2010-feb. 2011; ca. 8 mdr.).',
      'Assistant Analyst, Nykredit Credit Research (jul. 2009-jun. 2010; ca. 1 år).'
    ],
    deals:[],
    education:[
      'MSc Finance & Accounting, Copenhagen Business School.',
      'BSc Economics and Business Administration, Copenhagen Business School.'
    ],
    personalPoints:[
      'Hans særkende er kombinationen af advisory, ECM/M&A og research, hvilket gør ham mere strategisk end rent procesdrevet.'
    ],
    teamContext:'Corporate Advisory-funktionen ligger typisk tæt på kapitalstruktur-reviews, værdioptimering og langsigtet bestyrelsessparring.',
    photo:'Pictures/Filip R. Monefeldt (implementeret).jpeg'
  },
  {
    name:'Janus Nygaard',
    niveau:'Director',
    titel:'Director',
    seniorityLabel:'Director',
    tenureLabel:'Danske Bank CF siden maj 2017 · ca. 9 år pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Direktør med stærk analytisk og akademisk profil, kombineret med operationel og strategisk erfaring fra både rådgivning og corporate-side roller.',
    experience:[
      'Director, Corporate Finance, Danske Bank (maj 2017-nu; ca. 9 år pr. maj 2026).',
      'Business Development Director, Falck Group M&A & Strategy (aug. 2015-apr. 2017; ca. 1 år 9 mdr.).',
      'Senior Associate, Carnegie Investment Bank (apr. 2011-aug. 2015; ca. 4 år 5 mdr.).',
      'Tidligere Core Strategy, Junior Consult, Skanol og undervisning på Aarhus School of Business (2006-2011).'
    ],
    deals:[],
    education:[
      'MSc Finance & International Business, Aarhus School of Business (2005-2010).',
      'Finance-ophold / master year (2009-2010).',
      'Yderligere finance-eksponering fra University of Florida (2007-2008).',
      'Tidligere Teaching Assistant i makro- og mikroøkonomi.'
    ],
    personalPoints:[
      'Hans differentiator er, at han kombinerer corporate finance med egentlig undervisningserfaring og tydelig makro-/mikroteoretisk ballast.',
      'Det mest personlige kendetegn i kilderne er interesse for at forklare, strukturere og undervise, ikke kun at eksekvere.'
    ],
    photo:'Pictures/Janus Nygaard (implementeret).jpeg'
  },
  {
    name:'Christian D. Helvind',
    niveau:'Director',
    titel:'Director',
    seniorityLabel:'Director siden jun. 2025',
    tenureLabel:'Danske Bank CF siden jun. 2025 · ca. 11 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Senior execution-director med tyngde i due diligence, datarum og fremdrift i komplekse processer.',
    experience:[
      'Director, Danske Bank Corporate Finance (jun. 2025-nu; ca. 11 mdr. pr. maj 2026).',
      'Director / Associate Director / Associate / Analyst, ATRIUM Partners (aug. 2015-maj 2025; ca. 9 år 10 mdr.).',
      'Project Assistant, Ramboll Management Consulting (feb. 2014-jul. 2015; ca. 1 år 6 mdr.).',
      'Commercial Assistant, Eksportrådet i Atlanta (jul. 2013-jan. 2014; ca. 7 mdr.).'
    ],
    deals:[],
    education:[
      'MSc Economics, Københavns Universitet (2014-2016).',
      'BSc Economics, Københavns Universitet (2010-2013).',
      'Boston University Summer School, Corporate Financial Management (2012).'
    ],
    personalPoints:[],
    teamContext:'Kildematerialet placerer ham i execution-laget omkring due diligence, koordinering og tværfunktionel projektledelse tæt på signing.',
    photo:'Pictures/Christian D. Helvind (implementeret).jpeg',
    photoCrop:'center center'
  },
  {
    name:'Maria Malmborg Christensen',
    niveau:'Director',
    titel:'Head of Corporate Advisory DK',
    seniorityLabel:'Head of Corporate Advisory DK siden aug. 2024',
    tenureLabel:'Danske Bank Corporate Advisory siden aug. 2024 · ca. 1 år 9 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Leder Corporate Advisory Denmark og bringer både management consulting-, corporate strategy- og transaction advisory-erfaring ind i teamets bestyrelsesnære arbejde.',
    experience:[
      'Head of Corporate Advisory Denmark, Danske Bank (aug. 2024-nu; ca. 1 år 9 mdr. pr. maj 2026).',
      'Senior Manager & People Lead, M&A Consulting hos Monitor Deloitte.',
      'Manager, Global Strategy & Business Development hos Pandora.',
      'Karrierevej fra Analyst til Associate Director hos Clearwater International Denmark.'
    ],
    deals:[],
    education:[
      'MSc Applied Economics & Finance, Copenhagen Business School (2012-2014).'
    ],
    personalPoints:[
      'Skiller sig ud ved at kombinere transaction advisory med in-house strategi og people-lead-erfaring fra consulting.',
      'People Lead-baggrunden er et sjældent signal om, at hun ikke kun er processtærk, men også optaget af team- og organisationsdimensionen.'
    ],
    photo:'Pictures/Maria Malmborg Christensen.jpeg'
  },
  // Associate Directors
  {
    name:'Casper Jul Rask Jensen',
    niveau:'Associate Director',
    titel:'Associate Director',
    seniorityLabel:'Associate Director siden aug. 2023',
    tenureLabel:'Danske Bank siden sep. 2015 · ca. 10 år 8 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Associate Director med klassisk intern Danske Bank-udviklingskurve fra student analyst til deal captain-niveau.',
    experience:[
      'Associate Director, Corporate Finance, Danske Bank (aug. 2023-nu; ca. 2 år 9 mdr. pr. maj 2026).',
      'Associate, Corporate Finance, Danske Bank (sep. 2020-aug. 2023; ca. 3 år).',
      'Analyst, Corporate Finance, Danske Bank (sep. 2017-aug. 2020; ca. 3 år).',
      'Student Analyst, Corporate Finance, Danske Bank (aug. 2016-aug. 2017; ca. 1 år).',
      'Student Assistant, Financial Statement Analysis & Corporate Rating, Danske Bank (sep. 2015-aug. 2016; ca. 1 år).',
      'Student Assistant, Hess Corporation (jan. 2015-sep. 2015; ca. 9 mdr.).'
    ],
    deals:[],
    education:[
      'MSc Finance & Accounting, Copenhagen Business School (2015-2017).',
      'BSc Economics & Business Administration, Copenhagen Business School (2012-2015).',
      'ESADE Business & Law School summer programme (2016).',
      'Regent\'s University London exchange, Finance (2014).'
    ],
    personalPoints:[
      'Hans vigtigste differentiator er den meget lange interne rejse fra student analyst til Associate Director, hvilket giver stor institutionel hukommelse.'
    ],
    teamContext:'Associate Director-laget driver typisk modeller, IM-materiale, management presentations og datarum frem på tværs af flere workstreams.',
    photo:'Pictures/Casper Jul Rask Jensen (implementeret).jpeg'
  },
  {
    name:'Peter Christian Jensen',
    niveau:'Associate Director',
    titel:'Associate Director',
    seniorityLabel:'Associate Director siden sep. 2024',
    tenureLabel:'Danske Bank CF siden aug. 2018 · ca. 7 år 9 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Associate Director med stærk execution-profil på nyere danske og nordiske M&A-processer.',
    experience:[
      'Associate Director, Danske Bank Corporate Finance (sep. 2024-nu; ca. 1 år 8 mdr. pr. maj 2026).',
      'Associate, Danske Bank Corporate Finance (sep. 2021-sep. 2024; ca. 3 år).',
      'Analyst, Danske Bank Corporate Finance (aug. 2018-sep. 2021; ca. 3 år 2 mdr.).',
      'Analyst, FIH Partners M&A (nov. 2016-mar. 2018; ca. 1 år 5 mdr.).',
      'Student Assistant, Nykredit Capital & Risk (feb. 2016-nov. 2016; ca. 10 mdr.).'
    ],
    deals:[
      'A.P. Moller Holding / Concentric (SEK 8,6 mia.).',
      'STOK Emballage / A&M Capital.',
      'Davidsens Tømmerhandel / Kesko.',
      'Better Collective dual listing.'
    ],
    education:[
      'MSc Applied Economics & Finance, Copenhagen Business School (2016-2018).',
      'BSc Economics and Business Administration, Copenhagen Business School (2013-2016).',
      'Exchange, Singapore Management University (2015).'
    ],
    personalPoints:[
      'Kilderne peger på en håndværksnær execution-profil med styrke i IM-materiale, VDR-struktur og diligence-forberedelse.'
    ],
    photo:'Pictures/Peter Christian Jensen (implementeret).jpeg'
  },
  {
    name:'Frederik Uggerhøj',
    niveau:'Associate',
    titel:'Associate',
    seniorityLabel:'Associate siden aug. 2023',
    tenureLabel:'Danske Bank LC&I siden maj 2019 · ca. 7 år pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Associate med intern Danske Bank-erfaring og execution-tyngde på tværs af klassiske mid-market processer.',
    experience:[
      'Associate, Corporate Finance, Danske Bank LC&I (aug. 2023-nu; ca. 2 år 9 mdr. pr. maj 2026).',
      'Analyst, Corporate Finance, Danske Bank LC&I (sep. 2020-aug. 2023; ca. 3 år).',
      'Junior Analyst, Corporate Finance, Danske Bank LC&I (maj 2019-aug. 2020; ca. 1 år 4 mdr.).',
      'M&A Analyst, Capitalmind (okt. 2018-apr. 2019; ca. 7 mdr.).',
      'Business Developer, Connected Cars (aug. 2017-sep. 2018; ca. 1 år 2 mdr.).',
      'Uggerhøj Biler-roller fra car detailer til business developer (2004-2017).'
    ],
    deals:[],
    education:[
      'MSc Finance & Strategic Management, Copenhagen Business School (2018-2020).',
      'BSc Business Finance, San Diego State University (2013-2017).',
      'HEC Paris M&A Summer School Program (2017).',
      'Harvard Business School, Leading with Finance (2017).',
      'INSEAD, Strategy in the Age of Digital Disruption (2017).'
    ],
    personalPoints:[
      'Kombinerer intern bankexecution med et konkret perspektiv fra familieejet virksomhedsmiljø.',
      'Pilotcertifikatet er det klareste personlige særtræk i profilen og gør ham lettere at huske.'
    ],
    teamContext:'Associate-laget måles typisk på execution speed, modelkvalitet og evnen til at omsætte strategi til konkret procesmateriale.',
    photo:'Pictures/Frederik Uggerhøj (implementeret).jpeg'
  },
  {
    name:'Anders Højlund',
    niveau:'Associate Director',
    titel:'Associate Director',
    seniorityLabel:'Associate Director siden jun. 2025',
    tenureLabel:'Danske Bank CF siden sep. 2020 · ca. 5 år 8 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Associate Director med stærk execution-baggrund og central rolle i rekruttering til First Year Analyst-programmet.',
    experience:[
      'Associate Director, Corporate Finance, Danske Bank (jun. 2025-nu; ca. 11 mdr. pr. maj 2026).',
      'Associate, Corporate Finance, Danske Bank (aug. 2022-jun. 2025; ca. 2 år 11 mdr.).',
      'Analyst, Corporate Finance, Danske Bank (sep. 2020-aug. 2022; ca. 2 år).',
      'Associate / Analyst, Clearwater International Corporate Finance (aug. 2018-aug. 2020; ca. 2 år 1 mdr.).',
      'Student Analyst, Jyske Bank Market Risk & Models (feb. 2018-aug. 2018; ca. 7 mdr.).',
      'Tidligere Ramboll Management Consulting og Teaching Assistant på Aarhus Universitet (2016-2018).'
    ],
    deals:[],
    education:[
      'MSc Finance, Aarhus Universitet (2018-2020).',
      'BSc Economics and Business Administration, Aarhus Universitet (2015-2018).',
      'Barcelona Graduate School of Economics Summer School, Finance (2019).'
    ],
    personalPoints:[
      'Er central i analyst-hiring og dermed en nøglefigur for, hvordan teamet selekterer og former juniorlaget.'
    ],
    photo:'Pictures/Anders Højlund (implementeret).jpeg'
  },
  // Associates
  {
    name:'Valdemar Stengaard',
    niveau:'Associate',
    titel:'Associate',
    seniorityLabel:'Associate',
    tenureLabel:'Danske Bank CF siden aug. 2022 · ca. 3 år 9 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Associate i execution-laget mellem analytikerproduktion og egentligt delansvar for transaktionsforløb.',
    experience:[],
    deals:[],
    education:[],
    personalPoints:[],
    teamContext:'Associate-niveauet i et kompakt Corporate Finance-team kvalitetssikrer typisk modeller, pitch books og procesmateriale og begynder at tage mere selvstændigt ansvar for workstreams.',
    photo:'Pictures/Valdemar Stengaard (implementeret).jpeg'
  },
  {
    name:'Magnus Johansen',
    niveau:'Associate',
    titel:'Associate',
    seniorityLabel:'Associate siden sep. 2024',
    tenureLabel:'Danske Bank CF siden jun. 2021 · ca. 4 år 11 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Associate med baggrund i både corporate finance og transaction services og med klassisk finance-uddannelse fra CBS.',
    experience:[
      'Associate, Danske Bank Corporate Finance (sep. 2024-nu; ca. 1 år 8 mdr. pr. maj 2026).',
      'Analyst, Danske Bank Corporate Finance (aug. 2021-sep. 2024; ca. 3 år 2 mdr.).',
      'Student Analyst, Danske Bank Corporate Finance (jun. 2021-aug. 2021; ca. 3 mdr.).',
      'Part-time Analyst, Handelsbanken Corporate Finance (jan. 2020-feb. 2021; ca. 1 år 2 mdr.).',
      'Analyst, Grant Thornton Financial Advisory Services (feb. 2019-jan. 2020; ca. 1 år).'
    ],
    deals:[],
    education:[
      'MSc Finance & Accounting, Copenhagen Business School (2019-2021).',
      'BSc Economics and Business Administration, Copenhagen Business School (2016-2019).',
      'Relevante kurser i Investment Banking, Equity Securities Analysis, Futures / Options / Financial Risk og Investment Analysis.',
      'Bachelor exchange, Boston University Questrom School of Business (2018).'
    ],
    personalPoints:[],
    teamContext:'I associate-laget ligger fokus typisk på at gå fra ren modelbygning til mere selvstændig kvalitetssikring og procesansvar.',
    photo:'Pictures/Magnus Johansen (implementeret).jpeg'
  },
  // Analysts
  {
    name:'Christian Dahl',
    niveau:'Analyst',
    titel:'Analyst',
    analystYear:'third',
    seniorityLabel:'Third-year Analyst',
    tenureLabel:'Danske Bank CF siden aug. 2023 · ca. 2 år 9 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Analyst i execution-maskinrummet med en usædvanlig kombination af klassisk finansarbejde og tydelig humanistisk / filosofisk refleksion.',
    experience:[
      'Analyst, Danske Bank Corporate Finance (aug. 2023-nu; ca. 2 år 9 mdr. pr. maj 2026).',
      'Tidligere Corporate Finance Student Analyst internt før fuldtidsrollen.'
    ],
    deals:[],
    education:[],
    personalPoints:[
      'Kildematerialet peger på konkret akademisk arbejde med Hannah Arendt og institutionskultur, hvilket er meget atypisk for analyst-laget.',
      'Hans edge er ikke bare “filosofi”, men evnen til at analysere bankmiljøet som social struktur frem for kun som modelmaskine.',
      'Det er den mest tydelige intellektuelle særinteresse i hele teammaterialet.'
    ],
    teamContext:'Analyst-laget leverer hovedparten af modelarbejde, deck-opdateringer og data room-understøttelse i det danske team.',
    photo:'Pictures/Christian Dahl (implementeret).jpeg'
  },
  {
    name:'Mikkel Ravn Christensen',
    niveau:'Analyst',
    titel:'Analyst',
    analystYear:'second',
    seniorityLabel:'Second-year Analyst',
    tenureLabel:'Danske Bank CF siden aug. 2024 · ca. 1 år 9 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Analyst med usædvanlig buy-side-baggrund fra både PE og real estate-investeringer før Investment Banking.',
    experience:[
      'Analyst, Corporate Finance, Danske Bank (aug. 2024-nu; ca. 1 år 9 mdr. pr. maj 2026).',
      'Investment Analyst, Novo Holdings (aug. 2022-aug. 2024; ca. 2 år).',
      'Analyst, Thylander Private Equity Real Estate (apr. 2021-aug. 2022; ca. 1 år 5 mdr.).',
      'Analyst, Gottlieb+Partners (sep. 2019-apr. 2021; ca. 1 år 8 mdr.).',
      'Instructor i statistik, CBS Department of Finance (jul. 2020-jun. 2022; ca. 2 år).'
    ],
    deals:[],
    education:[
      'MSc Finance & Accounting, Copenhagen Business School.',
      'MSc exchange, University of Melbourne.',
      'BSc Economics and Business Administration, Copenhagen Business School.'
    ],
    personalPoints:[
      'Kommer ind i analyst-laget med markant mere buy-side- og principal-erfaring end mange peers.',
      'Statistik-undervisning er det tydeligste personlige/arbejdsmæssige særtræk ud over CV-linjerne.'
    ],
    photo:'Pictures/Mikkel R. Christensen (implementeret).jpeg'
  },
  {
    name:'Bavendra Rajendra',
    niveau:'Analyst',
    titel:'Analyst',
    analystYear:'second',
    seniorityLabel:'Second-year Analyst',
    tenureLabel:'Danske Bank CF siden aug. 2024 · ca. 1 år 9 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Analyst med international pre-IB-profil på tværs af London-banking og private equity.',
    experience:[
      'Analyst, Corporate Finance, Danske Bank (aug. 2024-nu; ca. 1 år 9 mdr. pr. maj 2026).',
      'Investment Banking Summer Analyst, Credit Suisse Healthcare & Consumer (jun. 2023-aug. 2023; ca. 3 mdr.) med efterfølgende UBS-tilbud.',
      'Private Equity Analyst, CataCap (sep. 2022-jun. 2023; ca. 10 mdr.).',
      'Investment Banking Associate / Analyst, Tofte & Company (jan. 2021-jul. 2022; ca. 1 år 7 mdr.).',
      'Analyst / Senior Analyst, Nordic Knowledge Partners (sep. 2019-maj 2020; ca. 9 mdr.).'
    ],
    deals:[],
    education:[
      'MSc Finance & Strategic Management, Copenhagen Business School (2022-2024).',
      'BSc Economics and Business Administration, Copenhagen Business School (2018-2021).',
      'BSc exchange, MIT Sloan School of Management (2020).',
      'BSc exchange, Harvard University (2020).',
      'BSc summer school, London School of Economics (2019).'
    ],
    personalPoints:[
      'Kombinerer tidlig London-eksponering med både dansk mid-market advisory og PE-erfaring.',
      'MIT Sloan og Harvard skiller ham ud som en mere internationalt orienteret profil end den typiske analyst.'
    ],
    photo:'Pictures/Bavendra Rajendra (implementeret).jpeg'
  },
  {
    name:'Anders Calmar Jakobsen',
    personId:'anders-calmar-jakobsen',
    niveau:'Associate',
    titel:'Associate',
    seniorityLabel:'Associate siden sep. 2025',
    tenureLabel:'Danske Bank CF siden feb. 2022 · ca. 4 år 3 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Associate med klassisk intern progression fra Student Analyst til Analyst og Associate i Danske Bank Corporate Finance.',
    experience:[
      'Associate, Corporate Finance, Danske Bank (sep. 2025-nu; ca. 8 mdr. pr. maj 2026).',
      'Analyst, Corporate Finance, Danske Bank (aug. 2022-aug. 2025; ca. 3 år 1 mdr.).',
      'Student Analyst, Corporate Finance, Danske Bank (feb. 2022-aug. 2022; ca. 7 mdr.).',
      'Student Assistant, Nykredit Derivatives (jan. 2021-jan. 2022; ca. 1 år 1 mdr.).',
      'Student Assistant, Jyske Bank Corporate and Institutional Banking (jan. 2020-jan. 2021; ca. 1 år).'
    ],
    deals:[],
    education:[
      'MSc Finance & Investments, Copenhagen Business School (sep. 2020-jun. 2022).',
      'LSE Summer School, Advanced Corporate Finance (jul. 2021-aug. 2021).',
      'BSc Economics and Business Administration, Aarhus University (sep. 2017-jun. 2020).',
      'Exchange semester, UNSW Business School (aug. 2019-dec. 2019).'
    ],
    personalPoints:[],
    teamContext:'Som ny Associate er han særlig relevant for modelstruktur, valuation-standarder og analytisk disciplin i daglig execution.',
    photo:'Pictures/Anders C. Jakobsen (implementeret).jpeg'
  },
  {
    name:'Laura Povline Pedersen',
    personId:'laura-p-pedersen',
    niveau:'Analyst',
    titel:'Analyst',
    analystYear:'first',
    seniorityLabel:'First-year Analyst',
    tenureLabel:'Danske Bank CF siden aug. 2025 · ca. 9 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'First-year analyst i den danske Corporate Finance-platform og del af det nye analyst-kuld, som bærer den tungeste daglige produktionsbyrde.',
    experience:[],
    deals:[],
    education:[
      'Cand.merc.FIR, Copenhagen Business School.',
      'HA jur., Copenhagen Business School.',
      'Speciale om kapitalstruktur i nordiske børsnoterede selskaber.'
    ],
    personalPoints:[],
    teamContext:'First-year analysts i teamet rekrutteres primært fra CBS og KU og arbejder typisk med modeller, deck-formattering, benchmark-analyser og datarum under tæt senior sparring.',
    photo:'Pictures/Laura P. Pedersen (implementeret).jpeg'
  },
  {
    name:'Marcus Christensen',
    niveau:'Analyst',
    titel:'Analyst',
    analystYear:'third',
    seniorityLabel:'Third-year Analyst',
    tenureLabel:'Danske Bank CF siden aug. 2023 · ca. 2 år 9 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Analyst med baggrund i både infrastruktur / asset management, equity research og risikoorienterede markets-miljøer.',
    experience:[
      'Investment Banking Analyst, Danske Bank Corporate Finance (aug. 2023-nu; ca. 2 år 9 mdr. pr. maj 2026).',
      'Junior Analyst, AIP Management (dec. 2021-jun. 2023; ca. 1 år 7 mdr.).',
      'Analyst Assistant, Carnegie Investment Bank Equity Research & Sales (feb. 2021-dec. 2021; ca. 11 mdr.).',
      'Student Analyst, Nordea Asset Management Group Risk & Compliance (jul. 2020-feb. 2021; ca. 8 mdr.).',
      'Student Assistant / temporary hire, Nordea Operations (aug. 2017-jul. 2020; ca. 3 år).'
    ],
    deals:[],
    education:[
      'MSc Finance & Accounting, Copenhagen Business School (sep. 2021-jun. 2023).',
      'BSc European Business, Copenhagen Business School (2018-jun. 2021).',
      'Exchange, Northampton Community College (2015).',
      'FMVA, Corporate Finance Institute.',
      'Bloomberg Market Concepts.'
    ],
    personalPoints:[
      'Har været synlig omkring rekruttering og virker tæt knyttet til teamets outward-facing analyst pipeline.'
    ],
    photo:'Pictures/Marcus Christensen (implementeret).jpeg'
  },
  {
    name:'Lukas Peter Hvidkjær',
    personId:'lukas-hvidkjaer',
    niveau:'Analyst',
    titel:'Analyst',
    analystYear:'second',
    seniorityLabel:'Second-year Analyst',
    tenureLabel:'Danske Bank CF siden aug. 2024 · ca. 1 år 9 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Analyst som kom ind i Danske Bank efter tung in-house M&A-erfaring fra DSV og arbejder på tværs af ECM og M&A.',
    experience:[
      'Analyst, Corporate Finance, Danske Bank (aug. 2024-nu; ca. 1 år 9 mdr. pr. maj 2026).',
      'Junior Analyst, M&A and Strategic Projects, DSV (jan. 2022-aug. 2024; ca. 2 år 8 mdr.).',
      'Deltog i arbejdet omkring DSVs opkøb af DB Schenker (EUR 14,3 mia.).',
      'Digital Sales Associate / Student Assistant, Saxo Bank (jan. 2020-dec. 2021; ca. 2 år).',
      'Intern, CooperGenomics, London (aug. 2018-jul. 2019; ca. 1 år).'
    ],
    deals:[],
    education:[
      'MSc Finance & Accounting, Copenhagen Business School (sep. 2022-jun. 2024).',
      'Visiting student, Finance, Università Bocconi (sep. 2021-jan. 2022).',
      'BSc International Business, Copenhagen Business School (sep. 2019-aug. 2022).',
      'Danske Bank Analyst Program (okt. 2024).',
      'Financial Modeling & Valuation Analyst.'
    ],
    personalPoints:[
      'Kommer ind i analyst-laget med usædvanligt direkte in-house M&A-erfaring fra en megadeal-kontekst.',
      'DB Schenker-sporet er det letteste konkrete hook at huske ham på.'
    ],
    photo:'Pictures/Lukas Hvidkjær (implementeret).jpeg'
  },
  {
    name:'Frederik Emil Haven',
    niveau:'Analyst',
    titel:'Analyst',
    analystYear:'first',
    seniorityLabel:'First-year Analyst',
    tenureLabel:'Danske Bank CF siden aug. 2025 · ca. 9 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Analyst med baggrund i både private equity og credit management før Danske Bank.',
    experience:[
      'Analyst, Corporate Finance, Danske Bank (aug. 2025-nu; ca. 9 mdr. pr. maj 2026).',
      'Student Analyst, Waterland Private Equity (jan. 2023-jun. 2025; ca. 2 år 6 mdr.).',
      'Student Analyst, Lindgaard / Pedersen A/S (jan. 2014-jun. 2025; ca. 11 år 6 mdr.).',
      'Assistant Analyst, Accunia Credit Management (aug. 2021-dec. 2022; ca. 1 år 5 mdr.).'
    ],
    deals:[],
    education:[
      'MSc Finance & Accounting (FIR), Copenhagen Business School (2023-2025).',
      'BSc International Business, Copenhagen Business School (2020-2023).',
      'Exchange, Boston University (2022).',
      'Financial Modeling & Valuation Analyst.',
      'Masterclass i Audit & Assurance.'
    ],
    personalPoints:[],
    teamContext:'Analyst-kohorten driver den daglige produktion af peer work, modeller og præsentationer på tværs af både M&A og ECM.',
    photo:'Pictures/Frederik Emil Haven (implementeret).jpeg'
  },
  {
    name:'Julius Bjørnlund Sørensen',
    personId:'julius-b-soerensen',
    niveau:'Analyst',
    titel:'Analyst',
    analystYear:'first',
    seniorityLabel:'First-year Analyst',
    tenureLabel:'Danske Bank CF siden aug. 2025 · ca. 9 mdr. pr. maj 2026',
    sourceAsOf:'maj 2026',
    firma:'Danske Bank IB',
    overview:'Analyst med bred pre-IB-baggrund på tværs af M&A, real estate PE, transaction services og revision.',
    experience:[
      'Investment Banking Analyst, Danske Bank (aug. 2025-nu; ca. 9 mdr. pr. maj 2026).',
      'Investment Intern, Slättö Real Estate Private Equity (mar. 2025-jun. 2025; ca. 4 mdr.).',
      'Investment Banking Analyst, FIH Partners M&A (mar. 2023-feb. 2025; ca. 2 år).',
      'Transaction Advisory Services, Grant Thornton Denmark (mar. 2022-feb. 2023; ca. 1 år).',
      'Audit, Deloitte (aug. 2020-mar. 2022; ca. 1 år 8 mdr.) og Grant Thornton Denmark (sep. 2019-aug. 2020; ca. 1 år).'
    ],
    deals:[],
    education:[
      'MSc Finance & Accounting, Copenhagen Business School (2023-2025).',
      'HD 2, Financial and Management Accounting, Copenhagen Business School (2021-2023).',
      'HD 1, Business Administration, Copenhagen Business School (2019-2021).'
    ],
    personalPoints:[],
    teamContext:'Denne type analyst-profil er typisk stærk på modeldisciplin, QoE-forståelse og de mange iterationssløjfer i et aktivt data room.',
    photo:'Pictures/Julius B. Sørensen (implementeret).jpeg'
  },
];

/* ──────────────────────────────────────────────
   PEOPLE CARD PROFILE HELPERS
────────────────────────────────────────────── */
const PERSON_LOGO_MAP = [
  // Banks & advisors
  { k:'Danske Bank',        d:'danskebank.com' },
  { k:'Goldman Sachs',      d:'goldmansachs.com' },
  { k:'SEB',                d:'sebgroup.com' },
  { k:'Carnegie',           d:'carnegiegroup.com' },
  { k:'Nordea',             d:'nordea.com' },
  { k:'Handelsbanken',      d:'handelsbanken.com' },
  { k:'Jyske Bank',         d:'jyskebank.dk' },
  { k:'Nykredit',           d:'nykredit.dk' },
  { k:'ING',                d:'ing.com' },
  { k:'Mizuho',             d:'mizuho-fg.com' },
  { k:'Lloyds',             d:'lloydsbank.com' },
  { k:'Clearwater',         d:'clearwaterinternational.com' },
  { k:'FIH',                d:'fih.dk' },
  { k:'Capitalmind',        d:'capitalmind.com' },
  { k:'Julius Baer',        d:'juliusbaer.com' },
  { k:'Credit Suisse',      d:'credit-suisse.com' },
  { k:'UBS',                d:'ubs.com' },
  { k:'Kromann Reumert',    d:'kromannreumert.com' },
  { k:'Tofte',              d:'tofte.dk' },
  { k:'Accunia',            d:'accunia.com' },
  { k:'Waterland',          d:'waterland.com' },
  { k:'Slättö',             d:'slatto.com' },
  { k:'Accenture',          d:'accenture.com' },
  { k:'PFA',                d:'pfa.dk' },
  { k:'GE Financial',       d:'ge.com' },
  { k:'KBC',                d:'kbc.com' },
  // Consulting & advisory
  { k:'Monitor Deloitte',   d:'deloitte.com' },
  { k:'Deloitte',           d:'deloitte.com' },
  { k:'KPMG',               d:'kpmg.com' },
  { k:'Grant Thornton',     d:'grantthornton.com' },
  { k:'Ramboll',            d:'ramboll.com' },
  { k:'ATRIUM',             d:'atriumpartners.dk' },
  // PE & asset management
  { k:'Novo Holdings',      d:'novoholdings.com' },
  { k:'CataCap',            d:'catacap.dk' },
  { k:'AIP Management',     d:'aipmanagement.com' },
  { k:'Thylander',          d:'thylander.dk' },
  // Corporates
  { k:'Pandora',            d:'pandoragroup.com' },
  { k:'Falck',              d:'falck.com' },
  { k:'DSV',                d:'dsv.com' },
  { k:'Hess',               d:'hess.com' },
  { k:'DONG',               d:'orsted.com' },
  { k:'emmerys',            d:'emmerys.dk' },
  // Education
  { k:'CBS',                d:'cbs.dk' },
  { k:'Copenhagen Business School', d:'cbs.dk' },
  { k:'KU',                 d:'ku.dk' },
  { k:'Københavns Universitet', d:'ku.dk' },
  { k:'Aarhus Uni',         d:'au.dk' },
  { k:'Aarhus Universitet', d:'au.dk' },
  { k:'London Business School', d:'london.edu' },
  { k:'LBS',                d:'london.edu' },
  { k:'University of Florida', d:'ufl.edu' },
  { k:'Cass Business School', d:'city.ac.uk' },
  { k:'University of Kent', d:'kent.ac.uk' },
  { k:'Harvard',            d:'harvard.edu' },
  { k:'MIT',                d:'mit.edu' },
  { k:'ESADE',              d:'esade.edu' },
  { k:'IMD',                d:'imd.org' },
  { k:'LSE',                d:'lse.ac.uk' },
  { k:'Melbourne',          d:'unimelb.edu.au' },
  { k:'Forsvarsakademiet',  d:'fak.dk' },
  { k:'Regent',             d:'regents.ac.uk' },
  { k:'Singapore',          d:'smu.edu.sg' },
  { k:'Singapore Management University', d:'smu.edu.sg' },
  { k:'UNSW',               d:'unsw.edu.au' },
  { k:'Boston Uni',         d:'bu.edu' },
  { k:'Boston University',  d:'bu.edu' },
];

function findPersonDomain(text) {
  const haystack = ` ${normalizeLogoText(text)} `;
  let best = null;

  for (const { k, d } of PERSON_LOGO_MAP) {
    const needle = normalizeLogoText(k);
    if (!needle) continue;

    const rx = new RegExp(`(^|[^a-z0-9])${escapeRegex(needle)}(?=$|[^a-z0-9])`);
    const match = haystack.match(rx);
    if (!match || match.index == null) continue;

    const index = match.index;
    if (!best || index < best.index || (index === best.index && needle.length > best.needle.length)) {
      best = { index, needle, domain: d };
    }
  }

  return best ? best.domain : null;
}

function normalizeLogoText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function escapeRegex(value = '') {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildPersonProfileItem(text) {
  const safeText = escapeHtml(text);
  const domain = findPersonDomain(text);
  const visual = domain
    ? `<img class="cb-item-logo" src="${logoUrl(domain, 32)}" alt="" loading="lazy" referrerpolicy="origin" onerror="this.style.display='none'">`
    : `<div class="cb-item-dot"></div>`;
  return `<div class="cb-item"><div class="cb-item-visual">${visual}</div><div class="cb-item-text">${safeText}</div></div>`;
}

function buildPersonProfileSection(title, items) {
  if (!items || !items.length) return '';
  return `
    <section class="cb-section">
      <div class="cb-section-title">${escapeHtml(title)}</div>
      <div class="cb-section-list">
        ${items.map(buildPersonProfileItem).join('')}
      </div>
    </section>
  `;
}

/* ──────────────────────────────────────────────
   OFFLINE STATUS & SYNC QUEUE
────────────────────────────────────────────── */
const OFFLINE_QUEUE_KEY = 'ibprep_offline_queue';

function updateOnlineStatus() {
  const pill = document.getElementById('offline-pill');
  if (pill) pill.style.display = navigator.onLine ? 'none' : 'flex';
  if (!navigator.onLine) {
    // Reinitialise icons in case the pill just appeared
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

async function flushOfflineQueue() {
  if (!navigator.onLine) return;
  const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
  if (!queue.length) return;

  // Need a logged-in user to push to Firestore
  const u = window.auth && window.auth.currentUser;
  if (!u) return;

  const docRef = window.doc(window.db, 'users', u.uid);
  const updates = {};
  queue.forEach(({ cardId, data }) => { updates[`cards.${cardId}`] = data; });

  try {
    await window.updateDoc(docRef, updates).catch(async () => {
      await window.setDoc(docRef, { cards: Object.fromEntries(
        queue.map(({ cardId, data }) => [cardId, data])
      )});
    });
    localStorage.removeItem(OFFLINE_QUEUE_KEY);
    toast(`☁️ ${queue.length} svar synkroniseret`);
  } catch (e) {
    console.warn('[Sync] Flush failed:', e);
  }
}

window.addEventListener('online',  () => { updateOnlineStatus(); flushOfflineQueue(); });
window.addEventListener('offline', () => { updateOnlineStatus(); toast('✈️ Offline — svar gemmes lokalt'); });

// Run once on startup
document.addEventListener('DOMContentLoaded', updateOnlineStatus);

/* ──────────────────────────────────────────────
   FIREBASE & SYNC LOGIC
────────────────────────────────────────────── */

async function login() {
  try {
    if (!window.signInWithPopup) {
       console.error("Firebase Auth not loaded");
       return;
    }
    const result = await window.signInWithPopup(window.auth, window.provider);
    console.log("Logged in:", result.user);
    toast("Velkommen, " + result.user.displayName.split(' ')[0]);
  } catch (err) {
    console.error("Login failed:", err);
    showToast("Login fejlede");
  }
}

async function logout() {
  await window.signOut(window.auth);
  showToast("Logged ud");
  location.reload();
}

// Listen for auth changes
if (window.auth) {
  window.onAuthStateChanged(window.auth, async (u) => {
    user = u;
    const loginBtn = document.getElementById('btn-login');
    const userInfo = document.getElementById('user-info');
    
    if (user) {
      if (loginBtn) loginBtn.style.display = 'none';
      if (userInfo) {
        userInfo.style.display = 'flex';
        document.getElementById('user-pic').src = user.photoURL;
        document.getElementById('user-name').textContent = user.displayName.split(' ')[0];
      }
      await loadUserData();
    } else {
      if (loginBtn) loginBtn.style.display = 'flex';
      if (userInfo) userInfo.style.display = 'none';
    }
    renderDecks();
  });
}

async function loadUserData() {
  if (!user) return;
  try {
    const docRef = window.doc(window.db, "users", user.uid);
    const docSnap = await window.getDoc(docRef);
    if (docSnap.exists()) {
      cardData = docSnap.data().cards || {};
    } else {
      // New user — only write if we're online
      if (navigator.onLine) await window.setDoc(docRef, { cards: {} });
    }
    // Flush any pending offline writes now that we're authenticated + online
    if (navigator.onLine) flushOfflineQueue();
  } catch (e) {
    console.warn('[loadUserData] Offline or error:', e);
  }
}

async function syncCard(cardId, rating) {
  if (!user) {
    // Fallback to local storage if not logged in
    const local = JSON.parse(localStorage.getItem('ib_cards') || '{}');
    if (!local[cardId]) local[cardId] = { ratings: [] };
    local[cardId].ratings.push(rating);
    localStorage.setItem('ib_cards', JSON.stringify(local));
    cardData = local;
    return;
  }

  if (!cardData[cardId]) cardData[cardId] = { ratings: [] };
  cardData[cardId].ratings.push(rating);
  cardData[cardId].lastSeen = Date.now();

  // Offline → queue for later sync (SM-2 data already saved to localStorage)
  if (!navigator.onLine) {
    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
    // Upsert: replace existing entry for same cardId with latest data
    const idx = queue.findIndex(q => q.cardId === cardId);
    const entry = { cardId, data: cardData[cardId], ts: Date.now() };
    if (idx >= 0) queue[idx] = entry; else queue.push(entry);
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    return;
  }

  const docRef = window.doc(window.db, "users", user.uid);
  await window.updateDoc(docRef, {
    [`cards.${cardId}`]: cardData[cardId]
  }).catch(async () => {
    // If updateDoc fails (e.g. doc doesn't exist yet) fall back to setDoc
    await window.setDoc(docRef, { cards: { [cardId]: cardData[cardId] } });
  });
}

function getCardScore(cardId) {
  const data = cardData[cardId];
  if (!data || !data.ratings || data.ratings.length === 0) return 5; 
  // Average of last 3 ratings
  const last3 = data.ratings.slice(-3);
  return last3.reduce((a, b) => a + b, 0) / last3.length;
}

function getWeakCards() {
  const all = [...PEOPLE.map(p => ({...p, type:'person'})), ...KNOWLEDGE.map(k => ({...k, type:'knowledge'}))];
  return all
    .map(c => ({ card: c, id: getCardId(c), score: getCardScore(getCardId(c)) }))
    .filter(item => item.score < 3.5) // Anything less than Good (4) is weak
    .sort((a,b) => a.score - b.score)
    .slice(0, 8);
}

function studyWeak() {
  const weak = getWeakCards().map(item => item.card);
  if (weak.length === 0) {
    showToast("Ingen svage kort endnu! Prøv at træne nogle decks først.");
    return;
  }
  currentSessionWeak = true;
  startStudyManual(weak, "Dine Svage Kort");
}

function startStudyManual(cards, title) {
  sessionCards = [...cards];
  currentIndex = 0;
  currentDeckTitle = title;
  showView('v-study');
  updateProgress();
  renderCard();
}

/* ──────────────────────────────────────────────
   KNOWLEDGE CARDS
   type:'knowledge' — front=question, back=answer (HTML)
────────────────────────────────────────────── */
const KNOWLEDGE = [

  /* ── VALUATION MULTIPLES ── */
  { deckId:'multiples', q:'EV/EBITDA: SaaS (Software as a Service)',
    a:`<strong>Typiske metrics:</strong> EV/Revenue, EV/ARR og først senere EV/EBITDA. Mature SaaS kan handles på <strong>15-30x EV/EBITDA</strong>, mens vækst-SaaS ofte vurderes på <strong>5-15x EV/Revenue</strong> afhængigt af kvalitet.<br><br><strong>Hvilke selskaber?</strong><ul><li>B2B subscription software, vertical SaaS, regnskabs-/compliance-software og workflow platforms.</li><li>Asset-light forretninger med høj gross margin og negativ NWC, hvor cash kommer før leverancen.</li></ul><strong>Value drivers:</strong><ul><li>ARR-vækst, Net Revenue Retention, churn, CAC payback og gross margin.</li><li>Rule of 40: vækstprocent + EBITDA-/FCF-margin. Jo mere profitabel vækst, desto højere multiple.</li><li>Enterprise customers, mission-critical produkt og lav churn trækker markant op.</li></ul><strong>Analyst watch-outs:</strong> aktiveret udvikling, SBC, one-off implementation revenue og om væksten er organisk eller købt via M&A.` },

  { deckId:'multiples', q:'EV/EBITDA: Industrielle selskaber',
    a:`<strong>Typisk range:</strong> <strong>7-12x EV/EBITDA</strong> og <strong>12-18x P/E</strong>. Best-in-class nicheindustri kan ligge højere; lavmargin/cyklisk produktion lavere.<br><br><strong>Hvilke selskaber?</strong><ul><li>Capital goods, automation, komponenter, byggematerialer, specialkemikalier og industri-services.</li><li>Ofte global B2B med ordreindgang, backlog og capex-cyklus som centrale signaler.</li></ul><strong>Value drivers:</strong><ul><li>Organisk vækst, gross margin, pricing power, backlog-kvalitet og aftermarket/service-andel.</li><li>ROIC og cash conversion: en industri-case med lav capex og recurring service fortjener premium.</li><li>Nicheposition, switching costs og eksportbar teknologi trækker op; commodity exposure trækker ned.</li></ul><strong>Analyst watch-outs:</strong> normaliseret EBITDA gennem cyklus, working capital swings, warranty provisions, råvarepris-pass-through og om ordreindgang faktisk bliver til margin.` },

  { deckId:'multiples', q:'Multipler for Banker & Finans',
    a:`<strong>Typiske metrics:</strong> <strong>P/B</strong>, <strong>P/TBV</strong>, P/E og dividend yield. <strong>EV/EBITDA bruges ikke</strong>, fordi gæld og funding er selve råvaren i en bank.<br><br><strong>Hvilke selskaber?</strong><ul><li>Universalbanker, regionalbanker, asset managers, brokers, payment companies og specialty lenders.</li><li>Forsikring bør ofte behandles separat med combined ratio, Solvency II og underwriting profit.</li></ul><strong>Value drivers:</strong><ul><li>ROE vs. cost of equity: P/B over 1,0x kræver normalt stabil ROE over kapitalkravet.</li><li>NII/renter, fee income, cost/income ratio, credit losses og kapitaludlodning.</li><li>Funding mix, CET1-buffer og regulatorisk risiko afgør hvor meget earnings markedet tør kapitalisere.</li></ul><strong>Analyst watch-outs:</strong> engangsgevinster, loan-loss normalization, model risk i RWAs og om høj yield skyldes kvalitet eller manglende vækst.` },

  { deckId:'multiples', q:'EV/EBITDA: Consumer Staples',
    a:`<strong>Typisk range:</strong> <strong>10-18x EV/EBITDA</strong> og <strong>15-25x P/E</strong>. Premium brands med global vækst og høj cash conversion kan ligge højere.<br><br><strong>Hvilke selskaber?</strong><ul><li>Fødevarer, drikkevarer, household products, beauty, tobacco og defensiv retail.</li><li>Lavere cyklikalitet end discretionary, men ofte lavere organisk vækst.</li></ul><strong>Value drivers:</strong><ul><li>Brand strength, pricing power, volumen/mix, distribution, market share og gross margin.</li><li>Stabil FCF, lav capex, buybacks/dividender og evne til at sende inflation videre til kunder.</li><li>EM/vækstmarkeder og premiumization kan løfte multiplen.</li></ul><strong>Analyst watch-outs:</strong> volume erosion bag prisstigninger, trade spend, retailer pressure, råvareinflation og om M&A skaber reel category expansion eller blot købt vækst.` },

  { deckId:'multiples', q:'EV/EBITDA: Pharma & Healthcare',
    a:`<strong>Typiske metrics:</strong> profitabel pharma/medtech bruger P/E og EV/EBITDA; biotech og pipeline-cases bruger ofte <strong>rNPV</strong>, EV/Sales eller milestone-weighted DCF.<br><br><strong>Hvilke selskaber?</strong><ul><li>Big pharma, specialty pharma, medtech, diagnostics, life science tools og biotech.</li><li>Medtech er ofte mere recurring og procedure-volume drevet; biotech er binary outcome og data-release drevet.</li></ul><strong>Value drivers:</strong><ul><li>Patent runway, clinical data, reimbursement, addressable market, launch curve og gross margin.</li><li>Pipeline breadth, probability of success, peak sales og manufacturing scale.</li><li>For medtech: procedure growth, installed base, consumables mix og salesforce productivity.</li></ul><strong>Analyst watch-outs:</strong> patent cliffs, indication risk, trial endpoints, payer pressure, one-product dependency og om reported EBITDA skjuler tung R&D reinvestering.` },

  { deckId:'multiples', q:'Sector Multiples: Energy, Renewables & Olie/Gas',
    a:`<strong>Typiske metrics:</strong> olie/gas bruger EV/EBITDAX, FCF yield og reserve value; renewables bruger EV/EBITDA, DCF per project og nogle gange EV/MW eller EV/RAB.<br><br><strong>Hvilke selskaber?</strong><ul><li>Upstream olie/gas, integrated energy, utilities, offshore wind developers, renewable IPPs og grid/infrastructure assets.</li><li>Fossile cash cows vurderes på commodity cycle; renewables vurderes på project IRR vs WACC.</li></ul><strong>Value drivers:</strong><ul><li>Olie/gas: reserve life, lifting cost, decline rates, hedging og break-even oil price.</li><li>Renewables: CfD/PPA-priser, capex budget, grid connection, turbine supply chain og farm-down economics.</li><li>Utilities: regulatorisk asset base, allowed return og stabilitet i cash flows.</li></ul><strong>Analyst watch-outs:</strong> nedskrivninger, merchant power exposure, decommissioning liabilities, project delays og om EBITDA matcher reelt distributable cash flow.` },

  { deckId:'multiples', q:'Sector Multiples: Insurance',
    a:`<strong>Typiske metrics:</strong> P/E, P/B, dividend yield og Solvency II coverage. EV/EBITDA er normalt irrelevant.<br><br><strong>Hvilke selskaber?</strong><ul><li>Skadesforsikring, liv/pension, specialty insurance og brokers.</li><li>Skade er underwriting-drevet; liv/pension er mere asset, capital og guarantee-drevet.</li></ul><strong>Value drivers:</strong><ul><li>Combined ratio, præmievækst, reserve releases, investment income og kapitalkrav.</li><li>Lav combined ratio over tid giver premium P/B, fordi underwriting profit er mere stabil og mindre balance-sheet risky.</li></ul><strong>Analyst watch-outs:</strong> cat losses, reserve adequacy, discount-rate effects, one-off gains og om earnings er underwriting eller investeringsafkast.` },

  { deckId:'multiples', q:'Sector Multiples: Transport, Logistics & Shipping',
    a:`<strong>Typiske metrics:</strong> asset-light logistics bruger EV/EBITDA, P/E og FCF yield; shipping bruger P/NAV, EV/EBITDA gennem cyklus og fleet value.<br><br><strong>Hvilke selskaber?</strong><ul><li>Freight forwarders, contract logistics, ports, ferries, tankers, dry bulk, container shipping og offshore vessels.</li><li>Forwarders er network/IT/margin-cases; shipping er asset og rate-cycle cases.</li></ul><strong>Value drivers:</strong><ul><li>Logistics: gross profit per shipment, conversion margin, integration af opkøb og working capital discipline.</li><li>Shipping: day rates, fleet age, orderbook/supply, utilization, fuel cost og charter coverage.</li></ul><strong>Analyst watch-outs:</strong> peak-cycle EBITDA, lease treatment, off-balance commitments og om M&A synergy case er cost-out eller volume growth.` },

  { deckId:'multiples', q:'Sector Multiples: Construction & Building Products',
    a:`<strong>Typiske metrics:</strong> byggematerialer bruger EV/EBITDA og P/E; contractors bruger ofte lavere P/E/EV/EBIT på normaliseret margin. Ejendomsudviklere læses også på NAV og pipeline value.<br><br><strong>Hvilke selskaber?</strong><ul><li>Byggematerialer, tekniske installationer, entreprenører, homebuilders og specialist subcontractors.</li><li>Materials kan have pricing power; contractors har ofte lav margin og høj execution risk.</li></ul><strong>Value drivers:</strong><ul><li>Housing starts, renoveringsaktivitet, public infrastructure budgets, backlog quality og input cost pass-through.</li><li>For buy-and-build: lokal fragmentering, add-on pipeline og multiple arbitrage.</li></ul><strong>Analyst watch-outs:</strong> tabsgivende projekter, warranty claims, working capital, cyclic peak margins og ordrebeholdning uden profit.` },

  { deckId:'multiples', q:'Kontrolpræmie i M&A',
    a:`<strong>20–40% præmie</strong> over seneste aktiekurs.<br><br><strong>Drivers:</strong><ul><li>Synergier (corporate)</li><li>Strategisk urgency og auktions-pres</li></ul>` },

  { deckId:'multiples', q:'Hvornår bruges EV/Revenue?',
    a:`EV/Revenue bruges, når EBITDA endnu ikke viser selskabets økonomiske potentiale.<br><br><strong>Typiske cases:</strong><ul><li>SaaS, marketplaces, payments, biotech med kommercialisering, diagnostics og andre skalerbare vækstcases.</li><li>Turnaround eller hypergrowth, hvor marginen bevidst ofres for growth investment.</li></ul><strong>Hvad driver multiplen?</strong><ul><li>Revenue quality: recurring vs project, gross margin, churn, customer concentration og net retention.</li><li>Path to profitability: markedet betaler ikke bare for vækst, men for sandsynligheden for høj fremtidig margin.</li><li>TAM og konkurrencemæssigt moat: software med 85% gross margin er ikke det samme som hardware med 35% gross margin.</li></ul><strong>Analyst watch-out:</strong> EV/Revenue er farlig, hvis omsætningen er lav-margin, one-off, acquisitive eller kræver tung capex/working capital.` },

  { deckId:'multiples', q:'Hvad justeres EBITDA for i M&A?',
    a:`EBITDA justeres til <strong>Normalized EBITDA</strong>, fordi køber betaler for den indtjening, der realistisk fortsætter efter closing.<br><br><strong>Typiske justeringer:</strong><ul><li>One-offs: restrukturering, rådgiverhonorarer, litigation, carve-out costs og integration.</li><li>Owner add-backs: ejerløn, private omkostninger, management fee og non-market leases.</li><li>Run-rate effekter: prisstigninger, tabte/vundne kunder, cost-out og fuldårseffekt af M&A.</li><li>Accounting: IFRS 16/leasing, SBC, aktiveret udvikling og earn-outs.</li></ul><strong>Hvorfor det betyder noget:</strong> En handel på 10x EV/EBITDA gør en DKK 10 mio. add-back til DKK 100 mio. værdi. Derfor bliver QoE/FDD ekstremt politisk i processen.` },

  { deckId:'multiples', q:'EV/EBITDA vs P/E — Hvornår bruges hvilken?',
    a:`<strong>EV/EBITDA:</strong> Kapitalstruktur-neutral. Bruges til at vurdere den underliggende drift og "core business". Standardmålet i M&A, fordi en køber typisk køber hele virksomheden gældfri.<br><br><strong>P/E:</strong> Kapitalstruktur-afhængig (efter renter). Relevant for <em>minoritetsaktionærer</em> og banker/finans, hvor renter er en del af "core business" (driften).` },

  { deckId:'multiples', q:'EV Bridge: Hvordan går man fra Equity Value til Enterprise Value?',
    a:`<strong>Enterprise Value (EV)</strong> =<br>+ Market Capitalization (Equity Value)<br>+ Net Interest-Bearing Debt (NIBD)<br>+ Minoritetsinteresser<br>+ Foretrukne aktier (Preferred Equity)<br>+ / - Pension Deficits / Leases (Gældslignende poster)<br><br><em>Husk regel: Frakald kontanter (fordi de kan betale gæld af) for at finde NIBD.</em>` },

  { deckId:'multiples', q:'Football Field Valuation: Hvad er det, og hvordan læses det?',
    a:`Et chart, der viser valuation-intervallerne fra forskellige metoder side om side (DCF, Comps, Precedent Transactions, LBO).<br><br><strong>Formål:</strong> Viser at værdiansættelse er en <em>range</em>, ikke et eksakt tal. Bliver brugt til at forhandle og synliggøre et "Fair Value" spænd for klienten.` },

  { deckId:'multiples', q:'DCF vs. Comps vs. Precedent Transactions — Hvornår stoler man mest på hvad?',
    a:`<strong>DCF:</strong> Intrinsic valuation. God for stabile cash flows, men meget følsom over for WACC og Terminal Rate.<br><strong>Comps (Trading Multiples):</strong> Relativ valuation. God når der findes mange meget ens peers, afspejler dagsprisen.<br><strong>Precedent Transactions:</strong> Inkluderer kontrolpræmie og synergier, men det er ofte ældre transaktioner fra et andet makromiljø.` },

  { deckId:'multiples', q:'LTM vs. NTM Multiples — Bør du benytte historik eller estimater?',
    a:`<strong>NTM (Next Twelve Months) / Forward Multiples:</strong> Foretrækkes altid, da fremtidig indtjening driver værdi for investorer.<br><br><strong>LTM (Last Twelve Months):</strong> Bruges kun hvis selskabet ikke har analytikerdækning, eller fremtiden er umulig at forudsige pga. ekstrem cyklikalitet.<br>M&A handler altid om <em>hvad køber får om 1-2 år</em>.` },

  { deckId:'multiples', q:'WACC — Komponenter og typiske ranges',
    a:`<strong>WACC (Weighted Average Cost of Capital)</strong>.<br>Den rate, man diskonterer fremtidige cash flows med i en DCF.<br><br><ul><li><strong>Sikkert utility selskab:</strong> 5-7%</li><li><strong>Stabilt C25 Industri:</strong> 7-9%</li><li><strong>Højvækst Tech / Risiko:</strong> 10-15%+</li></ul>Følsom over for Risk-Free Rate og Equity Risk Premium.` },

  { deckId:'multiples', q:'Terminal Value: Gordon Growth vs. Exit Multiple Method',
    a:`<strong>Terminal Value (TV)</strong> udgør ofte 60-80% af DCF-værdien.<br><br><strong>Gordon Growth:</strong> (FCF_n * (1+g)) / (WACC - g). Evighedsvækst (typisk 1-2% inflation).<br><strong>Exit Multiple:</strong> Antager at man sælger selskabet i år "n" til en bestemt EV/EBITDA. Ofte mere pålidelig og branche-realistisk end ren perpetuel vækst.` },

  { deckId:'multiples', q:'Sector Multiples: Utilities & Infrastructure',
    a:`<strong>Typiske metrics:</strong> <strong>8-12x EV/EBITDA</strong>, EV/RAB, dividend yield og DCF. De bedste regulated assets kan handle som lange obligationer med equity upside.<br><br><strong>Hvilke selskaber?</strong><ul><li>El-/gasnet, fjernvarme, vand, lufthavne, havne, toll roads, fibre networks og social infrastructure.</li><li>Regulated assets har mere forudsigelige cash flows; merchant assets har højere volume/price risk.</li></ul><strong>Value drivers:</strong><ul><li>Regulatorisk asset base, allowed return, inflation-linkage, kontraktlængde og volume risk.</li><li>Capex pipeline kan være positiv, hvis den kommer med reguleret afkast; negativ, hvis den skaber funding risk.</li><li>Leverage capacity og debt tenor er centrale, fordi cash flows ofte er meget stabile.</li></ul><strong>Analyst watch-outs:</strong> regulatory reset, politisk intervention, maintenance capex, concession expiry og om EBITDA reelt er fri cash flow.` },

  { deckId:'multiples', q:'Sector Multiples: Real Estate / Ejendomsselskaber',
    a:`<strong>Typiske metrics:</strong> <strong>P/NAV</strong>, EPRA NTA, implied yield/cap rate, LTV og FFO yield. EV/EBITDA er sjældent hovedmetric, fordi ejendomme er asset-value cases.<br><br><strong>Hvilke selskaber?</strong><ul><li>Kontor, retail, logistics, residential, student housing, hotels og udviklingsselskaber.</li><li>Stabil income real estate vurderes anderledes end udviklingsprojekter med plan-/byggerisiko.</li></ul><strong>Value drivers:</strong><ul><li>Yield spread vs renter, vacancy, WAULT, lejeregulering, lokation og tenant quality.</li><li>LTV, refinancing maturity wall og om porteføljen kan revalueres eller skal nedskrives.</li><li>Development pipeline skaber upside, men også capex og execution risk.</li></ul><strong>Analyst watch-outs:</strong> appraisal lag, capex undermaintenance, covenant headroom, rent-free periods og om NAV er realistisk i et nyt renteniveau.` },

  { deckId:'multiples', q:'Sector Multiples: Telecom Operations',
    a:`<strong>Typisk range:</strong> <strong>5-8x EV/EBITDA</strong> for modne telcos. Fiber towers/infrastructure kan handle højere, hvis cash flows er kontraktlige og asset-backed.<br><br><strong>Hvilke selskaber?</strong><ul><li>Mobile operators, fixed broadband, fibre networks, towers, datacentre og B2B connectivity.</li><li>Retail telco er konkurrencepræget; tower/fiber infra minder mere om infrastructure assets.</li></ul><strong>Value drivers:</strong><ul><li>ARPU, churn, subscriber growth, spectrum position, network quality og convergence bundling.</li><li>Capex intensity, 5G/fiber rollout, FCF yield og udbyttekapacitet.</li><li>Infrastructure separation eller tower sale kan unlocke højere multiple end integrated telco.</li></ul><strong>Analyst watch-outs:</strong> EBITDA efter lease/capex, prisregulering, spectrum auctions, overbygning i fiber og om høj dividend er bæredygtig.` },

  { deckId:'multiples', q:'Implied vs. Paid Multiples i Precedent Transactions',
    a:`Når du kigger på tidligere opkøb (Precedents), vil multiplerne typisk være <strong>højere</strong> end Trading Comps for tilsvarende børsnoterede selskaber.<br>Dette skyldes <strong>kontrolpræmien</strong> (ofte 20-40%) indbygget i opkøbet. Du skal fjerne præmien i tankerne, hvis du sammenligner en "minority stake" vs M&A handel.` },

  { deckId:'multiples', q:'Accretion / Dilution (EPS Impact)',
    a:`<strong>EPS Accretion (Værdiskabende) / Dilution (Udvanende)</strong>.<br>Nøgleanalysen for en strategisk køber: Stiger vores egen Indtjening Per Aktie (EPS) som følge af opkøbet efter vi har betalt renter af ny gæld / udstedt nye aktier?<br>Man tager 100% Target Net Income over, men trækker finansieringsomkostningerne (renter efter skat) ud. Hvis >0 = Accretive.` },

  /* ── DANSKE BANK ── */
  { deckId:'db', q:'Hvornår blev Danske Bank grundlagt, og hvad er dens oprindelse?',
    a:`Grundlagt <strong>1871</strong> som <em>Den Danske Landmandsbank</em>. Omdøbt til Danske Bank i 2000 efter en række fusioner.<br><br><ul><li>Danmarks <strong>største bank</strong></li><li>HQ: Holmens Kanal, København</li><li>Noteret på Nasdaq Copenhagen</li><li>Ca. 18.000 ansatte (efter "Better Bank" besparelser)</li></ul>` },

  { deckId:'db', q:'Hvad var Danske Banks hvidvaskningsskandale, og hvad var omfanget?',
    a:`<strong>2007–2015</strong>: ca. <strong>€200 mia.</strong> i mistænkelige transaktioner via Danske Banks estiske afdeling — primært fra russiske og østeuropæiske kunder.<br><br><ul><li>CEO Thomas Borgen trak sig 2018</li><li>Betragtes som Europas <strong>største AML-skandale</strong></li><li>Milliardbøder og massiv reputationsskade</li><li>Lukning af baltiske filialer efterfølgende</li></ul>` },

  { deckId:'db', q:'Hvem er Danske Banks nuværende CEO og hvad er hans baggrund?',
    a:`<strong>Carsten Egeriis</strong> — udnævnt CEO i 2021, tidligere CRO (Chief Risk Officer).<br><br>Leder <em>"Better Bank"</em>-strategien:<ul><li>Digital transformation og AI</li><li>Cost reduction (cost/income ratio mål &lt;45%)</li><li>Genopbygning af tillid post-AML</li><li>RoE-mål: 12.5%+</li></ul>` },

  { deckId:'db', q:'Hvad er Danske Banks vigtigste forretningsområder?',
    a:`<ul><li><strong>Personal Banking</strong> — retail, realkreditlån (via Realkredit Danmark)</li><li><strong>Business Banking</strong> — SME lending og rådgivning</li><li><strong>Corporates &amp; Institutions (C&amp;I)</strong> — IB, DCM, ECM, M&A advisory, trading, treasury</li><li><strong>Northern Ireland</strong> — tidligere Ulster Bank-forretning</li></ul>C&amp;I er det mest prestigefyldte segment og den primære wholesale-motor.` },

  { deckId:'db', q:'Hvad indeholder Corporates & Institutions (C&I) divisionen?',
    a:`Wholesale-divisionen der betjener <strong>store selskaber, institutioner og finansielle kunder</strong>.<br><br><ul><li><strong>Investment Banking</strong>: M&A advisory, ECM (aktieudstedelser), DCM (gældsmarked)</li><li><strong>Markets</strong>: Trading i FX, renter, commodities, kredit</li><li><strong>Transaction Banking</strong>: Cash management, trade finance</li></ul>IB-teamet i DK er relativt lille (~15–20 bankers ekskl. Analysts).` },

  { deckId:'db', q:'Hvad er "Better Bank"-strategien?',
    a:`Lanceret <strong>2023</strong> under Carsten Egeriis.<br><br>Mål:<ul><li>RoE &gt; <strong>12.5%</strong></li><li>Cost/income ratio &lt; <strong>45%</strong></li><li>Digitalisering af kerneprodukter</li><li>Fokus på nordiske kernmarkeder</li><li>Investering i AI og data-infrastruktur</li></ul>Medarbjedertallet er reduceret markant som del af cost-programmet.` },

  { deckId:'db', q:'Hvad er Danske Banks geografiske tilstedeværelse?',
    a:`<strong>Kernemarkeder:</strong> Danmark 🇩🇰, Sverige 🇸🇪, Finland 🇫🇮, Norge 🇳🇴, Nordirland 🇬🇧<br><br><strong>Eksiteret:</strong> Estland, Letland, Litauen (efter AML-skandalen)<br><br><strong>Institutionelle kontorer:</strong> London, Hamburg, Bruxelles, Luxembourg, New York.<br><br>Primære nordiske konkurrenter: <strong>DNB, SEB, Nordea, Handelsbanken</strong>.` },

  { deckId:'db', q:'Hvad er Realkreditdanmark og dens rolle i Danske Bank?',
    a:`<strong>Realkredit Danmark (RD)</strong> er Danske Banks realkreditinstitut — et datterselskab der udsteder <em>særligt dækkede obligationer (SDO)</em> til finansiering af boliglån.<br><br><ul><li>Danmark har et <strong>unikt realkreditmarked</strong> — obligationerne matches med individuelle lån (match-funding)</li><li>RD er en af Danmarks 4 store realkreditinstitutter</li><li>Lav kreditrisiko (hus er sikkerhed)</li><li>Vigtig margins-driver for Personal Banking</li></ul>` },

  { deckId:'db', q:'Danske Bank IB Track Record — Nævn bemærkelsesværdige (historiske) transactions',
    a:`Som analytiker bør du kende "Tombstones" (deal credentials):<br><ul><li><strong>M&A Advisory:</strong> DSV / Panalpina / UTI, Mærsks salg af Maersk Oil til Total, salget af TDC til Macquarie-konsortiet.</li><li><strong>ECM (Børsnoteringer/Rights Issues):</strong> Dong Energy (Nu Ørsted) IPO, Nets IPO, SAS re-kapitaliseringer.</li></ul><em>Tip: Kend altid de nyeste 3 publicerede deals fra teamet før interviewet.</em>` },

  { deckId:'db', q:'Key Financial Metrics for Danske Bank (Ca. tal man skal kende)',
    a:`<ul><li><strong>Return on Equity (RoE):</strong> Target > 13% (Mål nået under "Better Bank", svinger 10-14% alt efter renter).</li><li><strong>Cost/Income Ratio (C/I):</strong> Target < 45% (Hver krone tjent koster nu under 45 øre - stor forbedring = effektivisering).</li><li><strong>CET1 Ratio (Kapitalbuffer):</strong> ~ 18%+ (Meget velpolstret sammenlignet med krav opstået efter Finanskrisen).</li></ul>` },

  { deckId:'db', q:'Competitive Positioning: Hvem er Danske Banks primære konkurrenter for Corporate Finance (IB) mandates i Norden?',
    a:`<strong>Tier 1 i Norden (De andre store nordiske banker):</strong><br>SEB (Sverige, traditionelt stærk i IB), Nordea, DNB (Norge, konger af energi/shipping), Carnegie (Boutique, meget synlig i ECM).<br><br><strong>Bulge Brackets:</strong> Goldman Sachs, Morgan Stanley, J.P. Morgan m.fl., der flyver ind på de største danske "Jumbo-deals", hvor Danske Bank og SEB ofte agerer Co-Advisor for at levere lokal viden og debt.` },

  { deckId:'db', q:'Bankens Regulatoriske Landskab: Hvilke myndigheder og regelsæt dikterer bankens manøvrerum?',
    a:`<ul><li><strong>Finanstilsynet (DFSA):</strong> Den lokale danske vagthund (udsteder påbud).</li><li><strong>European Central Bank (ECB):</strong> Sætter renterne / makro-miljøet for euroen (som DKK er låst op mod).</li><li><strong>Basel III / IV compliance:</strong> Strenge internationale krav til hvor meget egenkapital (CET1) banken skal holde tilbage som buffer for hhv. udlån og trading risk. Gør kapitalkrævende M&A lån sværere.</li></ul>` },

  { deckId:'db', q:'Danica Pension & Asset Management — Hvordan hænger det sammen?',
    a:`<strong>Danica Pension</strong> er et integreret datterselskab i Danske Bank og en af Danmarks største kommercielle pensionskasser.<br><br>Det giver banken en enorm <em>Asset Under Management (AUM)</em> muskel og gebyr-indtægter via Danske Invest. Desuden holder det kunder "inde i huset" helt fra vugge (børneopsparing) til kiste (livrente).` },

  { deckId:'db', q:'Digital Transformation & MobilePay-Historien (Nu samarbejde med Vipps)',
    a:`MobilePay blev udviklet af Danske Bank i 2013 (ledet af Tonny Thierry) og udgjorde en kæmpe First Mover-succes.<br><br>For at skalere i Norden valgte Danske Bank dog klogt at indgå M&A/konsolidering med norske Vipps og finske Pivo i 2021/2022. I dag ejer Danske Bank ~27.8% af den samlede Nordiske <strong>Vipps MobilePay</strong>.` },

  /* ── INTERESSEKONFLIKTER & INCENTIVES (DEEP DIVE) ── */

  // INTERNE KONFLIKTER I EN BANK (F.EKS. DANSKE BANK)
  { deckId:'stakeholders', q:'Hvad er den primære interessekonflikt mellem M&A (Corporate Finance) og Corporate Banking (Udlån) internt i banken?',
    a:`<strong>M&A Advisory:</strong> Incitament er at lukke deals hurtigt for at få <em>success fees</em>. Tænker kortsigtet transaktionsdrevet.<br><br><strong>Corporate Banking:</strong> Incitament er at minimere kreditrisiko og få stabile renteindtægter. Tænker langsigtet og konservativt.<br><br><strong>Problemet:</strong> M&A-teamet vil ofte pushe banken til at tilbyde aggressiv holdebetinget finansiering (staple financing) for at vinde M&A-mandatet, hvilket tvinger udlånsafdelingen til at tage højere risiko end de måske ønsker.` },

  { deckId:'stakeholders', q:'Hvorfor har man "Chinese Walls" internt i investeringsbanker, og hvilke incitamenter forsøger de at styre?',
    a:`<strong>Chinese Walls</strong> er informationsbarrierer mellem <em>Private side</em> (M&A, ECM, DCM) og <em>Public side</em> (Sales, Trading, Equities Research).<br><br><strong>Incitaments-clash:</strong> M&A-bankers sidder på <em>Material Non-Public Information (MNPI)</em> (f.eks. om et forestående opkøb). Traders og sælgere har et direkte økonomisk incitament til at basere deres handler og aktieanbefalinger på denne viden indenfra (Insider trading).<br><br>Muren sikrer compliance og forhindrer at banken straffes for markedsmanipulation.` },

  { deckId:'stakeholders', q:'Hvad er interessekonflikten når Danske Bank agerer som både Rådgiver (M&A) og Finansieringskilde (Lender) på samme transaktion?',
    a:`<strong>Staple Financing Conflict:</strong><br><br><ul><li>Banken vil som <strong>Rådgiver for sælger</strong> have buddet til at blive højere (større success fee).</li><li>Samtidig vil de gerne sælge <strong>Finansiering til køber</strong>, for at tjene renter og låne-gebyrer.</li></ul><strong>Clash:</strong> For at gøre finansieringen attraktiv for køber, og vinde finansieringsmandatet, kan banken have et incitament til at "over-leverage" køberen, eller dele information der egentlig skulle beskytte sælgeren. Begge dele slører bankens fulde loyalitet mod sælger.` },

  // EKSTERNE KONFLIKTER (BANK VS. KLIENT)
  { deckId:'stakeholders', q:'Hvad er det fundamentale incitamentsproblem for M&A-rådgivere på tværs af både købs- og salgssiden?',
    a:`<strong>Completion Bias (Deal Contingency problem)</strong><br><br>Næsten alt rådgiverens honorar (Success Fee / % of transaction value) er betinget af at <em>en handel gennemføres</em>.<br><br>Resultat: Hverken en købsrådgiver eller sælgsrådgiver tjener penge, hvis de anbefaler klienten at "gå væk fra handlen" (Walk away). Rådgiveren har et massivt økonomisk incitament til at presse handlen igennem, selv hvis prisen er ugunstig for deres egen klient, blot for at udløse honoraret.` },

  { deckId:'stakeholders', q:'Hvordan skiller en strategisk købers incitament sig fra en finansiel købers (PE) incitamenter i en auktionsproces (Salg)?',
    a:`<strong>Strategisk Køber (Corporate):</strong><br>Søger langvarig industriel synergi og markedsandele. Er ofte villig til at betale en <em>højere pris</em> (synergipræmie) fordi de kan udløse omkostningsbesparelser.<br><br><strong>Finansiel Køber (PE-fond):</strong><br>Køber for at optimere og videresælge om 3-5 år (IRR og Moic fokus). Vil betale <em>så lidt som muligt</em> (discipline på "entry price") for at sikre afkast. Bruger meget gæld til at minimere egenkapitalbindingen.<br><br>Sælgerrådgiver (dig) vil elske strategiske købere for prisen, men PE for deres eksekverings-hastighed.` },

  // RÅDGIVERE OG LEDELSE VS EJERE
  { deckId:'stakeholders', q:'Hvilken incitamentskonflikt forekommer primært i virksomhedsledelsen i målvirkomsheden ("The Target") op til et opkøb (Agency Problem)?',
    a:`<strong>Aktionærerne (Ejerne):</strong> Ønsker den absolut højeste salgspris per aktie, uanset hvem køberen er.<br><br><strong>Ledelsen (Management - f.eks. CEO):</strong> Tænker på personlige incitamenter: Får jeg lov at beholde mit job? Bliver min afdeling skåret ned? Får jeg et <em>retention bonus</em>?<br><br>Dette skaber et <strong>Principal-Agent problem</strong>. Ledelsen kan arbejde mod en god aftale og i stedet skræmme købere væk for at beskytte egne interesser (Entrenchment), medmindre de har <em>Golden Parachutes</em> der kompenserer dem massivt ved et salg.` },

  { deckId:'stakeholders', q:'Hvad er LP/GP dynamikken, og hvor er de største incitament-clashes derude for en Private Equity-Kunde?',
    a:`<strong>LP (Limited Partner - Investor):</strong> Ønsker et højt risiko-justeret afkast til deres pensionister uden overdreven konkursrisiko.<br><br><strong>GP (General Partner - PE-Fonden):</strong> Tjener 2% i management fee og 20% af <em>over-afkastet</em> (Carried Interest / Carry).<br><br>Eftersom GP kun får de vilde 'carry'-gevinster hvis fonden klarer sig markant over et basalt afkast, har de et stort asymmetrisk incitament til at tage enormt meget risiko via gældsstrukturer. Deres "downside" er limiteret, men de fanger den fulde "upside".` },

  { deckId:'stakeholders', q:'Hvad dækker begrebet "Fairness Opinion" over i en M&A-deal, og hvorfor bliver det ofte kritiseret ud fra et konfliktperspektiv?',
    a:`En <strong>Fairness Opinion</strong> er et officielt brev fra investeringsbanken til bestyrelsen, der verificerer, at prisen på selskabet er fairness-baseret for aktionærerne.<br><br><strong>Formålet for bestyrelsen</strong>: Den dækker dem "juridisk ryggen" i tilfælde af sagsanlæg mod mangelfuld pris (fiduciary duties).<br><br><strong>Incitaments-Konflikt</strong>: Rådgiveren der udskriver Fairness Opinion er oftest den <em>samme bank</em> som får et multi-million dollar success-fee HVIS handlen vedtages. (Bukken vogter havresekken).` },

  { deckId:'stakeholders', q:'Hvad er spændingen mellem gældsholdere og egenkapitalsholdere i et LBO?',
    a:`<strong>Lenders (F.eks. banken/Private debt)</strong>: Er låste på deres afkast (renten). Vil have firmaet til at have stor cash-buffer, brede covenants, minimalt capex og betale gælden ned systematisk. Risikominimering.<br><br><strong>Equity Sponsors (PE-Fonden)</strong>: Ønsker at firmaet tager aggressiv markedsvækst, lån endnu flere penge, for at hæve værdiansættelsen (upside). Kan endda forsøge "Dividend Recapitalizations" (låner flere penge til at betale udbytte).` },

  { deckId:'stakeholders', q:'Hvorfor er det ikke altid det bedste udfald for en sælger bare at vælge det højeste bud?',
    a:`<strong>Sælger optimerer sjældent kun for pris.</strong><br><br>Et bud vurderes typisk på mindst fire akser: <strong>pris</strong>, <strong>certainty of close</strong>, <strong>speed</strong> og <strong>confidentiality</strong>.<br><br>En strategisk køber kan byde højest, men også have høj antitrust-risiko, tung bestyrelsesproces eller finansieringsusikkerhed. En PE-køber kan byde lidt lavere, men være hurtigere, mere diskret og mere sikker på closing.<br><br><strong>Pointen:</strong> Den bedste deal er ofte den med højest <em>risk-adjusted value</em>, ikke nødvendigvis højeste headline-pris.` },

  { deckId:'stakeholders', q:'Hvordan flytter en earn-out interessekonflikten mellem køber og sælger i stedet for at fjerne den?',
    a:`<strong>Sælger:</strong> Vil have fuld betaling up-front og mener ofte at vækstplanen er næsten sikker.<br><br><strong>Køber:</strong> Vil kun betale toppris hvis performance faktisk materialiserer sig efter closing.<br><br><strong>Earn-out:</strong> Udskyder en del af købesummen og gør den afhængig af fremtidig EBITDA, omsætning eller andre KPI'er.<br><br><strong>Ny konflikt:</strong> Efter closing opstår kamp om, hvordan virksomheden drives, hvilke omkostninger der allokeres, og om køber manipulerer resultaterne så earn-out ikke udløses. Earn-outs løser prisuenighed, men skaber governance-konflikt.` },

  { deckId:'stakeholders', q:'Hvad er den typiske konflikt omkring working capital peg i en SPA?',
    a:`<strong>Køber:</strong> Vil have et højt <em>working capital peg</em>, så virksomheden afleveres med "normaliseret" driftskapital og ikke tømmes før closing.<br><br><strong>Sælger:</strong> Vil have et lavt peg og argumenterer ofte for, at sæsonudsving eller midlertidige forhold gør det unaturligt at efterlade mere kapital i virksomheden.<br><br><strong>Hvorfor vigtigt?</strong> Working capital-justeringen er en skjult prisjustering. Selv hvis headline-prisen er aftalt, kan parterne stadig slås om millioner gennem peg, definitioner og cut-off regler.` },

  { deckId:'stakeholders', q:'Hvorfor kan target management foretrække en PE-køber frem for en strategisk køber, selv hvis PE byder lavere?',
    a:`<strong>Ved salg til PE:</strong> Ledelsen får ofte lov at blive siddende, rulle egenkapital videre (<em>rollover equity</em>) og få en ny upside ved exit om 3-5 år.<br><br><strong>Ved salg til strategisk køber:</strong> Der er større risiko for integration, overlap, omstrukturering og at ledelsen mister autonomi eller jobbet.<br><br><strong>Konflikten:</strong> Aktionærerne vil typisk foretrække højeste pris her og nu, mens ledelsen kan hælde mod PE, fordi deres personlige fremtid og upside ser bedre ud. Det er et klassisk agency-problem i auktioner.` },

  { deckId:'stakeholders', q:'Hvad er den interne konflikt hos en strategisk køber mellem CEO, CFO, Corp Dev og integrationsteamet?',
    a:`<strong>CEO / Business Owner:</strong> Vil ofte have strategisk momentum, vækst og narrativ værdi.<br><br><strong>Corp Dev / M&A-team:</strong> Vil gerne få transaktionen gennemført og bevise at de kan eksekvere.<br><br><strong>CFO:</strong> Fokuserer på prisdisciplin, gearing, EPS-effekt og downside-risiko.<br><br><strong>Integrationsteam / drift:</strong> Bekymrer sig om, hvorvidt synergier faktisk kan realiseres uden kaos.<br><br><strong>Resultat:</strong> En køber kan se aggressiv ud udadtil, men være splittet internt. Som rådgiver er det afgørende at forstå, hvem der reelt kan stoppe handlen.` },

  { deckId:'stakeholders', q:'Hvordan ændrer danske takeover-regler incitamenterne i public M&A?',
    a:`<strong>33,3%:</strong> Krydses denne kontrolgrænse, kan et pligtmæssigt tilbud udløses. Det gør "creeping control" dyrere og mere reguleret.<br><br><strong>90%:</strong> Først her kan en køber normalt tvangsindløse minoriteter og afnotere selskabet.<br><br><strong>Konsekvens:</strong> En køber der kun når f.eks. 70% får ikke fuld kontrol over cash flows og synergiudnyttelse. Minoriteter bliver et reelt problem, ikke bare en juridisk detalje.<br><br><strong>Pointen:</strong> Reglerne former direkte budstruktur, acceptbetingelser, pris og hvor aggressivt en køber kan gå frem.` },

  { deckId:'stakeholders', q:'Hvordan skaber A- og B-aktier samt erhvervsdrivende fonde særlige incentive-dynamikker i Danmark?',
    a:`<strong>Økonomisk ejerskab</strong> og <strong>kontrol</strong> er ofte ikke det samme i Danmark.<br><br>En fond eller controlling shareholder kan eje en relativt lille del af kapitalen, men stadig kontrollere selskabet via A-aktier med højere stemmeret.<br><br><strong>Konflikten:</strong> Minoritetsaktionærer kan ønske højere kortsigtet afkast eller et salg, mens fonden prioriterer kontrol, arv, formål, stabilitet og langsigtet industrielt ejerskab.<br><br>Det betyder, at et "økonomisk attraktivt" bud stadig kan være dødt, hvis det ikke passer med kontrollens reelle ejer.` },

  { deckId:'stakeholders', q:'Hvordan ser interessekonflikten ud i en IPO eller ECM-transaktion mellem issuer, sælgende aktionærer, investorer og banken?',
    a:`<strong>Issuer / selskabet:</strong> Vil have høj pris og så lidt dilution som muligt.<br><br><strong>Sælgende aktionærer:</strong> Vil ofte maksimere provenu og måske sælge mere end markedet egentlig kan absorbere.<br><br><strong>Nye investorer:</strong> Vil have en rabat og upside efter notering.<br><br><strong>Banken:</strong> Vil have en bog der kan placeres sikkert og et aftermarket der ikke kollapser dag 1.<br><br><strong>Clash:</strong> For høj pris eller for stor seller sell-down kan få aktien til at handle dårligt efter notering. Banken skal balancere klientens kortsigtede prisønske mod markedets behov for en holdbar case.` },

  { deckId:'stakeholders', q:'Hvorfor opstår re-trading efter signing, og hvem har incitament til at presse det?',
    a:`<strong>Re-trading</strong> er når køber forsøger at genforhandle pris eller vilkår efter at have vundet processen, typisk med henvisning til diligence-fund, svag performance eller ændrede markedsforhold.<br><br><strong>Købers incitament:</strong> Når konkurrencen er væk efter eksklusivitet eller signing, stiger forhandlingsmagten ofte. De prøver at fange mere værdi.<br><br><strong>Sælgers problem:</strong> Tidsforbrug, træt ledelse, lækagerisiko og færre alternative købere gør det dyrt at starte forfra.<br><br><strong>Praktisk læring:</strong> Stærkt data room, skarpe reps, få åbne diligence-spørgsmål og høj closing certainty reducerer re-trade-risikoen.` },

  { deckId:'stakeholders', q:'Hvordan skifter konfliktlinjen mellem signing og closing i en M&A-deal?',
    a:`<strong>Før signing:</strong> Konflikten handler mest om pris, struktur, diligence og hvem der bærer hvilke risici.<br><br><strong>Mellem signing og closing:</strong> Fokus flytter til <em>interim covenants</em>, regulatoriske approvals, financing certainty og drift af virksomheden i "ordinary course".<br><br><strong>Køber:</strong> Vil begrænse negative overraskelser og bevare exit-muligheder hvis noget ændrer sig.<br><br><strong>Sælger:</strong> Vil bevare fleksibilitet til at drive virksomheden normalt og undgå at køber bruger perioden til at finde undskyldninger for at forsinke eller ændre handlen.` },

  { deckId:'stakeholders', q:'Hvordan adskiller incitamenterne sig mellem en founder/familie-sælger, en PE-sælger og en børsnoteret bestyrelse?',
    a:`<strong>Founder / familie:</strong> Ser ofte også på kultur, legacy, medarbejdere og navn - ikke kun pris.<br><br><strong>PE-sælger:</strong> Er normalt meget mere pris-, proces- og certainty-drevet. De vil have klar exit, lav execution risk og få emotionelle hensyn.<br><br><strong>Børsnoteret bestyrelse:</strong> Skal kunne forsvare processen overfor alle aktionærer, medier og potentielle søgsmål. Governance og fairness betyder langt mere.<br><br><strong>Konklusion:</strong> "Hvad vil sælgeren?" kan ikke besvares uden først at vide, hvilken type sælger du arbejder for.` },

  { deckId:'stakeholders', q:'Hvorfor tvinges du som IB-analytiker til at forstå Value Chain Incentives fuldstændigt?',
    a:`<ul><li>Når du designer en transaktionsstruktur, ved du hvem der vil blokere og hvem der vil pushe.</li><li>Du kan bygge de rigtige earn-outs, escrow konti eller management bonusser som fjerner barriererne.</li><li>Som rådgiver forbereder du dine klienter (f.eks. ved at bygge en pakke, der blødgør "Target CEO").</li><li>Bankens omdømme står på spil - du skal gennemskue og formidle konflikter overfor compliance afdelingen i banken.</li></ul><br>Ingen tager million / milliard-beslutninger uden at evaluere: <em>"What's in it for me?"</em>` },

  { deckId:'stakeholders', q:'Hvad er et Break Fee og et Reverse Break Fee, og hvordan præger de incitamentet for at lukke en handel?',
    a:`<strong>Break Fee (Sælger betaler Køber):</strong> En straf på ofte 1-2% af handlen hvis sælgers bestyrelse trækker sig (f.eks. ved et højere bud udefra). Skaber tryghed for købers initialinvesteringer (advokater, DD).<br><br><strong>Reverse Break Fee (Køber betaler Sælger):</strong> Aktiveres hvis køber ikke kan lukke handlen (f.eks. pga. stop fra konkurrencemyndigheder eller hvis banken nægter lånet). Tvinger køber til at tage "financing risk" og regulatorisk risiko tungt på sig selv.` },

  { deckId:'stakeholders', q:'Hvad er og hvem benytter "Escrow" eller "Holdback" Accounts?',
    a:`En <strong>Escrow</strong> er en spærret konto hos en uafhængig tredjepart (ofte en bank, yay for fees!), hvor en del af købesummen placeres (f.eks. 10%) i 1-2 år efter closing.<br><br><strong>Incitament:</strong> Den frigives kun til sælger efter perioden, HVIS der ikke er opstået brud på garantier (Warranties) eller skeletter i skabet. Det holder sælger skinkelynhurtig og ærlig - de vil have deres sidste penge løs, køber vil have en buffer.` },

  { deckId:'stakeholders', q:'Hvad er Management Incentive Plans (MIP) / "Sweet Equity" i Private Equity Buyouts?',
    a:`Når PE køber en virksomhed, lader de ofte topledelsen "rulle" deres penge og få adgang til "Sweet Equity" (aktier / optioner) som er super gearet.<br><br><strong>Incitamentet:</strong> I stedet for ledelsen blot er funktionærer dækket ind mod ulykke (Agency konflikt), bliver de partnere der deler the "Upside". Resultat: Management begynder pludselig at arbejde 70+ timer i ugen, skære unødig fedt og optimere aggressivt frem mod The Exit for at tjene deres mange-millioner.` },

  { deckId:'stakeholders', q:'Hvad er Drag-Along og Tag-Along rights (Med-salgsret og Med-salgspligt)?',
    a:`<strong>Drag-Along (Med-salgspligt):</strong> Giver en majoritetsejer lov til at "tvinge / drakke" minoriteten til at sælge deres aktier til en 3. part. Det sikrer at en minoritet ikke kan blokere et M&A salg.<br><br><strong>Tag-Along (Med-salgsret):</strong> Giver minoriteten ("The Founders who stayed") ret til at få solgt deres aktier ("ride med") til den nye køber på <em>nøjagtig de samme vilkår</em> som Majoriteten. Beskytter de små imod at PE dumper restaktierne.` },

  { deckId:'stakeholders', q:'Hvad er Vendor Due Diligence (VDD), og hvad er interessekonflikten når Sælger bestiller rapporten?',
    a:`I en Auktions-M&A bestiller Sælgerens rådgiver ofte <strong>Vendor Due Diligence (VDD)</strong> rapporter via BIG4 (commercial, financial, tax) uger i forvejen, så Køber læser den fra day 1.<br><br><strong>Konflikten:</strong> Selvom EY/PwC er stemplet uafhængige, ved BIG4 godt, at deres regning betales af Sælger. Processen er derfor at "sætte selskabet i det bedst mulige lys, mens man stadig holder juridisk rygdækning". Købers PE-analytikere er altid ekstremt skeptiske overfor VDD EBITDA "Normalizations".` },

  { deckId:'stakeholders', q:'Warranty & Indemnity Insurance (W&I / W&I Forsikring) — Hvorfor har det forandret M&A totalt?',
    a:`Før sad advokater om natten og sloges om hvem af køber / sælger der skulle bære det fulde økonomiske ansvar for, at skattebilag for et selskab for 7 år siden var korrekt.<br><br>I dag købes en forsikring fra AIG eller Beazley <strong>(W&I Insurance)</strong>, der dækker disse brud mod at betale en engangs-præmie. Det sletter en enorm konflikt mellem Køber/Sælger fordi de nu kan vende skytset ud mod en tredjepart, hvilket markant forkorter og "blødgør" de sidste kontraktforhandlinger (SPA negotiations).` },

];

/* ──────────────────────────────────────────────
   BUILD MASTER CARD ARRAY
────────────────────────────────────────────── */
const ALL_CARDS = [
  ...PEOPLE.map(p => ({
    ...p, id: `p-${personCardKey(p)}`, type: 'people', deckId: 'people',
  })),
  ...KNOWLEDGE.filter(k => k.deckId !== 'c25').map((k, i) => ({
    id: `k${i}`, type: 'knowledge', ...k,
  })),
  ...COMPANY_CARDS.map((c, i) => ({
    id: `c${i}`, type: 'company', deckId: 'c25', ...c, ...(COMPANY_MARKET_DATA[c.name] || {}),
  })),
  ...(typeof KNOWLEDGE_2 !== 'undefined' ? KNOWLEDGE_2 : []).map((k, i) => ({
    id: `k2_${i}`, type: 'knowledge', ...k,
  })),
  ...(typeof DEAL_CARDS !== 'undefined' ? DEAL_CARDS : []).map((k, i) => ({
    id: `dl_${i}`, type: 'knowledge', ...k,
  })),
];

/* ──────────────────────────────────────────────
   AVATAR UTILITIES
────────────────────────────────────────────── */
const PALETTES = [
  ['#1E40AF','#3B82F6'],['#6D28D9','#A78BFA'],['#065F46','#34D399'],
  ['#92400E','#F59E0B'],['#9D174D','#F472B6'],['#1E3A5F','#60A5FA'],
  ['#3D1A00','#F97316'],['#064E3B','#10B981'],['#2D1B69','#818CF8'],
  ['#7C2D12','#FB923C'],
];
function palette(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = ((h << 5) - h + name.charCodeAt(i)) | 0;
  return PALETTES[Math.abs(h) % PALETTES.length];
}
function initials(name) {
  const p = name.replace(/\(.*?\)/g,'').trim().split(/\s+/).filter(Boolean);
  return p.length === 1 ? p[0][0].toUpperCase() : (p[0][0] + p[p.length-1][0]).toUpperCase();
}
function applyAv(el, name) {
  const [c1, c2] = palette(name);
  el.style.background = `linear-gradient(135deg,${c1},${c2})`;
  el.textContent = initials(name);
}

/* ──────────────────────────────────────────────
   LEVEL CHIP CLASSES
────────────────────────────────────────────── */
const LEVEL_CLASS = {
  'Leadership':'lvl-Leadership','Managing Director':'lvl-MD',
  'Executive Director':'lvl-ED','Director':'lvl-Director',
  'Associate Director':'lvl-AD','Associate':'lvl-Associate','Analyst':'lvl-Analyst'
};
const LEVEL_ORDER = ['Leadership','Managing Director','Executive Director','Director','Associate Director','Associate','Analyst'];
const ANALYST_YEAR_LABELS = {
  third: 'Third-year Analyst',
  second: 'Second-year Analyst',
  first: 'First-year Analyst',
};
const ANALYST_YEAR_ORDER = { third: 0, second: 1, first: 2 };

function personSeniorityLabel(person = {}) {
  if (person.analystYear && ANALYST_YEAR_LABELS[person.analystYear]) {
    return ANALYST_YEAR_LABELS[person.analystYear];
  }
  return person.seniorityLabel || '';
}

function buildPersonTitleLine(person = {}) {
  const seniority = personSeniorityLabel(person);
  return [person.titel, seniority, person.tenureLabel]
    .filter(Boolean)
    .filter((part, index, parts) => parts.indexOf(part) === index)
    .join(' · ');
}

function personLevelSortValue(person = {}) {
  const base = LEVEL_ORDER.indexOf(person.niveau);
  const levelValue = base === -1 ? LEVEL_ORDER.length : base;
  const analystValue = person.niveau === 'Analyst'
    ? (ANALYST_YEAR_ORDER[person.analystYear] ?? 9)
    : 0;
  return [levelValue, analystValue, person.name || ''];
}

function sortPeopleCards(a, b) {
  const av = personLevelSortValue(a);
  const bv = personLevelSortValue(b);
  return av[0] - bv[0] || av[1] - bv[1] || av[2].localeCompare(bv[2], 'da');
}

function personMatchesQuery(person = {}, query = '') {
  if (!query) return true;
  const text = [
    person.name,
    person.niveau,
    person.titel,
    person.firma,
    personSeniorityLabel(person),
    person.tenureLabel,
    ...(person.experience || []),
    ...(person.education || []),
  ].filter(Boolean).join(' ').toLowerCase();
  return text.includes(query);
}

/* ──────────────────────────────────────────────
   SM-2 ENGINE
────────────────────────────────────────────── */
const STORE_KEY = 'ibprep_sm2_v3';
function today() { return new Date().toISOString().slice(0,10); }
function load()   { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; } }
function save(d)  { localStorage.setItem(STORE_KEY, JSON.stringify(d)); }

function getSR(data, id) {
  return data[id] || { interval:0, ef:2.5, reps:0, nextDue:null, learnAgain:false, lastRating:null };
}
function applyRating(sr, rating) {
  const s = { ...sr };
  if (rating < 3) {
    s.reps=0; s.interval=0; s.learnAgain=true; s.nextDue=today();
  } else {
    s.learnAgain=false;
    if (s.reps===0) s.interval=1;
    else if (s.reps===1) s.interval=6;
    else s.interval = Math.round(s.interval * s.ef);
    s.ef = Math.max(1.3, s.ef + 0.1 - (5-rating)*(0.08+(5-rating)*0.02));
    s.reps++;
    const d = new Date(); d.setDate(d.getDate()+s.interval);
    s.nextDue = d.toISOString().slice(0,10);
  }
  s.lastRating = rating;
  return s;
}
function isDue(sr)       { return sr.nextDue && sr.nextDue <= today(); }
function isNew(sr)       { return !sr.nextDue; }
function isLearn(sr)     { return !!sr.learnAgain; }
function previewLabel(sr, rating) {
  const p = applyRating(sr, rating);
  if (p.interval===0) return 'again';
  if (p.interval===1) return '1d';
  if (p.interval<30)  return `${p.interval}d`;
  return `${Math.round(p.interval/7)}w`;
}

/* ──────────────────────────────────────────────
   APP STATE
────────────────────────────────────────────── */
let cards      = [];   // all cards with .sr attached
let activeDeck = null; // null = all
let deck       = [];   // current study deck (sorted)
let cur        = 0;
let flipped    = false;
let sessDone   = 0;
let sessGood   = 0;
let cardTapState = null;

/* ──────────────────────────────────────────────
   INIT
────────────────────────────────────────────── */
function init() {
  const data = load();
  cards = ALL_CARDS.map(c => ({ ...c, sr: getSR(data, c.id) }));
  renderHome();
  showView('v-home');
  bindFlashcardInteraction();
  lucide.createIcons();
}

/* ──────────────────────────────────────────────
   HOME SCREEN
────────────────────────────────────────────── */
function renderHome() {
  const grid = document.getElementById('deck-grid');
  const data = load();
  // Re-attach SR
  cards = ALL_CARDS.map(c => ({ ...c, sr: getSR(data, c.id) }));

  // "Study All" card
  const allDueN  = cards.filter(c => isDue(c.sr)||isLearn(c.sr)).length;
  const allNewN  = cards.filter(c => isNew(c.sr)).length;
  const allTotal = cards.length;
  const allLearned = cards.filter(c => !isNew(c.sr)&&!isDue(c.sr)&&!isLearn(c.sr)).length;
  const allPct   = Math.round(allLearned/allTotal*100);

  grid.innerHTML = `
    <div class="deck-card deck-all" onclick="startStudy(null)">
      <div class="dc-top">
        <div class="dc-icon"><i data-lucide="layers" width="20" height="20"></i></div>
        <div class="dc-top-right">
          <div class="dc-name">Træn alt</div>
          <div class="dc-desc">Samtlige ${allTotal} kort på tværs af alle emner</div>
        </div>
        ${allDueN > 0 ? `<div class="dc-due-badge">${allDueN} due</div>` : ''}
      </div>
      <div class="dc-prog-wrap">
        <div class="dc-prog-track"><div class="dc-prog-fill" style="width:${allPct}%;background:#60A5FA"></div></div>
        <span class="dc-prog-pct" style="color:rgba(255,255,255,.7)">${allLearned}/${allTotal} lært</span>
      </div>
      <div class="dc-stats">
        <div class="dc-stat"><div class="dc-stat-n">${allNewN}</div><div class="dc-stat-label">Nye kort</div></div>
        <div class="dc-stat"><div class="dc-stat-n">${allDueN}</div><div class="dc-stat-label">Til review</div></div>
        <div class="dc-stat"><div class="dc-stat-n">${allLearned}</div><div class="dc-stat-label">Lærte</div></div>
      </div>
    </div>`;

  DECK_ORDER.forEach(did => {
    const meta = DECK_META[did];
    const dc   = cards.filter(c => c.deckId === did);
    const dueN = dc.filter(c => isDue(c.sr)||isLearn(c.sr)).length;
    const newN = dc.filter(c => isNew(c.sr)).length;
    const learned = dc.filter(c => !isNew(c.sr)&&!isDue(c.sr)&&!isLearn(c.sr)).length;
    const pct  = dc.length ? Math.round(learned/dc.length*100) : 0;

    const card = document.createElement('div');
    card.className = 'deck-card';
    card.style.setProperty('--deck-color', meta.color);
    card.style.setProperty('--deck-color-lt', meta.colorLt);
    card.onclick = () => startStudy(did);
    card.innerHTML = `
      <div class="dc-top">
        <div class="dc-icon"><i data-lucide="${meta.icon}" width="20" height="20"></i></div>
        <div class="dc-top-right">
          <div class="dc-name">${meta.name}</div>
          <div class="dc-desc">${meta.desc}</div>
        </div>
        ${dueN > 0 ? `<div class="dc-due-badge">${dueN} due</div>` : ''}
      </div>
      <div class="dc-prog-wrap">
        <div class="dc-prog-track"><div class="dc-prog-fill" style="width:${pct}%"></div></div>
        <span class="dc-prog-pct">${learned}/${dc.length}</span>
      </div>
      <div class="dc-stats">
        <div class="dc-stat"><div class="dc-stat-n">${newN}</div><div class="dc-stat-label">Nye</div></div>
        <div class="dc-stat"><div class="dc-stat-n">${dueN}</div><div class="dc-stat-label">Due</div></div>
        <div class="dc-stat"><div class="dc-stat-n">${learned}</div><div class="dc-stat-label">Lærte</div></div>
      </div>`;
    grid.appendChild(card);
  });

  renderWeakCardsUI();
  lucide.createIcons();
}

/* ──────────────────────────────────────────────
   START STUDY SESSION
────────────────────────────────────────────── */
function startStudy(deckId) {
  activeDeck = deckId;
  sessDone = sessGood = 0;

  const pool = deckId ? cards.filter(c => c.deckId === deckId) : cards;
  const learn = pool.filter(c => isLearn(c.sr));
  const due   = pool.filter(c => isDue(c.sr) && !isLearn(c.sr));
  const newC  = pool.filter(c => isNew(c.sr));
  const done  = pool.filter(c => !isNew(c.sr)&&!isDue(c.sr)&&!isLearn(c.sr));
  deck = [...learn, ...due, ...newC, ...done];
  cur = 0; flipped = false;

  const meta = deckId ? DECK_META[deckId] : { name:'Alle emner', color:'#0057B8' };
  document.getElementById('sh-name').textContent = meta.name;

  // Apply deck color to study bar
  const bar = document.getElementById('study-bar');
  bar.style.borderBottom = `2px solid ${meta.color}`;
  document.getElementById('prog-fill').style.background = meta.color;

  showView('v-study');
  renderCard(true);
  updateProgress();
}

/* ──────────────────────────────────────────────
   CARD RENDERING
────────────────────────────────────────────── */
function renderCard(skip, dir) {
  if (!deck.length) { showEmpty(); return; }
  const c = deck[cur];

  // Reset flip
  document.getElementById('flashcard').classList.remove('flipped');
  flipped = false;
  document.getElementById('rate-row').style.display = 'none';
  document.getElementById('flip-row').style.display = '';

  // Animate
  const scene = document.getElementById('scene');
  scene.classList.remove('anim-r','anim-l');
  if (!skip) { void scene.offsetWidth; scene.classList.add(dir==='prev'?'anim-l':'anim-r'); }

  // SR tag
  const tag = document.getElementById('cf-tag');
  tag.className = 'cf-tag';
  if (isLearn(c.sr))      { tag.textContent='Study again'; tag.classList.add('learn'); }
  else if (isDue(c.sr))   { tag.textContent='Review'; tag.classList.add('review'); }
  else if (isNew(c.sr))   { tag.textContent='New'; tag.classList.add('new'); }
  else                    { tag.textContent=''; }

  document.getElementById('cf-num').textContent = String(cur+1).padStart(2,'0');

  const meta = DECK_META[c.deckId] || DECK_META.people;

  if (c.type === 'people') {
    renderPeopleFront(c, meta);
    renderPeopleBack(c, meta);
  } else if (c.type === 'company') {
    renderCompanyFront(c, meta);
    renderCompanyBack(c, meta);
  } else {
    renderKnowledgeFront(c, meta);
    renderKnowledgeBack(c, meta);
  }

  // Rating previews
  [0,2,4,5].forEach(r => {
    const el = document.getElementById(`rn-${r}`);
    if (el) el.textContent = previewLabel(c.sr, r);
  });

  updateProgress();
  lucide.createIcons();
}

function renderPeopleFront(c, meta) {
  // Show avatar wrap, hide question wrap
  document.getElementById('av-front-wrap').style.display = '';
  document.getElementById('q-wrap').style.display = 'none';

  // Card front stripe
  document.getElementById('cfront').style.setProperty('--deck-color', meta.color);

  // Avatar
  const avEl = document.getElementById('av-initials');
  const phEl = document.getElementById('av-photo');
  if (c.photo) { 
    phEl.src = c.photo;
    phEl.className = 'av-photo av-lg';
    phEl.style.display = '';
    phEl.style.objectFit = c.photoFit || 'cover';
    phEl.style.objectPosition = c.photoCrop || 'center 25%';
    avEl.style.display = 'none'; 
  }
  else { 
    applyAv(avEl, c.name); 
    avEl.style.display = ''; 
    phEl.style.display = 'none'; 
  }

  document.getElementById('cf-hint-label').textContent = 'Tap to reveal profile';
}

function renderPeopleBack(c, meta) {
  document.getElementById('cb-people').style.display = '';
  document.getElementById('cb-knowledge').style.display = 'none';
  document.getElementById('cback').style.setProperty('--deck-color', meta.color);

  const cbAv = document.getElementById('cb-initials');
  const cbPh = document.getElementById('cb-photo');
  if (c.photo) {
    cbPh.src = c.photo;
    cbPh.style.display = '';
    cbPh.style.objectFit = c.photoFit || 'cover';
    cbPh.style.objectPosition = c.photoCrop || 'center 25%';
    cbAv.style.display = 'none';
  } else {
    applyAv(cbAv, c.name);
    cbAv.style.display = '';
    cbPh.style.display = 'none';
  }

  document.getElementById('cb-name').textContent  = c.name;
  document.getElementById('cb-title').textContent = buildPersonTitleLine(c);

  const chip = document.getElementById('cb-level');
  chip.textContent = c.niveau;
  chip.className   = 'level-chip ' + (LEVEL_CLASS[c.niveau] || '');

  document.getElementById('cb-deck-tag').textContent = meta.name;
  document.getElementById('cb-overview').textContent = c.overview || '';

  const teamContext = document.getElementById('cb-team-context');
  if (c.teamContext) {
    teamContext.style.display = '';
    teamContext.textContent = c.teamContext;
  } else {
    teamContext.style.display = 'none';
    teamContext.textContent = '';
  }

  const sections = [
    buildPersonProfileSection('Experience', c.experience),
    buildPersonProfileSection('Key deals', c.deals),
    buildPersonProfileSection('Education', c.education),
    buildPersonProfileSection('Personlige interesser / særtræk', c.personalPoints),
  ].filter(Boolean).join('');
  document.getElementById('cb-profile-sections').innerHTML = sections;

  document.getElementById('cb-people-scroll').scrollTop = 0;
  lucide.createIcons();
}

function companyLogoMarkup(c, size = 72, cls = 'company-logo') {
  if (!c.domain) return '';
  return `<div class="${cls}"><img src="${logoUrl(c.domain, size)}" alt="${c.name} logo" loading="lazy" referrerpolicy="origin" onerror="this.parentElement.style.display='none'"></div>`;
}

function renderCompanyFront(c, meta) {
  document.getElementById('av-front-wrap').style.display = 'none';
  document.getElementById('q-wrap').style.display = '';
  document.getElementById('q-wrap').classList.add('q-wrap-company');
  document.getElementById('cfront').style.setProperty('--deck-color', meta.color);
  document.getElementById('q-icon').style.display = 'none';
  document.getElementById('q-text').style.display = 'none';

  const wrap = document.getElementById('company-front');
  const clues = c.frontClues || ['', '', ''];
  const qLabels = [
    'Hvad hedder selskabet?',
    'Hvordan handler det ift. peers?',
    'Hvad er den primære udfordring / driver?'
  ];
  wrap.style.display = '';
  wrap.innerHTML = `
    <div class="cf-clue-header">
      <div class="cf-clue-badge">
        <span>🔒</span>
        <span>CLUE BOX</span>
        <span class="cf-difficulty-chip">SVÆR</span>
      </div>
      <div class="cf-clue-sector">${c.sector} · ${c.industry}</div>
    </div>
    <div class="cf-questions">
      ${clues.slice(0,3).map((clue, i) => `
        <div class="cf-question-tile">
          <div class="cf-q-header">
            <span class="cf-q-num" style="background:${meta.color}">Q${i+1}</span>
            <span class="cf-q-label">${qLabels[i]}</span>
          </div>
          <div class="cf-q-clue">${clue}</div>
        </div>
      `).join('')}
    </div>
  `;
  document.getElementById('cf-hint-label').textContent = 'Tap for at afsløre svaret';
}

function renderKnowledgeFront(c, meta) {
  document.getElementById('av-front-wrap').style.display = 'none';
  document.getElementById('q-wrap').style.display = '';
  document.getElementById('q-wrap').classList.remove('q-wrap-company');
  document.getElementById('cfront').style.setProperty('--deck-color', meta.color);
  document.getElementById('company-front').style.display = 'none';
  document.getElementById('q-icon').style.display = '';
  document.getElementById('q-text').style.display = '';

  // Question icon styled with deck color
  const qi = document.getElementById('q-icon');
  qi.style.background = meta.colorLt;
  qi.style.color = meta.color;
  qi.innerHTML = `<i data-lucide="help-circle" width="24" height="24"></i>`;

  document.getElementById('q-text').textContent = c.q;
  document.getElementById('cf-hint-label').textContent = 'Tap to reveal answer';
}

function renderKnowledgeBack(c, meta) {
  document.getElementById('cb-people').style.display = 'none';
  document.getElementById('cb-knowledge').style.display = '';
  document.getElementById('cback').style.setProperty('--deck-color', meta.color);
  document.getElementById('company-back').style.display = 'none';
  document.getElementById('cb-answer').style.display = '';
  document.getElementById('cb-answer').innerHTML = c.a;
  document.getElementById('cb-deck-tag').textContent = meta.name;
  lucide.createIcons();
}

function renderCompanyBack(c, meta) {
  document.getElementById('cb-people').style.display = 'none';
  document.getElementById('cb-knowledge').style.display = '';
  document.getElementById('cback').style.setProperty('--deck-color', meta.color);
  document.getElementById('cb-answer').style.display = 'none';

  const body = document.getElementById('company-back');
  body.style.display = '';

  const md = COMPANY_MARKET_DATA[c.name] || {};
  const rankText = c.dkRankText || `DK-rang: #${c.dkRank}`;
  const mcap = c.avgMcap12mDkkBn ? fmtDkkBn(c.avgMcap12mDkkBn) : '–';
  const pc = md.peerComp || {};
  const peerStatusLabel = pc.status === 'praemie' ? 'Præmie' : pc.status === 'rabat' ? 'Rabat' : 'Par';
  const peerCls = pc.status === 'praemie' ? 'peer-praemie' : pc.status === 'rabat' ? 'peer-rabat' : 'peer-par';

  body.innerHTML = `
    <div class="cbv2">
      <div class="cbv2-head">
        <div>
          <div class="cbv2-name">${c.name}</div>
          <div class="cbv2-pills">
            <span class="company-pill">${c.ticker}</span>
            <span class="company-pill">${c.sector}</span>
          </div>
        </div>
        ${companyLogoMarkup(c, 80)}
      </div>

      <div class="cbv2-mcap">
        <div>
          <div class="cbv2-mcap-label">Market Cap (12M snit)</div>
          <div class="cbv2-mcap-val">${mcap}</div>
        </div>
        <div class="cbv2-rank-chip">${rankText.split('(')[0].trim()}</div>
      </div>

      <div class="cbv2-metrics">
        <div class="cbv2-metric">
          <div class="cbv2-metric-lbl">${md.primaryMetricLabel || 'Fwd P/E'}</div>
          <div class="cbv2-metric-val">${md.primaryMetricValue || '–'}</div>
        </div>
        <div class="cbv2-metric">
          <div class="cbv2-metric-lbl">${md.secondaryMetricLabel || 'EV/EBITDA'}</div>
          <div class="cbv2-metric-val">${md.secondaryMetricValue || '–'}</div>
        </div>
        <div class="cbv2-metric ${peerCls}">
          <div class="cbv2-metric-lbl">vs. ${pc.vs || 'Peers'} ${pc.multiple ? `(${peerStatusLabel})` : ''}</div>
          <div class="cbv2-metric-val">${pc.multiple || peerStatusLabel}</div>
        </div>
      </div>

      <div class="cbv2-body">
        <div class="cbv2-section cbv2-section--accent">
          <div class="cbv2-section-lbl">💼 Hvad Laver De Egentlig?</div>
          <p>${c.what}</p>
        </div>
        <div class="cbv2-section">
          <div class="cbv2-section-lbl">📊 Peer Valuation</div>
          <p>${c.peerValuation || c.whyTrades}</p>
        </div>
        <div class="cbv2-section">
          <div class="cbv2-section-lbl">🚀 Hvad Driver Casen Fremadrettet?</div>
          <p>${c.drivers}</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('cb-deck-tag').textContent = meta.name;
}


function showEmpty() {
  document.getElementById('cf-num').textContent = '–';
  document.getElementById('cf-hint-label').textContent = 'No cards in this deck';
}

/* ──────────────────────────────────────────────
   FLIP
────────────────────────────────────────────── */
function bindFlashcardInteraction() {
  const flashcard = document.getElementById('flashcard');
  if (!flashcard || flashcard.dataset.tapBound === 'true') return;

  flashcard.dataset.tapBound = 'true';
  flashcard.addEventListener('pointerdown', handleFlashcardPointerDown, { passive:true });
  flashcard.addEventListener('pointermove', handleFlashcardPointerMove, { passive:true });
  flashcard.addEventListener('pointerup', handleFlashcardPointerUp);
  flashcard.addEventListener('pointercancel', resetFlashcardPointerState);
  flashcard.addEventListener('pointerleave', handleFlashcardPointerLeave);
}

function handleFlashcardPointerDown(e) {
  const scrollable = e.target.closest('[data-scrollable="true"]');
  cardTapState = {
    id: e.pointerId,
    x: e.clientX,
    y: e.clientY,
    moved: false,
    scrollable,
    scrollTop: scrollable ? scrollable.scrollTop : 0,
  };
}

function handleFlashcardPointerMove(e) {
  if (!cardTapState || e.pointerId !== cardTapState.id) return;
  if (Math.abs(e.clientX - cardTapState.x) > 10 || Math.abs(e.clientY - cardTapState.y) > 10) {
    cardTapState.moved = true;
  }
}

function handleFlashcardPointerUp(e) {
  if (!cardTapState || e.pointerId !== cardTapState.id) return;

  const moved = cardTapState.moved ||
    Math.abs(e.clientX - cardTapState.x) > 10 ||
    Math.abs(e.clientY - cardTapState.y) > 10;
  const scrolled = !!cardTapState.scrollable &&
    Math.abs(cardTapState.scrollable.scrollTop - cardTapState.scrollTop) > 2;
  const interactiveTarget = e.target.closest('button, a, input, textarea, select, label');

  cardTapState = null;
  if (!interactiveTarget && !moved && !scrolled) flipCard();
}

function handleFlashcardPointerLeave(e) {
  if (!cardTapState || e.pointerId !== cardTapState.id) return;
  if (cardTapState.moved) resetFlashcardPointerState();
}

function resetFlashcardPointerState() {
  cardTapState = null;
}

function flipCard() {
  document.getElementById('flashcard').classList.toggle('flipped');
  flipped = !flipped;
  document.getElementById('rate-row').style.display = flipped ? '' : 'none';
  document.getElementById('flip-row').style.display = flipped ? 'none' : '';
}

/* ──────────────────────────────────────────────
   NAVIGATE
────────────────────────────────────────────── */
function nextCard() {
  if (!deck.length) return;
  if (cur < deck.length-1) { cur++; renderCard(false,'next'); renderDots(); }
  else showSessionComplete();
}
function prevCard() {
  if (cur > 0) { cur--; renderCard(false,'prev'); renderDots(); }
}

/* ──────────────────────────────────────────────
   RATING (SM-2)
────────────────────────────────────────────── */
function rateCard(rating) {
  if (!deck.length) return;
  const c = deck[cur];
  const newSR = applyRating(c.sr, rating);
  c.sr = newSR;
  const master = cards.find(x => x.id === c.id);
  if (master) master.sr = newSR;

  const data = load();
  data[c.id] = newSR;
  save(data);

  sessDone++;
  if (rating >= 3) sessGood++;

  if (newSR.learnAgain) {
    const removed = deck.splice(cur, 1)[0];
    deck.push(removed);
    if (cur >= deck.length) cur = Math.max(0, deck.length-1);
    renderCard(false,'next'); renderDots();
    toast('📌 Card moved to end of queue');
    return;
  }
  nextCard();
}

/* ──────────────────────────────────────────────
   PROGRESS
────────────────────────────────────────────── */
function updateProgress() {
  if (!deck.length) return;
  const pct = Math.round((cur/deck.length)*100);
  document.getElementById('prog-fill').style.width = pct+'%';
  document.getElementById('sh-progress').textContent = `${cur+1} / ${deck.length}`;

  const pool = activeDeck ? cards.filter(c=>c.deckId===activeDeck) : cards;
  document.getElementById('sh-due').textContent  = pool.filter(c=>isDue(c.sr)||isLearn(c.sr)).length + ' due';
  document.getElementById('sh-new').textContent  = pool.filter(c=>isNew(c.sr)).length + ' new';
  document.getElementById('sh-done').textContent = sessDone + ' done';
}

function renderDots() {
  const wrap = document.getElementById('dots');
  const total = Math.min(deck.length, 9);
  wrap.innerHTML = '';
  for (let i=0;i<total;i++) {
    const d = document.createElement('span');
    const active = (i === cur%total);
    d.style.cssText = `display:inline-block;width:${active?18:6}px;height:6px;border-radius:99px;background:${active?'#0057B8':'#D1D5DB'};transition:all .2s;`;
    wrap.appendChild(d);
  }
}

/* ──────────────────────────────────────────────
   SESSION COMPLETE MODAL
────────────────────────────────────────────── */
function showSessionComplete() {
  const pct = sessDone ? Math.round((sessGood/sessDone)*100) : 0;
  const pool = activeDeck ? cards.filter(c=>c.deckId===activeDeck) : cards;
  const dueN = pool.filter(c=>isDue(c.sr)||isLearn(c.sr)).length;

  document.getElementById('modal-sub').textContent =
    `${sessDone} kort reviewed · ${pct}% huskede du`;
  document.getElementById('modal-stats').innerHTML = `
    <div class="ms"><div class="ms-n" style="color:var(--green)">${sessGood}</div><div class="ms-l">Husket</div></div>
    <div class="ms"><div class="ms-n" style="color:var(--red)">${sessDone-sessGood}</div><div class="ms-l">Glemt</div></div>
    <div class="ms"><div class="ms-n">${dueN}</div><div class="ms-l">Due i morgen</div></div>
    <div class="ms"><div class="ms-n">${pool.filter(c=>isNew(c.sr)).length}</div><div class="ms-l">Usete</div></div>`;
  document.getElementById('overlay').style.display='flex';
  lucide.createIcons();
}
function closeModal()    { document.getElementById('overlay').style.display='none'; }
function restartStudy()  { closeModal(); startStudy(activeDeck); }

/* ──────────────────────────────────────────────
   BROWSE VIEW
────────────────────────────────────────────── */
function renderBrowse() {
  const q = (document.getElementById('srch')?.value||'').toLowerCase();
  const main = document.getElementById('browse-main');
  main.innerHTML = '';

  DECK_ORDER.forEach(did => {
    const meta = DECK_META[did];
    const dc = cards.filter(c => c.deckId===did && (
      !q ||
      (c.type==='people' && personMatchesQuery(c, q)) ||
      (c.type==='company' && (
        c.name.toLowerCase().includes(q) ||
        c.ticker.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.focus.toLowerCase().includes(q)
      )) ||
      (c.type==='knowledge' && c.q.toLowerCase().includes(q))
    ));
    if (!dc.length) return;

    const sec = document.createElement('div');
    sec.className = 'browse-section';

    if (did === 'people') {
      dc.sort(sortPeopleCards);
      sec.innerHTML = `<div class="browse-section-title">${meta.name}</div><div class="browse-grid" id="bg-${did}"></div>`;
      main.appendChild(sec);
      const grid = sec.querySelector(`#bg-${did}`);
      dc.forEach(c=>{
        const due = isDue(c.sr)||isLearn(c.sr);
        const [c1,c2]=palette(c.name);
        const pc = document.createElement('div');
        pc.className='pc';
        const seniority = c.analystYear ? personSeniorityLabel(c) : '';
        pc.innerHTML=`
          <div class="av-initials av-sm" style="background:linear-gradient(135deg,${c1},${c2})">${initials(c.name)}</div>
          ${due?'<div class="pc-due-dot"></div>':''}
          <div class="pc-name">${c.name}</div>
          <div class="level-chip ${LEVEL_CLASS[c.niveau]||''}" style="font-size:11px;padding:3px 10px">${c.niveau}</div>
          ${seniority ? `<div class="level-chip ${LEVEL_CLASS[c.niveau]||''}" style="font-size:11px;padding:3px 10px">${seniority}</div>` : ''}
          <div class="pc-firm">${c.tenureLabel || c.firma}</div>
          <div class="pc-sr">${isNew(c.sr)?'New':isDue(c.sr)?'Due':c.sr.nextDue?`Next: ${c.sr.nextDue}`:''}</div>`;
        pc.onclick=()=>{ goHome(); startStudy(did); const idx=deck.findIndex(x=>x.id===c.id); if(idx>=0){cur=idx;renderCard(true);renderDots();} };
        grid.appendChild(pc);
      });
    } else {
      sec.innerHTML=`<div class="browse-section-title">${meta.name}</div><div class="browse-kc-grid" id="bg-${did}"></div>`;
      main.appendChild(sec);
      const grid=sec.querySelector(`#bg-${did}`);
      dc.forEach(c=>{
        const kc=document.createElement('div');
        if (c.type === 'company') {
          kc.className='kc pc-company';
          kc.innerHTML=`
            <div class="pc-company-head">
              <div class="pc-company-meta">
                <div class="pc-name">${c.name}</div>
                <div class="pc-firm">${c.ticker} · ${c.industry}</div>
              </div>
              ${companyLogoMarkup(c, 56, 'pc-logo')}
            </div>
            <div class="pc-company-tags">
              <span class="pc-tag">${c.sector}</span>
              <span class="pc-tag">${c.valuation}</span>
            </div>
            <div class="kc-sr">${isNew(c.sr)?'New':isDue(c.sr)?'⏰ Due':c.sr.nextDue?`Next review: ${c.sr.nextDue}`:''}</div>`;
        } else {
          kc.className='kc';
          kc.innerHTML=`
            <div class="kc-icon" style="background:${meta.colorLt};color:${meta.color}"><i data-lucide="${meta.icon}" width="16" height="16"></i></div>
            <div>
              <div class="kc-q">${c.q}</div>
              <div class="kc-sr">${isNew(c.sr)?'New':isDue(c.sr)?'⏰ Due':c.sr.nextDue?`Next review: ${c.sr.nextDue}`:''}</div>
            </div>`;
        }
        kc.onclick=()=>{ goHome(); startStudy(did); const idx=deck.findIndex(x=>x.id===c.id); if(idx>=0){cur=idx;renderCard(true);renderDots();} };
        grid.appendChild(kc);
      });
    }
  });

  lucide.createIcons();
}

/* ──────────────────────────────────────────────
   VIEW NAVIGATION
────────────────────────────────────────────── */
function showView(id) {
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id==='v-browse') renderBrowse();
  if (id==='v-dashboard') renderDashboard();
  if (id==='v-flows' && typeof renderFlows === 'function') renderFlows();
  if (id==='v-market-map' && typeof renderMarketMap === 'function') renderMarketMap();
}
function goHome() { renderHome(); showView('v-home'); }

/* ──────────────────────────────────────────────
   DASHBOARD
────────────────────────────────────────────── */
function renderDashboard() {
  const main = document.getElementById('dashboard-main');
  if (!main) return;
  const data = load();

  const total    = ALL_CARDS.length;
  const studied  = ALL_CARDS.filter(c => data[c.id] && data[c.id].reps > 0).length;
  const mastered = ALL_CARDS.filter(c => { const sr = data[c.id]; return sr && sr.reps >= 2 && sr.lastRating >= 4; }).length;
  const due      = ALL_CARDS.filter(c => { const sr = getSR(data, c.id); return isDue(sr) || isLearn(sr); }).length;

  const deckRows = DECK_ORDER.map(did => {
    const meta = DECK_META[did];
    const dc   = ALL_CARDS.filter(c => c.deckId === did);
    const studiedDc  = dc.filter(c => data[c.id] && data[c.id].reps > 0).length;
    const masteredDc = dc.filter(c => { const sr = data[c.id]; return sr && sr.reps >= 2 && sr.lastRating >= 4; }).length;
    const pct = dc.length ? Math.round(masteredDc / dc.length * 100) : 0;
    return { meta, dc, studiedDc, masteredDc, pct };
  });

  const weakCards = ALL_CARDS
    .map(c => ({ c, sr: getSR(data, c.id) }))
    .filter(({ sr }) => sr.reps > 0 && (sr.ef < 2.2 || sr.lastRating <= 2))
    .sort((a, b) => a.sr.ef - b.sr.ef)
    .slice(0, 8);

  const pct = total ? Math.round(studied / total * 100) : 0;

  main.innerHTML = `
    <div class="dash-hero">
      <div class="dash-hero-title">Dit Fremskridt</div>
      <div class="dash-hero-sub">${studied} af ${total} kort studeret · ${pct}% af alt materiale</div>
    </div>

    <div class="dash-stats-row">
      <div class="dash-stat-card">
        <div class="dash-stat-n">${studied}</div>
        <div class="dash-stat-l">Studerede</div>
      </div>
      <div class="dash-stat-card highlight">
        <div class="dash-stat-n">${mastered}</div>
        <div class="dash-stat-l">Mestrede</div>
      </div>
      <div class="dash-stat-card warn">
        <div class="dash-stat-n">${due}</div>
        <div class="dash-stat-l">Til review</div>
      </div>
    </div>

    <div class="dash-section">
      <div class="dash-section-title">📚 Fremskridt pr. Deck</div>
      ${deckRows.map(({ meta, dc, studiedDc, masteredDc, pct }) => `
        <div class="dash-deck-row">
          <div class="dash-deck-meta">
            <div class="dash-deck-icon" style="background:${meta.colorLt};color:${meta.color}">
              <i data-lucide="${meta.icon}" width="14" height="14"></i>
            </div>
            <div>
              <div class="dash-deck-name">${meta.nameShort}</div>
              <div class="dash-deck-sub">${masteredDc}/${dc.length} mestret</div>
            </div>
          </div>
          <div class="dash-deck-prog">
            <div class="dash-deck-track">
              <div class="dash-deck-fill" style="width:${pct}%;background:${meta.color}"></div>
            </div>
            <span class="dash-deck-pct">${pct}%</span>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="dash-section">
      <div class="dash-section-title">⚡ Dine Svagheder</div>
      ${weakCards.length ? `
        <div class="dash-weak-grid">
          ${weakCards.map(({ c, sr }) => {
            const label = c.type === 'people' ? c.name
              : c.type === 'company' ? c.name
              : (c.q || '').substring(0, 28) + '…';
            const typeLabel = c.type === 'people' ? 'Person' : c.type === 'company' ? 'Selskab' : 'Viden';
            const deckMeta = DECK_META[c.deckId] || {};
            return `
              <div class="dash-weak-tile" onclick="startStudy('${c.deckId}')">
                <div class="dash-weak-type" style="color:${deckMeta.color||'#BE123C'}">${typeLabel}</div>
                <div class="dash-weak-name">${label}</div>
                <div class="dash-weak-ef">EF ${sr.ef.toFixed(1)}</div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `<div class="dash-empty">🎉 Ingen svagheder endnu – bliv ved med at træne!</div>`}
    </div>

    <div class="dash-section dash-cta-row">
      <button class="btn-primary" onclick="studyWeak()">
        <i data-lucide="zap" width="14" height="14"></i> Træn Svage Kort
      </button>
      <button class="btn-outline" onclick="startStudy(null)">
        Træn Alt <i data-lucide="arrow-right" width="14" height="14"></i>
      </button>
    </div>
  `;
  lucide.createIcons();
}

/* ──────────────────────────────────────────────
   RESET
────────────────────────────────────────────── */
function resetAll() {
  if (!confirm('Reset all learning progress? This cannot be undone.')) return;
  localStorage.removeItem(STORE_KEY);
  sessDone=sessGood=0;
  init();
  toast('Progress reset');
}

/* ──────────────────────────────────────────────
   TOAST
────────────────────────────────────────────── */
let toastT;
function toast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toastT);
  toastT=setTimeout(()=>t.classList.remove('show'),2200);
}

/* ──────────────────────────────────────────────
   KEYBOARD SHORTCUTS
────────────────────────────────────────────── */
document.addEventListener('keydown', e=>{
  if (!document.getElementById('v-study').classList.contains('active')) return;
  if (e.target.tagName==='INPUT') return;
  switch(e.key) {
    case ' ':         e.preventDefault(); flipCard(); break;
    case 'ArrowRight': e.preventDefault(); flipped ? rateCard(4) : nextCard(); break;
    case 'ArrowLeft':  e.preventDefault(); prevCard(); break;
    case '1': rateCard(0); break;
    case '2': rateCard(2); break;
    case '3': rateCard(4); break;
    case '4': rateCard(5); break;
  }
});

/* ── START ── */
init();

/* ──────────────────────────────────────────────
   WEAK CARDS LOGIC (STRENGTHS & WEAKNESSES)
────────────────────────────────────────────── */

function getWeakCards() {
  const allCards = ALL_CARDS;
  return allCards
    .map(c => ({ card: c, id: getCardId(c), score: getCardScore(getCardId(c)) }))
    .filter(item => item.score < 4.0) // Alt under "Good" (4) er svagt
    .sort((a,b) => a.score - b.score)
    .slice(0, 8);
}

function renderWeakCardsUI() {
  const weakRow = document.getElementById('weak-cards-row');
  const weakList = document.getElementById('weak-cards-list');
  if (!weakRow || !weakList) return;
  
  const weakData = getWeakCards();
  
  if (weakData.length > 0) {
    weakRow.style.display = 'block';
    weakList.innerHTML = '';
    weakData.forEach(item => {
      const c = item.card;
      const el = document.createElement('div');
      el.className = 'weak-card-mini';
      
      let visual = '';
      if (c.type === 'person' || c.type === 'people') {
        const initialsStr = c.name.split(' ').map(n=>n[0]).join('').substring(0,2);
        visual = c.photo 
          ? `<img src="${c.photo}" class="weak-mini-av">`
          : `<div class="weak-initials">${initialsStr}</div>`;
      } else if (c.type === 'company' || c.deckId === 'c25') {
        visual = `<img src="${logoUrl(c.domain)}" class="weak-mini-av" onerror="this.src='https://via.placeholder.com/48?text=${c.name[0]}'">`;
      } else {
        visual = `<div class="weak-initials" style="background:var(--purple)"><i data-lucide="help-circle" width="18"></i></div>`;
      }
      
      el.innerHTML = `
        ${visual}
        <div class="weak-mini-name">${c.name || (c.q ? c.q.substring(0,30) : '')}</div>
        <div class="weak-mini-score">Score: ${item.score.toFixed(1)}</div>
      `;
      el.onclick = () => startStudyManual([c], "Fokustræning");
      weakList.appendChild(el);
    });
    if (window.lucide) window.lucide.createIcons();
  } else {
    weakRow.style.display = 'none';
  }
}

function studyWeak() {
  const weak = getWeakCards().map(item => item.card);
  if (weak.length === 0) {
    toast("Ingen svage kort endnu! Træn nogle flere for at generere data.");
    return;
  }
  startStudyManual(weak, "Dine Svage Kort");
}

function startStudyManual(cardsToStudy, title) {
  sessionCards = [...cardsToStudy];
  currentIndex = 0;
  currentDeckTitle = title;
  showView('v-study');
  updateProgress();
  renderCard();
}
