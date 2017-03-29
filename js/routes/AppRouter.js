// Filename: routes/AppRouter.js

define([
  'jquery',
  'underscore',
  'backbone',
  'views/HomeView',
], function($, _, Backbone, HomeView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      'home': 'showHome',
      // Default route
      '*actions': 'default'
    }
  });
  
  var initialize = function(){
      
    if($('#ismobile').css('display') == 'none') {
        $('body').addClass('mobile').removeClass('desktop');
    } else {
        $('body').removeClass('mobile').addClass('desktop');
    }
        
   
      
    var appRouter = new AppRouter;
    
    $('#playnow').on('click', function () {
        $('#who').slideUp();
        var homeView = new HomeView();
    });

    Backbone.history.start({ pushState: true});
  };

  return { 
    initialize: initialize
  };
});
