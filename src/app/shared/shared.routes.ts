
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AudiotecaComponent } from './audioteca/audioteca.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticias/noticia/noticia.component';
import { ConcursoplazasComponent } from '../modules/concursoplazas/concursoplazas.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { LoginbaseComponent } from './loginbase/loginbase.component';


const sharedRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'audioteca', component: AudiotecaComponent },
  { path: 'adminLogin', component: LoginComponent},
  { path: 'noticias', component: NoticiasComponent},
  { path: 'noticia', component: NoticiaComponent},
  { path: 'noticia/:id', component: NoticiaComponent},
  { path: 'concursoplazas', component: ConcursoplazasComponent},
  { path: 'loginbase', component: LoginbaseComponent}
  //{ path: '**', pathMatch: 'full', redirectTo: '' }
];

//export const SHARED_ROUTES = RouterModule.forChild(sharedRoutes);
export const SHARED_ROUTES = RouterModule.forRoot(sharedRoutes, {useHash: true});
