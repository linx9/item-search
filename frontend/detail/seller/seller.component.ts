import {Component, OnInit} from '@angular/core';
import {DataPassingService} from '../../dataPassing.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {


  constructor(private dataPassingService: DataPassingService) {
  }

  ngOnInit() {
  }

  getFeedbackScore() {
    return this.dataPassingService.feedbackScoreString;
  }

  getPositiveFeedbackPercent() {
    return this.dataPassingService.positiveFeedbackPercentString;
  }

  getFeedbackRatingStar() {
    return this.dataPassingService.feedbackRatingStarString;
  }

  getTopRatedSeller() {
    return this.dataPassingService.topRatedSellerString;
  }

  getStoreName() {
    return this.dataPassingService.storeNameString;
  }

  getStoreURL() {
    return this.dataPassingService.storeURLString;
  }

  // print greater than 10000
  printStars(): string {
    if (this.dataPassingService.feedbackScoreNumber >= 10000) {
      return 'stars';
    } else {
      return 'star_border';
    }
  }

  getStarColor() {
    return {color: this.dataPassingService.starColor};
  }
}
