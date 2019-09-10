const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// main gigs route, since we did /gigs in index.js, we can use /
// get gig list
router.get('/', (req, res) => {
  Gig.findAll()
    .then(gigs => {
      res.render('gigs', {
        gigs: gigs
      });
    })
    .catch(err => console.log(err.message));
});

// display add gig form
router.get('/add', (req, res) => {
  res.render('add');
});

// Add a gig
router.post('/add', (req, res) => {
  // destructuring, pulling from request body (the form in add.handlebars) | name attribute must match
  // using let because we have to reassign budget and technologies, normally use const
  let { title, technologies, budget, description, contact_email } = req.body;

  // errors array for error checking
  let errors = [];

  // validate fields
  if (!title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!technologies) {
    errors.push({ text: 'Please add a some technologies' });
  }
  if (!description) {
    errors.push({ text: 'Please add a description' });
  }
  if (!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  //   check for erros
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',');
    // Insert into table
    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => console.log(err.message));
  }
});

module.exports = router;
