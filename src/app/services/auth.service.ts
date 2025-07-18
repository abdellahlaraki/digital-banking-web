import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {basename} from '@angular/compiler-cli';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendHost:String="http://localhost:8085"
  isAuthenticated:boolean=false;
  roles:any;
  username:any;
  accessToken!:string;



  constructor(private http:HttpClient,private router:Router) { }
  public login (username:string,password:string){
    let options={
      headers:new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params=new HttpParams()
      .set("username",username)
      .set("password",password);
    return this.http.post(this.backendHost+"/auth/login",params,options);
  }


  loadProfile(data: any) {
    this.isAuthenticated=true;
    this.accessToken =data['access-token'];
    let decodedJwt:any=jwtDecode(this.accessToken);
    this.username=decodedJwt.sub;
    this.roles=decodedJwt.scope;
    console.log(this.roles,decodedJwt.scope);
    window.localStorage.setItem("jwt-token",this.accessToken);
  }

  logout() {
    this.isAuthenticated=false;
    this.username=undefined;
    this.roles=undefined;
    this.accessToken="";
    window.localStorage.removeItem("access-token");
    this.router.navigateByUrl("/login");
  }

  loadJwtTokenFromLocalStorage() {
    let token=window.localStorage.getItem("jwt-token");
    if(token){
      this.loadProfile({"access-token":token})
      this.router.navigateByUrl("/admin/customers");
    }else {this.logout()}
  }
}
