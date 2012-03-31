require([
    './configs',
    './utils',
    './colors',
    './formats',
    './clipboard',
    './tooltip',
    './palette'
  ], 
  function (configs, utils, colors, formats, clipboard, tooltip, palette) {
    "use strict";
    utils.metakey($('.metakey'));
    colors.init();
    palette.init();
    formats.init('.color');
    clipboard.init();
    tooltip.init();
})
