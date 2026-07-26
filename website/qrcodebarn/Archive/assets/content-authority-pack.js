(function(){
  var STYLE_ID='qrb-authority-style';
  var BLOCK_ID='qrb-content-authority-pack';
  var TEMPLATE_ROOT='/components/authority/';
  var COMPONENT_ORDER=[
    'quick-benefits',
    'real-business-example',
    'step-by-step-guide',
    'best-practices',
    'common-mistakes',
    'industry-faq',
    'related-guides',
    'editorial-review'
  ];

  function isIndustryPath(pathname){
    return /\/qr-code-for-|\/qr-codes-for-/.test(pathname||'');
  }

  function slugFromPath(pathname){
    var clean=(pathname||'').replace(/^\//,'').replace(/\.html$/,'');
    return clean;
  }

  function containsAny(slug, list){
    return list.some(function(token){return slug.indexOf(token)!==-1;});
  }

  function categoryForSlug(slug){
    if(containsAny(slug,['restaurant','cafes','food-trucks','menus','hotels','airbnb','holiday-cottage','guest-wifi','guest-welcome-book'])) return 'hospitality';
    if(containsAny(slug,['estate-agents','real-estate','property','booking-property'])) return 'property';
    if(containsAny(slug,['schools','universities','libraries'])) return 'education';
    if(containsAny(slug,['clinics','dentists','vets'])) return 'healthcare';
    if(containsAny(slug,['churches','charities','museums','sports-clubs','music-venues'])) return 'community';
    if(containsAny(slug,['events','weddings','calendar-event'])) return 'events';
    if(containsAny(slug,['plumbers','electricians','construction-sites','garages','warehouses','offices'])) return 'operations';
    if(containsAny(slug,['accountants','law-firms','recruitment','business-card','photographers','personal-trainers','beauty-salons','hairdressers','retail-shops','market-stalls','farm-shops','car-dealers'])) return 'services';
    if(containsAny(slug,['whatsapp','facebook','instagram','linkedin','snapchat','spotify','tiktok','x-twitter','youtube','google-reviews','google-drive','google-forms','google-maps','onedrive','dropbox','paypal','venmo','stripe','zoom-meeting','social-media','email','sms','phone-number','wifi','pdf'])) return 'digital';
    return 'general';
  }

  var CATEGORY_COPY={
    hospitality:{
      audience:'hospitality teams',
      actionA:'menu or guest guide',
      actionB:'booking or review page',
      metric:'higher table conversion and faster guest self-service',
      scenario:'A venue replaced printed update slips with table QR cards linking to a live menu and allergen page, then added a post-visit review QR on receipts.',
      benefits:[
        'Reduce staff time spent answering repeat {{ACTION_A}} questions.',
        'Route guests directly to one action per scan for cleaner intent.',
        'Update destination pages without reprinting every support document.',
        'Improve scan confidence with explicit call-to-action labels.'
      ],
      bestPractices:[
        'Use separate QR codes for {{ACTION_A}} and {{ACTION_B}} workflows.',
        'Place codes where guests are already deciding, not in low-attention zones.',
        'Test scans in low-light dining conditions before full rollout.',
        'Keep destinations mobile-first and under three taps to completion.',
        'Track by placement using distinct tagged URLs.'
      ],
      mistakes:[
        'Using one code for every outcome and forcing users to hunt for actions.',
        'Linking to PDF files that are slow or unreadable on small screens.',
        'Printing without testing real-world glare, distance, and paper finish.',
        'Changing destination URLs after launch without redirect planning.',
        'Forgetting to include fallback text URL for accessibility.'
      ],
      faq:[
        ['Should restaurants use one QR for menu and reviews?', 'No. Split operational tasks by intent so guests get the right action immediately.'],
        ['Can I update offers without changing the printed QR?', 'Yes, if your QR points to a URL you control and update server-side.'],
        ['What is the best placement for table scan reliability?', 'Use upright cards or edge-of-table placements with clear contrast and quiet space.'],
        ['How do I measure scan quality by area?', 'Create separate tagged links per placement and compare completion rates.']
      ],
      related:[
        ['/qr-code-for-menus.html','QR Codes for Menus'],
        ['/qr-code-for-restaurants.html','QR Codes for Restaurants'],
        ['/qr-code-for-google-reviews.html','QR Codes for Google Reviews'],
        ['/qr-code-best-practices.html','QR Code Best Practices'],
        ['/how-to-test-a-qr-code.html','How to Test a QR Code'],
        ['/track-qr-code-scans.html','Track QR Code Scans']
      ]
    },
    property:{
      audience:'property and real-estate teams',
      actionA:'listing or brochure',
      actionB:'booking or viewing request',
      metric:'faster lead qualification from signage and print',
      scenario:'A lettings team placed separate QR codes for listing details and viewing requests on boards and window cards, reducing unqualified call volume.',
      benefits:[
        'Turn physical signage into lead capture with direct {{ACTION_B}} journeys.',
        'Keep listing data current even when printed materials are already distributed.',
        'Segment scans by location to identify top-performing assets.',
        'Shorten enquiry paths for mobile-first prospects.'
      ],
      bestPractices:[
        'Use one QR for {{ACTION_A}} and another for {{ACTION_B}} actions.',
        'Put key details above the fold on landing pages for quick trust checks.',
        'Use UTM labels by branch, board type, or publication source.',
        'Ensure destination pages load quickly on cellular networks.',
        'Audit redirects monthly so old print materials keep working.'
      ],
      mistakes:[
        'Sending every scan to a generic homepage.',
        'Publishing QR codes before testing from roadside viewing distance.',
        'Using low-contrast designs that fail under weathered lighting.',
        'Not assigning ownership for destination page updates.',
        'Tracking only visits and not enquiry completions.'
      ],
      faq:[
        ['What should an estate-agent QR code link to first?', 'A mobile listing summary or viewing form with clear next steps.'],
        ['Can one printed board support multiple actions?', 'Yes, with distinct QR labels for listing and booking actions.'],
        ['How big should property-board QR codes be?', 'Size for expected scan distance and validate in real outdoor conditions.'],
        ['How can teams compare branch performance?', 'Use branch-tagged URLs and monitor completion metrics in analytics.']
      ],
      related:[
        ['/qr-code-for-estate-agents.html','QR Codes for Estate Agents'],
        ['/qr-code-for-property-brochures.html','QR Codes for Property Brochures'],
        ['/qr-codes-for-real-estate-agents.html','QR Codes for Real Estate Agents'],
        ['/best-qr-code-size-for-printing.html','Best QR Code Size for Printing'],
        ['/qr-code-distance-guide.html','QR Code Distance Guide'],
        ['/qr-code-campaign-tracking.html','QR Campaign Tracking']
      ]
    },
    education:{
      audience:'education teams',
      actionA:'resource page or timetable',
      actionB:'form submission or event response',
      metric:'fewer support emails and clearer parent/student journeys',
      scenario:'A school deployed corridor and newsletter QR codes to route parents to term dates, forms, and event updates from one managed hub.',
      benefits:[
        'Deliver up-to-date {{ACTION_A}} content without reissuing print packs.',
        'Reduce admin overhead with direct {{ACTION_B}} flows.',
        'Support multilingual pages through scan-first access points.',
        'Improve attendance response rates with one-tap registration links.'
      ],
      bestPractices:[
        'Keep destination pages simple and device-friendly for families.',
        'Publish context labels such as "Scan for term dates".',
        'Separate event, policy, and payment workflows by QR code.',
        'Review links each term to remove stale destinations.',
        'Include safeguarding-safe contact context on public pages.'
      ],
      mistakes:[
        'Using codes without explaining what users will see after scanning.',
        'Linking to files that require desktop apps to read.',
        'Placing QR codes where students cannot safely stop to scan.',
        'Failing to retire old codes after policy updates.',
        'Ignoring low-connectivity fallback options.'
      ],
      faq:[
        ['Are QR codes suitable for parent communication?', 'Yes, when destinations are clear, mobile-friendly, and updated regularly.'],
        ['Should we use one code for all school info?', 'No. Use separate codes by task to reduce confusion.'],
        ['How do we keep links current through the year?', 'Assign page owners and run a scheduled monthly link audit.'],
        ['Can QR codes improve event response rates?', 'Yes, if RSVP flow is short and clearly labeled.']
      ],
      related:[
        ['/qr-codes-for-schools.html','QR Codes for Schools'],
        ['/qr-code-for-universities.html','QR Codes for Universities'],
        ['/qr-code-for-libraries.html','QR Codes for Libraries'],
        ['/qr-code-accessibility.html','QR Code Accessibility'],
        ['/how-to-test-a-qr-code.html','How to Test a QR Code'],
        ['/free-qr-code-generator.html','Free QR Code Generator']
      ]
    },
    healthcare:{
      audience:'healthcare and clinic teams',
      actionA:'patient information page',
      actionB:'booking or follow-up action',
      metric:'lower front-desk friction and better patient completion rates',
      scenario:'A clinic introduced waiting-room QR cards for pre-visit forms and post-care guidance, reducing check-in bottlenecks.',
      benefits:[
        'Provide instant access to {{ACTION_A}} without paper bottlenecks.',
        'Route patients directly into {{ACTION_B}} workflows.',
        'Improve compliance by linking to current guidance instead of static leaflets.',
        'Reduce queue pressure during peak check-in windows.'
      ],
      bestPractices:[
        'Use calm, high-contrast QR placements in waiting areas.',
        'Ensure pages are legible and accessible on small screens.',
        'Separate urgent-contact journeys from routine admin paths.',
        'Test scans under reflective lighting and screen protectors.',
        'Track drop-off points on form completion journeys.'
      ],
      mistakes:[
        'Hiding codes behind reception barriers where patients cannot scan.',
        'Sending users to pages with unclear consent or privacy context.',
        'Using one QR destination for all departments.',
        'Publishing codes without multilingual support where needed.',
        'Skipping routine destination QA after website updates.'
      ],
      faq:[
        ['Where should clinics place QR codes?', 'Waiting rooms, post-visit handouts, and appointment confirmations perform best.'],
        ['Can a QR replace printed instructions?', 'Use both where needed, but QR destinations should always be mobile-readable.'],
        ['How do we protect patient trust?', 'Use clear branding and transparent destination labels before every scan.'],
        ['How can practices monitor effectiveness?', 'Track completion rates on forms, bookings, and follow-up actions.']
      ],
      related:[
        ['/qr-code-for-clinics.html','QR Codes for Clinics'],
        ['/qr-code-for-dentists.html','QR Codes for Dentists'],
        ['/qr-code-for-vets.html','QR Codes for Vets'],
        ['/are-qr-codes-safe.html','Are QR Codes Safe?'],
        ['/qr-code-best-practices.html','QR Code Best Practices'],
        ['/qr-code-accessibility.html','QR Code Accessibility']
      ]
    },
    community:{
      audience:'community and nonprofit teams',
      actionA:'programme or event information',
      actionB:'donation or sign-up flow',
      metric:'stronger participation with less admin overhead',
      scenario:'A local charity added event and donation QR routes to posters and desk packs, improving sign-up conversion from offline campaigns.',
      benefits:[
        'Move audiences from print straight to {{ACTION_A}} actions.',
        'Collect volunteer and donor intent through {{ACTION_B}} funnels.',
        'Update campaign pages quickly without reprinting all assets.',
        'Measure engagement by venue, campaign, and event type.'
      ],
      bestPractices:[
        'Use clear value-led labels beside each QR code.',
        'Keep donation or registration forms short and mobile-first.',
        'Use distinct links per campaign for cleaner reporting.',
        'Pair physical signage with social follow-up links.',
        'Verify every scan path before major events.'
      ],
      mistakes:[
        'Using generic CTA text with no stated benefit.',
        'Linking to pages with slow media-heavy loads.',
        'Failing to tag campaign traffic for reporting.',
        'Not updating expired event destinations.',
        'Ignoring accessibility and contrast in printed assets.'
      ],
      faq:[
        ['What is the best QR use for charities?', 'Donation, volunteer sign-up, and event information flows are highest impact.'],
        ['Can community groups use one QR across events?', 'Use event-specific codes for clearer analytics and better user intent.'],
        ['How do we increase scan trust?', 'Show destination purpose clearly before scan and keep branding consistent.'],
        ['How should we measure success?', 'Track registrations, donations, and completion rates by placement.']
      ],
      related:[
        ['/qr-code-for-charities.html','QR Codes for Charities'],
        ['/qr-code-for-churches.html','QR Codes for Churches'],
        ['/qr-code-for-museums.html','QR Codes for Museums'],
        ['/qr-code-for-sports-clubs.html','QR Codes for Sports Clubs'],
        ['/qr-code-campaign-tracking.html','QR Campaign Tracking'],
        ['/track-qr-code-scans.html','Track QR Code Scans']
      ]
    },
    events:{
      audience:'event and venue teams',
      actionA:'agenda, map, or event page',
      actionB:'registration or post-event feedback',
      metric:'higher on-site flow efficiency and response rates',
      scenario:'An events team used separate QR routes for schedule, venue map, and feedback forms to reduce confusion and queueing.',
      benefits:[
        'Help attendees reach {{ACTION_A}} information instantly.',
        'Capture {{ACTION_B}} completions while intent is high.',
        'Update logistics pages quickly if timings change.',
        'Measure engagement by location and signage asset.'
      ],
      bestPractices:[
        'Publish one QR per attendee task, not one for everything.',
        'Place codes at choke points with clear directional labels.',
        'Use short branded URLs for better scan trust.',
        'Test scans from expected standing distance.',
        'Include fallback short links for low-signal venues.'
      ],
      mistakes:[
        'Using tiny QR codes on large-format venue signs.',
        'Linking to desktop-only pages during mobile-heavy events.',
        'Changing destination paths without preserving redirects.',
        'Forgetting to archive outdated event pages.',
        'Ignoring performance on congested mobile networks.'
      ],
      faq:[
        ['What should event QR codes link to first?', 'Agenda, map, and check-in paths should be separated for clarity.'],
        ['Can QR codes reduce queue times?', 'Yes, especially for self-service info and form completion flows.'],
        ['How do we improve scan trust at events?', 'Use explicit labels and consistent event branding near each code.'],
        ['How can teams compare placements?', 'Tag URLs by sign location and monitor completion rates.']
      ],
      related:[
        ['/qr-code-for-events.html','QR Codes for Events'],
        ['/qr-codes-for-events.html','QR Codes for Events Guide'],
        ['/qr-code-for-calendar-event.html','QR Codes for Calendar Events'],
        ['/qr-code-for-weddings.html','QR Codes for Weddings'],
        ['/qr-code-distance-guide.html','QR Code Distance Guide'],
        ['/how-to-test-a-qr-code.html','How to Test a QR Code']
      ]
    },
    operations:{
      audience:'operations and field teams',
      actionA:'instruction or compliance page',
      actionB:'service request or issue report',
      metric:'faster task completion with fewer manual handoffs',
      scenario:'A field operations team placed QR codes on assets and workstations to route staff to SOPs and issue reporting forms.',
      benefits:[
        'Deliver current {{ACTION_A}} guidance at point of work.',
        'Collect {{ACTION_B}} details with structured forms.',
        'Reduce paper drift and outdated procedural copies.',
        'Improve traceability across physical locations.'
      ],
      bestPractices:[
        'Use durable print materials and high-contrast labels.',
        'Keep linked pages concise and action-led.',
        'Assign ownership for every destination URL.',
        'Audit QR labels during routine safety checks.',
        'Track completion rates, not just scan counts.'
      ],
      mistakes:[
        'Placing codes where scanning is physically unsafe.',
        'Using URLs that require desktop access onsite.',
        'Neglecting version control on instruction pages.',
        'Failing to monitor dead links on older assets.',
        'Not mapping QR IDs to asset registers.'
      ],
      faq:[
        ['Are QR codes useful on worksites?', 'Yes, for SOPs, compliance checklists, and issue logging workflows.'],
        ['What destination type works best?', 'Mobile-first pages with one clear task per scan.'],
        ['How do teams maintain reliability?', 'Run scheduled link checks and physical label inspections.'],
        ['How should performance be measured?', 'Use completion metrics tied to specific operational outcomes.']
      ],
      related:[
        ['/qr-code-for-construction-sites.html','QR Codes for Construction Sites'],
        ['/qr-code-for-warehouses.html','QR Codes for Warehouses'],
        ['/qr-code-for-offices.html','QR Codes for Offices'],
        ['/qr-code-for-plumbers.html','QR Codes for Plumbers'],
        ['/qr-code-for-electricians.html','QR Codes for Electricians'],
        ['/qr-code-best-practices.html','QR Code Best Practices']
      ]
    },
    services:{
      audience:'service businesses',
      actionA:'service page or quote flow',
      actionB:'booking, enquiry, or review action',
      metric:'more qualified enquiries from offline touchpoints',
      scenario:'A local service business moved flyer traffic to a mobile quote form and review request flow using separate QR labels.',
      benefits:[
        'Convert print visibility into measurable {{ACTION_B}} actions.',
        'Guide users to exactly one {{ACTION_A}} journey per placement.',
        'Increase trust with branded scan destinations.',
        'Improve lead quality with pre-qualified form inputs.'
      ],
      bestPractices:[
        'Match QR CTA language to the exact destination action.',
        'Use separate codes for quotes, reviews, and contact.',
        'Keep mobile form fields minimal to reduce abandonment.',
        'Tag every campaign link by channel and material type.',
        'Retest printed assets after any redesign or resize.'
      ],
      mistakes:[
        'Using one generic code for all business outcomes.',
        'Linking to slow pages with unclear value proposition.',
        'Ignoring mismatch between CTA label and landing page.',
        'Publishing without multidevice testing.',
        'Failing to retire old campaign codes.'
      ],
      faq:[
        ['What should service-business QR codes link to?', 'Use booking, quote, review, or contact pages based on placement context.'],
        ['Can business cards include multiple QR outcomes?', 'Yes, but each code should have a distinct CTA and destination.'],
        ['How do we measure print campaign ROI?', 'Track conversions by tagged URLs and compare by source material.'],
        ['What improves scan conversion most?', 'Clear CTA text and fast mobile landing pages.']
      ],
      related:[
        ['/qr-code-for-accountants.html','QR Codes for Accountants'],
        ['/qr-code-for-law-firms.html','QR Codes for Law Firms'],
        ['/qr-code-for-retail-shops.html','QR Codes for Retail Shops'],
        ['/qr-code-for-business-card.html','QR Codes for Business Cards'],
        ['/qr-code-for-google-reviews.html','QR Codes for Google Reviews'],
        ['/qr-code-campaign-tracking.html','QR Campaign Tracking']
      ]
    },
    digital:{
      audience:'digital and social teams',
      actionA:'profile or resource destination',
      actionB:'message, follow, or conversion action',
      metric:'higher conversion from print-to-digital journeys',
      scenario:'A marketing team used separate QR codes for social follow, WhatsApp support, and payment links on packaging and in-store signage.',
      benefits:[
        'Move users from offline touchpoints to {{ACTION_A}} destinations quickly.',
        'Increase {{ACTION_B}} conversion with one-action landing paths.',
        'Attribute scans by campaign source using tagged links.',
        'Reuse one visual system across social and commerce channels.'
      ],
      bestPractices:[
        'Use separate QR paths for support, social, and payment intents.',
        'Show destination brand cues before users submit data.',
        'Shorten paths to completion within one or two taps.',
        'Validate deep links on both iOS and Android devices.',
        'Use HTTPS destinations only for trust and compatibility.'
      ],
      mistakes:[
        'Linking to unstable third-party URLs without fallback routes.',
        'Sending social-intent scans to generic homepages.',
        'Printing without testing app deep-link behavior.',
        'Ignoring URL expiration in campaign links.',
        'Skipping accessibility labels near displayed QR codes.'
      ],
      faq:[
        ['Should social QR codes open apps directly?', 'Use tested deep links, but keep web fallbacks for unsupported devices.'],
        ['Can one QR handle WhatsApp and payment actions?', 'Better to separate actions to keep user intent clear.'],
        ['How can teams avoid broken campaign links?', 'Use managed redirects and routine health checks.'],
        ['How do we improve scan trust for payment flows?', 'Use clear labels and branded secure destinations.']
      ],
      related:[
        ['/qr-code-for-whatsapp-business.html','QR Codes for WhatsApp Business'],
        ['/qr-code-for-social-media.html','QR Codes for Social Media'],
        ['/qr-code-for-google-reviews-uk.html','QR Codes for Google Reviews UK'],
        ['/short-links-for-qr-codes.html','Short Links for QR Codes'],
        ['/utm-links-for-qr-codes.html','UTM Links for QR Codes'],
        ['/track-qr-code-scans.html','Track QR Code Scans']
      ]
    },
    general:{
      audience:'business teams',
      actionA:'information page',
      actionB:'conversion action',
      metric:'cleaner user journeys and measurable scan outcomes',
      scenario:'A team split one generic QR code into action-specific routes, improving conversion clarity across printed assets.',
      benefits:[
        'Guide users directly from print to {{ACTION_B}} actions.',
        'Keep destinations current without redesigning every asset.',
        'Improve internal reporting by separating scan intents.',
        'Reduce friction with mobile-first destination pages.'
      ],
      bestPractices:[
        'Use one code per user intent and clear labels.',
        'Test scans from realistic distance and lighting.',
        'Protect destination links with stable redirects.',
        'Track completions, not just scan volumes.',
        'Review placements quarterly for performance.'
      ],
      mistakes:[
        'Using vague calls to action such as "Scan me".',
        'Publishing low-contrast or undersized codes.',
        'Sending scans to slow, non-mobile pages.',
        'Losing historic links after website restructures.',
        'Ignoring user feedback on confusing destinations.'
      ],
      faq:[
        ['What is the main advantage of industry QR workflows?', 'They align scan intent with one clear conversion destination.'],
        ['How often should QR destinations be reviewed?', 'At least monthly, and after any content or URL changes.'],
        ['What is the best way to compare placements?', 'Use distinct tagged URLs per placement and track completions.'],
        ['Do static QR codes expire?', 'No, but their destination can fail if URLs are not maintained.']
      ],
      related:[
        ['/qr-code-best-practices.html','QR Code Best Practices'],
        ['/how-to-test-a-qr-code.html','How to Test a QR Code'],
        ['/best-qr-code-size-for-printing.html','Best QR Code Size for Printing'],
        ['/qr-code-error-correction.html','QR Code Error Correction'],
        ['/track-qr-code-scans.html','Track QR Code Scans'],
        ['/free-qr-code-generator.html','Free QR Code Generator']
      ]
    }
  };

  function articleNode(main){
    return main.querySelector('article.article') || main.querySelector('article') || null;
  }

  function readableIndustryName(title){
    var raw=(title||'').replace(/^QR\s+Codes?\s+for\s+/i,'').trim();
    return raw || 'This Industry';
  }

  function replaceToken(template, token, value){
    return template.split('{{'+token+'}}').join(value);
  }

  function listItems(items){
    return items.map(function(item){return '<li>'+item+'</li>';}).join('');
  }

  function faqItems(rows){
    return rows.map(function(row){
      return '<details><summary>'+row[0]+'</summary><p>'+row[1]+'</p></details>';
    }).join('');
  }

  function relatedItems(rows){
    return rows.map(function(row){
      return '<li><a href="'+row[0]+'">'+row[1]+'</a></li>';
    }).join('');
  }

  function escapeHtml(text){
    return String(text||'')
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  function fillText(tokens, source){
    return source
      .replace(/\{\{INDUSTRY\}\}/g, tokens.INDUSTRY)
      .replace(/\{\{ACTION_A\}\}/g, tokens.ACTION_A)
      .replace(/\{\{ACTION_B\}\}/g, tokens.ACTION_B)
      .replace(/\{\{METRIC\}\}/g, tokens.METRIC)
      .replace(/\{\{AUDIENCE\}\}/g, tokens.AUDIENCE);
  }

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    var style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=[
      '#'+BLOCK_ID+'{margin:22px 0;padding:18px;border:1px solid #d9e3f2;border-radius:16px;background:#fbfdff}',
      '#'+BLOCK_ID+' .authority-block + .authority-block{margin-top:18px;padding-top:18px;border-top:1px solid #e7edf7}',
      '#'+BLOCK_ID+' h2{margin:0 0 10px;font-size:1.32rem;line-height:1.2}',
      '#'+BLOCK_ID+' p{margin:0 0 10px}',
      '#'+BLOCK_ID+' ul,#'+BLOCK_ID+' ol{margin:0;padding-left:20px;display:grid;gap:8px}',
      '#'+BLOCK_ID+' details{margin:0 0 8px;padding:8px 10px;border:1px solid #e4ebf8;border-radius:10px;background:#fff}',
      '#'+BLOCK_ID+' details:last-child{margin-bottom:0}',
      '#'+BLOCK_ID+' summary{cursor:pointer;font-weight:700}'
    ].join('');
    document.head.appendChild(style);
  }

  var templateCache=null;
  function loadTemplates(){
    if(templateCache) return Promise.resolve(templateCache);
    return Promise.all(COMPONENT_ORDER.map(function(name){
      return fetch(TEMPLATE_ROOT+name+'.html',{cache:'default',credentials:'same-origin'})
        .then(function(res){if(!res.ok) throw new Error('Missing authority template '+name); return res.text();})
        .then(function(text){return {name:name,text:text};});
    })).then(function(rows){
      templateCache={};
      rows.forEach(function(row){templateCache[row.name]=row.text;});
      return templateCache;
    });
  }

  function compileSections(title, slug){
    var category=categoryForSlug(slug);
    var copy=CATEGORY_COPY[category] || CATEGORY_COPY.general;
    var industry=readableIndustryName(title);
    var tokens={
      INDUSTRY:escapeHtml(industry),
      ACTION_A:escapeHtml(copy.actionA),
      ACTION_B:escapeHtml(copy.actionB),
      METRIC:escapeHtml(copy.metric),
      AUDIENCE:escapeHtml(copy.audience)
    };

    return loadTemplates().then(function(templates){
      var quickBenefits=copy.benefits.map(function(item){return fillText(tokens,item);});
      var bestPractices=copy.bestPractices.map(function(item){return fillText(tokens,item);});
      var mistakes=copy.mistakes.map(function(item){return fillText(tokens,item);});
      var steps=[
        'Define the one action this '+tokens.INDUSTRY+' QR code should trigger.',
        'Create a mobile-first destination page for '+tokens.ACTION_A+'.',
        'Generate the QR code and print a test sample at final size.',
        'Label the placement clearly and launch with one CTA per code.',
        'Review scan completions weekly and optimize weak placements.'
      ];

      var editorial='This section is reviewed by the QRCodeBarn editorial process for '+tokens.AUDIENCE+', with practical scan guidance focused on reliable deployment and measurable outcomes. Updated content follows published standards in the Trust Centre.';

      var html='';
      var t;

      t=templates['quick-benefits'];
      html+=replaceToken(replaceToken(t,'INDUSTRY',tokens.INDUSTRY),'BENEFIT_ITEMS',listItems(quickBenefits));

      t=templates['real-business-example'];
      html+=replaceToken(t,'BUSINESS_EXAMPLE',fillText(tokens,copy.scenario)+' Result: '+tokens.METRIC+'.');

      t=templates['step-by-step-guide'];
      html+=replaceToken(t,'STEP_ITEMS',listItems(steps));

      t=templates['best-practices'];
      html+=replaceToken(t,'BEST_PRACTICE_ITEMS',listItems(bestPractices));

      t=templates['common-mistakes'];
      html+=replaceToken(t,'MISTAKE_ITEMS',listItems(mistakes));

      t=templates['industry-faq'];
      html+=replaceToken(t,'FAQ_ITEMS',faqItems(copy.faq));

      t=templates['related-guides'];
      html+=replaceToken(t,'RELATED_GUIDE_ITEMS',relatedItems(copy.related));

      t=templates['editorial-review'];
      html+=replaceToken(t,'EDITORIAL_REVIEW',editorial+' <a href="/trust-centre.html">Trust Centre</a>.');

      return html;
    });
  }

  function findInsertionPoint(main, article){
    if(article){
      var relatedHeading=Array.from(article.querySelectorAll('h2')).find(function(node){
        return /related/i.test((node.textContent||''));
      });
      if(relatedHeading) return {parent:relatedHeading.parentNode, before:relatedHeading};
      var note=article.querySelector('.note');
      if(note) return {parent:note.parentNode, before:note};
      return {parent:article, before:null};
    }
    return {parent:main, before:null};
  }

  function injectPack(){
    if(!isIndustryPath(window.location.pathname)) return;

    var main=document.querySelector('main.wrap') || document.querySelector('main.article-layout') || document.querySelector('main');
    if(!main || document.getElementById(BLOCK_ID)) return;

    var article=articleNode(main);
    var titleNode=(article && article.querySelector('h1')) || main.querySelector('h1');
    if(!titleNode) return;

    addStyles();

    compileSections(titleNode.textContent, slugFromPath(window.location.pathname)).then(function(html){
      var pack=document.createElement('section');
      pack.id=BLOCK_ID;
      pack.setAttribute('data-authority-pack','true');
      pack.innerHTML=html;

      var target=findInsertionPoint(main, article);
      if(target.before){
        target.parent.insertBefore(pack, target.before);
      }else{
        target.parent.appendChild(pack);
      }
    }).catch(function(err){
      console.warn(err.message);
    });
  }

  window.QRBContentAuthorityPack={init:injectPack};

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',injectPack);
  }else{
    injectPack();
  }
})();
