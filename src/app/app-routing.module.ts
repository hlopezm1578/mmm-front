import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path:"auth",
    loadChildren:()=>import('./pages/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:"dashboard",
    loadChildren:()=>import('./pages/dashboard/dashboard.module').then(m=>m.DashboardModule),
    canLoad:[UserGuard]
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
