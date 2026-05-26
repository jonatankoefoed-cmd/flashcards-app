'use strict';
/* ════════════════════════════════════════════════
   Field Dynamics Top 50
   Curated stakeholder, incentive and practical IB flashcards
════════════════════════════════════════════════ */

const FIELD_DYNAMICS_CARDS = [
  {
    id:'fd_001',
    deckId:'field_dynamics',
    q:'Hvad er stakeholder analysis i M&A/ECM?',
    a:`Stakeholder analysis handler om at forstå, hvad hver aktør forsøger at maksimere, hvad de frygter, og hvilke begrænsninger de arbejder under.<br><br><strong>Mental model:</strong> En transaktion er et incentive game, ikke kun en finansiel beregning. Pris, proces, information, timing og ansvar bliver alle påvirket af aktørernes payoff og downside.`
  },
  {
    id:'fd_002',
    deckId:'field_dynamics',
    q:'Hvad betyder wants vs. fears i en stakeholder matrix?',
    a:`<strong>Wants</strong> er aktørens payoff: pris, kontrol, IRR, liquidity, certainty, fees, strategisk position eller downside protection.<br><br><strong>Fears</strong> er det scenarie, aktøren vil undgå: overbetaling, failed deal, dilution, litigation, tab af kontrol, covenant breach eller dårlig exit.<br><br><strong>Praktisk brug:</strong> Hvis du forstår frygten, forstår du ofte kravet om protection.`
  },
  {
    id:'fd_003',
    deckId:'field_dynamics',
    q:'Hvad betyder risk-adjusted value i en transaktion?',
    a:`Risk-adjusted value er værdien af et bud efter justering for vilkår, certainty og execution risk.<br><br><strong>Pointen:</strong> Det højeste headline-bud er ikke altid det bedste bud. Et lidt lavere bud med sikker finansiering, få regulatoriske risici og rene vilkår kan være mere værd end et højt bud, der let falder fra hinanden.`
  },
  {
    id:'fd_004',
    deckId:'field_dynamics',
    q:'Hvorfor er information asymmetry central i M&A og ECM?',
    a:`Information asymmetry betyder, at parterne ikke ved det samme. Sælger kender target bedre end køber. Issuer kender selskabet bedre end nye investorer.<br><br><strong>Konsekvens:</strong> Mindre information giver lavere pris, mere discount eller hårdere contractual protection. Mere information kan øge pris og certainty, men kan også skade confidentiality.`
  },
  {
    id:'fd_005',
    deckId:'field_dynamics',
    q:'Hvad betyder board defensibility?',
    a:`Board defensibility betyder, at bestyrelsen kan dokumentere, at den handlede informeret, uafhængigt og i aktionærernes interesse.<br><br><strong>Det handler om tre ting:</strong><ul><li>Var processen ordentlig?</li><li>Var beslutningen baseret på relevant information?</li><li>Kan pris, timing og valg af modpart forsvares bagefter?</li></ul>Bestyrelsen maksimerer ikke kun pris. Den maksimerer en beslutning, den kan stå på mål for.`
  },
  {
    id:'fd_006',
    deckId:'field_dynamics',
    q:'Hvad er CEO/CFO agency conflict i M&A?',
    a:`Agency conflict opstår, når ledelsen har personlige incitamenter, der afviger fra aktionærernes.<br><br><strong>CEO/CFO kan ønske:</strong> vækst, prestige, større organisation, jobsikkerhed, strategisk handlefrihed og stærkere markedsposition.<br><br><strong>Aktionærer ønsker:</strong> risikojusteret afkast. Konflikten opstår, når ledelsen forfølger størrelse eller narrativ værdi frem for shareholder value.`
  },
  {
    id:'fd_007',
    deckId:'field_dynamics',
    q:'Hvad er empire building i strategisk M&A?',
    a:`Empire building er når ledelsen køber eller investerer for at gøre selskabet større, ikke nødvendigvis bedre.<br><br><strong>Mekanismen:</strong> Større selskab kan give højere kompensation, mere prestige og mere intern magt. Aktionærernes risiko er, at management overvurderer synergier og betaler for meget, fordi transaktionen også gavner management personligt.`
  },
  {
    id:'fd_008',
    deckId:'field_dynamics',
    q:'Hvordan adskiller boardets rolle sig fra managements rolle?',
    a:`<strong>Management</strong> driver strategi, forhandlinger, forecasts og den daglige proces.<br><br><strong>Boardet</strong> skal udfordre management, beskytte aktionærerne og sikre en forsvarlig beslutning.<br><br><strong>Praktisk konsekvens:</strong> En CEO kan ønske at pushe en deal. Boardet skal spørge: er prisen, processen, risikoen og alternativerne dokumenteret godt nok?`
  },
  {
    id:'fd_009',
    deckId:'field_dynamics',
    q:'Hvordan tænker en founder eller familiesælger anderledes end en finansiel sælger?',
    a:`En founder eller familie sælger ofte ikke kun et finansielt aktiv. De sælger identitet, legacy, medarbejderrelationer og kontrol.<br><br><strong>De kan derfor vægte:</strong> købers kultur, behandling af medarbejdere, brandets fremtid, lokal forankring og diskretion.<br><br><strong>Praktisk læring:</strong> Det bedste bud skal tale til både pris og emotionel risiko.`
  },
  {
    id:'fd_010',
    deckId:'field_dynamics',
    q:'Hvordan adskiller en PE-sælger sig fra en børsnoteret bestyrelse?',
    a:`<strong>PE-sælger:</strong> fokuserer typisk på pris, clean exit, timing, certainty og kapitalretur til LP'er.<br><br><strong>Børsnoteret bestyrelse:</strong> fokuserer på governance, fairness, disclosure, minoritetsbeskyttelse og defensibility.<br><br><strong>Konklusion:</strong> Samme headline-pris kan vurderes forskelligt, fordi sælgernes constraints er forskellige.`
  },
  {
    id:'fd_011',
    deckId:'field_dynamics',
    q:'Hvad ønsker en strategisk køber?',
    a:`En strategisk køber ønsker kontrol over et asset, der kan forbedre den industrielle position: synergier, teknologi, kunder, distribution, pricing power, scale eller supply chain-kontrol.<br><br><strong>Mental model:</strong> Strategic value kommer fra, hvad køber kan gøre med selskabet efter closing, ikke kun fra targetets standalone cash flows.`
  },
  {
    id:'fd_012',
    deckId:'field_dynamics',
    q:'Hvorfor kan strategiske købere ofte betale mere end PE?',
    a:`Strategiske købere kan ofte betale mere, fordi de kan realisere synergier, som en finansiel køber ikke kan.<br><br><strong>Eksempler:</strong> cost synergies, cross-selling, procurement savings, produktion, distribution, skattepositioner eller fjernelse af konkurrent.<br><br><strong>Pointen:</strong> De køber ikke bare cash flows. De køber kombinationsværdi.`
  },
  {
    id:'fd_013',
    deckId:'field_dynamics',
    q:'Hvorfor kan strategiske opkøb destruere værdi?',
    a:`Strategiske opkøb destruerer værdi, når køber betaler for synergier, der ikke realiseres.<br><br><strong>Typiske fejl:</strong><ul><li>Overvurderede cost synergies</li><li>Undervurderet integrationsrisiko</li><li>Kulturelt mismatch</li><li>For aggressiv budproces</li><li>Winner's curse</li></ul><strong>Husk:</strong> Excel-synergier er ikke det samme som realiserede synergier.`
  },
  {
    id:'fd_014',
    deckId:'field_dynamics',
    q:'Hvilke interne konflikter findes hos en strategisk køber?',
    a:`En strategisk køber er sjældent en samlet aktør med én holdning.<br><br><strong>CEO/business owner</strong> vil ofte have vækst og strategisk momentum. <strong>CFO</strong> fokuserer på pris, leverage, EPS-effekt og downside. <strong>Corp Dev</strong> vil eksekvere. <strong>Integrationsteamet</strong> bekymrer sig om realisme og drift.<br><br><strong>Praktisk læring:</strong> Find ud af hvem der reelt kan stoppe handlen.`
  },
  {
    id:'fd_015',
    deckId:'field_dynamics',
    q:'Hvad er PE sponsor ability-to-pay?',
    a:`Ability-to-pay er den maksimale pris, en PE-fond kan betale og stadig nå target IRR givet leverage, vækst, cash conversion og exit multiple.<br><br><strong>Det er ikke intrinsic value.</strong> Det er en bagudregning fra et ønsket afkast til en maksimal entry price.<br><br><strong>Spørgsmålet er:</strong> Hvad kan vi betale og stadig underwrite et attraktivt equity return?`
  },
  {
    id:'fd_016',
    deckId:'field_dynamics',
    q:'Hvad frygter en PE-sponsor mest i en buyout?',
    a:`PE frygter overbetaling, EBITDA-fald, covenant stress, svag exit, hidden liabilities, dårlig cash conversion og key people leaving.<br><br><strong>Den centrale risiko:</strong> Entry price plus leverage skal bæres af den reelle cash flow-profil. Hvis EBITDA er oppustet eller cash conversion svag, kan equity case bryde sammen hurtigt.`
  },
  {
    id:'fd_017',
    deckId:'field_dynamics',
    q:'Hvad er sponsor IRR vs. seller price konflikten?',
    a:`Sælger vil maksimere pris. PE-sponsor kan kun betale en pris, der stadig giver target IRR.<br><br><strong>Mekanismen:</strong> Højere entry price betyder lavere equity upside, medmindre fonden kan kompensere gennem mere gæld, stærkere value creation eller højere exit multiple.<br><br><strong>Konflikten løses ikke ved goodwill.</strong> Den løses i modellen.`
  },
  {
    id:'fd_018',
    deckId:'field_dynamics',
    q:'Hvad er management rollover, MIP og sweet equity?',
    a:`I en PE-buyout får management ofte mulighed for at rulle noget provenu videre og investere i en Management Incentive Plan.<br><br><strong>Formål:</strong> Ledelsen går fra at være ansatte til at have direkte upside ved exit.<br><br><strong>Konflikt:</strong> Det kan skabe stærk alignment med PE, men også påvirke managements præference for PE frem for en strategisk køber, selv hvis strategen betaler mere.`
  },
  {
    id:'fd_019',
    deckId:'field_dynamics',
    q:'Hvad ønsker institutionelle investorer i ECM?',
    a:`Institutionelle investorer ønsker attraktiv pris, klar equity story, nok information, god liquidity, fair allocation og kompensation for risiko.<br><br><strong>De køber ikke bare aktien.</strong> De køber risikoen ved at committe kapital på et bestemt informationsgrundlag og under en bestemt tidshorisont.<br><br><strong>Derfor betyder trust i issuer og banken meget.</strong>`
  },
  {
    id:'fd_020',
    deckId:'field_dynamics',
    q:'Hvorfor kræver investorer discount i en ABB?',
    a:`I en ABB skal investorer beslutte sig hurtigt, ofte med begrænset information og stor placement-size.<br><br><strong>Discounten kompenserer for:</strong><ul><li>Liquidity risk</li><li>Information asymmetry</li><li>Execution risk</li><li>Adverse selection: hvorfor sælges aktierne nu?</li></ul>Hvis discounten er for lille, bliver bogen svær at fylde. Hvis den er for stor, kan den signalere svaghed.`
  },
  {
    id:'fd_021',
    deckId:'field_dynamics',
    q:'Hvad er konflikten mellem lenders og equity sponsors i et LBO?',
    a:`<strong>Lenders</strong> har begrænset upside og fokuserer på downside protection: cash buffer, covenants, lav leverage og stabil debt service.<br><br><strong>Equity sponsors</strong> har asymmetrisk upside og vil optimere equity return gennem leverage, vækst, add-ons og eventuelt dividend recaps.<br><br><strong>Konflikten:</strong> Den ene side vil beskytte principal. Den anden side vil maksimere equity upside.`
  },
  {
    id:'fd_022',
    deckId:'field_dynamics',
    q:'Hvordan skaber lawyers værdi i en transaktion?',
    a:`Lawyers omsætter økonomisk risiko til juridisk risk allocation.<br><br><strong>De arbejder med:</strong> SPA, warranties, indemnities, covenants, closing conditions, disclosure schedules og liability caps.<br><br><strong>Mental model:</strong> Når økonomien er aftalt, flytter kampen ofte til hvem der bærer risikoen, hvis virkeligheden viser sig anderledes end antaget.`
  },
  {
    id:'fd_023',
    deckId:'field_dynamics',
    q:'Hvad er FDD/QoE og normalized EBITDA?',
    a:`Financial Due Diligence eller Quality of Earnings tester den underliggende earnings base.<br><br><strong>Fokus:</strong> normalized EBITDA, one-offs, revenue recognition, working capital, cash conversion, customer concentration, net debt og hidden liabilities.<br><br><strong>Pointen:</strong> FDD forsøger at finde ud af, hvad selskabet reelt tjener på en normaliseret basis.`
  },
  {
    id:'fd_024',
    deckId:'field_dynamics',
    q:'Hvorfor påvirker normalized EBITDA salgsprisen direkte?',
    a:`I mange M&A-handler beregnes enterprise value som multiple gange normalized EBITDA.<br><br><strong>Eksempel:</strong> DKK 10m højere normalized EBITDA ved 10x EV/EBITDA giver DKK 100m højere enterprise value.<br><br><strong>Konsekvens:</strong> Add-backs, one-offs og run-rate justeringer er ikke tekniske detaljer. De er prisforhandling.`
  },
  {
    id:'fd_025',
    deckId:'field_dynamics',
    q:'Hvad er price vs. certainty konflikten?',
    a:`Sælger vil have høj pris, men høj pris er ikke altid bedst, hvis closing risk er høj.<br><br><strong>Et lavere bud kan være bedre hvis:</strong><ul><li>Finansieringen er committed</li><li>Regulatorisk risiko er lav</li><li>Bestyrelsesgodkendelse er på plads</li><li>Køber har stærk track record</li><li>SPA-markup er renere</li></ul><strong>Bedste bud er risk-adjusted, ikke bare højest.</strong>`
  },
  {
    id:'fd_026',
    deckId:'field_dynamics',
    q:'Hvorfor har deal certainty økonomisk værdi?',
    a:`En fejlet proces koster rådgiverfees, management time, medarbejderuro, leak risk, omdømme og opportunity cost.<br><br><strong>Derfor er certainty økonomisk:</strong> Den reducerer sandsynligheden for, at ressourcer bindes i en proces, der ikke konverterer til værdi.<br><br><strong>Analystens rolle:</strong> Gør usikkerheder synlige tidligt, så teamet kan styre dem.`
  },
  {
    id:'fd_027',
    deckId:'field_dynamics',
    q:'Hvad er speed vs. diligence konflikten?',
    a:`En hurtig proces reducerer leak risk, fatigue og markedsrisiko. Men den giver køber mindre tid til diligence.<br><br><strong>Konsekvens:</strong> Jo mindre køber ved, desto mere vil køber kræve i discount, conditionality eller contractual protection.<br><br><strong>Balancen:</strong> Sælger vil skabe konkurrence og momentum uden at gøre køber så usikker, at prisen falder.`
  },
  {
    id:'fd_028',
    deckId:'field_dynamics',
    q:'Hvad er disclosure vs. confidentiality konflikten?',
    a:`Mere disclosure reducerer informationsasymmetri og kan løfte pris og certainty. Men mere disclosure øger risikoen for læk af følsomme oplysninger.<br><br><strong>Praktisk konflikt:</strong> Man vil give nok information til at skabe bud og tillid, men ikke så meget at konkurrenter, kunder eller medarbejdere kan skade selskabet, hvis dealen ikke lukker.`
  },
  {
    id:'fd_029',
    deckId:'field_dynamics',
    q:'Hvordan flytter en earn-out konflikten efter closing?',
    a:`Earn-out bruges, når køber og sælger er uenige om fremtidig performance.<br><br><strong>Sælger</strong> vil have betaling for upside nu. <strong>Køber</strong> vil kun betale, hvis upside faktisk materialiserer sig.<br><br><strong>Ny konflikt:</strong> Efter closing kan parterne slås om drift, budgetter, omkostningsallokering og KPI-definitioner. Earn-out løser prisuenighed, men skaber governance-konflikt.`
  },
  {
    id:'fd_030',
    deckId:'field_dynamics',
    q:'Hvad er konflikten omkring working capital peg?',
    a:`Working capital peg er det normaliserede niveau af driftskapital, target skal leveres med ved closing.<br><br><strong>Køber</strong> vil have et højt peg for at undgå at overtage et selskab tømt for driftskapital. <strong>Sælger</strong> vil have et lavt peg for at maksimere equity proceeds.<br><br><strong>Pointen:</strong> Peg-forhandlingen er ofte en skjult prisforhandling.`
  },
  {
    id:'fd_031',
    deckId:'field_dynamics',
    q:'Hvorfor opstår re-trading efter exclusivity?',
    a:`Re-trading opstår når køber forsøger at genforhandle pris eller vilkår efter at have vundet processen.<br><br><strong>Mekanismen:</strong> Når konkurrencen er væk, og sælger har brugt tid, penge og management focus, får køber mere forhandlingsmagt.<br><br><strong>Modtræk:</strong> Stærkt datarum, få åbne diligence-punkter, klar financing evidence og kontraktuel disciplin reducerer re-trade-risikoen.`
  },
  {
    id:'fd_032',
    deckId:'field_dynamics',
    q:'Hvordan skifter konfliktlinjen mellem signing og closing?',
    a:`<strong>Før signing</strong> handler konflikten mest om pris, struktur, diligence og risk allocation.<br><br><strong>Mellem signing og closing</strong> flytter fokus til regulatory approvals, financing certainty, interim covenants og ordinary course-drift.<br><br><strong>Køber</strong> vil bevare exit-muligheder. <strong>Sælger</strong> vil undgå forsinkelser og bevare driftsfleksibilitet.`
  },
  {
    id:'fd_033',
    deckId:'field_dynamics',
    q:'Hvad er break fee vs. reverse break fee?',
    a:`<strong>Break fee:</strong> Sælger betaler køber, hvis sælger trækker sig under definerede omstændigheder, fx ved et bedre bud.<br><br><strong>Reverse break fee:</strong> Køber betaler sælger, hvis køber ikke kan lukke, fx på grund af finansiering eller regulatorisk stop.<br><br><strong>Formål:</strong> Fees placerer økonomisk ansvar for execution risk og gør commitment mere troværdig.`
  },
  {
    id:'fd_034',
    deckId:'field_dynamics',
    q:'Hvordan fungerer escrow, holdback og W&I insurance?',
    a:`<strong>Escrow/holdback</strong> tilbageholder en del af købesummen efter closing som sikkerhed mod claims.<br><br><strong>W&I insurance</strong> flytter noget warranty-risiko til en forsikringsgiver mod en præmie.<br><br><strong>Praktisk betydning:</strong> Mekanismerne kan bygge bro mellem købers behov for protection og sælgers ønske om clean exit.`
  },
  {
    id:'fd_035',
    deckId:'field_dynamics',
    q:'Hvordan vælger sælger mellem højeste bud og bedste køber?',
    a:`Sælger vurderer normalt pris, terms, certainty, speed, confidentiality, regulatorisk risiko og købers adfærd i processen.<br><br><strong>Højeste bud kan tabe hvis:</strong> financing er usikker, SPA-markup er hård, antitrust-risikoen er høj, eller køber virker tilbøjelig til re-trading.<br><br><strong>Bedste køber</strong> er den, der maksimerer risk-adjusted proceeds.`
  },
  {
    id:'fd_036',
    deckId:'field_dynamics',
    q:'Hvorfor er deal momentum vigtigt?',
    a:`Deal momentum er den fremdrift, der holder en transaktion troværdig og konkurrencepræget.<br><br><strong>Momentum skabes af:</strong> hurtige Q&A-svar, rent datarum, klare deadlines, god management preparation og få uløste punkter.<br><br><strong>Momentum tabes af:</strong> forsinkelser, uklare svar, ændrede forecasts og uorganiseret proces. Når en deal mister momentum, falder købers tillid ofte hurtigt.`
  },
  {
    id:'fd_037',
    deckId:'field_dynamics',
    q:'Hvad er et open items tracker?',
    a:`Et open items tracker er en procesliste over alt, der stadig mangler at blive afklaret: issue, owner, deadline, next step og status.<br><br><strong>Værdien:</strong> Det gør usikkerhed synlig og handlingsbar.<br><br><strong>Common failure:</strong> Et punkt uden owner, deadline eller next step er ikke processtyring. Det er bare en observation.`
  },
  {
    id:'fd_038',
    deckId:'field_dynamics',
    q:'Hvad er en source table og traceability i en IB-model?',
    a:`En source table er modellens audit trail. Den viser, hvor hvert vigtigt input kommer fra, hvornår det er hentet, hvordan det er behandlet, og hvor det bruges.<br><br><strong>Traceability</strong> betyder, at man kan følge et tal fra output tilbage til input og videre tilbage til kilden.<br><br><strong>Regel:</strong> Hvis et tal ikke kan spores, kan det ikke reviewes.`
  },
  {
    id:'fd_039',
    deckId:'field_dynamics',
    q:'Hvad betyder reviewable output for associates og seniors?',
    a:`Reviewable output betyder, at en senior hurtigt kan forstå konklusionen, finde kilderne og teste logikken.<br><br><strong>Godt output:</strong> tydelig konklusion, ren struktur, sporbare tal, få hardcodes, klare assumptions og ingen skjulte åbne punkter.<br><br><strong>Pointen:</strong> En god model er ikke bare korrekt. Den er nem at kontrollere under tidspres.`
  },
  {
    id:'fd_040',
    deckId:'field_dynamics',
    q:'Hvad er det præcise spørgsmål DCF besvarer?',
    a:`DCF besvarer: hvad er selskabet værd baseret på dets fremtidige frie pengestrømme og risiko?<br><br><strong>Styrke:</strong> Det er den metode, der tydeligst forsøger at finde intrinsic value uafhængigt af markedsmultipler.<br><br><strong>Svaghed:</strong> Små ændringer i WACC, terminal growth eller terminal multiple kan ændre værdien markant. En DCF er en følsom range, ikke et præcist tal.`
  },
  {
    id:'fd_041',
    deckId:'field_dynamics',
    q:'Hvad er forskellen på trading comps og precedent transactions?',
    a:`<strong>Trading comps</strong> viser, hvordan markedet i dag prissætter likvide minoritetsposter i sammenlignelige børsnoterede selskaber.<br><br><strong>Precedent transactions</strong> viser, hvad købere historisk har betalt for kontrol over sammenlignelige selskaber.<br><br><strong>Konsekvens:</strong> Trading comps er minority value. Precedents er observed control value.`
  },
  {
    id:'fd_042',
    deckId:'field_dynamics',
    q:'Hvorfor er minority value og control value ikke det samme?',
    a:`En minoritetsaktionær køber eksponering mod selskabets cash flows, men får ikke kontrol over strategi, ledelse, kapitalstruktur eller synergier.<br><br><strong>Kontrol giver optioner:</strong> skifte management, ændre strategi, sælge aktiver, integrere driften, ændre finansiering og realisere synergier.<br><br><strong>Derfor</strong> kan control value være højere end minority value.`
  },
  {
    id:'fd_043',
    deckId:'field_dynamics',
    q:'Hvad er strategic value vs. financial value?',
    a:`<strong>Strategic value</strong> er værdien for en industriel køber, især fra synergier, markedsposition, teknologi, kunder eller supply chain-kontrol.<br><br><strong>Financial value</strong> er værdien for PE, især fra entry price, leverage, cash conversion, governance og operational improvement.<br><br><strong>Pointen:</strong> Forskellige købere kan rationelt betale forskellige priser for samme selskab.`
  },
  {
    id:'fd_044',
    deckId:'field_dynamics',
    q:'Hvorfor er LBO ability-to-pay en bagudregning?',
    a:`LBO ability-to-pay starter med det ønskede slutresultat, fx target IRR, og regner baglæns til den maksimale entry price.<br><br><strong>Input:</strong> exit year, EBITDA growth, debt paydown, exit multiple, leverage og financing cost.<br><br><strong>Output:</strong> maksimal pris. Det er ikke en påstand om intrinsic value, men en test af hvad fonden kan betale.`
  },
  {
    id:'fd_045',
    deckId:'field_dynamics',
    q:'Hvorfor kan adgang til gæld ændre PE-bud markant?',
    a:`Gæld påvirker, hvor meget equity fonden skal investere, og dermed hvilken IRR en given købspris giver.<br><br><strong>Eksempel:</strong> En fond med adgang til 5.5x EBITDA i billig gæld kan ofte byde højere end en fond med 4.5x, selv med samme operationelle plan.<br><br><strong>Mental model:</strong> Debt access er en konkurrenceparameter, ikke bare et finansieringsværktøj.`
  },
  {
    id:'fd_046',
    deckId:'field_dynamics',
    q:'Hvorfor er cash conversion vigtigere end EBITDA alene?',
    a:`EBITDA er accounting earnings. Gæld, renter, capex, skat og distributionsmuligheder betales med cash.<br><br><strong>PE og lenders spørger:</strong> Hvor meget af EBITDA bliver faktisk til free cash flow?<br><br><strong>Lav cash conversion</strong> kan skyldes høj capex, working capital build, lav kvalitet i earnings eller aggressive revenue recognition.`
  },
  {
    id:'fd_047',
    deckId:'field_dynamics',
    q:'Hvorfor elsker PE recurring revenue?',
    a:`Recurring revenue gør fremtidige cash flows mere forudsigelige og reducerer lender risk.<br><br><strong>Effekt:</strong> Mere stabil cash flow kan understøtte mere gæld, lavere finansieringsrisiko og højere valuation.<br><br><strong>Men kvaliteten skal testes:</strong> churn, contract length, renewal rates, NRR, customer concentration og mission-critical usage afgør om revenue reelt er recurring.`
  },
  {
    id:'fd_048',
    deckId:'field_dynamics',
    q:'Hvorfor er IPO-pricing ikke det samme som DCF fair value?',
    a:`IPO-pricing besvarer: ved hvilken pris clearer investor demand givet markedsvinduet, equity story, liquidity og risiko?<br><br><strong>DCF fair value</strong> kan vise teoretisk værdi. <strong>IPO price</strong> er en markeds-clearing pris under usikkerhed.<br><br><strong>Derfor</strong> kræver investorer ofte IPO-rabat for informationsasymmetri, liquidity risk og behov for aftermarket upside.`
  },
  {
    id:'fd_049',
    deckId:'field_dynamics',
    q:'Hvordan skaber retainer, success fee og beauty contest bias konflikter?',
    a:`<strong>Retainer</strong> betaler rådgiveren for tid og tilgængelighed, men kan give svagere execution-incentive hvis upside er lav.<br><br><strong>Success fee</strong> skaber stærk motivation for closing, men kan skabe completion bias.<br><br><strong>Beauty contest bias</strong> opstår når banker lover aggressiv pris for at vinde mandatet. Det kan føre til failed process, nedprisning eller skadet klientrelation.`
  },
  {
    id:'fd_050',
    deckId:'field_dynamics',
    q:'Hvilke konflikter ligger i underwriting, selling concession og financing fees?',
    a:`<strong>Underwriting fee:</strong> Banken betales for at tage placement- eller balance sheet risk. Konflikt: banken kan ønske lavere offer price for at reducere egen risiko.<br><br><strong>Selling concession:</strong> Betaling for distribution. Konflikt: hurtig placering kan prioriteres over investor quality.<br><br><strong>Financing fee:</strong> Banken tjener på at arrangere eller stille finansiering. Konflikt: rådgivning og lending economics kan trække i hver sin retning.`
  }
];
