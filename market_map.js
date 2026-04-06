'use strict';
/* ════════════════════════════════════════════════
   Market Map — Financial Ecosystem around Danske Bank IB
   Visual overview of competitors, PE sponsors & key clients
════════════════════════════════════════════════ */

const MARKET_MAP = {
  competitors: {
    title: 'Rådgivere & Konkurrenter',
    subtitle: 'Banker DB samarbejder med — eller konkurrerer mod',
    icon: 'swords',
    color: '#DC2626',
    entities: [
      { name:'DC Advisory',         domain:'dcadvisory.com',       tag:'DB\'s faste cross-border M&A-partner. Daiwa Securities. 500+ i 21 kontorer. Joint FA på Molslinjen, ForSea m.fl.' },
      { name:'Morgan Stanley',      domain:'morganstanley.com',    tag:'Co-lead på Tryg DKK 37 mia & Ørsted DKK 60 mia. Global bulge bracket.' },
      { name:'J.P. Morgan',         domain:'jpmorgan.com',         tag:'Co-lead på Ørsted DKK 60 mia. Verdens største IB measured by fees.' },
      { name:'Goldman Sachs',       domain:'goldmansachs.com',     tag:'Co-lead Zealand Pharma ABB. Gordon Dyal (GS spin-off) lead FA Novozymes/Chr. Hansen.' },
      { name:'Citigroup',           domain:'citigroup.com',        tag:'Joint FA m. DB på Svitzer demerger & APMH/Concentric SEK 8,6 mia.' },
      { name:'BNP Paribas',         domain:'bnpparibas.com',       tag:'Co-lead Ørsted DKK 60 mia. Stærk European DCM/ECM franchise.' },
      { name:'Jefferies',           domain:'jefferies.com',        tag:'Co-lead Coloplast DKK 9,2 mia (Sole GC=DB), Better Collective, Zealand. Mid-cap specialist.' },
      { name:'Nordea',              domain:'nordea.com',           tag:'Største nordiske rival. Joint FA Novozymes/Chr. Hansen. Co-lead mange danske ECM deals.' },
      { name:'Carnegie',            domain:'carnegie.se',          tag:'Nordisk M&A/ECM boutique. Direkte konkurrent i mid-market. Flere DB-folk er tidl. Carnegie.' },
      { name:'SEB',                 domain:'seb.se',               tag:'Nordisk universal bank. Sole GC Röko IPO (DB som JBR). Atilla, Knaack & Ulrik = tidl. SEB.' },
      { name:'ABG Sundal Collier',  domain:'abgsc.com',            tag:'Nordisk niche-IB. Konkurrent i mid-cap ECM/M&A. Mangler cross-border reach vs DB+DC.' },
    ]
  },
  pe_sponsors: {
    title: 'PE & Financial Sponsors',
    subtitle: 'Fonde der køber/sælger — og genererer deal flow for DB',
    icon: 'building-2',
    color: '#7C3AED',
    entities: [
      { name:'EQT',                  domain:'eqtgroup.com',        tag:'Nordens største PE. Køber Molslinjen + ForSea. DB joint FA på begge (m. DC Advisory).' },
      { name:'CVC Capital Partners',  domain:'cvc.com',            tag:'Igangværende konsortium-tilbud WithSecure EUR 299m (FI). Global mega-fund.' },
      { name:'Summa Equity',         domain:'summaequity.com',     tag:'Køber Fortum recycling EUR 800m. Nordisk impact-PE med sustainability-fokus.' },
      { name:'A&M Capital Europe',   domain:'amcapitaleurope.com', tag:'Køber STOK Emballage (AMCE Fund I). DB exclusive FA sell-side.' },
      { name:'InfraVia / Blue Phoenix', domain:'bluephoenixgroup.com', tag:'RGS Nordic opkøb (DB exclusive FA buy-side). Meldgaard IBA-forretning.' },
      { name:'Patrizia SE',          domain:'patrizia.ag',         tag:'Køber Statkraft Varme NOK 3,6 mia (m. Nordic Infrastructure AG). DB exclusive FA.' },
      { name:'Waterland PE',         domain:'waterlandpe.com',     tag:'Hollandsk mid-market PE. Frederik Emil Haven (DB analyst) tidl. Waterland student analyst.' },
      { name:'VIA Equity',           domain:'viaequity.dk',        tag:'Dansk mid-market PE. Køber Saarni Cloud fra FI. DB FA.' },
      { name:'Axcel',                domain:'axcel.dk',            tag:'Dansk mid-market PE. Typisk sell-side/buy-side deal generator i DK-markedet.' },
      { name:'Nordic Capital',       domain:'nordiccapital.com',   tag:'Nordisk large-cap PE. Tech, healthcare, financial services fokus.' },
    ]
  },
  key_clients: {
    title: 'Nøgleklienter & Targets',
    subtitle: 'Selskaber med gentagne DB-mandater eller landmark deals',
    icon: 'star',
    color: '#0057B8',
    entities: [
      { name:'A.P. Møller Holding',  domain:'apmollerholding.com', tag:'DB\'s vigtigste repeat-klient. 4+ mandater: Svitzer demerger, Svitzer take-private DKK 9 mia, Concentric SEK 8,6 mia.' },
      { name:'Ørsted',               domain:'orsted.com',          tag:'DKK 60 mia. fortegningsemission — Nordens største ECM nogensinde. DB som eneste nordiske JGC.' },
      { name:'DSV',                  domain:'dsv.com',             tag:'DKK 37,3 mia. ABB — Skandinaviens største. DB JBR. (Lukas Hvidkjær tidl. DSV M&A).' },
      { name:'Novozymes (Novonesis)',domain:'novonesis.com',       tag:'DKK 80,7 mia. fusion m. Chr. Hansen — DK\'s største virksomhedsfusion. DB joint FA.' },
      { name:'Tryg',                 domain:'tryg.dk',             tag:'DKK 37 mia. fortegningsemission til RSA-opkøb. DB JGC m. Morgan Stanley.' },
      { name:'Coloplast',            domain:'coloplast.com',       tag:'DKK 9,2 mia. directed issue. DB Sole GC (prestige-rolle). Kerecis wound care-opkøb.' },
      { name:'Pandora',              domain:'pandora.com',         tag:'DKK 1,8 mia. ABB (7x overtegnet!) + DKK 5 mia. tilbagekøb. Maria Malmborg tidl. Pandora.' },
      { name:'Better Collective',    domain:'bettercollective.com',tag:'Dual listing Sthlm→CPH + DKK 1,08 mia. ABB til 0% rabat. DB JGC begge.' },
      { name:'GN Store Nord',        domain:'gn.com',              tag:'DKK 2,75 mia. directed issue & private placing. DB JGC. Hearing + Gaming.' },
      { name:'Zealand Pharma',       domain:'zealandpharma.com',   tag:'DKK 1,5 mia. ABB. DB JGC m. Goldman Sachs, Jefferies, Nordea.' },
      { name:'Vestas',               domain:'vestas.com',          tag:'DKK 746 mio. aktietilbagekøbsprogram. DB Lead Manager. Verdens største vindmølleproducent.' },
    ]
  }
};

/* ────────────────────────────────────────────── */
function renderMarketMap() {
  const main = document.getElementById('market-map-main');
  if (!main) return;

  main.innerHTML = `
    <div class="mm-hero">
      <h1 class="mm-hero-title">Market Map</h1>
      <p class="mm-hero-sub">Finansielt økosystem omkring Danske Bank IB — konkurrenter, PE-fonde og nøgleklienter.</p>
    </div>
    ${['competitors','pe_sponsors','key_clients'].map(key => {
      const cat = MARKET_MAP[key];
      return `
        <section class="mm-section" style="--mm-color:${cat.color}">
          <div class="mm-section-header">
            <div class="mm-section-icon" style="background:color-mix(in srgb, ${cat.color} 12%, transparent)">
              <i data-lucide="${cat.icon}" width="20" height="20" style="color:${cat.color}"></i>
            </div>
            <div>
              <h2 class="mm-section-title">${cat.title}</h2>
              <p class="mm-section-sub">${cat.subtitle}</p>
            </div>
            <span class="mm-count">${cat.entities.length}</span>
          </div>
          <div class="mm-grid">
            ${cat.entities.map(e => `
              <div class="mm-card">
                <div class="mm-card-top">
                  <div class="mm-logo-wrap">
                    <img src="${typeof logoUrl === 'function' ? logoUrl(e.domain, 64) : ''}"
                         alt="${e.name}"
                         class="mm-logo"
                         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
                    <div class="mm-logo-fallback" style="display:none;background:${cat.color}">${e.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                  </div>
                  <strong class="mm-name">${e.name}</strong>
                </div>
                <p class="mm-tag">${e.tag}</p>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }).join('')}
  `;

  if (typeof lucide !== 'undefined') lucide.createIcons();
}
