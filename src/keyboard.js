(function() {

  define(['./goodies'], function(_) {
    var combinedFunctions, combinedKeys, singleFunctions, singleKeys;
    singleKeys = [];
    singleFunctions = [];
    combinedKeys = [];
    combinedFunctions = [];
    _.listen('keydown', function(event) {
      var index, key;
      key = String.fromCharCode(event.which);
      index = singleKeys.indexOf(key);
      if (index !== -1) {
        singleFunctions[index]();
      }
      if (event.metaKey || event.ctrlKey) {
        index = combinedKeys.indexOf(key);
        if (index !== -1) {
          return combinedFunctions[index]();
        }
      }
    });
    return {
      listen: function(key, fn) {
        var length;
        length = singleKeys.length;
        singleKeys[length] = key;
        return singleFunctions[length] = fn;
      },
      listenWithCtrl: function(key, fn) {
        var length;
        length = combinedKeys.length;
        combinedKeys[length] = key;
        return combinedFunctions[length] = fn;
      }
    };
  });

}).call(this);
