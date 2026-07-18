
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
  const form=document.getElementById('qrForm');
  if(!form)return;
  const out=document.getElementById('qrOut')||document.getElementById('qrOutput')||document.getElementById('qrcode');
  const dl=document.getElementById('downloadPng')||document.getElementById('download_png');
  const sv=document.getElementById('downloadSvg')||document.getElementById('download_svg');
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
        const img=out.querySelector('img')||out.querySelector('canvas');
        if(img&&dl){let url=img.tagName==='CANVAS'?img.toDataURL('image/png'):img.src;dl.href=url;dl.download='qrcodebarn-qr.png';}
        if(img&&sv){let url=img.tagName==='CANVAS'?img.toDataURL('image/svg+xml'):img.src;sv.href=url;sv.download='qrcodebarn-qr.svg';}
      },250);
    }catch(e){out.textContent='Could not generate QR code. Please shorten the content and try again.'}
  }
  if(document.getElementById('qrType')){document.getElementById('qrType').addEventListener('change',gen);} 
  form.addEventListener('input',gen);
  form.addEventListener('submit',e=>{e.preventDefault();gen()});
  gen();
});
