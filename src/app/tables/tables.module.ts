import { NgModule } from '@angular/core';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';

import { TableResponsiveComponent } from './responsive/responsive.component';
import { TableStaticComponent } from './static/static.component';

@NgModule({
  imports: [
    TablesRoutingModule,
  ],
  declarations: [
    TablesComponent,
    TableResponsiveComponent,
    TableStaticComponent,
  ],
  exports: [
    TableResponsiveComponent,
  ]
})

export class MyTablesModule {}
