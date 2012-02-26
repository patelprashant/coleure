require([
    './configs',
    './utils',
    './colors',
    './formats',
    './clipboard',
    './tooltip'
  ], 
  function (configs, utils, colors, formats, clipboard, tooltip) {
    "use strict";
    utils.metakey($('.metakey'));
    colors.init();
    formats.init();
    clipboard.init();
    tooltip.init();
    $(window).scrollTop($('#credits').innerHeight());
})