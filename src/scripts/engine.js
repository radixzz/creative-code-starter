import * as CONST from './const';

const DEFAULT = {
  canvas: null,
};

export default class Engine {
  constructor(opts) {
    this.opts = { ...DEFAULT, ...opts };
    this.size = new THREE.Vector2();
    this.mouse = new THREE.Vector2();
    this.initWorld();
    this.initScene();
    this.initCamera();
    this.initHelpers();
    this.attachEvents();
    this.onResize();
  }

  initWorld() {
    const { domElement } = this.opts;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: domElement,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    if (CONST.SHADOWS_ENABLED) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    this.clock = new THREE.Clock();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(CONST.FOG_COLOR, CONST.FOG_DENSITY);
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      CONST.CAMERA_FOV,
      1,
      CONST.CAMERA_NEAR,
      CONST.CAMERA_FAR,
    );
    this.camera.position.z = CONST.CAMERA_DISTANCE;
    this.scene.add(this.camera);
  }

  initHelpers() {
    const { scene, camera, renderer } = this;
    if (CONST.ORBIT_CONTROLS) {
      const c = new THREE.OrbitControls(camera, renderer.domElement);
      c.minDistance = -10;
      c.maxDistance = 1000;
      c.enableDamping = true;
      c.dampingFactor = 0.3;
      this.orbitControls = c;
    }
    if (CONST.AXES_HELPERS) {
      this.axesHelper = new THREE.AxesHelper(500);
      scene.add(this.axesHelper);
    }
  }

  attachEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  onResize() {
    const { innerWidth, innerHeight } = window;
    this.resize(innerWidth, innerHeight);
  }

  resize(w, h) {
    const { renderer, camera, size } = this;
    camera.clearViewOffset();
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    size.set(w, h);
  }

  onMouseMove(e) {
    const { innerWidth: w, innerHeight: h } = window;
    e.preventDefault();
    this.mouse.x = (e.clientX / w) * 2 - 1;
    this.mouse.y = - (e.clientY / h) * 2 + 1;
  }

  render() {
    const { renderer, scene, camera } = this;
    // if (CONST.FPS_STATS) {
    //   this.fpsMeter.tickStart();
    // }
    if (CONST.ORBIT_CONTROLS) {
      this.orbitControls.update();
    }
    renderer.render(scene, camera);
    // if (CONST.FPS_STATS) {
    //   this.fpsMeter.tick();
    // }
  }
}
