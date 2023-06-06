import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from "src/environments/environment";
import { AuthResponse, UserAdmin } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private base_url: string = environment.base_url;
    private _userAdmin!: UserAdmin;

    get userAdmin(){
        return {... this._userAdmin };
    }

    constructor(private http: HttpClient, private router: Router) {}
    

  resetPassword( email: string ){
    
    const url = `${ this.base_url}/reset-password`;
    const body = { email };
    
    return this.http.post<AuthResponse>( url, body )
    .pipe(
      tap( resp => {
        if ( resp.ok) {
          localStorage.setItem('token', resp.token! );
        
        }
      }),
      map( resp => resp.ok ),
      catchError( err => of(err) )
    );
    
    }

    changePassword(password:string, password2:string, id: string){
      const url = `${ this.base_url}/change-password`;
      const headers = new  HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

      const body = { password, password2, id };

      return this.http.patch<AuthResponse>( url, body, {headers} )
      .pipe(
        tap( resp => {
          if (resp.ok){

          }
        }),
        map( resp => resp.ok ),
      catchError( err => of(err) )
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
    
}
