import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cubo } from '../../models/cubo';
import { ServiceCubos } from '../../services/service.cubos';
@Component({
  selector: 'app-home-component',
  standalone: false,
  styleUrl: './home-component.css',
  templateUrl: './home-component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  public cubos: Array<Cubo> = [];
  public favorito: Cubo | null = null;
  public marca: string = "";
  public cargando: boolean = true;
  public error: boolean = false;
  private suscripcion!: Subscription;
  private carga: number = 0;

  constructor(
    private _service: ServiceCubos,
    private _activeRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.suscripcion = this._activeRoute.params.subscribe((params: Params) => {
      this.marca = params['marca'] || "";
      this.cargarCubos();
    });
  }

  async cargarCubos(): Promise<void> {
    let cargaActual = ++this.carga;
    this.cargando = true;
    this.error = false;
    try {
      let cubos = this.marca
        ? await this._service.getCubosMarcaAsync(this.marca)
        : await this._service.getCubosAsync();
      if (cargaActual === this.carga) this.cubos = cubos;
    } catch {
      if (cargaActual === this.carga) this.error = true;
    } finally {
      if (cargaActual === this.carga) {
        this.cargando = false;
        this._cdr.detectChanges();
      }
    }
  }

  seleccionarFavoritoPadre(cubo: Cubo): void {
    this.favorito = cubo;
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
    this.carga++;
  }
}
