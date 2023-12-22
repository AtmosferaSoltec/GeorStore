import { Producto } from "./producto";

export interface Inventario {
    id_inventario?: number;
    id_producto?: number;
    cant_disponible?: number;
    id_empresa?: number;
    id_usuario?: number;
    fecha_update?: Date;
    estado?: 'S' | 'N';
    producto?: Producto;
}