import { Component, OnInit } from '@angular/core';
import {DataPassingService} from '../../dataPassing.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  constructor(private dataPassingService: DataPassingService) { }

  ngOnInit() {
  }

  getShippingCost() {
    return this.dataPassingService.shippingCostString;
  }

  getReturnsAccepted() {
    return this.dataPassingService.returnsAcceptedString;
  }

  getOneDayShippingAvailable() {
    return this.dataPassingService.oneDayShippingAvailableString;
  }

  getExpeditedShipping() {
    return this.dataPassingService.expeditedShippingString;
  }

  getHandlingTime() {
    return this.dataPassingService.handlingTimeString;
  }

  getShipToLocation() {
    return this.dataPassingService.shippingCostString;
  }
}
