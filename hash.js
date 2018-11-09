
const Hash = {
  history: [],
  proventPush: false,
  currentPage: 0,
  _listenHandler: function(){
    console.log('before push...')
    if(Hash.proventPush) {
      Hash.proventPush = false;
    } else {
      let hash = window.location.hash;
      Hash.push(hash)
    }
  },
  listen:()=>{
    window.addEventListener('hashchange', Hash._listenHandler)
  },
  unlisten:()=>{
    window.removeEventListener('hashchange', Hash._listenHandler)
  },
  normalize:(hash)=>{
    if(hash.charAt(0) === '#') hash = hash.slice(1)
    if(hash.charAt(0) !== '/') hash = `/${hash}`

    return hash;
  },
  push: (hash)=>{
    hash = Hash.normalize(hash);
    Hash.history.push(hash)
    Hash.currentPage = Hash.history.length;
  },
  pop: ()=>{
    let hash = Hash.history.pop();
    if(hash!==undefined) {
      Hash.currentPage--;
    }
    return hash;
  },
  back: ()=>{
    let hash = Hash.pop();
    if(hash !== undefined) {
      Hash.proventPush = true;
      Hash.setHash(hash);
    } else {
      Hash.setHash('/')
    }
  },
  setHash: (hash)=>{
    window.location.hash = hash;
  },
  go: (number)=>{
    if(Object.prototype.toString.call(number) === "[object Number]" && !isNaN(number) && !isFinite(number)) {
      throw TypeError('')
    }

    let len = Hash.history.length;
    let pointer = Hash.currentPage;

    if(number+ pointer <= len && number+ pointer >= 0) {
      Hash.currentPage = len;
      Hash.proventPush = true;
      let hash = Hash.history[Hash.currentPage]
      Hash.setHash(hash);
    }
    
  }
}

module.exports  = Hash;