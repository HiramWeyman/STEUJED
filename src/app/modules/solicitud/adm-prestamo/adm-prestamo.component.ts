import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { CajaAhorroService } from '../../../services/cajaAhorro/cajaAhorro.service';
import { CajaAhorro } from '../../../interfaces/cajaAhorro';
import { environment} from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-prestamo',
  templateUrl: './adm-prestamo.component.html',
  styleUrls: ['./adm-prestamo.component.scss']
})
export class AdmPrestamoComponent implements OnInit {

  @ViewChild('closeModal') private closeModal: ElementRef;

  public cajaAhorro: CajaAhorro = new CajaAhorro();

  advos: any;
  public nombre: string;
  public matricula: string;
  public adscripcion: string;

  cajaAhorros:CajaAhorro[];

  constructor( private _serv:ServiciosService, private _ca: CajaAhorroService ) { }

  ngOnInit(): void {

    
    this._ca.getCajaTipo('PRESTAMO').subscribe(
      (cajaAhorros) => {
        this.cajaAhorros = cajaAhorros;
        //console.log(this.cajaAhorros);
      }
    )

    console.log(sessionStorage.getItem('LoginBase'));

  }

  create(){
    //console.log(datos.form.value);
    this._ca.create(this.matricula, this.nombre, this.adscripcion, 'PRESTAMO', this.cajaAhorro).subscribe(cajaAhorro =>{
      this._ca.getCaja(sessionStorage.getItem('LoginBase'), 'PRESTAMO').subscribe(
        (cajaAhorros) => {
          this.cajaAhorros = cajaAhorros;
        }
      )
      Swal.fire('Guardado', `Solicitud de Prestamo enviada con éxito!`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }

  update(valorSelect,ID){
    this._ca.update(valorSelect,ID).subscribe(usr =>{
      this._ca.getCajaTipo('PRESTAMO').subscribe(
        (cajaAhorros) => {
          this.cajaAhorros = cajaAhorros;
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


  reporte(id:number,tipo:number){

    window.open(`${environment.rutaAPI}` + '/ReporPrestamos?id='
    + id
    + '&tipo=' + tipo
    );
      }

}
