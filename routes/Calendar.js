var db = require("./Database");
exports.home = function(req, res){
  var enddate = req.enddate === null ? '2012-12-31' : req.enddate;
  var startdate = req.startdate === null ? '2012-12-01' : req.startdate;
  var results = db.findReservations(req.username, req.start_date, req.enddate);
  //var results = ['One event', 'Two event', 'Three Event']
  console.log(results);
  res.render('calendar', {title: 'Calendar', name: 'Amanda', events: results} );
}
exports.add = function(req, res){
  db.addReservation('acadwell', 'vocal', '15:00', '2012-12-10', false, '');
  res.render('index', {title: 'Success!', name: 'Amanda', events: {}});
}
