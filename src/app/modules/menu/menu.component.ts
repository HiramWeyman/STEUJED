import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';
import { MenuService } from '../../services/dasboard/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu:Menu[];

  constructor(private _menu:MenuService) { }

  ngOnInit() {

    this._menu.getMenuBandera().subscribe(
      menu => {
        this.menu = menu;
        //console.log(this.menu);
      }
    );

  }

  cancelar(menu: Menu): void {
    this._menu.cancelar(menu.menu_id).subscribe(
      response => {
        this.menu = this.menu.filter(cli => cli !== menu)
        Swal.fire(
          'Cancelado Exitosamene!',
          `Menu ${menu.menu_descrip} cancelado .`,
          'success'
        )
      }
    ),
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    }
  }
}
