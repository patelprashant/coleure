$(function() {
  // Color model
  function parseColor (text) {
    var cleanColor = text.replace(/^(#|0x)/,'');
    if (cleanColor.length === 3) {
      var r = cleanColor.substring(0, 1),
          g = cleanColor.substring(1, 2),
          b = cleanColor.substring(2);
      return r+r+g+g+b+b;
    } else {
      return cleanColor;
    }
  }
  window.Color = Backbone.Model.extend();
  
  // Palette collection
  window.Palette = Backbone.Collection.extend({
    model: Color,
    localStorage: new Store("colors")
  });
  
  window.Colors = new Palette;
  
  // Color view
  window.ColorView = Backbone.View.extend({
    template: _.template($('#color-template').html()),
    events: {
      "click a.destroy": "clear"
    },
    initialize: function() {
      this.model.bind('destroy', this.remove, this);
    },
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
    remove: function() {
      $(this.el).remove();
    },
    clear: function() {
      this.model.destroy();
    }
  });
  
  // The App
  window.AppView = Backbone.View.extend({
    el: $('#boner'),
    events: {
      "keypress #new-color": "createOnEnter"
    },
    initialize: function() {
      this.input    = this.$("#new-color");

      Colors.bind('add',   this.addOne, this);
      Colors.bind('reset', this.addAll, this);

      Colors.fetch();
    },
    addOne: function(todo) {
      var view = new ColorView({model: todo});
      this.$("#palette").prepend(view.render().el);
    },
    addAll: function() {
      Colors.each(this.addOne);
    },
    createOnEnter: function(e) {
      var text = this.input.val();
      if (e.keyCode == 13 && text) {
        var match = text.match(/(?:#|0x)?[0-9a-f]{3}(?:[0-9a-f]{3})?/i);
        if (match && match[0] == text) {
          Colors.create({color: parseColor(text)});
          this.input.val('');
        } else {
          alert('Plese enter a HEX color value.')
        }
      }
    }
  })
  window.App = new AppView;
});