import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from '../../../services/dasboard/publicaciones.service';
import { Publicaciones } from '../../../modules/publicaciones/principal/publicaciones';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  //publicaciones:Publicaciones[];

  public publicaciones: Publicaciones = new Publicaciones()

  imagenes: any[];
  id: any;
  data: any;
  array: string = "";

  public loadImagenes(data) {
    
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    /*
    script.innerHTML = "$('.fotorama').fotorama({ "+
                        "data: [ "+
                            "{img: 'http://www.steujed.org.mx/assets/images/noticias/68/imagen1.jpeg'},"+
                            "{img: 'http://www.steujed.org.mx/assets/images/noticias/68/imagen2.jpeg'}"+
                          "]"+
                        "});";
    */
   script.innerHTML = data;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  constructor( private activatedRoute: ActivatedRoute, private _publicaciones: PublicacionesService ) { }

  ngOnInit(): void {
    this.cargarNoticia();
  }

  cargarNoticia(): void{
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id']
      //console.log(params);
      if(this.id){
       this._publicaciones.getPublicacion(this.id).subscribe( (publicaciones) => {
        this.publicaciones = publicaciones
        //console.log(this.publicaciones);
         
        this.imagenes = this.publicaciones.pub_ruta.split(",,");
        this.imagenes.splice(-1,1);
        for( var x=0; x<this.imagenes.length; x=x+1){
          this.array += "{img:'http://www.steujed.org.mx/assets/images/noticias/"+this.id+"/"+this.imagenes[x]+"'},";
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
