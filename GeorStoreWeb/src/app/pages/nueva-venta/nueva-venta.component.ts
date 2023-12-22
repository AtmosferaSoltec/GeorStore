import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-nueva-venta',
  standalone: true,
  imports: [MatInputModule, MatAutocompleteModule, MatFormFieldModule,
    ReactiveFormsModule, MatIconModule, AutocompleteComponent],
  templateUrl: './nueva-venta.component.html',
  styleUrl: './nueva-venta.component.scss',
  animations: [
    trigger('openClose', [
      state('open', style({
        backgroundColor: '#d1d1d1'
      })),
      state('closed', style({
        height: '0px'
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ],
})
export class NuevaVentaComponent {
  isOpen = true;


  cl(item: string) {
    this.list2 = []
    this.producto.setValue(item)
  }

  list: string[] = [
    'Leche',
    'Yogurt',
    'Huevo',
    'Queso',
    'Queso 1',
    'Queso 2',
    'Queso 3',
  ]

  list2: string[] = []

  producto = new FormControl('');

  buscar() {
    const prod = this.producto.value
    if (prod) {
      this.list2 = this.list.filter(item => item.includes(prod))
      console.log(this.list2);
      console.log(prod);


    }
  }
}
