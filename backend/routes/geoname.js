const express = require('express');
const request = require('request');
const app = express();
const router = express.Router();

let resultObj;

router.use((req, res, next) => {
  let curZipCode = req.query.zipCodeText;
  let URL = `http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=${curZipCode}&username=lxqlinxiqi&country=US&maxRows=5`;
  request(URL, (error, response, body) => {
    resultObj = JSON.parse(response.body).postalCodes;
    // call back chaining
    next();
  });
});

router.get('/', function (req, res) {
  res.send(resultObj);
});

module.exports = router;
