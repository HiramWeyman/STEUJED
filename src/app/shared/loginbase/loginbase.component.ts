import { Component, OnInit } from '@angular/core';
import { UserBase } from '../../interfaces/userbase';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login/login.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { PadronService } from '../../services/dasboard/padron.service';
import { Datos } from './datos';
import { Respuesta } from './respuesta';
import { Password } from '../../modules/solicitud/cambiapassword/password';
import { UpdatepassService } from '../../services/updatepass/updatepass.service';
import { Usuarios } from '../../modules/usuarios/usuarios';
@Component({
  selector: 'app-loginbase',
  templateUrl: './loginbase.component.html',
  styleUrls: ['./loginbase.component.css']
})
export class LoginbaseComponent implements OnInit {

  private subscription: Subscription;
  public userbase: UserBase = new UserBase();
  public contra: Password = new Password();
  public datos: Datos = new Datos();
  resp: Respuesta[];
  forma: FormGroup;

  constructor( private fb: FormBuilder, private router: Router, private _login: LoginService,
               private _serv: ServiciosService, private _ps: PadronService, private passService: UpdatepassService) { }

  ngOnInit(): void {

    this._login.logoutBase();

    window.scroll(0, 0);
	
    this.crearFormulario(); 

    if (this._login.estaLogueado()) {
			this.router.navigate(['/inicio']);
		}

  }

  get userNovalido(){
    return this.forma.get('ub_user').invalid && this.forma.get('ub_user').touched
  }

  get nombreNovalido(){
    return this.forma.get('ub_nombre').invalid && this.forma.get('ub_nombre').touched
  }

  get curpNovalido(){
    return this.forma.get('ub_curp').invalid && this.forma.get('ub_curp').touched
  }

  get rfcNovalido(){
    return this.forma.get('ub_rfc').invalid && this.forma.get('ub_rfc').touched
  }

  get repasswordNovalido(){
    //return this.forma.get('repassword').invalid && this.forma.get('repassword').touched
    const pass1 = this.forma.get('ub_password').value;
    const pass2 = this.forma.get('conf_password').value;
    
    return ( pass1 === pass2) ? false : true;
  }

  crearFormulario(){

    this.forma = this.fb.group({
      ub_user: ['', [Validators.required, Validators.maxLength(50)]],
      ub_nombre: ['', [Validators.required, Validators.maxLength(250)]],
      ub_curp:  ['', [Validators.required, Validators.maxLength(50)]],
      ub_rfc: ['', [Validators.required, Validators.maxLength(50)]],
      ub_password: ['', Validators.required],
      conf_password: ['', Validators.required]
    }, {
      validators: this.passwordsIguales('ub_password', 'conf_password')
    });

  }

  passwordsIguales( pass1Name: string, pass2Name: string){

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if ( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ noEsIgual: true });
      }

    }

  }

  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  login() {
    this.subscription = this._login.getLoginBase(this.userbase)
      .subscribe((data: any) => {
        sessionStorage.Matricula = data.ub_user;
        //console.log(data.ub_user+"x");
        this._ps.getPadronAdvo(data.ub_user)
        .subscribe((data2: any) => {
          sessionStorage.Situacion = data2.pad_situacion;
          
          sessionStorage.TipoUser = '4';
          
          if ( data != null) {
            Swal.fire({
              icon: 'success',
              title: 'Usuario Logeado',
              text: 'Bienvenido ' + data.ub_nombre,
              timer: 2000
            });
            this.router.navigate(['/inicio']);
            
          }
          
          else{
            Swal.fire({
              icon: 'error',
              title: 'Usuario y/o contraseña incorrecta'
            });
          }	

        },
        error => {
          //console.log(error);
          Swal.fire({title: 'ERROR!!!', text: error.error.Message, icon: 'error'});
        });
        
      },
      error => {
        console.log(error);
        Swal.fire({title: 'ERROR!!!', text: error.error.Message, icon: 'error'});
      });

      
    }

    create(){
      //console.log(this.forma.value);
      this._serv.getAdvo(this.forma.get('ub_user').value).subscribe(
        advos => {
          //console.log(advos);
          
          this._serv.createBase(this.forma.value).subscribe(admin => {
            console.log(admin);
            
            Swal.fire('Registro Guardado', `Administrativo ${admin.ub_user} guardado con éxito!`, 'success');
          },
          error => {
            console.log(error);
            Swal.fire({
              title: 'ERROR!!!',
              text: error.error,
              icon: 'error'});
          });

        },
        error => {
          console.log(error);
          console.log(error.error);
          Swal.fire({title: 'ERROR!!!', text: error.error.error , icon: 'error'});
        });
    }

    comprobar(datos: Datos) {
      if (datos.matricula && datos.curp && datos.rfc) {
        this.passService.obtener(datos).subscribe(
         // user => this.resp = user
          );
        alert(this.resp);
          document.getElementById('openModalButton').click();
        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Los datos son incorrectos!'
        });
      }

    }


    probarGet() {
      if (this.datos.matricula !== undefined && this.datos.curp !== undefined  && this.datos.rfc !== undefined) {
      this.passService
      .obtener(this.datos)
      .subscribe((personas: Respuesta[]) => {
        console.log(personas);
        if (personas.length > 0) {
          document.getElementById('openModalButton').click();
        } else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontro el trabajador!'
          });
        }
      });
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Los datos son incorrectos!'
        });
      }

    }

    cambiaPass(contra: Password, matricula: string) {
      if (contra.pass1 === contra.pass2) {
        this.passService.updateUser(contra, matricula).subscribe(pass => {
          this.router.navigate(['/loginbase']);
            Swal.fire('Nuevo Password', `Password actualizado con éxito!`, 'success');
            contra.pass1 = '';
            contra.pass2 = '';
            this.datos.matricula = '';
            this.datos.curp = '';
            this.datos.rfc = '';
            document.getElementById('cierraPass').click();
            document.getElementById('cierraComp').click();
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
