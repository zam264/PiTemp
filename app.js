const express = require('express')
const sqlite3 = require('sqlite3').verbose();

let app = express();


var o = {} // empty Object
var key = 'Orientation Sensor';
o[key] = []; // empty Array, which you can push() values into



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

let getCustomersByCountry = (callback) => {
    // open the database
    let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the chinook database.');
    });

    db.serialize( () => {
        db.all(`SELECT * FROM customers LIMIT 5`, (err, allRows) => {
            if(err != null){
                console.log(err);
                callback(err);
            }
            
            // console.log(util.inspect(allRows));
            // console.log(allRows);
            console.log("in getCUstomersByContry");
            
            callback(allRows);
            // callback("done");
            db.close();
        });
    });
}

// let greeting = (name) => {
//     console.log('in call back ' + name);
//     return "yup"
//   }

app.get("/url", async (req, res, next) => {
    // res.json(getCustomersByCountry(greeting))
    
    getCustomersByCountry( (allRows) => {
        console.log("in callback");
        console.log(allRows);
        res.json("[yup]")
    })
    // res.json("done")
});
// app.get("/url/:country", async (req, res, next) => {
    
// });



// db.each(sql, req.params.country,  (err, row) => {
//     if (err) {
//         console.error(err.message);
//     }
//     var data = {
//         firstName: row.firstName,
//         lastName: row.lastName,
//         email: row.email
//     }
//     o[key].push(data)
// });
// await res.json(o)


// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// }); 