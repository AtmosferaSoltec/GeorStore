import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { delay } from 'rxjs';
import { State, Result } from '../interfaces/state';
import { Inventario } from '../interfaces/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  http = inject(HttpClient)
  url = `${environment.baseUrl}/api/inventario`

  #state = signal<State<Inventario[]>>({ isLoading: false, data: [] })
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

  insert(result: any) {
    this.http.post(this.url, result)
      .subscribe({
        next: (res: Result) => {
          if (res?.isSuccess) {
            alert('Inventario registrado correctamente');
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
            alert('Inventario actualizado correctamente');
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
