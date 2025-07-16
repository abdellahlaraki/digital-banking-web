import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'digital-banking-web';

  constructor(private authservice:AuthService) {
  }
  ngOnInit(): void {
    this.authservice.loadJwtTokenFromLocalStorage();

  }
}
