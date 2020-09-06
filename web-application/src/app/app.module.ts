import { NgModule } from '@angular/core';

/** Miscellany */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

/** Routing */
import { AppRoutingModule } from './app-routing.module';

/** Pages & Components */
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AccountsTableComponent } from './pages/accounts/parts/accounts-table/accounts-table.component';
import { AccountDetailsComponent } from './pages/accounts/parts/account-details/account-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { InstructionsComponent } from './pages/instructions/instructions.component';

/** Angular material */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TopBarComponent } from './pages/accounts/parts/top-bar/top-bar.component';
import { CurrencyValuePipe } from './pipes/currency-value.pipe';
import { HighlightTopBarDirective } from './directives/highlighttopbar.directive';
import { HighlightAccountRowDirective } from './directives/highlightaccountrow.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountsComponent,
    NavbarComponent,
    AccountsTableComponent,
    AccountDetailsComponent,
    PaginationComponent,
    InstructionsComponent,
    TopBarComponent,
    CurrencyValuePipe,
    HighlightTopBarDirective,
    HighlightAccountRowDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
