import { Component, OnInit } from '@angular/core';
import { UserDTO, UserService } from '../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: UserDTO[] = [];
  searchFormGroup!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: ['', Validators.required]
    });
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: users => this.users = users,
      error: err => console.error('Failed to load users', err)
    });
  }

  handleSearchUsers() {
    if (this.searchFormGroup.invalid) {
      this.loadUsers(); // fallback load all users if empty or invalid search
      return;
    }
    const keyword = this.searchFormGroup.get('keyword')?.value.trim();
    if (!keyword) {
      this.loadUsers();
      return;
    }
    this.userService.searchUsers(keyword).subscribe({
      next: users => this.users = users,
      error: err => {
        alert('Failed to search users');
        console.error(err);
      }
    });
  }

  toggleEnabled(user: UserDTO) {
    const newStatus = !user.enabled;
    this.userService.toggleUserEnabled(user.id, newStatus).subscribe({
      next: updatedUser => user.enabled = updatedUser.enabled,
      error: err => {
        alert('Error updating user status');
        console.error(err);
      }
    });
  }

  deleteUser(user: UserDTO) {
    if (!confirm(`Are you sure you want to delete user "${user.username}"?`)) return;
    this.userService.deleteUser(user.id!).subscribe({
      next: res => {
        alert(res.message);
        this.users = this.users.filter(u => u.id !== user.id);
      },
      error: err => {
        alert('Error deleting user');
        console.error(err);
      }
    });
  }
}
