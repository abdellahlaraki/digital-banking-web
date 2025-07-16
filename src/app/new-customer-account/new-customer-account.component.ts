import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Customer} from '../model/customer.model';
import {AccountsService} from '../services/accounts.service';

@Component({
  selector: 'app-new-customer-account',
    imports: [
        AsyncPipe,
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './new-customer-account.component.html',
  styleUrl: './new-customer-account.component.css'
})
export class NewCustomerAccountComponent implements OnInit{
  newBankAccountFormGroup!:FormGroup;
  customerId!: number;
  constructor(private fb:FormBuilder,private route: ActivatedRoute,private accountService:AccountsService,private router:Router) {

  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.newBankAccountFormGroup=this.fb.group({
      accountType:this.fb.control(null),
      balance:this.fb.control(0),
      overDraft:this.fb.control(0),
      interestRate:this.fb.control(0)
    })
  }


  handleSaveCustomerBankAccount() {
    let bankAccount=this.newBankAccountFormGroup.value;
    let customerId=this.customerId;
    let accountType=this.newBankAccountFormGroup.value.accountType;
    let balance=this.newBankAccountFormGroup.value.balance;
    let  overDraft=this.newBankAccountFormGroup.value.overDraft;
    let  interestRate=this.newBankAccountFormGroup.value.interestRate;
    if(accountType=='current'){
     this.accountService.saveCurrentAccount(customerId,balance,overDraft).subscribe({
       next:(data)=>{
         alert("Saving Account Created succesfully");
         this.router.navigateByUrl("/admin/customer-accounts/"+customerId);
       },
       error:(err)=>{
         console.log(err);
       }
     });
   }else if(accountType=='saving'){
     this.accountService.saveSavingAccount(customerId,balance,interestRate).subscribe({
       next:(data)=>{
         alert("Current Account Created succesfully");
         this.router.navigateByUrl("/admin/customer-accounts/"+customerId);
       },
       error:(err)=>{
         console.log(err);
       }
     });
   }
  }
}
