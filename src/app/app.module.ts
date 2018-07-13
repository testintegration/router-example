import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent }     from './not-found.component';
import { ComposeMessageComponent }     from './compose-message.component';

import { LoginComponent }          from './login.component';

import { AppRoutingModule } from './app-routing.module';
//Heroes module is the owner of the Heroes components
import { HeroesModule }     from './heroes/heroes.module';
// comment this out for lazy loading 
// import { CrisisCenterModule }     from './crisis-center/crisis-center.module';
//The root AppModule must neither load nor reference the AdminModule or its files.
//import { AdminModule }     from './admin/admin.module'; -- comment this out because it is lazy loaded in app-routing.module.ts
import { LoginRoutingModule }      from './login-routing.module';

import { DialogService }           from './dialog.service';

//Some modules, like AppModule, must be loaded from the start. But others can and should be lazy loaded

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ComposeMessageComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HeroesModule,
    //CrisisCenterModule, // comment this out for lazy loading ; comment this out if this needs to be accessed via admin tab only
    LoginRoutingModule, // login routing will be picked up when nothing is entered on the url: localhost:4200, it will redirect to localhost:4200/login
//    AdminModule,  // comment this out for lazy loading
    AppRoutingModule // // if this is imported before other modules, it will be picked up when nothing is entered on the url: localhost:4200, it will redirect to localhost:4200/heroes
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // Diagnostic only: inspect router configuration
   console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}
