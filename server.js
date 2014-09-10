var mongo = require('./mongo');
var express = require('express');
var session = require('express-session');
var url = require('url');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport')
var GoogleStrategy = require('passport-google').Strategy;
var port = process.env.PORT || 3000;

app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(session({
  secret: "bob the builder"
}));
app.use(passport.initialize())
app.use(passport.session())
//serve static files in client when referred to in html
app.use(express.static(__dirname + '/client'));

//configure passport-google authentication
passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
    var user = JSON.stringify({ id: identifier })
    var err = null;
    done(err, user);
  }
));

//code for serializing and de-serizalizing the user
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//redirects user to google for authentication
app.get('/auth/google', passport.authenticate('google'));

//recieves the identifier from google
app.get('/auth', passport.authenticate('google', {
  successRedirect: '/#/',
  failureRedirect: '/#/' }))

// add new collection endpoint
// responds with null if collection can't be added
app.post('/api/collection/create', function(req, res) {
  mongo.create(req.body).then(function(collection) {
    res.statusCode = 201;
    res.end(JSON.stringify(collection));
  });
});

// update collection endpoint
// responds with the updated collection
app.post('/api/collection/update', function(req, res) {
  mongo.update(req.body).then(function(collection) {
    res.end(JSON.stringify(collection));
  });
});

// add a link to collection
app.post('/api/collection/addlink', function(req, res) {
  mongo.addLink(req.body).then(function(collection) {
    res.end(JSON.stringify(collection));
  });
});

// add a star to a collection
// this will check if the given user has already stared the collection
// and if not, add the user to userStars and increment stars.
// responds with the collection, updated or not
app.post('/api/collection/addStar', function(req, res) {
  mongo.addStar(req.body).then(function(collection) {
    res.end(JSON.stringify(collection));
  });
});

// retrieve a collection by url
app.get('/api/collection/:url', function(req, res) {
  mongo.findByUrl(req.params.url).then(function(collection) {
    res.end(JSON.stringify(collection));
  });
});

// retrieve the meta data for all of a users collections
app.get('/api/user/', function(req, res) {
  var user = req.user;
  mongo.getUserCollections(user).then(function(collections) {
    res.end(JSON.stringify(collections));
  });
});

// retrieve the meta data for all collections
app.get('/api/all', function(req, res) {
  mongo.getAllCollections().then(function(collections) {
    res.end(JSON.stringify(collections));
  });
});

// route all other requests to the main page
app.use(function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

// start the server
app.listen(port, function() {
  console.log('listening on', port);
});

module.exports = app;
