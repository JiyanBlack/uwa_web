'use strict';

const Analysis = require('./Analysis');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sample_data = JSON.parse(require('fs').readFileSync('./app/sample_analysis.json'));
app.use(express.static('./app/web'));
app.use(bodyParser.json());

app.post('*', (req, res) => {
  try {
    console.log(req.body);
    // new Analysis(req.body, (err, response) => {     if (err)
    // res.send(err.toString(), 500);     else res.send(JSON.stringify(response),
    // 200);     } );
    res.status(200).send(JSON.stringify(sample_data));
  } catch (e) {
    console.log(e);
    res.send(e.toString(), 500);
  }
});

app.listen(8000, () => {
  console.log('Listening at 8000...');
});
