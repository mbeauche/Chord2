exports.home = function(req, res){
	var user = req.session.user.username;
  res.render('search', { name: user, title: 'Search for Rooms' } );
}
