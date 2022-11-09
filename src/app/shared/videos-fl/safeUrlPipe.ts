import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class safeUrlPipe implements PipeTransform {

  constructor ( private _domSanitizer:DomSanitizer){}

  transform(url): any {

    return this._domSanitizer.bypassSecurityTrustResourceUrl( url );

  }

}