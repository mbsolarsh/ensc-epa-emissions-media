/* Two Lanes, One Story — interactive bits */

/* ---------- Headline lens ---------- */
const LENS = {
  npr: {
    outlet: "NPR · Climate desk · Feb 11–12, 2026",
    headline: "Trump's EPA will stop regulating greenhouse gases, setting up a legal fight",
    sub: "Heard on All Things Considered · By Jeff Brady & Camila Domonoske",
    lead: "“On Thursday, the Trump administration rescinded the central scientific finding that underpins much of the nation's climate pollution rules, its most aggressive action yet to halt initiatives that address planetary warming.”",
    notes: ["Frame: climate rollback + court fight", "Key phrase: “most aggressive action yet”", "Subject: “the Trump administration”", "Second quote: an environmental lawyer"]
  },
  fox: {
    outlet: "Fox News · Politics · Feb 12, 2026",
    headline: "Obama-era greenhouse gas rules gone as EPA's Zeldin signs 'single largest deregulatory action' in history",
    sub: "EPA administrator eliminates regulation that forced annoying start-stop car feature on drivers nationwide",
    lead: "“FIRST ON FOX: Environmental Protection Agency (EPA) Administrator Lee Zeldin on Thursday will eliminate the \"2009 Obama EPA Endangerment Finding,\" which set in motion most federal greenhouse gas emissions standards for vehicles, saving Americans billions.”",
    notes: ["Frame: deregulation win + consumer relief", "Key phrase: “saving Americans billions”", "Label: “Obama-era”", "First quote: the EPA administrator"]
  }
};
const screen = document.getElementById("lensScreen");
function showLens(side) {
  const d = LENS[side];
  document.getElementById("lsOutlet").textContent = d.outlet;
  document.getElementById("lsHeadline").textContent = d.headline;
  document.getElementById("lsSub").textContent = d.sub;
  document.getElementById("lsLead").textContent = d.lead;
  document.getElementById("lsNotes").innerHTML = d.notes.map(n => `<span class="chip">${n}</span>`).join("");
  screen.classList.toggle("fox", side === "fox");
  screen.classList.remove("swap"); void screen.offsetWidth; screen.classList.add("swap");
  document.querySelectorAll(".ls-btn").forEach(b => {
    const on = b.dataset.side === side;
    b.classList.toggle("active", on);
    b.setAttribute("aria-selected", on);
  });
}
document.querySelectorAll(".ls-btn").forEach(b => b.addEventListener("click", () => showLens(b.dataset.side)));
showLens("npr");

/* ---------- Framing tabs (Step 3: A–E) ---------- */
const FRAMES = [
  {
    tab: "A · Headline & lead",
    npr: ["Headline names <b>“Trump's EPA”</b> as the actor and looks ahead to a <b>“legal fight.”</b>",
          "The lead calls it the <b>“most aggressive action yet”</b> against efforts to address <b>“planetary warming.”</b>",
          "The second quote is from an environmental lawyer who promises to sue.",
          "<b>Photo:</b> a quiet, empty shot of EPA headquarters with flags at half-staff, with no people celebrating."],
    fox: ["Headline says the rules are <b>“gone”</b> and labels them <b>“Obama-era.”</b>",
          "The subheadline focuses on the <b>“annoying start-stop car feature.”</b>",
          "Opens as an exclusive (“FIRST ON FOX”) and says the change is <b>“saving Americans billions.”</b>",
          "<b>Photo:</b> a smiling signing ceremony with officials and coal workers in hard hats."],
    verdict: "Both headlines report the same event. NPR leads with conflict and climate. Fox leads with savings and convenience for drivers. Even the photos match: NPR's is somber, Fox's is a celebration."
  },
  {
    tab: "B · Facts vs. opinion",
    npr: ["<b>Facts:</b> the 2009 finding; <i>Massachusetts v. EPA</i> (2007); transportation is the largest source of direct U.S. greenhouse gas emissions; EVs were about 10% of new car sales in 2024.",
          "<b>Facts:</b> dozens of independent scientists rebutted the Energy Department report the EPA relied on.",
          "<b>Speculative:</b> “almost certain to lead to years of court battles.” Mentions “economic analyses” showing drivers save money, but doesn't name them."],
    fox: ["<b>Facts:</b> the 2009 finding covered six gases; <i>Massachusetts v. EPA</i>; EPA created the start-stop credit in 2012.",
          "<b>Unsupported:</b> “$1.3 trillion” and “billions” in savings are reported with no explanation of how they were calculated.",
          "<b>Opinion stated as fact:</b> start-stop is a “loophole” with no “empirical” benefit, with no data given. Also relies on an unnamed “source familiar.”"],
    verdict: "NPR gives more checkable facts and sources. Fox makes bigger claims about cost but gives less evidence for them."
  },
  {
    tab: "C · Tone & language",
    npr: ["The reporters' own wording is mostly neutral, but they pick dramatic quotes: “slap in the face,” “polluter protection agency.”",
          "Also quotes Zeldin's “dagger straight into the heart of the climate change religion” and Trump calling climate change a “con job.” These are used to show how extreme the administration's side is.",
          "Describes trucks as “gas-guzzling.”"],
    fox: ["The reporter's own wording is loaded: “annoying,” “infuriated motorists,” “loophole,” “slew of new restrictions.”",
          "Quotes “stupid feature,” “Trump Speed,” “crushing regulations,” and “climate participation trophy” without pushing back.",
          "Critics' quotes (Earthjustice, Gov. Polis) are included but placed at the end."],
    verdict: "Fox's charged words often come from the reporter. NPR's mostly come from the people it chose to quote."
  },
  {
    tab: "D · Selection & omission",
    npr: ["<b>Emphasizes:</b> climate disasters, record heat, the history of the law, EV policy, the auto industry's mixed reaction, and doubts about the science the EPA used.",
          "<b>Leaves out:</b> start-stop technology and drivers' everyday complaints. Says little about public health."],
    fox: ["<b>Emphasizes:</b> the start-stop feature, consumer choice, cost savings, and manufacturing jobs.",
          "<b>Leaves out:</b> climate science, record temperatures, the rebuttal from scientists, auto suppliers who wanted the rules kept, and any check of the $1.3 trillion claim."],
    verdict: "Each article picks the facts that support its story. The cards in the next section show the details."
  },
  {
    tab: "E · Framing",
    npr: ["Frames the repeal as a <b>crisis and a controversy</b>: a major step backward on climate that will be fought in court for years.",
          "Readers come away thinking about climate risk and legal uncertainty."],
    fox: ["Frames the repeal as an <b>opportunity and a victory</b>: the biggest deregulation in history, ending an annoying, costly rule.",
          "Readers come away thinking about their wallet and their car battery."],
    verdict: "Same policy, two opposite frames: “threat to the planet” vs. “win for drivers.”"
  }
];
const tabsEl = document.getElementById("frameTabs");
const panelEl = document.getElementById("framePanel");
function showFrame(i) {
  const f = FRAMES[i];
  panelEl.innerHTML = `
    <div class="fl"><h4>NPR</h4><ul>${f.npr.map(x => `<li>${x}</li>`).join("")}</ul></div>
    <div class="fr"><h4>Fox News</h4><ul>${f.fox.map(x => `<li>${x}</li>`).join("")}</ul></div>
    <div class="verdict">🔎 <b>Takeaway:</b> ${f.verdict}</div>`;
  [...tabsEl.children].forEach((t, j) => { t.classList.toggle("active", i === j); t.setAttribute("aria-selected", i === j); });
}
FRAMES.forEach((f, i) => {
  const b = document.createElement("button");
  b.className = "tab"; b.setAttribute("role", "tab"); b.textContent = f.tab;
  b.addEventListener("click", () => showFrame(i));
  tabsEl.appendChild(b);
});
showFrame(0);

/* ---------- Emphasis meter (approx. % of paragraphs) ---------- */
const THEMES = [
  ["Climate science & disasters", 20, 3],
  ["Law & political history", 30, 15],
  ["Cars, EVs & auto industry", 30, 10],
  ["Start-stop feature", 0, 30],
  ["Cost & savings claims", 12, 15],
  ["Public health", 3, 7],
  ["Critics & opposition", 5, 20]
];
const meter = document.getElementById("meter");
meter.innerHTML = THEMES.map(([label, n, f]) => `
  <div class="m-row">
    <div class="m-label">${label}</div>
    <div class="m-bars">
      <div class="m-bar l" data-w="${n}" title="NPR ≈ ${n}%"><span>NPR ≈ ${n}%</span></div>
      <div class="m-bar r" data-w="${f}" title="Fox ≈ ${f}%"><span>Fox ≈ ${f}%</span></div>
    </div>
  </div>`).join("") + `<div class="m-legend"><span><i style="background:var(--left)"></i>NPR</span><span><i style="background:var(--right)"></i>Fox News</span></div>`;

/* ---------- Loaded words ---------- */
const WORDS_L = [
  ["most aggressive action yet", "NPR reporters, in the opening sentence"],
  ["slap in the face", "Abigail Dillen, Earthjustice"],
  ["climate disasters", "Dillen; NPR also lists floods and wildfires"],
  ["dagger straight into the heart of the climate change religion", "Lee Zeldin, quoted by NPR from a 2025 news release"],
  ["con job", "Trump on climate change, as reported by NPR"],
  ["gas-guzzling", "NPR reporters, describing big trucks"],
  ["free rein", "NPR reporters, on automakers"],
  ["polluter protection agency", "Manish Bapna, NRDC (radio version)"]
];
const WORDS_R = [
  ["gone", "Fox headline"],
  ["Obama-era", "Fox headline, a partisan label"],
  ["annoying", "Fox subheadline, the reporter's own word"],
  ["infuriated motorists", "Fox reporter"],
  ["loophole", "Fox reporter, on the start-stop credit"],
  ["stupid feature", "Lee Zeldin"],
  ["Trump Speed", "Lee Zeldin"],
  ["climate participation trophy", "Lee Zeldin"],
  ["crushing regulations", "Karoline Leavitt, White House"],
  ["abandoning its core responsibility", "Abigail Dillen, Earthjustice (critic quoted by Fox)"]
];
function fillWords(id, list) {
  document.getElementById(id).innerHTML += list.map(([w, who]) =>
    `<span class="word" tabindex="0">${w}<span class="tip">Source: ${who}</span></span>`).join("");
}
fillWords("wordsL", WORDS_L);
fillWords("wordsR", WORDS_R);

/* ---------- What's missing flip cards ---------- */
const FLIPS = [
  ["Climate science", "r", "Fox never explains what greenhouse gases do and doesn't mention that the last three years were the hottest on record. NPR covers both."],
  ["The $1.3 trillion claim", "l", "NPR points out the savings come mostly from cheaper sticker prices, while studies show drivers save overall on gas under strict rules. Fox reports the number without questioning it."],
  ["Start-stop engines", "r", "Fox's subheadline and several paragraphs focus on this feature. NPR never mentions it."],
  ["Scientists push back", "l", "NPR reports that dozens of independent scientists said the Energy Department's climate report was “full of errors.” Fox leaves this out."],
  ["Auto industry split", "l", "NPR notes that parts suppliers (MEMA) asked the EPA to keep the rules so they can compete with Chinese EVs. Fox presents industry as uniformly helped."],
  ["Public health", "r", "Surprise: the clearest health argument (kids, seniors, people with health conditions) is Gov. Polis's quote in Fox. NPR mentions health only briefly."],
  ["Smog vs. greenhouse gases", "b", "Neither article explains that this repeal covers only CO₂ and other greenhouse gases. Separate rules for smog-forming tailpipe pollution still exist."]
];
const flipGrid = document.getElementById("flipGrid");
const who = { l: "Covered by NPR, missing from Fox", r: "Covered by Fox, missing from NPR", b: "Missing from both" };
flipGrid.innerHTML = FLIPS.map(([t, s, txt]) => `
  <button class="flip" aria-label="${t}: flip card">
    <div class="flip-inner">
      <div class="face front"><h4>${t}</h4><small>Tap to flip ↻</small></div>
      <div class="face back ${s}"><strong style="font-family:var(--head)">${who[s]}</strong><p style="margin:.4em 0 0">${txt}</p></div>
    </div>
  </button>`).join("");
flipGrid.querySelectorAll(".flip").forEach(c => c.addEventListener("click", () => c.classList.toggle("on")));

/* ---------- Who said it? quiz ---------- */
const QUIZ = [
  ["“a slap in the face to the millions of Americans who are living through climate disasters and their aftermath”", "npr", "NPR quoted Earthjustice's president. Fox quoted her too, but chose a different line."],
  ["“it kills the battery of your car without any significant benefit to the environment”", "fox", "EPA Administrator Lee Zeldin on start-stop engines. NPR never mentions start-stop."],
  ["“We are driving a dagger straight into the heart of the climate change religion”", "npr", "Surprise! NPR ran this Zeldin quote, probably to show how combative the administration's message is."],
  ["“Protecting people's health and making our air cleaner should never be a partisan issue”", "fox", "Surprise! Fox quoted Colorado's Democratic governor, Jared Polis. It was the strongest health argument in either article."],
  ["“its most aggressive action yet to halt initiatives that address planetary warming”", "npr", "This is NPR's opening sentence, written by the reporters themselves."],
  ["“quickly infuriated motorists who hear their engine click off then on again at a stoplight”", "fox", "This is the Fox reporter's own wording, not a quote, and the article gives no survey data for it."],
  ["“Transportation is the largest source of direct greenhouse gas emissions in the United States.”", "npr", "A checkable fact that matches EPA data (about 28% in 2022). Fox doesn't include it."],
  ["“it will save the American people $1.3 trillion in crushing regulations”", "fox", "White House Press Secretary Karoline Leavitt. Both outlets reported the number, but only NPR questioned it."]
];
let qi = 0, score = 0;
const qText = document.getElementById("qText"), qFb = document.getElementById("qFb"), qNext = document.getElementById("qNext");
const qBtns = document.querySelectorAll(".qbtn");
function loadQ() {
  if (qi >= QUIZ.length) {
    qText.textContent = `You scored ${score} / ${QUIZ.length}! ${score >= 7 ? "You can spot media framing 🏁" : score >= 4 ? "Not bad. Word choice gives a lot away 🚦" : "Tricky, right? Both outlets quote the other side sometimes 🚧"}`;
    qFb.textContent = ""; qFb.className = "quiz-fb";
    qBtns.forEach(b => b.hidden = true);
    qNext.hidden = false; qNext.textContent = "Play again ↺";
    return;
  }
  document.getElementById("qCount").textContent = `${qi + 1} / ${QUIZ.length}`;
  qText.textContent = QUIZ[qi][0];
  qFb.textContent = ""; qFb.className = "quiz-fb";
  qBtns.forEach(b => { b.disabled = false; b.hidden = false; });
  qNext.hidden = true; qNext.textContent = "Next →";
}
qBtns.forEach(b => b.addEventListener("click", () => {
  const [, ans, why] = QUIZ[qi];
  const ok = b.dataset.a === ans;
  if (ok) score++;
  qFb.textContent = (ok ? "✅ Correct! " : `❌ It was ${ans === "npr" ? "NPR" : "Fox News"}. `) + why;
  qFb.className = "quiz-fb " + (ok ? "ok" : "no");
  document.getElementById("qScore").textContent = `Score: ${score}`;
  qBtns.forEach(x => x.disabled = true);
  qNext.hidden = false;
}));
qNext.addEventListener("click", () => {
  if (qi >= QUIZ.length) { qi = 0; score = 0; document.getElementById("qScore").textContent = "Score: 0"; }
  else qi++;
  loadQ();
});
loadQ();

/* ---------- Tailpipe calculator ---------- */
const miles = document.getElementById("miles"), mpg = document.getElementById("mpg");
function calc() {
  const m = +miles.value, e = +mpg.value;
  const tons = (m / e) * 8887 / 1e6;
  document.getElementById("milesOut").textContent = m.toLocaleString();
  document.getElementById("mpgOut").textContent = e;
  document.getElementById("tons").textContent = tons.toFixed(1);
  document.getElementById("trees").textContent = (tons / 0.84).toFixed(1);
}
miles.addEventListener("input", calc); mpg.addEventListener("input", calc); calc();

/* ---------- Action checklist ---------- */
const boxes = document.querySelectorAll(".checklist input");
let saved = [];
try { saved = JSON.parse(localStorage.getItem("ensc-actions") || "[]"); } catch (e) {}
boxes.forEach((b, i) => { b.checked = !!saved[i]; b.addEventListener("change", updatePledge); });
function updatePledge() {
  const n = [...boxes].filter(b => b.checked).length;
  document.getElementById("pledge").textContent =
    n === 0 ? "You've picked 0 actions. Choose one to start!" :
    `You've picked ${n} action${n > 1 ? "s" : ""}. ${n >= 5 ? "🌎 Climate champion!" : "🌱 Every lane counts."}`;
  try { localStorage.setItem("ensc-actions", JSON.stringify([...boxes].map(b => b.checked))); } catch (e) {}
}
updatePledge();

/* ---------- Artist's note word count ---------- */
const noteText = [...document.querySelectorAll(".note p:not(.note-meta)")].map(p => p.textContent).join(" ");
document.getElementById("wc").textContent = `${noteText.trim().split(/\s+/).length} words`;

/* ---------- Scroll effects: reveal, count-up, meter ---------- */
document.querySelectorAll(".wrap > *").forEach(el => el.classList.add("reveal"));
function countUp(el) {
  const target = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
  const t0 = performance.now(), dur = 1400;
  (function step(t) {
    const p = Math.min(1, (t - t0) / dur), v = target * (1 - Math.pow(1 - p, 3));
    el.textContent = v.toFixed(dec);
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    el.classList.add("in");
    el.querySelectorAll?.("[data-count]").forEach(countUp);
    if (el.id === "meter") el.querySelectorAll(".m-bar").forEach(b => b.style.width = (b.dataset.w * 2) + "%");
    io.unobserve(el);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
