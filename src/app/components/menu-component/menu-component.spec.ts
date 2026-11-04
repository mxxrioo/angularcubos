import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu-component';
import { AppModule } from '../../app-module';
import { ServiceCubos } from '../../services/service.cubos';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{provide: ServiceCubos, useValue: {getMarcasAsync: async () => ['MoYu']}}]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
