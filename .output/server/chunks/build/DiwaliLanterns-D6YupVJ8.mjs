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
  __name: "DiwaliLanterns",
  __ssrInlineRender: true,
  setup(__props) {
    const skyRef = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "sky",
        ref_key: "skyRef",
        ref: skyRef,
        class: "diwali-sky fixed inset-0 pointer-events-none z-[1]"
      }, _attrs))} data-v-dd9e4aca></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/themes/diwali/DiwaliLanterns.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DiwaliLanterns = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd9e4aca"]]);

export { DiwaliLanterns as default };
//# sourceMappingURL=DiwaliLanterns-D6YupVJ8.mjs.map
