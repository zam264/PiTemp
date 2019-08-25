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

    let sql = `SELECT *
        FROM Temperature
        ORDER BY TempDateTime DESC
		LIMIT 1440`;

    // open the database
    let db = new sqlite3.Database('./db/temperature.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error(err.message);
        }
    });

	db.serialize(() => {
        db.all(sql, (err, allRows) => {
            callback(allRows);
            db.close();
        });
    });
}

app.get("/temp", async (req, res, next) => {
    getCustomersByCountry(req.params.country, (allRows) => {
        var o = {} // empty Object
        var key = 'Temperature Information';
        o[key] = []; // empty Array, which you can push() values into

        allRows.forEach(element => {

            var data = {
                tempDateTime: element.TempDateTime,
                tempF: element.TempF
            }
            o[key].push(data)
        });
        jsonStr = JSON.stringify(o[key])
        res.send(o)
    })
});