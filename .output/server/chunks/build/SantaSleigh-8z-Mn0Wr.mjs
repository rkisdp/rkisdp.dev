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
  __name: "SantaSleigh",
  __ssrInlineRender: true,
  setup(__props) {
    function generateRandomPath() {
      const minY = 10;
      const maxY = 65;
      const startY = Math.random() * (maxY - minY) + minY;
      const pattern = Math.random();
      let endY;
      if (pattern < 0.33) {
        endY = Math.min(maxY, startY + Math.random() * 20 + 5);
      } else if (pattern < 0.66) {
        endY = Math.max(minY, startY - Math.random() * 20 - 5);
      } else {
        endY = startY + (Math.random() * 15 - 7.5);
        endY = Math.max(minY, Math.min(maxY, endY));
      }
      const diagonalIntensity = Math.random();
      if (diagonalIntensity > 0.7) {
        const direction = Math.random() > 0.5 ? 1 : -1;
        endY = startY + direction * (Math.random() * 30 + 10);
        endY = Math.max(minY, Math.min(maxY, endY));
      }
      const movingRight = Math.random() > 0.5;
      const startX = movingRight ? -30 : 130;
      const endX = movingRight ? 130 : -30;
      return {
        startX,
        startY,
        endX,
        endY,
        duration: 5 + Math.random() * 5,
        // 5-10 seconds (even faster)
        verticalRange: 20 + Math.random() * 50,
        // 20-70px vertical bobbing
        movingRight
      };
    }
    const sleighPath = ref(generateRandomPath());
    const animationKey = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        key: animationKey.value,
        class: "sleigh-santa-container",
        style: {
          "--start-x": sleighPath.value.startX + "vw",
          "--start-y": sleighPath.value.startY + "vh",
          "--end-x": sleighPath.value.endX - sleighPath.value.startX + "vw",
          "--end-y": sleighPath.value.endY - sleighPath.value.startY + "vh",
          "--duration": sleighPath.value.duration + "s",
          "--vertical-range": sleighPath.value.verticalRange + "px",
          "--direction-scale": sleighPath.value.movingRight ? "1" : "-1"
        }
      }, _attrs))} data-v-9fba3ec8><div class="sleigh-santa" data-v-9fba3ec8><div class="santa santa--sleigh" data-v-9fba3ec8><div class="santa__hat" data-v-9fba3ec8><div class="santa__hat-part" data-v-9fba3ec8></div><div class="santa__hat-part" data-v-9fba3ec8></div></div><div class="santa__face" data-v-9fba3ec8><div class="santa__eyebrows santa__eyebrows--right" data-v-9fba3ec8></div><div class="santa__eyebrows santa__eyebrows--left" data-v-9fba3ec8></div><div class="santa__eye santa__eye--right" data-v-9fba3ec8></div><div class="santa__eye santa__eye--left" data-v-9fba3ec8></div><div class="santa__nose" data-v-9fba3ec8></div><div class="santa__cheek santa__cheek--right" data-v-9fba3ec8></div><div class="santa__cheek santa__cheek--left" data-v-9fba3ec8></div><div class="santa__beard" data-v-9fba3ec8><div class="santa__beard-part" data-v-9fba3ec8></div><div class="santa__beard-part" data-v-9fba3ec8></div><div class="santa__beard-part" data-v-9fba3ec8></div></div><div class="santa__mouth" data-v-9fba3ec8></div></div><div class="santa__body" data-v-9fba3ec8><div class="santa__body-top" data-v-9fba3ec8></div><div class="santa__hand santa__hand--left" data-v-9fba3ec8><div class="santa__hand-inner" data-v-9fba3ec8></div></div><div class="santa__hand santa__hand--right" data-v-9fba3ec8></div></div></div><div class="sleigh-feet" data-v-9fba3ec8></div><div class="lead" data-v-9fba3ec8><div class="lead-inner" data-v-9fba3ec8></div></div><div class="lead lead--back" data-v-9fba3ec8><div class="lead-inner" data-v-9fba3ec8></div></div><div class="reindeer" data-v-9fba3ec8><div class="reindeer__face" data-v-9fba3ec8><div class="reindeer__ear" data-v-9fba3ec8></div><div class="reindeer__horn reindeer__horn--right" data-v-9fba3ec8></div><div class="reindeer__horn reindeer__horn--left" data-v-9fba3ec8></div></div><div class="reindeer__body" data-v-9fba3ec8><div class="reindeer__foot reindeer__foot--front" data-v-9fba3ec8><div class="reindeer__foot-inner" data-v-9fba3ec8></div></div><div class="reindeer__foot reindeer__foot--front reindeer__foot--inside" data-v-9fba3ec8><div class="reindeer__foot-inner" data-v-9fba3ec8></div></div><div class="reindeer__foot reindeer__foot--back" data-v-9fba3ec8><div class="reindeer__foot-inner" data-v-9fba3ec8></div></div><div class="reindeer__foot reindeer__foot--back reindeer__foot--inside" data-v-9fba3ec8><div class="reindeer__foot-inner" data-v-9fba3ec8></div></div><div class="reindeer__tail" data-v-9fba3ec8></div><div class="reindeer__spots" data-v-9fba3ec8></div></div></div><div class="particles" data-v-9fba3ec8></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/themes/christmas/SantaSleigh.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SantaSleigh = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9fba3ec8"]]);

export { SantaSleigh as default };
//# sourceMappingURL=SantaSleigh-8z-Mn0Wr.mjs.map
