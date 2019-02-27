import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule  } from './app-routing/app-routing.module';
import { routes  } from './app-routing/routes';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';

import { HttpClientModule } from '@angular/common/http';
import { FarmerComponent } from './farmer/farmer.component';
import { DistibutorComponent } from './distibutor/distibutor.component';
import { SupplierComponent } from './supplier/supplier.component';
import { RetailerComponent } from './retailer/retailer.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ProfileComponent,
    SigninComponent,
    FarmerComponent,
    DistibutorComponent,
    SupplierComponent,
    RetailerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
