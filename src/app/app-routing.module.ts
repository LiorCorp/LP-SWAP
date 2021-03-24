import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PairsInfoGuard } from './pairs-info/guard/pairs-info.guard';
import { PairsInfoComponent } from './pairs-info/pairs-info.component';
import { PairsGuard } from './pairs/guard/pairs.guard';
import { PairsComponent } from './pairs/pairs.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  //   canActivate: [HomeGuard],
  // },
  {
    path: 'pairs',
    component: PairsComponent,
    canActivate: [PairsGuard],
  },
  {
    path: 'pairs/:id',
    component: PairsInfoComponent,
    canActivate: [PairsInfoGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.NgxAuthModule),
  },
  { path: '**', redirectTo: '/pairs' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
