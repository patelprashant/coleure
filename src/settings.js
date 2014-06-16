(function() {

  define(['./goodies'], function(_) {
    var data, dataString;
    _.listen(window, 'unload', function(event) {
      return localStorage['settings'] = JSON.stringify(data);
    });
    if (dataString = localStorage['settings']) {
      return data = JSON.parse(dataString);
    }
    return data = {
      format: 'hex',
      activePaletteIndex: 0,
      palettes: [
        {
          name: 'Default',
          colors: []
        }
      ]
    };
  });

}).call(this);
