const express = require('express')
const server = express()

// create connection//
const mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sakila'
})

// connect to database
con.connect((error)=> {
    if(!error) {
    console.log( 'Database is connected..')
    } else {
        console.log('Error', error)
    }
})

//root route
server.get('/', (req, res)=> {
    res.json({
        'All countries':'http://localhost:3000/api/country', 'Single country':'http://localhost:3000/api/country/:id', 'All Films':'http://localhost:3000/api/film', 'Filter Films By Rating':"http://localhost:3000/api/film?rating=('G','PG','PG-13','R','NC-17')", 'All Actors': 'http://localhost:3000/api/actor'
    })
})

//all route
server.get('/api/film', (req, res)=> {
    //do stuff
    //run query on connection
    con.query(
        // two arguments (SQL Query, callback function)
        'SELECT * FROM film;',
        (error, rows) => {
            if(!error) {
                if(rows.length == 1) {
                    res.json(...row);
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

server.get('/api/actor', (req, res)=> {
    //do stuff
    //run query on connection
    con.query(
        // two arguments (SQL Query, callback function)
        'SELECT * FROM actor;',
        (error, rows) => {
            if(!error) {
                if(rows.length == 1) {
                    res.json(...row);
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})


//server.get('/api/country', (req, res)=> {
    //do stuff
    //run query on connection
  //  con.query(
        // two arguments (SQL Query, callback function)
    //    'SELECT * FROM country;',
      //  (error, rows) => {
        //    if(!error) {
          //      if(rows.length == 1) {
            //        res.json(...row);
              //  } else {
                //    res.json(rows)
                //}
           // } else {
             //   console.log('Error', error)
           // }
       // }
   // )
//})

server.get('/api/film', (req, res)=> {
    //do stuff
    let rating = req.query.rating
    let sql;

    if(rating) {
        rating = rating.split(',').map(r => `'${r}'`).join(',')
        sql = `SELECT * FROM film WHERE rating IN (${rating})`
    } else {
        sql = 'SELECT * FROM film'
    }

    con.query(
        sql,
        (error, rows) => {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
                } else {
                    console.log('Error', error)
                }
            }
        )
    })

//single route
server.get('/aqi/country/:id', (req, res)=> {
    const id = req.params.id

    con.query(
        `SELECT * FROM country WHERE country_id = ${id}`,
        (error, rows) => {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    console.log('Error', error)
                }
            }
        }
    )
})

//listen
server.listen(3000, ()=> console.log ('Port 3000'))