import Engine from './engine';
import Ticker from './ticker';

export class App {
  constructor() {
    this.init();
    this.addGeometry();
    this.addLights();
  }

  init() {
    this.engine = new Engine({
      domElement: document.getElementById('app'),
    })
    this.ticker = new Ticker({
      onFrameListener: this.onFrame.bind(this),
      autoStart: true,
    });
  }

  addLights() {
    const { engine } = this;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    const spotLight = new THREE.SpotLight(0xffffff, 2, 55);
    spotLight.position.set(20, 0, 35);
    engine.scene.add(ambientLight, spotLight);
  }

  addGeometry() {
    const { scene } = this.engine;
    const geo = new THREE.BoxBufferGeometry(10, 10, 10);
    const mat = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    this.box = mesh;
  }

  onFrame(delta, elapsedTime) {
    const { engine, box } = this;
    box.rotation.x += delta;
    box.rotation.y += delta * 0.5;
    box.position.z = Math.sin(elapsedTime) * 20;
    engine.render();
  }
}

new App();
