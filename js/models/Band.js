// Filename: models/App.js

define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var Band = Backbone.Model.extend({
      urlRoot: 'http://em.wemakesites.net/band/random?api_key=YOUR_API_KEY&callback=',
      generateFact: function () {
        var band_name = this.get('data').band_name,
            details = this.get('data').details,
            discography = this.get('data').discography,
            random = Math.floor(Math.random() * 5) + 1,
            factoid = '';
            
        switch(random) {
            case 1:
                factoid = band_name + "'s lyrical themes include: " + details['lyrical themes'];
                break;
            case 2:
                factoid = band_name + " was formed in " + details['formed in'];
                break;
            case 3: 
                factoid = band_name + " is classified as " + details['genre'];
                break;
            case 4:
                factoid = band_name + " is from " + details['location'] + ', ' + details['country of origin'];
                break;
            case 5: 
                var albums = " albums";
                if(discography.length == 1) {
                    albums = " album";
                }
                factoid = band_name + " has released " + discography.length + albums;
                break;
            default:
                factoid = band_name + " is currently " + details['status'];
                break;
        }
        
        if(factoid.indexOf('N/A') != -1) {
            this.generateFact();
        } else {
            return "<p>" + factoid + "</p>";
        }
      
      }
  });

  return Band;
});
