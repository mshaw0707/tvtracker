var app = require('express')();
var hbs = require('express-handlebars');

app.set('port', process.env.PORT || 3000);

app.engine('.hbs', hbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function(req, res) {
  res.render('home');
})

app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function() {
    console.log('Express server started on port ' + app.get('port'));
});
