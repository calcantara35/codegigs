const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// database connection
const db = require('./config/database');

// Test db
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log(err.message));

// init express
const app = express();

// express handlebars middleware | defaultLayout is main template name, see file structure
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// set static folder, public folder -> for linking css/static files /css/style.css, no need for public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Index');
});

// Gig routes
app.use('/gigs', require('./routes/gigs'));

//port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
