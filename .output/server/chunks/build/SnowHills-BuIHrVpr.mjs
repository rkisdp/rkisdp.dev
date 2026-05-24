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
  __name: "SnowHills",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mountains" }, _attrs))} data-v-adcdbaa1><div class="mt1" data-v-adcdbaa1><div class="mtsnow1" data-v-adcdbaa1></div><div class="snow-peak-1a" data-v-adcdbaa1></div><div class="snow-peak-1b" data-v-adcdbaa1></div></div><div class="mt2" data-v-adcdbaa1><div class="snow2" data-v-adcdbaa1></div><div class="snow-peak-2a" data-v-adcdbaa1></div><div class="snow-peak-2b" data-v-adcdbaa1></div><div class="snow-peak-2c" data-v-adcdbaa1></div></div><div class="mt3" data-v-adcdbaa1><div class="snow3" data-v-adcdbaa1></div><div class="snow-peak-3a" data-v-adcdbaa1></div><div class="snow-peak-3b" data-v-adcdbaa1></div><div class="snow-peak-3c" data-v-adcdbaa1></div><div class="snow-peak-3d" data-v-adcdbaa1></div></div><div class="mt4" data-v-adcdbaa1><div class="snow4" data-v-adcdbaa1></div><div class="snow-peak-4a" data-v-adcdbaa1></div><div class="snow-peak-4b" data-v-adcdbaa1></div></div><div class="mt5" data-v-adcdbaa1><div class="snow5" data-v-adcdbaa1></div><div class="snow-peak-5a" data-v-adcdbaa1></div><div class="snow-peak-5b" data-v-adcdbaa1></div><div class="snow-peak-5c" data-v-adcdbaa1></div></div><div class="mt6" data-v-adcdbaa1><div class="snow6" data-v-adcdbaa1></div><div class="snow-peak-6a" data-v-adcdbaa1></div><div class="snow-peak-6b" data-v-adcdbaa1></div><div class="snow-peak-6c" data-v-adcdbaa1></div><div class="snow-peak-6d" data-v-adcdbaa1></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/themes/christmas/SnowHills.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SnowHills = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-adcdbaa1"]]);

export { SnowHills as default };
//# sourceMappingURL=SnowHills-BuIHrVpr.mjs.map
