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

  // add time on jquery load
  var refreshTime = function () {
    var dateTime = new Date();

    var seconds = dateTime.toLocaleTimeString();
    var match = seconds.match(/(\d+:\d+):\d+( \w+)/);
    var withoutSeconds = match[1] + match[2];

    $('.time').text(withoutSeconds);
    $('.time2').text(dateTime.toDateString());
  };

  // on page load
  $(refreshTime);
  // and every second
  setInterval(refreshTime, 10000);
}

if (Meteor.isServer) {
  Meteor.startup(function () {});
}

Router.route('/', function () {
  this.render('Home', {
    data: function () { return Items.findOne({_id: this.params._id}); }
  });
});

Router.route('/one');

