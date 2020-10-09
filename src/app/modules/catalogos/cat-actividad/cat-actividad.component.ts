import { Component, OnInit } from '@angular/core';
import { Actividad } from '../../../modules/usuarios/actividad';
import { ActividadService } from '../../../services/dasboard/actividades.service';
import {Router, ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-cat-actividad',
  templateUrl: './cat-actividad.component.html',
  styleUrls: ['./cat-actividad.component.css']
})
export class CatActividadComponent implements OnInit {
  actividades: Actividad[];
  public actividad: Actividad = new Actividad();
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private actividadService: ActividadService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {
    this.actividadService.getAcividad().subscribe(
      (actividades) => this.actividades = actividades
    );
  }

  LimpiarForm(form: NgForm) {
    form.resetForm(); // or form.reset();
}

cargarActividad(id: number): void {
  if (id) {
    this.actividadService.getActivedades(id).subscribe( (actividad) => {
      this.actividad = actividad;
      // console.log(this.usuario);
    });
  }
}


create(act: Actividad): void {
  this.actividadService.create(act).subscribe(actividad => {
    this.router.navigate(['/actividades']);
      Swal.fire('Nueva actividad', `Actividad ${actividad.actividad_desc} creada con éxito!`, 'success');
      this.cargarActividades();
  });
}

update(act: Actividad): void {
  this.actividadService.update(act).subscribe(actividad => {
    this.router.navigate(['/actividades']);
      Swal.fire('Actividad Actualizada', `Actividad Actualizada con éxito!`, 'success');
      this.cargarActividades();
  });
}

delete(act: Actividad): void {
  this.actividadService.delete(act).subscribe(
    response => {
      this.actividades = this.actividades.filter(cli => cli !== act);
      Swal.fire(
        'Actividad Eliminada!',
        `Actividad ${act.actividad_desc} eliminado con éxito.`,
        'success'
      );
    }
  );
}

}
