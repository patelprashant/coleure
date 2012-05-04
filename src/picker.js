(function() {

  define(['./goodies'], function(_) {
    return {
      setup: function(options) {
        var _this = this;
        return _.listen(_.id('colors'), 'click', function(event) {
          if (event.altKey) {
            return _this.addColor(event, options);
          } else {
            return _this.displayColor(event, options);
          }
        });
      },
      subjects: 0,
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
        this.subjects = 1;
        _.id('subjects').setAttribute('data-subjects', this.subjects);
        return _.template(options.singleTemplate, function(template) {
          return _.id('tests').innerHTML = template(data);
        });
      },
      addColor: function(event, options) {
        var attribute, cache, clickedColor, data;
        clickedColor = event.target;
        attribute = clickedColor.getAttribute.bind(clickedColor);
        data = {
          name: attribute('data-name'),
          hex: attribute('data-hex'),
          firstHex: _.cls('color-preview')[0].getAttribute('data-hex')
        };
        this.subjects++;
        cache = _.id('subjects').innerHTML;
        _.template(options.previewTemplate, function(template) {
          return _.id('subjects').innerHTML = cache + template(data);
        });
        _.id('subjects').setAttribute('data-subjects', this.subjects);
        return _.template(options.doubleTemplate, function(template) {
          return _.id('tests').innerHTML = template(data);
        });
      }
    };
  });

}).call(this);
