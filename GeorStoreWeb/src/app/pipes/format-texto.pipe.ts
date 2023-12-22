import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTexto',
  standalone: true
})
export class FormatTextoPipe implements PipeTransform {

  transform(value?: string): string {
    if(!value){
      return 'Sin definir';
    }
    if (value && typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    return value;
  }

}
