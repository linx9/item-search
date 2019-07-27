import { Component, OnInit } from '@angular/core';
import {DataPassingService} from '../../dataPassing.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  curDetail;
  constructor(private dataPassingService: DataPassingService) { }

  ngOnInit() {

  }

  getPhotos() {
    return this.dataPassingService.googlePhotoArray;
  }
}
