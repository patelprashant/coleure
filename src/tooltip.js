define(['./configs', './keyboard'], function(configs, keyboard){
    var done = localStorage.tooltip? localStorage.tooltip:"false";
    var _this = {
      notify: function(message) {
        configs.tooltip.text(message)
      },
      dismiss: function() {
        configs.tooltip.fadeOut('fast');
        done = "true";
        localStorage.tooltip = "true";
      },
      success: function () {
        _this.notify('You got it! Now paste it.');
        configs.tooltip.addClass('success');
        setTimeout(function(){_this.dismiss()}, 1000)
      },
      init: function() {
        if (done=="true") configs.tooltip.hide();
        $('.empty-color, .site, .banner').bind('mouseover mousemove', function(){
          configs.tooltip.fadeOut('fast')
        })
        $('.color').bind('mouseover mousemove', function(e){
          if (done=="false") configs.tooltip.fadeIn();
          configs.tooltip.css({
            'top': e.clientY,
            'left': e.clientX
          });
        });
        keyboard.combined('C', _this.success)
      }
    }

    return _this;
});