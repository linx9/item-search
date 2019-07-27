import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpRequestService} from '../httpRequest.service';
import {DataPassingService} from '../dataPassing.service';
import {response} from 'express';

@Component({
  selector: 'app-form',
  templateUrl: './my-form.html'
})

export class MyFormComponent implements OnInit {
  @ViewChild('f') myForm: NgForm;
  @ViewChild('keywordInput') myKeywordInput: NgModel;
  fromRadios = 'current';
  keyword;
  category = 'all-categories';
  resultParams = {
    category: 'all-categories',
    distance: '',
    freeShipping: false,
    fromRadios: '',
    keyword: '',
    localPickup: false,
    new: false,
    unspecified: false,
    used: false,
    zipCodeText: '',
    curZipCode: ''
  };
  result;
  ipAPIObj;
  // set the default radio box checked
  // dummy data
  options: string[] = [];
  zipcodeObj;
  zipTextRequire = false;

  constructor(private router: Router,
              private httpRequestService: HttpRequestService,
              private dataPassingService: DataPassingService) {
  }

  onSubmit() {
    this.router.navigate(['/result']);
    this.resultParams.used = this.myForm.value.used;
    this.resultParams.new = this.myForm.value.new;
    this.resultParams.unspecified = this.myForm.value.unspecified;
    this.resultParams.localPickup = this.myForm.value.localPickup;
    this.resultParams.freeShipping = this.myForm.value.freeShipping;
    this.resultParams.fromRadios = this.myForm.value.fromRadios;
    this.resultParams.keyword = this.myForm.value.keyword;
    this.resultParams.distance = this.myForm.value.distance;
    this.resultParams.category = this.myForm.value.category;
    this.resultParams.curZipCode = this.ipAPIObj.zip;

    // set bar displayed
    this.dataPassingService.barDisplay = true;

    /*console.log(this.resultParams);*/

    this.httpRequestService.getResult(this.resultParams).subscribe(
      (response) => {
        this.result = response;
        console.log('测试response');
        console.log(response);
        // this.resultToArray(this.result);
        this.dataPassingService.passResult.emit(this.result);
        this.dataPassingService.barDisplay = false;
      }
    );
  }

  onReset() {
    this.myForm.reset({
      category: 'all-categories',
      fromRadios: 'current',
      distance: '',
      freeShipping: false,
      keyword: '',
      localPickup: false,
      new: false,
      unspecified: false,
      used: false,
      zipCodeText: '',
      curZipCode: ''
    });

    /*console.log(this.resultParams);*/
  }

  checkZipCodeDisable() {
    return (this.myForm.value.fromRadios === 'current');
  }

  onOtherClick() {
    this.zipTextRequire = true;
  }

  onInput() {
    this.httpRequestService.getZipCode(this.resultParams.zipCodeText).subscribe(
      (response) => {
        this.zipcodeObj = response;
      }
    );
    /*console.log(this.zipcodeObj);*/
    // clear the option array first
    // set the array
    if (this.zipcodeObj !== undefined) {
      this.options = [];
      for (let element of this.zipcodeObj) {
        element = element.postalCode;
        this.options.push(element);
      }
    }
  }

  ngOnInit(): void {
    this.httpRequestService.getIpAPI().subscribe(
      (response) => this.ipAPIObj = response
    );
  }

  onCurrentClick() {
    this.zipTextRequire = false;
    this.resultParams.zipCodeText = '';
  }

  onDebug(keywordInput: NgForm) {
    console.log(keywordInput);
    console.log(this.router.url);
  }

  checkURLIsWishList() {
    return this.router.url === '/wishlist';
  }
}
