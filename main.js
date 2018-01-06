// load express
var express = require('express');
var favicon = require('serve-favicon')
var path = require('path')
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');

var app = express();
// Or you can simply use a connection uri
const sequelize = new Sequelize('postgres://fxvjezhycyjywd:26fbcc9253c7f339ea27e5d63f8eb7d9ef75abbed2b43fc9b87c28399dc6162d@ec2-54-235-244-185.compute-1.amazonaws.com:5432/d6t9cd4kn7qvof');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(favicon(__dirname + '/public/favicon.ico'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// set resources dirs
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/static/css'));
app.use(express.static(__dirname + '/static/js'));

// to support JSON-encoded bodies
app.use(bodyParser.json());       

// index page (whenever we enter without a second URL)
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/tabelas', (req, res) => {
    res.render('tabelas');
});

app.get('/sobre', (req, res) => {
    res.render('sobre');
});

// start server, using either the heroku given port or the 3000, for local debugging
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + listener.address().port);
});

//API
app.post('/testPassword', function(req, res){
    if(req.body.password == 'Iamerror' || req.body.password == 'Irlanda')
        res.json({ ok: 1 });
    else
        res.json({ ok: 0 });
});