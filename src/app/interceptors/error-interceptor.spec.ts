import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ToastService } from 'ngx-yet-another-toast-library';
import { throwError } from 'rxjs';
import { vi } from 'vitest';
import { errorInterceptor } from './error-interceptor';

describe('errorInterceptor', () => {
  it('muestra un toast y devuelve el error al componente', () => {
    let mostrarError = vi.fn();
    TestBed.configureTestingModule({providers: [
      {provide: ToastService, useValue: {error: mostrarError}}
    ]});
    let error = new HttpErrorResponse({status: 500});
    let request = new HttpRequest('GET', '/prueba');
    let resultado = TestBed.runInInjectionContext(() =>
      errorInterceptor(request, () => throwError(() => error))
    );
    resultado.subscribe({error: recibido => expect(recibido).toBe(error)});
    expect(mostrarError).toHaveBeenCalledOnce();
  });
});
