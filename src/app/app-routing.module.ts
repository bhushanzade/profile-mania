import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './core/pages/access-denied/access-denied.component';
import { AppLayoutComponent } from './core/layout/app-layout/app-layout.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './core/pages/server-error/server-error.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      {
        path: "home",
        loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
      },
      {
        path: "profile",
        loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'access-denied', component: AccessDeniedComponent
      },
      {
        path: 'page-not-found', component: PageNotFoundComponent
      },
      {
        path: 'server-error', component: ServerErrorComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
