const express = require('express');
const request = require('request');
const app = express();
const router = express.Router();
const URL_PREFIX = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced'
  + '&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=XiqiLin-homework-PRD-0a6d4ee47-6fd0274e&RESPONSE-DATA-FORMAT=JSON'
  + '&REST-PAYLOAD&paginationInput.entriesPerPage=50&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo';
let resultJsonObj;

router.use((req, res, next) => {
  // keyword
  let URL = URL_PREFIX + `&keywords=${req.query.keyword}`;
  // zip code
  if (req.query.fromRadios === "current") {
    URL += `&buyerPostalCode=${req.query.curZipCode}`;
  } else if (req.query.fromRadios === "other") {
    URL += `&buyerPostalCode=${req.query.zipCodeText}`;
  }

  // deal with category
  if (req.query.category !== 'all-categories' && req.query.category !== undefined) {
    URL += `&categoryId=${req.query.category}`;
  }

  // hide duplicate
  URL += '&itemFilter(0).name=HideDuplicateItems&itemFilter(0).value=true';

  // count the total query params
  let counter = 1;

  // max distance
  if (req.query.distance !== '' && req.query.distance !== undefined) {
    URL += `&itemFilter(${counter}).name=MaxDistance&itemFilter(${counter}).value=${req.query.distance}`;
    counter++;
  } else {
    URL += `&itemFilter(${counter}).name=MaxDistance&itemFilter(${counter}).value=10`;
    counter++;
  }

  // free shipping
  if (req.query.freeShipping === 'true') {
    URL += `&itemFilter(${counter}).name=FreeShippingOnly&itemFilter(${counter}).value=true`;
    counter++;
  }
  
  // local pick up
  if (req.query.localPickup === 'true') {
    URL += `&itemFilter(${counter}).name=LocalPickupOnly&itemFilter(${counter}).value=true`;
    counter++;
  }

  // condition
  if (req.query.new === 'true' || req.query.used === 'true' || req.query.unspecified === 'true') {
    let conditionCounter = 0;
    if (req.query.new === 'true') {
      URL += `&itemFilter(${counter}).name=Condition&itemFilter(${counter}).value(${conditionCounter++})=New`;
    }
    if (req.query.used === 'true') {
      URL += `&itemFilter(${counter}).value(${conditionCounter++})=Used`;
    }
    if (req.query.unspecified === 'true') {
      URL += `&itemFilter(${counter}).value(${conditionCounter++})=Unspecified`;
    }
  }

  request(URL, function (error, response, body) {
    /*resultJsonObj = JSON.parse(response.body).findItemsAdvancedResponse[0].searchResult;*/
    resultJsonObj = JSON.parse(response.body).findItemsAdvancedResponse[0];
    console.log(URL);
   /* console.log('----');
    console.log(resultJsonObj);
    console.log('----');*/
    next();
  });
});

router.get('/', function (req, res) {
  /*console.log(req.query);*/
  let noRecordFlag = true;
  if (resultJsonObj.hasOwnProperty('searchResult')) {
    resultJsonObj = resultJsonObj.searchResult;
    if (resultJsonObj.length > 0) {
      resultJsonObj = resultJsonObj[0];
      noRecordFlag = false;
      console.log(req.query);
      res.send(resultJsonObj);
      /*if (resultJsonObj.hasOwnProperty('item')) {
        resultJsonObj = resultJsonObj.item;
        noRecordFlag = false;
        res.send(resultJsonObj);
      }*/
    }
  }
  if (noRecordFlag) {
    res.send({noResult: 'noResult'});
  }
});

module.exports = router;
