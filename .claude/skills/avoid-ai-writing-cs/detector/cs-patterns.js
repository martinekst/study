'use strict';

/**
 * Detekce AI tells v ČESKÉM textu.
 *
 * Česká vrstva ke skillu avoid-ai-writing (sibling adresář). Upstreamový
 * detector/patterns.js je anglocentrický (delve, leverage, robust) a na české
 * próze nenajde skoro nic. Rozhraní je záměrně stejné:
 * analyzeText(text, opts) -> { score, label, issues, stats }.
 *
 * Vstup je markdown, včetně VitePress/Vue stránek: maskujeme frontmatter,
 * bloky kódu, <style>/<script> a HTML značky, aby CSS a atributy nespouštěly
 * pravidla určená na prózu.
 *
 * Kalibrace: lidsky psaná česká odborná próza (corpus/) musí vycházet pod 25,
 * šablonovitý generovaný marketing nad 60. Hlídá scripts/fp-measure.js;
 * po každé změně slovníků nebo vah ho spusť.
 */

const ABBREV = [
  'např',
  'tj',
  'tzv',
  'tzn',
  'atd',
  'apod',
  'resp',
  'mj',
  'cca',
  'popř',
  'zejm',
  'č',
  'čís',
  'str',
  'obr',
  'tab',
  'kap',
  'min',
  'max',
  'sec',
  'r',
  'st',
  'sv',
  'ing',
  'mgr',
  'bc',
  'phd',
  'ph',
  'a.s',
  's.r.o',
  'spol',
];

// Tier 1 — v českém odborném/prodejním textu prakticky vždy vata nebo kalk.
const CS_TIER1 = [
  { re: /\bv dne[šs]n[ií] dob[ěe]\b/gi, hint: 'vypustit, nebo nahradit konkrétním datem či obdobím' },
  { re: /\bv dne[šs]n[ií] uspěchan[ée] dob[ěe]\b/gi, hint: 'vypustit' },
  { re: /\bv dne[šs]n[ií]m (?:rychle se m[ěe]n[ií]c[ií]m |dynamick[ée]m )?sv[ěe]t[ěe]\b/gi, hint: 'vypustit' },
  { re: /\bve sv[ěe]t[ěe], kde\b/gi, hint: 'formulační otvírák: začít věcí samotnou' },
  { re: /\bnen[ií] to jen o\b/gi, hint: 'říct rovnou, o co jde' },
  { re: /\bje d[ůu]le[žz]it[ée] (?:si )?(?:pozna(?:menat|t)|uv[ěe]domit|zm[ií]nit|zd[ůu]raznit)\b/gi, hint: 'vypustit a tvrdit rovnou' },
  { re: /\bstoj[ií] za zm[ií]nku\b/gi, hint: 'vypustit' },
  { re: /\bhraje kl[ií][čc]ovou roli\b/gi, hint: 'napsat, co konkrétně dělá' },
  // „klíčový“ je v ČNK běžné české slovo (lemma v první dvoutisícovce), takže
  // jednotlivý výskyt nic neznamená; tell je až hustota, kterou řeší check
  // lexical-overuse níž. Lidský auditní text má 0,24/1000, auditované nabídky
  // 2,5 až 3,1/1000.
  { re: /\bkl[ií][čc]ov[ýyáaée]\w*\b/gi, hint: 'nahradit konkrétním důvodem, proč je to podstatné', weak: true },
  { re: /\brobustn[ií]\w*\b/gi, hint: 'spolehlivý, odolný, nebo doložit čím' },
  { re: /\bkomplexn[ií] [řr]e[šs]en[ií]\b/gi, hint: 'popsat, co řešení obsahuje' },
  { re: /\bbezprobl[ée]mov\w+\b/gi, hint: 'vypustit nebo doložit' },
  // „na míru“ je v lidské češtině běžný obrat (4× v 9k slovech korpusu),
  // v prodejním textu je to ale skoro vždy vata: proto jen slabý nález.
  { re: /\bna m[ií]ru\b/gi, hint: 'říct, co se přizpůsobuje', weak: true },
  { re: /\bpřelomov\w+\b/gi, hint: 'popsat, co se změnilo' },
  { re: /\bpr[ůu]lomov\w+\b/gi, hint: 'popsat, co se změnilo' },
  { re: /\brevolu[čc]n[ií]\w*\b/gi, hint: 'popsat, co se změnilo' },
  { re: /\binovativn[ií]\w*\b/gi, hint: 'popsat, co je nové' },
  { re: /\btransforma[čc]n[ií]\w*\b/gi, hint: 'popsat, co se mění a v čem' },
  { re: /\b[šs]pi[čc]kov\w+\b/gi, hint: 'doložit, nebo vypustit' },
  { re: /\bsynerg\w+\b/gi, hint: 'popsat konkrétní vazbu' },
  { re: /\bposunout\b[^.!?\n]{0,30}?\b(?:dal[šs][ií]|vy[šs][šs][ií]|nov[áo]u?) [úu]rove[ňn]/gi, hint: 'říct, co se zlepší a o kolik' },
  { re: /\bv neposledn[ií] [řr]ad[ěe]\b/gi, hint: 'vypustit' },
  { re: /\b[šs]irok(?:ou|é|á) [šs]k[áa]l\w+\b/gi, hint: 'vyjmenovat, co konkrétně' },
  { re: /\bucelen\w+ (?:bal[ií][čc]ek|[řr]e[šs]en[ií]|nab[ií]dk\w+)\b/gi, hint: 'popsat obsah balíčku' },
  { re: /\bdynamicky se (?:rozv[ií]jej[ií]c[ií]|m[ěe]n[ií]c[ií])\w*\b/gi, hint: 'vypustit' },
  { re: /\bmaximum\b(?=[^.]*\bvyt[ěe][žz])/gi, hint: '„vytěžit maximum“ je vata, říct kolik a z čeho' },
  { re: /\bnastavit la[ťt]ku\b/gi, hint: 'vypustit' },
  { re: /\bzm[ěe]na paradigmatu\b/gi, hint: 'popsat, co se mění' },
  { re: /\bgame[- ]?changer\w*\b/gi, hint: 'popsat, co se konkrétně změnilo' },
  { re: /\bned[ií]ln(?:ou|á|é)\s+sou[čc][áa]st\w*\b/gi, hint: 'vypustit, nebo říct proč' },
  { re: /\bp[řr]in[áa][šs][ií] (?:celou )?[řr]adu (?:v[ýy]hod|benefit[ůu])\b/gi, hint: 'vyjmenovat je' },
  { re: /\bna konci dne\b/gi, hint: 'kalk „at the end of the day“: vypustit' },
];

// Aforismové formule: slot-fill „X je nová ropa“. Zní to citovatelně a neříká nic.
const CS_APHORISM = [
  { re: /\b(?:je|jsou) (?:nov[áé]|novodob[áé])\s+(?:ropa|zlato|m[ěe]na|n[áa]bo[žz]enstv[íi]|elekt[řr]ina)\b/gi, hint: 'aforismová formule: napsat konkrétní tvrzení, které za ní stojí' },
  { re: /\bje (?:kopilot|autopilot)\w*\b/gi, hint: 'metaforová formule: popsat, co nástroj reálně dělá a nedělá' },
];

// Tier 2 — samo o sobě v pořádku, ve shluku signál. Váha nižší.
const CS_TIER2 = [
  { re: /\befektivn[ěe]\b/gi, hint: 'čím měřeno?' },
  { re: /\bproaktivn[ěe]?\w*\b/gi, hint: 'kalk, popsat chování' },
  { re: /\badresovat\b/gi, hint: 'kalk z „address“, česky řešit / pojmenovat' },
  { re: /\bdedikovan\w+\b/gi, hint: 'kalk, česky vyhrazený / samostatný' },
  { re: /\bimplementovat\b/gi, hint: 'zavést, nasadit, naprogramovat' },
  { re: /\bv r[áa]mci\b/gi, hint: 'často nadbytečné, zkusit vypustit' },
  { re: /\bza[jj]i[šs][ťt]\w+\b/gi, hint: 'úřednické, zkusit sloveso s dějem' },
  { re: /\brealiz\w+\b/gi, hint: 'udělat, postavit, dodat' },
  { re: /\bumo[žz][ňn]uj\w+\b/gi, hint: 'často nominalizace, zkusit přímé sloveso' },
  { re: /\bpodstatn[ěe]\b/gi, hint: 'o kolik?' },
  { re: /\bv[ýy]razn[ěe]\b/gi, hint: 'o kolik?' },
  { re: /\bpr[ůu]b[ěe][žz]n[ěe]\b/gi, hint: 'jak často?' },
  { re: /\bnapř[ií][čc]\b/gi, hint: 'často výplň' },
  { re: /\bp[řr][ií]stup\b/gi, hint: 'vágní, co konkrétně' },
  { re: /\bmo[žz]nost\w*\b/gi, hint: 'nominalizace, zkusit sloveso' },
  { re: /\bp[řr]edv[ií]dateln\w+\b/gi, hint: 'doložit čím' },
  { re: /\bm[ěe][řr]iteln\w+\b/gi, hint: 'uvést metriku' },
  { re: /\btransparentn\w+\b/gi, hint: 'říct, co je vidět' },
  { re: /\bfascinuj[ií]c[ií]\w*\b/gi, hint: 'říct, co přesně je zajímavé' },
  { re: /\bp[řr]idan[áé]\w* hodnot\w+\b/gi, hint: 'pojmenovat ji' },
  { re: /\bm[ůu][žz]e b[ýy]t u[žz]ite[čc]n\w+\b/gi, hint: 'komu a k čemu?' },
  { re: /\bekosyst[ée]m\w*\b/gi, hint: 'metafora: systém, trh, komunita, nebo konkrétně' },
];

// Vyprázdněné intenzifikátory a hedging.
const CS_HEDGE = [
  // Čtyři nejběžnější intenzifikátory jsou slabé nálezy: lidský korpus je
  // používá běžně (prakticky 4×, skutečně 2× na 9k slov), signál je až shluk.
  { re: /\bskute[čc]n[ěe]\b/gi, hint: 'vypustit', weak: true },
  { re: /\bopravdu\b/gi, hint: 'vypustit', weak: true },
  { re: /\bre[áa]ln[ěe]\b/gi, hint: 'vypustit, pokud jen zesiluje', weak: true },
  { re: /\bprakticky\b/gi, hint: 'vypustit nebo kvantifikovat', weak: true },
  { re: /\bvlastn[ěe]\b/gi, hint: 'vypustit' },
  { re: /\bv podstat[ěe]\b/gi, hint: 'vypustit' },
  { re: /\bde facto\b/gi, hint: 'vypustit' },
  { re: /\bpom[ěe]rn[ěe]\b/gi, hint: 'kvantifikovat' },
  { re: /\bzna[čc]n[ěe]\b/gi, hint: 'kvantifikovat' },
  { re: /\bpotenci[áa]ln[ěe]\b/gi, hint: 'vypustit nebo pojmenovat podmínku' },
  { re: /\bmo[žz]n[áa]\b/gi, hint: 'tvrdit, nebo vynechat' },
  { re: /\bsv[ýy]m zp[ůu]sobem\b/gi, hint: 'vypustit' },
  { re: /\bdo ur[čc]it[ée] m[ií]ry\b/gi, hint: 'do jaké?' },
  { re: /\bbu[ďd]me up[řr][ií]mn[ií]?\b/gi, hint: 'předstíraná otevřenost' },
  { re: /\bru[čc] na srdce\b/gi, hint: 'předstíraná otevřenost' },
  { re: /\bp[řr]iznejme si\b/gi, hint: 'předstíraná otevřenost' },
];

// Kontrastní negace: „není to X, je to Y“ ve všech obvyklých českých podobách.
const CS_CONTRAST = [
  { re: /\bnen[ií] (?:to |jen |pouze )?[^.,;:!?]{2,60}?,\s*(?:ale|n[ýy]br[žz])\b/gi, hint: 'napsat rovnou kladné tvrzení' },
  { re: /\bnejde (?:jen |pouze )?o[^.,;:!?]{2,60}?,\s*(?:ale|n[ýy]br[žz])\b/gi, hint: 'napsat rovnou kladné tvrzení' },
  { re: /\bnejsou? [^.,;:!?]{2,60}?,\s*(?:ale|n[ýy]br[žz])\b/gi, hint: 'napsat rovnou kladné tvrzení' },
  { re: /\bne[^.,;:!?]{2,40}?,\s*ale\s+[^.]{2,60}/gi, hint: 'zvážit kladné tvrzení', weak: true },
  // „nikoli(v)“ je běžná formální čeština; do P1 patří jen jako součást plné
  // kontrastní konstrukce (chytají ji vzory výš). Samotné slovo je jen stopa.
  { re: /\bnikoli(?:v)?\b/gi, hint: 'často součást kontrastní negace', weak: true },
  { re: /\bm[ěe][řr][ií]me [^.,;]{2,40}, ne\b/gi, hint: 'kontrastní negace v ocase věty' },
  { re: /,\s*ne\s+[^.]{2,40}\./gi, hint: 'negace přilepená na konec věty, napsat jako plnou větu', weak: true },
];

// Frázemi nabité prodejní obraty typické pro generovaný text.
const CS_SALES = [
  { re: /\bp[řr]edstavuje\b/gi, hint: 'je / dělá' },
  { re: /\bp[řr]in[áa][šs][ií]\b/gi, hint: 'co konkrétně' },
  { re: /\bpom[áa]h[áa]me? v[áa]m\b/gi, hint: 'říct výsledek' },
  { re: /\bd[ií]ky (?:tomu|[čc]emu[žz]|kter[ée]mu)\b/gi, hint: 'často spojka do prázdna' },
  { re: /\bpr[ůu]vodce\b/gi, hint: 'vágní' },
  { re: /\bcelou? (?:cest\w+|proces\w*)\b/gi, hint: 'vágní' },
  { re: /\bna jedn[ée] str[áa]nce\b/gi, hint: 'ověřit, že to je pravda' },
  { re: /\bzb[ýy]v[áa] (?:jedin[ýa]|u[žz] jen)\b/gi, hint: 'umělá naléhavost' },
  { re: /\bkone[čc]n[ěe] zjist[ií]te\b/gi, hint: 'umělá naléhavost' },
  { re: /\bp[řr]esn[ěe] t[ěe]ch\b/gi, hint: 'sebechvála bez důkazu' },
  { re: /\bna spr[áa]vn[ée] stran[ěe]\b/gi, hint: 'sebechvála bez důkazu' },
  { re: /\bnev[áa]hejte (?:se )?(?:n[áa]s )?(?:obr[áa]tit|kontaktovat|ozvat)\b/gi, hint: 'klišé výzvy: napsat, co má čtenář udělat a proč' },
  { re: /\bnab[ií]z[ií] efektivn[ií] [řr]e[šs]en[ií]\b/gi, hint: 'čeho a čím' },
];

// Konverzační tiky chatu, které v publikovaném textu nemají co dělat.
const CS_CHATBOT = [
  { re: /\bdouf[áa]m\w*, [žz]e [^.!?\n]{0,40}(?:pomohl\w*|pom[ůu][žz]e)\b/gi, hint: 'chatbot artefakt: smazat' },
  { re: /\b(?:skv[ěe]l[áa]|v[ýy]born[áa]) ot[áa]zka\b/gi, hint: 'chatbot artefakt: smazat' },
  { re: /\bv tomto [čc]l[áa]nku (?:se )?(?:pod[ií]v[áa]me|dozv[ií]te|prozkoum[áa]me|uk[áa][žz]eme)\w*\b/gi, hint: 'meta-narace: začít rovnou obsahem' },
  { re: /^\s*(?:Samoz[řr]ejm[ěe]|Jist[ěe]|Rozhodn[ěe])!/gm, hint: 'chatbot artefakt: smazat' },
  { re: /\bdejte (?:mi|n[áa]m) v[ěe]d[ěe]t\b/gi, hint: 'konverzační tik; v publikovaném textu smazat', weak: true },
];

// „Pojďme“ jako falešně kolektivní otvírák (Let's constructions).
const CS_LETS = [
  { re: /\bpoj[ďd]me se (?:spole[čc]n[ěe] )?pod[ií]vat\b/gi, hint: 'začít rovnou věcí' },
  { re: /\bpoj[ďd]me si (?:to )?(?:rozebrat|shrnout|uk[áa]zat|proj[ií]t|vysv[ěe]tlit)\b/gi, hint: 'začít rovnou věcí' },
  { re: /\bpono[řr]me se\b/gi, hint: 'kalk „let’s dive in“: začít rovnou věcí' },
  { re: /\bpoj[ďd]me na to\b/gi, hint: 'výplňový přechod', weak: true },
];

// Falešné prozření: emoce ohlášená místo doložená.
const CS_EPIPHANY = [
  { re: /\bpotvrdilo (?:mi|n[áa]m) to jednu v[ěe]c\b/gi, hint: 'říct rovnou tu věc' },
  { re: /\botev[řr]elo (?:mi|n[áa]m) to o[čc]i\b/gi, hint: 'říct, co konkrétně se ukázalo' },
  { re: /\bjednu nep[řr][íi]jemnou pravdu\b/gi, hint: 'říct rovnou tu pravdu' },
  { re: /\buv[ěe]domil[aiy]? js[em]{2}\w* si, [žz]e\b/gi, hint: 'zvážit: nese ohlášení prozření něco navíc?', weak: true },
];

// Vágní autority: tvrzení opřené o nikoho.
const CS_AUTHORITY = [
  { re: /\b(?:odborn[ií]ci|experti|analytici|specialist[ée]) (?:se shoduj[ií]|tvrd[ií]|varuj[ií]|doporu[čc]uj[ií]|o[čc]ek[áa]vaj[ií])\b/gi, hint: 'kdo konkrétně? doplnit zdroj, nebo tvrdit rovnou' },
  { re: /\b(?:studie|v[ýy]zkumy|pr[ůu]zkumy) (?:ukazuj[ií]|potvrzuj[ií]|prokazuj[ií]|nazna[čc]uj[ií])\b/gi, hint: 'která studie? doplnit odkaz, nebo tvrdit rovnou' },
  { re: /\bje (?:v[šs]eobecn[ěe] )?zn[áa]mo, [žz]e\b/gi, hint: 'doložit, nebo tvrdit rovnou', weak: true },
  { re: /\bpanuje (?:obecn[áa] )?shoda\b/gi, hint: 'mezi kým?', weak: true },
];

// Hedge-stack: modál + zajišťovací příslovce. Věta pak netvrdí nic.
const CS_HEDGE_STACK = [
  { re: /\b(?:by )?(?:mohl[oaiy]?|m[ůu][žz]e|mohou) (?:potenci[áa]ln[ěe]|teoreticky|p[řr][ií]padn[ěe]|do jist[ée] m[ií]ry|v kone[čc]n[ée]m d[ůu]sledku|[čc]asem)\b/gi, hint: 'dvojitý hedge: vybrat jedno' },
];

// Falešná šíře: „ať už jste X, nebo Y“ znamená „kdokoliv“, tedy nikdo konkrétní.
const CS_BREADTH = [
  { re: /\ba[ťt] u[žz] (?:jste|jde o|pot[řr]ebujete|[řr]e[šs][ií]te|hled[áa]te)\b[^.!?\n]{0,80}?\bnebo\b/gi, hint: 'vybrat publikum, kterému se píše, nebo škrtnout' },
];

// Generické závěry a budoucí narativ bez ověřitelného obsahu.
const CS_FUTURE = [
  { re: /\b[čc]as uk[áa][žz]e\b/gi, hint: 'vypustit, nebo napsat ověřitelnou předpověď' },
  { re: /\bbudoucnost (?:uk[áa][žz]e|pat[řr][ií])\b/gi, hint: 'vypustit, nebo napsat ověřitelnou předpověď' },
  { re: /\bjedno je jist[ée]\b/gi, hint: 'vypustit' },
  { re: /\bto je (?:teprve|jen) za[čc][áa]tek\b/gi, hint: 'vypustit, nebo říct co následuje' },
  { re: /\bteprve za[čc][ií]n[áa]\b/gi, hint: 'vypustit, nebo doložit', weak: true },
];

// Nevyplněné placeholdery: skoro jistý důkaz šablony vložené bez redakce.
const CS_PLACEHOLDER = [
  { re: /\[[^\]\n]{0,40}(?:dopl[ňn]|va[šs]e jm[ée]no|n[áa]zev (?:firmy|spole[čc]nosti)|vlo[žz]te|zde uve[ďd])[^\]\n]{0,40}\]/gi, hint: 'nevyplněný placeholder' },
  { re: /\b(?:XX\. ?\d{1,2}\. ?20\d\d|\d{1,2}\. ?XX\. ?20\d\d|20\d\d-XX-XX)\b/g, hint: 'nevyplněné datum' },
  // Anglické slot-fill stuby (po forku převzato z upstream AI_PLACEHOLDERS):
  // generovaná boilerplate se občas vloží i s nevyplněnými [Your Name] apod.
  { re: /\[(?:Your|Insert|Add|Enter|Describe|Specify|Choose|Pick)[^\]\n]{1,80}\]/gi, hint: 'nevyplněný anglický placeholder z generované šablony' },
  { re: /\[(?:INSERT|FILL\s+IN|ADD|TODO|TBD|PLACEHOLDER)[^\]\n]{0,80}\]/g, hint: 'nevyplněný slot z generované šablony' },
  { re: /<!--\s*(?:add|fill\s+in|insert|todo|placeholder)[^>]{0,120}-->/gi, hint: 'placeholder v HTML komentáři' },
];

function maskFences(text) {
  // Zachovává počet řádků, aby čísla řádků zůstala platná.
  const lines = text.split('\n');
  const out = [];
  let inFence = false;
  let inFront = false;
  let inStyle = false;

  lines.forEach((line, i) => {
    const t = line.trim();
    if (i === 0 && t === '---') {
      inFront = true;
      out.push('');
      return;
    }
    if (inFront) {
      out.push('');
      if (t === '---') inFront = false;
      return;
    }
    if (/^(```|~~~)/.test(t)) {
      inFence = !inFence;
      out.push('');
      return;
    }
    if (/^<(style|script)\b/i.test(t)) inStyle = true;
    if (inStyle) {
      out.push('');
      if (/<\/(style|script)>/i.test(t)) inStyle = false;
      return;
    }
    out.push(inFence ? '' : line);
  });

  return out.join('\n');
}

function stripHtml(text) {
  // Značky pryč, vnitřní text zůstává (je to viditelná próza stránky).
  return text
    .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/<[^>\n]*>/g, (m) => ' '.repeat(m.length));
}

function stripInline(text) {
  return text
    .replace(/`[^`\n]*`/g, (m) => ' '.repeat(m.length))
    .replace(/\]\([^)\n]*\)/g, (m) => ' '.repeat(m.length));
}

// JS \b je ASCII: za slovem končícím na ě/í/é hranici slova nenajde, takže
// vzor „dob[ěe]\b“ na správně napsané češtině tiše selže. Slovníkové checky
// proto běží nad odháčkovanou kopií textu; mapování je 1 znak : 1 znak, indexy
// i délky zůstávají platné a nález se vypisuje z originálu.
const FOLD = {
  á: 'a', č: 'c', ď: 'd', é: 'e', ě: 'e', í: 'i', ň: 'n', ó: 'o', ř: 'r',
  š: 's', ť: 't', ú: 'u', ů: 'u', ý: 'y', ž: 'z',
  Á: 'A', Č: 'C', Ď: 'D', É: 'E', Ě: 'E', Í: 'I', Ň: 'N', Ó: 'O', Ř: 'R',
  Š: 'S', Ť: 'T', Ú: 'U', Ů: 'U', Ý: 'Y', Ž: 'Z',
};
function foldCz(text) {
  return text.replace(/[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/g, (c) => FOLD[c]);
}

// Self-reference escape hatch z upstream SKILL.md: text ve správně spárovaných
// českých uvozovkách je citace a slovníkové checky ho přeskakují (dokumentace
// tellů by jinak sama skórovala jako slop). Typografie se dál měří všude.
function maskCzQuotes(text) {
  return text.replace(/„[^„“\n]{1,300}“/g, (m) => '„' + '·'.repeat(m.length - 2) + '“');
}

function lineOf(text, index) {
  let line = 1;
  for (let i = 0; i < index && i < text.length; i++) if (text[i] === '\n') line++;
  return line;
}

function contextOf(text, index, len) {
  const from = Math.max(0, index - 45);
  const to = Math.min(text.length, index + len + 45);
  return text
    .slice(from, to)
    .replace(/\s+/g, ' ')
    .trim();
}

function splitSentences(prose) {
  const parts = [];
  let buf = '';
  for (let i = 0; i < prose.length; i++) {
    const ch = prose[i];
    buf += ch;
    if (/[.!?…]/.test(ch)) {
      const tail = buf.trimEnd();
      const lastWord = (tail.match(/([\p{L}]+)\.$/u) || [])[1];
      const prevChar = prose[i - 1];
      const isAbbrev = lastWord && ABBREV.includes(lastWord.toLowerCase());
      const isNumber = /\d/.test(prevChar || '');
      const next = prose.slice(i + 1, i + 3);
      const boundary = /^\s+["„»(]?[\p{Lu}\d]/u.test(next) || next.trim() === '';
      if (!isAbbrev && !isNumber && boundary) {
        parts.push(buf.trim());
        buf = '';
      }
    }
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts.filter((s) => s.replace(/[^\p{L}]/gu, '').length > 3);
}

function wordsOf(s) {
  return (s.match(/[\p{L}\d][\p{L}\d'’-]*/gu) || []).length;
}

function analyzeText(raw, opts = {}) {
  const file = opts.file || '';
  const masked = maskFences(raw);
  const visible = stripInline(stripHtml(masked));
  const folded = foldCz(maskCzQuotes(visible));
  const issues = [];

  // Délkový gate podle upstreamu (detector/patterns.js:1162, README §Length gates:
  // „Under ~10 words → Too short (unscorable)“). Bez něj dostal robots.txt s devíti
  // slovy skóre 0 a táhl dolů statistiky celého adresáře. score: null znamená
  // neskórovatelné, ne čisté; agregace takové soubory musí vynechat.
  // opts.minWords: 0 používají jen testy jednotlivých vzorů, kde je fixtura jedna věta.
  const minWords = opts.minWords ?? 10;
  // Hustotní checky potřebují vlastní, vyšší minimum: tři tučné úseky na 22 slov
  // dávají 13,6/100 a hustota je při takové délce náhoda, ne vlastnost textu.
  // Lidský korpus obsahoval krátkou stránku, která takhle vyskočila na skóre 69.
  const MIN_DENSITY_WORDS = opts.minDensityWords ?? 200;
  if (wordsOf(visible) < minWords) {
    return {
      file,
      score: null,
      label: 'Příliš krátké',
      issues: [],
      stats: { words: wordsOf(visible), tooShort: true },
    };
  }

  const push = (type, severity, line, match, hint, extra = {}) =>
    issues.push({ type, severity, line, match, hint, file, ...extra });

  // 1. Pomlčka jako spojka věty. V češtině je navíc správný znak – (en dash),
  //    ne — (em dash): ČSN 01 6910 i IJP ÚJČ znají „pomlčku“ –, em dash je
  //    anglická sazba. Proto je — dvojí nález: typografie i AI tell.
  const dashRe = /[^\S\n]([—–]|--)[^\S\n]/g;
  let m;
  while ((m = dashRe.exec(visible))) {
    const line = lineOf(visible, m.index);
    const lineText = visible.split('\n')[line - 1] || '';
    const isListLead = /^\s*[-*]\s+(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]*\))\s*[—–]/.test(lineText);
    const isTableRow = /^\s*\|/.test(lineText);
    const em = m[1] === '—';
    const carveOut = isListLead || isTableRow;
    // Znak rozhoduje o severitě, ale ne binárně: severita em dashe se dodatečně
    // upraví podle hustoty (viz níže), protože existuje lidský autor, který jím
    // systematicky nahrazuje českou pomlčku (junior.guru: 1,04 na 1000 slov,
    // nejhustší soubor 3,8), zatímco generovaný text má 27,45 a nejhustší 52,6.
    // – je správná česká pomlčka (IJP ÚJČ id=165) a do skóre nevstupuje vůbec.
    const severity = carveOut ? 'P3' : em || m[1] === '--' ? 'P1' : 'P3';
    push(
      'dash-connector',
      severity,
      line,
      m[1],
      carveOut
        ? 'typografický oddělovač v seznamu nebo tabulce, sjednotit na –'
        : em || m[1] === '--'
          ? 'dlouhá pomlčka jako spojka věty: nahradit dvojtečkou, závorkou, středníkem nebo dvěma větami'
          : 'pomlčka jako spojka věty, typograficky správně; hlídat jen hustotu',
      { carveOut, emDash: em },
    );
  }

  // 2. Emoji. Jeden znak, tři různé jevy, které se nesmí míchat do jedné severity:
  //    (a) STATUSOVÝ GLYF (RAG semafor 🟢🟠🔴) v tabulce nebo nadpisu je deklarovaná
  //        notace, ne dekorace. Auditované nabídky ho zavádějí legendou a barevný
  //        status je v projektovém reportingu běžná konvence, takže se nepočítá.
  //    (b) DEKORATIVNÍ emoji v nadpisu je tell: lidský markdownový korpus má
  //        0 z 480 nadpisů (corpus/registr2, 90 tis. slov, čtyři zdroje), zatímco
  //        doložitelně generovaný text 72 % a auditované nabídky 83 a 89 %.
  //    (c) emoji jako IKONA V HTML komponentě je věc šablony, ne textu.
  //    Agreguje se na dokument, ne na řádek. Per-řádkové hlášení dávalo 176 nálezů
  //    z jednoho redakčního zvyku, emoji tak tvořila 52 % veškeré váhy skóre
  //    a přebila všechny ostatní signály.
  const STATUS_GLYPH =
    /^(?:[\u{1F534}-\u{1F53A}\u{1F7E0}-\u{1F7EB}\u{26AA}\u{26AB}\u{2B1B}\u{2B1C}\u{2796}\u{2795}]|️)+$/u;
  const emojiRe = /(\p{Extended_Pictographic}|[\u{1F000}-\u{1FAFF}])(️)?/gu;
  const lines = visible.split('\n');
  const rawLines = masked.split('\n');
  const emo = { headings: [], status: [], body: [], ui: [], bullets: [] };

  lines.forEach((lineText, i) => {
    const found = lineText.match(emojiRe);
    if (!found) return;
    const glyphs = found.join('');
    const isHeading = /^#{1,6}\s/.test(lineText);
    const isTableRow = /^\s*\|/.test(lineText);
    // Role se pozná na SUROVÉM řádku: stripHtml značku nahradí mezerami, takže
    // z `<span class="tf-card__icon">🔍</span>` po očištění vypadá emoji jako odrážka.
    const raw = rawLines[i] || '';
    const inHtml = /<[^>]*>\s*\p{Extended_Pictographic}|\p{Extended_Pictographic}\s*<\//u.test(raw);
    // Odrážka s emoji i emoji v roli odrážky; testuje se na surovém řádku, takže
    // řádek začínající HTML značkou sem nespadne (ten jde do emo.ui).
    const isRealBullet = /^\s*(?:[-*+]\s*)?\p{Extended_Pictographic}/u.test(raw);
    const target = STATUS_GLYPH.test(glyphs)
      ? emo.status
      : inHtml
        ? emo.ui
        : isHeading
          ? emo.headings
          : isRealBullet
            ? emo.bullets
            : emo.body;
    target.push({ line: i + 1, glyphs, isHeading, isTableRow });
  });

  const headingCount = lines.filter((l) => /^#{1,6}\s/.test(l)).length;
  if (emo.headings.length >= 2 || (headingCount && emo.headings.length / headingCount >= 0.3)) {
    push(
      'emoji-heading',
      'P1',
      emo.headings[0].line,
      `${emo.headings.length} z ${headingCount} nadpisů nese dekorativní emoji (${emo.headings
        .slice(0, 5)
        .map((e) => e.glyphs)
        .join(' ')})`,
      'dekorativní emoji v nadpisech odborného textu: lidský český markdown je nemá (0 z 480 nadpisů kontrolního korpusu)',
    );
  } else if (emo.headings.length === 1) {
    push('emoji-heading', 'P3', emo.headings[0].line, emo.headings[0].glyphs, 'jediné emoji v nadpisu: samo o sobě není vzorec');
  }
  if (emo.status.length) {
    push(
      'emoji-status',
      'P3',
      emo.status[0].line,
      `${emo.status.length}× statusový glyf`,
      'barevný status (RAG) je deklarovaná notace, ne dekorace: ověřit jen, že má legendu a že barva není jediný nositel informace',
      { scoreExempt: true },
    );
  }
  if (emo.body.length) {
    push(
      'emoji-body',
      'P3',
      emo.body[0].line,
      `${emo.body.length}× emoji v textu (${[...new Set(emo.body.map((e) => e.glyphs))].slice(0, 6).join(' ')})`,
      'emoji v odborné próze: hlídat hustotu, v lidském českém markdownu jsou vzácné (0,2 na 1000 slov)',
    );
  }
  if (emo.ui.length) {
    push(
      'emoji-ui-icon',
      'P3',
      emo.ui[0].line,
      `${emo.ui.length}× emoji jako ikona v HTML komponentě`,
      'ikona v šabloně komponenty, ne v textu: řešit v designu (SVG), redakce textu s tím nic nenadělá',
      { scoreExempt: true },
    );
  }
  if (emo.bullets.length >= 3) {
    push(
      'emoji-bullets',
      'P2',
      emo.bullets[0].line,
      `${emo.bullets.length}× odrážka začínající emoji`,
      'emoji odrážky: nahradit textovými odrážkami',
    );
  }

  // 3. Bold. Do hustoty se počítá jen tučné UVNITŘ PRÓZY: v tabulkách a nadpisech
  //    je zvýraznění formát, a vedoucí tučné na začátku odrážky nebo odstavce je
  //    hlavička definičního seznamu, ne zvýraznění. Bez tohohle rozdělení check
  //    měřil „používá dokument tučné“ a pálil i na lidské dokumentaci
  //    (4,72 na 100 slov; po rozdělení 0,18).
  const boldRe = /\*\*[^*\n]{2,}\*\*/g;
  const bolds = visible.match(boldRe) || [];
  const proseBolds = [];
  masked.split('\n').forEach((raw) => {
    if (/^\s*\|/.test(raw) || /^\s*#{1,6}\s/.test(raw)) return;
    const hits = raw.match(boldRe) || [];
    if (!hits.length) return;
    const leading = /^\s*(?:[-*+]\s+|\d+[.)]\s+)?\*\*/.test(raw);
    proseBolds.push(...hits.slice(leading ? 1 : 0));
  });

  // 4. Slovníky. Běží nad odháčkovaným textem (viz foldCz), vypisují originál.
  //    Odháčkovává se i zdroj vzoru, takže se hesla dají psát s diakritikou
  //    i s třídami [ěe] a chovají se stejně.
  const runList = (list, type, severity) => {
    for (const entry of list) {
      const re = entry.folded || (entry.folded = new RegExp(foldCz(entry.re.source), entry.re.flags));
      re.lastIndex = 0;
      let hit;
      while ((hit = re.exec(folded))) {
        push(
          type,
          entry.weak ? 'P3' : severity,
          lineOf(visible, hit.index),
          visible.slice(hit.index, hit.index + hit[0].length).trim(),
          entry.hint,
          { context: contextOf(visible, hit.index, hit[0].length) },
        );
        if (hit.index === re.lastIndex) re.lastIndex++;
      }
    }
  };

  runList(CS_TIER1, 'tier1', 'P1');
  runList(CS_APHORISM, 'aphorism', 'P1');
  runList(CS_TIER2, 'tier2', 'P3');
  runList(CS_HEDGE, 'hedge', 'P2');
  runList(CS_CONTRAST, 'contrast-negation', 'P1');
  runList(CS_SALES, 'sales-filler', 'P2');
  runList(CS_CHATBOT, 'chatbot', 'P1');
  runList(CS_LETS, 'lets-opener', 'P1');
  runList(CS_EPIPHANY, 'false-epiphany', 'P1');
  runList(CS_AUTHORITY, 'vague-authority', 'P1');
  runList(CS_HEDGE_STACK, 'hedge-stack', 'P1');
  runList(CS_BREADTH, 'false-breadth', 'P2');
  runList(CS_FUTURE, 'future-narrative', 'P2');
  runList(CS_PLACEHOLDER, 'cz-placeholder', 'P1');

  // 4b. Lexikální nadužití jednoho slova. Jednotlivý výskyt běžného českého slova
  //     nic neznamená (viz komentář u „klíčový“), ale opakování v jednom dokumentu
  //     ano: lidský auditní text má „klíčov*“ 0,24 na 1000 slov a nejhustší jednotlivý
  //     lidský dokument 1,24, zatímco auditované nabídky 2,5 až 3,1. Hlásí se jednou
  //     za lemma, ne za výskyt, aby jeden zvyk nedělal deset nálezů.
  {
    const wordsTotal = wordsOf(visible);
    const byStem = new Map();
    for (const i of issues) {
      // Jen tier1: tier2 jsou běžná česká slova (možnost, přístup, zajištění),
      // jejich opakování je v odborném textu správné a check by pálil na
      // encyklopedii, která termín drží konzistentně.
      if (i.type !== 'tier1') continue;
      const stem = foldCz(i.match.toLowerCase()).slice(0, 5);
      if (!byStem.has(stem)) byStem.set(stem, []);
      byStem.get(stem).push(i);
    }
    for (const [, hits] of byStem) {
      const density = wordsTotal ? (hits.length * 1000) / wordsTotal : 0;
      if (wordsTotal >= MIN_DENSITY_WORDS && hits.length >= 3 && density > 1.5) {
        push(
          'lexical-overuse',
          'P1',
          hits[0].line,
          `${hits.length}× „${hits[0].match}“ na ${wordsTotal} slov (${density.toFixed(1)}/1000)`,
          'nadužité jedno slovo: lidský odborný text má u těchto hesel do 1,2 na 1000 slov, nahradit část výskytů konkrétním obsahem',
        );
      }
    }
  }

  // 4c. Literální markdown v ne-markdown souboru: ** a # v prostém textu jsou
  //     otisk vložení z chatu nebo markdown nástroje (Wikipedia: Signs of AI
  //     writing, „Markdown pasted into non-Markdown media“; převzato z forku
  //     lolvut/avoid-ai-writing). V .md souborech je to pochopitelně syntax.
  if (/\.txt$/i.test(file)) {
    const mdBold = (visible.match(/\*\*[^*\n]{2,}\*\*/g) || []).length;
    const mdHead = visible.split('\n').filter((l) => /^#{1,6}\s\S/.test(l)).length;
    if (mdBold + mdHead > 0) {
      push(
        'literal-markdown',
        'P2',
        1,
        `${mdBold + mdHead}× markdown syntaxe (**, #) v prostém textu`,
        'literální markdown mimo markdown médium: otisk vložení z chatu; přepsat na prostý text',
      );
    }
  }

  // 5. Uvozovky. Anglické “ ” v české próze jsou chyba, stejně jako otevřená
  //    česká „ zavřená rovnou uvozovkou " (typický výstup generátoru: otevírací
  //    znak správně, zavírací ne).
  // Pozor na past: “ (U+201C) je v češtině správná ZAVÍRACÍ uvozovka (páruje se
  //  s „ U+201E). Chybná je jen ” (U+201D), a dále “ v roli otevírací, tedy
  // na začátku citace. Rozlišuje se kontextem: otevírací znak stojí po mezeře
  // nebo na začátku řádku, zavírací přiléhá k předchozímu slovu.
  const badQuote = /”|(?<=^|[\s(\[])“/gmu;
  while ((m = badQuote.exec(visible))) {
    push(
      'quotes',
      'P2',
      lineOf(visible, m.index),
      m[0],
      m[0] === '”'
        ? 'anglická zavírací uvozovka, v češtině se páruje „ s “ (IJP ÚJČ)'
        : 'anglická otevírací uvozovka, česky se otevírá „ (IJP ÚJČ)',
    );
  }
  const unpaired = /„[^„“”\n]{1,120}"/g;
  while ((m = unpaired.exec(visible))) {
    push(
      'quotes-unpaired',
      'P2',
      lineOf(visible, m.index),
      m[0].length > 60 ? `${m[0].slice(0, 57)}…` : m[0],
      'česká uvozovka „ zavřená rovnou uvozovkou ", správně je “ (U+201C)',
    );
  }

  // 6. Spojovník ve funkci pomlčky: „text - text“. Typograficky chybně a v české
  //    sazbě to prozradí, že text nikdo neredigoval.
  const hyphenDash = /(?<=\p{L}|\d)[^\S\n]-[^\S\n](?=\p{L}|\d)/gu;
  while ((m = hyphenDash.exec(visible))) {
    const line = lineOf(visible, m.index);
    const lineText = visible.split('\n')[line - 1] || '';
    if (/^\s*\|/.test(lineText) || /^\s*[-*]\s/.test(lineText)) continue;
    push('hyphen-as-dash', 'P2', line, '  -  ', 'spojovník místo pomlčky: nahradit – s mezerami, nebo větu rozdělit');
  }

  // 7. Procenta: „70 %“ je sedmdesát procent, „70%“ je sedmdesátiprocentní.
  //    Který význam autor chtěl, regex nepozná („70% pokrytí“ je správné
  //    přídavné jméno, „70% zákazníků“ je chybný zápis „70 % zákazníků“),
  //    proto jen P3 upozornění ke kontrole, ne chyba.
  const pct = /\b\d+%(?=\s*\p{L})/gu;
  while ((m = pct.exec(visible))) {
    push(
      'percent-spacing',
      'P3',
      lineOf(visible, m.index),
      m[0],
      'zkontrolovat význam: 70% = sedmdesátiprocentní (přídavné jméno), „sedmdesát procent“ se píše 70 %',
    );
  }

  // 8. Trikolon: UZAVŘENÝ tříčlenný výčet „A, B a C“. Vzor musel dostat kontrolu
  //    hranic, protože bez ní matchoval tříslovné okno uvnitř delšího výčtu, což je
  //    opak měřeného jevu (10 z 34 a 28 z 62 nálezů na auditovaných textech byly
  //    části pěti- a sedmičlenných výčtů). Rétorický tell je uzavřená trojice,
  //    ne jakákoli trojice slov oddělená čárkou.
  const tricolon = /\b([\p{L}]{4,}),\s+([\p{L}]{4,})\s+a\s+([\p{L}]{4,})\b/gu;
  while ((m = tricolon.exec(folded))) {
    // Otevřený výčet „X, Y a další/atd./apod./jiné/podobně“ NENÍ rétorická trojice:
    // třetí člen jen říká „a tak dále“. Nález z reálného TFR registru
    // („warehouse, databáze a další“ na lidské stránce). Poslední člen se bere
    // z původního (odháčkovaného) matche m[3].
    if (/^(dalsi|dalsich|atd|apod|jine|jinych|podobne|ostatni|vice)$/.test(m[3].toLowerCase())) {
      continue;
    }
    const before = visible.slice(Math.max(0, m.index - 40), m.index);
    const after = visible.slice(m.index + m[0].length, m.index + m[0].length + 30);
    // Čárka těsně před matchem znamená, že výčet začal dřív; čárka za matchem, že
    // pokračuje (pokud za ní nezačíná vedlejší věta).
    const openLeft = /,\s*$/.test(before);
    const openRight = /^\s*,(?!\s*(?:kter|jen[žz]|co[žz]|aby|proto|takže|ale|nebo))/i.test(after);
    if (openLeft || openRight) continue;
    const line = lineOf(visible, m.index);
    const lineText = visible.split('\n')[line - 1] || '';
    // Výčet v tabulce nebo odrážce je obsah, ne rétorický rytmus.
    const inList = /^\s*(?:\||[-*+]\s|\d+[.)]\s)/.test(lineText);
    push(
      'tricolon',
      inList ? 'P3' : 'P2',
      line,
      visible.slice(m.index, m.index + m[0].length),
      inList
        ? 'tříčlenný výčet v seznamu nebo tabulce: hlídat jen hustotu napříč dokumentem'
        : 'trojice v próze: zkusit dva nebo čtyři členy',
      { carveOut: inList },
    );
  }

  // 9. Staccato otázka–odpověď: „Výsledek? Rychlost.“ Infomercial rytmus.
  const qa =
    /\b(Vysledek|Reseni|Odpoved|Duvod|Hacek|Pointa|Rozdil|Zaver|Problem|Vyhoda)\?\s+[A-Z][^.!?\n]{0,60}[.!]/g;
  while ((m = qa.exec(folded))) {
    push(
      'qa-staccato',
      'P2',
      lineOf(visible, m.index),
      visible.slice(m.index, m.index + Math.min(m[0].length, 60)),
      'rytmus otázka–odpověď: napsat oznamovací větu',
    );
  }

  // 9b. Fingerprinty AI nástrojů: jazykově neutrální podpisy, které v textu
  //     zůstanou po vložení z chatu. Jeden výskyt je skoro důkaz, proto P1.
  //     Regexy převzaté z upstream avoid-ai-writing (detector/patterns.js,
  //     AI_CITATION_MARKUP / AI_UTM_SOURCE / normalizeText); po forku vlastní.
  //     Běží nad `raw`, ne nad `visible`: utm_source je v cíli odkazu, který
  //     stripInline maskuje, a zero-width znaky se mají hlídat i v kódu.
  const FINGERPRINTS = [
    { re: /\bcite(?:turn|news|search|navigation)\d+(?:search|turn|news|navigation)\d+/gi, type: 'ai-citation-markup', hint: 'citační artefakt z chat UI (ChatGPT): smazat' },
    { re: /contentReference\s*\[oaicite:[^\]]+\]\s*\{[^}]*\}/gi, type: 'ai-citation-markup', hint: 'citační artefakt z chat UI: smazat' },
    { re: /\boai_citation\b/gi, type: 'ai-citation-markup', hint: 'citační artefakt z chat UI: smazat' },
    { re: /\[attached_file:\d+\]/gi, type: 'ai-citation-markup', hint: 'artefakt z chat UI: smazat' },
    { re: /\bgrok_card\b/gi, type: 'ai-citation-markup', hint: 'artefakt z chat UI (Grok): smazat' },
    { re: /[?&]utm_source=(?:chatgpt|openai|copilot|claude|grok|gemini|perplexity)(?:\.com|\.ai)?\b/gi, type: 'ai-utm-source', hint: 'AI tracking parametr v URL: z odkazu odstranit' },
    { re: /[?&]referrer=(?:chatgpt|copilot|grok|claude|gemini|perplexity)\.(?:com|ai)\b/gi, type: 'ai-utm-source', hint: 'AI referrer parametr v URL: z odkazu odstranit' },
  ];
  // Kód se pro fingerprinty maskuje (fenced bloky i inline `…`): dokumentace,
  // která tokeny cituje jako příklad, není únik z chatu. Maskuje se mezerami,
  // aby seděly indexy řádků. Zero-width kontrola níž běží dál nad plným raw,
  // neviditelné znaky jsou podezřelé i v kódu.
  const rawForFp = raw
    .replace(/```[\s\S]*?```/g, (b) => b.replace(/[^\n]/g, ' '))
    .replace(/`[^`\n]*`/g, (b) => ' '.repeat(b.length));
  for (const fp of FINGERPRINTS) {
    fp.re.lastIndex = 0;
    while ((m = fp.re.exec(rawForFp))) {
      push(fp.type, 'P1', lineOf(rawForFp, m.index), m[0].slice(0, 40), fp.hint);
      if (m.index === fp.re.lastIndex) fp.re.lastIndex++;
    }
  }

  // Zero-width znaky a homoglyfy (azbuka/řečtina napodobující latinku) jsou
  // v české próze buď trik na obcházení detektorů, nebo otisk vložení; čeština
  // je čistě latinková, takže cyrilský lookalike je sám o sobě podezřelý.
  // POZOR: U+200D (ZWJ) legitimně spojuje emoji (🤷‍♂️, 👨‍💻), takže se nepočítá,
  // je-li obklopený piktogramy. A práh je ≥2: jeden zbloudilý neviditelný znak
  // z kopírování není trik, kdežto obfuskace jich sype celé řady.
  let zeroWidth = 0;
  const zwRe = /[​‌‍﻿⁠]/g;
  while ((m = zwRe.exec(raw))) {
    if (m[0] === '‍' && /\p{Extended_Pictographic}/u.test(raw[m.index - 1] || '') && /\p{Extended_Pictographic}|️|[\u{1F3FB}-\u{1F3FF}♀♂]/u.test(raw[m.index + 1] || '')) continue;
    zeroWidth++;
  }
  const homoglyph = (raw.match(/[Ѐ-ӿͰ-Ͽ]/g) || []).length;
  if (zeroWidth >= 2 || homoglyph >= 2) {
    push(
      'normalization-flag',
      'P1',
      1,
      `${zeroWidth} zero-width + ${homoglyph} homoglyph`,
      'neviditelné nebo homoglyfní znaky: trik na obcházení detektorů nebo otisk vložení',
    );
  }

  // 10. Nadpisy: sumární sekce, otázkové nadpisy, Title Case.
  const headingLines = [];
  lines.forEach((lineText, i) => {
    const hm = lineText.match(/^#{1,6}\s+(.*)$/);
    if (hm) headingLines.push({ line: i + 1, text: hm[1].trim() });
  });
  for (const h of headingLines) {
    if (/^(zaver(em)?|shrnuti|souhrn|v kostce|na zaver|slovo zaverem)\s*$/i.test(foldCz(h.text))) {
      push('summary-heading', 'P3', h.line, h.text, 'sumární sekce: buď nese nové info, nebo pryč');
    }
    // Title Case: čeština píše v nadpisech velké písmeno jen na začátku a u
    // vlastních jmen. Tři a víc kapitálek uvnitř nadpisu vlastní jména nebývají.
    const inner = h.text.split(/\s+/).slice(1);
    const caps = inner.filter((w) => /^[\p{Lu}][\p{Ll}]{3,}/u.test(w) && !/^[\p{Lu}]+$/u.test(w)).length;
    if (caps >= 3) {
      push('title-case-heading', 'P2', h.line, h.text, 'Title Case: česky se nadpis píše větnou sazbou');
    }
  }
  const questionHeadings = headingLines.filter((h) => /\?\s*$/.test(h.text));
  if (questionHeadings.length >= 3) {
    push(
      'question-headings',
      'P2',
      questionHeadings[0].line,
      `${questionHeadings.length}× nadpis otázkou`,
      'otázka jako nadpis je jednou rytmus, třikrát vzorec generovaných stránek',
    );
  }

  // 12. Struktura sekcí a odstavců.
  //     Odstavec = souvislý blok prózy oddělený prázdnými řádky; nadpisy,
  //     seznamy, tabulky a citace se nepočítají.
  const blocks = [];
  {
    let cur = [];
    for (const l of lines) {
      if (l.trim() === '') {
        if (cur.length) blocks.push(cur.join(' '));
        cur = [];
      } else {
        cur.push(l);
      }
    }
    if (cur.length) blocks.push(cur.join(' '));
  }
  const isProseBlock = (b) => !/^\s*(#{1,6}\s|\||[-*+]\s|\d+[.)]\s|>)/.test(b);
  const paragraphs = blocks.filter(isProseBlock).map(wordsOf).filter((n) => n >= 20);

  const sections = [];
  {
    let count = null;
    for (const b of blocks) {
      if (/^\s*#{1,6}\s/.test(b)) {
        if (count !== null) sections.push(count);
        count = 0;
      } else if (count !== null && isProseBlock(b) && wordsOf(b) >= 15) {
        count++;
      }
    }
    if (count !== null) sections.push(count);
  }
  // Gate na délku: u krátkých instrukčních dokumentů (README, skill) je jedna
  // sekce = jeden odstavec správná forma; vzorec generovaných stránek je to až
  // u delšího textu.
  const totalWords = wordsOf(visible);
  const singleParaSections = sections.filter((c) => c === 1).length;
  if (totalWords >= 600 && sections.length >= 4 && singleParaSections / sections.length >= 0.6) {
    push(
      'single-para-sections',
      'P2',
      1,
      `${singleParaSections}/${sections.length} sekcí má právě jeden odstavec`,
      'mezititulek + jeden odstavec je vzorec generátoru: sloučit sekce, nebo psát souvisle',
    );
  }

  let paraCV = 0;
  if (paragraphs.length >= 6) {
    const pMean = paragraphs.reduce((a, b) => a + b, 0) / paragraphs.length;
    const pSd = Math.sqrt(paragraphs.reduce((a, b) => a + (b - pMean) ** 2, 0) / paragraphs.length);
    paraCV = pMean ? pSd / pMean : 0;
    // Práh 0,45 místo dřívějších 0,35: lidská dokumentace i blogy se drží kolem
    // 0,4 až 0,6, takže 0,35 hlásilo jen extrémy a jev unikal.
    if (paraCV < 0.45) {
      push(
        'uniform-paragraphs',
        'P3',
        1,
        `${paragraphs.length} odstavců, variační koeficient ${paraCV.toFixed(2)}`,
        'odstavce skoro stejné délky: lidský text kolísá víc',
      );
    }
  }

  // 13. Stylometrie vět.
  const prose = visible
    .split('\n')
    .filter((l) => !/^\s*[|#>]/.test(l) && !/^\s*[-*]\s/.test(l))
    .join(' ');
  const sentences = splitSentences(prose);
  const lens = sentences.map(wordsOf).filter((n) => n > 0);
  const mean = lens.length ? lens.reduce((a, b) => a + b, 0) / lens.length : 0;
  const sd = lens.length
    ? Math.sqrt(lens.reduce((a, b) => a + (b - mean) ** 2, 0) / lens.length)
    : 0;
  const cv = mean ? sd / mean : 0;

  // Minimum 12 vět: při osmi je odhad variačního koeficientu nespolehlivý.
  if (lens.length >= 12 && cv < 0.45) {
    push(
      'uniform-sentences',
      'P2',
      1,
      `${lens.length} vět, průměr ${mean.toFixed(1)} slov, variační koeficient ${cv.toFixed(2)}`,
      'vyrovnaná délka vět, lidský text kolísá víc (cv ≳ 0,5): prostřídat krátkou a dlouhou větu',
    );
  }

  const per1000 = (n) => (totalWords ? (n * 1000) / totalWords : 0);
  const dashIssues = issues.filter((i) => i.type === 'dash-connector' && !i.carveOut);
  const boldPer100 = totalWords ? (proseBolds.length * 100) / totalWords : 0;

  if (totalWords >= MIN_DENSITY_WORDS && boldPer100 > 1.2) {
    push(
      'bold-overuse',
      'P1',
      1,
      `${proseBolds.length} tučných úseků v próze na ${totalWords} slov (${boldPer100.toFixed(1)}/100)`,
      'tučné ztrácí funkci, když ho je moc: nechat nejvýš jedno na sekci',
    );
  }

  // 14. Experimentální mikro-signály. Jen do statistik, nikdy do skóre.
  //     Měření 18. 8. 2026 na čtyřech sadách (viz corpus/MERENI.md) ukázalo, že ani
  //     jeden z nich původ textu neodlišuje, takže tady zůstávají jako doložený
  //     negativní nález, ne jako kandidáti na pravidlo:
  //     - nominalizace: lidská encyklopedie 45,2 vs. generovaný text 27,0 (RR 0,53,
  //       p < 10^-16), a v jednom registru rozptyl 27 až 47. Hypotéza padá.
  //     - který: lidský korpus má nejvyšší hodnotu ze všech sad (10,8), pravidlo
  //       „hodně který = AI“ by flagovalo první lidskou prózu.
  //     - bude: 4 vs. 3 výskyty, p = 0,42. Čeština navíc tvoří budoucnost hlavně
  //       předponovým perfektivem (zajistí, nasadí), takže vzorec tvrzení ze zdroje
  //       ani neoperacionalizuje.
  //     - nebo/či: hustota „či“ je 1,2/1000, na průkaznost by bylo potřeba ~66 tis.
  //       slov na skupinu.
  //     POZOR na past, na kterou tenhle blok už jednou najel: čítače musí běžet nad
  //     `visible`, ne nad `folded`. Nad odháčkovaným textem matchoval /\bci\b/gi
  //     zkratku CI z CI/CD (tech-audit: CI 53×, ci 9×, či 1×), takže metrika měřila
  //     něco úplně jiného, než měla.
  const count = (re) => (visible.match(re) || []).length;
  const experimental = {
    neboPer1000: Number(per1000(count(/\bnebo\b/gi)).toFixed(1)),
    ciPer1000: Number(per1000(count(/\bči\b/g)).toFixed(1)),
    budePer1000: Number(per1000(count(/\bbud(?:e|ou|eme|ete|u)\b/gi)).toFixed(1)),
    nominalizacePer1000: Number(per1000(count(/\b\p{L}{3,}[áe]n[íi]\b/gu)).toFixed(1)),
    kteryPer1000: Number(per1000(count(/\bkter[ýáéíou]\w*\b/gi)).toFixed(1)),
  };

  const stats = {
    words: totalWords,
    sentences: lens.length,
    meanSentenceWords: Number(mean.toFixed(1)),
    sentenceCV: Number(cv.toFixed(2)),
    paragraphs: paragraphs.length,
    paragraphCV: Number(paraCV.toFixed(2)),
    dashConnectors: dashIssues.length,
    dashPer1000: Number(per1000(dashIssues.length).toFixed(1)),
    emDashes: issues.filter((i) => i.emDash && !i.carveOut).length,
    boldCount: bolds.length,
    proseBoldCount: proseBolds.length,
    boldPer100Words: Number(boldPer100.toFixed(1)),
    emojiHeadings: emo.headings.length,
    emojiStatus: emo.status.length,
    emojiBody: emo.body.length,
    headings: headingLines.length,
    experimental,
  };

  // Korektní česká pomlčka – do skóre nevstupuje nikdy: je to znak, který
  // čeština předepisuje (IJP ÚJČ id=165), a lidské kontrolní korpusy ho mají
  // 10,5 (encyklopedie) a 3,7 (markdown) na 1000 slov, jednotlivé soubory až 13.
  // Dřívější práh 12/1000 tedy trestal správnou sazbu. Nález zůstává vypsaný,
  // aby šla hustota sledovat.
  for (const i of issues) {
    if (i.type === 'dash-connector' && !i.emDash && i.match !== '--') i.scoreExempt = true;
  }

  // Dlouhá pomlčka: severita podle hustoty, ne podle prvního výskytu. Nad lidským
  // maximem (3,8/1000 u autora, který jí nahrazuje českou pomlčku) zůstává P1,
  // pod ním klesá na P2, protože jeden nebo dva výskyty autorský styl nevylučuje.
  const emDashProse = issues.filter((i) => i.emDash && !i.carveOut);
  if (emDashProse.length && per1000(emDashProse.length) <= 4) {
    for (const i of emDashProse) {
      i.severity = 'P2';
      i.hint = 'dlouhá pomlčka jako spojka věty: v češtině se sází – (IJP ÚJČ); při téhle hustotě to může být i autorský styl';
    }
  }

  // Checky, které na doložitelně lidské próze pálí stejně jako na generovaném textu,
  // zůstávají vypsané jako redakční rada, ale skóre nezvedají. Naměřené poměry proti
  // vyšší z lidských baseline (scripts/bench.js, 18. 8. 2026):
  //   hedge ×0,5 až ×0,7 · quotes (anglické “ ”) ×0 · tier2 ×1,1 až ×1,6
  // U `quotes` je to dokonce obráceně: lidský markdown má 0,6/1000, cílové sady 0.
  const NON_DISCRIMINATING = new Set(['hedge', 'quotes', 'tier2', 'sales-filler']);
  for (const i of issues) if (NON_DISCRIMINATING.has(i.type)) i.scoreExempt = true;

  // Strop na mechanické typografické chyby: jedna sed-opravitelná záměna opakovaná
  // 46× v jednom souboru není 46 nezávislých signálů. První tři výskyty téhož typu
  // se počítají plnou vahou, další jsou jen vypsané.
  const CAPPED = ['quotes-unpaired', 'hyphen-as-dash', 'percent-spacing'];
  for (const type of CAPPED) {
    issues
      .filter((i) => i.type === type)
      .slice(3)
      .forEach((i) => {
        i.scoreExempt = true;
      });
  }

  const weight = { P1: 6, P2: 2.5, P3: 0.8 };
  const rawScore = issues.reduce((a, i) => a + (i.scoreExempt ? 0 : weight[i.severity] || 1), 0);
  const density = totalWords ? (rawScore * 1000) / totalWords : 0;
  const score = scoreFromWeight(rawScore, totalWords);
  stats.tellDensity = Number(density.toFixed(1));
  // Váha se vystavuje, aby šlo spočítat souhrnné skóre za celý web nebo adresář:
  // scoreFromWeight(Σ weight, Σ words). Průměrovat skóre po souborech nejde, protože
  // je to saturující funkce hustoty, a medián dá krátkému a dlouhému souboru
  // stejný hlas.
  stats.weight = Number(rawScore.toFixed(1));
  const label =
    score >= 70 ? 'Silné AI signály' : score >= 40 ? 'Střední AI signály' : score >= 20 ? 'Slabé AI signály' : 'Čisté';

  return { file, score, label, issues, stats };
}

/** N-gramy opakované napříč soubory: signál generování ze šablony. */
function crossFileRepeats(docs, { n = 6, minFiles = 3 } = {}) {
  const index = new Map();
  for (const d of docs) {
    const visible = stripInline(stripHtml(maskFences(d.text)));
    const words = (visible.toLowerCase().match(/[\p{L}\d][\p{L}\d'’-]*/gu) || []);
    const seen = new Set();
    for (let i = 0; i + n <= words.length; i++) {
      const gram = words.slice(i, i + n).join(' ');
      if (seen.has(gram)) continue;
      seen.add(gram);
      if (!index.has(gram)) index.set(gram, new Set());
      index.get(gram).add(d.file);
    }
  }
  return [...index.entries()]
    .filter(([, files]) => files.size >= minFiles)
    .map(([gram, files]) => ({ gram, files: [...files], count: files.size }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Jediné místo, kde se z váhy nálezů stává skóre 0-100. Váhy jsou ADITIVNÍ
 * (mechanické i úsudkové se sčítají lineárně), strop 100 dělá saturující
 * křivka: score = 100·d/(d+120), kde d je váha na 1000 slov. Bod poloviny
 * (d = 120) je kalibrovaný tak, aby lidsky psaná česká próza vycházela
 * pod 25 a šablonovitý generovaný marketing nad 60.
 */
function scoreFromWeight(weight, words) {
  const density = words ? (weight * 1000) / words : 0;
  return Math.round((100 * density) / (density + 120));
}

/**
 * Souhrnné skóre za víc dokumentů (celý web, adresář, nabídka).
 * Stejná saturující křivka jako u jednoho dokumentu, jen nad součty: hustota vah
 * na 1000 slov přes všechny soubory. Neskórovatelné soubory (pod 10 slov) se
 * do součtů nezahrnují.
 */
function pooledScore(results) {
  let weight = 0;
  let words = 0;
  for (const r of results) {
    if (!r || r.score === null) continue;
    weight += r.stats.weight || 0;
    words += r.stats.words || 0;
  }
  const density = words ? (weight * 1000) / words : 0;
  const score = scoreFromWeight(weight, words);
  return { score, label: getLabel(score), words, weight: Number(weight.toFixed(1)), density: Number(density.toFixed(1)) };
}

function getLabel(score) {
  return score >= 70 ? 'Silné AI signály' : score >= 40 ? 'Střední AI signály' : score >= 20 ? 'Slabé AI signály' : 'Čisté';
}

/**
 * Známka 0–10 (10 = bez AI) jako hlavní komunikovaný výstup. Interní skóre
 * 0–100 (méně = lepší) zůstává technickou metrikou; známka je po částech
 * lineární převod ukotvený na kalibrovaných prazích, s pásmy podle firemní
 * stupnice metrik (TFR „Metriky oddělení“):
 *   interní 0→10,0 · 5→9,1 · 10→8,1 · 15 (práh redakce)→7,1 ·
 *   20→6,1 · 25 (práh tvrzení o AI)→5,0 · 100→0,0.
 * Nula nálezů na netriviálním textu je vzácná i u lidí, takže 10,0 je
 * přirozeně skoro nedosažitelná bez umělého stropu (lidské korpusy pooled
 * interní 6–7 → známka 8,7–8,9).
 */
const GRADE_ANCHORS = [[0, 10], [5, 9.1], [10, 8.1], [15, 7.1], [20, 6.1], [25, 5.0], [100, 0]];
const GRADE_BANDS = [
  [9.1, '🏆', 'Excelentní'],
  [8.1, '🌟', 'Nad očekávání'],
  [7.1, '✅', 'Solidní základ'],
  [6.1, '⚠️', 'Zlepšení nutné'],
  [5.1, '❗', 'Nestabilní'],
  [0, '🚨', 'Kritický'],
];

function gradeFromScore(score) {
  if (score === null || score === undefined) return null;
  const s = Math.max(0, Math.min(100, score));
  let grade = 0;
  for (let k = 1; k < GRADE_ANCHORS.length; k++) {
    const [s0, g0] = GRADE_ANCHORS[k - 1];
    const [s1, g1] = GRADE_ANCHORS[k];
    if (s <= s1) {
      grade = g0 + ((s - s0) * (g1 - g0)) / (s1 - s0);
      break;
    }
  }
  grade = Math.round(grade * 10) / 10;
  const [, emoji, name] = GRADE_BANDS.find(([min]) => grade >= min) || GRADE_BANDS[GRADE_BANDS.length - 1];
  return { grade, emoji, band: name };
}

function formatGrade(g) {
  return g ? `${g.grade.toFixed(1).replace('.', ',')}/10 ${g.emoji} ${g.band}` : 'neskórovatelné';
}

module.exports = {
  analyzeText,
  pooledScore,
  scoreFromWeight,
  getLabel,
  gradeFromScore,
  formatGrade,
  crossFileRepeats,
  splitSentences,
  maskFences,
  stripHtml,
};
