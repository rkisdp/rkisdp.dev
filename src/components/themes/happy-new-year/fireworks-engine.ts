import * as THREE from 'three';

const MAX_PARTICLES = 6144;

const PASS = {
  FADE: 1,
  KAWASE_DOWN: 2,
  KAWASE_UP: 3,
  COMPOSITE: 4,
  HAZE: 5,
};

const MODE = {
  SPARK: 0,
  TWINKLE: 1,
  DUST: 2,
  HEAD: 3,
  BRANCH: 4,
};

export interface FireworksConfig {
  fadeRate?: number;
  exposure?: number;
  toe?: number;
  bloomStrength?: number;
  bloomThreshold?: number;
  launchRate?: number;
}

export interface FireworksPalette {
  mains: string[];
  accents: string[];
  skyTop: string;
  skyBottom: string;
  skyGlow: string;
}

const DEFAULT_CONFIG: Required<FireworksConfig> = {
  fadeRate: 8,
  exposure: 2.8,
  toe: 1.35,
  bloomStrength: 0.65,
  bloomThreshold: 0.15,
  launchRate: 1,
};

export const DEFAULT_PALETTE: FireworksPalette = {
  mains: ['#00d5ff', '#55d1ff', '#99c8ff', '#bda8ff', '#eeadff'],
  accents: ['#ffd98a', '#ffedcb'],
  skyTop: '#090b0f',
  skyBottom: '#10141b',
  skyGlow: '#1c2432',
};

const DUST_COLOR = new THREE.Vector3(1, 0.72, 0.42);
const HEAD_COLOR = new THREE.Vector3(1, 0.95, 0.82);
const TMP_COLOR = new THREE.Vector3();

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hexToVec3(hex: string): THREE.Vector3 {
  const color = new THREE.Color(hex);
  return new THREE.Vector3(color.r, color.g, color.b);
}

function setVec3FromHex(target: THREE.Vector3, hex: string): void {
  const color = new THREE.Color(hex);
  target.set(color.r, color.g, color.b);
}

function makeTarget(width: number, height: number): THREE.WebGLRenderTarget {
  return new THREE.WebGLRenderTarget(width, height, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    stencilBuffer: false,
  });
}

const QUAD_VERTEX = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const COMPOSITE_FRAGMENT = /* glsl */ `
precision highp float;

uniform sampler2D uTexture;
uniform sampler2D uBloomTexture;
uniform sampler2D uHazeTexture;
uniform int uPass;

uniform float uDecay;
uniform float uFloor;
uniform vec2 uResolution;
uniform float uAspect;
uniform float uTime;
uniform float uExposure;
uniform float uToe;
uniform float uBloomStrength;
uniform float uThreshold;
uniform float uBloomSource;
uniform vec3 uSkyTop;
uniform vec3 uSkyBottom;
uniform vec3 uSkyGlow;

varying vec2 vUv;

#define PASS_FADE 1
#define PASS_KAWASE_DOWN 2
#define PASS_KAWASE_UP 3
#define PASS_COMPOSITE 4
#define PASS_HAZE 5

float bloomRatio(vec4 s) {
  float maxc = max(s.r, max(s.g, s.b));
  return min(s.a / max(maxc, 1e-4), 1.0);
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 3; i++) {
    value += valueNoise(p) * amplitude;
    p *= 2.1;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  if (uPass == PASS_FADE) {
    vec4 faded = max(texture2D(uTexture, vUv) * uDecay - uFloor, 0.0);
    gl_FragColor = faded;
  } else if (uPass == PASS_KAWASE_DOWN) {
    vec2 halfPixel = 0.5 / uResolution;
    vec4 s0 = texture2D(uTexture, vUv);
    vec4 s1 = texture2D(uTexture, vUv - halfPixel);
    vec4 s2 = texture2D(uTexture, vUv + halfPixel);
    vec4 s3 = texture2D(uTexture, vUv + vec2(halfPixel.x, -halfPixel.y));
    vec4 s4 = texture2D(uTexture, vUv - vec2(halfPixel.x, -halfPixel.y));

    vec3 color;
    if (uBloomSource > 0.5) {
      color = s0.rgb * bloomRatio(s0) * 4.0;
      color += s1.rgb * bloomRatio(s1);
      color += s2.rgb * bloomRatio(s2);
      color += s3.rgb * bloomRatio(s3);
      color += s4.rgb * bloomRatio(s4);
    } else {
      color = s0.rgb * 4.0 + s1.rgb + s2.rgb + s3.rgb + s4.rgb;
    }
    color /= 8.0;

    float lum = max(color.r, max(color.g, color.b));
    color *= max(lum - uThreshold, 0.0) / max(lum, 1e-4);

    gl_FragColor = vec4(color, 1.0);
  } else if (uPass == PASS_KAWASE_UP) {
    vec2 halfPixel = 0.5 / uResolution;
    vec3 color = texture2D(uTexture, vUv + vec2(-halfPixel.x * 2.0, 0.0)).rgb;
    color += texture2D(uTexture, vUv + vec2(-halfPixel.x, halfPixel.y)).rgb * 2.0;
    color += texture2D(uTexture, vUv + vec2(0.0, halfPixel.y * 2.0)).rgb;
    color += texture2D(uTexture, vUv + vec2(halfPixel.x, halfPixel.y)).rgb * 2.0;
    color += texture2D(uTexture, vUv + vec2(halfPixel.x * 2.0, 0.0)).rgb;
    color += texture2D(uTexture, vUv + vec2(halfPixel.x, -halfPixel.y)).rgb * 2.0;
    color += texture2D(uTexture, vUv + vec2(0.0, -halfPixel.y * 2.0)).rgb;
    color += texture2D(uTexture, vUv + vec2(-halfPixel.x, -halfPixel.y)).rgb * 2.0;
    gl_FragColor = vec4(color / 12.0, 1.0);
  } else if (uPass == PASS_HAZE) {
    vec2 p = vec2(vUv.x * uAspect, vUv.y);
    float haze = fbm(p * 2.2 + vec2(uTime * 0.012, 0.0));
    gl_FragColor = vec4(haze, 0.0, 0.0, 1.0);
  } else {
    vec3 sky = mix(uSkyBottom, uSkyTop, smoothstep(0.0, 1.0, vUv.y));

    float haze = texture2D(uHazeTexture, vUv).r;
    float hazeWeight = mix(0.3, 0.18, vUv.y);
    sky *= 1.0 + haze * hazeWeight;

    sky += uSkyGlow * exp(-vUv.y * 5.0) * (0.18 + 0.18 * haze);

    vec3 trail = texture2D(uTexture, vUv).rgb;
    vec3 bloom = texture2D(uBloomTexture, vUv).rgb * uBloomStrength;

    vec3 shaped = pow(trail, vec3(uToe)) + bloom;
    vec3 mapped = 1.0 - exp(-shaped * uExposure);
    vec3 color = sky + mapped;

    float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    color += (dither - 0.5) / 255.0;

    // Translucent alpha so website content remains visible behind fireworks
    float alpha = clamp(length(mapped) * 1.8 + haze * 0.12, 0.0, 0.85);
    gl_FragColor = vec4(color, alpha);
  }
}
`;

const POINTS_VERTEX = /* glsl */ `
attribute float aSize;
attribute float aAlpha;
attribute float aBloom;
attribute vec3 aColor;

uniform float uAspect;
uniform float uHeightPx;

varying vec3 vColor;
varying float vAlpha;
varying float vBloom;

void main() {
  vec2 ndc = vec2(position.x / uAspect, position.y) * 2.0 - 1.0;
  gl_Position = vec4(ndc, 0.0, 1.0);
  gl_PointSize = max(aSize * uHeightPx, 1.5);
  vColor = aColor;
  vAlpha = aAlpha;
  vBloom = aBloom;
}
`;

const POINTS_FRAGMENT = /* glsl */ `
precision highp float;

varying vec3 vColor;
varying float vAlpha;
varying float vBloom;

void main() {
  vec2 p = gl_PointCoord - 0.5;
  float d2 = dot(p, p) * 4.0;
  const float HALO_FALLOFF = 2.0;
  float core = exp(-d2 * 7.0);
  float halo = max(exp(-d2 * HALO_FALLOFF) - exp(-HALO_FALLOFF), 0.0) * 0.35;
  float intensity = (core + halo) * vAlpha;
  float lum = intensity * intensity;
  gl_FragColor = vec4(vColor * lum, lum * vBloom);
}
`;

export class FireworksWorld {
  domParent: HTMLElement;
  config: Required<FireworksConfig>;
  dpr: number;
  width: number;
  height: number;
  deltaTime: number;
  lastTime: number;
  simTime: number;
  particleCount: number;
  shells: any[];
  pendingLaunches: any[];
  nextPlanAt: number;
  disposed: boolean;

  posX: Float32Array;
  posY: Float32Array;
  velX: Float32Array;
  velY: Float32Array;
  ages: Float32Array;
  lifespans: Float32Array;
  sizes: Float32Array;
  baseAlphas: Float32Array;
  drags: Float32Array;
  gravities: Float32Array;
  twinkleFreqs: Float32Array;
  twinklePhases: Float32Array;
  coolings: Float32Array;
  splitAts: Float32Array;
  colR: Float32Array;
  colG: Float32Array;
  colB: Float32Array;
  modes: Uint8Array;

  paletteMains!: THREE.Vector3[];
  paletteAccents!: THREE.Vector3[];
  skyTopHex!: string;
  skyBottomHex!: string;
  skyGlowHex!: string;

  renderer!: THREE.WebGLRenderer;
  camera!: THREE.OrthographicCamera;
  quadGeometry!: THREE.PlaneGeometry;
  trailRead!: THREE.WebGLRenderTarget;
  trailWrite!: THREE.WebGLRenderTarget;
  bloomLevels!: THREE.WebGLRenderTarget[];
  hazeTarget!: THREE.WebGLRenderTarget;

  fadePass!: any;
  kawaseDownPass!: any;
  kawaseUpPass!: any;
  hazePass!: any;
  compositePass!: any;

  pointsGeometry!: THREE.BufferGeometry;
  positionAttribute!: THREE.BufferAttribute;
  colorAttribute!: THREE.BufferAttribute;
  sizeAttribute!: THREE.BufferAttribute;
  alphaAttribute!: THREE.BufferAttribute;
  bloomAttribute!: THREE.BufferAttribute;
  pointsMaterial!: THREE.ShaderMaterial;
  pointsScene!: THREE.Scene;

  boundUpdate: (now: number) => void;
  boundResize: () => void;
  resizeObserver: ResizeObserver | null;
  rafID: number = 0;

  constructor(domParent: HTMLElement, config: FireworksConfig = {}, palette: FireworksPalette = DEFAULT_PALETTE) {
    this.domParent = domParent;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = Math.max(1, domParent.clientWidth || window.innerWidth);
    this.height = Math.max(1, domParent.clientHeight || window.innerHeight);
    this.deltaTime = 16;
    this.lastTime = performance.now();
    this.simTime = 0;
    this.particleCount = 0;
    this.shells = [];
    this.pendingLaunches = [];
    this.nextPlanAt = 0;
    this.disposed = false;

    this.posX = new Float32Array(MAX_PARTICLES);
    this.posY = new Float32Array(MAX_PARTICLES);
    this.velX = new Float32Array(MAX_PARTICLES);
    this.velY = new Float32Array(MAX_PARTICLES);
    this.ages = new Float32Array(MAX_PARTICLES);
    this.lifespans = new Float32Array(MAX_PARTICLES);
    this.sizes = new Float32Array(MAX_PARTICLES);
    this.baseAlphas = new Float32Array(MAX_PARTICLES);
    this.drags = new Float32Array(MAX_PARTICLES);
    this.gravities = new Float32Array(MAX_PARTICLES);
    this.twinkleFreqs = new Float32Array(MAX_PARTICLES);
    this.twinklePhases = new Float32Array(MAX_PARTICLES);
    this.coolings = new Float32Array(MAX_PARTICLES);
    this.splitAts = new Float32Array(MAX_PARTICLES);
    this.colR = new Float32Array(MAX_PARTICLES);
    this.colG = new Float32Array(MAX_PARTICLES);
    this.colB = new Float32Array(MAX_PARTICLES);
    this.modes = new Uint8Array(MAX_PARTICLES);

    this.setPalette(palette);

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false,
    });
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.width, this.height, false);
    this.renderer.autoClear = false;
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.pointerEvents = 'none';
    domParent.appendChild(this.renderer.domElement);

    this.init();

    this.boundUpdate = this.update.bind(this);
    this.boundResize = this.resize.bind(this);
    this.resizeObserver = new ResizeObserver(this.boundResize);
    this.resizeObserver.observe(domParent);
    this.rafID = requestAnimationFrame(this.boundUpdate);
  }

  get aspect(): number {
    return this.width / Math.max(this.height, 1);
  }

  get trailWidth(): number {
    return Math.max(1, Math.round(this.width * this.dpr * 0.7));
  }

  get trailHeight(): number {
    return Math.max(1, Math.round(this.height * this.dpr * 0.7));
  }

  get hazeWidth(): number {
    return Math.max(1, Math.round(this.width * this.dpr * 0.25));
  }

  get hazeHeight(): number {
    return Math.max(1, Math.round(this.height * this.dpr * 0.25));
  }

  bloomLevelWidth(level: number): number {
    return Math.max(1, this.trailWidth >> (level + 1));
  }

  bloomLevelHeight(level: number): number {
    return Math.max(1, this.trailHeight >> (level + 1));
  }

  init() {
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quadGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    this.createTargets();
    this.createPasses();
    this.createPoints();
    this.applyPaletteUniforms();
    this.onResize();
    this.prewarmPrograms();
    this.scheduleOpeningShow();
  }

  setPalette(palette: FireworksPalette) {
    this.paletteMains = palette.mains.map(hexToVec3);
    this.paletteAccents = palette.accents.map(hexToVec3);
    this.skyTopHex = palette.skyTop;
    this.skyBottomHex = palette.skyBottom;
    this.skyGlowHex = palette.skyGlow;
  }

  applyPaletteUniforms() {
    setVec3FromHex(this.compositePass.material.uniforms.uSkyTop.value, this.skyTopHex);
    setVec3FromHex(this.compositePass.material.uniforms.uSkyBottom.value, this.skyBottomHex);
    setVec3FromHex(this.compositePass.material.uniforms.uSkyGlow.value, this.skyGlowHex);
  }

  createTargets() {
    this.trailRead = makeTarget(this.trailWidth, this.trailHeight);
    this.trailWrite = makeTarget(this.trailWidth, this.trailHeight);
    this.bloomLevels = [];
    for (let i = 0; i < 4; i++) {
      this.bloomLevels.push(makeTarget(this.bloomLevelWidth(i), this.bloomLevelHeight(i)));
    }
    this.hazeTarget = makeTarget(this.hazeWidth, this.hazeHeight);
  }

  createPass(passId: number) {
    const material = new THREE.ShaderMaterial({
      vertexShader: QUAD_VERTEX,
      fragmentShader: COMPOSITE_FRAGMENT,
      uniforms: {
        uAspect: { value: 1 },
        uBloomStrength: { value: this.config.bloomStrength },
        uBloomTexture: { value: null },
        uDecay: { value: 1 },
        uExposure: { value: this.config.exposure },
        uFloor: { value: 0 },
        uHazeTexture: { value: null },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uSkyBottom: { value: new THREE.Vector3() },
        uSkyGlow: { value: new THREE.Vector3() },
        uSkyTop: { value: new THREE.Vector3() },
        uBloomSource: { value: 0 },
        uTexture: { value: null },
        uThreshold: { value: 0 },
        uTime: { value: 0 },
        uToe: { value: this.config.toe },
        uPass: { value: passId },
      },
      depthTest: false,
      depthWrite: false,
    });

    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(this.quadGeometry, material));
    return { material, scene };
  }

  createPasses() {
    this.fadePass = this.createPass(PASS.FADE);
    this.kawaseDownPass = this.createPass(PASS.KAWASE_DOWN);
    this.kawaseUpPass = this.createPass(PASS.KAWASE_UP);
    this.hazePass = this.createPass(PASS.HAZE);
    this.compositePass = this.createPass(PASS.COMPOSITE);
  }

  getPasses() {
    return [
      this.fadePass,
      this.kawaseDownPass,
      this.kawaseUpPass,
      this.hazePass,
      this.compositePass,
    ];
  }

  prewarmPrograms() {
    this.renderer.compile(this.pointsScene, this.camera);
    for (const pass of this.getPasses()) {
      this.renderer.compile(pass.scene, this.camera);
    }
  }

  createPoints() {
    this.pointsGeometry = new THREE.BufferGeometry();
    this.positionAttribute = new THREE.BufferAttribute(new Float32Array(MAX_PARTICLES * 3), 3);
    this.colorAttribute = new THREE.BufferAttribute(new Float32Array(MAX_PARTICLES * 3), 3);
    this.sizeAttribute = new THREE.BufferAttribute(new Float32Array(MAX_PARTICLES), 1);
    this.alphaAttribute = new THREE.BufferAttribute(new Float32Array(MAX_PARTICLES), 1);
    this.bloomAttribute = new THREE.BufferAttribute(new Float32Array(MAX_PARTICLES), 1);

    for (const attribute of [
      this.positionAttribute,
      this.colorAttribute,
      this.sizeAttribute,
      this.alphaAttribute,
      this.bloomAttribute,
    ]) {
      attribute.setUsage(THREE.DynamicDrawUsage);
    }

    this.pointsGeometry.setAttribute('position', this.positionAttribute);
    this.pointsGeometry.setAttribute('aColor', this.colorAttribute);
    this.pointsGeometry.setAttribute('aSize', this.sizeAttribute);
    this.pointsGeometry.setAttribute('aAlpha', this.alphaAttribute);
    this.pointsGeometry.setAttribute('aBloom', this.bloomAttribute);
    this.pointsGeometry.setDrawRange(0, 0);

    this.pointsMaterial = new THREE.ShaderMaterial({
      vertexShader: POINTS_VERTEX,
      fragmentShader: POINTS_FRAGMENT,
      uniforms: {
        uAspect: { value: 1 },
        uHeightPx: { value: 1 },
      },
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      premultipliedAlpha: true,
      transparent: true,
    });

    const points = new THREE.Points(this.pointsGeometry, this.pointsMaterial);
    points.frustumCulled = false;
    this.pointsScene = new THREE.Scene();
    this.pointsScene.add(points);
  }

  scheduleOpeningShow() {
    // ALWAYS launch rockets from the bottom of the screen!
    this.pendingLaunches.push(
      { at: 0.1, airBurst: false },
      { at: 0.4, airBurst: false },
      { at: 0.8, airBurst: false },
      { at: 1.2, airBurst: false }
    );
    this.nextPlanAt = 1.6;
  }

  onResize() {
    this.trailRead.setSize(this.trailWidth, this.trailHeight);
    this.trailWrite.setSize(this.trailWidth, this.trailHeight);
    for (let i = 0; i < this.bloomLevels.length; i++) {
      this.bloomLevels[i].setSize(this.bloomLevelWidth(i), this.bloomLevelHeight(i));
    }
    this.hazeTarget.setSize(this.hazeWidth, this.hazeHeight);

    this.hazePass.material.uniforms.uAspect.value = this.aspect;
    this.compositePass.material.uniforms.uAspect.value = this.aspect;
    this.pointsMaterial.uniforms.uAspect.value = this.aspect;
    this.pointsMaterial.uniforms.uHeightPx.value = this.trailHeight;
    this.clearTargets();
  }

  clearTargets() {
    for (const target of [this.trailRead, this.trailWrite, this.hazeTarget, ...this.bloomLevels]) {
      this.renderer.setRenderTarget(target);
      this.renderer.clear();
    }
    this.renderer.setRenderTarget(null);
  }

  spawnParticle(opts: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    lifespan: number;
    size: number;
    alpha: number;
    drag: number;
    gravity: number;
    color: THREE.Vector3;
    cooling: number;
    mode: number;
    splitAt?: number;
  }) {
    if (this.particleCount >= MAX_PARTICLES) return;

    const i = this.particleCount++;
    this.posX[i] = opts.x;
    this.posY[i] = opts.y;
    this.velX[i] = opts.vx;
    this.velY[i] = opts.vy;
    this.ages[i] = 0;
    this.lifespans[i] = opts.lifespan;
    this.sizes[i] = opts.size;
    this.baseAlphas[i] = opts.alpha;
    this.drags[i] = opts.drag;
    this.gravities[i] = opts.gravity;
    this.twinkleFreqs[i] = rand(12, 34);
    this.twinklePhases[i] = Math.random() * Math.PI * 2;
    this.coolings[i] = opts.cooling;
    this.splitAts[i] = opts.splitAt || 0;
    this.colR[i] = opts.color.x;
    this.colG[i] = opts.color.y;
    this.colB[i] = opts.color.z;
    this.modes[i] = opts.mode;
  }

  killParticle(index: number) {
    const last = --this.particleCount;
    if (index === last) return;

    this.posX[index] = this.posX[last];
    this.posY[index] = this.posY[last];
    this.velX[index] = this.velX[last];
    this.velY[index] = this.velY[last];
    this.ages[index] = this.ages[last];
    this.lifespans[index] = this.lifespans[last];
    this.sizes[index] = this.sizes[last];
    this.baseAlphas[index] = this.baseAlphas[last];
    this.drags[index] = this.drags[last];
    this.gravities[index] = this.gravities[last];
    this.twinkleFreqs[index] = this.twinkleFreqs[last];
    this.twinklePhases[index] = this.twinklePhases[last];
    this.coolings[index] = this.coolings[last];
    this.splitAts[index] = this.splitAts[last];
    this.colR[index] = this.colR[last];
    this.colG[index] = this.colG[last];
    this.colB[index] = this.colB[last];
    this.modes[index] = this.modes[last];
  }

  pickBurstColor(accentChance: number) {
    const accents = this.paletteAccents;
    const mains = this.paletteMains;
    const pool =
      accents.length > 0 && (mains.length === 0 || Math.random() < accentChance)
        ? accents
        : mains;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  planLaunches() {
    if (this.simTime < this.nextPlanAt) return;

    const roll = Math.random();
    const count = roll < 0.5 ? 1 : roll < 0.85 ? 2 : 3;
    let delay = 0;

    for (let i = 0; i < count; i++) {
      if (this.shells.length + this.pendingLaunches.length >= 9) break;
      this.pendingLaunches.push({
        at: this.simTime + delay,
        airBurst: false, // Ensure rocket launches from the bottom!
      });
      delay += rand(0.12, 0.35);
    }

    this.nextPlanAt = this.simTime + rand(0.6, 1.5) / Math.max(this.config.launchRate, 0.01);
  }

  runPendingLaunches() {
    for (let i = this.pendingLaunches.length - 1; i >= 0; i--) {
      const launch = this.pendingLaunches[i];
      if (this.simTime < launch.at) continue;

      this.pendingLaunches.splice(i, 1);

      const margin = Math.min(0.12, 0.25 * this.aspect);
      let x;
      if (this.aspect > 1.2 && Math.random() < 0.6) {
        const edge = 0.3 * this.aspect;
        x = Math.random() < 0.5 ? rand(margin, edge) : rand(this.aspect - edge, this.aspect - margin);
      } else {
        x = rand(margin, this.aspect - margin);
      }

      const peakY = rand(0.52, 0.8);
      if (launch.airBurst) {
        this.burst(x, rand(0.5, 0.78), null);
      } else {
        this.launchShell(x, peakY);
      }
    }
  }

  makeBurstSpec() {
    const roll = Math.random();
    const burstType =
      roll < 0.26
        ? 'peony'
        : roll < 0.44
          ? 'chrysanthemum'
          : roll < 0.56
            ? 'willow'
            : roll < 0.66
              ? 'ring'
              : roll < 0.78
                ? 'palm'
                : roll < 0.9
                  ? 'crossette'
                  : 'horsetail';

    const accentChance =
      burstType === 'willow' || burstType === 'palm' || burstType === 'horsetail'
        ? 0.85
        : burstType === 'chrysanthemum'
          ? 0.4
          : 0.25;

    const color = this.pickBurstColor(accentChance);
    const color2 =
      (burstType === 'peony' || burstType === 'chrysanthemum' || burstType === 'ring') &&
      Math.random() < 0.5 &&
      this.paletteMains.length > 1
        ? this.pickBurstColor(0.1)
        : null;

    return { burstType, color, color2 };
  }

  launchShell(x: number, peakY: number) {
    const speed = rand(0.68, 0.88);
    const { burstType, color, color2 } = this.makeBurstSpec();
    this.shells.push({
      x,
      y: -0.03,
      vx: rand(-0.025, 0.025),
      vy: speed,
      decel: (speed * speed) / (2 * (peakY - -0.03)),
      burstVy: speed * rand(0.12, 0.22),
      burstAt: null,
      burstType,
      color,
      color2,
      dustCarry: 0,
      headCarry: 0,
    });
  }

  updateShells(dt: number) {
    for (let i = this.shells.length - 1; i >= 0; i--) {
      const shell = this.shells[i];
      shell.vy -= shell.decel * dt;
      shell.x += shell.vx * dt;
      shell.y += shell.vy * dt;

      if (shell.burstAt !== null) {
        if (this.simTime >= shell.burstAt) {
          this.shells.splice(i, 1);
          this.burst(shell.x, shell.y, shell);
        }
        continue;
      }

      if (shell.vy <= shell.burstVy) {
        shell.burstAt = this.simTime + rand(0.15, 0.3);
        continue;
      }

      shell.dustCarry += 160 * dt;
      while (shell.dustCarry >= 1) {
        shell.dustCarry -= 1;
        this.spawnParticle({
          x: shell.x + rand(-0.003, 0.003),
          y: shell.y + rand(-0.004, 0.001),
          vx: rand(-0.02, 0.02) - 0.15 * shell.vx,
          vy: rand(-0.03, 0.005) - 0.1 * shell.vy,
          lifespan: rand(0.35, 0.7),
          size: rand(0.004, 0.007),
          alpha: rand(0.7, 0.95),
          drag: 0.9,
          gravity: -0.08,
          color: Math.random() < 0.6 ? DUST_COLOR : shell.color,
          cooling: 5,
          mode: MODE.DUST,
        });
      }

      shell.headCarry += 100 * dt;
      while (shell.headCarry >= 1) {
        shell.headCarry -= 1;
        this.spawnParticle({
          x: shell.x,
          y: shell.y,
          vx: 0.2 * shell.vx,
          vy: 0.2 * shell.vy,
          lifespan: 0.12,
          size: 0.01,
          alpha: 1.0,
          drag: 0,
          gravity: 0,
          color: HEAD_COLOR,
          cooling: 0,
          mode: MODE.HEAD,
        });
      }
    }
  }

  burst(x: number, y: number, shell: any) {
    const { burstType, color, color2 } = shell ?? this.makeBurstSpec();
    const inherit = shell
      ? { x: shell.vx, y: shell.vy }
      : { x: rand(-0.02, 0.02), y: rand(0.02, 0.07) };

    switch (burstType) {
      case 'willow':
        this.burstWillow(x, y, color, inherit);
        break;
      case 'ring':
        this.burstRing(x, y, color, color2, inherit);
        break;
      case 'palm':
        this.burstPalm(x, y, color, inherit);
        break;
      case 'crossette':
        this.burstCrossette(x, y, color, inherit);
        break;
      case 'horsetail':
        this.burstHorsetail(x, y, color, inherit);
        break;
      default:
        this.burstSphere(x, y, burstType, color, color2, inherit);
    }
  }

  randomSphereDirection(): [number, number] {
    let x: number, y: number, z: number, mag: number;
    do {
      x = 2 * Math.random() - 1;
      y = 2 * Math.random() - 1;
      z = 2 * Math.random() - 1;
      mag = x * x + y * y + z * z;
    } while (mag > 1 || mag < 1e-4);
    const inv = 1 / Math.sqrt(mag);
    return [x * inv, y * inv];
  }

  sparkColor(color: THREE.Vector3, color2: THREE.Vector3 | null) {
    return color2 ? TMP_COLOR.lerpVectors(color, color2, Math.random()) : color;
  }

  burstSphere(x: number, y: number, type: string, color: THREE.Vector3, color2: THREE.Vector3 | null, inherit: any) {
    const chrysanthemum = type === 'chrysanthemum';
    const count = Math.round(chrysanthemum ? rand(200, 280) : rand(180, 260));
    const radius = chrysanthemum ? rand(0.14, 0.21) : rand(0.16, 0.26);
    const drag = chrysanthemum ? 1.4 : 1.5;
    const life = chrysanthemum ? rand(3.4, 4.8) : rand(2.8, 3.9);
    const gravity = chrysanthemum ? -0.055 : -0.07;
    const alpha = chrysanthemum ? 0.7 : 0.85;
    const speed = radius * drag;

    for (let i = 0; i < count; i++) {
      const [dx, dy] = this.randomSphereDirection();
      const mag = speed * (Math.random() < 0.15 ? rand(0.3, 0.7) : rand(0.85, 1.15));
      const twinkle = chrysanthemum && Math.random() < 0.7;
      const offset = radius * rand(0.03, 0.1);
      this.spawnParticle({
        x: x + dx * offset,
        y: y + dy * offset,
        vx: dx * mag + inherit.x,
        vy: dy * mag + inherit.y,
        lifespan: life * rand(0.75, 1.15),
        size: 0.0042 * rand(0.8, Math.random() < 0.05 ? 1.9 : 1.3),
        alpha: alpha * rand(0.75, 1.1),
        drag,
        gravity,
        color: this.sparkColor(color, color2),
        cooling: 3,
        mode: twinkle ? MODE.TWINKLE : MODE.SPARK,
      });
    }

    if (!chrysanthemum && Math.random() < 0.35) {
      const pistil = this.pickBurstColor(0.6);
      const inner = Math.round(rand(40, 60));
      for (let i = 0; i < inner; i++) {
        const [dx, dy] = this.randomSphereDirection();
        const mag = 0.35 * speed * rand(0.8, 1.1);
        this.spawnParticle({
          x,
          y,
          vx: dx * mag + inherit.x,
          vy: dy * mag + inherit.y,
          lifespan: life * rand(0.6, 0.9),
          size: 0.0042,
          alpha: 0.8,
          drag,
          gravity,
          color: pistil,
          cooling: 4,
          mode: MODE.SPARK,
        });
      }
    }
  }

  burstWillow(x: number, y: number, color: THREE.Vector3, inherit: any) {
    const count = Math.round(rand(100, 150));
    const radius = rand(0.11, 0.17);
    const life = rand(3.9, 5.3);
    const speed = 0.85 * radius;

    for (let i = 0; i < count; i++) {
      const [dx, dy] = this.randomSphereDirection();
      const mag = speed * (Math.random() < 0.15 ? rand(0.3, 0.7) : rand(0.85, 1.15));
      const offset = radius * rand(0.03, 0.1);
      this.spawnParticle({
        x: x + dx * offset,
        y: y + dy * offset,
        vx: dx * mag + inherit.x,
        vy: dy * mag + inherit.y,
        lifespan: life * rand(0.75, 1.15),
        size: 0.005 * rand(0.8, 1.3),
        alpha: 0.5 * rand(0.75, 1.1),
        drag: 0.85,
        gravity: -0.12,
        color,
        cooling: 5,
        mode: Math.random() < 0.3 ? MODE.TWINKLE : MODE.SPARK,
      });
    }
  }

  burstRing(x: number, y: number, color: THREE.Vector3, color2: THREE.Vector3 | null, inherit: any) {
    const count = Math.round(rand(90, 130));
    const radius = rand(0.14, 0.22);
    const life = rand(3, 4.1);
    const speed = 1.5 * radius;

    let nx = rand(-0.7, 0.7);
    let ny = rand(-0.7, 0.7);
    let nz = 1;
    const nLen = Math.hypot(nx, ny, nz);
    nx /= nLen;
    ny /= nLen;
    nz /= nLen;

    let ax = -nz;
    let ay = 0;
    let az = nx;
    const aLen = Math.hypot(ax, az);
    ax /= aLen;
    az /= aLen;

    const bx = ny * az;
    const by = nz * ax - nx * az;

    const spawnRing = (n: number, scale: number) => {
      for (let i = 0; i < n; i++) {
        const theta = (i / n) * Math.PI * 2 + rand(-0.06, 0.06);
        const dx = ax * Math.cos(theta) + bx * Math.sin(theta);
        const dy = by * Math.sin(theta);
        const mag = speed * scale * rand(0.92, 1.08);
        const offset = radius * rand(0.03, 0.08);
        this.spawnParticle({
          x: x + dx * offset,
          y: y + dy * offset,
          vx: dx * mag + inherit.x,
          vy: dy * mag + inherit.y,
          lifespan: life * rand(0.85, 1.1),
          size: 0.0042,
          alpha: 0.85 * rand(0.8, 1.1),
          drag: 1.5,
          gravity: -0.06,
          color: this.sparkColor(color, color2),
          cooling: 3.5,
          mode: MODE.SPARK,
        });
      }
    };

    spawnRing(count, 1);
    if (Math.random() < 0.4) {
      spawnRing(Math.round(0.6 * count), rand(0.5, 0.65));
    }
  }

  burstPalm(x: number, y: number, color: THREE.Vector3, inherit: any) {
    const branches = Math.round(rand(10, 15));
    const radius = rand(0.15, 0.22);
    const life = rand(2.3, 3.2);
    const speed = 1.1 * radius * 1.6;

    for (let i = 0; i < branches; i++) {
      const theta = rand(0, Math.PI * 2);
      const phi = rand(0.25, 1.1);
      const dx = Math.cos(theta) * Math.cos(phi);
      const dy = Math.sin(phi);
      const mag = speed * rand(0.8, 1.1);
      const offset = radius * rand(0.05, 0.12);
      const lifespan = life * rand(0.9, 1.1);
      this.spawnParticle({
        x: x + dx * offset,
        y: y + dy * offset,
        vx: dx * mag + inherit.x,
        vy: dy * mag + inherit.y,
        lifespan,
        size: 0.0064,
        alpha: 0.95,
        drag: 1.1,
        gravity: -0.2,
        color,
        cooling: 2.5,
        mode: MODE.BRANCH,
        splitAt: lifespan * rand(0.55, 0.75),
      });
    }

    for (let i = 0; i < 40; i++) {
      const [dx, dy] = this.randomSphereDirection();
      const mag = speed * rand(0.2, 0.4);
      this.spawnParticle({
        x,
        y,
        vx: dx * mag + inherit.x,
        vy: dy * mag + inherit.y,
        lifespan: rand(1, 1.8),
        size: 0.0032,
        alpha: 0.4,
        drag: 1.6,
        gravity: -0.07,
        color,
        cooling: 4,
        mode: MODE.SPARK,
      });
    }
  }

  burstCrossette(x: number, y: number, color: THREE.Vector3, inherit: any) {
    const count = Math.round(rand(28, 40));
    const radius = rand(0.14, 0.2);
    const speed = 1.3 * radius;

    for (let i = 0; i < count; i++) {
      const [dx, dy] = this.randomSphereDirection();
      const mag = speed * rand(0.9, 1.1);
      const offset = radius * rand(0.03, 0.1);
      this.spawnParticle({
        x: x + dx * offset,
        y: y + dy * offset,
        vx: dx * mag + inherit.x,
        vy: dy * mag + inherit.y,
        lifespan: rand(1.8, 2.4),
        size: 0.0052,
        alpha: 0.9,
        drag: 1.3,
        gravity: -0.08,
        color,
        cooling: 4,
        mode: MODE.SPARK,
        splitAt: rand(0.55, 0.9),
      });
    }
  }

  burstHorsetail(x: number, y: number, color: THREE.Vector3, inherit: any) {
    const count = Math.round(rand(60, 90));
    const radius = rand(0.07, 0.1);
    const life = rand(3, 4.1);
    const speed = radius;

    for (let i = 0; i < count; i++) {
      const theta = rand(0, Math.PI * 2);
      const phi = rand(-1.4, -0.15);
      const dx = Math.cos(theta) * Math.cos(phi);
      const dy = Math.sin(phi);
      const mag = speed * rand(0.7, 1.1);
      const offset = radius * rand(0.05, 0.15);
      this.spawnParticle({
        x: x + dx * offset,
        y: y + dy * offset,
        vx: dx * mag + inherit.x,
        vy: dy * mag + inherit.y,
        lifespan: life * rand(0.85, 1.15),
        size: 0.0055,
        alpha: 0.75,
        drag: 1,
        gravity: -0.2,
        color,
        cooling: 2.5,
        mode: MODE.BRANCH,
      });
    }
  }

  splitCrossette(index: number) {
    const x = this.posX[index];
    const y = this.posY[index];
    const color = TMP_COLOR.set(this.colR[index], this.colG[index], this.colB[index]);

    for (let i = 0; i < 7; i++) {
      const [dx, dy] = this.randomSphereDirection();
      const mag = rand(0.05, 0.1);
      this.spawnParticle({
        x,
        y,
        vx: 0.3 * this.velX[index] + dx * mag,
        vy: 0.3 * this.velY[index] + dy * mag,
        lifespan: rand(0.8, 1.3),
        size: 0.0036,
        alpha: 0.8,
        drag: 1.8,
        gravity: -0.07,
        color,
        cooling: 12,
        mode: MODE.SPARK,
      });
    }
  }

  updateParticles(dt: number) {
    const positions = this.positionAttribute.array as Float32Array;
    const colors = this.colorAttribute.array as Float32Array;
    const sizes = this.sizeAttribute.array as Float32Array;
    const alphas = this.alphaAttribute.array as Float32Array;
    const blooms = this.bloomAttribute.array as Float32Array;

    let i = 0;
    while (i < this.particleCount) {
      const age = (this.ages[i] += dt);
      const lifeT = age / this.lifespans[i];

      if (lifeT >= 1 || this.posY[i] < -0.06) {
        this.killParticle(i);
        continue;
      }

      if (this.splitAts[i] > 0 && age >= this.splitAts[i]) {
        this.splitCrossette(i);
        this.killParticle(i);
        continue;
      }

      const mode = this.modes[i];
      const drag = Math.exp(-this.drags[i] * dt);
      this.velY[i] += this.gravities[i] * dt;
      this.velX[i] *= drag;
      this.velY[i] *= drag;
      this.posX[i] += this.velX[i] * dt;
      this.posY[i] += this.velY[i] * dt;

      const fadeT = clamp((lifeT - 0.45) / 0.55, 0, 1);
      const envelope = 1 - fadeT * fadeT * (3 - 2 * fadeT);
      let intensity: number;
      let bloom = 1;

      if (mode === MODE.TWINKLE && lifeT > 0.45) {
        const twinkle =
          Math.sin(age * this.twinkleFreqs[i] * 1.7 + this.twinklePhases[i]) >
          -0.1 + (lifeT - 0.45) * 1.9
            ? 1.6
            : 0.05;
        intensity = (1 - 0.55 * fadeT) * twinkle;
        bloom = 0;
      } else if (mode === MODE.HEAD || mode === MODE.BRANCH) {
        intensity = 1 - lifeT;
      } else {
        const wave = Math.sin(age * this.twinkleFreqs[i] + this.twinklePhases[i]);
        const shimmer = 0.72 + 0.28 * wave;
        const pop = wave > Math.min(1.9 * fadeT - 0.4, 0.85) ? 1.6 : 0.05;
        const popScale = 1 - 0.55 * fadeT;
        const popMix = mode === MODE.DUST ? 0 : Math.min(2.5 * fadeT, 1);
        const base = mode === MODE.DUST ? 1 - lifeT : envelope;
        intensity = base * shimmer * (1 - popMix) + popScale * pop * popMix;
        bloom = mode === MODE.DUST ? 0.4 : 1 - popMix;
      }

      if (mode !== MODE.HEAD && mode !== MODE.DUST) {
        intensity *= Math.min(7 * age, 1) * (1 + 2.2 * Math.exp(-(4.5 * age)));
      }

      const cool = Math.min(age * this.coolings[i], 0.85);
      const pi = 3 * i;
      positions[pi] = this.posX[i];
      positions[pi + 1] = this.posY[i];
      positions[pi + 2] = 0;
      colors[pi] = 1 + (this.colR[i] - 1) * cool;
      colors[pi + 1] = 1 + (this.colG[i] - 1) * cool;
      colors[pi + 2] = 1 + (this.colB[i] - 1) * cool;
      sizes[i] = this.sizes[i];
      alphas[i] = this.baseAlphas[i] * intensity;
      blooms[i] = bloom;
      i++;
    }

    this.pointsGeometry.setDrawRange(0, this.particleCount);
    this.positionAttribute.needsUpdate = true;
    this.colorAttribute.needsUpdate = true;
    this.sizeAttribute.needsUpdate = true;
    this.alphaAttribute.needsUpdate = true;
    this.bloomAttribute.needsUpdate = true;
  }

  renderPass(pass: any, target: THREE.WebGLRenderTarget | null) {
    this.renderer.setRenderTarget(target);
    this.renderer.render(pass.scene, this.camera);
  }

  onUpdate() {
    const dt = Math.min(this.deltaTime / 1000, 0.05);
    this.simTime += dt;
    this.planLaunches();
    this.runPendingLaunches();
    this.updateShells(dt);
    this.updateParticles(dt);

    this.hazePass.material.uniforms.uTime.value = this.simTime;
    this.fadePass.material.uniforms.uDecay.value = Math.exp(-this.config.fadeRate * dt);
    this.fadePass.material.uniforms.uFloor.value = 60 * dt * 0.003;
    this.fadePass.material.uniforms.uTexture.value = this.trailRead.texture;
    this.renderPass(this.fadePass, this.trailWrite);

    this.renderer.setRenderTarget(this.trailWrite);
    this.renderer.render(this.pointsScene, this.camera);

    const down = this.kawaseDownPass.material.uniforms;
    let source = this.trailWrite.texture;
    for (let i = 0; i < this.bloomLevels.length; i++) {
      const level = this.bloomLevels[i];
      down.uTexture.value = source;
      down.uResolution.value.set(level.width, level.height);
      down.uBloomSource.value = i === 0 ? 1 : 0;
      down.uThreshold.value = i === 1 ? this.config.bloomThreshold : 0;
      this.renderPass(this.kawaseDownPass, level);
      source = level.texture;
    }

    const up = this.kawaseUpPass.material.uniforms;
    for (let i = this.bloomLevels.length - 2; i >= 0; i--) {
      const smaller = this.bloomLevels[i + 1];
      up.uTexture.value = smaller.texture;
      up.uResolution.value.set(smaller.width, smaller.height);
      this.renderPass(this.kawaseUpPass, this.bloomLevels[i]);
    }

    this.renderPass(this.hazePass, this.hazeTarget);

    this.compositePass.material.uniforms.uTexture.value = this.trailWrite.texture;
    this.compositePass.material.uniforms.uBloomTexture.value = this.bloomLevels[0].texture;
    this.compositePass.material.uniforms.uHazeTexture.value = this.hazeTarget.texture;
    this.renderPass(this.compositePass, null);

    const swap = this.trailRead;
    this.trailRead = this.trailWrite;
    this.trailWrite = swap;
  }

  update(now: number) {
    if (this.disposed) return;
    this.deltaTime = now - this.lastTime;
    this.lastTime = now;
    this.onUpdate();
    this.rafID = requestAnimationFrame(this.boundUpdate);
  }

  resize() {
    if (this.disposed) return;
    const width = Math.max(1, this.domParent.clientWidth || window.innerWidth);
    const height = Math.max(1, this.domParent.clientHeight || window.innerHeight);
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.width, this.height, false);
    this.onResize();
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.rafID);
    this.resizeObserver?.disconnect();

    for (const pass of this.getPasses()) {
      pass.material.dispose();
    }
    this.pointsMaterial.dispose();
    this.pointsGeometry.dispose();
    this.quadGeometry.dispose();
    for (const target of [this.trailRead, this.trailWrite, this.hazeTarget, ...this.bloomLevels]) {
      target.dispose();
    }
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
