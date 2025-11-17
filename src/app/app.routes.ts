import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { SimulatorComponent } from './pages/simulator/simulator';
import { HelpComponent } from './pages/help/help';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'simulator', component: SimulatorComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' }
];

