import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataPassingService} from '../../dataPassing.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {

  constructor(private dataPassingService: DataPassingService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  getPrice() {
    return this.dataPassingService.price;
  }

  getSubtitle() {
    return this.dataPassingService.subtitle;
  }

  getLocation() {
    return this.dataPassingService.location;
  }

  getReturnPolicy() {
    return this.dataPassingService.returnPolicy;
  }

  getItemSpecificObj() {
    return this.dataPassingService.itemSpecificObj;
  }

  getPictureArray() {
    return this.dataPassingService.pictureArray;
  }
}
