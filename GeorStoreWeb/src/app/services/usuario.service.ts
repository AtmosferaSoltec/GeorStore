import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  

  http = inject(HttpClient)
  url = `${environment.baseUrl}/api/usuario`

  constructor() {
    this.getAll()
  }
  
  verificarToken() {
    return this.http.get(`${this.url}/verificar-token`)
  }

  login(documento: string, clave: string) {
    return this.http.post(`${this.url}/login`, { documento, clave })
  }

  getAll() {
    this.http.get(this.url).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
