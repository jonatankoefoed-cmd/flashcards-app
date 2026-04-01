const COMPANY_MARKET_DATA = {
  'Novo Nordisk': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'36,5x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'25,3x', metricWhy:'Markedet kigger primært på earnings-power og quality growth.', peerComp:{ vs:'Eli Lilly', status:'rabat', multiple:'44,2x' } },
  'DSV': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'17,3x', secondaryMetricLabel:'EV/Sales', secondaryMetricValue:'1,8x', metricWhy:'For DSV er execution og cash conversion vigtigere end en simpel asset-base-metrik.', peerComp:{ vs:'K+N', status:'praemie', multiple:'15,5x' } },
  'Danske Bank': { primaryMetricLabel:'P/B', primaryMetricValue:'0,95x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'7,2x', metricWhy:'Banker vurderes primært på indtjening ift. egenkapital (P/B og ROE).', peerComp:{ vs:'Nordea', status:'rabat', multiple:'1,1x' } },
  'A.P. Møller - Mærsk': { primaryMetricLabel:'Trailing P/E', primaryMetricValue:'14,6x', secondaryMetricLabel:'P/B', secondaryMetricValue:'0,69x', metricWhy:'For stærkt cykliske rederier er bogført værdi og mid-cycle earnings ofte mere relevante end forward P/E alene.', peerComp:{ vs:'Hapag-Lloyd', status:'par', multiple:'0,75x' } },
  'Ørsted': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'16,3x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'9,8x', metricWhy:'Ørsted handles på kombinationen af project economics, kapitalintensitet og utility-lignende cash flow.', peerComp:{ vs:'RWE', status:'praemie', multiple:'8,5x' } },
  'Vestas': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'15,6x', secondaryMetricLabel:'EV/Sales', secondaryMetricValue:'8,7x', metricWhy:'Hardware-marginer er volatile, så sales- og forward earnings-lens bruges ofte sammen.', peerComp:{ vs:'Siemens Gamesa', status:'praemie', multiple:'N/A' } },
  'Novonesis': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'21,0x', secondaryMetricLabel:'P/B', secondaryMetricValue:'2,1x', metricWhy:'Fusionen og accounting-støj gør forward earnings mere brugbar end rå EV/EBITDA i øjeblikket.', peerComp:{ vs:'DSM-Firmenich', status:'par', multiple:'20,5x' } },
  'Carlsberg': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'11,2x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'9,7x', metricWhy:'Bryggerier vurderes ofte på en kombination af earnings, cash flow og stabil brandfranchise.', peerComp:{ vs:'Heineken', status:'rabat', multiple:'14,0x' } },
  'Genmab': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'15,2x', secondaryMetricLabel:'P/B', secondaryMetricValue:'2,71x', metricWhy:'Royalty- og pipelinecases bliver ofte værdisat via earnings plus balance-sheet quality.', peerComp:{ vs:'argenx', status:'par', multiple:'N/A' } },
  'Coloplast': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'15,8x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'14,0x', metricWhy:'Coloplast vurderes som et defensivt quality medtech-navn med stærke marginer.', peerComp:{ vs:'Convatec', status:'praemie', multiple:'12,5x' } },
  'Tryg': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'14,9x', secondaryMetricLabel:'P/B', secondaryMetricValue:'2,41x', metricWhy:'Forsikring bør læses gennem underwriting-kvalitet, P/B og earnings snarere end EV/EBITDA.', peerComp:{ vs:'Sampo', status:'praemie', multiple:'13,5x' } },
  'Ascendis Pharma': { primaryMetricLabel:'EV/Sales', primaryMetricValue:'7,5x', secondaryMetricLabel:'P/B', secondaryMetricValue:'10,2x', metricWhy:'Tidlig kommercialisering gør P/E mindre relevant vs toplinje vækst.', peerComp:{ vs:'BioMarin', status:'praemie', multiple:'4,5x' } },
  'Jyske Bank': { primaryMetricLabel:'P/B', primaryMetricValue:'0,85x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'6,8x', metricWhy:'Banker vurderes på P/B i relation til normaliseret ROE.', peerComp:{ vs:'Sydbank', status:'par', multiple:'0,90x' } },
  'Copenhagen Airport': { primaryMetricLabel:'EV/EBITDA', primaryMetricValue:'12,5x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'18,4x', metricWhy:'Lufthavne er tunge anlægsaktiver, så EV/EBITDA er standard for peers.', peerComp:{ vs:'Fraport', status:'praemie', multiple:'7,8x' } },
  'NKT': { primaryMetricLabel:'EV/EBITDA', primaryMetricValue:'14,2x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'22,0x', metricWhy:'Drevet af høje ordrebøger og turn-around, kigger markedet fremad på indtjening.', peerComp:{ vs:'Prysmian', status:'praemie', multiple:'11,2x' } },
  'Sydbank': { primaryMetricLabel:'P/B', primaryMetricValue:'0,90x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'7,0x', metricWhy:'Regional bank hvor P/B og kapitaludlodning er nøglen.', peerComp:{ vs:'Jyske Bank', status:'par', multiple:'0,85x' } },
  'ALK-Abelló': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'25,4x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'16,5x', metricWhy:'Vækstselskab inden for allergi, EV er justeret for langsigtede pipeline muligheder.', peerComp:{ vs:'Stallergenes', status:'praemie', multiple:'12,0x' } },
  'Demant': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'12,5x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'12,5x', metricWhy:'Demant er et klassisk medtech-navn hvor både earnings og operating margin kvalitet betyder meget.', peerComp:{ vs:'Sonova', status:'rabat', multiple:'18,5x' } },
  'Lundbeck': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'8,5x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'4,9x', metricWhy:'CNS-specialist som trades med rabat pga. pipeline risiko.', peerComp:{ vs:'UCB', status:'rabat', multiple:'16,5x' } },
  'Rockwool': { primaryMetricLabel:'EV/EBITDA', primaryMetricValue:'6,8x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'11,5x', metricWhy:'Industriselskab følsomt for byggeaktivitet og energipriser.', peerComp:{ vs:'Kingspan', status:'rabat', multiple:'14,5x' } },
  'ISS': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'10,8x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'11,7x', metricWhy:'ISS skal læses via margin recovery, cash conversion og kontraktkvalitet.', peerComp:{ vs:'Compass', status:'rabat', multiple:'22,5x' } },
  'Ringkjøbing Landbobank': { primaryMetricLabel:'P/B', primaryMetricValue:'2,1x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'10,4x', metricWhy:'Danmarks bedst drevne bank målt på omkostninger, hvilket giver meget høj P/B.', peerComp:{ vs:'Nordea', status:'praemie', multiple:'1,1x' } },
  'Pandora': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'11,0x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'5,3x', metricWhy:'Retail-casen balancerer earnings-power, brandstyrke og cash returns.', peerComp:{ vs:'Richemont', status:'rabat', multiple:'16,8x' } },
  'FLSmidth': { primaryMetricLabel:'EV/EBITDA', primaryMetricValue:'7,5x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'11,2x', metricWhy:'Mining og cement udstyr, konjunkturfølsom og tung på anlæg.', peerComp:{ vs:'Metso Outotec', status:'rabat', multiple:'9,0x' } },
  'Royal Unibrew': { primaryMetricLabel:'EV/EBITDA', primaryMetricValue:'12,8x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'18,5x', metricWhy:'Premium bryggeri der vokser via M&A.', peerComp:{ vs:'Carlsberg', status:'praemie', multiple:'11,2x' } },
  'Alm. Brand': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'8,5x', secondaryMetricLabel:'P/B', secondaryMetricValue:'1,8x', metricWhy:'Dansk skadesforsikring efter opkøb af Codan.', peerComp:{ vs:'Tryg', status:'rabat', multiple:'14,9x' } },
  'Zealand Pharma': { primaryMetricLabel:'EV/Sales', primaryMetricValue:'54,2x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'N/A', metricWhy:'Fedmemarkedspipeline gør det til handlet på potentiale snarere end nuværende bundlinje.', peerComp:{ vs:'Viking Therapeutics', status:'rabat', multiple:'71,0x' } },
  'Ambu': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'20,6x', secondaryMetricLabel:'EV/Sales', secondaryMetricValue:'3,0x', metricWhy:'For growth-medtech er adoption og topline-kvalitet stadig en stor del af valuation-lensen.', peerComp:{ vs:'Olympus', status:'praemie', multiple:'18,4x' } },
  'Bakkafrost': { primaryMetricLabel:'EV/EBITDA', primaryMetricValue:'11,5x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'15,4x', metricWhy:'Lakseopdræt værdiansættes via biologisk formåen og licenser.', peerComp:{ vs:'Mowi', status:'praemie', multiple:'9,5x' } },
  'Netcompany': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'16,5x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'12,2x', metricWhy:'IT-services hvor vækst, timepriser og margin afgør P/E.', peerComp:{ vs:'Bouygues / Sopra Steria', status:'praemie', multiple:'10,5x' } },
  'Cadeler': { primaryMetricLabel:'EV/EBITDA', primaryMetricValue:'9,5x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'12,4x', metricWhy:'Offshore vind installation skoles efter flådestørrelse og dagrater.', peerComp:{ vs:'Eneti / Seaway', status:'praemie', multiple:'7,5x' } },
  'Bavarian Nordic': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'14,2x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'10,5x', metricWhy:'Vaccine scale-up, afhængig af udbud/efterspørgsel på epidemier.', peerComp:{ vs:'GSK', status:'praemie', multiple:'9,8x' } },
  'Schouw & Co.': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'10,4x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'7,1x', metricWhy:'Industrielt konglomerat handles ofte til "conglomerate discount".', peerComp:{ vs:'Industrivärden', status:'par', multiple:'11,0x' } },
  'GN Store Nord': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'11,8x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'8,5x', metricWhy:'Turnaround i Audio og Hearing; høj gældssætning trækker multipler ned.', peerComp:{ vs:'Demant', status:'rabat', multiple:'12,5x' } },
  'Per Aarsleff': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'8,8x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'4,5x', metricWhy:'Entreprenørbranchen handles altid til lave multipler pga. cyklisk usikkerhed og lav margin.', peerComp:{ vs:'MT Højgaard', status:'praemie', multiple:'6,5x' } },
  'Jeudan': { primaryMetricLabel:'P/NAV', primaryMetricValue:'0,85x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'18,5x', metricWhy:'Ejendomsselskaber vurderes bedst på substansværdi (NAV).', peerComp:{ vs:'Castellum', status:'par', multiple:'0,80x' } },
  'D/S Norden': { primaryMetricLabel:'P/NAV', primaryMetricValue:'0,90x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'6,5x', metricWhy:'Tørlast er ekstremt volatile, så asset backing er et key metric.', peerComp:{ vs:'Golden Ocean', status:'par', multiple:'7,0x' } },
  'Trustpilot': { primaryMetricLabel:'EV/Sales', primaryMetricValue:'3,2x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'35,0x', metricWhy:'SaaS / Platform-tech scales primært på Rule of 40 og topline metrics.', peerComp:{ vs:'Yelp', status:'praemie', multiple:'2,1x' } },
  'DFDS': { primaryMetricLabel:'EV/EBITDA', primaryMetricValue:'5,6x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'7,5x', metricWhy:'Færgedrift og logistik; stor asset base kræver fokus på cash flow og EBITDA.', peerComp:{ vs:'Finnlines', status:'par', multiple:'6,0x' } },
  'Better Collective': { primaryMetricLabel:'EV/EBITDA', primaryMetricValue:'8,5x', secondaryMetricLabel:'Fwd P/E', secondaryMetricValue:'12,5x', metricWhy:'Affiliate marketing, vækst og M&A afgør prissætning.', peerComp:{ vs:'Catena Media', status:'praemie', multiple:'5,0x' } },
  'Scandinavian Tobacco Group': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'7,2x', secondaryMetricLabel:'Dividend Yield', secondaryMetricValue:'7,5%', metricWhy:'Low-growth tobacco focusserer på pure cash flow extraction.', peerComp:{ vs:'Swedish Match', status:'rabat', multiple:'20,0x' } },
  'ChemoMetec': { primaryMetricLabel:'Fwd P/E', primaryMetricValue:'45,0x', secondaryMetricLabel:'EV/EBITDA', secondaryMetricValue:'30,5x', metricWhy:'Medtech vækststjerne, prissat via ekstrem life-science potentiale.', peerComp:{ vs:'Sartorius', status:'praemie', multiple:'35,0x' } }
};

const COMPANY_CARDS = [
  {
    name:'Novo Nordisk', ticker:'NVO', domain:'novonordisk.com', sector:'Pharma', industry:'GLP-1 / diabetes',
    frontClues:['Sælger de indsprøjtninger til diabetes og vægttab, som hele verden efterspørger?','Kæmper de en indædt kamp mod rivalen Eli Lilly om dominans på fedmemarkedet?','Er deres overskudsgrad og evne til at skabe kontanter nærmest uset høj i Danmark?'],
    what:'De opfinder, producerer og sælger medicin – især mod diabetes og svær overvægt (Wegovy og Ozempic). Det er kerneforretningen skåret helt ind til benet.',
    valuation:'Premium P/E', avgMcap12mDkkBn:2800.0, dkRankText:'Danmarks største selskab målt på market cap (#1).',
    whyTrades:'Markedet betaler for høj vækst, stærk profitabilitet og usædvanlig cash conversion.', peerValuation: 'Modsat Roche, der handler lavere, dyster Novo kun med Eli Lilly i duopolet.', drivers:'FDA-labels, produktion, reimbursement, pipeline.', challenge:'At fastholde udbud.', peers:['Eli Lilly','AstraZeneca','Roche'], whyKnow:'Referencecase for pharma.'
  },
  {
    name:'DSV', ticker:'DSV', domain:'dsv.com', sector:'Transport & Logistics', industry:'Freight forwarding',
    frontClues:['Er det et dansk logistik-selskab, der ikke selv ejer særlig mange lastbiler eller skibe?','Er de kendt i hele verden for at opkøbe konkurrenter (som Schenker) og lynhurtigt trimme dem?','Fokuserer investorerne på deres evne til at holde omkostningerne nede i et usikkert fragtmarked?'],
    what:'De ejer ikke skibe eller fly. Deres forretning er at være mellemmand (speditør), der køber plads hos rederier og sælger med merpris.',
    valuation:'Premium EV/EBITDA', avgMcap12mDkkBn:354.5, dkRankText:'Danmarks 2. største selskab målt på market cap.',
    whyTrades:'DSV får premium for høj ROIC, stærk cash conversion og en dominerende M&A-model.', peerValuation:'K+N er den største rival, DSV handler ofte til premium pga stærkere margins.', drivers:'Fragtrater, integration af opkøb (Schenker).', challenge:'Makro.', peers:['Kuehne+Nagel','DHL'], whyKnow:'Globale mestre i M&A.'
  },
  {
    name:'Danske Bank', ticker:'DANS.VI', domain:'danskebank.dk', sector:'Financials', industry:'Banking',
    frontClues:['Er det Danmarks ubestridt største bank målt på udlån og balance?','Har de haft en enorm recovery-rejse siden hvidvasksagen i Estland?','Er de en hjørnesten i det danske realkreditsystem, bl.a. via Realkredit Danmark?'],
    what:'Full-service bank for både privatkunder, store virksomheder og institutionelle kunder. Ejer Realkredit Danmark.',
    valuation:'P/B & P/E', avgMcap12mDkkBn:280.0, dkRankText:'Danmarks 3. største selskab målt på market cap.',
    whyTrades:'Nøgletallene P/B og egenkapitalforretning (ROE) driver kursen for danske banker.', peerValuation:'Ligger oftest med en lille rabat til de svenske storbanker pga lavere historisk ROE.', drivers:'Renter, udlånsvækst, gebyrindlæg og udbyttebetalinger.', challenge:'At fastholde omkostningsfokus.', peers:['Nordea','Jyske Bank'], whyKnow:'Uundgåelig finans-dino.'
  },
  {
    name:'A.P. Møller - Mærsk', ticker:'MAERSK-B.CO', domain:'maersk.com', sector:'Shipping & Logistics', industry:'Container shipping',
    frontClues:['Er det et ikonisk dansk rederi med lyseblå containere i stakket i hele verden?','Skaber globale forsynings-problemer og krige ofte gigantiske profitter for dem?','Forsøger de i disse år at blive en integreret "end-to-end" logistikpartner, ala DSV?'],
    what:'De sejler globale containerfragtskibe og ejer havneterminaler (APM Terminals). Deres nye strategi er at vokse i landbaseret logistik.',
    valuation:'P/B & Cyklisk P/E', avgMcap12mDkkBn:250.0, dkRankText:'Danmarks 4. største selskab målt på market cap.',
    whyTrades:'Vækst drives næsten 1:1 af globale fragtrater, SCFI og geopolitik. Derfor er earnings usikre, og man kigger meget på book value.', peerValuation:'På par med Hapag-Lloyd, men ofte rabat hvis land-strategien koster cash.', drivers:'Kina-eksport, Rødehavskonflikter.', challenge:'At konvertere shipping-profitter.', peers:['Hapag-Lloyd','MSC'], whyKnow:'Børskæmpe med global puls.'
  },
  {
    name:'Ørsted', ticker:'ORSTED.CO', domain:'orsted.com', sector:'Energy / Utilities', industry:'Offshore Wind',
    frontClues:['Var de engang kendt som DONG Energy og drevet af kul?','Er de i dag verdens største udvikler af havvindmølleparker?','Har de for nyligt oplevet kæmpe milliardnedskrivninger i USA pga. rente- og inflationschok?'],
    what:'Udvikler, opfører og driver grønne energianlæg – kronjuvelen er deres enorme havvindmølleparker globalt.',
    valuation:'Fwd P/E & EV/EBITDA', avgMcap12mDkkBn:220.0, dkRankText:'Danmarks 5. største selskab målt på market cap.',
    whyTrades:'Prissættes i høj grad på deres project pipeline (IRR vs WACC) og evne til at fastholde støtte (subsidy regimes).', peerValuation:'Handler dyrere end RWE pga ren vind-play uden fossile lig.', drivers:'Renter, afregningspriser for strøm, forsyningskæder.', challenge:'At styre CAPEX budgetter.', peers:['RWE','Equinor'], whyKnow:'Grøn spydspids.'
  },
  {
    name:'Vestas', ticker:'VWS.CO', domain:'vestas.com', sector:'Industrials', industry:'Wind Turbines',
    frontClues:['Er det verdens største producent af vindmøller (hardware)?','Bliver deres overskud ofte presset af høje stålpriser og "supply chain" problemer?','Har de udover selve møllerne en gigantisk og meget profitabel service-forretning?'],
    what:'De designer, fremstiller, installerer og servicerer vindmøller på land og til havs globalt.',
    valuation:'EV/Sales & Fwd P/E', avgMcap12mDkkBn:200.0, dkRankText:'Danmarks 6. største selskab målt på market cap.',
    whyTrades:'Turn-around historie. Markedet holder øje med ordreindgang, priser (ASP) og margin recovery fra dyre år.', peerValuation:'Stor præmie over Siemens Gamesa, som har kæmpet med massive turbinedefekter.', drivers:'Grøn transition, materialepriser.', challenge:'At levere positive marginer stabilt.', peers:['Siemens Energy','GE Vernova'], whyKnow:'C25 industrifyrtårn.'
  },
  {
    name:'Novonesis', ticker:'NZYM.VI', domain:'novonesis.com', sector:'Materials', industry:'Bio-solutions / Enzymes',
    frontClues:['Er det en gigantisk fusion af Novozymes og Chr. Hansen?','Producerer de enzymer og mælkesyrebakterier til alt fra vaskepulver til yoghurt?','Bryster de sig af at være verdensmestre i bio-løsninger?'],
    what:'Skabt via fusion, fremstiller biologiske løsninger (mikrober, enzymer) til mad, landbrug, vaskemidler og sundhed.',
    valuation:'Fwd P/E', avgMcap12mDkkBn:195.0, dkRankText:'Danmarks 7. største selskab målt på market cap.',
    whyTrades:'Stabil earnings og markedsdominans indenfor "biosolutions" giver dem langvarige forsvarsværker mod cykler.', peerValuation:'På niveau med globale rivaler som DSM, forventer synergier.', drivers:'Fusion synergier, grøn regulering.', challenge:'At bevise M&A casen.', peers:['DSM-Firmenich'], whyKnow:'Global ingrediens-boss.'
  },
  {
    name:'Carlsberg', ticker:'CARL-B.CO', domain:'carlsberggroup.com', sector:'Consumer Staples', industry:'Brewing',
    frontClues:['Er det Danmarks ikoniske bryggeri med historiske rødder i Valby?','Har de meget stor eksponering mod Asien, særligt Kina og Vietnam, som vækstmotorer?','Stiller de det famøse "Probably the best beer in the world"-slogan?'],
    what:'De har en bred portefølje af øl og beverage-brands, fra Tuborg og Carlsberg til lokale markedsledere globalt.',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:120.0, dkRankText:'Danmarks 8. største selskab målt på market cap.',
    whyTrades:'Defensivt konsum. Man køber pricing power og cash flows.', peerValuation:'Typisk rabat til Heineken pga brand portfolio.', drivers:'Asien-vækst, opkøb af f.eks. Britvic.', challenge:'Volumen-pres.', peers:['Heineken','AB InBev'], whyKnow:'M&A i drikkevarer.'
  },
  {
    name:'Genmab', ticker:'GMAB', domain:'genmab.com', sector:'Health Care', industry:'Biotech',
    frontClues:['Er de eksperter i monoklonale antistoffer til behandling af kræft?','Bliver deres største lægemiddel, Darzalex, solgt i et enormt globalt partnerskab med J&J?','Blev deres aktie straffet fordi patenterne for deres guldæg snart udløber?'],
    what:'Opfinder og udvikler kræftmedicin. Stærkeste platform danner grundlag for Darzalex og royalties udgør overskuddet.',
    valuation:'Fwd P/E', avgMcap12mDkkBn:115.0, dkRankText:'Danmarks 9. største selskab målt på market cap.',
    whyTrades:'Værdiat fra pipeline og afhængighed af peak-sales for nuværende produkter (patent-klippe).', peerValuation:'Fairly priced vs argenx', drivers:'Pipeline resultater, royalty checks.', challenge:'At levere den næste blockbuster.', peers:['argenx','Gilead'], whyKnow:'Største danske rene biotech.'
  },
  {
    name:'Coloplast', ticker:'COLO-B.CO', domain:'coloplast.com', sector:'Health Care', industry:'Medical Devices',
    frontClues:['Producerer de primært intim-medikoteknik som stomi- og kateter-produkter?','Er de kendt for ekstremt tunge profit- og overskudsgrader der sjældent svinger?','Bygger de massive loyalitetsbånd til slutbrugeren, frem for kun at sælge til hospitaler?'],
    what:'Medtech-virksomhed dedikeret til urologi, kontinens og stomi. Høj-margin engangsprodukter til tabubelagte lidelser.',
    valuation:'Premium Fwd P/E', avgMcap12mDkkBn:108.0, dkRankText:'Danmarks 10. største selskab målt på market cap.',
    whyTrades:'Quality compounder. Fantastiske margins og sticky end-user base.', peerValuation:'Kæmpe præmie vs Convatec pga overlegen operationel drift.', drivers:'US vækst, Wound Care turnaround.', challenge:'At forsvare profit marginer i M&A.', peers:['Convatec','Hollister'], whyKnow:'Defensivt drømme-asset.'
  },
  {
    name:'Tryg', ticker:'TRYG.CO', domain:'tryg.com', sector:'Financials', industry:'Insurance',
    frontClues:['Er det Nordens største skadesforsikringsselskab, der ejer mærker som Alka og Tryg?','Er deres forretning drevet af lav "combined ratio" – de tjener boksen på præmierne?','Konkurrerer de tæt med bl.a. finske Sampo (som ejer If)?'],
    what:'Sælger skadesforsikringer til private og erhverv i Norden. Lav risiko og stabile præmie-indtægter.',
    valuation:'P/E & P/B', avgMcap12mDkkBn:100.0, dkRankText:'Danmarks 11. største selskab målt på market cap.',
    whyTrades:'Bundsolid defenisv play. Afkast via teknisk resultat (Combined Ratio) og afkast på obligationsporteføljen.', peerValuation:'Ofte præmie vs Sampo for fantastisk synergirealisering i Codan-købet.', drivers:'Prisstigninger, vejrskader, inflation.', challenge:'Klimaforandringer / vejr.', peers:['Sampo','Gjensidige'], whyKnow:'Forsikring 101.'
  },
  {
    name:'Ascendis Pharma', ticker:'ASND', domain:'ascendispharma.com', sector:'Health Care', industry:'Biotech / Pharma',
    frontClues:['Er det et børsnoteret dansk biotekselskab i USA (ikke C25), modsat resten af listen?','Arbejder de revolutionerende med en "TransCon"-teknologi der muliggør langsom medicin-frigivelse?','Er deres første markedsførte produkt (Skytrofa) til børn med væksthormonmangel?'],
    what:'Udvikler medicin hvor man i stedet for daglige stik kan nøjes med f.eks. ugentlige (TransCon platformen).',
    valuation:'EV/Sales', avgMcap12mDkkBn:98.0, dkRankText:'Danmarks 12. største selskab målt på market cap.',
    whyTrades:'Handlet baseret på kommende toplinje og succes med commercial rollout i bl.a. USA.', peerValuation:'Højere værdiansat for platform potentiale udover det godkendte.', drivers:'Skytrofa og hypoparathyroidism FDA godkendelser.', challenge:'Penge-burn, salgsskala.', peers:['BioMarin','Novo Nordisk'], whyKnow:'Dansk biotek succeshistorie på Nasdaq.'
  },
  {
    name:'Jyske Bank', ticker:'JYSK.CO', domain:'jyskebank.dk', sector:'Financials', industry:'Banking',
    frontClues:['Købte de Handelsbankens danske afdeling og voksede sig endnu større for nyligt?','Er det Danmarks næststørste "rene" bank, primært ejet og baseret i Silkeborg?','Satsede de benhårdt på grønne boliglån før alle andre?'],
    what:'Stor detail/erhvervs-bank med hovedsæde i Jylland, aggressiv på opkøb for at vinde markedsandele.',
    valuation:'P/B', avgMcap12mDkkBn:56.0, dkRankText:'Danmarks 13. største selskab målt på market cap.',
    whyTrades:'Klassisk bank-play på kapitaludlodning og renteindtjening, plus integration af opkøbte porteføljer.', peerValuation:'På par med Sydbank i det jyske proxy-battle.', drivers:'Renter, NII (Net Interest Income), tab.', challenge:'Rente-top.', peers:['Sydbank','Danske Bank'], whyKnow:'Klassisk tier-2 konsolidator.'
  },
  {
    name:'Copenhagen Airport', ticker:'KBHL.CO', domain:'cph.dk', sector:'Industrials', industry:'Infrastructure',
    frontClues:['Er det en utrolig monopol-lignende infrastruktur-business centreret på Amager?','Blev de ramt voldsomt af COVID, men er en kontantmaskine i normale rejsetider?','Tjener de kassen på parkeringspladser og shopping-centeret frem for blot selve flyafgifterne?'],
    what:'Drift af Kastrup Lufthavn. Indtjeningen dækker ruteafgifter fra flyene men især retail og parkering ("Commercial").',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:54.0, dkRankText:'Danmarks 14. største selskab målt på market cap.',
    whyTrades:'Defensivt monopol med ekstrem yield profil når capexxen er stabil.', peerValuation:'Præmie for monopol på SAS\' primære hub.', drivers:'Pax (passagertal), retail spend per pax.', challenge:'Stram regulering og priskontrol.', peers:['Fraport','Aena'], whyKnow:'Infrastruktur i DK.'
  },
  {
    name:'Sydbank', ticker:'ALSYDB.CO', domain:'sydbank.dk', sector:'Financials', industry:'Banking',
    frontClues:['Er det en dominerende bank i det syddanske, men med stærk position mod SME-segmentet?','Købte de Alm. Brand Bank og blev store nok til at true Jyske Bank?','Har de de seneste år spyet udbytter og aktietilbagekøb afsted med enorm ROE?'],
    what:'Fjerde/femte-største bank i Danmark bygget via opkøb (bl.a. Alm Brand bank og små lokalbanker). Erhvervstung.',
    valuation:'P/B & ROE', avgMcap12mDkkBn:50.0, dkRankText:'Danmarks 15. største selskab målt på market cap.',
    whyTrades:'Ren cash cow for tiden. Stabile tabs-niveauer og stærkt SME marked driver aktien.', peerValuation:'Handler ligesom Jyske Bank i P/B universet.', drivers:'Nedskrivninger, renteniveau.', challenge:'Fremtidig udlånsvækst.', peers:['Jyske Bank','Spar Nord'], whyKnow:'Perfekt P/B eksempel.'
  },
  {
    name:'NKT', ticker:'NKT.CO', domain:'nkt.com', sector:'Industrials', industry:'Cables / Infrastructure',
    frontClues:['Producerer de massive højspændingskabler til havvindmølleparker?','Har de de seneste to år oplevet en historisk turboladet aktiekurs pga stærk ordre-backlog?','Gennemgik de en hård turn-around inden de blev reddet af det grønne megatrend-spil?'],
    what:'Leverer kabler globalt. Forgyldt lige nu som kritisk "pick and shovel" for den grønne omstilling og infrastruktur.',
    valuation:'EV/EBITDA fwd', avgMcap12mDkkBn:50.0, dkRankText:'Danmarks 16. største selskab målt på market cap.',
    whyTrades:'Tung backlog af milliard-kontrakter dikterer en "vækst case", da der er massiv mangel på højspændings-kabelkapacitet i verden.', peerValuation:'Ligger med premium vs stumperne af Prysmian og Nexans.', drivers:'Offshore vind installationer og grid-opgraderinger i Tyskland.', challenge:'At undgå projekt-tab på de tunge entrepriser.', peers:['Prysmian','Nexans'], whyKnow:'Turnaround poster-boy.'
  },
  {
    name:'ALK-Abelló', ticker:'ALK-B.CO', domain:'alk.net', sector:'Health Care', industry:'Allergy Immunotherapy',
    frontClues:['Er de eksperter i allergi-vacciner (fx AIT tabletter mod græs og birk)?','Ejes en stor del af dem oprindeligt af Lundbeckfonden?','Er de en stabil vækstcase der langsomt forsøger at slå igennem i især USA og Europa?'],
    what:'Markedsleder i allergivaccination, en form for forebyggende kur over 3-5 år, som piller og indsprøjtninger.',
    valuation:'Fwd P/E', avgMcap12mDkkBn:49.0, dkRankText:'Danmarks 17. største selskab målt på market cap.',
    whyTrades:'Stabil earnings, men forventninger til penetrationen af især tabletter i Asien og Nordamerika fastholder høj P/E.', peerValuation:'Særlig case; handler til stor premium vs generel pharma.', drivers:'Reimbursement status, ny lancering (træ/husstøvmide).', challenge:'Langsom uptake hos lægerne.', peers:['Stallergenes Greer'], whyKnow:'Dansk niche pharma.'
  },
  {
    name:'Demant', ticker:'DEMANT.CO', domain:'demant.com', sector:'Health Care', industry:'Hearing Aids',
    frontClues:['Var de tidligere kendt som William Demant, og er de gigantiske inden for høreapparater?','Esnubler de næsten fast i konkurrencen med danske tæskeholdsrival GN Store Nord?','Bruger de enormt mange penge i R&D og på at opkøbe retail-klinikker rundt omkring i verden?'],
    what:'En komplet høresundhedsvirksomhed. Fremstiller Oticon-høreapparater, diagnoseudstyr, og ejer hundredvis af retail-butikker.',
    valuation:'Fwd P/E & EV/EBITDA', avgMcap12mDkkBn:45.0, dkRankText:'Danmarks 18. største selskab målt på market cap.',
    whyTrades:'Klassisk vækst og margin spil drevet af demografi (ældre). Et semi-stabilt oligopol domineret af 5 store.', peerValuation:'Ofte lille rabat til Sonova, som er den rene globale markedsleder.', drivers:'Produktlanceringer, margin forsvar i retail.', challenge:'Prispres.', peers:['Sonova','GN Store Nord','Amplifon'], whyKnow:'Oligopol case.'
  },
  {
    name:'Lundbeck', ticker:'HLUN-B.CO', domain:'lundbeck.com', sector:'Health Care', industry:'Pharma',
    frontClues:['Er de Danmarks store psykiatri/CNS farmaselskab med fokus på hjerne-sygdomme?','Har de haft utallige ledelsesskift og kæmpet med "patent cliffs" for deres gamle blockbusters fx Cipralex?','Byggede de hele forretningen på neuro og antidepressiv medicin?'],
    what:'Udvikler primært medicin til skizofreni, depression og Alzheimers.',
    valuation:'Fwd P/E', avgMcap12mDkkBn:44.0, dkRankText:'Danmarks 19. største selskab målt på market cap.',
    whyTrades:'Generelt low-multiple value play fordi markedet mangler tro på at R&D pipelinen overgår indtjeningstabet på produkterne, der står til patentudløb.', peerValuation:'Klar rabat til andre neuro-specialister.', drivers:'Opkøb (fx Alder), FDA approval af nye stoffer.', challenge:'Pipeline fiaskoer.', peers:['UCB','Biogen'], whyKnow:'Turnaround pharma case.'
  },
  {
    name:'Rockwool', ticker:'ROCK-B.CO', domain:'rockwool.com', sector:'Materials', industry:'Building Products',
    frontClues:['Laver de isoleringsmatriale fremstillet af opsmeltet sten (stenuld)?','Sidestilles de ofte med det brede bygge- og anlægsmarked ift aktiens udsving?','Havde de meget offentligt besvær med deres operationer i Rusland efter invasionen af Ukraine?'],
    what:'Stenuldsisolering til byggebranchen; sælges på energieffektivitet, brandsikring og ESG (grøn retrofitting af huse).',
    valuation:'Fwd P/E & EV/EBITDA', avgMcap12mDkkBn:42.0, dkRankText:'Danmarks 20. største selskab målt på market cap.',
    whyTrades:'Cyklisk men afstivet af mega-trends indenfor bygnings-renoverings og regulativer (EU green deal).', peerValuation:'Ofte rabat mod irske Kingspan, da Rockwools produktion er ekstremt energi-intensiv.', drivers:'Byggeaktivitet i EU, energipriser.', challenge:'At mitigere input cost inflation.', peers:['Kingspan','Saint-Gobain'], whyKnow:'Industriel grøn vinder.'
  },
  {
    name:'ISS', ticker:'ISS.CO', domain:'issworld.com', sector:'Industrials', industry:'Facility Services',
    frontClues:['Er de kendte for at gøre rent og stå for facility management på store globale domiciler?','Er de gået fra at satse på 100 lande til at skære ind til benet med deres "OneISS" strategi?','Kører de på forsvindende små EBITDA marginer på ca. 3-4% hvilket gør casen ret sart?'],
    what:'Outsourcing-partner for Facility Management services som mad (kantine), rengøring og teknisk service.',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:41.0, dkRankText:'Danmarks 21. største selskab målt på market cap.',
    whyTrades:'Lav margin og høj arbejdsstyrke gør det til en M&A/turn-around value story.', peerValuation:'Handler til markant rabat vs Compass (mad) pga rengørings tynde voldgrave.', drivers:'Margin recovery, afhændelse af ikke-kerne.', challenge:'Løninflation og tabte kontrakter (fx Deutsche Telekom).', peers:['Compass Group','Sodexo'], whyKnow:'Lav-margin drømme/mareridt.'
  },
  {
    name:'Ringkjøbing Landbobank', ticker:'RILBA.CO', domain:'landbobanken.dk', sector:'Financials', industry:'Banking',
    frontClues:['Er det jyllands bedst bedømte og mest omkostningseffektive bank?','Har de i årtier givet fantastiske aktieafkast selvom de bare er en "lille bønder-bank"?','Består deres udlån især til velhavende kunder og vedvarende energi/vindmøllefinansiering?'],
    what:'Ultra-effektiv jysk bank, der især slår sig på nicheområder som vindmøllelån, læge-klinikker og affluents.',
    valuation:'P/B', avgMcap12mDkkBn:41.0, dkRankText:'Danmarks 22. største selskab målt på market cap.',
    whyTrades:'For at købe branchens bedste ROE, skal du betale branchens højeste Price-to-Book. Den regnes for ekstremt sikker.', peerValuation:'Handler dyrere end alle andre nordiske banker (præmie).', drivers:'Tabsniveauer, renter.', challenge:'At forsvare profit margins i et faldende rentemiljø.', peers:['Handelsbanken','Nordea'], whyKnow:'Bæstet indenfor P/B-valuation.'
  },
  {
    name:'Pandora', ticker:'PNDORA.CO', domain:'pandora.net', sector:'Consumer Discretionary', industry:'Jewelry / Retail',
    frontClues:['Sælger de sølvarmbånd og små charms, især populært i USA og Europa, fremstillet massivt i Thailand?','Måtte de for år tilbage udsende et gigantisk profit warning der slagtede aktien, før et vildt turn-around eventyr (Phoenix) begyndte?','Pumper de enorme rater i udbytte og tilbagekøb til glæde for deres investorer?'],
    what:'Mass market smykker; høje bruttomarginer pga billig asiatisk produktion kombineret med egne butikker. Charms og "Lab Grown Diamonds".',
    valuation:'Fwd P/E & EV/EBITDA', avgMcap12mDkkBn:39.0, dkRankText:'Danmarks 23. største selskab målt på market cap.',
    whyTrades:'Retail retail retail. LBO-lignende cash flow case, hvor organisk vækst kaster milliarder af sig.', peerValuation:'Kæmpe rabat til luksus ala Richemont, men de er også "accessible".', drivers:'Like-for-like salg, US spend.', challenge:'At genoplive Kina casen og holde USA stærk.', peers:['Richemont','Signet'], whyKnow:'Dansk consumer super-case.'
  },
  {
    name:'FLSmidth', ticker:'FLS.CO', domain:'flsmidth.com', sector:'Industrials', industry:'Mining & Cement Equip.',
    frontClues:['Laver de gigantiske maskiner og anlæg til at knuse sten for mine- og cementindustrien?','Købte de Tyske ThyssenKrupps mineforretning (TK Mining)?','Er det ledelsens mission at gå mere mod minesektoren (som grøn omstilling kræver meget af) og droppe cement-fokus?'],
    what:'Globalt ingeniør- og maskin-hus, bygger anlæg og pumper services der knuser kobber og andre metaller fra jorden.',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:30.0, dkRankText:'Danmarks 24. største selskab målt på market cap.',
    whyTrades:'Tung cyklisk eksponering overfor råvarepriser og mine-capex (fx kobber pris driver investeringslysten).', peerValuation:'Ofte rabat til Metso Outotec pga lavere service-share og tung legacy.', drivers:'Opkøbssynergier, råvare-guldfeber, afvikling af cement.', challenge:'EBITA margins i backloggen.', peers:['Metso Outotec','Sandvik'], whyKnow:'Mining i DK.'
  },
  {
    name:'Royal Unibrew', ticker:'RBREW.CO', domain:'royalunibrew.com', sector:'Consumer Staples', industry:'Beverages',
    frontClues:['Er det "Lillebror" til Carlsberg, som ejer Faxe Kondi og Albani?','Vokser de lystigt ved hele tiden at opkøbe små internationale producenter og distributører (som fx Hansa Borg eller Terme di Crodo)?','Blev selskabet for årtier siden anset som opløst, før en total reorganisation reddede dem til tops i C25?'],
    what:'Producerer, sælger og distribuerer øl, sodavand (Pepsi partner) og vand. Multi-local model (beholder stærke lokale brands).',
    valuation:'Fwd P/E & EV/EBITDA', avgMcap12mDkkBn:28.0, dkRankText:'Danmarks 25. største selskab målt på market cap.',
    whyTrades:'Fantastisk ROIC the sidste 10 år bygget på kapitallet M&A, hvor de integrerer hurtigere og koster synergier billigere.', peerValuation:'Premium M&A platform modsat mange store bryggerier.', drivers:'Integration af italiensk/fransk M&A, sommervejr.', challenge:'At navigere i sukker-afgifter.', peers:['Carlsberg','Britvic'], whyKnow:'Stærk M&A roll-up model.'
  }
];
