import {Component, OnInit} from '@angular/core';
import {UserDTO, UserService} from '../services/user.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users: UserDTO[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: users => this.users = users,
      error: err => console.error('Failed to load users', err)
    });
  }
  toggleEnabled(user: UserDTO) {
    const newStatus = !user.enabled;

    this.userService.toggleUserEnabled(user.id, newStatus).subscribe({
      next: updatedUser => {
        user.enabled = updatedUser.enabled; // update UI instantly
      },
      error: err => {
        console.error('Failed to update user status', err);
        alert('Error updating user status');
      }
    });
  }

  deleteUser(user: UserDTO) {
    if (!confirm(`Are you sure you want to delete user "${user.username}"?`)) return;

    this.userService.deleteUser(user.id!).subscribe({
      next: res => {
        alert(res.message);
        this.users = this.users.filter(u => u.id !== user.id); // Remove from list
      },
      error: err => {
        alert('Error deleting user');
        console.error(err);
      }
    });
  }
}
