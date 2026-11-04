import { HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { authTokenInterceptor } from './auth-token-interceptor';
import { environment } from '../../environments/environment';
import { HttpContext } from '@angular/common/http';
import { SKIP_TOKEN } from '../utils/token.context';

describe('authTokenInterceptor', () => {
  beforeEach(() => sessionStorage.setItem('TOKEN', 'token-prueba'));
  afterEach(() => sessionStorage.removeItem('TOKEN'));

  it('añade el token a las peticiones protegidas', () => {
    let request = new HttpRequest('GET', environment.apiCubos + 'api/Manage/PerfilUsuario');
    authTokenInterceptor(request, (peticion) => {
      expect(peticion.headers.get('Authorization')).toBe('bearer token-prueba');
      return of(new HttpResponse());
    });
  });
});
