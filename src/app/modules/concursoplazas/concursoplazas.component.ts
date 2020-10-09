import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { CatPlazasService } from '../../services/dasboard/catplazas.service';
import { Advos } from '../../interfaces/advos';
import { CatPlazas } from '../../interfaces/catplazas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concursoplazas',
  templateUrl: './concursoplazas.component.html',
  styleUrls: ['./concursoplazas.component.css']
})
export class ConcursoplazasComponent implements OnInit {

  administrativos: Advos[];
  catplazas: CatPlazas[];

  constructor( private _serv:ServiciosService, private _cp: CatPlazasService ) { }

  ngOnInit(): void {
    //this.cargarConcursoPlazas();
    this.cargarCatPlazas();
  }

  cargarCatPlazas(){
    this._cp.getCatPlazas().subscribe(
      catplazas => {
        this.catplazas = catplazas;
        //console.log(this.catplazas);
      },error => {
        //console.log(error);
        Swal.fire({title: 'ERROR!!!',text: error.message,icon: 'error'});
      });
  }

  
  cargarConcursoPlazas(ids){
    this._serv.getAdministrativosCat(ids).subscribe(
      administrativos => {
        this.administrativos = administrativos;
        console.log(this.administrativos);
      },
      error => {
        //console.log(error);
        Swal.fire({title: 'ERROR!!!',text: error.message,icon: 'error'});
      });
  }
  
}
