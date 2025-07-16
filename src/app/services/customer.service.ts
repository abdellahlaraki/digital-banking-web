import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  backendHost:String="http://localhost:8085"
  constructor(private http:HttpClient) { }

  public getCostumers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backendHost+"/customers");
  }
  public searchCostumers(keyword:String):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backendHost+"/customers/search?keyword="+keyword);
  }
  public saveCostumers(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(this.backendHost+"/customers",customer);
  }
  public deleteCostumer(id:number):Observable<any>{
    return this.http.delete(this.backendHost+"/customers/"+id);
  }
}
