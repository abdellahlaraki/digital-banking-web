import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
export interface UserDTO {
  id: number;
  username: string;
  enabled: boolean;
  roles: string[];
}

export interface UserCreationDTO {
  username: string;
  password: string;
  roles: string[];
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8085/users';
  constructor(private http:HttpClient) { }
  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.apiUrl);
  }

  createUser(user: UserCreationDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.apiUrl, user);
  }
  toggleUserEnabled(id: number, enabled: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/enabled?enabled=${enabled}`, null);
  }
  changePassword(data: { oldPassword: string, newPassword: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/change-password`, data);
  }

  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
