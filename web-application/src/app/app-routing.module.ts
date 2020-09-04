import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountsComponent } from './pages/accounts/accounts.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'accounts', component: AccountsComponent},
    { path: '', pathMatch: 'full', redirectTo: 'accounts'/*'home'*/ },  // 8a8f restaurar
    { path: '**', pathMatch: 'full', redirectTo: 'accounts'/*'home'*/ } // 8a8f restaurar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
