import { Component, OnInit } from '@angular/core';
import { ContactanosService } from '../../services/dasboard/contactanos.service';
import { Contactanos } from '../../modules/contactanos/Contactanos';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html'
})
export class CopyrightComponent implements OnInit {

  contactanos:Contactanos[];

  constructor( private _contactanos : ContactanosService ) { }

  ngOnInit() {
    this._contactanos.getContactanos().subscribe(
      contactanos => {
        this.contactanos = contactanos;
        //console.log(this.contactanos);
      },
      error => {
        console.log(error);
      }
    );
  }

}
