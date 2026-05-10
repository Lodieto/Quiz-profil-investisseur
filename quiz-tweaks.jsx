// Tweaks for the quiz
const { useState: useStateT, useEffect: useEffectT } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryAccent": "turquoise",
  "introLayout": "card",
  "scaleStyle": "buttons",
  "showRadar": true,
  "showRanking": true,
  "showPortrait": true,
  "fontDisplay": "satoshi"
}/*EDITMODE-END*/;

function useTweaks(defaults) {
  const [t, setT] = useStateT(defaults);
  useEffectT(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__edit_mode_apply_keys' && e.data.edits) {
        setT(prev => ({ ...prev, ...e.data.edits }));
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const setTweak = (key, value) => {
    let edits;
    if (typeof key === 'object') edits = key;
    else edits = { [key]: value };
    setT(prev => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  };
  return [t, setTweak];
}

window.QUIZ_TWEAKS = { TWEAK_DEFAULTS, useTweaks };
