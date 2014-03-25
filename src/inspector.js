(function() {

  define(['./goodies', './settings'], function(_, settings) {
    var changePreview, changeTests, color_subjects, data, options, removeColor, toggleMessage, checkContrastFunction;
    color_subjects = null;
    options = null;
    data = null;
    var mixPanelHidden = true,
        mixPanel = _.id('mixPanel');
    toggleMessage = function(showTests) {
      var color_tests, welcome_message;
      welcome_message = _.id('welcome-message');
      color_tests = _.id('tests');
      if (showTests) {
        _.attr(_.id('app'), 'class', 'active-panels');
        return _.show(color_tests);
      } else {
        _.attr(_.id('app'), 'class', 'not-active-panels');
        return _.hide(color_tests);
      }
    };
    checkContrastFunction = function (color1, color2) {
      var contrast = Color(color1).contrast(Color(color2)),
          roundedContrast = Math.round( contrast * 10 ) / 10;
      if (contrast >= 5) {
        return '<abbr title="The contrast between these two colors is '+roundedContrast+'/21. Good enough." class="good contrast">Good contrast</abbr>';
      } else {
        return '<abbr title="The contrast between these two colors is '+roundedContrast+'/21. Might be problematic." class="bad contrast">Bad contrast</abbr>';
      }
    }
    changePreview = function(template) {
      return color_subjects.innerHTML += template(data);
    };
    changeTests = function(template) {
      return _.id('tests').innerHTML = template(data);
    };
    removeColor = function(event) {
      var closeButton, preview, previewsLength;
      closeButton = event.target;
      if (!closeButton.classList.contains('close')) {
        return;
      }
      previewsLength = _.cls('color-preview').length - 1;
      _.attr(_.id('subjects'), 'data-subjects', previewsLength, true);
      _.remove(closeButton.parentNode);
      toggleMessage(previewsLength !== 0);
      preview = _.cls('color-preview')[0];
      if (!mixPanelHidden) { _.hide(mixPanel) };
          mixPanelHidden = true;
      if (!preview) {
        return;
      }
      data = {
        hex: _.attr(preview, 'data-hex'),
        checkContrast: checkContrastFunction
      };
      return _.template(options.singleTemplate, changeTests);
    };
    cancelMix = function(event) {
      _.hide(_.id('mixResult'));
      _.hide(_.id('mixControls'));
      _.show(mixButton);
      _.attr(mixButton, 'class', 'not-active');
    };
    return {
      selectColor: function(event) {
        var attribute, clickedColor, colorTemplate, color_previews, length, previewsLength, mixButton;
        mixButton = _.id('mixButton');
        clickedColor = event.target;
        if (!clickedColor.classList.contains('color')) {
          return;
        }
        if (clickedColor.id == "selectMix") {
          _.hide(_.id('mixResult'))
          _.hide(_.id('mixControls'));
        }
        attribute = clickedColor.getAttribute.bind(clickedColor);
        color_previews = _.cls('color-preview');
        data = {
          name: attribute('data-name'),
          hex: attribute('data-hex'),
          rgb: attribute('data-rgb'),
          hsl: attribute('data-hsl'),
          checkContrast: checkContrastFunction,
          mixed: attribute('data-mixed'),
          origin: 'false'
        };
        if (color_previews.length > 0 && event.altKey) {
          if (color_previews.length === 2) {
            _.remove(color_previews[+(!event.shiftKey)]);
          }
          data.firstHex = _.attr(color_previews[0], 'data-hex');
          data.firstName = _.attr(color_previews[0], 'data-name');

          if (mixPanelHidden) { 
            _.show(mixPanel) 
          } else {
            console.log('expected behavior 2');
            this.mixColors;
          }
          mixPanelHidden = false;
          _.show(mixButton)
          
          _.attr(mixButton, 'data-hex-a', data.firstHex);
          _.attr(mixButton, 'data-hex-b', data.hex);
          _.attr(mixButton, 'data-name-a', data.firstName);
          _.attr(mixButton, 'data-name-b', data.name);
          colorTemplate = options.doubleTemplate;
          previewsLength = 2;
          if (settings.tipSecondColor == false){
            _.hide(_.id('tipSecondColor'));
            settings.tipSecondColor = true;
          }
        } else {
          length = color_previews.length;
          while (length-- > 0) {
            _.remove(color_previews[0]);
          }
          if (!mixPanelHidden) { _.hide(mixPanel) };
          mixPanelHidden = true;
          _.hide(_.id('mixResult'));
          _.hide(_.id('mixControls'));
          _.attr(mixButton, 'class', 'not-active')
          colorTemplate = options.singleTemplate;
          previewsLength = 1;
          if (settings.tipSecondColor == false){
            _.show(_.id('tipSecondColor'));
          }
        }
        _.attr(color_subjects, 'data-subjects', previewsLength);
        toggleMessage(true);
        _.template(options.previewTemplate, changePreview);
        return _.template(colorTemplate, changeTests);
      },
      mixColors: function (event) {
        var mixButton = _.id('mixButton'),
            color1 = _.attr(mixButton, 'data-hex-a'),
            color2 = _.attr(mixButton, 'data-hex-b'),
            name1 = _.attr(mixButton, 'data-name-a'),
            name2 = _.attr(mixButton, 'data-name-b'),
            mixResult = _.id('mixResult'),
            selectMix = _.id('selectMix');

            setTimeout(function(){_.hide(mixButton)}, 200)
        
        _.attr(mixButton, 'class', 'active')
        _.id('mixBalance').style.backgroundImage = "linear-gradient(to right, #"+color1+", #"+color2+")"
        setTimeout(function(){_.show(_.id('mixControls')); _.show(mixResult)}, 100);
        function setResult(weight) {
          var result = Color('#'+color1).mix(Color('#'+color2), weight),
            hex = result.hexString().substring(1).toLowerCase(),
            rgb = result.values.rgb[0]+", "+result.values.rgb[1]+", "+result.values.rgb[2],
            hsl = result.values.hsl[0]+", "+result.values.hsl[1]+"%, "+result.values.hsl[2]+"%";
          _.attr(selectMix, 'data-name', name1+' + '+name2);
          _.attr(selectMix, 'data-hex', hex);
          _.attr(selectMix, 'data-rgb', rgb);
          _.attr(selectMix, 'data-hsl', hsl);
          _.attr(selectMix, 'data-mixed', 'true');
          mixResult.style.backgroundColor = '#'+hex;
        }
        setResult(0.5);
        _.id('mixBalance').value = 0.5;
        _.listen(_.id('mixBalance'), 'input', function(){setResult(_.id('mixBalance').value)})
      },
      setup: function($options) {
        options = $options;
        color_subjects = _.id('subjects');
        _.listen(_.id('colors'), 'click', this.selectColor);
        _.listen(_.id('palette_colors'), 'click', this.selectColor);
        _.listen(_.id('subjects'), 'click', removeColor);
        _.listen(_.id('cancelMix'), 'click', cancelMix);
        _.listen(_.id('mixButton'), 'click', this.mixColors);
        _.listen(_.id('selectMix'), 'click', this.selectColor);
        _.hide(_.id('mixPanel'));
        _.hide(_.id('mixResult'));
        _.hide(_.id('mixControls'));
        _.hide(_.id('tipSecondColor'));
        return _.listen('keydown', function(event) {
          if (event.altKey) {
            return event.preventDefault();
          }
        });
      }
    };
  });

}).call(this);
