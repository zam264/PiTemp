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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


let sql = `SELECT FirstName firstName,
                  LastName lastName,
                  Email email
            FROM customers
            WHERE Country = ?
            ORDER BY FirstName`;

app.get("/url/:country", (req, res, next) => {
    db.each(sql, req.params.country, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            var data = {
                firstName: row.firstName,
                lastName: row.lastName,
                email: row.email
            }
            o[key].push(data)
        });
    res.json(o)
});



// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });