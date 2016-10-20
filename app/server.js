'use strict';

const analysis = require('./analysis');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use('/uwa', express.static('./app/web'));
app.use(bodyParser.json());
app.enable('trust proxy');


app.post('/uwa', (req, res) => {
  let myreq = [];
  let totalAnalysis = 0;
  let myresult = [];
  for (let i in req.body.urls) {
    totalAnalysis += 1;
    myreq.push({
      target: req.body.urls[i],
      isText: false,
      extract: req.body.checked
    });
  }

  if (req.body.text.length != 0) {
    totalAnalysis += 1;
    myreq.push({
      target: req.body.text,
      isText: true,
      extract: req.body.checked
    });
  }
  // console.log(myreq);
  for (let i in myreq) {
    analysis(myreq[i], (err, result) => {
      myresult.push(result);
      // console.log(myresult);
      if (err != null) {
        return res.status(400).send(err.toString());
      } else {
        if (myresult.length == totalAnalysis) {
          return res.status(200).send(JSON.stringify(myresult));
        }
      }
    });
  }
});


app.listen(8001);
