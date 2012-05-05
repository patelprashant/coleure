define ->
  # Straightforward XHR.

  getList: (urls, callback) ->
    add = (data, from) ->
      contents[urls.indexOf from] = data
      if ++downloaded is amount
        callback contents

    amount = urls.length
    contents = new Array amount
    downloaded = 0
    
    for url in urls
      @get url, add


  get: (url, callback) ->
    #if Array.isArray url then return @getList url, callback
    cacheKey = 'downloadsInProgress'
    return unless @inProgress cacheKey, url, callback

    request = new XMLHttpRequest()
    request.open 'GET', url
    @listen request, 'readystatechange', (event) =>
      if request.readyState is 4 and 
         request.status is 200
        @unlisten event.target, event.type, arguments.callee

        store = @cache cacheKey, url
        for callback in store
          callback request.responseText, url

        @clearCache cacheKey, url
        store.length = 0

    request.send()

  json: (url, callback) ->
    @get url, (data) ->
      callback JSON.parse data

  # Other utilities

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

  cache: (storeName, key, value) ->
    store = (@["_cacheData"] or= {})[storeName] or= {}
    if value then store[key] = value else store[key]

  inProgress: (cacheKey, key, value) ->
    unless @cache cacheKey, key
      @cache cacheKey, key, [value]
      true
    else
      store = @cache cacheKey, key
      store[store.length] = value
      false

  clearCache: (cacheKey, key) ->
    @["_cacheData"][cacheKey][key] = null

  # For pseudo-Array collections.

  $forEach: Array.prototype.forEach
  forEach: (array, callback) ->
    @$forEach.call array, callback

  # Fast and smart access to functions with long names.

  $getAttr: Element.prototype.getAttribute
  $setAttr: Element.prototype.setAttribute

  attr: (element, property, value, safariShit = false) ->
    result = (if value then @$setAttr else @$getAttr).call element, property, value
    
    if safariShit
      element.classList.toggle 'safariFix'

    result
  
  $cls: HTMLHtmlElement.prototype.getElementsByClassName
  cls: (element, names) ->
    if names
      @$cls.call element, names
    else
      @$cls.call @_documentEl, element

  $tag: HTMLHtmlElement.prototype.getElementsByTagName
  tag: (element, tagName) ->
    if tagName
      @$tag.call element, tagName
    else
      console.log 'lole'
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

  remove: (el) ->
    el.parentNode.removeChild el

  hide: (el) ->
    el.style.display = 'none'

  show: (el, type='block') ->
    el.style.display = type

  # Internal stuff

  _document: document
  _documentEl: document.documentElement

  ###################
  # Template Engine #
  ###################

  templateList: (urls, callback, scopes, compileOnly = false) ->
    compiled = 0
    contents = []

    listCallback = (template) ->
      scope = scopes[compiled]
      if scope then template = "with(#{scope}){#{template}}"
      contents[compiled] = template
      if ++compiled is urls.length
        callback contents

    for own i, url of urls
      @template url, listCallback, compileOnly

  template: (src, callback, compileOnly = false) ->
    #Get from cache
    cacheKey = if compileOnly then 'bareTemplates' else 'templates'
    template = @cache cacheKey, src
    if template then return callback template

    cacheKey = 'templatesInProgress'
    return unless @inProgress cacheKey, src, callback

    @get src, (data) =>
      #Strip whitespaces
      data = @_strip data

      #Find subtemplates
      subtmpls = @_find data

      finish = =>
        store = @cache cacheKey, src
        template = @_generate src, data, compileOnly
        for callback in store
          callback template
        @clearCache cacheKey, src

      applySubtemplates = (contents) =>
          #Replace subtemplates declarations
          data = @_apply data, subtmpls.urls, contents
          finish()
      
      if subtmpls
        @templateList subtmpls.urls, applySubtemplates, subtmpls.scopes, true
      else
        finish()

  _generate: (src, data, compileOnly) ->
    functionBody = @_compile data
    fn = new Function "var p=[];with(this){#{functionBody}}return p.join('');"
    fnContext = (context) -> fn.call context

    @cache 'templates', src, fnContext
    @cache 'bareTemplates', src, functionBody

    if compileOnly then functionBody else fnContext

  _apply: (data, urls, contents) ->
    data.replace /\{\*\s*([^\s]+).+?\s*\*\}/g, (match, url) =>
      index = urls.indexOf url
      urls[index] = null
      "{% #{contents[index]} %}"

  _find: (str) ->
    urls = []
    scopes = []
    i = 0

    str.replace /\{\*\s*([^\s]+)\s+(.+?)?\s*\*\}/g, (match, url, scope) ->
      urls[i] = url
      scopes[i] = scope
      ++i

    if i > 0
      urls: urls
      scopes: scopes

  _strip: (str) ->
    str.replace(/[\r\t\n\s]/g, " ")
       .replace(/'(?=[^%}]*[%}]\})/g, "\t")
       .split("'").join("\\'")
       .split("\t").join("'")

  _compile: (str) ->
    ("p.push('" +
      str.replace(/\{\{(.+?)\}\}/g, "',$1,'")
         .split("{%").join("');")
         .split("%}").join("p.push('") +
    "');").replace(/p\.push\('\s*'\);/g, '')
