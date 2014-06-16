(function() {

  define(['./goodies'], function(_) {
    return {
      _display: function(settings) {
        var color, colors, content, template, _i, _len, html;
        colors = settings.colors;
        template = settings.template;
        content = '<div class="color-section">';
        var sectionSize = 84;
        var sectionMarkers = [];
        for (var i = 0; i < (colors.length/sectionSize); i++) {
          sectionMarkers.push(sectionSize*i)
        }
        for (_i = 0, _len = colors.length; _i < _len; _i++) {
          color = colors[_i];
          color.mixed = "false";
          color.origin = "library";
          var colorNumber = colors.indexOf(color);
          if (sectionMarkers.indexOf(colorNumber+1) > -1) {
            if (!(colorNumber === 0)) {
              content += template(color) + '</div><div class="color-section">';
            }
          } else {
            content += template(color);
          }
        }
        return _.id('colors').innerHTML = content+'</div>';
      },
      load: function(sources) {
        var _this = this;
        _.async(this, '_display', 2);
        _.json(sources.colors, function(colors) {
          return _this._display({
            colors: colors
          });
        });
        
        return _.template(sources.template, function(template) {
          return _this._display({
            template: template
          });
        });
      }
    };
  });

}).call(this);
