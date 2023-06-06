import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from 'src/@vex/services/usuario.service';



@Injectable({
    providedIn: 'root'
  })
  
  export class AuthGuard implements CanActivate {
  
    constructor(private usuarioService: UsuarioService, private router: Router) {}
    
    canActivate(): Observable<boolean> {
      return this.usuarioService.validarToken()
        .pipe(
          tap( valido => {
            if ( !valido ) {
              this.router.navigateByUrl('/login');
            }
          })
        );
    }
    
  };
  export default AuthGuard;