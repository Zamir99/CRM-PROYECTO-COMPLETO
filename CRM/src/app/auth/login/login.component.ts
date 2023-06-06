import { ChangeDetectionStrategy, Component, OnInit,  } from '@angular/core';
import { UntypedFormBuilder,  UntypedFormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { UsuarioService } from 'src/@vex/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup = this.fb.group({

  })
  loading = false;
  inputType = 'password';
  visible = false;
  cd: any;
  

  public formSubmitted = false;

  ;

  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private usuarioService: UsuarioService,
              private snackbar: MatSnackBar,

                ) {}
 ngOnInit() {
  this.form = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required],
  });
     
 }

  login() {

      this.loading = true;

      const {email, password} = this.form.value;

    this.usuarioService.login( email, password )
    .subscribe( ok => {
      console.log(ok);
      if ( ok === true ){
        this.router.navigateByUrl('/');
      }else{
        this.snackbar.open('El email o el password no son validos', 'CERRAR',{
          duration: 3000
        });
      }
    });
    this.loading = false;
    
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
