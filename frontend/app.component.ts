import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from './httpRequest.service';
import {RouterOutlet} from '@angular/router';
import {slidingAnimation} from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    slidingAnimation
  ]
})
export class AppComponent implements OnInit {
  title = 'homework8';

  constructor(private httpRequestService: HttpRequestService) {
  }

  onLoad() {
    this.httpRequestService.getIpAPI().subscribe(
      (response) => console.log(response)
    );
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit(): void {

  }

}
