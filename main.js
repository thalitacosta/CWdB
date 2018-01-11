// load express
var express = require('express');
var favicon = require('serve-favicon')
var path = require('path')
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');

var app = express();
// Or you can simply use a connection uri
const sequelize = new Sequelize('d1kh27c8o2l0fs', 'otnvrlqgbycpkc', 'de77ec57a12623f410456b9f049e71c974c15a81197ceef08067e777ddbe8bcf', {
    host: 'ec2-107-21-224-61.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',

    dialectOptions: {
        ssl: true
      },

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});


const Sample = sequelize.define('sample', {
    data: {
      type: Sequelize.DATEONLY
    },
    latitude: {
      type: Sequelize.FLOAT
    },
    longitude: {
        type: Sequelize.FLOAT
      },
    amplitude: {
        type: Sequelize.FLOAT
    }
});  

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

      // force: true will drop the table if it already exists
    Sample.sync({force: false}).then(() => {
        // Table created
        Sample.create({
            data: '2018-01-07',
            latitude: -25.45,
            longitude: -49.26,
            amplitude: 70.8
        });

        Sample.create({
            data: '2018-01-07',
            latitude: -25.45,
            longitude: -49.28,
            amplitude: 85.7
        });

        Sample.create({
            data: '2018-01-07',
            latitude: -25.45,
            longitude: -49.29,
            amplitude: 80.1
        });
  }); 
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

app.get('*', (req, res) => {
    if (req.accepts('html')) {
        // Respond with html page.
        res.render('404');
    }
    else if (req.accepts('json')) {
        // Respond with json.
        res.status(404).send({ error: 'Not found' });
    }
    else {
        // Default to plain-text. send()
        res.status(404).type('txt').send('Not found');
    }
});