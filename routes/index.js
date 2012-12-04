var db = require("./Database"); //Database functions and schema

var Calendar = require("./Calendar"); //Calendar functions. oh my!
var Search = require("./Search"); //Room Search Functions.
var UserControl = require("./UserControl") //login, logout functions


//Index
exports.index = function(req, res){
  res.render('index', { title: 'Chord' });
};

/*

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

*/

//Chord-relevant functions
exports.calendar = Calendar.home;
exports.add = Calendar.add;
exports.search = Search.home;

//User Home
exports.user = UserControl.home;

//Login/register pages and functions
exports.logout = UserControl.logout;
exports.login = UserControl.login;
exports.register = UserControl.login;
exports.validatelogin = UserControl.validatelogin;
exports.validateregister = UserControl.validateregister;
