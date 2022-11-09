import { Component, OnInit } from '@angular/core';
import { Fechas } from './fechas';
import { environment} from '../../../environments/environment';
import { Usuarios } from '../usuarios/usuarios';
import { UsuariosService } from '../../services/dasboard/usuarios.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  public fec: Fechas = new Fechas();
  usuarios: Usuarios[];
  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    console.log(this.fec);
    this.cargarUsers();
  }

  cargarUsers() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
      );
  }

  reporte(fechas: Fechas){

    if (fechas != null){

    /*   if(fechas.fecha2 === undefined){
        fechas.fecha2 = null;
      }
      else if(fechas.trabajador === undefined){
        fechas.fecha2 = null;
      } */
      window.open(`${environment.rutaAPI}` + '/Asistenciaeventuales?fecha1='
      + fechas.fecha1
      + '&fecha2=' + fechas.fecha2
      + '&trabajador=' + fechas.trabajador
      + '&tipo=' + fechas.valor);

      }
      fechas = null;
    }

    recibeValores(valor){
     // console.log(valor);
      this.fec.valor = valor;
    }

    recibeFecha(fecha){
     // console.log(fecha);
      this.fec.fecha2=fecha;
    }
  }

