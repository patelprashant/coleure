define ['./_'], (_) ->
  setup: (options) ->
    _.listen _.id('colors'), 'click', (event) =>
      _.async @, 'displaySubject', 3
      _.async @, 'displayTests', 3
      

      _.template options.previewTemplate, (template) =>
        @displaySubject previewTemplate: template
      
      _.template options.colorTemplate, (template) =>
        @displaySubject colorTemplate: template

      @displaySubject color: event.target


      _.template options.testTemplate, (template) =>
        @displayTests testTemplate: template

      _.template options.singleTemplate, (template) =>
        @displayTests singleTemplate: template
      
      @displayTests color: event.target

  displaySubject: (options) ->
    element = options.color
    attribute = element.getAttribute.bind element
    color =
      template: options.colorTemplate
      name: attribute 'data-name'
      hex: attribute 'data-hex'

    _.id('subjects').innerHTML = options.previewTemplate color

  displayTests: (options) ->
    element = options.color
    attribute = element.getAttribute.bind element
    color =
      template: options.testTemplate
      hex: attribute 'data-hex'
    
    _.id('tests').innerHTML = options.singleTemplate color