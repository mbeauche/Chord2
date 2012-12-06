exports.home = function(req, res){

if(req.session.user == null){

		res.redirect('/login');
		return;

	}

	var user = req.session.user.username;
  res.render('search', { name: user, title: 'Search for Rooms' } );
	
}
