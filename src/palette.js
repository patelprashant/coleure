(function() {

  define(['./goodies', './settings'], function(_, settings) {
    var activePalette, 
        addPalette, 
        colorDrag, 
        colorDrop, 
        colorOver, 
        colorTemplate, 
        createPalette, 
        dropMessage, 
        insertColor, 
        newPaletteField_changeHandler, 
        paletteColorDrag, 
        paletteColorDrop, 
        paletteColorOver, 
        paletteColors, 
        paletteItems, 
        palettesDropdown,
        palettesDropdownLabel, 
        palettesList, 
        palettesList_clickHandler, 
        removePalette, 
        replaceColors, 
        setup, 
        switchPalette,
        colorOrigin;
    palettesDropdownLabel = null;
    palettesList = null;
    paletteItems = null;
    paletteColors = null;
    dropMessage = null;
    colorTemplate = null;
    activePalette = null;
    colorDrag = function(event) {
      var color, data;
      color = event.target;
      colorOrigin = _.attr(color, 'data-origin');
      data = {
        name: _.attr(color, 'data-name'),
        hex: _.attr(color, 'data-hex'),
        rgb: _.attr(color, 'data-rgb'),
        hsl: _.attr(color, 'data-hsl'),
        mixed: _.attr(color, 'data-mixed')
      };
      event.dataTransfer.effectAllowed = 'copy';
      return event.dataTransfer.setData('text', JSON.stringify(data));
    };
    colorOver = function(event) {
      event.preventDefault();
      return event.dataTransfer.dropEffect = 'copy';
    };
    colorDrop = function(event) {
      var data;
      event.preventDefault();
      data = JSON.parse(event.dataTransfer.getData('text'));
      _.template(colorTemplate, function(template) {
        return insertColor(template, data);
      });
      _.hide(dropMessage);
      return activePalette.push(data);
    };
    paletteColorDrag = function(event) {
      var index, paletteColor;
      event.dataTransfer.effectAllowed = 'move';
      paletteColor = event.target;
      colorOrigin = _.attr(paletteColor, 'data-origin');
      index = _.indexOf(paletteColor.parentNode.children, paletteColor);
      return event.dataTransfer.setData('text', index);
    };
    paletteColorOver = function(event) {
      event.preventDefault();
      return event.dataTransfer.dropEffect = 'move';
    };
    paletteColorDrop = function(event) {
      var index, origin, visualColor;
      event.preventDefault();
      index = event.dataTransfer.getData('text');
      visualColor = paletteColors.children.item(index);
      origin = _.attr(visualColor, 'data-origin');
      if (colorOrigin == "palette") {
        _.remove(visualColor);
        activePalette.splice(activePalette.length - index - 1, 1);
      }
      if (activePalette.length == 0) {
        _.show(dropMessage)
      }

      console.log('paletteColorDrop');
    };
    newPaletteField_changeHandler = function(event) {
      var field;
      field = event.target;
      createPalette(field.value);
      dropdownAppearanceHandler();
      return field.value = '';
    };
    palettesList_clickHandler = function(event) {
      var clickedElement;
      clickedElement = event.target;
      if (clickedElement.classList.contains('remove-option')) {
        if (confirm('Are you sure you want to delete this palette?')) { removePalette(clickedElement.parentNode); }
        if(settings.palettes.length === 0) {
          createPalette('Default');
          switchPalette('0');
          dropdownAppearanceHandler();
        }
      } else {
        if (!clickedElement.classList.contains('select-option')) {
          clickedElement = clickedElement.parentNode;
        }
        dropdownAppearanceHandler();
        return switchPalette(_.indexOf(paletteItems, clickedElement));
      }
    };
    createPalette = function(name) {
      settings.palettes.push({
        name: name,
        colors: []
      });
      addPalette(name);
      return switchPalette(paletteItems.length - 1);
    };
    addPalette = function(name) {
      var newPalette;
      newPalette = _.create('li');
      palettesList.appendChild(newPalette);
      return newPalette.outerHTML = "<li class='select-option'>\n  <span class='name-option'>" + name + "</span>\n  <a class='remove-option right'>delete</a>\n</li>";
    };
    switchPalette = function(index) {
      var palette, previousPalette;
      if (settings.activePaletteIndex === index) {
        return;
      }
      previousPalette = paletteItems[settings.activePaletteIndex];
      if (previousPalette) {
        previousPalette.classList.remove('selected');
      }
      palette = paletteItems[index];
      palette.classList.add('selected');
      settings.activePaletteIndex = index;
      activePalette = settings.palettes[index].colors;
      palettesDropdownLabel.innerHTML = _.cls(palette, 'name-option')[0].innerHTML;
      return _.template(colorTemplate, replaceColors);
    };
    replaceColors = function(template) {
      var color, _i, _len;
      while (paletteColors.firstChild) {
        paletteColors.removeChild(paletteColors.firstChild);
      }
      for (_i = 0, _len = activePalette.length; _i < _len; _i++) {
        color = activePalette[_i];
        if (!color.mixed) { 
          color.mixed = 'false';
        }
        insertColor(template, color);
      }
      if (paletteColors.children.length) {
        return _.hide(dropMessage);
      } else {
        return _.show(dropMessage);
      }
    };
    removePalette = function(element) {
      var index;
      index = _.indexOf(paletteItems, element);
      settings.palettes.splice(index, 1);
      return _.remove(element);
    };
    insertColor = function(template, color) {
      var el;
      el = _.create('i');
      paletteColors.insertBefore(el, paletteColors.firstChild);
      color.origin = "palette";
      el.outerHTML = template(color);
      _.forEach(_.cls(_.id('palette_colors'), 'mix-mark'), function(el) {
        var hex = _.attr(el, 'data-hex');
        Color('#'+hex).light() ? el.style.color = "#232323" : el.style.color = "#fff";
      })
    };

    var dropdownVisible = false,
        dropdownAppearanceHandler = function(event) {
      dropdownVisible ? _.hide(palettesDropdown) : _.show(palettesDropdown);
      dropdownVisible = !dropdownVisible;
    };

    return setup = function(options) {
      var activePaletteIndex, dropzone, newPaletteField, palette, _i, _len, _ref;
      palettesDropdown = _.cls('select-options')[0];
      palettesDropdownLabel = _.cls('select-input')[0];
      palettesList = _.tag(palettesDropdown, 'ul')[0];
      _.listen(palettesList, 'click', palettesList_clickHandler);
      paletteItems = palettesList.children;
      newPaletteField = _.tag(palettesDropdown, 'input')[0];
      _.listen(newPaletteField, 'change', newPaletteField_changeHandler);
      _.listen(palettesDropdownLabel, 'click', dropdownAppearanceHandler);
      _.hide(palettesDropdown);
      dropzone = _.id('palette');
      _.listen(dropzone, 'dragenter', colorOver);
      _.listen(dropzone, 'dragover', colorOver);
      _.listen(dropzone, 'drop', colorDrop);
      _.listen(_.id('colors'), 'dragstart', colorDrag);
      _.listen(_.id('subjects'), 'dragstart', colorDrag);
      paletteColors = _.id('palette_colors');
      _.listen(paletteColors, 'dragstart', paletteColorDrag);
      _.listen(_.id('colors'), 'dragenter', paletteColorOver);
      _.listen(_.id('colors'), 'dragover', paletteColorOver);
      _.listen(_.id('colors'), 'drop', paletteColorDrop);
      dropMessage = _.id('drop-message');
      colorTemplate = options.template;
      _ref = settings.palettes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        palette = _ref[_i];
        addPalette(palette.name);
      }
      activePaletteIndex = settings.activePaletteIndex;
      settings.activePaletteIndex = -1;
      return switchPalette(activePaletteIndex);
    };
  });

}).call(this);
