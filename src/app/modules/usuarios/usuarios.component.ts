import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Usuarios } from './usuarios';
import { Buscar } from './buscar';
import { Actividad } from './actividad';
import { Role } from './role';
import { UsuariosService } from '../../services/dasboard/usuarios.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import jsPDF from 'jspdf';
import { Perfil } from './perfil';
import { environment} from '../../../environments/environment';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})


export class UsuariosComponent implements OnInit {
  public usuario: Usuarios = new Usuarios();
  public buscar: Buscar = new Buscar();
  usuarios: Usuarios[];
  perfil: Perfil[];
  actividad: Actividad[];
  role: Role[];
  nom: String;


  // modal : NgbModalRef;

  @BlockUI() blockUI: NgBlockUI;
  // @ViewChild('demoBasic') demoBasic: ModalDirective;

  constructor(
    private usuarioService: UsuariosService,
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
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
      );
  }

 buscarNom(nombre: String) {
   if (nombre === '') {
    this.cargarUsers();
   } else {
    this.nom = nombre.toUpperCase();
    this.usuarioService.getUsuariosNombre(this.nom).subscribe(
      usuarios => this.usuarios = usuarios
      );
   }

  }

  buscaPerfil(id: number) {
   if (id > 0) {
    this.usuarioService.getUsuariosPerfil(id).subscribe(
      usuarios => this.usuarios = usuarios
      );
   } else {
    this.cargarUsers();
   }
  }

  buscaActividad(id: number) {
    if (id > 0) {
      this.usuarioService.getUsuariosActividad(id).subscribe(
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
      this.usuarioService.getUsuario(id).subscribe( (usuario) => {
        this.usuario = usuario;


        // console.log(this.usuario);
      });
    }
  }

  cargarPerfil(): void {
    this.usuarioService.getPerfil().subscribe(
      (perfil) => this.perfil = perfil
    );
  }

  cargarActividades(): void {
    this.usuarioService.getAcividad().subscribe(
      (actividad) => this.actividad = actividad
    );
  }

  cargarRoles(): void {
    this.usuarioService.getRole().subscribe(
      (role) => this.role = role
    );
  }

  create(user: Usuarios): void {
    this.usuarioService.create(user).subscribe(usr => {
      this.router.navigate(['/usuarios']);
        Swal.fire('Nuevo usuario', `Usuario ${usr.nombre_completo} creado con éxito!`, 'success');
        this.cargarUsers();
    });
  }

  update(user: Usuarios, form: NgForm): void {
    this.usuarioService.update(user).subscribe(usr => {
      this.router.navigate(['/usuarios']);
        Swal.fire('Usuario Actualizado', `Usuario Actualizado con éxito!`, 'success');
        this.cargarUsers();
        form.resetForm();
    });
  }

  delete(user: Usuarios): void {
    this.usuarioService.delete(user).subscribe(
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


/* generaPDF(user: Usuarios[]) {
  const header = ['matricula', 'nombre_completo', 'direccion', 'telefono'];
  const headerConfig = header.map(key => ({
  'name': key,
  'prompt': key,
  'width': 55,
  'height': 10,
  'align': 'center',
  'padding': 0,
  'fontsize': 9}));
  const pdf = new jsPDF('a4');
  pdf.setFontSize(9);
  pdf.setFont('helvetica');
  pdf.text('Hola Mundo', 10, 5);
  const data = user;
  pdf.table(10, 20, data, headerConfig);
  pdf.output('dataurlnewwindow');
  pdf.save('a4.pdf');
}
 */

 generarPDF() {
  window.open(`${environment.rutaAPI}` + '/Reportelista');
  //this.usuarioService.getPDF().subscribe();
 }
}
