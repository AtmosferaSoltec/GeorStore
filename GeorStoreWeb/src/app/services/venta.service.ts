import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  http = inject(HttpClient)
  url = `${environment.baseUrl}/api/venta`

  constructor() { }

  insert(venta: any) {
    return this.http.post(this.url, venta)
  }
}
