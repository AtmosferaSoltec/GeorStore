import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { State } from '../interfaces/state';
import { MetodoPago } from '../interfaces/metodo-pago';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
  
  http = inject(HttpClient)
  url = `${environment.baseUrl}/api/metodopago`

  #state = signal<State<MetodoPago[]>>({ isLoading: false, data: [] })
  listMetodoPago = computed(() => this.#state().data)
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
  
  addMetodoPago(nombre: string) {
    return this.http.post(this.url, { nombre, id_empresa: this.id_empresa })
  }

  setEstado(id: number, estado: string) {
    return this.http.patch(this.url, { estado, id_metodo_pago: id })
  }
}
