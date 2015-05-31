// simple-todos.js
Answers = new Mongo.Collection("answers");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    answers: function () {
      return Answers.find({}, {sort: {createdAt: -1}});
    }
  });

  // Inside the if (Meteor.isClient) block, right after Template.body.helpers:
  Template.body.events({
    "submit .new-answer": function (event) {
      // This function is called when the new answer form is submitted

      var text = event.target.text.value;

      Answers.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  });

  var dt = new Date();
  var time = dt.toTimeString();
  // PLEASE ADD TIME!!!!! BITCHASS!!!

}

if (Meteor.isServer) {
  Meteor.startup(function () {});
}


