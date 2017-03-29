// Filename: main.js

require.config({
  paths: {
    "jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min",
    "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
    "backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min",
    "text": "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
    "bootstrap": "//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/js/bootstrap.min"
  },
  shim: {
      bootstrap: {
          deps: ['jquery']
      }
  }
});

require([
  'App'
  ], function(App) {
    App.initialize();
  }
);