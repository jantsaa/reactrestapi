const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
//app.use(express.static(path.join(__dirname, 'client', 'build')));

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db'
});


db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("MYSQL Connected...");
});

/*===========================================================================================================
                                                SELECT
=============================================================================================================*/
app.get("/haku", (req, res) => {
    let sql = "SELECT * FROM registration";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});
/*===========================================================================================================
                                                INSERT
=============================================================================================================*/
app.post("/lisays", (req, res) => {
    const obj = {
        id: req.body.id,
        first: req.body.first,
        last: req.body.last,
        age: req.body.age
    }
    let sql = `INSERT INTO registration(id, first, last, age) VALUES(${obj.id}, '${obj.first}', '${obj.last}', ${obj.age});`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send({message: "Tiedot lisätty. Päivitä sivu."});
    });
});

/*===========================================================================================================
                                                UPDATE
=============================================================================================================*/
app.put("/muokkaus", (req, res) => {
    const obj = {
        id: req.body.id,
        first: req.body.first,
        last: req.body.last,
        age: req.body.age
    }
    let sql = `UPDATE registration SET first ='${obj.first}', last = '${obj.last}', age = ${obj.age} WHERE id = ${obj.id}`;
    
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send({message: "Tiedot muutettu. Päivitä sivu."});
    });
});

/*===========================================================================================================
                                                DELETE
=============================================================================================================*/
app.delete("/poisto/:id", (req, res) => {
    id = req.params.id;
    let sql = `DELETE FROM registration WHERE id = ${id};`;
    
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send({message: "Tiedot poistettu."});
    });
});

/*app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build'));
});*/

app.listen("5000", () => {
    console.log("Server started on port 3000");
});