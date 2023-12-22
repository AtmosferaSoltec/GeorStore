import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formulario: FormGroup;
  router = inject(Router);
  usuarioService = inject(UsuarioService);

  constructor(
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      usuario: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    })

    if (localStorage.getItem('token')) {
      this.usuarioService.verificarToken().subscribe({
        next: (res: any) => {
          if(res?.isSuccess){
            this.router.navigate(['dashboard']);
          }else{
            localStorage.removeItem('token');
          }
        },
        error: (err: any) => {
          alert(err.message);
          console.log(err);
        }
      })
    }
  }

  login() {
    if (this.formulario.valid) {
      this.usuarioService.login(this.formulario.value.usuario, this.formulario.value.pass).subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.data.token);
          console.log(data);
          this.router.navigate(['dashboard']);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
