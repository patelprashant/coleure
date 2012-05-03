(function() {

  define(['./goodies'], function(_) {
    return {
      setup: function(options) {
        var _this = this;
        return _.listen(_.id('colors'), 'click', function(event) {
          return _this.displayColor(event, options);
        });
      },
      displayColor: function(event, options) {
        var attribute, clickedColor, data;
        clickedColor = event.target;
        attribute = clickedColor.getAttribute.bind(clickedColor);
        data = {
          name: attribute('data-name'),
          hex: attribute('data-hex')
        };
        _.template(options.previewTemplate, function(template) {
          return _.id('subjects').innerHTML = template(data);
        });
        return _.template(options.singleTemplate, function(template) {
          return _.id('tests').innerHTML = template(data);
        });
      }
    };
  });

}).call(this);
