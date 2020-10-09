
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/shared/home/home.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
