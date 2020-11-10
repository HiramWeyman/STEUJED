import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { CajaAhorroService } from '../../../services/cajaAhorro/cajaAhorro.service';
import { Revolvente } from '../../../interfaces/revolvente';
import { environment} from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-revolvente',
  templateUrl: './adm-revolvente.component.html',
  styleUrls: ['./adm-revolvente.component.scss']
})
export class AdmRevolventeComponent implements OnInit {

  revolventes:Revolvente[];

  constructor( private _serv:ServiciosService, private _ca: CajaAhorroService ) { }

  ngOnInit(): void {
    this._ca.getRevolventes().subscribe(
      (revolventes) => {
        this.revolventes = revolventes;
        //console.log(this.revolventes);
      }
    )
  }

  update(valorSelect,ID){
    this._ca.updateRevolvente(valorSelect,ID).subscribe(usr =>{
      this._ca.getRevolventes().subscribe(
        (revolventes) => {
          this.revolventes = revolventes;
        }
      )
        Swal.fire('Actualizado', 'Registro actualizado con exito', 'success');
    },
    error => {
      //console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }

  reporte(){

  }

}
