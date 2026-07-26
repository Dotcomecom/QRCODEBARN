(function(){
  var KEY='qrbarn_consent_v1';
  var dl=window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){dl.push(arguments);};

  function toConsentFlags(state){
    var analytics=!!(state&&state.analytics);
    var ads=!!(state&&state.ads);
    var personalization=!!(state&&state.personalization);
    return {
      ad_storage: ads?'granted':'denied',
      ad_user_data: ads?'granted':'denied',
      ad_personalization: ads?'granted':'denied',
      analytics_storage: analytics?'granted':'denied',
      personalization_storage: personalization?'granted':'denied',
      functionality_storage: 'granted',
      security_storage: 'granted'
    };
  }

  function readStoredState(){
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

  var defaults={analytics:false,ads:false,personalization:false,method:'default',ts:Date.now()};
  window.gtag('consent','default',Object.assign({wait_for_update:500},toConsentFlags(defaults)));

  var stored=readStoredState();
  if(stored){
    window.gtag('consent','update',toConsentFlags(stored));
  }

  window.QRBConsent={
    key:KEY,
    toConsentFlags:toConsentFlags
  };
})();
