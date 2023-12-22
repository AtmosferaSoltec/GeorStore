import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Result, State } from '../interfaces/state';
import { Producto } from '../interfaces/producto';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  http = inject(HttpClient)
  url = `${environment.baseUrl}/api/producto`

  #state = signal<State<Producto[]>>({ isLoading: false, data: [] })
  list = computed(() => this.#state().data)
  isLoading = computed(() => this.#state().isLoading)

  constructor() { }

  getAll(retraso: number = 0) {
    this.#state.set({ isLoading: true, data: [] })
    this.http.get(this.url)
      .pipe(delay(retraso))
      .subscribe({
        next: (res: Result) => {
          if (res?.isSuccess) {
            this.#state.set({ isLoading: false, data: res.data })
          } else {
            console.log(res.mensaje);
            alert(res.mensaje)
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  search(valor: string) {
    return this.http.get(`${this.url}/search/${valor}`)
  }

  insert(result: any) {
    this.http.post(this.url, result)
      .subscribe({
        next: (res: Result) => {
          if (res?.isSuccess) {
            Swal.fire({
              title: 'Producto registrado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            })
            this.getAll();
          } else {
            console.log(res.mensaje);
            alert(res.mensaje)
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  update(result: any) {
    this.http.put(this.url, result)
      .subscribe({
        next: (res: Result) => {
          if (res?.isSuccess) {
            Swal.fire({
              title: 'Producto actualizado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            })
            this.getAll();
          } else {
            console.log(res.mensaje);
            alert(res.mensaje)
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

}
