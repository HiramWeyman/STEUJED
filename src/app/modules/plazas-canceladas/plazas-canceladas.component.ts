import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { CatPlazasService } from '../../services/dasboard/catplazas.service';
import { Advos } from '../../interfaces/advos';
import { CatPlazas } from '../../interfaces/catplazas';
import Swal from 'sweetalert2';
import { environment} from '../../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-plazas-canceladas',
  templateUrl: './plazas-canceladas.component.html',
  styleUrls: ['./plazas-canceladas.component.css']
})
export class PlazasCanceladasComponent implements OnInit {
  administrativos: Advos[];
  catplazas: CatPlazas[];
  idglobal: number;

  constructor(private _serv:ServiciosService, private _cp: CatPlazasService,public router: Router ) { }

  ngOnInit(): void {
    this.cargarCatPlazasAdmin();
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
    this._serv.getAdministrativosCatCancel(ids).subscribe(
      administrativos => {
        this.administrativos = administrativos;
        //console.log(this.administrativos);
      },
      error => {
        //console.log(error);
        Swal.fire({title: 'ERROR!!!',text: error.message,icon: 'error'});
      });
      this.idglobal = ids;
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
      title: 'Esta seguro que quiere restablecer la solicitud?',
      text: "Tu solicitud ya no estara cancelada!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, restablecer solicitud!',
      cancelButtonText: 'No, dejar cancelada la solicitud!',
      reverseButtons: true
    }).then((result) => {
      if (result) {
        this._serv.updateRestablece(advo).subscribe(usr => {
          this.router.navigate(['/plazas-canceladas']);
          swalWithBootstrapButtons.fire(
            'CanceRestablecida!',
            'Su solcitud ha sido restablecida.',
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
          'Tu solicitud seguira cancelada',
          'error'
        );
      }
    });
  }
}
