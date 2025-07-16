import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  backendHost:String="http://localhost:8085";
  constructor(private http: HttpClient) { }

  getCustomerAccountCounts(): Observable<{[key: string]: number}> {
    return this.http.get<{[key: string]: number}>(`${this.backendHost}/customers/account-counts`);
  }
}
