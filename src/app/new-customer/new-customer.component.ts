import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../model/customer.model';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {routes} from '../app.routes';

@Component({
  selector: 'app-new-customer',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{
  newCustomerFormGroup!:FormGroup;
  constructor(private fb:FormBuilder,private customerService:CustomerService,private router:Router) {
  }
  ngOnInit(): void {
    this.newCustomerFormGroup=this.fb.group({
      name:this.fb.control("",[Validators.required,Validators.minLength(4)]),
      email:this.fb.control("",[Validators.required,Validators.email]),
    })
  }

  handleSaveCustomer() {
    let customer:Customer=this.newCustomerFormGroup.value;
    this.customerService.saveCostumers(customer).subscribe({
      next:data=>{
        alert("customer saved succesfully");
        this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/customers");
      }
    });
  }
}
