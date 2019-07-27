// similar router
const express = require('express');
const request = require('request');
const app = express();
const router = express.Router();

router.use((req, res, next) => {
  let URL = `http://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=XiqiLin-homework-PRD-0a6d4ee47-6fd0274e&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemId=${req.query.itemId}&maxResults=20`;
  request(URL, (error, response, body) => {
    res.similarObj = JSON.parse(response.body).getSimilarItemsResponse.itemRecommendations.item;
    // call back chaining
    next();
  });
});

router.get('/', function (req, res) {
  res.send(res.similarObj);
});

module.exports = router;
