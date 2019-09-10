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

// Add a gig
router.get('/add', (req, res) => {
  const data = {
    title: 'looking for a Simple Wordpress Website',
    technologies: 'wordpress, php, html, css',
    budget: '$2,000',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus est nihil eligendi dolores sint laboriosam quia modi eum. Reiciendis fuga placeat repellendus est voluptatibus amet iste, temporibus vel repudiandae ab',
    contact_email: 'user2@gmail.com'
  };

  // destructuring
  let { title, technologies, budget, description, contact_email } = data;

  // INsert into table
  Gig.create({
    title,
    technologies,
    description,
    budget,
    contact_email
  })
    .then(gig => res.redirect('/gigs'))
    .catch(err => console.log(err.message));
});

module.exports = router;
