(function() {

  define(['./goodies'], function(_) {
    return {
      setup: function(options) {
        var _this = this;
        _.listen(_.id('colors'), 'click', function(event) {
          if (event.target.classList.contains('color')) {
            _this.selectColor(event, options);
            return _this.toggleMessage(event, options);
          }
        });
        return _.listen(_.id('subjects'), 'click', function(event) {
          return _this.removeColor(event, options);
        });
      },
      subjects: 0,
      toggleMessage: function(event, options) {
        var color_tests, welcome_message;
        welcome_message = _.id('welcome-message');
        color_tests = _.id('tests');
        if (this.subjects === 0) {
          _.show(welcome_message);
          return _.hide(color_tests);
        } else {
          _.hide(welcome_message);
          return _.show(color_tests);
        }
      },
      selectColor: function(event, options) {
        var attribute, cache, clickedColor, color_previews, color_subjects, color_tests, data;
        clickedColor = event.target;
        attribute = clickedColor.getAttribute.bind(clickedColor);
        color_subjects = _.id('subjects');
        color_previews = _.cls('color-preview');
        color_tests = _.id('tests');
        data = {
          name: attribute('data-name'),
          hex: attribute('data-hex'),
          rgb: attribute('data-rgb'),
          hsl: attribute('data-hsl')
        };
        if (event.metaKey || event.ctrlKey) {
          if (this.subjects > 1) _.remove(color_previews[+(!event.shiftKey)]);
          data.firstHex = color_previews[0].getAttribute('data-hex');
          cache = color_subjects.innerHTML;
          _.template(options.previewTemplate, function(template) {
            return color_subjects.innerHTML = cache + template(data);
          });
          _.template(options.doubleTemplate, function(template) {
            return color_tests.innerHTML = template(data);
          });
          this.subjects = 2;
        } else {
          _.template(options.previewTemplate, function(template) {
            return color_subjects.innerHTML = template(data);
          });
          _.template(options.singleTemplate, function(template) {
            return color_tests.innerHTML = template(data);
          });
          this.subjects = 1;
        }
        return color_subjects.setAttribute('data-subjects', this.subjects);
      },
      removeColor: function(event, options) {
        var closeButton, data;
        closeButton = event.target;
        if (closeButton.classList.contains('close')) {
          _.remove(closeButton.parentNode);
          this.subjects--;
          _.id('subjects').setAttribute('data-subjects', this.subjects);
          this.toggleMessage(event, options);
          data = {
            hex: _.cls('color-preview')[0].getAttribute('data-hex')
          };
          return _.template(options.singleTemplate, function(template) {
            return _.id('tests').innerHTML = template(data);
          });
        }
      }
    };
  });

}).call(this);
