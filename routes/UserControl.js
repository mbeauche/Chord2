var db = require("./Database");

exports.home = function(req, res){

	if(req.session.user == null){

		res.redirect('/login');
		return;

	}

	var user = req.session.user;
	//if(req.params.id != req.session.user.username){ res.redirect("home"); } //Security, not finished.
	//Load timers and all that shit via Jquery
	
	res.render('home', { title: 'Welcome', name: user.username})
};


//Login and register page - A static page that is lame. I think it sucks...
exports.login = function(req, res){

	if(req.session.user != null){

		res.redirect('/user/'+ req.session.user.username);
		return;

	}

  res.render('loginregister', { title: 'Fine Arts Center Room Reservation Service.', name: 'Not Logged In' })
};

exports.logout = function(req, res){
        
	if(req.session.user == null){

		res.redirect('/login');
		return;

	}

    var use = req.session.user.username;
    
    req.session.destroy();

    res.render('logout', {title: 'Logout', name: use})

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
		//res.render('loginregister', { title: message, name: "Not Logged In" });
		//return;
	}
	//console.log("from inside usercontrol, " + message);
	//renderLogin(req,res, message);
	//res.render('loginregister', { title: "Error", name: "Not Logged In" })
};


