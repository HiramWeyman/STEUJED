import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/dasboard/menu.service';
import {Menu} from '../../modules/menu/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menu:Menu[];

  constructor(private _menu:MenuService) { }

  ngOnInit() {

    this._menu.getMenu().subscribe(
      menu => {
        this.menu = menu;
        //console.log(this.menu);
      }
    );

  }

  displayActiveness(status) {

    switch (status) {
      case 0:
          return 'fa fa-fw fa-home';
          break;
      case 1:
          return 'fa fa-id-card';
          break;
      case 2:
          return 'fa fa-file-audio-o';
          break;
      case 3:
          return 'fa fa-users';
          break;
    }

}

}
