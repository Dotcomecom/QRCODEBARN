(function loadSharedGeneratorRuntime(){
  if(window.__qrbLongtailBridgeLoaded) return;
  window.__qrbLongtailBridgeLoaded=true;

  const hasSharedRuntime=document.querySelector('script[src="/assets/app.js"],script[src="assets/app.js"]');
  if(hasSharedRuntime) return;

  const script=document.createElement('script');
  script.src='/assets/app.js';
  script.async=false;
  document.head.appendChild(script);
})();