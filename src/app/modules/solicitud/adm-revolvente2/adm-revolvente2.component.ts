import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { CajaAhorroService } from '../../../services/cajaAhorro/cajaAhorro.service';
import { CajaAhorro } from '../../../interfaces/cajaAhorro';
import { Buscaprestamo } from '../../../interfaces/buscaprestamo';
import { environment} from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-revolvente2',
  templateUrl: './adm-revolvente2.component.html',
  styleUrls: ['./adm-revolvente2.component.scss']
})
export class AdmRevolvente2Component implements OnInit {

  @ViewChild('closeModal') private closeModal: ElementRef;

  public cajaAhorro: CajaAhorro = new CajaAhorro();
  public busca: Buscaprestamo = new Buscaprestamo();
  advos: any;
  public nombre: string;
  public matricula: string;
  public adscripcion: string;

  cajaAhorros:CajaAhorro[];

  constructor( private _serv:ServiciosService, private _ca: CajaAhorroService ) { }

  ngOnInit(): void {

    
    this._ca.getCajaTipo('REVOLVENTE').subscribe(
      (cajaAhorros) => {
        this.cajaAhorros = cajaAhorros;
        //console.log(this.cajaAhorros);
      }
    )

    //console.log(sessionStorage.getItem('LoginBase'));

  }

  create(){
    //console.log(datos.form.value);
    this._ca.create(this.matricula, this.nombre, this.adscripcion, 'REVOLVENTE', this.cajaAhorro).subscribe(cajaAhorro =>{
      this._ca.getCaja(sessionStorage.getItem('LoginBase'), 'REVOLVENTE').subscribe(
        (cajaAhorros) => {
          this.cajaAhorros = cajaAhorros;
        }
      )
      Swal.fire('Guardado', `Solicitud rEVOLVENTE enviada con éxito!`, 'success');
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
      this._ca.getCajaTipo('REVOLVENTE').subscribe(
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


      buscar(matnom:any,param:number){
        if(matnom){
          console.log(matnom);
          switch(param){
            case 1:
              if(this.busca.matricula){
                this._ca.getBuscaMatRev(matnom).subscribe(
                  usuarios => this.cajaAhorros = usuarios
                  );
              }
              else{
                this._ca.getCajaTipo('REVOLVENTE').subscribe(
                  (cajaAhorros) => {
                    this.cajaAhorros = cajaAhorros;
                    //console.log(this.cajaAhorros);
                  }
                )
              }
             break;
            case 2:
              if(this.busca.matricula2){
                this._ca.getBuscaMatEstatusRev(matnom).subscribe(
                  usuarios => this.cajaAhorros = usuarios
                  );
              }
              else{
                this._ca.getCajaTipo('REVOLVENTE').subscribe(
                  (cajaAhorros) => {
                    this.cajaAhorros = cajaAhorros;
                    //console.log(this.cajaAhorros);
                  }
                )
              }
            
             break;
              }
      }
      
      else{
        this._ca.getCajaTipo('REVOLVENTE').subscribe(
          (cajaAhorros) => {
            this.cajaAhorros = cajaAhorros;
            //console.log(this.cajaAhorros);
          }
        )
      }
      }

}
