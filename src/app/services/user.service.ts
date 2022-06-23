import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser, IUserToken } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser:boolean = false;
  token:any;
  userName:string="";

  constructor(private http:HttpClient, private router:Router) { }

  async login(user:IUser){
    return new Promise(resolve=>{
      this.http.post<IUserToken>(`${URL}/user/login`,user)
        .subscribe(resp=>{
          if(resp.ok){
            this.saveToken(resp.token);
            this.readToken();
            resolve(true);
          }else{
            this.deleteToken();
            resolve(false);
          }
        })
    });
  };

  saveToken(token:string){
    localStorage.setItem("token",token);
    this.token = token;
    this.loggedUser = true;
  }

  loadToken(){
    this.token =  localStorage.getItem("token");
  }

  deleteToken(){
    localStorage.removeItem("token");
  }

  readToken(){
    let jwt = this.token;
    let jwtData = jwt.split('.')[1];
    let decodeJSONJwtData = window.atob(jwtData);
    let decodeJwtData = JSON.parse(decodeJSONJwtData);
    console.log(decodeJwtData);
    this.userName = decodeJwtData.user.name;
    //this.userRole =  decodeJwtData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  logout(){
    this.deleteToken();
    this.loggedUser=false;
    this.userName="";
  }

  async validate():Promise<boolean>{
    this.loadToken();
    if(!this.token){
      this.router.navigate(['/login']);
      return Promise.resolve(false);
      
    };

    return new Promise<boolean>(resolve=>{

      this.http.get(`${URL}/user/validar`).subscribe((resp:any)=>{
        if(resp['ok']){
          resolve(true);
        }else{
          this.router.navigate(['/login'])
          resolve(false);
        }
    });
    });
      
    
   
  }
}
