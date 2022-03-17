(function () {
  let callbacks = {};
  // localstotage
  function setStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  }
  function getStorage(name) {
    const gettingStorage = localStorage.getItem(name);
    if (gettingStorage) {
      callbacks[name](JSON.parse(gettingStorage));
      return JSON.parse(gettingStorage);
    } else {
      return [];
    }
  }
  // create function storage
  function storageModule(data) {
    // target
    let target = {};
    data.forEach((item) => {
      if (item.callback) {
        callbacks[item.name] = item.callback;
      }
      target[item.name] = getStorage(item.name);
    });

    // handeler
    const handeler = {
      set(target, property, value) {
        target[property] = value;
        setStorage(property, value);
        if (callbacks[property]) {
          callbacks[property](value);
        }
        return true;
      },
    };
    //  proxy
    const newProxy = new Proxy(target, handeler);
    return newProxy;
  }

  window.storageModule = storageModule;
})();
