import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompraComponent } from './compra-component';
import { AppModule } from '../../app-module';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ServiceCubos } from '../../services/service.cubos';
import { Cubo } from '../../models/cubo';

describe('CompraComponent', () => {
  let component: CompraComponent;
  let fixture: ComponentFixture<CompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: convertToParamMap({id: '1'})}}},
        {provide: ServiceCubos, useValue: {findCuboAsync: async () => new Cubo(1, 'Cubo de prueba', '3x3', 'MoYu', 'Candy', '', 6, 5)}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompraComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
