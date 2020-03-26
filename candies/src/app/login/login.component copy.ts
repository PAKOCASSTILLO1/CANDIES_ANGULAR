import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { AuthService } from '../auth/auth.service';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginError = '';
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  buildLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    });
  }

  login(submittedForm: FormGroup){
    this.authService.login(submittedForm.value.username, submittedForm.value.password).
      subscribe(authResponse =>{
        this.router.navigate(['./home']);
      }, error => this.loginError = error);
  }
}
