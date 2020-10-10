import { Component, OnInit } from '@angular/core';
import { UserBase } from '../../interfaces/userbase';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login/login.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { PadronService } from '../../services/dasboard/padron.service';

@Component({
  selector: 'app-loginbase',
  templateUrl: './loginbase.component.html',
  styleUrls: ['./loginbase.component.css']
})
export class LoginbaseComponent implements OnInit {

  private subscription: Subscription;
  public userbase: UserBase = new UserBase();
  forma: FormGroup;

  constructor( private fb: FormBuilder, private router: Router, private _login: LoginService,
               private _serv:ServiciosService, private _ps: PadronService ) { }

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

  get repasswordNovalido(){
    //return this.forma.get('repassword').invalid && this.forma.get('repassword').touched
    const pass1 = this.forma.get('ub_password').value;
    const pass2 = this.forma.get('conf_password').value;
    
    return ( pass1 === pass2) ? false : true;
  }

  crearFormulario(){

    this.forma = this.fb.group({
      ub_user: ['', [Validators.required,Validators.maxLength(50)]],
      ub_nombre: ['', [Validators.required,Validators.maxLength(250)]],
      ub_password: ['', Validators.required],
      conf_password: ['', Validators.required]
    },{
      validators: this.passwordsIguales('ub_password','conf_password')
    });

  }

  passwordsIguales( pass1Name: string, pass2Name: string){

    return (formGroup: FormGroup) =>{

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

        this._ps.getPadronAdvo(data.ub_user)
        .subscribe((data2: any) =>{
          sessionStorage.Situacion = data2.pad_situacion;
          sessionStorage.TipoUser = '4'  
          
          if ( data != null) {
            swal.fire({
              icon: 'success',
              title: 'Usuario Logeado',
              text: 'Bienvenido ' + data.ub_nombre,
              timer: 2000
            });
            this.router.navigate(['/inicio']);
          } else{
            swal.fire({
              icon: 'error',
              title: 'Usuario y/o contraseña incorrecta'
            });
          }	

        },
        error => {
          //console.log(error.error.Message);
          swal.fire({title: 'ERROR!!!',text: error.error.Message,icon: 'error'});
        });
        
      });
    }

    create(){
      //console.log(this.forma.value);
      this._serv.getAdvo(this.forma.get('ub_user').value).subscribe(
        advos => {
          //console.log(advos);
          
          this._serv.createBase(this.forma.value).subscribe(admin => {
            console.log(admin);
            
            swal.fire('Registro Guardado', `Administrativo ${admin.ub_user} guardado con éxito!`, 'success');
          },
          error => {
            //console.log(error);
            swal.fire({
              title: 'ERROR!!!',
              text: error.message,
              icon: 'error'});
          });

        },
        error => {
          console.log(error);
          swal.fire({title: 'ERROR!!!',text: error.error.Message ,icon: 'error'});
        });
    }

}
