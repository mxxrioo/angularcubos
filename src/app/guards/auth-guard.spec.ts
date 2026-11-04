import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
  beforeEach(() => {sessionStorage.clear();
    TestBed.configureTestingModule({providers: [provideRouter([]), AuthGuard]});});
  afterEach(() => sessionStorage.clear());

  it('redirige a login y conserva la ruta a la que se intentaba acceder', () => {
    let result = TestBed.inject(AuthGuard).canActivate({} as ActivatedRouteSnapshot,
      {url: '/compras'} as RouterStateSnapshot);
    expect(TestBed.inject(Router).serializeUrl(result as any)).toBe('/login?returnUrl=%2Fcompras');
  });

  it('permite entrar cuando existe token', () => {
    sessionStorage.setItem('TOKEN', 'prueba');
    expect(TestBed.inject(AuthGuard).canActivate({} as ActivatedRouteSnapshot,
      {url: '/perfil'} as RouterStateSnapshot)).toBe(true);
  });
});
