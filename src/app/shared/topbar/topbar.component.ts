import { Component, OnInit } from '@angular/core';
import { ContactanosService } from '../../services/dasboard/contactanos.service';
import { Contactanos } from '../../modules/contactanos/Contactanos';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  contactanos:Contactanos[];

  constructor( private _contactanos : ContactanosService ) { }

  ngOnInit(): void {
    /*
    this._contactanos.getContactanos().subscribe(
      contactanos => {
        this.contactanos = contactanos;
        //console.log(this.contactanos);
      },
      error => {
        console.log(error);
      }
    );
    */

  }

}
