import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TallaService } from '../../../services/talla.service';
import { MarcaService } from '../../../services/marca.service';
import { ColorService } from '../../../services/color.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Producto } from '../../../interfaces/producto';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-dialog-form-producto',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatButtonModule
  ],
  templateUrl: './dialog-form-producto.component.html',
  styleUrl: './dialog-form-producto.component.scss'
})
export class DialogFormProductoComponent {

  tallaService = inject(TallaService);
  marcaService = inject(MarcaService);
  colorService = inject(ColorService);
  categoriaService = inject(CategoriaService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public producto: Producto | undefined
  ) {

  }

  formulario = new FormGroup({
    codigo: new FormControl(this.producto?.codigo || ''),
    nombre: new FormControl(this.producto?.nombre || '', Validators.required),
    descrip: new FormControl(this.producto?.descrip || ''),
    precio: new FormControl(this.producto?.precio || '', Validators.required),
    id_categoria: new FormControl(this.producto?.id_categoria || '', Validators.required),
    id_color: new FormControl(this.producto?.id_color || '', Validators.required),
    id_talla: new FormControl(this.producto?.id_talla || '', Validators.required),
    id_marca: new FormControl(this.producto?.id_marca || '', Validators.required),
  })

  dialogRef = inject(MatDialogRef<DialogFormProductoComponent>)

  save() {
    if (this.formulario.valid) {
      //Validar si el precio es un numero
      const precio = this.formulario.controls.precio.value;
      if (isNaN(Number(precio))) {
        alert('El precio debe ser un numero');
        return;
      }
      this.dialogRef.close(this.formulario.value);
    } else {
      alert('Formulario invalido');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
