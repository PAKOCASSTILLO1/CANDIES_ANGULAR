import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError = ''; // alamecenar mensaje de error
  loginForm: FormGroup; // obtener datos del form del login

  // iniciamos con todos los modulos necesarios
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  // iniciamos el controlador desde el inicio
  ngOnInit(): void {
    this.buildLoginForm();
  }

  // Controlador de aceptacion de inputs
  buildLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });
  }

  // obtenemos los datos del formulario y se los pasamos a la funcion login de AuthService
  login(submittedForm: FormGroup){
    this.authService.login(submittedForm.value.username, submittedForm.value.password).subscribe(
      authResponse => {
        this.router.navigate(['./home']); // Si todo esta bien redireccione a Home
      }, error => this.loginError = error); // si ocurre un error, muestrelo en loginError
  }
}
