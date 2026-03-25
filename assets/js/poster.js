/* ============================================================
   CCM 2027 — poster.js
   Browser-based personalised poster generator
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('poster-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = 1080;
  canvas.height = 1350;

  const nameInput    = document.getElementById('poster-name');
  const wardInput    = document.getElementById('poster-ward');
  const lgaSelect    = document.getElementById('poster-lga');
  const messageInput = document.getElementById('poster-message');
  const generateBtn  = document.getElementById('poster-generate');
  const downloadBtn  = document.getElementById('poster-download');
  const shareWaBtn   = document.getElementById('poster-share-wa');
  const preview      = document.getElementById('poster-preview');

  // Live preview updates
  [nameInput, wardInput, lgaSelect, messageInput].forEach(el => {
    if (el) el.addEventListener('input', drawPoster);
  });

  if (generateBtn) generateBtn.addEventListener('click', drawPoster);
  if (downloadBtn) downloadBtn.addEventListener('click', downloadPoster);
  if (shareWaBtn)  shareWaBtn.addEventListener('click', shareViaWhatsApp);

  // Initial render
  drawPoster();

  function drawPoster() {
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── BACKGROUND ──
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#0f1a12');
    bgGrad.addColorStop(0.5, '#1a5c2a');
    bgGrad.addColorStop(1, '#0f1a12');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Grid pattern
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 60) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 60) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Radial accent
    const radial = ctx.createRadialGradient(W * 0.7, H * 0.35, 0, W * 0.7, H * 0.35, 500);
    radial.addColorStop(0, 'rgba(200,146,42,0.18)');
    radial.addColorStop(1, 'rgba(200,146,42,0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, W, H);

    // ── TOP BAND ──
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, W, 90);

    // CCM wordmark
    ctx.fillStyle = '#e8b44a';
    ctx.font = 'bold 52px Georgia, serif';
    ctx.textAlign = 'left';
    ctx.fillText('CCM', 60, 62);

    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '18px monospace';
    ctx.fillText('2027', 60 + 96, 65);

    // Right: office label
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '16px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('SENATE · OKIGWE ZONE', W - 60, 56);
    ctx.fillText('IMO STATE, NIGERIA', W - 60, 76);

    // ── PORTRAIT AREA ──
    // Decorative circle
    ctx.beginPath();
    ctx.arc(W / 2, 420, 280, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(200,146,42,0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(W / 2, 420, 260, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(200,146,42,0.08)';
    ctx.lineWidth = 40;
    ctx.stroke();

    // Portrait placeholder (green circle with initials)
    ctx.beginPath();
    ctx.arc(W / 2, 420, 230, 0, Math.PI * 2);
    const portraitGrad = ctx.createRadialGradient(W / 2, 350, 0, W / 2, 420, 230);
    portraitGrad.addColorStop(0, '#3d9e52');
    portraitGrad.addColorStop(1, '#1a5c2a');
    ctx.fillStyle = portraitGrad;
    ctx.fill();

    // Initials
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = 'bold 120px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('CC', W / 2, 470);

    // ── GOLD DIVIDER ──
    const divX = 100, divY = 700, divW = W - 200;
    ctx.strokeStyle = 'rgba(200,146,42,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(divX, divY);
    ctx.lineTo(divX + divW, divY);
    ctx.stroke();

    // Gold dot centre
    ctx.beginPath();
    ctx.arc(W / 2, divY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#c8922a';
    ctx.fill();

    // ── CANDIDATE NAME ──
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '20px monospace';
    ctx.fillText('CHIEF ENGR', W / 2, 755);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px Georgia, serif';
    ctx.fillText('CHINEDU', W / 2, 830);

    ctx.fillStyle = '#e8b44a';
    ctx.font = 'italic bold 72px Georgia, serif';
    ctx.fillText('CHUKWUONYE', W / 2, 908);

    // ── TAGLINE ──
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.font = '20px Georgia, serif';
    ctx.fillText('From Neglect to Development — It\'s Okigwe\'s Time', W / 2, 960);

    // ── SUPPORTER SECTION ──
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    roundRect(ctx, 60, 990, W - 120, 220, 16);
    ctx.fill();

    ctx.strokeStyle = 'rgba(200,146,42,0.25)';
    ctx.lineWidth = 1;
    roundRect(ctx, 60, 990, W - 120, 220, 16);
    ctx.stroke();

    const supporterName = nameInput?.value?.trim() || 'YOUR NAME HERE';
    const wardName = wardInput?.value?.trim() || '';
    const lgaName = lgaSelect?.value || '';
    const message = messageInput?.value?.trim() || 'I Stand With Okigwe';

    ctx.fillStyle = 'rgba(200,146,42,0.8)';
    ctx.font = '13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('I SUPPORT THIS MOVEMENT', W / 2, 1030);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Georgia, serif';
    ctx.fillText(supporterName.toUpperCase(), W / 2, 1090);

    if (wardName || lgaName) {
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.font = '20px monospace';
      const location = [wardName, lgaName].filter(Boolean).join(' · ');
      ctx.fillText(location.toUpperCase(), W / 2, 1128);
    }

    ctx.fillStyle = '#e8b44a';
    ctx.font = 'italic 22px Georgia, serif';
    ctx.fillText(`"${message}"`, W / 2, 1175);

    // ── BOTTOM BAND ──
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(0, H - 70, W, 70);

    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('#CCM2027  ·  #Okigwe2027  ·  #OkigweDeservesMore', W / 2, H - 30);

    // Update preview
    if (preview) {
      preview.src = canvas.toDataURL('image/jpeg', 0.92);
    }

    // Enable download
    if (downloadBtn) downloadBtn.disabled = false;
    if (shareWaBtn) shareWaBtn.disabled = false;
  }

  function downloadPoster() {
    drawPoster();
    const link = document.createElement('a');
    const name = nameInput?.value?.trim().replace(/\s+/g, '_') || 'supporter';
    link.download = `CCM2027_Poster_${name}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.92);
    link.click();
  }

  function shareViaWhatsApp() {
    const name = nameInput?.value?.trim() || 'a supporter';
    const ward = wardInput?.value?.trim();
    const lga  = lgaSelect?.value;
    const loc  = [ward, lga].filter(Boolean).join(', ');

    const msg = encodeURIComponent(
      `🇳🇬 I SUPPORT CHIEF ENGR CHINEDU CHUKWUONYE FOR SENATE, OKIGWE ZONE 2027!\n\n` +
      `${name}${loc ? ` — ${loc}` : ''}\n\n` +
      `"From Neglect to Development — It's Okigwe's Time"\n\n` +
      `Join the movement 👇\n${window.location.origin}\n\n` +
      `#CCM2027 #Okigwe2027 #OkigweDeservesMore`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  }

  // Helper: rounded rect
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
});
