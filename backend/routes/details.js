// ebay detail api
const express = require('express');
const request = require('request');
const app = express();
const router = express.Router();

router.use((req, res, next) => {
  const URL = `http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=XiqiLin-homework-PRD-0a6d4ee47-6fd0274e&siteid=0&version=967&ItemID=${req.query.itemId}&IncludeSelector=Description,Details,ItemSpecifics`;
  request(URL, (error, response) => {
    req.resultObj = JSON.parse(response.body).Item;
    next();
  });
});

router.get('/', function (req, res) {
  /*console.log(req.originalUrl);
  console.log(req.query);*/
  res.send(req.resultObj);
});

module.exports = router;
