(function(){
  var STYLE_ID='qrb-premium-hero-style';
  var HERO_CLASS='qrb-premium-hero';

  function isGuideIndustryPath(pathname){
    return /\/(qr-code-guides|qr-code-industries|qr-code-for-|qr-codes-for-|how-|what-is-a-qr-code|why-is-my-qr-code-not-scanning|static-vs-dynamic-qr-codes|best-|common-|are-|can-|track-qr-code-scans|short-links-for-qr-codes|utm-links-for-qr-codes)/.test(pathname);
  }

  function injectStyles(){
    if(document.getElementById(STYLE_ID)) return;
    var style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent='\
.'+HERO_CLASS+'{margin:16px 0 26px;border:1px solid #dbe6f5;border-radius:24px;padding:18px;background:linear-gradient(135deg,#eef4ff 0%,#ffffff 54%,#ecfbf7 100%);box-shadow:0 18px 34px rgba(15,23,42,.08)}\
.'+HERO_CLASS+'__grid{display:grid;grid-template-columns:1fr;gap:18px;align-items:center}\
.'+HERO_CLASS+'__eyebrow{display:inline-block;margin:0 0 8px;color:#2864ff;font-size:.74rem;font-weight:900;letter-spacing:.13em;text-transform:uppercase}\
.'+HERO_CLASS+' h1{margin:0 0 10px;font-size:clamp(1.8rem,6.2vw,3.2rem);line-height:1.03;letter-spacing:-.04em;color:#0b1220}\
.'+HERO_CLASS+' p{margin:0 0 16px;color:#425066;font-size:1rem;max-width:66ch}\
.'+HERO_CLASS+'__actions{display:flex;gap:10px;flex-wrap:wrap}\
.'+HERO_CLASS+'__cta{display:inline-flex;align-items:center;justify-content:center;padding:11px 15px;border-radius:12px;font-weight:850;text-decoration:none;border:1px solid transparent}\
.'+HERO_CLASS+'__cta--primary{background:#ff7a1a;color:#fff}\
.'+HERO_CLASS+'__cta--primary:hover{background:#e96d0e;text-decoration:none}\
.'+HERO_CLASS+'__cta--secondary{background:#fff;color:#0b1220;border-color:#d4dfef}\
.'+HERO_CLASS+'__cta--secondary:hover{border-color:#adc0dd;text-decoration:none}\
.'+HERO_CLASS+'__media{border:1px solid #dbe6f5;border-radius:18px;overflow:hidden;background:#fff}\
.'+HERO_CLASS+'__media img{display:block;width:100%;height:auto;aspect-ratio:12/8;object-fit:cover}\
@media (min-width:920px){.'+HERO_CLASS+'{padding:24px}. '+HERO_CLASS+'__grid{grid-template-columns:minmax(0,1.05fr) minmax(360px,.95fr);gap:26px}. '+HERO_CLASS+'__media img{min-height:300px}}';
    document.head.appendChild(style);
  }

  function getMain(){
    return document.querySelector('main.wrap') || document.querySelector('main.article-layout') || document.querySelector('main');
  }

  function getArticle(main){
    return main.querySelector('article.article') || main.querySelector('article') || null;
  }

  function firstSentence(text){
    var cleaned=(text||'').replace(/\s+/g,' ').trim();
    if(!cleaned) return '';
    var match=cleaned.match(/^(.{40,220}?[.!?])(\s|$)/);
    if(match) return match[1].trim();
    if(cleaned.length>220) return cleaned.slice(0,217).trim()+'...';
    return cleaned;
  }

  function pageLabel(pathname){
    if(pathname.indexOf('/qr-code-for-')!==-1 || pathname.indexOf('/qr-codes-for-')!==-1 || pathname.indexOf('/qr-code-industries')!==-1){
      return 'Industry Playbook';
    }
    return 'QR Code Guide';
  }

  function buildHero(){
    var pathname=window.location.pathname||'';
    if(!isGuideIndustryPath(pathname)) return;

    var main=getMain();
    if(!main || main.querySelector('.'+HERO_CLASS)) return;

    var article=getArticle(main);
    var titleNode=(article && article.querySelector('h1')) || main.querySelector('h1');
    if(!titleNode) return;

    var leadNode=(article && article.querySelector('p.lead')) || null;
    var introText='';
    if(leadNode){
      introText=firstSentence(leadNode.textContent);
    }else{
      var sourceP=(article && article.querySelector('p')) || main.querySelector('p');
      introText=firstSentence(sourceP?sourceP.textContent:'');
    }
    if(!introText){
      introText='Practical, scan-ready guidance to help you build better QR code experiences.';
    }

    var titleId=titleNode.id || 'qrb-premium-hero-title';
    titleNode.id=titleId;

    var hero=document.createElement('section');
    hero.className=HERO_CLASS;
    hero.setAttribute('aria-labelledby',titleId);

    var wrap=document.createElement('div');
    wrap.className=HERO_CLASS+'__grid';

    var content=document.createElement('div');
    var eyebrow=document.createElement('p');
    eyebrow.className=HERO_CLASS+'__eyebrow';
    eyebrow.textContent=pageLabel(pathname);

    var intro=document.createElement('p');
    intro.textContent=introText;

    var actions=document.createElement('div');
    actions.className=HERO_CLASS+'__actions';

    var primary=document.createElement('a');
    primary.className=HERO_CLASS+'__cta '+HERO_CLASS+'__cta--primary';
    primary.href='/free-qr-code-generator.html';
    primary.textContent='Generate Free QR Code';
    primary.setAttribute('aria-label','Generate Free QR Code');

    var secondary=document.createElement('a');
    secondary.className=HERO_CLASS+'__cta '+HERO_CLASS+'__cta--secondary';
    secondary.href='/qr-code-templates.html';
    secondary.textContent='Browse QR Templates';
    secondary.setAttribute('aria-label','Browse QR Templates');

    actions.appendChild(primary);
    actions.appendChild(secondary);

    if(leadNode){
      leadNode.parentNode.removeChild(leadNode);
    }
    titleNode.parentNode.removeChild(titleNode);

    content.appendChild(eyebrow);
    content.appendChild(titleNode);
    content.appendChild(intro);
    content.appendChild(actions);

    var media=document.createElement('div');
    media.className=HERO_CLASS+'__media';
    var img=document.createElement('img');
    img.src='/assets/hero-guide-qr.svg';
    img.alt='Stylized QR code illustration for QRCodeBarn guides';
    img.width=1200;
    img.height=820;
    img.decoding='async';
    img.loading='eager';
    media.appendChild(img);

    wrap.appendChild(content);
    wrap.appendChild(media);
    hero.appendChild(wrap);

    var breadcrumb=main.querySelector('.breadcrumbs, .breadcrumb');
    if(breadcrumb && breadcrumb.parentNode===main){
      breadcrumb.insertAdjacentElement('afterend',hero);
    }else{
      main.insertAdjacentElement('afterbegin',hero);
    }
  }

  function init(){
    injectStyles();
    buildHero();
  }

  window.QRBPremiumHero={init:init};

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  }else{
    init();
  }
})();
