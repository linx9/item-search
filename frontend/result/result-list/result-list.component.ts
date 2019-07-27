import {Component, OnInit} from '@angular/core';
import {DataPassingService} from '../../dataPassing.service';
import {HttpRequestService} from '../../httpRequest.service';
import {response} from 'express';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {
  resultObj;
  resultKeys;
  p = 1;

  constructor(private dataPassingService: DataPassingService,
              private httpRequestService: HttpRequestService) {
    this.dataPassingService.passResult.subscribe(
      (result: any) => {
        this.resultObj = result;
        // update the service data
        if (this.resultObj.hasOwnProperty('item')) {
          this.resultObj = this.resultObj.item;
          this.dataPassingService.curResult = this.resultObj;
          this.resultKeys = Object.keys(this.resultObj);
        } else {
          this.dataPassingService.curResult = {noResult: 'noResult'}; // .....quick hack
        }
      }
    );
  }

  ngOnInit() {
    this.resultObj = this.dataPassingService.curResult;
    if (this.resultObj) {
      this.resultKeys = Object.keys(this.resultObj);
    }
  }

  onClickItem(index) {
    // set progress bar
    this.dataPassingService.barDisplay = true;
    this.dataPassingService.preLinkFrom = 'results';
    this.dataPassingService.itemIndexClicked = index;
    // request
    this.httpRequestService.getDetail(this.resultObj[index].itemId).subscribe(
      (detailResponse) => {
        this.dataPassingService.setCurDetail(detailResponse);
        this.dataPassingService.setShipping(index);
        this.dataPassingService.setSeller();
        this.dataPassingService.barDisplay = false;
      }
    );

    this.httpRequestService.getPhotos(this.resultObj[index].title).subscribe(
      (photoResponse) => {
        this.dataPassingService.setPhotoObj(photoResponse);
      }
    );

    this.httpRequestService.getSimilar(this.resultObj[index].itemId).subscribe(
      (similarResponse) => {
        this.dataPassingService.setSimilar(similarResponse);
      }
    );

    // set result list high light
    this.dataPassingService.resultListHighLightId = this.resultObj[index].itemId;
    /*console.log('result list high light id');
    console.log(this.dataPassingService.resultListHighLightId);*/
  }

  myTruncate(originalTitle: string) {
    if (originalTitle.length > 35) {
      if (originalTitle.charAt(34) === ' ') {
        return originalTitle.substring(0, 34) + '...';
      } else {
        // look for the next space
        let spaceIndex;
        for (spaceIndex = 35; spaceIndex < originalTitle.length; spaceIndex++) {
          if (originalTitle.charAt(spaceIndex) === ' ') {
            return originalTitle.substring(0, spaceIndex) + '...';
          }
        }
      }
    }
    return originalTitle;
  }

  addToWishList(itemObj) {
    localStorage.setItem(itemObj.itemId, JSON.stringify(itemObj));
  }

  checkWishList(itemId) {
    return localStorage.getItem(itemId) !== null;
  }

  removeFromWishList(itemId) {
    localStorage.removeItem(itemId);
  }

  checkResultListHighLight(itemId) {
    if (this.dataPassingService.resultListHighLightId) {
      return itemId === this.dataPassingService.resultListHighLightId;
    }
  }

  checkDetailButtonDisabled() {
    return this.dataPassingService.resultListHighLightId === undefined ? true : false;
  }

  getShipping(itemObj: any) {
    if (itemObj.hasOwnProperty('shippingInfo')) {
      itemObj = itemObj.shippingInfo;
      if (itemObj.length > 0) {
        itemObj = itemObj[0];
        if (itemObj.hasOwnProperty('shippingServiceCost')) {
          itemObj = itemObj.shippingServiceCost;
          if (itemObj.length > 0) {
            itemObj = itemObj[0];
            if (itemObj.hasOwnProperty('__value__')) {
              itemObj = itemObj.__value__;
              return itemObj === '0.0' ? 'Free Shipping' : '$' + itemObj;
            }
          }
        }
      }
    }
    // ['shippingInfo'][0].shippingServiceCost[0].__value__
    return 'N/A';
  }

  showBar() {
    return this.dataPassingService.barDisplay;
  }

  getPostCode(index: any) {
    if (this.resultObj.length > index) {
      let zipcode = this.resultObj[index];
      if (zipcode.hasOwnProperty('postalCode')) {
        zipcode = zipcode.postalCode;
        if (zipcode.length > 0) {
          zipcode = zipcode[0];
          return zipcode;
        }
      }
    }
    return 'N/A';
    /*resultObj[key]['postalCode'][0]*/
  }

  onNoResult() {
    /*console.log('测试');
    console.log(this.dataPassingService.curResult);*/
    if (this.dataPassingService.curResult === undefined || this.dataPassingService.curResult === null
      || this.dataPassingService.curResult.hasOwnProperty('noResult')) {
      return true;
    }
    return false;
  }
}
