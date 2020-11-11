import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  MovieList = new Mongo.Collection('movies');

});
