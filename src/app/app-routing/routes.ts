
import { Routes } from '@angular/router';

import { ProfileComponent } from '../profile/profile.component';
import { SigninComponent } from '../signin/signin.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { FarmerComponent } from '../farmer/farmer.component';
import { DistibutorComponent } from '../distibutor/distibutor.component';
import { SupplierComponent } from '../supplier/supplier.component';
import { RetailerComponent } from '../retailer/retailer.component';

export  const  routes: Routes = [
    { 
      path: 'profile',
      component: ProfileComponent,
    //   canActivate : [AdminGuard]
    },
    
    {
      path:'sidenav',
      component:SidenavComponent,
    },
    {
      path: 'signin',
      component:SigninComponent,
    },
    {
      path: 'farmer',
      component:FarmerComponent,
    }, 
      {
      path: 'distibutor',
      component:DistibutorComponent,
    },
    {
      path: 'supplier',
      component:SupplierComponent,
    },
    {
      path: 'retailer',
      component:RetailerComponent ,
    },
   
     { 
      path: '',
      redirectTo: '/signin',
      pathMatch: 'full'
    }
  ];