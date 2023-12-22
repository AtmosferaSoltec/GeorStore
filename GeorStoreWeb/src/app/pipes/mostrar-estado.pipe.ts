import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarEstado',
  standalone: true
})
export class MostrarEstadoPipe implements PipeTransform {

  transform(valor?: string): string {
    switch (valor) {
      case 'S':
        return 'Activo'
      case 'N':
        return 'Inactivo'
      default: return 'No definido'
    };
  }

}
