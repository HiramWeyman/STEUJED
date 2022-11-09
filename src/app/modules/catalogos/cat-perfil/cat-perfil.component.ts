import { Component, OnInit } from '@angular/core';
import { Perfil } from '../../../modules/usuarios/perfil';
import { PerfilService } from '../../../services/dasboard/perfil.service';
import {Router, ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cat-perfil',
  templateUrl: './cat-perfil.component.html',
  styleUrls: ['./cat-perfil.component.css']
})
export class CatPerfilComponent implements OnInit {
  perfiles: Perfil[];
  public perfil: Perfil = new Perfil();
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private perfilService: PerfilService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarPerfiles();
  }

  cargarPerfiles(): void {
    this.perfilService.getPerfil().subscribe(
      (perfiles) => this.perfiles = perfiles
    );
  }

  LimpiarForm(form: NgForm) {
    form.resetForm(); // or form.reset();
}

cargarPerfil(id: number): void {
  if (id) {
    this.perfilService.getPerfiles(id).subscribe( (perfil) => {
      this.perfil = perfil;
      // console.log(this.usuario);
    });
  }
}


create(per: Perfil): void {
  this.perfilService.create(per).subscribe(perfil => {
    this.router.navigate(['/perfil']);
      Swal.fire('Nuevo perfil', `Perfil ${perfil.perfil_desc} creado con éxito!`, 'success');
      this.cargarPerfiles();
  });
}

update(per: Perfil): void {
  this.perfilService.update(per).subscribe(perfil => {
    this.router.navigate(['/perfil']);
      Swal.fire('Perfil Actualizado', `Perfil Actualizado con éxito!`, 'success');
      this.cargarPerfiles();
  });
}

delete(per: Perfil): void {
  this.perfilService.delete(per).subscribe(
    response => {
      this.perfiles = this.perfiles.filter(cli => cli !== per);
      Swal.fire(
        'Perfil Eliminado!',
        `Perfil ${per.perfil_desc} eliminado con éxito.`,
        'success'
      );
    }
  );
}

}
