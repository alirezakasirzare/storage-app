(function () {
  // localstotage
  function setStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  }
  function getStorage(name) {
    const gettingStorage = localStorage.getItem(name);
    if (gettingStorage) {
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
      target[item.name] = getStorage(item.name);
    });

    // handeler
    const handeler = {
      set(target, property, value) {
        target[property] = value;
        setStorage(property, value);
        return true;
      },
    };
    //  proxy
    const newProxy = new Proxy(target, handeler);
    return newProxy;
  }

  window.storageModule = storageModule;
})();
