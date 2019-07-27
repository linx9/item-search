import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataPassingService} from '../../dataPassing.service';
import {FacebookService, InitParams, UIParams, UIResponse} from 'ngx-facebook';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
              private dataPassingService: DataPassingService,
              private fb: FacebookService) {
    const initParams: InitParams = {
      appId: '399984304100099',
      xfbml: true,
      version: 'v3.2'
    };

    fb.init(initParams);
  }

  share(url: string) {
    const params: UIParams = {
      href: this.dataPassingService.curDetail.ViewItemURLForNaturalSearch,
      method: 'share',
      quote: `Buy ${this.dataPassingService.curDetail.Title} at $${this.dataPassingService.curDetail.CurrentPrice.Value} from link below.`
    };

    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));
  }

  ngOnInit() {
  }

  checkURL(path: string) {
    return this.router.url === path;
  }

  getTitle() {
    if (this.dataPassingService.curDetail) {
      console.log(this.dataPassingService.curDetail);
      return this.dataPassingService.curDetail.Title;
    }
  }

  checkInsideWishList() {
    if (this.dataPassingService.curDetail) {
      console.log('测试ID');
      console.log(this.dataPassingService.curDetail.ItemID);
      console.log(this.dataPassingService.curDetail.Title);
      console.log(localStorage.getItem(this.dataPassingService.curDetail.ItemID) !== null);
      return (localStorage.getItem(this.dataPassingService.curDetail.ItemID) !== null);
    }
  }

  addToWishList() {
    if (this.dataPassingService.curDetail) {
      const key = this.dataPassingService.curDetail.ItemID;
      const value = JSON.stringify(this.dataPassingService.curResult[this.dataPassingService.itemIndexClicked]);
      localStorage.setItem(key, value);
    }
  }

  removeFromWishList() {
    if (this.dataPassingService.curDetail) {
      localStorage.removeItem(this.dataPassingService.curDetail.ItemID);
    }
  }

  /*onDebug(){
    console.log(this.dataPassingService.curDetail.ViewItemURLForNaturalSearch);
  }*/
  checkPrePage() {
    return this.dataPassingService.preLinkFrom === 'wishlist' ? '/wishlist' : '/result';
  }
}
