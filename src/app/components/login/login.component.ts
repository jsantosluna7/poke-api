import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  loginForm: FormGroup;

  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  login() {
    this.loginService.login(this.loginForm);
  }


  addcl(event: any): void {
    const parent = event.target.parentNode.parentNode;
    parent.classList.add('focus');
  }

  remcl(event: any): void {
    const parent = event.target.parentNode.parentNode;
    if (event.target.value === '') {
      parent.classList.remove('focus');
    }
  }
}
