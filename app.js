const express = require('express')
const sqlite3 = require('sqlite3').verbose();

let app = express();


var o = {} // empty Object
var key = 'Orientation Sensor';
o[key] = []; // empty Array, which you can push() values into

// open the database
let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READ, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chinook database.');
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(80, () => {
    console.log("Server running on port 80");
});


let sql = `SELECT FirstName firstName,
                  LastName lastName,
                  Email email
            FROM customers
            WHERE Country = ?
            ORDER BY FirstName`;

app.get("/url/:country", (req, res, next) => {
    // db.each(sql, req.params.country, (err, row) => {
    //         if (err) {
    //             console.error(err.message);
    //         }
    //         var data = {
    //             firstName: row.firstName,
    //             lastName: row.lastName,
    //             email: row.email
    //         }
    //         o[key].push(data)
    //     });
    // res.json(o)
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"])
});



// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });