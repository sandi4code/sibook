import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharOnlyDirective } from './char-only.directive';
import { DigitOnlyDirective } from './digit-only.directive';
import { InputMaskDirective } from './input-mask.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CharOnlyDirective,
    DigitOnlyDirective,
    InputMaskDirective
  ],
  exports: [
    CharOnlyDirective,
    DigitOnlyDirective,
    InputMaskDirective
  ]
})
export class DirectiveModule { }
