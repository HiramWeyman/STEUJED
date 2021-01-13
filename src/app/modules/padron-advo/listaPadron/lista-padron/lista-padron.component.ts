import { Component, OnInit } from '@angular/core';
import { Padron } from '../../padron';
import { PadronService } from '../../../../services/dasboard/padron.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {Matnombre } from './busqueda';

@Component({
  selector: 'app-lista-padron',
  templateUrl: './lista-padron.component.html',
  styleUrls: ['./lista-padron.component.css']
})
export class ListaPadronComponent implements OnInit {
  usuarios: Padron[];
  public usuario: Padron = new Padron();
  registados:number;
  
  public busca: Matnombre = new Matnombre();
  user: any;
  constructor(private padronService: PadronService,public router: Router) { }

  ngOnInit(): void {
    this.cargarUsers();
    
  }

  cargarUsers() {
    this.padronService.getPadronAdvos().subscribe(
      usuarios => this.usuarios = usuarios
      );
     // console.log(this.usuarios);
  }
  cargarUsuario(matricula: string): void {
    if (matricula) {
      this.padronService.getUsuario(matricula).subscribe( (usuario) => {
        this.usuario = usuario;


         console.log(this.usuario);
      });
    }
  }


    update(user: Padron): void {
      this.padronService.update(user).subscribe(usr => {
        this.router.navigate(['/lista-padron']);
          Swal.fire('Usuario Actualizado', `Usuario Actualizado con éxito!`, 'success');
         
          this.usuario.pad_mat='' ;
          this.usuario.pad_nombre='' ;
          this.usuario.pad_adscripcion='' ;
          this.usuario.pad_categoria='' ;
          this.usuario.pad_sueldo='' ;
          this.usuario.pad_funcion='' ;
          this.usuario.pad_situacion='' ;
          this.usuario.pad_permanencia='' ;
          this.usuario.pad_f_ingreso='' ;
          this.usuario.pad_permisos='' ;
          this.usuario.pad_f_antig='';
          this.usuario.pad_n_insaluble='';
          this.usuario.pad_adscrip_base='' ;
          this.usuario.pad_catego_base='';
          this.usuario.pad_funcion_base='' ;
          this.usuario.pad_situacion_base='';
          this.usuario.pad_num_contacto='' ;
          this.usuario.pad_observaciones='' ;
          document.getElementById('cerrarmodal').click();
          this.cargarUsers();
      }); 
    }

    buscar(matnom:any,param:number){
      if(matnom){
        switch(param){
          case 1:
            this.padronService.getBuscaMat(matnom).subscribe(
            usuarios => this.usuarios = usuarios
            );
           break;
          case 2:
            this.padronService.getUsuariosNombre(matnom).subscribe(
            usuarios => this.usuarios = usuarios
            );
           break;
            }
    }
    else{
      this.cargarUsers();
    }
    }

}
