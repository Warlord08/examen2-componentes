'use strict';

let express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		dbURI = 'mongodb://localhost/test',
		port = process.env.PORT || 8080;

// connect to mongodb
mongoose.connect(dbURI);

// Models
let Location = require('./app/api/models/location');
let Herb = require('./app/api/models/herb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
// ==============================================

// get an instance of the express router
let apiRouter = express.Router();

// MIDDLEWARE to use for all requests
apiRouter.use((req, res, next) => {
	// do something before running routes
	console.log('Happening before routes...');
	next();   // don't stop here, go to next route
});

// routes 
// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

apiRouter.route('/locations')
	.post((req, res) => {
		let location = new Location();

		location.county = req.body.county;
		location.district = req.body.district;
		location.geo = req.body.geo;

		location.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Location added!' });
		});
	})

	.get((req, res) => {
		Location.find((err, locations) => {
			if (err) res.send(err);
			res.json(locations);
		});
	});

apiRouter.route('location/:location_name')
	.get((req, res) => {
		Location.findById(req.params.location_name, (err, location) => {
			if (err) res.send(err);
			res.json(location);
		});
	});

// register our routes
// all routes will be prefixed with /api
app.use('/api', apiRouter);

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);