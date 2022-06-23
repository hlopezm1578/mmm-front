import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:IUser = {};
  error:boolean = false;
  errorMsj: string ="";

  constructor(private formBuilder:FormBuilder, private service: UserService, private router:Router) { }

  userForm:FormGroup = this.formBuilder.group({
    "email": new FormControl(null,Validators.compose([Validators.required,Validators.email])),
    "password": new FormControl(null,Validators.required)
  });
  
  ngOnInit(): void {
  }
  
  async submitForm(){
    if(this.userForm.valid){
      this.user.email = this.email?.value;
      this.user.password = this.password?.value;

      const result = await this.service.login(this.user);
      if(result){
        this.router.navigate(['/dashboard']);
      }else{
        this.error = true;
        this.errorMsj = "El usuario o contraseña son invalidos";
      }

    }
  }

  get email(){
    return this.userForm.get('email');
  }

  get password(){
    return this.userForm.get('password');
  }

}
