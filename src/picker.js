(function() {

  define(['./goodies'], function(_) {
    return {
      setup: function(options) {
        var _this = this;
        _.listen(_.id('colors'), 'click', function(event) {
          if (event.target.classList.contains('color')) {
            return _this.selectColor(event, options);
          }
        });
        return _.listen(_.id('subjects'), 'click', function(event) {
          return _this.removeColor(event, options);
        });
      },
      toggleMessage: function(showTests) {
        var color_tests, welcome_message;
        welcome_message = _.id('welcome-message');
        color_tests = _.id('tests');
        if (showTests) {
          _.hide(welcome_message);
          return _.show(color_tests);
        } else {
          _.show(welcome_message);
          return _.hide(color_tests);
        }
      },
      selectColor: function(event, options) {
        var attribute, clickedColor, colorTemplate, color_previews, color_subjects, data, previewsLength;
        clickedColor = event.target;
        attribute = _.$getAttr.bind(clickedColor);
        color_subjects = _.id('subjects');
        color_previews = _.cls('color-preview');
        data = {
          name: attribute('data-name'),
          hex: attribute('data-hex'),
          rgb: attribute('data-rgb'),
          hsl: attribute('data-hsl')
        };
        if (color_previews.length > 0 && (event.metaKey || event.ctrlKey)) {
          if (color_previews.length === 2) {
            _.remove(color_previews[+(!event.shiftKey)]);
          }
          data.firstHex = _.attr(color_previews[0], 'data-hex');
          colorTemplate = options.doubleTemplate;
          previewsLength = 2;
        } else {
          colorTemplate = options.singleTemplate;
          previewsLength = 1;
        }
        _.attr(color_subjects, 'data-subjects', previewsLength);
        this.toggleMessage(true);
        _.template(options.previewTemplate, function(template) {
          var cache;
          cache = previewsLength === 2 ? color_subjects.innerHTML : '';
          return color_subjects.innerHTML = cache + template(data);
        });
        return _.template(colorTemplate, function(template) {
          return _.id('tests').innerHTML = template(data);
        });
      },
      removeColor: function(event, options) {
        var closeButton, data, preview, previewsLength;
        closeButton = event.target;
        if (!closeButton.classList.contains('close')) return;
        previewsLength = _.cls('color-preview').length - 1;
        _.attr(_.id('subjects'), 'data-subjects', previewsLength, true);
        _.remove(closeButton.parentNode);
        this.toggleMessage(previewsLength !== 0);
        preview = _.cls('color-preview')[0];
        if (!preview) return;
        data = {
          hex: _.attr(preview, 'data-hex')
        };
        return _.template(options.singleTemplate, function(template) {
          return _.id('tests').innerHTML = template(data);
        });
      }
    };
  });

}).call(this);
