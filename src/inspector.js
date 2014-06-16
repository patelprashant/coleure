(function() {

  define(['./goodies', './settings'], function(_, settings) {
	var color_subjects = null, color_previews = null, options = null, data = null;
	var subject1 = null, subject2 = null;
	var subjectsCount = null;
	var mixButton = _.id('mixButton'),
		mixResult = _.id('mixResult'),
		selectMix = _.id('selectMix');
	var toggleMessage = function(showTests) {
	  if (showTests) {
	  	_.id('app').classList.add('active-panels');
	  } else {
	  	_.id('app').classList.remove('active-panels');
	  }
	};
	var checkContrastFunction = function (color1, color2) {
	  var contrast = Color(color1).contrast(Color(color2)),
		  roundedContrast = Math.round( contrast * 10 ) / 10;
	  if (contrast >= 5) {
		return '<abbr title="The contrast between these two colors is '+roundedContrast+'/21. Good enough." class="good contrast">Good contrast</abbr>';
	  } else {
		return '<abbr title="The contrast between these two colors is '+roundedContrast+'/21. Might be problematic." class="bad contrast">Bad contrast</abbr>';
	  }
	};
	var changePreview = function(template) {
	  return color_subjects.innerHTML += template(data);
	};
	var changeTests = function(template) {
	  return _.id('tests').innerHTML = template(data);
	};
	var removeColor = function(event) {
	  var closeButton, preview;
	  closeButton = event.target;
	  
	  // making sure the close button contains the class 'close'
	  if (!closeButton.classList.contains('close')) {
		return;
	  }

	  // updating the number of previews displayed
	  subjectsCount = _.cls('color-preview').length - 1;
	  _.attr(_.id('subjects'), 'data-subjects', subjectsCount, true);

	  //
	  if (subjectsCount >=1) { _.remove(closeButton.parentNode); }
	  toggleMessage(subjectsCount !== 0);
	  preview = _.cls('color-preview')[0];

	  mixPanel.exit(true);
	  if (!preview) {
		return;
	  }

	  // 
	  data = {
		hex: _.attr(preview, 'data-hex'),
		checkContrast: checkContrastFunction
	  };
	  return _.template(options.singleTemplate, changeTests);
	};

	var mixPanel = (function(){
		var panel = _.id('mixPanel');

		function setMixResult(weight){
			var result = Color('#'+subject1.hex).mix(Color('#'+subject2.hex), weight),
				hex = result.hexString().substring(1).toLowerCase(),
				rgb = result.values.rgb[0]+", "+result.values.rgb[1]+", "+result.values.rgb[2],
				hsl = result.values.hsl[0]+", "+result.values.hsl[1]+"%, "+result.values.hsl[2]+"%";

			_.attr(selectMix, 'data-name', subject1.name+' + '+subject2.name);
			_.attr(selectMix, 'data-hex', hex);
			_.attr(selectMix, 'data-rgb', rgb);
			_.attr(selectMix, 'data-hsl', hsl);
			_.attr(selectMix, 'data-mixed', 'true');

			_.id('mixWeightA').innerHTML = (weight*100).toFixed()+"%";
			Color('#'+subject1.hex).light() ? _.id('mixWeightA').style.color = "#232323" : _.id('mixWeightA').style.color = "#fff";

			_.id('mixWeightB').innerHTML = ((1-weight)*100).toFixed()+"%";
			Color('#'+subject2.hex).light() ? _.id('mixWeightB').style.color = "#232323" : _.id('mixWeightB').style.color = "#fff";
			mixResult.style.backgroundColor = '#'+hex;
		}

		return {
			init: function(){
				setTimeout(function(){_.hide(mixButton)}, 200);
				_.attr(mixButton, 'class', 'active');
				setTimeout(function(){_.show(mixControls); _.show(mixResult)}, 200);
				setMixResult(0.5);
				_.id('mixBalance').value = 0.5;
				_.listen(_.id('mixBalance'), 'input', function(){setMixResult(_.id('mixBalance').value)});
			},
			exit: function($condition){
				var removeColorButton = $condition || false;
				_.hide(mixResult);
				_.hide(mixControls);
				_.show(mixButton);
				_.attr(mixButton, 'class', 'not-active'); 
				if (subjectsCount < 2) {
					_.hide(panel)
				};
				if (removeColorButton != true) {
					mixMode.exit(); 
				}
			},
			setup: function(){
				if (subjectsCount === 2){
					setMixResult(_.id('mixBalance').value);
					_.show(panel); 
					_.id('mixBalance').style.backgroundImage = ['linear-gradient(to right, #',subject1.hex,', #', subject2.hex,')'].join('');
				} else {
					this.exit();
				};

				if (mixModeStatus == true){
					this.init();
				};
			},
		};
	})();

	var compareModeStatus = false,
	compareMode = (function(){
		function updateDialogBackground(event){
			var hoveredColor = event.target,
				background = _.attr(hoveredColor, 'data-hex'),
				textColor = _.id('compareModeDialog').style.color;
			Color('#'+background).light() ? _.id('compareModeDialog').style.color = "#232323" : _.id('compareModeDialog').style.color = "#fff";
			_.id('compareModeDialog').style.backgroundColor = "#"+background;
		}
		return {
			init: function(){
				mixMode.exit() // TODO: make this more smart for future color options (aka edit, add to palette, etc.)
				if (compareModeStatus == false){
					_.id('compareModeButton').classList.add('active')
					_.id('app').classList.add('active-mode');
					_.id('app').classList.add('active-compare-mode');
				} else {
					_.id('compareModeButton').classList.remove('active')
					_.id('app').classList.remove('active-mode');
					_.id('app').classList.remove('active-compare-mode');
				}
				compareModeStatus = !compareModeStatus;

				_.listen(_.id('colors'), 'mouseover', updateDialogBackground)
				_.listen(_.id('palette_colors'), 'mouseover', updateDialogBackground)
			},
			exit: function(){
				_.id('app').classList.remove('active-mode');
				_.id('app').classList.remove('active-compare-mode');
				_.id('compareModeButton').classList.remove('active')
				compareModeStatus = false;
				_.unlisten(_.id('colors'), 'mouseover', updateDialogBackground);
				_.unlisten(_.id('palette_colors'), 'mouseover', updateDialogBackground);
			}
		}
	})();

	var mixModeStatus = false,
	mixMode = (function(){
		function updateDialogBackground(event){
			var hoveredColor = event.target,
				background = _.attr(hoveredColor, 'data-hex'),
				textColor = _.id('mixModeDialog').style.color;
			Color('#'+background).light() ? _.id('mixModeDialog').style.color = "#232323" : _.id('mixModeDialog').style.color = "#fff";
			_.id('mixModeDialog').style.backgroundColor = "#"+background;
		}
		return {
			init: function(){
				compareMode.exit(); // TODO: make this more smart for future color options (aka edit, add to palette, etc.)
				if (mixModeStatus == false){
					_.id('app').classList.add('active-mode');
					_.id('app').classList.add('active-mix-mode');
					_.id('mixModeButton').classList.add('active');
				} else {
					_.id('app').classList.remove('active-mode');
					_.id('app').classList.remove('active-mix-mode');
					_.id('mixModeButton').classList.remove('active');
				}
				mixModeStatus = !mixModeStatus;

				_.listen(_.id('colors'), 'mouseover', updateDialogBackground)
				_.listen(_.id('palette_colors'), 'mouseover', updateDialogBackground)
			},
			exit: function(){
				_.id('app').classList.remove('active-mode');
				_.id('app').classList.remove('active-mix-mode');
				_.id('mixModeButton').classList.remove('active');
				mixModeStatus = false;
				_.unlisten(_.id('colors'), 'mouseover', updateDialogBackground);
				_.unlisten(_.id('palette_colors'), 'mouseover', updateDialogBackground);
			}
		}
	})();

	return {
	  selectColor: function(event) {
		var attribute, clickedColor, colorTemplate, length;
		clickedColor = event.target;

		// prevents any empty color from being selected
		if (!clickedColor.classList.contains('color')) {
		  return;
		}

		if (clickedColor.id == "selectMix"){
			compareMode.exit();
			mixMode.exit();
		}

		// the attributes of the clicked color
		attribute = clickedColor.getAttribute.bind(clickedColor);
		data = {
		  name: attribute('data-name'),
		  hex: attribute('data-hex'),
		  rgb: attribute('data-rgb'),
		  hsl: attribute('data-hsl'),
		  checkContrast: checkContrastFunction,
		  mixed: attribute('data-mixed'),
		  origin: 'false'
		};

		// if a color is clicked while holding the `alt` key
		if (color_previews.length > 0 && event.altKey || compareModeStatus == true || mixModeStatus == true) {

		  if (color_previews.length === 2) {
			_.remove(color_previews[+(!event.shiftKey)]);
		  }

		  // TODO: figure this out
		  data.firstHex = _.attr(color_previews[0], 'data-hex');
		  data.firstName = _.attr(color_previews[0], 'data-name');
		  
		  // assigning subject1 and subject2 values to the common scope variables
		  subject1 = { name: data.firstName, hex: data.firstHex };
		  subject2 = { name: data.name, hex: data.hex };

		  // define the color template for two colors
		  colorTemplate = options.doubleTemplate;

		  subjectsCount = 2; // for correct visualization using CSS
		} else {

		  while (color_previews.length-- > 0) {
			_.remove(color_previews[0]);
		  }

		  // define the color template for one color
		  colorTemplate = options.singleTemplate;

		  subjectsCount = 1; // for correct visualization using CSS`
		}

		// for correct visualization using CSS
		_.attr(color_subjects, 'data-subjects', subjectsCount);

		toggleMessage(true);

		_.template(options.previewTemplate, changePreview);
		mixPanel.setup();
		return _.template(colorTemplate, changeTests);

	  },
	  selectMode: function(eventListener) {
		_.listen(_.id('colors'), eventListener, this.selectColor);
		_.listen(_.id('palette_colors'), eventListener, this.selectColor); 
	  },
	  setup: function($options) {
		options = $options;
		color_previews = _.cls('color-preview');
		color_subjects = _.id('subjects');
		this.selectMode('click')
		_.listen(_.id('subjects'), 'click', removeColor);
		_.listen(_.id('cancelMix'), 'click', mixPanel.exit);
		_.listen(_.id('mixButton'), 'click', mixPanel.init);
		_.listen(_.id('selectMix'), 'click', this.selectColor);
		_.listen(_.id('compareModeButton'), 'click', compareMode.init);
		_.listen(_.id('exitCompareModeButton'), 'click', compareMode.exit)
		_.listen(_.id('mixModeButton'), 'click', mixMode.init);
		_.listen(_.id('exitMixModeButton'), 'click', mixMode.exit);
	  }
	};
  });

}).call(this);
