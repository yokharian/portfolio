/*
Accessible language switcher progressive enhancement.
- Intercepts clicks on [data-lang-link] to switch language without reload.
- Uses window.__setLang (from lang-bootstrap) to apply language and persist.
- Updates URL ?lang= param via History API while preserving other params.
- Updates ARIA states (aria-current/aria-pressed) and visual classes for current language.
- Degrades gracefully: if JS is disabled, links still navigate with ?lang=.
*/
(function(){
  try {
    var w = window, d = document;

    function currentLang(){
      var l = d.documentElement && d.documentElement.getAttribute('lang');
      return (l === 'es' || l === 'en') ? l : 'en';
    }

    function updateURLParam(lang){
      try {
        var url = new URL(w.location.href);
        url.searchParams.set('lang', lang);
        // Preserve hash
        var newUrl = url.pathname + '?' + url.searchParams.toString() + (w.location.hash || '');
        w.history.replaceState({}, '', newUrl);
      } catch (e) {
        // ignore
      }
    }

    function updateSwitcherUI(lang){
      try {
        var links = d.querySelectorAll('[data-lang-link]');
        if (!links) return;
        for (var i=0;i<links.length;i++){
          var el = links[i];
          var target = el.getAttribute('data-lang-link');
          var isActive = target === lang;
          if (isActive){
            el.setAttribute('aria-current', 'true');
            el.setAttribute('aria-pressed', 'true');
            el.classList.add('text-sky-700','font-semibold');
          } else {
            el.removeAttribute('aria-current');
            el.setAttribute('aria-pressed', 'false');
            el.classList.remove('text-sky-700','font-semibold');
          }
        }
      } catch (e) {
        // no-op
      }
    }

    function onClick(e){
      var el = e.currentTarget;
      var target = el && el.getAttribute('data-lang-link');
      if (!target) return;
      e.preventDefault();
      try {
        if (typeof w.__setLang === 'function') w.__setLang(target);
        updateURLParam(target);
        updateSwitcherUI(target);
      } catch (e2) {
        // fallback to navigation if anything fails
        var href = el.getAttribute('href');
        if (href) w.location.href = href;
      }
    }

    function init(){
      var container = d.querySelector('[data-lang-switcher]');
      if (container){
        // accessibility attributes on container
        container.setAttribute('role', 'group');
        container.setAttribute('aria-label', 'Language selector');
      }
      var links = d.querySelectorAll('[data-lang-link]');
      for (var i=0;i<links.length;i++){
        var el = links[i];
        el.setAttribute('role','button');
        el.setAttribute('aria-pressed','false');
        el.addEventListener('click', onClick, false);
        el.addEventListener('keydown', function(ev){
          // Support Enter/Space for keyboard activation
          if (ev.key === 'Enter' || ev.key === ' '){
            ev.preventDefault();
            (ev.currentTarget || ev.target).click();
          }
        }, false);
      }
      updateSwitcherUI(currentLang());
    }

    if (d.readyState === 'loading'){
      d.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
      init();
    }
  } catch (e) {
    // fail silently
  }
})();
