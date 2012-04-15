define ->
  _document: document
  _documentEl: document.documentElement

  # Straightforward XHR.

  get: (url, callback) ->
    request = new XMLHttpRequest()
    request.open 'GET', url
    @listen request, 'readystatechange', (event) =>
      if request.readyState is 4 and request.status is 200
        @unlisten event.target, event.type, arguments.callee
        callback request.responseText
    request.send()

  json: (url, callback) ->
    @get url, (data) =>
      callback JSON.parse data

  merge: (destination, source) ->
    for property, value of source
      destination[property] = value

    destination
  
  async: (scope, name, length) ->
    method = scope[name]
    merge = @merge
    keys = Object.keys

    scope[name] = (options) ->
      if keys(options).length < length
        stashedOptions = options
        enclosedMethod = arguments.callee
        scope[name] = (options) ->
          enclosedMethod merge options, stashedOptions
      else
        method.call scope, options
        scope[name] = method

  # For pseudo-Array collections.

  $forEach: Array.prototype.forEach
  forEach: (array, callback) ->
    @$forEach.call array, callback

  # Fast and smart access to functions with long names.
  
  $cls: Element.prototype.getElementsByClassName
  cls: (element, names) ->
    if names
      @$cls.call element, names
    else
      @$cls.call @_documentEl, element

  $tag: Element.prototype.getElementsByTagName
  tag: (element, tagName) ->
    if tagName
      @$tag.call element, tagName
    else
      @$tag.call @_documentEl, element

  $id: document.getElementById
  id: (id) ->
    @$id.call @_document, id

  listen: (element, type, listener) ->
    if listener
      element.addEventListener type, listener
    else
      @_documentEl.addEventListener element, type

  unlisten: (element, type, listener) ->
    if listener
      element.removeEventListener type, listener
    else
      @_documentEl.removeEventListener element, type

  templatesOnProgress: {}
  templates: {}
  template: (src, callback) ->
    if callback
      if @templates.hasOwnProperty src
        callback @templates[src]
        return
      else if @templatesOnProgress.hasOwnProperty src
        @templatesOnProgress[src].push callback
        return

      @templatesOnProgress[src] = []
      @get src, (data) =>
        callback @templates[src] = @template data

        for handler in @templatesOnProgress[src]
          handler @templates[src]

        delete @templatesOnProgress[src]

      return

    new Function(
      "$", 
      "var p=[];" +
      "p.push('" +
      src.replace(/[\r\t\n]/g, " ")
         .replace(/'(?=[^%}]*[%}]})/g, "\t")
         .split("'").join("\\'")
         .split("\t").join("'")
         .replace(/\{\{(.+?)\}\}/g, "',$1,'")
         .split("{%").join("');")
         .split("%}").join("p.push('") +
      "');return p.join('');")