import { Component, OnInit, ViewChild } from '@angular/core';
import { Galeria } from '../../interfaces/galeria';
import { GaleriaService } from '../../services/dasboard/galeria.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-adm-galeria',
  templateUrl: './adm-galeria.component.html',
  styleUrls: ['./adm-galeria.component.css']
})
export class AdmGaleriaComponent implements OnInit {

  public urlEndPoint: string = `${environment.rutaAPI}`;
  public galeria: Galeria = new Galeria();
  galerias:Galeria[];

  constructor( public router: Router, private http: HttpClient, private _gs: GaleriaService ) { }

  ngOnInit(): void {

    this._gs.getGalerias().subscribe(
      (galerias) => {
        this.galerias = galerias;
        //console.log(this.publicaciones);
      }
    )

  }

  cargarPublicacion(id:number): void{
    if(id){
      this._gs.getGaleria(id).subscribe( (galeria) => {
        this.galeria = galeria;
        //console.log(this.publicacion);
      })
    }
  }

  create(){
    const Usuario = sessionStorage.Login.replace("_", "");
    this._gs.create(this.galeria,Usuario).subscribe(galeria =>{
      this._gs.getGalerias().subscribe(
        (galerias) => {
          this.galerias = galerias;
          //console.log(this.publicaciones);
        }
      )
      Swal.fire('Guardado', `Galería ${galeria.gal_titulo} creada con éxito!`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }

  update(){
    const Usuario = sessionStorage.Login.replace("_", "");
    this._gs.update(this.galeria, Usuario).subscribe(usr =>{
      this._gs.getGalerias().subscribe(
        (galerias) => {
          this.galerias = galerias;
          //console.log(this.publicaciones);
        }
      )
        Swal.fire('Actualizada', 'Galería actualizada con exito', 'success');
    },
    error => {
      //console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }

  delete(galeria){
    this._gs.delete(galeria.gal_id).subscribe(
      response => {
        this._gs.getGalerias().subscribe(
          (galerias) => {
            this.galerias = galerias;
            //console.log(this.publicaciones);
          }
        )
        Swal.fire('Eliminada!',`Galería ${response.gal_titulo} eliminada con éxito.`,'success')
      },
      error => {
        console.log(error);
        Swal.fire({
          title: 'ERROR!!!',
          text: error.message,
          icon: 'error'});
      });
  }

}
