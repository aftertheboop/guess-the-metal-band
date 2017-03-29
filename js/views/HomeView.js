// Filename: views/HomeView.js

define([
  'jquery',
  'underscore',
  'backbone',
  'models/Band',
  'text!templates/home.html',
  'text!templates/incorrect.html',
  'text!templates/correct.html',
  'text!templates/gameOver.html'
], function($, _, Backbone, Band, homeTemplate, incorrectTemplate, correctTemplate, gameOverTemplate){

  var HomeView = Backbone.View.extend({
    el: $("#game"),
    initialize: function () {
                
        this.band = new Band();
        this.score = 0;
        this.played = 5;
        
        this.getBand();
    },
    render: function(){
        
        var view = this,
            template = _.template(homeTemplate);
        
        view.$el.html(template({band:view.band, score: view.score}));
        
        if($('body').hasClass('desktop')) {
            $('#answer').focus();
        }
                        
    },
    events: {
        'click #submit':'checkAnswer',
        'click #next':'getBand',
        'click #reset':'playAgain',
        
    },
    checkAnswer: function (e) {
        
        e.preventDefault();
        
        var view = this,
            userAnswer = $('#answer').val().toLowerCase(),
            answer = view.band.get('data').band_name.toLowerCase(),
            correct = false;
    
        if(userAnswer == '') {
            return false;
        } else {
    
            $('#submit').attr('disabled', 'disabled');
            $('#answer').attr('disabled', 'disabled');

            if(userAnswer == answer) {
                correct = true;
            }

            if(view.played > 0) {
                view.answered(correct);
            } else {
                view.gameOver(correct);
            }
        
        }
        
    },
    getBand: function () {
        var view = this;
        
        view.band.fetch({
            success: function () {
                                                
                if(typeof view.band.get('data').logo !== 'undefined') {
                    view.render();
                } else {
                    view.getBand();
                }
            }
        });  
    },
    answered: function (correct) {
        
        var view = this;
        
        if(correct) {
            view.score++;
            view.played--;
            
            $('#response').html('Correct!').addClass('text-success');
            
            template = _.template(correctTemplate);        
            view.$el.append(template({band:view.band}));
        } else {
            view.played--;            
            
            $('#response').html('Incorrect!').addClass('text-danger');
            
            template = _.template(incorrectTemplate);        
            view.$el.append(template({band:view.band}));
        }
        
        view.updateScore();
        
        document.onkeypress = function (e) {
            e = e || window.event;
            // use e.keyCode
            if(e.keyCode == 13) {
                $('#next').trigger('click');
                document.removeEventListener('keypress', this);
            }
        };
    },
    gameOver: function (correct) {
        var view = this;
        
        if(correct) {
            view.score++;
        }
        
        view.updateScore();
        $('#response').html('Game Over!').addClass('text-info');
        template = _.template(gameOverTemplate);        
        view.$el.append(template({score:view.score}));
    },
    playAgain: function () {
        var view = this;
        
        view.played = 5;
        view.score = 0;
        
        view.getBand();
    },
    updateScore: function () {
        
        var view = this;
        
        view.$el.find('#score').html(view.score);
        
    }
  });

  return HomeView;
});
