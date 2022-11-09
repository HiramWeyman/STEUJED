import { Component, OnInit } from '@angular/core';
import { Password } from './password';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import { UpdatepassService } from '../../../services/updatepass/updatepass.service';
import { LoginService } from '../../../services/login/login.service';
import { Usuarios } from '../../usuarios/usuarios';
@Component({
  selector: 'app-cambiapassword',
  templateUrl: './cambiapassword.component.html',
  styleUrls: ['./cambiapassword.component.css']
})
export class CambiapasswordComponent implements OnInit {
  public contra: Password = new Password();
  usuarios: Usuarios[];
  constructor(private passService: UpdatepassService, private router: Router) { }

  ngOnInit(): void {
  
   
  }

  cambiaPass(contra: Password) {

    if (contra.pass1 === contra.pass2) {
      this.passService.update(contra).subscribe(pass => {
        this.router.navigate(['/cambiapassword']);
          Swal.fire('Nuevo Password', `Password actualizado con éxito!`, 'success');
      });
  
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Los password no coinciden!'
      });
    }
  }



  

}
