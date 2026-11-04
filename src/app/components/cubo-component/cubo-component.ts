import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cubo } from '../../models/cubo';
@Component({
  selector: 'app-cubo-component',
  standalone: false,
  styleUrl: './cubo-component.css',
  templateUrl: './cubo-component.html',
})
export class CuboComponent {
  @Input() cubo!: Cubo;
  @Input() favorito: boolean = false;
  @Output() seleccionarFavoritoPadre: EventEmitter<Cubo> = new EventEmitter();

  seleccionarFavorito(): void {
    this.seleccionarFavoritoPadre.emit(this.cubo);
  }

  imagenError(event: Event): void {
    let imagen = event.target as HTMLImageElement;
    imagen.onerror = null;
    imagen.src = "assets/images/cubo.svg";
  }
}
