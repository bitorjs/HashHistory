let _location_name = "hash";
let _event_name = "hashchange";

class HashHistory {
  constructor(mode) {
    this.mode = mode || "hash";
    this.history = [];
    this.proventPush = false;
    this.pagePointer = -1;
    this._listenHandler = this._listenHandler.bind(this);
    _location_name = this.mode === "hash" ? "hash" : "pathname";
    _event_name = this.mode === "hash" ? "hashchange" : "popstate";
  }

  get url() {
    return this.history[this.pagePointer];
  }

  set url(url) {
    window.location[_location_name] = url;
  }

  onChange() {}

  _listenHandler() {
    if (this.proventPush) {
      this.proventPush = false;
    } else {
      let url = window.location[_location_name];
      this.push(url)
    }
    this.onChange(this.url)
  }

  listen(callback) {
    this.onChange = callback;
    this.overrideHistory()
    this.reset()
    this.setInitHash()
    this.onChange(this.url)
    this.unlisten()
    window.addEventListener(_event_name, this._listenHandler)
    return this;
  }

  unlisten() {
    window.removeEventListener(_event_name, this._listenHandler)
  }

  normalize(url) {
    if (url.charAt(0) === '#') url = url.slice(1)
    if (url.charAt(0) !== '/') url = `/${url}`

    return url;
  }
  push(url) {
    url = this.normalize(url);
    this.history.push(url)
    this.pagePointer = this.history.length - 1;
  }
  pop() {
    let url = this.history.pop();
    if (url !== undefined) {
      this.pagePointer--;
    }
    return url;
  }
  reset() {
    this.history.length = 0;
    this.proventPush = false;
    this.pagePointer = -1;
  }
  reload() {
    window.location.reload();
  }
  redirect(path) {
    window.location[_location_name] = path;
  }
  replace(path) {
    let loc = window.location;
    if (this.mode === 'hash') {
      const i = loc.href.indexOf('#');
      loc.replace(
        loc.href.slice(0, i >= 0 ? i : 0) + '#' + path
      )
    } else {
      const url = path.join(loc.origin, path);
      loc.replace(url);
    }
  }
  back() {
    this.go(-1);
  }
  forward() {
    this.go(1);
  }
  setInitHash() {
    let url = window.location[_location_name];
    if (url.length === 0) {
      this.push('/')
    } else {
      this.push(url)
    }
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
      let url = this.history[this.pagePointer]
      this.url = url;
    }
  }

  overrideHistory() {
    history.back = this.back.bind(this);
    history.forward = this.forward.bind(this);
    history.go = this.go.bind(this);
  }
}
export default HashHistory;