
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
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'client/add', component: AddClientFormComponent },
  { path: 'client/edit/:id', component: EditClientFormComponent },
  { path: 'client/:id', component: ClientDetailsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
