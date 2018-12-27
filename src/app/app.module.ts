import { AuthGuard } from './auth/guards/auth.guard';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { 
  MatIconModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatNativeDateModule,
  MatMenuModule,
  MatDialogModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatFormFieldModule,

} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Layout
import { LayoutComponent } from './layout/layout.component';
import { PreloaderDirective } from './layout/preloader.directive';
// Header
import { AppHeaderComponent } from './layout/header/header.component';
// Sidenav
import { AppSidenavComponent } from './layout/sidenav/sidenav.component';
import { ToggleOffcanvasNavDirective } from './layout/sidenav/toggle-offcanvas-nav.directive';
import { AutoCloseMobileNavDirective } from './layout/sidenav/auto-close-mobile-nav.directive';
import { AppSidenavMenuComponent } from './layout/sidenav/sidenav-menu/sidenav-menu.component';
import { AccordionNavDirective } from './layout/sidenav/sidenav-menu/accordion-nav.directive';
import { AppendSubmenuIconDirective } from './layout/sidenav/sidenav-menu/append-submenu-icon.directive';
import { HighlightActiveItemsDirective } from './layout/sidenav/sidenav-menu/highlight-active-items.directive';
// Footer
import { AppFooterComponent } from './layout/footer/footer.component';
// Search Overaly
import { AppSearchOverlayComponent } from './layout/search-overlay/search-overlay.component';
import { SearchOverlayDirective } from './layout/search-overlay/search-overlay.directive';
import { OpenSearchOverlaylDirective } from './layout/search-overlay/open-search-overlay.directive';
// Sub modules
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
// hmr
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { AuthenticationService } from './auth/authentication.service';
import { PrivilegeGuard } from './auth/guards/privilege-guard';
import { LoaderService, HelperService } from './shared';
import {
  ModalSucursalComponent,
  ModalConfirmationComponent,
  ModalResolutionComponent,
  ModalInstitucionalSaleContractComponent,
  ModalBankAccountComponent,
  ModalPharmaceuticalComponent,
  ModalWarehouseComponent,
  WarehouseActionComponent,
  WarehouseListComponent,
  ModalCustomersComponent,
  CustomersListComponent,
  CustomersActionComponent,
  ModalUsersComponent,
  ModalActiveIngredientsComponent,
  ModalDeliveryPointsComponent,
  ModalIpsNetworkComponent,
  ModalStakeholderComponent,
  PharmaceuticalDrugActionComponent,
  PharmaceuticalDrugListComponent,
  ModalGeolocationComponent,
  StakeholdersActionComponent,
  StakeholdersListComponent,
} from './smartity/modals';
import { NgxMaskModule } from 'ngx-mask';
import { InputFileComponent } from './smartity/component/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActiveIngredientsComponent } from './smartity/active-ingredients/active-ingredients.component';
import { ActiveIngredientsListComponent } from './smartity/active-ingredients/active-ingredients-list/active-ingredients-list.component';
import { ActiveIngredientsActionComponent } from './smartity/active-ingredients/active-ingredients-action/active-ingredients-action.component';
import { UserActionComponent } from './smartity/modals/modal-users/user-action/user-action.component';
import { UserListComponent } from './smartity/modals/modal-users/user-list/user-list.component';
import { DeliveryPointsActionComponent } from './smartity/modals/modal-delivery-points/delivery-points-action/delivery-points-action.component';
import { DeliveryPointsListComponent } from './smartity/modals/modal-delivery-points/delivery-points-list/delivery-points-list.component';
import { IpsNetworkActionComponent } from './smartity/modals/modal-ips-network/ips-network-action/ips-network-action.component';
import { IpsNetworkListComponent } from './smartity/modals/modal-ips-network/ips-network-list/ips-network-list.component';
import { MycurrencyPipe } from './smartity/pipe/mycurrency.pipe';
import { ModalProductsComponent } from './smartity/modals/modal-products/modal-products.component';
import { ModalProductsActionComponent } from './smartity/modals/modal-products/modal-products-action/modal-products-action.component';
import { ModalProductsListComponent } from './smartity/modals/modal-products/modal-products-list/modal-products-list.component';
import { ModalStocksComponent } from './smartity/modals/modal-stocks/modal-stocks.component';
import { ModalStocksListComponent } from './smartity/modals/modal-stocks/modal-stocks-list/modal-stocks-list.component';
import { ModalSuppliersOrdersComponent } from './smartity/modals/modal-suppliers-orders/modal-suppliers-orders.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // Sub modules
    LayoutModule,
    SharedModule,
    NgxMaskModule,
    MatRadioModule,
    MatDialogModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatNativeDateModule,
  MatMenuModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatIconModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    // Layout
    LayoutComponent,
    PreloaderDirective,
    // Header
    AppHeaderComponent,
    // Sidenav
    AppSidenavComponent,
    ToggleOffcanvasNavDirective,
    AutoCloseMobileNavDirective,
    AppSidenavMenuComponent,
    AccordionNavDirective,
    AppendSubmenuIconDirective,
    HighlightActiveItemsDirective,
    // Footer
    AppFooterComponent,
    // Search overlay
    AppSearchOverlayComponent,
    SearchOverlayDirective,
    OpenSearchOverlaylDirective,
    //Modals
    ModalSucursalComponent,
    ModalConfirmationComponent,
    ModalResolutionComponent,
    ModalInstitucionalSaleContractComponent,
    ModalBankAccountComponent,
    ModalPharmaceuticalComponent,
    ModalWarehouseComponent,
    ModalCustomersComponent,
    ModalUsersComponent,
    ModalActiveIngredientsComponent,
    ModalDeliveryPointsComponent,
    ModalIpsNetworkComponent,
    InputFileComponent,
    WarehouseActionComponent,
    WarehouseListComponent,
    CustomersListComponent,
    CustomersActionComponent,
    UserActionComponent,
    UserListComponent,
    ActiveIngredientsComponent,
    ActiveIngredientsListComponent,
    ActiveIngredientsActionComponent,
    PharmaceuticalDrugActionComponent,
    PharmaceuticalDrugListComponent,
    DeliveryPointsActionComponent,
    DeliveryPointsListComponent,
    IpsNetworkActionComponent,
    IpsNetworkListComponent,
    ModalGeolocationComponent,
    ModalStakeholderComponent,
    StakeholdersActionComponent,
    StakeholdersListComponent,
    ModalProductsComponent,
    ModalProductsActionComponent,
    ModalProductsListComponent,
    ModalStocksComponent,
    ModalStocksListComponent,
    ModalSuppliersOrdersComponent
  ],
  providers: [
    MycurrencyPipe,
    AuthGuard,
    AuthenticationService,
    PrivilegeGuard,
    LoaderService,
    ActiveIngredientsComponent,
    ActiveIngredientsComponent,
    CustomersListComponent,
    CustomersActionComponent,
    StakeholdersActionComponent,
    StakeholdersListComponent,
    HelperService,


  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalStakeholderComponent,
    StakeholdersActionComponent,
    StakeholdersListComponent,
    ModalGeolocationComponent,
    ModalSucursalComponent,
    ModalConfirmationComponent,
    ModalResolutionComponent,
    ModalInstitucionalSaleContractComponent,
    ModalBankAccountComponent,
    ModalPharmaceuticalComponent,
    ModalWarehouseComponent,
    ModalCustomersComponent,
    ModalUsersComponent,
    ModalActiveIngredientsComponent,
    ModalDeliveryPointsComponent,
    ModalIpsNetworkComponent,
    InputFileComponent,
    WarehouseActionComponent,
    WarehouseListComponent,
    CustomersListComponent,
    CustomersActionComponent,
    UserActionComponent,
    UserListComponent,
    ActiveIngredientsComponent,
    ActiveIngredientsListComponent,
    ActiveIngredientsActionComponent,
    ModalProductsComponent,
    ModalStocksComponent,
  ]
})

export class AppModule {

  constructor(public appRef: ApplicationRef) { }
  
  /*hmrOnInit(store) { }
  
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }*/
}