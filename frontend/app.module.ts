import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpRequest} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MyFormComponent} from './my-form/my-form.component';
import {ResultComponent} from './result/result.component';
import {ResultListComponent} from './result/result-list/result-list.component';
import {ErrorMessageComponent} from './result/error-message/error-message.component';
import {DetailComponent} from './detail/detail.component';
import {FormsModule} from '@angular/forms';
import {ProductComponent} from './detail/product/product.component';
import {PhotoComponent} from './detail/photo/photo.component';
import {ShippingComponent} from './detail/shipping/shipping.component';
import {SellerComponent} from './detail/seller/seller.component';
import {SimilarComponent} from './detail/similar/similar.component';
import {HttpRequestService} from './httpRequest.service';
import {Route, RouterModule, Routes} from '@angular/router';
import {NavComponent} from './detail/nav/nav.component';
import {DataPassingService} from './dataPassing.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {RoundProgressModule, ROUND_PROGRESS_DEFAULTS} from 'angular-svg-round-progressbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {WishListComponent} from './wish-list/wish-list.component';
import {FacebookModule} from 'ngx-facebook';

const appRoutes: Routes = [
  {path: 'result', component: ResultComponent, data: {animation: 'ResultPage'}},
  {
    path: 'detail', component: DetailComponent, children: [
      {path: 'product', component: ProductComponent},
      {path: 'photo', component: PhotoComponent},
      {path: 'shipping', component: ShippingComponent},
      {path: 'seller', component: SellerComponent},
      {path: 'similar', component: SimilarComponent}
    ], data: {animation: 'DetailPage'},
  },
  {path: 'wishlist', component: WishListComponent, data: {animation: 'WishListPage'}},
];


@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    ResultComponent,
    ResultListComponent,
    ErrorMessageComponent,
    DetailComponent,
    ProductComponent,
    PhotoComponent,
    ShippingComponent,
    SellerComponent,
    SimilarComponent,
    NavComponent,
    WishListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    RoundProgressModule,
    MatTooltipModule,
    FacebookModule.forRoot(),
  ],
  providers: [HttpRequestService, DataPassingService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
