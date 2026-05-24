import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { computed, hasInjectionContext, getCurrentInstance, toRef, isRef, defineAsyncComponent, defineComponent, createElementBlock, shallowRef, provide, cloneVNode, h, useSSRContext, createApp, ref, resolveComponent, mergeProps, watch, unref, createVNode, resolveDynamicComponent, onErrorCaptured, onServerPrefetch, shallowReactive, reactive, effectScope, inject, getCurrentScope, nextTick, isReadonly, isShallow, isReactive, toRaw } from 'vue';
import { s as parseURL, g as encodePath, d as decodePath, m as hasProtocol, o as isScriptProtocol, q as joinURL, B as withQuery, t as sanitizeStatusCode, h as getContext, $ as $fetch, a as createHooks, c as createError$1, n as isEqual, v as stringifyParsedURL, w as stringifyQuery, r as parseQuery, e as defu } from '../_/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGithub, faLinkedin, faMedium, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faEnvelope, faBars, faQuoteLeft, faChevronLeft, faChevronRight, faTimes, faArrowRight, faArrowLeft, faBriefcase, faSleigh, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderVNode, ssrRenderSuspense } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.21.6";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin) {
    const unresolvedPluginsForThisPlugin = plugin.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin).then(async () => {
        if (plugin._name) {
          resolvedPlugins.add(plugin._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin._name)) {
              dependsOn.delete(plugin._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin);
  }
  for (const plugin of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  const _name = plugin._name || plugin.name;
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
const HTML_ATTR_ENCODE_MAP = {
  "&": "%26",
  '"': "%22",
  "'": "%27",
  "<": "%3C",
  ">": "%3E"
};
function encodeForHtmlAttr(value) {
  return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = encodeForHtmlAttr(location2);
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext["~renderResponse"] = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
  return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
function encodeRoutePath(url) {
  const parsed = parseURL(url);
  return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  if (typeof error !== "string" && error.statusText) {
    error.message ??= error.statusText;
  }
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  Object.defineProperty(nuxtError, "status", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusCode,
    configurable: true
  });
  Object.defineProperty(nuxtError, "statusText", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusMessage,
    configurable: true
  });
  return nuxtError;
};
function freezeHead(head) {
  const realPush = head.push;
  head.push = () => ({ dispose: () => {
  }, patch: () => {
  }, _poll: () => {
  } });
  return () => {
    head.push = realPush;
  };
}
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    if (nuxtApp.ssrContext.islandContext) {
      const unfreeze = freezeHead(head);
      nuxtApp.hooks.hookOnce("app:created", unfreeze);
    }
    nuxtApp.vueApp.use(head);
  }
});
const matcher = (m, p) => {
  return [];
};
const _routeRulesMatcher = (path) => defu({}, ...matcher().map((r) => r.data).reverse());
const routeRulesMatcher = _routeRulesMatcher;
function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher(path);
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  {
    return;
  }
});
const globalMiddleware = [
  manifest_45route_45rule
];
function getRouteFromPath(fullPath) {
  const route = fullPath && typeof fullPath === "object" ? fullPath : {};
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = new URL(fullPath.toString(), "http://localhost");
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: route.params || {},
    name: void 0,
    matched: route.matched || [],
    redirectedFrom: void 0,
    meta: route.meta || {},
    href: fullPath
  };
}
const router_DclsWNDeVV7SyG4lslgLnjbQUK1ws8wgf2FHaAbo7Cw = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      "error": []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
    };
    (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    async function handleNavigation(url, replace) {
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (result === false || result instanceof Error) {
            return;
          }
          if (typeof result === "string" && result.length) {
            return await handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
        }
        Object.assign(route, to);
        if (false) ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const currentRoute = computed(() => route);
    const router = {
      currentRoute,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url),
      replace: (url) => handleNavigation(url),
      back: () => (void 0).history.go(-1),
      go: (delta) => (void 0).history.go(delta),
      forward: () => (void 0).history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", defineComponent({
      functional: true,
      props: {
        to: {
          type: String,
          required: true
        },
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate = () => handleNavigation(props.to, props.replace);
        return () => {
          const route2 = router.resolve(props.to);
          return props.custom ? slots.default?.({ href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate();
          } }, slots);
        };
      }
    }));
    nuxtApp._route = route;
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    const initialLayout = nuxtApp.payload.state._layout;
    const initialLayoutProps = nuxtApp.payload.state._layoutProps;
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout;
          to.meta.layoutProps = initialLayoutProps;
        }
        nuxtApp._processingMiddleware = true;
        if (!nuxtApp.ssrContext?.islandContext) {
          const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
          const routeRules = getRouteRules({ path: to.path });
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              const guard = nuxtApp._middleware.named[key];
              if (!guard) {
                continue;
              }
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(guard);
              } else {
                middlewareEntries.delete(guard);
              }
            }
          }
          for (const middleware of middlewareEntries) {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            {
              if (result === false || result instanceof Error) {
                const error = result || createError$1({
                  status: 404,
                  statusText: `Page Not Found: ${initialURL}`,
                  data: {
                    path: initialURL
                  }
                });
                delete nuxtApp._processingMiddleware;
                return nuxtApp.runWithContext(() => showError(error));
              }
            }
            if (result === true) {
              continue;
            }
            if (result || result === false) {
              return result;
            }
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
config.autoAddCss = false;
library.add(
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
  faDownload,
  faEnvelope,
  faBars,
  faQuoteLeft,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faArrowRight,
  faArrowLeft,
  faBriefcase,
  faSleigh,
  faCommentDots
);
const fontawesome_5uStEFTJm4cawYMSR_rnJXswHze0j_ax25kz1QsQrC8 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  router_DclsWNDeVV7SyG4lslgLnjbQUK1ws8wgf2FHaAbo7Cw,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4,
  fontawesome_5uStEFTJm4cawYMSR_rnJXswHze0j_ax25kz1QsQrC8
];
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Navigation",
  __ssrInlineRender: true,
  setup(__props) {
    const navItems = [
      { name: "Highlights", href: "#impact" },
      { name: "Skills", href: "#skills" },
      { name: "Experience", href: "#experience" },
      { name: "Education", href: "#education" },
      { name: "Articles", href: "#articles" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "Contact", href: "#contact" }
    ];
    const activeSection = ref("");
    const mobileMenuOpen = ref(false);
    const isScrolled = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: ["fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-xl border-2 md:border-[3px] border-black bg-slate-900 shadow-[4px_4px_0_0_#7000FF] transition-all duration-300", { "py-2.5": isScrolled.value, "py-4": !isScrolled.value }]
      }, _attrs))}><div class="flex items-center justify-between px-6"><div class="flex-shrink-0"><a href="/" class="text-2xl font-black text-white font-mono hover:opacity-80 transition-opacity"> DP </a></div><button class="md:hidden border-2 border-black bg-[#FFDE47] text-black w-10 h-10 rounded-lg flex items-center justify-center shadow-[2px_2px_0_0_#000] active:translate-y-[1px] active:shadow-[1px_1px_0_0_#000] transition-all" aria-label="Toggle menu">`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fas", "bars"],
        size: "lg"
      }, null, _parent));
      _push(`</button><ul class="hidden md:flex items-center space-x-2"><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(`<li><a${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([activeSection.value === item.href ? "bg-[#FFDE47] text-black border-2 border-black shadow-[2px_2px_0_0_#000]" : "text-gray-300 hover:text-white", "px-3.5 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 inline-block"])}">${ssrInterpolate(item.name)}</a></li>`);
      });
      _push(`<!--]--></ul><div class="hidden md:flex items-center space-x-4 pl-4 border-l border-black"><a href="https://www.linkedin.com/in/rkisdp/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="text-gray-300 hover:text-[#00D4FF] transition-colors transform hover:scale-110 duration-300">`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fab", "linkedin"],
        size: "lg"
      }, null, _parent));
      _push(`</a><a href="https://github.com/rkisdp" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="text-gray-300 hover:text-white transition-colors transform hover:scale-110 duration-300">`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fab", "github"],
        size: "lg"
      }, null, _parent));
      _push(`</a></div></div>`);
      if (mobileMenuOpen.value) {
        _push(`<div class="absolute top-full left-0 right-0 mt-2 mx-auto w-full bg-slate-900 rounded-xl border-2 md:border-3 border-black p-4 flex flex-col space-y-2 md:hidden shadow-[4px_4px_0_0_#7000FF]"><!--[-->`);
        ssrRenderList(navItems, (item) => {
          _push(`<a${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([activeSection.value === item.href ? "bg-[#FFDE47] text-black border-black shadow-[2px_2px_0_0_#000]" : "text-gray-300 border-transparent hover:bg-slate-800", "px-4 py-2.5 rounded-lg text-center font-bold transition-all border-2"])}">${ssrInterpolate(item.name)}</a>`);
        });
        _push(`<!--]--><div class="flex justify-center space-x-6 pt-4 border-t border-black"><a href="https://www.linkedin.com/in/rkisdp/" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-[#00D4FF] transition-colors">`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fab", "linkedin"],
          size: "xl"
        }, null, _parent));
        _push(`</a><a href="https://github.com/rkisdp" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-white transition-colors">`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fab", "github"],
          size: "xl"
        }, null, _parent));
        _push(`</a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navigation.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const PADDING = 60;
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "PaintSplashText",
  __ssrInlineRender: true,
  props: {
    text: {},
    colors: {}
  },
  setup(__props) {
    const props = __props;
    const COLORS = props.colors || [];
    const measureRef = ref(null);
    const canvasRef = ref(null);
    function randomColor() {
      if (COLORS.length > 0) {
        return COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      const h2 = Math.random() * 360 | 0;
      const s = 80 + Math.random() * 20 | 0;
      const l = 42 + Math.random() * 18 | 0;
      return `hsl(${h2},${s}%,${l}%)`;
    }
    function drawSplash(octx, x, y, size) {
      octx.save();
      octx.translate(x, y);
      octx.rotate(Math.random() * Math.PI * 2);
      octx.beginPath();
      const pts = 10 + (Math.random() * 8 | 0);
      for (let i = 0; i <= pts; i++) {
        const a = i / pts * Math.PI * 2;
        const r = size * (0.5 + Math.random() * 0.7);
        i === 0 ? octx.moveTo(Math.cos(a) * r, Math.sin(a) * r) : octx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      octx.closePath();
      octx.fill();
      const drips = 3 + (Math.random() * 5 | 0);
      for (let d = 0; d < drips; d++) {
        const a = Math.random() * Math.PI * 2;
        const dst = size * (0.3 + Math.random() * 0.9);
        const cx = Math.cos(a) * dst;
        const cy = Math.sin(a) * dst;
        const sr = size * (0.05 + Math.random() * 0.18);
        octx.beginPath();
        octx.arc(cx, cy, sr, 0, Math.PI * 2);
        octx.fill();
        if (Math.random() > 0.4) {
          octx.save();
          octx.translate(cx, cy);
          octx.rotate(a + Math.PI / 2 + (Math.random() - 0.5) * 0.8);
          octx.scale(1, 1 + Math.random() * 3);
          octx.beginPath();
          octx.arc(0, 0, sr * 0.7, 0, Math.PI * 2);
          octx.fill();
          octx.restore();
        }
      }
      const dots = 8 + (Math.random() * 12 | 0);
      for (let i = 0; i < dots; i++) {
        const a = Math.random() * Math.PI * 2;
        const dst = size * (0.6 + Math.random() * 1.4);
        octx.beginPath();
        octx.arc(
          Math.cos(a) * dst,
          Math.sin(a) * dst,
          size * 0.02 + Math.random() * size * 0.05,
          0,
          Math.PI * 2
        );
        octx.fill();
      }
      octx.restore();
    }
    function render() {
      if (!measureRef.value || !canvasRef.value) return;
      const style = (void 0).getComputedStyle(measureRef.value);
      const fontString = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const letterSpacing = parseFloat(style.letterSpacing) || 0;
      const offscreenCanvas = (void 0).createElement("canvas");
      const offCtx = offscreenCanvas.getContext("2d");
      if (!offCtx) return;
      offCtx.font = fontString;
      const chars = [...props.text];
      const metrics = chars.map((ch) => {
        const m = offCtx.measureText(ch);
        return {
          width: m.width,
          ascent: m.actualBoundingBoxAscent,
          descent: m.actualBoundingBoxDescent
        };
      });
      const totalW = metrics.reduce((a, b) => a + b.width, 0) + letterSpacing * (chars.length - 1);
      const maxAscent = Math.max(...metrics.map((m) => m.ascent));
      const maxDescent = Math.max(...metrics.map((m) => m.descent));
      const textHeight = maxAscent + maxDescent;
      const canvas = canvasRef.value;
      canvas.width = totalW + PADDING * 2;
      canvas.height = textHeight + PADDING * 2;
      canvas.style.width = totalW + PADDING * 2 + "px";
      canvas.style.height = textHeight + PADDING * 2 + "px";
      canvas.style.left = "50%";
      canvas.style.top = "50%";
      canvas.style.transform = `translate(-50%, -50%)`;
      const W = canvas.width;
      const H = canvas.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const maskC = (void 0).createElement("canvas");
      maskC.width = W;
      maskC.height = H;
      const maskCtx = maskC.getContext("2d");
      if (!maskCtx) return;
      maskCtx.font = fontString;
      maskCtx.textBaseline = "alphabetic";
      maskCtx.fillStyle = "white";
      const baselineY = PADDING + maxAscent;
      let drawX = PADDING;
      chars.forEach((ch, i) => {
        maskCtx.fillText(ch, drawX, baselineY);
        drawX += metrics[i].width + letterSpacing;
      });
      const baseC = (void 0).createElement("canvas");
      baseC.width = W;
      baseC.height = H;
      const baseCtx = baseC.getContext("2d");
      if (!baseCtx) return;
      baseCtx.font = fontString;
      baseCtx.textBaseline = "alphabetic";
      const baseColor = COLORS.length > 0 ? COLORS[0] : "#ffffff";
      baseCtx.fillStyle = baseColor;
      baseCtx.globalAlpha = 0.15;
      let baseDrawX = PADDING;
      chars.forEach((ch, i) => {
        baseCtx.fillText(ch, baseDrawX, baselineY);
        baseDrawX += metrics[i].width + letterSpacing;
      });
      const splashC = (void 0).createElement("canvas");
      splashC.width = W;
      splashC.height = H;
      const splashCtx = splashC.getContext("2d");
      if (!splashCtx) return;
      const total = 180 + (Math.random() * 60 | 0);
      for (let i = 0; i < total; i++) {
        splashCtx.fillStyle = randomColor();
        const randomCharIdx = Math.floor(Math.random() * chars.length);
        let charX = PADDING;
        for (let j = 0; j < randomCharIdx; j++) charX += metrics[j].width + letterSpacing;
        charX += metrics[randomCharIdx].width / 2;
        const sX = charX + (Math.random() - 0.5) * metrics[randomCharIdx].width * 1.5;
        const sY = baselineY - maxAscent / 2 + (Math.random() - 0.5) * textHeight * 1.2;
        drawSplash(
          splashCtx,
          sX,
          sY,
          10 + Math.random() * 40
        );
      }
      splashCtx.globalCompositeOperation = "destination-in";
      splashCtx.drawImage(maskC, 0, 0);
      splashCtx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(baseC, 0, 0);
      ctx.drawImage(splashC, 0, 0);
    }
    watch(() => props.text, () => {
      if ((void 0).fonts) {
        (void 0).fonts.ready.then(render);
      } else {
        render();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "splash-wrapper" }, _attrs))} data-v-f14c914a><h1 class="splash-text" data-v-f14c914a>${ssrInterpolate(__props.text)}</h1><canvas data-v-f14c914a></canvas></div>`);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/themes/holi/PaintSplashText.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const PaintSplashText = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-f14c914a"]]);
const PaintSplashText$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PaintSplashText
}, Symbol.toStringTag, { value: "Module" }));
const __variableDynamicImportRuntimeHelper = (glob$1, path$13, segs) => {
  const v = glob$1[path$13];
  if (v) return typeof v === "function" ? v() : Promise.resolve(v);
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, /* @__PURE__ */ new Error("Unknown variable dynamic import: " + path$13 + (path$13.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : ""))));
  });
};
var ThemeId = /* @__PURE__ */ ((ThemeId2) => {
  ThemeId2["DEFAULT"] = "default";
  ThemeId2["CHRISTMAS"] = "christmas";
  ThemeId2["HAPPY_NEW_YEAR"] = "happy-new-year";
  ThemeId2["HOLI"] = "holi";
  ThemeId2["DIWALI"] = "diwali";
  return ThemeId2;
})(ThemeId || {});
const THEME_COMPONENTS = {
  // Christmas
  SNOWFALL: "Snowfall",
  SANTA_SLEIGH: "SantaSleigh",
  WINTER_SCENE: "WinterScene",
  // New Year
  CONFETTI: "Confetti",
  FIREWORKS: "Fireworks",
  // Holi
  PAINT_SPLASH_TEXT: "PaintSplashText",
  // Diwali
  DIWALI_FOOTER: "DiwaliFooter",
  DIWALI_LANTERNS: "DiwaliLanterns"
};
const createThemeComponent = (theme, name, isGlobal = true) => ({
  name,
  isGlobal,
  component: defineAsyncComponent(() => __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../components/themes/christmas/SantaSleigh.vue": () => import('./SantaSleigh-8z-Mn0Wr.mjs'), "../components/themes/christmas/SnowHills.vue": () => import('./SnowHills-BuIHrVpr.mjs'), "../components/themes/christmas/Snowfall.vue": () => import('./Snowfall-Bi2pm1__.mjs'), "../components/themes/christmas/WinterScene.vue": () => import('./WinterScene--yjyD8OP.mjs'), "../components/themes/diwali/DiwaliFooter.vue": () => import('./DiwaliFooter-DBcjOwT0.mjs'), "../components/themes/diwali/DiwaliLanterns.vue": () => import('./DiwaliLanterns-D6YupVJ8.mjs'), "../components/themes/happy-new-year/Confetti.vue": () => import('./Confetti-B0bsH6ji.mjs'), "../components/themes/happy-new-year/Fireworks.vue": () => import('./Fireworks-ClT3Pt5l.mjs'), "../components/themes/holi/PaintSplashText.vue": () => Promise.resolve().then(() => PaintSplashText$1) }), `../components/themes/${theme}/${name}.vue`, 5))
});
class ThemeFactory {
  /**
   * A registry of available themes. 
   * Themes can include global background components or section-specific decorative elements.
   */
  static themes = {
    [ThemeId.DEFAULT]: {
      id: ThemeId.DEFAULT,
      name: "Default",
      components: []
    },
    [ThemeId.CHRISTMAS]: {
      id: ThemeId.CHRISTMAS,
      name: "Christmas",
      components: [
        createThemeComponent("christmas", THEME_COMPONENTS.SNOWFALL),
        createThemeComponent("christmas", THEME_COMPONENTS.SANTA_SLEIGH),
        createThemeComponent("christmas", THEME_COMPONENTS.WINTER_SCENE, false)
        // Section-specific component
      ]
    },
    [ThemeId.HAPPY_NEW_YEAR]: {
      id: ThemeId.HAPPY_NEW_YEAR,
      name: "Happy New Year",
      components: [
        createThemeComponent("happy-new-year", THEME_COMPONENTS.CONFETTI),
        createThemeComponent("happy-new-year", THEME_COMPONENTS.FIREWORKS)
      ]
    },
    [ThemeId.HOLI]: {
      id: ThemeId.HOLI,
      name: "Holi",
      components: [
        createThemeComponent("holi", THEME_COMPONENTS.PAINT_SPLASH_TEXT, false)
      ],
      config: {
        colors: ["#5bc8af", "#F05A54", "#54F09B", "#F59616", "#F0E456", "#ACA1F5"]
      }
    },
    [ThemeId.DIWALI]: {
      id: ThemeId.DIWALI,
      name: "Diwali",
      components: [
        createThemeComponent("diwali", THEME_COMPONENTS.DIWALI_FOOTER, false),
        createThemeComponent("diwali", THEME_COMPONENTS.DIWALI_LANTERNS, true),
        createThemeComponent("happy-new-year", THEME_COMPONENTS.FIREWORKS, true)
      ]
    }
  };
  /**
   * Retrieves the theme configuration for a given theme ID.
   * 
   * @param id - The identifier of the theme to retrieve.
   * @returns The theme configuration object, defaulting to the base theme if the ID is unrecognized.
   */
  static getTheme(id) {
    return this.themes[id] || this.themes[ThemeId.DEFAULT];
  }
}
function useTheme() {
  const currentThemeId = useState("themeId", () => ThemeId.DEFAULT);
  const currentThemePhase = useState("themePhase", () => "initial");
  const currentTheme = computed(() => ThemeFactory.getTheme(currentThemeId.value));
  const setTheme = (id) => {
    currentThemeId.value = id;
    if (id === ThemeId.HAPPY_NEW_YEAR) {
      currentThemePhase.value = "confetti-spawning";
    } else {
      currentThemePhase.value = "initial";
    }
  };
  const setThemePhase = (phase) => {
    currentThemePhase.value = phase;
  };
  const getThemeComponent = (componentName) => {
    return currentTheme.value.components.find((c) => c.name === componentName);
  };
  return {
    currentThemeId,
    currentTheme,
    currentThemePhase,
    setTheme,
    setThemePhase,
    getThemeComponent
  };
}
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentTheme, currentThemeId } = useTheme();
    const opacity = ref(0);
    const currentTypedText = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section relative flex flex-col items-center justify-center overflow-hidden min-h-screen" }, _attrs))} data-v-c7aa32a4><div class="h-full w-full flex flex-col items-center justify-center z-10" data-v-c7aa32a4><div class="w-full max-w-7xl px-4 flex flex-col items-center text-center" data-v-c7aa32a4><h2 class="text-[#FFDE47] font-mono mb-4 tracking-wider text-sm sm:text-base animate-fade-in-up" style="${ssrRenderStyle({ opacity: Math.min(1, opacity.value * 2), transform: `translateY(${(1 - opacity.value) * 20}px)` })}" data-v-c7aa32a4> HELLO, I AM </h2>`);
      if (unref(currentThemeId) === unref(ThemeId).HOLI) {
        _push(`<h1 style="${ssrRenderStyle({
          opacity: opacity.value,
          transform: `scale(${0.9 + opacity.value * 0.1})`,
          transition: "opacity 1.5s ease-out, transform 1.5s ease-out"
        })}" class="text-5xl sm:text-7xl md:text-9xl mb-6" data-v-c7aa32a4>`);
        _push(ssrRenderComponent(PaintSplashText, {
          text: "DIVYA PRAKASH",
          colors: unref(currentTheme).config?.colors
        }, null, _parent));
        _push(`</h1>`);
      } else {
        _push(`<h1 class="text-4xl sm:text-6xl md:text-8xl font-black text-black tracking-tighter uppercase mb-6 inline-block bg-[#00D4FF] border-3 md:border-4 border-black px-6 py-3 rotate-[-1deg] shadow-[6px_6px_0_0_#000]" style="${ssrRenderStyle({
          opacity: opacity.value,
          transform: `scale(${0.9 + opacity.value * 0.1}) rotate(-1deg)`,
          transition: "opacity 1.5s ease-out, transform 1.5s ease-out"
        })}" data-v-c7aa32a4> DIVYA PRAKASH </h1>`);
      }
      _push(`<div class="border-2 md:border-3 border-black bg-slate-900 rounded-xl shadow-[4px_4px_0_0_#7000FF] max-w-lg mx-auto w-full overflow-hidden text-left" style="${ssrRenderStyle({
        opacity: Math.max(0, opacity.value - 0.2),
        transform: `translateY(${(1 - opacity.value) * 40}px)`,
        transition: "opacity 1.5s ease-out 0.3s, transform 1.5s ease-out 0.3s"
      })}" data-v-c7aa32a4><div class="border-b-2 md:border-b-3 border-black bg-slate-800 px-4 py-2 flex items-center gap-1.5" data-v-c7aa32a4><div class="w-2.5 h-2.5 rounded-full bg-red-500 border border-black" data-v-c7aa32a4></div><div class="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-black" data-v-c7aa32a4></div><div class="w-2.5 h-2.5 rounded-full bg-green-500 border border-black" data-v-c7aa32a4></div></div><div class="p-4 md:p-6 font-mono" data-v-c7aa32a4><h2 class="text-base md:text-lg font-bold text-white mb-2" data-v-c7aa32a4>&gt; I build scalable backend systems.</h2><div class="text-sm text-[#00FF94] flex items-center" data-v-c7aa32a4><span class="prompt mr-2" data-v-c7aa32a4>&gt;</span><span class="typed-text" data-v-c7aa32a4>${ssrInterpolate(currentTypedText.value)}</span><span class="cursor bg-[#00FF94] w-2 h-4 ml-1 animate-pulse" data-v-c7aa32a4></span></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/HeroSection.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-c7aa32a4"]]);
const highlightItems = [
  {
    title: "Architecture Patterns",
    description: "Event-driven systems, microservices, workflow orchestration, sagas, eventual consistency patterns, multi-tenant isolation, and data partitioning strategies.",
    delay: "100ms"
  },
  {
    title: "Reliability Engineering",
    description: "Idempotency, deduplication, ordering controls, DLQ/replay, backpressure handling, rate limiting, circuit breakers, timeout strategies, and graceful degradation.",
    delay: "250ms"
  },
  {
    title: "Data Engineering",
    description: "Database optimization, schema migrations, bulk load strategies, reconciliation patterns, caching layers, materialized views, and data consistency verification.",
    delay: "400ms"
  },
  {
    title: "Cloud & Operations",
    description: "Observability (metrics, logs, traces), cost optimization, infrastructure as code, scheduled scaling, AWS serverless patterns, container orchestration, and incident response.",
    delay: "550ms"
  }
];
function useIntersectionObserver(target, options = {}) {
  const { threshold = 0.1, rootMargin = "0px", freezeOnceVisible = true } = options;
  const isVisible = ref(false);
  return { isVisible };
}
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "ImpactSection",
  __ssrInlineRender: true,
  setup(__props) {
    const sectionRef = ref(null);
    ref(null);
    ref(null);
    const currentIndex = ref(0);
    const autoplayInterval = ref(null);
    const isPaused = ref(false);
    const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.1 });
    const nextSlide = () => {
      if (currentIndex.value < highlightItems.length - 1) {
        currentIndex.value++;
      } else {
        currentIndex.value = 0;
      }
    };
    const startAutoplay = () => {
      if (autoplayInterval.value) return;
      autoplayInterval.value = (void 0).setInterval(() => {
        if (!isPaused.value) nextSlide();
      }, 5e3);
    };
    const stopAutoplay = () => {
      if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value);
        autoplayInterval.value = null;
      }
    };
    watch(isVisible, (visible) => {
      if (visible) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        id: "impact",
        class: "section relative overflow-hidden"
      }, _attrs))} data-v-d4c7f08f><div class="absolute top-[-100px] left-[10%] w-[90%] h-[600px] rounded-full opacity-5 bg-[rgba(100,200,255,0.1)] blur-3xl z-0" data-v-d4c7f08f></div><div class="absolute w-full h-full overflow-hidden" data-v-d4c7f08f><div class="absolute top-[70%] left-[80%] w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl" style="${ssrRenderStyle({
        boxShadow: "0 0 15px rgba(0, 153, 255, 0.3)",
        opacity: 0,
        transition: "opacity 0.5s ease-in-out"
      })}" data-v-d4c7f08f></div></div><div class="h-full w-full flex flex-col items-center justify-start md:justify-center" data-v-d4c7f08f><div class="w-[95%] md:w-[90%] max-w-[1200px] z-10 px-4 md:px-0" data-v-d4c7f08f><div class="${ssrRenderClass([{ "opacity-0 translate-y-5": !unref(isVisible), "opacity-100 translate-y-0": unref(isVisible) }, "max-w-3xl mx-auto text-center mb-12 md:mb-20 transition-all duration-800 ease-out"])}" data-v-d4c7f08f><h2 class="section-title mb-4" data-v-d4c7f08f> Creating Meaningful Impact </h2><p class="text-base sm:text-lg mb-4 md:mb-6 text-gray-300/90" data-v-d4c7f08f> I transform complex challenges into elegant, efficient solutions that make a real difference. My focus is on building innovations that simplify lives and empower organizations to achieve more. </p><p class="text-sm sm:text-base md:text-lg text-gray-400/90 italic" data-v-d4c7f08f> Every solution begins with a deep understanding of the human experience, followed by thoughtful design that bridges technology and real-world needs. </p></div><div class="${ssrRenderClass([{ "opacity-0 translate-y-8": !unref(isVisible), "opacity-100 translate-y-0": unref(isVisible) }, "text-center transition-all duration-800 ease-out"])}" data-v-d4c7f08f><div class="md:hidden" data-v-d4c7f08f><h3 class="text-xl mb-4 text-gray-200 text-center" data-v-d4c7f08f>Impact Highlights</h3><p class="text-sm text-gray-400/90 mb-4" data-v-d4c7f08f>These are the patterns, technologies, and practices I use to build reliable systems that scale. Each capability is tied to production outcomes, not just familiarity, but demonstrated impact.</p><div class="relative overflow-hidden" data-v-d4c7f08f><div class="flex transition-transform duration-300 ease-in-out" style="${ssrRenderStyle({ transform: `translateX(-${currentIndex.value * 100}%)` })}" data-v-d4c7f08f><!--[-->`);
      ssrRenderList(unref(highlightItems), (item, index) => {
        _push(`<div class="w-full flex-shrink-0 px-4" data-v-d4c7f08f><div class="highlight-card" data-v-d4c7f08f><h3 class="text-xl mb-4 text-blue-100" data-v-d4c7f08f>${ssrInterpolate(item.title)}</h3><p class="text-gray-300/90 text-base" data-v-d4c7f08f>${ssrInterpolate(item.description)}</p></div></div>`);
      });
      _push(`<!--]--></div><div class="flex justify-center mt-2 gap-2" data-v-d4c7f08f><!--[-->`);
      ssrRenderList(unref(highlightItems), (_, index) => {
        _push(`<button class="${ssrRenderClass([currentIndex.value === index ? "bg-blue-500 w-4" : "bg-gray-600", "w-2 h-2 rounded-full transition-all duration-300"])}" aria-label="Go to slide" data-v-d4c7f08f></button>`);
      });
      _push(`<!--]--></div><button class="absolute left-2 top-1/2 -translate-y-1/2 bg-[#FFDE47] text-black border-2 border-black p-2 rounded-full shadow-[2px_2px_0_0_#000] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"${ssrIncludeBooleanAttr(currentIndex.value === 0) ? " disabled" : ""} aria-label="Previous slide" data-v-d4c7f08f><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d4c7f08f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" data-v-d4c7f08f></path></svg></button><button class="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFDE47] text-black border-2 border-black p-2 rounded-full shadow-[2px_2px_0_0_#000] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"${ssrIncludeBooleanAttr(currentIndex.value === unref(highlightItems).length - 1) ? " disabled" : ""} aria-label="Next slide" data-v-d4c7f08f><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d4c7f08f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" data-v-d4c7f08f></path></svg></button></div></div><div class="hidden md:block" data-v-d4c7f08f><h3 class="text-xl md:text-3xl mb-4 text-gray-200" data-v-d4c7f08f> Impact Highlights </h3><p class="text-sm md:text-base text-gray-400/90 mb-8" data-v-d4c7f08f>These are the patterns, technologies, and practices I use to build reliable systems that scale. Each capability is tied to production outcomes, not just familiarity, but demonstrated impact.</p><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" data-v-d4c7f08f><!--[-->`);
      ssrRenderList(unref(highlightItems), (item, index) => {
        _push(`<div class="${ssrRenderClass([{ "opacity-0 translate-y-5": !unref(isVisible), "opacity-100 translate-y-0": unref(isVisible) }, "highlight-card transition-all duration-600 ease-out"])}" style="${ssrRenderStyle({
          transitionDelay: `${index * 100}ms`
        })}" data-v-d4c7f08f><h3 class="text-xl md:text-2xl mb-4 md:mb-5 text-blue-100" data-v-d4c7f08f>${ssrInterpolate(item.title)}</h3><p class="text-gray-300/90 text-base md:text-lg" data-v-d4c7f08f>${ssrInterpolate(item.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/ImpactSection.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-d4c7f08f"]]);
const awsImage = "" + __buildAssetsURL("aws.BDruQSGI.png");
const kafkaImage = "" + __buildAssetsURL("kafka.HFuExK7N.png");
const skills = [
  {
    name: "Python",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    name: "Golang",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg"
  },
  {
    name: "Django",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    invert: true
  },
  {
    name: "Flask",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    invert: true
  },
  {
    name: "FastAPI",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"
  },
  {
    name: "MySQL",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
    invert: true
  },
  {
    name: "PostgreSQL",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
  },
  {
    name: "Elasticsearch",
    image: "https://www.vectorlogo.zone/logos/elastic/elastic-icon.svg"
  },
  {
    name: "Redis",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg"
  },
  {
    name: "Docker",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
  },
  {
    name: "AWS",
    image: awsImage
  },
  {
    name: "Kafka",
    image: kafkaImage
  }
];
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "SkillsSection",
  __ssrInlineRender: true,
  setup(__props) {
    const sectionRef = ref(null);
    const { isVisible } = useIntersectionObserver();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        id: "skills",
        class: "section relative overflow-hidden"
      }, _attrs))}><div class="absolute bottom-[-100px] right-[10%] w-[600px] h-[600px] rounded-full opacity-10 bg-secondary blur-[100px] -z-10"></div><div class="container-custom relative z-10"><div class="${ssrRenderClass([{ "opacity-0 translate-y-8": !unref(isVisible), "opacity-100 translate-y-0": unref(isVisible) }, "text-center mb-12 md:mb-20"])}" style="${ssrRenderStyle({ "transition": "all 0.8s ease-out" })}"><h2 class="section-title mb-4"> Skills </h2><p class="text-muted-foreground max-w-2xl mx-auto"> Technologies and tools I use to bring ideas to life. </p></div><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6"><!--[-->`);
      ssrRenderList(unref(skills), (skill, index) => {
        _push(`<div class="group relative" style="${ssrRenderStyle({
          opacity: unref(isVisible) ? 1 : 0,
          transform: `translateY(${unref(isVisible) ? 0 : 20}px)`,
          transition: `opacity 0.6s ease-out ${index * 50}ms, transform 0.6s ease-out ${index * 50}ms`
        })}"><div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div><div class="glass-card flex flex-col items-center justify-center p-3 md:p-6 h-full relative z-10 hover:-translate-y-2 transition-transform duration-300"><div class="w-10 h-10 md:w-16 md:h-16 mb-2 md:mb-4 flex items-center justify-center p-1.5 md:p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors"><img${ssrRenderAttr("src", skill.image)}${ssrRenderAttr("alt", skill.name)} class="${ssrRenderClass([{ invert: skill.invert }, "w-full h-full object-contain transition-all duration-300 group-hover:scale-110"])}" loading="lazy"></div><h3 class="text-xs md:text-sm font-semibold text-foreground group-hover:text-primary transition-colors text-center">${ssrInterpolate(skill.name)}</h3></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SkillsSection.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "JobModal",
  __ssrInlineRender: true,
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  emits: ["close"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4" }, _attrs))}><div class="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl"><div class="p-6"><div class="flex justify-between items-start mb-4"><div><h3 class="text-xl md:text-2xl text-blue-100 font-bold">${ssrInterpolate(__props.job.position)}</h3><h4 class="text-lg text-gray-200 mt-1">${ssrInterpolate(__props.job.company)}</h4><p class="text-sm text-gray-400 mt-1">${ssrInterpolate(__props.job.period)}</p></div><button class="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none">`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "times"] }, null, _parent));
      _push(`</button></div><div class="mt-4"><h5 class="text-md text-gray-300 mb-2 font-semibold"> Responsibilities: </h5><ul class="list-disc pl-5 text-gray-400 space-y-2"><!--[-->`);
      ssrRenderList(__props.job.responsibilities, (responsibility, idx) => {
        _push(`<li>${ssrInterpolate(responsibility)}</li>`);
      });
      _push(`<!--]--></ul></div></div></div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/JobModal.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const innovaccerImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCADIAMgDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAYHAwQFAggB/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAEDAgUGBAf/2gAMAwEAAhADEAAAAfqEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxpyOUm/quUOq5Q6rQ34qBgAAAAAAAx5CY/+dLm5bQFg9mzzM0WnOw9iGTPHWhHlAAAAAAAcTt4F3FGWzbvjgsebjM90mUN2I81hsWWvmAQAAAAAABzdLvY59XGiW1q578J9IHdl1az/AA0W2MdUAAAAAAAa0fm/950C5tvX2erBN9nqwFpzT55vTDRdMV8+AAAAAAIdN9dVvh/PX9lvmB6c0r5mLidgN5jKbR1tmj5yGPhAAAAAAwfL1gVF6PpAW9ouemNyNXOdedwSvQrdh1uYc+FXKgAAAAAI9IeTN/yn4tfz6fq9VLVTlVS1RzJ7rWfTxOlulXLgxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8QAKBAAAQMCBAcAAwEAAAAAAAAAAwIEBQABBhMUFRAREhYgMEAHF3Ax/9oACAEBAAEFAv4IRfQnVKrVKrVKrVKrVKrVKoTi6lfCRHWm9uV/FujncssrMAaxx/A5H4oT1qkXGUOo51kF+Eo8tXHqs1ARdyL4RrrOH8BR5ieAB9apB1nl4gNcBREsVHwOR1a3Vd+fTB8Yx1lr+D/aSNKKcrUs/k1Xcjf4XzyOEbcIitwiK3CIrcIitwiKRIRN12va9ve5cjaBj8SMZM8iFbd742tzqNEsDH340m9U4CZbcplIxFEeOG43PL78TTO0ML353rDE1tD+ejtI44sminzluBLYPuMZDcU1KLl3/HDL9MxHHAtsbhARuibe/G031X8GbojFzIpRNRtYfjdY5987JbTGkIoq/HBsrdo/cYWUpwzaIZN/fKxyJVlf8fnr9fuK7AcV2A4rsBxXYDioXBm3PP4P/8QAMREAAQIDBQQIBwAAAAAAAAAAAQIDAAQRBRMhMEEQEhUxBhQiMlJTcZEkQFBhgdHx/9oACAEDAQE/AfnQK4Rcqi4XFwuFJKDQ5INMYQrfFdnKGGA723B6RMM3K6aZLS9w7Am9XuaawBTARMs3yKawRTA5KXqChiXau0ffbPNBJ3xrkoYdcSXEpNBzMM2ahTaTvmOGI8aveOFo8aveLTlES4SQon1yGGVTDgaRzMSkm3Ky4YH9hKDITBlld04p/WxawhJUrlE5MmadK9NMjo9Z10jrLgxPLZaEp1xmg7wxBiVevkdrBQwIi2Jyvw6PzkS5bDqS73a4wm2bPAoFxxqQ8yONSHmRadoo60XZI8xj6wpRUd5X0z//xAAeEQACAQQDAQAAAAAAAAAAAAAAAQIQERIwITFBUP/aAAgBAgEBPwH5yQ9r1qr02MTExJLQuRKysdOrd9EI+0auIk/NC7M4mSMkSlzwd/M//8QAOBAAAQICBQgIBAcAAAAAAAAAAQIDABESIDFAQQQQEyEiMmGRBRQjJDRRkqEVcIHhMDNxcsHR8P/aAAgBAQAGPwL5CTjCMIwjCMIwiRuUolWpGwRsJFDjjAWMbjSH1qyjQoxtzUTuKuXCoXFWwVG056Ct9Nx45+AiQ3E1AsYQFCw3GkPrEhGjTvKraNW6qz9blqELKrZ121KtIuRS8rtMZT/iLTyVFp5Ki08lRaeSotPJUDa5hUarLgp11YQ2m0mNCy4dJgFCU4eS5vUpz867KHN8JuHUmldk2dvir7Qhxs0VpMwYRljQ7w3vpHuK3WVjYRu8TcDRPeHNlH9xM6zmFM93d2V8OMaVH5LuscDUQ0jG0+QhDSBJKR+Otxw0UJEyTC3zqRYhPkKi+jcoPaoGweH2hbaxJSTLPpFjtXPYXD4e0rUNbpHsKrb7RktBmIb6RyfeA20/7yzaVY7Jv3NwdfAmqxI4wpazSUozJrdVXrZf1S8jBLLiUtE2G0QlpFguDmTuagrEYGNWVol+2PFN+mPFN+mPFN+mPFN+mPFN+mE5Q88HSjdSkY/Ij//EACoQAQAABAUDAwUBAQAAAAAAAAEAESExIEFRYYEQQJGxwfFwcaHR8DDh/9oACAEBAAE/IfoIDuu0bPhGz4xs+MbPjGz4xs+MCzK5nZTOKMqJiySjExobzThY9yaPYzTDFA3YImqOJ/3pWP2XXsUmSbROTNbBo2UPQhdZtN61M9017Gk5LQkmT0qzFWvJN3XBc1yakL/MJnYyXKYONxgDelV0NcVZqnDsSAkkyFpy2M50JaYrRrQTfsgpS2FJ94UsIQQQQFBIzvKfmCKhRRLdgH5Z2RD65FfhieRUmZFmOJEATWwRbeQ7bcdhehNM8X8v9oYqMbJIB5IlcTPkMWaqkHy8dgchVR014esoRkUqrn0TIIP4cPScAQ6RbMPfBcifqDFDEh/uTVq3ARPduTJt+8F623u5OfRFYMw62wFNnxHYaWrMH+V4w8pHTZ2YGLkgZjv6Ol8CTrbIPfsKamT1prfviEYqOurdxDmn6nC828aRPSmkv2TWLA/duua9glTVF4LMEWZyKyPkEfMI+YR8wj5hBVfKWhqX6Ef/2gAMAwEAAgADAAAAEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPOOsstvPPPPPPPLAwwtdPPPPPPPPHyh/wDvTzzzzzzzyn7/AP388888888zt99E8888888pAW/8c88888887CAf488888887nMM8U8888888888888888888888888888888888888888888//EACgRAQAABAQFBAMAAAAAAAAAAAEAESExMEFhcRBRgdHwQLHB4VCRof/aAAgBAwEBPxD1qIF2NuNiNjC4ogZQYjgoJsBs4NmnOEXOqbfWDdbPByFldnLrAEsEAuRU3+4RNwwaeTS0EE6qq68Tekd+eChJbBQ3YOLzBoyOhK0eY7R4jtDNxUkp9S3jgB7NJHfYu6QKcyVdTdd/aM0JTTPcZcEwkCa6QldA5Hdu4GRz6Dnu+2/A1pJokt0bMLRTGgS/1ExM1+B8uADswOidf5AoYbPaNJ+ntHkHtAaRIUqIzk5ylWE6TWq6/jP/xAAfEQACAQQDAQEAAAAAAAAAAAABEQAQITBBMVFhQFD/2gAIAQIBAT8Q+5GIxGELEC6suYCOEFUTKoDGIGAhUd4QRDAgBcxOzE7MCN4BJIQCEIsa1QlRx4FBqIKcJrYER8T0nvPeAu/Nv//EACoQAQABAgQEBQUBAAAAAAAAAAERACExQVFhIEBxgRCxwdHwMJGh4fFw/9oACAEBAAE/EP8ABBUssaml2wnV71/We9f1nvX9Z71/We9f1nvQA+ElL8kTzC3HRyowZUJxErlwLYn9VDpUWBqQ2+zTl2rrHMHpyNqrlgZmvDiSmOhrUfyYjHR6+Tr4YI2BXDL9D205EGAUQjnSX3Ee3BF++7xV8z5hUgek+ZeOLkAVb5foe2vIk5jEe+lIwQjCOXhafMZzcisf7MOGd6D98CT3rytmD1q9+Q01Hcw5G12QDJ1o9paAqG+4DHN6nA76cWH28LbS6PnHIuRIQjg06I2d1/NSpN0ZBgO0cQqEUS4lSUxVP5dy/fkl5YO9wsnret08Kqqqq1pwF074I62ohxFsoyjbkJDwes+arABdUCjzmJSC6zswXjGJYs0NSR8yAu4+fEjZwAlXQp3lGVmWP2EO315qAumOwfmYOp0VitVidI/qiZl3oBOq49N1eKclx0t6DzRo8g9mHM3F80Kdw1p/IqUqcVdfAIYZNsp/OWd2aKFnIpeq4xk4NpMuA6sZDIWL0PuwZ1HwIs911VlXV+u4GoIElXsVfBkpjmHVlW65RwS/cU5cZqkG6DJqZtmSdE1EhHR8cI7GL4uy5u8GXIMN0qNzsW3IZJwwjibLVqAomi1Nvglcn3hPW7CPCCjvAavcDF2M6CCPrwCDAXPCdi61EUhWg5WlHVV4l4S+4RwRoL9bqPRRNBXIsDKU9aLRsnGV90vIDHkxXJHWEwzJM6CptcJNyWPvXwn1r5T618p9a+U+tfKfWmXGsIyBjLE2ALwzaPDP/Bv/2Q==";
const appknoxImage = "data:image/jpeg;base64,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";
const thoughts2binaryImage = "" + __buildAssetsURL("thoughts2binary.YT9By85J.jpg");
const barytechImage = "" + __buildAssetsURL("barytech.DRA5qKcf.jpg");
const yoyobooksImage = "" + __buildAssetsURL("yoyobooks.C0Ke3dU6.jpg");
const jobs = [
  {
    company: "Xysec Labs Private Limited",
    position: "Software Development Engineer",
    period: "February 2025 - Present",
    shortPeriod: "Feb '25 - Present",
    year: "2025",
    logo: appknoxImage,
    responsibilities: [
      "Developing and maintaining secure software applications",
      "Implementing robust security features and protocols",
      "Collaborating with security researchers and analysts",
      "Conducting code reviews and security audits",
      "Optimizing application performance and security"
    ],
    url: "https://www.appknox.com"
  },
  {
    company: "Barycenter Technologies Private Limited",
    position: "Senior Software Engineer",
    period: "May 2024 - January 2025",
    shortPeriod: "May '24 - Jan '25",
    year: "2024",
    logo: barytechImage,
    responsibilities: [
      "Led development of microservices-based applications",
      "Designed and implemented scalable system architecture",
      "Mentored junior developers and conducted code reviews",
      "Optimized database queries and application performance",
      "Integrated third-party APIs and services"
    ],
    url: "https://eino.world/en_gb/"
  },
  {
    company: "Innovaccer Analytics Private Limited",
    position: "Software Development Engineer",
    period: "December 2021 - September 2022",
    shortPeriod: "Dec '21 - Sep '22",
    year: "2021",
    logo: innovaccerImage,
    responsibilities: [
      "Developed higly scalable healthcare data analytics solutions",
      "Implemented ETL pipelines for processing large datasets",
      "Created RESTful APIs for data access and integration",
      "Collaborated with data scientists to implement ML models",
      "Optimized database queries for improved performance"
    ],
    url: "https://innovaccer.com"
  },
  {
    company: "Thoughts2Binary Consulting LLP",
    position: "Associate Software Developer",
    period: "November 2019 - December 2021",
    shortPeriod: "Nov '19 - Dec '21",
    year: "2019",
    logo: thoughts2binaryImage,
    responsibilities: [
      "Developed web applications using React and Node.js",
      "Created and maintained RESTful APIs",
      "Designed and implemented database schemas",
      "Integrated payment gateways and third-party services",
      "Deployed applications to cloud environments"
    ],
    url: "https://thoughts2binary.com"
  },
  {
    company: "YoYo Books India LLP",
    position: "CTO, Full Stack Developer",
    period: "November 2016 - September 2018",
    shortPeriod: "Nov '16 - Sep '18",
    year: "2016",
    logo: yoyobooksImage,
    responsibilities: [
      "Led technical strategy and development for digital publishing platform",
      "Architected and developed full-stack web applications",
      "Managed development team and provided technical leadership",
      "Implemented e-commerce and content management systems",
      "Ensured scalability, security, and performance of platforms"
    ],
    url: "https://yoyobooks.in"
  },
  {
    company: "Freelance",
    position: "Full Stack Developer",
    period: "September 2018 - November 2019",
    shortPeriod: "Sep '18 - Nov '19",
    year: "2018",
    logo: "",
    responsibilities: [
      "Developed custom web solutions for various clients",
      "Managed full project lifecycle from requirements to deployment",
      "Specialized in Vue.js and Node.js development"
    ],
    url: "#"
  }
];
function useScrollLock() {
  const lock = () => {
    (void 0).body.style.overflow = "hidden";
  };
  const unlock = () => {
    (void 0).body.style.overflow = "";
  };
  return { lock, unlock };
}
function useDragScroll(container) {
  const isDown = ref(false);
  const startX = ref(0);
  const scrollLeft = ref(0);
  const startDrag = (e) => {
    if (!container.value) return;
    isDown.value = true;
    container.value.classList.add("active");
    startX.value = e.pageX - container.value.offsetLeft;
    scrollLeft.value = container.value.scrollLeft;
  };
  const stopDrag = () => {
    isDown.value = false;
    if (container.value) {
      container.value.classList.remove("active");
    }
  };
  const drag = (e) => {
    if (!isDown.value || !container.value) return;
    e.preventDefault();
    const x = e.pageX - container.value.offsetLeft;
    const walk = (x - startX.value) * 2;
    container.value.scrollLeft = scrollLeft.value - walk;
  };
  return {
    startDrag,
    stopDrag,
    drag,
    isDragging: isDown
  };
}
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ExperienceSection",
  __ssrInlineRender: true,
  setup(__props) {
    const upperJobs = computed(() => jobs.slice(0, 3));
    const lowerJobs = computed(() => jobs.slice(3));
    const sectionRef = ref(null);
    const selectedJob = ref(null);
    const scrollContainer = ref(null);
    const { isVisible } = useIntersectionObserver();
    const { unlock } = useScrollLock();
    useDragScroll(scrollContainer);
    const closeModal = () => {
      selectedJob.value = null;
      unlock();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        id: "experience",
        class: "section relative overflow-hidden"
      }, _attrs))} data-v-fa77508b><div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-fa77508b><div class="absolute top-[-100px] right-[10%] w-[90%] h-[600px] rounded-full opacity-5 bg-[rgba(100,200,255,0.1)] blur-3xl z-0" data-v-fa77508b></div></div><div class="container-custom relative z-10" data-v-fa77508b><div class="${ssrRenderClass([{ "opacity-0 translate-y-8": !unref(isVisible), "opacity-100 translate-y-0": unref(isVisible) }, "text-center mb-12 md:mb-20"])}" style="${ssrRenderStyle({ "transition": "all 0.8s ease-out" })}" data-v-fa77508b><h2 class="section-title mb-4" data-v-fa77508b> Experience </h2><p class="text-gray-400 max-w-2xl mx-auto text-sm md:text-base" data-v-fa77508b> A dual-stream journey through my career milestones. </p></div><div class="hidden md:block relative w-full overflow-x-auto pb-8 hide-scrollbar cursor-grab active:cursor-grabbing" data-v-fa77508b><div class="flex flex-col gap-12 min-w-max px-4 md:px-10 py-4" data-v-fa77508b><div class="flex gap-6 md:gap-8" data-v-fa77508b><!--[-->`);
      ssrRenderList(upperJobs.value, (job, index) => {
        _push(`<div class="${ssrRenderClass([{ "opacity-0 translate-y-8": !unref(isVisible), "opacity-100 translate-y-0": unref(isVisible) }, "relative group w-[340px]"])}" style="${ssrRenderStyle({ transitionDelay: `${index * 100}ms`, transitionDuration: "0.8s" })}" data-v-fa77508b><div class="w-full bg-slate-900 border-2 md:border-3 border-black rounded-xl p-6 shadow-[4px_4px_0_0_#00D4FF] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#00D4FF] active:translate-y-[1px] active:shadow-[2px_2px_0_0_#00D4FF] cursor-pointer relative overflow-hidden transition-all duration-200" data-v-fa77508b><div class="relative z-10" data-v-fa77508b><div class="flex items-center gap-4 mb-4" data-v-fa77508b><div class="w-20 h-20 rounded-lg bg-white p-2 border-2 border-black flex items-center justify-center shrink-0" data-v-fa77508b>`);
        if (job.logo) {
          _push(`<img${ssrRenderAttr("src", job.logo)}${ssrRenderAttr("alt", job.company)} class="w-full h-full object-contain rounded" data-v-fa77508b>`);
        } else {
          _push(ssrRenderComponent(_component_font_awesome_icon, {
            icon: ["fas", "briefcase"],
            class: "text-black text-2xl"
          }, null, _parent));
        }
        _push(`</div><div class="min-w-0" data-v-fa77508b><h3 class="text-lg font-bold text-white group-hover:text-primary transition-colors truncate"${ssrRenderAttr("title", job.position)} data-v-fa77508b>${ssrInterpolate(job.position)}</h3><h4 class="text-sm text-gray-400 truncate" data-v-fa77508b>${ssrInterpolate(job.company)}</h4></div></div><div class="inline-block px-3 py-1 rounded-lg border-2 border-black text-xs font-mono font-bold bg-[#FFDE47] text-black mb-4" data-v-fa77508b>${ssrInterpolate(job.shortPeriod)}</div><p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3" data-v-fa77508b>${ssrInterpolate(job.responsibilities[0])}</p><div class="flex items-center gap-1.5 text-xs text-accent font-bold uppercase tracking-wider group-hover:gap-2 transition-all" data-v-fa77508b><span data-v-fa77508b>Explore</span>`);
        _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "arrow-right"] }, null, _parent));
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]--></div><div class="flex gap-6 md:gap-8" data-v-fa77508b><!--[-->`);
      ssrRenderList(lowerJobs.value, (job, index) => {
        _push(`<div class="${ssrRenderClass([{ "opacity-0 -translate-y-8": !unref(isVisible), "opacity-100 translate-y-0": unref(isVisible) }, "relative group w-[340px]"])}" style="${ssrRenderStyle({ transitionDelay: `${(index + 3) * 100}ms`, transitionDuration: "0.8s" })}" data-v-fa77508b><div class="w-full bg-slate-900 border-2 md:border-3 border-black rounded-xl p-6 shadow-[4px_4px_0_0_#00FF94] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#00FF94] active:translate-y-[1px] active:shadow-[2px_2px_0_0_#00FF94] cursor-pointer relative overflow-hidden transition-all duration-200" data-v-fa77508b><div class="relative z-10" data-v-fa77508b><div class="flex items-center gap-4 mb-4" data-v-fa77508b><div class="w-20 h-20 rounded-lg bg-white p-2 border-2 border-black flex items-center justify-center shrink-0" data-v-fa77508b>`);
        if (job.logo) {
          _push(`<img${ssrRenderAttr("src", job.logo)}${ssrRenderAttr("alt", job.company)} class="w-full h-full object-contain rounded" data-v-fa77508b>`);
        } else {
          _push(ssrRenderComponent(_component_font_awesome_icon, {
            icon: ["fas", "briefcase"],
            class: "text-black text-2xl"
          }, null, _parent));
        }
        _push(`</div><div class="min-w-0" data-v-fa77508b><h3 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors truncate"${ssrRenderAttr("title", job.position)} data-v-fa77508b>${ssrInterpolate(job.position)}</h3><h4 class="text-sm text-gray-400 truncate" data-v-fa77508b>${ssrInterpolate(job.company)}</h4></div></div><div class="inline-block px-3 py-1 rounded-lg border-2 border-black text-xs font-mono font-bold bg-[#00FF94] text-black mb-4" data-v-fa77508b>${ssrInterpolate(job.shortPeriod)}</div><p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3" data-v-fa77508b>${ssrInterpolate(job.responsibilities[0])}</p><div class="flex items-center gap-1.5 text-xs text-accent font-bold uppercase tracking-wider group-hover:gap-2 transition-all" data-v-fa77508b><span data-v-fa77508b>Explore</span>`);
        _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "arrow-right"] }, null, _parent));
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="md:hidden relative px-3 pb-8" data-v-fa77508b><div class="absolute left-[25px] top-0 bottom-0 w-1 bg-black" data-v-fa77508b></div><div class="flex flex-col gap-8" data-v-fa77508b><!--[-->`);
      ssrRenderList(unref(jobs), (job, index) => {
        _push(`<div class="${ssrRenderClass([{ "opacity-0 translate-x-8": !unref(isVisible), "opacity-100 translate-x-0": unref(isVisible) }, "relative pl-8"])}" style="${ssrRenderStyle({ transitionDelay: `${index * 100}ms`, transitionDuration: "0.6s" })}" data-v-fa77508b><div class="absolute left-[20px] top-[26px] w-3 h-3 rounded-full bg-[#FFDE47] border-2 border-black z-10 shadow-[2px_2px_0_0_#000]" data-v-fa77508b></div><div class="w-full bg-slate-900 border-2 border-black rounded-xl p-4 shadow-[4px_4px_0_0_#00D4FF] transition-all duration-200 active:translate-y-[1px] active:shadow-[2px_2px_0_0_#00D4FF] cursor-pointer relative overflow-hidden" data-v-fa77508b><div class="relative z-10" data-v-fa77508b><div class="flex items-center gap-3 sm:gap-4 mb-4" data-v-fa77508b><div class="w-12 h-12 sm:w-20 sm:h-20 rounded-lg bg-white p-1.5 border-2 border-black flex items-center justify-center shrink-0" data-v-fa77508b>`);
        if (job.logo) {
          _push(`<img${ssrRenderAttr("src", job.logo)}${ssrRenderAttr("alt", job.company)} class="w-full h-full object-contain rounded" data-v-fa77508b>`);
        } else {
          _push(ssrRenderComponent(_component_font_awesome_icon, {
            icon: ["fas", "briefcase"],
            class: "text-black text-lg sm:text-2xl"
          }, null, _parent));
        }
        _push(`</div><div class="min-w-0" data-v-fa77508b><h3 class="text-base sm:text-xl font-bold text-white mb-1 leading-snug" data-v-fa77508b>${ssrInterpolate(job.position)}</h3><h4 class="text-xs sm:text-base text-gray-400 leading-snug truncate" data-v-fa77508b>${ssrInterpolate(job.company)}</h4></div></div><div class="inline-block px-3 py-1 rounded-lg border-2 border-black text-xs font-mono font-bold bg-[#FFDE47] text-black mb-4" data-v-fa77508b>${ssrInterpolate(job.shortPeriod)}</div><div class="flex items-center gap-2 text-sm text-accent font-bold uppercase tracking-wider" data-v-fa77508b><span data-v-fa77508b>View Details</span>`);
        _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "arrow-right"] }, null, _parent));
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
      if (selectedJob.value) {
        _push(ssrRenderComponent(_sfc_main$9, {
          job: selectedJob.value,
          onClose: closeModal
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/ExperienceSection.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-fa77508b"]]);
const uosImage = "" + __buildAssetsURL("uos.BkNaEod2.jpeg");
const bhuImage = "" + __buildAssetsURL("bhu.DNtLKF5O.jpeg");
const davImage = "" + __buildAssetsURL("dav.ST2iBBLU.jpeg");
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "EducationSection",
  __ssrInlineRender: true,
  setup(__props) {
    const educationItems = [
      {
        degree: "MSc - Business Analytics in Finance",
        institution: "University of Southampton",
        period: "2022-2023",
        logo: uosImage
      },
      {
        degree: "BCom(Hons.) Finance",
        institution: "Banaras Hindu University",
        period: "2015-2018",
        logo: bhuImage
      },
      {
        degree: "UG Diploma in Computer Applications",
        institution: "Banaras Hindu University",
        period: "2015-2018",
        logo: bhuImage
      },
      {
        degree: "10+2",
        institution: "DAV Public School (CBSE)",
        period: "2014",
        logo: davImage
      }
    ];
    const sectionRef = ref(null);
    const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.1 });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        id: "education",
        class: "section relative overflow-hidden"
      }, _attrs))} data-v-122980b7><div class="absolute top-[-100px] right-[10%] w-[90%] h-[600px] rounded-full opacity-5 bg-[rgba(100,200,255,0.1)] blur-3xl z-0" data-v-122980b7></div><div class="h-full w-full flex flex-col items-center justify-center" data-v-122980b7><div class="w-[95%] md:w-[90%] max-w-[1200px] z-10 px-4 md:px-0" data-v-122980b7><div style="${ssrRenderStyle({
        opacity: unref(isVisible) ? 1 : 0,
        transform: `translateY(${unref(isVisible) ? 0 : 30}px)`,
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out"
      })}" data-v-122980b7><h2 class="section-title mb-12 md:mb-20 text-center" data-v-122980b7> Education </h2><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-10" data-v-122980b7><!--[-->`);
      ssrRenderList(educationItems, (item, index) => {
        _push(`<div class="education-card" style="${ssrRenderStyle({
          opacity: unref(isVisible) ? 1 : 0,
          transform: `translateY(${unref(isVisible) ? 0 : 20}px)`,
          transition: `opacity 0.6s ease-out ${index * 150 + 100}ms, transform 0.6s ease-out ${index * 150 + 100}ms`
        })}" data-v-122980b7><div class="flex items-start space-x-3 md:space-x-4" data-v-122980b7><div class="logo-container" data-v-122980b7><img${ssrRenderAttr("src", item.logo)}${ssrRenderAttr("alt", item.institution)} class="institution-logo" data-v-122980b7></div><div class="flex-1" data-v-122980b7><h3 class="text-base md:text-xl text-blue-100 mb-1 md:mb-2" data-v-122980b7>${ssrInterpolate(item.degree)}</h3><div class="flex flex-col md:flex-row md:items-center space-y-0.5 md:space-y-0 md:space-x-2 text-gray-300 mb-1 md:mb-2" data-v-122980b7><span class="text-xs md:text-base" data-v-122980b7>${ssrInterpolate(item.institution)}</span><span class="hidden md:block text-gray-500" data-v-122980b7>•</span><span class="text-xs text-gray-400" data-v-122980b7>${ssrInterpolate(item.period)}</span></div>`);
        if (item.description) {
          _push(`<p class="text-gray-300/90 text-xs md:text-sm mt-1 md:mt-2" data-v-122980b7>${ssrInterpolate(item.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/EducationSection.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-122980b7"]]);
const articles = [
  {
    title: "Why Type Checking is a Game-Changer for Python Projects",
    url: "https://rkisdp.medium.com/why-type-checking-is-a-game-changer-for-python-projects-and-how-it-will-save-your-lots-of-time-a10d656d2257",
    date: "Mar 14, 2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ma0Ee8bOoLhyuBDLua0tYQ.jpeg"
  },
  {
    title: "A Guide To Understanding Django REST Framework Views",
    url: "https://rkisdp.medium.com/guide-of-understanding-django-rest-framework-views-940853a5964f",
    date: "April 5, 2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*70lDa3cF_vQDWuVY8eAZBQ.png"
  },
  {
    title: "Async Programming In Python: Boost Performance and Efficiency of Your Code",
    url: "https://rkisdp.medium.com/async-programming-in-python-boost-performance-and-efficiency-of-your-code-98f1bd29c237",
    date: "August 13, 2025",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wZijDlLHoigao77smKm9Hw.png"
  }
];
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ArticlesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const sectionRef = ref(null);
    ref(null);
    const currentIndex = ref(0);
    const slideWidth = ref(0);
    const slidesPerView = ref(3);
    const { isVisible } = useIntersectionObserver();
    const maxIndex = computed(
      () => Math.max(0, Math.ceil(articles.length / slidesPerView.value) - 1)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        id: "articles",
        class: "section relative overflow-hidden"
      }, _attrs))} data-v-0e2d809d><div class="absolute top-[-100px] right-[10%] w-[90%] h-[600px] rounded-full opacity-5 bg-[rgba(100,200,255,0.1)] blur-3xl z-0" data-v-0e2d809d></div><div class="h-full w-full flex flex-col items-center justify-center" data-v-0e2d809d><div class="w-[95%] md:w-[90%] max-w-[1200px] z-10 px-4 md:px-0" data-v-0e2d809d><div style="${ssrRenderStyle({
        opacity: unref(isVisible) ? 1 : 0,
        transform: `translateY(${unref(isVisible) ? 0 : 30}px)`,
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out"
      })}" data-v-0e2d809d><h2 class="section-title mb-12 md:mb-20 text-center" data-v-0e2d809d> My Articles </h2><div class="relative" data-v-0e2d809d><div class="overflow-hidden" data-v-0e2d809d><div class="flex transition-transform duration-500 ease-in-out" style="${ssrRenderStyle({
        transform: `translateX(${-currentIndex.value * slideWidth.value}px)`
      })}" data-v-0e2d809d><!--[-->`);
      ssrRenderList(unref(articles), (article, index) => {
        _push(`<div class="article-card flex-shrink-0 w-full md:w-1/3 px-2" style="${ssrRenderStyle({
          opacity: unref(isVisible) ? 1 : 0,
          transform: `translateY(${unref(isVisible) ? 0 : 20}px)`,
          transition: `opacity 0.6s ease-out ${index * 150 + 100}ms, transform 0.6s ease-out ${index * 150 + 100}ms`
        })}" data-v-0e2d809d><div class="article-card-inner h-[320px] bg-slate-900 border-2 border-black rounded-xl overflow-hidden transition-all duration-200" data-v-0e2d809d><a${ssrRenderAttr("href", article.url)} target="_blank" rel="noopener noreferrer" class="block relative" data-v-0e2d809d><div class="h-[180px] bg-gray-800 relative overflow-hidden" data-v-0e2d809d><img${ssrRenderAttr("src", article.image)}${ssrRenderAttr("alt", article.title)} class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" data-v-0e2d809d><div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" data-v-0e2d809d></div><div class="absolute bottom-0 left-0 w-full p-4" data-v-0e2d809d><div class="flex items-center" data-v-0e2d809d><img src="https://cdn-images-1.medium.com/fit/c/64/64/1*W35QUSvGpcLuxPo3SRTH4w.png" alt="Medium" class="w-5 h-5 mr-2" data-v-0e2d809d><span class="text-xs text-white/90" data-v-0e2d809d>Read on Medium</span></div></div></div></a><div class="p-4" data-v-0e2d809d><a${ssrRenderAttr("href", article.url)} target="_blank" rel="noopener noreferrer" class="hover:text-blue-300 transition-colors" data-v-0e2d809d><h3 class="text-lg text-blue-100 mb-2 h-auto overflow-hidden text-ellipsis" data-v-0e2d809d>${ssrInterpolate(article.title)}</h3></a><p class="text-gray-300/90 text-xs" data-v-0e2d809d>${ssrInterpolate(article.date)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div><button class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": currentIndex.value === 0 }, "absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#FF6B6B] hover:bg-[#ff5252] text-black border-2 border-black rounded-full w-10 h-10 flex items-center justify-center shadow-[2px_2px_0_0_#000] active:translate-y-[calc(-50%+2px)] active:translate-x-[2px] active:shadow-none transition-all focus:outline-none z-20"])}"${ssrIncludeBooleanAttr(currentIndex.value === 0) ? " disabled" : ""} data-v-0e2d809d>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "chevron-left"] }, null, _parent));
      _push(`</button><button class="${ssrRenderClass([{
        "opacity-50 cursor-not-allowed": currentIndex.value === maxIndex.value
      }, "absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#FF6B6B] hover:bg-[#ff5252] text-black border-2 border-black rounded-full w-10 h-10 flex items-center justify-center shadow-[2px_2px_0_0_#000] active:translate-y-[calc(-50%+2px)] active:translate-x-[2px] active:shadow-none transition-all focus:outline-none z-20"])}"${ssrIncludeBooleanAttr(currentIndex.value === maxIndex.value) ? " disabled" : ""} data-v-0e2d809d>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "chevron-right"] }, null, _parent));
      _push(`</button><div class="flex justify-center mt-6 gap-2" data-v-0e2d809d><!--[-->`);
      ssrRenderList(Math.ceil(unref(articles).length / slidesPerView.value), (_, index) => {
        _push(`<button class="${ssrRenderClass([
          currentIndex.value === index ? "bg-[#FF6B6B] shadow-[1px_1px_0_0_#000] scale-110" : "bg-slate-700 hover:bg-slate-600",
          "w-2.5 h-2.5 rounded-full focus:outline-none border border-black transition-all"
        ])}" data-v-0e2d809d></button>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/ArticlesSection.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-0e2d809d"]]);
const abhishekImage = "" + __buildAssetsURL("abhishek.COw-5TUy.jpeg");
const raviImage = "" + __buildAssetsURL("ravi.B1tWCWS_.jpeg");
const rohitImage = "" + __buildAssetsURL("rohit.WuXlW_vq.jpeg");
const abhigajrajImage = "" + __buildAssetsURL("abhigajraj.lswiitbC.jpeg");
const kavishImage = "" + __buildAssetsURL("kavish.tYUJ_lq5.jpeg");
const testimonials = [
  {
    name: "Ravi Gupta",
    designation: "Region Head(EMEA) at Locobuzz",
    image: raviImage,
    text: "I have directly worked with Divya Prakash and found him to a fantastic and enthusiastic as person. I would really appreciate his skill set and source of information. He is a well connected person and would highly recommend him.",
    linkedin: "https://www.linkedin.com/in/meetravigupta/"
  },
  {
    name: "Kavish Baghel",
    designation: "Senior Engineer at Dunnhumby",
    image: kavishImage,
    text: "Divya has been a great team member. He has always taken full responsibility of the task assigned to him and has always kept the team energy high. He aims to achieve perfection and helps everyone along his work.",
    linkedin: "https://www.linkedin.com/in/kavishbaghel/"
  },
  {
    name: "Abhishek Gajraj",
    designation: "AVP(Product) at Naukri.com",
    image: abhigajrajImage,
    text: "Divya is a positive and multi-talented individual with great work skill sets. His in-depth knowledge on the Python has been impressive. He is a sincere and smart working professional with a great appetite to learn new things. His strong work ethics and focused approach are commendable. ",
    linkedin: "https://www.linkedin.com/in/abhishekgajraj/"
  },
  {
    name: "Rohit Sharma",
    designation: "QA Manager at Squareboat",
    image: rohitImage,
    text: "Divya Prakash has always been a great resource to work with. He is always willing to jump in as part of the team, whether it be to create a new functionality, to fix a problem or to determine the root cause of a bug. His problem-solving capabilities are very good. In the time that I have worked with Divya, I have been impressed by his thorough, creative approach to his work. He has been an indispensable part of our projects, and I look forward to working with him in the future too.",
    linkedin: "https://www.linkedin.com/in/rohitsharma2206/"
  },
  {
    name: "Abhishek Mishra",
    designation: "Assistant Manager at Deloitte, UK",
    image: abhishekImage,
    text: "I have known Divya Prakash as my course mate at the University of Southampton. He is exceptionally talented and has good proficiency in python programming language. Throughout the program, he has successfully developed quality codes and solutions. I highly recommend him for his technical expertise and business knowledge and I am sure he will be a great asset to any company.",
    linkedin: "https://www.linkedin.com/in/abhishekmishra1095/"
  }
];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "TestimonialsSection",
  __ssrInlineRender: true,
  setup(__props) {
    const sectionRef = ref(null);
    const currentSlide = ref(0);
    const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.2 });
    const nextSlide = () => {
      if (currentSlide.value < testimonials.length - 1) {
        currentSlide.value++;
      } else {
        currentSlide.value = 0;
      }
    };
    let autoplayInterval = null;
    const startAutoplay = () => {
      stopAutoplay();
      autoplayInterval = (void 0).setInterval(nextSlide, 8e3);
    };
    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    };
    watch(isVisible, (visible) => {
      if (visible) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        id: "testimonials",
        class: "section relative overflow-hidden flex items-center"
      }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute w-32 h-32 rounded-full blur-3xl animate-float-down" style="${ssrRenderStyle({ "top": "65%", "left": "15%", "background-color": "rgba(0, 100, 200, 0.02)", "opacity": "0.2", "animation-duration": "25s" })}"></div><div class="absolute w-32 h-32 rounded-full blur-3xl animate-float-right" style="${ssrRenderStyle({ "top": "25%", "left": "70%", "background-color": "rgba(0, 80, 180, 0.03)", "opacity": "0.3", "animation-duration": "28s" })}"></div></div><div class="container-custom max-w-6xl mx-auto px-4 w-full"><div class="text-center mb-12 md:mb-20" style="${ssrRenderStyle({
        opacity: unref(isVisible) ? 1 : 0,
        transform: `translateY(${unref(isVisible) ? 0 : 30}px)`,
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out"
      })}"><h2 class="section-title mb-4"> Testimonials </h2><p class="text-sm md:text-lg text-gray-300/90 max-w-xl mx-auto"> What others say about working with me </p></div><div class="relative mt-4 md:mt-12" style="${ssrRenderStyle({
        opacity: unref(isVisible) ? 1 : 0,
        transform: `translateY(${unref(isVisible) ? 0 : 40}px)`,
        transition: "opacity 1s ease-out, transform 1s ease-out",
        transitionDelay: "0.2s"
      })}"><div class="overflow-hidden rounded-lg"><div class="flex transition-transform duration-500 ease-in-out" style="${ssrRenderStyle({ transform: `translateX(-${currentSlide.value * 100}%)` })}"><!--[-->`);
      ssrRenderList(unref(testimonials), (testimonial, index) => {
        _push(`<div class="w-full flex-shrink-0 px-1 sm:px-2 md:px-4"><div class="bg-slate-900 border-2 md:border-4 border-black rounded-xl p-4 md:p-8 shadow-[4px_4px_0_0_#00FF94] md:shadow-[8px_8px_0_0_#00FF94]"><div class="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-6"><div class="h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden mb-2 sm:mb-0 sm:mr-4 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] mx-auto sm:mx-0"><img${ssrRenderAttr("src", testimonial.image)}${ssrRenderAttr("alt", testimonial.name)} class="h-full w-full object-cover"></div><div class="text-center sm:text-left"><h4 class="text-base md:text-xl font-bold text-gray-200">${ssrInterpolate(testimonial.name)}</h4><p class="text-xs md:text-base text-gray-400">${ssrInterpolate(testimonial.designation)}</p><a${ssrRenderAttr("href", testimonial.linkedin)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-1">`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fab", "linkedin"],
          class: "text-base md:text-lg mr-1"
        }, null, _parent));
        _push(`<span class="text-xs md:text-sm">View Profile</span></a></div></div><div class="mb-2 md:mb-4 text-center sm:text-left">`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fas", "quote-left"],
          class: "text-[#00FF94] text-lg md:text-3xl mr-2 opacity-80"
        }, null, _parent));
        _push(`</div><p class="text-gray-300 text-xs sm:text-base md:text-lg italic leading-relaxed line-clamp-4 sm:line-clamp-none">${ssrInterpolate(testimonial.text)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="flex justify-between mt-3 mx-auto max-w-xs sm:hidden"><button class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": currentSlide.value === 0 }, "bg-[#00FF94] hover:bg-[#00e082] text-black border-2 border-black rounded-full w-10 h-10 flex items-center justify-center shadow-[2px_2px_0_0_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all focus:outline-none z-10"])}"${ssrIncludeBooleanAttr(currentSlide.value === 0) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "chevron-left"] }, null, _parent));
      _push(`</button><button class="${ssrRenderClass([{
        "opacity-50 cursor-not-allowed": currentSlide.value === unref(testimonials).length - 1
      }, "bg-[#00FF94] hover:bg-[#00e082] text-black border-2 border-black rounded-full w-10 h-10 flex items-center justify-center shadow-[2px_2px_0_0_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all focus:outline-none z-10"])}"${ssrIncludeBooleanAttr(currentSlide.value === unref(testimonials).length - 1) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "chevron-right"] }, null, _parent));
      _push(`</button></div><button class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": currentSlide.value === 0 }, "hidden sm:flex absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-1 md:-translate-x-5 bg-[#00FF94] hover:bg-[#00e082] text-black border-2 border-black rounded-full w-10 h-10 items-center justify-center shadow-[2px_2px_0_0_#000] active:translate-y-[calc(-50%+2px)] active:translate-x-[2px] active:shadow-none transition-all focus:outline-none z-10"])}"${ssrIncludeBooleanAttr(currentSlide.value === 0) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "chevron-left"] }, null, _parent));
      _push(`</button><button class="${ssrRenderClass([{
        "opacity-50 cursor-not-allowed": currentSlide.value === unref(testimonials).length - 1
      }, "hidden sm:flex absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1 md:translate-x-5 bg-[#00FF94] hover:bg-[#00e082] text-black border-2 border-black rounded-full w-10 h-10 items-center justify-center shadow-[2px_2px_0_0_#000] active:translate-y-[calc(-50%+2px)] active:translate-x-[2px] active:shadow-none transition-all focus:outline-none z-10"])}"${ssrIncludeBooleanAttr(currentSlide.value === unref(testimonials).length - 1) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "chevron-right"] }, null, _parent));
      _push(`</button><div class="flex justify-center mt-4 md:mt-8 space-x-2"><!--[-->`);
      ssrRenderList(unref(testimonials), (_, index) => {
        _push(`<button class="${ssrRenderClass([
          currentSlide.value === index ? "bg-[#00FF94] shadow-[1px_1px_0_0_#000] scale-110" : "bg-slate-700 hover:bg-slate-600",
          "w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full transition-all focus:outline-none border border-black"
        ])}"${ssrRenderAttr("aria-label", `Go to testimonial ${index + 1}`)}></button>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/TestimonialsSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const socials = [
  { name: "Email", url: "mailto:connect@rkisdp.dev", icon: ["fas", "envelope"], color: "#EA4335" },
  { name: "GitHub", url: "https://github.com/rkisdp", icon: ["fab", "github"], color: "#ffffff", hoverIconColor: "#000000" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/rkisdp/", icon: ["fab", "linkedin"], color: "#0077b5" },
  { name: "Medium", url: "https://medium.com/@rkisdp", icon: ["fab", "medium"], color: "#ffffff", hoverIconColor: "#000000" },
  { name: "Stack Overflow", url: "https://stackoverflow.com/users/11983208/divya-prakash", icon: ["fab", "stack-overflow"], color: "#f48024" }
];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ContactSection",
  __ssrInlineRender: true,
  setup(__props) {
    const { getThemeComponent } = useTheme();
    const sectionRef = ref(null);
    const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.2 });
    const emojis = ["😍", "🤯", "😳", "😎", "🤔", "😩", "🥹", "😭", "😱"];
    ref(0);
    const currentEmoji = ref(emojis[0]);
    const isEmojiFading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        id: "contact",
        class: "section relative overflow-hidden flex flex-col !pb-0 !px-0"
      }, _attrs))} data-v-6e4e4b9e><div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-6e4e4b9e><div class="absolute w-96 h-96 rounded-full blur-[120px] animate-pulse-glow" style="${ssrRenderStyle({ "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)", "background-color": "rgba(112, 0, 255, 0.1)" })}" data-v-6e4e4b9e></div></div><div class="flex-grow flex items-center justify-center w-full z-10" data-v-6e4e4b9e><div class="container-custom max-w-5xl" data-v-6e4e4b9e><div class="${ssrRenderClass([{ "opacity-0 translate-y-8": !unref(isVisible), "opacity-100 translate-y-0": unref(isVisible) }, "text-center mb-12 md:mb-20"])}" style="${ssrRenderStyle({ "transition": "all 0.8s ease-out" })}" data-v-6e4e4b9e><h2 class="section-title mb-4" data-v-6e4e4b9e> Get In Touch </h2><p class="text-lg text-muted-foreground max-w-2xl mx-auto" data-v-6e4e4b9e> I&#39;m always open to discussing new projects, opportunities, and collaborations. </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" data-v-6e4e4b9e><a href="mailto:connect@rkisdp.dev" class="contact-card email group transition-all duration-200 flex flex-col items-center text-center p-3 md:p-6" style="${ssrRenderStyle({
        opacity: unref(isVisible) ? 1 : 0,
        transform: `translateY(${unref(isVisible) ? 0 : 30}px)`,
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out 0.1s"
      })}" data-v-6e4e4b9e><div class="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#EA4335]/10 flex items-center justify-center mb-3 md:mb-6 border-2 border-black shadow-[2px_2px_0_0_#000] group-hover:bg-[#EA4335]/20 transition-colors" data-v-6e4e4b9e>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fas", "envelope"],
        class: "text-lg md:text-2xl text-[#EA4335]"
      }, null, _parent));
      _push(`</div><h3 class="text-base md:text-xl font-bold text-foreground mb-1 md:mb-2" data-v-6e4e4b9e>Email</h3><p class="text-xs md:text-base text-muted-foreground mb-2 md:mb-4" data-v-6e4e4b9e>Drop me a line anytime</p><span class="text-xs md:text-base text-[#EA4335] font-medium group-hover:underline" data-v-6e4e4b9e>connect@rkisdp.dev</span></a><a href="https://www.linkedin.com/in/rkisdp/" target="_blank" rel="noopener noreferrer" class="contact-card linkedin group transition-all duration-200 flex flex-col items-center text-center p-3 md:p-6" style="${ssrRenderStyle({
        opacity: unref(isVisible) ? 1 : 0,
        transform: `translateY(${unref(isVisible) ? 0 : 30}px)`,
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out 0.2s"
      })}" data-v-6e4e4b9e><div class="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#0077b5]/10 flex items-center justify-center mb-3 md:mb-6 border-2 border-black shadow-[2px_2px_0_0_#000] group-hover:bg-[#0077b5]/20 transition-colors" data-v-6e4e4b9e>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fab", "linkedin"],
        class: "text-lg md:text-2xl text-[#0077b5]"
      }, null, _parent));
      _push(`</div><h3 class="text-base md:text-xl font-bold text-foreground mb-1 md:mb-2" data-v-6e4e4b9e>LinkedIn</h3><p class="text-xs md:text-base text-muted-foreground mb-2 md:mb-4" data-v-6e4e4b9e>Connect professionally</p><span class="text-xs md:text-base text-[#0077b5] font-medium group-hover:underline" data-v-6e4e4b9e>rkisdp</span></a><a href="https://github.com/rkisdp" target="_blank" rel="noopener noreferrer" class="contact-card github group transition-all duration-200 flex flex-col items-center text-center p-3 md:p-6" style="${ssrRenderStyle({
        opacity: unref(isVisible) ? 1 : 0,
        transform: `translateY(${unref(isVisible) ? 0 : 30}px)`,
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out 0.3s"
      })}" data-v-6e4e4b9e><div class="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 md:mb-6 border-2 border-black shadow-[2px_2px_0_0_#000] group-hover:bg-white/20 transition-colors" data-v-6e4e4b9e>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fab", "github"],
        class: "text-lg md:text-2xl text-white"
      }, null, _parent));
      _push(`</div><h3 class="text-base md:text-xl font-bold text-foreground mb-1 md:mb-2" data-v-6e4e4b9e>GitHub</h3><p class="text-xs md:text-base text-muted-foreground mb-2 md:mb-4" data-v-6e4e4b9e>Check out my code</p><span class="text-xs md:text-base text-white font-medium group-hover:underline" data-v-6e4e4b9e>rkisdp</span></a></div></div></div><footer class="w-full text-center pt-8 border-t-2 border-black bg-slate-950 relative z-20" style="${ssrRenderStyle({
        opacity: unref(isVisible) ? 1 : 0,
        transition: "opacity 0.8s ease-out 0.4s"
      })}" data-v-6e4e4b9e><div class="wrapper flex justify-center gap-4 mb-6" data-v-6e4e4b9e><!--[-->`);
      ssrRenderList(unref(socials), (social, index) => {
        _push(`<a${ssrRenderAttr("href", social.url)} target="_blank" rel="noopener noreferrer" class="button" style="${ssrRenderStyle({ "--hover-color": social.color, "--hover-icon-color": social.hoverIconColor || "#ffffff" })}" data-v-6e4e4b9e><div class="icon" data-v-6e4e4b9e>`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: social.icon
        }, null, _parent));
        _push(`</div><span data-v-6e4e4b9e>${ssrInterpolate(social.name)}</span></a>`);
      });
      _push(`<!--]--></div><div class="emoji-footer text-muted-foreground text-sm font-mono mt-10 mb-8" data-v-6e4e4b9e><span data-v-6e4e4b9e>Made with</span><span class="${ssrRenderClass([{ "fade": isEmojiFading.value }, "emoji"])}" data-v-6e4e4b9e>${ssrInterpolate(currentEmoji.value)}</span><span data-v-6e4e4b9e>facial expressions. 2026 Divya Prakash.</span></div>`);
      if (unref(getThemeComponent)(unref(THEME_COMPONENTS).WINTER_SCENE)) {
        _push(`<div class="w-full overflow-hidden pointer-events-none" data-v-6e4e4b9e>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(getThemeComponent)(unref(THEME_COMPONENTS).WINTER_SCENE)?.component), null, null), _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(getThemeComponent)(unref(THEME_COMPONENTS).DIWALI_FOOTER)) {
        _push(`<div class="w-full overflow-hidden pointer-events-none" data-v-6e4e4b9e>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(getThemeComponent)(unref(THEME_COMPONENTS).DIWALI_FOOTER)?.component), null, null), _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</footer></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/ContactSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_9 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6e4e4b9e"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ChatButton",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(false);
    const message = ref("");
    const isFocused = ref(false);
    const isLoadingHistory = ref(false);
    const isSending = ref(false);
    const historyFetched = ref(false);
    const messages = ref([]);
    const messagesContainer = ref(null);
    const greetingParts = [
      "Hi! I'm Divya's AI assistant. 🤖",
      "I've been trained on his resume, projects, and professional background.",
      "How can I help you today?"
    ];
    const isTyping = computed(() => message.value.trim().length > 0);
    const isExpanded = computed(() => isFocused.value || isTyping.value || messages.value.length > 0);
    const scrollToBottom = async () => {
      await nextTick();
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    };
    const fetchHistory = async () => {
      if (isLoadingHistory.value) return;
      isLoadingHistory.value = true;
      try {
        const res = await fetch("https://api.rkisdp.dev/api/visitor-history/", {
          method: "GET",
          credentials: "include"
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        historyFetched.value = true;
        if (!data.is_new && data.history?.length) {
          const allMessages = [];
          for (const session of data.history) {
            allMessages.push(...session.messages ?? []);
          }
          messages.value = allMessages;
          await scrollToBottom();
        }
        if (messages.value.length === 0) {
          for (let i = 0; i < greetingParts.length; i++) {
            setTimeout(async () => {
              const hasUserMessaged = messages.value.some((m) => m.role === "human");
              if (!hasUserMessaged) {
                messages.value.push({
                  role: "ai",
                  content: greetingParts[i],
                  timestamp: (/* @__PURE__ */ new Date()).toISOString()
                });
                await scrollToBottom();
              }
            }, i * 1e3);
          }
        }
      } catch (err) {
        console.error("[ChatButton] Failed to fetch visitor history:", err);
      } finally {
        isLoadingHistory.value = false;
      }
    };
    watch(isOpen, (opened) => {
      if (opened) fetchHistory();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div class="${ssrRenderClass([isExpanded.value ? "w-[380px] h-[480px]" : "w-[320px] h-[350px]", "fixed bottom-24 right-3 sm:right-6 z-[60] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-in-out"])}" style="${ssrRenderStyle(isOpen.value ? null : { display: "none" })}"><div class="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-glass"><h3 class="font-semibold text-foreground">Chat with my AI Persona</h3><button type="button" aria-label="Close chat" class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors">`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fas", "times"],
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button></div><div data-lenis-prevent class="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3">`);
      if (isLoadingHistory.value) {
        _push(`<div class="flex justify-center items-center h-full"><div class="flex flex-col items-center gap-2"><div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div><p class="text-xs text-muted-foreground">Loading history…</p></div></div>`);
      } else if (messages.value.length === 0) {
        _push(`<div class="flex flex-col items-center justify-center h-full gap-2 py-6"><div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_font_awesome_icon, {
          icon: ["fas", "comment-dots"],
          class: "text-primary w-5 h-5"
        }, null, _parent));
        _push(`</div><p class="text-sm font-medium text-foreground">Hey there! 👋</p><p class="text-xs text-muted-foreground text-center px-4"> Ask me anything about my experience, skills, or projects. </p></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(messages.value, (msg, i) => {
          _push(`<div class="${ssrRenderClass([msg.role === "human" ? "justify-end" : "justify-start", "flex"])}"><div class="${ssrRenderClass([msg.role === "human" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted/60 text-foreground rounded-bl-sm border border-white/10", "max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed"])}">${msg.content ?? ""}</div></div>`);
        });
        _push(`<!--]-->`);
      }
      if (isSending.value) {
        _push(`<div class="flex justify-start"><div class="px-3 py-2 rounded-2xl rounded-bl-sm bg-muted/60 border border-white/10 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]"></span><span class="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]"></span><span class="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]"></span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-4 border-t border-white/10"><div class="flex gap-2"><input${ssrRenderAttr("value", message.value)} type="text" placeholder="Type a message..."${ssrIncludeBooleanAttr(isSending.value) ? " disabled" : ""} class="flex-1 min-w-0 px-4 py-3 rounded-xl bg-muted/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><button type="button" class="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(!isTyping.value || isSending.value) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, { icon: ["fas", "arrow-right"] }, null, _parent));
      _push(`</button></div></div></div><button type="button"${ssrRenderAttr("aria-label", isOpen.value ? "Close chat" : "Open chat")} class="${ssrRenderClass([
        "chat-button group flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-glow focus:outline-none",
        isOpen.value && "focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      ])}"><span class="relative inline-flex items-center justify-center w-6 h-6">`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        key: isOpen.value ? "close" : "chat",
        icon: ["fas", isOpen.value ? "times" : "comment-dots"],
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</span></button></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ChatButton.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    useTheme();
    const buttonAnimated = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      const _component_Navigation = _sfc_main$e;
      const _component_HeroSection = __nuxt_component_2;
      const _component_ImpactSection = __nuxt_component_3;
      const _component_SkillsSection = _sfc_main$a;
      const _component_ExperienceSection = __nuxt_component_5;
      const _component_EducationSection = __nuxt_component_6;
      const _component_ArticlesSection = __nuxt_component_7;
      const _component_TestimonialsSection = _sfc_main$5;
      const _component_ContactSection = __nuxt_component_9;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_ChatButton = _sfc_main$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<main class="relative min-h-screen z-10" data-v-394283eb>`);
      _push(ssrRenderComponent(_component_Navigation, null, null, _parent));
      _push(`<div class="w-full" data-v-394283eb>`);
      _push(ssrRenderComponent(_component_HeroSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ImpactSection, null, null, _parent));
      _push(ssrRenderComponent(_component_SkillsSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ExperienceSection, null, null, _parent));
      _push(ssrRenderComponent(_component_EducationSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ArticlesSection, null, null, _parent));
      _push(ssrRenderComponent(_component_TestimonialsSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ContactSection, null, null, _parent));
      _push(`</div><div class="fixed bottom-6 right-3 sm:right-6 z-50 flex flex-row items-center gap-[10px]" data-v-394283eb><a href="https://drive.google.com/file/d/1GAQD4yhAcxU8KQ29KPYeG_b-4C9zFYhR/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="${ssrRenderClass([{ "animated": unref(buttonAnimated) }, "flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 h-12 rounded-full shadow-lg transition-all duration-300 hover:shadow-blue-500/30 hover:translate-y-[-1px]"])}" data-v-394283eb>`);
      _push(ssrRenderComponent(_component_font_awesome_icon, {
        icon: ["fas", "download"],
        size: "sm"
      }, null, _parent));
      _push(`<span class="hidden sm:inline text-sm sm:text-base" data-v-394283eb>Download My Resume</span><span class="sm:hidden text-sm" data-v-394283eb>Resume</span></a>`);
      _push(ssrRenderComponent(_component_ChatButton, null, null, _parent));
      _push(`</div></main><!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-394283eb"]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    const status = Number(_error.statusCode || 500);
    const is404 = status === 404;
    const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-C3shMZd5.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-DqYcSLAK.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ status: unref(status), statusText: unref(statusText), statusCode: unref(status), statusMessage: unref(statusText), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    function invokeAppErrorHandler(err, target, info) {
      const errorHandler = nuxtApp.vueApp.config.errorHandler;
      if (errorHandler && !errorHandler.__nuxt_default) {
        try {
          errorHandler(err, target, info);
        } catch (handlerError) {
          console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
        }
      }
    }
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        invokeAppErrorHandler(err, target, info);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = ((ssrContext) => entry(ssrContext));

export { _export_sfc as _, nuxtLinkDefaults as a, useRouter as b, useRuntimeConfig as c, useTheme as d, entry_default as default, encodeRoutePath as e, navigateTo as n, resolveRouteObject as r, tryUseNuxtApp as t, useNuxtApp as u };
//# sourceMappingURL=server.mjs.map
