import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';
import { CommonModule } from '@angular/common';
import { FormatTextoPipe } from "../../pipes/format-texto.pipe";
import { MostrarEstadoPipe } from "../../pipes/mostrar-estado.pipe";
import { MatButtonModule } from '@angular/material/button';
import { MetodoPagoService } from '../../services/metodo-pago.service';
import { VentaService } from '../../services/venta.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, FormatTextoPipe, MostrarEstadoPipe, MatButtonModule]
})
export class AutocompleteComponent {

  productoService = inject(ProductoService)
  metodoPagoService = inject(MetodoPagoService)
  ventaService = inject(VentaService)
  router = inject(Router)

  formulario = new FormGroup({
    buscar: new FormControl('')
  })

  id_metodoPago = new FormControl('')

  listEncontrados = signal<Producto[]>([])
  listProductos = signal<any[]>([])

  buscarNuevo() {
    const buscar = this.formulario.controls.buscar.value
    if (buscar) {
      this.productoService.search(buscar).subscribe({
        next: (res: any) => {
          if (res?.isSuccess) {
            //Insertar lista nueva, pero verificar que los productos que ya esten la lista de productos, no se vuelvan a insertar
            const list = res.data.filter((item: Producto) => !this.listProductos().find((i: Producto) => i.id_producto === item.id_producto))
            this.listEncontrados.set(list)
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

  select(item: any) {
    this.formulario.controls.buscar.setValue('');
    this.listEncontrados.set([]);
    // Agregarle al item la cantidad de 1
    item.cantidad = 1
    this.listProductos().push(item)
    console.log(this.listProductos());
  }

  restarCantidad(item: any) {
    const index = this.listProductos().findIndex((producto: Producto) => producto.id_producto === item.id_producto)
    if (index >= 0) {
      const cantidad = this.listProductos()[index].cantidad
      if (cantidad > 1) {
        this.listProductos()[index].cantidad = cantidad - 1
      }
    }
  }

  sumarCantidad(item: any) {
    const index = this.listProductos().findIndex((producto: Producto) => producto.id_producto === item.id_producto)
    if (index >= 0) {
      const cantidad = this.listProductos()[index].cantidad
      this.listProductos()[index].cantidad = cantidad + 1
    }
  }

  quitarItem(item: any) {
    const index = this.listProductos().findIndex((producto: Producto) => producto.id_producto === item.id_producto)
    if (index >= 0) {
      this.listProductos().splice(index, 1)
    }
  }

  getTotal(): number {
    return this.listProductos().reduce((total: number, item: any) => total + (item.cantidad * item.precio), 0)
  }

  guardar() {
    const venta = {
      precio_venta: this.getTotal(),
      id_metodo_pago: this.id_metodoPago.value,
      list_productos: [
        ...this.listProductos().map((item: any) => ({
          id_producto: item.id_producto,
          cant_vendida: item.cantidad,
          precio_un: item.precio,
          sub_total: item.cantidad * item.precio
        }))
      ]
    }
    this.ventaService.insert(venta).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          Swal.fire({
            title: 'Venta realizada',
            text: res.mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigate(['ventas'])
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
