import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { ok } from 'assert';
import { PasswordService } from 'src/@vex/services/password.service';
import { UsuarioService } from 'src/@vex/services/usuario.service';

@Component({
  selector: 'vex-login',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class ChangePasswordComponent implements OnInit {

  form: UntypedFormGroup;

  inputType = 'password';
  visible = false;
  loading: boolean;
  token: string;

  get usuario(){
    return this.usuarioService.userAdmin;
  }
  
  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private passwordService: PasswordService,
              private route:ActivatedRoute,
              private usuarioService: UsuarioService,
  ) {}

  ngOnInit() {

    
    console.log(this.usuario)
    /* const storedToken = localStorage.getItem('token');
    const token = this.route.snapshot.paramMap.get('token');

    if ( token != storedToken){

      this.snackbar.open(`El enlace a caducado, porfavor solicite uno nuevo`, 'CERRAR',{
        duration: 6000
      });

      localStorage.clear();
      this.router.navigateByUrl('/forgot-password');
    } */
    

    this.form = this.fb.group({
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });

   
    
  }

  change() {
    this.loading = true;
  
    const {password, password2} = this.form.value;
    const id = this.route.snapshot.paramMap.get('id');
  
    if (password !== password2) {
      this.snackbar.open('Las contraseñas no coinciden', 'CERRAR',{
        duration: 5000
      });
      this.loading = false;
      return;
    }
  
    this.passwordService.changePassword(password, password2, id)
      .subscribe( ok => {
        console.log(ok);
        if (ok === true ) {
          
          localStorage.clear();
          this.router.navigateByUrl('/login');
          this.snackbar.open('Se ha cambiado su contraseña correctamente.', 'CERRAR',{
            duration: 7000
          });
        } else {
          this.snackbar.open('No se pudo realizar el cambio de contraseña.', 'CERRAR',{
            duration: 7000
          });
        }
      });
  }
  
  


  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
