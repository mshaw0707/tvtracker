var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

var app = express();

var dataLayer = require('./dataLayer');

app.set('port', process.env.PORT || 3000);

var hbsHelpers = {
  helpers: {
    deleteLink: function(show) {
      return "<a class='btn btn-danger btn-xs' href='/deleteShow?id=" + show.id + "'>X</a>";
     }
  }
};

app.engine('.hbs', hbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.locals.allshows = dataLayer.shows.all();
  res.render('home', hbsHelpers);
});

app.get('/settings', function(req, res) {
  console.log(dataLayer.shows.all());
  res.render('settings');
});

app.post('/addShow', function (req, res) {
  dataLayer.shows.add(req.body);
  res.redirect('/');
});

app.get('/deleteShow', function (req, res) {
  dataLayer.shows.delete(req.query.id);
  res.redirect('/');
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
