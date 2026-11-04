import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComprasComponent } from './compras-component';
import { AppModule } from '../../app-module';
import { ServiceCubos } from '../../services/service.cubos';

describe('ComprasComponent', () => {
  let component: ComprasComponent;
  let fixture: ComponentFixture<ComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{provide: ServiceCubos, useValue: {getComprasUsuarioAsync: async () => [], getCubosAsync: async () => []}}]
    }).compileComponents();

    fixture = TestBed.createComponent(ComprasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
