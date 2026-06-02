/* Shared Tweaks app — mounted on the homepage and every case page so
   the same controls (and persisted values) work site-wide. */
(function () {
  const TWEAK_DEFAULTS = {
    showMetrics: true,
    typeScale: 1,
    density: 'regular'
  };
  const DENSITY = { compact: 0.82, regular: 1, comfy: 1.22 };

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
      React.createElement(TweaksPanel, { title: 'Tweaks' },
        React.createElement(TweakSection, { label: 'Content' }),
        React.createElement(TweakToggle, { label: 'Show metrics', value: t.showMetrics, onChange: (v) => setTweak('showMetrics', v) }),
        React.createElement(TweakSection, { label: 'Typography' }),
        React.createElement(TweakSlider, { label: 'Type scale', value: t.typeScale, min: 0.9, max: 1.15, step: 0.01, onChange: (v) => setTweak('typeScale', v) }),
        React.createElement(TweakRadio, { label: 'Density', value: t.density, options: ['compact', 'regular', 'comfy'], onChange: (v) => setTweak('density', v) })
      )
    );
  }
  const mount = document.getElementById('tweaks-root');
  if (mount) ReactDOM.createRoot(mount).render(React.createElement(App));
})();
