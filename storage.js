(function () {
  // create function storage
  function storageModule(name, callback = null) {
    // target
    const target = [];

    // handeler
    const handeler = {
      get: function (target, property) {
        // property is index in this case
        return target[property];
      },
      set: function (target, property, value, receiver) {
        target[property] = value;
        // you have to return true to accept the changes
        return true;
      },
    };
    //  proxy
    const newProxy = new Proxy(target, handeler);
    return newProxy;
  }

  window.storageModule = storageModule;
})();
