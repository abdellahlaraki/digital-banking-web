import {Component, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import {CustomerService} from '../services/customer.service';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Customer} from '../model/customer.model';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-customers',
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink

  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent  implements OnInit{

  customers!:Observable<Array<Customer>>;
  errorMessage!:string;
  searchFormGroup!:FormGroup;
  constructor(private customerService:CustomerService,private fb:FormBuilder,public authService:AuthService,private router:Router) {
  }
  ngOnInit() {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    })
    this.handleSearchCostumers();
   /* this.customers=this.customerService.getCostumers().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );*/
  }

  handleSearchCostumers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCostumers(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(c:Customer) {
    let conf=confirm("Are you sure?");
    if(conf){
      this.customerService.deleteCostumer(c.id).subscribe({
        next:(resp)=>{
          this.customers=this.customers.pipe(
            map(data=>{
              let index=data.indexOf(c);
              data.slice(index,1);
              return data;
            })
          )
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }

  }

  handleCustomerAccounts(c: Customer) {
    this.router.navigateByUrl("/admin/customer-accounts/"+c.id,{state:c})
  }
}
