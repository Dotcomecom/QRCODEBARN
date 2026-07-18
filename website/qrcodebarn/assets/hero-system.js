(function(){
  var STYLE_ID='qrb-industry-hero-style';
  var HERO_CLASS='qrb-industry-hero';

  var HERO_COPY={
    restaurants:{label:'Restaurants QR Playbook',summary:'Keep menus, reservations, reviews, WiFi, takeaway ordering, and table service in one scan-friendly flow.',uses:['Digital menus','Reservations','Reviews','WiFi','Takeaway ordering','Table service']},
    'restaurant menu':{label:'Restaurant Menu QR Playbook',summary:'Put your live menu, ordering, and allergen info in one compact scan path for diners.',uses:['Table menus','Menu updates','Allergen notes','Takeaway ordering','Reservations','Reviews']},
    'sports clubs':{label:'Sports Clubs QR Playbook',summary:'Help members and visitors get fixtures, tickets, shop links, and sponsor info without searching.',uses:['Membership sign-ups','Fixtures and results','Tickets','Club shop','Match programmes','Sponsors']},
    schools:{label:'Schools QR Playbook',summary:'Route parents, pupils, and visitors to forms, maps, updates, and payments with less admin friction.',uses:['Admissions','Event information','Parent forms','Campus maps','Newsletters','Payments']},
    'retail shops':{label:'Retail Shops QR Playbook',summary:'Connect shelf, counter, and window traffic to product pages, offers, loyalty, and new arrivals.',uses:['Product pages','Promotions','Reviews','Store hours','Loyalty sign-up','New arrivals']},
    accountants:{label:'Accountants QR Playbook',summary:'Make bookings, uploads, portals, and review requests easy to reach from print and email touchpoints.',uses:['Client booking','Secure uploads','Portal access','Review requests','Tax checklists','Practice brochure']},
    cafes:{label:'Cafe QR Playbook',summary:'Turn table tents and counter signs into fast access to menu, WiFi, offers, and reviews.',uses:['Digital menus','WiFi','Orders','Reviews','Offers','Opening hours']},
    hotels:{label:'Hotels QR Playbook',summary:'Give guests one scan path for check-in, WiFi, bookings, reviews, and on-site services.',uses:['Check-in info','Guest WiFi','Spa bookings','Reviews','Dining','Local info']},
    'holiday cottages':{label:'Holiday Cottages QR Playbook',summary:'Put arrival instructions, guest guides, WiFi, and local recommendations in one scannable hub.',uses:['Guest guide','WiFi','Arrival info','Local recommendations','House rules','Rebooking']},
    airbnb:{label:'Airbnb QR Playbook',summary:'Help guests find WiFi, welcome books, house rules, and check-in details without extra messages.',uses:['Guest WiFi','Welcome book','House rules','Check-in instructions','Local recommendations','Direct booking']},
    property:{label:'Property QR Playbook',summary:'Move people from signs and brochures to listings, viewing forms, and brochures faster.',uses:['Listing details','Viewing requests','Property brochures','Video tours','Open house info','Agent contacts']},
    'google reviews uk':{label:'Google Reviews QR Playbook',summary:'Make review requests easy to spot at the right moment after a service, visit, or delivery.',uses:['Tradespeople','Restaurants','Holiday lets','Salons','Clinics','Retail counters']},
    wifi:{label:'WiFi QR Playbook',summary:'Let guests join a network without typing passwords or asking staff for access details.',uses:['Guest access','Reception cards','Office desks','Airbnb stays','Cafe tables','Event lobbies']},
    email:{label:'Email QR Playbook',summary:'Send people straight into the right email composer with a pre-filled subject and message.',uses:['Support emails','Enquiry forms','Sales contacts','Feedback requests','Booking replies','Service follow-ups']},
    sms:{label:'SMS QR Playbook',summary:'Open a text message with the right number and message pre-filled for quick replies.',uses:['Callbacks','Booking confirmations','Support messages','Event reminders','Request forms','Lead capture']},
    'phone number':{label:'Phone QR Playbook',summary:'Turn printed phone numbers into tap-to-call actions for mobile users.',uses:['Call now','Reception desk','Van signage','Business cards','Flyers','Counter cards']},
    'social media':{label:'Social Media QR Playbook',summary:'Link posters, packaging, and print assets to social profiles and follow actions.',uses:['Instagram','Facebook','TikTok','YouTube','LinkedIn','X / Twitter']},
    whatsapp:{label:'WhatsApp QR Playbook',summary:'Open a WhatsApp conversation with a fast, low-friction message path.',uses:['Customer support','Order queries','Booking questions','Lead capture','Service updates','Follow-up replies']},
    'whatsapp business':{label:'WhatsApp Business QR Playbook',summary:'Give prospects a direct chat path to your business with a ready-to-send message.',uses:['Sales chats','Support','Bookings','Lead capture','Order updates','Enquiries']},
    pdf:{label:'PDF QR Playbook',summary:'Send scans to brochures, menus, forms, and guides without forcing a search or download hunt.',uses:['Brochures','Menus','Forms','Guides','Price lists','Handbooks']},
    general:{label:'QR Playbook',summary:'Practical, scan-ready guidance that matches the way people use QR codes in the real world.',uses:['One action per scan','Mobile-first pages','Clear labels','Short URLs','Print testing','Tracked placements']}
  };

  function isGuideIndustryPath(pathname){
    return /\/(qr-code-guides|qr-code-industries|qr-code-for-|qr-codes-for-|how-|what-is-a-qr-code|why-is-my-qr-code-not-scanning|static-vs-dynamic-qr-codes|best-|common-|are-|can-|track-qr-code-scans|short-links-for-qr-codes|utm-links-for-qr-codes)/.test(pathname);
  }

  function injectStyles(){
    if(document.getElementById(STYLE_ID)) return;
    var style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent='\
.'+HERO_CLASS+'{margin:16px 0 26px;border:1px solid #dbe6f5;border-radius:24px;padding:18px;background:linear-gradient(135deg,#eef4ff 0%,#ffffff 56%,#ecfbf7 100%);box-shadow:0 18px 34px rgba(15,23,42,.08)}\
.'+HERO_CLASS+'__grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,.92fr);gap:24px;align-items:start}\
.'+HERO_CLASS+'__eyebrow{display:inline-flex;align-items:center;gap:8px;margin:0 0 10px;padding:6px 12px;border-radius:999px;background:#ffedd5;border:1px solid #fed7aa;color:#9a3412;font-size:.8rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase}\
.'+HERO_CLASS+' h1{margin:0 0 10px;font-size:clamp(2rem,5vw,3.6rem);line-height:1.02;letter-spacing:-.05em;color:#0b1220}\
.'+HERO_CLASS+'__intro{margin:0;color:#425066;font-size:1.02rem;line-height:1.65;max-width:64ch}\
.'+HERO_CLASS+'__actions{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0 0}\
.'+HERO_CLASS+'__cta{display:inline-flex;align-items:center;justify-content:center;padding:11px 16px;border-radius:13px;font-weight:900;text-decoration:none;border:1px solid transparent}\
.'+HERO_CLASS+'__cta--primary{background:#ff7a1a;color:#fff;box-shadow:0 10px 24px rgba(255,122,26,.18)}\
.'+HERO_CLASS+'__cta--primary:hover{background:#e96d0e;text-decoration:none}\
.'+HERO_CLASS+'__cta--secondary{background:#fff;color:#0b1220;border-color:#d4dfef}\
.'+HERO_CLASS+'__cta--secondary:hover{border-color:#adc0dd;text-decoration:none}\
.'+HERO_CLASS+'__card{background:#fff;border:1px solid #d9e4f1;border-radius:22px;padding:18px;box-shadow:0 18px 40px rgba(15,23,42,.08);min-height:320px;max-height:420px;display:flex;flex-direction:column;gap:14px}\
.'+HERO_CLASS+'__card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}\
.'+HERO_CLASS+'__card-kicker{margin:0;color:#2864ff;font-size:.72rem;font-weight:950;letter-spacing:.13em;text-transform:uppercase}\
.'+HERO_CLASS+'__card h2{margin:6px 0 0;font-size:1.2rem;line-height:1.16;letter-spacing:-.03em;color:#0b1220}\
.'+HERO_CLASS+'__card p{margin:0;color:#4b586b;font-size:.95rem;line-height:1.55}\
.'+HERO_CLASS+'__tile{width:104px;height:104px;border-radius:20px;padding:12px;background:linear-gradient(135deg,#0f172a 0%,#17325f 58%,#0f9f8f 100%);display:grid;grid-template-columns:repeat(5,1fr);grid-auto-rows:1fr;gap:4px;flex:0 0 auto;box-shadow:0 14px 26px rgba(15,23,42,.16)}\
.'+HERO_CLASS+'__tile span{display:block;border-radius:4px;background:rgba(255,255,255,.95)}\
.'+HERO_CLASS+'__uses{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:0;padding:0;list-style:none}\
.'+HERO_CLASS+'__uses li{margin:0}\
.'+HERO_CLASS+'__chip{display:block;padding:11px 12px;border-radius:999px;background:#f8fbff;border:1px solid #dde8f4;color:#132133;font-weight:750;font-size:.9rem;line-height:1.35;text-align:left}\
.'+HERO_CLASS+'__chip--info{cursor:default;box-shadow:none}\
.'+HERO_CLASS+'__chip--link{text-decoration:none;transition:border-color .18s ease,background .18s ease,color .18s ease}\
.'+HERO_CLASS+'__chip--link:hover{background:#eef6ff;border-color:#bfd6f2;color:#0b1220;text-decoration:none}\
.'+HERO_CLASS+'__foot{margin-top:auto;padding-top:4px;color:#64748b;font-size:.84rem;line-height:1.5}\
@media (max-width:920px){.'+HERO_CLASS+'__grid{grid-template-columns:1fr}.'+HERO_CLASS+'__card{max-height:none}}\
@media (max-width:640px){.'+HERO_CLASS+'{padding:16px}.'+HERO_CLASS+'__uses{grid-template-columns:1fr}.'+HERO_CLASS+'__tile{width:88px;height:88px;padding:10px}}';
    document.head.appendChild(style);
  }

  function useItemParts(item){
    if(item && typeof item==='object'){
      return {label:item.label||'',href:item.href||''};
    }
    return {label:String(item||''),href:''};
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
    var match=cleaned.match(/^(.{40,200}?[.!?])(\s|$)/);
    if(match) return match[1].trim();
    if(cleaned.length>200) return cleaned.slice(0,197).trim()+'...';
    return cleaned;
  }

  function readableIndustryName(title){
    var raw=(title||'').replace(/^QR\s+Codes?\s+for\s+/i,'').trim();
    return raw || 'QR';
  }

  function slugFromTitle(title){
    return readableIndustryName(title).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  }

  function heroCopyForTitle(title){
    var slug=slugFromTitle(title);
    if(HERO_COPY[slug]) return HERO_COPY[slug];
    if(slug.indexOf('restaurant menu')!==-1) return HERO_COPY['restaurant menu'];
    if(slug.indexOf('restaurants')!==-1) return HERO_COPY.restaurants;
    if(slug.indexOf('sports clubs')!==-1) return HERO_COPY['sports clubs'];
    if(slug.indexOf('retail shops')!==-1) return HERO_COPY['retail shops'];
    if(slug.indexOf('schools')!==-1) return HERO_COPY.schools;
    if(slug.indexOf('accountants')!==-1) return HERO_COPY.accountants;
    if(slug.indexOf('google reviews uk')!==-1) return HERO_COPY['google reviews uk'];
    if(slug.indexOf('guest wifi')!==-1 || slug==='wifi') return HERO_COPY.wifi;
    if(slug.indexOf('phone number')!==-1) return HERO_COPY['phone number'];
    if(slug.indexOf('whatsapp business')!==-1) return HERO_COPY['whatsapp business'];
    if(slug.indexOf('whatsapp')!==-1) return HERO_COPY.whatsapp;
    if(slug.indexOf('email')!==-1) return HERO_COPY.email;
    if(slug.indexOf('sms')!==-1) return HERO_COPY.sms;
    if(slug.indexOf('social media')!==-1) return HERO_COPY['social media'];
    if(slug.indexOf('pdf')!==-1) return HERO_COPY.pdf;
    if(slug.indexOf('airbnb')!==-1) return HERO_COPY.airbnb;
    if(slug.indexOf('holiday cottage')!==-1 || slug.indexOf('holiday cottages')!==-1) return HERO_COPY['holiday cottages'];
    if(slug.indexOf('property')!==-1) return HERO_COPY.property;
    if(slug.indexOf('cafe')!==-1 || slug.indexOf('cafes')!==-1) return HERO_COPY.cafes;
    if(slug.indexOf('hotel')!==-1 || slug.indexOf('hotels')!==-1) return HERO_COPY.hotels;
    return HERO_COPY.general;
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

    var copy=heroCopyForTitle(titleNode.textContent);
    if(!introText){
      introText=copy.summary;
    }

    var titleId=titleNode.id || 'qrb-industry-hero-title';
    titleNode.id=titleId;

    var hero=document.createElement('section');
    hero.className=HERO_CLASS;
    hero.setAttribute('aria-labelledby',titleId);

    var grid=document.createElement('div');
    grid.className=HERO_CLASS+'__grid';

    var content=document.createElement('div');
    var eyebrow=document.createElement('p');
    eyebrow.className=HERO_CLASS+'__eyebrow';
    eyebrow.textContent=copy.label;

    var intro=document.createElement('p');
    intro.className=HERO_CLASS+'__intro';
    intro.textContent=introText;

    var actions=document.createElement('div');
    actions.className=HERO_CLASS+'__actions';

    var primary=document.createElement('a');
    primary.className=HERO_CLASS+'__cta '+HERO_CLASS+'__cta--primary';
    primary.href='/free-qr-code-generator.html';
    primary.textContent='Generate Free QR Code';

    var secondary=document.createElement('a');
    secondary.className=HERO_CLASS+'__cta '+HERO_CLASS+'__cta--secondary';
    secondary.href='/qr-code-templates.html';
    secondary.textContent='Browse QR Templates';

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

    var card=document.createElement('div');
    card.className=HERO_CLASS+'__card';

    var cardHead=document.createElement('div');
    cardHead.className=HERO_CLASS+'__card-head';

    var cardText=document.createElement('div');
    var cardKicker=document.createElement('p');
    cardKicker.className=HERO_CLASS+'__card-kicker';
    cardKicker.textContent='Quick Uses';
    var cardTitle=document.createElement('h2');
    cardTitle.textContent=readableIndustryName(titleNode.textContent);
    var cardSummary=document.createElement('p');
    cardSummary.textContent=copy.summary;
    cardText.appendChild(cardKicker);
    cardText.appendChild(cardTitle);
    cardText.appendChild(cardSummary);

    var tile=document.createElement('div');
    tile.className=HERO_CLASS+'__tile';
    for(var i=0;i<25;i++){
      var cell=document.createElement('span');
      if([0,1,2,3,4,5,10,12,14,16,18,20,21,22,23,24].indexOf(i)===-1){
        cell.style.opacity='0.18';
      }
      tile.appendChild(cell);
    }

    cardHead.appendChild(cardText);
    cardHead.appendChild(tile);

    var uses=document.createElement('ul');
    uses.className=HERO_CLASS+'__uses';
    copy.uses.forEach(function(item){
      var parts=useItemParts(item);
      var li=document.createElement('li');
      var chip;
      if(parts.href){
        chip=document.createElement('a');
        chip.href=parts.href;
        chip.className=HERO_CLASS+'__chip '+HERO_CLASS+'__chip--link';
      }else{
        chip=document.createElement('span');
        chip.className=HERO_CLASS+'__chip '+HERO_CLASS+'__chip--info';
      }
      chip.textContent=parts.label;
      li.appendChild(chip);
      uses.appendChild(li);
    });

    var foot=document.createElement('p');
    foot.className=HERO_CLASS+'__foot';
    foot.textContent='Built to stay compact on desktop and stack cleanly on mobile.';

    card.appendChild(cardHead);
    card.appendChild(uses);
    card.appendChild(foot);

    grid.appendChild(content);
    grid.appendChild(card);
    hero.appendChild(grid);

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
