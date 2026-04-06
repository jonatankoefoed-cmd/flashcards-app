'use strict';
/* ════════════════════════════════════════════════
   Deal Flashcards — Danske Bank Key Transactions 2020-2025
   Deck: deals
════════════════════════════════════════════════ */
const DEAL_CARDS = [

  /* ── 1  Ørsted fortegningsemission ── */
  { deckId:'deals',
    q:'Hvad var Ørsted-fortegningsemissionen (2025)?',
    a:`<strong>Nordens & Danmarks største ECM-transaktion nogensinde</strong>
<ul>
<li><strong>Værdi:</strong> DKK ~60 mia. (~EUR 8 mia.)</li>
<li><strong>Type:</strong> Fortegningsemission</li>
<li><strong>År:</strong> Sep–Okt 2025</li>
<li><strong>DB rolle:</strong> Joint Global Coordinator & Joint Bookrunner — <em>eneste nordiske bank i JGC-rollen</em></li>
<li><strong>Co-leads:</strong> Morgan Stanley, BNP Paribas, J.P. Morgan</li>
<li><strong>Sektor:</strong> Energi / Offshore vind</li>
</ul>
<em>Tip: En af de 3 største nordiske kapitalforhøjelser — alle danske, alle med DB.</em>` },

  /* ── 2  DSV ABB ── */
  { deckId:'deals',
    q:'Beskriv DSV\'s rekord-ABB (2024).',
    a:`<strong>Skandinaviens største Accelerated Bookbuild nogensinde</strong>
<ul>
<li><strong>Værdi:</strong> DKK 37,3 mia. (~EUR 5 mia.)</li>
<li><strong>Type:</strong> ABB (Accelerated Bookbuild)</li>
<li><strong>År:</strong> Okt 2024</li>
<li><strong>Kontekst:</strong> Finansiering af DSV's opkøb af DB Schenker (EUR 14,3 mia.)</li>
<li><strong>DB rolle:</strong> Joint Bookrunner</li>
<li><strong>Sektor:</strong> Transport / Logistik</li>
</ul>
<em>DB-analyst Lukas Hvidkjær var tidligere i DSV's M&A-team under Schenker-dealen.</em>` },

  /* ── 3  Tryg fortegningsemission ── */
  { deckId:'deals',
    q:'Hvad var Tryg-fortegningsemissionen (2021)?',
    a:`<strong>DKK 37 mia. — finansierede RSA Skandinavien-opkøbet</strong>
<ul>
<li><strong>Værdi:</strong> DKK 37 mia. (~EUR 5 mia.)</li>
<li><strong>Type:</strong> Fortegningsemission</li>
<li><strong>År:</strong> Mar 2021</li>
<li><strong>Kontekst:</strong> Tryg + Intact Financial opkøbte RSA (GBP 7,2 mia. total deal)</li>
<li><strong>DB rolle:</strong> Joint Global Coordinator & Joint Bookrunner</li>
<li><strong>Co-lead:</strong> Morgan Stanley</li>
<li><strong>Sektor:</strong> Forsikring</li>
</ul>
<em>2. største nordiske kapitalforhøjelse nogensinde, lige efter Ørsted.</em>` },

  /* ── 4  Novozymes / Chr. Hansen fusion ── */
  { deckId:'deals',
    q:'Beskriv Novozymes/Chr. Hansen-fusionen (Novonesis).',
    a:`<strong>Danmarks største virksomhedsfusion nogensinde</strong>
<ul>
<li><strong>Implied EV:</strong> ~DKK 80,7 mia. (samlet omsætning ~EUR 3,7 mia.)</li>
<li><strong>Type:</strong> Fusion (M&A)</li>
<li><strong>Annonceret:</strong> Dec 2022 | <strong>Closing:</strong> Jan 2024</li>
<li><strong>Resultat:</strong> Chr. Hansen → Novonesis (kombineret biosolutions-selskab)</li>
<li><strong>DB rolle:</strong> Joint Financial Adviser til Novozymes</li>
<li><strong>Co-leads:</strong> Gordon Dyal & Co. (lead FA), Nordea (joint FA)</li>
<li><strong>Sektor:</strong> Bioteknologi / Biosolutions</li>
</ul>` },

  /* ── 5  Svitzer demerger + take-private ── */
  { deckId:'deals',
    q:'Beskriv Svitzer-sagaen: demerger → take-private.',
    a:`<strong>To sammenhængende mandater for A.P. Møller Holding</strong>
<ul>
<li><strong>Fase 1 — Demerger & notering (Q1 2024):</strong> Svitzer udskilt fra A.P. Møller-Mærsk via pro rata distribution. Mkt. cap ~DKK 6 mia. DB rolle: JGC (m. Citigroup).</li>
<li><strong>Fase 2 — Take-private (2025):</strong> APMH Invest købte resterende ~53% af Svitzer. DKK 9 mia. (DKK 285/aktie, 32% præmie). DB rolle: Exclusive Financial Adviser til APMH.</li>
<li><strong>Sektor:</strong> Maritime tjenester (bugsering)</li>
</ul>
<em>Christian Lindholm var nøgleperson på begge mandater. Viser DB's dybe APMH-relation.</em>` },

  /* ── 6  Coloplast ABB ── */
  { deckId:'deals',
    q:'Hvad var Coloplast-emissionen (2023)?',
    a:`<strong>DKK 9,2 mia. directed issue til Kerecis-opkøb</strong>
<ul>
<li><strong>Værdi:</strong> DKK 9,2 mia.</li>
<li><strong>Type:</strong> Directed issue (M&A-finansiering)</li>
<li><strong>År:</strong> Aug 2023</li>
<li><strong>Kontekst:</strong> Finansierede Coloplasts opkøb af islandske Kerecis (wound care)</li>
<li><strong>DB rolle:</strong> <em>Sole Global Coordinator</em> & Joint Bookrunner</li>
<li><strong>Co-leads:</strong> Nordea, Jefferies, Morgan Stanley</li>
<li><strong>Sektor:</strong> Sundhed / Medicinsk udstyr</li>
</ul>
<em>Sole GC = DB styrede pris, allokering og timing.</em>` },

  /* ── 7  A.P. Møller / Concentric ── */
  { deckId:'deals',
    q:'Beskriv APMH / Concentric-transaktionen.',
    a:`<strong>SEK 8,6 mia. offentligt overtagelsestilbud</strong>
<ul>
<li><strong>Værdi:</strong> SEK 8,6 mia. (~USD 840 mio.)</li>
<li><strong>Type:</strong> Offentligt overtagelsestilbud (buy-side)</li>
<li><strong>År:</strong> Sep 2024</li>
<li><strong>Køber:</strong> A.P. Møller Holding A/S</li>
<li><strong>Target:</strong> Concentric AB (Nasdaq Stockholm)</li>
<li><strong>DB rolle:</strong> Joint Financial Adviser (m. Citigroup)</li>
<li><strong>Sektor:</strong> Industri / Hydraulik</li>
</ul>
<em>Peter Christian Jensen navngivet på dette deal-team.</em>` },

  /* ── 8  Penneo / Visma ── */
  { deckId:'deals',
    q:'Hvad var Penneo/Visma-transaktionen?',
    a:`<strong>Offentligt tilbud + fairness opinion — DB exclusive adviser</strong>
<ul>
<li><strong>Tilbudspris:</strong> DKK 16,5/aktie (~91% accept)</li>
<li><strong>Type:</strong> Sell-side M&A (offentligt tilbud)</li>
<li><strong>År:</strong> Nov 2024</li>
<li><strong>Sælger:</strong> Penneo A/S (Nasdaq CPH, digital signatur SaaS)</li>
<li><strong>Køber:</strong> Visma Danmark Holding</li>
<li><strong>DB rolle:</strong> <em>Exclusive Financial Adviser</em> til Penneo inkl. fairness opinion</li>
<li><strong>Sektor:</strong> Teknologi / SaaS</li>
</ul>
<em>Christian Lindholm ledede mandatet. Fairness opinion = uafhængig vurdering af pris.</em>` },

  /* ── 9  Davidsens / Kesko ── */
  { deckId:'deals',
    q:'Beskriv Davidsens Tømmerhandel-salget.',
    a:`<strong>EUR 190 mio. sell-side til finsk Kesko</strong>
<ul>
<li><strong>EV:</strong> EUR 190 mio.</li>
<li><strong>Type:</strong> Sell-side M&A (90% stake)</li>
<li><strong>År:</strong> Aug 2023</li>
<li><strong>Sælger:</strong> Davidsens Tømmerhandel A/S og aktionærer</li>
<li><strong>Køber:</strong> Kesko Corporation (Finland)</li>
<li><strong>DB rolle:</strong> Financial Adviser til Davidsens</li>
<li><strong>Sektor:</strong> Byggematerialer</li>
</ul>
<em>Martin Andersen & Peter Christian Jensen navngivet. Typisk mid-market sell-side mandat.</em>` },

  /* ── 10  STOK Emballage ── */
  { deckId:'deals',
    q:'Hvad var STOK Emballage-transaktionen?',
    a:`<strong>Mid-market PE sell-side — Exclusive FA</strong>
<ul>
<li><strong>Type:</strong> Sell-side M&A</li>
<li><strong>År:</strong> ~2022–2023</li>
<li><strong>Sælger:</strong> STOK Emballage (Langeskov, DK)</li>
<li><strong>Køber:</strong> A&M Capital Europe (AMCE Fund I)</li>
<li><strong>DB rolle:</strong> <em>Exclusive Financial Adviser</em></li>
<li><strong>Sektor:</strong> Emballage / Distribution</li>
</ul>
<em>Deal-team inkl. Jesper Buchardt, Peter Christian Jensen, Martin Andersen. Viser DB's mid-market sell-side styrke.</em>` },

  /* ── 11  Molslinjen / EQT ── */
  { deckId:'deals',
    q:'Beskriv Molslinjen/EQT-transaktionen.',
    a:`<strong>Buy-side M&A med DC Advisory som co-adviser</strong>
<ul>
<li><strong>Type:</strong> Buy-side M&A</li>
<li><strong>År:</strong> Dec 2020</li>
<li><strong>Køber:</strong> EQT Infrastructure</li>
<li><strong>Target:</strong> Molslinjen A/S (færgeoperatør)</li>
<li><strong>DB rolle:</strong> Joint Financial Adviser (m. DC Advisory)</li>
<li><strong>Sektor:</strong> Transport / Færger</li>
</ul>
<em>DC Advisory (Daiwa Securities) er DB's faste cross-border M&A-partner med 500+ medarbejdere i 21 lokationer.</em>` },

  /* ── 12  Fortum recycling & waste ── */
  { deckId:'deals',
    q:'Beskriv Fortum recycling & waste-salget.',
    a:`<strong>EUR 800 mio. finsk sell-side til Summa Equity</strong>
<ul>
<li><strong>Værdi:</strong> EUR 800 mio.</li>
<li><strong>Type:</strong> Sell-side M&A</li>
<li><strong>Annonceret:</strong> Nov 2024 | <strong>Closing:</strong> Mar 2025</li>
<li><strong>Sælger:</strong> Fortum Oyj (Finland)</li>
<li><strong>Køber:</strong> Summa Equity</li>
<li><strong>DB rolle:</strong> Financial Adviser (FI-team)</li>
<li><strong>Sektor:</strong> Miljø / Genbrug</li>
</ul>
<em>En af de største nordiske miljø-transaktioner. Viser DB's pan-nordiske platform.</em>` },

  /* ── 13  Pandora ABB ── */
  { deckId:'deals',
    q:'Beskriv Pandora ABB (2020) og tilbagekøbsprogram.',
    a:`<strong>DKK 1,8 mia. ABB — 7x overtegnet</strong>
<ul>
<li><strong>Værdi:</strong> DKK 1,8 mia. (nytegning + egne aktier)</li>
<li><strong>Type:</strong> ABB (Accelerated Bookbuild)</li>
<li><strong>År:</strong> Maj 2020 (under COVID)</li>
<li><strong>DB rolle:</strong> Joint Bookrunner</li>
<li><strong>Bemærk:</strong> 7x overtegnet — ekstremt stærk efterspørgsel</li>
<li><strong>Opfølgning:</strong> DB ledede også Pandoras DKK 5 mia. aktietilbagekøbsprogram (2023-24)</li>
<li><strong>Sektor:</strong> Forbrugsvarer / Smykker</li>
</ul>` },

  /* ── 14  Better Collective dual listing + ABB ── */
  { deckId:'deals',
    q:'Beskriv Better Collective dual listing + ABB.',
    a:`<strong>Dual listing Nasdaq Sthlm→CPH + DKK 1,08 mia. ABB</strong>
<ul>
<li><strong>Fase 1 — Dual listing (Q4 2023):</strong> Better Collective A/S noteret på Nasdaq CPH (allerede Sthlm). DB rolle: Financial Adviser & JGC.</li>
<li><strong>Fase 2 — Private placement (Mar 2024):</strong> DKK 1.081,9 mio. ABB til <em>0% rabat</em>. DB rolle: JGC & JBR (m. Jefferies, Nordea).</li>
<li><strong>Sektor:</strong> Digital medier / iGaming</li>
</ul>
<em>0% rabat er ekstremt ualmindeligt — viser stærk investor-efterspørgsel og god execution.</em>` },

  /* ── 15  GN Store Nord ── */
  { deckId:'deals',
    q:'Hvad var GN Store Nord-emissionen (2023)?',
    a:`<strong>DKK 2,75 mia. directed issue & private placing</strong>
<ul>
<li><strong>Værdi:</strong> DKK 2,75 mia.</li>
<li><strong>Type:</strong> Directed issue & private placing</li>
<li><strong>År:</strong> Maj 2023</li>
<li><strong>DB rolle:</strong> Joint Global Coordinator & Joint Bookrunner</li>
<li><strong>Sektor:</strong> Teknologi / Audio (GN Hearing, SteelSeries)</li>
</ul>` },

  /* ── 16  Zealand Pharma ABB ── */
  { deckId:'deals',
    q:'Beskriv Zealand Pharma ABB (2023).',
    a:`<strong>DKK 1,5 mia. nytegning til biotek-pipeline</strong>
<ul>
<li><strong>Værdi:</strong> DKK 1,5 mia.</li>
<li><strong>Type:</strong> ABB (nytegning)</li>
<li><strong>År:</strong> Apr 2023</li>
<li><strong>DB rolle:</strong> Joint Global Coordinator & Joint Bookrunner</li>
<li><strong>Co-leads:</strong> Goldman Sachs, Jefferies, Nordea</li>
<li><strong>Sektor:</strong> Biotek / Pharma (peptidbaserede lægemidler)</li>
</ul>
<em>Stærkt co-lead lineup viser DB's position blandt globale bulge brackets i nordisk biotek.</em>` },

  /* ── 17  Statkraft Varme ── */
  { deckId:'deals',
    q:'Beskriv Statkraft Varme-salget (2025).',
    a:`<strong>NOK 3,6 mia. — Exclusive FA til Statkraft</strong>
<ul>
<li><strong>Værdi:</strong> NOK 3,6 mia. (~EUR 312 mio.)</li>
<li><strong>Type:</strong> Sell-side M&A (13 fjernvarmelokationer i NO/SE)</li>
<li><strong>År:</strong> Sep 2025</li>
<li><strong>Sælger:</strong> Statkraft (norsk statsejd energiselskab)</li>
<li><strong>Køber:</strong> Patrizia SE / Nordic Infrastructure AG</li>
<li><strong>DB rolle:</strong> <em>Exclusive Financial Adviser</em> (NO-team)</li>
<li><strong>Sektor:</strong> Energi / Fjernvarme</li>
</ul>
<em>Viser DB's styrke i energi/infrastruktur-transaktioner på tværs af Norden.</em>` },

  /* ── 18  ECM markedsdominans ── */
  { deckId:'deals',
    q:'Hvad viser DB\'s ECM track record 2019-2023?',
    a:`<strong>Dominerende nordisk ECM-franchise</strong>
<ul>
<li><strong>H1 2023:</strong> Lead bank på <em>9 af 11</em> større danske ECM-transaktioner (82%!)</li>
<li><strong>Samlet 2019-2023:</strong> 50+ ECM-transaktioner til EUR ~6 mia.</li>
<li><strong>2021:</strong> Største ECM-markedsandel i Norden</li>
<li><strong>Unik position:</strong> Alle 3 største nordiske kapitalforhøjelser er danske — og DB var med på dem alle (Ørsted, DSV, Tryg)</li>
<li><strong>ECM-ledelse:</strong> Christian Hansen (KBH) & Fredrik Segenmark (Sthlm)</li>
</ul>
<em>London ECM-desk lukket jun 2025 → konsolideret i KBH+Sthlm som "strategic milestone".</em>` },

  /* ── 19  DC Advisory partnership ── */
  { deckId:'deals',
    q:'Hvad er DB\'s samarbejde med DC Advisory?',
    a:`<strong>Strategisk cross-border M&A-partner</strong>
<ul>
<li><strong>Ejer:</strong> Daiwa Securities Group (japansk)</li>
<li><strong>Størrelse:</strong> 500+ medarbejdere i 21 lokationer globalt</li>
<li><strong>Samarbejdsmodel:</strong> Joint Financial Adviser på cross-border deals</li>
<li><strong>Eksempler:</strong> Molslinjen/EQT, ForSea/EQT, Eltel Networks/VINCI</li>
<li><strong>Værdi for DB:</strong> Adgang til global M&A-distribution uden egen global platform</li>
</ul>
<em>Adskiller DB fra rene nordiske konkurrenter (Carnegie, ABG) som mangler cross-border reach.</em>` },

  /* ── 20  APMH kernerelation ── */
  { deckId:'deals',
    q:'Beskriv DB\'s relation til A.P. Møller Holding.',
    a:`<strong>DB's vigtigste tilbagevendende klient — 4+ mandater</strong>
<ul>
<li><strong>1. Svitzer demerger (Q1 2024):</strong> JGC m. Citigroup. Mkt. cap ~DKK 6 mia.</li>
<li><strong>2. Svitzer take-private (2025):</strong> Exclusive FA. DKK 9 mia.</li>
<li><strong>3. Concentric AB opkøb (Sep 2024):</strong> Joint FA m. Citigroup. SEK 8,6 mia.</li>
<li><strong>4. Tidl. samarbejde:</strong> Langvarig bankrelation på tværs af Mærsk-gruppen</li>
</ul>
<em>Christian Lindholm er nøglekontakt. Viser værdien af "repeat client" i IB — én stærk relation genererer millioner i fees over tid.</em>` },
];
