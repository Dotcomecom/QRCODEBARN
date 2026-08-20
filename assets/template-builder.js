function tbReady(fn){document.readyState!='loading'?fn():document.addEventListener('DOMContentLoaded',fn)}
tbReady(()=>{
  const $=id=>document.getElementById(id);
  const form=$('templateForm'); if(!form) return;
  let logoData='';
  const templates={
    restaurant:{label:'MENU',size:'portrait',heading:'Scan for our menu',message:"View today's menu, allergen information and specials."},
    wifi:{label:'WIFI',size:'portrait',heading:'Scan to connect',message:'Join our guest WiFi quickly from your phone.'},
    review:{label:'REVIEW',size:'portrait',heading:'Enjoyed your visit?',message:'Scan to leave us a quick Google review.'},
    holiday:{label:'GUEST WIFI',size:'portrait',heading:'Welcome',message:'Scan for WiFi and guest information.'},
    business:{label:'CONTACT',size:'landscape',heading:'Scan to save my details',message:'Open my contact details, portfolio or booking link.'},
    event:{label:'CHECK-IN',size:'portrait',heading:'Event check-in',message:'Scan here for registration, tickets, agenda or venue information.'}
  };

  function fieldDisplay(){
    const type=$('tbType').value;
    document.querySelectorAll('[data-tb-fields]').forEach(el=>el.style.display=el.dataset.tbFields===type?'block':'none');
  }

  function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}

  function payload(){
    const type=$('tbType').value;
    if(type==='wifi') return `WIFI:T:${$('tbWifiSecurity').value};S:${$('tbWifiName').value};P:${$('tbWifiPass').value};;`;
    if(type==='email') return `mailto:${$('tbEmail').value}?subject=${encodeURIComponent($('tbEmailSubject').value)}`;
    if(type==='phone') return `tel:${$('tbPhone').value}`;
    if(type==='sms') return `SMSTO:${$('tbSmsPhone').value}:${$('tbSmsText').value}`;
    return $('tbUrl').value || 'https://www.qrcodebarn.com';
  }

  function makeQr(){
    const box=$('qrHidden'); box.innerHTML='';
    try{
      new QRCode(box,{text:payload(),width:420,height:420,colorDark:$('tbQrColor').value||'#111827',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.H});
    }catch(e){box.textContent='QR too long';}
  }

  function currentQrData(){
    const img=$('qrHidden').querySelector('img');
    const canvas=$('qrHidden').querySelector('canvas');
    if(canvas) return canvas.toDataURL('image/png');
    if(img) return img.src;
    return '';
  }

  function buildSvg(){
    const t=templates[$('tbTemplate').value]||templates.restaurant;
    const accent=$('tbAccent').value||'#ff6b1a';
    const qrd=currentQrData();
    const landscape=t.size==='landscape';
    const w=landscape?1120:800, h=landscape?700:1120;
    const qrSize=landscape?260:320;
    const qrX=landscape?780:(w-qrSize)/2;
    const qrY=landscape?222:470;
    const heading=esc($('tbHeading').value || t.heading);
    const msg=esc($('tbMessage').value || t.message);
    const biz=esc($('tbBusiness').value || 'QRCodeBarn');
    const logo = logoData ? `<image href="${logoData}" x="${landscape?70:80}" y="${landscape?70:70}" width="72" height="72" preserveAspectRatio="xMidYMid meet"/>` : '';
    const titleX=landscape?70:80;
    const titleY=landscape?205:235;
    const textWidth=landscape?560:620;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect x="34" y="34" width="${w-68}" height="${h-68}" rx="34" fill="#fff7ed"/>
      <rect x="${titleX}" y="${landscape?72:82}" width="150" height="44" rx="22" fill="${accent}"/>
      <text x="${titleX+75}" y="${landscape?101:111}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" fill="#111827">${esc(t.label)}</text>
      ${logo}
      <text x="${titleX}" y="${titleY}" font-family="Arial, Helvetica, sans-serif" font-size="${landscape?44:48}" font-weight="800" fill="#111827">${heading}</text>
      <foreignObject x="${titleX}" y="${titleY+35}" width="${textWidth}" height="140">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial, Helvetica, sans-serif;font-size:24px;line-height:1.35;color:#374151;word-wrap:break-word;overflow-wrap:anywhere;max-width:${textWidth}px;">${msg}</div>
      </foreignObject>
      <text x="${titleX}" y="${landscape?535:440}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#111827">${biz}</text>
      <rect x="${qrX-18}" y="${qrY-18}" width="${qrSize+36}" height="${qrSize+36}" rx="24" fill="#ffffff" stroke="#e5e7eb" stroke-width="4"/>
      ${qrd?`<image href="${qrd}" x="${qrX}" y="${qrY}" width="${qrSize}" height="${qrSize}" preserveAspectRatio="xMidYMid meet"/>`:''}
      <text x="${qrX+qrSize/2}" y="${qrY+qrSize+44}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="${accent}">Scan with your phone camera</text>
      <text x="${w/2}" y="${h-54}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#6b7280">Created with QRCodeBarn.com</text>
    </svg>`;
  }

  function render(){
    fieldDisplay();
    makeQr();
    setTimeout(()=>{
      const preview=$('templatePreview');
      preview.innerHTML=buildSvg();
    },120);
  }

  function download(filename, content, type){
    const blob=new Blob([content],{type});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url; a.download=filename; document.body.appendChild(a); a.click();
    setTimeout(()=>{URL.revokeObjectURL(url); a.remove();},500);
  }

  $('tbDownloadSvg').addEventListener('click',()=>download('qrcodebarn-template.svg',buildSvg(),'image/svg+xml'));

  const pdfBtn = $('tbDownloadPdf');
  if(pdfBtn){
    pdfBtn.addEventListener('click',()=>{
      const svg = buildSvg();
      const win = window.open('', '_blank');
      if(!win){ alert('Please allow pop-ups to print or save the PDF.'); return; }
      win.document.write(`<!doctype html><html><head><title>Print QR Template</title>
        <style>
          body{margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif}
          .bar{padding:14px 18px;background:#111827;color:white;display:flex;gap:12px;align-items:center;justify-content:space-between}
          .bar button{background:#ff6b1a;border:0;border-radius:999px;padding:10px 16px;font-weight:800;cursor:pointer}
          .page{display:flex;justify-content:center;padding:24px}
          svg{max-width:100%;height:auto;background:white}
          @media print{.bar{display:none}.page{padding:0}body{background:white}svg{width:100%;height:auto}}
        </style></head><body>
        <div class="bar"><strong>QRCodeBarn printable PDF</strong><button onclick="window.print()">Print / Save as PDF</button></div>
        <div class="page">${svg}</div>
        <script>setTimeout(()=>window.print(),500)</script>
      </body></html>`);
      win.document.close();
    });
  }

  $('tbDownloadPng').addEventListener('click',()=>{
    const svg=buildSvg();
    const blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const img=new Image();
    img.onload=()=>{
      const m=svg.match(/width="(\d+)".*height="(\d+)"/);
      const w=m?parseInt(m[1],10):800, h=m?parseInt(m[2],10):1120;
      const c=document.createElement('canvas'); c.width=w*2; c.height=h*2;
      const ctx=c.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,c.width,c.height); ctx.scale(2,2); ctx.drawImage(img,0,0);
      URL.revokeObjectURL(url);
      const a=document.createElement('a'); a.href=c.toDataURL('image/png'); a.download='qrcodebarn-finished-template.png'; document.body.appendChild(a); a.click(); a.remove();
    };
    img.src=url;
  });

  $('tbLogo').addEventListener('change',e=>{
    const file=e.target.files && e.target.files[0]; if(!file){logoData=''; render(); return;}
    const reader=new FileReader(); reader.onload=ev=>{logoData=ev.target.result; render();}; reader.readAsDataURL(file);
  });

  $('tbTemplate').addEventListener('change',()=>{
    const t=templates[$('tbTemplate').value]||templates.restaurant;
    $('tbHeading').value=t.heading; $('tbMessage').value=t.message; render();
  });

  form.addEventListener('input',render);
  form.addEventListener('change',render);
  render();
});