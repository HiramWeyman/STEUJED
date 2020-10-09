import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Componentes
import { PagesComponent } from './pages.component';
import { UploadBannerComponent } from '../upload-banner/upload-banner.component';

import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    PagesComponent,
    UploadBannerComponent
  ],
  exports: [
    PagesComponent,
    UploadBannerComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatToolbarModule,
    AngularEditorModule
  ]
})

export class PagesModule { }
