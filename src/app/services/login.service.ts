import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private toastr: ToastrService) { }

  public login(form: any) {
    localStorage.setItem('email', 'prueba@prueba.com');
    localStorage.setItem('password', '123456');

    if (form.valid) {
      if (form.value.email === localStorage.getItem('email') && form.value.password === localStorage.getItem('password')) {   
        localStorage.setItem('isAuthenticated', 'true');
        this.toastr.success('A ingresado con éxito', 'Éxito');
        this.router.navigate(['/home']);
      } else {
        this.toastr.error('Login incorrecto, ingrese los datos correctos', 'Error');
      }
    } else {
      this.toastr.error('Formulario inválido, ingrese todos los datos', 'Error');
    }
  }

  public logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('isAuthenticated');
    this.toastr.success('A cerrado sesión con éxito', 'Éxito');
    this.router.navigate(['/']);
  }

}
