import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../../services/dasboard/galeria.service';
import { Galeria } from '../../../interfaces/galeria';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vn-galeria',
  templateUrl: './vn-galeria.component.html',
  styleUrls: ['./vn-galeria.component.css']
})
export class VnGaleriaComponent implements OnInit {

  public galerias: Galeria = new Galeria()

  imagenes: any[];
  id: any;
  data: any;
  array: string = "";

  public loadImagenes(data) {
    
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = data;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  constructor( private activatedRoute: ActivatedRoute, private _gs: GaleriaService ) { }

  ngOnInit(): void {
    this.cargarGaleria();
  }

  cargarGaleria(): void{
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id']
      //console.log(params);
      if(this.id){
       this._gs.getGaleria(this.id).subscribe( (galerias) => {
        this.galerias = galerias
        //console.log(this.galerias);
         
        this.imagenes = this.galerias.gal_ruta.split(",,");
        this.imagenes.splice(-1,1);
        for( var x=0; x<this.imagenes.length; x=x+1){
          this.array += "{img:'http://www.steujed.org.mx/assets/images/galeria/"+this.id+"/"+this.imagenes[x]+"'},";
        }
        this.array = this.array.slice(0, -1)

        this.data =
        "$('.fotorama').fotorama({ data: ["+this.array+"] });"

        this.loadImagenes(this.data);
       })
      }
    })

  }

}
