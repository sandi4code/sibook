import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskPhonePipe } from './maskphone.pipe';
import { RupiahPipe } from './rupiah.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MaskPhonePipe,
    RupiahPipe
  ],
  exports: [
    MaskPhonePipe,
    RupiahPipe
  ]
})
export class PipeModule { }
