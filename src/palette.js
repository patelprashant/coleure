(function() {

  define(['./goodies', './settings'], function(_, settings) {
    var activePalette, colorDrag, colorDrop, colorOver, colorTemplate, colors, createPalette, data, dropMessage, insertColor, newPaletteField_changeHandler, paletteItems, palettesDropdownLabel, palettesList, palettesList_clickHandler, removePalette, replaceColors, setup, switchPalette;
    data = null;
    colors = null;
    palettesList = null;
    paletteItems = null;
    palettesDropdownLabel = null;
    dropMessage = null;
    colorTemplate = null;
    activePalette = null;
    colorDrag = function(event) {
      var color;
      color = event.target;
      data = {
        name: _.attr(color, 'data-name'),
        hex: _.attr(color, 'data-hex'),
        rgb: _.attr(color, 'data-rgb'),
        hsl: _.attr(color, 'data-hsl')
      };
      event.dataTransfer.effectAllowed = 'copy';
      return event.dataTransfer.setData('text', 'Color added.');
    };
    colorOver = function(event) {
      event.preventDefault();
      return event.dataTransfer.dropEffect = 'copy';
    };
    colorDrop = function(event) {
      event.preventDefault();
      _.template(colorTemplate, insertColor);
      _.hide(dropMessage);
      return activePalette.push(data);
    };
    newPaletteField_changeHandler = function(event) {
      var field;
      field = event.target;
      createPalette(field.value);
      return field.value = '';
    };
    palettesList_clickHandler = function(event) {
      var clickedElement;
      clickedElement = event.target;
      if (clickedElement.classList.contains('remove-option')) {
        return removePalette(clickedElement.parentNode);
      } else {
        if (!clickedElement.classList.contains('select-option')) {
          clickedElement = clickedElement.parentNode;
        }
        return switchPalette(clickedElement);
      }
    };
    createPalette = function(name) {
      var newPalette;
      newPalette = _.create('li');
      palettesList.appendChild(newPalette);
      newPalette.outerHTML = "<li class='select-option'>\n  <span class='name-option'>" + name + "</span>\n  <a class='remove-option right'>&times;</a>\n</li>";
      return switchPalette(paletteItems[paletteItems.length - 1]);
    };
    switchPalette = function(palette) {
      var index, previousPalette, _base;
      index = _.indexOf(paletteItems, palette);
      if (settings.activePaletteIndex === index) return;
      previousPalette = paletteItems[settings.activePaletteIndex];
      if (previousPalette) previousPalette.classList.remove('selected');
      palette.classList.add('selected');
      settings.activePaletteIndex = index;
      activePalette = (_base = settings.palettes)[index] || (_base[index] = []);
      palettesDropdownLabel.innerHTML = _.cls(palette, 'name-option')[0].innerHTML;
      return _.template(colorTemplate, replaceColors);
    };
    replaceColors = function(template) {
      var color, _i, _len;
      while (colors.firstChild) {
        colors.removeChild(colors.firstChild);
      }
      for (_i = 0, _len = activePalette.length; _i < _len; _i++) {
        color = activePalette[_i];
        data = color;
        insertColor(template);
      }
      if (colors.children.length) {
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
    insertColor = function(template) {
      var el;
      el = _.create('i');
      colors.insertBefore(el, colors.firstChild);
      return el.outerHTML = template(data);
    };
    return setup = function(options) {
      var dropzone, newPaletteField, palettesDropdown;
      palettesDropdown = _.cls('select-options')[0];
      palettesDropdownLabel = _.cls('select-input')[0];
      palettesList = _.tag(palettesDropdown, 'ul')[0];
      _.listen(palettesList, 'click', palettesList_clickHandler);
      paletteItems = palettesList.children;
      newPaletteField = _.tag(palettesDropdown, 'input')[0];
      _.listen(newPaletteField, 'change', newPaletteField_changeHandler);
      dropzone = _.id('palette');
      _.listen(dropzone, 'dragenter', colorOver);
      _.listen(dropzone, 'dragover', colorOver);
      _.listen(dropzone, 'drop', colorDrop);
      _.listen(_.id('colors'), 'dragstart', colorDrag);
      _.listen(_.id('subjects'), 'dragstart', colorDrag);
      dropMessage = _.id('drop-message');
      colors = _.id('palette_colors');
      colorTemplate = options.template;
      if (!paletteItems.length) return createPalette('Default');
    };
  });

}).call(this);
