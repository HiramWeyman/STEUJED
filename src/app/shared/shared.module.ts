import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';

//audio
import { NgxAudioPlayerModule } from 'ngx-audio-player';

import { FooterComponent } from './footer/footer.component';
import { AudiotecaComponent } from './audioteca/audioteca.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SliderComponent } from './slider/slider.component';
import { SHARED_ROUTES } from './shared.routes';
import { HomeComponent } from './home/home.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar/';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { PieComponent } from './pie/pie.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { PAGES_ROUTES } from '../modules/pages/pages.routes';
import { MatExpansionModule } from '@angular/material/expansion';
import { IntegrantesComponent } from './integrantes/integrantes.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticias/noticia/noticia.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { LoginbaseComponent } from './loginbase/loginbase.component';
import { VideosFLComponent } from './videos-fl/videos-fl.component';
import { NGaleriaComponent } from './n-galeria/n-galeria.component';
import { VnGaleriaComponent } from './n-galeria/vn-galeria/vn-galeria.component';
import { NoticiasallComponent } from './noticias/noticiasall/noticiasall.component';

@NgModule({
  declarations: [
    FooterComponent,
    AudiotecaComponent,
    CopyrightComponent,
    HeaderComponent,
    LoginComponent,
    SliderComponent,
    HomeComponent,
    EncabezadoComponent,
    PieComponent,
    SidebarComponent,
    IntegrantesComponent,
    NoticiasComponent,
    NoticiaComponent,
    TopbarComponent,
    ServiciosComponent,
    LoginbaseComponent,
    VideosFLComponent,
    NGaleriaComponent,
    VnGaleriaComponent,
    NoticiasallComponent
  ],
  exports:[
    EncabezadoComponent,
    PieComponent,
    SidebarComponent
  ],
  imports: [
    SHARED_ROUTES,
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxAudioPlayerModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    PAGES_ROUTES,
    MatExpansionModule,
    NgxPaginationModule
  ],
  bootstrap: [HomeComponent]
})
export class SharedModule { }
