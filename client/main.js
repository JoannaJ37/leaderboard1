import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import 'bootstrap/dist/css/bootstrap.css'

MovieList = new Mongo.Collection('movies');

Template.leaderboard.helpers({ 
  'movie': function(){
    return MovieList.find({}, {sort: {score: -1, movie: 1} })
  },

  'selectedClass': function(){
    var movieId = this._id;
    var selectedMovie = Session.get('selectedMovie'); 
      if (movieId == selectedMovie){
        return "selected" 
      }
    },

  'showSelectedMovie': function(){
    var selectedMovie= Session.get('selectedMovie');
    return MoviesList.findOne(selectedMovie)
  },

});
  
Template.leaderboard.events({ 
  'click .movie': function(){
    var movieId = this._id; 
    Session.set('selectedMovie', movieId);
  },

  'click .increment': function(){
    var selectedMovie = Session.get('selectedMovie');
    MovieList.update(selectedMovie, {$inc: {score: 5}});
  },

  'click .decrement': function(){
    var selectedMovie = Session.get('selectedMovie');
    MovieList.update(selectedMovie, {$inc: {score: -5}});
  },

  'submit form': function(event){ event.preventDefault();
    var movieTitleVar = event.target.movieTitle.value;
    var movieDirectorVar = event.target.movieDirector.value;
    console.log(movieTitleVar);
    console.log(movieDirectorVar);
    MovieList.insert({
      title: movieTitleVar,
      director: movieDirectorVar,
      score: 0 
    });
  },

  'click .remove': function(){
    var selectedMovie = Session.get('selectedMovie'); 
    MovieList.remove(selectedMovie);
  },
    
});