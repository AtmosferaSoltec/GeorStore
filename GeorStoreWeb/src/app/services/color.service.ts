import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { State } from '../interfaces/state';
import { Color } from '../interfaces/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {


  http = inject(HttpClient)
  url = `${environment.baseUrl}/api/color`

  #state = signal<State<Color[]>>({ isLoading: false, data: [] })
  listColor = computed(() => this.#state().data)
  isLoading = computed(() => this.#state().isLoading)

  id_empresa: number = 1

  constructor() {
    this.getAll()
  }

  getAll() {
    this.#state.set({ isLoading: true, data: [] })
    this.http.get(this.url, { params: { id_empresa: this.id_empresa } }).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          this.#state.set({ isLoading: false, data: res.data })
        } else {
          alert(res?.mensaje)
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

  addColor(nombre: string) {
    return this.http.post(this.url, { nombre, id_empresa: this.id_empresa })
  }

  setEstado(id: number, estado: string) {
    return this.http.patch(this.url, { estado, id_color: id })
  }
}
