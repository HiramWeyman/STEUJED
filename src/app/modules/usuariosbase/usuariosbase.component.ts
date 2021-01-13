import { Component, OnInit } from '@angular/core';
import { UsuariosbaseService } from '../../services/usuariosbase/usuariosbase.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Usuariosbase } from '../usuariosbase/usuariosbase';
import {Matnom } from '../usuariosbase/busqueda';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuariosbase',
  templateUrl: './usuariosbase.component.html',
  styleUrls: ['./usuariosbase.component.css']
})
export class UsuariosbaseComponent implements OnInit {
  usuarios: Usuariosbase[];
  public x: Usuariosbase = new Usuariosbase();
  public busca: Matnom = new Matnom();
  user: any;
  constructor(
    private usuarioService: UsuariosbaseService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.cargarUsers();
  }

  cargarUsers() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
      );
     // console.log(this.usuarios);
  }

  cargarUsuario(matricula: string){
  if (matricula) {
    this.usuarioService.obtener(matricula).subscribe( (usuario) => {
      this.user = usuario;
      for (const numero of this.user){
        this.x.ub_user = numero.ub_user;
        this.x.ub_nombre = numero.ub_nombre;
        this.x.ub_curp = numero.ub_curp;
        this.x.ub_rfc = numero.ub_rfc;
        this.x.ub_password = '';
        //console.log(numero);
      }
      // console.log(this.user);
    });
  }
  }

  update(user: Usuariosbase): void {
    this.usuarioService.update(user).subscribe(usr => {
      this.router.navigate(['/usuariosbase']);
        Swal.fire('Usuario Actualizado', `Usuario Actualizado con éxito!`, 'success');
        this.x.ub_user = '';
        this.x.ub_user = '';
        this.x.ub_nombre = '';
        this.x.ub_curp = '';
        this.x.ub_rfc = '';
        this.x.ub_password = '';
        document.getElementById('cerrarmodal').click();
        this.cargarUsers();
    }); 
  }

buscar(matnom:any,param:number){
  if(matnom){
    switch(param){
      case 1:
        this.usuarioService.getBuscaMat(matnom).subscribe(
        usuarios => this.usuarios = usuarios
        );
       break;
      case 2:
        this.usuarioService.getUsuariosNombre(matnom).subscribe(
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
