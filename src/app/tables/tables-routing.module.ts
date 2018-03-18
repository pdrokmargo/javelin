import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';

import { TableResponsiveComponent } from './responsive/responsive.component';
import { TableStaticComponent } from './static/static.component';

export const TablesRoutes: Routes = [
  {
    path: '',
    component: TablesComponent,
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'responsive', component: TableResponsiveComponent },
      { path: 'static', component: TableStaticComponent },
    ]
  }
];

export const TablesRoutingModule = RouterModule.forChild(TablesRoutes);
