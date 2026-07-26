function hpReady(fn){document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);}
hpReady(function(){
  const $ = id => document.getElementById(id);
  if(!$('hpPreview')) return;

  function esc(s){
    return String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  }

  function wifiEsc(v){
    return String(v || '').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/:/g,'\\:').replace(/"/g,'\\"');
  }

  function wifiPayload(){
    const ssid = $('hpWifiSsid1') ? $('hpWifiSsid1').value : 'Guest WiFi';
    const pass = $('hpWifiPass1') ? $('hpWifiPass1').value : '';
    const sec = $('hpWifiSecurity1') ? $('hpWifiSecurity1').value : 'WPA';
    const hidden = $('hpWifiHidden1') && $('hpWifiHidden1').checked ? 'true' : 'false';
    if(sec === 'nopass') return `WIFI:T:nopass;S:${wifiEsc(ssid)};H:${hidden};;`;
    return `WIFI:T:${sec};S:${wifiEsc(ssid)};P:${wifiEsc(pass)};H:${hidden};;`;
  }

  function payload(i){
    const type = $('hpType' + i).value;
    if(type === 'wifi' && i === 1) return wifiPayload();
    const contentEl = $('hpContent' + i);
    const content = contentEl ? contentEl.value.trim() : '';
    if(type === 'phone') return 'tel:' + content;
    if(type === 'text') return content || 'Guest information';
    if(type === 'wifi') return `WIFI:T:WPA;S:${wifiEsc(content || 'Guest WiFi')};;`;
    return content || 'https://www.qrcodebarn.com';
  }

  function qrData(text){
    const holder = document.createElement('div');
    $('hpHidden').appendChild(holder);
    try{
      new QRCode(holder,{
        text:text || 'https://www.qrcodebarn.com',
        width:190,
        height:190,
        colorDark:$('hpQrColor').value || '#111827',
        colorLight:'#ffffff',
        correctLevel:QRCode.CorrectLevel.H
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

  function getItems(){
    const items = [];
    for(let i=1;i<=5;i++){
      items.push({
        title: ($('hpTitle'+i).value || 'QR Code').trim(),
        data: payload(i)
      });
    }
    return items;
  }

  function buildSvg(){
    $('hpHidden').innerHTML = '';
    const bg = $('hpBg').value || '#fff7ed';
    const accent = $('hpAccent').value || '#ff5a0a';
    const name = esc($('hpName').value || 'Your Holiday Cottage');
    const msg = esc($('hpMessage').value || 'Welcome. Scan the QR codes below for useful guest information during your stay.');

    const positions = [[80,355],[315,355],[550,355],[200,610],[440,610]];
    const cards = getItems().map((it,i)=>{
      const [x,y] = positions[i];
      const q = qrData(it.data);
      return `<g>
        <rect x="${x}" y="${y}" width="180" height="205" rx="12" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>
        <foreignObject x="${x+10}" y="${y+18}" width="160" height="38">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:900;text-align:center;line-height:1.15;color:#111827;word-break:break-word;">${esc(it.title)}</div>
        </foreignObject>
        <image href="${q}" x="${x+38}" y="${y+62}" width="104" height="104"/>
        <text x="${x+90}" y="${y+185}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="12" font-weight="900" fill="${accent}">Scan with phone</text>
      </g>`;
    }).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="820" height="980" viewBox="0 0 820 980">
      <rect width="820" height="980" rx="14" fill="${bg}"/>
      <rect x="70" y="58" width="142" height="32" rx="16" fill="${accent}"/>
      <text x="141" y="79" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="13" font-weight="900" fill="#111827">WELCOME PACK</text>
      <text x="70" y="155" font-family="Arial,Helvetica,sans-serif" font-size="42" font-weight="900" fill="#111827">${name}</text>
      <foreignObject x="70" y="178" width="660" height="90">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:1.35;color:#111827;">${msg}</div>
      </foreignObject>
      ${cards}
      <text x="410" y="900" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="14" fill="#53627a">Created with QRCodeBarn.com</text>
    </svg>`;
  }

  function render(){
    const join = $('hpWifiJoinName');
    if(join) join.textContent = ($('hpWifiSsid1') && $('hpWifiSsid1').value) || 'your WiFi network';
    $('hpPreview').innerHTML = buildSvg();
  }

  function download(filename, content, type){
    const blob = new Blob([content], {type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},500);
  }

  function downloadPng(){
    const svg = buildSvg();
    const blob = new Blob([svg], {type:'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = function(){
      const canvas = document.createElement('canvas');
      canvas.width = 1640;
      canvas.height = 1960;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.scale(2,2);
      ctx.drawImage(img,0,0);
      URL.revokeObjectURL(url);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'holiday-cottage-qr-welcome-pack.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    img.src = url;
  }

  function printPdf(){
    const svg = buildSvg();
    const win = window.open('', '_blank');
    if(!win){alert('Please allow pop-ups to print or save the PDF.');return;}
    win.document.write(`<!doctype html><html><head><title>Holiday Cottage QR Welcome Pack</title><style>body{margin:0;background:#f3f4f6}.bar{padding:14px 18px;background:#111827;color:white;font-family:Arial;display:flex;justify-content:space-between}.bar button{background:#ff5a0a;color:white;border:0;border-radius:999px;padding:10px 16px;font-weight:900}.page{display:flex;justify-content:center;padding:24px}svg{max-width:100%;height:auto;background:white;display:block}@media print{.bar{display:none}.page{padding:0}body{background:white}svg{width:100%;height:auto}}</style></head><body><div class="bar"><strong>QRCodeBarn printable PDF</strong><button onclick="window.print()">Print / Save as PDF</button></div><div class="page">${svg}</div><script>setTimeout(()=>window.print(),500)<\/script></body></html>`);
    win.document.close();
  }

  $('hpPng').addEventListener('click', downloadPng);
  $('hpSvg').addEventListener('click', ()=>download('holiday-cottage-qr-welcome-pack.svg', buildSvg(), 'image/svg+xml'));
  $('hpPdf').addEventListener('click', printPdf);
  $('hpReset').addEventListener('click', ()=>location.reload());

  document.querySelectorAll('#pack-builder input,#pack-builder textarea,#pack-builder select').forEach(el=>{
    el.addEventListener('input', render);
    el.addEventListener('change', render);
  });

  document.querySelectorAll('.hp5-swatches button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.hp5-swatches button').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      $('hpBg').value = btn.dataset.bg;
      render();
    });
  });

  render();
});
