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
};
const DECK_ORDER = ['people','multiples','c25','db','stakeholders'];

// --- Global State & Firebase ---
let user = null;
let cardData = {}; 
let sessionCards = [];
let currentIndex = 0;
let isFlipped = false;
let currentDeckTitle = "";
let stats = { new:0, due:0, done:0 };
let currentSessionWeak = false;

// Helper: Get unique ID for a card
function getCardId(card) {
  if (card.type === 'person') return `p-${card.name}`;
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
const MARKET_DATA_AS_OF = '2026-03-30';
function logoUrl(domain, size = 96) {
  if (!domain) return '';
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_PUBLISHABLE_KEY}&size=${size}&format=png&retina=true`;
}
function fmtDkkBn(v) {
  return new Intl.NumberFormat('da-DK', { minimumFractionDigits:1, maximumFractionDigits:1 }).format(v) + ' mia. DKK';
}
const COMPANY_MARKET_DATA = {
  'Novo Nordisk': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'11,0x', secondaryMetricLabel:'7D avg EV/EBITDA', secondaryMetricValue:'7,5x', metricWhy:'Markedet kigger primært på earnings-power og quality growth.' },
  'DSV': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'17,3x', secondaryMetricLabel:'7D avg EV/Sales', secondaryMetricValue:'1,8x', metricWhy:'For DSV er execution og cash conversion vigtigere end en simpel asset-base-metrik.' },
  'A.P. Møller - Mærsk': { primaryMetricLabel:'7D avg Trailing P/E', primaryMetricValue:'14,6x', secondaryMetricLabel:'7D avg P/B', secondaryMetricValue:'0,69x', metricWhy:'For stærkt cykliske rederier er bogført værdi og mid-cycle earnings ofte mere relevante end forward P/E alene.' },
  'Vestas': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'15,6x', secondaryMetricLabel:'7D avg EV/Sales', secondaryMetricValue:'8,7x', metricWhy:'Hardware-marginer er volatile, så sales- og forward earnings-lens bruges ofte sammen.' },
  'Coloplast': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'15,8x', secondaryMetricLabel:'7D avg EV/EBITDA', secondaryMetricValue:'14,0x', metricWhy:'Coloplast vurderes som et defensivt quality medtech-navn med stærke marginer.' },
  'Pandora': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'11,0x', secondaryMetricLabel:'7D avg EV/EBITDA', secondaryMetricValue:'5,3x', metricWhy:'Retail-casen balancerer earnings-power, brandstyrke og cash returns.' },
  'Ørsted': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'16,3x', secondaryMetricLabel:'7D avg EV/EBITDA', secondaryMetricValue:'9,8x', metricWhy:'Ørsted handles på kombinationen af project economics, kapitalintensitet og utility-lignende cash flow.' },
  'Carlsberg': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'11,2x', secondaryMetricLabel:'7D avg EV/EBITDA', secondaryMetricValue:'9,7x', metricWhy:'Bryggerier vurderes ofte på en kombination af earnings, cash flow og stabil brandfranchise.' },
  'Novonesis': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'21,0x', secondaryMetricLabel:'7D avg P/B', secondaryMetricValue:'2,1x', metricWhy:'Fusionen og accounting-støj gør forward earnings mere brugbar end rå EV/EBITDA i øjeblikket.' },
  'Tryg': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'14,9x', secondaryMetricLabel:'7D avg P/B', secondaryMetricValue:'2,41x', metricWhy:'Forsikring bør læses gennem underwriting-kvalitet, P/B og earnings snarere end EV/EBITDA.' },
  'Genmab': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'15,2x', secondaryMetricLabel:'7D avg P/B', secondaryMetricValue:'2,71x', metricWhy:'Royalty- og pipelinecases bliver ofte værdisat via earnings plus balance-sheet quality.' },
  'Demant': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'12,5x', secondaryMetricLabel:'7D avg EV/EBITDA', secondaryMetricValue:'12,5x', metricWhy:'Demant er et klassisk medtech-navn hvor både earnings og operating margin kvalitet betyder meget.' },
  'ISS': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'10,8x', secondaryMetricLabel:'7D avg EV/EBITDA', secondaryMetricValue:'11,7x', metricWhy:'ISS skal læses via margin recovery, cash conversion og kontraktkvalitet.' },
  'Ambu': { primaryMetricLabel:'7D avg Forward P/E', primaryMetricValue:'20,6x', secondaryMetricLabel:'7D avg EV/Sales', secondaryMetricValue:'3,0x', metricWhy:'For growth-medtech er adoption og topline-kvalitet stadig en stor del af valuation-lensen.' },
};

const COMPANY_CARDS = [
  {
    name:'Novo Nordisk', ticker:'NOVO-B', domain:'novonordisk.com',
    sector:'Pharma', industry:'GLP-1 / diabetes & obesity',
    frontClues:[
      'Sælger de indsprøjtninger til diabetes og vægttab, som hele verden efterspørger?',
      'Kæmper de en indædt kamp mod rivalen Eli Lilly om dominans på fedmemarkedet?',
      'Er deres overskudsgrad og evne til at skabe kontanter nærmest uset høj i Danmark?'
    ],
    what:'De opfinder, producerer og sælger medicin – især mod diabetes og svær overvægt (kendt som bl.a. Wegovy og Ozempic). Det er kerneforretningen skåret helt ind til benet.',
    valuation:'Typisk premium P/E 25-35x i stærke perioder.',
    avgMcap12mDkkBn:2800.0, dkRankText:'Danmarks ubestridt største selskab målt på market cap (Nummer 1).',
    whyTrades:'Markedet betaler for høj vækst, stærk profitabilitet og usædvanlig cash conversion. Multiplen komprimeres hurtigt, hvis væksten skuffer.',
    peerValuation: 'Eli Lilly handler f.eks. til over 40x P/E sammenlignet med Novo Nordisks ~30-35x P/E. Forskellen kan ofte skyldes at Eli Lilly har en lidt bredere pipeline og hjemmebanefordel i USA, men begge handles med massiv premium til markedet.',
    drivers:'FDA-labels, produktion, reimbursement, pipeline og US-penetration.',
    challenge:'At fastholde udbud og høje forventninger, og undgå at priskrigen med Eli Lilly spiser overskuddet.',
    peers:['Eli Lilly','AstraZeneca','Roche'],
    whyKnow:'Som analyst skal du kende Novo som Danmarks vigtigste børsnavn, et indeksanker og referencecase for pharma premium-multipler.'
  },
  {
    name:'DSV', ticker:'DSV', domain:'dsv.com',
    sector:'Transport & Logistics', industry:'Freight forwarding',
    frontClues:[
      'Er det et dansk logistik-selskab, der ikke selv ejer særlig mange lastbiler eller skibe?',
      'Er de kendt i hele verden for at opkøbe konkurrenter (som f.eks. Schenker) og lynhurtigt trimme dem?',
      'Fokuserer investorerne især på deres evne til at holde omkostningerne nede i et usikkert fragtmarked?'
    ],
    what:'De ejer ikke selv skibe eller fly. Deres forretning er at fungere som mellemmand (speditør), der køber plads hos store rederier og flyselskaber og sælger det videre med en merpris til kunder, der skal have fragtet varer.',
    dkRankText:'Danmarks 2. største selskab målt på market cap.',
    valuation:'Typisk 12-16x EV/EBITDA.',
    avgMcap12mDkkBn:354.5,
    whyTrades:'DSV får premium for høj ROIC, stærk cash conversion og en fuldstændig dominerende M&A-model (opkøbsstrategi).',
    peerValuation: 'DSV handler typisk til ca. 18-20x P/E sammenlignet med Kuehne+Nagel på ca. 18-20x P/E. Deres stærke "execution-premium" giver dem ofte en af branchens absolut højeste multipler, modsat ex Schenker, der tidligere trak branchens snit ned.',
    drivers:'Fragtvolumener, gross profit per shipment, integrationssynergier og global handel.',
    challenge:'At levere Schenker-integration uden margin-slip eller kundetab i et fortsat volatilt fragtmarked.',
    peers:['Kuehne+Nagel','DHL','Expeditors'],
    whyKnow:'DSV er den danske skolebogscase på, hvordan markedet belønner execution, synergy delivery og asset-light compounding.'
  },
  {
    name:'A.P. Møller - Mærsk', ticker:'MAERSK-B', domain:'maersk.com',
    sector:'Shipping', industry:'Container shipping & logistics',
    frontClues:[
      'Er det en gigant, der fragter varer over verdenshavene i store containere?',
      'Svinger deres indtjening voldsomt i takt med de globale fragtrater, kriser i Det Røde Hav og udbuddet af nye skibe?',
      'Tjente de uanede milliarder under Corona-krisen, men opererer nu i en langt lavere indtjeningsfase?'
    ],
    what:'De ejer hundredevis af store containerskibe og fragter simpelthen varer på tværs af oceanerne. Derudover er de ved at vokse massivt inden for transport på land.',
    dkRankText:'Typisk Danmarks 3. største selskab (bytter nogle gange plads med DSV).',
    valuation:'Typisk 3-6x EV/EBITDA gennem cyklen.',
    avgMcap12mDkkBn:195.7,
    whyTrades:'Lav multiple afspejler høj cyklikalitet, dyr capex (skibe) og altid stor asymmetrisk usikkerhed om "mid-cycle earnings".',
    peerValuation:'Mærsk handler ofte til en meget lav forward P/E (historisk under 10x) og P/B på 0,5-0,7x sammenlignet med Hapag-Lloyd til lignende deprimerede niveauer. Det ekstreme cash loop og tunge stål kræver at investorer betaler en ekstremt "cyklisk rabat".',
    drivers:'SCFI-rater, global vækst, kapacitetsudbud, bunkerpriser og logistics margins.',
    challenge:'At bevise at deres "integrated logistics" kan stabilisere indtjeningen, når verdens shipping-cyklus ender i nedgangsperioder.',
    peers:['Hapag-Lloyd','CMA CGM','MSC'],
    whyKnow:'Mærsk er central for at forstå cykliske multipler, geopolitisk risk premium og peak- vs mid-cycle profit.'
  },
  {
    name:'Vestas', ticker:'VWS', domain:'vestas.com',
    sector:'Renewables', industry:'Wind turbines & service',
    frontClues:[
      'Er det et af Danmarks største industriselskaber inden for den grønne omstilling?',
      'Lever de af at bygge vindmøller og herefter tegne enormt profitable service-aftaler for at vedligeholde dem?',
      'Er deres aktiekurs ekstremt følsom over for stålpriser og om de reelt tjener penge på fremtidige ordrer?'
    ],
    what:'De designer, producerer og rejser vindmøller rundt i hele verden. Og så har de en ekstremt vigtig serviceafdeling, som tjener styrtende med penge på løbende at vedligeholde møllerne resten af deres levetid.',
    dkRankText:'Ligger oftest solidt parkeret som et Top 10 selskab.',
    valuation:'Typisk 12-18x normaliseret EV/EBITDA.',
    avgMcap12mDkkBn:131.6,
    whyTrades:'Markedet ser både stor strukturel grøn medvind men også gigantisk execution-risk, bl.a pga høje råvareomkostninger.',
    peerValuation: 'Vestas handler ofte til forward P/E i 30’erne (eller ingen mening hvis indtjening crasher pga dårlige kontrakter), hvor konkurrenter som Siemens Energy Gamesa har lidt under endnu større milliardtab. Vestas belønnes for deres højdekaliber serviceforretning der agerer sikkerhedsnet.',
    drivers:'Ordreindgang, turbinepriser, input costs, service mix og project execution.',
    challenge:'At undgå at tabe penge permanent på selve fremstillingen af nye møller for i stedet at vokse rentabelt.',
    peers:['Siemens Energy Gamesa','GE Vernova','Nordex'],
    whyKnow:'Vestas demonstrerer forskellen mellem strukturel tema-hype (grøn energi) og den sværere brutale sandhed i industrial profitability.'
  },
  {
    name:'Coloplast', ticker:'COLO-B', domain:'coloplast.com',
    sector:'MedTech', industry:'Chronic care / ostomy & continence',
    frontClues:[
      'Sælger de diskrete plastik- og silikoneprodukter til f.eks. stomi- eller kateter-brugere?',
      'Har de ekstremt loyale "abonnements"-kunder, fordi patienterne er tvunget til at stole på og bruge udstyret hver eneste dag?',
      'Er aktien internt kendt som bundsolid ("kedelig" men tryg), uanset om det globalt går godt eller skidt med økonomien?'
    ],
    what:'De producerer medicinske hjælpemidler (som fx stomiposer og katetre) i plastik og silikone. Produkter, som mennesker med varige eller kroniske lidelser har brug for i deres dagligdag.',
    dkRankText:'Stabilt placeret inden i midten af top 10 (omkring plads 6-9).',
    valuation:'Typisk 18-24x EV/EBITDA og 25-35x P/E.',
    avgMcap12mDkkBn:132.3,
    whyTrades:'Høj multiple skyldes defensivitet, recurring demand, enorm pricing power og stærke velsmurte global marginer.',
    peerValuation:'Coloplast handler typisk oppe på 30-35x P/E, mens klassiske peers som Convatec oftest kun trækker 15-20x P/E. Coloplast vinder soleklart på deres overlegne best-in-class drift (EBIT-marginer nær 30%) i modsætning til Convatecs lavere niveau.',
    drivers:'Organisk vækst, reimbursement, innovationstakt, salgsmix og M&A integration.',
    challenge:'At forsvare deres enorme markup-priser mod regulatorer i UK og EU, mens USA skal levere vækst.',
    peers:['Convatec','Smith+Nephew','Essity Health'],
    whyKnow:'Coloplast er en referencecase for defensive healthcare-multipler og recurring-revenue-lignende economics.'
  },
  {
    name:'Pandora', ticker:'PNDORA', domain:'pandoragroup.com',
    sector:'Consumer', industry:'Jewellery',
    frontClues:[
      'Er det verdens største smykkeselskab målt på antal solgte styk?',
      'Blev de stiftet og storhedskendt på deres små "charms", som folket samler på?',
      'Får de oftest en lavere værdiansættelse da nogle investorer (forkert eller rigtigt) er bange for, at populariteten "bare er en mode-dille"?'
    ],
    what:'De designer, får fremstillet masser af små smykker og driver enorme detail-koncepter, hvor de primært sælger armbånd og ringe som mange almindelige piger og kvinder har råd til.',
    dkRankText:'Ligger klassisk omkring plads 15-20 i Danmark.',
    valuation:'Typisk 10-13x EV/EBITDA.',
    avgMcap12mDkkBn:62.6,
    whyTrades:'Stærk turnaround-execution og gigantiske udbud af aktietilbagekøb støtter kursen, men markedet giver fashion-rabat.',
    peerValuation: 'Pandora prissættes typisk relativt lavt omkring 12-14x P/E, imens high-end luksus som Richemont handles på markant højere ~20x+ P/E. De lavere multipler bunder i frygten for at massesmykker udgår af mode relativt let.',
    drivers:'Like-for-like sales, gross margin, butikseffektivitet, marketing ROI og sølvpriser.',
    challenge:'At bevise de rent faktisk kan opretholde vækst gennem stærkt brand (fx lab-grown diamanter) trods at hele USA snavet.',
    peers:['Signet','Richemont','Tapestry'],
    whyKnow:'Pandora er vigtig consumer-brand case. Lære om retail, marketing ROI og FCF.'
  },
  {
    name:'Ørsted', ticker:'ORSTED', domain:'orsted.com',
    sector:'Utilities', industry:'Offshore wind development',
    frontClues:[
      'Hed de tidligere DONG Energy, før de dræbte olien og blev verdens frontløber for havvind?',
      'Lever de af at bygge og drive gigantiske havvindmølleparker over hele kloden?',
      'Faldt aktien vanvittig voldsomt da renterne begyndte at stige drastisk og smadrede afkastet fra deres fremtidige byggeprojekter?'
    ],
    what:'De designer, opfører og driver ekstremt store vindmølleparker nede i vandet (offshore). De får strømmen sat i land, og sælger den mod faste kontrakter.',
    dkRankText:'Stabilt top 10 selskab, var historisk næsten Danmarks største, men styrtdykkede tilbage under inflation.',
    valuation:'Typisk 8-12x EV/EBITDA.',
    avgMcap12mDkkBn:252.4,
    whyTrades:'Mellem "vækst venture" og "bundstabil utility".',
    peerValuation: 'Ørsted handler i et utilty legetøj på ca 10-12x EV/EBITDA. Nærmeste europæiske peer RWE handler typisk noget lavere, fx omkring 6-8x. Forskellen skyldes at RWE bærer på legacy kul/fossile aktiver, mens Ørsted får en ren "green premium".',
    drivers:'Renter, capex per MW, power prices, og regulatoriske udbuds-rammer.',
    challenge:'At beskytte afkast-indtjeningen mens konkurrenter priser aggressive hav-bud op – og genopbygge investor-tilliden.',
    peers:['RWE Renewables','Iberdrola','EDP Renovaveis'],
    whyKnow:'Lær at prissætte infra-equity under rentesving.'
  },
  {
    name:'Carlsberg', ticker:'CARL-B', domain:'carlsberggroup.com',
    sector:'Consumer Staples', industry:'Brewing',
    frontClues:[
      'Er det et stort hæderkronet, fondsejet dansk bryggeri der sælger primært mod Asien og Europa?',
      'Prøver de i årevis at vriste danskerne væk fra billige "grønne bajere" over til meget dyrere specialøl uden procenter?',
      'Var deres seneste forfærdelige krise, at de var enormt eksponeret i Rusland der blev overtaget?'
    ],
    what:'De koger vand, humle og gær, brygger en global mængde øl under forskellige brands og forsøger især at skabe en premiumisering, hvor de tjener mere på dyre øl.',
    dkRankText:'Klassikeren vipper op og ned oftest omkring en rank nummer 6-8 i Danmark.',
    valuation:'Typisk 10-13x EV/EBITDA.',
    avgMcap12mDkkBn:115.0,
    whyTrades:'Stabil cash flow i masserne, men de får normalt lavere multipler fordi væksten på "almindelig øl" altid er tærsko-flad.',
    peerValuation: 'Carlsberg handler lidt historisk set lavere (omkring 13-14x P/E) end fx global mastodont Heineken (~16-18x P/E). Heineken belønnes med højere premium pga total brand-fokus globalt og uafhængighed af de fejlslagne øst-geopolitiske kampe.',
    drivers:'Volume/mix opgraderinger (fx til Craft eller Alkoholfri øl) vejret og råvarepriserne i Asien.',
    challenge:'At få Britvic handlen slugt mens prisen på kinesiske supermarkeder stagnerer.',
    peers:['Heineken','AB InBev','Molson Coors'],
    whyKnow:'Helt central FMCG-model der understreger betydningen at sælge premium volume mod flat "normal" volume.'
  },
  {
    name:'Novonesis', ticker:'NSIS-B', domain:'novonesis.com',
    sector:'Biosolutions', industry:'Enzymes & cultures',
    frontClues:[
      'Gætter du selskabet bag en gigantisk historisk C25 fusion mellem Novozymes og Chr. Hansen?',
      'Finder du deres usynlige biologiske materialer i bl.a. ost, yoghurt og koldtvands-vaskemiddel verden over?',
      'Er investerings-spørgsmålet om de 2 firmaer rent faktisk er de 1+1=3 de prædikede før fusionen?'
    ],
    what:'De producerer biologi på fabrik. Vigtigst producerer de enzymer og mælkesyrebakterier (biosolutions), som gør holdbarheden bedst i mejerimad og tillader vaskepulver at virke i helt koldt vand.',
    dkRankText:'Stærk kandidat midt i toplisten – som oftest omkring plads nummer 6 herhjemme.',
    valuation:'Typisk 17-22x EV/EBITDA.',
    avgMcap12mDkkBn:191.6,
    whyTrades:'Premium pga monopol-agtige indtrængningsbarrierer, stor markedsandel og meget svær biotek (IP).',
    peerValuation: 'Novonesis handles dyrt og premium (ca. 25x P/E), meget lig sin primære gigantkonkurrent DSM-Firmenich. Premiummet eksisterer simpelthen fordi deres nicher er oligopolistisk lukket i store dele af verden og afhængigheden enorm på B2B.',
    drivers:'Merger integration, cross-selling, innovation pipeline.',
    challenge:'At omsætte 2 af Danmarks tungeste kultur-firmaer til reel accelereret vækst uden blot at tælle "omkostnings-synergier" sammen.',
    peers:['DSM-Firmenich','IFF','Kerry'],
    whyKnow:'Skoleeksempel på M&A Mega-mergers samt hvordan biotek-kemi gøres til recurring profits.'
  },
  {
    name:'Tryg', ticker:'TRYG', domain:'tryg.com',
    sector:'Insurance', industry:'P&C insurance',
    frontClues:[
      'Er dette et selskab som primært lever af at sælge tryghed (bil, indbo, ansvarsforsikring)?',
      'Elsker udbytte-investorerne dette selskab, fordi deres kernekunde altid er utrolig sløv til at skifte væk?',
      'Hænger deres årsregnskab i høj grad sammen med, om efteråret/vinteren i de nordiske lande byder på voldsomt regnvejr og blæst?'
    ],
    what:'De udbyder lovpligtige ansvarsforsikringer og frie forsikringer. De tjener milliarder på, at deres kunders faste månedlige betalinger overstiger, hvad de selv må smække ud, når stormen Bodil har ramt.',
    dkRankText:'Konsekvent tryg midterligger, omkring placering 10-12.',
    valuation:'Typisk P/E 13-16x; P/B.',
    avgMcap12mDkkBn:96.0,
    whyTrades:'Fremstår som nordens mest udbyttestabile cash-maskine over P/B multiple.',
    peerValuation: 'Tryg handler P/E ~15-16x, som generelt er en lille premie sammenlignet mod konkurrenter som Sampo eller Storebrand (ofte i low/mid-teens). Dette belønnes særligt af "RSA / Codan"-synergierne i norden og exceptionel fastholdelsesevne af kunder.',
    drivers:'Combined ratio (nøgletal over overskud margin der skal være lille), forsikrings inflation og regn i norden.',
    challenge:'At holde forsikringspriserne foran inflationen på en stjålen cykel, uden at kunden smutter.',
    peers:['Sampo','Gjensidige','Topdanmark'],
    whyKnow:'Fordi forsikrings-valuation fuldstændigt ignorerer EBIDTA, det gælder combined ratio.'
  },
  {
    name:'Genmab', ticker:'GMAB', domain:'genmab.com',
    sector:'Biotech', industry:'Oncology antibodies',
    frontClues:[
      'Er denne bio-aktie overvejende hængt fuldstændig op på ét vidunderkræftmiddel (Darzalex)?',
      'Sælger de stort set ingen æsker medicin selv, men tager derimod gigantiske royalties fra gigantpartnere?',
      'Skriger aktionærerne og gyserne efter at finde ud af, hvordan de tjener penge efter "patentet" på det her lægemiddel udløber?'
    ],
    what:'De opfinder bioteknologi - udelukkende kure (antistoffer) mod forfærdelige former for især kræft. Derefter lægger de opskriften i hænderne på større farmavirksomheder, som sælger det derimod at sende mange procent retur (royalty).',
    dkRankText:'Største danske Biotech navngivning (læg Novo i Pharma branchen). Oftest nede i andelen af top 10.',
    valuation:'Typisk 15-20x EV/EBITDA, men ekstremt volatil.',
    avgMcap12mDkkBn:104.5,
    whyTrades:'Cash generering pga royalty er enorm, dog frygter markedet rygter for det tørlægges i løbet af pipeline-kløften.',
    peerValuation: 'Genmab handler ned mod de lavere p/e multipler 15-18x modsat ren pharma, ligesom partnerne (fx Johnson&Johnson der handler under 15x). De indkasserer en høj margin premie for platformen men rammes hårdt af "concentration risk".',
    drivers:'Overlevelse i årene, ny pipe-line, patent-domstole og R&D udgifter mod loftet.',
    challenge:'At fange guldgåsen en gang til og bevise platformen fungerer - Før J&J æder midlerne.',
    peers:['argenx','BioNTech','Beigene'],
    whyKnow:'Genmab repræsenterer den totale difference fra Novo i pharmainvesteringer. Det her er 100% R&D og Binær risiko.'
  },
  {
    name:'Demant', ticker:'DEMANT', domain:'demant.com',
    sector:'MedTech', industry:'Hearing care',
    frontClues:[
      'Opererer de i et marked som et fåmandsvælde (oligopol) omkring at give ældre mennesker hørelsen tilbage?',
      'Ejer de som noget helt specielt selve "detailforretningerne" deres høreapparater sælges ned igennem?',
      'Straffes de hårdt på markedet, da de i en længere tid traskede fuldstændigt ubeslutsomt rundt oven på et cyber-angreb forrige år?'
    ],
    what:'Sælger og udvikler primært dyrt og superteknologisk høreudstyr til høretab oftest til ældre segmenter verden over - samt driver selve test butikkerne som fx AudioNova.',
    dkRankText:'Placeret midt-ude i enden (omkring top 15).',
    valuation:'Typisk 14-18x EV/EBITDA.',
    avgMcap12mDkkBn:48.9,
    whyTrades:'Høreapparat er defensiv luksus-vækst. Multiplikatoren dikteres af den teknologiske overlegenhed per nye cyklus (Lancering 1 gang p.a.)',
    peerValuation: 'Demant handler til p/e 18-20x, hvilket er en rabat i tillid i forhold til den historiske gigant-konkurrent schweiziske Sonova som handler på premium 20-25x grundet at Sonovas retail eksekvering i vesten var en drøm at regne på.',
    drivers:'Demografi bølgen i ældre, de nye lanceringsmåneder, produktcykler.',
    challenge:'Aldrig at ramme uheld på den spæde teknik lancering og genvinde tabte markedsandele.',
    peers:['Sonova','WS Audiology','Amplifon'],
    whyKnow:'Du lærer Oligopol investering. Konkurrenten er ikke 50 andre som i transport. Her er kampen blodig mod snært 4 brødre på en flage.'
  },
  {
    name:'ISS', ticker:'ISS', domain:'issworld.com',
    sector:'Business Services', industry:'Facility management',
    frontClues:[
      'Leverer de mad overskud, gulvvask og hundrede tusind andre kontorfacilitets-jobs?',
      'Har de historisk verdens absolut laveste profit-margin på det de omsætter for?',
      'Sidder investorer med sved på panden omkring hvorvidt deres nyere turnaround endelig lykkedes i at skabe "Free Cash Flow"?'
    ],
    what:'Er reelt verdens største lejer af servicepersonel. Rengøringsassistenter og kokke i store bygningers kontorer for bla. de andre selskaber du analyserer overalt på kloden.',
    dkRankText:'Typisk svag markedsplads omkring den 20 plads mod fald og fremgang.',
    valuation:'Typisk 8-11x EV/EBITDA.',
    avgMcap12mDkkBn:31.8,
    whyTrades:'Rabat over alt andet, der er minimal kvalitet udover "Free cash flow konvertering".',
    peerValuation: "ISS handler historisk p/e-billigere (10-12x) end branchens absolutte markedsleder Compass Group som oftest praler af margin-sikre cateringaftaler. ISS' komplekse, globale lavere indtjening per person dikterer discount.",
    drivers:'Contract churn (beholder de aftalen uoverskueligt stort nok) og global inflation (løndrevet).',
    challenge:'At trække 1 procent margin ned igennem regnskabet fordi hele lortet udbetales som minimalt dækkede lønninger globalt.',
    peers:['Compass Group','Sodexo','Mitie'],
    whyKnow:'Service i bundklassen. Komplekst Turnaround med FCF-model analyse og "Asset Light Margin Compression".'
  },
  {
    name:'Ambu', ticker:'AMBU-B', domain:'ambu.com',
    sector:'MedTech', industry:'Single-use endoscopy',
    frontClues:[
      'Bringer dette selskab plastik indoskoper (kikkerter) til sygehuse der netop er beregnet til at smide i skralderen bagefter?',
      'Skiftede de narrativ fuldstændig efter "Covid vaskeklap" til at skulle vise de rent faktisk tjener penge?',
      'Lænede deres vanvittige pris som selskab sig udelukkende op af en "Klinisk Disruption - Fremtiden skal ikke mere desinficeres" ?'
    ],
    what:'De designer plastik engangskikkerter. Tidligere har overlæger brugt flergangs udstyr til bl.a. at føre ned i patienter, der tog for evigt at desinficere med kemi og øget risiko, Ambu rev løsningen med plastic i skralderen.',
    dkRankText:'I den laveste C25 trøst - bund top 28.',
    valuation:'Typisk høj growth-multiple; 40-50x+ P/E.',
    avgMcap12mDkkBn:25.1,
    whyTrades:'Man spekulerede udelukkende at teknologien slog alt af branchens metaludstyr fuldstændigt ihjel.',
    peerValuation: 'Ambu handles prissat mod månen (~P/E >40x/EPS eller mere). I kontrast drives konventionelle titaner som Olympus som langsomt kørende stabile aktiekøb. P/E skilsmisse er 1:1 "The Future Vs The Dinosaur".',
    drivers:'Lægers vilje (adoption) mod grønt miljø contra infektion / Præcision og plastik pris / Bruttomargin udtræk.',
    challenge:'Det er dyrt af helvedes til at udvikle billig plastik kirurgi kikkert.',
    peers:['Olympus','Boston Scientific','Teleflex'],
    whyKnow:'Klassisk aktiehistorie på dansk bund. Fortælling om Disruption vs Cost Execution vs Management Overloof i healthcare.'
  }
];

/* ──────────────────────────────────────────────
   PEOPLE DATA
   type:'people' — front=avatar, back=name+grade
────────────────────────────────────────────── */
const PEOPLE = [
  // Leadership
  { name:'Atilla Olesen',           niveau:'Leadership',        titel:'Head of Investment Banking',            firma:'Danske Bank IB',
    note:'Tidl: SEB (9½ år – Head of Equities, Prime Brokerage Sales London, Head of Solutions) | EVP Global Head of Asset Management, Danske Bank (2020-21)',
    photo:'Pictures/Atilla Olesen (implementeret).jpeg' },
  { name:'Christian Lindholm',      niveau:'Leadership',        titel:'Co-Head Corporate Finance DK',          firma:'Danske Bank IB',
    note:'Director i Danske Bank siden 1998 (28 år!)',
    photo:'Pictures/Christian Lindholm (implementeret).jpg', photoCrop:'center 30%' },
  { name:'Thomas Knaack',           niveau:'Leadership',        titel:'Co-Head Corporate Finance DK',          firma:'Danske Bank IB',
    note:'Tidl: SEB Enskilda Director (11½ år, M&A/ECM) | Co-owner & CEO emmerys (turnaround, 3½ år) | Udd: MBA London Business School | Cand.jur. KU',
    photo:'Pictures/Thomas Knaack (implementeret).jpeg' },
  // Managing Directors
  { name:'Henrik Ljungstrom',       niveau:'Managing Director', titel:'Managing Director (London)',             firma:'Danske Bank IB',
    note:'London-baseret, Loan Syndications. Tidl: ING VP (3 år), Mizuho AD, Lloyds Banking Group (3½ år, Syndicated Loans & Corp Banking)',
    photo:'Pictures/Henrik Ljungstrom (implementeret).jpeg' },
  { name:'Bjarke Skovgaard',        niveau:'Managing Director', titel:'Managing Director',                     firma:'Danske Bank IB',
    note:'Tidl: SEB Director CF (3½ år, M&A/ECM/Family Office) | DONG Energy Senior M&A Specialist (2 år, Group M&A)',
    photo:'Pictures/Bjarke Skovgaard (implementeret).jpeg' },
  { name:'Christian Blinkenberg',   niveau:'Managing Director', titel:'Co-Head Corporate Finance DK (London)',  firma:'Danske Bank IB',
    note:'Tidl: Goldman Sachs International (6 år, Executive Director) | Kromann Reumert advokat (5 år, M&A) | Udd: MBA, Cand.jur.',
    photo:'Pictures/Christian Blinkenberg (implementeret).jpeg', photoCrop:'center 35%' },
  { name:'Jesper Buchardt',         niveau:'Managing Director', titel:'Managing Director',                     firma:'Danske Bank IB',
    note:'MD siden apr 2024. Tidl: Director Corporate Finance (8 år, sept 2016 - juni 2024)',
    photo:'Pictures/Jesper Buchardt (implementeret).jpeg', photoCrop:'center 35%' },
  { name:'Ulrik Rasmussen',         niveau:'Managing Director', titel:'Managing Director',                     firma:'Danske Bank IB',
    note:'Tidl: SEB Managing Director (15 år!, feb 2001 - maj 2016) | Udd: MSc Accounting & Finance, CBS (1995-2000)',
    photo:'Pictures/Ulrik Rasmussen.jpeg' },
  // Directors
  { name:'Mikko Hirvonen',          niveau:'Director',          titel:'Director',                              firma:'Danske Bank IB',
    note:'',
    photo:'Pictures/Mikko Hirvonen (implementeret).jpeg' },
  { name:'Filip R. Monefeldt',      niveau:'Director',          titel:'Director',                              firma:'Danske Bank IB',
    note:'Tidl: Carnegie IB (6½ år) | Handelsbanken Equity Research | Nykredit Credit Research | Udd: MSc Finance & Accounting CBS | Ekceptionelt dygtig iflg. Futtrup',
    photo:'Pictures/Filip R. Monefeldt (implementeret).jpeg' },
  { name:'Janus Nygaard',           niveau:'Director',          titel:'Director',                              firma:'Danske Bank IB',
    note:'Tidl: Carnegie Senior Associate (4½ år) | Falck BD Director (Group M&A & Strategy) | Udd: MSc Finance, Aarhus Uni',
    photo:'Pictures/Janus Nygaard (implementeret).jpeg' },
  { name:'Christian D. Helvind',    niveau:'Director',          titel:'Director',                              firma:'Danske Bank IB',
    note:'Tidl: ATRIUM Partners (10 år! - fra Analyst til Director) | Ramboll MC | Eksportrådet Atlanta | Udd: MSc Economics, KU',
    photo:'Pictures/Christian D. Helvind (implementeret).jpeg', photoCrop:'center center' },
  // Associate Directors
  { name:'Casper Jul Rask Jensen',  niveau:'Associate Director',titel:'Associate Director',                    firma:'Danske Bank IB',
    note:'10+ år i Danske Bank CF (student analyst til AD). Tidl: Hess Corporation | Udd: MSc Finance & Accounting CBS | Exchange ESADE & Regent\'s London',
    photo:'Pictures/Casper Jul Rask Jensen (implementeret).jpeg' },
  { name:'Troels L. Johansen',      niveau:'Associate Director',titel:'Associate Director',                    firma:'Danske Bank IB',
    note:'' },
  { name:'Peter Christian Jensen',  niveau:'Associate Director',titel:'Associate Director',                    firma:'Danske Bank IB',
    note:'Tidl: FIH Partners IB Analyst (1½ år, M&A) | Nykredit (Capital & Risk) | Udd: MSc Applied Economics & Finance CBS | Exchange Singapore Mgmt Uni',
    photo:'Pictures/Peter Christian Jensen (implementeret).jpeg' },
  { name:'Frederik Uggerhøj',       niveau:'Associate Director',titel:'Associate Director',                    firma:'Danske Bank IB',
    note:'6+ år Danske Bank CF (junior analyst til AD). Tidl: Capitalmind M&A (student) | Connected Cars BD | Familiefirma Uggerhøj Biler | Udd: MSc Finance & Strategic Mgmt CBS | Privat pilotcertifikat',
    photo:'Pictures/Frederik Uggerhøj (implementeret).jpeg' },
  { name:'Anders Højlund',          niveau:'Associate Director',titel:'Associate Director',                    firma:'Danske Bank IB',
    note:'Tidl: Clearwater International CF (2 år, Analyst til Associate) | Jyske Bank (Market Risk) | Ramboll MC | TA Aarhus Uni (Statistik) | Udd: MSc Finance, Aarhus Uni',
    photo:'Pictures/Anders Højlund (implementeret).jpeg' },
  { name:'Jonas Mulvad Vendelbo',   niveau:'Associate Director',titel:'Associate Director',                    firma:'Danske Bank IB',
    note:'Tidl: HCN Partners (2 år, AD M&A) | Handelsbanken IB M&A (2 år) | Julius Baer Luxembourg (summer) | Ekstern CBS-rådgiver (M&A/Valuation) | Udd: MSc Finance CBS | Harvard',
    photo:'Pictures/Jonas Mulvad Vendelbo (implementeret).jpeg' },
  // Associates
  { name:'Valdemar Stengaard',      niveau:'Associate',         titel:'Associate',                             firma:'Danske Bank IB',
    note:'',
    photo:'Pictures/Valdemar Stengaard (implementeret).jpeg' },
  { name:'Magnus Johansen',         niveau:'Associate',         titel:'Associate',                             firma:'Danske Bank IB',
    note:'Gruppe 1 med Casper Jul. Tidl: Handelsbanken CF (Part-time Analyst) | Grant Thornton FAS | Udd: MSc Finance & Accounting CBS | Exchange Boston Uni',
    photo:'Pictures/Magnus Johansen (implementeret).jpeg' },
  { name:'Martin Andersen',         niveau:'Associate',         titel:'Associate',                             firma:'Danske Bank IB',
    note:'',
    photo:'Pictures/Martin Andersen (implementeret).jpeg' },
  // Analysts
  { name:'Christian Dahl',          niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB',
    note:'',
    photo:'Pictures/Christian Dahl (implementeret).jpeg' },
  { name:'Mikkel R. Christensen',   niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB',
    note:'Tidl: Novo Holdings PE (2 år!, Investment Analyst) | Thylander PE Real Estate (1½ år) | Gottlieb+Partners | CBS Instructor (Statistik) | Udd: MSc Finance & Accounting CBS | Exchange Melbourne',
    photo:'Pictures/Mikkel R. Christensen (implementeret).jpeg' },
  { name:'Bavendra Rajendra',       niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB',
    note:'Tidl: Credit Suisse IB London (Summer Analyst, Healthcare & Consumer - tilbudt fuldtid UBS) | CataCap PE | Tofte & Co IB (1½ år) | Udd: MSc Finance & Strategic Mgmt CBS | Exchange MIT Sloan + Harvard',
    photo:'Pictures/Bavendra Rajendra (implementeret).jpeg' },
  { name:'Mathilde Saigal',         niveau:'Analyst',           titel:'Analyst, Leveraged Finance',            firma:'Danske Bank IB',
    note:'Leveraged Finance (ikke CF). Tidl: Nordea Markets C&I (3 år - RM Large Corporates, Analyst) | Nordea Operations (3½ år) | Udd: MSc Finance & Strategic Mgmt CBS',
    photo:'Pictures/Mathilde Saigal (implementeret).jpeg' },
  { name:'Anders C. Jakobsen',      niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB',
    note:'Tidl: Nykredit Derivatives (Student) | Jyske Bank CIB (Student) | Udd: MSc Finance & Investments CBS | LSE Summer School | BSc Aarhus Uni | Exchange UNSW Sydney',
    photo:'Pictures/Anders C. Jakobsen (implementeret).jpeg' },
  { name:'Laura P. Pedersen',       niveau:'Analyst',           titel:'Analyst (1. år)',                       firma:'Danske Bank IB',
    note:'',
    photo:'Pictures/Laura P. Pedersen (implementeret).jpeg' },
  { name:'Marcus Christensen',      niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB',
    note:'Tidl: AIP Management Junior Analyst (1½ år) | Carnegie (Equity Research & Sales) | Nordea AM (Student, Group Risk) | Udd: MSc Finance & Accounting CBS',
    photo:'Pictures/Marcus Christensen (implementeret).jpeg' },
  { name:'Lukas Hvidkjær',          niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB',
    note:'Tidl: DSV M&A team (2½ år - inkl. EUR 14,3 mia. Schenker-deal!) | Udd: MSc Finance & Accounting CBS',
    photo:'Pictures/Lukas Hvidkjær (implementeret).jpeg' },
  { name:'Frederik Emil Haven',     niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB',
    note:'Tidl: Waterland PE (Student Analyst, 2½ år) | Accunia Credit Mgmt (1½ år) | Udd: MSc Finance & Accounting CBS | Exchange Boston Uni',
    photo:'Pictures/Frederik Emil Haven (implementeret).jpeg' },
  { name:'Julius B. Sørensen',      niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB',
    note:'Tidl: FIH Partners IB Analyst (2 år, M&A) | Slättö RE PE (Intern) | Grant Thornton TAS | Deloitte Audit (1½ år) | Udd: MSc Finance & Accounting CBS',
    photo:'Pictures/Julius B. Sørensen (implementeret).jpeg' },
];

/* ──────────────────────────────────────────────
   FIREBASE & SYNC LOGIC
────────────────────────────────────────────── */

async function login() {
  try {
    if (!window.auth || !window.provider) {
      alert("Firebase is not initialized yet. Please wait a moment.");
      return;
    }
    const result = await window.signInWithPopup(window.auth, window.provider);
    console.log("Logged in:", result.user);
    toast("Velkommen, " + result.user.displayName.split(' ')[0]);
  } catch (err) {
    console.error("Login detail error:", err);
    alert("Login fejl: " + err.message);
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
  const docRef = window.doc(window.db, "users", user.uid);
  const docSnap = await window.getDoc(docRef);
  if (docSnap.exists()) {
    cardData = docSnap.data().cards || {};
  } else {
    // New user
    await window.setDoc(docRef, { cards: {} });
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
  
  const docRef = window.doc(window.db, "users", user.uid);
  await window.updateDoc(docRef, {
    [`cards.${cardId}`]: cardData[cardId]
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
    a:`<strong>15–30× EV/EBITDA</strong> (eller EV/Revenue: 5–15×).<br><br><strong>Drivers:</strong><ul><li>Høj ARR og bruttomarginal (70%+)</li><li>"Rule of 40" (Vækst% + Margin% ≥ 40)</li><li>Høj NRR (Net Retention)</li></ul>` },

  { deckId:'multiples', q:'EV/EBITDA: Industrielle selskaber',
    a:`<strong>7–12× EV/EBITDA</strong> (P/E: 14–18×).<br><br><strong>Drivers:</strong><ul><li>Cyklus-afhængighed</li><li>Kapitalintensitet (Capex)</li><li>Niche-produkter trækker op</li></ul>` },

  { deckId:'multiples', q:'Multipler for Banker & Finans',
    a:`<strong>P/B: 0.8–1.5×</strong> | <strong>P/E: 10–14×</strong>.<br><em>Bemærk: EV bruges IKKE.</em><br><br><strong>Drivers:</strong><ul><li>RoE vs. Cost of Equity</li><li>Renteniveau (NII)</li></ul>` },

  { deckId:'multiples', q:'EV/EBITDA: Consumer Staples',
    a:`<strong>12–18× EV/EBITDA</strong> (P/E: 18–25×).<br><br><strong>Drivers:</strong><ul><li>Defensive cash flows (lav volatilitet)</li><li>Stærke brands</li></ul>` },

  { deckId:'multiples', q:'EV/EBITDA: Pharma & Healthcare',
    a:`<strong>15–25× EV/EBITDA</strong> (P/E: 25–40×).<br><br><strong>Drivers:</strong><ul><li>Patentbeskyttelse og høj indtjening</li><li>Biotech prissættes ofte via rNPV/DCF pga. rød bundlinje</li></ul>` },

  { deckId:'multiples', q:'EV/EBITDA: Olie & Gas',
    a:`<strong>4–7× EV/EBITDAX</strong> (X = ex. exploration).<br><br><strong>Drivers:</strong><ul><li>Ekstremt cyklisk baseret på råvarepris</li><li>Reservernes levetid</li></ul>` },

  { deckId:'multiples', q:'Kontrolpræmie i M&A',
    a:`<strong>20–40% præmie</strong> over seneste aktiekurs.<br><br><strong>Drivers:</strong><ul><li>Synergier (corporate)</li><li>Strategisk urgency og auktions-pres</li></ul>` },

  { deckId:'multiples', q:'Hvornår bruges EV/Revenue?',
    a:`Primært for <strong>urentable vækstselskaber</strong> (Tech, SaaS, Biotech).<br><br>Giver sammenligningsgrundlag uden EBITDA. Suppleres tit af Rule of 40.` },

  { deckId:'multiples', q:'Hvad justeres EBITDA for i M&A?',
    a:`EBITDA justeres typisk til <strong>Normalized EBITDA</strong>:<br><br><ul><li>Engangsomkostninger (One-offs)</li><li>SBC (Share-based compensation)</li><li>IFRS 16 / leasing</li><li>Earn-outs</li></ul>` },

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

];

/* ──────────────────────────────────────────────
   BUILD MASTER CARD ARRAY
────────────────────────────────────────────── */
const ALL_CARDS = [
  ...PEOPLE.map((p, i) => ({
    id: `p${i}`, type: 'people', deckId: 'people', ...p,
  })),
  ...KNOWLEDGE.filter(k => k.deckId !== 'c25').map((k, i) => ({
    id: `k${i}`, type: 'knowledge', ...k,
  })),
  ...COMPANY_CARDS.map((c, i) => ({
    id: `c${i}`, type: 'company', deckId: 'c25', ...c, ...(COMPANY_MARKET_DATA[c.name] || {}),
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

/* ──────────────────────────────────────────────
   INIT
────────────────────────────────────────────── */
function init() {
  const data = load();
  cards = ALL_CARDS.map(c => ({ ...c, sr: getSR(data, c.id) }));
  renderHome();
  showView('v-home');
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
    phEl.style.objectPosition = c.photoCrop ? c.photoCrop : 'center 25%';
    avEl.style.display = 'none'; 
  }
  else { 
    applyAv(avEl, c.name); 
    avEl.style.display = ''; 
    phEl.style.display = 'none'; 
  }

  document.getElementById('cf-hint-label').textContent = 'Tap to reveal name & grade';
}

function renderPeopleBack(c, meta) {
  document.getElementById('cb-people').style.display = '';
  document.getElementById('cb-knowledge').style.display = 'none';
  document.getElementById('cback').style.setProperty('--deck-color', meta.color);

  // Back avatar (small)
  const cbAv = document.getElementById('cb-initials');
  const cbPh = document.getElementById('cb-photo');
  if (c.photo) { 
    cbPh.src = c.photo; 
    cbPh.style.display = ''; 
    cbPh.style.objectPosition = c.photoCrop ? c.photoCrop : 'top center';
    cbAv.style.display = 'none'; 
  }
  else { 
    applyAv(cbAv, c.name); 
    cbAv.style.display = ''; 
    cbPh.style.display = 'none'; 
  }

  document.getElementById('cb-name').textContent  = c.name;
  document.getElementById('cb-title').textContent = c.titel||'';
  if (c.note) {
    document.getElementById('cb-note').innerHTML  = c.note.split(' | ').join('<br><br>');
  } else {
    document.getElementById('cb-note').innerHTML  = '';
  }

  const chip = document.getElementById('cb-level');
  chip.textContent = c.niveau;
  chip.className   = 'level-chip ' + (LEVEL_CLASS[c.niveau]||'');

  document.getElementById('cb-deck-tag').textContent = meta.name;
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
  const clues = c.frontClues || [];
  wrap.style.display = '';
  wrap.innerHTML = `
    <div class="company-front-head">
      <div>
        <div class="company-eyebrow">Flashcard</div>
        <div class="company-clue-title">Hvad er det for et selskab?</div>
        <div class="company-clue-sub">Svar uden hjælp fra logo eller navn.</div>
      </div>
    </div>
    <div class="company-grid">
      ${clues.map((clue, i) => `
        <div class="company-block full">
          <div class="company-label">Spørgsmål ${i + 1}</div>
          <div class="company-value">${clue}</div>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('cf-hint-label').textContent = 'Tap to reveal company answer';
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
  
  // Optional mapping in case some properties are missing
  const peerText = c.peerValuation || '';
  const rankText = c.dkRankText || `Aktuel DK-rang: #${c.dkRank} i top 50`;

  body.innerHTML = `
    <div class="company-back">
      <div class="company-back-head">
        <div>
          <div class="company-name">${c.name}</div>
          <div class="company-ticker">
            <span class="company-pill">${c.ticker}</span>
            <span class="company-pill">${c.sector}</span>
            <span class="company-pill">${c.industry}</span>
          </div>
        </div>
        ${companyLogoMarkup(c, 84)}
      </div>
      <div class="company-back-body">
        <div class="company-summary">
          <div class="company-summary-card accent">
            <div class="company-label">Hvad Laver De Egentlig?</div>
            <p>${c.what}</p>
          </div>
          <div class="company-summary-card">
            <div class="company-label">Størrelse & Placering</div>
            <p><strong>${rankText}</strong></p>
          </div>
          
          <div class="company-summary-card accent company-metrics">
            <div class="company-label">Konkrete Markedsmultipler & Comparable</div>
            <p style="font-size:14px; margin-bottom:12px; line-height: 1.4">${peerText}</p>
            <div class="company-metric-grid" style="display:none;"></div> <!-- hidden market data if unused -->
          </div>
          
          <div class="company-summary-card">
            <div class="company-label">Hvorfor Handler De Som De Gør?</div>
            <p>${c.whyTrades}</p>
          </div>
          <div class="company-summary-card">
            <div class="company-label">Hvad Driver Casen Nu?</div>
            <p>${c.drivers}</p>
          </div>
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
      (c.type==='people' && (c.name.toLowerCase().includes(q)||c.niveau.toLowerCase().includes(q))) ||
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
      dc.sort((a,b)=>LEVEL_ORDER.indexOf(a.niveau)-LEVEL_ORDER.indexOf(b.niveau));
      sec.innerHTML = `<div class="browse-section-title">${meta.name}</div><div class="browse-grid" id="bg-${did}"></div>`;
      main.appendChild(sec);
      const grid = sec.querySelector(`#bg-${did}`);
      dc.forEach(c=>{
        const due = isDue(c.sr)||isLearn(c.sr);
        const [c1,c2]=palette(c.name);
        const pc = document.createElement('div');
        pc.className='pc';
        pc.innerHTML=`
          <div class="av-initials av-sm" style="background:linear-gradient(135deg,${c1},${c2})">${initials(c.name)}</div>
          ${due?'<div class="pc-due-dot"></div>':''}
          <div class="pc-name">${c.name}</div>
          <div class="level-chip ${LEVEL_CLASS[c.niveau]||''}" style="font-size:11px;padding:3px 10px">${c.niveau}</div>
          <div class="pc-firm">${c.firma}</div>
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
}
function goHome() { renderHome(); showView('v-home'); }

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
  const allCards = [...PEOPLE.map(p => ({...p, type:'person'})), ...KNOWLEDGE.map(k => ({...k, type:'knowledge'})), ...COMPANY_CARDS.map(c => ({...c, type:'company', deckId:'c25'}))];
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
      if (c.type === 'person') {
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
