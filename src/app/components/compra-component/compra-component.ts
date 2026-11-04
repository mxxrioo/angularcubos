import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'ngx-yet-another-toast-library';
import { Cubo } from '../../models/cubo';
import { ServiceCubos } from '../../services/service.cubos';
@Component({
  selector: 'app-compra-component',
  standalone: false,
  styleUrl: './compra-component.css',
  templateUrl: './compra-component.html',
})
export class CompraComponent implements OnInit {
  public cubo: Cubo | null = null;
  public cargando: boolean = true;
  public comprando: boolean = false;
  public error: string = "";

  constructor(
    private _service: ServiceCubos,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _toast: ToastService
  ){}

  async ngOnInit(): Promise<void> {
    try {
      let id = Number(this._activeRoute.snapshot.paramMap.get('id'));
      if (!Number.isInteger(id) || id <= 0) {
        this.error = "El cubo solicitado no es válido.";
        return;
      }
      this.cubo = await this._service.findCuboAsync(id);
    } catch {
      this.error = "No se ha podido cargar el cubo.";
    } finally {
      this.cargando = false;
      this._cdr.detectChanges();
    }
  }

  async realizarCompra(): Promise<void> {
    if (!this.cubo || this.comprando) return;
    this.comprando = true;
    this.error = "";
    try {
      await this._service.insertarPedidoAsync(this.cubo.idCubo);
      this._toast.success("Tu compra se ha realizado correctamente.");
      this._router.navigate(['/compras']);
    } catch {
      this.error = "No se ha podido realizar la compra. Puedes intentarlo de nuevo.";
    } finally {
      this.comprando = false;
      this._cdr.detectChanges();
    }
  }
}
