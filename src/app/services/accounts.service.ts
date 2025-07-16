import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDetails} from '../model/account.model';
import {customerAccount} from '../model/customerAccount';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  backendHost:String="http://localhost:8085"
  constructor(private http:HttpClient) { }

  public getAccount(accountId:string,page:number,size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(this.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  public debit(accountId:string,amount:number,description:string){
    let data={
      accountId:accountId,
      amount:amount,
      description:description
    }
    return this.http.post(this.backendHost+"/accounts/debit",data);
  }
  public credit(accountId:string,amount:number,description:string){
    let data={
      accountId:accountId,
      amount:amount,
      description:description
    }
    return this.http.post(this.backendHost+"/accounts/credit",data);
  }
  public transfer(accountSource:string,accountDestination:string,amount:number,description:string){
    let data={
      accountSource,
      accountDestination,
      amount,
      description
    }
    return this.http.post(this.backendHost+"/accounts/transfer",data);
  }

  public getCustomerAccounts(customerId:number):Observable<customerAccount>{
    return this.http.get<customerAccount>(this.backendHost+"/accounts/customer/"+customerId);
  }

  saveCurrentAccount(customerId: number, balance: any, overDraft: any) {
    let data={
      balance,overDraft
    }
    console.log('****Current Account****')
    console.log(data);
    return this.http.post(this.backendHost+"/accounts/customer/"+customerId+"/current",data);
  }

  saveSavingAccount(customerId: number, balance: any, interestRate: any) {
    let data={
      balance,interestRate,
    }
    return this.http.post(this.backendHost+"/accounts/customer/"+customerId+"/saving",data);
  }
}
