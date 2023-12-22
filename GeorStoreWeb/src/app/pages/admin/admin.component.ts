import { Component, inject } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { TallaService } from '../../services/talla.service';
import { MetodoPagoService } from '../../services/metodo-pago.service';
import { MarcaService } from '../../services/marca.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogColorComponent } from './dialogs/dialog-color/dialog-color.component';
import { DialogMarcasComponent } from './dialogs/dialog-marcas/dialog-marcas.component';
import { DialogTallasComponent } from './dialogs/dialog-tallas/dialog-tallas.component';
import { DialogMetodoPagoComponent } from './dialogs/dialog-metodo-pago/dialog-metodo-pago.component';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../services/categoria.service';
import { DialogCategoriaComponent } from './dialogs/dialog-categoria/dialog-categoria.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  colorService = inject(ColorService)
  marcaService = inject(MarcaService)
  metodoPagoService = inject(MetodoPagoService)
  tallaService = inject(TallaService)
  categoriaService = inject(CategoriaService)

  dialog = inject(MatDialog)

  addColor() {
    const dialogRef = this.dialog.open(DialogColorComponent, {
      width: '500px'
    })

    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.colorService.addColor(result.nombre)
            .subscribe({
              next: (res: any) => {
                if (res?.isSuccess) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'Se ha agregado el color correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
                  this.colorService.getAll()
                } else {
                  alert(res?.mensaje)
                }
              },
              error: (error: any) => {
                console.error(error);
                alert(error.message)
              }
            })
        }
      });
  }

  addMetodoPago() {
    const dialogRef = this.dialog.open(DialogMetodoPagoComponent, { width: '500px' })

    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.metodoPagoService.addMetodoPago(result.nombre)
            .subscribe({
              next: (res: any) => {
                if (res?.isSuccess) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'Se ha agregado el metodo de pago correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
                  this.metodoPagoService.getAll()
                } else {
                  alert(res?.mensaje)
                }
              },
              error: (error: any) => {
                console.error(error);
                alert(error.message)
              }
            })
        }
      });
  }

  addMarca() {
    const dialogRef = this.dialog.open(DialogMarcasComponent, { width: '500px' })

    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.marcaService.addMarca(result.nombre)
            .subscribe({
              next: (res: any) => {
                if (res?.isSuccess) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'Se ha agregado la marca correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
                  this.marcaService.getAll()
                } else {
                  alert(res?.mensaje)
                }
              },
              error: (error: any) => {
                console.error(error);
                alert(error.message)
              }
            })
        }
      });
  }

  addTalla() {
    const dialogRef = this.dialog.open(DialogTallasComponent, { width: '500px' })

    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.tallaService.addTalla(result.nombre)
            .subscribe({
              next: (res: any) => {
                if (res?.isSuccess) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'Se ha agregado la talla correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
                  this.tallaService.getAll()
                } else {
                  alert(res?.mensaje)
                }
              },
              error: (error: any) => {
                console.error(error);
                alert(error.message)
              }
            })
        }
      });
  }

  addCategoria() {
    const dialogRef = this.dialog.open(DialogCategoriaComponent, { width: '500px' })

    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.categoriaService.addCategoria(result.nombre)
            .subscribe({
              next: (res: any) => {
                if (res?.isSuccess) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'Se ha agregado la categoria correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
                  this.categoriaService.getAll()
                } else {
                  alert(res?.mensaje)
                }
              },
              error: (error: any) => {
                console.log(error.message);
              }
            })
        }
      });
  }

  setEstadoColor(id?: number, estado?: string) {
    console.log(id, estado);

    if (!estado || !id) {
      return alert('No se puede cambiar el estado de este color')
    }
    estado = estado === 'S' ? 'N' : 'S'
    this.colorService.setEstado(id, estado).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          //Mensaje de exito
          alert('Se ha cambiado el estado correctamente')
          this.colorService.getAll()
        } else {
          alert(res?.mensaje)
        }
      },
      error: (error: any) => {
        console.log(error.message);
      }
    })
  }

  setEstadoMarca(id?: number, estado?: string) {
    if (!estado || !id) {
      return alert('No se puede cambiar el estado de esta marca')
    }
    estado = estado === 'S' ? 'N' : 'S'
    this.marcaService.setEstado(id, estado).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          //Mensaje de exito
          alert('Se ha cambiado el estado correctamente')
          this.marcaService.getAll()
        } else {
          alert(res?.mensaje)
        }
      },
      error: (error: any) => {
        console.log(error.message);
      }
    })
  }

  setEstadoTalla(id?: number, estado?: string) {
    if (!estado || !id) {
      return alert('No se puede cambiar el estado de esta talla')
    }
    estado = estado === 'S' ? 'N' : 'S'
    this.tallaService.setEstado(id, estado).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          Swal.fire({
            title: 'Exito',
            text: 'Se ha cambiado el estado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.tallaService.getAll()
        } else {
          alert(res?.mensaje)
        }
      },
      error: (error: any) => {
        console.log(error.message);
      }
    })
  }

  setEstadoMetodoPago(id?: number, estado?: string) {
    if (!estado || !id) {
      return alert('No se puede cambiar el estado de este metodo de pago')
    }
    estado = estado === 'S' ? 'N' : 'S'
    this.metodoPagoService.setEstado(id, estado).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          Swal.fire({
            title: 'Exito',
            text: 'Se ha cambiado el estado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.metodoPagoService.getAll()
        } else {
          alert(res?.mensaje)
        }
      },
      error: (error: any) => {
        console.error(error);
        alert(error.message)
      }
    })
  }

  setEstadoCategoria(id?: number, estado?: string) {
    if (!estado || !id) {
      return alert('No se puede cambiar el estado de este metodo de pago')
    }
    estado = estado === 'S' ? 'N' : 'S'
    this.categoriaService.setEstado(id, estado).subscribe({
      next: (res: any) => {
        if (res?.isSuccess) {
          Swal.fire({
            title: 'Exito',
            text: 'Se ha cambiado el estado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.categoriaService.getAll()
        } else {
          alert(res?.mensaje)
        }
      },
      error: (error: any) => {
        console.log(error.message);
      }
    })
  }

}
