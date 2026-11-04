import { Component, inject } from '@angular/core';
import { ServiceAuthUsuarios } from '../../services/service.auth.usuarios';
@Component({
  selector: 'app-perfil-component',
  standalone: false,
  styleUrl: './perfil-component.css',
  templateUrl: './perfil-component.html',
})
export class PerfilComponent {
  private _serviceAuth = inject(ServiceAuthUsuarios);
  public usuario = this._serviceAuth.usuario;
  public mensaje: string = "";

  cerrarSesion(): void {
    this._serviceAuth.logOutUsuario();
    this.mensaje = "Cerrando sesión...";
  }
}
