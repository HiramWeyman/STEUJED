import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { InicioComponent } from '../inicio/inicio.component';
import { PostsComponent } from '../posts/posts.component';
import { UsuariosComponent} from '../usuarios/usuarios.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuFormComponent } from '../menu/menu-form/menu-form.component';
import { LoginGuard } from '../../services/guards/login.guard';
import { UploadBannerComponent } from '../upload-banner/upload-banner.component';
import { ArchivosComponent } from '../archivos/archivos.component';
import { ArchivosFormComponent } from '../archivos/archivos-form/archivos-form.component';
import { PrincipalComponent } from '../publicaciones/principal/principal.component';
import { IntegrantesComponent } from '../integrantes/integrantes.component';
import { NotasComponent } from '../publicaciones/notas/notas.component';
import { NotificacionComponent } from '../publicaciones/notificacion/notificacion.component';
import { CatActividadComponent } from '../catalogos/cat-actividad/cat-actividad.component';
import { CatPerfilComponent } from '../catalogos/cat-perfil/cat-perfil.component';
import { ContactanosComponent } from '../contactanos/contactanos.component';
import { ArchivosCompartidosComponent } from '../archivos-compartidos/archivos-compartidos.component';
import { ArccompFormComponent } from '../archivos-compartidos/arccomp-form/arccomp-form.component';
import { IntegrantesUserComponent } from '../integrantes-user/integrantes-user.component';
import { AudiosComponent } from '../audios/audios.component';
import { CatPlazasComponent } from '../catalogos/cat-plazas/cat-plazas.component';
import { CatServiciosComponent } from '../catalogos/cat-servicios/cat-servicios.component';
import { ConcursoplazasComponent } from '../concursoplazas/concursoplazas.component';
import { PadronAdvoComponent } from '../padron-advo/padron-advo.component';
import { ServiciosComponent } from '../../shared/servicios/servicios.component';
import { GaleriaComponent } from '../publicaciones/notas/galeria/galeria.component';
import { VergaleriaComponent } from '../publicaciones/notas/vergaleria/vergaleria.component';
import { AsistenciaComponent } from '../asistencia/asistencia.component';
import { DescarchivosComponent } from '../descarchivos/descarchivos.component';
import { PrestamoComponent } from '../solicitud/prestamo/prestamo.component';
import { RetiroComponent } from '../solicitud/retiro/retiro.component';
import { AdmPrestamoComponent } from '../solicitud/adm-prestamo/adm-prestamo.component';
import { AdmRetiroComponent } from '../solicitud/adm-retiro/adm-retiro.component';
import { ReimpresionsolComponent } from '../reimpresionsol/reimpresionsol.component';
import { AdmVideosflComponent } from '../publicaciones/adm-videosfl/adm-videosfl.component';
import { RevolventeComponent } from '../solicitud/revolvente/revolvente.component';
import { AdmRevolventeComponent } from '../solicitud/adm-revolvente/adm-revolvente.component';
import { CambiapasswordComponent } from '../solicitud/cambiapassword/cambiapassword.component';
import { ActualizaDatosComponent } from '../solicitud/actualiza-datos/actualiza-datos.component';
import { UsuariosbaseComponent } from '../usuariosbase/usuariosbase.component';
import { AdmGaleriaComponent } from '../adm-galeria/adm-galeria.component';
import { VGaleriaComponent } from '../adm-galeria/v-galeria/v-galeria.component';
import { EGaleriaComponent } from '../adm-galeria/e-galeria/e-galeria.component';
import { NotasformComponent } from '../publicaciones/notas/notasform/notasform.component';
import { PlazasCanceladasComponent } from '../plazas-canceladas/plazas-canceladas.component';
import { ListaPadronComponent } from '../padron-advo/listaPadron/lista-padron/lista-padron.component';
import { Revolvente2Component } from '../solicitud/revolvente2/revolvente2.component';
import { AdmRevolvente2Component } from '../solicitud/adm-revolvente2/adm-revolvente2.component';


const pagesRoutes: Routes = [
	{
		path: '',
		component: PagesComponent,
		canActivate: [ LoginGuard ],
		children: [
			{ path: 'inicio', component: InicioComponent },
			{ path: 'posts', component: PostsComponent },
			{ path: 'usuarios', component: UsuariosComponent },
			{ path: 'menu', component: MenuComponent },
			{ path: 'menu-form/:id', component: MenuFormComponent },
			{ path: 'uploadbanner', component: UploadBannerComponent },
			{ path: 'archivos', component: ArchivosComponent },
			{ path: 'archivos-form', component: ArchivosFormComponent },
			{ path: 'archivos-form/:id', component: ArchivosFormComponent },
			{ path: 'principal', component: PrincipalComponent },
			{ path: 'integrantes', component: IntegrantesComponent },
			{ path: 'notas', component: NotasComponent },
			{ path: 'notasform/:id', component: NotasformComponent },
			{ path: 'galeria/:id', component: GaleriaComponent },
			{ path: 'vergaleria/:id', component: VergaleriaComponent },
			{ path: 'notificacion', component: NotificacionComponent },
			{ path: 'actividades', component: CatActividadComponent },
			{ path: 'perfil', component: CatPerfilComponent },
			{ path: 'contactanos', component: ContactanosComponent },
			{ path: 'archivoscompartidos', component: ArchivosCompartidosComponent },
			{ path: 'arccomp-form', component: ArccompFormComponent },
			{ path: 'arccomp-form/:id', component: ArccompFormComponent },
			{ path: 'integrantes-user', component: IntegrantesUserComponent },
			{ path: 'audios', component: AudiosComponent },
			{ path: 'catplazas', component: CatPlazasComponent },
			{ path: 'catservicios', component: CatServiciosComponent },
			{ path: 'concursopla', component: ConcursoplazasComponent },
			{ path: 'padron-advo', component: PadronAdvoComponent },
			{ path: 'servicios', component: ServiciosComponent },
			{ path: 'asistencia', component: AsistenciaComponent },
			{ path: 'descarchivos', component: DescarchivosComponent },
			{ path: 'prestamo', component: PrestamoComponent },
			{ path: 'retiro', component: RetiroComponent },
			{ path: 'AdmPrestamo', component: AdmPrestamoComponent },
			{ path: 'AdmRetiro', component: AdmRetiroComponent },
			{ path: 'reimpresionsol', component: ReimpresionsolComponent  },
			{ path: 'admvideosfl', component: AdmVideosflComponent  },
			{ path: 'revolvente', component: RevolventeComponent  },
			{ path: 'AdmRevolvente', component: AdmRevolventeComponent  },
			{ path: 'revolvente2', component: Revolvente2Component  },
			{ path: 'AdmRevolvente2', component: AdmRevolvente2Component  },
			{ path: 'cambiapassword', component: CambiapasswordComponent  },
			{ path: 'actualiza-datos', component: ActualizaDatosComponent  },
			{ path: 'usuariosbase', component: UsuariosbaseComponent  },
			{ path: 'adm-galeria', component: AdmGaleriaComponent  },
			{ path: 'v_galeria/:id', component: VGaleriaComponent  },
			{ path: 'e_galeria/:id', component: EGaleriaComponent  },
			{ path: 'plazas-canceladas', component: PlazasCanceladasComponent  },
			{path:'lista-padron',component:ListaPadronComponent},
			
		]
	}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
