/*
Client-side i18n for UI/static content.
- Reads translations from inline <script id="i18n-data" type="application/json"> in base.njk.
- Updates elements with [data-i18n-key] to the translated text.
- Supports simple attribute translation via [data-i18n-attr="attr:key,attr2:key2"].
- Listens to document 'langchange' event from lang-bootstrap and applies updates.
- Runs once on DOMContentLoaded.
*/
(function(){
  try {
    var d = document, w = window;

    function getCurrentLang(){
      var l = d.documentElement && d.documentElement.getAttribute('lang');
      return (l === 'es' || l === 'en') ? l : 'en';
    }

    function loadDict(){
      try {
        var el = d.getElementById('i18n-data');
        if (!el) return {};
        return JSON.parse(el.textContent || '{}');
      } catch (e) {
        return {};
      }
    }

    var DICT = loadDict();

    function get(obj, path){
      try {
        var parts = String(path).split('.');
        var cur = obj;
        for (var i=0;i<parts.length;i++){
          var k = parts[i];
          if (!cur || typeof cur !== 'object' || !(k in cur)) return '';
          cur = cur[k];
        }
        return (typeof cur === 'string') ? cur : '';
      } catch (e) { return ''; }
    }

    function t(key, lang){
      var l = (lang === 'es' || lang === 'en') ? lang : 'en';
      return get(DICT[l] || {}, key) || '';
    }

    function applyI18n(lang){
      var nodes = d.querySelectorAll('[data-i18n-key]');
      for (var i=0;i<nodes.length;i++){
        var el = nodes[i];
        var key = el.getAttribute('data-i18n-key');
        var txt = t(key, lang);
        if (txt) el.textContent = txt;
      }
      // Attributes mapping: data-i18n-attr="aria-label:key,title:key2"
      var attrNodes = d.querySelectorAll('[data-i18n-attr]');
      for (var j=0;j<attrNodes.length;j++){
        var el2 = attrNodes[j];
        var map = el2.getAttribute('data-i18n-attr');
        if (!map) continue;
        var pairs = map.split(',');
        for (var p=0;p<pairs.length;p++){
          var raw = pairs[p].trim();
          if (!raw) continue;
          var idx = raw.indexOf(':');
          if (idx === -1) continue;
          var attr = raw.slice(0, idx).trim();
          var key2 = raw.slice(idx+1).trim();
          var val = t(key2, lang);
          if (val) el2.setAttribute(attr, val);
        }
      }
      // Update document title if data-i18n-title is present on <title>
      try {
        var titleEl = d.querySelector('head > title[data-i18n-key]');
        if (titleEl){
          var k = titleEl.getAttribute('data-i18n-key');
          var v = t(k, lang);
          if (v) titleEl.textContent = v;
        }
      } catch (e) {}
    }

    function init(){
      applyI18n(getCurrentLang());
    }

    if (d.readyState === 'loading'){
      d.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
      init();
    }

    // React to language changes
    d.addEventListener('langchange', function(e){
      var l = (e && e.detail && e.detail.lang) || getCurrentLang();
      applyI18n(l);
    });
  } catch (e) {
    // no-op
  }
})();
