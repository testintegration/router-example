import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent }     from './not-found.component';
import { ComposeMessageComponent }     from './compose-message.component';

import { CanDeactivateGuard }      from './can-deactivate-guard.service';
import { AuthGuard }                from './auth-guard.service';
import { SelectivePreloadingStrategy }                from './selective-preloading-strategy';

// The feature routes are now provided by the HeroesModule and the CrisisCenter modules.
const appRoutes: Routes = [
  {
  path: 'compose',
  component: ComposeMessageComponent,
  outlet: 'popup'
  },
  { // lazy loading
    path: 'crisis-center',
    loadChildren: './crisis-center/crisis-center.module#CrisisCenterModule',
    data: { preload: true }
  },
  { // lazy loading
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AuthGuard] //That CanLoad guard takes precedence over the preload strategy.
    //If you want to preload a module and guard against unauthorized access, drop the canLoad() guard method and rely on the canActivate() guard alone.
  },
  { path: '',   redirectTo: '/superheroes', pathMatch: 'full' }, // If the pathMatch value were 'prefix', every URL would match ''.
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
     appRoutes,
     { enableTracing: true ,// <-- debugging purposes only
       preloadingStrategy: SelectivePreloadingStrategy
     }
   )
  ],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }
