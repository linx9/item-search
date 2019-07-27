// google search api
const express = require('express');
const request = require('request');
const app = express();
const router = express.Router();

router.use((req, res, next) => {
  let URL = `https://www.googleapis.com/customsearch/v1?q=${req.query.title}&cx=015276949663118899310:rsuethrdury&imgSize=huge&num=8&searchType=image&key=AIzaSyDrpSPMz8QZdzusazw4jggLvcCcLN4GMlo`;
  request(URL, (error, response, body) => {
    res.rawPhotosObj = JSON.parse(response.body).items;
    // call back chaining
    next();
  });
});

router.get('/', function (req, res) {
  res.send(res.rawPhotosObj);
});

module.exports = router;
