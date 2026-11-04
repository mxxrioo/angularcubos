import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ServiceCubos } from './service.cubos';
import { Usuario } from '../models/usuario';
import { SKIP_TOKEN } from '../utils/token.context';
import { environment } from '../../environments/environment';

describe('ServiceCubos', () => {
  let service: ServiceCubos;
  let controller: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ServiceCubos, provideHttpClient(), provideHttpClientTesting()]});
    service = TestBed.inject(ServiceCubos);
    controller = TestBed.inject(HttpTestingController);
  });
  afterEach(() => controller.verify());

  it('registra el usuario con id y pass según el contrato del servidor', async () => {
    let result = service.registroUsuarioAsync(new Usuario(0, 'Prueba', 'prueba@example.com', '12345'));
    let request = controller.expectOne(environment.apiCubos + 'api/Manage/RegistroUsuario');
    expect(request.request.method).toBe('POST');
    expect(JSON.parse(request.request.body)).toEqual({idUsuario: 0, nombre: 'Prueba', email: 'prueba@example.com', pass: '12345'});
    expect(request.request.context.get(SKIP_TOKEN)).toBe(true);
    request.flush('OK');
    expect(await result).toBe('OK');
  });

  it('envía la compra protegida con el id en la ruta y sin cuerpo', async () => {
    let result = service.insertarPedidoAsync(8);
    let request = controller.expectOne(environment.apiCubos + 'api/Compra/InsertarPedido/8');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toBeNull();
    expect(request.request.context.get(SKIP_TOKEN)).toBe(false);
    request.flush('');
    await result;
  });
});
