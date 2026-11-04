import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ngx-yet-another-toast-library';
import { Usuario } from '../../models/usuario';
import { ServiceCubos } from '../../services/service.cubos';
@Component({
  selector: 'app-registro-component',
  standalone: false,
  styleUrl: './registro-component.css',
  templateUrl: './registro-component.html',
})
export class RegistroComponent {
  @ViewChild("cajanombre") cajaNombre!: ElementRef<HTMLInputElement>;
  @ViewChild("cajaemail") cajaEmail!: ElementRef<HTMLInputElement>;
  @ViewChild("cajapassword") cajaPassword!: ElementRef<HTMLInputElement>;
  public enviando: boolean = false;
  public error: string = "";

  constructor(
    private _service: ServiceCubos,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _toast: ToastService
  ){}

  async registrarUsuario(): Promise<void> {
    if (this.enviando) return;
    this.enviando = true;
    this.error = "";
    try {
      let nombre = this.cajaNombre.nativeElement.value.trim();
      let email = this.cajaEmail.nativeElement.value.trim();
      let password = this.cajaPassword.nativeElement.value;
      if (!nombre) {
        this.error = "Introduce tu nombre.";
        return;
      }
      // LA API GENERA EL ID, PERO DEBEMOS ENVIARLO EN EL JSON.
      let usuario = new Usuario(0, nombre, email, password);
      await this._service.registroUsuarioAsync(usuario);
      this._toast.success("Usuario registrado. Ya puedes iniciar sesión.");
      this._router.navigate(['/login']);
    } catch {
      this.error = "No se ha podido registrar el usuario. Revisa los datos.";
    } finally {
      this.enviando = false;
      this._cdr.detectChanges();
    }
  }
}
