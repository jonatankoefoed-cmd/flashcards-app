const COMPANY_CARDS_3 = [
  {
    name:'Matas', ticker:'MATAS.CO', domain:'matas.dk', sector:'Consumer Discretionary', industry:'Retail',
    frontClues:['Går du næsten med garanti forbi en af deres ikoniske stribede butikker, ligegyldig hvilken gågade du besøger i Danmark?','Opkøbte de svenske KICKS for at transformere sig fra en lokal dansk materialist-kæde til et nordisk "Beauty Powerhouse"?','Er de kendt for "Club Matas", der vel nok er Danmarks i særklasse mest succesfulde kundeklub?'],
    what:'Dansk materialist-kæde stiftet i 1949. Sælger kosmetik, personlig pleje, helsekost og receptpligtig medicin via franchise- og egne butikker samt e-handel.',
    valuation:'Fwd P/E', avgMcap12mDkkBn:4.8, dkRankText:'Danmarks 64. største selskab målt på market cap.',
    whyTrades:'Aktien var længe en kedelig udbytteaktie (retail rute) men med det svenske opkøb (KICKS) forventer markedet store synergier.', peerValuation:'Rabat vs Sephora / online-only Lyko pga tung fysisk kæde i DK.', drivers:'Online vækst vs fald i fodgængertrafik på gågader. KICKS turn-around.', challenge:'Hård online konkurrence fra Normal, Lyko og tildels Amazon.', peers:['Lyko','Boots'], whyKnow:'Mindre dansk retail kæmpe i flot digital omstilling.'
  },
  {
    name:'Tivoli', ticker:'TIV.CO', domain:'tivoli.dk', sector:'Communication Services', industry:'Entertainment',
    frontClues:['Er det Danmarks ubeskridt mest magiske forlystelsespark og kendt i hele verden?','Skraber de indtjening ved at leje boderne dyrt ud midt i København samt tage store beløb for billetter?','Var Walt Disney på et enormt inspiratorions-besøg hos dem inden sit eget projekt?'],
    what:'Ikonisk forlystelsespark centralt placering i København (bygget i 1843).',
    valuation:'EV/EBITDA og P/B (ejendomme)', avgMcap12mDkkBn:3.9, dkRankText:'Danmarks 65. største selskab målt på market cap.',
    whyTrades:'Klassisk "oplevelsesøkonomi". Afkast er dybt begrænset af plads og vejret. En sikker men stille udbytteaktie-profil (skrøbelig ved kriser).', peerValuation:'Handels marginalt som et ejendoms-play i indre By over ren P/E.', drivers:'Kultur-trends, turisme i KBH.', challenge:'Inflation puster til omkostninger mens man ikke kan fjerne sig fysisk.', peers:['Disney Parks'], whyKnow:'National folke klenodie.'
  },
  {
    name:'H+H International', ticker:'HH.CO', domain:'hplush.com', sector:'Materials', industry:'Construction Materials',
    frontClues:['Former og bygger vi europa af deres klassiske "hvide store elementer" – nemlig gasbeton og kalksandsten?','Leverer de især de basale materialer til både tyske og britiske husprojekter?','Flyder deres marginer oftest direkte med renten – er boligbyggeriet dødt er indtjeningen i kulkælderen?'],
    what:'Nordeuropæisk markedsleder i produktion af porebeton ("gasbeton") og kalksandsten primært for hus-byggeriet.',
    valuation:'P/B & Fwd P/E', avgMcap12mDkkBn:1.5, dkRankText:'Danmarks 66. største selskab målt på market cap.',
    whyTrades:'En ultra-cyklisk "value-trap / vinder" aktie der udelukkende lever af hvor mange nye huse der bygges (housing starts).', peerValuation:'Ekstremt billig på midcycle. Rabat grundet hård gæld/inflation.', drivers:'Rente nedsættelser udgør katalysatoren for boomende husbyg.', challenge:'Omk. (energi) vs prissætning power.', peers:['Wienerberger'], whyKnow:'Husbyggeres guld og lort.'
  },
  {
    name:'Flügger', ticker:'FLUG-B.CO', domain:'flugger.com', sector:'Materials', industry:'Chemicals (Paint)',
    frontClues:['Har de solgt maling, træbeskyttelse og pensler - primært til det nordiske proff-marked - igennem utallige små blåhvide butiks-franchise?','Blev deres indtjening massivt blæst af banen da rusland og polen fabrikker og materialepriser (Titandioxid) stod af the charts efter kriser?','Leder den mangeårige ejerfamilie (Schnack) stadig showet bag roret?'],
    what:'Producent af især maling til overvejende byggeriet. Kontrollerer hele supply chain, inkl produktion og detailslag.',
    valuation:'EV/Sales', avgMcap12mDkkBn:1.1, dkRankText:'Danmarks 67. største selskab målt på market cap.',
    whyTrades:'Et mellemstor defensiv/cycklisk play med højt fokus på en restrukturering i Polen. Lav "Free-float".', peerValuation:'Konkurrerer mod bl.a Norsjo / The store globale AkzoNobel.', drivers:'Nordisk hus-renovering. Råvarepriser.', challenge:'Mangel / overkapacitet i branchen.', peers:['AkzoNobel'], whyKnow:'Maler mester farver.'
  },
  {
    name:'Fynske Bank', ticker:'FYNK.CO', domain:'fynskebank.dk', sector:'Financials', industry:'Regional Banking',
    frontClues:['Dækker de især den varme fynske muld ift at drive lån til småvirksomheder og almindelig husholdning?','Måtte banken skabes ved en nød/strategisk redningsfusion mellem Svendborg Sparekasse og Vestfyns Bank en del år The?','Giver bankens store "aktionar" / Fonden enorme summer til lokale kultur formål, som er svære for storbankerne udefra?'],
    what:'Selvstændig lokalt funderet bank på fyn og trekantsområdet med stærkt forankring og fynsk tilstedeværelse.',
    valuation:'P/B', avgMcap12mDkkBn:0.9, dkRankText:'Danmarks 68. største selskab målt på market cap.',
    whyTrades:'Købes 1) til et højt direct udbytte 2) som evig fusionskandidat til "en støre" hvis markedet crasher.', peerValuation:'Klassisk lav M/B hos danske sparrekasser.', drivers:'Nedskrivinger op / ned hos Fynske landmænd / små erhverv.', challenge:'Digitalisering og lovkrav-omkostninger presser dem voldsomt ift. storbankerne.', peers:['Sydbank'], whyKnow:'Lokal konsolodering fond.'
  },
  {
    name:'HusCompagniet', ticker:'HUSCOMP.CO', domain:'huscompagniet.dk', sector:'Consumer Discretionary', industry:'Homebuilding',
    frontClues:['Bygger de de fleste af de klassiske danske nye store typiske villaer på de ny-udstykkede marker udenfor storbyerne?','Bliver deres aktiekurs smadret lynhurtigt lige indtil det sekund renten sænkes og typehussalgene atter stiger the the sky?','Opstod de fra "FM-Søkjær" da EQT satte dem på børsen med lovningen "lav-risiko / vi tjener KUN penge NÅR hus er faldet på plads"?'],
    what:'Nordens største producent af fritidshuse / enfamiliebylænger / typehus "fra bund til nøgle i døren".',
    valuation:'Fwd P/E', avgMcap12mDkkBn:0.8, dkRankText:'Danmarks 69. største selskab målt på market cap.',
    whyTrades:'Man investerer udelukkende indirekte sit syn på Danmarks faste ejendoms market - den er total afhængig af at landmålere the the salg og renten dertil the.', peerValuation:'Asset-light model (Ingen lager jord - the the pay as the build) bør give PE prm ift tykke swediske The NCC.', drivers:'De faldende the faste centralbank renter.', challenge:'Total The i typehus bestillinger.', peers:['MT Højgaard'], whyKnow:'Dansk ejendoms market beta.'
  },
  {
    name:'RTX', ticker:'RTX.CO', domain:'rtx.dk', sector:'Information Technology', industry:'Electronic Equipment',
    frontClues:['Lavede de tidligere "danske" DECT trådløste baby-alarmer/fastnettelefoner, men designer nu utrolig avancerede trådløse enheder the store The Brands (OEM) som Siemens The Motorola?','Ligger de stolt nordjyskt i Nørresundby og opbygger enorme The the viden.?','Har selskabet oplevet at The de lever deres chip - står BtoB grossisternes kæmpe bugnede lagere (post covid lagre) bare in vejen?'],
    what:'Niche the The designer og the /The The wireless trådløste btoB headsets / medic udstyr the The. The',
    valuation:'EV/EBITDA', avgMcap12mDkkBn:0.35, dkRankText:'Danmarks 70. største selskab målt på market cap.',
    whyTrades:'Når OEM udstyr (business office) the at the - eksploderer deres margin der normal er god The.', peerValuation:'Rabat mod f.eks svenske The Mycronic etc the manglende consumer synlighed.', drivers:'Inventory nedskrivning og OEM opstart the the produkte the.', challenge:'Kunde forsinket af OEM partnere der ændrer mening The.', peers:['B&O'], whyKnow:'Det usynlige hardware hjernecenter.'
  },
  {
    name:'Green Hydrogen Systems', ticker:'GREENH.CO', domain:'greenhydrogen.dk', sector:'Industrials', industry:'Electrical Equipment',
    frontClues:['Var de et kæmpe stort the ESG the The ("PtX The boom") i Kolding bygge the at lave enorme the The alkalines the maskiner THE (Electrolyzere) de laver the brint?','Kollapsede kursen the the som det the sig at The at bygge de her the brint maskiner tog the år the og The the brændte the?','Holdte the de store The the kapital fonde aktie the - The the Mærsk The indtil for  lig for the the Mærsk family.?'],
    what:'Fabrikant i Kolding d. brintanlæg / elektrolyseteknologi for at fremstille the grønt the power the the X.',
    valuation:'Brænd The til market kasset The The / 0 cash', avgMcap12mDkkBn:0.3, dkRankText:'Danmarks 71. største selskab målt på market cap.',
    whyTrades:'Deep the option - overlever the og bliver en dominerrende spiller mod Nel The? Aktien er The højrisky the.', peerValuation:'Ekstremt lille aktør the - vs Norske the "Nel The".', drivers:'Etablering af stor The the Europa the brint infrastrukur rør.', challenge:'Cash burn burn the.', peers:['Nel ASA'], whyKnow:'Danmarks brint drøm der the.'
  },
  {
    name:'Penneo', ticker:'PENNEO.CO', domain:'penneo.com', sector:'Information Technology', industry:'Software / SaaS',
    frontClues:['Startede de med at lave the the NemID the underskrifts platform (Digital signs) udelukkende the the til Revisorer i DK the?','Vokser de the nu stensikkert the ud the af de Nordiske the grænser (AMl og the compliance (The) mod Belgien/The?','Vurderer the især aktien the udfra the den mængde "ARR the The milde the (årlige gentagende indtænjet) the?'],
    what:'Dansk The SaaS-selskab specialiseret mod primært revisions -/ advokat branchen the. compliance(AML) The The digital on-boardng / skrift the.',
    valuation:'EV/ARR (the saaS multi the The /', avgMcap12mDkkBn:0.25, dkRankText:'Danmarks 72. største selskab målt på market cap.',
    whyTrades:'Revisore elske dem the - så "Churn" (The the the) the ekstremt the lav The. The Håber på that platform udvides the hele europa Europa.', peerValuation:'Lider under d. first nord "the discount".', drivers:'Nye produkter The - AML (anti the The) d. Tyskland expansion.', challenge:'DoxcuSign/ The Doc / globale spillers indtrud. The The', peers:['cBrain','Docusign'], whyKnow:'Revisor the The darling.'
  },
  {
    name:'Freetrailer', ticker:'FREETR.CO', domain:'freetrailer.com', sector:'Industrials', industry:'Transportation / Rental',
    frontClues:['Kan man the bruge the leje The deres trailere FULDSTÆNDIG THE GRATIS udenfor The the Ikea / Bilka the bare vedi e at The at bruge The the The APP?','Er The model the vitterligt The The en the genialitet the i at at the at virksomheden (feks THE The IKEA) der har traileren på P-plads Betaler dem For en kørrende reklamesøjle?','The voksede the appen sig The The i the stor the også i Sverige Tyskland og har nu over of the millioner de the rentalThe The d.?'],
    what:'De-leger the den trailer udlenning. the Er i the The "Sharing economy" . the De de The via APP The ejer minimal The af The the de biler (Asset-The the light). The The indtjening gennem partner (The Ikea The The',
    valuation:'EV/EBITDA de The P The / Fwd The P/The E', avgMcap12mDkkBn:0.2, dkRankText:'Danmarks 73. største selskab målt på market cap.',
    whyTrades:'Er et the sjældent the "Mikro the Cap the selskab the der the LÅSTE the koden" og the faktisk generere The god the organinsk The de fri pengestrøm. Udbyttet the betales the aktien the vokser .', peerValuation:'Unik  den nordiske the  Model.', drivers:'Nye partnere The tyskland The d. Sverige The e-trailer opdateringer.', challenge:'Hvis The Partnere  The (Ikea The  The the . the) dropper conceptet The  The', peers:['The U-Haul'], whyKnow:'App økonomi that works The i dk the.The'
  },
  {
    name:'OrderYOYO', ticker:'YOYO.CO', domain:'orderyoyo.com', sector:'Information Technology', industry:'Software / SaaS',
    frontClues:['Giver de the The de det the det de lokale Pizza The The mand en The the MÅDE at sige the the "Fxxx The  Wolt The og Just-The Eat"?','Ledere the the the the pizzaria via The Deres app The . The hvid labels system The så the the profit The The  er til dem selv.?','Slog de the The sig the sig the sammen the the Tyske / The EU the the partnere til the en the dominant The SaaS  en the the take THE away?'],
    what:'Bygger the og white-label den web og the the bestillings the app the direkte The the b. restauranter - en de SaaS / the White de model, the for The the the at the modstå platform aggregators.',
    valuation:'EV/ARR de The og the Rule 40+', avgMcap12mDkkBn:0.18, dkRankText:'Danmarks 74. største selskab målt på market cap.',
    whyTrades:'Højthe organisk the og stabil M&T . Markedet the elsker their evne the tjene The the de de The fri cash THE flow .', peerValuation:'P/E the rabat men SaaS The premium The', drivers:'Nye pizza The  / the the the take the The away. the  Tyskland markeds the  den', challenge:'Wolt ,the JUST The at The driver the the local take aways The t the the sig. d.', peers:['Just Eat Takeaway.com','Wolt'], whyKnow:'Pizza SaaS platform THE udmaner.'
  },
  {
    name:'Shape Robotics', ticker:'SHAPE.CO', domain:'shaperobotics.com', sector:'Information Technology', industry:'EdTech / Hardware',
    frontClues:['The Bygggede the de bygget "Fable. d. de The " et the et modulær The den The den The robot (Kombinede motor the The i The legoklodser) der lærer børn The kodning The ?','Uddannede The The aktien de i gigant the EU the bud-udbud hvor d. the d the hele The den rumæniske The The schools the THE digitaliserede med robot The labs?','Blev de ramt de hård af den the uheldig afhænghed at distributører The The M&The the / the The opkøbs- the the rod The i d the . the ledelse i The The i 2024?'],
    what:'Dansk The ed-The / the Hardware d the The . the udbyder EdTech The "the Fable" The The undervinsng The robotter the at lær den kodning The .The',
    valuation:'EV/Sales The de og EV / EBITDA d THE', avgMcap12mDkkBn:0.1, dkRankText:'Danmarks 75. største selskab målt på market cap.',
    whyTrades:'Vanvittig rakat i the the period the men med den et the de ENORMT. The . udlandet The the market The the (EU Recovery fond d. the digital skolestuer) d i østeuropa. høj the the risiko. The', peerValuation:'Svang the de . The . the svær at Vurder THE . The.', drivers:'The den Nye udbuds The . fonde fra the eu til the The d de. the skolenetværk.', challenge:'At levere the pænt d . overskud the konsekvent the THE the pA Bundlinjen de', peers:['Lego Education'], whyKnow:'Dansk the EdTech eventry The The kriser d'
  }
];
