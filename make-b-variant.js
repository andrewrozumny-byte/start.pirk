const fs = require('fs');
let content = fs.readFileSync('C:/Users/walke/pirk-app/index.html', 'utf8');

// ── NEW s18 screen: 2-card layout (Matching hero + Discovery Call) ──
const newS18 = `<div class="screen" id="s18">

  <!-- Hero heading -->
  <div style="text-align:center;margin-bottom:20px;">
    <div class="eyebrow" style="text-align:center;">Your results are ready</div>
    <div style="font-size:22px;font-weight:700;color:var(--plum);line-height:1.2;margin-bottom:8px;">We&apos;ve found your matches.<br>How would you like to proceed?</div>
    <div style="font-size:13px;color:var(--grey);line-height:1.55;">Both options give you access to your Pirk advisor &mdash; choose the one that feels right for you right now.</div>
  </div>

  <!-- Blurred surgeon preview strip -->
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:22px;">
    <div style="background:var(--white);border:1.5px solid var(--border);border-radius:10px;padding:12px 8px;text-align:center;position:relative;">
      <div style="position:absolute;top:8px;right:8px;background:var(--coral);color:#fff;font-size:8px;font-weight:700;border-radius:20px;padding:2px 6px;">94%</div>
      <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#c9a89a,#a07060);margin:0 auto 8px;"></div>
      <div style="font-size:11px;font-weight:700;color:var(--plum);margin-bottom:2px;">Dr. XXXXX</div>
      <div style="display:flex;gap:2px;justify-content:center;margin-bottom:5px;"><div class="star" style="width:8px;height:8px;"></div><div class="star" style="width:8px;height:8px;"></div><div class="star" style="width:8px;height:8px;"></div><div class="star" style="width:8px;height:8px;"></div><div class="star" style="width:8px;height:8px;"></div></div>
      <div style="font-size:8px;font-weight:700;color:var(--coral);text-transform:uppercase;letter-spacing:.7px;margin-bottom:8px;">#1 Top Match</div>
      <div style="height:6px;background:var(--border);border-radius:3px;margin-bottom:4px;filter:blur(3px);"></div>
      <div style="height:6px;background:var(--border);border-radius:3px;width:65%;margin:0 auto;filter:blur(3px);"></div>
    </div>
    <div style="background:var(--white);border:1.5px solid var(--border);border-radius:10px;padding:12px 8px;text-align:center;position:relative;opacity:.8;">
      <div style="position:absolute;top:8px;right:8px;background:var(--plum);color:#fff;font-size:8px;font-weight:700;border-radius:20px;padding:2px 6px;">89%</div>
      <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#9a9a8a,#6a6a5a);margin:0 auto 8px;"></div>
      <div style="font-size:11px;font-weight:700;color:var(--plum);margin-bottom:2px;">Dr. XXXXX</div>
      <div style="display:flex;gap:2px;justify-content:center;margin-bottom:5px;"><div class="star" style="width:8px;height:8px;"></div><div class="star" style="width:8px;height:8px;"></div><div class="star" style="width:8px;height:8px;"></div><div class="star" style="width:8px;height:8px;"></div><div class="star" style="width:8px;height:8px;"></div></div>
      <div style="font-size:8px;font-weight:700;color:var(--grey);text-transform:uppercase;letter-spacing:.7px;margin-bottom:8px;">#2 Strong Match</div>
      <div style="height:6px;background:var(--border);border-radius:3px;margin-bottom:4px;filter:blur(3px);"></div>
      <div style="height:6px;background:var(--border);border-radius:3px;width:65%;margin:0 auto;filter:blur(3px);"></div>
    </div>
    <div style="background:var(--white);border:1.5px solid var(--border);border-radius:10px;padding:12px 8px;text-align:center;position:relative;opacity:.6;">
      <div style="position:absolute;top:8px;right:8px;background:#a0a090;color:#fff;font-size:8px;font-weight:700;border-radius:20px;padding:2px 6px;">83%</div>
      <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#b0a898,#8a7a6a);margin:0 auto 8px;"></div>
      <div style="font-size:11px;font-weight:700;color:var(--plum);margin-bottom:2px;">Dr. XXXXX</div>
      <div style="display:flex;gap:2px;justify-content:center;margin-bottom:5px;"><div class="star" style="width:8px;height:8px;"></div><div class="star" style="width:8px;height:8px;"></div><div class="star" style="width:8px;height:8px;"></div><div class="star" style="width:8px;height:8px;"></div><div class="star" style="width:8px;height:8px;"></div></div>
      <div style="font-size:8px;font-weight:700;color:var(--grey);text-transform:uppercase;letter-spacing:.7px;margin-bottom:8px;">#3 Great Match</div>
      <div style="height:6px;background:var(--border);border-radius:3px;margin-bottom:4px;filter:blur(3px);"></div>
      <div style="height:6px;background:var(--border);border-radius:3px;width:65%;margin:0 auto;filter:blur(3px);"></div>
    </div>
  </div>

  <!-- TWO-CARD LAYOUT -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;align-items:start;">

    <!-- CARD 1: The Matching — HERO -->
    <div style="background:var(--plum);border:2px solid var(--plum);border-radius:14px;padding:18px 14px;display:flex;flex-direction:column;position:relative;box-shadow:0 8px 28px rgba(77,1,33,.18);">
      <div style="position:absolute;top:-1px;left:50%;transform:translateX(-50%);background:var(--coral);color:#fff;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:3px 10px;border-radius:0 0 7px 7px;white-space:nowrap;">Recommended</div>
      <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,.4);margin-bottom:5px;margin-top:10px;">Best value</div>
      <div style="font-size:16px;font-weight:700;color:#fff;margin-bottom:10px;line-height:1.2;">Match me to<br>my surgeons</div>
      <div style="margin-bottom:1px;display:flex;align-items:baseline;gap:3px;">
        <span style="font-size:28px;font-weight:700;color:var(--coral);">$0.82</span><span style="font-size:11px;color:rgba(255,255,255,.5);">/day</span>
      </div>
      <div style="font-size:10px;color:rgba(255,255,255,.45);margin-bottom:2px;">$149 total &middot; 6 months support</div>
      <div style="font-size:9px;color:var(--coral);font-weight:600;margin-bottom:14px;">or 4 &times; $49</div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px;flex:1;">
        <div style="font-size:10px;color:rgba(255,255,255,.9);display:flex;gap:5px;line-height:1.4;"><span style="color:var(--coral);flex-shrink:0;">&#10003;</span>Top 3 matched surgeons</div>
        <div style="font-size:10px;color:rgba(255,255,255,.9);display:flex;gap:5px;line-height:1.4;"><span style="color:var(--coral);flex-shrink:0;">&#10003;</span>Full profiles &amp; B&amp;A access</div>
        <div style="font-size:10px;color:rgba(255,255,255,.9);display:flex;gap:5px;line-height:1.4;"><span style="color:var(--coral);flex-shrink:0;">&#10003;</span>Advisor call included</div>
        <div style="font-size:10px;color:rgba(255,255,255,.9);display:flex;gap:5px;line-height:1.4;"><span style="color:var(--coral);flex-shrink:0;">&#10003;</span>6 months of support</div>
        <div style="font-size:10px;color:rgba(255,255,255,.9);display:flex;gap:5px;line-height:1.4;"><span style="color:var(--coral);flex-shrink:0;">&#10003;</span>Full refund if no match</div>
      </div>
      <button onclick="goPayment('matching')" style="width:100%;padding:12px;background:var(--coral);border:none;border-radius:30px;font-size:11px;font-weight:700;color:#fff;cursor:pointer;font-family:'Outfit',sans-serif;box-shadow:0 4px 14px rgba(242,112,92,.35);transition:opacity .15s;" onmouseover="this.style.opacity='.88'" onmouseout="this.style.opacity='1'">Match me to my surgeons &rarr;</button>
    </div>

    <!-- CARD 2: Discovery Call $49 -->
    <div style="background:var(--white);border:1.5px solid var(--border);border-radius:14px;padding:16px 14px;display:flex;flex-direction:column;">
      <div style="font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--grey);margin-bottom:5px;">Not ready yet?</div>
      <div style="font-size:16px;font-weight:700;color:var(--plum);margin-bottom:10px;line-height:1.2;">Book a Discovery Call</div>
      <div style="margin-bottom:1px;display:flex;align-items:baseline;gap:3px;">
        <span style="font-size:28px;font-weight:700;color:var(--plum);">$49</span>
      </div>
      <div style="font-size:10px;color:var(--grey);margin-bottom:2px;">one-time &middot; 30 min call</div>
      <div style="font-size:9px;color:var(--coral);font-weight:600;margin-bottom:14px;">credited if you upgrade</div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px;flex:1;">
        <div style="font-size:10px;color:var(--near-black);display:flex;gap:5px;line-height:1.4;"><span style="color:var(--coral);flex-shrink:0;">&#10003;</span>30 min with a Pirk expert</div>
        <div style="font-size:10px;color:var(--near-black);display:flex;gap:5px;line-height:1.4;"><span style="color:var(--coral);flex-shrink:0;">&#10003;</span>Your matches revealed on call</div>
        <div style="font-size:10px;color:var(--near-black);display:flex;gap:5px;line-height:1.4;"><span style="color:var(--coral);flex-shrink:0;">&#10003;</span>All questions answered</div>
        <div style="font-size:10px;color:var(--near-black);display:flex;gap:5px;line-height:1.4;"><span style="color:var(--coral);flex-shrink:0;">&#10003;</span>$49 credited toward matching</div>
      </div>
      <button onclick="goPayment('discovery')" style="width:100%;padding:11px;background:var(--white);border:1.5px solid var(--plum);border-radius:30px;font-size:11px;font-weight:600;color:var(--plum);cursor:pointer;font-family:'Outfit',sans-serif;transition:all .15s;" onmouseover="this.style.background='var(--plum)';this.style.color='#fff'" onmouseout="this.style.background='var(--white)';this.style.color='var(--plum)'">Book my discovery call &rarr;</button>
    </div>

  </div>

  <!-- Trust bar -->
  <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:6px;margin-bottom:8px;">
    <div style="font-size:10px;color:var(--grey);display:flex;align-items:center;gap:3px;"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#66645E" stroke-width="1.2"/><path d="M4 6l1.5 1.5 2.5-3" stroke="#66645E" stroke-width="1.2"/></svg>Full refund if no match</div>
    <div style="font-size:10px;color:var(--grey);display:flex;align-items:center;gap:3px;"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><rect x="2" y="4" width="8" height="7" rx="1.5" stroke="#66645E" stroke-width="1.2"/><path d="M4 4V3a2 2 0 1 1 4 0v1" stroke="#66645E" stroke-width="1.2"/></svg>Secure payment</div>
    <div style="font-size:10px;color:var(--grey);display:flex;align-items:center;gap:3px;"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#66645E" stroke-width="1.2"/><path d="M4 6l1.5 1.5 2.5-3" stroke="#66645E" stroke-width="1.2"/></svg>No lock-in</div>
  </div>
  <div style="font-size:10px;color:var(--grey);text-align:center;line-height:1.6;margin-bottom:4px;">FRACS Verified &middot; Mystery Shopped &middot; Patient Reviewed &middot; Independently matched</div>
</div>`;

// ── Discovery Call payment screen ──
const discoveryScreen = `
<!-- ════════════════════════════════
     S18D — PAYMENT: DISCOVERY CALL ($49)
════════════════════════════════ -->
<div class="screen" id="s18d">
  <div class="eyebrow">Discovery Call</div>
  <div class="qtitle" style="margin-bottom:6px;">Book your 30-minute call.</div>
  <div class="qsub">Pay securely below &mdash; you&apos;ll book your call with Chloe immediately after checkout. Your $49 is credited toward the full matching if you upgrade.</div>

  <div style="background:var(--white);border:2px solid var(--coral);border-radius:14px;padding:20px;margin-bottom:22px;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      <div>
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--coral);margin-bottom:4px;">Discovery Call</div>
        <div style="font-size:28px;font-weight:700;color:var(--plum);">$49 <span style="font-size:13px;font-weight:400;color:var(--grey);">one-time</span></div>
        <div style="font-size:11px;color:var(--grey);margin-top:4px;line-height:1.5;">30 min with Chloe &middot; Credited toward matching</div>
      </div>
      <div style="width:20px;height:20px;border-radius:50%;border:2px solid var(--coral);background:var(--coral);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="#fff" stroke-width="1.5"/></svg></div>
    </div>
    <div style="margin-top:14px;display:flex;flex-direction:column;gap:5px;">
      <div style="font-size:10px;color:var(--near-black);display:flex;gap:5px;"><span style="color:var(--coral);">&#10003;</span> Your top surgeon matches revealed on the call</div>
      <div style="font-size:10px;color:var(--near-black);display:flex;gap:5px;"><span style="color:var(--coral);">&#10003;</span> All your questions answered in real time</div>
      <div style="font-size:10px;color:var(--near-black);display:flex;gap:5px;"><span style="color:var(--coral);">&#10003;</span> No pressure &mdash; no obligation to continue</div>
    </div>
  </div>

  <button onclick="go(22)" style="width:100%;padding:14px;background:var(--coral);border:none;border-radius:30px;font-size:14px;font-weight:700;color:#fff;cursor:pointer;font-family:'Outfit',sans-serif;box-shadow:0 4px 16px rgba(242,112,92,.3);">Proceed to Secure Checkout &rarr;</button>
  <div style="display:flex;gap:14px;justify-content:center;margin-top:12px;flex-wrap:wrap;">
    <div style="font-size:10px;color:var(--grey);display:flex;align-items:center;gap:3px;"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><rect x="2" y="4" width="8" height="7" rx="1.5" stroke="#66645E" stroke-width="1.2"/><path d="M4 4V3a2 2 0 1 1 4 0v1" stroke="#66645E" stroke-width="1.2"/></svg>Secure checkout</div>
    <div style="font-size:10px;color:var(--grey);display:flex;align-items:center;gap:3px;"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#66645E" stroke-width="1.2"/><path d="M4 6l1.5 1.5 2.5-3" stroke="#66645E" stroke-width="1.2"/></svg>Credited if you upgrade</div>
    <div style="font-size:10px;color:var(--grey);display:flex;align-items:center;gap:3px;"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#66645E" stroke-width="1.2"/><path d="M4 6l1.5 1.5 2.5-3" stroke="#66645E" stroke-width="1.2"/></svg>No lock-in</div>
  </div>
  <div class="nav" style="margin-top:14px;"><button class="btn-back" onclick="go(18)">&#8592; Back</button></div>
</div>`;

// Replace the s18 screen
content = content.replace(
  /<div class="screen" id="s18">[\s\S]*?(?=<!-- ════════════════════════════════\n     S19)/,
  newS18 + '\n\n'
);

// Insert discovery screen before s19
content = content.replace(
  '<!-- ════════════════════════════════\n     S19 — PAYMENT: THE MATCHING ($149)',
  discoveryScreen + '\n\n<!-- ════════════════════════════════\n     S19 — PAYMENT: THE MATCHING ($149)'
);

// Update JS pkgMap to include discovery
content = content.replace(
  "const pkgMap = {matching:19, support:20, custom:21};",
  "const pkgMap = {matching:19, support:20, custom:21, discovery:'18d'};"
);

// Update labelMap
content = content.replace(
  "const labelMap = {matching:'The Matching — $149', support:'Full Support — $599', custom:'Custom Deposit — $99'};",
  "const labelMap = {matching:'The Matching — $149', support:'Full Support — $599', custom:'Custom Deposit — $99', discovery:'Discovery Call — $49'};"
);

// Update pay-pkg-amount display
content = content.replace(
  "if(amt) amt.textContent = pkg==='matching'?'$149':pkg==='support'?'$599':'$99';",
  "if(amt) amt.textContent = pkg==='matching'?'$149':pkg==='support'?'$599':pkg==='discovery'?'$49':'$99';"
);

fs.writeFileSync('C:/Users/walke/pirk-app/index-b.html', content, 'utf8');

const has18d = content.includes('id="s18d"');
const hasDiscovery = content.includes("discovery:'18d'");
console.log('Done. Lines:', content.split('\n').length);
console.log('s18d screen present:', has18d);
console.log('discovery in pkgMap:', hasDiscovery);
