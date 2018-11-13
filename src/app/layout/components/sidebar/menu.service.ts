import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient) { }

  public listMenu(): Observable<any> {
    return this.httpClient.get('/dxp-ui/menu');
  }
}
