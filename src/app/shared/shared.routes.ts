
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AudiotecaComponent } from './audioteca/audioteca.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticias/noticia/noticia.component';
import { NoticiasallComponent } from './noticias/noticiasall/noticiasall.component';
import { ConcursoplazasComponent } from '../modules/concursoplazas/concursoplazas.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { LoginbaseComponent } from './loginbase/loginbase.component';
import { VideosFLComponent } from './videos-fl/videos-fl.component';
import { NGaleriaComponent } from './n-galeria/n-galeria.component';
import { VnGaleriaComponent } from './n-galeria/vn-galeria/vn-galeria.component';


const sharedRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'audioteca', component: AudiotecaComponent },
  { path: 'adminLogin', component: LoginComponent},
  { path: 'noticias', component: NoticiasComponent},
  { path: 'noticia', component: NoticiaComponent},
  { path: 'noticiasall', component: NoticiasallComponent},
  { path: 'noticia/:id', component: NoticiaComponent},
  { path: 'concursoplazas', component: ConcursoplazasComponent},
  { path: 'loginbase', component: LoginbaseComponent},
  { path: 'videosFL', component: VideosFLComponent },
  { path: 'n_galeria', component: NGaleriaComponent },
  { path: 'vn_galeria', component: VnGaleriaComponent },
  { path: 'vn_galeria/:id', component: VnGaleriaComponent }
  //{ path: '**', pathMatch: 'full', redirectTo: '' }
];

//export const SHARED_ROUTES = RouterModule.forChild(sharedRoutes);
export const SHARED_ROUTES = RouterModule.forRoot(sharedRoutes, {useHash: true});
