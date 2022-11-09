import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { MenuService } from '../../../services/dasboard/menu.service';
import { Menu } from '../menu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {

  public menu: Menu = new Menu()

  constructor(public router: Router, private activatedRoute: ActivatedRoute, private _menu: MenuService) { }

  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      //console.log(params);
      if(id){
       this._menu.getMenus(id).subscribe( (menu) => {
         this.menu = menu
         //console.log(this.menu);
       })
      }
    })
  }

  create(): void {
  }

  update(): void {
    this._menu.update(this.menu).subscribe(usr =>{
      this.router.navigate(['/menu']);
        Swal.fire('Actualizado', 'Menu actualizado con exito', 'success');
    },
    error => {
      //console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }

  regresar(): void {
    this.router.navigate(['/menu']);
  }
}
