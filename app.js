var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

var app = express();

app.set('port', process.env.PORT || 3000);

app.engine('.hbs', hbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.locals.showTests = app.get('env') !== 'production' &&
                         req.query.test === '1';
  next();
});

app.get('/', function(req, res) {
  res.render('home');
});

app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express server started on port ' + app.get('port'));
});
