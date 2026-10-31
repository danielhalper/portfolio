// The Efficiency Engine board: the numbers from Daniel's voice note, a feed of real Step Up automations (named after the Zaps and
// flows in assets/stepup-ops.jpg and assets/engine-collage.jpg — automations, never people), over the FigJam flow board.
(function () {
  const FEED = [
    ['Paperform → Airtable', 'New tutor application saved'],
    ['Airtable', 'Applicant added to interview notes'],
    ['Airtable → Text', 'New applicant added to texts, taken off the interest list'],
    ['Sheets → Gmail', 'Interview finished: applicant moved to Accepted'],
    ['Gmail', 'Preliminary acceptance sent with Live Scan instructions'],
    ['Airtable → Gmail', '5-day reminder: remaining onboarding items'],
    ['Airtable', 'Live Scan results good: tutor marked Ready to Tutor'],
    ['MatchLink', 'Parent message translated Spanish → English'],
    ['MatchLink', 'Tutor reply translated English → Spanish'],
    ['Handbook', 'Answer updated from a support question'],
    ['Claude', 'Weekly AI team summary sent']];
  const NUMS = [[200000, '200,000+', 'automations a month'], [90, '90%', 'of ops emails and messages sent automatically'], [20, '20', 'people on the team']];
  const fmt = (n, final) => final.endsWith('%') ? Math.round(n) + '%' : Math.round(n).toLocaleString('en-US') + (final.endsWith('+') ? '+' : '');
  const $ = (r, s) => r.querySelector(s);
  let tick = 0;
  function push(r, k) { const [tool, what] = FEED[k % FEED.length], ul = $(r, '[data-feed]'), li = document.createElement('li');
    li.innerHTML = `<span class="eg-tool">${tool}</span><span class="eg-what">${what}</span><span class="eg-ok">✓</span>`; ul.prepend(li);
    while (ul.children.length > 6) ul.lastElementChild.remove(); r.host.dataset.fed = (r.host.dataset.fed | 0) + 1; }
  function count(r) { const t0 = performance.now(), els = [...r.querySelectorAll('[data-counter]')];
    const step = now => { const k = Math.min(1, (now - t0) / 1600), e = 1 - Math.pow(1 - k, 3);
      els.forEach((el, i) => { el.textContent = k < 1 ? fmt(NUMS[i][0] * e, NUMS[i][1]) : NUMS[i][1]; });
      if (k < 1 && r.__playing) r.__raf = requestAnimationFrame(step); else els.forEach((el, i) => { el.textContent = NUMS[i][1]; }); };
    r.__raf = requestAnimationFrame(step); }
  (window.DEMOS = window.DEMOS || {}).engine = {
    size: [1440, 900],
    css: `:host{--ink:#f2f2f2}
      .eg{position:absolute;inset:0;overflow:hidden;background:#0b0d10;color:var(--ink);font-family:var(--mono,ui-monospace,monospace)}
      .eg-board{position:absolute;inset:-4% -2%;background:url(assets/flows.jpg) center top/cover no-repeat;opacity:.16;filter:grayscale(.2);animation:egPan 40s linear infinite alternate;animation-play-state:paused}
      .eg.on .eg-board{animation-play-state:running}
      @keyframes egPan{to{transform:translate(-3%,-6%) scale(1.06)}}
      .eg-shade{position:absolute;inset:0;background:linear-gradient(90deg,#0b0d10 0%,rgba(11,13,16,.86) 48%,rgba(11,13,16,.55) 100%)}
      .eg-nums{position:absolute;left:88px;top:108px;display:flex;flex-direction:column;gap:46px}
      .eg-n{font:400 128px/.86 var(--display,Impact,sans-serif);letter-spacing:.01em;color:#fff}
      .eg-n:first-child{color:#f5c518}
      .eg-l{margin-top:10px;font:italic 400 28px/1.1 var(--serif,Georgia,serif);color:rgba(255,255,255,.8)}
      .eg-feed{position:absolute;right:72px;top:96px;width:620px}
      .eg-h{font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:16px;display:flex;align-items:center;gap:10px}
      .eg-h i{width:9px;height:9px;border-radius:50%;background:#7cffc4;box-shadow:0 0 12px #7cffc4}
      [data-feed]{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
      [data-feed] li{display:grid;grid-template-columns:150px 1fr 24px;align-items:center;gap:14px;padding:18px 20px;border-radius:14px;
        background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);font-size:17px;animation:egIn .5s ease-out}
      @keyframes egIn{from{opacity:0;transform:translateY(-12px)}}
      .eg-tool{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#f5c518}
      .eg-what{color:#f2f2f2;line-height:1.3}.eg-ok{color:#7cffc4;text-align:right}
      @media (prefers-reduced-motion:reduce){.eg-board,[data-feed] li{animation:none}}`,
    html: `<div class="eg"><div class="eg-board"></div><div class="eg-shade"></div>
      <div class="eg-nums">${NUMS.map(n => `<div><div class="eg-n" data-counter>${n[1]}</div><div class="eg-l">${n[2]}</div></div>`).join('')}</div>
      <div class="eg-feed"><div class="eg-h"><i></i>Running now</div><ul data-feed></ul></div></div>`,
    chapters: [],
    steps: {},
    init(r) { for (let k = 3; k >= 0; k--) push(r, k); r.host.dataset.fed = 0; tick = 4; }, // a still feed to start from
    show() {},
    play(r) { r.__playing = true; $(r, '.eg').classList.add('on'); count(r); clearInterval(r.__feed);
      r.__feed = setInterval(() => push(r, tick++), 1200); },
    pause(r) { r.__playing = false; $(r, '.eg').classList.remove('on'); cancelAnimationFrame(r.__raf); clearInterval(r.__feed);
      r.querySelectorAll('[data-counter]').forEach((el, i) => { el.textContent = NUMS[i][1]; }); }
  };
})();
