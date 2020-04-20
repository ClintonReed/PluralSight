const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


// Express will use morgan returns GET info in the CL
app.use(morgan('tiny'));
// Express will search public for display files
app.use(express.static(path.join(__dirname, 'public')));
// Express will check here when referencing /css
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
// Express will check here when referencing /js
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// Tells Express to look in the src/views folder to find the view for the app
app.set('views', './src/views');
// Tells Express that we are using ejs for the view engine
app.set('view engine', 'ejs');

// Calls bookRouter from other file where info is stored
const bookRouter = require('./src/routes/bookRoutes');

// Any time /books is called it will use bookRouter
app.use('/books', bookRouter);
// Express will get a req and response function that will display index.html
app.get('/', (req, res) => {
  // Express will look for a VIEW called INDEX and render (display) that, then we create an array of objects to be called in the html / ejs
  res.render('index',
    {
      nav: [{ link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }],
      title: 'Library'
    });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
