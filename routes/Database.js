//Global Vars
var mongoose = require('mongoose') , Schema = mongoose.Schema;
//Connect to database
var db = mongoose.connect('mongodb://127.0.0.1/chord');

/*var Roomschema = new Schema({
	roomname	:String,
	roomtype	:String,
	location	:String
});*/

var Userschema = new Schema({
	username	:{ type: String, index: true, unique: true, lowercase: true },
	password	:{ type: String, required: true},
	//timers		:[Timerschema],
	major       :String,
	fullname   :String
});


var Reservationschema = new Schema({
    username  : { type: String, index: true },
    roomType  : String,
    location  : String,
    startTime : String,
    endTime   : String,
    startDate : String,
    endDate   : String,
    inSwap    : Boolean,
    swapNote  : String
});


var User = mongoose.model('Users', Userschema);
var Room = mongoose.model('Rooms', Roomschema);
var Reservation = mongoose.model('Reservations', Reservationschema);

//creates a new reservation
exports.addReservation = function(req, res, username, roomType, location, startTime, 
							endTime, startDate, endDate, inSwap, swapNote){

  var reservation = new Reservation();
  		reservation.username  = username;
  		reservation.roomType  = roomType;
  		reservation.location  = location;
  		reservation.startTime = startTime;
  		reservation.endTime   = endTime;
  		reservation.startDate = startDate;
  		reservation.endDate   = endDate;
  		reservation.inSwap    = inSwap;
  		reservation.swapNote  = swapNote;
  
  reservation.save(function(err, result){
   			if(err){
    			console.log(err);
   			}else{
   				res.render('calendar', {title: "Success eh!", name: "ADMIN VIEW"});
   			} 
  });

}

//pass in a user's Net ID and dates to find reservations
exports.findReservations = function(user, startdate, enddate, cb){

/*
  var query = Reservation.find();
  query.exec(function(err, results){
    if(err) console.log(err);
    return res.end(JSON.stringify(results));
  });
*/

  //Room.findOne({username:user});
  Reservation.findOne({username:user, startDate:startdate, endDate:enddate}).run(function(err,user){
  		cb(user);
  	});
  		//this is a call back (cb) function which runs after the query.
  

};

//pass in a user's Net ID and dates to find reservations
exports.findOpenReservations = function(cb){

  //This will find all reservations which are 
  Reservation.find({username:""}).run(function(err,results){
  		//console.log(results);

  		cb(results);
  	});
  		//this is a call back (cb) function which runs after the query.
  

};

//User Functions
exports.validateUser = function(username, password, cb){

	console.log("Logging " + username + " in.");

	User.findOne({username:username, password:password}).run(function (err, user) {
		//console.log("found " + user.username);
		cb(user);
	});
};

exports.newUser = function(req, res, username, password, fullname, major ){

var user = new User();
	user.username = username;
	user.password = password;
	user.fullname = fullname;
	user.major    = major;

	User.findOne({username:username}).run(function(err, query){
		if(query !== null){
			//we already have this username in the DB! error and try again
			res.render('loginregister', { title: "Username already in use, try again.", name: "Not Logged In" });
			
		}else{
			
	user.save(function(err, user_Saved){
		if(err){
			throw err;
			
		}else{
			res.render('loginregister', { title: "Creation successful! Please login.", name: "Not Logged In" });
		}
	});
	}
	});
}

/*
//Timer functions
exports.saveTimer = function(user,timer,cb){
	newt = new Timer();
	newt.start = timer.start;
	newt.end = timer.end;
	newt.duration = timer.duration;
	newt.comment = timer.comment;
	newt.type = timer.type;

	//Update this function, make it better!!
	//http://mongoosejs.com/docs/updating-documents.html

	User.findOne({username:user.username, password:user.password}).run(function (err, query) {
		query.timers.push(newt);
		query.save(function (err) {
			if(!err){ cb(true, query); }
			else { cb(false, null); }
		});
	});
};

exports.updateTimer = function(user,timer,cb){

	console.log("updating timer");


}

exports.deleteTimer = function(user,timer,cb){
var query;

	if(timer === null){
		console.log("woaaah doggy");
		return;

	}

	User.findOne({username:user.username, password:user.password}).run(function (err, query) {
		if(!err){
		query.timers.id(timer._id).remove();
		query.save(function (err) {
			if(!err){

				cb(true, query);
			}
			else {
				cb(false, null);
			}
		});
	}
	
	});
};
*/
