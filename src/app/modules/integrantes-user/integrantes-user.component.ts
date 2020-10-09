import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Usuarios } from '../usuarios/usuarios';
import { Buscar } from '../usuarios//buscar';
import { Actividad } from '../usuarios//actividad';
import { Role } from '../usuarios/role';
import { IntegrantesUserService } from '../../services/dasboard/inegrentes-user.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import jsPDF from 'jspdf';
import { Perfil } from '../usuarios//perfil';

@Component({
  selector: 'app-integrantes-user',
  templateUrl: './integrantes-user.component.html',
  styleUrls: ['./integrantes-user.component.css']
})

export class IntegrantesUserComponent implements OnInit {
  public usuario: Usuarios = new Usuarios();
  public buscar: Buscar = new Buscar();
  usuarios: Usuarios[];
  perfil: Perfil[];
  actividad: Actividad[];
  role: Role[];
  nom: String;

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private integrantesService: IntegrantesUserService,
    public router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.blockUI.start();
    this.cargarUsers();
    this.cargarPerfil();
    this.cargarActividades();
    this.cargarRoles();
    this.blockUI.stop();
  }

  cargarUsers() {
    this.integrantesService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
      );
  }

 buscarNom(nombre: String) {
   if (nombre === '') {
    this.cargarUsers();
   } else {
    this.nom = nombre.toUpperCase();
    this.integrantesService.getUsuariosNombre(this.nom).subscribe(
      usuarios => this.usuarios = usuarios
      );
   }

  }

  buscaPerfil(id: number) {
   if (id > 0) {
    this.integrantesService.getUsuariosPerfil(id).subscribe(
      usuarios => this.usuarios = usuarios
      );
   } else {
    this.cargarUsers();
   }
  }

  buscaActividad(id: number) {
    if (id > 0) {
      this.integrantesService.getUsuariosActividad(id).subscribe(
        usuarios => this.usuarios = usuarios
        );
     } else {
      this.cargarUsers();
     }
   }

  LimpiarForm(form: NgForm) {
    form.resetForm(); // or form.reset();
}
  cargarUsuario(id: number): void {
    if (id) {
      this.integrantesService.getUsuario(id).subscribe( (usuario) => {
        this.usuario = usuario;
        usuario.password = '';
        // console.log(this.usuario);
      });
    }
  }

  cargarPerfil(): void {
    this.integrantesService.getPerfil().subscribe(
      (perfil) => this.perfil = perfil
    );
  }

  cargarActividades(): void {
    this.integrantesService.getAcividad().subscribe(
      (actividad) => this.actividad = actividad
    );
  }

  cargarRoles(): void {
    this.integrantesService.getRole().subscribe(
      (role) => this.role = role
    );
  }

  create(user: Usuarios): void {
    this.integrantesService.create(user).subscribe(usr => {
      this.router.navigate(['/integrantes-user']);
        Swal.fire('Nuevo usuario', `Usuario ${usr.nombre_completo} creado con éxito!`, 'success');
        this.cargarUsers();
    });

  }


  update(user: Usuarios): void {
    this.integrantesService.update(user).subscribe(usr => {
      this.router.navigate(['/integrantes-user']);
        Swal.fire('Usuario Actualizado', `Usuario Actualizado con éxito!`, 'success');
        this.cargarUsers();
    });
  }

  delete(user: Usuarios): void {
    this.integrantesService.delete(user).subscribe(
      response => {
        this.usuarios = this.usuarios.filter(cli => cli !== user);
        Swal.fire(
          'Usuario Eliminado!',
          `Usuario ${user.nombre_completo} eliminado con éxito.`,
          'success'
        );
      }
    );
  }


}
