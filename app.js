const express = require('express')
const sqlite3 = require('sqlite3').verbose();

let app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(80, () => {
    console.log("Server running on port 80");
});

let getCustomersByCountry = (country, callback) => {

    let sql = `SELECT FirstName,
        LastName,
        Email
        FROM customers
        WHERE Country = ?
        ORDER BY FirstName`;

    // open the database
    let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the chinook database.');
    });

    db.serialize(() => {
        db.all(sql, country, (err, allRows) => {
            callback(allRows);
            db.close();
        });
    });
}

app.get("/url/:country", async (req, res, next) => {
    getCustomersByCountry(req.params.country, (allRows) => {
        console.log("in callback");

        var o = {} // empty Object
        var key = 'Customer Information';
        o[key] = []; // empty Array, which you can push() values into

        allRows.forEach(element => {

            var data = {
                firstName: element.FirstName,
                lastName: element.LastName,
                email: element.Email
            }
            console.log(data)
            o[key].push(data)
        });
        jsonStr = JSON.stringify(o[key])
        console.log(jsonStr)
        res.send(o)
    })
});