const express = require('express');
// Creates an Express router const called bookRouter
const bookRouter = express.Router();

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



// Express will use the bookRouter route to get /books and displays the books.ejs page, make sure you copy the nav elements and add the books array in.
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
bookRouter.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        res.render('book',
            {
                nav: [{ link: '/books', title: 'Books' },
                { link: '/authors', title: 'Authors' }],
                title: 'Library',
                book: books[id]
            }
        );
    });

// Exports all the modules in bookRouter to app.js    
module.exports = bookRouter;