function hpReady(fn){document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);}
hpReady(function(){
  const $ = id => document.getElementById(id);
  if(!$('hpPreview')) return;

  let logoData = '';
  let draggedRow = null;

  function esc(s){return String(s || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
  function wifiEsc(v){return String(v || '').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/:/g,'\\:').replace(/"/g,'\\"');}

  function wifiPayload(){
    const ssid = $('hpWifiSsid1') ? $('hpWifiSsid1').value : 'Guest WiFi';
    const pass = $('hpWifiPass1') ? $('hpWifiPass1').value : '';
    const sec = $('hpWifiSecurity1') ? $('hpWifiSecurity1').value : 'WPA';
    const hidden = $('hpWifiHidden1') && $('hpWifiHidden1').checked ? 'true' : 'false';
    if(sec === 'nopass') return `WIFI:T:nopass;S:${wifiEsc(ssid)};H:${hidden};;`;
    return `WIFI:T:${sec};S:${wifiEsc(ssid)};P:${wifiEsc(pass)};H:${hidden};;`;
  }

  function payload(row){
    const i = row.dataset.row;
    const type = $('hpType' + i).value;
    if(type === 'wifi' && i === '1') return wifiPayload();
    const contentEl = $('hpContent' + i);
    const content = contentEl ? contentEl.value.trim() : '';
    if(type === 'phone') return 'tel:' + content;
    if(type === 'text') return content || 'Guest information';
    return content || 'https://www.qrcodebarn.com';
  }

  function qrData(text, size){
    const holder = document.createElement('div');
    $('hpHidden').appendChild(holder);
    try{
      new QRCode(holder,{text:text || 'https://www.qrcodebarn.com',width:size,height:size,colorDark:$('hpQrColor').value || '#111827',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.H});
      const canvas = holder.querySelector('canvas');
      const img = holder.querySelector('img');
      const data = canvas ? canvas.toDataURL('image/png') : (img ? img.src : '');
      holder.remove();
      return data;
    }catch(e){holder.remove();return '';}
  }

  function visibleRows(){
    return Array.from(document.querySelectorAll('.hp6-row')).filter(row => {
      const i = row.dataset.row;
      const show = $('hpShow' + i);
      return show && show.checked;
    });
  }

  function cardLayout(count){
    if(count <= 3) return {size:150, w:220, h:270, positions:[[110,380],[300,380],[490,380]]};
    if(count === 4) return {size:132, w:200, h:250, positions:[[125,360],[435,360],[125,620],[435,620]]};
    return {size:112, w:180, h:230, positions:[[80,355],[315,355],[550,355],[200,610],[440,610]]};
  }

  function buildSvg(){
    $('hpHidden').innerHTML = '';
    const bg = $('hpBg').value || '#fff7ed';
    const accent = $('hpAccent').value || '#ff5a0a';
    const name = esc($('hpName').value || 'Your Holiday Cottage');
    const msg = esc($('hpMessage').value || 'Welcome. Scan the QR codes below for useful guest information during your stay.');
    const rows = visibleRows();
    const layout = cardLayout(rows.length || 1);
    const logo = logoData ? `<image href="${logoData}" x="650" y="45" width="95" height="95" preserveAspectRatio="xMidYMid meet"/>` : '';

    const cards = rows.map((row,i)=>{
      const rid = row.dataset.row;
      const [x,y] = layout.positions[i] || layout.positions[layout.positions.length-1];
      const title = esc(($('hpTitle'+rid).value || 'QR Code').trim());
      const q = qrData(payload(row), layout.size + 60);
      const imgX = x + (layout.w - layout.size) / 2;
      const titleBoxH = 48;
      const qrY = y + 62;
      const captionY = qrY + layout.size + 22;
      return `<g>
        <rect x="${x}" y="${y}" width="${layout.w}" height="${layout.h}" rx="12" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>
        <foreignObject x="${x+10}" y="${y+12}" width="${layout.w-20}" height="${titleBoxH}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:900;text-align:center;line-height:1.15;color:#111827;word-break:break-word;overflow-wrap:anywhere;display:flex;align-items:center;justify-content:center;height:${titleBoxH}px;">${title}</div>
        </foreignObject>
        <image href="${q}" x="${imgX}" y="${qrY}" width="${layout.size}" height="${layout.size}" preserveAspectRatio="xMidYMid meet"/>
        <text x="${x+layout.w/2}" y="${captionY}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="13" font-weight="900" fill="${accent}">Scan with phone</text>
      </g>`;
    }).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="820" height="980" viewBox="0 0 820 980">
      <rect width="820" height="980" rx="14" fill="${bg}"/>
      <rect x="70" y="58" width="142" height="32" rx="16" fill="${accent}"/>
      <text x="141" y="79" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="13" font-weight="900" fill="#111827">WELCOME PACK</text>
      ${logo}
      <text x="70" y="155" font-family="Arial,Helvetica,sans-serif" font-size="42" font-weight="900" fill="#111827">${name}</text>
      <foreignObject x="70" y="178" width="660" height="110">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:1.35;color:#111827;">${msg}</div>
      </foreignObject>
      ${cards}
      <text x="410" y="910" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="14" fill="#53627a">Created with QRCodeBarn.com</text>
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
    const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},500);
  }

  function downloadPng(){
    const svg = buildSvg();
    const blob = new Blob([svg], {type:'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = function(){
      const canvas = document.createElement('canvas');
      canvas.width = 1640; canvas.height = 1960;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.scale(2,2); ctx.drawImage(img,0,0);
      URL.revokeObjectURL(url);
      const a = document.createElement('a'); a.href = canvas.toDataURL('image/png'); a.download = 'holiday-cottage-qr-welcome-pack.png'; document.body.appendChild(a); a.click(); a.remove();
    };
    img.src = url;
  }

  function realPdf(){
    const svg = buildSvg();
    const blob = new Blob([svg], {type:'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = function(){
      const canvas = document.createElement('canvas');
      canvas.width = 1640; canvas.height = 1960;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.scale(2,2); ctx.drawImage(img,0,0);
      URL.revokeObjectURL(url);
      const jpeg = canvas.toDataURL('image/jpeg', 0.95);
      const { jsPDF } = window.jspdf || {};
      if(!jsPDF){ downloadPng(); alert('PDF library did not load. PNG downloaded instead.'); return; }
      const pdf = new jsPDF({orientation:'portrait', unit:'mm', format:'a4'});
      pdf.addImage(jpeg, 'JPEG', 0, 0, 210, 251);
      pdf.save('holiday-cottage-qr-welcome-pack.pdf');
    };
    img.src = url;
  }

  function saveTemplate(){
    const data = {
      name:$('hpName').value, message:$('hpMessage').value, bg:$('hpBg').value, accent:$('hpAccent').value, qr:$('hpQrColor').value, logo:logoData,
      wifi:{ssid:$('hpWifiSsid1').value, pass:$('hpWifiPass1').value, sec:$('hpWifiSecurity1').value, hidden:$('hpWifiHidden1').checked},
      rows:Array.from(document.querySelectorAll('.hp6-row')).map(row=>{
        const i=row.dataset.row;
        return {id:i, show:$('hpShow'+i).checked, title:$('hpTitle'+i).value, type:$('hpType'+i).value, content:$('hpContent'+i)?$('hpContent'+i).value:''};
      })
    };
    localStorage.setItem('qrcodebarnHolidayPackTemplate', JSON.stringify(data));
    alert('Template saved in this browser.');
  }

  function loadTemplate(){
    const raw = localStorage.getItem('qrcodebarnHolidayPackTemplate');
    if(!raw){ alert('No saved template found in this browser.'); return; }
    const data = JSON.parse(raw);
    $('hpName').value=data.name||''; $('hpMessage').value=data.message||''; $('hpBg').value=data.bg||'#fff7ed'; $('hpAccent').value=data.accent||'#ff5a0a'; $('hpQrColor').value=data.qr||'#111827'; logoData=data.logo||'';
    if(data.wifi){$('hpWifiSsid1').value=data.wifi.ssid||''; $('hpWifiPass1').value=data.wifi.pass||''; $('hpWifiSecurity1').value=data.wifi.sec||'WPA'; $('hpWifiHidden1').checked=!!data.wifi.hidden;}
    (data.rows||[]).forEach(r=>{ if($('hpShow'+r.id)) $('hpShow'+r.id).checked=!!r.show; if($('hpTitle'+r.id)) $('hpTitle'+r.id).value=r.title||''; if($('hpType'+r.id)) $('hpType'+r.id).value=r.type||'url'; if($('hpContent'+r.id)) $('hpContent'+r.id).value=r.content||''; });
    render();
  }

  $('hpLogoUpload').addEventListener('change', function(){
    const file = this.files && this.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = e => { logoData = e.target.result; render(); };
    reader.readAsDataURL(file);
  });

  $('hpSaveTemplate').addEventListener('click', saveTemplate);
  $('hpLoadTemplate').addEventListener('click', loadTemplate);
  $('hpClearTemplate').addEventListener('click', ()=>{localStorage.removeItem('qrcodebarnHolidayPackTemplate'); alert('Saved template cleared.');});
  $('hpPng').addEventListener('click', downloadPng);
  $('hpSvg').addEventListener('click', ()=>download('holiday-cottage-qr-welcome-pack.svg', buildSvg(), 'image/svg+xml'));
  $('hpPdf').addEventListener('click', realPdf);
  $('hpReset').addEventListener('click', ()=>location.reload());

  document.querySelectorAll('#pack-builder input,#pack-builder textarea,#pack-builder select').forEach(el=>{el.addEventListener('input',render);el.addEventListener('change',render);});

  document.querySelectorAll('.hp6-row').forEach(row=>{
    row.addEventListener('dragstart',()=>{draggedRow=row;row.classList.add('dragging');});
    row.addEventListener('dragend',()=>{row.classList.remove('dragging');draggedRow=null;renumberRows();render();});
    row.addEventListener('dragover',e=>{
      e.preventDefault();
      const target = e.currentTarget;
      if(draggedRow && draggedRow !== target){
        const box = target.getBoundingClientRect();
        const before = e.clientY < box.top + box.height/2;
        target.parentNode.insertBefore(draggedRow, before ? target : target.nextSibling);
      }
    });
  });

  function renumberRows(){
    Array.from(document.querySelectorAll('.hp6-row')).forEach((row,idx)=>{
      const n = row.querySelector('.hp6-num');
      if(n) n.textContent = idx+1;
    });
  }

  render();
});
