import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { LoginComponent } from './components/login-component/login-component';
import { RegistroComponent } from './components/registro-component/registro-component';
import { PerfilComponent } from './components/perfil-component/perfil-component';
import { ComprasComponent } from './components/compras-component/compras-component';
import { CompraComponent } from './components/compra-component/compra-component';

import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "marca/:marca", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "registro", component: RegistroComponent},
  {path: "perfil", component: PerfilComponent, canActivate: [AuthGuard]},
  {path: "compras", component: ComprasComponent, canActivate: [AuthGuard]},
  {path: "comprar/:id", component: CompraComponent, canActivate: [AuthGuard]},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule {}

