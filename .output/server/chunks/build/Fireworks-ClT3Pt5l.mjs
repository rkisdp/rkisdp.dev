import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
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
  __name: "Fireworks",
  __ssrInlineRender: true,
  setup(__props) {
    const canvas = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<canvas${ssrRenderAttrs(mergeProps({
        ref_key: "canvas",
        ref: canvas,
        class: "fireworks-canvas"
      }, _attrs))} data-v-346caa71></canvas>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/themes/happy-new-year/Fireworks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Fireworks = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-346caa71"]]);

export { Fireworks as default };
//# sourceMappingURL=Fireworks-ClT3Pt5l.mjs.map
