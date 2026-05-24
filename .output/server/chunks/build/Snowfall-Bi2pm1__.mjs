import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "Snowfall",
  __ssrInlineRender: true,
  setup(__props) {
    const flakes = ref([]);
    (void 0).innerWidth < 768 ? 20 : 50;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "snowfall-container fixed inset-0 pointer-events-none z-30 overflow-hidden" }, _attrs))} data-v-2e1e0bf9><!--[-->`);
      ssrRenderList(flakes.value, (flake) => {
        _push(`<div class="snowflake" style="${ssrRenderStyle({
          left: flake.left + "%",
          animationDuration: flake.duration + "s",
          animationDelay: flake.delay + "s",
          opacity: flake.opacity,
          fontSize: `${flake.size}em`
        })}" data-v-2e1e0bf9> \u2744 </div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/themes/christmas/Snowfall.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Snowfall = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2e1e0bf9"]]);

export { Snowfall as default };
//# sourceMappingURL=Snowfall-Bi2pm1__.mjs.map
