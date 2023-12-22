import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-color',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './dialog-color.component.html',
  styleUrl: './dialog-color.component.scss'
})
export class DialogColorComponent {

  formulario: FormGroup

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogColorComponent>,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required]
    })
  }

  guardar(){
  
    if (this.formulario.valid) {
      this.dialogRef.close(this.formulario.value)
    } else {
      alert('Debe completar el formulario')
    }
  }

}
