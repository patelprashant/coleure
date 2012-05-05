(function() {
  var __hasProp = Object.prototype.hasOwnProperty;

  define(function() {
    return {
      getList: function(urls, callback) {
        var add, amount, contents, downloaded, url, _i, _len, _results;
        add = function(data, from) {
          contents[urls.indexOf(from)] = data;
          if (++downloaded === amount) return callback(contents);
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
        if (!this.inProgress(cacheKey, url, callback)) return;
        request = new XMLHttpRequest();
        request.open('GET', url);
        this.listen(request, 'readystatechange', function(event) {
          var callback, store, _i, _len;
          if (request.readyState === 4 && request.status === 200) {
            _this.unlisten(event.target, event.type, arguments.callee);
            store = _this.cache(cacheKey, url);
            for (_i = 0, _len = store.length; _i < _len; _i++) {
              callback = store[_i];
              callback(request.responseText, url);
            }
            _this.clearCache(cacheKey, url);
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
      merge: function(destination, source) {
        var property, value;
        for (property in source) {
          value = source[property];
          destination[property] = value;
        }
        return destination;
      },
      async: function(scope, name, length) {
        var keys, merge, method;
        method = scope[name];
        merge = this.merge;
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
      cache: function(storeName, key, value) {
        var store, _base;
        store = (_base = (this["_cacheData"] || (this["_cacheData"] = {})))[storeName] || (_base[storeName] = {});
        if (value) {
          return store[key] = value;
        } else {
          return store[key];
        }
      },
      inProgress: function(cacheKey, key, value) {
        var store;
        if (!this.cache(cacheKey, key)) {
          this.cache(cacheKey, key, [value]);
          return true;
        } else {
          store = this.cache(cacheKey, key);
          store[store.length] = value;
          return false;
        }
      },
      clearCache: function(cacheKey, key) {
        return this["_cacheData"][cacheKey][key] = null;
      },
      $forEach: Array.prototype.forEach,
      forEach: function(array, callback) {
        return this.$forEach.call(array, callback);
      },
      $getAttr: Element.prototype.getAttribute,
      $setAttr: Element.prototype.setAttribute,
      attr: function(element, property, value, safariShit) {
        if (value) {
          return this.$setAttr.call(element, property, value);
        } else {
          return this.$getAttr.call(element, property);
        }
      },
      $cls: HTMLHtmlElement.prototype.getElementsByClassName,
      cls: function(element, names) {
        if (names) {
          return this.$cls.call(element, names);
        } else {
          return this.$cls.call(this._documentEl, element);
        }
      },
      $tag: Element.prototype.getElementsByTagName,
      tag: function(element, tagName) {
        if (tagName) {
          return this.$tag.call(element, tagName);
        } else {
          return this.$tag.call(this._documentEl, element);
        }
      },
      $id: document.getElementById,
      id: function(id) {
        return this.$id.call(this._document, id);
      },
      listen: function(element, type, listener) {
        if (listener) {
          return element.addEventListener(type, listener);
        } else {
          return this._documentEl.addEventListener(element, type);
        }
      },
      unlisten: function(element, type, listener) {
        if (listener) {
          return element.removeEventListener(type, listener);
        } else {
          return this._documentEl.removeEventListener(element, type);
        }
      },
      remove: function(el) {
        return el.parentNode.removeChild(el);
      },
      hide: function(el) {
        return el.style.display = 'none';
      },
      show: function(el, type) {
        if (type == null) type = 'block';
        return el.style.display = type;
      },
      _document: document,
      _documentEl: document.documentElement,
      templateList: function(urls, callback, scopes, compileOnly) {
        var compiled, contents, i, listCallback, url, _results;
        if (compileOnly == null) compileOnly = false;
        compiled = 0;
        contents = [];
        listCallback = function(template) {
          var scope;
          scope = scopes[compiled];
          if (scope) template = "with(" + scope + "){" + template + "}";
          contents[compiled] = template;
          if (++compiled === urls.length) return callback(contents);
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
        if (compileOnly == null) compileOnly = false;
        cacheKey = compileOnly ? 'bareTemplates' : 'templates';
        template = this.cache(cacheKey, src);
        if (template) return callback(template);
        cacheKey = 'templatesInProgress';
        if (!this.inProgress(cacheKey, src, callback)) return;
        return this.get(src, function(data) {
          var applySubtemplates, finish, subtmpls;
          data = _this._strip(data);
          subtmpls = _this._find(data);
          finish = function() {
            var callback, store, _i, _len;
            store = _this.cache(cacheKey, src);
            template = _this._generate(src, data, compileOnly);
            for (_i = 0, _len = store.length; _i < _len; _i++) {
              callback = store[_i];
              callback(template);
            }
            return _this.clearCache(cacheKey, src);
          };
          applySubtemplates = function(contents) {
            data = _this._apply(data, subtmpls.urls, contents);
            return finish();
          };
          if (subtmpls) {
            return _this.templateList(subtmpls.urls, applySubtemplates, subtmpls.scopes, true);
          } else {
            return finish();
          }
        });
      },
      _generate: function(src, data, compileOnly) {
        var fn, fnContext, functionBody;
        functionBody = this._compile(data);
        fn = new Function("var p=[];with(this){" + functionBody + "}return p.join('');");
        fnContext = function(context) {
          return fn.call(context);
        };
        this.cache('templates', src, fnContext);
        this.cache('bareTemplates', src, functionBody);
        if (compileOnly) {
          return functionBody;
        } else {
          return fnContext;
        }
      },
      _apply: function(data, urls, contents) {
        var _this = this;
        return data.replace(/\{\*\s*([^\s]+).+?\s*\*\}/g, function(match, url) {
          var index;
          index = urls.indexOf(url);
          urls[index] = null;
          return "{% " + contents[index] + " %}";
        });
      },
      _find: function(str) {
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
      },
      _strip: function(str) {
        return str.replace(/[\r\t\n\s]/g, " ").replace(/'(?=[^%}]*[%}]\})/g, "\t").split("'").join("\\'").split("\t").join("'");
      },
      _compile: function(str) {
        return ("p.push('" + str.replace(/\{\{(.+?)\}\}/g, "',$1,'").split("{%").join("');").split("%}").join("p.push('") + "');").replace(/p\.push\('\s*'\);/g, '');
      }
    };
  });

}).call(this);
