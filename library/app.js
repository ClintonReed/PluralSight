const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Creates an Express router const called bookRouter
const bookRouter = express.Router();


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


// Books Array - hard coded
const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Niolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'War and Peace 2',
    genre: 'Historical Fiction',
    author: 'Lev Niolayevich Tolstoy II',
    read: false
  },
  {
    title: 'Les Miserables 2',
    genre: 'Historical Fiction',
    author: 'Victor Hugo II',
    read: false
  },
  {
    title: 'War and Peace 3',
    genre: 'Historical Fiction',
    author: 'Lev Niolayevich Tolstoy III',
    read: false
  },
  {
    title: 'Les Miserables 3',
    genre: 'Historical Fiction',
    author: 'Victor Hugo III',
    read: false
  }
]



// Express will use the bookRouter route to get /books and displays the books.ejs page, make sure you copy the nav elements.
bookRouter.route('/')
  .get((req, res) => {
    res.render('books',
      {
        nav: [{ link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }],
        title: 'Library',
        books
      });
  });

// When you go to books/single you get this
bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello single book');
  });

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
