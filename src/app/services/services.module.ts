import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MenuService } from './services.index';
import { UsuariosService } from './dasboard/usuarios.service';
import { LoginService } from './login/login.service';
import { LoginGuard } from './guards/login.guard';
import { ArchivosService } from './dasboard/archivos.services';
import { PublicacionesService } from './dasboard/publicaciones.service';
import { IntegrantesService } from './dasboard/integrantes.service';
import { ContactanosService } from './dasboard/contactanos.service';
import { SidebarService } from './dasboard/sidebar.service';
import { AudiotecaService } from './audios/audioteca.service';
import { CatPlazasService } from './dasboard/catplazas.service';
import { CatServiciosService } from './dasboard/catservicios.service';
import { ServiciosService } from './servicios/servicios.service';
import { DescargaService } from './descarga/descarga.service';
import { CajaAhorroService } from './cajaAhorro/cajaAhorro.service';
import { VideosFLService } from './videosfl/videosfl.service';
import { UpdatepassService } from './updatepass/updatepass.service';
import { UsuariosbaseService } from './usuariosbase/usuariosbase.service';
import { GaleriaService } from './dasboard/galeria.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    MenuService,
    UsuariosService,
    LoginService,
    LoginGuard,
    ArchivosService,
    PublicacionesService,
    IntegrantesService,
    ContactanosService,
    SidebarService,
    AudiotecaService,
    CatPlazasService,
    CatServiciosService,
    ServiciosService,
    DescargaService,
    CajaAhorroService,
    VideosFLService,
    UpdatepassService,
    UsuariosbaseService,
    GaleriaService
  ]
})
export class ServicesModule { }
