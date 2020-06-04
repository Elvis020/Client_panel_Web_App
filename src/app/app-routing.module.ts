import { RegisterGuard } from './components/guard/register.guard';
import { AuthGuard } from './components/guard/auth.guard';

import { SettingsComponent } from './components/settings/settings.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { EditClientFormComponent } from './components/edit-client-form/edit-client-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientFormComponent } from './components/add-client-form/add-client-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';






const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'client/add', component: AddClientFormComponent, canActivate: [AuthGuard] },
  { path: 'client/edit/:id', component: EditClientFormComponent, canActivate: [AuthGuard] },
  { path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate:[RegisterGuard] },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RegisterGuard]
})
export class AppRoutingModule { }
