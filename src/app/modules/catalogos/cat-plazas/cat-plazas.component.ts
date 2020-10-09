import { Component, OnInit } from '@angular/core';
import { CatPlazasService } from '../../../services/dasboard/catplazas.service';
import Swal from 'sweetalert2';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import { CatPlazas } from '../../../interfaces/catplazas';

@Component({
  selector: 'app-cat-plazas',
  templateUrl: './cat-plazas.component.html',
  styleUrls: ['./cat-plazas.component.css']
})
export class CatPlazasComponent implements OnInit {

  catplazas: CatPlazas[];
  public catplaza: CatPlazas = new CatPlazas();

  constructor( public router: Router, private http: HttpClient, private _cp:CatPlazasService ) { }

  ngOnInit(): void {

    this.cargarCatPlazas();

  }

  cargarCatPlazas(){
    this._cp.getCatPlazas().subscribe(
      catplazas => {
        this.catplazas = catplazas;
        //console.log(this.catplazas);
      },
      error => {
        //console.log(error);
        Swal.fire({
          title: 'ERROR!!!',
          text: error.message,
          icon: 'error'});
      });
  }

  cargarPlaza(id:number): void{
    if(id){
      this._cp.getCatPlaza(id).subscribe( (catplaza) => {
        this.catplaza = catplaza;
        //console.log(this.plaza);
      })
    }
  }

  create(){
    this._cp.create(this.catplaza).subscribe(plaza => {
      this.router.navigate(['/catplazas']);
        Swal.fire('Nueva plaza', `Plaza ${plaza.catp_descrip} creada con éxito!`, 'success');
        this.cargarCatPlazas();
    },
    error => {
      //console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }

  update(){
    this._cp.update(this.catplaza).subscribe(usr =>{
      this.router.navigate(['/catplazas']);
      Swal.fire('Actualizada', 'Plaza actualizada con exito', 'success');
      this.cargarCatPlazas();
    },
    error => {
      //console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }

  delete(id: Number){
    this._cp.delete(id).subscribe(
      plaza => {
        this.router.navigate(['/catplazas']);
        Swal.fire('Plaza Eliminada!',`Plaza ${plaza.catp_descrip} eliminada con éxito.`,'success');
        this.cargarCatPlazas();
      },
      error => {
        //console.log(error);
        Swal.fire({
          title: 'ERROR!!!',
          text: error.message,
          icon: 'error'});
      });
  }

}
