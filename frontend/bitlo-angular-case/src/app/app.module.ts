import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { MarketdetailComponent } from './pages/marketdetail/marketdetail.component';
import { BalanceComponent } from './pages/balance/balance.component';
import { OpentransactionsComponent } from './pages/opentransactions/opentransactions.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from './components/loader/loader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiPrefixInterceptor } from './shared/http/interceptor';
import {MatTableModule} from '@angular/material/table';
import { PhoneFormatPipe } from './shared/pipes/phone-format.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MarketsComponent,
    MarketdetailComponent,
    BalanceComponent,
    OpentransactionsComponent,
    LogoutComponent,
    PhoneFormatPipe,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    LoaderComponent,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSortModule,
    ReactiveFormsModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
