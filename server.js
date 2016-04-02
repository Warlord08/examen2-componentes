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

apiRouter.route('/herbs')
	.post((req, res) => {
		let herb = new Herb();

		herb.name = req.body.name;
		herb.use = req.body.use;
		herb.aspect	= req.body.aspect;
		herb.image = req.body.image;
		herb.extGrade = req.body.extGrade; 
		herb.county = req.body.county;
		herb.district = req.body.district;
		herb.geo = req.body.geo;

		herb.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Herb added!' });
		});
	})

	.get((req, res) => {
		Herb.find((err, herbs) => {
			if (err) res.send(err);
			res.json(herbs);
		});
	});

apiRouter.route('/herb/:id_herb')
	
	.put((req, res) => {
		Herb.findById(req.params.id_herb, (err, herb) => {
			console.log(req.body.use);
			if (err) res.send(err);
			// update info
			herb.name = req.body.name;
			herb.use = req.body.use;
			herb.aspect	= req.body.aspect;
			herb.image = req.body.image;
			herb.extGrade = req.body.extGrade; 
			herb.county = req.body.county;
			herb.district = req.body.district;
			herb.geo = req.body.geo;
			// save beer
			herb.save(err => {
				if (err) res.send(err);
				res.json({ message: 'Herb updated!' });
			});
		});
	})

	.delete((req, res) => {
		Herb.remove({ _id: req.params.id_herb}, (err, herb) => {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted!'});
		});
	});

apiRouter.route('/herb/county/:county')
	.get((req, res) => {
		Herb.find({ county: req.params.county}, (err, herb) => {
			if (err) res.send(err);
			res.json(herb);
		})
	});

apiRouter.route('/herb/district/:district')
	.get((req, res) => {
		Herb.find({ district: req.params.district}, (err, herb) => {
			if (err) res.send(err);
			res.json(herb);
		})
	});

// register our routes
// all routes will be prefixed with /api
app.use('/api', apiRouter);

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);