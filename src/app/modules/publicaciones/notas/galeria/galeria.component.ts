import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  afuConfig:any;

  constructor( private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      this.afuConfig = {
        multiple: true,
        formatsAllowed: ".jpg,.jpeg",
        maxSize: "10",
        uploadAPI:  {
          url:`${environment.rutaAPI}/UploadImagenes/`+id,
          method:"POST"
        },
        hideResetBtn: true,
        theme: "dragNDrop",
        replaceTexts: {
          selectFileBtn: 'Seleccionar archivo(s)',
          uploadBtn: 'Subir Imagenes',
          dragNDropBox: 'Drag N Drop',
          attachPinBtn: 'Adjuntar archivos...',
          afterUploadMsg_success: 'Cargado correctamente !',
          afterUploadMsg_error: 'Subida fallida !',
          sizeLimit: 'Límite de tamaño'
        }
      };
    })
  }

}
