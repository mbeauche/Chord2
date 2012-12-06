var db = require("./Database");

//Timer manipulation functions
exports.createTimer = function(req, res){ //Called by Javascript
	var user = req.session.user; //User is logged in.
	var timer = req.body.timer; //Be sure to pass timer objects for easy expandability
	db.saveTimer(user, timer, function(success, newuser){
		if(success){
			req.session.user = newuser; //Update user session key.
			res.send("1");
		} else {
			res.send("0");
		}
	});
};
exports.deleteTimer = function(req, res){
console.log("Just reserved ");
	if(req.body.timer == null){
		res.send("0");
		return;
	}

	var user = req.session.user; //User is logged in.
	var timer = req.body.timer; //Be sure to pass timer objects for easy expandability

	console.log("Just reserved " + timer.roomtype); 
	res.send("1");//have to send a resposne!

	/*db.deleteTimer(user, timer, function(success, newuser){
		if(success){
			req.session.user = newuser; //Update user session key.
			res.send("1");
		} else {
			res.send("0");
		}
	}); //Timer object, as usual.*/
};

/*exports.updateTimer = function(req,res){

	var user = req.session.user; //User is logged in.
	var timer = req.body.timer; //Be sure to pass timer objects for easy expandability
	db.updateTimer(user, timer, function(success, newuser){
		if(success){
			req.session.user = newuser; //Update user session key.
			res.send("1");
		} else {
			res.send("0");
		}
	}); //Timer object, as usual.

}*/

//Create Timer form, for timer creation
exports.createTimerForm = function(req, res){

	var reserve = req.body.data;

	console.log("just got here " + reserve.roomtype);

	res.render('createTimerForm', { layout: false, type: reserve.roomtype, location: reserve.location, startdate: reserve.startDate, enddate: reserve.endDate,
									starttime: reserve.startTime, endtime: reserve.endTime  });
};

exports.getUserTimers = function(req, res){ //Returs JSON of users timers

	//check if user is logged in first
	if(req.session.user != null){

		//var user = req.session.user;
		db.findOpenReservations( function(reservations){
			//console.log(reservations);
			//console.log(reservations);

			//req.session.user = newuser; //Pulls reservations from DB.
			res.json(reservations);
		});
	}
};