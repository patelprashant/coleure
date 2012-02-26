define(['./configs', './keyboard'], function(configs, keyboard){
    var done = false;
    return {
      notify: function(message) {
        configs.tooltip.text(message)
      },
      success: function () {
        console.log(this)
        this.notify('Awesome! You got it!');
        configs.tooltip.addClass('success');
        setTimeout(function(){configs.tooltip.fadeOut()}, 1000)
        done = true;
      },
      init: function() {
        $('.empty-color, .site, .banner').bind('mouseover mousemove', function(){
          configs.tooltip.fadeOut('fast')
        })
        $('.color').bind('mouseover mousemove', function(e){
          if (done==false) configs.tooltip.fadeIn();
          configs.tooltip.css({
            'top': e.clientY,
            'left': e.clientX
          });
        });
        keyboard.combined('C', this.success.bind(this))
      }
    }
});