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
  palette: {
    dropzone: $('#dropzone'),
    selector: $('#palette'),
    trash: $('#trash'),
    limit: 7
  },
  tooltip: $('#tooltip')
});
