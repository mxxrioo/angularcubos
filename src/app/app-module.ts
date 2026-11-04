import { NgModule, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { provideToastService } from 'ngx-yet-another-toast-library';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './components/home-component/home-component';
import { MenuComponent } from './components/menu-component/menu-component';
import { CuboComponent } from './components/cubo-component/cubo-component';
import { LoginComponent } from './components/login-component/login-component';
import { RegistroComponent } from './components/registro-component/registro-component';
import { PerfilComponent } from './components/perfil-component/perfil-component';
import { ComprasComponent } from './components/compras-component/compras-component';
import { CompraComponent } from './components/compra-component/compra-component';

import { ServiceCubos } from './services/service.cubos';
import { AuthGuard } from './guards/auth-guard';
import { errorInterceptor } from './interceptors/error-interceptor';
import { authTokenInterceptor } from './interceptors/auth-token-interceptor';

registerLocaleData(localeEs);

@NgModule({
  declarations: [App, HomeComponent, MenuComponent, CuboComponent, LoginComponent,
    RegistroComponent, PerfilComponent, ComprasComponent, CompraComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([errorInterceptor, authTokenInterceptor])),
    provideToastService({position: 'bottom-right'}),
    {provide: LOCALE_ID, useValue: 'es'},
    ServiceCubos,
    AuthGuard
  ],
  bootstrap: [App]
})
export class AppModule {}

