/*
Client-side language bootstrap: determines initial language and applies it.
- Priority: ?lang= > path prefix (/en or /es) > localStorage > browser > default
- Persists the resolved language to localStorage.
- Updates <html lang> attribute.
- Normalizes header language links to include ?lang=.
*/
(function(){
  try {
    var w = window, d = document, nav = w.navigator;
    var langUtil = (function(){
      // Minimal embedded helpers to avoid bundling; keep in sync with src/utils/language.js
      var SUPPORTED = ['en','es'];
      function normalize(l){ return SUPPORTED.indexOf(l) !== -1 ? l : 'en'; }
      function getSearchLang(search){
        if (!search) return null;
        try {
          var params = new URLSearchParams(search.charAt(0)==='?'? search.slice(1): search);
          var v = params.get('lang');
          return v ? normalize(v) : null;
        } catch(e){ return null; }
      }
      function getPathLang(pathname){
        if (!pathname) return null;
        var m = pathname.match(/^\/(en|es)(\/|$)/i);
        return m ? normalize(m[1].toLowerCase()) : null;
      }
      function detectBrowserLanguage(nav){
        var langs = (nav && (nav.languages || [nav.language])) || [];
        for (var i=0;i<langs.length;i++){
          var code = langs[i];
          if (!code) continue;
          var base = String(code).slice(0,2).toLowerCase();
          if (SUPPORTED.indexOf(base)!==-1) return base;
        }
        return 'en';
      }
      var KEY = 'site.lang';
      function getStoredLanguage(){
        try { return localStorage.getItem(KEY); } catch(e){ return null; }
      }
      function setStoredLanguage(l){
        try { localStorage.setItem(KEY, normalize(l)); } catch(e){}
      }
      function resolveInitialLanguage(){
        var fromSearch = getSearchLang(w.location && w.location.search);
        if (fromSearch) return fromSearch;
        var fromPath = getPathLang(w.location && w.location.pathname);
        if (fromPath) return fromPath;
        var fromStore = getStoredLanguage();
        if (fromStore) return normalize(fromStore);
        return detectBrowserLanguage(nav);
      }
      return { normalize: normalize, resolveInitialLanguage: resolveInitialLanguage, setStoredLanguage: setStoredLanguage };
    })();

    function applyLanguage(l){
      var lang = langUtil.normalize(l);
      d.documentElement.setAttribute('lang', lang);
      try { d.body && (d.body.dataset.lang = lang); } catch(e){}
      langUtil.setStoredLanguage(lang);
      // Make header links point to current URL with ?lang= toggles
      var links = d.querySelectorAll('[data-lang-link]');
      if (links && links.length){
        for (var i=0;i<links.length;i++){
          var el = links[i];
          var target = el.getAttribute('data-lang-link');
          var url = new URL(w.location.href);
          url.searchParams.set('lang', target);
          el.setAttribute('href', url.pathname + '?' + url.searchParams.toString());
        }
      }
      // Ensure all internal links preserve current lang unless explicitly set
      try {
        var all = d.querySelectorAll('a[href^="/"]:not([data-lang-link]):not([data-no-lang])');
        for (var j=0;j<all.length;j++){
          var a = all[j];
          var href = a.getAttribute('href');
          if (!href || href.indexOf('#') === 0) continue;
          // Skip if it's a file (e.g., .css, .js, .png)
          if (/\.(css|js|png|jpg|jpeg|webp|svg|gif|pdf)$/i.test(href)) continue;
          var url2 = new URL(href, w.location.origin);
          if (!url2.searchParams.get('lang')) url2.searchParams.set('lang', lang);
          a.setAttribute('href', url2.pathname + (url2.searchParams.toString()? ('?' + url2.searchParams.toString()) : '') + (url2.hash || ''));
        }
      } catch (e) {}
      // Dispatch a langchange event for other scripts
      try { d.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } })); } catch (e) {}
    }

    var initial = langUtil.resolveInitialLanguage();
    applyLanguage(initial);

    // Expose a simple global to switch language on click
    w.__setLang = function(l){ applyLanguage(l); };
  } catch (e) {
    // Fail silently; never block rendering
  }
})();
