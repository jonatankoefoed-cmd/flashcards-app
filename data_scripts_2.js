const COMPANY_CARDS_2 = [
  {
    name:'Alm. Brand', ticker:'ALMB.CO', domain:'almbrand.dk', sector:'Financials', industry:'Insurance',
    frontClues:['Er det en stor dansk forsikringskoncern, der fik en massiv saltvandsindsprøjtning ved at købe Codan i Danmark?','Har de de seneste år afhændet både deres bank og deres livs-pensions forretning for at satse rent på skadesforsikring?','Har de stærke landbrugs- og regions-rødder?'],
    what:'Dansk skadesforsikring efter opkøb af Codan.',
    valuation:'Fwd P/E', avgMcap12mDkkBn:24.0, dkRankText:'Danmarks 26. største selskab målt på market cap.',
    whyTrades:'Konsoliderings-case hvor overskudsgrad på forsikring (combined ratio) belønner aktionærerne.', peerValuation:'Typisk rabat vs Tryg da Codan integration stadig har ridser.', drivers:'Codan synergier.', challenge:'Vejrskader, integration.', peers:['Tryg','Gjensidige'], whyKnow:'Stor Codan opkøber.'
  },
  {
    name:'Zealand Pharma', ticker:'ZEAL.CO', domain:'zealandpharma.com', sector:'Health Care', industry:'Biotech',
    frontClues:['Er de "lillebroren" til Novo Nordisk, da de også forsker heftigt i fedme- og hjertemedicin via peptider?','Skød deres markedsværdi til himmels i starten af 2024 på rygter om deres vægttabs-mirakel "Survodutide"?','Sælger medicin gennem en partner-fokuseret model uden at bygge eget globalt salgsteam?'],
    what:'Fedmemarkedspipeline og sjældne sygdomme. Samarbejder med giganten Boehringer Ingelheim omkring bl.a. fedme.',
    valuation:'R&D Pipeline / EV', avgMcap12mDkkBn:23.0, dkRankText:'Danmarks 27. største selskab målt på market cap.',
    whyTrades:'Man køber udelukkende en "option" på succes i deres ekstremt lovende fase-2/3 fedme og leversygdoms peak-sale.', peerValuation:'Rabat vs Viking Therapeutics, der også jager fedme, men premium ift standard biotek.', drivers:'Fase-3 readouts i fedme.', challenge:'Konkurrenter, brændrate.', peers:['Viking Therapeutics','Novo Nordisk'], whyKnow:'Het fedme play.'
  },
  {
    name:'Ambu', ticker:'AMBU-B.CO', domain:'ambu.com', sector:'Health Care', industry:'Medical Devices',
    frontClues:['Opfandt de den berømte ventilationspose og lever de i dag af fuldstændigt at udskifte genbrugelige skoper (kameraer på spyt) med engangskameraer (endoskoper)?','Har aktien været en voldsom yo-yo under og efter covid, pga enorm hyreskala men svingende udbud/profit?','Er de "engangs"-kongerne i operationstuerne?'],
    what:'Sælger engangs-endoskoper. Undgår infektionsrisiko for hospitalet i forhold til genbrug.',
    valuation:'EV/Sales', avgMcap12mDkkBn:20.0, dkRankText:'Danmarks 28. største selskab målt på market cap.',
    whyTrades:'Kæmpe TAM (Total Addressable Market) rotation fra genbrug til engangs. Megen diskussion om hvorvidt margins kan overgå 20%.', peerValuation:'Præmie til bl.a. Olympus, som dominerer genbrug, da Ambu har pure-growth.', drivers:'Lunge-urologi engangs adoption.', challenge:'Konkurrenter som Olympus.', peers:['Olympus','Boston Scientific'], whyKnow:'Engangs-endoskopi disruptor.'
  },
  {
    name:'Bakkafrost', ticker:'BAKKA.OL', domain:'bakkafrost.com', sector:'Consumer Staples', industry:'Aquaculture',
    frontClues:['Er de egentlig Færøernes største selskab og listet i Norge, men indgår ofte i "danske" universer?','Opdrætter de laks med en unik genetik ("Færø laks"), som sikrer enorme margins?','Købte de aktiver i Skotland, som pga dårlig biologi (lakselus mv) har været et sandt mareridt for aktien?'],
    what:'Integreret lakseopdrætter - ejer alt fra fiskemelsproduktion til færdigpakket færøsk laks.',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:19.5, dkRankText:'Danmarks 29. største selskab målt på market cap.',
    whyTrades:'Laksepriser plus den biologiske sundhed. Biologi-chok i skotland afstraffer.', peerValuation:'Stor præmie pga deres vertikale integration over Mowi.', drivers:'Laksepriser, færøske restriktioner.', challenge:'Sygdom/Lus i Skotland.', peers:['Mowi','SalMar'], whyKnow:'Færøsk guld.'
  },
  {
    name:'Netcompany', ticker:'NETC.CO', domain:'netcompany.com', sector:'Information Technology', industry:'IT Services',
    frontClues:['Blev de stiftet af den karismatiske André Rogaczewski og startede med at bygge enorme it-løsninger til den danske stat (fx corona-passet)?','Har de oplevet voldsomt pres efter Storbritannien og internationaliseringen har været sværere end i Danmark?','Har de en stærk intern model der sikrer minimal fejl i dyre time-estimater?'],
    what:'IT-services med tung leverance på gov-gov projekter og C25 virksomheder, hvor faste lister, lav timeløn i udviklingsfase og høje marginer skaber succes.',
    valuation:'Fwd P/E', avgMcap12mDkkBn:19.3, dkRankText:'Danmarks 30. største selskab målt på market cap.',
    whyTrades:'Tidligere growth-darling, men i dag domineret af frygt for UK inflation, margin compression, og statslig austerity.', peerValuation:'Præmie vs brede konsulenthuse som Bouygues baseret på forventet margin recovery.', drivers:'Offentlige systemer, international vækst.', challenge:'At levere lovet vækst i GB.', peers:['Sopra Steria','CGI'], whyKnow:'Statslig IT-vinder.'
  },
  {
    name:'Cadeler', ticker:'CDLR', domain:'cadeler.com', sector:'Energy / Industrials', industry:'Offshore Services',
    frontClues:['Ejer de kolossale installationsskibe, der planter havvindmøller fast i havbunden?','Har BW Group en stor aktiepost og har de listet selskabet bl.a. in New York for at hente milliardbeløb til nye skibe?','Er der voldsom kapacitetsmangel på deres X-class kæmpeskibe globalt?'],
    what:'Installerer fundamenter og gigantiske vindmøller via store specialbyggede jack-up skibe (Wind Turbine Installation Vessels).',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:16.5, dkRankText:'Danmarks 31. største selskab målt på market cap.',
    whyTrades:'Kæmpe boom and bust potentiale. De ejer utroligt dyre aktiver på rette tid. Ratestigninger følger 1:1 ned i EBIT.', peerValuation:'Høj multi-årig backlog retfærdiggør premium i en kapitaltung branche.', drivers:'Skibsleverancer og Ørsted projekter.', challenge:'Forsinkelser af deres nybyggerier i Kina.', peers:['Eneti','Seaway7'], whyKnow:'Pick and shovel til Havvind.'
  },
  {
    name:'Bavarian Nordic', ticker:'BAVA.CO', domain:'bavarian-nordic.com', sector:'Health Care', industry:'Biotech / Vaccines',
    frontClues:['Gør de i vacciner "på is"? Kæmpe opture har der fx været pga Kopper, Ebola, RSV og Mpox (abekopper)?','Har den amerikanske stat traditionelt været en massiv aftager til deres "bio-preparedness" lager mod kopper?','Måtte de droppe en RSV-vaccine sent i spillet, hvilket sendte aktien massivt ned?'],
    what:'Vaccine-producent fokuseret på bl.a. rabies, TBE, kopper/mpox. Indtjeningen svinger voldsomt med pludselige virus-udbrud.',
    valuation:'Fwd P/E', avgMcap12mDkkBn:16.4, dkRankText:'Danmarks 32. største selskab målt på market cap.',
    whyTrades:'Mellem en klassisk vaccine-virksomhed (TBE/Rabies cashflow) og en lotto-kupon (Mpox frygt / Epidemier).', peerValuation:'Ofte præmie vs traditionelle producenter, fordi epidemimarginals er enorme.', drivers:'Staters ordre-opfyldning, rejsevacciner.', challenge:'At bevise et stabilt cash flow uden for kriser.', peers:['GSK','Valneva'], whyKnow:'Dansk epidemi-spil.'
  },
  {
    name:'Schouw & Co.', ticker:'SCHO.CO', domain:'schouw.dk', sector:'Industrials', industry:'Conglomerates',
    frontClues:['Er det et ægte jysk konglomerat placeret i Aarhus, stiftet af Schouw-brødrene?','Ejer de blandede bolsjer som Biomar (fiskefoder), GPV (elektronik), Fibertex (stoffer til rengøring)?','Afdanner de aldrig frasalg af super-performer selskaber, og trades oftest med rabat?'],
    what:'Et utraditionelt og veldrevet holdingselskab som aktivt ejer industrielle datterselskaber, mest b2b fremstilling.',
    valuation:'Conglomerate P/E', avgMcap12mDkkBn:16.0, dkRankText:'Danmarks 33. største selskab målt på market cap.',
    whyTrades:'Moderat, stabil industriportefølje. Handles traditionelt med "konglomerat-rabat", idet kapital kunne spredes bedre af markedet.', peerValuation:'Par med lignende svenske porteføljeselskaber (fx Industrivärden).', drivers:'Biomar laks-kunder og GPV integration.', challenge:'Cyklisk slowdown på tværs af segmenter.', peers:['Industrivärden','Investor AB'], whyKnow:'Jysk familiekapital i aktion.'
  },
  {
    name:'GN Store Nord', ticker:'GN.CO', domain:'gn.com', sector:'Health Care / Tech', industry:'Hearing Aids & Audio',
    frontClues:['Sidder de massivt på to ben: Høreapparater "GN Hearing" og store gamer- og kontor-headsets "GN Audio" (Jabra)?','Tog de et katastrofalt milliardlån for at købe gamer-mus brandet SteelSeries på et uheldigt tidspunkt lige inden renten strøg i vejret?','Blev de ramt af massiv shorting fra globale hedgefonde?'],
    what:'Producent af både medicinske høreapparater og Jabra høretelefoner. Selskabet har været igennem massiv kapital-struktur krise.',
    valuation:'EV/EBITDA & Debt ratio', avgMcap12mDkkBn:15.9, dkRankText:'Danmarks 34. største selskab målt på market cap.',
    whyTrades:'Nøgletallene P/B og egenkapitalforretning (ROE) driver kursen for danske banker.', peerValuation:'Handler dyrere end alle andre nordiske banker (præmie).', drivers:'Turn-around i Audio, salg af aktiver, nye lanceringer.', challenge:'Gæld, Gæld, Gæld.', peers:['Demant','Logitech'], whyKnow:'Dobbelt industri - og gældsmareridt.'
  },
  {
    name:'Per Aarsleff', ticker:'PAAL-B.CO', domain:'aarsleff.com', sector:'Industrials', industry:'Construction & Engineering',
    frontClues:['Er det Danmarks gigant af en entreprenør, der bygger alt fra Femern-tunnellen til skyskrabere?','Tjener de oftest ikke særlig meget per krone omsætning (ca 4-5% i overskudsgrad), men styrer milliardbudgetter?','Er det brudt historikken med lav P/E ved pludselig at demonstrere enorm operationel stabilitet de seneste par år?'],
    what:'Entreprenørvirksomhed fokuseret på anlægsarbejde, byggeri og tekniske installationer.',
    valuation:'EV/EBITDA & Fwd P/E', avgMcap12mDkkBn:15.5, dkRankText:'Danmarks 35. største selskab målt på market cap.',
    whyTrades:'Markant infrastruktur medvind og "sikre bygge-tenders". Ofte konservativ guidance.', peerValuation:'Handler på præmie vs det ustabile MT Højgaard.', drivers:'Offentligt anlægsbyggeri, fjernvarme, jernbaner.', challenge:'Tab på store fix-pris turn-key projekter.', peers:['MT Højgaard','Skanska'], whyKnow:'Den største skovl i DK.'
  },
  {
    name:'Jeudan', ticker:'JDAN.CO', domain:'jeudan.dk', sector:'Real Estate', industry:'Real Estate Management',
    frontClues:['Ejer de en enorm og historisk portefølje af erhvervsejendomme badet i Københavns centrum?','Har de ry for god "Københavner-ejendomsadministration" på langsigtede horisonter?','Styres deres indtjening og balance 100% af markeds-renten, som direkte piller ved afkastkravet (yielden) på værdiansættelsen af murstenene?'],
    what:'Danmarks største børsnoterede ejendomsvirksomhed. Investerer stenhårdt kun i Københavns kontor- og butiksejendomme.',
    valuation:'P/NAV (Price to Nav)', avgMcap12mDkkBn:12.3, dkRankText:'Danmarks 36. største selskab målt på market cap.',
    whyTrades:'Klassisk murstens-aktie. I et højtrentemiljø tager ejendommes bogførte værdi et dyk, hvilket presser aktien. Handles tit lavere end Nav.', peerValuation:'Par vs svenske Castellum i kontomiljøet.', drivers:'Tomgang, inflationstilpassede lejekonktrakter, renter.', challenge:'Langtidsholdbare prisfald på kontorer.', peers:['Castellum','Wihlborgs'], whyKnow:'Er den børsnoterede "Københavner portefølje".'
  },
  {
    name:'D/S Norden', ticker:'DNORD.CO', domain:'norden.com', sector:'Industrials', industry:'Marine Shipping',
    frontClues:['Sejler de bulklast (som kul og korn) samt olieprodukter i stedet for Mærsks containere?','Er deres model benhårdt at leje skibe ind/ud som et stort shipping hedgefond frem for at eje dem?','Leverede de et sindssygt guld-regn udbytte under corona-bullmarkedet i tørlast?'],
    what:'Tørlast- og tankrederi der transporterer faste og flydende råvarer. Stor aktiv-handels position ("Asset light" strategi).',
    valuation:'P/NAV & Dividend return', avgMcap12mDkkBn:9.0, dkRankText:'Danmarks 37. største selskab målt på market cap.',
    whyTrades:'Ren cyklisk indtjening udløst af krige, tørker og told – skaber volatile marginer, men aktien belønnes for høje kontantudbytter.', peerValuation:'Sammenlignet med Golden ocean. Rigtig dygtige traders.', drivers:'Råvareefterspørgsel, tank-rater.', challenge:'Nedture i globale rate miljøer.', peers:['Golden Ocean','Torm'], whyKnow:'Trading kings af dry bulk.'
  },
  {
    name:'Trustpilot', ticker:'TRST.L', domain:'trustpilot.com', sector:'Information Technology', industry:'Platform Services',
    frontClues:['Borgerservicens mareridt, opfundet af en dansker, men i dag børsnoteret i London?','Lever de af at firmaer betaler for at præsentere stjerner og moderere utilfredse kunder?','Blev de hypet som et kæmpe tech-dansk unicorn håb?'],
    what:'Platform for brugeranmeldelser af produkter og services. Tjenesten er gratis for forbrugere, SaaS for virksomheder.',
    valuation:'EV/Sales & Rule of 40', avgMcap12mDkkBn:7.4, dkRankText:'Danmarks 38. største selskab målt på market cap.',
    whyTrades:'Vækst og netværkseffekter (SaaS metrics) er vigtige. Månedlig ARR vækst følger aktien tæt.', peerValuation:'Præmie (høj P/E) for dominans på engelsktalende markeder.', drivers:'ARR vækst i GB og US.', challenge:'Fake reviews and google SEO policy.', peers:['Yelp','TripAdvisor'], whyKnow:'Dansk internet succes.'
  },
  {
    name:'DFDS', ticker:'DFDS.CO', domain:'dfds.com', sector:'Industrials', industry:'Marine Shipping',
    frontClues:['Sættes de oftest i forbindelse med Oslobåden for den almindelige dansker?','Ligger den virkelige indtjening og styrke faktisk i fragt (ro-ro) og logistikruter fra UK til Tyrkiet?','Ejes en stor portion af selskabet fonden Lauritzen Fonden?'],
    what:'Nordeuropas største integrerede shipping- og logistikvirksomhed, herunder færgetrafik for og fragt.',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:6.2, dkRankText:'Danmarks 39. største selskab målt på market cap.',
    whyTrades:'Asset-heavy logistics der værdisættes lidt lavere og udbytteorienteret. Følsom for makroøkonomi.', peerValuation:'Par med fx Finnlines.', drivers:'Britisk økonomi, brændstof.', challenge:'At levere frie cashflow', peers:['Finnlines','Stena Line'], whyKnow:'Ror-ro king of demark.'
  },
  {
    name:'Better Collective', ticker:'BETCO-DKK.CO', domain:'bettercollective.com', sector:'Communication Services', industry:'Media & Affiliate',
    frontClues:['Ejer de de velkendte tipsedler.dk og er verdens førende inden for sportsbetting-affiliate?','Er kassen tjent på at smide brugere i kløerne på bookmakerne og enten inkassere engangssummer eller afkast af brugernes evige tab (revshare)?','Har de for nylig trukket over i Sverige the Stockholm list and double-list i kr?'],
    what:'Opbygger sportmediesties dedikeret til betting. Kanaliserer trafikken til betting operatører og casher fee ind.',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:6.0, dkRankText:'Danmarks 40. største selskab målt på market cap.',
    whyTrades:'Cash maskiner genererer free cashflow i reguleret spillemiljø. M&A er enorm.', peerValuation:'Præmie pga stordrift i US market expansion modsat svenske Catena.', drivers:'Regulativer i US/Europa, CPL rates.', challenge:'Google\'s search algorithm opdateringer!', peers:['Catena Media'], whyKnow:'Affiliate monster.'
  },
  {
    name:'Scandinavian Tobacco Group', ticker:'STG.CO', domain:'st-group.com', sector:'Consumer Staples', industry:'Tobacco',
    frontClues:['Producerer de især cigarer (fx Cafe Creme) og pibetobak snarere end cigaretter?','Består "cash case" egentligt bare af at malke en faldende tobaksvolumen i den vestlige verden ved at hæve priserne langsomt?','Giver de nogle af børsens absolut højeste udbytter konsekvent år efter år?'],
    what:'Førende producent af cigarer, røgtobak og håndrullede cigarer globalt. Stærkt USA online og fysisk salg.',
    valuation:'Fwd P/E & Dividend', avgMcap12mDkkBn:5.8, dkRankText:'Danmarks 41. største selskab målt på market cap.',
    whyTrades:'Markedet fokuserer på frit pengestrøm yield (>10%) – omsætning og marginer vil langsomt erodere, så det handler om at cashe ud løbende.', peerValuation:'Lav valuation vs svenske snus konger / Swedish Match pga udelukkende gammel tobakstype.', drivers:'Kunde-retention, US cigar boom normalization.', challenge:'FDA og EU regulativer.', peers:['Swedish Match','Imperial Brands'], whyKnow:'Value-trap cashmaskine.'
  },
  {
    name:'ChemoMetec', ticker:'CHEMM.CO', domain:'chemometec.com', sector:'Health Care', industry:'Life Sciences Tools',
    frontClues:['Laver de banebrydende maskiner og forbrugsstoffer til at tælle celler?','Er deres "NucleoCounter" et standard-laboratorie tool og har en 90%+ gross marin på engangskasetter?','Fløj de op til astronomiske værdier (P/E 100) under covid-biotech boomet men styrtede da fundingen forsvandt i US?'],
    what:'Ekstremt profitabel "razor-and-blade" forretning der tæller komplekse celler for bl.a. CAR-T celle kur og cancer labs.',
    valuation:'Fwd P/E Extreme premium', avgMcap12mDkkBn:5.8, dkRankText:'Danmarks 42. største selskab målt på market cap.',
    whyTrades:'Når biotek labs får funding, bestiller de Chemometec instrumenter. Derefter løber recurring stream lystigt.', peerValuation:'Premium til standard tyske life-sci.', drivers:'Salg af kasétter (XDRx), US biotech miljø.', challenge:'For høje forventninger fra investorer.', peers:['Sartorius','Danaher'], whyKnow:'Høj margin tech-spil.'
  },
  {
    name:'SP Group', ticker:'SPG.CO', domain:'sp-group.dk', sector:'Materials', industry:'Plastics / Component',
    frontClues:['Fremstiller de alt mulige plast-komponenter og belægninger til f.eks. vindmøller og medico?','Har den karismatiske fynske direktør, Frank Gad, sikret dem ca. 20-25 års sammenhængende top og bundlinje vækst ved hundredvis af små-køb?','Er liquidity / omsættelighed i aktien næsten katastrofal pga stor insider ejerskab?'],
    what:'Mellemstor, b2b plastikselskab fokuseret på medico, tech & energi, bygget op med ekstremt stram cost-focus.',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:4.6, dkRankText:'Danmarks 43. største selskab målt på market cap.',
    whyTrades:'Turn up and forget aktie. Fantastisk operationel gear i krise-tider.', peerValuation:'Svært at benchmarke pga bred vifte - par.', drivers:'Fusions, resin materialepriser.', challenge:'Børsnotering for lidt illikviditet.', peers:['Nefab','Nolato'], whyKnow:'Compounder classic.'
  },
  {
    name:'Nilfisk', ticker:'NLFSK.CO', domain:'nilfisk.com', sector:'Industrials', industry:'Machinery / Cleaning',
    frontClues:['Blev de i 2017 udskilt fra NKT (de to selskabers tidligere holdingsselskab)?','Oplever de nærmest en ny CEO om året i forsøget på at opnå en fornuftig turnaround for "store svære rengøringsmaskiner"?','Er brandet stærkere i Hr. Jensens kælder end det decideret er som global b2b-maskinproducent?'],
    what:'Gør store arealer rene. Sælger alt fra almindelige støvsugere til autonome "robot rengørings traktorer". Leverer servicekontrakter bagefter.',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:4.0, dkRankText:'Danmarks 44. største selskab målt på market cap.',
    whyTrades:'Langvarig deep-value sag, som håber på en "self-help" turn-around i margins mod deres target på +10% EBIT.', peerValuation:'Kæmper mod Tennant i USA.', drivers:'Execution og reduktion i kompleksitet (SKU\'s).', challenge:'Lave markedsandele udenfor EMEA.', peers:['Tennant','Karcher'], whyKnow:'Den evige turnaround.'
  },
  {
    name:'NTG', ticker:'NTG.CO', domain:'ntg.com', sector:'Transport & Logistics', industry:'Freight forwarding',
    frontClues:['Er det udbrydere fra giganten DSV, der tænkte: "Vi kan replikere opskriften, bl.a. stærk ejer/partner incitament"?','Driver de masser af små logistikvirksomheder, der ejer deres egen lille bilpark i europa?','Skulle de være kommet på børsen igennem CPH lufthavn/Amager banken bagvejs, men blev clean på hovedmarkedet?'],
    what:'Asset-light speditør (som DSV). Unik partnerskabsmodel hvor direktører ejer halvdelen af eget datterselskab.',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:4.0, dkRankText:'Danmarks 45. største selskab målt på market cap.',
    whyTrades:'Hurtigt M&A organ med massiv indtjeningsevne fra landevejstransport. Ofte vurderer som en lille DSV proxy.', peerValuation:'Rabat vs DSV pga svagere Sea/Air andel.', drivers:'M&A, integration af road-logistics.', challenge:'Volumen fald i europæisk logistik.', peers:['DSV','DB Schenker'], whyKnow:'Olieret maskine.'
  },
  {
    name:'MT Højgaard', ticker:'MTHH.CO', domain:'mth.dk', sector:'Industrials', industry:'Construction',
    frontClues:['Har de i mange årtier kæmpet side-om-side (ofte blodigt) med Per Aarsleff om at lede Danmarks største entrepriser?','Er de en fusion der kæmper en enorm og konstant kamp for at holde 2% indtjening i stramme statslige byggerier?','Sælges de i perioder i "holdings-stumper" pga svækkede profitter i specifikke byggematador datter-geledder?'],
    what:'Bredt dansk entreprenørhus med datterselskaber som Enemærke & Petersen, stærk i renovering og anlæg.',
    valuation:'Fwd P/E & Nav', avgMcap12mDkkBn:2.9, dkRankText:'Danmarks 46. største selskab målt på market cap.',
    whyTrades:'Oftest deep value; indtjeningen er usikker, og selv små retslige tvister brænder profit marginen væk. Stigende porteføljespil.', peerValuation:'Markant rabat vs Per Aarsleffs operationelle magi.', drivers:'Projektstyring og udbud over tid.', challenge:'At bevise et profitabelt bundniveau.', peers:['Per Aarsleff','NCC'], whyKnow:'Den klassiske konkurrent.'
  },
  {
    name:'Djurslands Bank', ticker:'DJUR.CO', domain:'djurslandsbank.dk', sector:'Financials', industry:'Regional Banking',
    frontClues:['Er de som et ægte lokalt "pindsvin", de skalter og valter overskud af for byens borgere?','Leverer de fuldstændig absurde ROE (egenkapitla-afkast) ift at være en træt sparekasse uden for de store motorveje?','Blev de stiftet i Grena i starten af nittenhundredtallet?'],
    what:'Lille solid landbobank med afdelinger primært i østjylland og Randers. Klassisk relations-butik.',
    valuation:'P/B', avgMcap12mDkkBn:2.6, dkRankText:'Danmarks 47. største selskab målt på market cap.',
    whyTrades:'Ekstrem lav værdiansættelse parret med vanvittig lokal dominans. Udbytte betaler for tålmodighed.', peerValuation:'Par med den tunge lokale masse af sparekasser.', drivers:'Private boliglån.', challenge:'At tiltrække dygtig arbejdskraft.', peers:['Fjordbank','Møns Bank'], whyKnow:'Microcap velfærd.'
  },
  {
    name:'Brødrene A & O Johansen', ticker:'AOJ-B.CO', domain:'ao.dk', sector:'Industrials / Consumer', industry:'Building Distribution',
    frontClues:['Kender enhver håndværker deres blå og hvide flag for deres velassorterede distributions center (Grossist)?','Har en enorm "Gør det selv" vinkel samt massiv teknisk online leverings-logistik der er top klasse i norden?','Forskansede de sig i familiens hænder for længe, men er nylig sat meget "børs" orienteret fri?'],
    what:'Engros-virksomhed som leverer el- og VVS tekniske komponenter. Online portaler og lynhurtig distribution.',
    valuation:'Fwd P/E', avgMcap12mDkkBn:1.9, dkRankText:'Danmarks 48. største selskab målt på market cap.',
    whyTrades:'Afhængig af de små håndværkere og B2b aktivitet, meget drift sikker.', peerValuation:'Handler ligesom og konkurer med Solar G.', drivers:'Salg mod anlæg renovering.', challenge:'Rente miljøets bremse', peers:['Solar A/S','Ahlsell'], whyKnow:'VVS tech mester.'
  },
  {
    name:'Parken Sport', ticker:'PARKEN.CO', domain:'parken.dk', sector:'Communication Services', industry:'Entertainment',
    frontClues:['Ejer de Danmarks ukronede national statdion PARKEN og fodboldklubben FCK?','Spreder de især kassetræet ud på Lalandia ejerskabet, selv til en grad hvor fodbolden kun er ca 1/3 af overskuddet?','Mister de milliarder på market cap, når et uheldigt frispark giver point tab i et champions league opgør?'],
    what:'Helt unik blanding - ejer en dominerende fodboldklub (FCK) og familiy-resorts kæden "Lalandia" i DK og udlandet.',
    valuation:'Asset / Nav', avgMcap12mDkkBn:1.9, dkRankText:'Danmarks 49. største selskab målt på market cap.',
    whyTrades:'Sentiment spil. Fodbold-entusiaster kører aktien i nyhederne, men "big money" fokuserer på ejendom/lalandia yielden.', peerValuation:'FCK holdes vs int. soccer teams fx Dortmund (rabat) men Lalandia er unikt.', drivers:'Champions League kval, Lalandia ferie salg.', challenge:'Store udsving uden for deres kontrol (bolde mod et hjørne).', peers:['Borussia Dortmund'], whyKnow:'Den elskede "Folkeaktie".'
  },
  {
    name:'Solar A/S', ticker:'SOLAR-B.CO', domain:'solar.eu', sector:'Industrials', industry:'Wholesale / Distribution',
    frontClues:['Leverer de VVS og el-teknik via en sindssygt optimeret flåde, oftest som A/O Johansen konkurrent?','Har svenske familiefonde og tunge jyske interesser drevet dette kæmpe lager imperie i Esbjerg fra lille til global aktør?','Smed de massiv omsætning ud for netop kun at fokusere på høj profit "kerne sourcing"?'],
    what:'Sourcing og service til energi, VVS og varme teknik. Grossist drift med super web-shop til professionelle.',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:1.7, dkRankText:'Danmarks 50. største selskab målt på market cap.',
    whyTrades:'Klassisk operationel gear, handles med markant cyklisk frygt men store faste udbytter i opgangsrides.', peerValuation:'Konkurrerer mod bl.a. Rexel, A/O Johansen.', drivers:'VVS instalation markedet.', challenge:'Konkurrence.', peers:['AO Johansen','Rexel'], whyKnow:'B2B indkøb klassiker.'
  },
  {
    name:'cBrain', ticker:'CBRAIN.CO', domain:'cbrain.com', sector:'Information Technology', industry:'Software / SaaS',
    frontClues:['Skaber de bureaukratiets våde drøm: "F2", en standardiseret SaaS platform brugt af alle fra minstre til styrelser i de danske myndigheder?','Løb aktien nærmest vanvittigt på forventninger ind i Dubai f.eks og tyskland eksport?','Bestyres de ofte af "Per Tejs", stifter der har ekstrem skarp markeds førings sans i "government tech"?'],
    what:'Digitaliserings-Software (især arkivering og bureaukrati "F2") primært stat til stat løsning. Har opnået gigant monopol-lignende adgang i de danske departementer.',
    valuation:'Fwd P/E Super Premium / SaaS', avgMcap12mDkkBn:1.4, dkRankText:'Danmarks 51. største selskab målt på market cap.',
    whyTrades:'Værdiansættes decideret exorbitant på forventning om at deres "DK Public" monopol model kan eksporters til Tyskland.', peerValuation:'SaaS premium ift. Netcompany konsulent rabat.', drivers:'Win quotes abroad (UAE, DE).', challenge:'At omvende andre europæiske kulturer til sit F2 tech.', peers:['Netcompany','KMD(private)'], whyKnow:'Myndigheds software.'
  },
  {
    name:'Bang & Olufsen', ticker:'BO.CO', domain:'bang-olufsen.com', sector:'Consumer Discretionary', industry:'Consumer Electronics',
    frontClues:['Har Struer, Jylland bygget et af de mest verdenskendte high-end Hifi brands - hvor form og lyd er kunst?','Måtte de konstant hente hundreder millioner i de sidste 10 år, for at dæmme blødende bundlinje?','Har en ny ledelse omsider skruet helt op for luksus-faktoren "bespoke", og ned for mass-market forsøg?'],
    what:'Producent at luksuslyd og tv udstyr.',
    valuation:'EV/Sales', avgMcap12mDkkBn:1.3, dkRankText:'Danmarks 52. største selskab målt på market cap.',
    whyTrades:'Markedet vil have luksus-margins. Bliver brand value til cash flows? Aktien har været pinefuld dyb kriseaktie i årtier.', peerValuation:'Trækker premium P/S for sit brand, men negativ indtjening ift Sonos etc.', drivers:'Fysiske retail butikker "Experience Spaces", Mellemørsten.', challenge:'Margin lønsomhed.', peers:['Sonos','Loewe'], whyKnow:'Det ikoniske mareridt.'
  },
  {
    name:'Møns Bank', ticker:'MNBA.CO', domain:'moensbank.dk', sector:'Financials', industry:'Regional Banking',
    frontClues:['Er dette vitterligt den lille charmerende finans maskine i Stege på Møn, hvor overskud stort set bruges til lokalsamfund?','Kører aktien som en fast 3-5 kr / dag i omsætning, så super illiker?','Prissættes den med meget stor discount (P/B) men med trofast udbytte procent?'],
    what:'Traditionel lokal-bank. Betjener syd-sJælland, Lolland og især Møn bønder og SMV.',
    valuation:'P/B', avgMcap12mDkkBn:0.8, dkRankText:'Danmarks 53. største selskab målt på market cap.',
    whyTrades:'De små lokalbanker er sikre obligationer. Du får udbytte per år, men INGEN spekulation el stor vækst.', peerValuation:'Ekstrem rabat vs Jyske Bank grundet illikviditet.', drivers:'Tab på nedskrivninger og lån på landet.', challenge:'Generations skifte.', peers:['Djurslands Bank'], whyKnow:'Den ægte lillesøster.'
  },
  {
    name:'Prime Office', ticker:'PRIMOF.CO', domain:'primeoffice.dk', sector:'Real Estate', industry:'Real Estate Management',
    frontClues:['Opkøbte de historisk stabile tyske lejligheder, længe inden andre tænkte tanken, fra base i Jylland?','Styrede de butikken og de store boligkomplekser helt ind i kernen (blandt andet i Kiel, og Lübeck)?','Kører der udbyttebetaling via aktietilbagekøb af en ret lille frit svømmende aktie andel?'],
    what:'Ejendomsselskab fokusere primært nord-tyskland (boligudlejning plus kontorer) med tryk på tysk stabilitet og opskrivning.',
    valuation:'P/Nav', avgMcap12mDkkBn:0.75, dkRankText:'Danmarks 54. største selskab målt på market cap.',
    whyTrades:'Det er "bare" en tysk bolig exponsing til 85% NAV discount, i en børsindpakning. Kører stærkt defensiv.', peerValuation:'Premium kontra gælds-nedtyngede Vonovia i tyskerland.', drivers:'Renter i euro zonen og tysk regulation.', challenge:'Tysk lejekontrol.', peers:['Vonovia','Jeudan'], whyKnow:'Den tyske jyske mursten.'
  },
  {
    name:'TCM Group', ticker:'TCM.CO', domain:'tcmgroup.dk', sector:'Consumer Discretionary', industry:'Consumer Durables',
    frontClues:['Udgør de køkken-sværvægterne i Skandinavien med brandet Svane Køkkenet og Tvis Køkkener?','Har branchens salg taget massivt dyk for nylig, pga inflations dræbt lavt bygge lyst og boligsalg falmet?','Er de operationelt drevet meget effektivt i Jylland lige ved Holstebro?'],
    what:'Producerer og designer bad, garderobe og køkken.',
    valuation:'Fwd P/E', avgMcap12mDkkBn:0.70, dkRankText:'Danmarks 55. største selskab målt på market cap.',
    whyTrades:'Man satser på at vi i morgen køber huse og bygger om igen, ekstremt bolig-sentiment driver.', peerValuation:'Kæmpe peer mod svenske Nobia.', drivers:'Boligomslætning, inflation for købere.', challenge:'DIY og Ikea pressure.', peers:['Nobia','Ikea'], whyKnow:'Ren Køkken eksponering.'
  },
  {
    name:'Asetek', ticker:'ASTK.CO', domain:'asetek.com', sector:'Information Technology', industry:'Computer Hardware',
    frontClues:['Fik en Dansker ideen til verdens skarpeste væske-køling chips design til ekstreme Esports pcere?','Producerer de sim-racing rettet især de ægte rat / pedaler med direkte drive magi fra fankultur?','Sidder de fast i at de asiasiske brands tager patent kopi profit på low-end markedet?'],
    what:'Hardware engineering, stærk i væskekøling til CPU’ere',
    valuation:'EV/Sales', avgMcap12mDkkBn:0.58, dkRankText:'Danmarks 56. største selskab målt på market cap.',
    whyTrades:'Niche hardware-turn-around i sim racing vs kerne pc hardware der bliver modnet. Skiftet deres børsliste mod DK for tæt relation.', peerValuation:'Præmie for high-end gaming (som Corsair).', drivers:'Sim racing market uptake.', challenge:'Kina kloning.', peers:['Corsair','Logitech'], whyKnow:'Dansk E-sports kølerikon.'
  },
  {
    name:'BioPorto', ticker:'BIOPOR.CO', domain:'bioporto.com', sector:'Health Care', industry:'Diagnostics',
    frontClues:['Håbede markedet for år tilbage at NGAL (kidney disease biomarkøren) ville smadre salget vildt i USA?','Trak FDA ansøgningstræk i langdrag således aktier har handlet som wild-west de senest 10 år uden gennembrud?','Håber de på at "Triage" på hospitaler redder de akutte sygepleje og giver dem profit boom omsider?'],
    what:'Dansk bioteknik diagnostic provider. De vil ændre standard of care på nyresvigt diag. på stuerne globalt.',
    valuation:'EV', avgMcap12mDkkBn:0.48, dkRankText:'Danmarks 57. største selskab målt på market cap.',
    whyTrades:'Ren "lotto" aktie for biotek speculanterne der har lidt store tab i nyheder der udsættes.', peerValuation:'Rabat.', drivers:'FDA test adoption and partnerskaber (Roche).', challenge:'Burn rates uden endnu real cash stream.', peers:['Coloplast'], whyKnow:'Den klassiske Biotek forhåbning.'
  },
  {
    name:'Gabriel Holding', ticker:'GABR.CO', domain:'gabriel.dk', sector:'Consumer Discretionary', industry:'Textiles',
    frontClues:['Lever de "usynligt" det premium tekstil stof der er om betrækket i alt fra lufthavns loungestolerne til high end møbler i New York?','Opfinder de og spinder i en gammel og dybt respekteret aalborg virksomhed (grundlagt 1851)?','Er kontor stol markedets nedtur svær pgs remote arbejdskurs (post covid).?'],
    what:'Møbel og rumtekstil specialist b2B.',
    valuation:'Fwd P/E', avgMcap12mDkkBn:0.45, dkRankText:'Danmarks 58. største selskab målt på market cap.',
    whyTrades:'Kvalitets og langsigts operation mod udvalgte grossister i krise, value.', peerValuation:'Pæne tal.', drivers:'Design, kontor indretninger.', challenge:'Cyklisk.', peers:['Kvadrat'], whyKnow:'Usynlig dominant luksus.'
  },
  {
    name:'5th Planet Games', ticker:'5PG.OL', domain:'5thplanetgames.com', sector:'Communication Services', industry:'Gaming',
    frontClues:['Var de tidligere "Hugo Games", fokuseret på skærmtrolden der var folkekær på tv, mens Hugo blev børs mælk?','Blev deres mobile gaming division smadret men overtraget delene af Hollywood power investorer og ændret model helt?','Sikret IP rettigheder og samarbejder bla omkring The Walking Dead?'],
    what:'Co-publisher/investor til spil - ofte i de mindre mobil / consol genrer - via IP branding.',
    valuation:'Option valu', avgMcap12mDkkBn:0.40, dkRankText:'Danmarks 59. største selskab målt på market cap.',
    whyTrades:'Microcap option value aktie (dansk styret via norsk börs).', peerValuation:'Par.', drivers:'Licenser på mobil hit release.', challenge:'Spil flopps.', peers:['Trophy Games'], whyKnow:'Spil-boom og krise i ét.'
  },
  {
    name:'Trophy Games', ticker:'TGAMES.CO', domain:'trophy-games.com', sector:'Communication Services', industry:'Gaming',
    frontClues:['Driver de manager sport mobil spil som Airline Manager ell er det fodbold? (Både og).?','Vokser de ultra aggressivt ved M&A ("At købe døende titler the rest ikke vil ha" til low multipler og forny i app)?','Har den karismatiske grundlægger med "poker og gade vibe" overbevist store dele af first north segmentet om en ærlig model?'],
    what:'Aggressiv data-dreven mobilspils producent / acquirer fra cph city.',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:0.38, dkRankText:'Danmarks 60. største selskab målt på market cap.',
    whyTrades:'Profit model - er i bund og grund et lille asset køber firma der kører optimering på software og markedsføringen.', peerValuation:'Præmie first north.', drivers:'Nye managers games lanches / opkøb.', challenge:'Mobile CAC og privacy rules (apple track).', peers:['5th Planet Games','Stillfront'], whyKnow:'Game turnaround konger.'
  },
  {
    name:'Hvidbjerg Bank', ticker:'HVID.CO', domain:'hvidbjergbank.dk', sector:'Financials', industry:'Regional Banking',
    frontClues:['Lyder den lidt ukendt for Københavnere, som endnu en hyggelig nord/vestjysk landbobank filial?','Er afkastet solid som klippe til udland / udbyttespekulanter.?','Er likviditeten på aktien typisk ca 0 kr hvis du vil handle indenfor 300 sekunder på det danke main market?'],
    what:'Den lokale sparegris / udbytte maskine / jysk.',
    valuation:'P/B', avgMcap12mDkkBn:0.35, dkRankText:'Danmarks 61. største selskab målt på market cap.',
    whyTrades:'Samme sang. Lokale stærk relation og dygtig risikostyring fra landmænd/SMEer.', peerValuation:'P/B 0.6 lignende lavt.', drivers:'Højrente.', challenge:'Vækst grænse lokalt.', peers:['Ringkjøbing'], whyKnow:'Hyggeligt MicroCap.'
  },
  {
    name:'Aquaporin', ticker:'AQP.CO', domain:'aquaporin.com', sector:'Industrials', industry:'Water Filtration',
    frontClues:['Gør selskabet alt på et vidunder filter baseret på en Nobel vindende biotek membran ("aqua porin protein")?','Skulder vandfiltrering af rumnationen, saltvand til drikkevand el hushold v. bio-vandfiltrene?','Var hypen stor men det kommercielle skred svært indtil en nylig stor restrukturering og direktørflugt?'],
    what:'Deep-tech clean water selskab. Kan filtrere beskidt vand næsten perfekt energi neutralt via proteiner.',
    valuation:'EV/Sales', avgMcap12mDkkBn:0.03, dkRankText:'Danmarks 62. største selskab målt på market cap.',
    whyTrades:'Høj forhåbnings tech platform der endnu brænder masser kasse under B2B rollout.', peerValuation:'Deep tech.', drivers:'Kinesist og industri order uptake.', challenge:'At levere før the money out.', peers:['Alfa Laval'], whyKnow:'Vilde dk opfindelser for fremtiden.'
  },
  {
    name:'IO Biotech', ticker:'IOBT', domain:'iobiotech.com', sector:'Health Care', industry:'Biotech',
    frontClues:['Er dette dansk grundlagte cancer vaccine selskab baseret og noteret på Nasdaq i US og ikke Danmark?','Vacciner de dit ejet immunforsvar / T-celler the dræbe "TDO" / krabber inde i tumor micro miljø.?','Pumper kæmpe fundings bag selskabet, af bl.a the big danske Fonde, Novo Holdings mv.?'],
    what:'Forsker og klinisk afprøver en særlig cancer immunterapi teknologi på T-celler mod de celler som canceren gemmer sig bag.',
    valuation:'Cash vs MarketCap (0 til lotto)', avgMcap12mDkkBn:0.02, dkRankText:'Danmarks 63. største selskab målt på market cap.',
    whyTrades:'Som med andre ultra sen-fase US the er short sellers and data-point fear massi.', peerValuation:'Biotech standarder.', drivers:'KeyTruda trial data readout soon.', challenge:'Biologisk feasibility.', peers:['Evaxion'], whyKnow:'Danskere i US Biotech the big gamble.'
  }
];
