(function(){
  var STYLE_ID='qrb-industry-hero-style';
  var HERO_CLASS='qrb-industry-hero';

  function makeUse(label,href){
    return {label:label,href:href};
  }

  var HERO_COPY={
    restaurants:{label:'Restaurants QR Playbook',summary:'Keep menus, reservations, reviews, WiFi, takeaway ordering, and table service in one scan-friendly flow.',uses:[makeUse('Digital menus','/qr-code-for-restaurant-menu.html'),makeUse('Reservations','/qr-code-for-calendar-event.html'),makeUse('Reviews','/qr-code-for-google-reviews.html'),makeUse('WiFi','/qr-code-for-wifi.html'),makeUse('Takeaway ordering','/qr-code-for-restaurant-menu.html'),makeUse('Table service','/qr-code-for-restaurant-menu.html')]},
    'restaurant menu':{label:'Restaurant Menu QR Playbook',summary:'Put your live menu, ordering, and allergen info in one compact scan path for diners.',uses:[makeUse('Table menus','/qr-code-for-restaurant-menu.html'),makeUse('Menu updates','/qr-code-for-restaurant-menu.html'),makeUse('Allergen notes','/qr-code-for-restaurant-menu.html'),makeUse('Takeaway ordering','/qr-code-for-restaurant-menu.html'),makeUse('Reservations','/qr-code-for-calendar-event.html'),makeUse('Reviews','/qr-code-for-google-reviews.html')]},
    'sports clubs':{label:'Sports Clubs QR Playbook',summary:'Help members and visitors get fixtures, tickets, shop links, and sponsor info without searching.',uses:[makeUse('Membership sign-ups','/qr-code-for-sports-clubs.html'),makeUse('Fixtures and results','/qr-code-for-sports-clubs.html'),makeUse('Tickets','/qr-codes-for-events.html'),makeUse('Club shop','/qr-code-for-social-media.html'),makeUse('Match programmes','/qr-code-for-pdf.html'),makeUse('Sponsors','/qr-code-for-sports-clubs.html')]},
    schools:{label:'Schools QR Playbook',summary:'Route parents, pupils, and visitors to forms, maps, updates, and payments with less admin friction.',uses:[makeUse('Admissions','/qr-codes-for-schools.html'),makeUse('Event information','/qr-codes-for-events.html'),makeUse('Parent forms','/qr-code-for-google-forms.html'),makeUse('Campus maps','/qr-code-for-google-maps.html'),makeUse('Newsletters','/qr-code-for-pdf.html'),makeUse('Payments','/qr-code-for-paypal.html')]},
    'retail shops':{label:'Retail Shops QR Playbook',summary:'Connect shelf, counter, and window traffic to product pages, offers, loyalty, and new arrivals.',uses:[makeUse('Product pages','/qr-codes-for-product-packaging.html'),makeUse('Promotions','/qr-code-for-social-media.html'),makeUse('Reviews','/qr-code-for-google-reviews.html'),makeUse('Store hours','/qr-code-for-google-maps.html'),makeUse('Loyalty sign-up','/qr-code-for-google-forms.html'),makeUse('New arrivals','/qr-code-for-retail-shops.html')]},
    accountants:{label:'Accountants QR Playbook',summary:'Make bookings, uploads, portals, and review requests easy to reach from print and email touchpoints.',uses:[makeUse('Client booking','/qr-code-for-calendar-event.html'),makeUse('Secure uploads','/qr-code-for-dropbox.html'),makeUse('Portal access','/qr-code-for-onedrive.html'),makeUse('Review requests','/qr-code-for-google-reviews.html'),makeUse('Tax checklists','/qr-code-for-pdf.html'),makeUse('Practice brochure','/qr-code-for-accountants.html')]},
    cafes:{label:'Cafe QR Playbook',summary:'Turn table tents and counter signs into fast access to menu, WiFi, offers, and reviews.',uses:[makeUse('Digital menus','/qr-code-for-restaurant-menu.html'),makeUse('WiFi','/qr-code-for-guest-wifi.html'),makeUse('Orders','/qr-code-for-restaurant-menu.html'),makeUse('Reviews','/qr-code-for-google-reviews.html'),makeUse('Offers','/qr-code-for-social-media.html'),makeUse('Opening hours','/qr-code-for-google-maps.html')]},
    hotels:{label:'Hotels QR Playbook',summary:'Give guests one scan path for check-in, WiFi, bookings, reviews, and on-site services.',uses:[makeUse('Check-in info','/qr-code-for-guest-welcome-book.html'),makeUse('Guest WiFi','/qr-code-for-guest-wifi.html'),makeUse('Spa bookings','/qr-code-for-calendar-event.html'),makeUse('Reviews','/qr-code-for-google-reviews.html'),makeUse('Dining','/qr-code-for-restaurant-menu.html'),makeUse('Local info','/qr-code-for-google-maps.html')]},
    'holiday cottages':{label:'Holiday Cottages QR Playbook',summary:'Put arrival instructions, guest guides, WiFi, and local recommendations in one scannable hub.',uses:[makeUse('Guest guide','/qr-code-for-guest-welcome-book.html'),makeUse('WiFi','/qr-code-for-guest-wifi.html'),makeUse('Arrival info','/qr-code-for-holiday-cottages.html'),makeUse('Local recommendations','/qr-code-for-google-maps.html'),makeUse('House rules','/qr-code-for-pdf.html'),makeUse('Rebooking','/qr-code-for-booking-property.html')]},
    airbnb:{label:'Airbnb QR Playbook',summary:'Help guests find WiFi, welcome books, house rules, and check-in details without extra messages.',uses:[makeUse('Guest WiFi','/qr-code-for-guest-wifi.html'),makeUse('Welcome book','/qr-code-for-guest-welcome-book.html'),makeUse('House rules','/qr-code-for-pdf.html'),makeUse('Check-in instructions','/qr-code-for-airbnb.html'),makeUse('Local recommendations','/qr-code-for-google-maps.html'),makeUse('Direct booking','/qr-code-for-booking-property.html')]},
    property:{label:'Property QR Playbook',summary:'Move people from signs and brochures to listings, viewing forms, and brochures faster.',uses:[makeUse('Listing details','/qr-codes-for-real-estate-agents.html'),makeUse('Viewing requests','/qr-code-for-calendar-event.html'),makeUse('Property brochures','/qr-code-for-property-brochures.html'),makeUse('Video tours','/qr-code-for-youtube.html'),makeUse('Open house info','/qr-code-for-real-estate-open-house.html'),makeUse('Agent contacts','/qr-code-for-phone-number.html')]},
    'google reviews uk':{label:'Google Reviews QR Playbook',summary:'Make review requests easy to spot at the right moment after a service, visit, or delivery.',uses:[makeUse('Tradespeople','/qr-code-for-electricians.html'),makeUse('Restaurants','/qr-code-for-restaurants.html'),makeUse('Holiday lets','/qr-code-for-holiday-cottages.html'),makeUse('Salons','/qr-code-for-hairdressers.html'),makeUse('Clinics','/qr-code-for-clinics.html'),makeUse('Retail counters','/qr-code-for-retail-shops.html')]},
    wifi:{label:'WiFi QR Playbook',summary:'Let guests join a network without typing passwords or asking staff for access details.',uses:[makeUse('Guest access','/qr-code-for-guest-wifi.html'),makeUse('Reception cards','/qr-code-for-hotels.html'),makeUse('Office desks','/qr-code-for-offices.html'),makeUse('Airbnb stays','/qr-code-for-airbnb.html'),makeUse('Cafe tables','/qr-code-for-cafes.html'),makeUse('Event lobbies','/qr-codes-for-events.html')]},
    email:{label:'Email QR Playbook',summary:'Send people straight into the right email composer with a pre-filled subject and message.',uses:[makeUse('Support emails','/qr-code-for-email.html'),makeUse('Enquiry forms','/qr-code-for-google-forms.html'),makeUse('Sales contacts','/qr-code-for-business-card.html'),makeUse('Feedback requests','/qr-code-for-google-reviews.html'),makeUse('Booking replies','/qr-code-for-calendar-event.html'),makeUse('Service follow-ups','/qr-code-for-whatsapp-business.html')]},
    sms:{label:'SMS QR Playbook',summary:'Open a text message with the right number and message pre-filled for quick replies.',uses:[makeUse('Callbacks','/qr-code-for-phone-number.html'),makeUse('Booking confirmations','/qr-code-for-calendar-event.html'),makeUse('Support messages','/qr-code-for-whatsapp-business.html'),makeUse('Event reminders','/qr-code-for-sms.html'),makeUse('Request forms','/qr-code-for-google-forms.html'),makeUse('Lead capture','/qr-code-for-social-media.html')]},
    'phone number':{label:'Phone QR Playbook',summary:'Turn printed phone numbers into tap-to-call actions for mobile users.',uses:[makeUse('Call now','/qr-code-for-phone-number.html'),makeUse('Reception desk','/qr-code-for-business-card.html'),makeUse('Van signage','/qr-code-for-electricians.html'),makeUse('Business cards','/qr-code-for-business-card.html'),makeUse('Flyers','/qr-code-on-flyers.html'),makeUse('Counter cards','/qr-code-for-retail-shops.html')]},
    'social media':{label:'Social Media QR Playbook',summary:'Link posters, packaging, and print assets to social profiles and follow actions.',uses:[makeUse('Instagram','/qr-code-for-instagram.html'),makeUse('Facebook','/qr-code-for-facebook.html'),makeUse('TikTok','/qr-code-for-tiktok.html'),makeUse('YouTube','/qr-code-for-youtube.html'),makeUse('LinkedIn','/qr-code-for-linkedin.html'),makeUse('X / Twitter','/qr-code-for-x-twitter.html')]},
    whatsapp:{label:'WhatsApp QR Playbook',summary:'Open a WhatsApp conversation with a fast, low-friction message path.',uses:[makeUse('Customer support','/qr-code-for-whatsapp-business.html'),makeUse('Order queries','/qr-code-for-restaurant-menu.html'),makeUse('Booking questions','/qr-code-for-booking-property.html'),makeUse('Lead capture','/qr-code-for-social-media.html'),makeUse('Service updates','/qr-code-for-sms.html'),makeUse('Follow-up replies','/qr-code-for-whatsapp.html')]},
    'whatsapp business':{label:'WhatsApp Business QR Playbook',summary:'Give prospects a direct chat path to your business with a ready-to-send message.',uses:[makeUse('Sales chats','/qr-code-for-whatsapp-business.html'),makeUse('Support','/qr-code-for-whatsapp-business.html'),makeUse('Bookings','/qr-code-for-booking-property.html'),makeUse('Lead capture','/qr-code-for-social-media.html'),makeUse('Order updates','/qr-code-for-sms.html'),makeUse('Enquiries','/qr-code-for-email.html')]},
    pdf:{label:'PDF QR Playbook',summary:'Send scans to brochures, menus, forms, and guides without forcing a search or download hunt.',uses:[makeUse('Brochures','/qr-code-for-property-brochures.html'),makeUse('Menus','/qr-code-for-restaurant-pdf-menu.html'),makeUse('Forms','/qr-code-for-google-forms.html'),makeUse('Guides','/qr-code-for-guest-welcome-book.html'),makeUse('Price lists','/qr-code-for-pdf.html'),makeUse('Handbooks','/qr-code-for-pdf.html')]},
    general:{label:'QR Playbook',summary:'Practical, scan-ready guidance that matches the way people use QR codes in the real world.',uses:[makeUse('One action per scan','/best-practices-for-qr-codes.html'),makeUse('Mobile-first pages','/best-practices-for-qr-codes.html'),makeUse('Clear labels','/best-practices-for-qr-codes.html'),makeUse('Short URLs','/short-links-for-qr-codes.html'),makeUse('Print testing','/how-to-test-a-qr-code.html'),makeUse('Tracked placements','/track-qr-code-scans.html')]}
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
.'+HERO_CLASS+'__chip--link{text-decoration:none;transition:border-color .18s ease,background .18s ease,color .18s ease}\
.'+HERO_CLASS+'__chip--link:hover{background:#eef6ff;border-color:#bfd6f2;color:#0b1220;text-decoration:none}\
.'+HERO_CLASS+'__chip--link:focus-visible{outline:2px solid #2563eb;outline-offset:2px}\
.'+HERO_CLASS+'__foot{margin-top:auto;padding-top:4px;color:#64748b;font-size:.84rem;line-height:1.5}\
@media (max-width:920px){.'+HERO_CLASS+'__grid{grid-template-columns:1fr}.'+HERO_CLASS+'__card{max-height:none}}\
@media (max-width:640px){.'+HERO_CLASS+'{padding:16px}.'+HERO_CLASS+'__uses{grid-template-columns:1fr}.'+HERO_CLASS+'__tile{width:88px;height:88px;padding:10px}}';
    document.head.appendChild(style);
  }

  function useItemParts(item){
    if(item && typeof item==='object'){
      return {label:item.label||'',href:item.href||''};
    }
    return {label:String(item||''),href:'/qr-code-guides.html'};
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
      var chip=document.createElement('a');
      chip.href=parts.href;
      chip.className=HERO_CLASS+'__chip '+HERO_CLASS+'__chip--link';
      chip.setAttribute('aria-label',parts.label+' for '+copy.label);
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
