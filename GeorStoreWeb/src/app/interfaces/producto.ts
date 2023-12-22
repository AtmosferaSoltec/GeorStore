import { Signal } from "@angular/core";

export interface Producto {
    id_producto?: number;
    codigo?: string;
    nombre?: string;
    descrip?: string;
    precio?: string;
    id_talla?: number;
    talla?: string;
    id_categoria?: number;
    id_color?: number;
    color?: string;
    id_marca?: number;
    marca?: string;
    id_empresa?: number;
    estado?: 'S' | 'N';
}
