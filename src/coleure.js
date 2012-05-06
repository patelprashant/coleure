(function() {

  window.addEventListener('load', function() {
    return require(['./colors', './inspector', './palette', './clipboard', './formats'], function(colors, inspector, palette) {
      "use strict";      colors.load({
        colors: 'src/pantone.json',
        template: 'templates/color.html'
      });
      inspector.setup({
        previewTemplate: 'templates/preview.html',
        singleTemplate: 'templates/test/single.html',
        doubleTemplate: 'templates/test/double.html'
      });
      return palette.setup({
        template: 'templates/color.html'
      });
    });
  });

}).call(this);
