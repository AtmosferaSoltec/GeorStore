import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-tallas',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './dialog-tallas.component.html',
  styleUrl: './dialog-tallas.component.scss'
})
export class DialogTallasComponent {
  formulario: FormGroup

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogTallasComponent>,
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
