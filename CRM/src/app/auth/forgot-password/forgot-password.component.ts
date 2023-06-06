import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PasswordService } from 'src/@vex/services/password.service';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';


@Component({
  selector: 'vex-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUp400ms]
})
export class ForgotPasswordComponent implements OnInit {

  form = this.fb.group({
    email: [null, Validators.required]
  });
  errorMessage: string;
  successMessage: string;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private passwordService: PasswordService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  reset() {
    const { email } = this.form.value;
    this.passwordService.resetPassword(email)
    .subscribe(response => {
      console.log(response); 
      if (response === true) {
        /* localStorage.setItem('token', response.token); */
        this.snackbar.open(`Se envió un correo electrónico a ${email} con el link de cambio de contraseña`, 'CERRAR',{
          duration: 6000
        });
        this.router.navigateByUrl('/login'); 
      } else {
        this.snackbar.open(response.msg, 'CERRAR',{
          duration: 3000
        });
      }
      
    });
  }
  

  
  
}
