import { Component, OnInit } from '@angular/core';
import { ServiceAuthUsuarios } from './services/service.auth.usuarios';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  constructor(private _serviceAuth: ServiceAuthUsuarios){}

  ngOnInit(): void {
    this._serviceAuth.recuperarSesionAsync();
  }
}
