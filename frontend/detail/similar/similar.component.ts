import {Component, OnInit} from '@angular/core';
import {DataPassingService} from '../../dataPassing.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit {
  sortFactor = 'Default';
  sortOrder = 'Ascending';
  showButtonText = 'Show More';

  constructor(private dataPassingService: DataPassingService) {
  }

  ngOnInit() {
  }

  getSimilarArray() {
    if (this.sortFactor === 'Default') {
      // Default
      return this.dataPassingService.originalSimilarArray;
    } else if (this.sortFactor === 'Product Name') {
      // Product Name
      return this.dataPassingService.clonedSimilarArray.sort(
        (a, b) => {
          if (this.sortOrder === 'Ascending') {
            if (a.title < b.title) {
              return -1;
            } else if (a.title > b.title) {
              return 1;
            } else {
              return 0;
            }
          } else if (this.sortOrder === 'Descending') {
            if (a.title > b.title) {
              return -1;
            } else if (a.title < b.title) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      );
    } else if (this.sortFactor === 'Days Left') {
      // Days Left
      return this.dataPassingService.clonedSimilarArray.sort(
        (a, b) => {
          const timeA = Number(this.extractDays(a.timeLeft));
          const timeB = Number(this.extractDays(b.timeLeft));
          if (this.sortOrder === 'Ascending') {
            if (timeA < timeB) {
              return -1;
            } else if (timeA > timeB) {
              return 1;
            } else {
              return 0;
            }
          } else if (this.sortOrder === 'Descending') {
            if (timeA > timeB) {
              return -1;
            } else if (timeA < timeB) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      );
    } else if (this.sortFactor === 'Price') {
      // price
      return this.dataPassingService.clonedSimilarArray.sort(
        (a, b) => {
          const priceA = Number(a.buyItNowPrice.__value__);
          const priceB = Number(b.buyItNowPrice.__value__);
          if (this.sortOrder === 'Ascending') {
            if (priceA < priceB) {
              return -1;
            } else if (priceA > priceB) {
              return 1;
            } else {
              return 0;
            }
          } else if (this.sortOrder === 'Descending') {
            if (priceA > priceB) {
              return -1;
            } else if (priceA < priceB) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      );
    } else if (this.sortFactor === 'Shipping Cost') {
      // shipping cost
      return this.dataPassingService.clonedSimilarArray.sort(
        (a, b) => {
          const shippingCostA = Number(a.shippingCost.__value__);
          const shippingCostB = Number(b.shippingCost.__value__);
          if (this.sortOrder === 'Ascending') {
            if (shippingCostA < shippingCostB) {
              return -1;
            } else if (shippingCostA > shippingCostB) {
              return 1;
            } else {
              return 0;
            }
          } else if (this.sortOrder === 'Descending') {
            if (shippingCostA > shippingCostB) {
              return -1;
            } else if (shippingCostA < shippingCostB) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      );
    }
  }

  checkIfShowSimilar() {
    return this.dataPassingService.originalSimilarArray;
  }

  extractDays(rawDateString: string) {
    const pattern = '(?<=P)\\d+(?=D)';
    return rawDateString.match(pattern)[0];
  }

  checkDisable() {
    return this.sortFactor === 'Default';
  }

  setShowButtonText() {
    if (this.showButtonText === 'Show More') {
      this.showButtonText = 'Shore Less';
    } else if (this.showButtonText === 'Shore Less') {
      this.showButtonText = 'Show More';
    }
  }
}
