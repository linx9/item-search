import {EventEmitter, Injectable} from '@angular/core';
import {element} from 'protractor';

@Injectable()
export class DataPassingService {
  // data object
  curDetail;
  curResult;
  itemIndexClicked;
  barDisplay = false;
  DetailButtonShowObj;
  // route
  preLinkFrom;
  // product tab
  subtitle = '';
  price = '';
  location = '';
  returnPolicy = '';
  itemSpecificObj;
  pictureArray;
  // photo tab
  googlePhotoArray: string[] = [];
  // shipping tab
  shippingCostString: string;
  shipToLocationString: string;
  handlingTimeString: string;
  expeditedShippingString: string;
  oneDayShippingAvailableString: string;
  returnsAcceptedString: string;
  // seller tag
  feedbackScoreString: string;
  feedbackScoreNumber: number;
  positiveFeedbackPercentString: string;
  feedbackRatingStarString: string;
  topRatedSellerString: string;
  storeNameString: string;
  storeURLString: string;
  starColor: string;
  // similar
  originalSimilarArray;
  clonedSimilarArray;
  // highlight
  resultListHighLightId;
  wishListHighLightId;
  // legacy
  passResult = new EventEmitter<object>();

  /*passDetail = new EventEmitter<object>();*/

  setCurDetail(detail) {
    this.curDetail = detail;
    /*console.log(this.curDetail);*/

    // subtitile
    if (this.curDetail.hasOwnProperty('Subtitle')) {
      this.subtitle = this.curDetail.Subtitle;
    }

    // price
    if (this.curDetail.hasOwnProperty('CurrentPrice')) {
      this.price = this.curDetail.CurrentPrice.Value;
    }

    // location
    if (this.curDetail.hasOwnProperty('Location')) {
      this.location = this.curDetail.Location;
    }
    // return accept
    if (this.curDetail.hasOwnProperty('ReturnsAccepted')) {
      this.returnPolicy = this.curDetail.ReturnPolicy.ReturnsAccepted + ' ';
    }
    // return policy
    if (this.curDetail.hasOwnProperty('ReturnsWithin')) {
      if (this.returnPolicy === 'Returns Accepted ') {
        this.returnPolicy += 'WithIn';
      }
      this.returnPolicy += this.curDetail.ReturnPolicy.ReturnsWithin;
    }

    // item specific
    if (this.curDetail.hasOwnProperty('ItemSpecifics')) {
      this.itemSpecificObj = this.curDetail.ItemSpecifics;
      if (this.itemSpecificObj.hasOwnProperty('NameValueList')) {
        this.itemSpecificObj = this.itemSpecificObj.NameValueList;
      }
    }

    // picture
    if (this.curDetail.hasOwnProperty('PictureURL') && this.curDetail.PictureURL.length > 0) {
      this.pictureArray = this.curDetail.PictureURL;
      /*console.log(this.pictureArray);*/
    }

  }

  setPhotoObj(rawPhotoData: any) {
    this.googlePhotoArray = [];
    for (const ele of rawPhotoData) {
      this.googlePhotoArray.push(ele.link);
    }
  }

  // set shipping field which could be use in the shipping tab
  setShipping(index: any) {
    /*console.log('set shipping: index element');
    console.log(this.curResult[index]);*/
    // set shipping cost
    this.shippingCostString = this.curResult[index].shippingInfo[0].shippingServiceCost[0].__value__;
    // convert to free shipping
    if (this.shippingCostString === '0.0') {
      this.shippingCostString = 'Free Shipping';
    }
    // set Shipping Locations
    this.shipToLocationString = this.curResult[index].shippingInfo[0].shipToLocations[0];
    // set Handling time
    this.handlingTimeString = this.curResult[index].shippingInfo[0].handlingTime[0] + ' Days';
    // set Expedited Shipping
    this.expeditedShippingString = this.curResult[index].shippingInfo[0].expeditedShipping[0];
    // set One Day Shipping
    this.oneDayShippingAvailableString = this.curResult[index].shippingInfo[0].oneDayShippingAvailable[0];
    // set Return Accepted
    this.returnsAcceptedString = this.curResult[index].returnsAccepted[0];
  }

  setShippingFromDetail(itemId: string) {
    const value = JSON.parse(localStorage.getItem(itemId));
    this.shippingCostString = value.shippingInfo[0].shippingServiceCost[0].__value__;
    // convert to free shipping
    if (this.shippingCostString === '0.0') {
      this.shippingCostString = 'Free Shipping';
    }
    // set Shipping Locations
    this.shipToLocationString = value.shippingInfo[0].shipToLocations[0];
    // set Handling time
    this.handlingTimeString = value.shippingInfo[0].handlingTime[0] + ' Days';
    // set Expedited Shipping
    this.expeditedShippingString = value.shippingInfo[0].expeditedShipping[0];
    // set One Day Shipping
    this.oneDayShippingAvailableString = value.shippingInfo[0].oneDayShippingAvailable[0];
    // set Return Accepted
    this.returnsAcceptedString = value.returnsAccepted[0];
  }

  setSeller() {
    // set Feedback Score
    this.feedbackScoreString = this.curDetail.Seller.FeedbackScore;
    this.feedbackScoreNumber = Number(this.feedbackScoreString);
    this.positiveFeedbackPercentString = this.curDetail.Seller.PositiveFeedbackPercent;
    this.feedbackRatingStarString = this.curDetail.Seller.FeedbackRatingStar;
    this.topRatedSellerString = this.curDetail.Seller.TopRatedSeller;

    if (this.curDetail.hasOwnProperty('Storefront')) {
      this.storeNameString = this.curDetail.Storefront.StoreName;
      this.storeURLString = this.curDetail.Storefront.StoreURL;
    }

    // set color
    if (this.feedbackRatingStarString.includes('Yellow')) {
      this.starColor = 'yellow';
    } else if (this.feedbackRatingStarString.includes('Blue')) {
      this.starColor = 'blue';
    } else if (this.feedbackRatingStarString.includes('Turquoise')) {
      this.starColor = 'turquoise';
    } else if (this.feedbackRatingStarString.includes('Purple')) {
      this.starColor = 'purple';
    } else if (this.feedbackRatingStarString.includes('Red')) {
      this.starColor = 'red';
    } else if (this.feedbackRatingStarString.includes('Green')) {
      this.starColor = 'green';
    } else if (this.feedbackRatingStarString.includes('Silver ')) {
      this.starColor = 'silver';
    }
  }

  setSimilar(rawSimlarData) {
    this.originalSimilarArray = rawSimlarData;
    this.clonedSimilarArray = rawSimlarData;
  }
}
