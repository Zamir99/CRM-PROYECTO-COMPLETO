import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { ScrumboardComponent } from './scrumboard.component';
import { VexRoutes } from '../../../@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    redirectTo: '1',
    pathMatch: 'full'
  },
  {
    path: ':scrumboardId',
    component: ScrumboardComponent,
    data: {
      scrollDisabled: true,
      containerEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class ScrumboardRoutingModule {
}
