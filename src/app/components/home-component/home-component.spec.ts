import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { HomeComponent } from './home-component';
import { CuboComponent } from '../cubo-component/cubo-component';
import { Cubo } from '../../models/cubo';
import { ServiceCubos } from '../../services/service.cubos';

describe('Comunicación catálogo y cubo', () => {
  it('recibe el favorito del hijo y lo muestra en el padre', async () => {
    let cubo = new Cubo(1, 'Cubo de clase', '3x3', 'MoYu', 'Candy', '', 6, 5);
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([])],
      declarations: [HomeComponent, CuboComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {params: of({})}},
        {provide: ServiceCubos, useValue: {getCubosAsync: async () => [cubo]}}
      ]
    }).compileComponents();
    let fixture = TestBed.createComponent(HomeComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('app-cubo-component button').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.favorito).toBe(cubo);
    expect(fixture.nativeElement.querySelector('aside').textContent).toContain('Cubo de clase');
  });
});
