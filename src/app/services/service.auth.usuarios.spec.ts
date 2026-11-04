import { ServiceAuthUsuarios } from './service.auth.usuarios';
import { ServiceCubos } from './service.cubos';
import { vi } from 'vitest';

describe('ServiceAuthUsuarios', () => {
  afterEach(() => sessionStorage.clear());
  it('actualiza el signal del menú y lo limpia al cerrar sesión', async () => {
    let service = new ServiceAuthUsuarios({getPerfilUsuarioAsync: async () => ({idUsuario: 1, nombre: 'Clase', email: 'user1@mail.com', pass: 'privada'})} as ServiceCubos);
    await service.logInUsuarioAsync('token-prueba');
    expect(service.usuario()?.nombre).toBe('Clase');
    expect(service.usuario()?.pass).toBe('');
    service.logOutUsuario();
    expect(service.usuario()).toBeNull();
    expect(sessionStorage.getItem('TOKEN')).toBeNull();
  });
  it('no mantiene sesión si falla la recuperación del perfil', async () => {
    let service = new ServiceAuthUsuarios({getPerfilUsuarioAsync: vi.fn().mockRejectedValue(new Error('Error API'))} as unknown as ServiceCubos);
    await expect(service.logInUsuarioAsync('token-prueba')).rejects.toThrow();
    expect(service.usuario()).toBeNull();
    expect(sessionStorage.getItem('TOKEN')).toBeNull();
  });
});
