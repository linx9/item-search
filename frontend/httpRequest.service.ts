import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class HttpRequestService {
  private ipURL = 'http://ip-api.com/json';
  /*private similarEndPoint = 'http://localhost:8081/similar';
  private resultEndPoint = 'http://localhost:8081/result';
  private geonameEndPoint = 'http://localhost:8081/geoname';
  private detailEndpoint = 'http://localhost:8081/detail';
  private photoEndPoint = 'http://localhost:8081/photos';
*/

  private similarEndPoint = '/similar';
  private resultEndPoint = '/result';
  private geonameEndPoint = '/geoname';
  private detailEndpoint = '/detail';
  private photoEndPoint = '/photos';

  constructor(private http: HttpClient) {
  }

  getIpAPI() {
    return this.http.get(this.ipURL);
  }

  getResult(inputParams) {
    return this.http.get(this.resultEndPoint, {
      params: inputParams
    });
  }

  getZipCode(inputZipText) {
    // the HttpParams cannot be initiate outsied the option object literal - why?
    // because ajax? the outside code will be finished before the ajax run, so the params is always empty
    return this.http.get(this.geonameEndPoint, {
      params: new HttpParams().set('zipCodeText', inputZipText)
    });
  }

  getDetail(itemId) {
    return this.http.get(this.detailEndpoint, {
      params: new HttpParams().set('itemId', itemId)
    });
  }

  getPhotos(title) {
    return this.http.get(this.photoEndPoint, {
      params: new HttpParams().set('title', title)
    });
  }

  getSimilar(itemId) {
    return this.http.get(this.similarEndPoint, {
      params: new HttpParams().set('itemId', itemId)
    });
  }
}
