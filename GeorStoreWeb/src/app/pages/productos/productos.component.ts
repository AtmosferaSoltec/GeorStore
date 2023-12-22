import { Component, OnInit, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormProductoComponent } from '../../components/dialogs/dialog-form-producto/dialog-form-producto.component';
import { Producto } from '../../interfaces/producto';
import { MostrarEstadoPipe } from "../../pipes/mostrar-estado.pipe";
import { FormatTextoPipe } from "../../pipes/format-texto.pipe";

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatFormFieldModule, MostrarEstadoPipe, FormatTextoPipe]
})
export class ProductosComponent implements OnInit {

  productoService = inject(ProductoService);
  listProductos = computed(() => this.productoService.list());
  isLoading = computed(() => this.productoService.isLoading());

  dialog = inject(MatDialog)

  ngOnInit(): void {
    this.productoService.getAll(1500);
  }

  openDialog(data: Producto | undefined = undefined) {
    const dialogRef = this.dialog.open(DialogFormProductoComponent, {
      width: '600px',
      data: data
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        console.log(result);

        if (result) {
          if (!data) {
            this.productoService.insert(result)
          } else {
            result.id_producto = data.id_producto
            this.productoService.update(result)
          }
        }
      }
    });
  }

}
