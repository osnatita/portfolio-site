/* Shared Tweaks app — mounted on the homepage and every case page so
   the same controls (and persisted values) work site-wide. */
(function () {
  const TWEAK_DEFAULTS = {
    showMetrics: true,
    typeScale: 1,
    density: 'regular'
  };
  const DENSITY = { compact: 0.82, regular: 1, comfy: 1.22 };

  const COPY = {
    en: { title: 'Tweaks', content: 'Content', showMetrics: 'Show metrics',
          typography: 'Typography', typeScale: 'Type scale', density: 'Density',
          densityOptions: ['compact', 'regular', 'comfy'] },
    fr: { title: 'Réglages', content: 'Contenu', showMetrics: 'Afficher les chiffres',
          typography: 'Typographie', typeScale: 'Taille du texte', density: 'Densité',
          densityOptions: ['compacte', 'normale', 'aérée'] }
  };
  const L = COPY[(document.documentElement.lang || 'en').slice(0, 2)] || COPY.en;
  /* the stored value stays English so the setting survives a language switch */
  const DENSITY_KEYS = ['compact', 'regular', 'comfy'];
  const toLabel = (k) => L.densityOptions[DENSITY_KEYS.indexOf(k)] || k;
  const toKey = (label) => DENSITY_KEYS[L.densityOptions.indexOf(label)] || label;

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    React.useEffect(() => {
      const r = document.documentElement;
      r.style.setProperty('--type-scale', String(t.typeScale));
      r.style.setProperty('--density', String(DENSITY[t.density] || 1));
      document.body.classList.toggle('no-metrics', !t.showMetrics);
      try { localStorage.setItem('jr:tweaks', JSON.stringify(t)); } catch (e) {}
    }, [t]);
    return (
      React.createElement(TweaksPanel, { title: L.title },
        React.createElement(TweakSection, { label: L.content }),
        React.createElement(TweakToggle, { label: L.showMetrics, value: t.showMetrics, onChange: (v) => setTweak('showMetrics', v) }),
        React.createElement(TweakSection, { label: L.typography }),
        React.createElement(TweakSlider, { label: L.typeScale, value: t.typeScale, min: 0.9, max: 1.15, step: 0.01, onChange: (v) => setTweak('typeScale', v) }),
        React.createElement(TweakRadio, { label: L.density, value: toLabel(t.density), options: L.densityOptions, onChange: (v) => setTweak('density', toKey(v)) })
      )
    );
  }
  const mount = document.getElementById('tweaks-root');
  if (mount) ReactDOM.createRoot(mount).render(React.createElement(App));
})();
