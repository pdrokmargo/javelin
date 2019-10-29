import { AuthGuard } from './../auth/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { PrivilegeGuard } from "../auth/guards/privilege-guard";

const routes: Routes = [
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/smartity/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
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
      { path: 'affiliates', loadChildren: 'app/smartity/affiliates/affiliates.module#AffiliatesModule', canActivate: [PrivilegeGuard] },
      { path: 'inventory-movement-entry', loadChildren: 'app/smartity/inventory-movements-entry/inventory-movements-entry.module#InventoryMovementsEntryModule', canActivate: [PrivilegeGuard] },
      { path: 'inventory-movement-out', loadChildren: 'app/smartity/inventory-movements-out/inventory-movements-out.module#InventoryMovementsOutModule', canActivate: [PrivilegeGuard] },
      { path: 'stocks', loadChildren: 'app/smartity/stocks/stocks.module#StocksModule', canActivate: [PrivilegeGuard] },
      { path: 'inventory-adjustments', loadChildren: 'app/smartity/inventory-adjustments/inventory-adjustments.module#InventoryAdjustmentsModule', canActivate: [PrivilegeGuard] },
      { path: 'inventory-audit', loadChildren: 'app/smartity/inventory-audit/inventory-audit.module#InventoryAuditModule', canActivate: [PrivilegeGuard] },
      { path: 'suppliers-orders', loadChildren: 'app/smartity/suppliers-orders/suppliers-orders.module#SuppliersOrdersModule', canActivate: [PrivilegeGuard] },
      { path: 'suppliers-quotes', loadChildren: 'app/smartity/suppliers-quotes/suppliers-quotes.module#SuppliersQuotesModule', canActivate: [PrivilegeGuard] },
      { path: 'customers-quotes', loadChildren: 'app/smartity/customers-quotes/customers-quotes.module#CustomersQuotesModule', canActivate: [PrivilegeGuard] },
      { path: 'remission-goods', loadChildren: 'app/smartity/remission-goods/remission-goods.module#RemissionGoodsModule', canActivate: [PrivilegeGuard] },
      { path: 'billing', loadChildren: 'app/smartity/billing/billing.module#BillingModule', canActivate: [PrivilegeGuard] },
      { path: 'delivery', loadChildren: 'app/smartity/delivery/delivery.module#DeliveryModule', canActivate: [PrivilegeGuard] },
      // { path: 'scheduled-deliveries', loadChildren: 'app/smartity/scheduled-deliveries/scheduled-deliveries.module#ScheduledDeliveriesModule', canActivate: [PrivilegeGuard] },
    ]
  }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
