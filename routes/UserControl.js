var db = require("./Database");

exports.home = function(req, res){

	if(req.session.user == null){

		res.redirect('/login');
		return;

	}

	var user = req.session.user;
	
	res.render('home', { title: 'Welcome', name: user.username})
};


exports.login = function(req, res){

	if(req.session.user != null){

		res.redirect('/user/'+ req.session.user.username);
		return;

	}

  res.render('loginregister', { title: 'Fine Arts Center Room Reservation Service', name: 'Not Logged In' })
};

exports.logout = function(req, res){
        
	if(req.session.user == null){

		res.redirect('/login');
		return;

	}

    var use = req.session.user.username;
    
    req.session.destroy();

    res.redirect('/login');
};

//post page for checking log in information
exports.validatelogin = function(req, res){
	var uname = req.body.usname;
	var pword = req.body.password3;
	if(uname != null && pword != null){
		console.log("Attempting to validate user.");
		db.validateUser(uname,pword, function(user){
			if(user !== null){ console.log(user.username);
				req.session.user = user;
				res.redirect('/user/'+user.username);
			}
			else { res.render('loginregister', { title: "Invalid login. Please try again.", name: "Not Loged In" }); }
		});
	}
};

//Post page for checking registration information
exports.validateregister = function(req, res){
	var uname = req.body.name;
	var pword = req.body.password1; 
	var fullname = req.body.fullname;
	var major = req.body.major;

	if(uname != null && pword != null){
		message = db.newUser(req, res, uname, pword, fullname, major);
	}
	
};


