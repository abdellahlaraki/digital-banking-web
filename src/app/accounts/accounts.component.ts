import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AccountsService} from '../services/accounts.service';
import {catchError, EMPTY, Observable} from 'rxjs';
import {AccountDetails} from '../model/account.model';
import {AsyncPipe, CommonModule, DecimalPipe, JsonPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-accounts',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    DecimalPipe,
    NgForOf,
    NgClass,
    JsonPipe
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accountFormGroup!:FormGroup;
  currentPage:number=0;
  pageSize:number=5;
  accountObservable!:Observable<AccountDetails>;
  operationFormGroup!:FormGroup;
  errorMessage!:string;
  constructor(private fb:FormBuilder,private accountService:AccountsService,public authService:AuthService) {
  }
  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
      accountId:this.fb.control(""),
    })
    this.operationFormGroup=this.fb.group({
      operationType:this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(null),
      accountDestination:this.fb.control(null)
    })
  }

  handleSearchAccount() {
    let accountId: string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err?.message ?? 'Unknown error';
        return EMPTY;
      })
    );
  }

  goToPage(page:number) {
    this.currentPage=page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId=this.accountFormGroup.value.accountId;
    let operationType=this.operationFormGroup.value.operationType;
    let amount:number=this.operationFormGroup.value.amount;
    let description:string=this.operationFormGroup.value.description;
    let accountDestination:string=this.operationFormGroup.value.accountDestination;
    if (operationType=="DEBIT"){
      this.accountService.debit(accountId,amount,description).subscribe({
        next:(data)=>{
          alert("success debit");
          this.handleSearchAccount();
      },
        error:(err)=>{
          console.log(err);
          this.handleSearchAccount();
        }
      })
    }else if (operationType=="CREDIT"){
      this.accountService.credit(accountId,amount,description).subscribe({
        next:(data)=>{
          alert("success credit");
          this.handleSearchAccount();
        },
        error:(err)=>{
          console.log(err);
          this.handleSearchAccount();
        }
      })
    }else if(operationType=="TRANSFER"){
      this.accountService.transfer(accountId,accountDestination,amount,description).subscribe({
        next:(data)=>{
          alert("success transfer");
          this.handleSearchAccount();
        },
        error:(err)=>{
          console.log(err);
          this.handleSearchAccount();
        }
      })
    }
    this.operationFormGroup.reset();
  }
}
