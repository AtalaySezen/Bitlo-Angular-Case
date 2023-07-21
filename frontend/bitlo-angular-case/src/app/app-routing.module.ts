import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BalanceComponent } from './pages/balance/balance.component';
import { OpentransactionsComponent } from './pages/opentransactions/opentransactions.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'marketler', component: MarketsComponent, title: 'Marketler' },
  { path: 'marketler/:marketCode', component: MarketsComponent, title: 'Marketler' },
  { path: 'profil', component: ProfileComponent, title: 'Profil' },
  //Auth ile erişimi olanlar:
  { path: 'profil/bakiyeler', component: BalanceComponent, canActivate: [AuthGuard], title: 'Bakiyeler' },
  { path: 'profil/acik-emirler', component: OpentransactionsComponent, canActivate: [AuthGuard], title: 'Açık Emirler' },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
