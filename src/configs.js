define({
  app: {
    name: $('title').text()
  },
  colors: {
    placeholder: $('body'),
    dom: 'color',
    selector: $('.color')
  },
  clipboard: {
    field: $('#clipboard_handler')
  },
  utils: {
    menu: $('#options')
  },
  tooltip: $('#tooltip')
});