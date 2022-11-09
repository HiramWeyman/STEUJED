import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { CatPlazasService } from '../../services/dasboard/catplazas.service';
import { Advos } from '../../interfaces/advos';
import { admplaza } from '../../interfaces/admplaza';
import { CatPlazas } from '../../interfaces/catplazas';
import Swal from 'sweetalert2';
import { environment} from '../../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';
import { IntegrantesUserComponent } from '../integrantes-user/integrantes-user.component';

@Component({
  selector: 'app-concursoplazas',
  templateUrl: './concursoplazas.component.html',
  styleUrls: ['./concursoplazas.component.css']
})
export class ConcursoplazasComponent implements OnInit {

  /* administrativos: admplaza[]; */
  administrativos: any;
  catplazas: CatPlazas[];
  idglobal: number;
  valplaza:string;
  count:number;
  comentarios:string;
  ids:number;

  constructor( private _serv:ServiciosService, private _cp: CatPlazasService,public router: Router ) { }

  ngOnInit(): void {
    //this.cargarConcursoPlazas();
   // this.cargarCatPlazas();
    this.cargarCatPlazasAdmin();
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

  cargarCatPlazasAdmin(){
    this._cp.getCatPlazasAdmin().subscribe(
      catplazas => {
        this.catplazas = catplazas;
       // console.log(this.catplazas);
      },error => {
        //console.log(error);
        Swal.fire({title: 'ERROR!!!',text: error.message,icon: 'error'});
      });
  }


  cargarConcursoPlazas(ids){
    this.valplaza=ids;
    console.log(this.valplaza);
    this._serv.getAdministrativosCat(ids).subscribe(
      administrativos => {
        this.administrativos = administrativos;
        console.log(this.administrativos);
        this.count=this.administrativos.length;
        console.log(this.count);
      },
      error => {
        //console.log(error);
        Swal.fire({title: 'ERROR!!!',text: error.message,icon: 'error'});
      });
      this.idglobal = ids;
  }

  reporte(id: number){

    window.open(`${environment.rutaAPI}` + '/ReimpresionSol?id='
    + id

    );
  }

/*   Promovido(id: number,matricula:string,indice:number){
    alert(id);
    alert(matricula);
    alert(indice);
    alert(this.valplaza);
  } */

  Promovido(id: number,parametro:number): void {
    this._serv.updatePromovido(id,parametro).subscribe(estatus => {
        Swal.fire('Estatus Actualizado', `Estatus de Solicitud Actualizado con éxito!`, 'success');
        this.cargarConcursoPlazas(this.valplaza);
    });
  }

  Comentarios(id: number,comets:string){
   this.ids=id;
   this.comentarios=comets;
  }

  GuardarComentarios(id:number,comentario:string){
     //alert(id);
     //alert(comentario);
     this._serv.updateComentarios(id,comentario).subscribe(estatus => {
      Swal.fire('Comentario Actualizado', `Comentario de Solicitud Actualizado con éxito!`, 'success');
      this.cargarConcursoPlazas(this.valplaza);
  });
  }

  ExportarExcel(){
    
    window.open("https://api.steujed.org.mx/api/SolExcel/"+ this.valplaza

    );
  }

  CancelarSol(advo: Advos){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro que quiere cancelar la solicitud?',
      text: "Tu solicitud ya no estara disponible para su tramite!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, cancelar solicitud!',
      cancelButtonText: 'No cancelar la solicitud!',
      reverseButtons: true
    }).then((result) => {
      if (result) {
        this._serv.update(advo).subscribe(usr => {
          this.router.navigate(['/concursopla']);
          swalWithBootstrapButtons.fire(
            'Cancelado!',
            'Su solcitud ha sido cancelada.',
            'success'
          );
          this.cargarConcursoPlazas(this.idglobal);
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Opreracion cancelada',
          'Tu solicitud esta disponible :)',
          'error'
        );
      }
    });


/*     this.usuarioService.update(user).subscribe(usr => {
      this.router.navigate(['/usuarios']);
        Swal.fire('Solicitud Cancelada', `Usuario Actualizado con éxito!`, 'success');
        this.cargarUsers();
    }); */
  }

  
}
