import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Producto } from '../../interfaces/producto';
import { MetodoPagoService } from '../../services/metodo-pago.service';
import { ProductoService } from '../../services/producto.service';
import { VentaService } from '../../services/venta.service';
import { FormatTextoPipe } from "../../pipes/format-texto.pipe";
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogBuscarProductoComponent } from '../../components/dialogs/dialog-buscar-producto/dialog-buscar-producto.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nueva-venta',
  standalone: true,
  templateUrl: './nueva-venta.component.html',
  styleUrl: './nueva-venta.component.scss',
  imports: [CommonModule, MatInputModule, MatAutocompleteModule, MatFormFieldModule, MatButtonModule,
    ReactiveFormsModule, MatIconModule, FormatTextoPipe]
})
export class NuevaVentaComponent {

  productoService = inject(ProductoService)
  metodoPagoService = inject(MetodoPagoService)
  ventaService = inject(VentaService)
  dialog = inject(MatDialog)
  router = inject(Router)


  id_metodoPago = new FormControl('')

  listEncontrados = signal<Producto[]>([])
  listProductos = signal<any[]>([])


  openDialog() {
    const ref = this.dialog.open(DialogBuscarProductoComponent)

    ref.afterClosed().subscribe({
      next: (res) => {

      },
      error: (err) => {
        alert(err.message);
        console.log(err);
      }
    })
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
