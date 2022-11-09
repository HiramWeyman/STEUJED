import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Padron } from './padron';
import { PadronService } from '../../services/dasboard/padron.service';
import Swal from 'sweetalert2';

type AOA = any[][];

@Component({
  selector: 'app-padron-advo',
  templateUrl: './padron-advo.component.html',
  styleUrls: ['./padron-advo.component.css']
})
export class PadronAdvoComponent implements OnInit {
  data: AOA = [[1, 2], [3, 4]];
  data2: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName = 'SheetJS.xlsx';
  titulo:  String;
  valores:  String;
  valores2:  String;
  array: any[] = [];
  array2: any[] = [];
  loading: boolean;
  loading2: boolean;
  errorMessage = '';
  btnDisabled: boolean;
  public pad: Padron = new Padron();
  
  constructor(private padronService: PadronService) { }

  ngOnInit(): void {
    this.loading = false;
    this.loading2 = false;
    this.btnDisabled = true;

  }
/*   load(): void {
    alert('x');
    
    console.log(this.loading2);
  } */

  onFileChange(evt: any) {
    this.loading2 = true;
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      
      /* read workbook */
      const bstr: string = e.target.result;

  /*     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true,
      cellNF: false,
      cellText: false}); */
      
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellText:false, cellDates:true});
 
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      var colNum = XLSX.utils.decode_col("E"); 
      var fmt = '$#,##0.00';
      var range = XLSX.utils.decode_range(ws['!ref']);
for(var i = range.s.r + 1; i <= range.e.r; ++i) {
  /* find the data cell (range.s.r + 1 skips the header row of the worksheet) */
  var ref = XLSX.utils.encode_cell({r:i, c:colNum});
  /* if the particular row did not contain data for the column, the cell will not be generated */
  if(!ws[ref]) continue;
  /* `.t == "n"` for number cells */
  if(ws[ref].t != 'n') continue;
  /* assign the `.z` number format */
  ws[ref].z = fmt;
}

      /* save data */
    /*   this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false}));
      this.data2 = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false})); */
    /*   this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'yyyy-mm-dd'}));
      this.data2 = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'yyyy-mm-dd'})); */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'dd/mm/yyyy'}));
      this.data2 = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'dd/mm/yyyy'}));

      this.titulo = this.data[0].toString();

      /*console.log(this.data);*/
      for (const i in this.data ) {

        // tslint:disable-next-line: no-unused-expression
        this.data[i];
            // tslint:disable-next-line: forin
            for (const j in this.data[i]) {
         /*      this.titulo = this.data[0].toString();
              console.log(this.titulo); */
              this.data[0].shift();
            }
      }
      
    };
   /*  console.log(this.data); */
    reader.readAsBinaryString(target.files[0]);
    this.loading2 = false;
    this.btnDisabled = false
  }


  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  asignar(): void {
    this.loading = true;
   // tslint:disable-next-line: forin
   for (const i in this.data2 ) {

      this.data2[0].shift();
      this.data2[1].shift();


    }

    // tslint:disable-next-line: forin
    for (const j in this.data2) {

      this.valores = this.data2[j].toString();
     /*  console.log(this.valores+" val"); */
      this.array.push(this.valores);
      }
      this.array.splice(0, 1);
      this.array.splice(0, 1);
   


    this.padronService.create(this.array).subscribe(usr => {
      Swal.fire('Excel Registrado', `El archivo se ha registrado con éxito!`, 'success');
      this.loading = false;
    },
    (error) => {                              //Error callback
      console.error('error caught in component');
      console.log(error);
      this.errorMessage = error.error.ExceptionMessage;
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A ocurrido un error probablemente tengas celdas vacias!',
        footer: this.errorMessage
      });
      //throw error;   //You can also throw the error to a global error handler
    });

     /*  console.log(this.array); */
    /* console.log(this.data2); */
  }



  borrar(): void {
    this.loading = true;
   // tslint:disable-next-line: forin
   for (const i in this.data2 ) {

      this.data2[0].shift();
      this.data2[1].shift();


    }

    // tslint:disable-next-line: forin
    for (const j in this.data2) {

      this.valores = this.data2[j].toString();
     /*  console.log(this.valores+" val"); */
      this.array.push(this.valores);
      }
      this.array.splice(0, 1);
      this.array.splice(0, 1);
   


    this.padronService.delete(this.array).subscribe(usr => {
      Swal.fire('Archivo Excel Borrado', `El archivo se ha borrado con éxito!`, 'success');
      this.loading = false;
    },
    (error) => {                              //Error callback
      console.error('error caught in component');
      console.log(error);
      this.errorMessage = error.error.ExceptionMessage;
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A ocurrido un error probablemente tengas celdas vacias!',
        footer: this.errorMessage
      });
      //throw error;   //You can also throw the error to a global error handler
    });

     /*  console.log(this.array); */
    /* console.log(this.data2); */
  }

  borrar2(){
    this.padronService.deleteAct(this.array).subscribe(usr => {
      Swal.fire('Trabajadores Activos Borrados con Exito', `El archivo se ha borrado con éxito!`, 'success');
      this.loading = false;
    },
    (error) => {                              //Error callback
      console.error('error caught in component');
      console.log(error);
      this.errorMessage = error.error.ExceptionMessage;
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A ocurrido un error probablemente tengas celdas vacias!',
        footer: this.errorMessage
      });
      //throw error;   //You can also throw the error to a global error handler
    });
  }

  borrar3(){
    this.padronService.deleteJub(this.array).subscribe(usr => {
      Swal.fire('Trabajadores Jubilados Borrados con Exito', `El archivo se ha borrado con éxito!`, 'success');
      this.loading = false;
    },
    (error) => {                              //Error callback
      console.error('error caught in component');
      console.log(error);
      this.errorMessage = error.error.ExceptionMessage;
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A ocurrido un error probablemente tengas celdas vacias!',
        footer: this.errorMessage
      });
      //throw error;   //You can also throw the error to a global error handler
    });
  }

}
