define ->
  _document: document

  # Straightforward XHR.

  get: (url, callback) ->
    request = new XMLHttpRequest()
    request.open 'GET', url
    @listen request, 'readystatechange', (event) =>
      if request.readyState is 4 and request.status is 200
        @unlisten event.target, event.type, arguments.callee
        callback request.responseText
    request.send()

  # For pseudo-Array collections.

  $forEach: Array.prototype.forEach
  forEach: (array, callback) ->
    @$forEach.call array, callback

  # Fast and smart access to functions with long names.
  
  $cls: Element.prototype.getElementsByClassName
  _cls: document.getElementsByClassName
  cls: (element, names) ->
    if names
      @$cls.call element, names
    else
      @_cls.apply @_document, arguments

  $tag: Element.prototype.getElementsByTagName
  _tag: document.getElementsByTagName
  tag: (element, tagName) ->
    if tagName
      @$tag.call element, tagName
    else
      @_tag.apply @_document, arguments

  $id: document.getElementById
  id: (id) ->
    @$id.call @_document, id

  listen: (element, type, listener) ->
    if listener
      element.addEventListener type, listener
    else
      @_document.addEventListener.apply @_document, arguments

  unlisten: (element, type, listener) ->
    if listener
      element.removeEventListener type, listener
    else
      @_document.removeEventListener.apply @_document, arguments