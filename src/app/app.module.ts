import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// rutas
import { APP_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { PagesModule } from '../app/modules/pages/pages.module';
import { SharedModule } from './shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';

// servicios
import { ServicesModule } from './services/services.module';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';
import { MenuComponent } from './modules/menu/menu.component';
import { MenuFormComponent } from './modules/menu/menu-form/menu-form.component';
import { ArchivosComponent } from './modules/archivos/archivos.component';
import { ArchivosFormComponent } from './modules/archivos/archivos-form/archivos-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PrincipalComponent } from './modules/publicaciones/principal/principal.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { IntegrantesComponent } from './modules/integrantes/integrantes.component';
import { NotasComponent } from './modules/publicaciones/notas/notas.component';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { NotificacionComponent } from './modules/publicaciones/notificacion/notificacion.component';
import { CatActividadComponent } from './modules/catalogos/cat-actividad/cat-actividad.component';
import { CatPerfilComponent } from './modules/catalogos/cat-perfil/cat-perfil.component';
import { ContactanosComponent } from './modules/contactanos/contactanos.component';
import { ArchivosCompartidosComponent } from './modules/archivos-compartidos/archivos-compartidos.component';
import { ArccompFormComponent } from './modules/archivos-compartidos/arccomp-form/arccomp-form.component';
import { IntegrantesUserComponent } from './modules/integrantes-user/integrantes-user.component';
import { AudiosComponent } from './modules/audios/audios.component';
//import pdfFonts from 'pdfmake/build/vfs_fonts'; // fonts provided for pdfmake
import { AngularFileUploaderModule } from "angular-file-uploader";
import { CatPlazasComponent } from './modules/catalogos/cat-plazas/cat-plazas.component';
import { ConcursoplazasComponent } from './modules/concursoplazas/concursoplazas.component';
import { CatServiciosComponent } from './modules/catalogos/cat-servicios/cat-servicios.component';
import { PadronAdvoComponent } from './modules/padron-advo/padron-advo.component';
import { GaleriaComponent } from './modules/publicaciones/notas/galeria/galeria.component';
import { VergaleriaComponent } from './modules/publicaciones/notas/vergaleria/vergaleria.component';
import { AsistenciaComponent } from './modules/asistencia/asistencia.component';
import { DescarchivosComponent } from './modules/descarchivos/descarchivos.component';
import { PrestamoComponent } from './modules/solicitud/prestamo/prestamo.component';
import { RetiroComponent } from './modules/solicitud/retiro/retiro.component';
import { AdmRetiroComponent } from './modules/solicitud/adm-retiro/adm-retiro.component';
import { AdmPrestamoComponent } from './modules/solicitud/adm-prestamo/adm-prestamo.component';
import { ReimpresionsolComponent } from '../app/modules/reimpresionsol/reimpresionsol.component';

// Set the fonts to use

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    MenuComponent,
    MenuFormComponent,
    ArchivosComponent,
    ArchivosFormComponent,
    PrincipalComponent,
    IntegrantesComponent,
    NotasComponent,
    NotificacionComponent,
    CatActividadComponent,
    CatPerfilComponent,
    ContactanosComponent,
    ArchivosCompartidosComponent,
    ArccompFormComponent,
    IntegrantesUserComponent,
    AudiosComponent,
    CatPlazasComponent,
    ConcursoplazasComponent,
    CatServiciosComponent,
    PadronAdvoComponent,
    GaleriaComponent,
    VergaleriaComponent,
    DescarchivosComponent,
    PrestamoComponent,
    RetiroComponent,
    AdmRetiroComponent,
    AdmPrestamoComponent,
    AsistenciaComponent,
    DescarchivosComponent,
    ReimpresionsolComponent
  ],
  imports: [
    APP_ROUTING,
    PagesModule,
    SharedModule,
    BrowserModule,
    ServicesModule,
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    AngularEditorModule,
    NgxPaginationModule,
    AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
