import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-edit-user',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  allRoles: string[] = ['USER', 'ADMIN']; // Or load dynamically if needed

  userForm!: FormGroup;
  userId!: number;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUser();

  }
  loadUser() {
    this.userService.getUserById(this.userId).subscribe({
      next: user => {
        this.userForm = this.fb.group({
          username: [user.username, Validators.required],
          enabled: [user.enabled],
          roles: [user.roles]
        });
      },
      error: err => console.error('User not found', err)
    });
  }
  onSubmit() {
    if (this.userForm.invalid) return;

    this.userService.updateUser(this.userId, this.userForm.value).subscribe({
      next: () => {
        alert('User updated successfully');
        this.router.navigate(['/admin/users']);
      },
      error: err => {
        alert('Failed to update user');
        console.error(err);
      }
    });
  }
}
