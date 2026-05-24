import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-brands-svg-icons';
import '@fortawesome/free-solid-svg-icons';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DiwaliFooter",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "diwali-footer-effect w-full pointer-events-none z-10" }, _attrs))} data-v-2c6bc3ff><div class="diyas-row" data-v-2c6bc3ff><div class="diya-wrap" data-v-2c6bc3ff><div class="flame" data-v-2c6bc3ff></div><div class="diya-bowl" data-v-2c6bc3ff></div></div><div class="diya-wrap" data-v-2c6bc3ff><div class="flame" data-v-2c6bc3ff></div><div class="diya-bowl" data-v-2c6bc3ff></div></div><div class="diya-wrap" data-v-2c6bc3ff><div class="flame" data-v-2c6bc3ff></div><div class="diya-bowl" data-v-2c6bc3ff></div></div><div class="diya-wrap" data-v-2c6bc3ff><div class="flame" data-v-2c6bc3ff></div><div class="diya-bowl" data-v-2c6bc3ff></div></div><div class="diya-wrap" data-v-2c6bc3ff><div class="flame" data-v-2c6bc3ff></div><div class="diya-bowl" data-v-2c6bc3ff></div></div><div class="diya-wrap" data-v-2c6bc3ff><div class="flame" data-v-2c6bc3ff></div><div class="diya-bowl" data-v-2c6bc3ff></div></div><div class="diya-wrap" data-v-2c6bc3ff><div class="flame" data-v-2c6bc3ff></div><div class="diya-bowl" data-v-2c6bc3ff></div></div></div><div class="baluster-wrap" data-v-2c6bc3ff><div class="baluster-top-bar" data-v-2c6bc3ff></div><div class="lights-strip" data-v-2c6bc3ff><svg viewBox="0 0 1200 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" data-v-2c6bc3ff><defs data-v-2c6bc3ff><radialGradient id="bg-diwali" cx="50%" cy="50%" r="50%" data-v-2c6bc3ff><stop offset="0%" stop-color="#fffbe0" data-v-2c6bc3ff></stop><stop offset="35%" stop-color="#f8c030" data-v-2c6bc3ff></stop><stop offset="100%" stop-color="#e07810" stop-opacity="0" data-v-2c6bc3ff></stop></radialGradient><filter id="glow-diwali" x="-50%" y="-50%" width="200%" height="200%" data-v-2c6bc3ff><feGaussianBlur stdDeviation="3.5" result="b" data-v-2c6bc3ff></feGaussianBlur><feMerge data-v-2c6bc3ff><feMergeNode in="b" data-v-2c6bc3ff></feMergeNode><feMergeNode in="SourceGraphic" data-v-2c6bc3ff></feMergeNode></feMerge></filter></defs><path d="M0,8 Q50,36 100,14 Q150,40 200,14 Q250,40 300,14 Q350,40 400,14 Q450,40 500,14 Q550,40 600,14 Q650,40 700,14 Q750,40 800,14 Q850,40 900,14 Q950,40 1000,14 Q1050,40 1100,14 Q1150,40 1200,14" fill="none" stroke="rgba(160,80,220,0.4)" stroke-width="1.8" data-v-2c6bc3ff></path><g filter="url(#glow-diwali)" data-v-2c6bc3ff><circle class="bulb" cx="50" cy="36" r="8.5" fill="url(#bg-diwali)" data-v-2c6bc3ff></circle><circle class="bulb" cx="150" cy="40" r="8.5" fill="url(#bg-diwali)" data-v-2c6bc3ff></circle><circle class="bulb" cx="250" cy="40" r="8.5" fill="url(#bg-diwali)" data-v-2c6bc3ff></circle><circle class="bulb" cx="350" cy="40" r="8.5" fill="url(#bg-diwali)" data-v-2c6bc3ff></circle><circle class="bulb" cx="450" cy="40" r="8.5" fill="url(#bg-diwali)" data-v-2c6bc3ff></circle><circle class="bulb" cx="550" cy="40" r="8.5" fill="url(#bg-diwali)" data-v-2c6bc3ff></circle><circle class="bulb" cx="650" cy="40" r="8.5" fill="url(#bg-diwali)" data-v-2c6bc3ff></circle><circle class="bulb" cx="750" cy="40" r="8.5" fill="url(#bg-diwali)" data-v-2c6bc3ff></circle><circle class="bulb" cx="850" cy="40" r="8.5" fill="url(#bg-diwali)" data-v-2c6bc3ff></circle><circle class="bulb" cx="950" cy="40" r="8.5" fill="url(#bg-diwali)" data-v-2c6bc3ff></circle><circle class="bulb" cx="1050" cy="40" r="8.5" fill="url(#bg-diwali)" data-v-2c6bc3ff></circle><circle class="bulb" cx="1150" cy="40" r="8.5" fill="url(#bg-diwali)" data-v-2c6bc3ff></circle><circle class="bulb" cx="100" cy="14" r="6" fill="url(#bg-diwali)" opacity=".8" data-v-2c6bc3ff></circle><circle class="bulb" cx="200" cy="14" r="6" fill="url(#bg-diwali)" opacity=".8" data-v-2c6bc3ff></circle><circle class="bulb" cx="300" cy="14" r="6" fill="url(#bg-diwali)" opacity=".8" data-v-2c6bc3ff></circle><circle class="bulb" cx="400" cy="14" r="6" fill="url(#bg-diwali)" opacity=".8" data-v-2c6bc3ff></circle><circle class="bulb" cx="500" cy="14" r="6" fill="url(#bg-diwali)" opacity=".8" data-v-2c6bc3ff></circle><circle class="bulb" cx="600" cy="14" r="6" fill="url(#bg-diwali)" opacity=".8" data-v-2c6bc3ff></circle><circle class="bulb" cx="700" cy="14" r="6" fill="url(#bg-diwali)" opacity=".8" data-v-2c6bc3ff></circle><circle class="bulb" cx="800" cy="14" r="6" fill="url(#bg-diwali)" opacity=".8" data-v-2c6bc3ff></circle><circle class="bulb" cx="900" cy="14" r="6" fill="url(#bg-diwali)" opacity=".8" data-v-2c6bc3ff></circle><circle class="bulb" cx="1000" cy="14" r="6" fill="url(#bg-diwali)" opacity=".8" data-v-2c6bc3ff></circle><circle class="bulb" cx="1100" cy="14" r="6" fill="url(#bg-diwali)" opacity=".8" data-v-2c6bc3ff></circle><circle class="bulb" cx="1200" cy="14" r="6" fill="url(#bg-diwali)" opacity=".8" data-v-2c6bc3ff></circle></g></svg></div><div class="balusters-row" data-v-2c6bc3ff><div class="baluster" data-v-2c6bc3ff></div><div class="baluster" data-v-2c6bc3ff></div><div class="baluster" data-v-2c6bc3ff></div><div class="baluster" data-v-2c6bc3ff></div><div class="baluster" data-v-2c6bc3ff></div><div class="baluster" data-v-2c6bc3ff></div><div class="baluster" data-v-2c6bc3ff></div><div class="baluster" data-v-2c6bc3ff></div><div class="baluster" data-v-2c6bc3ff></div><div class="baluster" data-v-2c6bc3ff></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/themes/diwali/DiwaliFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DiwaliFooter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2c6bc3ff"]]);

export { DiwaliFooter as default };
//# sourceMappingURL=DiwaliFooter-DBcjOwT0.mjs.map
