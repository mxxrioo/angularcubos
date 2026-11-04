import { HttpClient, HttpContext, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../environments/environment";
import { Cubo } from "../models/cubo";
import { Usuario } from "../models/usuario";
import { Login } from "../models/login";
import { Compra } from "../models/compra";
import { SKIP_TOKEN } from "../utils/token.context";

@Injectable()
export class ServiceCubos {
    url = environment.apiCubos;
    constructor(private _http: HttpClient){}

    async getCubosAsync(): Promise<Cubo[]> {
        let request = "api/Cubos";
        return firstValueFrom(this._http.get<Cubo[]>(this.url + request, {
            context: new HttpContext().set(SKIP_TOKEN, true)
        }));
    }

    async getMarcasAsync(): Promise<string[]> {
        let request = "api/Cubos/Marcas";
        return firstValueFrom(this._http.get<string[]>(this.url + request, {
            context: new HttpContext().set(SKIP_TOKEN, true)
        }));
    }

    async getCubosMarcaAsync(marca: string): Promise<Cubo[]> {
        let request = "api/Cubos/CubosMarca/" + encodeURIComponent(marca);
        return firstValueFrom(this._http.get<Cubo[]>(this.url + request, {
            context: new HttpContext().set(SKIP_TOKEN, true)
        }));
    }

    async findCuboAsync(id: number): Promise<Cubo> {
        let request = "api/Cubos/" + id;
        return firstValueFrom(this._http.get<Cubo>(this.url + request, {
            context: new HttpContext().set(SKIP_TOKEN, true)
        }));
    }

    async logInUsuarioAsync(login: Login): Promise<{response: string}> {
        let request = "api/Manage/Login";
        let json = JSON.stringify(login);
        let header = new HttpHeaders().set("content-type", "application/json");
        return firstValueFrom(this._http.post<{response: string}>(this.url + request, json, {
            headers: header,
            context: new HttpContext().set(SKIP_TOKEN, true)
        }));
    }

    async registroUsuarioAsync(usuario: Usuario): Promise<string> {
        let request = "api/Manage/RegistroUsuario";
        let json = JSON.stringify(usuario);
        let header = new HttpHeaders().set("content-type", "application/json");
        return firstValueFrom(this._http.post(this.url + request, json, {
            headers: header,
            responseType: "text",
            context: new HttpContext().set(SKIP_TOKEN, true)
        }));
    }

    async getPerfilUsuarioAsync(): Promise<Usuario> {
        let request = "api/Manage/PerfilUsuario";
        return firstValueFrom(this._http.get<Usuario>(this.url + request));
    }

    async getComprasUsuarioAsync(): Promise<Compra[]> {
        let request = "api/Compra/ComprasUsuario";
        return firstValueFrom(this._http.get<Compra[]>(this.url + request));
    }

    async insertarPedidoAsync(id: number): Promise<string> {
        let request = "api/Compra/InsertarPedido/" + id;
        return firstValueFrom(
            this._http.post(this.url + request, null, {responseType: "text"})
        );
    }
}
