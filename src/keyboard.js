define(function () {
  var singleKeys = [];
  var singleFunctions = [];
  
  var combinedKeys = [];
  var combinedFunctions = [];
  
  $(document).keydown(function(event){
    var key = String.fromCharCode(event.which);

    var i = singleKeys.length - 1;
    for (i; i >= 0; i--) {
      if(key == singleKeys[i]) singleFunctions[i]();
    }

    if (event.metaKey || event.ctrlKey) {
      i = combinedKeys.length - 1;
      for (i; i >= 0; i--) {
        if(key == combinedKeys[i]) combinedFunctions[i]();
      }
    };
  });

  return {
    single: function(key, fn) {
      var length = singleKeys.length;
      singleKeys[length] = key;
      singleFunctions[length] = fn;
    },
    combined: function(key, fn) {
      var length = combinedKeys.length;
      combinedKeys[length] = key;
      combinedFunctions[length] = fn;
    }
  }
});