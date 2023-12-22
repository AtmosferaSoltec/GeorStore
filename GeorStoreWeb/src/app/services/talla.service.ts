import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { State } from '../interfaces/state';
import { Talla } from '../interfaces/talla';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TallaService {

  http = inject(HttpClient)
  url = `${environment.baseUrl}/api/talla`

  #state = signal<State<Talla[]>>({ isLoading: false, data: [] })
  listTallas = computed(() => this.#state().data)
  isLoading = computed(() => this.#state().isLoading)

  id_empresa: number = 1
  
  constructor() {
    this.getAll()
  }

  getAll(retraso: number = 0) {
    this.#state.set({ isLoading: true, data: [] })
    this.http.get(this.url, { params: { id_empresa: this.id_empresa } })
      .pipe(delay(retraso))
      .subscribe({
        next: (res: any) => {
          if (res?.isSuccess) {
            this.#state.set({ isLoading: false, data: res.data })
          } else {
            this.#state.set({ isLoading: false, data: [] })
          }
        },
        error: (error) => {
          console.error(error);
          alert(error.message)
          this.#state.set({ isLoading: false, data: [] })
        }
      })
  }

  addTalla(nombre: string) {
    return this.http.post(this.url, { nombre, id_empresa: this.id_empresa })
  }

  setEstado(id: number, estado: string) {
    return this.http.patch(this.url, { estado, id_talla: id })
  }
}
