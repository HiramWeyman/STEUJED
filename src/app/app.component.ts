import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
}
