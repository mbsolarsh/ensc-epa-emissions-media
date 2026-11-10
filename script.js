/* Two Lanes, One Story — interactive bits */

/* ---------- Headline lens ---------- */
const LENS = {
  npr: {
    outlet: "NPR · Climate desk · Feb 11–12, 2026",
    headline: "Trump's EPA will stop regulating greenhouse gases, setting up a legal fight",
    sub: "Heard on All Things Considered · By Jeff Brady & Camila Domonoske",
    lead: "“On Thursday, the Trump administration rescinded the central scientific finding that underpins much of the nation's climate pollution rules, its most aggressive action yet to halt initiatives that address planetary warming.”",
    notes: ["Vibe: climate setback + court fight", "Big phrase: “most aggressive action yet”", "Who's doing it: “the Trump administration”", "2nd quote: an environmental lawyer"]
  },
  fox: {
    outlet: "Fox News · Politics · Feb 12, 2026",
    headline: "Obama-era greenhouse gas rules gone as EPA's Zeldin signs 'single largest deregulatory action' in history",
    sub: "EPA administrator eliminates regulation that forced annoying start-stop car feature on drivers nationwide",
    lead: "“FIRST ON FOX: Environmental Protection Agency (EPA) Administrator Lee Zeldin on Thursday will eliminate the \"2009 Obama EPA Endangerment Finding,\" which set in motion most federal greenhouse gas emissions standards for vehicles, saving Americans billions.”",
    notes: ["Vibe: big win for drivers", "Big phrase: “saving Americans billions”", "Label: “Obama-era”", "1st quote: the EPA administrator"]
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
    npr: ["The headline puts <b>“Trump's EPA”</b> front and center and is already looking ahead to a <b>“legal fight.”</b>",
          "The first sentence calls it the <b>“most aggressive action yet”</b> against fighting <b>“planetary warming.”</b>",
          "The second person quoted is an environmental lawyer saying they'll sue.",
          "<b>Photo:</b> a pretty gloomy shot of EPA headquarters with the flags at half-staff and nobody in it."],
    fox: ["The headline says the rules are <b>“gone”</b> and calls them <b>“Obama-era,”</b> which makes it feel political right away.",
          "The subheadline is all about the <b>“annoying start-stop car feature.”</b>",
          "It starts with “FIRST ON FOX” like a scoop, and says the change is <b>“saving Americans billions.”</b>",
          "<b>Photo:</b> a happy signing ceremony with smiling officials and coal workers in hard hats."],
    verdict: "Same event, but NPR starts with conflict and climate while Fox starts with saving money and making drivers' lives easier. Even the photos match the mood: NPR's feels serious, Fox's feels like a party."
  },
  {
    tab: "B · Facts vs. opinion",
    npr: ["<b>Facts:</b> the 2009 finding; <i>Massachusetts v. EPA</i> (2007); transportation is the largest source of direct U.S. greenhouse gas emissions; EVs were about 10% of new car sales in 2024.",
          "<b>Facts:</b> dozens of independent scientists rebutted the Energy Department report the EPA relied on.",
          "<b>Guessing:</b> it says this is “almost certain to lead to years of court battles.” It also mentions “economic analyses” that show drivers save money, but never says which ones."],
    fox: ["<b>Facts:</b> the 2009 finding covered six gases; <i>Massachusetts v. EPA</i>; EPA created the start-stop credit in 2012.",
          "<b>No proof given:</b> it says “$1.3 trillion” and “billions” in savings, but never explains where those numbers came from.",
          "<b>Opinion written like a fact:</b> it calls start-stop a “loophole” with no real benefit, but doesn't show any data. It also uses an unnamed “source familiar with the situation.”"],
    verdict: "NPR gave more facts I could actually go check. Fox made bigger claims about money but didn't back them up as much."
  },
  {
    tab: "C · Tone & language",
    npr: ["The reporters mostly keep their own words neutral, but they pick dramatic quotes like “slap in the face” and “polluter protection agency.”",
          "They also include Zeldin saying “dagger straight into the heart of the climate change religion” and Trump calling climate change a “con job,” which kind of makes the other side look extreme.",
          "They call big trucks “gas-guzzling.”"],
    fox: ["The reporter uses loaded words on their own, like “annoying,” “infuriated motorists,” “loophole,” and “slew of new restrictions.”",
          "It runs quotes like “stupid feature,” “Trump Speed,” “crushing regulations,” and “climate participation trophy” without questioning any of them.",
          "The critics (Earthjustice and Gov. Polis) do get quoted, but only at the very end."],
    verdict: "Something I didn't expect: in Fox, a lot of the emotional words come from the reporter. In NPR, they mostly come from the people being quoted."
  },
  {
    tab: "D · Selection & omission",
    npr: ["<b>Focuses on:</b> climate disasters, record heat, the history of the law, EVs, how the car industry feels about it, and problems with the science the EPA used.",
          "<b>Skips:</b> start-stop engines and what everyday drivers actually complain about. It barely talks about health."],
    fox: ["<b>Focuses on:</b> start-stop engines, consumer choice, saving money, and manufacturing jobs.",
          "<b>Skips:</b> climate science, record temperatures, the scientists who pushed back, car part makers who wanted the rules kept, and any fact-check of the $1.3 trillion number."],
    verdict: "Each article picks the facts that fit its story. The flip cards further down go into more detail."
  },
  {
    tab: "E · Framing",
    npr: ["Makes it feel like a <b>crisis and a controversy</b>, a big step backward on climate that's going to be fought in court for years.",
          "After reading it, I was mostly thinking about climate risk and what the courts will do."],
    fox: ["Makes it feel like an <b>opportunity and a win</b>, the biggest deregulation ever and the end of an annoying, expensive rule.",
          "After reading it, I was mostly thinking about my wallet and my car battery."],
    verdict: "Same policy, two totally opposite stories: “threat to the planet” vs. “win for drivers.”"
  }
];
const tabsEl = document.getElementById("frameTabs");
const panelEl = document.getElementById("framePanel");
function showFrame(i) {
  const f = FRAMES[i];
  panelEl.innerHTML = `
    <div class="fl"><h4>NPR</h4><ul>${f.npr.map(x => `<li>${x}</li>`).join("")}</ul></div>
    <div class="fr"><h4>Fox News</h4><ul>${f.fox.map(x => `<li>${x}</li>`).join("")}</ul></div>
    <div class="verdict">🔎 <b>What I noticed:</b> ${f.verdict}</div>`;
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
  ["Climate science & disasters", 20, 3, "Warming, heat, wildfires, floods"],
  ["Law & political history", 30, 15, "Courts, laws, past presidents"],
  ["Cars, EVs & auto industry", 30, 10, "Carmakers and electric cars"],
  ["Start-stop feature", 0, 30, "Engine auto-shuts off at stops"],
  ["Cost & savings claims", 12, 15, "Who saves money, how much"],
  ["Public health", 3, 7, "Pollution's effect on people"],
  ["Critics & opposition", 5, 20, "People against the repeal"]
];
const meter = document.getElementById("meter");
meter.innerHTML = THEMES.map(([label, n, f, desc]) => `
  <div class="m-row">
    <div class="m-label">${label}<span class="m-desc">${desc}</span></div>
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
  ["Climate science", "r", "Fox never explains what greenhouse gases actually do, and doesn't mention that the last three years were the hottest ever recorded. NPR talks about both."],
  ["The $1.3 trillion claim", "l", "NPR points out that most of the “savings” come from cheaper sticker prices, and that drivers actually save more on gas under the stricter rules. Fox just reports the number."],
  ["Start-stop engines", "r", "Fox spends its subheadline and a bunch of paragraphs on this. NPR doesn't mention it once."],
  ["Scientists push back", "l", "NPR says dozens of independent scientists called the Energy Department's climate report “full of errors.” Fox leaves that out completely."],
  ["Auto industry split", "l", "NPR mentions that car part makers (MEMA) actually asked the EPA to keep the rules so they could compete with Chinese EVs. Fox makes it sound like the whole industry is happy."],
  ["Public health", "r", "This surprised me: the best health argument (about kids, seniors, and people with health conditions) is a quote from Gov. Polis in the Fox article. NPR barely mentions health."],
  ["Smog vs. greenhouse gases", "b", "Neither article explains that this only affects CO₂ and other greenhouse gases. The rules for smog-causing pollution from tailpipes are separate and still exist."]
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
  ["“a slap in the face to the millions of Americans who are living through climate disasters and their aftermath”", "npr", "NPR quoted the president of Earthjustice. Fox quoted her too, just a different line."],
  ["“it kills the battery of your car without any significant benefit to the environment”", "fox", "That's EPA Administrator Lee Zeldin talking about start-stop engines. NPR never brings them up."],
  ["“We are driving a dagger straight into the heart of the climate change religion”", "npr", "Gotcha! NPR used this Zeldin quote, probably to show how aggressive the administration sounds."],
  ["“Protecting people's health and making our air cleaner should never be a partisan issue”", "fox", "Gotcha! Fox quoted Colorado's Democratic governor, Jared Polis, and it ended up being the best health argument in either article."],
  ["“its most aggressive action yet to halt initiatives that address planetary warming”", "npr", "That's NPR's first sentence, written by the reporters themselves."],
  ["“quickly infuriated motorists who hear their engine click off then on again at a stoplight”", "fox", "That's the Fox reporter's own wording, not a quote, and there's no data showing drivers actually feel that way."],
  ["“Transportation is the largest source of direct greenhouse gas emissions in the United States.”", "npr", "This is a real fact you can check, and it matches EPA data (about 28% in 2022). Fox doesn't include it."],
  ["“it will save the American people $1.3 trillion in crushing regulations”", "fox", "That's White House Press Secretary Karoline Leavitt. Both articles used this number, but only NPR questioned it."]
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
