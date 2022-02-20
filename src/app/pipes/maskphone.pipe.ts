import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskphone'
})
export class MaskPhonePipe implements PipeTransform {

  transform(phone_number: any): any {
    let phone = String(phone_number);
    let first = phone.substr(0, 3);
    let last = phone.substr(phone.length - 2, 2);
    return first + '*******' + last;
  }
}
