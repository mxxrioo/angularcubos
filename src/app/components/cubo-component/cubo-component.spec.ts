import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuboComponent } from './cubo-component';
import { AppModule } from '../../app-module';
import { Cubo } from '../../models/cubo';

describe('CuboComponent', () => {
  let component: CuboComponent;
  let fixture: ComponentFixture<CuboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CuboComponent);
    component = fixture.componentInstance;
    component.cubo = new Cubo(1, 'Cubo de prueba', '3x3', 'MoYu', 'Candy', '', 6, 5);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
