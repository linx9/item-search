import {Component, OnInit} from '@angular/core';
import {DataPassingService} from '../dataPassing.service';
import {HttpRequestService} from '../httpRequest.service';


@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  myLocalStorageArray = [];

  constructor(private dataPassingService: DataPassingService,
              private httpRequestService: HttpRequestService) {
  }

  ngOnInit() {
    for (let i = 0; i < localStorage.length; i++) {
      const curValueObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
      this.myLocalStorageArray.push(curValueObj);
    }
    console.log(this.myLocalStorageArray);
  }

  getCurImage(index) {
    return this.myLocalStorageArray[index].galleryURL[0];
  }

  getCurTitle(index) {
    return this.myLocalStorageArray[index].title[0];
  }

  getCurPrice(index) {
    return this.myLocalStorageArray[index].sellingStatus[0].currentPrice[0].__value__;
  }

  getCurShipping(index) {
    const value = this.myLocalStorageArray[index].shippingInfo[0].shippingServiceCost[0].__value__;
    return value === '0.0' ? 'Free Shipping' : '$' + value;
  }

  getCurSeller(index) {
    return this.myLocalStorageArray[index].sellerInfo[0].sellerUserName[0];
  }

  removeFromWishList(itemId: string) {
    localStorage.removeItem(itemId);
    // updata my local storage array
    this.myLocalStorageArray = [];
    for (let i = 0; i < localStorage.length; i++) {
      const curValueObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
      this.myLocalStorageArray.push(curValueObj);
    }
  }

  onClickWishListItem(index, title) {
    this.dataPassingService.wishListHighLightId = this.myLocalStorageArray[index].itemId;
    this.dataPassingService.preLinkFrom = 'wishlist';
    /*console.log('test');
    console.log(this.dataPassingService.wishListHighLightId);*/
    this.httpRequestService.getDetail(this.dataPassingService.wishListHighLightId).subscribe(
      (detailResponse) => {
        this.dataPassingService.setCurDetail(detailResponse);
        this.dataPassingService.setShippingFromDetail(this.dataPassingService.wishListHighLightId);
        this.dataPassingService.setSeller();
      }
    );

    this.httpRequestService.getPhotos(title).subscribe(
      (photoResponse) => {
        this.dataPassingService.setPhotoObj(photoResponse);
      }
    );

    this.httpRequestService.getSimilar(this.dataPassingService.wishListHighLightId).subscribe(
      (similarResponse) => {
        this.dataPassingService.setSimilar(similarResponse);
      }
    );
  }

  checkWishListHighLight(index) {
    if (this.dataPassingService.wishListHighLightId) {
      return this.myLocalStorageArray[index].itemId === this.dataPassingService.wishListHighLightId;
    }
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
    } else {
      return originalTitle;
    }
  }


  countTotalCost() {
    let sum = 0.00;
    for (const element of this.myLocalStorageArray) {
      sum += Number(element.sellingStatus[0].currentPrice[0].__value__);
    }
    return sum.toFixed(2);
  }

  noRecord() {
    return localStorage.length === 0;
  }
}
