import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthResponse, UserAdmin } from '../interfaces/login-form.interface';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private base_url: string = environment.base_url;
    private _userAdmin!: UserAdmin;

    get userAdmin(){
        return {... this._userAdmin };
    }

    hasRole(rol: string): Observable<boolean> {
      return of(this._userAdmin && this._userAdmin.rol === rol);
    }
    
    

    constructor(private http: HttpClient, private router: Router) {}
    

    login( email: string, password: string ){
    
    const url = `${ this.base_url}/auth/login`;
    const body = { email, password };
    
    return this.http.post<AuthResponse>( url, body )
    .pipe(
      tap( resp => {
        if ( resp.ok) {
          localStorage.setItem('token', resp.token! );
        
           this._userAdmin ={
            name: resp.name!,
            lastname: resp.lastname!,
            uid: resp.uid!,
            rol: resp.rol!
          } 
        }
      }),
      map( resp => resp.ok ),
      catchError( err => of(err) )
    );
    
    }
    
    validarToken(): Observable<boolean>{
    const url = `${ this.base_url}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    
    return this.http.get<AuthResponse>( url, { headers } )
      .pipe(
        map( resp => {
          localStorage.setItem('token', resp.token! );
          /* localStorage.setItem('userAdminRol', JSON.stringify(resp.rol!)); */
        
          this._userAdmin ={
            name: resp.name!,
            lastname: resp.lastname!,
            uid: resp.uid!,
            rol: resp.rol!
          }
         
          return resp.ok;
        }),
        catchError( err => of(false) )
      )
    }
    


  logout(){
    localStorage.removeItem('token');
    localStorage.clear();
  }


}