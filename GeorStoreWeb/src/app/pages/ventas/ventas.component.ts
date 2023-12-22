import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogFormProductoComponent } from '../../components/dialogs/dialog-form-producto/dialog-form-producto.component';
import { Producto } from '../../interfaces/producto';
import { FormatTextoPipe } from '../../pipes/format-texto.pipe';
import { MostrarEstadoPipe } from '../../pipes/mostrar-estado.pipe';
import { ProductoService } from '../../services/producto.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatButtonModule,
    MatTooltipModule, MatFormFieldModule, MostrarEstadoPipe,
    FormatTextoPipe, RouterOutlet
  ],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent {
  productoService = inject(ProductoService);
  listProductos = computed(() => this.productoService.list());
  isLoading = computed(() => this.productoService.isLoading());

  dialog = inject(MatDialog)
  router = inject(Router)

  ngOnInit(): void {
    this.productoService.getAll(1500);
  }

  openDialog(data: Producto | undefined = undefined) {
    this.router.navigate(['dashboard','nueva-venta'])
  }
}
