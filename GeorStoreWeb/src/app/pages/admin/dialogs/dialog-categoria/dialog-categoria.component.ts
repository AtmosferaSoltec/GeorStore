import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogColorComponent } from '../dialog-color/dialog-color.component';

@Component({
  selector: 'app-dialog-categoria',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './dialog-categoria.component.html',
  styleUrl: './dialog-categoria.component.scss'
})
export class DialogCategoriaComponent {

  formulario: FormGroup

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogColorComponent>,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required]
    })
  }

  guardar() {

    if (this.formulario.valid) {
      this.dialogRef.close(this.formulario.value)
    } else {
      alert('Debe completar el formulario')
    }
  }
}
