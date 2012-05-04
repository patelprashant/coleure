(function() {

  require(['./colors', './picker', './clipboard', './formats'], function(colors, picker) {
    "use strict";    colors.load({
      colors: 'src/pantone.json',
      template: 'templates/color.html'
    });
    return picker.setup({
      previewTemplate: 'templates/preview.html',
      singleTemplate: 'templates/test/single.html',
      doubleTemplate: 'templates/test/double.html'
    });
  });

}).call(this);
