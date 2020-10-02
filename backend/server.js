const express = require("express");
const bodyParser = require("body-parser")
const db = require("./db");

const app = express();

app.use(bodyParser.json());

app.get('/api/values', (req, res) => {
  db.pool.query('select * from lists;', (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.json(results);
  })
})

app.post('/api/value', (req, res, next) => {
  db.pool.query(`insert into lists (value) values("${req.body.value}");`, (err, results, fields) => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.json({success: true, value: req.body.value})
  })
})

app.listen(3000, () => {
  console.log("application is running on 3000 port")
})