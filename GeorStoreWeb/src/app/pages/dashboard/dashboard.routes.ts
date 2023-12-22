import { Route } from '@angular/router';
import { VentasComponent } from '../ventas/ventas.component';
import { ProductosComponent } from '../productos/productos.component';
import { InventarioComponent } from '../inventario/inventario.component';
import { AdminComponent } from '../admin/admin.component';
import { NuevaVentaComponent } from '../nueva-venta/nueva-venta.component';


export default [
    { path: 'inventario', component: InventarioComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'ventas', component: VentasComponent },
    { path: 'nueva-venta', component: NuevaVentaComponent },
    { path: 'admin', component: AdminComponent },
] as Route[]