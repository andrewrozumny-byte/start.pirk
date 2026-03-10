const fs = require('fs');

const ageScreen = `
<!-- ════════════════════════════════
     SAGE — AGE BRACKET
════════════════════════════════ -->
<div class="screen" id="sage">
  <div class="eyebrow">About you</div>
  <div class="qtitle">What&apos;s your age bracket?</div>
  <div class="qsub">This helps us match surgeons with experience across different age groups and skin types — it shapes the approach as much as the procedure itself.</div>
  <div class="opt-list">
    <div class="opt" onclick="go(6)"><div class="opt-body"><div class="opt-title">18 – 24</div></div><div class="opt-arrow">›</div></div>
    <div class="opt" onclick="go(6)"><div class="opt-body"><div class="opt-title">25 – 34</div></div><div class="opt-arrow">›</div></div>
    <div class="opt" onclick="go(6)"><div class="opt-body"><div class="opt-title">35 – 44</div></div><div class="opt-arrow">›</div></div>
    <div class="opt" onclick="go(6)"><div class="opt-body"><div class="opt-title">45 – 54</div></div><div class="opt-arrow">›</div></div>
    <div class="opt" onclick="go(6)"><div class="opt-body"><div class="opt-title">55+</div></div><div class="opt-arrow">›</div></div>
    <div class="opt" onclick="go(6)"><div class="opt-body"><div class="opt-title">Prefer not to say</div></div><div class="opt-arrow">›</div></div>
  </div>
  <div class="nav"><button class="btn-back" onclick="go(5)">← Back</button><div></div></div>
</div>`;

function patch(file) {
  let c = fs.readFileSync(file, 'utf8');

  // 1. Insert age screen after the s5 closing div (before s6 comment)
  c = c.replace(
    /<!-- ════════════════════════════════\n     S6 — CONSULTED/,
    ageScreen + '\n\n<!-- ════════════════════════════════\n     S6 — CONSULTED'
  );

  // 2. s5 Continue button: go(6) → go('age')
  c = c.replace(
    `<button class="btn-go" id="b5" onclick="go(6)">Continue →</button>`,
    `<button class="btn-go" id="b5" onclick="go('age')">Continue →</button>`
  );

  // 3. s6 Back button: go(5) → go('age')
  c = c.replace(
    `<button class="btn-back" onclick="go(5)">← Back</button><button class="btn-go" id="b6"`,
    `<button class="btn-back" onclick="go('age')">← Back</button><button class="btn-go" id="b6"`
  );

  // 4. Add 'age' to the step label map in JS (so progress bar labels it)
  c = c.replace(
    `16:'Your matches',17:'Almost there',18:'Your results',`,
    `16:'Your matches',17:'Almost there',18:'Your results',age:'About you',`
  );

  return c;
}

const files = [
  'C:/Users/walke/pirk-app/index.html',
  'C:/Users/walke/pirk-app/index-b.html',
];

for (const f of files) {
  const patched = patch(f);
  fs.writeFileSync(f, patched, 'utf8');
  const hasAge = patched.includes('id="sage"');
  const hasRoute = patched.includes("go('age')");
  console.log(`${f.split('/').pop()} — age screen: ${hasAge}, routes updated: ${hasRoute}`);
}
