var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');



module.exports = function () {
	var Usuario = mongoose.model('Usuario');

	passport.use(
		new GitHubStrategy(
			{
				clientID: '2b084102a5a131895d03',
				clientSecret: 'b86b8c8a840de0653b7b74cb27db838cbb718b15',
				callbackURL:
					'https://dswa5-14-ac-pt3008479.herokuapp.com/auth/github/callback',
			},
			function (accessToken, refreshToken, profile, done) {
				Usuario.findOrCreate(
					{ login: profile.username },
					{ nome: profile.username },
					function (erro, usuario) {
						if (erro) {
							console.log(erro);
							return done(erro);
						}
						return done(null, usuario);
					}
				);
			}
		)
	);

	passport.serializeUser(function (usuario, done) {
		done(null, usuario._id);
	});

	passport.deserializeUser(function (id, done) {
		Usuario.findById(id)
			.exec()
			.then(function (usuario) {
				done(null, usuario);
			});
	});
};
