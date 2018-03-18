import { AuthGuard } from './../auth/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PrivilegeGuard } from "../auth/guards/privilege-guard";

const routes: Routes = [
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'users', loadChildren: 'app/smartity/users/users.module#UsersModule', canActivate: [PrivilegeGuard] },           
      { path: 'user-profiles', loadChildren: 'app/smartity/userprofile/userprofile.module#UserprofileModule', canActivate: [PrivilegeGuard] },      
      { path: 'configuration', loadChildren: 'app/smartity/configuration/configuration.module#ConfigurationModule', canActivate: [PrivilegeGuard] },
      { path: 'audit', loadChildren: 'app/smartity/auditoria/auditoria.module#AuditoriaModule', canActivate: [PrivilegeGuard] },
      { path: 'my-profile', loadChildren: 'app/smartity/my-profile/my-profile.module#MyProfileModule', canActivate: [PrivilegeGuard] },
      { path: 'stakeholders', loadChildren: 'app/smartity/stakeholders/stakeholders.module#StakeholdersModule', canActivate: [PrivilegeGuard] },    
      { path: 'warehouse', loadChildren: 'app/smartity/warehouse/warehouse.module#WarehouseModule', canActivate: [PrivilegeGuard] },            
      { path: 'company', loadChildren: 'app/smartity/company/company.module#CompanyModule', canActivate: [PrivilegeGuard] },                     
      { path: 'operations-centres', loadChildren: 'app/smartity/operationscentre/operationscentre.module#OperationscentreModule', canActivate: [PrivilegeGuard] },                      
      { path: 'costs-centres', loadChildren: 'app/smartity/costscentres/costscentres.module#CostscentresModule', canActivate: [PrivilegeGuard] },
      { path: 'product', loadChildren: 'app/smartity/product/product.module#ProductModule', canActivate: [PrivilegeGuard] },
      { path: 'pharmaceutical-drug', loadChildren: 'app/smartity/pharmaceutical-drug/pharmaceutical-drug.module#PharmaceuticalDrugModule', canActivate: [PrivilegeGuard] },
      { path: 'delivery-contracts', loadChildren: 'app/smartity/delivery-contracts/delivery-contracts.module#DeliveryContractsModule', canActivate: [PrivilegeGuard] },
      { path: 'delivery-points', loadChildren: 'app/smartity/delivery-points/delivery-points.module#DeliveryPointsModule', canActivate: [PrivilegeGuard] },
    ]
  }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
