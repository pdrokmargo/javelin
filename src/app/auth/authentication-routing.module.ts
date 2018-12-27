import { PageLoginComponent } from "./login/login.component";
import { Routes, RouterModule } from "@angular/router";

export const AuthRoutes: Routes = [
  {
    path: "",
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", component: PageLoginComponent }
    ]
  }
];

export const AuthRoutingModule = RouterModule.forChild(AuthRoutes);
