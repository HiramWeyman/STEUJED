import { Component, OnInit } from '@angular/core';
import { Archivos } from '../../interfaces/archivos';
import { ArchivosService } from '../../services/dasboard/archivos.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archivos-compartidos',
  templateUrl: './archivos-compartidos.component.html',
  styleUrls: ['./archivos-compartidos.component.scss']
})
export class ArchivosCompartidosComponent implements OnInit {

  archivos:Archivos[];

  constructor(private _archivos:ArchivosService) { }

  ngOnInit(): void {

    this._archivos.getArchivos().subscribe(
      archivos => {
        this.archivos = archivos;
        //console.log(this.archivos);
      }
    ),
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    };

  }

  delete(arch: Archivos){
    this._archivos.delete(arch.archivo_id).subscribe(
      response => {
        this.archivos = this.archivos.filter(cli => cli !== arch)
        Swal.fire(
          'Eliminado!',
          `Archivo ${arch.archivo_descrip} eliminado con éxito.`,
          'success'
        )
      }
    )
  }

}
