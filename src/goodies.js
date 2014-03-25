(function() {
  var __hasProp = {}.hasOwnProperty;

  define(function() {
    var $cls, $createElement, $forEach, $getAttr, $id, $indexOf, $setAttr, cache, cacheData, clearCache, inProgress, merge, _apply, _compile, _contents, _document, _documentEl, _find, _generate, _replaceURLs, _strip, _urls;
    _document = document;
    _documentEl = document.documentElement;
    $forEach = Array.prototype.forEach;
    $indexOf = Array.prototype.indexOf;
    $id = _document.getElementById;
    $getAttr = Element.prototype.getAttribute;
    $setAttr = Element.prototype.setAttribute;
    $cls = HTMLHtmlElement.prototype.getElementsByClassName;
    $createElement = _document.createElement;
    _generate = function(src, data, compileOnly) {
      var fn, fnContext, functionBody;
      functionBody = _compile(data);
      fn = new Function("var p=[];with(this){" + functionBody + "}return p.join('');");
      fnContext = function(context) {
        return fn.call(context);
      };
      cache('templates', src, fnContext);
      cache('bareTemplates', src, functionBody);
      if (compileOnly) {
        return functionBody;
      } else {
        return fnContext;
      }
    };
    _urls = null;
    _contents = null;
    _apply = function(data, urls, contents) {
      _urls = urls;
      _contents = contents;
      return data.replace(/\{\*\s*([^\s]+).+?\s*\*\}/g, _replaceURLs);
    };
    _replaceURLs = function(match, url) {
      var index;
      index = _urls.indexOf(url);
      _urls[index] = null;
      return "{% " + _contents[index] + " %}";
    };
    _find = function(str) {
      var i, scopes, urls;
      urls = [];
      scopes = [];
      i = 0;
      str.replace(/\{\*\s*([^\s]+)\s+(.+?)?\s*\*\}/g, function(match, url, scope) {
        urls[i] = url;
        scopes[i] = scope;
        return ++i;
      });
      if (i > 0) {
        return {
          urls: urls,
          scopes: scopes
        };
      }
    };
    _strip = function(str) {
      return str.replace(/[\r\t\n\s]/g, " ").replace(/'(?=[^%}]*[%}]\})/g, "\t").split("'").join("\\'").split("\t").join("'");
    };
    _compile = function(str) {
      return ("p.push('" + str.replace(/\{\{(.+?)\}\}/g, "',$1,'").split("{%").join("');").split("%}").join("p.push('") + "');").replace(/p\.push\('\s*'\);/g, '');
    };
    cacheData = null;
    cache = function(storeName, key, value) {
      var store, _base;
      store = (_base = (cacheData || (cacheData = {})))[storeName] || (_base[storeName] = {});
      if (value) {
        return store[key] = value;
      } else {
        return store[key];
      }
    };
    clearCache = function(cacheKey, key) {
      return cacheData[cacheKey][key] = null;
    };
    inProgress = function(cacheKey, key, value) {
      var store;
      if (!cache(cacheKey, key)) {
        cache(cacheKey, key, [value]);
        return true;
      } else {
        store = cache(cacheKey, key);
        store[store.length] = value;
        return false;
      }
    };
    merge = function(destination, source) {
      var property, value;
      for (property in source) {
        value = source[property];
        destination[property] = value;
      }
      return destination;
    };
    return {
      async: function(scope, name, length) {
        var keys, method;
        method = scope[name];
        merge = merge;
        keys = Object.keys;
        return scope[name] = function(options) {
          var enclosedMethod, stashedOptions;
          if (keys(options).length < length) {
            stashedOptions = options;
            enclosedMethod = arguments.callee;
            return scope[name] = function(options) {
              return enclosedMethod(merge(options, stashedOptions));
            };
          } else {
            method.call(scope, options);
            return scope[name] = method;
          }
        };
      },
      getList: function(urls, callback) {
        var add, amount, contents, downloaded, url, _i, _len, _results;
        add = function(data, from) {
          contents[urls.indexOf(from)] = data;
          if (++downloaded === amount) {
            return callback(contents);
          }
        };
        amount = urls.length;
        contents = new Array(amount);
        downloaded = 0;
        _results = [];
        for (_i = 0, _len = urls.length; _i < _len; _i++) {
          url = urls[_i];
          _results.push(this.get(url, add));
        }
        return _results;
      },
      get: function(url, callback) {
        var cacheKey, request,
          _this = this;
        cacheKey = 'downloadsInProgress';
        if (!inProgress(cacheKey, url, callback)) {
          return;
        }
        request = new XMLHttpRequest();
        request.open('GET', url);
        this.listen(request, 'readystatechange', function(event) {
          var store, _i, _len;
          if (request.readyState === 4 && request.status === 200) {
            _this.unlisten(event.target, event.type, arguments.callee);
            store = cache(cacheKey, url);
            for (_i = 0, _len = store.length; _i < _len; _i++) {
              callback = store[_i];
              callback(request.responseText, url);
            }
            clearCache(cacheKey, url);
            return store.length = 0;
          }
        });
        return request.send();
      },
      json: function(url, callback) {
        return this.get(url, function(data) {
          return callback(JSON.parse(data));
        });
      },
      forEach: function(array, callback) {
        return $forEach.call(array, callback);
      },
      indexOf: function(array, el) {
        return $indexOf.call(array, el);
      },
      create: function(tag) {
        return $createElement.call(_document, tag);
      },
      attr: function(element, property, value, safariShit) {
        var result;
        if (safariShit == null) {
          safariShit = false;
        }
        result = (value ? $setAttr : $getAttr).call(element, property, value);
        if (safariShit) {
          element.classList.toggle('safariFix');
        }
        return result;
      },
      cls: function(element, names) {
        if (names) {
          return $cls.call(element, names);
        } else {
          return $cls.call(_documentEl, element);
        }
      },
      tag: function(element, tagName) {
        if (tagName) {
          return element.getElementsByTagName(tagName);
        } else {
          return _documentEl.getElementsByTagName(element);
        }
      },
      id: function(id) {
        return $id.call(_document, id);
      },
      listen: function(element, type, listener) {
        if (listener) {
          return element.addEventListener(type, listener);
        } else {
          return _documentEl.addEventListener(element, type);
        }
      },
      unlisten: function(element, type, listener) {
        if (listener) {
          return element.removeEventListener(type, listener);
        } else {
          return _documentEl.removeEventListener(element, type);
        }
      },
      remove: function(el) {
        return el.parentNode.removeChild(el);
      },
      hide: function(el) {
        return el.style.display = 'none';
      },
      show: function(el, type) {
        if (type == null) {
          type = 'block';
        }
        return el.style.display = type;
      },
      templateList: function(urls, callback, scopes, compileOnly) {
        var compiled, contents, i, listCallback, url, _results;
        if (compileOnly == null) {
          compileOnly = false;
        }
        compiled = 0;
        contents = [];
        listCallback = function(template) {
          var scope;
          scope = scopes[compiled];
          if (scope) {
            template = "with(" + scope + "){" + template + "}";
          }
          contents[compiled] = template;
          if (++compiled === urls.length) {
            return callback(contents);
          }
        };
        _results = [];
        for (i in urls) {
          if (!__hasProp.call(urls, i)) continue;
          url = urls[i];
          _results.push(this.template(url, listCallback, compileOnly));
        }
        return _results;
      },
      template: function(src, callback, compileOnly) {
        var cacheKey, template,
          _this = this;
        if (compileOnly == null) {
          compileOnly = false;
        }
        cacheKey = compileOnly ? 'bareTemplates' : 'templates';
        template = cache(cacheKey, src);
        if (template) {
          return callback(template);
        }
        cacheKey = 'templatesInProgress';
        if (!inProgress(cacheKey, src, callback)) {
          return;
        }
        return this.get(src, function(data) {
          var applySubtemplates, finish, subtmpls;
          data = _strip(data);
          subtmpls = _find(data);
          finish = function() {
            var store, _i, _len;
            store = cache(cacheKey, src);
            template = _generate(src, data, compileOnly);
            for (_i = 0, _len = store.length; _i < _len; _i++) {
              callback = store[_i];
              callback(template);
            }
            return clearCache(cacheKey, src);
          };
          applySubtemplates = function(contents) {
            data = _apply(data, subtmpls.urls, contents);
            return finish();
          };
          if (subtmpls) {
            return _this.templateList(subtmpls.urls, applySubtemplates, subtmpls.scopes, true);
          } else {
            return finish();
          }
        });
      }
    };
  });

}).call(this);
