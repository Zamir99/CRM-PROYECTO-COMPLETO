import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceRol {
  private base2_url: string = environment.base2_url;

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: any): Observable<any> {
    const url = `${this.base2_url}/crearUsuario`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.http.post(url, usuario, { headers });
  }

  actualizarUsuario(usuario: any): Observable<any> {
    const url = `${this.base2_url}/actualizarUsuario/${usuario.id}`; 
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.http.put(url, usuario, { headers });
  }

  eliminarUsuario(id: string): Observable<any> {
    const url = `${this.base2_url}/eliminarUsuario/${id}`; 
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.http.delete(url, { headers });
  }
};
