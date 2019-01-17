
const DEFAULT = {
  onFrameListener: () => {},
  autoStart: false,
};

export default class Ticker {
  constructor(opts) {
    this.opts = { ...DEFAULT, ...opts };
    this.rafId = null;
    this.running = false;
    this.clock = new THREE.Clock();
    if (opts.autoStart) {
      this.start();
    }
  }

  start() {
    const { clock } = this;
    if (!this.running) {
      // defer frame call to next frame
      setTimeout(this.onFrame.bind(this), 0);
      clock.start();
    }
  }

  stop() {
    const { clock } = this;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      clock.stop();
      this.rafId = null;
      this.running = false;
    }
  }

  onFrame() {
    const { opts, clock } = this;
    opts.onFrameListener(clock.getDelta(), clock.elapsedTime);
    this.rafId = requestAnimationFrame(this.onFrame.bind(this));
  }
}
