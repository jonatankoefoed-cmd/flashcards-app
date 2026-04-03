'use strict';
/* ════════════════════════════════════════════════
   IB Prep · process_flows.js
   Interactive Process Flow visualizations
════════════════════════════════════════════════ */

const PROCESS_FLOWS = [
  /* ─── SELL-SIDE M&A ─── */
  {
    id: 'sell-side',
    title: 'Sell-Side M&A Process',
    subtitle: 'Struktureret auktion — fra pitch til closing (24–30 uger)',
    icon: 'arrow-right-circle',
    color: '#0891B2',
    phases: [
      {
        name: 'Pitching',
        week: 'Uge 0–2',
        duration: '2 uger',
        summary: 'Vind mandatet med et overbevisende pitch book',
        analyst: [
          'Byg comps-tabeller og precedent transactions',
          'Preliminary valuation range (DCF, comps, precedents)',
          'Identificér potentielle købere (long list draft)',
          'Markedsoversigter og sektoranalyse',
        ],
        deliverables: ['Pitch Book (30–60 sider)', 'Preliminary Valuation', 'Buyer Universe Draft'],
        tip: 'Pitch book skal være fejlfrit — én formatfejl signalerer manglende disciplin.',
      },
      {
        name: 'Mandatering',
        week: 'Uge 2–4',
        duration: '2 uger',
        summary: 'Engagement letter underskrives med fee-struktur og scope',
        analyst: [
          'Assist med engagement letter-udkast',
          'Forbered project timeline og workstream-plan',
          'Opsæt intern deal-mappe og versionskontrol',
        ],
        deliverables: ['Engagement Letter', 'Project Plan', 'Internal Setup'],
        tip: 'Fee-struktur: 1–3% af EV (mid-market), 0,5–1% (large cap). Retainer + success fee.',
      },
      {
        name: 'Teaser & NDA',
        week: 'Uge 4–6',
        duration: '2 uger',
        summary: 'Anonymiseret teaser sendes til 50–100 potentielle købere',
        analyst: [
          'Byg og vedligehold buyer-listen i Excel',
          'Kontaktinfo, sektorrelevans, finansiel kapacitet',
          'Status-tracking for NDA-underskrifter',
          'Assist med 2-siders teaser-dokument',
        ],
        deliverables: ['Teaser (2 sider)', 'Buyer Long List (50–100)', 'NDA Tracker'],
        tip: 'Long list skal være minutiøst vedligeholdt — det er din "pipeline database".',
      },
      {
        name: 'Information Memorandum',
        week: 'Uge 6–12',
        duration: '6 uger',
        summary: 'Det centrale salgsdokument — 80–150 sider med fuld virksomhedspræsentation',
        analyst: [
          'Alle finansielle tabeller og grafer',
          'Underliggende model (mgmt case, base case, downside)',
          '3–5 års fremskrivning',
          'Kvalitetssikring af Fact Book (med revisor/FDD)',
          'Total konsistens mellem model og IM-narrativ',
        ],
        deliverables: ['Information Memorandum (80–150s)', 'Financial Model (3 scenarier)', 'Fact Book'],
        tip: 'IM er den mest arbejdskrævende fase internt. Fejl i IM = fejl i hele processen.',
      },
      {
        name: 'Indikative Bud (NBO)',
        week: 'Uge 12–14',
        duration: '2 uger',
        summary: 'Non-Binding Offers modtages og evalueres systematisk',
        analyst: [
          'Byg "bid comparison"-matrixer',
          'Evaluér: budstørrelse, antagelser, DD-krav, finansieringsbevis',
          'Rangér bydere og assist med shortlist-udvælgelse',
        ],
        deliverables: ['Bid Comparison Matrix', 'Shortlist Recommendation (4–8 parter)'],
        tip: 'NBO-fasen er hvor du beviser analytisk dybde. Matrixen skal være krystalklar.',
      },
      {
        name: 'Datarum & Mgmt Presentations',
        week: 'Uge 14–22',
        duration: '8 uger',
        summary: 'VDR åbnes med tusindvis af dokumenter. Short-listede købere møder ledelsen',
        analyst: [
          'Styr datarummets arkitektur og indeksering',
          'Daglig Q&A-management (48-timers response)',
          'Overvåg bydernes aktivitet i VDR',
          'Forbered back-up slides til management presentations',
          'Coach-support til ledelsen',
        ],
        deliverables: ['Virtual Data Room (Datasite/Intralinks)', 'Q&A Log', 'MP Back-up Slides'],
        tip: 'Forsinkelser i Q&A dræber deal momentum. Response-tid er din vigtigste KPI her.',
      },
      {
        name: 'Binding Bids & SPA',
        week: 'Uge 20–26',
        duration: '6 uger',
        summary: 'Finale bud med SPA-markup. Forhandling om pris, W&I, earn-out, locked box',
        analyst: [
          'Opdatér merger model med endelige budparametre',
          'Scenarieanalyse af earn-out-strukturer',
          'EV-to-Equity Bridge reconciliation',
          'NWC peg-analyse og net debt-definitioner',
        ],
        deliverables: ['Final Merger Model', 'EV-to-Equity Bridge', 'SPA Support Analysis'],
        tip: 'Definitionen af "Net Debt" og "NWC peg" er de mest forhandlede punkter — kend dem udenad.',
      },
      {
        name: 'Signing & Closing',
        week: 'Uge 24–30',
        duration: '4–8 uger',
        summary: 'SPA underskrives → regulatory approvals → closing',
        analyst: [
          'Closing conditions checklist',
          'Competition clearance-tracking',
          'Financing conditions verification',
          'Final completion statement / locked box leakage check',
        ],
        deliverables: ['Signed SPA', 'Closing Memo', 'Deal Tombstone'],
        tip: 'Mellem signing og closing: fokus skifter til interim covenants og regulatoriske approvals.',
      },
    ],
  },

  /* ─── ABB OVERNIGHT ─── */
  {
    id: 'abb',
    title: 'Accelerated Bookbuild (ABB)',
    subtitle: 'Overnight ECM-eksekvering — fra markedsluk til næste morgen',
    icon: 'zap',
    color: '#6366F1',
    phases: [
      {
        name: 'Pre-Sounding',
        week: '16:00–17:00',
        duration: '1 time',
        summary: '"Wall-Crossing" — kerneinvestorer gøres til insidere før annoncering',
        analyst: [
          'Forbered investor target-liste (50–100 konti)',
          'Wall-crossing dokumentation (MAR compliance)',
          'Shadow Book opsætning i Excel',
        ],
        deliverables: ['Investor Target List', 'Wall-Cross Documentation'],
        tip: 'Kun 5–10 kerneinvestorer wall-crosses. Handelsforbud aktiveres.',
      },
      {
        name: 'Markedet Lukker',
        week: '17:00',
        duration: '–',
        summary: 'Handel på Nasdaq Copenhagen indstilles',
        analyst: ['Bekræft lukkekurs og beregn indikativ floor price (3–7% rabat)'],
        deliverables: ['Floor Price Beregning'],
        tip: 'Floor price = lukkekurs minus 3–7% rabat. Sættes i samråd med sælger.',
      },
      {
        name: 'Launch Announcement',
        week: '17:15–17:30',
        duration: '15 min',
        summary: 'Selskabsmeddelelse publiceres — bookbuilding er igangsat',
        analyst: [
          'Kvalitetssikring af announcement-tekst',
          'Bekræft alle detaljer: sælger, antal aktier, bookrunners',
        ],
        deliverables: ['Selskabsmeddelelse (GlobeNewswire/Nasdaq)'],
        tip: 'Bogen kan lukke "at any time" — speed er alt fra dette punkt.',
      },
      {
        name: 'Bookbuilding',
        week: '17:30–22:00',
        duration: '4,5 timer',
        summary: 'Equity Sales kontakter investorer globalt. Ordrer indsamles dynamisk',
        analyst: [
          'Vedligehold Shadow Book i realtid',
          'Monitorér dækning: covered → oversubscribed',
          'Kvalitetsvurder investorer (long-only vs. fast money)',
          'Rapportér status til deal lead løbende',
        ],
        deliverables: ['Shadow Book (live)', 'Coverage Report'],
        tip: 'Mål: 1,5x–3x+ oversubscription. Hot deals kan være covered inden 20 minutter.',
      },
      {
        name: 'Pricing & Bogen Lukkes',
        week: '22:00–00:00',
        duration: '2 timer',
        summary: 'Endelig pris fastsættes. Single-price mekanisme — alle betaler ens',
        analyst: [
          'Analysér ordre-kurven og rådgiv om clearing price',
          'Beregn final pris inkl. rabat (typisk 5–10%)',
          'Forbered allokerings-regneark',
        ],
        deliverables: ['Final Pricing Memo', 'Allokerings-regneark'],
        tip: 'Prisen er en balancegang: for høj = dårligt aftermarket, for lav = sælger utilfreds.',
      },
      {
        name: 'Allokering',
        week: '00:00–06:00',
        duration: '6 timer',
        summary: 'Strategisk fordeling: long-only fonde prioriteres over hedgefonde',
        analyst: [
          'Udfør allokering (kvalitetsbaseret, ikke kun pro-rata)',
          'Kritisk QA af regnearket — kommafejl = millioner',
          'Forbered allokeringsbreve til investorer',
        ],
        deliverables: ['Final Allocation Schedule', 'Investor Notifications'],
        tip: 'Long-only pensionskasser > hedgefonde. Aftermarket-stabilitet er nøglen.',
      },
      {
        name: 'Pricing Announcement',
        week: '08:00 (T+1)',
        duration: '–',
        summary: 'Selskabsmeddelelse bekræfter pris, antal aktier og bruttoprovenu',
        analyst: [
          'Kvalitetssikring af announcement',
          'Forbered intern deal summary',
        ],
        deliverables: ['Pricing Announcement', 'Deal Summary'],
        tip: 'T+3: Settlement. Lock-up starter typisk fra denne dato.',
      },
    ],
  },

  /* ─── DUAL TRACK ─── */
  {
    id: 'dual-track',
    title: 'Dual Track Process',
    subtitle: 'M&A + IPO parallelt — maksimér exit-værdi via reelt konkurrencepres',
    icon: 'git-merge',
    color: '#D97706',
    phases: [
      {
        name: 'Kick-off & Fælles Foundation',
        week: 'Uge 0–4',
        duration: '4 uger',
        summary: 'Én central databook etableres som "single source of truth" for begge spor',
        analyst: [
          'Byg den fælles operationelle model (revenue, margin, NWC, capex)',
          'Vendor Due Diligence bestilles (financial, commercial, legal, tax, ESG)',
          'Én VDD-rapport bruges i begge spor',
        ],
        deliverables: ['Central Databook', 'Operationel Model', 'VDD Engagement'],
        tip: 'Enhver ændring i baseline skal synkroniseres på tværs af ALLE outputs.',
      },
      {
        name: 'M&A-sporet opbygges',
        week: 'Uge 4–12',
        duration: '8 uger',
        summary: 'Teaser, IM, buyer outreach — den traditionelle sell-side process',
        analyst: [
          'Tilføj LBO-lag til fælles model (gearing, debt schedule, IRR)',
          'Buyer long list og NDA-tracking',
          'Information Memorandum',
          'Datarum-forberedelse',
        ],
        deliverables: ['LBO Model', 'IM', 'Buyer Long List', 'VDR Structure'],
        tip: 'M&A-sporet er "marathonen" — 4–6 måneder fra kick-off til SPA.',
      },
      {
        name: 'ECM-sporet opbygges',
        week: 'Uge 4–16',
        duration: '12 uger',
        summary: 'Equity story, prospekt, investor-præsentation — IPO-forberedelse',
        analyst: [
          'Tilføj DCF og peer trading multiples til fælles model',
          'IPO pricing-analyse',
          'Prospektudkast (200–350 sider) — koordinér med Finanstilsynet',
          'Investor-præsentation og roadshow-materiale',
        ],
        deliverables: ['DCF Model', 'Prospektudkast', 'Investor Deck', 'Roadshow Pack'],
        tip: 'ECM-sporet er "sprinten" — bygger op til et kort, intenst bookbuilding-vindue.',
      },
      {
        name: 'Parallel Execution',
        week: 'Uge 12–20',
        duration: '8 uger',
        summary: 'Begge spor kører simultant. Ressourceallokering skifter uge for uge',
        analyst: [
          'Vedligehold begge modeller fra samme stamme',
          'Monitorér M&A-bud vs. forventet IPO-værdiansættelse',
          'Streng versionskontrol — ingen datadivergens',
          'Koordinér kommunikation (alle signaler fra ét team)',
        ],
        deliverables: ['Løbende Model Updates', 'Bid vs. IPO Valuation Comparison'],
        tip: 'Beslutningen om at prioritere ét spor træffes løbende baseret på markedsforhold og bud.',
      },
      {
        name: 'Decision Point',
        week: 'Uge 18–22',
        duration: 'Variabel',
        summary: 'Klient vælger: Accept M&A-bud ELLER lancér IPO ELLER fortsæt begge',
        analyst: [
          'Komplet sammenligning: M&A-bud vs. IPO-range',
          'Risk-adjusted value-analyse',
          'Board-præsentation med anbefaling',
        ],
        deliverables: ['Decision Memo', 'Board Presentation'],
        tip: 'Equity-agnostisk anbefaling er Danske Banks USP. Ingen silo-bias.',
      },
    ],
  },

  /* ─── LBO CAPITAL STRUCTURE ─── */
  {
    id: 'lbo-structure',
    title: 'LBO Capital Structure',
    subtitle: 'Sådan finansieres en PE-buyout — fra equity til senior debt',
    icon: 'banknote',
    color: '#DC2626',
    phases: [
      {
        name: 'Equity (PE-fond)',
        week: '30–50% af EV',
        duration: 'Permanent',
        summary: 'PE-fondens egenkapitalbidrag — bærer den højeste risiko og afkast',
        analyst: [
          'Beregn equity check baseret på target leverage',
          'IRR-sensitvitetsanalyse (base/bull/bear)',
          'Money multiple beregning (MoIC)',
        ],
        deliverables: ['Equity Check Calculation', 'IRR/MoIC Tables'],
        tip: 'PE kræver typisk 20%+ IRR. Equity-andelen er markant højere end pre-GFC (var 20–30%).',
      },
      {
        name: 'Senior Secured Term Loan',
        week: '50–60% af gæld',
        duration: '5–7 år',
        summary: 'Bankgæld med laveste rente — first-lien prioritet',
        analyst: [
          'Debt schedule med amortisering og cash sweep',
          'Covenant compliance-test (maintenance)',
          'Koordinér med DCM for term sheet',
        ],
        deliverables: ['Debt Schedule', 'Covenant Matrix'],
        tip: 'Marginal ~375 bps over reference (Q4 2025). Typisk leverage: 4,3x EBITDA senior.',
      },
      {
        name: 'Unitranche (alternativ)',
        week: 'Erstatter senior+mezz',
        duration: '6–7 år',
        summary: 'Ét instrument der kombinerer senior og mezzanine — simpelt og hurtigt',
        analyst: [
          'Sammenlign total cost vs. split senior/mezz',
          'Modelér bullet repayment (ingen amortisering)',
        ],
        deliverables: ['Unitranche vs. Split Comparison'],
        tip: 'Marginal ~450–521 bps. Populær i Norden for mid-market. Adevinta: EUR 6,5 mia.',
      },
      {
        name: 'Nordic High Yield',
        week: 'Supplement',
        duration: '5–8 år',
        summary: 'Obligationer for PE-ejede virksomheder — højere kupon, mere fleksibilitet',
        analyst: [
          'Beregn all-in cost vs. bank debt',
          'Incurrence covenant-analyse',
          'Call schedule (NC-perioder)',
        ],
        deliverables: ['HY Pricing Analysis', 'Covenant Analysis'],
        tip: 'Kupon 7–8%. Norsk lov dominerer. ~35% af nordisk HY er PE-ejet.',
      },
      {
        name: 'Revolving Credit Facility',
        week: '10–15% af gæld',
        duration: '5 år',
        summary: 'Fleksibel facilitet til working capital — trækkes og tilbagebetales løbende',
        analyst: [
          'Modelér RCF utrukket i base case',
          'Commitment fee beregning (~30–50% af marginal)',
          'Likviditetsanalyse under stress-scenarier',
        ],
        deliverables: ['RCF Model Section', 'Liquidity Analysis'],
        tip: 'RCF er et likviditetsnet, ikke permanent finansiering. Holdes typisk utrukket.',
      },
    ],
  },

  /* ─── IPO PROCESS ─── */
  {
    id: 'ipo',
    title: 'IPO Process',
    subtitle: 'Fra IPO-readiness til first day of trading (12–18 måneder)',
    icon: 'trending-up',
    color: '#16A34A',
    phases: [
      {
        name: 'IPO Readiness',
        week: 'Mdr. -18 til -12',
        duration: '6 mdr.',
        summary: 'Forbered virksomheden: IFRS, governance, ESG, IR-team',
        analyst: [
          'Gap-analyse: Main Market vs. First North krav',
          'IFRS-transition timeline',
          'ESG readiness assessment (CSRD compliance)',
          'Bestyrelses- og governance-struktur review',
        ],
        deliverables: ['IPO Readiness Report', 'Gap Analysis', 'Timeline'],
        tip: 'IR-team skal on-boardes min. 12 mdr. før notering. Data Governance er ny DD-dimension.',
      },
      {
        name: 'Equity Story & Syndikering',
        week: 'Mdr. -12 til -6',
        duration: '6 mdr.',
        summary: 'Byg investeringscase, vælg bookrunners, og start prospekt',
        analyst: [
          'Equity story-development (vækst, KPIer, ESG)',
          'Peer-analyse og implied valuation range',
          'Syndikerings-pitch til potentielle bookrunners',
          'Første prospektudkast påbegyndes',
        ],
        deliverables: ['Equity Story Deck', 'Valuation Range', 'Draft Prospectus v1'],
        tip: 'Equity story er alt. Den skal være klar, kvantificerbar og differentieret fra peers.',
      },
      {
        name: 'Prospekt & Regulatory',
        week: 'Mdr. -6 til -2',
        duration: '4 mdr.',
        summary: 'Prospekt-godkendelse via Finanstilsynet (4–5 udkast)',
        analyst: [
          '4–5 prospektudkast-iterationer',
          'Finanstilsynet-kommentarer og -respons',
          'Legal due diligence-koordinering',
          'Comfort letters fra revisorer',
        ],
        deliverables: ['Approved Prospectus (200–350s)', 'Legal Opinions', 'Comfort Letters'],
        tip: 'Prospekt-godkendelse tager 2–3 måneder. Start tidligt — det er den kritiske vej.',
      },
      {
        name: 'Pre-Marketing & Roadshow',
        week: 'Uge -4 til -1',
        duration: '3 uger',
        summary: 'Pilot fishing, investor education og 1-on-1 møder',
        analyst: [
          'Investor target-liste (200+ institutionelle)',
          'Roadshow-deck og management talking points',
          'Consensus-building med anchor investors',
          'Valuation feedback-tracking',
        ],
        deliverables: ['Roadshow Deck', 'Investor List', 'Feedback Tracker'],
        tip: 'Anchor investors (stor commitment tidligt) er afgørende for momentum i bookbuilding.',
      },
      {
        name: 'Bookbuilding & Pricing',
        week: 'Uge -1 til 0',
        duration: '5–10 dage',
        summary: 'Ordrebog opbygges, pris fastsættes, aktier allokeres',
        analyst: [
          'Shadow book management',
          'Pris-range narrowing baseret på demand',
          'Allokering (kvalitetsbaseret)',
          'First day trading preparation',
        ],
        deliverables: ['Final Pricing', 'Allocation Schedule', 'First Day Announcement'],
        tip: 'IPO-rabat typisk 10–15% vs. fair value. Sikrer positiv first-day performance.',
      },
    ],
  },
];


/* ──────────────────────────────────────────────
   RENDER FLOWS VIEW
────────────────────────────────────────────── */
function renderFlows() {
  const main = document.getElementById('flows-main');
  if (!main) return;

  main.innerHTML = `
    <div class="flows-hero">
      <h1 class="flows-hero-title">Process Flows</h1>
      <p class="flows-hero-sub">Interaktive visuelle guides til de vigtigste IB-processer. Klik for at udforske.</p>
    </div>
    <div class="flows-grid" id="flows-grid"></div>
    <div class="flow-detail" id="flow-detail" style="display:none"></div>
  `;

  const grid = document.getElementById('flows-grid');
  PROCESS_FLOWS.forEach(flow => {
    const card = document.createElement('div');
    card.className = 'flow-card';
    card.style.setProperty('--flow-color', flow.color);
    card.onclick = () => openFlow(flow.id);
    card.innerHTML = `
      <div class="flow-card-icon"><i data-lucide="${flow.icon}" width="24" height="24"></i></div>
      <div class="flow-card-body">
        <div class="flow-card-title">${flow.title}</div>
        <div class="flow-card-sub">${flow.subtitle}</div>
        <div class="flow-card-meta">${flow.phases.length} faser</div>
      </div>
      <div class="flow-card-arrow"><i data-lucide="chevron-right" width="20" height="20"></i></div>
    `;
    grid.appendChild(card);
  });

  lucide.createIcons();
}

function openFlow(flowId) {
  const flow = PROCESS_FLOWS.find(f => f.id === flowId);
  if (!flow) return;

  const grid = document.getElementById('flows-grid');
  const detail = document.getElementById('flow-detail');
  grid.style.display = 'none';
  detail.style.display = '';

  detail.innerHTML = `
    <button class="flow-back-btn" onclick="closeFlow()">
      <i data-lucide="arrow-left" width="16" height="16"></i> Alle processer
    </button>
    <div class="flow-header" style="--flow-color:${flow.color}">
      <div class="flow-header-icon"><i data-lucide="${flow.icon}" width="28" height="28"></i></div>
      <div>
        <h2 class="flow-header-title">${flow.title}</h2>
        <p class="flow-header-sub">${flow.subtitle}</p>
      </div>
    </div>
    <div class="flow-timeline">
      ${flow.phases.map((phase, i) => `
        <div class="flow-phase" style="--flow-color:${flow.color}" onclick="togglePhase(this)">
          <div class="flow-phase-connector">
            <div class="flow-phase-dot">${i + 1}</div>
            ${i < flow.phases.length - 1 ? '<div class="flow-phase-line"></div>' : ''}
          </div>
          <div class="flow-phase-card">
            <div class="flow-phase-top">
              <div>
                <div class="flow-phase-name">${phase.name}</div>
                <div class="flow-phase-timing">
                  <span class="flow-pill">${phase.week}</span>
                  ${phase.duration !== '–' ? `<span class="flow-pill flow-pill-dur">${phase.duration}</span>` : ''}
                </div>
              </div>
              <div class="flow-phase-chevron"><i data-lucide="chevron-down" width="18" height="18"></i></div>
            </div>
            <div class="flow-phase-summary">${phase.summary}</div>
            <div class="flow-phase-expand">
              <div class="flow-phase-section">
                <div class="flow-phase-section-title"><i data-lucide="user" width="14" height="14"></i> Analyst-opgaver</div>
                <ul class="flow-phase-list">
                  ${phase.analyst.map(t => `<li>${t}</li>`).join('')}
                </ul>
              </div>
              <div class="flow-phase-section">
                <div class="flow-phase-section-title"><i data-lucide="file-output" width="14" height="14"></i> Deliverables</div>
                <div class="flow-phase-tags">
                  ${phase.deliverables.map(d => `<span class="flow-del-tag">${d}</span>`).join('')}
                </div>
              </div>
              <div class="flow-phase-tip">
                <i data-lucide="lightbulb" width="14" height="14"></i>
                <span>${phase.tip}</span>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  lucide.createIcons();
}

function closeFlow() {
  document.getElementById('flows-grid').style.display = '';
  document.getElementById('flow-detail').style.display = 'none';
}

function togglePhase(el) {
  el.classList.toggle('expanded');
}
