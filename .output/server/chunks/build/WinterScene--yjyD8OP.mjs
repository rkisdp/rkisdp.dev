import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
import SnowHills from './SnowHills-BuIHrVpr.mjs';
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
  __name: "WinterScene",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        align: "center",
        style: { "padding-top": "150px", "width": "100%", "overflow": "hidden", "position": "relative", "transform": "scale(1.25)", "transform-origin": "bottom center" },
        class: "fond"
      }, _attrs))} data-v-e94f8377><div class="contener_home_one" data-v-e94f8377><div class="fireplace" data-v-e94f8377>\xA0</div><div class="fireplace_top" data-v-e94f8377>\xA0</div><div class="triangle" data-v-e94f8377>\xA0</div><div class="parallelogram" data-v-e94f8377>\xA0</div><div class="door" data-v-e94f8377>\xA0</div><div class="window_one" data-v-e94f8377>\xA0</div><div class="window_two" data-v-e94f8377>\xA0</div><div class="home_base" data-v-e94f8377>\xA0</div><div class="home_base" style="${ssrRenderStyle({ "left": "-380px" })}" data-v-e94f8377>\xA0</div><div class="home_base" style="${ssrRenderStyle({ "left": "-380px" })}" data-v-e94f8377>\xA0</div><div class="window_two" style="${ssrRenderStyle({ "left": "-300px" })}" data-v-e94f8377>\xA0</div><div class="window_one" style="${ssrRenderStyle({ "left": "-360px" })}" data-v-e94f8377>\xA0</div><div class="door" style="${ssrRenderStyle({ "left": "-330px" })}" data-v-e94f8377>\xA0</div><div class="triangle" style="${ssrRenderStyle({ "left": "-385px" })}" data-v-e94f8377>\xA0</div><div class="parallelogram" style="${ssrRenderStyle({ "left": "-360px" })}" data-v-e94f8377>\xA0</div><div class="christmas_tree" data-v-e94f8377></div><div class="christmas_tree" style="${ssrRenderStyle({ "left": "-120px" })}" data-v-e94f8377></div><div class="christmas_tree_dos" style="${ssrRenderStyle({ "left": "-150px" })}" data-v-e94f8377></div><div class="christmas_tree_dos" style="${ssrRenderStyle({ "left": "-180px" })}" data-v-e94f8377></div><div class="christmas_tree" style="${ssrRenderStyle({ "left": "-210px" })}" data-v-e94f8377></div><div class="christmas_tree" style="${ssrRenderStyle({ "left": "-440px" })}" data-v-e94f8377></div><div class="christmas_tree_dos" style="${ssrRenderStyle({ "left": "-470px" })}" data-v-e94f8377></div><div class="christmas_tree_dos" style="${ssrRenderStyle({ "left": "-500px" })}" data-v-e94f8377></div><div class="christmas_tree" style="${ssrRenderStyle({ "left": "-520px" })}" data-v-e94f8377></div><div class="christmas_tree_dos" data-v-e94f8377></div><div class="christmas_tree_dos" style="${ssrRenderStyle({ "left": "225px" })}" data-v-e94f8377></div><div class="christmas_tree" style="${ssrRenderStyle({ "left": "400px" })}" data-v-e94f8377></div><div class="christmas_tree_dos" style="${ssrRenderStyle({ "left": "450px" })}" data-v-e94f8377></div><div class="christmas_tree" style="${ssrRenderStyle({ "left": "500px" })}" data-v-e94f8377></div></div><div class="contener_snow" data-v-e94f8377><div class="snowman" data-v-e94f8377><div class="body" id="scaled3" style="${ssrRenderStyle({ "left": "140px" })}" data-v-e94f8377><div class="head" data-v-e94f8377></div><div class="hat" data-v-e94f8377></div><div class="scarf" data-v-e94f8377></div><div class="buttons" data-v-e94f8377></div><div class="hands" data-v-e94f8377><div class="right-hand" data-v-e94f8377></div><div class="left-hand" data-v-e94f8377></div></div><div class="shadow" data-v-e94f8377></div></div></div></div><div style="${ssrRenderStyle({ "width": "100%", "height": "25px", "background-color": "#ffffff", "position": "relative", "z-index": "100" })}" data-v-e94f8377>\xA0</div><div style="${ssrRenderStyle({ "position": "absolute", "bottom": "25px", "left": "0", "width": "100%", "z-index": "-2" })}" data-v-e94f8377>`);
      _push(ssrRenderComponent(SnowHills, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/themes/christmas/WinterScene.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const WinterScene = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e94f8377"]]);

export { WinterScene as default };
//# sourceMappingURL=WinterScene--yjyD8OP.mjs.map
