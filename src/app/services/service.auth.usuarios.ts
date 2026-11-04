import { Injectable, signal } from "@angular/core";
import { Usuario } from "../models/usuario";
import { ServiceCubos } from "./service.cubos";

@Injectable({providedIn: 'root'})
export class ServiceAuthUsuarios {
    public usuario = signal<Usuario | null>(null);

    constructor(private _service: ServiceCubos){}

    async logInUsuarioAsync(token: string): Promise<void> {
        sessionStorage.setItem("TOKEN", token);
        try {
            let usuario = await this._service.getPerfilUsuarioAsync();
            if (sessionStorage.getItem("TOKEN") === token) {
                
                this.usuario.set(new Usuario(usuario.idUsuario, usuario.nombre, usuario.email, ""));
            }
        } catch (error) {
            this.logOutUsuario();
            throw error;
        }
    }

    async recuperarSesionAsync(): Promise<void> {
        let token = sessionStorage.getItem("TOKEN");
        if (token) {
            try {
                await this.logInUsuarioAsync(token);
            } catch {
                
            }
        }
    }

    logOutUsuario(): void {
        sessionStorage.removeItem("TOKEN");
        this.usuario.set(null);
    }
}
