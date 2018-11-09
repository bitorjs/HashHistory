class Hash {
  constructor() {
    this.history = [];
    this.proventPush = false;
    this.pagePointer = -1;
  }

  _listenHandler() {
    if (this.proventPush) {
      this.proventPush = false;
    } else {
      let hash = window.location.hash;
      this.push(hash)
    }
  }

  listen() {
    this.overrideHistory()
    this.reset()
    this.setInitHash()
    window.addEventListener('hashchange', this._listenHandler.bind(this))
    return this;
  }

  unlisten() {
    window.removeEventListener('hashchange', this._listenHandler.bind(this))
  }

  normalize(hash) {
    if (hash.charAt(0) === '#') hash = hash.slice(1)
    if (hash.charAt(0) !== '/') hash = `/${hash}`

    return hash;
  }
  push(hash) {
    hash = this.normalize(hash);
    this.history.push(hash)
    this.pagePointer = this.history.length - 1;
  }
  pop() {
    let hash = this.history.pop();
    if (hash !== undefined) {
      this.pagePointer--;
    }
    return hash;
  }
  reset() {
    this.history.length = 0;
    this.proventPush = false;
    this.pagePointer = -1;
  }
  reload() {
    window.location.reload();
  }
  replace(path) {
    window.location.hash = path;
  }
  back() {
    this.go(-1);
  }
  forward() {
    this.go(1);
  }
  setInitHash() {
    let hash = window.location.hash;
    if (hash.length === 0) {
      this.push('/')
    } else {
      this.push(hash)
    }
  }
  setHash(hash) {
    window.location.hash = hash;
  }
  go(step) {
    if (Object.prototype.toString.call(step) === "[object Number]" && !isNaN(step) && !isFinite(step)) {
      throw TypeError('')
    }

    let len = this.history.length;
    let pointer = this.pagePointer;

    if ((step + pointer) < len && (step + pointer) >= 0) {
      this.pagePointer += step;
      this.proventPush = true;
      let hash = this.history[this.pagePointer]
      this.setHash(hash);
    }
  }

  overrideHistory() {
    history.back = this.back.bind(this);
    history.forward = this.forward.bind(this);
    history.go = this.go.bind(this);
  }
}
export default Hash;