
function ready(fn){document.readyState!='loading'?fn():document.addEventListener('DOMContentLoaded',fn)}
ready(()=>{const form=document.getElementById('qrForm');if(!form)return;const out=document.getElementById('qrOut');const dl=document.getElementById('downloadPng');const sv=document.getElementById('downloadSvg');function makePayload(){const type=(document.getElementById('qrType')||{}).value||'text';const v=id=>(document.getElementById(id)||{}).value||'';if(type==='wifi'){return `WIFI:T:${v('wifiSecurity')};S:${v('wifiName')};P:${v('wifiPass')};;`} if(type==='vcard'){return `BEGIN:VCARD
VERSION:3.0
FN:${v('personName')}
ORG:${v('orgName')}
TEL:${v('phone')}
EMAIL:${v('email')}
URL:${v('website')}
END:VCARD`} if(type==='email'){return `mailto:${v('emailTo')}?subject=${encodeURIComponent(v('emailSubject'))}&body=${encodeURIComponent(v('emailBody'))}`} if(type==='sms'){return `SMSTO:${v('smsPhone')}:${v('smsText')}`} return v('qrText')||'https://www.qrcodebarn.com'}function fields(){const type=document.getElementById('qrType').value;document.querySelectorAll('[data-fields]').forEach(e=>e.style.display=e.dataset.fields===type?'block':'none')}function gen(){fields();out.innerHTML='';let data=makePayload();try{new QRCode(out,{text:data,width:240,height:240,colorDark:document.getElementById('fg').value||'#111827',colorLight:document.getElementById('bg').value||'#ffffff',correctLevel:QRCode.CorrectLevel.H});setTimeout(()=>{const img=out.querySelector('img')||out.querySelector('canvas'); if(img&&dl){let url=img.tagName==='CANVAS'?img.toDataURL('image/png'):img.src;dl.href=url;dl.download='qrcodebarn-qr.png';}},250)}catch(e){out.textContent='Could not generate QR code. Please shorten the content and try again.'}}document.getElementById('qrType').addEventListener('change',gen);form.addEventListener('input',gen);form.addEventListener('submit',e=>{e.preventDefault();gen()});gen();});
