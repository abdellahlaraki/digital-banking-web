import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
interface Role {
  id: number;
  roleName: string;
}

interface User {
  id: number;
  username: string;
  enabled: boolean;
  roles: Role[];
}
@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  passwordData = {
    oldPassword: '',
    newPassword: ''
  };

  passwordMessage: string | null = null;

  user!: User;
  backendHost: string = 'http://localhost:8085';
  constructor(private http:HttpClient,private userService:UserService) {
  }
  ngOnInit(): void {
    this.http.get<User>(`${this.backendHost}/users/profile`).subscribe({
      next: (data) => {
        this.user = data;
        console.log('User profile:', this.user);
      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });
  }
  changePassword() {
    this.userService.changePassword(this.passwordData).subscribe({
      next: res => {
        this.passwordMessage = 'Mot de passe changé avec succès.';
        this.passwordData = { oldPassword: '', newPassword: '' };
      },
      error: err => {
        this.passwordMessage = err.error || 'Erreur lors du changement de mot de passe.';
        console.error(err);
      }
    });
  }
}
