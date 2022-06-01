import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
@Pipe({
  name: 'rupiah',
})
export class RupiahPipe implements PipeTransform {
  transform(
    value: number,
    currencyCode: string = 'Rp ',
    display:
      | 'code'
      | 'symbol'
      | 'symbol-narrow'
      | string
      | boolean = 'symbol',
    digitsInfo: string = '1.0-0',
    locale: string = 'id',
  ): string | null {
    return formatCurrency(
      value,
      locale,
      getCurrencySymbol(currencyCode, 'narrow'),
      currencyCode,
      digitsInfo,
    );
  }
}