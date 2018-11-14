// IMPORTS
// ============================================================================
const express = require('express');
const spdy = require('spdy');
const pjson = require('./package.json');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const fs = require('fs');
const port = process.env.PORT || 3000;
const debug = require('debug')('kodebase');


// SERVER
// ============================================================================
const app = express();

// CONFIG
// ============================================================================
     // In which directory are views located
app.set('view engine', 'ejs');       // Which view engine to use
app.set('views', 'views');
app.use(express.static('./public')); // Where are static files located


app.use(bodyParser.json());          // Accept JSON objects in requests
// Accept extended form elements in requests
app.use(bodyParser.urlencoded({
	'extended': true
}));

// Setup session handling
app.use(session({
	'resave': false,
	'saveUninitialized': true,
	'secret': 'really secret stuffs'
}));


app.use(logger('dev'));						// Setup console logging of route events

// Setup database connection
const db = mysql.createPool({
	'connectionLimit': 10,
	'host': process.env.DB_HOST,
	'user': process.env.DB_USER,
	'password': process.env.DB_PSWD,
	'database': process.env.DB_DTBS
});

// ROUTES
// ============================================================================

app.get('/choose', (req, res) => {
	res.render('choose', { 'title': 'Signup / Login', 'content': res });
	db.query('SELECT * FROM user.user');
});

app.get('/signup', (req, res) => {
	res.render('signup', {'title': 'Signup'})
});

app.get('/login', (req, res) => {
	res.render('login', {'title': 'login'})
});

app.get('/', (req, res) => { // title in browser tab
	res.render('index', { 'title': 'Forside' }); // name of file
});

app.get('/cd/:id', (req, res) => {
	db.query('SELECT navn, billede, pris FROM hifi_klubben.produkter WHERE id IN (1);',function (err, results) {
	if(err) return res.send(err);
	res.render('CD'), { 'title': 'CD', 'content': res };
});
});

app.get('/Kategorier', (req, res) => {
	res.render('kategorier', { 'title': 'Kategorier', 'content': res });
});

app.get('/Kontakt', (req, res) => {
	res.render('kontakt', { 'title': 'Kontakt', 'content': res });
});

app.use((req, res) => {
	res.status(404);
	res.render('page', { 'title': '404: Not Found', 'content': error });
});

app.use((error, req, res, next) => {
	res.status(500);
	res.render('page', { 'title': '', 'content': error });
});

// SERVER INIT
// ============================================================================
app.listen(port, () => {
	debug(
		`${pjson.name} v${pjson.version} is running on https://${process.env.SITE_HOST}:${port}`
	);
	})

//db.query(`SELECT * FROM hifi_klubben.produkter;`, function (err, results) {
//if(err) res.send(err);