import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCubos } from '../../services/service.cubos';
import { ServiceAuthUsuarios } from '../../services/service.auth.usuarios';
import { ToastService } from 'ngx-yet-another-toast-library';
@Component({
  selector: 'app-menu-component',
  standalone: false,
  styleUrl: './menu-component.css',
  templateUrl: './menu-component.html',
})
export class MenuComponent implements OnInit {
  private _serviceAuth = inject(ServiceAuthUsuarios);
  public usuario = this._serviceAuth.usuario;
  public marcas: Array<string> = [];
  public errorMarcas: boolean = false;

  constructor(
    private _service: ServiceCubos,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _toast: ToastService
  ){}

  async ngOnInit(): Promise<void> {
    try {
      this.marcas = await this._service.getMarcasAsync();
    } catch {
      this.errorMarcas = true;
    }
    this._cdr.detectChanges();
  }

  logOutUsuario(): void {
    this._serviceAuth.logOutUsuario();
    this._toast.info("Has cerrado sesión.");
    this._router.navigate(['/']);
  }
}
