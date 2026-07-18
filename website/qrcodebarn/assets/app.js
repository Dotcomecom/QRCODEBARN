
function ready(fn){document.readyState!='loading'?fn():document.addEventListener('DOMContentLoaded',fn)}

function ensureHeroSystemScript(){
  const existing=document.querySelector('script[src="/assets/hero-system.js"]');
  if(existing) return;
  const heroScript=document.createElement('script');
  heroScript.src='/assets/hero-system.js';
  heroScript.defer=true;
  document.head.appendChild(heroScript);
}

function ensureContentAuthorityPackScript(){
  const existing=document.querySelector('script[src="/assets/content-authority-pack.js"]');
  if(existing) return;
  const authorityScript=document.createElement('script');
  authorityScript.src='/assets/content-authority-pack.js';
  authorityScript.defer=true;
  document.head.appendChild(authorityScript);
}

function getInlineField(id){
  const node=document.getElementById(id);
  return node ? node.value.trim() : '';
}

function findQrNodes(){
  const roots=['#qrcode','#qrOut','#qrOutput'];
  let svg=null;
  let canvas=null;
  let image=null;

  roots.forEach((selector)=>{
    const root=document.querySelector(selector);
    if(!root) return;
    if(!svg) svg=root.querySelector('svg');
    if(!canvas) canvas=root.querySelector('canvas');
    if(!image) image=root.querySelector('img');
  });

  return {svg,canvas,image};
}

function findDownloadButton(key){
  const candidates={
    png:['download_png','downloadPng'],
    svg:['download_svg','downloadSvg'],
    pdf:['download_pdf','downloadPdf']
  };
  for(const id of candidates[key]){
    const node=document.getElementById(id);
    if(node) return node;
  }
  const onclickName=key==='png'?'downloadPNG':key==='svg'?'downloadSVG':'downloadPDF';
  return document.querySelector(`[onclick*="${onclickName}"]`);
}

function createDownloadButtonLike(base,key){
  const button=document.createElement(base && base.tagName==='A' ? 'a' : 'button');
  const names={png:'PNG',svg:'SVG',pdf:'PDF'};
  const ids={png:'download_png',svg:'download_svg',pdf:'download_pdf'};
  button.id=ids[key];
  button.textContent=`Download ${names[key]}`;
  button.style.display='none';
  button.className=base && base.className ? base.className : (key==='png'?'secondary':'light');
  if(button.tagName==='BUTTON') button.type='button';
  if(base && base.parentNode){
    base.parentNode.insertBefore(button,base.nextSibling);
  }
  return button;
}

function bindDownloadHandler(node,key){
  if(!node || node.dataset.downloadBound==='true') return;
  const fnName=key==='png'?'downloadPNG':key==='svg'?'downloadSVG':'downloadPDF';
  node.addEventListener('click',(event)=>{
    event.preventDefault();
    if(typeof window[fnName]==='function') window[fnName]();
  });
  node.dataset.downloadBound='true';
}

function ensureDownloadButtons(){
  const png=findDownloadButton('png');
  const svg=findDownloadButton('svg');
  const pdf=findDownloadButton('pdf');
  const base=png || svg;
  const ensured={
    png:png || (base ? createDownloadButtonLike(base,'png') : null),
    svg:svg || (base ? createDownloadButtonLike(base,'svg') : null),
    pdf:pdf || (base ? createDownloadButtonLike(base,'pdf') : null)
  };
  bindDownloadHandler(ensured.png,'png');
  bindDownloadHandler(ensured.svg,'svg');
  bindDownloadHandler(ensured.pdf,'pdf');
  return ensured;
}

function showDownloadButtons(){
  const buttons=ensureDownloadButtons();
  ['png','svg','pdf'].forEach((key)=>{
    if(buttons[key]) buttons[key].style.display='inline-flex';
  });
}

function triggerFileDownload(href,filename){
  const link=document.createElement('a');
  link.href=href;
  link.download=filename;
  link.click();
}

function getCanvasFromQr(){
  const {svg,canvas,image}=findQrNodes();
  if(canvas){
    return Promise.resolve(canvas);
  }
  if(svg){
    return new Promise((resolve,reject)=>{
      const xml=new XMLSerializer().serializeToString(svg);
      const encoded='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(xml)));
      const img=new Image();
      img.onload=()=>{
        const drawCanvas=document.createElement('canvas');
        drawCanvas.width=img.width*3;
        drawCanvas.height=img.height*3;
        const ctx=drawCanvas.getContext('2d');
        ctx.fillStyle='#fff';
        ctx.fillRect(0,0,drawCanvas.width,drawCanvas.height);
        ctx.drawImage(img,0,0,drawCanvas.width,drawCanvas.height);
        resolve(drawCanvas);
      };
      img.onerror=()=>reject(new Error('Could not render SVG as canvas'));
      img.src=encoded;
    });
  }
  if(image){
    return new Promise((resolve,reject)=>{
      const img=new Image();
      img.crossOrigin='anonymous';
      img.onload=()=>{
        const drawCanvas=document.createElement('canvas');
        drawCanvas.width=img.width*3;
        drawCanvas.height=img.height*3;
        const ctx=drawCanvas.getContext('2d');
        ctx.fillStyle='#fff';
        ctx.fillRect(0,0,drawCanvas.width,drawCanvas.height);
        ctx.drawImage(img,0,0,drawCanvas.width,drawCanvas.height);
        resolve(drawCanvas);
      };
      img.onerror=()=>reject(new Error('Could not render image as canvas'));
      img.src=image.src;
    });
  }
  return Promise.reject(new Error('No generated QR code found'));
}

let pdfLibraryPromise;
function ensurePdfLibrary(){
  if(window.jspdf && window.jspdf.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
  if(pdfLibraryPromise) return pdfLibraryPromise;
  pdfLibraryPromise=new Promise((resolve,reject)=>{
    const script=document.createElement('script');
    script.src='https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';
    script.onload=()=>{
      if(window.jspdf && window.jspdf.jsPDF) resolve(window.jspdf.jsPDF);
      else reject(new Error('PDF library loaded but was unavailable'));
    };
    script.onerror=()=>reject(new Error('PDF library could not be loaded'));
    document.head.appendChild(script);
  });
  return pdfLibraryPromise;
}

function escapeWifiValue(value){
  return String(value).replace(/([\\;,:"])/g,'\\$1');
}

let inlineQrcodeLibraryPromise;
function ensureInlineQrcodeLibrary(){
  if(window.qrcode) return Promise.resolve();
  if(inlineQrcodeLibraryPromise) return inlineQrcodeLibraryPromise;
  inlineQrcodeLibraryPromise=new Promise((resolve,reject)=>{
    const script=document.createElement('script');
    script.src='https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js';
    script.onload=()=>resolve();
    script.onerror=()=>reject(new Error('Inline QR library could not be loaded'));
    document.head.appendChild(script);
  });
  return inlineQrcodeLibraryPromise;
}

function buildInlinePayload(type){
  if(type==='wifi'){
    const ssid=getInlineField('wifi_ssid')||getInlineField('wifiName');
    const password=getInlineField('wifi_password')||getInlineField('wifiPass');
    const encryption=getInlineField('wifi_encryption')||getInlineField('wifiSecurity')||'WPA';
    return `WIFI:T:${encryption};S:${escapeWifiValue(ssid)};P:${escapeWifiValue(password)};;`;
  }
  if(type==='whatsapp'){
    const number=(getInlineField('wa_phone')||getInlineField('wa_phone_number')).replace(/[^\d]/g,'');
    const message=encodeURIComponent(getInlineField('wa_message')||'');
    return `https://wa.me/${number}${message ? `?text=${message}` : ''}`;
  }
  if(type==='email'){
    const recipient=getInlineField('email_to')||getInlineField('emailTo');
    const subject=encodeURIComponent(getInlineField('email_subject')||getInlineField('emailSubject'));
    const body=encodeURIComponent(getInlineField('email_body')||getInlineField('emailBody'));
    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  }
  if(type==='sms'){
    const phone=getInlineField('sms_phone')||getInlineField('smsPhone');
    const message=getInlineField('sms_message')||getInlineField('smsText');
    return `SMSTO:${phone}:${message}`;
  }
  if(type==='phone'){
    const phone=getInlineField('phone_number')||getInlineField('phoneNumber');
    return phone ? `tel:${phone}` : '';
  }
  return getInlineField('qr_text')||getInlineField('qrText');
}

async function renderInlineQrcode(type){
  const payload=buildInlinePayload(type);
  const box=document.getElementById('qrcode');
  const payloadField=document.getElementById('qr_payload');
  if(!box) return;
  if(!payload){
    alert('Enter something to generate a QR code.');
    return;
  }

  await ensureInlineQrcodeLibrary();
  box.innerHTML='';

  try{
    const qr=qrcode(0,'M');
    qr.addData(payload);
    qr.make();
    box.innerHTML=qr.createSvgTag({cellSize:6,margin:3});
    if(payloadField) payloadField.value=payload;
    showDownloadButtons();
  }catch(error){
    box.innerHTML='<p>That content is too long for this QR code. Try a shorter link or message.</p>';
  }
}

async function downloadInlineSvg(){
  const {svg,image}=findQrNodes();
  if(svg){
    const blob=new Blob([svg.outerHTML],{type:'image/svg+xml'});
    const url=URL.createObjectURL(blob);
    triggerFileDownload(url,'qrcodebarn-qr-code.svg');
    URL.revokeObjectURL(url);
    return;
  }
  if(image){
    window.open(image.src,'_blank');
    return;
  }
  alert('Generate a QR code first.');
}

async function downloadInlinePng(){
  try{
    const canvas=await getCanvasFromQr();
    triggerFileDownload(canvas.toDataURL('image/png'),'qrcodebarn-qr-code.png');
  }catch(error){
    alert('Generate a QR code first.');
  }
}

async function downloadInlinePdf(){
  try{
    const [canvas,JsPdf]=await Promise.all([getCanvasFromQr(),ensurePdfLibrary()]);
    const side=Math.max(canvas.width,canvas.height);
    const pdf=new JsPdf({orientation:'portrait',unit:'pt',format:[side,side]});
    pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,0,side,side);
    pdf.save('qrcodebarn-qr-code.pdf');
  }catch(error){
    alert('Generate a QR code first.');
  }
}

window.generateQR=renderInlineQrcode;
window.downloadSVG=downloadInlineSvg;
window.downloadPNG=downloadInlinePng;
window.downloadPDF=downloadInlinePdf;

const COMPONENT_FALLBACKS={
  hero:'<section class="rev2a-hero"><div class="wrap"><h1>Free QR Code Generator</h1><p>The generator section is temporarily unavailable. Please refresh the page.</p><p><a class="button rev2a-primary" href="/">Reload page</a></p></div></section>',
  'editorial-review':'<section class="rev2a-trust"><div class="wrap rev2a-trust-inner"><div><span>PUBLISHED BY THE AI BARN</span><h2>Free tools. Clear standards.</h2><p>Our trust and editorial links remain available below.</p></div><div><a href="/trust-centre.html">Trust Centre</a><a href="/editorial-policy.html">Editorial Policy</a><a href="mailto:hello@theaibarn.com">Contact the Editor</a></div></div></section>'
};

function sanitizeComponentHtml(html){
  const template=document.createElement('template');
  template.innerHTML=html;
  template.content.querySelectorAll('script').forEach(el=>el.remove());
  template.content.querySelectorAll('*').forEach(el=>{
    Array.from(el.attributes).forEach(attr=>{
      if(/^on/i.test(attr.name)){el.removeAttribute(attr.name);}
    });
  });
  return template.innerHTML.trim();
}

function loadComponent(node){
  const name=node.getAttribute('data-component');
  if(!name) return Promise.resolve();
  const file=node.getAttribute('data-component-file')||`${name}.html`;
  const url=`/components/${file}`;
  const controller=new AbortController();
  const timeoutId=setTimeout(()=>controller.abort(),3000);
  return fetch(url,{cache:'default',credentials:'same-origin',signal:controller.signal})
    .then(res=>{if(!res.ok) throw new Error(`Component ${name} could not be loaded`); return res.text();})
    .then(html=>{
      const safeHtml=sanitizeComponentHtml(html);
      if(safeHtml){node.outerHTML=safeHtml;}
    })
    .catch(err=>{
      console.warn(err.message);
      const fallback=COMPONENT_FALLBACKS[name];
      if(fallback){
        node.outerHTML=fallback;
        return;
      }
      node.setAttribute('data-component-error','true');
      if(!node.textContent.trim()){node.innerHTML='<p>This section is temporarily unavailable.</p>';}
    })
    .finally(()=>clearTimeout(timeoutId));
}

function loadComponents(){
  const nodes=Array.from(document.querySelectorAll('[data-component]'));
  if(!nodes.length) return Promise.resolve();
  return Promise.all(nodes.map(loadComponent));
}

ready(async()=>{
  ensureHeroSystemScript();
  ensureContentAuthorityPackScript();
  await loadComponents();
  ensureDownloadButtons();
  const form=document.getElementById('qrForm');
  if(form){
    const out=document.getElementById('qrOut')||document.getElementById('qrOutput')||document.getElementById('qrcode');
    function makePayload(){
      const type=(document.getElementById('qrType')||{}).value||'text';
      const v=id=>(document.getElementById(id)||{}).value||'';
      if(type==='wifi'){return `WIFI:T:${v('wifiSecurity')};S:${v('wifiName')};P:${v('wifiPass')};;`}
      if(type==='vcard'){return `BEGIN:VCARD\nVERSION:3.0\nFN:${v('personName')}\nORG:${v('orgName')}\nTEL:${v('phone')}\nEMAIL:${v('email')}\nURL:${v('website')}\nEND:VCARD`}
      if(type==='email'){return `mailto:${v('emailTo')}?subject=${encodeURIComponent(v('emailSubject'))}&body=${encodeURIComponent(v('emailBody'))}`}
      if(type==='sms'){return `SMSTO:${v('smsPhone')}:${v('smsText')}`}
      return v('qrText')||'https://www.qrcodebarn.com'}
    function fields(){
      const type=document.getElementById('qrType').value;
      document.querySelectorAll('[data-fields]').forEach(e=>e.style.display=e.dataset.fields===type?'block':'none');
    }
    function gen(){
      if(!out) return;
      fields();
      out.innerHTML='';
      let data=makePayload();
      try{
        new QRCode(out,{text:data,width:240,height:240,colorDark:document.getElementById('fg').value||'#111827',colorLight:document.getElementById('bg').value||'#ffffff',correctLevel:QRCode.CorrectLevel.H});
        setTimeout(()=>{
          showDownloadButtons();
        },250);
      }catch(e){out.textContent='Could not generate QR code. Please shorten the content and try again.'}
    }
    if(document.getElementById('qrType')){document.getElementById('qrType').addEventListener('change',gen)}
    form.addEventListener('input',gen);
    form.addEventListener('submit',e=>{e.preventDefault();gen()});
    gen();
    return;
  }

  if(document.getElementById('qr_text') || document.getElementById('qrText')){
    const auto=document.getElementById('auto_generate_type');
    if(auto && auto.value){
      renderInlineQrcode(auto.value);
    }
  }
});
