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
      'Dansk pharma-megacap med global dominans inden for diabetes og fedmebehandling.',
      'Et af markedets vigtigste quality compounders med usædvanlig pricing power og cash conversion.',
      'Investorer fokuserer især på supply, Eli Lilly-konkurrence og hvor længe obesity-væksten kan holde.'
    ],
    clue:'Verdensledende dansk pharma-navn med ekstrem pricing power og global vækst inden for diabetes- og fedmebehandling.',
    focus:'Supply, konkurrence mod Eli Lilly og hvor længe fedmebølgen kan bære toplinjen.',
    drivers:'FDA-labels, produktion, reimbursement, pipeline og US-penetration.',
    what:'Udvikler og sælger især diabetes- og fedmebehandlinger. Et af de vigtigste nordiske quality compounders.',
    valuation:'Typisk premium P/E 25-35x i stærke perioder.',
    avgMcap12mDkkBn:1622.2, dkRank:1,
    whyTrades:'Markedet betaler for høj vækst, stærk profitabilitet og usædvanlig cash conversion. Multiplen komprimeres hurtigt, hvis væksten skuffer eller konkurrencen tiltager.',
    challenge:'At fastholde supply discipline og vækst i obesity uden at valuations bliver for langt foran fundamentals.',
    peers:['Eli Lilly','AstraZeneca','Roche'],
    whyKnow:'Som analyst skal du kende Novo som Danmarks vigtigste børsnavn, et indeksanker og referencecase for pharma premium-multipler.'
  },
  {
    name:'DSV', ticker:'DSV', domain:'dsv.com',
    sector:'Transport & Logistics', industry:'Freight forwarding',
    frontClues:[
      'Dansk asset-light logistiknavn med global forwarding-forretning.',
      'Kendt for disciplineret execution og stor værdi fra opkøb og integrationer.',
      'Casen afhænger lige nu af Schenker-synergier, global fragtcyklus og margin-disciplin.'
    ],
    clue:'Asset-light logistikmaskine kendt for disciplineret execution og value-accretive M&A.',
    focus:'Integration af Schenker, cost synergies og om volumen kan løfte earnings gennem cyklisk usikkerhed.',
    drivers:'Fragtvolumener, gross profit per shipment, integrationssynergier og global handel.',
    what:'Forbinder kunder med luft-, sø- og vejtransport uden selv at eje de tunge aktiver i samme grad som klassiske transportører.',
    valuation:'Typisk 12-16x EV/EBITDA.',
    avgMcap12mDkkBn:354.5, dkRank:2,
    whyTrades:'DSV får premium for høj ROIC, stærk cash conversion og en troværdig M&A-model. Multiplen afhænger af tillid til integration og cycle timing.',
    challenge:'At levere Schenker-integration uden margin-slip eller kundetab i et fortsat volatilt fragtmarked.',
    peers:['Kuehne+Nagel','DHL','Expeditors'],
    whyKnow:'DSV er den danske skolebogscase på, hvordan markedet belønner execution, synergy delivery og asset-light compounding.'
  },
  {
    name:'A.P. Møller - Mærsk', ticker:'MAERSK-B', domain:'maersk.com',
    sector:'Shipping', industry:'Container shipping & logistics',
    frontClues:[
      'Dansk shipping- og logistikgigant med stærk eksponering mod global handel.',
      'Earnings svinger voldsomt med containerrater, geopolitik og kapacitetsudbud.',
      'En klassisk mid-cycle-vs-peak-earnings case snarere end et stabilt compounder-navn.'
    ],
    clue:'Global shipping-gigant hvor earnings svinger voldsomt med fragtrater og geopolitik.',
    focus:'Red Sea-disruption, normalisering af containerrater og om logistikforretningen kan gøre casen mindre cyklisk.',
    drivers:'SCFI-rater, global vækst, kapacitetsudbud, bunkerpriser og logistics margins.',
    what:'En af verdens største containerrederier med stigende fokus på end-to-end logistics.',
    valuation:'Typisk 3-6x EV/EBITDA gennem cyklen.',
    avgMcap12mDkkBn:195.7, dkRank:4,
    whyTrades:'Lav multiple afspejler høj cyklikalitet, tung capex og stor usikkerhed om mid-cycle earnings.',
    challenge:'At bevise at integrated logistics kan stabilisere indtjeningen, når shipping-cyklussen vender ned.',
    peers:['Hapag-Lloyd','CMA CGM','MSC'],
    whyKnow:'Mærsk er central for at forstå cykliske multipler, geopolitisk risk premium og forskellen mellem peak og mid-cycle earnings.'
  },
  {
    name:'Vestas', ticker:'VWS', domain:'vestas.com',
    sector:'Renewables', industry:'Wind turbines & service',
    frontClues:[
      'Dansk grøn industriklassiker inden for vindmøller og service.',
      'Serviceforretningen er mere stabil og kvalitativ end hardwareleverancerne.',
      'Markedet ser især på prisdisciplin, margin recovery og kvaliteten af nye ordrer.'
    ],
    clue:'Dansk grøn industriklassiker hvor serviceforretningen er mere værdifuld end den volatile turbineleverance alene.',
    focus:'Margin recovery, prisdisciplin på nye ordrer og hvor robust serviceforretningen er.',
    drivers:'Ordreindgang, turbinepriser, input costs, service mix og project execution.',
    what:'Producerer og servicerer vindmøller globalt på onshore og offshore markeder.',
    valuation:'Typisk 12-18x normaliseret EV/EBITDA.',
    avgMcap12mDkkBn:131.6, dkRank:7,
    whyTrades:'Markedet ser både stor strukturel grøn medvind og høj execution-risk. Derfor afhænger multiple meget af margin confidence.',
    challenge:'At undgå faste kontrakter med dårlig economics og løfte hardware-margin uden at miste markedsandel.',
    peers:['Siemens Energy Gamesa','GE Vernova','Nordex'],
    whyKnow:'Vestas lærer dig forskellen mellem strukturel tema-attraktivitet og faktisk kortsigtet industrial profitability.'
  },
  {
    name:'Coloplast', ticker:'COLO-B', domain:'coloplast.com',
    sector:'MedTech', industry:'Chronic care / ostomy & continence',
    frontClues:[
      'Dansk medtech-navn med meget defensiv efterspørgsel og høj patientloyalitet.',
      'Stærk inden for stomi, kontinens, urologi og andre kroniske care-kategorier.',
      'Premium-multiplen bæres af recurring-lignende demand, høje marginer og meget forudsigelig execution.'
    ],
    clue:'Ekstremt defensivt dansk quality compounder med meget loyal patientbase og høj forudsigelighed.',
    focus:'USA-vækst, Kerecis-integration og hvor længe marginerne kan holdes i verdensklasse.',
    drivers:'Organisk vækst, reimbursement, innovationstakt, salgsmix og integration.',
    what:'Sælger medico-produkter til patienter med kroniske behov inden for stomi, kontinens, urologi og sårpleje.',
    valuation:'Typisk 18-24x EV/EBITDA og 25-35x P/E.',
    avgMcap12mDkkBn:132.3, dkRank:10,
    whyTrades:'Høj multiple skyldes defensivitet, recurring demand, pricing power og stærke marginer.',
    challenge:'At forsvare premium-prissætning mens USA og nye kategorier skal levere vækst.',
    peers:['Convatec','Smith+Nephew','Essity Health'],
    whyKnow:'Coloplast er en referencecase for defensive healthcare-multipler og recurring-revenue-lignende patient economics.'
  },
  {
    name:'Pandora', ticker:'PNDORA', domain:'pandoragroup.com',
    sector:'Consumer', industry:'Jewellery',
    frontClues:[
      'Dansk consumer-brand med vertikal model fra design og produktion til retail.',
      'Historisk kendt for charms, men casen handler nu bredere om brandstyrke og global eksekvering.',
      'Investorer følger især brand heat, US-forbrug, Kina og om væksten er mere end marketingdrevet.'
    ],
    clue:'Brand- og retail-case med høj cash conversion, men stadig delvist prissat som cyklisk forbrug.',
    focus:'Brand heat, US-forbrug, China recovery og lab-grown diamonds som vækstben.',
    drivers:'Like-for-like sales, gross margin, butikseffektivitet, marketing ROI og metalpriser.',
    what:'Verdens største smykke-brand målt på volumen med vertikal model fra design til retail.',
    valuation:'Typisk 10-13x EV/EBITDA.',
    avgMcap12mDkkBn:62.6, dkRank:23,
    whyTrades:'Stærk execution og buybacks støtter casen, men markedet giver stadig rabat pga. fashion/cycle-risk.',
    challenge:'At bevise at væksten er branddrevet og ikke kun marketing- eller prisdrevet i et mere presset forbrugermarked.',
    peers:['Signet','Richemont','Tapestry'],
    whyKnow:'Pandora er vigtig som dansk consumer-brand case med høj FCF, stor international skalering og tydelig rerating-historik.'
  },
  {
    name:'Ørsted', ticker:'ORSTED', domain:'orsted.com',
    sector:'Utilities', industry:'Offshore wind development',
    frontClues:[
      'Dansk offshore-wind navn og et af de mest kendte europæiske grønne utility-assets.',
      'Projektøkonomien er meget følsom for renter, capex, kontraktstruktur og execution.',
      'Markedet tester stadig troværdigheden efter store nedskrivninger og projektproblemer.'
    ],
    clue:'Flagship for grøn omstilling, men også skoleeksempel på hvor hårdt renter og project risk kan ramme infrastructure equity.',
    focus:'Projektselektion, partner/farm-downs, kapitaldisciplin og troværdighed efter projektproblemer.',
    drivers:'Renter, capex per MW, power prices, regulatory regimes og construction execution.',
    what:'Udvikler, bygger og driver især havvindprojekter med stor eksponering mod regulering og langsigtede kontrakter.',
    valuation:'Typisk 8-12x EV/EBITDA.',
    avgMcap12mDkkBn:252.4, dkRank:5,
    whyTrades:'Casen handler mere om balance mellem growth options og capital intensity end om klassisk utility-stabilitet alene.',
    challenge:'At genskabe investorernes tillid til project economics og afkastdisciplin efter store nedskrivninger.',
    peers:['RWE Renewables','Iberdrola','EDP Renovaveis'],
    whyKnow:'Ørsted er central for at forstå hvordan markedet priser energiomstilling, renter og execution-risk i projektbaserede modeller.'
  },
  {
    name:'Carlsberg', ticker:'CARL-B', domain:'carlsberggroup.com',
    sector:'Consumer Staples', industry:'Brewing',
    frontClues:[
      'Dansk brygger med stærke brands og stor eksponering mod Europa og Asien.',
      'Casen er defensiv, men ikke helt premium på niveau med de bedste global consumer compounders.',
      'Vigtige temaer er premiumisering, Britvic-integration og emerging market execution.'
    ],
    clue:'Defensiv FMCG-case med stærke brands, men med geopolitik og emerging market exposure som ekstra lag.',
    focus:'Britvic-integration, premiumisering, Asien-eksekvering og effekten af det post-russiske setup.',
    drivers:'Volume/mix, premium share, input costs, weather og emerging market demand.',
    what:'Global bryggerigruppe med stærke markedspositioner i Europa og Asien samt fokus på premium- og alkoholfri vækst.',
    valuation:'Typisk 10-13x EV/EBITDA.',
    avgMcap12mDkkBn:115.0, dkRank:8,
    whyTrades:'Stabil cash flow støtter multiple, men markedet giver ikke luxury-lignende premium pga. lavere strukturel vækst og geopolitisk eksponering.',
    challenge:'At bevise bedre vækstprofil via premiumisering og integration af større opkøb uden marginpres.',
    peers:['Heineken','AB InBev','Molson Coors'],
    whyKnow:'Carlsberg er en god dansk staple-case for at forstå brand, distribution og emerging market risk i valuation.'
  },
  {
    name:'Novonesis', ticker:'NSIS-B', domain:'novonesis.com',
    sector:'Biosolutions', industry:'Enzymes & cultures',
    frontClues:[
      'Dansk biosolutions-navn skabt af en stor fusion inden for enzymer og kulturer.',
      'Sælger biologiske løsninger til fødevarer, vask, landbrug og industrielle processer.',
      'Investeringscasen afhænger af innovationskraft plus troværdig integration og synergy capture.'
    ],
    clue:'Dansk biosolutions-leder skabt via mega-merger, hvor vækst og synergi skal bevises samtidigt.',
    focus:'Merger integration, cross-selling, innovation og nye anvendelser inden for fødevarer, landbrug og industrielle processer.',
    drivers:'Organisk vækst, synergy capture, innovation pipeline og mix mod højværdisegmenter.',
    what:'Leverer enzymer, kulturer og biologiske løsninger til kunder i fødevarer, vask, landbrug og industrial biotech.',
    valuation:'Typisk 17-22x EV/EBITDA.',
    avgMcap12mDkkBn:191.6, dkRank:6,
    whyTrades:'Premium skyldes skalerbar IP, høje barrierer og stærke margener, men integration og vækstleverance skal være troværdig.',
    challenge:'At omsætte fusionen til reel accelereret vækst og ikke kun cost synergies.',
    peers:['DSM-Firmenich','IFF','Kerry'],
    whyKnow:'Novonesis er vigtig som dansk large-cap merger case og som reference på how-to-price high-quality niche B2B science assets.'
  },
  {
    name:'Tryg', ticker:'TRYG', domain:'tryg.com',
    sector:'Insurance', industry:'P&C insurance',
    frontClues:[
      'Nordisk skadesforsikringsnavn hvor combined ratio betyder mere end klassiske EV-multipler.',
      'Defensivt cash flow, stærk distribution og kapitaldisciplin er kernen i equity casen.',
      'Markedet følger især claims inflation, vejrhændelser og pricing discipline.'
    ],
    clue:'Nordisk compounder-case hvor combined ratio og kapitaldisciplin betyder mere end klassiske EV-multipler.',
    focus:'Claims inflation, vejrhændelser, pricing discipline og kapitalallokering efter større M&A.',
    drivers:'Combined ratio, premium growth, investment income og weather claims.',
    what:'Et af Nordens største skadesforsikringsselskaber med stærke private og kommercielle markedspositioner.',
    valuation:'Typisk P/E 13-16x; P/B og dividend yield er vigtige referencepunkter.',
    avgMcap12mDkkBn:96.0, dkRank:11,
    whyTrades:'Defensiv cash flow og høj distributionsstyrke støtter premium mod svagere europæiske peers.',
    challenge:'At holde prissætningen foran claims inflation uden at miste volumen eller forstyrre retention.',
    peers:['Sampo / If','Gjensidige','Topdanmark'],
    whyKnow:'Tryg er central for at lære bank/forsikring-lignende valuation, hvor underwriting quality og kapitalstyrke dominerer equity casen.'
  },
  {
    name:'Genmab', ticker:'GMAB', domain:'genmab.com',
    sector:'Biotech', industry:'Oncology antibodies',
    frontClues:[
      'Dansk biotech-navn med meget høj profitabilitet drevet af royalties.',
      'Et af de vigtigste spørgsmål er, om pipeline kan bære værdien efter den nuværende cash cow.',
      'Casen balancerer mellem kvaliteten i Darzalex og frygten for patent-/pipeline-risiko.'
    ],
    clue:'Royalties og pipeline i ét navn: enorm profitabilitet i dag, men værdiansættelsen styres af tillid til næste bølge.',
    focus:'Darzalex durability, pipeline read-outs og transition mod bredere egen produktportefølje.',
    drivers:'Royalty growth, kliniske data, partnering economics og patenthorisont.',
    what:'Biotekselskab med stærk antistofplatform og stor eksponering mod kræftbehandlinger, især gennem partneraftaler.',
    valuation:'Typisk 15-20x EV/EBITDA, men følsom for pipeline-nyheder.',
    avgMcap12mDkkBn:104.5, dkRank:9,
    whyTrades:'Markedet giver høj profit-premium, men komprimerer multiplen hvis patent-cliff eller pipeline-skuffelser rykker tættere på.',
    challenge:'At bevise at næste generation af assets kan bære værdien, når Darzalex modnes.',
    peers:['argenx','BioNTech','Beigene'],
    whyKnow:'Genmab lærer dig forskellen mellem royalty quality, pipeline optionality og binary event-risk i biotech valuation.'
  },
  {
    name:'Demant', ticker:'DEMANT', domain:'demant.com',
    sector:'MedTech', industry:'Hearing care',
    frontClues:[
      'Dansk høreapparat- og hearing care-navn i et globalt oligopol.',
      'Distributionskanaler og produktcyklusser er næsten lige så vigtige som ren volumenvækst.',
      'Markedet belønner innovationstempo og retail execution, men straffer hurtigt produktsvigt.'
    ],
    clue:'Oligopolisk høreapparatmarked med stærke distributionskanaler og høj betydning af produktcyklusser.',
    focus:'Produktlanceringer, retail/hearing care execution og fortsat stabilisering efter cyber-forløb.',
    drivers:'Nye produktplatforme, demografi, clinics/distribution og mix mellem devices og hearing care.',
    what:'Udvikler og sælger høreapparater og driver egne hearing care-kanaler i mange markeder.',
    valuation:'Typisk 14-18x EV/EBITDA.',
    avgMcap12mDkkBn:48.9, dkRank:18,
    whyTrades:'Oligopol og sticky channels giver premium, men multiple afhænger af innovationslederskab og execution i retailnetværket.',
    challenge:'At holde innovationstempo og distributionsstyrke højt i et marked hvor produktsvigt straffes hurtigt.',
    peers:['Sonova','WS Audiology','Amplifon'],
    whyKnow:'Demant er nyttig for at forstå medtech-oligopoler, kanalstyrke og hvordan teknologi-cyklus påvirker healthcare-multipler.'
  },
  {
    name:'ISS', ticker:'ISS', domain:'issworld.com',
    sector:'Business Services', industry:'Facility management',
    frontClues:[
      'Dansk facility management-navn med global workforce og lavmarginforretning.',
      'Kvaliteten i casen ligger i kontraktdisciplin og simplificering, ikke i høj topline-vækst.',
      'Multiplen løfter kun, hvis margin, cash conversion og execution forbedres samtidigt.'
    ],
    clue:'Lavmargin service-case hvor kontraktdisciplin og turnaround-eksekvering er langt vigtigere end topline alene.',
    focus:'Marginløft, kontraktkvalitet, wage inflation og cash conversion i et globalt service-setup.',
    drivers:'Retention, pricing, labor costs, margin expansion og working capital.',
    what:'Leverer facility services som rengøring, catering, workplace og support til store virksomheder og institutioner.',
    valuation:'Typisk 8-11x EV/EBITDA.',
    avgMcap12mDkkBn:31.8, dkRank:20,
    whyTrades:'Rabatteres for lavere marginer og execution complexity, men rerates når simplificering og cash conversion forbedres.',
    challenge:'At holde kontraktdisciplin stram nok til at løfte afkast uden at miste skala eller kunder.',
    peers:['Compass Group','Sodexo','Mitie'],
    whyKnow:'ISS er en klassisk turnaround- og margin-recovery-case, som er meget relevant for at lære kvalitetsforskelle i business services.'
  },
  {
    name:'Ambu', ticker:'AMBU-B', domain:'ambu.com',
    sector:'MedTech', industry:'Single-use endoscopy',
    frontClues:[
      'Dansk medtech-case bygget op omkring single-use endoskopi og disruption.',
      'Navnet blev længe prissat på potentiale snarere end på moden earnings-power.',
      'Markedet fokuserer nu på adoption, profitabel scale og om narrativet bliver til reel execution.'
    ],
    clue:'Disruptiv dansk medtech-case hvor investorer betaler for markedsudvidelse og ikke kun nuværende earnings.',
    focus:'Profitabilitet, adoption inden for pulmonologi/urologi og hvor hurtigt single-use kan tage markedsandel.',
    drivers:'Volume growth, gross margin, procedure adoption, R&D discipline og manufacturing scale.',
    what:'Sælger engangs-endoskoper og andre single-use løsninger til hospitaler med fokus på infektionskontrol og workflow-forbedring.',
    valuation:'Typisk høj growth-multiple; ofte 20x+ EV/EBITDA når markedet tror på scale-up.',
    avgMcap12mDkkBn:25.1, dkRank:28,
    whyTrades:'Markedet priser optionalitet og disruption højt, men straffer hårdt hvis vækst eller marginer ikke materialiseres.',
    challenge:'At bevise bæredygtig profitabel scale og ikke kun teknologisk potentiale.',
    peers:['Olympus','Boston Scientific','Teleflex'],
    whyKnow:'Ambu er god træning i at analysere high-expectation growth assets, hvor narrativ og adoption betyder næsten lige så meget som nuværende tal.'
  }
];

/* ──────────────────────────────────────────────
   PEOPLE DATA
   type:'people' — front=avatar, back=name+grade
────────────────────────────────────────────── */
const PEOPLE = [
  // Leadership
  { name:'Atilla Olesen',           niveau:'Leadership',        titel:'Head of Investment Banking',            firma:'Danske Bank IB', note:'', photo:'Pictures/Atilla Olesen (implementeret).jpeg' },
  { name:'Christian Lindholm',      niveau:'Leadership',        titel:'Co-Head Danmark',                       firma:'Danske Bank IB', note:'', photo:'Pictures/Christian Lindholm (implementeret).jpg' },
  { name:'Thomas Knaack',           niveau:'Leadership',        titel:'Co-Head Danmark',                       firma:'Danske Bank IB', note:'', photo:'Pictures/Thomas Knaack (implementeret).jpeg' },
  // Managing Directors
  { name:'Henrik Ljungstrom',       niveau:'Managing Director', titel:'Managing Director',                     firma:'Danske Bank IB', note:'', photo:'Pictures/Henrik Ljungstrom (implementeret).jpeg' },
  { name:'Bjarke Skovgaard',        niveau:'Managing Director', titel:'Managing Director',                     firma:'Danske Bank IB', note:'', photo:'Pictures/Bjarke Skovgaard (implementeret).jpeg' },
  { name:'Christian Blinkenberg',   niveau:'Managing Director', titel:'Managing Director',                     firma:'Danske Bank IB', note:'', photo:'Pictures/Christian Blinkenberg (implementeret).jpeg' },
  { name:'Jesper Buchardt',         niveau:'Managing Director', titel:'Managing Director',                     firma:'Danske Bank IB', note:'Tidl: Managing Director - Director Corporate Finance', photo:'Pictures/Jesper Buchardt (implementeret).jpeg' },
  // Directors
  { name:'Mikko Hirvonen',          niveau:'Director',          titel:'Director',                              firma:'Danske Bank IB', note:'', photo:'Pictures/Mikko Hirvonen (implementeret).jpeg' },
  { name:'Filip R. Monefeldt',      niveau:'Director',          titel:'Director',                              firma:'Danske Bank IB', note:'Tidl. Carnegie | Ekceptionelt dygtig iflg. Futtrup', photo:'Pictures/Filip R. Monefeldt (implementeret).jpeg' },
  { name:'Ulrik Rasmussen',         niveau:'Director',          titel:'Director',                              firma:'Danske Bank IB', note:'' },
  { name:'Janus Nygaard',           niveau:'Director',          titel:'Director',                              firma:'Danske Bank IB', note:'', photo:'Pictures/Janus Nygaard (implementeret).jpeg' },
  // Associate Directors
  { name:'Casper Jul Rask Jensen',  niveau:'Associate Director',titel:'Associate Director',                    firma:'Danske Bank IB', note:'Tidl: Associate Director, Corporate Finance - Investment Banking (M&A / ECM) - Associate, Corporate Finance | Udd: Copenhagen Business School - Master\'s Degree (M.Sc.), Finance and Accounting  · (2015 - 2017)', photo:'Pictures/Casper Jul Rask Jensen (implementeret).jpeg' },
  { name:'Troels L. Johansen',      niveau:'Associate Director',titel:'Associate Director',                    firma:'Danske Bank IB', note:'' },
  { name:'Peter Christian Jensen',  niveau:'Associate Director',titel:'Associate Director',                    firma:'Danske Bank IB', note:'Tidl: Associate Director - Copenhagen, Denmark - Investment Banking - M&A and ECM | Udd: Copenhagen Business School - Master of Science (M.Sc.), Applied Economics and Finance  · (2016 - 2018)', photo:'Pictures/Peter Christian Jensen (implementeret).jpeg' },
  { name:'Frederik Uggerhøj',       niveau:'Associate Director',titel:'Associate Director',                    firma:'Danske Bank IB', note:'Tidl: Associate | Corporate Finance | Investment Banking - Analyst | Corporate Finance | Investment Banking - Junior Analyst (student) | Corporate Finance | Investment Banking | Udd: Copenhagen Business School - Master of Science - MS, Finance and Strategic Management  · (2018 - 2020)', photo:'Pictures/Frederik Uggerhøj (implementeret).jpeg' },
  { name:'Anders Højlund',          niveau:'Associate Director',titel:'Associate Director',                    firma:'Danske Bank IB', note:'Tidl: Associate Director | Corporate Finance - Investment Banking (M&A and ECM advisory) - Associate | Corporate Finance | Udd: Aarhus Universitet - Master of Science (M.Sc.), Finance  · (2018 - 2020)', photo:'Pictures/Anders Højlund (implementeret).jpeg' },
  { name:'Jonas Mulvad Vendelbo',   niveau:'Associate Director',titel:'Associate Director',                    firma:'Danske Bank IB', note:'Tidl: Associate Director | Corporate Finance (M&A and ECM) - Associate Director | Corporate Finance (M&A and ECM) - Copenhagen Business School | Udd: Copenhagen Business School - Master\'s degree, Finance & Investment', photo:'Pictures/Jonas Mulvad Vendelbo (implementeret).jpeg' },
  // Associates
  { name:'Mohamad Al-Saraf',        niveau:'Associate',         titel:'Associate, FX Strategy',                firma:'Danske Bank IB', note:'' },
  { name:'Valdemar Stengaard',      niveau:'Associate',         titel:'Associate',                             firma:'Danske Bank IB', note:'', photo:'Pictures/Valdemar Stengaard (implementeret).jpeg' },
  { name:'Magnus Johansen',         niveau:'Associate',         titel:'Associate',                             firma:'Danske Bank IB', note:'Gruppe 1 med Casper Jul | Tidl: Associate, Corporate Finance - Analyst, Corporate Finance - Student Analyst, Corporate Finance | Udd: Copenhagen Business School - Master\'s degree, Finance and Accounting (Cand.merc.fir)  · (2019 - 2021)', photo:'Pictures/Magnus Johansen (implementeret).jpeg' },
  { name:'Martin Andersen',         niveau:'Associate',         titel:'Associate',                             firma:'Danske Bank IB', note:'', photo:'Pictures/Martin Andersen (implementeret).jpeg' },
  // Analysts
  { name:'Christian Dahl',          niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB', note:'', photo:'Pictures/Christian Dahl (implementeret).jpeg' },
  { name:'Mikkel R. Christensen',   niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB', note:'Tidl: Analyst, Corporate Finance - Investment Banking (M&A and ECM advisory) - Novo Holdings | Udd: Copenhagen Business School - MSc in Finance and Accounting (FIR)', photo:'Pictures/Mikkel R. Christensen (implementeret).jpeg' },
  { name:'Bavendra Rajendra',       niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB', note:'Tidl: Analyst, Corporate Finance - M&A & ECM. - Credit Suisse | Udd: Copenhagen Business School - M.Sc. in Finance and Strategic Management  · (2022 - 2024)', photo:'Pictures/Bavendra Rajendra (implementeret).jpeg' },
  { name:'Caroline Louise With',    niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB', note:'' },
  { name:'Mathilde Saigal',         niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB', note:'Tidl: Analyst, Leveraged Finance - Nordea Markets, Corporates & Institutions - Relationship Manager - Large Corporates & Institutions | Udd: Copenhagen Business School - Master\'s degree, Finance & Strategic Management  · (september 2022 - juli', photo:'Pictures/Mathilde Saigal (implementeret).jpeg' },
  { name:'Anders C. Jakobsen',      niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB', note:'Tidl: Associate, Corporate Finance - Copenhagen - Investment Banking (M&A and ECM advisory) | Udd: Copenhagen Business School - MSc, Finance and Investments   · (september 2020 - juni 2022)', photo:'Pictures/Anders C. Jakobsen (implementeret).jpeg' },
  { name:'Laura P. Pedersen',       niveau:'Analyst',           titel:'Analyst (1. år)',                       firma:'Danske Bank IB', note:'', photo:'Pictures/Laura P. Pedersen (implementeret).jpeg' },
  { name:'Marcus Christensen',      niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB', note:'', photo:'Pictures/Marcus Christensen (implementeret).jpeg' },
  { name:'Lukas Hvidkjær',          niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB', note:'Tidl: Analyst | Corporate Finance - København og omegn - DSV - Global Transport and Logistics | Udd: Copenhagen Business School - M.Sc. Finance and Accounting   · (september 2022 - juni 2024)', photo:'Pictures/Lukas Hvidkjær (implementeret).jpeg' },
  { name:'Christian D. Helvind',    niveau:'Director',          titel:'Director',                              firma:'Danske Bank IB', note:'', photo:'Pictures/Christian D. Helvind (implementeret).jpeg', photoCrop:'center center' },
  { name:'Frederik Emil Haven',     niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB', note:'Tidl: Analyst | Corporate Finance - Investment Banking (M&A and ECM advisory) - Waterland Private Equity | Udd: Copenhagen Business School - Master of Science - MS, Finance and Accounting (FIR)  · (2023 - 2025)', photo:'Pictures/Frederik Emil Haven (implementeret).jpeg' },
  { name:'Julius B. Sørensen',      niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB', note:'Tidl: Investment Banking Analyst - Investment Banking - Slättö | Udd: Copenhagen Business School - Master of Science - MSc, Finance and Accounting   · (2023 - 2025)', photo:'Pictures/Julius B. Sørensen (implementeret).jpeg' },
  { name:'Frederik (målmand)',       niveau:'Analyst',           titel:'Analyst',                               firma:'Danske Bank IB', note:'' },
];

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
    phEl.style.display = ''; 
    phEl.style.objectPosition = c.photoCrop ? c.photoCrop : 'top center';
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
  const clues = (c.frontClues || [c.clue, c.focus, c.challenge].filter(Boolean)).slice(-2);
  wrap.style.display = '';
  wrap.innerHTML = `
    <div class="company-front-head">
      <div>
        <div class="company-eyebrow">Flashcard</div>
        <div class="company-clue-title">Hvilket selskab er det?</div>
        <div class="company-clue-sub">Svar uden hjælp fra logo eller navn.</div>
      </div>
    </div>
    <div class="company-grid">
      ${clues.map((clue, i) => `
        <div class="company-block full">
          <div class="company-label">Clue ${i + 1}</div>
          <div class="company-value">${clue}</div>
        </div>
      `).join('')}
      <div class="company-block full">
        <div class="company-label">Spørgsmål 1</div>
        <div class="company-value"><strong>Hvad hedder selskabet?</strong></div>
      </div>
      <div class="company-block full">
        <div class="company-label">Spørgsmål 2</div>
        <div class="company-value"><strong>Hvilken valuation-lens er vigtigst</strong>, og <strong>hvor handler det cirka nu</strong>?</div>
      </div>
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
            <div class="company-label">Hvad Laver De?</div>
            <p>${c.what}</p>
          </div>
          <div class="company-summary-card accent company-metrics">
            <div class="company-label">Konkrete Markedsmultipler</div>
            <div class="company-metric-grid">
              <div class="company-metric-item">
                <span class="company-metric-name">${c.primaryMetricLabel}</span>
                <strong>${c.primaryMetricValue}</strong>
              </div>
              <div class="company-metric-item">
                <span class="company-metric-name">${c.secondaryMetricLabel}</span>
                <strong>${c.secondaryMetricValue}</strong>
              </div>
            </div>
            <p class="company-metric-note">${c.metricWhy} Snapshot pr. ${MARKET_DATA_AS_OF}.</p>
          </div>
          <div class="company-summary-card">
            <div class="company-label">Størrelse & Placering</div>
            <p>12M avg market cap: ${fmtDkkBn(c.avgMcap12mDkkBn)}<br>Aktuel DK-rang: #${c.dkRank} i top 50</p>
          </div>
          <div class="company-summary-card">
            <div class="company-label">Hvorfor Handler De Som De Gør?</div>
            <p>${c.whyTrades}</p>
          </div>
          <div class="company-summary-card">
            <div class="company-label">Hvad Driver Casen Nu?</div>
            <p>${c.drivers}</p>
          </div>
          <div class="company-summary-card">
            <div class="company-label">Vigtigste Udfordring</div>
            <p>${c.challenge}</p>
          </div>
          <div class="company-summary-card">
            <div class="company-label">Comparable Names</div>
            <div class="company-peer-list">${c.peers.map(peer => `<span class="company-peer">${peer}</span>`).join('')}</div>
          </div>
          <div class="company-summary-card">
            <div class="company-label">Hvorfor Skal Du Kende Casen?</div>
            <p>${c.whyKnow}</p>
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
