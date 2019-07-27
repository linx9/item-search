import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataPassingService} from '../dataPassing.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  barDisplay;

  constructor(private dataPassingService: DataPassingService) {
  }

  ngOnInit() {
    this.dataPassingService = this.dataPassingService.curResult;
    this.barDisplay = this.dataPassingService.barDisplay;
  }

  onNoResult() {
    if (this.dataPassingService.curResult || this.dataPassingService.curResult.hasOwnProperty('noResult')) {
      return true;
    }
  }

  /*showBar() {
  /!*  console.log('触发showBar');
    console.log(this.barDisplay);*!/
    if (this.barDisplay) {
      return false;
    } else {
      return true;
    }
    /!*return this.dataPassingService.barDisplay;*!/
  }*/
}
