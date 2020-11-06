import { Component, OnInit, ɵConsole } from '@angular/core';
import { CatPlazasService } from '../../services/dasboard/catplazas.service';
import { CatPlazas } from '../../interfaces/catplazas';
import Swal from 'sweetalert2';
import { ServiciosService } from '../../services/servicios/servicios.service';


import { Advos } from '../../interfaces/advos';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { environment} from '../../../environments/environment';

//import { ReporteService } from '../../services/dasboard/reportesol.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  catplazas: CatPlazas[];
  public catplaza: CatPlazas = new CatPlazas();
  advos: Advos[];
  public advo: Advos = new Advos();
  solrep: any[] = [];
  forma: FormGroup;

  isHidden = true;
  isHiddenEnvio = false;

  plaza: String;
  categoria: String;
  funcion: String;
  adscripcion: String;

  pad_nombre_: String;
  pad_adscripcion_: String;
  pad_categoria_: String;
  pad_funcion_: String;
  pad_situacion_: String;
  pad_permanencia_: String;
  pad_f_ingreso_: String;
  pad_permisos_: String;
  pad_f_antig_: String;
  pad_n_insaluble_: String;
  pad_adscrip_base_: String;
  pad_catego_base_: String;
  pad_funcion_base_: String;
  pad_situacion_base_: String;
  pad_num_contacto_: String;
  pad_observaciones_: String;
  idx:Number;
  constructor( private _cp: CatPlazasService, private _serv: ServiciosService, private fb: FormBuilder, public router: Router ,) { }

  ngOnInit(): void {

    this.cargarCatServicio();
    //console.log(this.cargarCatServicio());

    this.crearFormulario();

  }

  cargarCatServicio(){
/*     this._cp.getCatPlazas().subscribe(
      catplazas => {
        this.catplazas = catplazas;
        //console.log(this.catplazas);
      },
      error => {
        //console.log(error);
        Swal.fire({title: 'ERROR!!!',text: error.message,icon: 'error'});
      }); */
      this._cp.getCatPlazasAdmin1().subscribe(
        catplazas => {
          this.catplazas = catplazas;
          //console.log(this.catplazas);
        },error => {
          //console.log(error);
          Swal.fire({title: 'ERROR!!!',text: error.message,icon: 'error'});
        });
  }

  buscaAdvo(idCatPlaza){
    console.log(idCatPlaza);

    this._cp.getCatPlaza(idCatPlaza).subscribe(
      catplaza => {
        console.log(catplaza);
        this.forma.get("plaza_descrip").setValue(catplaza.catp_descrip);
        this.forma.get("categoria").setValue(catplaza.catp_categoria);
        this.forma.get("funcion").setValue(catplaza.catp_funcion);
        this.forma.get("adscripcion").setValue(catplaza.catp_adscripcion);

        this._serv.getAdvo(Number(sessionStorage.getItem('LoginBase'))).subscribe(
          advos => {
            this.advos = advos;
            console.log(this.advos);
            this.forma.patchValue(advos);
            this.forma.updateValueAndValidity();
            this.forma.get("pad_num_contacto").setValue("");
            this.forma.get("pad_observaciones").setValue("");
            this.isHidden = true;
            this.isHiddenEnvio = false;
          },
          error => {
            console.log(error);
            Swal.fire({title: 'ERROR!!!',text: error.error.Message ,icon: 'error'});
          });
      },
      error => {
        console.log(error);
        Swal.fire({title: 'ERROR!!!',text: error.error.Message ,icon: 'error'});
      });
  }

  crearFormulario(){

    this.forma = this.fb.group({
      pad_plaza_id: ['', Validators.required],
      pad_mat: ['', Validators.required],
      pad_nombre: [''],
      pad_adscripcion: [''],
      pad_categoria: [''],
      pad_funcion: [''],
      pad_situacion: [''],
      pad_permanencia: [''],
      pad_f_ingreso: [''],
      pad_permisos: [''],
      pad_f_antig: [''],
      pad_n_insaluble: [''],
      pad_adscrip_base: [''],
      pad_catego_base: [''],
      pad_funcion_base: [''],
      pad_situacion_base: [''],
      pad_num_contacto: [''],
      pad_observaciones: [''],
      pad_sueldo: [''],

      plaza_descrip: [''],
      categoria: [''],
      funcion: [''],
      adscripcion: ['']
    });
  }

  enviarSolicitud(){
    this._serv.create(this.forma.value).subscribe(plaza => {
      //this.router.navigate(['/servicios']);
        Swal.fire('Datos Enviados!!!', `Ya puedes imprimir su solicutud!`, 'success');
        //this.cargarCatServicio();
        //this.crearFormulario();
        this.idx = plaza.pad_id;
       // alert(plaza.pad_id);
       // console.log(plaza.pad_id+"x");
        this.isHidden = false;
        this.isHiddenEnvio = true;
    },
    error => {
      //console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }



  imprimirSolicitud() {
   console.log(this.idx+"y");
   window.open(`${environment.rutaAPI}` + '/ReporteSol?id='
   + this.idx
   );
/*     this.plaza = this.forma.controls['plaza_descrip'].value;
    this.categoria = this.forma.controls['categoria'].value;
    this.funcion = this.forma.controls['funcion'].value;
    this.adscripcion = this.forma.controls['adscripcion'].value;

    this.pad_nombre_ = this.forma.controls['pad_nombre'].value;
    this.pad_adscripcion_ = this.forma.controls['pad_adscripcion'].value;
    this.pad_categoria_ = this.forma.controls['pad_categoria'].value;
    this.pad_funcion_ = this.forma.controls['pad_funcion'].value;
    this.pad_situacion_ = this.forma.controls['pad_situacion'].value;
    this.pad_permanencia_ = this.forma.controls['pad_permanencia'].value;
    this.pad_f_ingreso_ = this.forma.controls['pad_f_ingreso'].value;
    this.pad_permisos_ = this.forma.controls['pad_permisos'].value;
    this.pad_f_antig_ = this.forma.controls['pad_f_antig'].value;
    this.pad_n_insaluble_ = this.forma.controls['pad_n_insaluble'].value;
    this.pad_adscrip_base_ = this.forma.controls['pad_adscrip_base'].value;
    this.pad_catego_base_ = this.forma.controls['pad_catego_base'].value;
    this.pad_funcion_base_ = this.forma.controls['pad_funcion_base'].value;
    this.pad_situacion_base_ = this.forma.controls['pad_situacion_base'].value;
    this.pad_num_contacto_ = this.forma.controls['pad_num_contacto'].value;
    this.pad_observaciones_ = this.forma.controls['pad_observaciones'].value; */
 
 /*    window.open(`${environment.rutaAPI}` + '/ReporteSol?plaza_descrip='
    + this.plaza
    + '&categoria=' + this.categoria
    + '&funcion=' + this.funcion
    + '&adscripcion=' + this.adscripcion
    + '&pad_nombre=' + this.pad_nombre_
    + '&pad_adscripcion=' + this.pad_adscripcion_
    + '&pad_categoria=' + this.pad_categoria_
    + '&pad_funcion=' + this.pad_funcion_
    + '&pad_situacion=' + this.pad_situacion_
    + '&pad_permanencia=' + this.pad_permanencia_
    + '&pad_f_ingreso=' + this.pad_f_ingreso_
    + '&pad_permisos=' + this.pad_permisos_
    + '&pad_f_antig=' + this.pad_f_antig_
    + '&pad_n_insaluble=' + this.pad_n_insaluble_
    + '&pad_adscrip_base=' + this.pad_adscrip_base_
    + '&pad_catego_base=' + this.pad_catego_base_
    + '&pad_funcion_base=' + this.pad_funcion_base_
    + '&pad_situacion_base=' + this.pad_situacion_base_
    + '&pad_num_contacto=' + this.pad_num_contacto_
    + '&pad_observaciones=' + this.pad_observaciones_
    ); */
    //this.serv.getReport(this.solrep).subscribe();
  }

}
