import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit, Signal, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormatTextoPipe } from "../../../pipes/format-texto.pipe";
import { Producto } from '../../../interfaces/producto';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-dialog-buscar-producto',
  standalone: true,
  templateUrl: './dialog-buscar-producto.component.html',
  styleUrl: './dialog-buscar-producto.component.scss',
  imports: [CommonModule, MatIconModule, FormatTextoPipe]
})
export class DialogBuscarProductoComponent {

  productoService = inject(ProductoService)
  listProductos = this.productoService.list;

  constructor() {
    this.productoService.getAll();
  }
}
