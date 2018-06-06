import { AuthGuard } from './auth/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const AppRoutes: Routes = [
  { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
  { path: 'app', component: LayoutComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/authentication.module#AuthenticationModule' },
  { path: '**', redirectTo: '/app/dashboard', pathMatch: 'full' }
];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes, { useHash: true });
