import { Component, OnInit } from '@angular/core';
import { CatServiciosService } from '../../../services/dasboard/catservicios.service';
import Swal from 'sweetalert2';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import { CatServicios } from '../../../interfaces/catservicios';

@Component({
  selector: 'app-cat-servicios',
  templateUrl: './cat-servicios.component.html',
  styleUrls: ['./cat-servicios.component.css']
})
export class CatServiciosComponent implements OnInit {

  catservicios: CatServicios[];
  public catservicio: CatServicios = new CatServicios();

  constructor( public router: Router, private http: HttpClient, private _cs:CatServiciosService ) { }

  ngOnInit(): void {

    this.cargarCatServicio();

  }

  cargarCatServicio(){
    this._cs.getCatServicios().subscribe(
      catservicios => {
        this.catservicios = catservicios;
        //console.log(this.catservicios);
      },
      error => {
        //console.log(error);
        Swal.fire({title: 'ERROR!!!',text: error.message,icon: 'error'});
      });
  }

  cargarServicio(id:number): void{
    if(id){
      this._cs.getCatServicio(id).subscribe( (catservicio) => {
        this.catservicio = catservicio;
        //console.log(this.plaza);
      })
    }
  }

  create(){
    this._cs.create(this.catservicio).subscribe(servicio => {
      this.router.navigate(['/catservicios']);
        Swal.fire('Nuevo Servicio', `Servicio ${servicio.cats_descrip} creado con éxito!`, 'success');
        this.cargarCatServicio();
    },
    error => {
      //console.log(error);
      Swal.fire({title: 'ERROR!!!',text: error.message,icon: 'error'});
    });
  }

  update(){
    this._cs.update(this.catservicio).subscribe(usr =>{
      this.router.navigate(['/catservicios']);
      Swal.fire('Actualizada', 'Servicio actualizado con exito', 'success');
      this.cargarCatServicio();
    },
    error => {
      //console.log(error);
      Swal.fire({title: 'ERROR!!!',text: error.message,icon: 'error'});
    });
  }

  delete(id: Number){
    this._cs.delete(id).subscribe(
      servicio => {
        this.router.navigate(['/catservicios']);
        Swal.fire('Servicio Eliminada!',`Servicio ${servicio.cats_descrip} eliminado con éxito.`,'success');
        this.cargarCatServicio();
      },
      error => {
        //console.log(error);
        Swal.fire({title: 'ERROR!!!',text: error.message,icon: 'error'});
      });
  }

}
