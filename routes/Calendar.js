var db = require("./Database");


exports.home = function(req, res){
  //var enddate = req.enddate === null ? '2012-12-31' : req.enddate;
  //var startdate = req.startdate === null ? '2012-12-01' : req.startdate;
  //var results = db.findReservations(req.username, req.start_date, req.enddate);
  //var results = ['One event', 'Two event', 'Three Event']
  //console.log(results);
  res.render('calendar', {title: "Use this form to add data to the DB!", name: "ADMIN VIEW"} );
}


exports.add = function(req, res){

	var uname = req.body.username;
	var rname = req.body.roomname;
	var stime = req.body.starttime;
	var etime = req.body.endtime;
	var sdate = req.body.startdate;
	var edate = req.body.enddate;
	var inswap = req.body.inswap;
	var swapnote = req.body.swapnote;

	db.addReservation(req, res, uname, rname, stime, etime, sdate, edate, inswap, swapnote);
}

