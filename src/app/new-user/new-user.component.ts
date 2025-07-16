import { Component } from '@angular/core';
import {UserCreationDTO, UserService} from '../services/user.service';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-user',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  newUser: UserCreationDTO = {
    username: '',
    password: '',
    roles: []
  };

  rolesAvailable = ['USER', 'ADMIN'];

  constructor(private userService: UserService,private router:Router) {}
  createUser() {
    if (!this.newUser.username || !this.newUser.password) {
      alert('Username and password are required');
      return;
    }

    this.userService.createUser(this.newUser).subscribe({
      next: user => {
        alert(`User ${user.username} created successfully!`);
        this.newUser = { username: '', password: '', roles: [] };
        this.router.navigateByUrl("/admin/users");
      },
      error: err => {
        console.error('Error creating user', err);
        alert('Failed to create user');
      }
    });
  }

  toggleRole(role: string) {
    const index = this.newUser.roles.indexOf(role);
    if (index === -1) {
      this.newUser.roles.push(role);
    } else {
      this.newUser.roles.splice(index, 1);
    }
  }

  hasRole(role: string): boolean {
    return this.newUser.roles.includes(role);
  }
}
