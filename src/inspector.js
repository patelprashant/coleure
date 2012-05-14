(function() {

  define(['./goodies'], function(_) {
    var changePreview, changeTests, color_subjects, data, options, removeColor, selectColor, setup, toggleMessage;
    color_subjects = null;
    options = null;
    data = null;
    toggleMessage = function(showTests) {
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
    };
    selectColor = function(event) {
      var attribute, clickedColor, colorTemplate, color_previews, length, previewsLength;
      clickedColor = event.target;
      if (!clickedColor.classList.contains('color')) return;
      attribute = clickedColor.getAttribute.bind(clickedColor);
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
        length = color_previews.length;
        while (length-- > 0) {
          _.remove(color_previews[0]);
        }
        colorTemplate = options.singleTemplate;
        previewsLength = 1;
      }
      _.attr(color_subjects, 'data-subjects', previewsLength);
      toggleMessage(true);
      _.template(options.previewTemplate, changePreview);
      return _.template(colorTemplate, changeTests);
    };
    changePreview = function(template) {
      return color_subjects.innerHTML += template(data);
    };
    changeTests = function(template) {
      return _.id('tests').innerHTML = template(data);
    };
    removeColor = function(event) {
      var closeButton, preview, previewsLength;
      closeButton = event.target;
      if (!closeButton.classList.contains('close')) return;
      previewsLength = _.cls('color-preview').length - 1;
      _.attr(_.id('subjects'), 'data-subjects', previewsLength, true);
      _.remove(closeButton.parentNode);
      toggleMessage(previewsLength !== 0);
      preview = _.cls('color-preview')[0];
      if (!preview) return;
      data = {
        hex: _.attr(preview, 'data-hex')
      };
      return _.template(options.singleTemplate, changeTests);
    };
    return setup = function($options) {
      options = $options;
      color_subjects = _.id('subjects');
      _.listen(_.id('colors'), 'click', selectColor);
      _.listen(_.id('palette_colors'), 'click', selectColor);
      return _.listen(_.id('subjects'), 'click', removeColor);
    };
  });

}).call(this);
