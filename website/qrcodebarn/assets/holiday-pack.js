function hpReady(fn){document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);}
hpReady(function(){
  const $ = id => document.getElementById(id);
  if(!$('hpPreview')) return;

  function esc(s){
    return String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  }

  function escapeWifi(v){
    return String(v || '').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/:/g,'\\:').replace(/"/g,'\\"');
  }

  function wifiPayloadFromFields(i){
    const ssidEl = $('hpWifiSsid' + i);
    const passEl = $('hpWifiPass' + i);
    const secEl = $('hpWifiSecurity' + i);
    const hiddenEl = $('hpWifiHidden' + i);
    const ssid = escapeWifi(ssidEl ? ssidEl.value : 'Guest WiFi');
    const pass = escapeWifi(passEl ? passEl.value : '');
    const sec = secEl ? secEl.value : 'WPA';
    const hidden = hiddenEl && hiddenEl.checked ? 'true' : 'false';

    if(sec === 'nopass'){
      return `WIFI:T:nopass;S:${ssid};H:${hidden};;`;
    }
    return `WIFI:T:${sec};S:${ssid};P:${pass};H:${hidden};;`;
  }

  function parseWifi(content){
    const lines = String(content || '').split(/\n+/);
    let ssid = '';
    let pass = '';
    lines.forEach(line => {
      const lower = line.toLowerCase();
      if(lower.includes('network') || lower.includes('ssid')) ssid = line.split(':').slice(1).join(':').trim();
      if(lower.includes('password') || lower.includes('pass')) pass = line.split(':').slice(1).join(':').trim();
    });
    if(!ssid) ssid = lines[0] || 'Guest WiFi';
    return `WIFI:T:WPA;S:${escapeWifi(ssid)};P:${escapeWifi(pass)};H:false;;`;
  }

  function payload(i, type, content){
    content = String(content || '').trim();
    if(type === 'wifi'){
      if($('hpWifiSsid' + i)) return wifiPayloadFromFields(i);
      return parseWifi(content);
    }
    if(type === 'phone') return 'tel:' + content;
    if(type === 'text') return content || 'Guest information';
    return content || 'https://www.qrcodebarn.com';
  }

  function qrData(text){
    const holder = document.createElement('div');
    $('hpHidden').appendChild(holder);
    try{
      new QRCode(holder, {
        text: text || 'https://www.qrcodebarn.com',
        width: 180,
        height: 180,
        colorDark: $('hpQrColor').value || '#111827',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
      const canvas = holder.querySelector('canvas');
      const img = holder.querySelector('img');
      const data = canvas ? canvas.toDataURL('image/png') : (img ? img.src : '');
      holder.remove();
      return data;
    }catch(e){
      holder.remove();
      return '';
    }
  }

  function makeContentInput(i, type, value){
    if(type === 'wifi'){
      const wrap = document.createElement('div');
      wrap.className = 'hp-wifi-fields';
      wrap.setAttribute('data-wifi-fields', i);
      let ssid = 'Guest WiFi', pass = '';
      if(value){
        const lines = String(value).split(/\n+/);
        lines.forEach(line => {
          const lower = line.toLowerCase();
          if(lower.includes('network') || lower.includes('ssid')) ssid = line.split(':').slice(1).join(':').trim() || ssid;
          if(lower.includes('password') || lower.includes('pass')) pass = line.split(':').slice(1).join(':').trim();
        });
      }
      wrap.innerHTML = `
        <input id="hpWifiSsid${i}" value="${esc(ssid)}" placeholder="Network name / SSID" aria-label="WiFi network name ${i}">
        <input id="hpWifiPass${i}" value="${esc(pass)}" placeholder="WiFi password" aria-label="WiFi password ${i}">
        <select id="hpWifiSecurity${i}" aria-label="WiFi security ${i}">
          <option value="WPA">WPA/WPA2/WPA3</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Open / no password</option>
        </select>
        <label class="hp-check"><input id="hpWifiHidden${i}" type="checkbox"> Hidden network</label>`;
      wrap.querySelectorAll('input,select').forEach(el => {
        el.addEventListener('input', render);
        el.addEventListener('change', render);
      });
      return wrap;
    }

    const el = document.createElement(type === 'text' ? 'textarea' : 'input');
    el.id = 'hpContent' + i;
    el.value = value || (type === 'phone' ? '+441234567890' : type === 'text' ? 'Guest information' : 'https://example.com');
    el.setAttribute('aria-label', 'QR content ' + i);
    el.addEventListener('input', render);
    el.addEventListener('change', render);
    return el;
  }

  function normaliseInputForType(i){
    const row = document.querySelector(`[data-row="${i}"]`);
    const type = $('hpType'+i).value;
    if(!row) return;

    const existingWifi = row.querySelector('[data-wifi-fields]');
    const existingContent = $('hpContent' + i);
    const currentIsWifi = !!existingWifi;
    const shouldBeWifi = type === 'wifi';

    if(currentIsWifi === shouldBeWifi){
      return;
    }

    let value = '';
    if(existingWifi){
      const ssid = $('hpWifiSsid'+i)?.value || '';
      const pass = $('hpWifiPass'+i)?.value || '';
      value = `Network: ${ssid}\nPassword: ${pass}`;
      existingWifi.replaceWith(makeContentInput(i, type, value));
    }else if(existingContent){
      value = existingContent.value;
      existingContent.replaceWith(makeContentInput(i, type, value));
    }
  }

  function collectItems(){
    const output = [];
    for(let i=1;i<=5;i++){
      normaliseInputForType(i);
      const title = ($('hpTitle'+i).value || 'QR Code').trim();
      const type = $('hpType'+i).value;
      const contentEl = $('hpContent'+i);
      const content = contentEl ? contentEl.value : '';
      output.push({ title, type, data: payload(i, type, content) });
    }
    return output;
  }

  function buildSvg(){
    $('hpHidden').innerHTML = '';
    const accent = $('hpAccent').value || '#ff6b1a';
    const bg = $('hpBg').value || '#fff7ed';
    const name = esc($('hpName').value || 'Your Holiday Cottage');
    const msg = esc($('hpMessage').value || 'Welcome. Scan the QR codes below for useful guest information during your stay.');
    const positions = [[70,430],[305,430],[540,430],[190,705],[450,705]];
    const cards = collectItems().map((it, i) => {
      const x = positions[i][0];
      const y = positions[i][1];
      const q = qrData(it.data);
      return `<g>
        <rect x="${x}" y="${y}" width="190" height="225" rx="18" fill="#ffffff" stroke="#e5e7eb" stroke-width="3"/>
        <foreignObject x="${x+12}" y="${y+18}" width="166" height="45">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:900;color:#111827;text-align:center;line-height:1.15;word-break:break-word;">${esc(it.title)}</div>
        </foreignObject>
        <image href="${q}" x="${x+35}" y="${y+70}" width="120" height="120"/>
        <text x="${x+95}" y="${y+207}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="14" font-weight="800" fill="${accent}">Scan with phone</text>
      </g>`;
    }).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1120" viewBox="0 0 800 1120">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect x="34" y="34" width="732" height="1052" rx="34" fill="${bg}"/>
      <rect x="70" y="76" width="190" height="44" rx="22" fill="${accent}"/>
      <text x="165" y="105" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="17" font-weight="900" fill="#111827">WELCOME PACK</text>
      <text x="70" y="195" font-family="Arial,Helvetica,sans-serif" font-size="48" font-weight="900" fill="#111827">${name}</text>
      <foreignObject x="70" y="225" width="660" height="130">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.35;color:#374151;">${msg}</div>
      </foreignObject>
      ${cards}
      <text x="400" y="1040" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="17" fill="#6b7280">Created with QRCodeBarn.com</text>
    </svg>`;
  }

  function render(){
    const joinName = $('hpWifiJoinName');
    const ssid = $('hpWifiSsid1') ? $('hpWifiSsid1').value : '';
    if(joinName) joinName.textContent = ssid || 'your WiFi network';
    $('hpPreview').innerHTML = buildSvg();
  }

  function download(filename, content, type){
    const blob = new Blob([content], {type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 500);
  }

  function downloadPng(){
    const svg = buildSvg();
    const blob = new Blob([svg], {type:'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = function(){
      const c = document.createElement('canvas');
      c.width = 1600; c.height = 2240;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
      ctx.scale(2, 2); ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const a = document.createElement('a');
      a.href = c.toDataURL('image/png');
      a.download = 'holiday-cottage-qr-welcome-pack.png';
      document.body.appendChild(a); a.click(); a.remove();
    };
    img.src = url;
  }

  function printPdf(){
    const svg = buildSvg();
    const win = window.open('', '_blank');
    if(!win){ alert('Please allow pop-ups to print or save the PDF.'); return; }
    win.document.write(`<!doctype html><html><head><title>Holiday Cottage QR Welcome Pack</title><style>body{margin:0;background:#f3f4f6}.bar{padding:14px 18px;background:#111827;color:white;font-family:Arial;display:flex;justify-content:space-between}.bar button{background:#ff6b1a;border:0;border-radius:999px;padding:10px 16px;font-weight:800}.page{display:flex;justify-content:center;padding:24px}svg{max-width:100%;height:auto;background:white}@media print{.bar{display:none}.page{padding:0}body{background:white}svg{width:100%;height:auto}}</style></head><body><div class="bar"><strong>QRCodeBarn printable PDF</strong><button onclick="window.print()">Print / Save as PDF</button></div><div class="page">${svg}</div><script>setTimeout(()=>window.print(),500)<\/script></body></html>`);
    win.document.close();
  }

  $('hpSvg').addEventListener('click', () => download('holiday-cottage-qr-welcome-pack.svg', buildSvg(), 'image/svg+xml'));
  $('hpPng').addEventListener('click', downloadPng);
  $('hpPdf').addEventListener('click', printPdf);
  $('hpReset').addEventListener('click', () => location.reload());

  document.querySelectorAll('#pack-builder input,#pack-builder textarea,#pack-builder select').forEach(el => {
    el.addEventListener('input', render);
    el.addEventListener('change', render);
  });

  render();
});
