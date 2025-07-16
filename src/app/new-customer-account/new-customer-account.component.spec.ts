import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerAccountComponent } from './new-customer-account.component';

describe('NewCustomerAccountComponent', () => {
  let component: NewCustomerAccountComponent;
  let fixture: ComponentFixture<NewCustomerAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCustomerAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCustomerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
