import { AuthGuard } from './auth/guards/auth.guard';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
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
// Customizer
import { AppCustomizerComponent } from './layout/customizer/customizer.component';
import { ToggleQuickviewDirective } from './layout/customizer/toggle-quickview.directive';
// Footer
import { AppFooterComponent } from './layout/footer/footer.component';
// Search Overaly
import { AppSearchOverlayComponent } from './layout/search-overlay/search-overlay.component';
import { SearchOverlayDirective } from './layout/search-overlay/search-overlay.directive';
import { OpenSearchOverlaylDirective } from './layout/search-overlay/open-search-overlay.directive';
// Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageLayoutFullscreenComponent } from './page-layouts/fullscreen/fullscreen.component';
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
  ModalCustumersComponent,
  ModalUsersComponent,
  ModalActiveIngredientsComponent,
  ModalDeliveryPointsComponent,
  DeliveryPointsListComponent,
  DeliveryPointsActionComponent,
  ModalIpsNetworkComponent,
  ModalGeolocationComponent,
  WarehouseActionComponent,
  WarehouseListComponent,
  UserActionComponent,
  UserListComponent,
  PharmaceuticalDrugActionComponent,
  PharmaceuticalDrugListComponent,
  IpsNetworkActionComponent,
  IpsNetworkListComponent,
  StakeholdersActionComponent,
  StakeholdersListComponent,
  ModalStakeHolderComponent  

} from './smartity/modals';
import { NumberOnlyDirective } from './smartity/directive/number-only.directive';
import { NgxMaskModule } from 'ngx-mask';
import { InputFileComponent } from './smartity/component/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActiveIngredientsComponent } from './smartity/active-ingredients/active-ingredients.component';
import { ActiveIngredientsListComponent } from './smartity/active-ingredients/active-ingredients-list/active-ingredients-list.component';
import { ActiveIngredientsActionComponent } from './smartity/active-ingredients/active-ingredients-action/active-ingredients-action.component';






@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // Sub modules
    LayoutModule,
    SharedModule,
    MdNativeDateModule,
    NgxMaskModule.forRoot(),
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
    // Customizer
    AppCustomizerComponent,
    ToggleQuickviewDirective,
    // Footer
    AppFooterComponent,
    // Search overlay
    AppSearchOverlayComponent,
    SearchOverlayDirective,
    OpenSearchOverlaylDirective,
    //
    DashboardComponent,
    // Pages
    PageLayoutFullscreenComponent,
    ModalSucursalComponent,
    ModalConfirmationComponent,
    ModalResolutionComponent,
    ModalInstitucionalSaleContractComponent,
    ModalBankAccountComponent,
    ModalPharmaceuticalComponent,
    ModalWarehouseComponent,
    ModalCustumersComponent,
    ModalUsersComponent,
    ModalActiveIngredientsComponent,
    ModalDeliveryPointsComponent,
    DeliveryPointsListComponent,
    DeliveryPointsActionComponent,
    WarehouseActionComponent,
    WarehouseListComponent,
    ModalIpsNetworkComponent,
    ModalGeolocationComponent,
    InputFileComponent,
    NumberOnlyDirective,
    StakeholdersActionComponent,
    StakeholdersListComponent,
    UserActionComponent,
    UserListComponent,
    ActiveIngredientsComponent,
    ActiveIngredientsListComponent,
    ActiveIngredientsActionComponent,
    PharmaceuticalDrugListComponent,
    PharmaceuticalDrugActionComponent,
    IpsNetworkActionComponent,
    IpsNetworkListComponent,
    ModalStakeHolderComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    PrivilegeGuard,
    LoaderService,
    ActiveIngredientsComponent,
    HelperService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ModalSucursalComponent,
    ModalConfirmationComponent,
    ModalResolutionComponent,
    ModalInstitucionalSaleContractComponent,
    ModalBankAccountComponent,
    ModalPharmaceuticalComponent,
    ModalWarehouseComponent,
    ModalCustumersComponent,
    ModalUsersComponent,
    ModalActiveIngredientsComponent,
    ModalDeliveryPointsComponent,
    DeliveryPointsListComponent,
    DeliveryPointsActionComponent,
    WarehouseActionComponent,
    WarehouseListComponent,
    ModalIpsNetworkComponent,
    ModalGeolocationComponent,
    InputFileComponent,
    UserActionComponent,
    UserListComponent,
    ActiveIngredientsComponent,
    ActiveIngredientsListComponent,
    ActiveIngredientsActionComponent,
    PharmaceuticalDrugActionComponent,
    PharmaceuticalDrugListComponent,
    IpsNetworkActionComponent,
    IpsNetworkListComponent,
    ModalStakeHolderComponent
  ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef) { }
  hmrOnInit(store) { }
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
  }
}