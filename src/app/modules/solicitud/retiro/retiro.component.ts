import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { CajaAhorroService } from '../../../services/cajaAhorro/cajaAhorro.service';
import { CajaAhorro } from '../../../interfaces/cajaAhorro';
import Swal from 'sweetalert2';
import { environment} from '../../../../environments/environment';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.scss']
})
export class RetiroComponent implements OnInit {

  public cajaAhorro: CajaAhorro = new CajaAhorro();

  advos: any;
  public nombre: string;
  public matricula: string;
  public adscripcion: string;

  cajaAhorros:CajaAhorro[];

  constructor( private _serv:ServiciosService, private _ca: CajaAhorroService ) { }

  ngOnInit(): void {

    this._ca.getCaja(sessionStorage.getItem('LoginBase'), 'RETIRO').subscribe(
      (cajaAhorros) => {
        this.cajaAhorros = cajaAhorros;
        //console.log(this.cajaAhorros);
      }
    )

    this._serv.getAdvo(Number(sessionStorage.getItem('LoginBase'))).subscribe(
      advos => {
        this.advos = advos;
        this.nombre = this.advos.pad_nombre;
        this.matricula = this.advos.pad_mat;
        this.adscripcion = this.advos.pad_adscripcion;
      },
      error => {
        console.log(error);
        Swal.fire({title: 'ERROR!!!',text: error.error.Message ,icon: 'error'});
      });
  }

  create(){
    //console.log(datos.form.value);
    this._ca.create(this.matricula, this.nombre, this.adscripcion, 'RETIRO', this.cajaAhorro).subscribe(cajaAhorro =>{
      this._ca.getCaja(sessionStorage.getItem('LoginBase'), 'RETIRO').subscribe(
        (cajaAhorros) => {
          this.cajaAhorros = cajaAhorros;
          //console.log(this.cajaAhorros);
        }
      )
      Swal.fire('Guardado', `Solicitud de Retiro Parcial enviada con éxito!`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }

  reporte(id:number,tipo:number){

    window.open(`${environment.rutaAPI}` + '/ReporPrestamos?id='
    + id
    + '&tipo=' + tipo
    );
      }

}
