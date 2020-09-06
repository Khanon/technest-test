import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { InstructionsComponent } from './pages/instructions/instructions.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'accounts', component: AccountsComponent},
    { path: 'instructions', component: InstructionsComponent},
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
