import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from '../@vex/interfaces/vex-route.interface';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { AuthGuard } from '../app/auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { NAVIGATION_ITEMS_ADMIN } from './pages/shared/admin.component';
import { NAVIGATION_ITEMS_COMERCIAL } from './pages/shared/comercial.component';

const routes: VexRoutes = [

  /* { path: 'admin', component: NAVIGATION_ITEMS_ADMIN, canActivate: [RoleGuard], data: { rol: 'admin' } },
  { path: 'comercial', component: NAVIGATION_ITEMS_COMERCIAL, canActivate: [RoleGuard], data: { rol: 'comercial' } }, */
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path: 'change-password',
    loadChildren: () => import('./auth/change-password/change-password.module').then(m => m.ChangePasswordModule),
  },
  { 
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: 'scrumboard',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/scrumboard/scrumboard.module').then(m => m.ScrumboardModule),
      },
    ]
  },
   {
    path: 'apps',
    children: [
      
      {
        path: 'contacts',
        loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsModule)
      },
      
      
    ]
  }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule,QuicklinkModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
