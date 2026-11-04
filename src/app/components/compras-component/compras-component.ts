import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ToastService } from 'ngx-yet-another-toast-library';
import { Compra } from '../../models/compra';
import { Cubo } from '../../models/cubo';
import { ServiceCubos } from '../../services/service.cubos';
import { ServiceAuthUsuarios } from '../../services/service.auth.usuarios';
@Component({
  selector: 'app-compras-component',
  standalone: false,
  styleUrl: './compras-component.css',
  templateUrl: './compras-component.html',
})
export class ComprasComponent implements OnInit {
  private _serviceAuth = inject(ServiceAuthUsuarios);
  public compras: Array<Compra> = [];
  public cubos: Array<Cubo> = [];
  public cargando: boolean = true;
  public error: boolean = false;
  public generando: boolean = false;

  constructor(
    private _service: ServiceCubos,
    private _cdr: ChangeDetectorRef,
    private _toast: ToastService
  ){}

  async ngOnInit(): Promise<void> {
    await this.cargarCompras();
  }

  async cargarCompras(): Promise<void> {
    this.cargando = true;
    this.error = false;
    try {
      this.compras = await this._service.getComprasUsuarioAsync();
      this.cubos = await this._service.getCubosAsync();
    } catch {
      this.error = true;
    } finally {
      this.cargando = false;
      this._cdr.detectChanges();
    }
  }

  buscarCubo(id: number): Cubo | undefined {
    return this.cubos.find(cubo => cubo.idCubo === id);
  }

  async generarInforme(): Promise<void> {
    if (this.generando || this.error || this.cargando) return;
    this.generando = true;
    try {
      // CARGAMOS LAS LIBRERÍAS PDF CUANDO SE NECESITAN.
      let { default: jsPDF } = await import('jspdf');
      let { default: autoTable } = await import('jspdf-autotable');
      let document = new jsPDF();
      let usuario = this._serviceAuth.usuario();
      document.setFontSize(18);
      document.text("Mis compras - Cubos", 14, 20);
      document.setFontSize(11);
      document.text(usuario ? usuario.nombre + " - " + usuario.email : "Mi usuario", 14, 30, {maxWidth: 180});
      document.text("Generado: " + new Date().toLocaleDateString('es-ES'), 14, 45);
      let headers = [["Pedido", "Cubo", "Marca", "Fecha"]];
      let data = this.compras.map(compra => {
        let cubo = this.buscarCubo(compra.idCubo);
        return [String(compra.idPedido), cubo?.nombre || "Cubo " + compra.idCubo,
          cubo?.marca || "-", new Date(compra.fechaPedido).toLocaleDateString('es-ES')];
      });
      autoTable(document, {head: headers, body: data, startY: 52,
        styles: {fontSize: 10}, headStyles: {fillColor: [31, 77, 67]}});
      if (this.compras.length === 0) document.text("Todavía no tienes compras.", 14, 70);
      document.save("mis-compras.pdf");
      this._toast.success("Informe PDF generado.");
    } catch {
      this._toast.error("No se ha podido generar el PDF.");
    } finally {
      this.generando = false;
      this._cdr.detectChanges();
    }
  }
}
