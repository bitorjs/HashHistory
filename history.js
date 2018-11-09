class History {
  constructor() {

  }

  _listenHandler() {
    // console.log('pop')
  }

  listen() {

    window.addEventListener('popstate', this._listenHandler.bind(this));
  }

  unlisten() {

    window.removeEventListener('popstate', this._listenHandler.bind(this));
  }

  //   //绑定事件处理函数. 
  // history.pushState({page: 1}, "title 1", "?page=1");    //添加并激活一个历史记录条目 http://example.com/example.html?page=1,条目索引为1
  // history.pushState({page: 2}, "title 2", "?page=2");    //添加并激活一个历史记录条目 http://example.com/example.html?page=2,条目索引为2
  // history.replaceState({page: 3}, "title 3", "?page=3"); //修改当前激活的历史记录条目 http://ex..?page=2 变为 http://ex..?page=3,条目索引为3

  // pushState、replaceState 不会触发popstate事件
  // pushState事件只会在其他浏览器操作时触发

  push(state, title, url) {
    window.history.pushState(state, title, url)
  }

  replace(state, title, url) {
    window.history.replaceState(state, title, url)
  }

}

export default History;