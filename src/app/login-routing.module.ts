import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }            from './auth-guard.service';
import { AuthService }          from './auth.service';
import { LoginComponent }       from './login.component';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ], //Guards and the service providers they require must be provided at the module-level. This allows the Router access to retrieve these services from the Injector during the navigation process. 
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class LoginRoutingModule {}
