var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var helmet = require('helmet');

module.exports = function() {
    //Instância do Express
    var app = express();

    //Porta da aplicação	
    //app.set('port', 3000);
    app.set('port', process.env.PORT || 3000);

    //Middleware
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    //Definir Engine para a View
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //OAuth
    app.use(cookieParser());
    app.use(session(
        {   secret: 'homem avestruz',
            resave: true,
            saveUninitialized: true
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(helmet());
    app.disable('x-powered-by');
    app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());

    //Carregar pastas
    //load('models', { cwd: 'app' }).then('controllers').then('routes').into(app);
    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes/auth.js')
        .then('routes')
        .into(app);

        app.get('*', function(req, res) {
            res.status(404).render('404');
});

    return app;
};