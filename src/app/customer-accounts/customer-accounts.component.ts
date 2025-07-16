import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Customer } from '../model/customer.model';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { customerAccount } from '../model/customerAccount';
import { AccountsService } from '../services/accounts.service';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerAccounts!: any;  // <-- must be array
  customerId!: number;
  customer!: Customer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountsService,
    public authService:AuthService
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.getCustomerAccounts();
  }

  getCustomerAccounts() {
    if (this.customerId) {
      this.accountService.getCustomerAccounts(this.customerId).subscribe({
        next: (data) => {
          this.customerAccounts = data;   // assign data array here
          console.log(data);
        },
        error: (err) => {
          console.error('Error fetching customer accounts:', err);
        }
      });
    }
  }
}
