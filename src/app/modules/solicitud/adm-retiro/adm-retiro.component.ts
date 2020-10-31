import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { CajaAhorroService } from '../../../services/cajaAhorro/cajaAhorro.service';
import { CajaAhorro } from '../../../interfaces/cajaAhorro';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-retiro',
  templateUrl: './adm-retiro.component.html',
  styleUrls: ['./adm-retiro.component.scss']
})
export class AdmRetiroComponent implements OnInit {

  @ViewChild('closeModal') private closeModal: ElementRef;

  public cajaAhorro: CajaAhorro = new CajaAhorro();

  advos: any;
  public nombre: string;
  public matricula: string;
  public adscripcion: string;

  cajaAhorros:CajaAhorro[];

  constructor( private _serv:ServiciosService, private _ca: CajaAhorroService ) { }

  ngOnInit(): void {

    this._ca.getCajaTipo('RETIRO').subscribe(
      (cajaAhorros) => {
        this.cajaAhorros = cajaAhorros;
        //console.log(this.cajaAhorros);
      }
    )

  }

  update(valorSelect,ID){
    this._ca.update(valorSelect,ID).subscribe(usr =>{
      this._ca.getCajaTipo('RETIRO').subscribe(
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

  /*
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
  */
}
