import { Component, ViewChild, inject, signal } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Router, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, MatToolbarModule, MatListModule, RouterOutlet, MatTooltipModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  usuarioService = inject(UsuarioService)

  router = inject(Router)

  dataDrawer = [
    {
      name: 'Inventario',
      route: 'inventario',
      icon: 'inventory'
    },
    {
      name: 'Productos',
      route: 'productos',
      icon: 'shopping_cart'
    },
    {
      name: 'Ventas',
      route: 'ventas',
      icon: 'monetization_on'
    },
    {
      name: 'Admin',
      route: 'admin',
      icon: 'admin_panel_settings'
    }
  ]

  copiarToken() {
    navigator.clipboard.writeText(localStorage.getItem('token') || '');
  }

  toggleDrawer() {
    this.drawer.toggle();
  }

  openDrawer() {
    this.drawer.open();
  }

  closeDrawer() {
    this.drawer.close();
  }

  selectItemDrawer(url: string) {
    this.router.navigate(['dashboard', url]);
    this.closeDrawer();
  }

  logout() {
    this.router.navigate(['login']);
    localStorage.removeItem('token');
  }

}
