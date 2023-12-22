import { Component, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../../interfaces/producto';
import { InventarioService } from '../../services/inventario.service';
import { CommonModule } from '@angular/common';
import { FormatTextoPipe } from "../../pipes/format-texto.pipe";
import { MostrarEstadoPipe } from "../../pipes/mostrar-estado.pipe";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogFormInventarioComponent } from '../../components/dialogs/dialog-form-inventario/dialog-form-inventario.component';

@Component({
  selector: 'app-inventario',
  standalone: true,
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss',
  imports: [
    CommonModule, FormatTextoPipe, MostrarEstadoPipe,
    MatIconModule, MatButtonModule
  ]
})
export class InventarioComponent {
  inventarioService = inject(InventarioService);
  listInventarios = computed(() => this.inventarioService.list());
  isLoading = computed(() => this.inventarioService.isLoading());

  dialog = inject(MatDialog)

  ngOnInit(): void {
    this.inventarioService.getAll(1500);
  }

}
