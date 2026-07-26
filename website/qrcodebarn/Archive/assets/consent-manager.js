(function(){
  var config=window.QRBConsent||{};
  var KEY=config.key||'qrbarn_consent_v1';
  var STYLE_ID='qrb-consent-style';
  var BANNER_ID='qrb-consent-banner';
  var MODAL_ID='qrb-consent-modal';
  var LINK_CLASS='qrb-cookie-settings-link';
  var LAST_FOCUS=null;

  function readState(){
    try{
      var raw=window.localStorage.getItem(KEY);
      if(!raw) return null;
      var parsed=JSON.parse(raw);
      if(typeof parsed!=='object'||parsed===null) return null;
      return {
        analytics: !!parsed.analytics,
        ads: !!parsed.ads,
        personalization: !!parsed.personalization,
        ts: parsed.ts||Date.now(),
        method: parsed.method||'stored'
      };
    }catch(e){
      return null;
    }
  }

  function writeState(state){
    try{
      window.localStorage.setItem(KEY,JSON.stringify(state));
    }catch(e){}
  }

  function updateConsent(state){
    var dl=window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){dl.push(arguments);};
    var flags=(config.toConsentFlags||function(v){
      return {
        ad_storage: v.ads?'granted':'denied',
        ad_user_data: v.ads?'granted':'denied',
        ad_personalization: v.ads?'granted':'denied',
        analytics_storage: v.analytics?'granted':'denied',
        personalization_storage: v.personalization?'granted':'denied',
        functionality_storage: 'granted',
        security_storage: 'granted'
      };
    })(state);
    window.gtag('consent','update',flags);
  }

  function ensureStyles(){
    if(document.getElementById(STYLE_ID)) return;
    var style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent='\
#'+BANNER_ID+'{position:fixed;left:0;right:0;bottom:0;z-index:2147483640;background:#111827;color:#f8fafc;border-top:1px solid rgba(255,255,255,.2);box-shadow:0 -8px 24px rgba(2,6,23,.35)}\
#'+BANNER_ID+' .qrb-wrap{max-width:1180px;margin:0 auto;padding:16px 20px;display:flex;gap:14px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap}\
#'+BANNER_ID+' p{margin:0;max-width:760px;font-size:.95rem;line-height:1.45;color:#e2e8f0}\
#'+BANNER_ID+' .qrb-actions{display:flex;gap:10px;flex-wrap:wrap}\
#'+BANNER_ID+' button{border:1px solid #334155;border-radius:12px;padding:10px 14px;font:inherit;font-weight:700;cursor:pointer}\
#'+BANNER_ID+' .qrb-accept{background:#f97316;color:#111827;border-color:#fb923c}\
#'+BANNER_ID+' .qrb-reject{background:#0f172a;color:#f8fafc}\
#'+BANNER_ID+' .qrb-manage{background:transparent;color:#e2e8f0}\
#'+MODAL_ID+'[hidden]{display:none!important}\
#'+MODAL_ID+'{position:fixed;inset:0;z-index:2147483641;background:rgba(2,6,23,.65);display:flex;align-items:center;justify-content:center;padding:16px}\
#'+MODAL_ID+' .qrb-dialog{width:min(620px,100%);background:#fff;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 24px 80px rgba(15,23,42,.3);color:#111827}\
#'+MODAL_ID+' .qrb-head{padding:18px 20px;border-bottom:1px solid #e5e7eb}\
#'+MODAL_ID+' .qrb-head h2{margin:0;font-size:1.2rem}\
#'+MODAL_ID+' .qrb-body{padding:16px 20px;display:grid;gap:14px}\
#'+MODAL_ID+' .qrb-row{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;border:1px solid #e5e7eb;border-radius:12px;padding:12px}\
#'+MODAL_ID+' .qrb-row strong{display:block}\
#'+MODAL_ID+' .qrb-row p{margin:4px 0 0;font-size:.92rem;color:#475569}\
#'+MODAL_ID+' .qrb-foot{padding:14px 20px;border-top:1px solid #e5e7eb;display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}\
#'+MODAL_ID+' .qrb-foot button{border:1px solid #cbd5e1;border-radius:10px;padding:10px 14px;font:inherit;font-weight:700;cursor:pointer}\
#'+MODAL_ID+' .qrb-save{background:#111827;color:#fff;border-color:#111827}\
#'+MODAL_ID+' .qrb-allowall{background:#f97316;color:#111827;border-color:#f97316}\
.'+LINK_CLASS+'{font-weight:700}\
@media(max-width:720px){#'+BANNER_ID+' .qrb-wrap{padding:14px}#'+BANNER_ID+' p{font-size:.9rem}#'+MODAL_ID+' .qrb-row{display:grid;grid-template-columns:1fr auto}}';
    document.head.appendChild(style);
  }

  function createBanner(){
    if(document.getElementById(BANNER_ID)) return;
    var banner=document.createElement('section');
    banner.id=BANNER_ID;
    banner.setAttribute('role','region');
    banner.setAttribute('aria-label','Cookie consent banner');
    banner.innerHTML='\
      <div class="qrb-wrap">\
        <p>We use essential cookies to keep QRCodeBarn working. With your consent, we also use analytics and advertising cookies to improve services and support advertising.</p>\
        <div class="qrb-actions">\
          <button type="button" class="qrb-reject" data-action="reject">Reject non-essential</button>\
          <button type="button" class="qrb-manage" data-action="manage">Cookie preferences</button>\
          <button type="button" class="qrb-accept" data-action="accept">Accept all</button>\
        </div>\
      </div>';
    document.body.appendChild(banner);

    banner.addEventListener('click',function(e){
      var action=e.target&&e.target.getAttribute('data-action');
      if(!action) return;
      if(action==='reject'){
        saveAndApply({analytics:false,ads:false,personalization:false,method:'reject'});
      }else if(action==='accept'){
        saveAndApply({analytics:true,ads:true,personalization:true,method:'accept'});
      }else if(action==='manage'){
        openModal();
      }
    });
  }

  function createModal(){
    if(document.getElementById(MODAL_ID)) return;
    var modal=document.createElement('div');
    modal.id=MODAL_ID;
    modal.hidden=true;
    modal.innerHTML='\
      <div class="qrb-dialog" role="dialog" aria-modal="true" aria-labelledby="qrb-consent-title">\
        <div class="qrb-head">\
          <h2 id="qrb-consent-title">Cookie preferences</h2>\
        </div>\
        <div class="qrb-body">\
          <div class="qrb-row">\
            <div><strong>Essential cookies</strong><p>Required for security and core site features.</p></div>\
            <div><input type="checkbox" checked disabled aria-label="Essential cookies always on"></div>\
          </div>\
          <div class="qrb-row">\
            <div><strong>Analytics cookies</strong><p>Help us understand traffic and improve content.</p></div>\
            <div><input id="qrb-consent-analytics" type="checkbox"></div>\
          </div>\
          <div class="qrb-row">\
            <div><strong>Advertising cookies</strong><p>Used by Google AdSense to measure ad performance and personalization.</p></div>\
            <div><input id="qrb-consent-ads" type="checkbox"></div>\
          </div>\
          <div class="qrb-row">\
            <div><strong>Personalization cookies</strong><p>Store preferences to improve your experience.</p></div>\
            <div><input id="qrb-consent-personalization" type="checkbox"></div>\
          </div>\
        </div>\
        <div class="qrb-foot">\
          <button type="button" data-action="close">Cancel</button>\
          <button type="button" class="qrb-allowall" data-action="allowall">Allow all</button>\
          <button type="button" class="qrb-save" data-action="save">Save choices</button>\
        </div>\
      </div>';
    document.body.appendChild(modal);

    modal.addEventListener('click',function(e){
      if(e.target===modal){closeModal();return;}
      var action=e.target&&e.target.getAttribute('data-action');
      if(!action) return;
      if(action==='close') closeModal();
      if(action==='allowall') saveAndApply({analytics:true,ads:true,personalization:true,method:'allowall'});
      if(action==='save'){
        saveAndApply({
          analytics: !!document.getElementById('qrb-consent-analytics').checked,
          ads: !!document.getElementById('qrb-consent-ads').checked,
          personalization: !!document.getElementById('qrb-consent-personalization').checked,
          method:'custom'
        });
      }
    });

    document.addEventListener('keydown',function(e){
      if(modal.hidden) return;
      if(e.key==='Escape'){e.preventDefault();closeModal();}
      if(e.key==='Tab'){trapFocus(e,modal.querySelector('.qrb-dialog'));}
    });
  }

  function trapFocus(e,dialog){
    var nodes=dialog.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
    if(!nodes.length) return;
    var first=nodes[0];
    var last=nodes[nodes.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }

  function openModal(){
    var state=readState()||{analytics:false,ads:false,personalization:false};
    createModal();
    var modal=document.getElementById(MODAL_ID);
    LAST_FOCUS=document.activeElement;
    modal.hidden=false;
    document.body.style.overflow='hidden';
    document.getElementById('qrb-consent-analytics').checked=!!state.analytics;
    document.getElementById('qrb-consent-ads').checked=!!state.ads;
    document.getElementById('qrb-consent-personalization').checked=!!state.personalization;
    var firstInteractive=modal.querySelector('button[data-action="close"]');
    if(firstInteractive) firstInteractive.focus();
  }

  function closeModal(){
    var modal=document.getElementById(MODAL_ID);
    if(!modal) return;
    modal.hidden=true;
    document.body.style.overflow='';
    if(LAST_FOCUS&&typeof LAST_FOCUS.focus==='function'){LAST_FOCUS.focus();}
  }

  function removeBanner(){
    var banner=document.getElementById(BANNER_ID);
    if(banner&&banner.parentNode) banner.parentNode.removeChild(banner);
  }

  function saveAndApply(state){
    var stored={
      analytics: !!state.analytics,
      ads: !!state.ads,
      personalization: !!state.personalization,
      method: state.method||'custom',
      ts: Date.now()
    };
    writeState(stored);
    updateConsent(stored);
    removeBanner();
    closeModal();
  }

  function injectFooterLink(){
    var footers=document.querySelectorAll('footer');
    if(!footers.length) return;
    footers.forEach(function(footer){
      if(footer.querySelector('.'+LINK_CLASS)) return;
      var target=footer.querySelector('.publisher')||footer.querySelector('p')||footer;
      var span=document.createElement('span');
      span.textContent=' '; 
      var link=document.createElement('a');
      link.href='#';
      link.className=LINK_CLASS;
      link.textContent='Cookie Settings';
      link.setAttribute('aria-label','Open cookie settings');
      link.addEventListener('click',function(e){
        e.preventDefault();
        openModal();
      });
      target.appendChild(span);
      target.appendChild(link);
    });
  }

  function init(){
    ensureStyles();
    injectFooterLink();
    createModal();
    if(!readState()) createBanner();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  }else{
    init();
  }
})();
