import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ngx-yet-another-toast-library';
import { Login } from '../../models/login';
import { ServiceCubos } from '../../services/service.cubos';
import { ServiceAuthUsuarios } from '../../services/service.auth.usuarios';
@Component({
  selector: 'app-login-component',
  standalone: false,
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  @ViewChild("cajaemail") cajaEmail!: ElementRef<HTMLInputElement>;
  @ViewChild("cajapassword") cajaPassword!: ElementRef<HTMLInputElement>;
  private _serviceAuth = inject(ServiceAuthUsuarios);
  public enviando: boolean = false;
  public error: string = "";

  constructor(
    private _service: ServiceCubos,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _toast: ToastService
  ){}

  async logInUsuario(): Promise<void> {
    if (this.enviando) return;
    this.enviando = true;
    this.error = "";
    try {
      let email = this.cajaEmail.nativeElement.value.trim();
      let password = this.cajaPassword.nativeElement.value;
      let login = new Login(email, password);
      let response = await this._service.logInUsuarioAsync(login);
      await this._serviceAuth.logInUsuarioAsync(response.response);
      this._toast.success("Has iniciado sesión correctamente.");
      let returnUrl = this._activeRoute.snapshot.queryParamMap.get("returnUrl");
      if (!returnUrl || !returnUrl.startsWith("/") || returnUrl.startsWith("//") || returnUrl.startsWith("/login")) {
        returnUrl = "/perfil";
      }
      this._router.navigateByUrl(returnUrl);
    } catch {
      this.error = "No se ha podido iniciar sesión. Revisa los datos o vuelve a intentarlo.";
    } finally {
      this.enviando = false;
      this._cdr.detectChanges();
    }
  }
}
