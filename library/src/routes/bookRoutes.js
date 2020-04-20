const express = require('express');
// Creates an Express router const called bookRouter
const bookRouter = express.Router();
// MSSQL Connection
const sql = require('mssql');
const debug = require('debug')('app: bookRoutes');

function router(nav) {

    // Express will use the bookRouter route to get /books and displays the books.ejs page, make sure you copy the nav elements and add the books array in.
    bookRouter.route('/')
        .get((req, res) => {
            (async function () {
                const request = new sql.Request();
                const { recordset } = await request.query('select * from books');
                res.render('bookListView',
                    {
                        nav,
                        title: 'Library',
                        books: recordset
                    });
            }())
        });

    // When you go to books/single you get this
    bookRouter.route('/:id')
        .all((req, res, next) => {
            (async function query() {
                const { id } = req.params;
                const request = new sql.Request();
                const { recordset } = await request.input('id', sql.Int, id)
                    .query('select * from books where id = @id');
                    [req.book] = recordset;
                    next();
            }());
        })
        .get((req, res) => {
            res.render('bookView',
                {
                    nav,
                    title: 'Library',
                    book: req.book
                }
            );
        });
    return bookRouter;
}

// Exports all the modules in bookRouter to app.js    
module.exports = router;