var db = require("./Database"); //Database functions and schema

var UserControl = require("./UserControl"); //Login and register functions and related functions
var TimerControl = require("./TimerControl"); //Functions for timer management


//Index
exports.index = function(req, res){
  res.render('index', { title: 'MoodTimer' });
};

exports.help = function(req, res){

  var n;

  if(req.session.user != null){
    n = req.session.user.username;
  }else{
    n = 'Not Logged In';
  }

  res.render('help', { title: 'Help', name: n });
};

exports.about = function(req, res){

  var n;

  if(req.session.user != null){
    n = req.session.user.username;
  }else{
    n = 'Not Logged In';
  }

  res.render('about', { title: 'About Us', name: n});
};

//User Home
exports.user = UserControl.home;

//Timer Management Routes
exports.updateTimer = TimerControl.updateTimer;
exports.createTimer = TimerControl.createTimer;
exports.deleteTimer = TimerControl.deleteTimer;
exports.createTimerForm = TimerControl.createTimerForm;
exports.getUserTimers = TimerControl.getUserTimers;

//Login/register pages and functions
exports.logout = UserControl.logout;
exports.login = UserControl.login;
exports.register = UserControl.login;
exports.validatelogin = UserControl.validatelogin;
exports.validateregister = UserControl.validateregister;
